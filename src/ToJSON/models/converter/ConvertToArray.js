import ConvertTo from './ConvertTo.js';

export default class ConvertToArray extends ConvertTo {
  constructor(delimiter) {
    super('Array');
    this.Delimiter = delimiter ?? ',';
  }
}
