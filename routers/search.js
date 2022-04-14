const { Router } = require('express');
const { urlFootball, urlMotorsports } = require('../constants');
const { searchWord } = require('../helpers/search');
const { getListFeed } = require('../streaming/get-listFeed');

const router = Router();

router.get('/football/:keyword', async(req, res) => {
    try {
        const word = req.params.keyword
        const data = await getListFeed(urlFootball);
        const result = await searchWord(word, data)

        return res.status(200).json({
            reponse: result 
        });
    } catch (error) {
        return res.status(500).json({
            error: error.toString()
        });
    };
});

module.exports = router