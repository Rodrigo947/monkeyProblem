var Monkey = /** @class */ (function () {
    function Monkey(indexVerticalBar) {
        this.indexVerticalBar = indexVerticalBar;
        this.altitude = 0;
    }
    Monkey.prototype.moveUp = function () {
        this.altitude++;
    };
    Monkey.prototype.changeBar = function (indexNewBar) {
        this.indexVerticalBar = indexNewBar;
    };
    return Monkey;
}());

var R2 = /** @class */ (function () {
    function R2() {
        this.ruleName = 'R2 - Trocar de barra';
    }
    R2.prototype.canMakeAction = function (_a) {
        var monkey = _a.monkey, verticalBars = _a.verticalBars, lastAction = _a.lastAction;
        /*
          Só é possível trocar de barra caso a ultima ação feita não foi a troca de barra
          e o nível que o macaco está na barra possui um conexão com outra barra
        */
        var hasConnection = (verticalBars[monkey.indexVerticalBar].connections[monkey.altitude] != -1);
        return (lastAction !== this.ruleName && hasConnection);
    };
    R2.prototype.action = function (_a) {
        var monkey = _a.monkey, verticalBars = _a.verticalBars;
        var indexNewBar = verticalBars[monkey.indexVerticalBar].connections[monkey.altitude];
        var nameOldBar = verticalBars[monkey.indexVerticalBar].name;
        var nameNewBar = verticalBars[indexNewBar].name;
        monkey.changeBar(indexNewBar);
        return {
            monkey: monkey,
            message: "\n      <div class=\"alert alert-success\" role=\"alert\">\n        O Macaco foi da barra \n          <span class=\"badge rounded-pill bg-dark\">" + nameOldBar + "</span> \n          para a barra \n          <span class=\"badge rounded-pill bg-dark\">" + nameNewBar + "</span>\n      </div>\n        "
        };
    };
    return R2;
}());

var R1 = /** @class */ (function () {
    function R1() {
        this.ruleName = 'R1 - Subir';
    }
    R1.prototype.canMakeAction = function (_a) {
        var monkey = _a.monkey, verticalBars = _a.verticalBars, lastAction = _a.lastAction;
        /*
          Só é possível subir na barra caso não seja possivel trocar de barra
        */
        var r2 = new R2();
        return !r2.canMakeAction({ monkey: monkey, verticalBars: verticalBars, lastAction: lastAction });
    };
    R1.prototype.action = function (_a) {
        var monkey = _a.monkey, verticalBars = _a.verticalBars;
        monkey.altitude++;
        return {
            monkey: monkey,
            message: "\n      <div class=\"alert alert-success\" role=\"alert\">\n        O Macaco subiu na barra \n          <span class=\"badge rounded-pill bg-dark\">\n            " + verticalBars[monkey.indexVerticalBar].name + " \n          </span> \n      </div>\n      "
        };
    };
    return R1;
}());

var VerticalBar = /** @class */ (function () {
    function VerticalBar(name, connections, hasBanana) {
        this.name = name;
        this.connections = connections;
        this.hasBanana = hasBanana;
    }
    return VerticalBar;
}());

/**
 * @param indexInitialBar barra escolhida
 * @param orderType ordem que as regras de transição serão executadas
*/
function start(indexInitialBar, orderType) {
    var verticalBars = [];
    var rules = [];
    var maxAltitude = 17;
    /*
      Carga de estados
    */
    var b0 = new VerticalBar('B0', [1, 1, 1, -1, -1, -1, 1, -1, 1, -1, -1, -1, -1, -1, 1, -1, -1, -1], false);
    var b1 = new VerticalBar('B1', [0, 0, 0, 2, -1, -1, 0, -1, 0, 2, 2, -1, -1, 2, 0, -1, 2, 2], false);
    var b2 = new VerticalBar('B2', [-1, 3, 3, 1, -1, 3, 3, 3, 3, 1, 1, -1, 3, 1, -1, -1, 1, 1], false);
    var b3 = new VerticalBar('B3', [-1, 2, 2, -1, 4, 2, 2, 2, 2, -1, -1, 4, 2, -1, -1, 4, -1, -1], false);
    var b4 = new VerticalBar('B4', [-1, -1, -1, -1, 3, 5, -1, -1, -1, -1, -1, 3, 5, -1, -1, 3, -1, -1], false);
    var b5 = new VerticalBar('B5', [-1, 6, 6, -1, 6, 4, -1, -1, -1, -1, 6, -1, 4, -1, -1, -1, -1, -1], false);
    var b6 = new VerticalBar('B6', [-1, 5, 5, -1, 5, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1], true);
    verticalBars.push(b0);
    verticalBars.push(b1);
    verticalBars.push(b2);
    verticalBars.push(b3);
    verticalBars.push(b4);
    verticalBars.push(b5);
    verticalBars.push(b6);
    /*
      Index da barra de onde o macaco irá começar
    */
    var monkey = new Monkey(indexInitialBar);
    var lastAction = 'Estado Inicial';
    /*
      Definindo a ordem que as regras de transição serão executadas
    */
    var r1 = new R1();
    var r2 = new R2();
    switch (orderType) {
        case 1:
            rules = [r1, r2];
            break;
        case 2:
            rules = [r2, r1];
            break;
    }
    /*
      Limpando a tela do console
    */
    var console = document.getElementById('console');
    console.innerHTML = '';
    /*
      Executar as regras de transição até que o macaco atinja a altitude maxima
    */
    while (monkey.altitude != maxAltitude) {
        rules.forEach(function (rule) {
            if (rule.canMakeAction({ monkey: monkey, verticalBars: verticalBars, lastAction: lastAction })) {
                var result = rule.action({ monkey: monkey, verticalBars: verticalBars, lastAction: lastAction });
                lastAction = rule.ruleName;
                monkey = result.monkey;
                console.innerHTML += result.message;
            }
            else {
                console.innerHTML += "\n          <div class=\"alert alert-danger\" role=\"alert\">\n            N\u00E3o foi poss\u00EDvel executar a regra \n              <span class=\"badge rounded-pill bg-dark\">\n                " + rule.ruleName + "\n              </span> \n          </div> \n        ";
            }
        });
    }
    /*
      Verificando o Estado Final: o macaco está na mesma barra da banana?
    */
    if (verticalBars[monkey.indexVerticalBar].hasBanana) {
        console.innerHTML += "\n      <div class=\"alert alert-warning\" role=\"alert\">\n        O Macaco achou a banana \n      </div> \n    ";
    }
    else {
        console.innerHTML += "\n    <div class=\"alert alert-dark\" role=\"alert\">\n      O Macaco n\u00E3o achou a banana \n    </div> \n  ";
    }
}
var btnStart = document.getElementById('btnStart');
btnStart.addEventListener('click', function () {
    // Barra escolhida 
    var chosedBar = parseInt(document.getElementById('chosedBar').value);
    // Verificando qual opção de transição foi escolhida
    var chosedTransition = 1;
    document.getElementsByName('ruleTransitionOptions').forEach(function (optionRadio) {
        if (optionRadio.checked) {
            chosedTransition = parseInt(optionRadio.value);
        }
    });
    start(chosedBar, chosedTransition);
});
