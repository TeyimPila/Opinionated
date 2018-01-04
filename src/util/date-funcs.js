/**
 * Author : Steve Bond
 * Date   : 01/01/2018
 */

import moment from 'moment'

//====================================================================
// Take a date in the given format and return yyyy-mm-dd
// Used to convert datePicker dates into strings for saving
//====================================================================

export function stringToDate(_date,_format,_delimiter)
{

    let formatLowerCase=_format.toLowerCase();
    let formatItems=formatLowerCase.split(_delimiter);
    let dateItems=_date.split(_delimiter);
    let monthIndex=formatItems.indexOf("mm");
    let dayIndex=formatItems.indexOf("dd");
    let yearIndex=formatItems.indexOf("yyyy");
    let month=parseInt(dateItems[monthIndex], 10);

    let formattedDate = dateItems[yearIndex] + '-' + month + '-' + dateItems[dayIndex]

    return formattedDate;
}

//====================================================================
// Used to format dates for the datePicker to be UK Format
//====================================================================
export const UKFormatDate = (dt) => {
    // if it is a string that contains '/' then just return it
    if(typeof(dt) === 'string' && dt.indexOf('/') > -1) {
        return dt
    }
    return moment(dt).format("DD/MM/YYYY")
}

