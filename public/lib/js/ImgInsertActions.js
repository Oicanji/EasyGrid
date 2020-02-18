imgRes = 'error'
function putImage(ObjImagem){
    if($(`.aviso${ObjImagem.div}`).hasClass('fraught')){
        $(`#squareCanv${ObjImagem.div}`).html('')
        $(`#squareCanv${ObjImagem.div}`).append(`
        <canvas class='canv' id='canvasdiv${ObjImagem.div}' style="position: absolute; width:${ObjImagem.width}px; height:${ObjImagem.height}px; top:${ObjImagem.top*2}px; left:${ObjImagem.left*2}px;"></canvas></div>
        `)
    }

    var canvas = new fabric.Canvas('canvasdiv'+ObjImagem.div, { width: ObjImagem.width, height: ObjImagem.height});
    canvas = canvas.setDimensions({top: ObjImagem.top, left: ObjImagem.left})
    var imgElement = document.getElementById(ObjImagem.img);
    var imgInstance = new fabric.Image(imgElement, {
        left:  0,
        top: 0,
        opacity: 1,
        originX: 'left',
        originY: 'top',
        fill: 'fff',
        transparentCorners: true
    });
    $(".aviso"+ObjImagem.div).addClass('fraught')

    canvas.add(imgInstance);
}

function viewEdit(){
    for(x = 0; x < reciveObj.forms.length; x++){
        $(`.aviso${reciveObj.forms[x].name}`).css('visibility','visible')
    }
    
    $('span.active').removeClass('active')
    $('.uploadImgs').addClass('active')

    $.ajax({
        url: "/paint/pushimgs",
        type: "GET",
        contentType: false,
        cache: false,
        processData: false,
    }).done(function(result) {
        imgRes = result

        $('.menuTools').html(`
            <div class="mTitle">
                <h3> Galeria: </h3>
                <p> Selecione um quadro, ou jogue as imagens dentro dos quadrados.
                <br>
                <div class='menuGallery'>

                </div>
                </div>
        `)
        for(y = 0; y < imgRes.imgs.length; y++){
            $('.menuGallery').append(`
                <div class="square insertsquare" onclick="insertImg('${imgRes.imgs[y]}')" style="height: 85px;
                width: 85px; line-height: 82px;">
                    <img class="galleryViewer" id="img${imgRes.imgs[y]}" src='images/uploads/${imgRes.imgs[y]}' style="margin: 0px;">
                </div>
            `)
        }
    }).fail(function(){
        $('.menuTools').html(`
        <div class="mTitle">
            <h3> Galleria </h3>
            <h1> ERRO 404 </h1>
        </div`)
    })
}

quaSelect = 'null'

function insertImg(urlImg){
    
    if(quaSelect != 'null'){
        quaSelect.img = 'img'+urlImg
        putImage(quaSelect)
        $('.aviso'+quaSelect.div).removeClass('active')
        quaSelect = 'null'
        
    }else{
        $('.showImg').html(`
        <br><h3 onclick="hiddenImg()"> Clique para Voltar </h3><br>
            <div style="line-height: 82px;">
                <img id="showImg${urlImg}" src='images/uploads/${urlImg}' style="max-width: 60%;min-width: 50%;">
            </div>
            <p> Img-Name: ${urlImg} </p>
        `)
        var img = document.getElementById('img'+urlImg);
        var altura = img.naturalWidth
        var altura2 = img.naturalHeight
        extencao = ext(urlImg)
        $('.showImg').append(`
            <p style="float: left; margin-left: 20%"> Tipo de Imgem: ${extencao.toUpperCase()}.</p>
            <p style="float: right;margin-right: 20%"> Resolução: ${altura}x${altura2} em px. </p>
            <br style="clear:both">  
        `)

        $('.showImg').css('visibility','visible')
        $('.squareShowImg').css('visibility','visible')
    }
}
function ext(path) {
    var idx = (~-path.lastIndexOf(".") >>> 0) + 2;
    return path.substr((path.lastIndexOf("/") - idx > -3 ? -1 >>> 0 : idx));
}

function hiddenImg(){
    $('.showImg').css('visibility','hidden')
    $('.squareShowImg').css('visibility','hidden')
}

$( ".divToCanvas.active" ).click(function() {
    $('.divToCanvas').removeClass('active')
    quaSelect = 'null'
});
$('.squareShowImg').click(function(){
    $('.squareShowImg').css('visibility','hidden')
    $('.showImg').css('visibility','hidden')
})

function selectQua(div,h,w,t,l){
    if(quaSelect == 'null'){
        quaSelect = ({ div: div, height: h, width: w, top: t, left: l, img: null})
        $('.aviso'+div).addClass('active')
        $('.status'+div).html('This is Select')
    }else{
        $('.status'+quaSelect.div).html('Click to Upload')
        $('.aviso'+quaSelect.div).removeClass('active')
        quaSelect = ({ div: div, height: h, width: w, top: t, left: l, img: null})
        $('.aviso'+div).addClass('active')
        $('.status'+div).html('This is Select')
    }
    
}
