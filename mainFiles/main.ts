import Monkey from "./Monkey"
import ITransitionRule from "./rules/ITransitionRule"
import R1 from "./rules/R1"
import R2 from "./rules/R2"
import VerticalBar from "./VerticalBar"

//let b6 = new VerticalBar('B6',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],false)

/* 
  Carga de estados 
*/
let verticalBars: Array<VerticalBar> = []
const maxAltitude = 17

let b0 = new VerticalBar('B0',[1,1,1,-1,-1,-1,1,-1,1,-1,-1,-1,-1,-1,1,-1,-1,-1],false)
let b1 = new VerticalBar('B1',[0,0,0,2,-1,-1,-1,-1,-1,2,2,-1,-1,-1,-1,-1,2,2],false)
let b2 = new VerticalBar('B2',[-1,3,3,1,-1,3,3,3,3,1,1,-1,3,1,-1,-1,2,2],false)
let b3 = new VerticalBar('B3',[-1,2,2,-1,4,2,2,2,2,-1,-1,4,2,-1,-1,4,-1,-1],false)
let b4 = new VerticalBar('B4',[-1,-1,-1,-1,3,5,-1,-1,-1,-1,-1,3,5,-1,-1,3,-1,-1],false)
let b5 = new VerticalBar('B5',[-1,6,6,-1,6,4,-1,-1,-1,-1,6,-1,4,-1,-1,-1,-1,-1],false)
let b6 = new VerticalBar('B6',[-1,5,5,-1,5,-1,-1,-1,-1,-1,5,-1,-1,-1,-1,-1,-1,-1],true)

verticalBars.push(b0)
verticalBars.push(b1)
verticalBars.push(b2)
verticalBars.push(b3)
verticalBars.push(b4)
verticalBars.push(b5)
verticalBars.push(b6)


/*
  Ordem que as regras de transição serão executadas
*/
const orderType: number = 2
const r1 = new R1()
const r2 = new R2()
let lastAction: string = 'estadoInicial'

let rules: Array<ITransitionRule> = []

switch (orderType) {
  case 1:
    rules = [r1,r2]
    break
  
  case 2:
    rules = [r2,r1]
    break
}

function start(): void{
  /*
    Index da barra de onde o macaco irá começar
  */
  const indexInitialBar = parseInt((document.getElementById('chosedBar') as HTMLInputElement).value) || 0
  let monkey = new Monkey(indexInitialBar)

  /*
    Limpando a tela do console
  */
  const console = (document.getElementById('console') as HTMLTextAreaElement)
  console.value = ''

  /*
    Executar as regras de transição até que o macaco atinja a altitude maxima
  */
  while (monkey.altitude != maxAltitude){
    rules.forEach((rule)=>{
      if(rule.canMakeAction({monkey, verticalBars, lastAction})){
        const result = rule.action({monkey, verticalBars, lastAction})
        
        lastAction = rule.ruleName
        monkey = result.monkey
        console.value += result.message
        
      }
      else{
        console.value += `Não foi possível executar a regra ${rule.ruleName}\n`
      }
    })
  }
  
  /*
    Verificando o Estado Final: o macaco está na mesma barra da banana?
  */
  if(verticalBars[monkey.indexVerticalBar].hasBanana){
    console.value += `O macaco achou a banana`
  }
  else {
    console.value += `O macaco não achou a banana`
  }

}

const btnStart = (document.getElementById('btnStart') as HTMLInputElement)
btnStart.addEventListener('click', (e:Event) => start())


