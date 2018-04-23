


function buscarTelefone(nome) {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            return resolve("1121122")
        }, 2000)
    })
}

function buscarPessoa() {

    return new Promise((resolve, reject) => {


        setTimeout(() => {
            return resolve("Erick")
        }, 2000)
    })

}


(async () => {
    try {
        const pessoa = await buscarPessoa();
        const telefone = await buscarTelefone(pessoa);

        console.log(`Nome da pessoa ${pessoa}, telefone ${telefone}`)

    }
    catch (error) {

        console.error('Deu ruim', error)
    }
})()
