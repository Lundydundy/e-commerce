const express = require('express');
const cors = require('cors')
const knex = require('knex')
const session = require('express-session');
const bcrypt = require('bcrypt')
const redis = require('redis')
const connectRedis = require('connect-redis');

const app = express()

app.use(
    cors({
        credentials: true, origin: "https://e-commerce-1-nxh1.onrender.com"
    })
);

const db = knex({
    client: 'pg',
    connection: {

        ssl: { rejectUnauthorized: false },
        host: process.env.DATABASE_HOST,
        port: 5432,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PW,
        database: process.env.DATABASE_DB
    }
});

const RedisStore = connectRedis(session);

const redisClient = redis.createClient({
    url: process.env.REDIS_URL,
    legacyMode: true
}
)
redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');})

const connection = async () => {
    await redisClient.connect();
}

connection()

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', reason.stack || reason);
});

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 5, // 5 days
        secure: false,
        httpOnly: false,
        sameSite: true
    }

}))



app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use((req, res, next) => {

    console.log(`${req.method} - ${req.url}`)
    console.log(req.session)
    next()
})


app.get("/product/:id", (req, res) => {
    console.log(req.params.id)
    db("items")
        .select("*")
        .where("id", "=", req.params.id)
        .then(item => {
            res.json(item)

        }).catch(error => {
            console.error("Error fetching data:", error);
            res.status(500).json({ error: "Internal Server Error, product/:id" });
        });
})

app.post("/register", (req, res) => {
    const { email, first_name, last_name, password, username } = req.body;

    // Validate input
    if (!email || !first_name || !last_name || !username || !password) {
        return res.status(400).json("Make sure all fields are not empty");
    }

    // Handle duplicate username or email errors
    db.transaction(trx => {
        trx.insert({
            hash: bcrypt.hashSync(password, 10),
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0].email,
                        first_name: first_name,
                        last_name: last_name,
                        username: username,
                        basket: {},
                        joined: new Date()
                    })
                    .then(user => {
                        console.log(user[0])
                        req.session.user = user[0];
                        res.json(user[0])
                    })
                    .catch(insertError => {
                        trx.rollback();
                        if (insertError.code === '23505') { // PostgreSQL unique violation error code
                            console.log("PostgreSQL unique violation error")
                            res.status(400).json("Username or email already exists.");
                        } else {
                            console.log("Error inserting into 'users':", insertError);
                            res.status(500).json("Error inserting into 'users'");
                        }
                    });
            })
            .then(trx.commit)
            .catch(err => {
                trx.rollback();
                console.log(err)
                res.status(500).json("Internal Server Error Register");
            });
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    // Validate input
    if (!email || !password) {
        return res.status(400).json("Make sure all fields are not empty");
    }
    // Handle duplicate username or email errors
    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                console.log("valid")
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(data => {
                        console.log("data", data[0])
                        const user = data[0]
                        req.session.user = user
                        console.log("login user", req.session.user)
                        if (user.basket.length > 0) {
                            const basketItems = user.basket
                            console.log("basketItems", basketItems)
                            const itemIds = basketItems.map((basketItem) => basketItem[0])
                            db.select('*').from('items')
                                .whereIn('id', itemIds)
                                .then(items => {
                                    // Combine user and basket items and send the response
                                    console.log("items", items.length)
                                    const response = {
                                        ...user,
                                        basket: items.map((item, i) => ({
                                            ...item,
                                            quantity: parseInt(basketItems[i][1]),
                                            details: basketItems[i][2]
                                        }))
                                    };
                                    console.log("response", response)
                                    console.log(req.session)
                                    res.json({ user: response })
                                })
                        } else {

                            console.log(req.session)
                            console.log("logged in")
                            res.json({ user: user })
                        }

                    })
                    .catch(err => {
                        console.log("Error fetching user:", err);
                        res.status(400).json('unable to get user')
                    })
            } else {
                res.status(400).json('wrong credentials')
            }
        })
        .catch(err => res.status(400).json('wrong credentials'))

})

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).json("success");
        } else {
            res.clearCookie('connect.sid');
            res.json({ success: true });
        }
    });
});

app.post("/addbasket", (req, res) => {
    const { user, basket } = req.body;
    console.log("session req", req.session)
    console.log("user", user, "basket", basket)
    console.log(req.session.user)
    if (user.id === null) {
        console.log("no user")
        res.json("no user")
    } else if (req.session.user) {
        db('users')
            .where('id', req.session.user.id)
            .update({
                basket: basket,
            })
            .returning('*')
            .then(updatedUser => {
                if (updatedUser.length > 0) {
                    console.log(updatedUser);
                    res.json(updatedUser);
                } else {
                    res.status(404).json('User not found');
                }
            })
            .catch(error => {
                console.error('Error updating basket:', error);
                res.status(500).json('Internal Server Error /addbasket');
            });
    }
    console.log("not working properly")
})

app.post("/product", (req, res) => {
    fetch("https://dummyjson.com/products?limit=0")
        .then(response => response.json())
        .then(data => {
            const products = data["products"]

            const filteredProducts = products.filter(product => {
                return product.category.includes("sunglasses")
            })

            filteredProducts.forEach(product => {
                db('items')
                    .insert({
                        title: product.title,
                        description: product.description,
                        category: product.category,
                        brand: product.brand,
                        thumbnail: product.thumbnail,
                        stock: product.stock,
                        rating: product.rating,
                        images: product.images,
                        price: Math.round(product.price, 2),
                    })
                    .returning('id') // Assuming you want to retrieve the generated ID
                    .then((ids) => {
                        console.log('Inserted ID:', ids[0]);
                        // Handle success or additional operations if needed
                    })
            })
            res.json(filteredProducts)
        })
})


app.post('/products', (req, res) => {
    const { page } = req.body
    let gender = "men"
    if (page === "productsA") {
        console.log("productsA")

        db('items')
            .select('*')
            .where('description', 'ilike', `%bag%`).orWhere('description', 'ilike', `%bag%`)
            .orWhere('description', 'ilike', `%watch%`).orWhere('category', 'ilike', `%watch%`)
            .orWhere('description', 'ilike', `%jewel%`).orWhere('category', 'ilike', `%jewel%`)
            .orWhere('category', 'ilike', `%sunglasses%`)

            .then(items => {
                res.json(items);
            })
            .catch(error => {
                console.error('Error fetching items:', error);
                res.status(500).json('Internal Server Error /products');
            });

    } else if (page === "productsW") {
        console.log("productsW")

        gender = "women"
        db('items')
            .select('*')
            .whereNot('category', 'sunglasses').andWhere('description', 'ilike', `%${gender}%`).orWhere('category', 'ilike', `%${gender}%`)
            .then(items => {
                res.json(items);
            })
            .catch(error => {
                console.error('Error fetching items:', error);
                res.status(500).json('Internal Server Error /products');
            });
    }

    else if (page === "productsS") {
        console.log("productsS")

        db('items')
            .select('*')
            .where('category', 'ilike', '%shoe%')
            .then(items => {
                res.json(items);
            })
            .catch(error => {
                console.error('Error fetching items:', error);
                res.status(500).json('Internal Server Error /products');
            })
    }
    else if (page === "productsM") {
        console.log("productsM")
        db('items')
            .select('*')
            .where('description', 'ilike', 'men%').orWhere('category', 'ilike', 'men%')
            .then(items => {
                res.json(items);
            })
            .catch(error => {
                console.error('Error fetching items:', error);
                res.status(500).json('Internal Server Error /products');
            });
    } else {
        console.log("All")

        db('items')
            .select('*')
            .then(items => {
                console.log(items);
                res.json(items);
            })
            .catch(error => {
                console.error('Error fetching items:', error);
                res.status(500).json('Internal Server Error /products');
            });
    }
})

app.get("/find", (req, res) => {
    const { input } = req.body
    console.log(input)
    db('usernames')
        .select('users.*', 'address.*', 'usernames.username')
        .join('users', 'usernames.user_id', '=', 'users.id')
        .join('address', 'users.id', '=', 'address.user_id')
        .where('usernames.username', input.toLowerCase()).orWhere("users.email", input.toLowerCase())
        .then(user => {
            if (user.length) {
                res.json(user[0])
            } else (res.status(400).json('Not found'))
        })
        .catch(err => res.status(400).json('Not found'))
})

app.get("/", (req, res) => {
    db("items")
        .select("*")
        .then(items => {
            res.json(items)
        }
        )
})

app.get("/changeTitle", (req, res) => {
    db("items")
        .select("*")
        .then(items => {
            items.forEach(item => {
                const newTitle = item.title.split(" ").map(item => titleCase(item))
                console.log("newTitle", newTitle.join(" "))
                console.log("item_id ", item.id)
                db("items")
                    .where('id', item.id)
                    .update({
                        title: newTitle.join(" ")
                    })
                    .catch(err => ('Not found', err))
            })
        })
})

app.get('/auth', (req, res) => {
    console.log("check")
    console.log(req.session)
    if (req.session.user) {
        console.log("logged in")
        db.select('*').from('users')
            .where('id', '=', req.session.user.id)
            .then(data => {
                console.log("data", data[0])
                const user = data[0]
                req.session.user = user
                if (user.basket.length > 0) {
                    const basketItems = user.basket
                    console.log("basketItems", basketItems)
                    const itemIds = basketItems.map((basketItem) => basketItem[0])
                    db.select('*').from('items')
                        .whereIn('id', itemIds)
                        .then(items => {
                            // Combine user and basket items and send the response
                            console.log("items", items.length)
                            const response = {
                                ...user,
                                basket: items.map((item, i) => ({
                                    ...item,
                                    quantity: parseInt(basketItems[i][1]),
                                    details: basketItems[i][2]
                                }))
                            };
                            console.log("response", response)
                            console.log(req.session)
                            res.json({ user: response })
                        })
                } else {

                    console.log(req.session)
                    console.log("logged in")
                    res.json({ user: user })
                }
            })
    }
    else {
        res.json("no session")
    }
})

function titleCase(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
})
