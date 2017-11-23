function dragStart(e) {
	this.style.opacity = '0.4';
	dragSrcEl = this;
	e.dataTransfer.effectAllowed = 'move';
	e.dataTransfer.setData('text/html', this.innerHTML);
};

function dragEnter(e) {
  	this.classList.add('over');
}

function dragLeave(e) {
 	e.stopPropagation();
  	this.classList.remove('over');
}

function dragOver(e) {
  	e.preventDefault();
  	e.dataTransfer.dropEffect = 'move';
	return false;
}

function dragDrop(e) {
  	if (dragSrcEl != this) {
		var firstElementid = dragSrcEl.id;
		var lastElementid = this.id;
		var oldTodolist = todoList.concat();
		todoList[firstElementid] = oldTodolist[lastElementid];
		todoList[lastElementid] = oldTodolist[firstElementid];
		localStorage.setItem('todo', JSON.stringify(todoList))
		window.location.reload();
  	}
  return false;
}


function dragEnd(e) {
  	var listItens = document.querySelectorAll('.draggable');
  	[].forEach.call(listItens, function(item) {
		item.classList.remove('over');
  	});
  	this.style.opacity = '';
}

function addEventsDragAndDrop(el) {
  	el.addEventListener('dragstart', dragStart, false);
  	el.addEventListener('dragenter', dragEnter, false);
  	el.addEventListener('dragover', dragOver, false);
  	el.addEventListener('dragleave', dragLeave, false);
  	el.addEventListener('drop', dragDrop, false);
  	el.addEventListener('dragend', dragEnd, false);
}