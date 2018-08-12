// arquivo responsável por habilitar os controles e exibir o conteúdo no visor
var n = 0;
function exibir (txt) {

    if(!isNaN(txt)) {
        if (lblResultado.textContent.length == 24) {
            lblResultado.innerText = 'error';
        } else if (lblResultado.innerText == 'error') {
            LimparVisor();
        } else {
            lblResultado.innerText += txt;
            Limit(lblResultado, 100);
        }
    } else {

        if (lblResultado.textContent == '' && lblTemp.textContent != '') {
            lblTemp.innerText = lblTemp.innerText.replace('=', '');
            lblTemp.innerText += txt;
        } else {
            lblTemp.innerText += lblResultado.textContent + txt;
            lblResultado.innerText = '';
            //caso o Clear seja pressionado a expressão continua no temp, ou seja, será extendida
        }
    }
}

function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth + 30 > element.clientWidth + 30;
}

function Limit(el, fontSize) {
    for (var i = fontSize; i >=0; i--) {
        let overflow = isOverflown(el);
        if (overflow) {
            fontSize-=5;
            el.style.fontSize = fontSize + 'px';
        }
    }
}

function ExibirResultado(expr, r) {
    lblTemp.innerText = expr;
    lblResultado.innerText = r;
    Limit(lblResultado, 100);
}
function swap(n, max, mode) {
    if (mode == 'bin') {
        if (n === 0) {
            return 1;
        } else {
            return 0;
        }
    } else {
        if (n == (max - 1)) {
            return n = 0;
        } else {
            return n + 1;
        }
    }
}

function ResetDisplay() {
    lblResultado.style.fontSize = '100px';
}

function LimparVisor () {
    if (lblTemp.textContent != '' && lblResultado.textContent == '') {
        lblTemp.innerText = '';
    }

    if (lblResultado.textContent != '') {
        lblResultado.innerText = '';
    }
}

function HabilitarControles () {

    lblMore.addEventListener('click', function() {
        ShowMore();
    });
    btnLimpar.addEventListener('click', function() {
        LimparVisor();
        ResetDisplay();
    });

    btnlateral[0].addEventListener('click', function() {
        exibir(btnlateral[0].textContent);
    });//   %
    btnlateral[1].addEventListener('click', function() {
        exibir(btnlateral[1].textContent);
    });//   (
    btnlateral[2].addEventListener('click', function() {
        exibir(btnlateral[2].textContent);
    });//   )
    btnlateral[3].addEventListener('click', function() {
        exibir('*');
    });//   x
    btnlateral[4].addEventListener('click', function() {
        exibir(btnlateral[4].textContent);
    });//   /
    btnlateral[5].addEventListener('click', function() {
        exibir('-');
    });//   -
    btnlateral[6].addEventListener('click', function() {
        exibir(btnlateral[6].textContent);
    });//   +


    btnTeclado[0].addEventListener('click', function () {
        exibir(btnTeclado[0].textContent);
    });//   7
    btnTeclado[1].addEventListener('click', function () {
        exibir(btnTeclado[1].textContent);
    });//   8
    btnTeclado[2].addEventListener('click', function () {
        exibir(btnTeclado[2].textContent);
    });//   9
    btnTeclado[3].addEventListener('click', function () {
        exibir(btnTeclado[3].textContent);
    });//   4
    btnTeclado[4].addEventListener('click', function () {
        exibir(btnTeclado[4].textContent);
    });//   5
    btnTeclado[5].addEventListener('click', function () {
        exibir(btnTeclado[5].textContent);
    });//   6
    btnTeclado[6].addEventListener('click', function () {
        exibir(btnTeclado[6].textContent);
    });//   1
    btnTeclado[7].addEventListener('click', function () {
        exibir(btnTeclado[7].textContent);
    });//   2
    btnTeclado[8].addEventListener('click', function () {
        exibir(btnTeclado[8].textContent);
    });//   3
    btnTeclado[9].addEventListener('click', function () {
        exibir(btnTeclado[9].textContent);
    });//   0
    btnTeclado[10].addEventListener('click', function () {
        exibir(btnTeclado[10].textContent);
    });//   .
    btnTeclado[11].addEventListener('click', function () {
    if (lblTemp.textContent != '') {
        let pos = lblTemp.textContent + lblResultado.textContent;
        let expr = pos + '=';
        ExibirResultado(expr ,CalcPosfix(In2Pos(pos)));
    }
    });//   =
}

var extraOp = [
    ['%', '(', ')'], ['\u221A','\u221B','!'], ['^2', '^3', '^']
];
var duoColor = [
    '#555555','#71c2f8'
]

function ShowMore() {
    n = swap(n, 3, '++');
    btnlateral[0].textContent = extraOp[n][0];
    btnlateral[1].textContent = extraOp[n][1];
    btnlateral[2].textContent = extraOp[n][2];
    lblMore.style.color = duoColor[n];
}
