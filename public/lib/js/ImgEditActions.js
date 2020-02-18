function moveImgs(){
    $('span.active').removeClass('active')
    $('.moveImgs').addClass('active')

    for(x = 0; x < reciveObj.forms.length; x++){
        if($(`.aviso${reciveObj.forms[x].name}`).hasClass('fraught')){
            $(`.aviso${reciveObj.forms[x].name}`).css('visibility','hidden')
        }else{
            $(`.aviso${reciveObj.forms[x].name}`).css('visibility','hidden')
        }
    }

    $('.menuTools').html(`
        <div class="mTitle">
            <h3> Mover a Imagem: </h3>
            <p> Selecione qualquer imagem dentro dos quadrados para editar, existem algumas opções abaixo para facilitar sua edição.</p>
        </div`)
}