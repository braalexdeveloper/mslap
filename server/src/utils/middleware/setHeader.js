const setHeader = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8080'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
}

module.exports = setHeader