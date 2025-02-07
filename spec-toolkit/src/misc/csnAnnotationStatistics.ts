import {log} from "../util/log.js";
import fg from "fast-glob";
import fs from "fs-extra";
import path from "path";
import * as _ from "lodash";

// Use like: tsx .\src\misc\csnAnnotationStatistics.ts .\tmp\s4-csn\
const targetDir = process.argv[2] || "./tmp/s4-csn/";

const files = fg.sync("*.json", { cwd: targetDir });
log.info(`Found ${files.length} .json files to analyze for CSN annotations.`);

interface AnnotationMap {
  [annotationName: string]: number;
}
const annotationMap: AnnotationMap = {};

for (const file of files) {
  const json = fs.readJSONSync(path.join(targetDir, file));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function cloneFn(this: AnnotationMap, _value: unknown, index: any): any {
    if (index && index.startsWith && index.startsWith("@")) {
      if (!this[index]) {
        this[index] = 1;
      } else {
        this[index]++;
      }
    }
  }
  _.cloneDeepWith(json, cloneFn.bind(annotationMap));
}

const annotationArray = Object.entries(annotationMap)
  .map((el) => {
    return { annotationName: el[0], count: el[1] };
  })
  .sort((a, b) => {
    return b.count - a.count;
  });

console.log("--------------------------------------------------------------------------");
console.log(annotationArray);
console.log("--------------------------------------------------------------------------");

fs.outputFileSync("./tmp/annotationStatistics.json", JSON.stringify(annotationArray, null, 2));
log.info("Written: ./tmp/annotationStatistics.json");

let csv = "Annotation Name,Count\n";
for (const entry of annotationArray) {
  csv += `${entry.annotationName},${entry.count}\n`;
}

fs.outputFileSync("./tmp/annotationStatistics.csv", csv);
log.info("Written: ./tmp/annotationStatistics.csv");
