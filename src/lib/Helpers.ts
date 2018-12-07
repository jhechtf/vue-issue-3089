const CurrencyFormat = (amt: number): string =>{
    let amt_parts:string[] = amt.toString().split('');
    let retArr:string[] = []    ;
    while(amt_parts.length){
        retArr.unshift(amt_parts.splice(-3).join('') );
    }
    return '$' + retArr.join(',');
}
const MinutesToHours = (minutes: number): string =>{
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}hr${mins}min`;
}

export {
    CurrencyFormat,
    MinutesToHours
}