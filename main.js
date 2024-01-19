const form = document.getElementById('form-atividade')
const imgAprovado = '<img src="./Imagens/Aprovado.png" alt="Emoji festejando" />'
const imgReprovado = '<img src="./Imagens/Reprovado.png" alt="Emoji decepcionado" />' //consts com a função de voltar para nós o feedback com emojis
const atividades = [] //adição de novas atividades e notas feitas pelo usuario com o Array e o Push
const notas = []
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>'
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>'
const notaMinima = parseFloat(prompt("Digite a nota mínima:"))

let linhas = '' //posta no escopo global por que a fórmula é sempre resetada depois do 'submit'// Fórmula para manter as linhas posta na tela


form.addEventListener('submit', function(e){
    e.preventDefault()
// sequência na qual as funções serão chamadas
    adicionaLinha()
    atualizaTabela()
    atualizaMediaFinal()
})

function adicionaLinha(){ //responsabilidade dessa função é add uma linha nova a tabela
    const inputNomeAtividade = document.getElementById('nome-atividade')
    const inputNotaAtividade = document.getElementById('nota-atividade')

    if(atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade: ${inputNomeAtividade.value} já foi inserida`) // "if" para que não haja atividades com nomes repitidos 
    } else {
        atividades.push(inputNomeAtividade.value)
        notas.push(parseFloat(inputNotaAtividade.value))//parseFloat para números quebrados

    let linha = '<tr>'
    linha += `<td> ${inputNomeAtividade.value} </td>`
    linha += `<td> ${inputNotaAtividade.value} </td>`
    linha += `<td> ${inputNotaAtividade.value >= notaMinima ? /*o "?" significa "if"*/ imgAprovado : imgReprovado} </td>`
    linha += '</tr>'

    linhas += linha 
}

    inputNomeAtividade.value = ''
    inputNotaAtividade.value = ''
}

function atualizaTabela () {
    const corpoTabela = document.querySelector('tbody') //(tbody) referência de onde está nosso código HTML
    corpoTabela.innerHTML = linhas // Inserindo o conteúdo(Código) linha dentro do corpo da tabela// para inserir o conteúdo dentro da tag usamos o .innerHTML
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal()

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2) //"toFixed() para fixar apenas a quantidade determinada "
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado
}

function calculaMediaFinal() {
    let somaDasNotas = 0

    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i]
    }
    return somaDasNotas / notas.length
}
