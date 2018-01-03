import moment from 'moment'

export function stringToDate(_date,_format,_delimiter)
{

    let formatLowerCase=_format.toLowerCase();
    let formatItems=formatLowerCase.split(_delimiter);
    let dateItems=_date.split(_delimiter);
    let monthIndex=formatItems.indexOf("mm");
    let dayIndex=formatItems.indexOf("dd");
    let yearIndex=formatItems.indexOf("yyyy");
    let month=parseInt(dateItems[monthIndex], 10);

    let formatedDate = dateItems[yearIndex] + '-' + month + '-' + dateItems[dayIndex]

    return formatedDate;
}

export const fmt = (dt) => {
    // if it is a string that contains '/' then just return it
    if(typeof(dt) === 'string' && dt.indexOf('/') > -1) {
        return dt
    }
    return moment(dt).format("DD/MM/YYYY")
}

