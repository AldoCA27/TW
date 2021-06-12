var idSeleccionadoParaEliminar=0;
var idSeleccionadoParaActualizar=0;
//Listo
function actionCreate(){
    var tabla                = $('#example1').DataTable();
    var actividad_create     = document.getElementById("actividad_create").value;
    var fecha_inicio_create  = document.getElementById("fecha_inicio_create").value;
    var fecha_fin_create     = document.getElementById("fecha_fin_create").value;
    var horas_create         = document.getElementById("horas_create").value;
    var observaciones_create = document.getElementById("observaciones_create").value;

    $.ajax({
        url: "php/crud-constancia.php",
        method: 'POST',
        data:{
            actividad     : actividad_create,
            fecha_inicio  : fecha_inicio_create,
            fecha_fin     : fecha_fin_create,
            horas         : horas_create,
            observaciones : observaciones_create,
            accion        : 'Create',
        },
        success: function(resultado){
            //alert(resultado);
            var objetoJSON=JSON.parse(resultado);
            
            if(objetoJSON.estado==1){
                var Botones ='<a class="btn btn-info btn-sm" data-toggle="modal" data-target="#modal-Actualizar" onclick="recuperaRegistroActualizar('+constancia.id+');" href="#">';
                Botones = Botones+' <i class="fas fa-pencil-alt">';
                Botones = Botones+' </i>';
                Botones = Botones+' Editar';
                Botones = Botones+' </a>';
                Botones = Botones+' <a class="btn btn-danger btn-sm" data-toggle="modal" data-target="#modal-default" onclick="identicaEliminar('+constancia.id+');" href="#">';
                Botones = Botones+' <i class="fas fa-trash">';
                Botones = Botones+' </i>';
                Botones = Botones+' Eliminar';
                Botones = Botones+' </a>';

                tabla.row.add( [
                    actividad_create,
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

//Listo
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
                        constancia.actividad,
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
//Listo
function actionUpdate(){
    var actividad_update     = document.getElementById("actividad_update").value;
    var fecha_inicio_update  = document.getElementById("fecha_inicio_update").value;
    var fecha_fin_update     = document.getElementById("fecha_fin_update").value;
    var horas_update         = document.getElementById("horas_update").value;
    var observaciones_update = document.getElementById("observaciones_update").value;
    $.ajax({
        url: "php/crud-constancia.php",
        method:'POST',
        data: {
            id            : idSeleccionadoParaActualizar,
            actividad     : actividad_update,
            fecha_inicio  : fecha_inicio_update,
            fecha_fin     : fecha_fin_update,
            horas         : horas_update,
            observaciones : observaciones_update,
            accion        : 'Update'
        },
        success: function( resultado ) {
            //Actualizar renglon aRREGAL ESTO
            var objetoJSON = JSON.parse(resultado);
            if(objetoJSON.estado == 1){
                alert(objetoJSON.mensaje);
                $('#modal-Actualizar').modal('hide');
                var tabla = $('#example1').DataTable();
                var renglon = tabla.row("#row_"+idSeleccionadoParaActualizar).data();
                renglon[0] = actividad_update;
                renglon[1] = fecha_inicio_update;
                renglon[2] = horas_update;
                tabla.row("#row_"+idSeleccionadoParaActualizar).data(renglon);
            }else{
                alert(objetoJSON.mensaje);
            }
        }
    });
}
//Listo
function recuperaRegistroActualizar(id){
    //alert(id);
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
                document.getElementById("actividad_update").value     = objetoJSON.actividad;
                document.getElementById("fecha_inicio_update").value  = objetoJSON.fecha_inicio;
                document.getElementById("fecha_fin_update").value     = objetoJSON.fecha_fin;
                document.getElementById("horas_update").value         = objetoJSON.horas;
                document.getElementById("observaciones_update").value = objetoJSON.observaciones;
            }else{
                alert(objetoJSON.mensaje);
            }
        }
    });
}
//Listo
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
//Listo
function identicaEliminar(id){
    alert("El id para eliminar es:"+id);
    idSeleccionadoParaEliminar=id;
}