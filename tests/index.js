const assert = require('assert');
const utils = require('tramway-core-testsuite');
const lib = require('../index.js');
var describeCoreClass = utils.describeCoreClass;
var describeFunction = utils.describeFunction;

describe("Simple acceptance tests to ensure library returns what's promised.", function(){
    describe("Should return a proper 'Connection' class", describeCoreClass(
        lib.Connection, 
        "Connection", 
        [],
        ["getItem", "getItems", "getAllItems", "findItems", "hasItem", "hasItems", "countItems", "createItem", "updateItem", "deleteItem", "deleteItems", "query"],
        function(testClass, testInstance, classFunctions, instanceFunctions) {
            instanceFunctions.forEach(function(func){
                var args = [];

                switch(func) {
                    case "getItems": 
                    case "hasItems": args = ["ids", "cb"]; break;
                    case "countItems":
                    case "findItems": args = ["conditions", "cb"]; break;
                    case "getAllItems": args = ["cb"]; break;
                    case "createItem": args = ["item", "cb"]; break;
                    case "updateItem": args = ["id", "item", "cb"]; break;
                    case "query": args = ["query", "values", "cb"]; break;
                    default: args = ["id", "cb"];
                }
                
                describe("The '" + func + "' function should have the same signature", describeFunction(
                    testInstance[func], 
                    args
                ));
            });
        }
    ));

    describe("Should return a proper 'Entity' class", describeCoreClass(
        lib.Entity, 
        "Entity", 
        [],
        ["hasAttribute", "serialize", "unserialize"],
        function(testClass, testInstance, classFunctions, instanceFunctions) {
            describe("The 'hasAttribute' function should have the same signature", describeFunction(
                testInstance["hasAttribute"], 
                ["attribute"]
            ));
            describe("The 'serialize' function should have the same signature", describeFunction(
                testInstance["serialize"],
                []
            ));
            describe("The 'unserialize' function should have the same signature", describeFunction(
                testInstance["unserialize"],
                ["item"]
            ));
        }
    ));

    describe("Should return a proper 'Model' class", describeCoreClass(
        lib.Model, 
        "Model", 
        [],
        ["getId", "setId", "updateEntity", "exists", "get", "getAll", "create", "update", "delete", "find", "getMany", "count"],
        function(testClass, testInstance, classFunctions, instanceFunctions) {
            instanceFunctions.forEach(function(func){
                var args = [];
                switch (func) {
                    case "getId": break;
                    case "setId": args = ["value"]; break;
                    case "updateEntity": args = ["item"]; break;
                    case "getMany": args = ["ids", "cb"]; break;
                    case "find": 
                    case "count": args = ["conditions", "cb"]; break;
                    default: args = ["cb"];
                }
                describe("The '" + func + "' function should have the same signature", describeFunction(
                    testInstance[func], 
                    args
                ));
            });
        }     
    ));

    describe("Should return a proper 'Repository' class", describeCoreClass(
        lib.Repository, 
        "Repository", 
        [],
        ["exists", "getOne", "get", "create", "update", "delete", "find", "getMany", "count", "setup"],
        function(testClass, testInstance, classFunctions, instanceFunctions) {
            instanceFunctions.forEach(function(func){
                var args = [];
                switch (func) {
                    case "create":
                    case "update": args = ["entity"]; break;
                    case "get": args = []; break;
                    case "getMany": args = ["ids"]; break;
                    case "find": 
                    case "count": args = ["conditions"]; break;
                    case "setup": args = []; break;
                    default: args = ["id"];
                }
                describe("The '" + func + "' function should have the same signature", describeFunction(
                    testInstance[func], 
                    args
                ));
            });
        }     
    ));
});