var path = require("path");
const util = require("util");
const fs = require("fs");
const ftp = require("./FTPClient");

const polizasPath = "polizas/";
const polizasFilter = "**/Fava*.pol";
const polizaServerpath = "server/";
const nominaPath = "nomina/";
const nominaFilter = "**/NQ0000.txt";

function getMes(_month) {
  //   console.log(_month);
  let mes = "";
  switch (_month) {
    case "01":
      mes = "Enero";
      break;
    case "02":
      mes = "Febrero";
      break;
    case "03":
      mes = "Marzo";
      break;
    case "04":
      mes = "Abril";
      break;
    case "05":
      mes = "Mayo";
      break;
    case "06":
      mes = "Junio";
      break;
    case "07":
      mes = "Julio";
      break;
    case "08":
      mes = "Agosto";
      break;
    case "09":
      mes = "Septiembre";
      break;
    case "10":
      mes = "Octubre";
      break;
    case "11":
      mes = "Noviembre";
      break;
    case "12":
      mes = "Diciembre";
      break;

    default:
      mes = "TEST";
      break;
  }
  return mes;
}

function getDirectory(_dir) {
  //   let datos = {};
  datos = {
    filename: null,
    destPath: null,
  };
  //   console.log(_dir);
  switch (true) {
    case /polizas/.test(_dir):
      let propiedad = _dir.substring(8, 11);
      let filename = path.parse(_dir).name;
      let mes = getMes(filename.substring(4, 6));

      datos.filename = filename;
      datos.destPath = `${polizaServerpath}${propiedad}/${mes}/${filename}.txt`;
      datos.isRemote = false;

      break;
    case /nomina/.test(_dir):
      datos.isRemote = true;
      break;
    case /server/.test(_dir):
      datos.filename = path.parse(_dir).base;
      datos.isRemote = true;
      break;
    default:
      dir = "nose alav ";
      break;
  }
  return datos;
}

function copyFile(src, dest) {
  (src = path.normalize(src)), (dest = path.normalize(dest));
  const folder = path.dirname(dest);
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
  console.log("6.- Copiando Archivo: ", src, " => ", dest);
  return util.promisify(fs.copyFile)(src, dest);
}

function copy2FTP(path_, _filename) {
  const client = new ftp(
    "ftp.dlptest.com",
    21,
    "dlpuser",
    "rNrKYTX9g7z3RgJRmxWuGHbeu",
    false
  );

  client.upload(path_, _filename);
  console.log("Enviando al FTP: ", path_, " => ", _filename);
}

module.exports = { getDirectory, getMes, copyFile, copy2FTP };
