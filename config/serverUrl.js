import localEnvParser from './localEnvParser';

require('dotenv').config();

let serverUrl = process.env.NEXT_PUBLIC_API_URL;
serverUrl = process.env.NEXT_PUBLIC_ENV === "'local';" ? localEnvParser(serverUrl) : process.env.NEXT_PUBLIC_API_URL;

export default serverUrl;
