/*
1 - npm init -> inicializar um projeto node.js
2 - criar arquivo index.js e rodar node index.js
*/

// const a = 10
// const b = 20

// console.log(`O resultado é ${a + b }`)
// passamos uam função com parametro 
// para sisncrozar o resultado
//quando terminar de executar .chama a função de volta 

// function buscarTelefone(nome,cb) {
//     setTimeout(() => {
//          return cb(null,"1121122")
//      }, 2000)
//  }

//  function buscarPessoa(cb) {
//     setTimeout(() => {
//          return cb( null, "Erick")
//      }, 2000)

//  }
//  //passamos a função  como parametro
//  //seguindo a convenção do js
//  //1 - parametro ,erro 
//  //2 para o resultado
//     buscarPessoa(function (erro, sucesso) {
//     if(erro) return console.log('DEU RUIM', erro)

//             buscarPessoa(function (erro, sucesso) {
//             if(erro) return console.log('DEU RUIM', erro)

//             const telefone = buscarTelefone(sucesso,function(erro2, sucesso2){
//             console.log(`
//                  Resutado: A pessoa ${sucesso} tem o telefone
//                      ${sucesso2}`)


//                     })
//              })        
// });


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
//  //para manipular o sucesso 
//  // trabalhamos com o ,then
//  //caso erro usamos o .catch
// buscarPessoa()
//   .then((resultado) =>{
//     console.log('resultado',resultado)
//     buscarPessoa(resultado)
//      .then((resutado2)=>{
//          console.log ('resutado',resultado)
//          return resultado
//          //.then((resultado2)=>{
//         //})
//      })
//    })
//    .catch((erro)=> {
//      console.error('DEU  RUIM',erro)
// })

// // para trabalhar com funçoes assincronas
// // esamos as promises
// //para sucesso -> sucess
// //para error -> error
// //não -> pending

//criando uma função  que se auto executa
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