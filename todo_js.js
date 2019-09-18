//Helpers

function createElement(type, className){
	var element = document.createElement(type);
	if (className){
		element.classList.add(className);
	}
	return element;
}

function createParagraph(text, className){
	var p = createElement("p", className);
	p.innerText = text;
	return p;
}
//console.log(createParagraph("No todos to display", "no-todos"));

function createUl(className) {
	var ul = createElement("ul", className);
	return ul;
}
//console.log(createUl("todo-list"));


function createDiv (className) {
	var div = createElement("div", className);
	return div;
}
//console.log(createDiv("container"));


function createButton (text, className, dataPurpose) {
	var btn = createElement("button", className);
	btn.innerText = text;
	btn.setAttribute("data-purpose", dataPurpose);
	return btn;
}
//console.log(createButton("Go up", "up"));



function createTodo(text){
	var li = createElement("li", "todo");
	var p = createParagraph(text);
	li.append(p);		

	var buttonContainer = createDiv("buttons");
	var upBtn = createButton("Up", "up", "up");
	var downBtn = createButton("Down", "down", "down");
	var removeBtn = createButton("Remove", "remove", "remove");

	// append all buttons to the createDiv buttonContainer
	buttonContainer.append(upBtn);
	buttonContainer.append(downBtn);
	buttonContainer.append(removeBtn);

	// append button container to the li above
	li.append(buttonContainer);

	return li;
}
// console.log(createTodo("task 1"));






// grab id of input, add button and of the main container main tag
var todoInput = document.getElementById("todo-input");
var addTodoBtn = document.getElementById("add-todo-btn");
var mainContainer = document.getElementById("todo-main");


// add event listener to input

// for the add button
addTodoBtn.addEventListener("click", function (){
	if (todoInput.value.length > 0) {
			var todo = createTodo(todoInput.value);

			// insert function to animate our todo items
			setTimeout(function(){
				todo.style.opacity = 1;
			}, 0)

			if(!mainContainer.querySelector(".todo")) {	
				var noTodosP = document.querySelector("p.no-todos");
				mainContainer.removeChild(noTodosP);

				var ul = createUl("todo-list");
				ul.append(todo);
				mainContainer.append(ul);
			} else {									
				var ul = document.querySelector(".todo-list");
					ul.append(todo);
			}
		
		todoInput.value = ""; 
	}
});


// for the enter key on the key board
todoInput.addEventListener("keyup", function(e){

	if (todoInput.value.length > 0) { 
		if (e.keyCode === 13) {
			var todo = createTodo(todoInput.value);

			// insert function to animate our todo items
			setTimeout(function(){
				todo.style.opacity = 1;
			}, 0)

			if(!mainContainer.querySelector(".todo")) {				
				var noTodosP = document.querySelector("p.no-todos");
				mainContainer.removeChild(noTodosP);

				var ul = createUl("todo-list");
				ul.append(todo);
				mainContainer.append(ul);
			} else {											
				var ul = document.querySelector(".todo-list");
					ul.append(todo);
			}
		
		todoInput.value = "";                  
		}
	}
});


//now lets work on the up, down and remove buttons

mainContainer.addEventListener("click", function(e){
	// ensure that it's a button that is clicked on 
	if (e.target.nodeName === "BUTTON") { 
		var button = e.target;
		var typeButton = button.getAttribute("data-purpose");    
		var li = button.parentElement.parentElement;     
		var ul =  li.parentElement;  						

		switch(typeButton) {
			case "remove":      							
				ul.removeChild(li);						

				
				if (ul.children.length === 0){
					var p = createParagraph("No todos to display", "no-todos");
					var ul = document.querySelector(".todo-list");

					mainContainer.removeChild(ul);
					mainContainer.append(p);
				}
				break;
			case "up":
				// console.log("up"); //to check that it fires when clicked
				 	var previousElement = li.previousElementSibling;   
				 	if (previousElement !== null) {
				 		ul.removeChild(li);
				 		ul.insertBefore(li, previousElement);  // in the perenthesis (NewElt, Elt before)
				 	}
				break;
			case "down":
					var nextElement = li.nextElementSibling;
					if (nextElement !== null) {
						ul.removeChild(li);
						ul.insertBefore(li, nextElement.nextElementSibling);
					}
				break;
		}
	}
	
});
