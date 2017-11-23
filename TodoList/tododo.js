var todoList = [];
if (localStorage.getItem('todo') != undefined){
	todoList = JSON.parse(localStorage.getItem('todo'));
	todoList.forEach((element, index) => createTodoItem(element, index));
}	
	
function createTodoItem (item, index) {
	var ul = document.getElementById("myUL");
	var li = document.createElement("LI");
	var text_li = document.createTextNode(item.todo);
	var text_data = document.createTextNode(item.data);
	var checkL = item.check;
	var p = document.createElement("P");
	var edit = document.createElement("SPAN");
	var editText = document.createTextNode("Edit");
	var close = document.createElement("SPAN");
	var textClose = document.createTextNode("X");
	li.appendChild(text_li);
	li.className = "draggable";
	li.draggable="true";
	p.appendChild(text_data);
	edit.appendChild(editText);
	edit.className = "edit";
	li.appendChild(edit);
	li.appendChild(p);
	close.className = "close";
	close.appendChild(textClose);
	li.appendChild(close);
	li.id = index;
	if (checkL == true){
		li.className = "draggable checked";
	}
	ul.appendChild(li);
	addEventsDragAndDrop(li);
}

function createLocalItem() {
	var valueInput = document.getElementById ('myInput').value;
	var temp = {};
	var date = starttimer();
	var i = todoList.length;
	todoList[i] = temp;
	temp.todo = valueInput;
	temp.check = false;
	temp.data = date;
	localStorage.setItem('todo', JSON.stringify(todoList))
}



var close = document.querySelectorAll(".close");
for (let i = 0; i < close.length; i++) {
	close[i].onclick = function() {
		todoList.splice(i, 1);
		localStorage.setItem('todo', JSON.stringify(todoList));
		window.location.reload();
	}
}

var ediT = document.querySelectorAll(".edit");
for (let i = 0; i < ediT.length; i++) {
	ediT[i].onclick = function() {
		let i = this.parentElement.id;
		let liId = document.getElementById(i);
		let inputs = document.createElement("INPUT");
		let elementID = document.getElementById("editeds");
		let editTexts = document.createTextNode(" Save");
		if ( elementID == null){
			this.appendChild(editTexts);
			liId.appendChild(inputs);
			inputs.id = "editeds";
			elementID = document.getElementById("editeds");
			elementID.value = todoList[i].todo;
		} else{
			let newValue = elementID.value;
			todoList[i].todo = newValue; 
			localStorage.setItem('todo', JSON.stringify(todoList));
			window.location.reload();
		}
	}
}


var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
	if (ev.target.tagName === 'LI') {
		ev.target.classList.toggle('checked');
		saveDone();
	}
}, false);

function saveDone(){
	let liCount = list.children.length;
	for(i = 0; i < liCount; i++){
		var element = document.getElementById(i);
		var elClass = element.className; 
		if (elClass  == "draggable checked"){
			todoList[i].check = true; 
		} else {
			todoList[i].check = false;
		}
	localStorage.setItem('todo', JSON.stringify(todoList))
	}
}

function newElement() {
	var inputValue = document.getElementById("myInput").value;
		if (inputValue === '') {
			alert("Поле не можить бути пустим!");
		} else {
			createLocalItem();
		}
	document.getElementById("myInput").value = "";
	window.location.reload();
}

function reverse() {
	todoList.reverse();
	localStorage.setItem('todo', JSON.stringify(todoList));
	window.location.reload();
}


starttimer()
function starttimer(){
	let newTime = new Date();	
	let curr_date = newTime.getDate();
	let curr_month = newTime.getMonth() + 1;
	let curr_year = newTime.getFullYear();
	hour = newTime.getHours();
	min = newTime.getMinutes();
	sec = newTime.getSeconds();
	tm = hour * 60 + min * 60 + sec;
	if(hour < 10)
	hour = '0'+hour;
	if(min < 10)
	min = '0' + min;
	if(sec < 10)
	sec = '0' + sec;
	document.getElementById('time').innerHTML = curr_year + "-" + curr_month + "-" + curr_date + "  " + hour + ':'+ min + ':' + sec;
	setTimeout("starttimer()",1000);
	return curr_year + "-" + curr_month + "-" + curr_date + " " + hour + ':'+ min + ':' + sec;
};

