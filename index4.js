//require
var chokidar = require("chokidar");

//Constants
//________________________________
//Monitoring Target Directory
const target_directory_01 = "data/";
const target_directory_02 = "data-001/";

//Something to use when events are received.
const log = console.log.bind(console);

//Initialize
//________________________________
//initialize chokidar
var watcher = chokidar.watch(target_directory_01, {
  ignored: /[\/\\]\./,

  persistent: true,
});
//Add monitoring target.
watcher.add(target_directory_02);

//Monitoring
//________________________________
//Ready for changes
watcher.on("ready", function () {
  //ready

  log("Initial scan complete. Ready for changes");

  //watched Paths

  var watchedPaths = watcher.getWatched();

  log("watchedPaths :", watchedPaths);

  //Files

  //_ _ _ _ _ _ _ _ _ _ _ _ _ _

  //Detect File added

  watcher.on("add", function (path, stats) {
    log(`File ${path} has been added`);

    if (stats) console.log(`File ${path} changed size to ${stats.size}`, stats);

    var watchedPaths = watcher.getWatched();

    log("watchedPaths :", watchedPaths);
  });

  //Detect File changed

  watcher.on("change", function (path, stats) {
    log(`File ${path} has been changed`);

    if (stats) console.log(`File ${path} changed size to ${stats.size}`, stats);
  });

  //Detect File removed

  watcher.on("unlink", function (path) {
    log(`File ${path} has been removed`);
  });

  //Directories

  //_ _ _ _ _ _ _ _ _ _ _ _ _ _

  //Detect Directory added

  watcher.on("addDir", function (path) {
    log(`Directory ${path} has been added`);
  });

  //Detect Directory removed

  watcher.on("unlinkDir", function (path) {
    log(`Directory ${path} has been removed`);
  });

  //Error

  //_ _ _ _ _ _ _ _ _ _ _ _ _ _

  //Detect Watcher Error

  watcher.on("error", function (path) {
    log(`Watcher error: ${error}`);
  });
});
