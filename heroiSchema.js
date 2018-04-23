
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
    
    

})();
