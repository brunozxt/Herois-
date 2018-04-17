//npm i --save inert@4 vision@4 hapi-sawagger@7

const heroiSchema = require('./heroiSchema')

class DatabaseMongo {
    static cadastrar(heroi) {
        return heroiSchema.create(heroi);
    }


    static listar(nome) {
        //{nome:nome}
        //caso a chave do seu json for 
        // igual  ado jds que vc presisa passar a função
        //{nome}
        //pRA FILTRA noso obijrto  
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