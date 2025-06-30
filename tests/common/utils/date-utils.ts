export function formatDate(date: Date, format: string): string {
    const map: { [key: string]: string } = {
        'yyyy': date.getFullYear().toString(),
        'MM': String(date.getMonth() + 1).padStart(2, '0'),
        'dd': String(date.getDate()).padStart(2, '0'),
        'HH': String(date.getHours()).padStart(2, '0'),
        'mm': String(date.getMinutes()).padStart(2, '0'),
        'ss': String(date.getSeconds()).padStart(2, '0'),
    };

    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, matched => map[matched]);
}

export function TodayDate(date_format: string) {
    // %d = Day of month 01-31
    // %b = Month name, short version (Dec)
    // %B = Month name, full version (December)
    // %m = Month as a number 01-12
    // %y = Year, short version, without century (18)
    // %Y = Year, full version (2018)
    // %H = Hour 00-23
    // %I = Hour 00-12
    // %M = Minute as a zero-padded decimal number(33)
    // %p = AM/PM 
    const strftime = require('strftime')
    return strftime(date_format,new Date())
}