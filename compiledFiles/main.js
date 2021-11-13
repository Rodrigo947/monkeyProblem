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
        /*
          Só é possível trocar de barra caso a ultima ação feita não foi a troca de barra
          e o nível que o macaco está na barra possui um conexão com outra barra
        */
        var monkey = _a.monkey, verticalBars = _a.verticalBars, lastAction = _a.lastAction;
        var hasConnection = (verticalBars[monkey.indexVerticalBar].conections[monkey.altitude] != -1);
        return (lastAction !== this.ruleName && hasConnection);
    };
    R2.prototype.action = function (_a) {
        var monkey = _a.monkey, verticalBars = _a.verticalBars;
        var indexNewBar = verticalBars[monkey.indexVerticalBar].conections[monkey.altitude];
        var nameOldBar = verticalBars[monkey.indexVerticalBar].name;
        var nameNewBar = verticalBars[indexNewBar].name;
        monkey.changeBar(indexNewBar);
        return {
            monkey: monkey,
            message: "O Macaco foi da barra " + nameOldBar + " para a barra " + nameNewBar + "\n"
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
            message: "O Macaco subiu na barra " + verticalBars[monkey.indexVerticalBar].name + "\n"
        };
    };
    return R1;
}());

var VerticalBar = /** @class */ (function () {
    function VerticalBar(name, conections, hasBanana) {
        this.name = name;
        this.conections = conections;
        this.hasBanana = hasBanana;
    }
    return VerticalBar;
}());

//let b6 = new VerticalBar('B6',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],false)
/*
  Carga de estados
*/
var verticalBars = [];
var maxAltitude = 17;
var b0 = new VerticalBar('B0', [1, 1, 1, -1, -1, -1, 1, -1, 1, -1, -1, -1, -1, -1, 1, -1, -1, -1], false);
var b1 = new VerticalBar('B1', [0, 0, 0, 2, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, 2, 2], false);
var b2 = new VerticalBar('B2', [-1, 3, 3, 1, -1, 3, 3, 3, 3, 1, 1, -1, 3, 1, -1, -1, 2, 2], false);
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
  Ordem que as regras de transição serão executadas
*/
var orderType = 2;
var r1 = new R1();
var r2 = new R2();
var lastAction = 'estadoInicial';
var rules = [];
switch (orderType) {
    case 1:
        rules = [r1, r2];
        break;
    case 2:
        rules = [r2, r1];
        break;
}
function start() {
    /*
      Index da barra de onde o macaco irá começar
    */
    var indexInitialBar = parseInt(document.getElementById('chosedBar').value) || 0;
    var monkey = new Monkey(indexInitialBar);
    var console = document.getElementById('console');
    console.value = '';
    while (monkey.altitude != maxAltitude) {
        rules.forEach(function (rule) {
            if (rule.canMakeAction({ monkey: monkey, verticalBars: verticalBars, lastAction: lastAction })) {
                var result = rule.action({ monkey: monkey, verticalBars: verticalBars, lastAction: lastAction });
                lastAction = rule.ruleName;
                monkey = result.monkey;
                console.value += result.message;
            }
            else {
                console.value += "N\u00E3o foi poss\u00EDvel executar a regra " + rule.ruleName + "\n";
            }
        });
    }
    /*
      Verificando o Estado Final: o macaco está na mesma barra da banana?
    */
    if (verticalBars[monkey.indexVerticalBar].hasBanana) {
        console.value += "O macaco achou a banana";
    }
    else {
        console.value += "O macaco n\u00E3o achou a banana";
    }
}
var btnStart = document.getElementById('btnStart');
btnStart.addEventListener('click', function (e) { return start(); });
