import trim from 'lodash/trim';
import toLower from 'lodash/toLower';
import toUpper from 'lodash/toUpper';
import split from 'lodash/split';
import upperFirst from 'lodash/upperFirst';
import startsWith from 'lodash/startsWith';
import trimStart from 'lodash/trimStart';
import assignIn from 'lodash/assignIn';
import toNumber from 'lodash/toNumber';

import objectPath from 'object-path';
import CalendarConverter from 'julian-gregorian';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import objectSupport from "dayjs/plugin/objectSupport";

import ConvertToDate from '../models/converter/ConvertToDate';
import fclone from 'fclone';

dayjs.extend(customParseFormat);
dayjs.extend(objectSupport);

/** properties for merging time and date */ 
let lastDate: object, lastConfig: ConvertToDate;
let hebcal: any = require('hebcal');

/**
 * Clears informations that are needed to merge date and time
 *
*/
export function ClearDateTimeMergingInfos() {
    lastDate = {};
    lastConfig = new ConvertToDate();
}

/**
 * Merges a time value with the last parsed date value
 *
 * @param value - The time text
 * @param ownProperty - If defined it adds the time value as own property to the date object
 * @returns The time value
*/
export function ConvertTimeStringToObject(value: string, ownProperty?: string) {
    if (!value) {
        return;
    }

    // if last date was not converted
    let lastDateValue = objectPath.get(lastDate, lastConfig.Value);
    
    if (!(lastDateValue instanceof Date)) {
        return value;
    }

    let timeSplit = split(value, ":");
    let lastDateAsObject = dayjs(lastDateValue);

    if (timeSplit.length === 1){
        // not possible
        return value;
    }
    
    if (timeSplit.length === 2 || timeSplit.length === 3){
        // hour:minute
        let hour = toNumber(timeSplit[0]);
        let min = toNumber(timeSplit[1]);
        let sec = toNumber(timeSplit.length === 3 ? timeSplit[2] : 0);
        if (isFinite(hour) && isFinite(min) && isFinite(sec) && hour > -1 && hour < 24 && min > -1 && min < 60 && sec > - 1 && sec < 60) {
            lastDateAsObject = lastDateAsObject.add(hour, "hour");
            lastDateAsObject = lastDateAsObject.add(min, "minute");
            lastDateAsObject = lastDateAsObject.add(sec, "second");
            objectPath.set(lastDate, lastConfig.Value, lastDateAsObject.toDate());
        }
        
        if (!ownProperty) {
            let lastDateOriginal = objectPath.get(lastDate, lastConfig.Original);
            objectPath.set(lastDate, lastConfig.Original, `${lastDateOriginal} ${value}`);
        }
    }

    return value;
}

/**
 * Converts a gedcom date string to an object
 *
 * @param config - The parsing configuration
 * @param value - The gedcom date string
 * @returns An object with the JS date and other properties
*/
export function ConvertDateStringToObject(config: ConvertToDate, value: string) {
    if (!value) {
        return;
    }

    let internValue = trim(toLower(value));
    let parsedObject = { };    
    lastConfig = config;
    objectPath.set(parsedObject, config.Original, value);

    // FROM - TO
    let groups = internValue.match(/(from )(.*)( to )(.*)/);
    if (groups && groups.length === 5) {
        objectPath.set(parsedObject, config.From , ParseDate(groups[2], config));
        objectPath.set(parsedObject, config.To, ParseDate(groups[4], config));

        lastDate = parsedObject;
        return parsedObject;
    }

    // FROM
    if (startsWith(internValue, "from")){
        objectPath.set(parsedObject, config.From, ParseDate(trimStart(internValue, "from "), config));
        lastDate = parsedObject;
        return parsedObject;
    }

    // TO
    if (startsWith(internValue, "to")){
        objectPath.set(parsedObject, config.To, ParseDate(trimStart(internValue, "to "), config));
        lastDate = parsedObject;
        return parsedObject;
    }

    // BETWEEN
    groups = internValue.match(/(between )(.*)( and )(.*)/);
    if (groups && groups.length === 5) {
        objectPath.set(parsedObject, config.Between, ParseDate(groups[2], config));
        objectPath.set(parsedObject, config.And, ParseDate(groups[4], config));

        lastDate = parsedObject;
        return parsedObject;
    }

    assignIn(parsedObject, ParseDate(internValue, config, true));
    lastDate = parsedObject;
    return parsedObject;
}

/**
 * Function to parse a gedcom date string to an object
 * @param date the gedcom date string
 * @param config the parsing configuartion
 * @param markAsBetweenIfNotExact flag so that a date, if it is not specified exactly, is output as two values that lie in the given period aka BETWEEN
 * @returns the date object
 * @internal
 */
function ParseDate(date: string, config: ConvertToDate, markAsBetweenIfNotExact = false) {
    let calendarType = "";
    let result = { };
    let gregorian = date.match(/(@#dgregorian@)(.*)/);
    let julian = date.match(/(@#djulian@)(.*)/);
    let hebrew = date.match(/(@#dhebrew@)(.*)/);

    if (gregorian) {
        date = trim(gregorian[2]);
    }
    else if (julian) {
        date = trim(julian[2]);
        calendarType = "Julian";
    }
    else if (hebrew) {
        date = trim(hebrew[2]);
        calendarType = "Hebrew";
    }
    else if (date.match(/(@#.*@) (.*)/)) {
        // unknown calender format
        return result;
    }

    let markerRegex = /(abt |cal |est |aft |bef |int )(.*)/;
    let groups = date.match(markerRegex);

    if (calendarType) {
        objectPath.set(result, config.Calendar, calendarType);
    }

    // no marker
    if (!groups) {
        // single date, mark as between with from - to if not an exact date
        if (markAsBetweenIfNotExact) {
            let internResult = {} as any;
            ConvertStringToDate(date, internResult, config, calendarType);

            let hasYear = objectPath.get(internResult, config.HasYear);
            let hasMonth = objectPath.get(internResult, config.HasMonth);
            let hasDay = objectPath.get(internResult, config.HasDay);

            if (hasYear && hasMonth && hasDay) {
                assignIn(result, internResult);
                return result;
            }

            objectPath.set(internResult, config.HasYear, true);
            objectPath.set(internResult, config.HasMonth, true);
            objectPath.set(internResult, config.HasDay, true);
            objectPath.set(result, config.Between, internResult);
            
            // calculate to value
            let and = { } as any;
            let startDate = objectPath.get(internResult, config.Value);
            if (!hasMonth) {
                // last day of year
                if (calendarType === "Hebrew") {
                    ConvertStringToDate(`1 nsn ${toNumber(date) + 1}`, and, config, calendarType);
                }
                else {
                    ConvertStringToDate(`1 jan ${startDate.getFullYear() + 1}`, and, config, calendarType);
                }
            }
            else {
                if (calendarType === "Hebrew") {
                    let dateSplit = split(date, " ");
                    let nextMonth = new hebcal.Month(ConvertShortMonthToFullMonth(dateSplit[0]), toNumber(dateSplit[1])).next();
                    let andDate = new hebcal.HDate(`1 ${nextMonth.getName()} ${dateSplit[1]}`);
                    objectPath.set(and, config.Value, andDate.greg());
                }
                else {
                    // last day of month
                    let dateValue = dayjs(upperFirst(date), 'MMM YYYY').add(1, "month");
    
                    if (calendarType === "Julian") {
                        dateValue = ConvertFromJulian(dateValue);
                    }       
    
                    let andDate = dateValue.toDate();
                    objectPath.set(and, config.Value, andDate);
                }

                objectPath.set(and, config.HasYear, true);
                objectPath.set(and, config.HasMonth, true);
                objectPath.set(and, config.HasDay, true);
            }

            objectPath.set(result, config.And, and);
            return result;
        }

        ConvertStringToDate(date, result, config, calendarType);
        return result;
    }

    while (groups != null && groups.length === 3) {
        let marker:string = groups[1];
        let dateContent:string = groups[2];

        SetMarker(marker, result, config);

        if (trim(marker) === "int") {
            // interpreted value, probably no real date
            objectPath.set(result, config.Value, toUpper(groups[2]));
            return result;
        }

        let oldGroups = fclone(groups);
        groups = dateContent.match(markerRegex);

        if (!groups) {
            groups = oldGroups;
            break;
        }
    }

    ConvertStringToDate(trim(groups[2]), result, config, calendarType);
    return result;
}

function SetMarker(marker: string, result: any, config: ConvertToDate) {
    switch(trim(marker)) {
        case "abt":
            objectPath.set(result, config.About, true);
            break;                
        case "cal":
            objectPath.set(result, config.Calculated, true);
            break;                
        case "est":
            objectPath.set(result, config.Estimated, true);
            break;                
        case "aft":
            objectPath.set(result, config.After, true);
            break;                
        case "bef":
            objectPath.set(result, config.Before, true);
            break;                
        case "int":
            objectPath.set(result, config.Interpreted, true);
            break;
    }
}

function ConvertFromJulian(date: Dayjs) {
    let newDateString = split(CalendarConverter.fromJulianToGregorian(date.get("year"), date.get("month"), date.get("date")), "-");
    date = date.set("year", toNumber(newDateString[0]));
    date = date.set("month", toNumber(newDateString[1]));
    date = date.set("date", toNumber(newDateString[2]));

    return date;
}
    
/* istanbul ignore next */ // not completly tested
function ConvertShortMonthToFullMonth(shortMonth: string) {
    switch(trim(shortMonth)) {
        case "tsh":
            return "Tishrei";
        case "csh":
            return "Cheshvan";
        case "ksl":
            return "Kislev";            
        case "tvt":
            return "Tevet";            
        case "shv":
            return "Shvat";            
        case "adr":
            return "Adar 1";            
        case "ads":
            return "Adar 2";            
        case "nsn":
            return "Nisan";            
        case "iyr":
            return "Iyyar";
        case "svn":
            return "Sivan";
        case "tmz":
            return "Tamuz";        
        case "aav":
            return "Av";      
        case "ell":
            return "Elul";    
    }

    return "";
}

/**
 * Converts a single date string to an object
 * @param date the date string
 * @param result the object
 * @param config the config
 * @internal
 */
function ConvertStringToDate(date: string, result: object, config: ConvertToDate, calendarType: string) {
    let splitDate = split(date, " ");

    if (splitDate.length === 1) {
        // year
        objectPath.set(result, config.HasYear, true);
        objectPath.set(result, config.HasMonth, false);
        objectPath.set(result, config.HasDay, false);

        if (calendarType === "Hebrew"){
            let hDate = new hebcal.HDate(`1 Nisan ${splitDate[0]}`);
            objectPath.set(result, config.Value, hDate.greg());
            return;
        }

        let dateValue = dayjs(splitDate[0], 'YYYY');

        if (calendarType === "Julian") {            
            dateValue = ConvertFromJulian(dateValue);
        }

        objectPath.set(result, config.Value, dateValue.toDate());
        return;
    }

    if (splitDate.length === 2) {
        // month and year
        objectPath.set(result, config.HasYear, true);
        objectPath.set(result, config.HasMonth, true);
        objectPath.set(result, config.HasDay, false);

        if (calendarType === "Hebrew") {
            let hDate = new hebcal.HDate(`1 ${ConvertShortMonthToFullMonth(splitDate[0])} ${splitDate[1]}`);
            objectPath.set(result, config.Value, hDate.greg());
            return;
        }

        let dateValue = dayjs(`${upperFirst(splitDate[0])}-${splitDate[1]}`, 'MMM-YYYY');

        if (calendarType === "Julian") {            
            dateValue = ConvertFromJulian(dateValue);
        }

        objectPath.set(result, config.Value, dateValue.toDate());
        return;
    }
    
    // full date
    objectPath.set(result, config.HasYear, true);
    objectPath.set(result, config.HasMonth, true);
    objectPath.set(result, config.HasDay, true);

    if (calendarType === "Hebrew") {
        let hDate = new hebcal.HDate(`${splitDate[0]} ${ConvertShortMonthToFullMonth(splitDate[1])} ${splitDate[2]}`);
        objectPath.set(result, config.Value, hDate.greg());
        return;  
    }

    let dateValue = dayjs(`${splitDate[0]}-${upperFirst(splitDate[1])}-${splitDate[2]}`, 'D-MMM-YYYY');

    if (calendarType === "Julian") {
        dateValue = ConvertFromJulian(dateValue);
    }

    objectPath.set(result, config.Value, dateValue.toDate());  
}