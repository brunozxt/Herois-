//quem chamar o herio 
// conte alguns objetos
//-> 
class Heroi {
    //padronizamos uma interface de dados 
    //a 
    constructor({ nome, fraqueza, poder }) {
        this.nome = nome;
        this.fraqueza = fraqueza;
        this.poder = poder;


    }
}
// para exportar a classe 
module.exports = Heroi