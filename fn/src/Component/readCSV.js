export default function readCSV (path, viewPort) {
    return new Promise ((resolve)=>{
        console.log('load new csv', path, viewPort)
        var request = new XMLHttpRequest();
            request.open('GET', path, true);
            console.log('load dcsv')
            request.responseType = 'blob';
            request.onload = function() {
            var reader = new FileReader();
                console.log('read dcsv')
                reader.readAsText(request.response);
                reader.onload =  function(e){
                    resolve(processCSV(e.target.result, viewPort))
                };
            };
        request.send();
    })
}

const processCSV = (str, viewPort, delim=',') => {
    //seperate header and rows
    const headers = str.slice(0,str.indexOf('\n')).split(delim);
    const rows = str.slice(str.indexOf('\n')+1).split('\n');

    //filter items outside the viewport
    const newArray = rows.filter( row => {
        const values = row.split(delim);
        const eachObject = headers.reduce((obj, header, i) => {
            obj[header] = values[i];
            return obj;
        }, {})
        let eachObjectX = parseInt(eachObject['x']);
        let eachObjectY = parseInt(eachObject['y']);
        return eachObjectX > viewPort.extent[0] && eachObjectY > viewPort.extent[1] && eachObjectX < viewPort.extent[2] && eachObjectY < viewPort.extent[3];

    })
    console.log('CSVArray',newArray)
    return newArray

}