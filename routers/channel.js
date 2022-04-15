const { Router } = require('express');
const { getListChannel, getChannelLink } = require('../channel/get-list-channel');
const { urlChannels } = require('../constants');


const router = Router();

router.get('/', async( req, res) => {

    try {
        const data = await getListChannel(urlChannels)
        return res.status(200).json({
            result: data
        });
        
    } catch (error) {
        return res.status(500).json({
            error: error.toString()
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const name = req.params.id;
        const data = await getChannelLink(name);

        return res.status(200).json({
            result: data
        });
    } catch (error) {
        return res.status(500).json({
            error: error.toString()
        });
    }

});


module.exports = router