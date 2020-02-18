var reciveObj = JSON.parse(sessionStorage.getItem("obj"))

if(!reciveObj){
    window.location.href = '/newgrid'
}else{
    constructorPag(reciveObj)
}
comands = ''
function constructorPag(obj){

    console.log(obj)
    width = obj.w * obj.mod
    height = obj.h * obj.mod

    for(x = 0; x < obj.forms.length; x++){
        
        number = obj.forms[x].name

        figure = ""

        X_ini = 999999
        Y_ini = 999999

        pontoXMaior = 0
        pontoYMaior = 0
        pontoXMenor = 999999
        pontoYMenor = 999999

        for(xx = 0; xx < obj.forms[x].list.length; xx++){
            vectorX = obj.forms[x].list[xx].x*obj.mod
            vectorY = obj.forms[x].list[xx].y*obj.mod

            if(vectorX < X_ini && vectorY < Y_ini){
                X_ini = vectorX
                Y_ini = vectorY
            }
            if(vectorX > pontoXMaior){
                pontoXMaior = vectorX
            }
            if(vectorY > pontoYMaior){
                pontoYMaior = vectorY
            }
    
            if(vectorX < pontoXMenor){
                pontoXMenor = vectorX
            }
            if(vectorY < pontoYMenor){
                pontoYMenor = vectorY
            }
        }
        for(xx = 0; xx < obj.forms[x].list.length; xx++){
            vectorX = obj.forms[x].list[xx].x*obj.mod
            vectorY = obj.forms[x].list[xx].y*obj.mod

            figure = figure + `${((vectorX-pontoXMenor)*100)/(pontoXMaior-pontoXMenor)}% ${((vectorY-pontoYMenor)*100)/(pontoYMaior-pontoYMenor)}%,`
        }
        //console.log("A figura "+number+" tem seu maior X:"+pontoXMaior+" Y:"+pontoYMaior+" | Menor X:"+pontoXMenor+" Y:"+pontoYMenor)
        figure = figure.substr(0,(figure.length - 1))

        console.log(" Out:"+figure)
        obj.space = 10
        $(".marginView").append(`
            <div class="box number${number}" style="
            width: ${pontoXMaior-pontoXMenor}px;
            height: ${pontoYMaior-pontoYMenor}px;
            clip-path: polygon(${figure});
            -webkit-clip-path: polygon(${figure});
            top: ${pontoYMenor}px; 
            left: ${pontoXMenor}px; 
            box-sizing: border-box;
            ">

                <div class="boxInside number${number}" style="
                position: absolute;
                width: ${(pontoXMaior-pontoXMenor)-(obj.space*2)}px;
                height: ${(pontoYMaior-pontoYMenor)-(obj.space*2)}px;
                top: ${obj.space}px;
                left: ${obj.space}px;
                background: red;
                clip-path: polygon(${figure});
                -webkit-clip-path: polygon(${figure});
                ">

            </div>
        `)

        /*$(".marginView").append(`
            <div class="figureOutside" style='width: ${width}px;height: ${height}px; clip-path: polygon(${figure.out});-webkit-clip-path: polygon(${figure.out});'>
            </div>
            <div class="figure${number} figureInside" style='width: ${width}px;height: ${height}px; clip-path: polygon(${figure.in});-webkit-clip-path: polygon(${figure.in});'>
            <div id="squareCanv${number}"><canvas class='canv' id='canvasdiv${number}' style="position: absolute; width:${bx-sx}px; height:${by-sy}px; top:${sy}px; left:${sx}px;"></canvas></div>
                <div class="divToCanvas aviso${number}" onclick="selectQua(${number},${by-sy},${bx-sx},${sy/2},${sx/2})" style="height: ${obj.h*reciveObj.mod}px; width: ${obj.w*reciveObj.mod}px;">
                    <div style="position: absolute;top: ${figure.MeioY-20}px;left: ${figure.MeioX-35}px;">
                        <i class="icofont-upload-alt"></i><p class="status${number}" style="font-size: 10px"> Click to Upload </p>
                    </div>
                </div>
            </div>
        `)*/
    }
    $('.marginView').css('width',width+'px')
    $('.marginView').css('height',height+'px')


}

$(".viewerAll").niceScroll({
    cursorwidth:10,
    cursoropacitymin:0.4,
    cursorcolor:'#2e2e2e',
    cursorborder:'none',
    cursorborderradius:4,
    autohidemode:'leave'
});

function menuClick(answ){
    $('.menuTools').css('visibility','visible')
    if(answ != viewer){
        viewer = answ
        changeView()
    }
}

function extraActivate(){

}
viewer = 'uploadImgs'
changeView()
function changeView(){
    switch(viewer){
        case 'save':
            saveExit();
            break;
        case 'moveImgs':
            moveImgs();
            break;
        case 'uploadImgs':
            viewEdit();
            break;
    }
}
