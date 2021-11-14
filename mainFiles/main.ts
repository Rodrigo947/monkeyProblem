import Monkey from "./Monkey"
import ITransitionRule from "./rules/ITransitionRule"
import R1 from "./rules/R1"
import R2 from "./rules/R2"
import VerticalBar from "./VerticalBar"

/** 
 * @param indexInitialBar barra escolhida
 * @param orderType ordem que as regras de transição serão executadas
*/
function start(indexInitialBar: number, orderType: number) {
  let verticalBars: Array<VerticalBar> = []
  let rules: Array<ITransitionRule> = []
  let maxAltitude: number = 17

  /*
    Carga de estados
  */       
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
    Index da barra de onde o macaco irá começar
  */
  let monkey = new Monkey(indexInitialBar)
  let lastAction: string = 'Estado Inicial'

  /*
    Definindo a ordem que as regras de transição serão executadas
  */
  let r1 = new R1()
  let r2 = new R2()
  switch (orderType) {
    case 1:
      rules = [r1,r2]
      break
    case 2:
      rules = [r2,r1]
      break
  }

  /*
    Limpando a tela do console
  */
  const console = (document.getElementById('console') as HTMLDivElement)
  console.innerHTML = ''

  /*
    Executar as regras de transição até que o macaco atinja a altitude maxima
  */
  while (monkey.altitude != maxAltitude){
    rules.forEach((rule)=>{
      if(rule.canMakeAction({monkey, verticalBars, lastAction})){
        const result = rule.action({monkey, verticalBars, lastAction})
        
        lastAction = rule.ruleName
        monkey = result.monkey
        console.innerHTML += result.message
      }
      else{
        console.innerHTML += `
          <div class="alert alert-danger" role="alert">
            Não foi possível executar a regra 
              <span class="badge rounded-pill bg-dark">
                ${rule.ruleName}
              </span> 
          </div> 
        `
      }
    })
  }
  
  /*
    Verificando o Estado Final: o macaco está na mesma barra da banana?
  */
  if(verticalBars[monkey.indexVerticalBar].hasBanana){
    console.innerHTML += `
      <div class="alert alert-warning" role="alert">
        O Macaco achou a banana 
      </div> 
    `
  }
  else {
    console.innerHTML +=  `
    <div class="alert alert-dark" role="alert">
      O Macaco não achou a banana 
    </div> 
  `
  }
}

const btnStart = (document.getElementById('btnStart') as HTMLInputElement)
btnStart.addEventListener('click', () => {
  
  // Barra escolhida 
  const chosedBar = parseInt( (document.getElementById('chosedBar') as HTMLInputElement).value )
  
  // Verificando qual opção de transição foi escolhida
  let chosedTransition = 1
  document.getElementsByName('ruleTransitionOptions').forEach((optionRadio) => {
    if((optionRadio as HTMLInputElement).checked) {
      chosedTransition = parseInt( (optionRadio as HTMLInputElement).value)
    }
  })
  
  start(chosedBar, chosedTransition)
})


