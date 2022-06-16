// global variables
// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={API key} lat and long are required for key

// query selector variables
var search = document.querySelector('#search');

    // temperature variables
var temp0 = document.querySelector('#temp0');
var temp1 = document.querySelector('#temp1');
var temp2 = document.querySelector('#temp2');
var temp3 = document.querySelector('#temp3');
var temp4 = document.querySelector('#temp4');
var temp5 = document.querySelector('#temp5');

    // wind variables
var wind0 = document.querySelector('#wind0');
var wind1 = document.querySelector('#wind1');
var wind2 = document.querySelector('#wind2');
var wind3 = document.querySelector('#wind3');
var wind4 = document.querySelector('#wind4');
var wind5 = document.querySelector('#wind5');

    // humidity variables
var humid0 = document.querySelector('#humid0');
var humid1 = document.querySelector('#humid1');
var humid2 = document.querySelector('#humid2');
var humid3 = document.querySelector('#humid3');
var humid4 = document.querySelector('#humid4');
var humid5 = document.querySelector('#humid5');

// var functions
var apiKey = function() {
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}');
   
};

    // temperature
var  temp0Input= function() {

};

var temp1Input= function() {

};

var temp2Input= function() {

};

var temp3Input= function() {

};

var temp4Input= function() {

};

var temp5Input= function() {

};

    // wind (mph)
var wind0Input= function() {

};

var wind1Input= function() {

};

var wind2Input= function() {

};

var wind3Input= function() {

};

var wind4Input= function() {

};

var wind5Input= function() {

};

    // humidity (%)
var humid0Input= function() {

};

var humid1Input= function() {

};

var humid2Input= function() {

};

var humid3Input= function() {

};

var humid4Input= function() {

};

var humid5Input= function() {

};

// functions
function search(event) {

};

function display() {
    // call temp, wind, and humidity data
    
};

// eventlisteners