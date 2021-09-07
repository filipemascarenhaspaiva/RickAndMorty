const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
require("dotenv").config();
require("express-async-errors");
var cors = require("cors");
(async () => {
	const dbUser = process.env.DB_USER;
	const dbPassword = process.env.DB_PASSWORD;
	const dbName = process.env.DB_NAME;
	const dbChar = process.env.DB_CHAR;

	const app = express();
	app.use(express.json());

	const port = process.env.PORT || 3000;
	const connectionString = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.${dbChar}.mongodb.net/${dbName}?retryWrites=true&w=majority`;

	const options = {
		useUnifiedTopology: true,
	};

	console.info("Conectando ao MongoDB Atlas...");

	const client = await mongodb.MongoClient.connect(connectionString, options);

	console.info("Conexão estabelecida com o MongoDB Atlas!");

	const db = client.db("db_blue_rick");
	const personagens = db.collection("personagens");

	const getPersonagensValidas = () => personagens.find({}).toArray();

	const getPersonagemById = async (id) =>
		personagens.findOne({ _id: ObjectId(id) });
        app.delete("/personagens/:id", async (req, res) => {
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
    })();
module.exports = router;    