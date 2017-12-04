var express = require('express');
var bodyParser = require("body-parser");
var app = express();

var listofdates = {
    'January': 1, 
    'Febuary': 2, 
    'March': 3, 
    'April': 4, 
    'May': 5, 
    'June': 6, 
    'July': 7, 
    'August': 8, 
    'September': 9, 
    'October': 10, 
    'November': 11, 
    'December': 12,
};


app.use(bodyParser.urlencoded({ extended: true}));

var port = process.env.PORT | 3000;

app.listen(port, function(){
    console.log("we are live on port: " + port);
});

app.get('/', function(req, res){
    res.send("This is an API for unix tiem stamps");
});
app.get('/:date', function(req, res){
    var unix;
    var date;
    var params = req.params.date;
    var timeconverted = timeConverter(params);
    console.log(timeconverted);
    if(!isNaN(parseInt(timeconverted.charAt(0)))){
        console.log("get Date From Unix");
        unix = params;
        date = getDateFromUnix(timeconverted);
    }else if(!isNaN(parseInt(timeConverter(getUnixFromString(params)).charAt(0)))){
        console.log("get unix from date");
        unix = getUnixFromString(params).toString();
        date = params;
    }else{
        unix = null;
        date = null;
    }
    res.send({
        "unix": unix,
        "natural": date
    });
});

var getUnixFromString = function(params){

    var arrayofparams = params.split(" ");
    //console.log(arrayofparams);
    var formattedDates = ["year", "month", "date"];
    for(var i=0; i<arrayofparams.length; i++){
        //If it's a date
        if(listofdates[arrayofparams[i]]>=1 && listofdates[arrayofparams[i]]<=12){
            //console.log("Month: " + listofdates[arrayofparams[i]]);
            formattedDates[0] = listofdates[arrayofparams[i]];
        }
        //If it's a month
        else if(parseInt(arrayofparams[i])>1 && parseInt(arrayofparams[i])<31){
            //console.log("Date: "+ arrayofparams[i].replace(/,/g, ''));
            formattedDates[2] = arrayofparams[i].replace(/,/g, '');
        }else{
            //console.log("Year: " + arrayofparams[i]);
            formattedDates[1] = arrayofparams[i];
        }
        //console.log(formattedDates);
    }

    var unixdate = new Date(formattedDates[0], formattedDates[1], formattedDates[2]).getTime()/1000;
    return unixdate; 

};

function getDateFromUnix(params){
    var splitted = params.split(" ");
    var date = splitted[1] + " " + splitted[0] + ','+ " " + splitted[2];
    return date;

}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['January','Febuary','March','April','May','June','July','August','September','October',
    'November','December'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }