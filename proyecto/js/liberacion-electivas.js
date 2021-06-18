function leerTablas(){
    var tabla_i = document.getElementById("tabla_ivp");
    var tabla_e  = document.getElementById("tabla_ep");
    var tabla_c  = document.getElementById("tabla_cf");
    $.ajax({
        url: "php/liberacion-electivas.php",
        method:'GET',
        data: {
            accion      : 'ReadTables'
        },
        success: function( resultado ) {
            var objetoJSON = JSON.parse(resultado);
            if(objetoJSON.estado == 1){
                for(denominacion of objetoJSON.denominaciones){
                    //alert(denominacion.eje_tematico);
                    if(denominacion.eje_tematico == "Inquietudes vocacionales propias"){
                        tabla_i.innerHTML += '<tr><td>'+denominacion.modalidad+'</td><td>'+denominacion.ejemplos+'</td><td>'+denominacion.descripcion+'</td></tr>'
                    }
                    else if(denominacion.eje_tematico == "Énfasis en la profesión"){
                        tabla_e.innerHTML += '<tr><td>'+denominacion.modalidad+'</td><td>'+denominacion.ejemplos+'</td><td>'+denominacion.descripcion+'</td></tr>'
                    }
                    else if(denominacion.eje_tematico == "Complementarias a la formación"){
                        tabla_c.innerHTML += '<tr><td>'+denominacion.modalidad+'</td><td>'+denominacion.ejemplos+'</td><td>'+denominacion.descripcion+'</td></tr>'
                    }
                }
                alert(objetoJSON.mensaje);
            }else{
                alert(objetoJSON.mensaje);
            }
        }
    });
}

function barraPorcentaje(){
    var barras = document.getElementById("barras");
    $.ajax({
        url: "php/liberacion-electivas.php",
        method:'GET',
        data: {
            accion      : 'ReadBar'
        },
        success: function( resultado ) {
            //alert(resultado);
            var objetoJSON = JSON.parse(resultado);
            if(objetoJSON.estado == 1){
                //alert(electiva.creditos_acumulados);
                var cont=0;
                var colors=["success", "warning", "danger"]
                for(electiva of objetoJSON.electivas){
                    var porcentaje = ((electiva.creditos_acumulados*100)/electiva.creditos);
                    //alert("Porcentaje "+porcentaje);
                    var bar   ='<blockquote class="quote-'+colors[cont]+'" id="barra'+electiva.id+'">';
                    bar = bar + '<p>'+electiva.nombre+'</p>';
                    bar = bar +  '<div class="progress">';
                    bar = bar +   '<div class="progress-bar bg-'+colors[cont]+' progress-bar-striped" role="progressbar"';
                    bar = bar +    'aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: '+parseInt(porcentaje)+'%">';
                    bar = bar +    '<span class="sr-only">'+parseInt(porcentaje)+'% Complete (success)</span>';
                    bar = bar +    '<div>'+parseInt(porcentaje)+'%</div>';
                    bar = bar +  '</div>';
                    bar = bar + '</div>';
                    bar = bar +'</blockquote>';
                    barras.innerHTML+=bar;
                    cont++;
                }
                alert(objetoJSON.mensaje);
            }else{
                alert(objetoJSON.mensaje);
            }
        }
    });
}