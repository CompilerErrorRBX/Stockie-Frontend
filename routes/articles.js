const axios = require('axios');

const articleAPIURL = 'http://127.0.0.1:3000';

const articleAPI = (app) => {
  app.get('/', (req, res, next) => {
    res.status(200).send('Hello, World!');
  });

  // Gets a list of articles
  app.get('/articles', (req, res, next) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;

    axios.get(`${articleAPIURL}/articles?limit=${limit}&offset=${offset}`)
      .then((response) => {
        // console.log(response);
        res.status(200);
        res.json(response.data);
        next();
      })
      .catch((error) => {
        console.log(error);
        // res.status(500).send(error.response.statusText);
      });
  });

  // Get an article by id
  app.get('/article/:id', (req, res, next) => {
    axios.get(`${articleAPIURL}/article/${req.params.id}`)
      .then((response) => {
        // console.log(response);
        res.status(200);
        res.json(response.data);
        next();
      })
      .catch((error) => {
        console.log(error);
        // res.status(500).send(error.response);
      });
  });

  // Get an article by id
  app.get('/article/:id/similar', (req, res, next) => {
    axios.get(`${articleAPIURL}/article/${req.params.id}/similar`)
      .then((response) => {
        // console.log(response);
        res.status(200);
        res.json(response.data);
        next();
      })
      .catch((error) => {
        console.log(error);
        // res.status(500).send(error.response);
      });
  });

  // Get an article by id
  app.get('/articles/search', (req, res, next) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    const query = req.query.query;

    axios.get(`${articleAPIURL}/articles/search?query=${query}&limit=${limit}&offset=${offset}`)
      .then((response) => {
        res.status(200);
        res.json(response.data);
        next();
      })
      .catch((error) => {
        console.log(error.response);
        // res.status(500).send(error.response);
      });
  });

  app.get('/articles/extract', (req, res, next) => {
    axios.get(`${articleAPIURL}/article/extract`)
      .then((response) => {
        res.status(200);
        res.json(response.data);
        next();
      })
      .catch((error) => {
        console.log(error.response);
        // res.status(500).send(error.response);
      });
  });  
}

module.exports = articleAPI;
