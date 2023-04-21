import StatisticProperty from "./StatisticProperty";
import join from "lodash/join";

/**
 * Class with parsing statistics
 */
export default class Statistics {
  constructor() {
    this.ParsedProperties = [];
    this.IncorrectProperties = [];
    this.NotParsedProperties = [];
    this.NotParsedPropertiesWithoutDefinition = [];
  }

  /**
   * @returns list of all correct parsed properties
   */
  ParsedProperties: StatisticProperty[];
  /**
   * @returns list of all incorrect parsed properties
   */
  IncorrectProperties: StatisticProperty[];
  /**
   * @returns list of all not parsed properties
   */
  NotParsedProperties: StatisticProperty[];

  /**
   * @returns list of all not parsed properties
   */
  NotParsedPropertiesWithoutDefinition: StatisticProperty[];

  /**
   * @returns a count of all correctly parsed properties
   */
  get ParsedPropertiesCount(): number {
    return this.ParsedProperties.length;
  }

  /**
   * @returns a count of all incorrect parsed properties
   */
  get IncorrectPropertiesCount(): number {
    return this.IncorrectProperties.length;
  }

  /**
   * @returns a count of all not parsed properties
   */
  get NotParsedPropertiesCount(): number {
    return this.NotParsedProperties.length;
  }

  /**
   * @returns a count of all not parsed properties
   */
  get NotParsedPropertiesWithoutDefinitionCount(): number {
    return this.NotParsedPropertiesWithoutDefinition.length;
  }

  /**
   * @returns a count of all processed properties
   */
  get PropertiesCount(): number {
    return (
      this.ParsedProperties.length +
      this.IncorrectProperties.length +
      this.NotParsedProperties.length +
      this.NotParsedPropertiesWithoutDefinition.length
    );
  }

  /**
   * @returns a comma separated list of all not parsed property paths and property name
   */
  get NotParsedPropertiesList(): string {
    const paths: string[] = [];
    this.NotParsedProperties.forEach((line) => {
      paths.push(line.Path);
    });

    return join(paths, ", ");
  }
}
