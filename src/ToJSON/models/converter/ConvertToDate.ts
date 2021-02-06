import ConvertTo from "./ConvertTo";

export default class ConvertToDate extends ConvertTo {
    constructor(about? :string,
        calculated? :string,
        estimated? :string,
        before? :string,
        after? :string,
        between? :string,
        and? :string,
        interpreted? :string,
        from? :string,
        to? :string,
        value? :string,
        hasMonth? :string,
        hasYear? :string,
        hasDay? :string,
        original? :string,
        calendar? :string) {
        super("Date");
        this.About = about ?? "About";
        this.Calculated = calculated ?? "Calculated";
        this.Estimated = estimated ?? "Estimated";
        this.Before = before ?? "Before";
        this.After = after ?? "After";
        this.Between = between ?? "Between";
        this.And = and ?? "And";
        this.Interpreted = interpreted ?? "Interpreted";
        this.From = from ?? "From";
        this.To = to ?? "To";
        this.Value = value ?? "Value";
        this.HasMonth = hasMonth ?? "HasMonth";
        this.HasYear = hasYear ?? "HasYear";
        this.HasDay = hasDay ?? "HasDay";
        this.Original = original ?? "Original";
        this.Calendar = calendar ?? "Calendar";
    }

    About :string;
    Calculated :string;
    Estimated :string;
    Before :string;
    After :string;
    Between :string;
    And :string;
    Interpreted :string;
    From :string;
    To :string;
    Value :string;
    HasMonth :string;
    HasYear :string;
    HasDay :string;
    Original :string;
    Calendar :string;
}