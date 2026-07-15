import * as dotenv from "dotenv";

export const getEnv = () =>  {
    if (process.env.ENV || 'qa') {
        dotenv.config({
            override: true,
            path: `./env/.env.${process.env.ENV || 'qa'}`
        });
    } else {
        console.error("NO ENV");
    }
};
