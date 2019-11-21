const express = require('express');
const router = express.Router();

const axios = require('axios');

router.get('/', (req, res) => {
    axios({
        method: 'GET',
        url:
            'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random',
        headers: {
            'content-type': 'application/octet-stream',
            'x-rapidapi-host':
                'matchilling-chuck-norris-jokes-v1.p.rapidapi.com',
            'x-rapidapi-key':
                '84d8ca7390msh40ab58f0256f890p15fb9ejsn8e98b37e4d31',
            accept: 'application/json'
        }
    })
        .then(response => {
            res.json(response.data.value);
            console.log('server :::', response.data.value);
        })
        .catch(error => {
            console.log(error);
        });
});

module.exports = router;
