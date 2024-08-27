const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 5000;
const YOUR_API_KEY = process.env.YOUR_API_KEY

app.get('/api/players', async (req, res) => {
  try {
    const {page, per_page, search} = req.query;
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.balldontlie.io/v1/players',
      headers: {
        'Authorization': 'aefd2f9a-f10e-4649-8096-19affd7f796c'
      },
      params: {
        'search': search,
      }
    };
    axios.request(config)
    .then((response) => {
      console.log('response.data', response.data);
      return res.status(200).json(response.data);
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
  } catch (error) {
    console.error('Failed to fetch players:', error);
    res.status(500).send('Internal Server Error'); // Send an error response to the client
  }
}); // Closing parenthesis and curly brace added here


app.get('/api/pInfo', async (req, res) => {
  try {
    const {playerId, seasonStats} = req.query;
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.balldontlie.io/v1/stats',
      headers: {
        'Authorization': 'aefd2f9a-f10e-4649-8096-19affd7f796c'
      },
      params: {
        'seasons[]': '2023',
        'player_ids[]': playerId,
        'postseason': seasonStats,
      }
    };
    axios.request(config)
    .then((response) => {
      console.log('response.data', response.data);
      return res.status(200).json(response.data);
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
  } catch (error) {
    console.error('Failed to fetch players:', error);
    res.status(500).send('Internal Server Error'); // Send an error response to the client
  }
}); // Closing parenthesis and curly brace added here

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
