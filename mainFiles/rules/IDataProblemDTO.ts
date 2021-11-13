import VerticalBar from "../VerticalBar";
import Monkey from "../Monkey";

interface IDataProblemDTO{
  monkey: Monkey;
  verticalBars: Array<VerticalBar>
  lastAction: string
}

export default IDataProblemDTO