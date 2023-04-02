export function DrawLapiz(x,y,context){
  context.lineTo(x, y);
  context.stroke();
}

export function bresenham(x1, y1, x2, y2, context)
  {
    var dx = Math.abs(x2-x1);
    var dy = Math.abs(y2-y1);
    var sx = (x1 < x2) ? 1 : -1;
    var sy = (y1 < y2) ? 1 : -1;
    var p = 2 * dy - dx;
    var x = x1;
    var y = y1;

    if(dy < dx)
    {
      p = 2 * dy- dx;
      while(x1 !== x2)
      {
         context.fillRect(x1, y1,3,3);
        x1 += sx;
        if(p < 0)
        {
          p += 2 * dy;
        }else 
        {
          y1 += sy;
          p += 2 * (dy-dx);
        }
      }
    }else {
      p = 2 * dx - dy;
      while (y1 !== y2)
      {
        context.fillRect(x1,y1,3,3);
        y1 += sy;
        if(p < 0){
          p += 2 * dx;
        }else{
          x1 += sx;
          p += 2 * (dx-dy);
        }
      }
    }

  }
  export function LapizDDA(x1, y1, x2, y2, context, grosor)
  {
    let x, y, xs, ys;
    let dx, dy, steps;
    let length;
    dx = x2-x1;
    dy = y2-y1;
    x = x1;
    y = y1;
    if(Math.abs(dx) > Math.abs(dy))
    {
      steps = Math.abs(dx);
      length = dx;
    }else
    {
      steps = Math.abs(dy);
      length = dy;
    }
    if(steps === 0)
    {
      context.fillRect(x,y,parseInt(grosor),parseInt(grosor));
      return;
    }
    xs = dx/steps;
    ys = dy/steps;
    for(let i = 0; i<= steps; i++)
    {
      context.fillRect(x, y, grosor, grosor);
      x += xs;
      y += ys;
      if (i !== steps && (dx > 0 && x > x2 || dx < 0 && x < x2 || dy > 0 && y > y2 || dy < 0 && y < y2)) {
        x -= xs;
        y -= ys;
      }
    }
  }

  export function Rectangle(x1, y1, x2, y2, context) {
    let x, y, width, height;
    width = Math.abs(x2 - x1);
    height = Math.abs(y2 - y1);
    x = Math.min(x1, x2);
    y = Math.min(y1, y2);
    context.fillRect(x, y, width, 3);
    context.fillRect(x, y + height - 1, width, 3);
    context.fillRect(x, y, 3, height);
    context.fillRect(x + width - 1, y, 3, height);
  }
  export function Square(x1, y1, x2, context,grosor) {
    var size = (x2-x1);
    DDA(x1, y1, x1 + size, y1, context,grosor);
    DDA(x1 + size, y1, x1 + size, y1 + size, context,grosor);
    DDA(x1 + size, y1 + size, x1, y1 + size, context,grosor);
    DDA(x1, y1 + size, x1, y1, context,grosor);
  }

export function DDA(x1, y1, x2, y2, context, grosor)
  {
    let x, y, xs, ys;
    let dx, dy, steps;
    dx = x2-x1;
    dy = y2-y1;
    x = x1;
    y = y1;
    if(Math.abs(dx) > Math.abs(dy))
    {
      steps = Math.abs(dx);
    }else
    {
      steps = Math.abs(dy);
    }
    if(steps === 0)
    {
      context.fillRect(x,y,grosor,grosor);
      return;
    }
    xs = dx/steps;
    ys = dy/steps;
    for(let i = 0; i<= steps; i++)
    {
      context.fillRect(x,y,grosor,grosor);
      x += xs;
      y += ys;
    }
  }

export function PMD(x1, y1, x2, y2, context)
  {
    let x,y,dx,dy,incx=1,incy=1,incE,incNE,p=0;

    x = x1;
    y = y1;
    dx = x2-x1;
    dy = y2-y1;

    if(dx < 0)
    {
      dx = -dx;
      incx = -1;
    }

    if(dy < 0)
    {
      dy = -dy;
      incy = -1;
    }

    if(Math.abs(dx) > Math.abs(dy))
    {
      incE = 2 * dy;
      incNE = 2 * (dy-dx);
      while(x !== x2)
      {
        context.fillRect(x,y,3,3);
        x += incx;
        if(2 * (p+dy) < dx)
        {
          p += incE;
        }else
        {
          p += incNE;
          y += incy;
        }
      }
    }else
    {
      incE = 2 * dx;
      incNE = 2 * (dx-dy);
      while(y !== y2)
      {
        context.fillRect(x,y,3,3);
        y += incy;
        if(2 * (p+dx) < dy)
        {
          p += incE;
        }else
        {
          p += incNE;
          x += incx;
        }
      }
    }
  }

export function FlowerBresenham(x1,y1,x2,y2, context)
  {
    let x, y, p, r;
    let dx = x2-x1;
    let dy = y2-y1;
    r = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    x = 0;
    y = r;
    p = 3 - 2 * r;
    while(x <= y)
    {
      DrawPoints(x1, y1, x, y, context);
      if(p >= 0)
      {
        y--;
        p = p + 4 * x - 4 * y + 10;
      }else{
        x++;
        p = p + 4 * x + 6;
      }
      
    }
  }

export function CircleDDA(x1, y1, x2, y2, context,grosor)
  {
    let x, y, r, rx;
    let dx = x2-x1;
    let dy = y2-y1;
    r = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    rx = r;
    x = rx;
    y = 0;
    while(y < x)
    {
      DrawPoints(x1, y1, x, y, context,grosor);
      rx = rx - y / rx;
      x = rx;
      y++;
    }

  }
  export function EllipseDDA(context, x, y, a, b) {
    // Parámetros de la elipse
    var r_x = a;
    var r_y = b;
    var c = Math.sqrt(MdrawEllipseDDAath.pow(a, 2) - Math.pow(b, 2));
    var m = 0;
  
    // Puntos iniciales
    var x0 = 0;
    var y0 = b;
  
    // Primer cuadrante
    drawEllipsePoints(context, x, y, x0, y0);
  
    // Otros tres cuadrantes
    for (var i = 0; i < 3; i++) {
      var x1, y1;
  
      // Simetría sobre el eje y
      if (m >= -1 && m <= 1) {
        x1 = x0 + 1;
        y1 = y0;
  
        if (c > x0 + 0.5) {
          y1++;
        }
      }
  
      // Simetría sobre el eje x
      else {
        x1 = x0;
        y1 = y0 + 1;
  
        if (c <= x0 + 0.5) {
          x1++;
        }
      }
  
      drawEllipsePoints(context, x, y, x1, y1);
  
      // Actualizar puntos
      x0 = x1;
      y0 = y1;
      m = -Math.pow(a, 2) * y0 / (Math.pow(b, 2) * x0);
    }
  }
  
  function drawEllipsePoints(context, x, y, x0, y0) {
    context.fillRect(x + x0, y + y0, 1, 1);
    context.fillRect(x - x0, y + y0, 1, 1);
    context.fillRect(x + x0, y - y0, 1, 1);
    context.fillRect(x - x0, y - y0, 1, 1);
  }
  export function DrawPoints(xc, yc, x, y, context,grosor)
  {
    context.fillRect(xc+x, yc+y, grosor, grosor);
    context.fillRect(xc-x, yc+y,grosor, grosor);
    context.fillRect(xc+x, yc-y, grosor, grosor);
    context.fillRect(xc-x, yc-y, grosor, grosor);
    context.fillRect(xc+y, yc+x, grosor, grosor);
    context.fillRect(xc-y, yc+x, grosor, grosor);
    context.fillRect(xc+y, yc-x, grosor, grosor);
    context.fillRect(xc-y, yc-x, grosor, grosor);
  }
export  function CircleBresenham(x1,y1,x2,y2, context)
  {
    let x, y, p, r;
    let dx = x2-x1;
    let dy = y2-y1;
    r = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    x = 0;
    y = r;
    p = 3 - 2 * r;
    while(x <= y)
    {
      DrawPoints(x1, y1, x, y, context);
      if(p < 0)
      {
        p = p + 2 * x + 3;
        x++;
      }else{
        p = p + (2 * x) - (2 * y) + 5;
        x++;
        y--;
        
      }
      
    }
  }

export function CircleMidPoint(x1, y1, x2, y2, context)
  {
    let x, y, p, r;
    let dx = x2-x1;
    let dy = y2-y1;
    r = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    x = 0;
    y = r;
    p = 1-r;
    DrawPoints(x1, y1, x, y, context);
    while(x<y)
    {
      x++;
      if(p<0)
      {
        p = p + 2 * x + 3;
      }else
      {
        y--;
        p = p + 2 * (x-y) + 5;
      }
      DrawPoints(x1,y1,x,y, context);
    }
  }



export  function DrawPolygon(x1, y1, x2, y2, side, context, a,grosor)
  {

    const centerX = x1;
    const centerY = y1;
    let dx = x2-x1;
    let dy = y2-y1;
    let radius = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    const sides = side;
    const angle = 2 * Math.PI / sides;

    let x = (centerX + radius * Math.cos(0 + a));
    let y = (centerY + radius * Math.sin(0 + a));

    for (let i = 1; i <= sides; i++) {
      const x2 = (centerX + radius * Math.cos(angle * i + a));
      const y2 = (centerY + radius * Math.sin(angle * i + a));
      
      const dx = x2 - x;
      const dy = y2 - y;
      const steps = Math.max(Math.abs(dx), Math.abs(dy));
      
      const xIncrement = dx / steps;
      const yIncrement = dy / steps;

      let anteriorX = x;
      let anteriorY = y;
      
      for (let j = 0; j < steps; j++) { 
        x += xIncrement;
        y += yIncrement;
        DDA(anteriorX, anteriorY, x, y, context,grosor);
        anteriorX = x;
        anteriorY = y;
      }
    }
  }

  export function moveFigureForward(figure, layer) {
    var index = layer.elements.indexOf(figure);
    if (index !== -1) {
      layer.elements.splice(index, 1);
      layer.elements.push(figure);
    }
  }

  export function moveFigureBackward(figure, layer) {
    var index = layer.elements.indexOf(figure);
    if (index !== -1) {
      layer.elements.splice(index, 1);
      layer.elements.unshift(figure);
    }
  }

  export function Ellipse(xc, yc, xr, yr, context,grosor){
    xr = Math.abs(xr);
    yr = Math.abs(yr);

    let x = 0, y = yr;

    let p1 = Math.pow(yr,2) - Math.pow(xr,2) * yr+0.25 * Math.pow(yr,2);
    let p2 = 0;
    //context.fillRect(xc, yc, 3,3);
    context.fillRect(xc, yc+yr, 3,3);
    context.fillRect(xc, yc-yr, 3,3);
    while(Math.pow(yr,2) * x < Math.pow(xr,2) * y){
      if(p1<0){
        x++;
        p1 = p1 + 2 * Math.pow(yr,2) * x + Math.pow(yr,2);
      }else{
        x++;
        y--;
        p1 = p1 + 2 * Math.pow(yr,2) * x - 2 * Math.pow(xr,2) * y + Math.pow(yr,2);
      }
      context.fillRect(x+xc, y+yc, grosor,grosor);
      context.fillRect(-x+xc, y+yc, grosor,grosor);
      context.fillRect(-x+xc, -y+yc, grosor,grosor);
      context.fillRect(x+xc, -y+yc, grosor,grosor);
    }

    p2 = Math.pow(yr,2) * Math.pow(x+0.5,2) + Math.pow(xr,2) * Math.pow(y-1,2) - Math.pow(xr,2) * Math.pow(yr,2);
    while(y>0){
      if(p2>0){
        y--;
        p2 = p2 - 2 * Math.pow(xr,2) * y + Math.pow(xr,2);
      }else{
        x++;
        y--;
        p2 = p2 + 2 * Math.pow(yr,2) * x - 2 * Math.pow(xr,2) * y + Math.pow(xr,2);
      }
      context.fillRect(x+xc, y+yc, grosor,grosor);
      context.fillRect(-x+xc, y+yc, grosor,grosor);
      context.fillRect(-x+xc, -y+yc, grosor,grosor);
      context.fillRect(x+xc, -y+yc, grosor,grosor);
    }
  }

  export function RotateLine(x1,y1,x2,y2,angle,context){
    let angulo = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

    let centro_x = (x1 + x2) / 2;
    let centro_y = (y1 + y2) / 2;

    x1 -= centro_x;
    y1 -= centro_y;
    x2 -= centro_x;
    y2 -= centro_y;

    let nuevo_angulo = angulo + angle;

    var nueva_x1 = x1 * Math.cos(nuevo_angulo) - y1 * Math.sin(nuevo_angulo);
    var nueva_y1 = x1 * Math.sin(nuevo_angulo) + y1 * Math.cos(nuevo_angulo);
    var nueva_x2 = x2 * Math.cos(nuevo_angulo) - y2 * Math.sin(nuevo_angulo);
    var nueva_y2 = x2 * Math.sin(nuevo_angulo) + y2 * Math.cos(nuevo_angulo);

    x1 = nueva_x1 + centro_x
    y1 = nueva_y1 + centro_y
    x2 = nueva_x2 + centro_x
    y2 = nueva_y2 + centro_y

    const puntos = {
      x1,
      y1,
      x2,
      y2
    }

    //DDA(x1,y1,x2,y2,context);

    return puntos;
  }

  export function RotateSquare(x1,y1,x2,angle){

    let size = x2-x1;

    x2 = x1+size;
    let y2 = y1;
    let x3 = x1 + size;
    let y3 = y1 + size;
    let x4 = x1;
    let y4 = y1 + size;

    var angulo1 = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

    var centro_x = (x1 + x2 + x3 + x4) / 4
    var centro_y = (y1 + y2 + y3 + y4) / 4

    x1 -= centro_x
    y1 -= centro_y
    x2 -= centro_x
    y2 -= centro_y
    x3 -= centro_x
    y3 -= centro_y
    x4 -= centro_x
    y4 -= centro_y

    let nuevo_angulo1 = angulo1 + angle;

    var nueva_x1 = x1 * Math.cos(nuevo_angulo1) - y1 * Math.sin(nuevo_angulo1)
    var nueva_y1 = x1 * Math.sin(nuevo_angulo1) + y1 * Math.cos(nuevo_angulo1)
    var nueva_x2 = x2 * Math.cos(nuevo_angulo1) - y2 * Math.sin(nuevo_angulo1)
    var nueva_y2 = x2 * Math.sin(nuevo_angulo1) + y2 * Math.cos(nuevo_angulo1)
    var nueva_x3 = x3 * Math.cos(nuevo_angulo1) - y3 * Math.sin(nuevo_angulo1)
    var nueva_y3 = x3 * Math.sin(nuevo_angulo1) + y3 * Math.cos(nuevo_angulo1)
    var nueva_x4 = x4 * Math.cos(nuevo_angulo1) - y4 * Math.sin(nuevo_angulo1)
    var nueva_y4 = x4 * Math.sin(nuevo_angulo1) + y4 * Math.cos(nuevo_angulo1)

    x1 = nueva_x1 + centro_x
    y1 = nueva_y1 + centro_y
    x2 = nueva_x2 + centro_x
    y2 = nueva_y2 + centro_y
    x3 = nueva_x3 + centro_x
    y3 = nueva_y3 + centro_y
    x4 = nueva_x4 + centro_x
    y4 = nueva_y4 + centro_y

    const puntos = {
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
      x3: x3,
      y3: y3,
      x4: x4,
      y4: y4
    }

    return puntos;
    //DDA(x1,y1,x2,y2,context);
    // DDA(x1,y1,x2,y2,context);
    // DDA(x2,y2,x3,y3,context);
    // DDA(x3,y3,x4,y4,context);
    // DDA(x4,y4,x1,y1,context);
  }

  export function DrawSquare(x1,y1,x2,y2,x3,y3,x4,y4,context,grosor){
    DDA(x1,y1,x2,y2,context,grosor);
    DDA(x2,y2,x3,y3,context,grosor);
    DDA(x3,y3,x4,y4,context,grosor);
    DDA(x4,y4,x1,y1,context,grosor);
  }

  export function DrawRectangle(x1,y1,x2,y2,x3,y3,x4,y4,context,grosor){
    DDA(x1,y1,x3,y3,context,grosor);
    DDA(x3,y3,x2,y2,context,grosor);
    DDA(x2,y2,x4,y4,context,grosor);
    DDA(x4,y4,x1,y1,context,grosor);
  }
  export function RotateRectangle(x1,y1,x2,y2,angle,context){
    
    let x4 = x1;
    let y4 = y2;
    let x3 = x2;
    let y3 = y1;

    var angulo1 = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

    var centro_x = (x1 + x2 + x3 + x4) / 4;
    var centro_y = (y1 + y2 + y3 + y4) / 4;

    x1 -= centro_x;
    y1 -= centro_y;
    x2 -= centro_x;
    y2 -= centro_y;
    x3 -= centro_x;
    y3 -= centro_y;
    x4 -= centro_x;
    y4 -= centro_y;

    let nuevo_angulo1 = angulo1 + angle;

    var nueva_x1 = x1 * Math.cos(nuevo_angulo1) - y1 * Math.sin(nuevo_angulo1);
    var nueva_y1 = x1 * Math.sin(nuevo_angulo1) + y1 * Math.cos(nuevo_angulo1);
    var nueva_x2 = x2 * Math.cos(nuevo_angulo1) - y2 * Math.sin(nuevo_angulo1);
    var nueva_y2 = x2 * Math.sin(nuevo_angulo1) + y2 * Math.cos(nuevo_angulo1);
    var nueva_x3 = x3 * Math.cos(nuevo_angulo1) - y3 * Math.sin(nuevo_angulo1);
    var nueva_y3 = x3 * Math.sin(nuevo_angulo1) + y3 * Math.cos(nuevo_angulo1);
    var nueva_x4 = x4 * Math.cos(nuevo_angulo1) - y4 * Math.sin(nuevo_angulo1);
    var nueva_y4 = x4 * Math.sin(nuevo_angulo1) + y4 * Math.cos(nuevo_angulo1);

    x1 = nueva_x1 + centro_x;
    y1 = nueva_y1 + centro_y;
    x2 = nueva_x2 + centro_x;
    y2 = nueva_y2 + centro_y;
    x3 = nueva_x3 + centro_x;
    y3 = nueva_y3 + centro_y;
    x4 = nueva_x4 + centro_x;
    y4 = nueva_y4 + centro_y;

    const puntos = {
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
      x3: x3,
      y3: y3,
      x4: x4,
      y4: y4
    }

    return puntos;

    //DDA(x1,y1,x2,y2,context);
    // DDA(x1,y1,x3,y3,context);
    // DDA(x3,y3,x2,y2,context);
    // DDA(x2,y2,x4,y4,context);
    // DDA(x4,y4,x1,y1,context);

  }

  export function ScaleLine(x1,y1,x2,y2,scale, angle, context){
    let centro_x = (x1+x2)/2;
    let centro_y = (y1+y2)/2;

    let factorEscala = scale;

    x1 = centro_x + factorEscala * (x1 - centro_x);
    y1 = centro_y + factorEscala * (y1 - centro_y);

    x2 = centro_x + factorEscala * (x2 - centro_x);
    y2 = centro_y + factorEscala * (y2 - centro_y);

    // if(angle === 0){
    //   DDA(x1,y1,x2,y2,context);
    // }else{
    //   RotateLine(x1,y1,x2,y2,angle,context);
    // }
    const puntos={
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2
    };
    return puntos;

  }

  export function MoverAAtras(figure, array){
    let currentIndex = array.indexOf(figure);
    if(currentIndex > 0){
      array.splice(currentIndex, 1);
      array.splice(currentIndex - 1, 0, figure);
    }
    console.log(array);
  }

  export function MoverADelante(figure, array){
    let currentIndex = array.indexOf(figure);
    if(currentIndex < array.length-1){
      array.splice(currentIndex,1);
      array.splice(currentIndex + 1, 0, figure);
    }
    console.log(array);
  }

  export function updatePixels(canvas, pixels){
    // Obtener el contexto de dibujo del canvas
    const ctx = canvas.getContext('2d');

    // Crear un objeto ImageData a partir de la matriz "pixels"
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;

    for (let x = 0; x < canvas.width; x++) {
      for (let y = 0; y < canvas.height; y++) {
        const pixelInfo = pixels[x][y];
        const i = (y * canvas.width + x) * 4;
        data[i] = pixelInfo[0];
        data[i + 1] = pixelInfo[1];
        data[i + 2] = pixelInfo[2];
        data[i + 3] = pixelInfo[3];
      }
    }
  

    // Actualizar el canvas con los nuevos datos de píxeles
    ctx.putImageData(imageData, 0, 0);
  }
  export function getPixels(canvas) {
    // Obtener el contexto de dibujo del canvas
    const ctx = canvas.getContext('2d');

    const imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    const data = imageData.data;

    const pixels = new Array(canvas.width);
    for (let x = 0; x < canvas.width; x++) {
      pixels[x] = new Array(canvas.height);
    }

    for (let i = 0; i < data.length; i += 4) {
      const x = (i / 4) % canvas.width;
      const y = Math.floor((i / 4) / canvas.width);
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      pixels[x][y] = [r, g, b, a];
    }
    return pixels;
    //console.log(pixels);



    // Obtener el color del pixel inicial
    // const startColour = ctx.getImageData(startX, startY, 1, 1).data;
    
    // // Si el color del pixel inicial es el mismo que el color de relleno, no hacemos nada
    // if (match(startColour, fillColour)) return;
    
    // // Crear una pila para almacenar los pixeles a revisar
    // const pixelStack = [[10, 10]];
    
    // while (pixelStack.length) {
    //   const [x, y] = pixelStack.pop();
      
    //   // Obtener el color del pixel actual
    //   const pixelColour = ctx.getImageData(x, y, 1, 1).data;
      
    //   // Si el color del pixel actual es el mismo que el color de inicio, cambiar el color del pixel y agregar sus vecinos a la pila
    //   if (match(pixelColour, startColour)) {
    //     setPixel(ctx, x, y, fillColour);
        
    //     if (x > 0) pixelStack.push([x - 1, y]);
    //     if (x < canvas.width - 1) pixelStack.push([x + 1, y]);
    //     if (y > 0) pixelStack.push([x, y - 1]);
    //     if (y < canvas.height - 1) pixelStack.push([x, y + 1]);
    //   }
    // }
  }
  
  // Función auxiliar para comparar dos colores
  export function match(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
  }
  
  // Función auxiliar para cambiar el color de un pixel
  export function setPixel(ctx, x, y, colour) {
    ctx.fillStyle = `rgba(${colour.join(',')})`;
    ctx.fillRect(x, y, 1, 1);
  }

  