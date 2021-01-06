const app = require('express')()
const PORT = process.env.PORT || 1000
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/main.js', (req, res) => {
    res.sendfile(__dirname + '/main.js');
});

app.get('/style.css', (req, res) => {
    res.sendfile(__dirname + '/style.css');
});

app.get('/formbg.jpg', (req, res) => {
    res.sendfile(__dirname + '/formbg.jpg');
})

app.get('/tile.jpg', (req, res) => {
    res.sendfile(__dirname + '/tile.jpg');
})
app.get('/notebg.png', (req, res) => {
    res.sendfile(__dirname + '/notebg.png');
})



//   app.get('*', function(req, res){
//     res.sendfile(__dirname + '/public/index.html');
//   })
app.listen(PORT, () => {
    console.log('rocking 5000')
})