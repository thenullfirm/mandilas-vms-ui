require('dotenv').config();

let serverUrl = process.env.NEXT_PUBLIC_API_URL;
serverUrl = serverUrl.slice(1, -2);

export default serverUrl;
