import ConvertTo from './ConvertTo.js';

export default class ConvertToDate extends ConvertTo {
  constructor(
    about,
    calculated,
    estimated,
    before,
    after,
    between,
    and,
    interpreted,
    from,
    to,
    value,
    hasMonth,
    hasYear,
    hasDay,
    original,
    calendar
  ) {
    super('Date');
    this.About = about ?? 'About';
    this.Calculated = calculated ?? 'Calculated';
    this.Estimated = estimated ?? 'Estimated';
    this.Before = before ?? 'Before';
    this.After = after ?? 'After';
    this.Between = between ?? 'Between';
    this.And = and ?? 'And';
    this.Interpreted = interpreted ?? 'Interpreted';
    this.From = from ?? 'From';
    this.To = to ?? 'To';
    this.Value = value ?? 'Value';
    this.HasMonth = hasMonth ?? 'HasMonth';
    this.HasYear = hasYear ?? 'HasYear';
    this.HasDay = hasDay ?? 'HasDay';
    this.Original = original ?? 'Original';
    this.Calendar = calendar ?? 'Calendar';
  }
}
