function Form(name,listPoints){
    this.name = name
    this.list = listPoints
}
function Spot(number,x,y){
    this.n = number
    this.x = x
    this.y = y
}

function objToPassed(width,height,mod,space,listForm){
    this.w = width
    this.h = height
    this.mod = mod
    this.space = space
    this.forms = listForm
}

$(".letsAnalize").click(function(){
  data = new objToPassed(canvasWidth,canvasHeight,2,space,listForms)
  sessionStorage.setItem('obj',JSON.stringify(data))

  window.location.href = '/paint'
})

var canvasWidth = 300;
var canvasHeight = 420;
var canvas = null;
var bounds = null;
var ctx = null;
var hasLoaded = false;

var startX = 0;
var startY = 0;
var mouseX = 0;
var mouseY = 0;
var nPoints = 0;
var nForms = 0;
var listForms = [];
var listPoints = [];
var actions = [];
var space = 5;

var isDrawing = false;

var canvasDiv = document.getElementById('canvasDiv');

var margemDeErro = 5;
function onmousedown(e){
    if (hasLoaded && e.button === 0) {
      if (!isDrawing) {
        if(nForms < 1){
              
          startX = e.clientX - bounds.left;
          startY = e.clientY - bounds.top;

          isDrawing = true

        }else{
          testX = e.clientX - bounds.left;
          testY = e.clientY - bounds.top;
          //dir acima
          pixel1 = ctx.getImageData(testX+5, testY+5, 1, 1).data
          //acima
          pixel2 = ctx.getImageData(testX, testY+5, 1, 1).data
          //acima izquerda
          pixel3 = ctx.getImageData(testX-5, testY+5, 1, 1).data
          //dir meio
          pixel4 = ctx.getImageData(testX+5, testY, 1, 1).data
          //meio
          pixel5 = ctx.getImageData(testX, testY, 1, 1).data
          //meio izquerda
          pixel6 = ctx.getImageData(testX-5, testY, 1, 1).data
          //dir abaixo
          pixel7 = ctx.getImageData(testX+5, testY-5, 1, 1).data
          //abaixo
          pixel8 = ctx.getImageData(testX, testY-5, 1, 1).data
          //abaixo izquerda
          pixel9 = ctx.getImageData(testX-5, testY-5, 1, 1).data

          console.log(pixel1[1])

          if(pixel1[1] == 195 || pixel2[1] == 195 || pixel3[1] == 195 || pixel4[1] == 195 || pixel5[1] == 195 || pixel6[1] == 195 || pixel7[1] == 195 || pixel8[1] == 195 || pixel8[1] == 195){
            callAlert('danger',"Você não pode sobrepor figuras",2)
          }else{
            startX = e.clientX - bounds.left;
            startY = e.clientY - bounds.top;

            isDrawing = true
          }
          
        }
      }
    }
    draw()
}
function onmouseup(e) {
	if (hasLoaded && e.button === 0) {
		if (isDrawing) {
			isDrawing = false;
		}

		draw();
	}
}

//cod basicamente o antigo
function draw() {
	ctx.fillStyle = "#333333";
  ctx.fillRect(0,0,canvasWidth,canvasHeight);
  
  //desenha os pontos
  ctx.beginPath();
  for (var i = 0; i < listPoints.length; ++i) {
    var line =  listPoints[i];
    //ctx.moveTo(line.x+8,line.y);
    ctx.strokeStyle = "#ffa321";
    ctx.arc(line.x,line.y, 8, 0, Math.PI * 2, false); // Círculo 
    ctx.fill();
  }
  ctx.stroke();

  //desenha as formas          cor das forms = #ffc36e
  ctx.beginPath();
  for (var i = 0; i < listForms.length; ++i) {
    var line =  listForms[i];

    primeiro = line.list[0]
    ctx.moveTo(primeiro.x, primeiro.y);
    for(var ii = 1; ii < line.list.length; ++ii){
      ctx.lineTo(line.list[ii].x,line.list[ii].y)
    }

    ctx.fillStyle = '#ffc36e';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ffc36e';
  }
  ctx.stroke();


  
  if(isDrawing == true){
    //ver se a figura ja se formou
    isFinaleToForm = false
    if(nPoints < 3){
      isFinaleToForm = false
    }else{
      //aqui vou verificar se a o spot da tocando no outro
      //melhor vou chamar a funcao que vai fazer isso
      resp = thisColide(listPoints,[startX,startY])
      if(resp){
        isFinaleToForm = true
      }else{
        isFinaleToForm = false
      }
    }
    if(isFinaleToForm == false){
      //para criar os spots ou linhas
      ctx.beginPath();
      ctx.moveTo(startX+8,startY);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#ffa321";
      ctx.arc(startX,startY, 8, 0, Math.PI * 2, false); // Círculo 
      ctx.fill();
      
      listPoints[nPoints] = new Spot(nPoints,startX,startY)
      nPoints++
    }else{
      // para criar uma figura
      ctx.beginPath();
      primeiro = listPoints[0]
      ctx.moveTo(primeiro.x, primeiro.y);
      for(var i = 1; i < listPoints.length; ++i){
        ctx.lineTo(listPoints[i].x,listPoints[i].y)
      }

      ctx.fillStyle = '#ffc36e';
      ctx.fill();
      ctx.lineWidth = 5;
      ctx.strokeStyle = '#ffc36e';
      ctx.stroke();

      listForms[nForms] = new Form(nForms,listPoints)
      nForms++

      eraseLines()
    }
    
  }
  ctx.stroke();
}
function thisColide(array,ponto){
  xbetween = false
  ybetween = false
  thisIsBetween = false
  for (var i = 0; i < array.length; ++i) {
    ThisObj = array[i]
    if(ponto[0] < ThisObj.x+margemDeErro && ponto[0] > ThisObj.x-margemDeErro){
      xbetween = true
    }else{
      xbetween = false
    }
    if(ponto[1] < ThisObj.y+margemDeErro && ponto[1] > ThisObj.y-margemDeErro){
      ybetween = true
    }else{
      ybetween = false
    }
    if(xbetween == true && ybetween == true){
      thisIsBetween = true
    }
  }
  return thisIsBetween

}
function createCanvas(){
    if(canvasDiv.children.length>0){
        canvasDiv.innerHTML = ''
    }
    canvas = document.createElement('canvas');
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    canvas.setAttribute('id', 'canvas');
    canvas.className = 'canvasNew'

    canvasDiv.appendChild(canvas)
}

function ini() {
	canvas = document.getElementById("canvas");
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	canvas.onmousedown = onmousedown;
	canvas.onmouseup = onmouseup;
	canvas.onmousemove = onmousemove;

	bounds = canvas.getBoundingClientRect();
	ctx = canvas.getContext("2d");
	hasLoaded = true;


  draw();
    
}

createCanvas()
ini()

$(".erase").click(function(){
  eraseLines()
  eraseForms()
  draw();
})

function eraseLines(){
  listPoints = null;
  listPoints = []
  nPoints = 0
}
function eraseForms(){
  listForms = null;
  listForms = []
  nForms = 0
}
  
$("#resolucao").change(function(){

  result = Number($(this)[0].value)

  if(result == 5){
    $("#resolucao").css("width","60%")
    $(".rePersonalizar").css("width","40%")
    $(".rePersonalizar").css("display","block")
  }else{
    $("#resolucao").css("width","100%")
    $(".rePersonalizar").css("width","0px")
    $(".rePersonalizar").css("display","none")
  }
  switch (result) {
    case 1:
      canvasWidth = 300;
      canvasHeight = 420;

      createCanvas()
      ini()

      break;
    case 2:
      canvasWidth = 420;
      canvasHeight = 300;

      createCanvas()
      ini()
      break;
    case 3:
      canvasWidth = 400;
      canvasHeight = 400;

      createCanvas()
      ini()
      break;
    case 4:
      canvasWidth = 600;
      canvasHeight = 200;

      createCanvas()
      ini()
      break;
    default:

  }
  existingLines = []
  draw();
  })
  
  $("#newWidth").change(function(){
    if($(this).val() > 600 || $(this).val() <= 0){
      $(this).addClass("text-danger")
      callAlert('danger',"O maior numero da escolha personalizada é 600",10)
      canvasWidth = 600;
    }else{
      $(this).removeClass("text-danger")
      canvasWidth = $(this).val();
    }
    createCanvas()
    ini()
  })
  $("#newHeight").change(function(){
    if($(this).val() > 600 || $(this).val() <= 0){
      $(this).addClass("text-danger")
      callAlert('danger',"O maior numero da escolha personalizada é 600",10)
      canvasHeight = 600;
    }else{
      $(this).removeClass("text-danger")
      canvasHeight = $(this).val();
  
    }
    createCanvas()
    ini()
  })
  $('.autoRecorrect').change(function(){
    ischecked = $('.autoRecorrect').is(':checked')
    if(ischecked){

      //borrar dps
      callAlert('danger',"A funcionalidade de isentar os quadros está em desenvolvimento, lamento por isso =(, vou me esforçar ao máximo para terminar, ESSE E MEU JEITO NINJA",10)

      $('.linhes').html(`
        <span> Corrigir em: </span>
        <input class="sizeLines" id="sizeLines" type="number" placeholder="Tamanho em cm" size="10" maxlength="100"/>
      `)
    }else{
      $('.linhes').html('')
    }
  })
  $('.sizeLines').change(function(){
    space = $(this).val()
  })
 