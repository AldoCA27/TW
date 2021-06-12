<?php
    if(isset($_POST['accion'])){
        $accion  =   $_POST['accion'];
    }elseif (isset($_GET['accion'])){
        $accion  =   $_GET['accion'];
    }

    include 'acceso.php';
    switch ($accion) {
        case 'Create':
            accionCrear($acceso);
            break;
         case 'Delete':
            accionEliminar($acceso);
            break;
        case 'List':
            accionListar($acceso);
            break;
        case 'Update':
            accionActualizar($acceso);
            break;
        default:
            # code...
            break;
    }
    //Listo
    function accionCrear($acceso){
        $respuesta=array();

        $actividad     = $_POST['actividad'];
        $fecha_inicio  = $_POST['fecha_inicio'];
        $fecha_fin     = $_POST['fecha_fin'];
        $horas         = $_POST['horas'];
        $observaciones = $_POST['observaciones'];

        $Query = "INSERT INTO constancia (id, actividad, fecha_inicio, fecha_fin, horas, archivo, observaciones, "; 
        $Query =$Query."valida, observaciones_encargado, creditos, denominacion_id, alumno_id) VALUES ";
        $Query =$Query."(NULL, '".$actividad."', '".$fecha_inicio."', '".$fecha_fin."', '".$horas."', '', ";
        $Query =$Query."'".$observaciones."', '-1', 'Ninguna', '0', '50', '1');";
        //echo($Query);
        $resultado = mysqli_query($acceso,$Query);
        if($resultado >= 1){
            $respuesta['estado']  = 1;
            $respuesta['mensaje'] = "El registro se creo con exito";
            $respuesta['id']      = mysqli_insert_id($acceso);
            echo json_encode($respuesta);
        }else{
            $respuesta['estado']  = 0;
            $respuesta['mensaje'] = "Ocurrio un error desconocido";
            $respuesta['id']      = -1;
            echo json_encode($respuesta);
        }
        mysqli_close($acceso);
    }
    //Listo
    function accionEliminar($acceso){
        $respuesta = array();

        $id    =  $_POST['id'];
        $Query = "DELETE FROM constancia WHERE constancia.id = ".$id;
        mysqli_query($acceso,$Query);
        //Saber cuantos registros o renglones se afectaron en la base de datos
        $registrosEliminados=mysqli_affected_rows($acceso);
        if($registrosEliminados >= 1){
            $respuesta['estado']  = 1;
            $respuesta['mensaje'] = "El registro se eliminó con exito";
        }else{
            $respuesta['estado']  = 0;
            $respuesta['mensaje'] = mysqli_error($acceso);
        }
        echo json_encode($respuesta);
        mysqli_close($acceso);
    }
    //Listo
    function accionListar($acceso){
        $respuesta = array();
        if (isset($_GET['id'])){
            $id    =  $_GET['id'];
            $Query     = "SELECT * FROM constancia WHERE id=".$id;
            $resultado = mysqli_query($acceso,$Query);
            $numero    = mysqli_num_rows($resultado);
            if($numero >= 1){
                $row=mysqli_fetch_array($resultado);
                $respuesta["id"]            = $row["id"];
                $respuesta["actividad"]     = $row["actividad"];
                $respuesta["fecha_inicio"]  = $row["fecha_inicio"];
                $respuesta["fecha_fin"]     = $row["fecha_fin"];
                $respuesta["horas"]         = $row["horas"];
                $respuesta["observaciones"] = $row["observaciones"];
                
                $respuesta["estado"]       = 1;
                $respuesta["mensaje"]      = "Si hay registro para mostrar";
            }else{
                $respuesta["estado"]       = 0;
                $respuesta["mensaje"]      = "Error desconocido";
            }
        }else{
            $Query="SELECT * FROM constancia";
            $resultado=mysqli_query($acceso,$Query);
            $numero=mysqli_num_rows($resultado);
            if($numero>1){
            $respuesta["estado"]  = 1;
            $respuesta["mensaje"] = "Registros Encontrados";

            $respuesta["constancias"] = array();
            while($row=mysqli_fetch_array($resultado)){ //Se ejecuta el ciclo el numero de veces = número de registros
                $rowConstancia=array();
                $rowConstancia["id"]            = $row["id"];
                $rowConstancia["actividad"]     =  $row["actividad"];
                $rowConstancia["fecha_inicio"]  =  $row["fecha_inicio"];
                $rowConstancia["fecha_fin"] =  $row["fecha_fin"];
                $rowConstancia["horas"]         =  $row["horas"];
                $rowConstancia["observaciones"] =  $row["observaciones"];
                array_push($respuesta["constancias"],$rowConstancia);
            }
        }else{
            $respuesta["estado"]=0;
            $respuesta["mensaje"]="Registros no encontrados";
            }   
        }
        echo json_encode($respuesta);
        mysqli_close($acceso);
    }
    function accionActualizar($acceso){
        $id            = $_POST['id'];
        $actividad     = $_POST['actividad'];
        $fecha_inicio  = $_POST['fecha_inicio'];
        $fecha_fin     = $_POST['fecha_fin'];
        $horas         = $_POST['horas'];
        $observaciones = $_POST['observaciones'];

        $Query = "UPDATE constancia ";
        $Query = $Query."SET actividad='".$actividad."', fecha_inicio='".$fecha_inicio."', fecha_fin='".$fecha_fin."', horas=".$horas.", observaciones='".$observaciones."' ";
        $Query = $Query."WHERE id=".$id;
        $resultado = mysqli_query($acceso,$Query);
        $numero = mysqli_affected_rows($acceso);
        //echo $Query;
        if($numero >= 1){
            $respuesta["estado"]  = 1;
            $respuesta["mensaje"] = "Se actualizo correctamente";
        }else{
            $respuesta["estado"]  = 0;
            $respuesta["mensaje"] = "Ocurrio un error desconocido";
        }
        echo json_encode($respuesta);
        mysqli_close($acceso);
    }
?>