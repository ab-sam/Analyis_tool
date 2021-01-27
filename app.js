const Twit = require('twit')
const notifier = require('node-notifier');
const open = require('open');
const franc = require('franc')

const apikey = 'HVYI0JQBs4b2V9tk9ksNPfANY'
const apiSecretKey = 'soFk79Rat8HIffiytusJgQ7EVttCocgQMuMGgfHUTtq4Kvabzq'
const accessToken = '1347035310149001219-A3InZKBH3GIpGQrORMPRbL4YEDR7Bj'
const accessTokenSecret = 'DSZNcpW0P1DGalfVkngpL2mzmB7MJBJEdAQUNfhXbyoj9'

var T = new Twit({
    consumer_key:         apikey,
    consumer_secret:      apiSecretKey,
    access_token:         accessToken,
    access_token_secret:  accessTokenSecret,
  });

// export default Twit
// Imports
const express = require('express')
const app = express()
const port = 3000

//Static Files
app.use(express.static('public'));

// Set View's
app.set('views', './views');
app.set('view engine', 'ejs');

// Navigation
app.get('', (req, res) => {
    res.render('home')
})

// app.get('/about', (req, res) => {
//    res.sendFile(__dirname + '/views/about.html')
// })

// Listen on Port 5000
app.listen(port, () => console.info(`App listening on port ${port}`))

app.get('/getJson', function (req, res) {
  // If it's not showing up, just use req.body to see what is actually being passed.
  console.log(req.body.Keyword);
});


function twitterfetch(x){
  T.get('search/tweets', { q: x, count: 5 }, function(err, data, response) {
    const tweets = data.statuses
    console.log(tweets);
    })
}
// const listValue=document.querySelector('#myList')
// const keyword=document.querySelector('#Keyword')
// const searchButton=document.querySelector('#fetch')
// const column=document.querySelector('#Column')
// const formula=document.querySelector('#Formula')
// const statButton=document.querySelector('#Stats')


// statButton.onclick=function(event){
//     const select2=column.value;
//     const select3=formula.value;
//     const name=keyword.value;
//     const select = listValue.value;
//     console.log(name)
//     console.log(select)

//     if (select=='Twitter'){
//         T.get('search/tweets', { q: '#tesla since:2020-04-15', count: 5 }, function(err, data, response) {
//             const tweets = data.statuses
//           //   .map(tweet => `LANG: ${franc(tweet.text)} : ${tweet.text}`) //CHECK LANGUAGE
//           //   .map(tweet => tweet.text)
//           //   .filter(tweet => tweet.toLowerCase().includes('elon'));
//             console.log(tweets);
//           })
//     }
// }