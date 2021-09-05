const express = require("express");
const router = express.Router();

//Middleware especifiar que é esse router que a gente utilizar a 'router'
router.use(function timelog(req, res, next) {
    next();
	//console.log("Time: ", Date.now());
});

router.delete("/personagens/:id", async (req, res) => {
    const id = req.params.id;
    //Retorna a quantidade de personagens com o filtro(Id) especificado
    const quantidadePersonagens = await personagens.countDocuments({
        _id: ObjectId(id),
    });
    //Checar se existe o personagem solicitado
    if (quantidadePersonagens !== 1) {
        res.status(404).send({ error: "Personagem não encontrao" });
        return;
    }
    //Deletar personagem
    const result = await personagens.deleteOne({
        _id: ObjectId(id),
    });
    //Se não consegue deletar, erro do Mongo
    if (result.deletedCount !== 1) {
        res
            .status(500)
            .send({ error: "Ocorreu um erro ao remover o personagem" });
        return;
    }

    res.send(204);
});

//Tratamento de erros
//Middleware verificar endpoints
app.all("*", function (req, res) {
    res.status(404).send({ message: "Endpoint was not found" });
});

//Middleware -> Tratamento de erro
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || "Internal Server Error",
        },
    });
});


module.exports = router;