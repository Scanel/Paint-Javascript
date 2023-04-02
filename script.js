import { Element, Layer, Pencil } from "./class.js";
import { bresenham, DDA, PMD, FlowerBresenham, CircleDDA, CircleBresenham, CircleMidPoint, DrawPoints, DrawPolygon, DrawLapiz, moveFigureForward, moveFigureBackward, LapizDDA, Rectangle, Square, EllipseDDA, Ellipse, RotateLine, RotateSquare, RotateRectangle, ScaleLine, DrawSquare, DrawRectangle, MoverADelante, MoverAAtras, getPixels, updatePixels } from "./functions.js";

const preview = document.getElementById("preview");
const canvas = document.getElementById("canvas");

const ctx = preview.getContext("2d");
const contexto = canvas.getContext("2d");

let layer = new Layer();
let pencil = new Pencil();

let puntos = null;

let indiceArray;

let factorEscala = 1;
let maxFactorEscala = 1000;
let minFactorEscala = 0.1;

const grosor = document.getElementById("grosor");

const colorAzul = document.getElementById("color-azul");
const colorRojo = document.getElementById("color-rojo");
const colorVerde = document.getElementById("color-verde");
const colorAmarillo = document.getElementById("color-amarillo");
const colorNaranja = document.getElementById("color-naranja");
const colorRosa = document.getElementById("color-rosa");
const colorNegro = document.getElementById("color-negro");

const seleccion = document.getElementById("seleccion");
const mover = document.getElementById("mover");
const rotar = document.getElementById("rotar");
const scale = document.getElementById("scale");
const paint = document.getElementById("paint");
const eliminar = document.getElementById("delete");
const lapiz = document.getElementById("lapiz");
const linea = document.getElementById("linea");
const square = document.getElementById("square");
const rectangle = document.getElementById("rectangle");
const circulo = document.getElementById("circulo");
const elipse = document.getElementById("elipse");
const pentagono = document.getElementById("pentagono");
const hexagono = document.getElementById("hexagono");
const octagono = document.getElementById("octagono");
const decagono = document.getElementById("decagono");

const forward = document.getElementById("forward");
const back = document.getElementById("back");
const up = document.getElementById("up");
const down = document.getElementById("down");
const left = document.getElementById("left");
const right = document.getElementById("right");

const downloadPNG = document.getElementById('downloadPNG');
//const downloadJPG = document.getElementById('downloadJPG');
const save = document.getElementById('save');
const fileJson = document.getElementById('fileJson');
const open = document.getElementById('open');

let color = "black";
let type = "lapiz";
let sides = 0;
let grosorLinea = 1;
const colorPreview = "gray";
ctx.fillStyle = colorPreview;
contexto.fillStyle = color;

var movingLine = null;
var rotateLine = null;
var scaleLine = null;
var lineaTemp = null;
var offsetMouseX = 0;
var offsetMouseY = 0;
var screen = null;

const obtenerXReal = (clientX) => clientX - preview.getBoundingClientRect().left;
const obtenerYReal = (clientY) => clientY - preview.getBoundingClientRect().top;

let isDrawing = false;
let xAnterior = 0, yAnterior = 0, xActual = 0, yActual = 0;

grosor.addEventListener("input", (event) => {
  const valor = event.target.value;
  grosorLinea = valor;
  if(grosorLinea <= 0){
    grosorLinea = 1;
  }else if(grosorLinea >= 11){
    grosorLinea = 10;
  }
  console.log(`El valor actual del input es: ${valor}`);
  // Actualiza el valor en una variable o realiza otra acción necesaria
});

colorAzul.addEventListener("click", function(e){
    color = "blue";
    SelectBorder(colorAzul);
    contexto.fillStyle = color;
});
colorRojo.addEventListener("click", function(e){
    color = "red";
    SelectBorder(colorRojo);
    contexto.fillStyle = color;
});
colorVerde.addEventListener("click", function(e){
    color = "green";
    SelectBorder(colorVerde);
    contexto.fillStyle = color;
});
colorAmarillo.addEventListener("click", function(e){
    color = "yellow";
    SelectBorder(colorAmarillo);
    contexto.fillStyle = color;
});
colorNaranja.addEventListener("click", function(e){
    color = "orange";
    SelectBorder(colorNaranja);
    contexto.fillStyle = color;
});
colorNegro.addEventListener("click", function(e){
    color = "black";
    SelectBorder(colorNegro);
    contexto.fillStyle = color;
});
colorRosa.addEventListener("click", function(e){
    color = "pink";
    SelectBorder(colorRosa);
    contexto.fillStyle = color;
});

seleccion.addEventListener("click", function(e){
  type = "seleccion";
  SelectFigure(seleccion);
});

mover.addEventListener("click", function(e){
  type="mover";
  SelectFigure(mover);
});

rotar.addEventListener("click", function(e){
  type="rotar";
  SelectFigure(rotar);
});

scale.addEventListener("click", function(e){
  type="scale";
  SelectFigure(scale);
});

paint.addEventListener("click", function(e){
  type="paint";
  SelectFigure(paint);
});

eliminar.addEventListener("click", function(e){
  type="eliminar";
  SelectFigure(eliminar);
  Delete();
});

lapiz.addEventListener("click", function(e){
  type="lapiz";
  sides=0;
  SelectFigure(lapiz);
});

linea.addEventListener("click", function(e){
  type="linea";
  sides=0;
  SelectFigure(linea);
});

square.addEventListener("click", function(e){
  type="square";
  sides=4;
  SelectFigure(square);
});

rectangle.addEventListener("click", function(e){
  type="rectangle";
  sides=4;
  SelectFigure(rectangle);
});

circulo.addEventListener("click", function(e){
  type="circulo";
  sides = 0;
  SelectFigure(circulo);
});

elipse.addEventListener("click", function(e){
  type="elipse";
  sides = 0;
  SelectFigure(elipse);
});

pentagono.addEventListener("click", function(e){
  type="polygon";
  sides = 5;
  SelectFigure(pentagono);
});

hexagono.addEventListener("click", function(e){
  type="polygon";
  sides = 6;
  SelectFigure(hexagono);
});

octagono.addEventListener("click", function(e){
  type="polygon";
  sides = 8;
  SelectFigure(octagono);
});

decagono.addEventListener("click", function(e){
  type="polygon";
  sides = 10;
  SelectFigure(decagono);
});

forward.addEventListener("click", function(e){
  for(let i=0; i<layer.elements.length; i++)
  {
    if(layer.elements[i].selected)
    {
      moveFigureForward(layer.elements[i], layer);
      console.log("Movimiento hacia adelante: ", layer.elements);
      DrawLayer();
      break;
    }
  }
});

back.addEventListener("click", function(e){
  for(let i=0; i<layer.elements.length; i++)
  {
    if(layer.elements[i].selected)
    {
      moveFigureBackward(layer.elements[i], layer);
      console.log("Movimiento hacia atras: ", layer.elements);
      DrawLayer();
      break;
    }
  }
});

up.addEventListener("click", function(e){
  for(let i=0; i<layer.elements.length; i++)
  {
    if(layer.elements[i].selected)
    {
      MoverADelante(layer.elements[i],layer.elements);
      DrawLayer();
      break;
    }
  }
});

down.addEventListener("click", function(e){
  for(let i=0; i<layer.elements.length; i++)
  {
    if(layer.elements[i].selected)
    {
      MoverAAtras(layer.elements[i], layer.elements);
      DrawLayer();
      break;
    }
  }
});

left.addEventListener("click", function(e){
  indiceArray--;
  if(indiceArray < 0){
    indiceArray = 0;
  }
  DrawLayer2(indiceArray);
});

right.addEventListener("click", function(e){
  indiceArray++;
  if(indiceArray >= layer.elements.length){
    indiceArray = layer.elements.length-1;
  }
  DrawLayer2(indiceArray);
});

downloadPNG.addEventListener("click", function(e){

  // Crear la imagen
  const imgData = canvas.toDataURL('image/png');
  const img = new Image();
  img.src = imgData;

  // Crear el PDF
  //const pdf = canvas.toDataURL('application/pdf');

  contexto.drawImage(img, 0, 0);

  // Descargar la imagen o PDF
  const link = document.createElement('a');
  link.download = 'draw.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});

// downloadJPG.addEventListener("click", function(e){

//   // Crear la imagen
//   const imgData = canvas.toDataURL('image/jpeg');
//   const img = new Image();
//   img.src = imgData;

//   // Crear el PDF
//   //const pdf = canvas.toDataURL('application/pdf');

//   contexto.drawImage(img, 0, 0);

//   // Descargar la imagen o PDF
//   const link = document.createElement('a');
//   link.download = 'draw.jpg';
//   link.href = canvas.toDataURL('image/jpeg',0.8);
//   link.click();
// });

save.addEventListener("click", function(e){
  downloadJson(layer.elements, "draw.json");
});

open.addEventListener("click", function(e){
  loadFile();
});

fileJson.addEventListener("change", function(e){
  loadJson(e);
});

preview.addEventListener("click", function(e) {
  // Obtener la posición del mouse en relación con el canvas
  
  DeselectAll();
  let rect = canvas.getBoundingClientRect();
  let mouseX = e.clientX - rect.left;
  let mouseY = e.clientY - rect.top;

  if(type === "paint"){
    var x = e.offsetX;
    var y = e.offsetY;
    screen = getPixels(canvas);
    FloodFill(x,y,color);
    //floodFill(mouseX,mouseY,color);
    
    
    // floodFill(canvas,mouseX,mouseY,[255, 0, 0, 255]);
    return;
  }

  if(type !== "seleccion") return;

  for (let i = layer.elements.length-1; i >= 0; i--) {
    let line = layer.elements[i];
  
    if(line.type === "linea"){
      // Verificar si la posición del mouse está dentro de los límites de la línea
      if (mouseX >= Math.min(line.x1, line.x2) && mouseX <= Math.max(line.x1, line.x2) &&
        mouseY >= Math.min(line.y1, line.y2) && mouseY <= Math.max(line.y1, line.y2)) {
        // Si la línea está seleccionada, deseleccionarla, de lo contrario, seleccionarla
        line.selected = !line.selected;
        break;
      }
    }else if(line.type === "circulo" || line.type === "polygon"){
      let radio = Math.sqrt(Math.pow((line.x2-line.x1),2) + Math.pow((line.y2-line.y1),2));
      let radio2 = Math.sqrt(Math.pow((mouseX-line.x1),2) + Math.pow((mouseY-line.y1),2));
      if(radio2 <= radio){
        line.selected = !line.selected;
        break;
      }
    }else if(line.type === "square" || line.type === "rectangle"){
      if (mouseX >= line.x1 && mouseX <= line.x2 && mouseY >= line.y1 && mouseY <= line.y2) {
        // el clic está dentro del cuadrado o rectángulo
        line.selected = !line.selected;
        break;
      }
    }else if(line.type === "elipse"){
      const xDiff = mouseX - line.x1;
      const yDiff = mouseY - line.y1;
      const distance = Math.sqrt((xDiff * xDiff) / (line.x2 * line.x2) + (yDiff * yDiff) / (line.y2 * line.y2));
      if (distance <= 1) {
        // El mouse está dentro de la elipse, seleccionarla
        line.selected = !line.selected;
        break;
      } 
    }
  }
  console.log(layer.elements);
});

  preview.addEventListener("mousedown", function(e) {
    if(type === "seleccion") return;
    xActual = obtenerXReal(e.clientX);
    yActual = obtenerYReal(e.clientY);
    xAnterior = xActual;
    yAnterior = yActual;
    isDrawing = true;

    if(type === "lapiz"){
      pencil = new Pencil();
    }

    if(type === "mover"){
      var rect = canvas.getBoundingClientRect();
      var mouseX = e.clientX - rect.left;
      var mouseY = e.clientY - rect.top;

      // Iterar sobre cada línea en ambas capas
      for (var i = 0; i < layer.elements.length; i++) {
        var line = layer.elements[i];
        if (line.selected) {
          if(line.type === "linea"){
            // Verificar si el mouse está dentro de los límites de la línea
            if (mouseX >= Math.min(line.x1, line.x2) && mouseX <= Math.max(line.x1, line.x2) &&
              mouseY >= Math.min(line.y1, line.y2) && mouseY <= Math.max(line.y1, line.y2)) {
              // Establecer la bandera "moviendo línea" y recordar la posición del mouse en relación a la línea
              movingLine = line;
              console.log(movingLine);
              lineaTemp = line;
              offsetMouseX = mouseX - movingLine.x1;
              offsetMouseY = mouseY - movingLine.y1;
              console.log(offsetMouseX);
              console.log(offsetMouseY);
              break;
            }
          }else if(line.type === "circulo" || line.type === "polygon"){
            let radio = Math.sqrt(Math.pow((line.x2-line.x1),2) + Math.pow((line.y2-line.y1),2));
            let radio2 = Math.sqrt(Math.pow((mouseX-line.x1),2) + Math.pow((mouseY-line.y1),2));
            if(radio2 <= radio){
              movingLine = line;
              lineaTemp = line;
              offsetMouseX = mouseX - movingLine.x1;
              offsetMouseY = mouseY - movingLine.y1;
              break;
            }
          }else if(line.type === "square" || line.type === "rectangle"){
            if (mouseX >= line.x1 && mouseX <= line.x2 && mouseY >= line.y1 && mouseY <= line.y2) {
              movingLine = line;
              lineaTemp = line;
              offsetMouseX = mouseX - movingLine.x1;
              offsetMouseY = mouseY - movingLine.y2;
              break;
            }
          }else if(line.type === "elipse"){
            const xDiff = mouseX - line.x1;
            const yDiff = mouseY - line.y1;
            const distance = Math.sqrt((xDiff * xDiff) / (line.x2 * line.x2) + (yDiff * yDiff) / (line.y2 * line.y2));
            if (distance <= 1) {
              movingLine = line;
              lineaTemp = line;
              offsetMouseX = mouseX - movingLine.x1;
              offsetMouseY = mouseY - movingLine.y1; 
              break;
            } 
          }
          
        }
      }
    }else if(type ==="rotar"){
      var rect = canvas.getBoundingClientRect();
      var mouseX = e.clientX - rect.left;
      var mouseY = e.clientY - rect.top;
      for(var i=0; i<layer.elements.length; i++){
        var line = layer.elements[i];
        if(line.selected)
        {
          if(line.type === "polygon")
          {
            let radio = Math.sqrt(Math.pow((line.x2-line.x1),2) + Math.pow((line.y2-line.y1),2));
            let radio2 = Math.sqrt(Math.pow((mouseX-line.x1),2) + Math.pow((mouseY-line.y1),2));
            if(radio2 <= radio){
              rotateLine = line;
              lineaTemp = line;
              break;
            }
          }else if(line.type === "linea"){
            if (mouseX >= Math.min(line.x1, line.x2) && mouseX <= Math.max(line.x1, line.x2) &&
              mouseY >= Math.min(line.y1, line.y2) && mouseY <= Math.max(line.y1, line.y2)) {
              rotateLine = line;
              lineaTemp = line;
              break;
            }
          }else if(line.type === "square" || line.type === "rectangle"){
            if (mouseX >= line.x1 && mouseX <= line.x2 && mouseY >= line.y1 && mouseY <= line.y2) {
              rotateLine = line;
              lineaTemp = line;
            }
          }
        }
      }
    }else if(type === "scale"){
      var rect = canvas.getBoundingClientRect();
      var mouseX = e.clientX - rect.left;
      var mouseY = e.clientY - rect.top;
      for(var i=0; i<layer.elements.length; i++){
        var line = layer.elements[i];
        if(line.selected){
          if(line.type === "polygon")
          {
            let radio = Math.sqrt(Math.pow((line.x2-line.x1),2) + Math.pow((line.y2-line.y1),2));
            let radio2 = Math.sqrt(Math.pow((mouseX-line.x1),2) + Math.pow((mouseY-line.y1),2));
            if(radio2 <= radio){
              scaleLine = line;
              lineaTemp = line;
              break;
            }
          
          }else if(line.type === "linea"){
            if (mouseX >= Math.min(line.x1, line.x2) && mouseX <= Math.max(line.x1, line.x2) &&
              mouseY >= Math.min(line.y1, line.y2) && mouseY <= Math.max(line.y1, line.y2)) {
              console.log("entro");
              scaleLine = line;
              lineaTemp = line;
              break;
            }
          
          }else if(line.type === "square" || line.type === "rectangle"){
            
          }else if(line.type === "elipse"){
            const xDiff = mouseX - line.x1;
            const yDiff = mouseY - line.y1;
            const distance = Math.sqrt((xDiff * xDiff) / (line.x2 * line.x2) + (yDiff * yDiff) / (line.y2 * line.y2));
            if (distance <= 1) {
              scaleLine = line;
              lineaTemp = line;
              break;
            } 
          }
        }
      }
    }
    
    
  });

  preview.addEventListener("mousemove", function(e) {
    if(type === "seleccion") return;
    if(!isDrawing) return;
    xActual = obtenerXReal(e.clientX);
    yActual = obtenerYReal(e.clientY);
    
    if(type === "mover"){
      var rect = canvas.getBoundingClientRect();
      var mouseX = e.clientX - rect.left;
      var mouseY = e.clientY - rect.top;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (movingLine) {
        console.log("entro");
        if(movingLine.type === "elipse"){
          const diffX = mouseX - offsetMouseX;
          const diffY = mouseY - offsetMouseY;
          movingLine.x1 = diffX;
          movingLine.y1 = diffY; 
        }else{
          movingLine.x1 = mouseX - offsetMouseX;
          movingLine.y1 = mouseY - offsetMouseY;
          movingLine.x2 = movingLine.x1 + movingLine.dx;
          movingLine.y2 = movingLine.y1 + movingLine.dy;
        }
        Draw(movingLine.type, ctx, movingLine.x1, movingLine.y1, movingLine.x2, movingLine.y2, movingLine.sides, colorPreview, movingLine.angle, movingLine,grosorLinea);
        console.log(movingLine);
      }
      
    }else if(type === "rotar"){
      var rect = canvas.getBoundingClientRect();
      var mouseX = e.clientX - rect.left;
      var mouseY = e.clientY - rect.top;
      ctx.clearRect(0,0,canvas.width,canvas.height);
      if(rotateLine){
        const deltaX = mouseX - xAnterior;
        const deltaY = mouseY - yAnterior;
        const angleInRadians = Math.atan2(deltaY, deltaX);
        rotateLine.angle = angleInRadians;
        if(rotateLine.type === "linea"){
          puntos = RotateLine(rotateLine.x1,rotateLine.y1,rotateLine.x2,rotateLine.y2,rotateLine.angle,ctx);
        }else if(rotateLine.type === "square"){
          puntos = RotateSquare(rotateLine.x1, rotateLine.y1,rotateLine.x2,rotateLine.angle);
        }else if(rotateLine.type === "rectangle"){
          puntos = RotateRectangle(rotateLine.x1,rotateLine.y1,rotateLine.x2,rotateLine.y2,rotateLine.angle,ctx);
        }
        if(rotateLine.type === "polygon"){
          Draw(rotateLine.type, ctx, rotateLine.x1, rotateLine.y1, rotateLine.x2, rotateLine.y2, rotateLine.sides, colorPreview, rotateLine.angle, rotateLine,grosorLinea);
        }else{
          Draw(rotateLine.type, ctx, puntos.x1, puntos.y1, puntos.x2, puntos.y2, rotateLine.sides, colorPreview, rotateLine.angle, puntos,grosorLinea);
        }
        
      }
    }else if(type === "scale"){
      var rect = canvas.getBoundingClientRect();
      var mouseX = e.clientX - rect.left;
      var mouseY = e.clientY - rect.top;
      ctx.clearRect(0,0,canvas.width,canvas.height);

      if(scaleLine){
        if(scaleLine.type === "elipse"){
          let radiusX = Math.abs(e.clientX - rect.left - scaleLine.x1);
          let radiusY = Math.abs(e.clientY - rect.top - scaleLine.y1);
          Draw(scaleLine.type, ctx, scaleLine.x1, scaleLine.y1, radiusX, radiusY, sides, colorPreview,0,0,grosorLinea);
        }else if(scaleLine.type === "polygon"){
          Draw(scaleLine.type, ctx, scaleLine.x1, scaleLine.y1, xActual, yActual, scaleLine.sides, colorPreview,scaleLine.angle,0,grosorLinea);
        }
        else{
          const deltaX = mouseX - xAnterior;
          let direccion = deltaX > 0 ? 1 : -1;
          factorEscala += 0.01 * Math.abs(deltaX) * direccion;
          
          puntos = ScaleLine(scaleLine.x1, scaleLine.y1,scaleLine.x2,scaleLine.y2,factorEscala,scaleLine.angle,ctx);
          
          Draw(scaleLine.type, ctx, puntos.x1, puntos.y1, puntos.x2, puntos.y2, scaleLine.sides, colorPreview, scaleLine.angle,0,grosorLinea);
          xAnterior = mouseX;
        }
        
      }
    }
    else if(type === "lapiz"){
      Draw(type, contexto, xAnterior, yAnterior, xActual, yActual,0,0,0,0,grosorLinea);
      pencil.points.push({x1: xAnterior, y1: yAnterior, x2: xActual, y2: yActual});
      xAnterior = xActual;
      yAnterior = yActual;
    }else{
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if(type==="elipse"){
        var rect = canvas.getBoundingClientRect();
        let radiusX = Math.abs(e.clientX - rect.left - xAnterior);
        let radiusY = Math.abs(e.clientY - rect.top - yAnterior);
        Draw(type, ctx, xAnterior, yAnterior, radiusX, radiusY, sides, colorPreview,0,0,grosorLinea);
      }else{
        Draw(type, ctx, xAnterior, yAnterior, xActual, yActual, sides, colorPreview,0,0,grosorLinea);
      }    
    }
    
  });

  preview.addEventListener("mouseup", function(e) {
    if(type === "seleccion") return;
    if(type === "mover" && movingLine !== null){
      for(let i=0; i<layer.elements.length; i++){
        if(layer.elements[i] === lineaTemp){
          layer.elements[i] = movingLine;
          layer.elements[i].selected = false;
          movingLine = null;
          console.log(layer.elements[i]);
          break;
        }
      }
      DrawLayer();
    }else if(type === "rotar" && rotateLine !== null){
      for(let i=0; i<layer.elements.length; i++){
        if(layer.elements[i] === lineaTemp){
          if(rotateLine.type === "polygon"){
          }else{
            rotateLine.x1 = puntos.x1;
            rotateLine.y1 = puntos.y1;
            rotateLine.x2 = puntos.x2;
            rotateLine.y2 = puntos.y2;
            rotateLine.x3 = puntos.x3;
            rotateLine.y3 = puntos.y3;
            rotateLine.x4 = puntos.x4;
            rotateLine.y4 = puntos.y4;
            rotateLine.dx = puntos.x2-puntos.x1;
            rotateLine.dy = puntos.y2-puntos.y1;
          }
          
          layer.elements[i] = rotateLine;
          layer.elements[i].selected = false;
          rotateLine = null;
          console.log(puntos);
          break;
        }
      }
      DrawLayer();
    }else if(type === "scale" && scaleLine !== null){
      for(let i=0; i<layer.elements.length; i++){
        if(layer.elements[i] === lineaTemp){
          if(layer.elements[i].type === "elipse"){
            var rect = canvas.getBoundingClientRect();
            let radiusX = Math.abs(e.clientX - rect.left - scaleLine.x1);
            let radiusY = Math.abs(e.clientY - rect.top - scaleLine.y1);
            scaleLine.x2 = radiusX;
            scaleLine.y2 = radiusY;
          }else if(layer.elements[i].type === "polygon"){
            scaleLine.x2 = xActual;
            scaleLine.y2 = yActual;
            scaleLine.dx = scaleLine.x2-scaleLine.x1;
            scaleLine.dy = scaleLine.y2-scaleLine.y1;
          }
          else{
            scaleLine.x1 = puntos.x1;
            scaleLine.y1 = puntos.y1;
            scaleLine.x2 = puntos.x2;
            scaleLine.y2 = puntos.y2;
            scaleLine.dx = puntos.x2-puntos.x1;
            scaleLine.dy = puntos.y2-puntos.y1;
          }
          layer.elements[i] = scaleLine;
          layer.elements[i].selected = false;
          scaleLine = null;
          break;
        }
      }
      DrawLayer();
    }
    else if(type === "lapiz"){
      let element = new Element(0,0,0,0,type,pencil,0,color,grosorLinea);
      layer.elements.push(element);
      indiceArray = layer.elements.length-1;
      console.log(layer.elements);
    }
    else if(type !== "lapiz" && type !== "mover" && type !== "rotar" && type !== "eliminar" && type !== "scale"){
      var rect = canvas.getBoundingClientRect();
      let radiusX = Math.abs(e.clientX - rect.left - xAnterior);
      let radiusY = Math.abs(e.clientY - rect.top - yAnterior);
      let element;
      if(type === "elipse"){
        element = new Element(xAnterior, yAnterior, radiusX, radiusY, type, 0, sides, color,grosorLinea);
      }else{
        element = new Element(xAnterior, yAnterior, xActual, yActual, type, 0, sides, color,grosorLinea);
      }
      layer.elements.push(element);
      indiceArray = layer.elements.length-1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if(type==="elipse"){
        Draw(type, contexto, xAnterior, yAnterior, radiusX, radiusY, sides, color,0,element,grosorLinea);
      }else{
        Draw(type, contexto, xAnterior, yAnterior, xActual, yActual, sides, color, 0, element,grosorLinea);
      }  
      
      
    }
    
    isDrawing = false;
    console.log(layer.elements);
  });

function DeselectAll(){
  layer.elements.forEach(element => {
    element.selected = false;
  });
}
function DrawLayer(){
  contexto.clearRect(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  layer.elements.forEach(element => {
    if(element.type === "lapiz"){
      element.pencil.points.forEach(value => {
        console.log(value.x1);
        Draw(element.type, contexto, value.x1, value.y1, value.x2, value.y2, element.sides, element.color, element.angle, element, element.grosor);
      });
    }else{
      Draw(element.type, contexto, element.x1, element.y1, element.x2, element.y2, element.sides, element.color, element.angle, element,element.grosor);
    }
    
  });
}

function DrawLayer2(indice){
  contexto.clearRect(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var aux = 0;
  layer.elements.forEach(element => {
    if(aux >= indice) return;
    if(element.type === "lapiz"){
      element.pencil.points.forEach(value => {
        console.log(value.x1);
        Draw(element.type, contexto, value.x1, value.y1, value.x2, value.y2, element.sides, element.color, element.angle, element,element.grosor);
      });
    }else{
      Draw(element.type, contexto, element.x1, element.y1, element.x2, element.y2, element.sides, element.color, element.angle, element,element.grosor);
    }
    aux++;
  });
}

function Draw(type, c, x1, y1, x2, y2,s, col, angle, element,grosor){
  c.fillStyle = col;
  switch(type){
    case "lapiz":
      LapizDDA(x1,y1,x2,y2,c,grosor);
    break;
    case "linea":
      // if(angle === 0){
      //   DDA(x1, y1, x2, y2, c);
      // }else{
      //   RotateLine(x1,y1,x2,y2,angle,c);
      // }
      DDA(x1, y1, x2, y2, c,grosor);
      
    break;
    case "circulo":
      CircleDDA(x1, y1, x2, y2, c,grosor);
    break;
    case "polygon":
      DrawPolygon(x1, y1, x2, y2, s, c, angle,grosor);
    break;
    case "rectangle":
      if(angle === 0){
        Rectangle(x1,y1,x2,y2,c);
      }else{
        DrawRectangle(x1,y1,x2,y2,element.x3,element.y3,element.x4,element.y4,c,grosor);
      }
      
    break;
    case "square":
      if(angle === 0){
        Square(x1,y1,x2,c,grosor);
      }else{
        DrawSquare(x1,y1,x2,element.y2,element.x3,element.y3,element.x4,element.y4,c,grosor);
      }
    break;
    case "elipse":
      Ellipse(x1,y1,x2,y2,c,grosor);
    break;
  }
  c.fillStyle = color;
}

  function SelectBorder(clr){
    colorAzul.style.border = "1px solid black";
    colorRojo.style.border = "1px solid black";
    colorVerde.style.border = "1px solid black";
    colorAmarillo.style.border = "1px solid black";
    colorNaranja.style.border = "1px solid black";
    colorNegro.style.border = "1px solid black";
    colorRosa.style.border = "1px solid black";
  
    clr.style.border = "1px solid gold";
  }

  function SelectFigure(clr){
    lapiz.style.border = "1px solid black";
    linea.style.border = "1px solid black";
    circulo.style.border = "1px solid black";
    pentagono.style.border = "1px solid black";
    hexagono.style.border = "1px solid black";
    octagono.style.border = "1px solid black";
    decagono.style.border = "1px solid black";
    seleccion.style.border = "1px solid black";
    mover.style.border = "1px solid black";
    rotar.style.border = "1px solid black";
    rectangle.style.border = "1px solid black";
    square.style.border = "1px solid black";
    elipse.style.border = "1px solid black";
    scale.style.border = "1px solid black";
    eliminar.style.border = "1px solid black";
    paint.style.border = "1px solid black";
  
    clr.style.border = "1px solid gold";
  }

  function downloadJson(data, filename){
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const loadJson = (event) => {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const json = e.target.result;
        const data = JSON.parse(json);
        layer.elements.splice(0, layer.elements.length, ...data);
        console.log(layer.elements);
        DrawLayer();
      };
      reader.readAsText(input.files[0]);
    
      DrawLayer();
    }
  };
  
  function loadFile(){
    const input = document.querySelector('input[type=file]');
    input.click();
  };

  function Delete(){
    for(let i=0; i<layer.elements.length; i++){
      if(layer.elements[i].selected){
        console.log(layer.elements.splice(i,1));
        break;
      }
    }
    DrawLayer();
  }

  function floodFillUtil(x, y, prevC, newC)
      {
        var M = 500;
        var N = 500;
        // Base cases
        
        if (x < 0 || x >= M || y < 0 || y >= N) return;
        console.log(JSON.stringify(screen[x][y]) !== JSON.stringify(prevC));
        if (JSON.stringify(screen[x][y]) !== JSON.stringify(prevC)) return;
        
        // Replace the color at (x, y)
        screen[x][y] = newC;
        contexto.fillRect(x,y,1,1);
        //console.log("hola");
        // Recur for north, east, south and west
        floodFillUtil(x + 1, y, prevC, newC);
        floodFillUtil(x - 1, y, prevC, newC);
        floodFillUtil(x, y + 1, prevC, newC);
        floodFillUtil(x, y - 1, prevC, newC);
      }

function FloodFill(x, y, newC) {
  var prevC = screen[x][y];
  if (prevC == newC) return;
  console.log(screen[x][y]);
  floodFillUtil(x, y, prevC, newC);
}

function floodFill(x, y, newColor) {

  // Obtener el color del pixel en la posición inicial (x, y)
  const imageData = contexto.getImageData(x, y, 1, 1);
  const startColor = imageData.data.slice(0, 3);

  if (startColor === newColor) {
    return; // No hacer nada si el color inicial y el color nuevo son iguales
  }

  const queue = [[x, y]]; // Inicializar la cola con el pixel inicial

  while (queue.length > 0) {
    const [x, y] = queue.shift(); // Sacar el primer elemento de la cola

    // Obtener el color del pixel en la posición actual (x, y)
    const imageData = contexto.getImageData(x, y, 1, 1);
    const currentColor = imageData.data.slice(0, 3);

    // Comprobar si el color del pixel actual es el mismo que el color inicial
    if (currentColor.toString() === startColor.toString()) {
      // Cambiar el color del pixel actual al nuevo color
      contexto.fillStyle = newColor;
      contexto.fillRect(x, y, 1, 1);

      // Agregar los píxeles adyacentes a la cola si tienen el mismo color inicial
      if (x > 0) queue.push([x - 1, y]); // Izquierda
      if (x < canvas.width - 1) queue.push([x + 1, y]); // Derecha
      if (y > 0) queue.push([x, y - 1]); // Arriba
      if (y < canvas.height - 1) queue.push([x, y + 1]); // Abajo
    }
  }
}
