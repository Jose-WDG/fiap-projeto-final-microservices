require("dotenv").config();
const env = process.env.NODE_ENV || "development";

const config = () => {
    switch (env) {
        case "development":
            return {
                dbpath: process.env.DEV_DB_URL,
                jwt_secret: process.env.KEY_JWT,
                jwt_expires: "5d",
                bcrypt_salt: 10
            };

        case "production":
            return {
                dbpath: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
                jwt_secret: process.env.KEY_JWT,
                jwt_expires: "5d",
                bcrypt_salt: 10
            };
    }
}

module.exports = config();
