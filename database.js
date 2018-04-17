// instalamos a biblioteca para transformar callbacks
// em PROMISES 
// npm i -g bluebird 
// IMPORTANTE, caso sua função, não seguir a convenção callback(erro, sucesso)

const bluebird = require('bluebird')

// para manipular arquivos
// trabalhamos com a lib FS (File System)
const { readFile, writeFile, existsSync } = require('fs')

// para converter uma função de callback em Promise

// a função writeFile recebe um callback como padrão
// para transforma-lo em promises (função assincrona)
// (path, data) => informamos que será retornada uma função
// function (path, data)
// essa função retorna quando chamada uma promise 
// function (path,data) { return new Promise()}
// dentro da promise, chamamos a função nativa do Node
// e em seu callback, fazemos um ternário
// se o erro == qualquer coisa, ele chama o reject 
// se o erro nao existir, chama o resolve da promise
// const writeFileAsync = (path, data) => new Promise((resolve, reject) => {
//     writeFile(path, data, (erro, resultado) => erro ?
//         reject(erro) :
//         resolve(resultado))
// })

// convertemos as funções para promessas com bluebird
// para converter só as funções que voce desejar
// usamos os destructor de Arrays 
// passamos a quantidade de argumentos de itens que queremos extrair


const [writeFileAsync, readFileAsync] = [
    bluebird.promisify(writeFile),
    bluebird.promisify(readFile)
]

// para alterar todas as funções em tempo de execução
// bluebird.promisifyAll(fs)

class Database {
    constructor() {
        this.BANCO_NOME = 'Herois.json'
    }

    async obterDados() {
        if (!existsSync(this.BANCO_NOME)) {
            return []
        }
        // para transformar uma string em JSON (objeto js)
        return JSON.parse(await readFileAsync(this.BANCO_NOME))
    }

    async cadastrar(heroi) {
        const dados = await this.obterDados();
        dados.push(heroi);
        await writeFileAsync(this.BANCO_NOME, JSON.stringify(dados))
        return true;
    }

    async listar(nome) {
        // caso você não precise reutilizar o resultado de uma promise
        // voce não precisa do await
        const dados = await this.obterDados();
        if (!nome) return dados;
        // para filtrar itens de um array, 
        // usamos a função FILTER 
        // passamos uma função que irá iterar em cada item do array
        // colocamos a condição para manter esse item no array
        // e retorna um novo array


        const dadosFiltrados = dados.filter((item) =>
            item.nome.toLowerCase() === nome.toLowerCase())
        return dadosFiltrados;
    }

    async remover(nome) {
        const dados = await this.obterDados()
        const dadosFiltrados = dados.filter((item) =>
            item.nome.toLowerCase()
            !== nome.toLowerCase())

        await writeFileAsync(this.BANCO_NOME,
            JSON.stringify(dadosFiltrados))
    }
    async atualizar(nomeAntigo, nome) {
        const dados = await this.obterDados()


        const dadosMapeados = dados.map(item => {
            if (item.nome.toLowerCase() !== nome.toLowerCase())
                return item
            item.nome = nome;
            return item;

        })
        await writeFileAsync(this.BANCO_NOME,
            JSON.stringify(dadosMapeados))

    }



}


module.exports = Database;