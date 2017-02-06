var modalBtn = document.getElementById("openModal");
var modal = document.getElementById("myModal");
var span = document.getElementById("closeButton");
var ul = document.getElementById("todoList");

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
     
     
     closeModal();
     populateTodoList();
     storeTodoArray();
    //  debugger;
}

ul.addEventListener('click', function(event){
    if(event.target.tagName==='LI'){
        // alert(event.target.innerHTML);
    }
}, false);

function isDone(t){
    var decor="";
    if(t.IsDone){
        decor = "todo-done";
    }
    return decor;
}
function populateTodoList(){
    
    ul.innerHTML = "";
    for( var i=0; i<todoArray.length; i++){
        var t = todoArray[i];
        // var li = document.createElement("li");
        // li.appendChild(document.createTextNode(t.Title));
        // ul.appendChild(li);
        var t = "<li>"+"<h3 class = \""+isDone(t)+ "\">"+t.Title+"</h3>"+t.Description+"</li>";
        t += '<input type="checkbox" name="checked" onclick="checkBox('+i+',this )"/>Done<br>';
        ul.innerHTML += t;
    }
}
function checkBox (index,evnt){
    console.log(evnt.checked);
    // todoArray[index].IsDone = todoArray[index].IsDone ^ 1;
    //populateTodoList();
}

function storeTodoArray(){
    localStorage.setItem("todos", JSON.stringify(todoArray));
}