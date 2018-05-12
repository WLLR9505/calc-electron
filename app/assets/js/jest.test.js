const main = require('./main.js');
const tl = require('./testList.js');

let tamList = tl.LivroTestes.length;
let i1 = 0;
let i2 = 0;

do {
    let tamTestList = tl.LivroTestes[i1].tests.length;

    for (i2 = 0; i2 < tamTestList; i2++) {
        let expr = tl.LivroTestes[i1].tests[i2].expr;
        let result = tl.LivroTestes[i1].tests[i2].r;
        describe(tl.LivroTestes[i1].titulo + ' ', () => {
            test( expr + ' ' + result , () => {
                expect(main.processarAB(expr)).toEqual(result);
            });
        });
    }
    i1++;
} while (i1 < tamList);
