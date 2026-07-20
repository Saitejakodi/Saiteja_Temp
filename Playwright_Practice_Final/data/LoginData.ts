import { Environment } from "../config/Environment";

export const LoginData = {

    validUser: {

        username: Environment.STANDARD_USERNAME,

        password: Environment.STANDARD_PASSWORD

    },

    lockedUser: {

        username: Environment.LOCKED_USERNAME,

        password: Environment.STANDARD_PASSWORD

    },

    invalidUser: {

        username: Environment.INVALID_USERNAME,

        password: Environment.INVALID_PASSWORD

    }

};