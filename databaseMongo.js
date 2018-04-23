

const heroiSchema = require('./heroiSchema')

class DatabaseMongo {
    static cadastrar(heroi) {
        return heroiSchema.create(heroi);
    }


    static listar(nome) {
       
          
        return heroiSchema.find({ nome: { $regex: `.*$a{nome || ""}.*`, $options: "i" } }, { __v: 0 });
    }

    static remover(nome) {
        return heroiSchema.remove({ nome })

    }

    static atualizar(nomeAntigo, nome) {
        return heroiSchema.update({ nome: nomeAntigo }, { $set: { nome } })
    }



}
module.exports = DatabaseMongo
