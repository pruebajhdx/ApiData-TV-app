const { Router } = require("express");
const { getListSports } = require("../controllers/get-list-sport");
const { getListMma, getIframeUfc } = require("../controllers/get-mma");
const { getIframeSports } = require("../controllers/get-list-sport");

const {
    dataStreaming,
    getListFeed,
    filterByLeagues,
} = require("../controllers/get-listFeed");

const {
    urlFootball,
    urlMotorsports,
    urlF1,
    urlMMA,
    urlNBA,
    urlBoxing,
    urlBaseball,
    urlPirloTv,
} = require("../constants");

const {
    getDataOtherLeague,
    getIframePirloTv,
} = require("../controllers/get-list-other");
const { getDateF1 } = require("../controllers/get-date-list");

const router = Router();

router.get("/football/southAmerican", async (req, res) => {
    try {
        const data = await getDataOtherLeague(urlPirloTv);
        return res.status(200).json({
            data,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.toString(),
        });
    }
});

router.get("/football/southAmerican/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await getIframePirloTv(id, urlPirloTv);
        return res.status(200).json({
            result: data,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.toString(),
        });
    }
});

router.get("/football", async (req, res) => {
    try {
        const data = await getListFeed(urlFootball, null);
        return res.status(200).json({
            result: data,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.toString(),
        });
    }
});

router.get("/league", async (req, res) => {
    try {
        const data = await filterByLeagues(urlFootball);
        return res.status(200).json({
            leagueAvailable: data,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.toString(),
        });
    }
});

router.get("/football/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const responseData = await dataStreaming(id, urlFootball);

        return res.status(200).json({
            result: responseData,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.toString(),
        });
    }
});

router.get("/motors", async (req, res) => {
    try {
        const data = await getListFeed(urlMotorsports, null);
        return res.status(200).json({
            result: data,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.toString(),
        });
    }
});

router.get("/motors/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const responseData = await dataStreaming(id, urlMotorsports);

        return res.status(200).json({
            result: responseData,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.toString(),
        });
    }
});

router.get("/f1", async (req, res) => {
    try {
        const data = await getListFeed(urlF1, "f1");
        //const replayData = await dataReplay(urlF1);

        return res.status(200).json({
            result: data,
            //replayData,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.toString(),
        });
    }
});

router.get("/f1/date", async (req, res) => {
    try {
        const data = await getDateF1(urlF1, "f1");
        //const replayData = await dataReplay(urlF1);

        return res.status(200).json({
            result: data,
            //replayData,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.toString(),
        });
    }
});

router.get("/f1/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const responseData = await dataStreaming(id, urlF1);

        return res.status(200).json({
            result: responseData,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.toString(),
        });
    }
});

router.get("/mma", async (req, res) => {
    try {
        const data = await getListMma(urlMMA);
        return res.status(200).json({
            data,
            result: "ok",
        });
    } catch (error) {
        return res.status(500).json({
            error: error.toString(),
        });
    }
});

router.get("/mma/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const responseData = await getIframeUfc(id, urlMMA);

        return res.status(200).json({
            responseData,
            result: "ok",
        });
    } catch (error) {
        return res.status(500).json({
            error: error.toString(),
        });
    }
});

router.get("/nba", async (req, res) => {
    try {
        const selector = "#post-3094 > div > div > div > div > div";
        const data = await getListSports(selector, urlNBA);
        return res.status(200).json({
            data,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.toString(),
        });
    }
});

router.get("/nba/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const selector = "#post-3094 > div > div > div > div > div";
        const responseData = await getIframeSports(id, selector, urlNBA);

        return res.status(200).json({
            responseData,
            result: "ok",
        });
    } catch (error) {
        return res.status(500).json({
            error: error.toString(),
        });
    }
});

router.get("/boxing/", async (req, res) => {
    try {
        const selector = "#post-3103 > div > div > div > div > div";
        const data = await getListSports(selector, urlBoxing);
        return res.status(200).json({
            data,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.toString(),
        });
    }
});

router.get("/boxing/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const selector = "#post-3103 > div > div > div > div > div";
        const responseData = await getIframeSports(id, selector, urlBoxing);

        return res.status(200).json({
            responseData,
            result: "ok",
        });
    } catch (error) {
        return res.status(500).json({
            error: error.toString(),
        });
    }
});

router.get("/baseball/", async (req, res) => {
    try {
        const selector = "#post-3106 > div > div > div > div > div";
        const data = await getListSports(selector, urlBaseball);

        return res.status(200).json({
            data,
            result: "ok",
        });
    } catch (error) {
        return res.status(500).json({
            error: error.toString(),
        });
    }
});

router.get("/baseball/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const selector = "#post-3106 > div > div > div > div > div";
        const responseData = await getIframeSports(id, selector, urlBaseball);

        return res.status(200).json({
            responseData,
            result: "ok",
        });
    } catch (error) {
        return res.status(500).json({
            error: error.toString(),
        });
    }
});

module.exports = router;
