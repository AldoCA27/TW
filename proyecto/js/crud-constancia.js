var idSeleccionadoParaEliminar=0;
var idSeleccionadoParaActualizar=0;
function actionCreate(){
    var tabla                = $('#example1').DataTable();
    var nombre_create        = document.getElementById("nombre_create").value;
    var fecha_inicio_create  = document.getElementById("fecha_inicio_create").value;
    var fecha_termino_create = document.getElementById("fecha_termino_create").value;
    var horas_create         = document.getElementById("horas_create").value;
    var observaciones_create = document.getElementById("observaciones_create").value;

    
    $.ajax({
        url: "php/crud-constancia.php",
        method: 'POST',
        data:{
            nombre        : nombre_create,
            fecha_inicio  : fecha_inicio_create,
            fecha_termino : fecha_termino_create,
            horas         : horas_create,
            observaciones : observaciones_create,
            accion        : 'Create',
        },
        success: function(resultado){
            var objetoJSON=JSON.parse(resultado);
            
            if(objetoJSON.estado==1){
                var Botones ='<a class="btn btn-info btn-sm" data-toggle="modal" data-target="#modal-Actualizar" onclick="recuperaRegistroActualizar('+constancia.id+');" href="#">';
                Botones=Botones+' <i class="fas fa-pencil-alt">';
                Botones=Botones+' </i>';
                Botones=Botones+' Editar';
                Botones=Botones+' </a>';
                Botones=Botones+' <a class="btn btn-danger btn-sm" data-toggle="modal" data-target="#modal-default" onclick="identicaEliminar('+constancia.id+');" href="#">';
                Botones=Botones+' <i class="fas fa-trash">';
                Botones=Botones+' </i>';
                Botones=Botones+' Eliminar';
                Botones=Botones+' </a>';

                tabla.row.add( [
                    nombre_create,
                    fecha_inicio_create,
                    horas_create,
                    Botones
                ] ).node().id='row_'+objetoJSON.id;
                tabla.draw( false );
                alert(objetoJSON.mensaje);
                $('#modal-nueva').modal('hide');
            }else{
                alert(objetoJSON.mensaje);
            }
         }
      });
}

function actionList(){
    $.ajax({
        url: "php/crud-constancia.php",
        method:'GET',
        data: {
            accion      : 'List'
        },
        success: function( resultado ) {
            var objetoJSON=JSON.parse(resultado);
            if (objetoJSON.estado==1){
                var tabla = $('#example1').DataTable();
                for (constancia of objetoJSON.constancias){
                    
                    var Botones ='<a class="btn btn-info btn-sm" data-toggle="modal" data-target="#modal-Actualizar" onclick="recuperaRegistroActualizar('+constancia.id+');" href="#">';
                    Botones=Botones+' <i class="fas fa-pencil-alt">';
                    Botones=Botones+' </i>';
                    Botones=Botones+' Editar';
                    Botones=Botones+' </a>';
                    Botones=Botones+' <a class="btn btn-danger btn-sm" data-toggle="modal" data-target="#modal-default" onclick="identicaEliminar('+constancia.id+');" href="#">';
                    Botones=Botones+' <i class="fas fa-trash">';
                    Botones=Botones+' </i>';
                    Botones=Botones+' Eliminar';
                    Botones=Botones+' </a>';

                    tabla.row.add( [
                        constancia.nombre,
                        constancia.fecha_inicio,
                        constancia.horas,
                        Botones
                    ] ).node().id='row_'+constancia.id;
                    tabla.draw( false );
                }
                alert(objetoJSON.mensaje);
            }
        }
    });

}

function actionUpdate(){
    var nombre_update        = document.getElementById("nombre_update").value;
    var fecha_inicio_update  = document.getElementById("fecha_inicio_update").value;
    var fecha_termino_update = document.getElementById("fecha_termino_update").value;
    var horas_update         = document.getElementById("horas_update").value;
    var observaciones_update = document.getElementById("observaciones_update").value;
    $.ajax({
        url: "php/crud-constancia.php",
        method:'POST',
        data: {
            id            : idSeleccionadoParaActualizar,
            nombre        : nombre_update,
            fecha_inicio  : fecha_inicio_update,
            fecha_termino : fecha_termino_update,
            horas         : horas_update,
            observaciones : observaciones_update,
            accion        : 'Update'
        },
        success: function( resultado ) {
            alert(resultado);
        var objetoJSON = JSON.parse(resultado);
        if(objetoJSON.estado==1){
            alert(objetoJSON.mensaje);
            $('#modal-editar').modal('hide');
            var tabla = $('#example1').DataTable();
            var renglon = tabla.row("#row_"+idSeleccionadoParaActualizar).data();
            renglon[0]=nombre_update;
            renglon[1]=fecha_inicio_update;
            renglon[2]=horas_update;
            tabla.row("#row_"+idSeleccionadoParaActualizar).data(renglon);
        }else{
            alert(objetoJSON.mensaje);
        }
        }
    });
}

function recuperaRegistroActualizar(id){
    alert(id);
    idSeleccionadoParaActualizar=id;
    $.ajax({
        url: "php/crud-constancia.php",
        method:'GET',
        data: {
            id     : idSeleccionadoParaActualizar,
            accion : 'List'
        },
        success: function( resultado ) {
            //alert("Datos: "+resultado);
            var objetoJSON = JSON.parse(resultado);
            if(objetoJSON.estado==1){
                document.getElementById("nombre_update").value        = objetoJSON.nombre;
                document.getElementById("fecha_inicio_update").value  = objetoJSON.fecha_inicio;
                document.getElementById("fecha_termino_update").value = objetoJSON.fecha_termino;
                document.getElementById("horas_update").value         = objetoJSON.horas;
                document.getElementById("observaciones_update").value = objetoJSON.observaciones;
            }else{
                alert(objetoJSON.mensaje);
            }
        }
    });
}

function actionDelete(){
    $.ajax({
        url: "php/crud-constancia.php",
        method:'POST',
        data: {
            id: idSeleccionadoParaEliminar,
            accion:'Delete'
        },
        success: function( resultado ) {
            var objetoJSON = JSON.parse(resultado);
            if(objetoJSON.estado == 1){
                var tabla = $('#example1').DataTable();
                tabla.row("#row_"+idSeleccionadoParaEliminar).remove().draw();
                alert(objetoJSON.mensaje);
                $('#modal-default').modal('hide');
            }else{
                alert(objetoJSON.mensaje);
            }
            //alert(resultado);
        }
    });
}

function identicaEliminar(id){
    alert("El id para eliminar es:"+id);
    idSeleccionadoParaEliminar=id;
}