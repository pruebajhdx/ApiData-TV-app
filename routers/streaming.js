const { Router } = require('express');
const { dataStreaming, getListFeed, dataReplay } = require('../streaming/get-listFeed');
const { getListMma, getIframeUfc } = require('../streaming/get-mma');

const router = Router();

const urlFootball = process.env.URL_FOTBALL;
const urlMotorsports = process.env.URL_MOTORSPORTS
const urlF1 = process.env.URL_F1;
const urlMMa = process.env.URL_MMA

router.get('/football', async(req, res) => {
    try {
        const data = await getListFeed(urlFootball);
        if (data ) {
            return res.status(200).json({
                result: data,
            });     
        }
    } catch (error) {
        return res.status(500).json({
            error: error.toString()
        })
    }
});

router.get('/football/:id', async(req, res) => {
    try {
        const id = req.params.id
        const responseData = await dataStreaming(id, urlFootball) 

        return res.status(200).json({
            result: responseData
        });
        
    } catch (error) {
        return res.status(500).json({
            error: error.toString()
        });
        
    }
});

router.get('/motogp', async(req, res) => {
    try {
        const data = await getListFeed(urlMotorsports)
        return res.status(200).json({
            result: data,
        });     

    } catch (error) {
        return res.status(500).json({
            error: error.toString()
        });
        
    }
});

router.get('/motogp/:id', async(req, res) => {
    try {
        const id = req.params.id
        const responseData = await dataStreaming(id, urlMotorsports)

        return res.status(200).json({
            result: responseData
        });
        
    } catch (error) {
        return res.status(500).json({
            error: error.toString()
        });
        
    }
});


router.get('/f1', async(req, res) => {
    try {
        const data = await getListFeed(urlF1);
        const replayData = await dataReplay(urlF1)

        return res.status(200).json({
            result: data,
            replayData
        });     
    } catch (error) {
        return res.status(500).json({
            error: error.toString()
        });
    }
});


router.get('/mma', async(req, res) => {
    try {
        const data = await getListMma( urlMMa );
        return res.status(200).json({
            data,
            result: 'ok'
        })
    } catch (error) {
        return res.status(500).json({
            error: error.toString()
        })
    }
});


router.get('/mma/:id', async(req, res) => {
    try {
        const id = req.params.id
        const responseData = await getIframeUfc(id, urlMMa )

        return res.status(200).json({
            responseData,
            result: 'ok'
        });
        
    } catch (error) {
        return res.status(500).json({
            error: error.toString()
        });
        
    }
});



module.exports = router;