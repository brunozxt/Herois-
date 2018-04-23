

const bluebird = require('bluebird')


const { readFile, writeFile, existsSync } = require('fs')


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
        
        return JSON.parse(await readFileAsync(this.BANCO_NOME))
    }

    async cadastrar(heroi) {
        const dados = await this.obterDados();
        dados.push(heroi);
        await writeFileAsync(this.BANCO_NOME, JSON.stringify(dados))
        return true;
    }

    async listar(nome) {
        
        const dados = await this.obterDados();
        if (!nome) return dados;
        /


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
