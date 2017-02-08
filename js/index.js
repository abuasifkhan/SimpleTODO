var modalBtn = document.getElementById("openModal");
var modal = document.getElementById("myModal");
var span = document.getElementById("closeButton");
var ul = document.getElementById("todoList");
var search = document.getElementById("mySearch");
var radioVal = 'All';

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
    if(newTitle==""){
        alert("Title cannot be empty!");
        return;
    }
    
     todoArray.push(getNewObject(newTitle, newDescription, false));
     var x = document.createElement("div");
    //  console.log(todoArray.length);
     
     
     closeModal();
     storeTodoArray();
     populateTodoList();
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
function isChecked(t){
    var decor="";
    if(t.IsDone){
        decor = "checked";
    }
    return decor;
}
function backgroundCol(t){
    var decor="";
    if(t.IsDone){
        decor = "task-done";
    }
    return decor;
}

// function getRadioVal(){
//     var radioForm = document.forms[0].elements['status'];
//     // var radioButtonName = 'status';
//     // var radios = radioForm.element[radioButtonName];
//     for(var i=0; i<radioForm.length; i++){
//         if(radioForm[i].checked){
//             radioVal = radioForm[i].value;
//             break;
//         }
//     }
// }

function onRadioButtonValueChange(value){
    radioVal = value;
    console.log(radioVal);
    populateTodoList();
}

function populateTodoList(){
    // console.log(getRadioVal());
    
    ul.innerHTML = "";
    for( var i=0; i<todoArray.length; i++){
        var tmp = todoArray[i];
        // var li = document.createElement("li");
        // li.appendChild(document.createTextNode(t.Title));
        // ul.appendChild(li);
        // var t = "<li class = \"list-item\" \""+ backgroundCol(tmp)+"\" >"+"<h2 class = \"todo-title\" \""+isDone(tmp)+ "\">"+tmp.Title+"</h2>"+tmp.Description+'<br>';
        // t += '<input type="checkbox" name="checked" onclick="checkBox('+i+',this )" '+isChecked(tmp)+'/>Done';
        // t += "</li>";
        if(radioVal=='All'){
            showElement(tmp, i);
        }
        else if(radioVal=='Done'){
            if(tmp.IsDone==true){
                showElement(tmp,i);
            }
            
        }
        else{
            if(tmp.IsDone==false){
                showElement(tmp, i);
            }
        }

    }
}

function showElement(tmp, i){
    var t = '<li class="list-item">';
    t += '<div class="'+backgroundCol(tmp)+'">';
    t += '<h2 class = "todo-title '+isDone(tmp)+'">';
    t += tmp.Title;
    t += '</h2>'
    t += tmp.Description + '<br>';
    t += '<input type="checkbox" name="checked" onclick="checkBox('+i+', this)" '+isChecked(tmp)+'/>Done';
    t += '<button type="button" class="button-style button-edit" onClick="deleteTask('+i+')">Edit</button>';
    t += '<button type="button" class="button-style button-delete"  onClick="deleteTask('+i+')">Delete</button>'
    t+='</div></li>'
    ul.innerHTML += t;
}

function deleteTask(index){
    todoArray.splice(index, 1);
    storeTodoArray();
    populateTodoList();
}

function checkBox (index,evnt){
    console.log(evnt.checked);
    todoArray[index].IsDone = evnt.checked;
    storeTodoArray();
    populateTodoList();
}

function storeTodoArray(){
    todoArray.sort(function(a,b){
        if(a.Title>b.Title) return 1;
        else if (a.Title<b.Title) return -1;
        return 0;
    });
    localStorage.setItem("todos", JSON.stringify(todoArray));
}

search.onkeyup = function(){
    var filter = search.value.toUpperCase();
    var lis = document.getElementsByTagName('li');
    for(var i=0;i<lis.length;i++){
        var name = lis[i].getElementsByClassName('todo-title')[0].innerHTML;
        if(name.toUpperCase().indexOf(filter)==0){
            lis[i].style.display = 'list-item';
        }
        else{
            lis[i].style.display = 'none';
        }
    }
}