//Cualquier funcion que se ponga fuera de las funciones se ejecutan
//function holaMundo(){
//    alert("Hola Mundo del JS 1");
  //  alert("Hola Mundo del JS 2");
//}

function sumaNumeros(){
    //Propiedad
    var primerNumero        =   parseInt(document.getElementById("numero1").value);
    var segundoNumero       =   parseInt(document.getElementById("numero2").value);

    //Todo el objeto
    var parrafoResultado    =   document.getElementById("resultado");
    var resultado           =   primerNumero+segundoNumero;
    parrafoResultado.innerHTML  = "Resultado: "+ resultado;
    //alert(resultado);
    //alert("Numero 1: "+document.getElementById("numero1").value);
    //alert("Numero 2: "+document.getElementById("numero2").value);
    //alert("Parrafo para el resultado"+document.getElementById("resultado").innerHTML);
    //alert("Para sumar");
}

function restaNumeros(){
    //alert("Para restar");
    var resultado=document.getElementById("numero1").value - document.getElementById("numero2").value;
    document.getElementById("resultado").innerHTML ="Resultado: "+resultado;

}

function multiplicaNumeros(){
    //alert("Para multiplicar");
    var resultado=document.getElementById("numero1").value * document.getElementById("numero2").value;
    document.getElementById("resultado").innerHTML ="Resultado: "+resultado;

}

function divisionNumeros(){
    //alert("Para dividir");
    var resultado=document.getElementById("numero1").value / document.getElementById("numero2").value;
    document.getElementById("resultado").innerHTML ="Resultado: "+resultado;
}