//Variable global
var display = document.getElementById("display");
var iniciar = new Boolean(true);
 
function clickDigito(digito){
 if(iniciar==true){
 display.value=digito;
 }
 else{
 display.value=display.value+digito;
 }
 iniciar = false;
}


//LIMPIAR
function presLimp(){
    display.value="";
}

//+
function presMas(operador){
    display.value=display.value+operador;
}

//-
function presMenos(operador){
    display.value=display.value+operador;
}

//*
function presMulti(operador){
    display.value=display.value+operador;
}

// DIVISION /
function presDiv(operador){
    display.value=display.value+operador;
}

// (
function presEntreuno(operador){
    display.value=display.value+operador;
}

// )
function presEntredos(operador){
    display.value=display.value+operador;
}

// .
function presPunto(operador){
    display.value=display.value+operador;
}

// =
function presIgual(){
    var resultado =eval(display.value);
    display.value=resultado;
}

// RAIZ CUADRADA
function presRaiz(){
    //Obtiene expresion
    //Evalua la expresion=genera un numero
    var numero=eval(display.value);
    //Calcular la raiz
    var raiz=Math.sqrt(numero);
    //Desplegar el resultado del calculo
    display.value=raiz;
}

// ln
function presln(){
    var numero=eval(display.value);
    var log=Math.log(numero);
    display.value=log;
}

// Log
function preslog(){
    var numero=eval(display.value);
    var loga=Math.log10(numero);
    display.value=loga;
}

// %
function presPorce(){
    var numero=eval(display.value);
    var porce=numero/100;
    display.value=porce;
}


// !
function presAdmi(){
    var num=eval(display.value);
    var res = 1; 
	for (i=1; i<=num; i++) {
		res = res * i; 
	}
	display.value=res; 
}

// ^
function presEle(){
        var pote= prompt("Potencia a la que se quiere elevar: ");
        var numero=eval(display.value); 
        var res= Math.pow(numero,pote);
         display.value = res;
}

