import Parsing from "./models/Parsing";
import ParsingOptions from "../Common/ParsingOptions";
import StatisticProperty from "./models/statistics/StatisticProperty";

export function Convert(argv: any) {
  const options = new ParsingOptions();

  if (argv.path) {
    options.SetFilePath(argv.path as string);
  }

  if (argv.opt) {
    options.SetConfigFile(argv.opt as string);
  }

  if (argv.showProgress) {
    options.SetProgressFunction((linesCount: number, lineNumber: number) => {
      process.stdout.write(
        `\rProgress: parsing line ${lineNumber} from ${linesCount}`
      );
    });
  }

  let silent = false;
  if (argv.silent) {
    silent = true;
  }

  let onlyStats = false;
  if (argv.onlyStats) {
    onlyStats = true;
  }

  const parse = new Parsing(options);
  const start = new Date().getTime();
  parse
    .ParseFileAsync()
    .then((result) => {
      if (argv.out) {
        parse.SaveAs(result.Text, argv.out as string);
      } else {
        if (silent) {
          return;
        }

        if (!onlyStats) {
          // print in console
          console.log(JSON.stringify(result.Text, null, 1));
        }
      }

      if (silent) {
        return;
      }

      console.log("");
      console.log("-----------------------------------------------");
      console.log(`Lines: ${result.Statistics.PropertiesCount}`);
      console.log(`Parsed Lines: ${result.Statistics.ParsedPropertiesCount}`);
      console.log(
        `Not Parsed Lines: ${result.Statistics.NotParsedPropertiesCount}`
      );
      console.log(
        `Not Parsed Lines because of user defined Tag: ${result.Statistics.NotParsedPropertiesWithoutDefinitionCount}`
      );
      console.log(
        `Incorrect Lines: ${result.Statistics.IncorrectPropertiesCount}`
      );
      console.log(`Parsing Time: ${new Date().getTime() - start} ms`);
      console.log("-----------------------------------------------");
      console.log("");
      if (result.Statistics.NotParsedPropertiesCount > 0) {
        console.log(
          `Not Parsed Lines: ${result.Statistics.NotParsedPropertiesList}`
        );
      }

      if (result.Statistics.IncorrectPropertiesCount > 0) {
        console.log("");
        console.log("Incorrect Lines:");
        console.log("");
        console.log("Line\tText");
        console.log("-----------------------------------------------");
        result.Statistics.IncorrectProperties.forEach(
          (line: StatisticProperty) => {
            console.log(`${line.Path}\t${line.PropertyName}\t${line.Value}`);
          }
        );
      }
    })
    .catch((e) => {
      console.log(e);
    });
}
