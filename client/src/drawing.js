import React, { useState, useRef } from 'react';
import Line from './line.js';

function Drawing() {

  let canvasRef = useRef();

  let [isDrawing, setIsDrawing] = useState(false);
  let [isErasing, setIsErasing] = useState(false);
  let [previousX, setPreviousX] = useState(0);
  let [previousY, setPreviousY] = useState(0);
  let [nextX, setNextX] = useState(null);
  let [nextY, setNextY] = useState(null);
  let [lines, setLines] = useState([]);
  let [colour, setColour] = useState('#000000');
  let [width, setWidth] = useState(1);

  function mousedown(e){
    setPreviousX(e.nativeEvent.offsetX);
    setPreviousY(e.nativeEvent.offsetY);
    setIsDrawing(true);
  }

  function mousemove(e){
    if(isDrawing){
      let x = e.nativeEvent.offsetX
      let y = e.nativeEvent.offsetY
      let current_colour = colour
      if (isErasing) {
        current_colour = "#FFFFFF"
      }
      let line = new Line(previousX, previousY, x, y, current_colour, width);
      line.draw(canvasRef.current.getContext('2d'))
      setLines(lines.concat(line))
      setPreviousX(x);
      setPreviousY(y);
    }
  }

  function mouseup(e) {
    setIsDrawing(false);
 }

 function updateWidth(e) {
   setWidth(e.target.value)
 }

 function updateColour(e) {
   setColour(e.target.value)
 }

 function updateIsErasing() {
   setIsErasing(!isErasing)
 }


  return (
    <div>
      <canvas
        ref={canvasRef}
        className="drawing"
        width="500px"
        height="500px"
        onMouseDown={(e) => mousedown(e)}
        onMouseUp={(e) => mouseup(e)}
        onMouseMove={(e) => mousemove(e)}>
      </canvas>
      <div>
        <select name="width" id="width" value={width} onChange={(e) => updateWidth(e)}>
          <option value="1">1px</option>
          <option value="3">2px</option>
          <option value="5">5px</option>
          <option value="10">10px</option>
        </select>
        <input type="color" id="colour" name="colour" value={colour}
                onChange={(e) => updateColour(e)}></input>
        <button type="button" onClick={(e) => updateIsErasing()}>erase</button>
      </div>
    </div>
  )
}

export default Drawing;
