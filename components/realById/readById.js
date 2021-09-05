const express = require("express");
const router = express.Router();

//Middleware especifiar que é esse router que a gente utilizar a 'router'
router.use(function timelog(req, res, next) {
    next();
	//console.log("Time: ", Date.now());
});

router.get("/personagens/:id", async (req, res) => {
    const id = req.params.id;
    const personagem = await getPersonagemById(id);
    if (!personagem) {
        res
            .status(404)
            .send({ error: "O personagem especificado não foi encontrado" });
        return;
    }
    res.send(personagem);
});

module.exports = router;