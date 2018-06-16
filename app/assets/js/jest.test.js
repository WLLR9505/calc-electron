const in2pos = require('./in2pos.js');
var tl = require('./testList.json');
let tamList = tl.LivroTestes.length;
let i1 = 0;
let i2 = 0;

do {
    let tamTestList = tl.LivroTestes[i1].tests.length;

    for (i2 = 0; i2 < tamTestList; i2++) {
        let expr = tl.LivroTestes[i1].tests[i2].expr;
        let result = tl.LivroTestes[i1].tests[i2].r;

        if(tl.LivroTestes[i1].titulo == 'in2pos') {
            describe(tl.LivroTestes[i1].titulo + ' ', () => {
                test( expr + ' -> ' + result , () => {
                    expect(in2pos.In2Pos(expr)).toEqual(result);
                });
            });
        } else if (tl.LivroTestes[i1].titulo == 'calcPos') {
            describe(tl.LivroTestes[i1].titulo + ' ', () => {
                test( expr + ' = ' + result , () => {
                    expect(in2pos.CalcPosfix(expr)).toEqual(result);
                });
            });
        } else if (tl.LivroTestes[i1].titulo == 'calcPos(in2pos())') {
            describe(tl.LivroTestes[i1].titulo + ' ', () => {
                test( expr + ' = ' + result , () => {
                    expect(in2pos.CalcPosfix(in2pos.In2Pos(expr))).toEqual(result);
                });
            });
        }
    }
    i1++;
} while (i1 < tamList);
