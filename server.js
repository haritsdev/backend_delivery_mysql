const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const multer = require('multer');
const userRoutes = require('./routes/userRoutes');

/**
 * *IMPORT ALL ROUTES
 */
const usersRoutes = require('./routes/userRoutes');

const PORT = process.env.PORT || 3003;

app.use(logger('dev'));

app.set('port', PORT);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport)

app.disable('x-powered-by');

const upload=multer({
  storage:multer.memoryStorage()
})

app.get('/',(req,res)=>{
  res.send(`Server is running this route application`)
})
// app.use('/api/users', usersRoutes);
userRoutes(app,upload);

//Error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send(err.stack);
});

server.listen(PORT, () =>
  console.log(`Server is running on http://:${PORT}`)
);
