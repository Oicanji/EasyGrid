prefabs = [
     ({img: 'prefab1.png',name: 0,w:300,h:420,mod:2,space:5,forms:[{"name":0,"list":[{"n":0,"x":3.5,"y":4},{"n":1,"x":147.5,"y":6},{"n":2,"x":300.5,"y":160},{"n":3,"x":303.5,"y":265},{"n":4,"x":1.5,"y":275}]},{"name":1,"list":[{"n":0,"x":165.5,"y":6},{"n":1,"x":302.5,"y":141},{"n":2,"x":301.5,"y":6}]},{"name":2,"list":[{"n":0,"x":3.5,"y":285},{"n":1,"x":181.5,"y":282},{"n":2,"x":200.5,"y":419},{"n":3,"x":4.5,"y":416}]},{"name":3,"list":[{"n":0,"x":192.5,"y":282},{"n":1,"x":214.5,"y":420},{"n":2,"x":300.5,"y":422},{"n":3,"x":301.5,"y":278}]}]})
    ,({img: 'prefab2.png',name: 1,w:300,h:420,mod:2,space:5,forms:[{"name":0,"list":[{"n":0,"x":4,"y":10},{"n":1,"x":172,"y":7},{"n":2,"x":184,"y":234},{"n":3,"x":1,"y":287}]},{"name":1,"list":[{"n":0,"x":178,"y":9},{"n":1,"x":191,"y":236},{"n":2,"x":301,"y":242},{"n":3,"x":303,"y":8}]},{"name":2,"list":[{"n":0,"x":188,"y":242},{"n":1,"x":4,"y":297},{"n":2,"x":1,"y":421},{"n":3,"x":304,"y":424},{"n":4,"x":302,"y":251}]}]})
    ,({img: 'prefab3.png',name: 2,w:300,h:420,mod:2,space:5,forms:[{"name":0,"list":[{"n":0,"x":4.5,"y":284},{"n":1,"x":303.5,"y":284},{"n":2,"x":302.5,"y":4},{"n":3,"x":2.5,"y":3}]},{"name":1,"list":[{"n":0,"x":6.5,"y":294},{"n":1,"x":149.5,"y":292},{"n":2,"x":161.5,"y":423},{"n":3,"x":4.5,"y":421}]},{"name":2,"list":[{"n":0,"x":156.5,"y":296},{"n":1,"x":168.5,"y":420},{"n":2,"x":301.5,"y":423},{"n":3,"x":302.5,"y":294}]}]})
    ,({img: 'prefab4.png',name: 3,w:300,h:420,mod:2,space:5,forms:[{"name":0,"list":[{"n":0,"x":4,"y":4},{"n":1,"x":3,"y":118},{"n":2,"x":300,"y":154},{"n":3,"x":303,"y":8}]},{"name":1,"list":[{"n":0,"x":4,"y":124},{"n":1,"x":154,"y":144},{"n":2,"x":168,"y":421},{"n":3,"x":3,"y":422}]},{"name":2,"list":[{"n":0,"x":163,"y":147},{"n":1,"x":301,"y":164},{"n":2,"x":300,"y":279},{"n":3,"x":167,"y":293}]},{"name":3,"list":[{"n":0,"x":170,"y":301},{"n":1,"x":300,"y":289},{"n":2,"x":303,"y":422},{"n":3,"x":175,"y":419}]}]})
]

function contructPrefabs(){
    for(x = 0; x < prefabs.length; x++){
        $('.prefabs').append(`
            <div class="square" onclick="modalGrid('${prefabs[x].name}','images/grids/${prefabs[x].img}')">
                <img class="galleryViewer toGrids" src='images/grids/${prefabs[x].img}'>
            </div>
        `)
    }
}

function modalGrid(name,url){

    $('#canvasDiv').html(`
        <img src="${url}" class="shadow imgEdit toGrids" style="margin: 10px auto; text-aling:center">
    `)
    $('.buttonsSlide').html(`
        <button class="btn btn-light m-btn" onclick="letsGoEditGrid('${name}')"> Usar este Layout </button
    `)
    $('#headermodal').html(`
        <h2> Pré Visualização de Grid </h2>
        <p style="font-size:15px"> url da grid: "${url}" .</p>
    `)
    
    $(".showSlide").modal('show')
}

function letsGoEditGrid(nameObj){
    nPrefab = 0
    while(nameObj != prefabs[nPrefab].name || nPrefab == prefabs.length){
        nPrefab++
    }
    sessionStorage.setItem('obj',JSON.stringify(prefabs[nPrefab]))
    window.location.href = '/paint'
}

contructPrefabs()