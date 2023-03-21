const fs = require('fs');
const readExcel = require('read-excel-file/node')
readExcel('./updated_loc.xlsx').then((data) => {
    var js = {};
    var lastProv = "";
    var lastMun = "";
    for (i in data) {
        if(data[i][1] === "Prov"){
            js[data[i][0].toUpperCase()] = {
                municipality_list : {}
            };
            lastProv = data[i][0].toUpperCase();
        }
        else if(data[i][1] === "City" || data[i][1] === "Mun" || data[i][1] === "SubMun" || data[i][1] === "SGU"){
           
            js[lastProv]['municipality_list'][data[i][0].toUpperCase()] = { barangay_list: [] };
            lastMun = data[i][0].toUpperCase();
        }
        else if(data[i][1] === "Bgy"){
            // console.log(js);
            js[lastProv]['municipality_list'][lastMun]['barangay_list'].push(data[i][0].toUpperCase())
            // js[lastProv][lastMun].push(data[i][0]);
        }
        
        
        
        
        // for (j in data[i]) {
        //   console.log(data[i][j])
        // }
    }
    // console.log(js);
    fs.writeFileSync("locations.json", JSON.stringify(js));
})