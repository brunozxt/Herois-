12



const HapiJwt = require("hapi-auth-jwt2");
const Jwt = require("jsonwebtoken");



const JWT_KEY = "MINHA_CHAVE_SEGURA";

const USUARIO_VALIDO = {
    email: "XuxadaSilva@gmail.com",
    senha: "123",
};

const joi = require("joi");

const Hapi = require("hapi");


const Inert = require("inert");

const Vision = require("vision");

const HapiSwagger = require("hapi-swagger");


const app = new Hapi.Server();
app.connection({ port: 3000 });
const Database = require("./databaseMongo");
const Heroi = require("./heroi");

(async () => {
    
    await app.register(HapiJwt);
    await app.register([
        Vision,
        Inert,
        {
            register: HapiSwagger,
            options: { info: { version: "1.0", title: "API de Herois" } },
        },
    ]);

    app.auth.strategy("jwt", "jwt", {
        key: JWT_KEY,
        validateFunc: (tokenDescriptogrado, request, callback) => {
            

            return callback(null, true);
        },
        verifyOptions: { algorithms: ["HS256"] },
    });

    app.auth.default("jwt");
    app.route([
        {
            path: "/login",
            method: "POST",
            handler: async (req, reply) => {
                const { email, senha } = req.payload;

                if (
                    USUARIO_VALIDO.email.toLowerCase() !== email.toLowerCase() ||
                    USUARIO_VALIDO.senha !== senha
                )
                    return reply("Usuario ou senha inválidos");

                const token = Jwt.sign({ _id: 123123 }, JWT_KEY, { expiresIn: "30m" });

                return reply({ token });
            },
            config: {
               
                auth: false,
                tags: ["api"],
                description: "Login de usuario",
                notes: "Deve logar um usuario",
                validate: {
                    payload: {
                        email: joi
                            .string()
                            .email()
                            .required(),
                        senha: joi
                            .string()
                            .max(100)
                            .required(),
                    },
                },
            },
        },

        {
            path: "/herois",
            method: "GET",
            handler: async (req, reply) => {
                try {
                    const { query } = req;
                    const result = await Database.listar(query.nome);
                    return reply(result);
                } catch (erro) {
                    console.erro("DEU RUIM", erro);

                    return reply("Erro interno");
                }
            },
            config: {
                
                tags: ["api"],
                description: "Listar Herois",
                notes: "Deve listar herois e filtrar por nome",
                validate: {
                    
                    query: {
                        nome: joi.string().max(100),
                    },
                    headers: joi
                        .object({
                            authorization: joi.string().required(),
                        })
                        .unknown(),
                },
            },
        },
        {
            path: "/herois",
            method: "POST",
            handler: async (req, reply) => {
                try {
                    const { payload } = req;
                    const heroi = new Heroi(payload);
                    const { _id } = await Database.cadastrar(heroi);

                    return reply({ result: { _id } });
                } catch (error) {
                    console.error("DEU RUIM", error);
                    return reply("INTERNAL ERRO").code(500);
                }
            },

            config: {
                tags: ["api"],
                description: "Cadastrar um heroi",
                notes: "Deve cadastrar um heroi",
                validate: {
                    payload: {
                        nome: joi
                            .string()
                            .required()
                            .max(20),

                        poder: joi
                            .string()

                            .required()
                            .max(10),

                        fraqueza: joi
                            .string()
                            .required()
                            .max(20),
                    },
                },
            },
        },
        {
            path: "/herois/{id}",
            method: "PATCH",
            handler: async (req, reply) => {
                try {
                    // nosso database, recebe o nome antigo
                    // e o nome novo
                    // para manter o padrão rest, deixamos o nome da propriedade
                    // como ID, pois na prática, modificamos e removemos itens
                    // pelo ID.
                    const { id } = req.params;
                    const heroi = new Heroi(req.payload);
                    // caso queira pegar somente as propriedades que contenham
                    // valor, usamos o método abaixo
                    // como usaremos somente o nome, não precisamos
                    // remover os outros itens

                    // // para remover as propriedades que virão nulos da classe
                    // Object.keys(heroi).forEach(item => {
                    //   // caso tenha valor em heroi[item] > heroi.poder
                    //   // temos duas formas de acessar objetos javascript
                    //   // heroi.propriedade
                    //   // heroi[propriedade]
                    //   if (heroi[item]) return;

                    //   // removemos a chave do objeto
                    //   delete heroi[item];
                    // });

                    const result = await Database.atualizar(id, heroi.nome);
                    return reply(result);
                } catch (error) {
                    console.error("DEU RUIM", error);
                    return reply("ERRO").code(500);
                }
            },
            config: {
                tags: ["api"],
                description: "Atualizar um heroi",
                notes: "Deve atualizar um heroi por nome",
                validate: {
                    payload: {
                        nome: joi
                            .string()
                            .max(20)
                            .required(),
                        // poder: joi.string().max(10),
                        // fraqueza: joi.string().max(20),
                    },
                    params: {
                        id: joi.string().required(),
                    },
                },
            },
        },
        {
            path: "/herois/{id}",
            method: "DELETE",
            config: {
                tags: ["api"],
                description: "Deve remover um heroi",
                notes: "Remover um heroi por nome",
                validate: {
                    params: {
                        id: joi.string().required(),
                    },
                },
            },
            handler: async (req, reply) => {
                try {
                    const { id } = req.params;
                    const result = await Database.remover(id);

                    return reply(result);
                } catch (error) {
                    console.error("DEU RUIM", error);
                    return reply("ERRO INTERNO").code(500);
                }
            },
        },
    ]);

    await app.start();
    console.log("servidor rodando...");
})();
