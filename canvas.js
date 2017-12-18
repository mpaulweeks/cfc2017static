CFC = window;
CFC.Canvas = {};

CFC.NewCanvas = function(canvasId){
  if (CFC.Canvas[canvasId] === undefined){
    var canvas = document.getElementById(canvasId);
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    var ctx = canvas.getContext('2d');

    var drawEllipse = function(colorStr, x, y, width, height){
      ctx.strokeStyle = colorStr;
      ctx.beginPath();
      ctx.ellipse(x, y, Math.floor(width/2), Math.floor(height/2), 0, 0, 2 * Math.PI);
      ctx.stroke();
    }
    var fillEllipse = function(colorStr, x, y, width, height){
      ctx.fillStyle = colorStr;
      ctx.beginPath();
      ctx.ellipse(x, y, Math.floor(width/2), Math.floor(height/2), 0, 0, 2 * Math.PI);
      ctx.fill();
    }

    var drawRectangle = function(colorStr, x, y, width, height){
      ctx.strokeStyle = colorStr;
      ctx.strokeRect(x, y, width, height);
    }
    var fillRectangle = function(colorStr, x, y, width, height){
      ctx.fillStyle = colorStr;
      ctx.fillRect(x, y, width, height);
    }

    var drawTriangle = function(colorStr, x1, y1, x2, y2, x3, y3){
      ctx.strokeStyle = colorStr;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x3, y3);
      ctx.lineTo(x1, y1);
      ctx.stroke();
    }
    var fillTriangle = function(colorStr, x1, y1, x2, y2, x3, y3){
      ctx.fillStyle = colorStr;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x3, y3);
      ctx.fill();
    }

    var drawLine = function(colorStr, x1, y1, x2, y2){
      ctx.strokeStyle = colorStr;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    CFC.Canvas[canvasId] = {
      drawEllipse,
      drawLine,
      drawRectangle,
      drawTriangle,
      fillEllipse,
      fillRectangle,
      fillTriangle,
    }
  }
  return CFC.Canvas[canvasId];
}
