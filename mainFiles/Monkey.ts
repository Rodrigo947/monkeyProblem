class Monkey {

  altitude: number
  indexVerticalBar: number

  constructor(indexVerticalBar: number) {
    this.indexVerticalBar = indexVerticalBar
    this.altitude = 0
  }

  moveUp(): void {
    this.altitude++
  }

  changeBar(indexNewBar: number): void{
    this.indexVerticalBar = indexNewBar
  }

}

export default Monkey