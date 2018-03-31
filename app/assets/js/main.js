function checkInternal (variavel)
{
    if (variavel == null || variavel == '' || variavel == undefined)
    { return false; }
    else
    { return true; }
}

class dado
{
    constructor (a, op, b)
    {
        this.a = a;
        this.op = op;
        this.b = b;
        this.r = null;       //armazena o ultimo valor da operação
        this.t = null;       //armazena valor temporario para calcular operações de maior prioridade ('*' e '/')
        this.opT = null;     //armazena operação temporaria
    }
    calcular ()
    {
        if(checkInternal(this.a) == true && checkInternal(this.b) == true)
        {
            switch (this.op)
            {
                case '+':
                    return this.r = Number(this.a) + Number(this.b);
                case '-':
                    return this.r = Number(this.a) - Number(this.b);
                case '*':
                    return this.r = Number(this.a) * Number(this.b);
                case '/':
                    return this.r = Number(this.a) / Number(this.b);
            }
            mem.op = '';
        }
    }
    limparOpB ()
    {
        this.op = '';
        this.b = '';
    }
    limparTudo ()
    {
        this.a = '';
        this.op = '';
        this.b = '';
        this.r = '';
    }
}

var mem = new dado('','','');

function definirModo (string)
{
    var ss = 0;
    var md = 0;
    for (var i = 0; i < string.length; i++)
    {
        if (string[i] == '*' || string[i] == '/')
        {
            md = 1;
        }
        else if (string[i] == '+' || string[i] == '-')
        {
            ss = 1;
        }
    }
    if (ss = 1 && md == 1)
    {
        return 'S';
    }
    else
    {
        return 'A';
    }
}


function processarAB (txt)
{

//NOTE: o calculo de operações mais complexas é dividido em partes, com o apoio de duas
// variáveis temporárias para auxílio, mem.opT e mem.t.
//o calculo de '2+3*4/5=' (4.4) é dividido em partes, quando o for encontra o '*' na
// string ele não calcula '2+3', ele move o 2 de mem.a para mem.t e limpa a, '+' para
// mem.opT e limpa op e mem.b, assim, ficará mem.a = 3 mem.op = * mem.b = 4, e como
// mem.opT e mem.t estão ocupados, existe uma operacao secundária aguardando, assim ele executa a funcao calculoPorPartes() que calcula a op b atuais, move ops temporarios para atuais, limpa os temporario e calcula novamente:
//  '2+3*4/5'
//  '2+12/5'
//  '2+2.4'
//  '4.4'
    var string = new String(txt);    //converte txt para string
    var modo = definirModo(string);  //define o modo:
    //simples para  ('+' e '-') OU ('*' e '/')
    //avançado para  ('*' ou '/') e ('+' ou '-')

    if (modo == 'S')
    {
        modoSimples();
    }
    else
    {
        modoAvancado();
    }

    function caluloPorPartes ()
    {
        mem.calcular();
        console.log('calculando: ' + mem.a + ' ' + mem.op + ' ' + mem.b + ' = ' + mem.r);
        mem.op = mem.opT;        //move os dados temporários
        mem.opT = null;
        mem.a = mem.t;       //move os dados temporários
        mem.t = null;
        mem.b = mem.r;       //move os dados temporários
        mem.calcular();
        console.log('calculando: ' + mem.a + ' ' + mem.op + ' ' + mem.b + ' = ' + mem.r);
        mem.a = mem.r;
        mem.limparOpB();
    }

    function modoSimples ()
    {
        for (var i = 0; i < string.length; i++)
        {   //percorrendo string
            if (Number(string[i]) == Number(string[i]))
            {   //compara se é número
                if ((checkInternal(mem.op) == false && checkInternal(mem.r) == false))
                {     //se primeiro operador não foi encontrado
                    mem.a += string[i];
                    console.log('mem.a: ' + mem.a);
                }
                else
                {    //senão armazena em b
                    mem.b += string[i];
                    console.log('mem.b: ' + mem.b);
                }
            }
            else if (string[i] != '=')
            {
                if (checkInternal(mem.a) == true && checkInternal(mem.b) == true)
                {
                    mem.calcular();
                    console.log('calculando: ' + mem.a + ' ' + mem.op + ' ' + mem.b + ' = ' + mem.r);
                    mem.a = mem.r;
                    mem.limparOpB();
                }
                mem.op = string[i];
                console.log('mem.op: ' + mem.op);
            }
            else
            {
                mem.calcular();
                console.log('calculo final [S]: ' + mem.a + ' ' + mem.op + ' ' + mem.b + ' = ' + mem.r);
            }
        }
    }

    function modoAvancado ()
    {
        for (var i = 0; i < string.length; i++)
        {   //percorrendo string
            if (Number(string[i]) == Number(string[i]))
            {   //compara se é número
                if ((checkInternal(mem.op) == false && checkInternal(mem.r) == false))
                {     //se primeiro operador não foi encontrado
                    mem.a += string[i];
                    console.log('mem.a: ' + mem.a);
                }
                else
                {    //senão armazena em b
                    mem.b += string[i];
                    console.log('mem.b: ' + mem.b);
                }
            }
            else if(string[i] != '=')
            {    //caso seja um op
                if (checkInternal(mem.b) == true && checkInternal(mem.a) == true && checkInternal(mem.op) == true)
                { //se A, B e op não estiverem vazios enão pode calcular
                    if (string[i] == '+' || string[i] == '-')
                    {
                        if (checkInternal(mem.opT) == true && checkInternal(mem.t) == true)
                        { //se as memorias temporárias estão ocupadas
                            caluloPorPartes();
                        }
                        else
                        {
                            mem.calcular();
                            console.log('calculando: ' + mem.a + ' ' + mem.op + ' ' + mem.b + ' = ' + mem.r);
                            mem.limparOpB(); //limpa op e B
                            mem.a = mem.r;   //move resultado para A pois há mais uma operacao
                        }

                    }
                    else
                    {        //caso op seja '*' ou '/' move os valores para memoria temporaria
                        if (checkInternal(mem.opT) == true && checkInternal(mem.t) == true)
                        {
                            mem.calcular();
                            console.log('calculando: ' + mem.a + ' ' + mem.op + ' ' + mem.b + ' = ' + mem.r);
                            mem.a = mem.r;
                            mem.limparOpB();
                        }
                        else
                        {
                            mem.t = mem.a;   //move a para memoria temporaria
                            mem.a = mem.b;
                            mem.opT = mem.op;    //pega op principal e coloca como secundario
                            mem.limparOpB();
                        }
                    }
                }
                mem.op = string[i];
                console.log('mem.op: ' + mem.op);
            }
            else
            {      //para '='
                mem.calcular();
                if (checkInternal(mem.opT) == true && checkInternal(mem.t) == true)
                { //se as memorias temporárias estão ocupadas
                    caluloPorPartes();
                }
                console.log('calculo final [A]: ' + mem.a + ' ' + mem.op + ' ' + mem.b + ' = ' + mem.r);
                mem.limparTudo();
            }
        }
    }
}

processarAB('15453/154*14321/2=');
console.log('estado memoria:   a:' + mem.a + ' op: ' + mem.op + ' b: ' + mem.b + ' r: ' + mem.r);
