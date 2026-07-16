import { Secrets } from "../config/Secrets";

export const Users = {

    standard: {
        username: "standard_user",
        password: Secrets.get("PASSWORD")
    },

    locked: {
        username: "locked_out_user",
        password: Secrets.get("PASSWORD")
    },

    problem: {
        username: "problem_user",
        password: Secrets.get("PASSWORD")
    },

    performance: {
        username: "performance_glitch_user",
        password: Secrets.get("PASSWORD")
    }

};