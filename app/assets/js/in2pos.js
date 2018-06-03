function pilhaDado () {
    this.dado = new Array();
    this.empilhar = function (expr) {
        this.dado.push(expr);
    };
    this.desempilhar = function () {
        return this.dado.pop();
    };
    this.calcular = function (op) {
        let a = this.dado[this.dado.length - 2];
        let b = this.dado[this.dado.length - 1];
        this.dado.pop();
        this.dado.pop();
        switch (op) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return a / b;
            case '^':
                return Math.pow(a, b);
        }
    };
}

function MatSimb (txt) {
    if (txt === '+' || txt === '-' || txt === '/' || txt === '*' || txt === '^') {
        return true;
    } else {
        return false;
    }
}

function prior (c, t) {
    var pc, pt;
    if (c == '^') {
        pc = 4;
    } else if (c == '*' || c == '/') {
        pc = 2;
    } else if (c == '+' || c == '-') {
        pc = 1;
    } else if (c == '(') {
        pc = 4;
    }

    if (t == '^') {
        pt = 3;
    } else if (t == '*' || t == '/') {
        pt = 2;
    } else if (t == '+' || t == '-') {
        pt = 1;
    } else if (t == '(') {
        pt = 0;
    }

    return (pc > pt);
}

function CalcPosfix (posfix) {
    var pilha = new pilhaDado();
    let r;
    for (var i = 0; i < posfix.length; i++) {
        if (MatSimb(posfix[i]) === true) {
            pilha.empilhar(pilha.calcular(posfix[i]));
        } else {
            pilha.empilhar(posfix[i]);
        }
    }
    console.log(pilha.dado);
    return r = pilha.desempilhar();
}

function In2Pos (txt) {
    var exprPosfix = new Array();
    var pilha = new pilhaDado();
    var t;

    pilha.empilhar('(');
    for (var i = 0; i < txt.length; i++) {
        if (txt[i] === '(') {
            pilha.empilhar('(');
        } else if (isNaN(txt[i]) === false) {
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
        } else if (MatSimb(txt[i]) === true) {
            while (true) {
                t = pilha.desempilhar();
                if (prior(txt[i], t)) {
                    pilha.empilhar(t);
                    pilha.empilhar(txt[i]);
                    break;
                } else {
                    exprPosfix.push(t);
                }
            }
        } else if (txt[i] === ')' || txt[i] === undefined) {
            do {
                t = pilha.desempilhar();
                if (t != '(') {
                    exprPosfix.push(t);
                }
            } while (t != '(');
        }
    }
    while (pilha.dado.length > 0) {
        var atual = pilha.dado.length;
        if (pilha.dado[atual - 1] != '(') {
            exprPosfix.push(pilha.dado[atual - 1]);
        }
        pilha.desempilhar();
    }
    console.log(exprPosfix);
    return exprPosfix;
}

// var expr = '(1721+2)/(325-4763)';
// CalcPosfix(In2Pos(expr));

try {
    //tenta exportar para fazer testes no jest
    module.exports = { In2Pos , CalcPosfix };
} catch(e) {
    console.log('module.exports inutilizado');
}
