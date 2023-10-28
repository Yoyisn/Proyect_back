const connectDB = require('./db.js');
const app = require('./app.js');

connectDB();

app.listen(4000);
console.log('Server on Port:', 4000);