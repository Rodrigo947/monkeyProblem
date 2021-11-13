import IDataProblemDTO from "./IDataProblemDTO";
import IReturnAction from "./IReturnAction";
import ITransitionRule from "./ITransitionRule";

class R2 implements ITransitionRule{
  
  ruleName: string = 'R2 - Trocar de barra'
  
  canMakeAction({ monkey, verticalBars, lastAction }: IDataProblemDTO): boolean {
    /* 
      Só é possível trocar de barra caso a ultima ação feita não foi a troca de barra
      e o nível que o macaco está na barra possui um conexão com outra barra
    */

    const hasConnection = (verticalBars[monkey.indexVerticalBar].conections[monkey.altitude] != -1)

    return (lastAction !== this.ruleName && hasConnection)
  }
  
  action({ monkey, verticalBars }: IDataProblemDTO): IReturnAction {
    
    const indexNewBar = verticalBars[monkey.indexVerticalBar].conections[monkey.altitude]
    const nameOldBar = verticalBars[monkey.indexVerticalBar].name
    const nameNewBar = verticalBars[indexNewBar].name
    
    monkey.changeBar(indexNewBar);
  
    return {
      monkey: monkey,
      message: `O Macaco foi da barra ${nameOldBar} para a barra ${nameNewBar}\n`
    }
  }
  
}

export default R2