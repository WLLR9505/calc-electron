//arquivo responsável por montar a Calculadora

var calcAltura = 1100;
var calcLargura = 620;

var render = document.getElementById('render');
var btnlateral = [ 7 ];
var btnTeclado = [ 12 ];

var calc = document.createElement('div');
calc.setAttribute('id', 'calc');
calc.style.width = calcLargura + 'px';
calc.style.height = calcAltura + 'px';
calc.style.textAlign = 'center';

var lblResultado = document.createElement('div');
lblResultado.setAttribute('id', 'resultado');
lblResultado.innerText = '2';

var lblTemp = document.createElement('div');
lblTemp.setAttribute('id', 'memoria');
lblTemp.innerText = '0.5*2+1=';

var lblMore = document.createElement('div');
lblMore.setAttribute('id', 'lblMore');
lblMore.innerText = 'Show More \u221Ax';

var btnLimpar = document.createElement('div');
btnLimpar.setAttribute('id', 'limpar');
btnLimpar.setAttribute('class', 'btnLimpar');
btnLimpar.innerText = 'Clear';

var teclas = document.createElement('div');
teclas.setAttribute('id', 'teclas');

var visor = document.createElement('table');
visor.setAttribute('id', 'visor');

var op = document.createElement('div');
op.setAttribute('id', 'op');

window.addEventListener('load', Ativar, false);

function Ativar () {
    CriaElementos();
    calc.appendChild(visor);
    calc.appendChild(op);
    calc.appendChild(teclas);
    render.appendChild(calc);

    DefinirLayout([ 1, 2 ], [ lblTemp, lblResultado ], visor, 'visorSUP', false, 'SUP');
    DefinirLayout([ 2, 1 ] , [ lblMore, btnLimpar ] , visor, 'visorINF', false, 'INF');

    DefinirLayout([ 1, 7 ], btnlateral, op, 'op', true, '');
    DefinirLayout([ 3, 4 ], btnTeclado, teclas, 'teclas', true, '');

}

function CriaElementos () {
    btnlateral[0] = criarCelula('%', 'btnlateral', '');
    btnlateral[1] = criarCelula('(', 'btnlateral', '');
    btnlateral[2] = criarCelula(')', 'btnlateral', '');
    btnlateral[3] = criarCelula('\xD7', 'btnlateral', 'op_mult');
    btnlateral[4] = criarCelula('/', 'btnlateral', 'op_div');
    btnlateral[5] = criarCelula('\u2212', 'btnlateral', 'op_sub');
    btnlateral[6] = criarCelula('+', 'btnlateral', 'op_soma');

    btnTeclado[0] = criarCelula('7', 'btnTeclado', 'btnNum');
    btnTeclado[1] = criarCelula('8', 'btnTeclado', 'btnNum');
    btnTeclado[2] = criarCelula('9', 'btnTeclado', 'btnNum');
    btnTeclado[3] = criarCelula('4', 'btnTeclado', 'btnNum');
    btnTeclado[4] = criarCelula('5', 'btnTeclado', 'btnNum');
    btnTeclado[5] = criarCelula('6', 'btnTeclado', 'btnNum');
    btnTeclado[6] = criarCelula('1', 'btnTeclado', 'btnNum');
    btnTeclado[7] = criarCelula('2', 'btnTeclado', 'btnNum');
    btnTeclado[8] = criarCelula('3', 'btnTeclado', 'btnNum');
    btnTeclado[9] = criarCelula('0', 'btnTeclado', 'btnNum');
    btnTeclado[10] = criarCelula('.', 'btnTeclado', 'btnPt');
    btnTeclado[11] = criarCelula('=', 'btnTeclado', 'btn_igual');
}


function criarCelula (txt, classe, id) {                                   //Texto do botão / ALTURA x LARGURA / escrever no render?
    var botao = document.createElement('div');
    botao.setAttribute('class', classe);
    botao.setAttribute('id', id);
    botao.innerHTML = txt;

    botao.style.width = '100%';
    return botao;                                                                       //retorna a div e suas propriedades
}

function DefinirLayout (tamanho = [ 2 ], conteudo = [], posicao, id, tamanhoAuto, tdId) {                          //coluna x linha

    var nAtual = 0;
    var tabTayout = document.createElement('table');
    tabTayout.setAttribute('id', id);

    for (let index = 0; index < tamanho[1]; index++) {                                  //até LINHA
        var linha = document.createElement('tr');                                       //cria tag <tr> LINHA
        for (let index2 = 0; index2 < tamanho[0]; index2++) {                           //até COLUNA

            if (conteudo[nAtual] == undefined) { break; }

            var coluna = document.createElement('td');                                  //cria tag <td> CELULA

            if (tdId != '') {
                coluna.setAttribute('id', tdId + conteudo[nAtual].id);
                //utilizado para identificar células caso seja necessário aplicar estilo a elas
            }

            if (tamanhoAuto == true) {
                coluna.style.width = (100 / tamanho[0]) + '%';                              //faz com que a largura seja distribuida na tabela
            }
            coluna.appendChild(conteudo[nAtual]);                                       //preenche a coluna com um botão
            linha.appendChild(coluna);                                                  //coloca as colunas dentro das linhas
            nAtual++;
        }
        if (tamanhoAuto == true) {
            linha.style.height = (100 / tamanho[1]) + '%';                                  //faz com que a altura seja distribuida na tabela
        }
        tabTayout.appendChild(linha);                                                   //coloca as linhas dentro da tabTayoutela
    }
    if (tamanhoAuto == true) {
        tabTayout.style.height = '100%';
        tabTayout.style.width = '100%';
    }
    posicao.appendChild(tabTayout);                                                     //coloca a tabela dentro da calc
    calc.appendChild(posicao);
}
