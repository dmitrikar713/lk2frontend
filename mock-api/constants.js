module.exports = {
  host: 'localhost',
  port: 9000,
  apiUrl: '/api',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000,
    'Access-Control-Allow-Headers': 'Authorization, Content-Type',
  },
  jwtSecretKey: '1a2b-3c4d-5e6f-7g8h',
  jwtLifetime: '12h',
};
