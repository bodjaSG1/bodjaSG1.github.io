var todoList = [];
if (localStorage.getItem('todo') != undefined){
  todoList = JSON.parse(localStorage.getItem('todo'));
  for (let i = 0; i < todoList.length ; i++) {
  var ule = document.getElementById("myUL");
  var liu = document.createElement("LI");
  var text_li = document.createTextNode(todoList[i].todo);
  var text_data = document.createTextNode(todoList[i].data);
  var checkL = todoList[i].check;
  var p = document.createElement("P");
  var edit = document.createElement("SPAN");
  var editText = document.createTextNode("Edit");
  liu.appendChild(text_li);
  p.appendChild(text_data);
  edit.appendChild(editText);
  edit.className = "edit";
  liu.appendChild(edit);
  liu.appendChild(p);
  liu.id = [i];
    if (checkL == true){
      liu.className = "checked";
    } 
   ule.appendChild(liu);
  }
}

function local() {
  var d = document.getElementById ('myInput').value;
  var temp = {};
  var date = starttimer();
  temp.todo = d;
  temp.check = false;
  temp.data = date;
  var i = todoList.length;
  todoList[i] = temp;
  localStorage.setItem('todo', JSON.stringify(todoList))
}

deleteIcon();
function deleteIcon(){
var myNodelist = document.getElementsByTagName("LI");
var i;
  for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("x");

    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
  }
}

var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var i = this.parentElement.id;
    var div = this.parentElement;
    div.parentNode.removeChild(div);
    todoList.splice(i, 1);
    localStorage.setItem('todo', JSON.stringify(todoList));
    window.location.reload();
  }
}

var ediT = document.getElementsByClassName("edit");
for (i = 0; i < ediT.length; i++) {
  ediT[i].onclick = function() {
    let i = this.parentElement.id;
    let liId = document.getElementById(i);
    let inputs = document.createElement("input");
    let elementID = document.getElementById("editeds");
    let editTexts = document.createTextNode(" Save");
    if ( elementID == null){
      this.appendChild(editTexts);
      liId.appendChild(inputs);
      inputs.id = "editeds";
      elementID = document.getElementById("editeds");
      let r = liId.innerHTML;
      textFORedit(r)
      elementID.value = str;
    } else{
      let newValue = elementID.value;
      todoList[i].todo = newValue; 
      todoList[i].parse;
      console.log(liId);
      localStorage.setItem('todo', JSON.stringify(todoList));
      window.location.reload();
    }
  }
}

function textFORedit(strings){
  let symbol = strings.split('');
  str = "";
  for (let i = 0; i < symbol.length; i++){
    if (symbol[i] != "<"){
      str += symbol[i]
    } else break;
  }  
  return str
}

var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
    save();
  }
}, false);

function save(){
  let c = list.children.length;

  for(i = 0; i < c; i++){
    var element = document.getElementById(i);
    var elClass = element.className; 
    if (elClass  == "checked"){

      todoList[i].check = true; 
      todoList[i].parse;

    } else {

      todoList[i].check = false;
      todoList[i].parse;

    }
  localStorage.setItem('todo', JSON.stringify(todoList))
  }
}

function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var text = document.createTextNode(inputValue);
  li.appendChild(text);
    if (inputValue === '') {
      alert("Поле не можить бути пустим!");
    } else {
      document.getElementById("myUL").appendChild(li);
      local();
    }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("X");
  var p = document.createElement("P");
  var edit = document.createElement("SPAN");
  var editText = document.createTextNode("Edit");
  span.className = "close";
  edit.className = "edit";
  p.className = "date";
  span.appendChild(txt);
  edit.appendChild(editText);
  li.appendChild(p);
  li.appendChild(span);
  li.appendChild(edit);
  

  window.location.reload();
}

function reverse() {
  todoList = JSON.parse(localStorage.getItem("todo"));
  todoList.reverse();
  localStorage.setItem('todo', JSON.stringify(todoList));
  window.location.reload();
}


starttimer()
function starttimer(){
var h = new Date();	
var curr_date = h.getDate();
var curr_month = h.getMonth() + 1;
var curr_year = h.getFullYear();
hour=h.getHours();
min=h.getMinutes();
sec=h.getSeconds();
tm=hour*60+min*60+sec;
if(hour<10)
hour='0'+hour;
if(min<10)
min='0'+min;
if(sec<10)
sec='0'+sec;
document.getElementById('time').innerHTML = curr_year + "-" + curr_month + "-" + curr_date + "  " + hour + ':'+ min + ':' + sec;

setTimeout("starttimer()",1000);
  return curr_year + "-" + curr_month + "-" + curr_date + " " + hour + ':'+ min + ':' + sec;
};