/**
 * Class with informations about a property
 */
export default class StatisticProperty{
    constructor(path: string, propertyname: string, value?: string){
        this.Path = path;
        this.PropertyName = propertyname;
        this.Value = value;
    }

    /**
     * path to the property
     */
    Path: string;

    /**
     * name of the property
     */
    PropertyName: string;

    /**
    * value of the property
    */
    Value?: string;
}