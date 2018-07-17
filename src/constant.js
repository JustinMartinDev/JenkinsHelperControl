let serverUrl = "lmecxd0254:8080";
let username = "justin";
let apiKey = "6d4b95c8e07c261a5627aceb2341d8c4";

let bgColors = { "default": "#81b71a",
    "blue": "#00B1E1",
    "cyan": "#37BC9B",
    "green": "#8CC152",
    "red": "#E9573F",
    "yellow": "#F6BB42",
};

let logoType = {
    "hudson.matrix.MatrixProject" : "./img/matrixproject.png",
    "hudson.matrix.FreeStyleProject" : "./img/freestyleproject.png",
    "com.tikal.jenkins.plugins.multijob.MultiJobProject" : "./img/multiproject.png",
}
/*var jenkinsapi = require('jenkins-api');
var jenkins = jenkinsapi.init("http://lmecxd0254:8080");*/
let constant = {serverUrl, bgColors, logoType};
export default constant;