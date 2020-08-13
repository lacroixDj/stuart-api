const {
    MONGO_HOST,
    MONGO_PORT,
    MONGO_DB,
    MONGO_DB_USER,
    MONGO_DB_PASS,
} = process.env;

const MONGO_URL = `mongodb://${MONGO_DB_USER}:${MONGO_DB_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

module.exports =  MONGO_URL;

  