function filter(name, png, tinyDesc, urlImg, metods){
    this.name = name
    this.ForPng = png
    this.desc = tinyDesc
    this.src = urlImg
    this.metods = metods
}

function category(name, filters){
    this.name = name
    this.listFilters = filters
}

filter3 = new filter("Aquarela","yes","Faz seu desenho perder um pouco o foco, melhor para casos de foto reais.","null","denoise(17).update();")

filter1 = new filter("Fantasia","yes","Efeito que pode deixar sua imagem psicodelica ... ou fazer a uma jojo reference.","null","hueSaturation(0.31, 0.17).update();")
filter2 = new filter("Sepia","yes","Perfeito para deixar sua imagem com aquela cara de antigua.","null","hueSaturation(0, -0.74).update();")
filter4 = new filter("Alto Lomo", "yes", "Aumenta as cores e a saturação da sua imagem, deixando-o bem mais estelizada.","null","hueSaturation(-0.06, 0.34).update();")

category1 = new category("Filtros de Cores",[filter1,filter2,filter4])
category2 = new category("Filtros de Efeitos",[filter3])

filtros = [category1,category2]

function createMenuFilter(){
    for(i = 0; i < filtros.length; i++){
        $(".filters").append(`
        <br class="clearboth">
        <div class='category${i} shadow'>
        
        <h5> ${filtros[i].name} </h5>

        <br class="clearboth">
        </div>`)

        for(ii = 0; ii < filtros[i].listFilters.length; ii++){
            eprapng = "Nao suporta o formato PNG."
            if(filtros[i].listFilters[ii].src == "null"){
                filtros[i].listFilters[ii].src = "default.PNG"
            }
            if(filtros[i].listFilters[ii].ForPng == "yes"){
                eprapng = "Suporta o formato PNG."
            }
            $(".category"+i).append(`<div class='filter${filtros[i].listFilters[ii].name} squareFilters shadow' onclick='applyFilter("${filtros[i].listFilters[ii].metods}")'>
            
            <img src='images/filters/${filtros[i].listFilters[ii].src}' class="imgFilter">
            
            <p style="margin-bottom: 5px;margin-top: 5px;"> <strong>${filtros[i].listFilters[ii].name}</strong> </p>
            <p style="font-size:12px;margin-bottom: 2px;"> ${filtros[i].listFilters[ii].desc}</p>
            <p style="font-size:10px"><i> ${eprapng} </i></p>
            <br>
            
            </div>`)    
        }
    }
}

function applyFilter(metodos){
    metodos = "window.canvas.draw(window.texture)." + metodos
    eval(metodos)
}
