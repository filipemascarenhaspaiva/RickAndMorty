const express = require("express");
const router = express.Router();

//Middleware especifiar que é esse router que a gente utilizar a 'router'
router.use(function timelog(req, res, next) {
    next();
	//console.log("Time: ", Date.now());
});

router.put("/personagens/:id", async (req, res) => {
    const id = req.params.id;
    const objeto = req.body;

    if (!objeto || !objeto.nome || !objeto.imagemUrl) {
        res.status(400);
        send({
            error:
                "Requisição inválida, certifique-se que tenha os campos nome e imagemUrl",
        });
        return;
    }

    const quantidadePersonagens = await personagens.countDocuments({
        _id: ObjectId(id),
    });

    if (quantidadePersonagens !== 1) {
        res.status(404).send({ error: "Personagem não encontrado" });
        return;
    }

    const result = await personagens.updateOne(
        {
            _id: ObjectId(id),
        },
        {
            $set: objeto,
        }
    );
    //console.log(result);
    //Se acontecer algum erro no MongoDb, cai na seguinte valiadação
    if (result.acknowledged == "undefined") {
        res
            .status(500)
            .send({ error: "Ocorreu um erro ao atualizar o personagem" });
        return;
    }
    res.send(await getPersonagemById(id));
});

module.exports = router;