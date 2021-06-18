<?php
    $servidor ="localhost";
    $usuario  = "root";
    $clave    = "";
    $base     = "electivas";

    $acceso = mysqli_connect($servidor,$usuario,$clave,$base);

    mysqli_set_charset($acceso,"utf8"); 
?>