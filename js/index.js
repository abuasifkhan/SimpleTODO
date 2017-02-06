var modalBtn = document.getElementById("openModal");
var modal = document.getElementById("myModal");
var span = document.getElementById("closeButton");

var todoArray = [];
// todoArray = JSON.parse(localStorage.getItem("todos"));
function loadData(){
    if(localStorage.todos){
        todoArray = JSON.parse(localStorage.todos);
        populateTodoList();
    }
}
function getNewObject( title, description,  isDone){
    var todo = {
        Title: title,
        Description: description,
        IsDone: isDone
    }
    return todo;
}

function closeModal(){
    modal.style.display = "none";
}
modalBtn.onclick = function(){
    modal.style.display = "block";
}
span.onclick = function(){
    closeModal();
}
window.onclick = function(){
    if(event.target == modal){
        closeModal();
    }
}

function submitClicked(){
    var newTitle = document.getElementById("newTitle").value;
    var newDescription = document.getElementById("newDescription").value;
    
    
     todoArray.push(getNewObject(newTitle, newDescription, false));
     var x = document.createElement("div");
    //  console.log(todoArray.length);
     x.textContent = todoArray;
     document.body.appendChild(x);
     localStorage.setItem("todos", JSON.stringify(todoArray));
     closeModal();
     populateTodoList();
    //  debugger;
}

function populateTodoList(){
    var ul = document.getElementById("todoList");
    ul.innerHTML = "";
    for( var i=0; i<todoArray.length; i++){
        var t = todoArray[i];
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(t.Title));
        ul.appendChild(li);
    }
}