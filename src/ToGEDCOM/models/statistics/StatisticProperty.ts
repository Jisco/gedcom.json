/**
 * Class with informations about a property
 */
export default class StatisticProperty {
  constructor(path: string, value?: string, error?: string | undefined) {
    this.Path = path;
    this.Value = value;
    this.Error = error;
  }

  /**
   * path to the property
   */
  Path: string;

  /**
   * value of the property
   */
  Value?: string;

  /**
  
   */
  Error?: string;
}
