


const Commander = require('commander')


const Heroi = require('./heroi')
const Database = require('./database')
const DatabaseMongo = require("./databaseMongo");

const commander = Commander
    .version('v1.0.0')
    .option('-n, --nome [value]', "Recebe o nome do Heroi")
    .option('-p, --poder [value]', "Recebe o poder do Heroi")
    .option('-f, --fraqueza [value]', "Recebe a fraqueza do Heroi")
    .option('-c, --cadastrar', "Cadastra um Heroi")
    .option('-l, --listar', "listar os herois do sistema")
    .option('-r, --remover', "remover heroi")
    .option('-a, --atualizar [value]', "Atualizar um heroi por nome ")
    .parse(process.argv);

(async () => {
    
    const database = DatabaseMongo;
    const heroi = new Heroi(commander);
    /*
    node cli.js --cadastrar \
                --nome homem aranha  \
                --poder anel \
                --fraqueza mulher maravi
    
    */
   if (commander.cadastrar) {
        console.log('heroi', heroi)
        await database.cadastrar(heroi)
        process.exit(0);
        return;



    }


     /*
    node cli.js --atualizar  mario -nome 'homem aranha'
     */

    /*
    node cli.js --listar \
    --nome homem aranha  
     */

    if (commander.listar) {
        const dados = await database.listar(heroi.nome)
        console.log('heroi', dados)
        process.exit(0);
        return;

        /*
    node cli.js --remover \
    --nome lanterna  
     */


    }
    if (commander.remover) {
        const dados = await database.remover(heroi.nome)
        console.log(`item removido com sucesso:${heroi.nome}`)
        process.exit(0);
        return
    }
    if (commander.atualizar) {
        const antigoNome = commander.atualizar
        await database.atualizar(antigoNome, heroi.nome)
        console.log(`item ${antigoNome}atualizado no do heroi :${heroi.nome}`)
        process.exit(0);
        return
    }
})()
