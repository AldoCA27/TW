var aux=0;
var aux_elec1=0;
var aux_elec2=0;
var aux_elec3=0;
function readTables(){
    var tabla_elec1 = document.getElementById("tabla_1");
    var tabla_elec2 = document.getElementById("tabla_2");
    var tabla_elec3 = document.getElementById("tabla_3");
    $.ajax({
        url: "php/desgloce-electivas.php",
        method:'GET',
        data: {
            accion      : 'Read'
        },
        success: function( resultado ) {
            //alert(resultado);
            
            var objetoJSON = JSON.parse(resultado);
            if(objetoJSON.estado == 1){
                for(constancia of objetoJSON.constancias){
                    if(constancia.nombre == "ELECTIVA 1"){
                        aux=constancia.creditos*constancia.factor;
                        tabla_elec1.innerHTML += '<tr><td>'+constancia.actividad+'</td><td>'+constancia.eje_tematico+'</td><td>'+constancia.modalidad+'</td><td>'+constancia.horas+'</td><td>'+aux+'</td><td>'+constancia.factor+'</td><td>'+constancia.creditos+'</td></tr>';
                        //alert(constancia.creditos);
                        aux_elec1=aux_elec1+parseFloat(constancia.creditos);
                    }
                    else if(constancia.nombre == "ELECTIVA 2"){
                        aux=constancia.creditos*constancia.factor;
                        tabla_elec2.innerHTML += '<tr><td>'+constancia.actividad+'</td><td>'+constancia.eje_tematico+'</td><td>'+constancia.modalidad+'</td><td>'+constancia.horas+'</td><td>'+aux+'</td><td>'+constancia.factor+'</td><td>'+constancia.creditos+'</td></tr>';
                        aux_elec2=aux_elec2+parseFloat(constancia.creditos);
                    }
                    else if(constancia.nombre == "ELECTIVA 3"){
                        aux=constancia.creditos*constancia.factor;
                        tabla_elec3.innerHTML += '<tr><td>'+constancia.actividad+'</td><td>'+constancia.eje_tematico+'</td><td>'+constancia.modalidad+'</td><td>'+constancia.horas+'</td><td>'+aux+'</td><td>'+constancia.factor+'</td><td>'+constancia.creditos+'</td></tr>';
                        aux_elec3=aux_elec3+parseFloat(constancia.creditos);
                    }
                }
                tabla_elec1.innerHTML += '<tr><td colspan="6"><b>Total</b></td><td><b>'+aux_elec1+'</b></td></tr>';
                tabla_elec2.innerHTML += '<tr><td colspan="6"><b>Total</b></td><td><b>'+aux_elec2+'</b></td></tr>';
                tabla_elec3.innerHTML += '<tr><td colspan="6"><b>Total</b></td><td><b>'+aux_elec3+'</b></td></tr>';
                alert(objetoJSON.mensaje);
            }else{
                alert(objetoJSON.mensaje);
            }
        }
    });
}