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
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brush" viewBox="0 0 16 16">
            <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.118 8.118 0 0 1-3.078.132 3.659 3.659 0 0 1-.562-.135 1.382 1.382 0 0 1-.466-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04zM4.705 11.912a1.23 1.23 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.39 3.39 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3.122 3.122 0 0 0 .126-.75l-.793-.792zm1.44.026c.12-.04.277-.1.458-.183a5.068 5.068 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04.007-.005a.031.031 0 0 1-.007.004zm3.582-3.043.002.001h-.002z"/>
          </svg>
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </div>
        <select name="width" id="width" value={width} onChange={(e) => updateWidth(e)}>
          <option value="1">1px</option>
          <option value="3">2px</option>
          <option value="5">5px</option>
          <option value="10">10px</option>
        </select>
        <input type="color" id="colour" name="colour" value={colour}
                onChange={(e) => updateColour(e)}></input>
        <button type="button" class="btn" onClick={(e) => updateIsErasing()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eraser" viewBox="0 0 16 16">
            <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Drawing;
