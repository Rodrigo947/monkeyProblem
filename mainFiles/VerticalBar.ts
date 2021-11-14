class VerticalBar{

  name: string
  connections: Array<number>
  hasBanana: boolean

  constructor(name: string, connections: Array<number>, hasBanana: boolean) {
    this.name = name
    this.connections = connections
    this.hasBanana = hasBanana
  }

}

export default VerticalBar