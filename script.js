const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-tasks')

var itens = []
    
function addTarefa(){
    if (input.value === ''){
        alert('Você não pode adicionar uma tarefa vazia!')
        return;
}

    itens.push({
        tarefa: input.value,
        concluida: false,
    })
    input.value = ''

    mostrarTarefa()
}

function mostrarTarefa(){
    var novaLi = ''
    itens.forEach((item, posicao) => {
        novaLi = novaLi + `
            <li class="task ${item.concluida && "done"}">
                <img src="./img/checked.png" alt="check-tarefa" onclick="tarefaConcluida(${posicao})">
                <p>${item.tarefa}</p>
                <img src="./img/trash.png" alt="trash-tarefa" onclick="deletar(${posicao})">
            </li>
                `
    })

    listaCompleta.innerHTML = novaLi

    localStorage.setItem('lista', JSON.stringify(itens))


}

function tarefaConcluida(posicao){

    itens[posicao].concluida = !itens[posicao].concluida

    mostrarTarefa()
}

function deletar(posicao){

    itens.splice(posicao, 1)
    mostrarTarefa()
}

function recarregarTela(){
    var tarefasLocalStorage = localStorage.getItem('lista')

    if(tarefasLocalStorage){
        itens = JSON.parse(tarefasLocalStorage)
    }

    mostrarTarefa()
}

recarregarTela()
button.addEventListener('click', addTarefa)
