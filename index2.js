//Modulos
const fs = require("fs");
const chokidar = require("chokidar");

//Constantes
const path2monitor = "./polizas";
const path2server = "./server";

var watcher = chokidar.watch(path2monitor, {
  ignored: /^\./,
  persistent: true,
  ignoreInitial: true,
});

watcher.on("add",  (path) => {
  console.log("File", path, "has been added");
  fs.copyFile(path, path2server, (err) => {
    if (err) throw err;
    console.log('source.txt was copied to destination.txt');
  });
});

watcher.on("change", function (path) {
  console.log("File", path, "has been changed");
});

function copiar(source, dest) {}
// File destination.txt will be created or overwritten by default.
