// https://www.youtube.com/watch?v=pWT-KF0Z2fA&t=102s
// https://www.facebook.com/groups/h4treinamentos/

// https://www.facebook.com/events/2027744037493186/


// instalamos o Mongoose para validar e gerenciar
// modelos de dados do MongoDB
// npm i --save mongoose
const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    poder: {
        type: String,
        required: true,
    },
    fraqueza: {
        type: String,
        required: true,
    },
    insertedAt: {
        type: Date,
        default: new Date(),
    },
});

const model = mongoose.model("heroi", Schema);


(async () => {
    mongoose.connect("mongodb://localhost/marvel");
    const connection = mongoose.connection;
    connection.once("open", () => console.log("banco rodando!!"));
    connection.once("error", e => console.error("Deu Ruim!", e));
    module.exports = model;
    //     await model.create({
    //         nome: 'Sherlock',
    //         poder: 'eqwr',
    //         fraqueza: "fraco",
    //     })
    //     console.log("result", await model.findOneAndRemove())

})();
