#!/usr/bin/env node
import yargs from 'yargs';
import { Convert as ConvertToJSON } from "./ToJSON/console";

const { hideBin } = require('yargs/helpers')
let argv = yargs(hideBin(process.argv)).argv

if (!argv.mode || argv.mode === "JSON") {
    ConvertToJSON(argv);
}
else {
    console.log("TODO: Conversion from JS\\JSON to GEDCOM");
}