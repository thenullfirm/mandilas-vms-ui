import localEnvParser from './localEnvParser';

require('dotenv').config();

const serverUrl = localEnvParser(process.env.NEXT_PUBLIC_API_URL);

export default serverUrl;
