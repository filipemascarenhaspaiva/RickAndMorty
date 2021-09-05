const express = require("express");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
require("dotenv").config();
require("express-async-errors");
//requires de endpoints
const home = require("./components/home/home");
const readAll = require("./components/readAll/readAll");
const readById = require("./components/readById/readById");
const create = require("./components/create/create");
const update = require("./components/update/update");
const delet = require("./components/delete/delet");

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

	const db = client.db("db_rickmorty");
	const personagens = db.collection("RickMorty");

	const getPersonagensValidas = () => personagens.find({}).toArray();

	const getPersonagemById = async (id) =>
		personagens.findOne({ _id: ObjectId(id) });

	//CORS

	app.all("/*", (req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");

		res.header("Access-Control-Allow-Methods", "*");

		res.header(
			"Access-Control-Allow-Headers",
			"Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization"
		);

		next();
	});

	//Criando a rota home
	app.use("/home", home);

	//Criando a rota readAll
	app.use("/readAll", readAll);

	//Criando a rota readById
	app.use("/readById", readById);

	//Criando a rota create
	app.use("/create", create);

	//Criando a rota update
	app.use("/update", update);

	//Criando a rota delete
	app.use("/delete", delet);

	app.listen(port, () => {
		console.info(`App rodando em http://localhost:${port}/home`);
	});
})();