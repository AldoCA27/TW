<?php
    if(isset($_POST['accion'])){
        $accion         =   $_POST['accion'];
    }elseif (isset($_GET['accion'])){
        $accion         =   $_GET['accion'];
    }
    
    include 'acceso.php';
    switch ($accion) {
        case 'Read':
            accionLeer($acceso);
            break;
        default:
            # code...
            break;
    }
    function accionLeer($acceso){
        $respuesta = array();
        $Query="SELECT e.nombre, con.actividad, den.eje_tematico, ";
        $Query=$Query."den.modalidad, con.horas, den.factor, ele.creditos ";
        $Query=$Query."FROM constancia con, denominacion den, ";
        $Query=$Query."constancia_electiva ele, electiva e WHERE ";
        $Query=$Query."con.alumno_id = 1 AND con.denominacion_id = den.id ";
        $Query=$Query."AND ele.constancia_id = con.id AND e.id = ele.electiva_id";
        $resultado=mysqli_query($acceso,$Query);
        //echo($Query);
        $numero=mysqli_num_rows($resultado);
        if($numero>1){
            $respuesta["estado"]=1;
            $respuesta["mensaje"]="Registros Encontrados";
    
            $respuesta["constancias"]=array();
                while($row=mysqli_fetch_array($resultado)){ //Se ejecuta el ciclo el numero de veces = número de registros
                    $rowConstancia=array();
                    $rowConstancia["nombre"]       = $row["nombre"];
                    $rowConstancia["actividad"]    = $row["actividad"];
                    $rowConstancia["eje_tematico"] = $row["eje_tematico"];
                    $rowConstancia["modalidad"]    = $row["modalidad"];
                    $rowConstancia["horas"]        = $row["horas"];
                    $rowConstancia["factor"]       = $row["factor"];
                    $rowConstancia["creditos"]     = $row["creditos"];
                    
                    array_push($respuesta["constancias"],$rowConstancia);
                }
            }else{
                $respuesta["estado"]=0;
                $respuesta["mensaje"]="Registros no encontrados";
            }
            echo json_encode($respuesta);
            mysqli_close($acceso);
    }
?>