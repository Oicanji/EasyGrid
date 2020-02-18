function makeDivs(){

  $('body').append(`
    <div class="alerts">
        <div class="alerter"  data-aos="fade-right">
            <div class="progress">
            <div class="progress-bar progress-bar-striped progress-bar-animated" id="bar" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 50%"></div>
        </div>
        <h5 class="header-alerter"> O Sistema Informa que algo... </h5>
        <p class="txt-alerter"> sim isso mesmo isso e um texto, que louco kkkkkkkkkkkkkkkkk</p>
        <p class="cancel-alerter shadow" onclick="clikaste()"> omitir </p>
        </div>
    </div>
    <style>.alerter{
        z-index : 10000;
        display: none;
        position: absolute;
        bottom: 3%;
        right: 2%;
        height: 180px;
        width: 500px;
        padding: 10px;
        border: 1px solid #353131;
        background-color: #cacaca;
        border-width: 0px 0px 0px 18px;
        transition: all 1s ease;

    }
    .header-alerter{
        text-align: left;
        margin-top: 8px;
    }
    .txt-alerter{
        height:54%;
        margin-bottom: 0%;
    }
    .cancel-alerter:hover{
        opacity: 0.5;
        background-color: #8f8f8f0a;
        transition: all 0.3s ease;
    }
    /* referente a os alerters */
    .alert{
        color: white;
        border-color: #913030;
        background-color: #d14747;
    }
    .warning{
        color: white;
        border-color: #a78f28;
        background-color: #e6c11e;
    }
    .success{
        color: white;
        border-color: #388f51;
        background-color: #4bbd6c;
    }
    .info{
        color: white;
        border-color: #3d88b4;
        background-color: #62b0de;
    }</style>`)
}
makeDivs();
inExe = false
function callAlert(type, msg, time){
    if(inExe == false){
        switch(type){
            case 'danger':
                $('.alerter').addClass('alert')
                $('.header-alerter').html('O Sistema Alerta que:')
                setText(msg,time)
                break;
            case 'warning':
                $('.alerter').addClass('warning')
                $('.header-alerter').html('Cuidado!')
                setText(msg,time)
                break;
            case 'success':
                $('.alerter').addClass('success')
                $('.header-alerter').html('Tudo deu Certo no Final :) ...')
                setText(msg,time)
                break;
            case 'info':
                $('.alerter').addClass('info')
                $('.header-alerter').html('Tip para o Uso:')
                setText(msg,time)
                break;
        }
    }else{
        clikaste()
        callAlert(type, msg, time)
    }
}
function setText(msg,time){
    inExe = true;
    $('.txt-alerter').html('"'+msg+'"')
    lifeOfAlert(time)
}
var event = new Event('build');

function lifeOfAlert(time){
    $('.alerter').css('display','inline')

    progressbar = document.getElementById("bar");
    progressbar.style.width = '0%'

    whatTimePassed = 0
    addInTime = (100/time)/2
    progress = addInTime

    intervalAlert = setInterval( function() {
        whatTimePassed = whatTimePassed + 500

        progress = progress + addInTime
        progressbar.style.width = `${progress}%`

        if(progress > 100){
            $('.alerter').css('opacity','0')
        }
        if( whatTimePassed > time*1000){
            clearInterval(intervalAlert)
            $('.alerter').css('display','none')
            $('.alerter').removeClass('alert')
            $('.alerter').removeClass('warning')
            $('.alerter').removeClass('success')
            $('.alerter').removeClass('info')
            $('.alerter').css('opacity','1')
            inExe = false
        }
    }, 500 );
}
function clikaste() {
    if(intervalAlert){
        clearInterval(intervalAlert)
        $('.alerter').css('display','none')
        $('.alerter').removeClass('alert')
        $('.alerter').removeClass('warning')
        $('.alerter').removeClass('success')
        $('.alerter').removeClass('info')
        $('.alerter').css('opacity','1')
        inExe = false
    }
};
