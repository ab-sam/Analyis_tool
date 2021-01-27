
// import T from './app.js'; 

//initial values
const tmdb_API='ccf679389a13f7cd8cfa4c0693d63931';
const apikey = '7PeWIcSo5tyG5jB7YIUsretQt'
const apiSecretKey = 'aDQFpEfaeHuRXRJ7oCdKULz7ezH1hH0QBaMxvkHnBVdNTtRSlq'
const accessToken = '1347035310149001219-HQWk1DW5qXZ8s7FutndCk1eEXVzu0N'
const accessTokenSecret = '1RvaIxxRFUOomQuzzcUw1jD0TwNERDoSMOY2GU4bxwFcg'

// var T = new Twit({
//     consumer_key:         apikey,
//     consumer_secret:      apiSecretKey,
//     access_token:         accessToken,
//     access_token_secret:  accessTokenSecret,
//   });

// const tmdb_url='https://api.themoviedb.org/3/search/movie?
// api_key=ccf679389a13f7cd8cfa4c0693d63931&query=fast';

var menu = {
    "TMDB" : ["title", "vote_average", "vote_count", "popularity"],
    "TWITTER" : ["Tweets", "Tweets_count", "Likes",]
}
window.onload = function(){
    var dd0 = document.getElementById("myList");
    var dd1 = document.getElementById("Column")
    for (var x in menu){
        dd0.options[dd0.options.length] = new Option(x,x);
    }
    dd0.onchange = function() {
        dd1.length = 1;
        var z = menu[this.value];
        for (var i = 0; i < z.length; i++){
            dd1.options[dd1.options.length] = new Option(z[i],z[i]);
        }
    }
}

const listValue=document.querySelector('#myList')
const keyword=document.querySelector('#Keyword')
const searchButton=document.querySelector('#fetch')
const column=document.querySelector('#Column')
const formula=document.querySelector('#Formula')
const statButton=document.querySelector('#Stats')


statButton.onclick=function(event){
    const select2=column.value;
    const select3=formula.value;
    const name=keyword.value;
    const select = listValue.value;
    console.log(name)
    console.log(select)
    
    if (select=='TMDB'){
        tmdb_url='https://api.themoviedb.org/3/search/movie?api_key='+tmdb_API+'&query='+name;
        fetch(tmdb_url)
            .then((res) => res.json())
            .then(function(data){
                console.log(data);
                if (select3 == "Sum"){
                    sum(data,select2,select3);
                }else if(select3 == "Mean"){
                    mean(data,select2,select3);
                }else if(select3 == "Null Count"){
                    nullCount(data,select2,select3);
                }else if(select3 == "Median"){
                    median(data,select2,select3);
                }else if(select3 == "Count"){
                    count(data,select2,select3);
                }else if(select3 == "Standard Deviation"){
                    standard(data,select2,select3);
                }else if(select3 == "Count Distinct"){
                    Ctd(data,select2,select3);
                }else{
                   sum(data,select2,select3);
                   mean(data,select2,select3);
                   nullCount(data,select2,select3);
                   median(data,select2,select3);
                   count(data,select2,select3);
                }
            });
            // .then((data) => {
            //     //data.results []
            //     console.log('Data: ' ,data);
            
            // .catch((error) => {
            //     console.log('Error: ',error);
            // });    
    }
        
    else{
        T.get('search/tweets', { q: '#tesla since:2020-04-15', count: 5 }, function(err, data, response) {
                        const tweets = data.statuses
                      //   .map(tweet => `LANG: ${franc(tweet.text)} : ${tweet.text}`) //CHECK LANGUAGE
                      //   .map(tweet => tweet.text)
                      //   .filter(tweet => tweet.toLowerCase().includes('elon'));
                        console.log(tweets);
                      })
    }
}


function createtable(x,y,z){

    let h = ['Column Name', z ];
    let e = [{col:x,val:y}]
    let mytable = document.querySelector('#op2')
    var table = document.createElement("table");
    var header_row = document.createElement('tr');
    // clearbox('#op2');
    h.forEach(htext => {
        var header = document.createElement('th');
        let textNode = document.createTextNode(htext);
        header.appendChild(textNode);
        header_row.appendChild(header);
    });
    table.appendChild(header_row);
    e.forEach(emp =>{
        let row = document.createElement('tr');
        Object.values(emp).forEach(text =>{
            let cell = document.createElement('td');
            let textNode1 = document.createTextNode(text);
            cell.appendChild(textNode1);
            row.appendChild(cell);
        });
        table.appendChild(row);
    });
    mytable.appendChild(table);
}

function sum(data,x,y){
    var res = 0;
    for (var i = 0; i < data.results.length; i = i + 1){
        if(isNaN(data.results[i][x])){
            var add = 0;
        }else {
            var add = (data.results[i][x]);
            }res = res+add;
        }console.log(res);
        if(y == "All"){
            createtable2(x,res,"sum");
        }else{
            createtable(x,res,"sum");
        }
        //document.getElementById("op2").innerHTML = res;
}
function mean(data,x,y){
    var res = 0;
    for (var i = 0; i < data.results.length; i = i + 1){
        if(isNaN(data.results[i][x])){
            var add = 0;
        }else {
            var add = (data.results[i][x]);
            }res = res+add;
            avg = res / data.results.length;
        }console.log(avg);
        if(y == "All"){
            createtable2(x,avg,"Mean");
        }else{
            createtable(x,avg,"Mean");
        }
        //document.getElementById("op2").innerHTML = avg;   
}
function nullCount(data,x,y){
    var res = 0;
    for (var i = 0; i < data.results.length; i = i + 1){
        //console.log(data.results[i][x]);
        if(isNaN(data.results[i][x])){
            res = res + 1;
        }}console.log(res);
        if(y == "All"){
            createtable2(x,res,"Null Count");
        }else{
            createtable(x,res,"Null Count");
        }
        //document.getElementById("op2").innerHTML = res;  
}
function median(data,x,y){
    var array = [];
    for (var i = 0; i < data.results.length; i = i + 1){
        if(isNaN(data.results[i][x])){
            array.push(0);
        }else {
            array.push(data.results[i][x]);
            }array.sort(function(a,b){return a - b});
            med = array[(data.results.length/2)];
        }console.log(med);
        if(y == "All"){
            createtable2(x,med,"Median");
        }else{
            createtable(x,med,"Median");
        }
        //document.getElementById("op2").innerHTML = med;
}
function count(data,x,y){
    var ct = data.results.length;
    console.log(ct);
    if(y == "All"){
        createtable2(x,ct,"Count");
    }else{
        createtable(x,ct,"Count");
    }
    //document.getElementById("op2").innerHTML = ct;
}
function standard(data,x,y){
    array = [];
    for(var i = 0; i < data.results.length; i = i + 1){
        array.push(data.results[i][x]);
    }
    var n = array.length;
    var mean = array.reduce((a, b) => a + b) / n;
    var res = Math.round(Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n));
    console.log(res);
    if(y == "All"){
        createtable2(x,res,"Standard Deviation");
    }else{
        createtable(x,res,"Standard Deviation");
    }
}
function createtable2(x,y,z){
    let h = ['Column Name', z ];
    let e = [{col:x,val:y}]
    clearbox('#op2');
    let mytable = document.querySelector('#op2')
    var table = document.createElement("table");
    var header_row = document.createElement('tr');
    h.forEach(htext => {
        var header = document.createElement('th');
        let textNode = document.createTextNode(htext);
        header.appendChild(textNode);
        header_row.appendChild(header);
    });
    table.appendChild(header_row);
    e.forEach(emp =>{
        let row = document.createElement('tr');
        Object.values(emp).forEach(text =>{
            let cell = document.createElement('td');
            let textNode1 = document.createTextNode(text);
            cell.appendChild(textNode1);
            row.appendChild(cell);
        });
        table.appendChild(row);
        mytable.appendChild(table);
    }); 
}

function clearbox(elementID){
    document.getElementById(elementID).innerHTML="";
}