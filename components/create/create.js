const express = require("express");
const router = express.Router();

//Middleware especifiar que é esse router que a gente utilizar a 'router'
router.use(function timelog(req, res, next) {
    next();
	//console.log("Time: ", Date.now());
});

router.post("/personagens", async (req, res) => {
    const objeto = req.body;

    if (!objeto || !objeto.nome || !objeto.imagemUrl) {
        res.status(400).send({
            error:
                "Personagem inválido, certifique-se que tenha os campos nome e imagemUrl",
        });
        return;
    }

    const result = await personagens.insertOne(objeto);

    console.log(result);
    //Se ocorrer algum erro com o mongoDb esse if vai detectar
    if (result.acknowledged == false) {
        res.status(500).send({ error: "Ocorreu um erro" });
        return;
    }

    res.status(201).send(objeto);
});

module.exports = router;