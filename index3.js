//Node Modules
const chokidar = require("chokidar");

//Customs
const {
  getDirectory,
  getMes,
  copyFile,
  copy2FTP,
} = require("./functions/utils");

//Constants
const polizasPath = "polizas/";
const polizasFilter = "**/Fava*.pol";
const polizaServerpath = "server/";
const polizaServerpathFilter = "**/Fava*.txt";
const nominaPath = "nomina/";
const nominaFilter = "**/NQ0000.txt";

let watcher = null;
let ready = false;

let watch = function () {
  const FileListener = (path_) => {
    try {
      if (ready) {
        console.log("2.-Entra a listener");
        let { filename, destPath, isRemote } = getDirectory(path_);
        console.log("3.-Saca direccion", filename);

        // if (!fs.existsSync(dirpath) && !remote) {
        //   console.log("4.- Creando Directorio");
        //   fs.mkdirSync(dirpath, { recursive: true });
        // }
        console.log("5.- es Remoto ?:   ", isRemote);

        isRemote
          ? copy2FTP(path_, filename)
          : copyFile(path_, destPath);

        console.log("-------End Listener----------");
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (!watcher) {
    watcher = chokidar.watch(
      [
        polizasPath + polizasFilter,
        nominaPath + nominaFilter,
        polizaServerpath + polizaServerpathFilter,
      ],
      {
        ignored: /^\./,
        persistent: true,
        ignoreInitial: true,
      }
    );
  }
  watcher
    .on("add", FileListener)
    .on("change", FileListener)
    // .on('addDir', addDirecotryListener)
    // .on('unlink', fileRemovedListener)
    // .on('unlinkDir', directoryRemovedListener)
    .on("error", function (error) {
      console.info("An error has occurred:", error);
    })
    .on("ready", function () {
      console.info("1.-Ready to listen");
      ready = true;
    });
};

watch();
