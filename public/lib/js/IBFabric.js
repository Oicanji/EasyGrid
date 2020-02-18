
function makeMagicBorders(obj,mod,space){
    bigX = 0
    bigY = 0
    shortX = 9999
    shortY = 9999

    if(obj.list.length > 2){
        res = insideMake(obj,mod,space)
    }else{
        res = insideMakeTriangule(obj,mod,space)
    }
    return res
}
function insideMakeTriangule(obj,mod,space){
    outside = outsideMake(obj,mod,space)

    MeioX = (obj.list[0].x+obj.list[1].x+obj.list[2].x)/3
    MeioX = (obj.list[0].y+obj.list[1].y+obj.list[2].y)/3

    for(xx = 0; xx < obj.list.length; xx++){
        vectorX = obj.list[xx].x*mod
        vectorY = obj.list[xx].y*mod

        if(vectorX > MeioX){
            vectorY = vectorY - space
        }else{
            vectorY = vectorY + space
        }
        if(vectorY > MeioY){
            vectorY = vectorY - space
        }else{
            vectorY = vectorY + space
        }
        inside = inside + `${vectorX}px ${vectorY}px,`
    }
    inside = inside.substr(0,(inside.length - 1))
    console.log('\n\n MeioX:'+MeioX+'\n MeioY:'+MeioY+'\n maior X:'+bigX+'\n maior Y:'+bigY+'\n menor X:'+shortX+'\n menor Y:'+shortY+'\n outside:'+outside+'\n inside:'+inside)

    return {out: outside, in: inside, MeioX: MeioX, MeioY: MeioY, MaiorX: bigX, MaiorY: bigY, MenorX: shortX, MenorY: shortY}
}
function insideMake(obj,mod,space){
    outside = outsideMake(obj,mod,space)

    for(xx = 0; xx < obj.list.length; xx++){
        vectorX = obj.list[xx].x*mod
        vectorY = obj.list[xx].y*mod
        if(vectorX > bigX){
            bigX = vectorX
        }
        if(vectorY > bigY){
            bigY = vectorY
        }

        if(vectorX < shortX){
            shortX = vectorX
        }
        if(vectorY < shortY){
            shortY = vectorY
        }
        
    }
    MeioX = (bigX+shortX)/2
    MeioY = (bigY+shortY)/2
    
    inside = ''
    //inside
    execcaoAnteriorX = 1
    execcaoAnteriorY = 1
    for(xx = 0; xx < obj.list.length; xx++){
        vectorX = obj.list[xx].x*mod
        vectorY = obj.list[xx].y*mod

        if(MeioX < vectorX+90 && MeioX > vectorX-90){
            //console.log('\n A figura '+obj.name+' tem seu vetor n.'+obj.list[xx].n+' de X:'+vectorX+' Y:'+vectorY+' muito proximo ao seu centro no eixo X')
            execcaoAnteriorX = 2
        }else{
            //console.log('\n A figura '+obj.name+' tem seu vetor n.'+obj.list[xx].n+' de X:'+vectorX+' Y:'+vectorY+' normal no eixo X')
            if(vectorX > MeioX){
                vectorX = vectorX - space*execcaoAnteriorY
                //console.log('\n X Diminuiu')
            }else{
                vectorX = vectorX + space*execcaoAnteriorY
                //console.log('\n X Aumentou')
            }
            execcaoAnteriorX = 1   
        }
        if(MeioY < vectorY+90 && MeioY > vectorY-90){
            //console.log('\n A figura '+obj.name+' tem seu vetor n.'+obj.list[xx].n+' de X:'+vectorX+' Y:'+vectorY+' muito proximo ao seu centro no eixo Y')
            execcaoAnteriorY = 2
        }else{
            //console.log('\n A figura '+obj.name+' tem seu vetor n.'+obj.list[xx].n+' de X:'+vectorX+' Y:'+vectorY+' normal no eixo Y')
            if(vectorY > MeioY){
                vectorY = vectorY - space*execcaoAnteriorX
                //console.log('\n Y Diminuiu')
            }else{
                vectorY = vectorY + space*execcaoAnteriorX
                //console.log('\n Y Aumentou')
            }
            execcaoAnteriorY = 1
        }
        inside = inside + `${vectorX}px ${vectorY}px,`
    }
    inside = inside.substr(0,(inside.length - 1))
    console.log('\n\n MeioX:'+MeioX+'\n MeioY:'+MeioY+'\n maior X:'+bigX+'\n maior Y:'+bigY+'\n menor X:'+shortX+'\n menor Y:'+shortY+'\n outside:'+outside+'\n inside:'+inside)

    return {out: outside, in: inside, MeioX: MeioX, MeioY: MeioY, MaiorX: bigX, MaiorY: bigY, MenorX: shortX, MenorY: shortY}
}
function outsideMake(obj,mod){
    comands = ''
    for(xx = 0; xx < obj.list.length; xx++){
        vectorX = obj.list[xx].x*mod
        vectorY = obj.list[xx].y*mod

        comands = comands + `${vectorX}px ${vectorY}px,`
    }
    comands = comands.substr(0,(comands.length - 1))
    return comands
}