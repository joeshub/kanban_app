require('./main.css');

console.log(this);

var component = require('./component');
var app = document.createElement('div');
document.body.appendChild(app);
app.appendChild(component());
