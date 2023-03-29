// faccio il check di avere il file di partenza
if (process.argv.length < 3) {
  console.log("Usage: node " + process.argv[1] + " FILENAME");
  process.exit(1);
}
// Read the file and print its contents.
const fs = require("fs");
const cliProgress = require("cli-progress");
const readline = require("readline");
const filename = process.argv[2];

// fs.readFile(filename, "utf8", function(err, data) {
// 	if (err) throw err;
// 	console.log("OK: " + filename);
// 	console.log(data);
// });

const readInterface = readline.createInterface({
  input: fs.createReadStream(filename),
  // output: process.stdout,
  console: false,
});

// create new progress bar
const b1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

// definizione parametri per fare i calcoli
let parameters = {
  // duration: null,
  // intersections: null,
  // streets: null,
  // cars: null,
  // points: null,
  contributorNumber: null,
  projectNumber: null,
};
let contributors = [];

let row = 0;
let contributorReaded = 0;
let lastContributor = null;
let lastSkillsToRead = 0;

let projectReaded = 0;

readInterface
  .on("line", function (line) {
    if (row == 0) {
      // faccio il primo controllo su intestazione
      let lineSplit = line.split(" ");
      parameters.contributorNumber = lineSplit[0];
      parameters.projectNumber = lineSplit[1];
    }

    // contributors
    if (
      row > 0 &&
      contributorReaded <= parameters.contributorNumber &&
      lastSkillsToRead == 0
    ) {
      let lineSplit = line.split(" ");

      // read name
      lastContributor = lineSplit[0];
      lastSkillsToRead = parseInt(row) + parseInt(lineSplit[1]);

      contributors[contributorReaded] = {
        name: lastContributor,
      };
    }

    // read skills
    if (
      row > 0 &&
      contributorReaded <= parameters.contributorNumber &&
      row < lastSkillsToRead &&
      lastSkillsToRead > 0
    ) {
      // do nothing
      let lineSplit = line.split(" ");
    } else {
      lastContributor = null;
      lastSkillsToRead = 0;
      contributorReaded++;
    }

    // if (row > 0 && row <= parameters.streets) {
    //   let lineSplit = line.split(" ");
    //   streets[lineSplit[2]] = {
    //     from: lineSplit[0],
    //     to: lineSplit[1],
    //     length: lineSplit[3],
    //   };
    // }
    // if (row > parameters.streets) {
    //   let lineSplit = line.split(" ");
    //   cars[c] = {
    //     path_length: lineSplit[0],
    //     streets: [...lineSplit.slice(1)],
    //     point_max: calcoloPunteggio(
    //       parameters,
    //       calcoloLunghezza([...lineSplit.slice(1)])
    //     ),
    //     length_max: calcoloLunghezza([...lineSplit.slice(1)]),
    //   };
    //   c++;
    // }
    row++;
  })
  .on("close", () => {
    console.log(parameters);

    console.log(contributors);

    // // console.log(streets);
    // console.log(
    //   Object.keys(streets).length == parameters.streets ? "streets ok!!" : ""
    // );
    // // console.log(cars);
    // console.log(Object.keys(cars).length == parameters.cars ? "cars ok!!" : "");

    // // creo le intersezioni
    // let intersections = [];
    // const intersectionsCount = Object.keys(streets).length;
    // const objKey = Object.keys(streets);

    // // initialize the bar - defining payload token "speed" with the default value "N/A"
    // b1.start(intersectionsCount, 0, {
    //   speed: "N/A",
    // });

    // for (let i = 0; i < intersectionsCount; i++) {
    //   // generate intersections
    //   let oldFrom = intersections[streets[objKey[i]].to]
    //     ? intersections[streets[objKey[i]].to].from
    //     : undefined;
    //   intersections[streets[objKey[i]].to] = {
    //     from: {
    //       ...oldFrom,
    //       [i]: objKey[i],
    //     },
    //     id: streets[objKey[i]].to,
    //   };

    //   // update values
    //   b1.update(i + 1);
    // }

    // stop the bar
    b1.stop();

    // // console.log(intersections);
    // console.log(
    //   Object.keys(intersections).length == parameters.intersections
    //     ? "intersections ok!!"
    //     : ""
    // );

    // // console.log(intersections.length);
    // // // calcolo del file da esportare
    // var logger = fs.createWriteStream(
    //   filename.replace(".txt", "") + "_sol.txt",
    //   {
    //     flags: "w", // 'a' means appending (old data will be preserved)
    //   }
    // );

    // logger.write("" + parseInt(intersections.length) + "\n");
    // intersections.forEach((intersection) => {
    //   logger.write("" + intersection.id + "\n");
    //   logger.write("" + Object.keys(intersection.from).length + "\n");

    //   for (const fromStreet in intersection.from) {
    //     logger.write("" + intersection.from[fromStreet] + " 1\n");
    //   }
    // });
    // logger.end();
  });
