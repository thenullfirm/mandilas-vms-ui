require('dotenv').config();

let serverUrl = process.env.NEXT_PUBLIC_API_URL;
serverUrl = process.env.NEXT_PUBLIC_ENV === "'local';" ? serverUrl.slice(1, -2) : process.env.NEXT_PUBLIC_API_URL;

export default serverUrl;
