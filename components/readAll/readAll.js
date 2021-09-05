const express = require("express");
const router = express.Router();

//Middleware especifiar que é esse router que a gente utilizar a 'router'
router.use(function timelog(req, res, next) {
    next();
	//console.log("Time: ", Date.now());
});

router.get("/personagens", async (req, res) => {
    res.send(await getPersonagensValidas());
});

module.exports = router;