import { ConnectionOptions } from "typeorm";

import { User, Wishlist } from './models'

require('dotenv').config();


const config: ConnectionOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [ User, Wishlist ],
  synchronize: true,
};

export default config;
