function pilhaDado () {
    this.dado = new Array();
    this.empilhar = function (expr) {
        this.dado.push(expr);
    };
    this.desempilhar = function () {
        this.dado.shift();
    };
}

function In2Pos (txt) {
    /* NOTE: regras conversão Infix para exprPosfix (usando array para números maiores que 9)
    1 - se for ( descartar
    2 - se for operando incluir no array exprPosfix
    3 - se for operador colocar na pilha
        3.1 - se o operador que entra for '+' ou '-' e operador da pilha for '+' ou '-' entao desempilhar, colocar em posfix e empilha o operador que entra
    4 - se for ) descartar, colocar o ultimo operador da pilha no array exprPosfix
    */

    var exprPosfix = new Array();
    var pilha = new pilhaDado();

    // pilha.empilhar('(');
    for (var i = 0; i < txt.length; i++) {
        // console.log(txt[i]);

        if (txt[i] === '(') {
            //1
            continue;
        } else if (isNaN(txt[i]) === false) {
            //2
            var n = i;
            var num = ''; //armazena valores maiores que 9
            while ((isNaN(txt[n]) === false) || txt[n] === '.') {
                num = num.concat(txt[n]);
                n++;
            }
            if (n != i + 1) {
                i = n - 1; //significa que o txt[i] era maior que 9;
                //n - 1 pois o while soma 1 na ultima passagem para dar falso e sair do loop
            }
            exprPosfix.push(Number(num));
        } else if (txt[i] === '-' || txt[i] === '+' || txt[i] === '*' || txt[i] === '/') {
            //3
            if ((pilha.dado[pilha.dado.length - 1] === '+' || pilha.dado[pilha.dado.length - 1] === '-') && (txt[i] === '-' || txt[i] === '+')) {
                exprPosfix.push(pilha.dado[pilha.dado.length - 1]);
                pilha.dado.pop();
            }
            pilha.empilhar(txt[i]);
        } else if (txt[i] === ')') {
            //4
            //inclui na exprPosfix o ultimo valor da pilha
            exprPosfix.push(pilha.dado[pilha.dado.length - 1]);
            //remove o ultimo valor da pilha
            pilha.dado.pop();
        }
    }
    while (pilha.dado.length > 0) {
        var atual = pilha.dado.length;
        exprPosfix.push(pilha.dado[atual - 1]);
        pilha.dado.pop();
    }
    console.log(exprPosfix);
    return exprPosfix;
}

// In2Pos('1-20+3');

try {
    //tenta exportar para fazer testes no jest
    module.exports = { In2Pos };
} catch(e) {
    console.log('module.exports inutilizado');
}