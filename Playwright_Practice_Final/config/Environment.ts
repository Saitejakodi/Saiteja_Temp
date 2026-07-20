import dotenv from "dotenv";

dotenv.config();

export const Environment = {

    BASE_URL: process.env.BASE_URL!,

    STANDARD_USERNAME: process.env.STANDARD_USERNAME!,

    STANDARD_PASSWORD: process.env.STANDARD_PASSWORD!,

    LOCKED_USERNAME: process.env.LOCKED_USERNAME!,

    INVALID_USERNAME: process.env.INVALID_USERNAME!,

    INVALID_PASSWORD: process.env.INVALID_PASSWORD!

};