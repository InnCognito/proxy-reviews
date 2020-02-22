// require('newrelic');
const express = require('express');
const axios = require('axios');

const app = express();


const dirPath = `${__dirname}/../public/dist/`;
app.use(express.static(dirPath));

const { routes } = require('../proxyconfig.json');

app.get('/:component/:room_id', (req, res) => {
  const { component, room_id } = req.params;
  axios.get(`${routes[component].address}/${room_id}`)
    .then(data => res.status(200).send(data.data))
    .catch(e => {
      console.log(e);
      res.status(500).send('Error');
    });
});


app.listen(3000, () => console.log('Listening on port: 3000'));
