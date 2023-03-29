import IConvertTo from "./IConvertTo";
import IReplaceValue from "./IReplaceValue";

export default interface ITagDefinition {
  CollectAs?: string;
  StartWith?: string;
  CollectAsArray?: boolean;
  Property?: string;
  Tag: string;
  MergeWithLast?: string;
  Replace?: IReplaceValue;
  StripHtml?: boolean;
  ConvertTo?: IConvertTo;
  Type?: string;
  MergeWithNext?: string;
  IsSingleValue?: boolean;
  PropertyType?: IConvertTo;
  Properties?: ITagDefinition[];
}
