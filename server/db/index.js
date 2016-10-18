dbConfig = require('./mongo');

export const connect = dbConfig.connect;
export const controllers = dbConfig.controllers;
export const passport = dbConfig.passport;
export const session = dbConfig.session;

export default dbConfig.default;
