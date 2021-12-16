export default function readCSV (path) {
    return new Promise ((resolve)=>{
        var request = new XMLHttpRequest();
            request.open('GET', path, true);
            console.log('load dcsv')
            request.responseType = 'blob';
            request.onload = function() {
            var reader = new FileReader();
                console.log('read dcsv')
                reader.readAsText(request.response);
                reader.onload =  function(e){
                    resolve(processCSV(e.target.result))
                };
            };
        request.send();
    })
}

const processCSV = (str, delim=',') => {
    const headers = str.slice(0,str.indexOf('\n')).split(delim);
    const rows = str.slice(str.indexOf('\n')+1).split('\n');
        const tifArr = rows.map( (row,i) => {
            const values = row.split(delim);
            const eachObject = headers.reduce((obj, header, i) => {
                obj[header] = values[i];
                return obj;
            }, {})
            eachObject['id'] = i
            return eachObject
        })
        return tifArr
}