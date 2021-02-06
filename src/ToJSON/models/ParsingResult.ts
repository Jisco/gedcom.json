import Statistics from "./Statistics";

export default class ParsingResult {
    constructor(obj: Object, stats?: Statistics) {
        this.Object = obj;
        
        /* istanbul ignore next */ 
        this.Statistics = stats ?? new Statistics();
    }

    Object: Object;
    Statistics: Statistics;
}