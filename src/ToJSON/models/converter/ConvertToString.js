import ConvertTo from './ConvertTo.js';

export default class ConvertToString extends ConvertTo {
  constructor(newLineCharacter, newLineIfEmpty) {
    super('String');
    this.NewLineCharacter = newLineCharacter ?? '\n';
    this.NewLineIfEmpty = newLineIfEmpty;
  }
}
