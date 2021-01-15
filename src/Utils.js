export function getFormatedTime(...arg) {
    if (arg.length==1)return getHHMMSS_From_Seconds(...arg);
    else if(arg.length==3)return getHHMMSS_From_HMS(...arg);
}
//
export function getHHMMSS_From_Seconds(seconds){
    let hours = seconds >= 3600 ? parseInt(seconds / 3600):0;
    let minutes = 0;
    if (hours>0) minutes = parseInt((seconds - (hours * 3600)) / 60);
    else minutes = parseInt(seconds / 60);
    seconds = seconds - ((hours * 3600) + (minutes * 60));
    return getHHMMSS_From_HMS(hours,minutes,seconds);        
}
//
export function getHHMMSS_From_HMS(hours,minutes,seconds){
    if (hours<10) hours = '0' + hours;
    if (minutes<10) minutes = '0' + minutes;
    if (seconds<10) seconds = '0' + seconds;
    return {hours,minutes,seconds};
}