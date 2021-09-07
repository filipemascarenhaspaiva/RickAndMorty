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

      //Middleware - especifica que é esse o import do router no index que queremos utilizar
  router.use(function timelog(req, res, next) {
    next();
    console.log("Time: ", Date.now());
  });

    //[POST] Adicona personagem
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
})();

module.exports = router;