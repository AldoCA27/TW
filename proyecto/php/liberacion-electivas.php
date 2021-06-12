<?php
    if(isset($_POST['accion'])){
        $accion         =   $_POST['accion'];
    }elseif (isset($_GET['accion'])){
        $accion         =   $_GET['accion'];
    }
    
    include 'acceso.php';
    switch ($accion) {
        case 'ReadTables':
            accionLeer($acceso);
            break;
        case 'ReadBar':
            accionBarras($acceso);
            break;
        default:
            # code...
            break;
    }

    function accionLeer($acceso){
        $respuesta = array();
        $Query="SELECT eje_tematico, modalidad, ejemplos, descripcion FROM denominacion WHERE";
        $Query=$Query." eje_tematico='Inquietudes vocacionales propias' OR";
        $Query=$Query." eje_tematico='Énfasis en la profesión' OR";
        $Query=$Query." eje_tematico='Complementarias a la formación'";
        $resultado=mysqli_query($acceso,$Query);
        //echo($Query);
        $numero=mysqli_num_rows($resultado);
        //echo($numero);
        if($numero>1){
        $respuesta["estado"]=1;
        $respuesta["mensaje"]="Registros Encontrados";

        $respuesta["denominaciones"]=array();
            while($row=mysqli_fetch_array($resultado)){ //Se ejecuta el ciclo el numero de veces = número de registros
                $rowDenominacion=array();
                $rowDenominacion["eje_tematico"] = $row["eje_tematico"];
                $rowDenominacion["modalidad"]    = $row["modalidad"];
                $rowDenominacion["ejemplos"]     = $row["ejemplos"];
                $rowDenominacion["descripcion"]  = $row["descripcion"];
                
                array_push($respuesta["denominaciones"],$rowDenominacion);
            }
        }else{
            $respuesta["estado"]=0;
            $respuesta["mensaje"]="Registros no encontrados";
        }
        echo json_encode($respuesta);
        mysqli_close($acceso);
    }

    function accionBarras($acceso){
        $respuesta = array();
        $Query="SELECT * FROM electiva WHERE alumno_id = 1";
        $resultado=mysqli_query($acceso,$Query);
        $numero=mysqli_num_rows($resultado);
        if($numero>1){
            $respuesta["estado"]=1;
            $respuesta["mensaje"]="Registros Encontrados";

            $respuesta["electivas"] = array();
            while($row=mysqli_fetch_array($resultado)){ //Se ejecuta el ciclo el numero de veces = número de registros
                $rowElectiva = array();
                $rowElectiva["id"]                  = $row["id"];
                $rowElectiva["nombre"]              = $row["nombre"];
                $rowElectiva["creditos"]            = $row["creditos"];
                $rowElectiva["creditos_acumulados"] = $row["creditos_acumulados"];
                $rowElectiva["alumno_id"]           = $row["alumno_id"];

                array_push($respuesta["electivas"],$rowElectiva);
            }
            }else{
                $respuesta["estado"]=0;
                $respuesta["mensaje"]="Registros no encontrados";
            }
        echo json_encode($respuesta);
        mysqli_close($acceso);
    }
?>