import IDataProblemDTO from "./IDataProblemDTO"
import IReturnAction from "./IReturnAction"
import ITransitionRule from "./ITransitionRule"
import R2 from "./R2"


class R1 implements ITransitionRule{

  ruleName: string = 'R1 - Subir'

  public canMakeAction({ monkey, verticalBars, lastAction }: IDataProblemDTO): boolean {
    /* 
      Só é possível subir na barra caso não seja possivel trocar de barra
    */
    const r2 = new R2()

    return !r2.canMakeAction({ monkey, verticalBars, lastAction })
  }

  public action({ monkey, verticalBars }: IDataProblemDTO): IReturnAction {
    monkey.altitude++
    return {
      monkey: monkey,
      
      message: `
      <div class="alert alert-success" role="alert">
        O Macaco subiu na barra 
          <span class="badge rounded-pill bg-dark">
            ${verticalBars[monkey.indexVerticalBar].name} 
          </span> 
      </div>
      `
    }
  }

}

export default R1