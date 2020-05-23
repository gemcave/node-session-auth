const express = require('express');
const session = require('express-session');
const redis = require('redis');
const connectRedis = require('connect-redis');

const app = express();

const RedisStore = connectRedis(session);
const redisClient = redis.createClient({
	port: 6379,
	host: 'localhost'
})

app.use(session({
	store: new RedisStore({client: redisClient}),
	secret: 'testSecret',
	saveUninitialized: false,
	cookie: {
		secure: false, // true
		httpOnly: true,
		maxAge: 1000 * 60 * 30
	}
}))