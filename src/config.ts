import 'dotenv/config'
export const port = process.env.PORT || 3000;
export const DATABASE_HOST = process.env.DATABASE_HOST
export const DATABASE_PORT = process.env.DATABASE_PORT
export const DATABASE_NAME = process.env.DATABASE_NAME
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
export const JWT_SECRET = process.env.JWT_SECRET
export const PLACEID= process.env.PLACEID;
export const APIKEY = process.env.APIKEY;
export const EMAIL_USERNAME = process.env.EMAIL_USERNAME;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD