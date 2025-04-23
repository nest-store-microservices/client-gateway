import 'dotenv/config';
import * as joi from 'joi';


interface EnvVars {
    PORT: number;
    PRODUCT_MICRO_SERVICES_HOST:string;
    PRODUCT_MICRO_SERVICES_PORT:number;
    ORDER_MICRO_SERVICES_HOST:string;
    ORDER_MICRO_SERVICES_PORT:number;
    //DATABASE_URL: string;
}

const envSchema = joi.object({
    PORT: joi.number().required(),
    PRODUCT_MICRO_SERVICES_HOST: joi.string().required(),
    PRODUCT_MICRO_SERVICES_PORT: joi.number().required(),
    ORDER_MICRO_SERVICES_HOST: joi.string().required(),
    ORDER_MICRO_SERVICES_PORT: joi.number().required(),
   // DATABASE_URL: joi.string().required(),
}).unknown(true);

const  { error, value } = envSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    PORT: envVars.PORT,
    productsMicroServiceHost: envVars.PRODUCT_MICRO_SERVICES_HOST,
    productsMicroServicesPort: envVars.PRODUCT_MICRO_SERVICES_PORT,
    ordersMicroServiceHost: envVars.ORDER_MICRO_SERVICES_HOST,
    ordersMicroServicesPort: envVars.ORDER_MICRO_SERVICES_PORT,
    //DATABASE_URL: envVars.DATABASE_URL,
}