"use strict";

/* Get or create the application global variable */
var App = App || {};

var contractsByCountryCsv = "./data/Contracts_By_Geo_Date_Missing_Counts.csv";
/* IIFE to initialize the main entry of the application*/
(function() {

    // setup the pointer to the scope 'this' variable
    var self = this;

    /* Entry point of the application */
    App.start = function()
    {

        const data = new plot_By_Country(contractsByCountryCsv);

    };

}) ();
