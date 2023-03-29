import IConvertTo from "../../../Common/interfaces/IConvertTo";

export default class ConvertTo implements IConvertTo {
  constructor(type: string) {
    this.Type = type;
  }

  Type: string;
}
