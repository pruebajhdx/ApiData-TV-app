const { Router } = require('express');
const { getListChannel } = require('../channel/get-list-channel');
const { urlFootball, urlChannels} = require('../constants');
const { searchWord, searchObjectDict, searchByLeague } = require('../helpers/search');
const { getListFeed } = require('../controllers/get-listFeed');
const { keyValidate } = require('../helpers/keyValidate');

const router = Router();

router.get('/football/:keyword', async(req, res) => {
    try {
        const word = req.params.keyword
        const data = await getListFeed(urlFootball);
        let result = await searchWord(word, data)

        if(result.length == 0) {
            result = 'Search not found'
        }

        return res.status(200).json({
            reponse: keyValidate(req, result) 
        });
    } catch (error) {
        return res.status(500).json({
            error: error.toString()
        });
    };
});

router.get('/channels/:keyword', async(req, res) => {
    try {
        const word = req.params.keyword
        const data = await getListChannel(urlChannels)
        let result = await searchObjectDict(word, data)

        return res.status(200).json({
            result
        });
        
    } catch (error) {
        return res.status(500).json({
            error: error.toString()
        });
    }
});

router.get('/leagues/:keyword', async(req, res) => {
    try {
        const word = req.params.keyword
        let result = await searchByLeague(word, urlFootball)
        
        return res.status(200).json({
            result
        });
        
    } catch (error) {
        return res.status(500).json({
            error: error.toString()
        });
    }
});


module.exports = router