<?php
$accion         =   $_POST['accion'];
include 'conexion.php';
switch ($accion) {
    case 'Create':
        accionCrear($conexion);
        break;
     case 'Delete':
        accionEliminar($conexion);
        break;
    case 'Read':
        accionLeer($conexion);
        break;
    case 'Update':
        accionActualizar($conexion);
        break;
    default:
        # code...
        break;
}

function accionCrear($conexion){
    $respuesta= array();

    $eje_tematico    =  $_POST['eje_tematico'];
    $modalidad      =   $_POST['modalidad'];
    $descripcion    =   $_POST['descripcion'];
    $factor         =   $_POST['factor'];
    $ejemplos       =   $_POST['ejemplos'];

    $Query="INSERT INTO denominacion (id, eje_tematico, modalidad, descripcion, factor, ejemplos) VALUES (NULL, '".$eje_tematico."', '".$modalidad."', '".$descripcion."', ".$factor.", '".$ejemplos."')";
    $resultado = mysqli_query($conexion,$Query);
    if ($resultado>=1){
        $respuesta['estado']=1;
        $respuesta['mensaje']="El registro se creo con exito";
        $respuesta['id']=mysqli_insert_id($conexion);
        echo json_encode($respuesta);
    }else{
        $respuesta['estado']=0;
        $respuesta['mensaje']="Ocurrio un error desconocido";
        echo json_encode($respuesta);
    }
}
function accionEliminar($conexion){
    $id    =  $_POST['id'];
}
function accionLeer($conexion){
    if (isset($_GET['id']))
    $id    =  $_GET['id'];
}
function accionActualizar($conexion){
    $id              =  $_POST['id'];
    $eje_tematico    =  $_POST['eje_tematico'];
    $modalidad      =   $_POST['modalidad'];
    $descripcion    =   $_POST['descripcion'];
    $factor         =   $_POST['factor'];
    $ejemplos       =   $_POST['ejemplos'];
}
?>