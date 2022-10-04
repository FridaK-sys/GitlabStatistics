/** 
* Function that inputs a date and returns it in a given format
*
* @param date 
* @returns Formatted date
*/
export function formatDateAndTime(date: any): string {
    if (date === undefined) {
        return ""
    }
    let dateString: string = ""
    let year = date.slice(0,4)
    let month = date.slice(5,7)
    let day = date.slice(8,10)
    let time = date.slice(11, 16)

    const monthNames = ["january", "febuary", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]

    if (month.slice(0,1) === 0) {
        month = month.slice(1,2)
    }

    dateString = `${day}. ${monthNames[month - 1]} ${year} kl. ${time}`
    return dateString
}

/** 
* Function that returns the repo and token values from localstorage
*
* @returns repo, token values from localstorage
*/
export function getFormValues() {
    const storedValues = localStorage.getItem('form');
    if (!storedValues)
        return {
          repo: '',
          token: '',
        };
    return JSON.parse(storedValues);
}