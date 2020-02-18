

function saveExit(){
    for(x = 0; x < reciveObj.forms.length; x++){
        if($(`.aviso${reciveObj.forms[x].name}`).hasClass('fraught')){
            $(`.aviso${reciveObj.forms[x].name}`).css('visibility','hidden')
        }else{
            $(`.aviso${reciveObj.forms[x].name}`).css('visibility','hidden')
        }
    }

    $('span.active').removeClass('active')
    $('.save').addClass('active')
    $('.menuTools').css('visibility','hidden')


    html2canvas($(".marginView")[0], {
        onrendered: function(canvas) {
            var img = canvas.toDataURL()
            window.open(img);
          }
    });
    link = ''
    switch(reciveObj.img){
        case 'prefab4.png':
            link = 'hack1.png';
            break;
        default:
            link = 'no'
    }
    if(link != 'no'){
        saveCanva('images/hack/'+link)
    }else{
        callAlert('danger','ERRO: IMG BUFFEDED IS FAIL 752: <br> Por favor, verifique se a todos os canvas possuím images.')
    }
    alert('salvado...')
    window.location.href = './'
}
function saveCanva(url) {
    $('body').append(`
    <canvas id="tela" style="display=none" width="${$('.marginView').width()}" height="${$('.marginView').height()}"></canvas>
    `)

    var tela = document.getElementById("tela");
    var c = tela.getContext("2d");

    var imagem = new Image();
    imagem.src = url;
    imagem.onload = function(){
        tela.getContext("2d").drawImage(this,0,0,$('.marginView').width(),$('.marginView').height());
        var dURL = tela.toDataURL("image/png"),
            aTag = document.createElement("a");
        aTag.download = "image.png";
        aTag.href = dURL;
        aTag.textContent = "click to download";
        document.body.appendChild(aTag);
        aTag.click();
        aTag.parentNode.removeChild(aTag);
    };

    callAlert('success','No final, tudo deu certo =D')
}