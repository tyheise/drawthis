class Line {
  x1: int;
  y1: int;
  x2: int;
  y2: int;
  colour: string;
  width: int;

  constructor(x1, y1, x2, y2, colour, width){
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.colour = colour;
    this.width = width;
  }

  draw(context) {

    context.fillStyle = this.colour;
    context.beginPath();
    context.arc(this.x2, this.y2, this.width/2, 0, 2 * Math.PI);
    context.fill();
    context.closePath();

    context.beginPath();
    context.strokeStyle = this.colour;
    context.lineWidth = this.width;
    context.moveTo(this.x1, this.y1);
    context.lineTo(this.x2, this.y2);
    context.stroke();
    context.closePath();
  }
}

export default Line
