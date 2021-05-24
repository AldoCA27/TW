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
            var Botones ='<a class="btn btn-info btn-sm" data-toggle="modal" data-target="#modal-Actualizar" href="#">';
            Botones=Botones+' <i class="fas fa-pencil-alt">';
            Botones=Botones+' </i>';
            Botones=Botones+' Editar';
            Botones=Botones+' </a>';
            Botones=Botones+' <a class="btn btn-danger btn-sm" data-toggle="modal" data-target="#modal-default" href="#">';
            Botones=Botones+' <i class="fas fa-trash">';
            Botones=Botones+' </i>';
            Botones=Botones+' Eliminar';
            Botones=Botones+' </a>';

    tabla.row.add( [
        nombre_create,
        fecha_inicio_create,
        horas_create,
        Botones
    ] ).draw( false );

        alert(objetoJSON.mensaje);
}else{
    alert(objetoJSON.mensaje);
}
         }
      });
}

function actionUpdate(){
    alert("Actualizar registo (U pdate")
}

function actionDelete(){
    alert("Eliminar registro (D elate)")

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
            
            var Botones ='<a class="btn btn-info btn-sm" data-toggle="modal" data-target="#modal-Actualizar" href="#">';
            Botones=Botones+' <i class="fas fa-pencil-alt">';
            Botones=Botones+' </i>';
            Botones=Botones+' Editar';
            Botones=Botones+' </a>';
            Botones=Botones+' <a class="btn btn-danger btn-sm" data-toggle="modal" data-target="#modal-default" href="#">';
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
        }
    }
      });

}