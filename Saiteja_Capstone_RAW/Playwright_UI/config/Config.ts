import dotenv from "dotenv";

dotenv.config();

export class Config {
    static readonly baseUrl = process.env.BASE_URL!;
}