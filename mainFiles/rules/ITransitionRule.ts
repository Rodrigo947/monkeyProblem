import IDataProblemDTO from "./IDataProblemDTO";
import IReturnAction from "./IReturnAction";

interface ITransitionRule{
  
  ruleName: string

  canMakeAction({monkey, verticalBars, lastAction}: IDataProblemDTO): boolean
  action({monkey, verticalBars}: IDataProblemDTO): IReturnAction
  
}

export default ITransitionRule