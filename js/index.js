(function(){
    'use strict';
    var modal = document.getElementById(Ids.addModal);
    // var span = document.getElementById(Ids.closeButton);
    var ul = document.getElementById(Ids.todoList);
    var search = document.getElementById(Ids.titleSearch);
    var modalTitle = document.getElementById(Ids.modalTitle);

    var editModal = document.getElementById(Ids.editModal);
    // var editModalCloseButton = document.getElementById(Ids.editModalCloseButton);

    var radioValueStrings = {
        All: 'All', 
        Done: 'Done',
        Undone: 'Undone'
    };
    var radioVal = radioValueStrings.All;
    

    var Controller = {
        init: init,
        checkBox: checkBox,
        submitClicked: submitClicked,
        deleteTask: deleteTask,
        onRadioButtonValueChange: onRadioButtonValueChange,
        openAddModal: openAddModal,
        closeModal: closeModal,
        modifyTodo: modifyTodo,
        closeEditModal: closeEditModal,
        openEditModal: openEditModal,
    };

    function init(){
        window.Model.loadData();
        populateTodoList();
    }
    function setModalTitle(title){
        modalTitle.innerHTML(title);
    }
    function closeModal(){
        modal.style.display = "none";
    }
    function openAddModal (){
        modal.style.display = "block";
    }
    window.onclick = function(){
        if(event.target == modal){
            closeModal();
        }
        else if(event.target==editModal){
            closeEditModal();
        }
    }

    function submitClicked(){
        var newTitle = document.getElementById(Ids.newTitle).value;
        var newDescription = document.getElementById(Ids.newDescription).value;
        if(newTitle==""){
            alert(Strings.title_empty);
            return;
        }
        
        window.Model.addData(newTitle,newDescription);
        closeModal();
        populateTodoList();
    }

    ul.addEventListener('click', function(event){
        if(event.target.tagName==='LI'){

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

    function onRadioButtonValueChange(value){
        radioVal = value;
        console.log(radioVal);
        populateTodoList();
    }

    function populateTodoList(){
        ul.innerHTML = "";
        var todoArray = window.Model.getToDoList();
        for( var i=0; i<todoArray.length; i++){
            var tmp = todoArray[i];

            if(radioVal==radioValueStrings.All){
                showElement(tmp, i);
            }
            else if(radioVal==radioValueStrings.Done){
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
        t += '<div class=" todo-item '+backgroundCol(tmp)+'">';
        t += '<h2 class = "todo-title '+isDone(tmp)+'">';
        t += tmp.Title;
        t += '</h2>'
        t += '<h4 class = "todo-title '+isDone(tmp)+'">';
        t += tmp.Description;
        t += '</h4>'
        t += '<input type="checkbox" name="checked" onclick="Controller.checkBox('+i+', this)" '+isChecked(tmp)+'/>Done';
        t += '<button type="button" class="button-style button-edit" onClick="Controller.openEditModal('+i+')">Edit</button>';
        t += '<button type="button" class="button-style button-delete"  onClick="Controller.deleteTask('+i+')">Delete</button>'
        t+='</div></li>'
        ul.innerHTML += t;
    }

    function deleteTask(index){
        window.Model.deleteTask(index);
        populateTodoList();
    }

    function checkBox (index,evnt){
        window.Model.setStatus(index,evnt);
        populateTodoList();
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

    var editIndex;

    function openEditModal(index){
        editModal.style.display = 'block';
        var todo = Model.getTodo(index);
        document.getElementById(Ids.editTitle).value = todo.Title;
        document.getElementById(Ids.editDescription).value = todo.Description;
        editIndex =  index;
        // debugger;
    }
    function closeEditModal(){
        editModal.style.display = 'none';
    }
    function modifyTodo(){
        //todo
        var newTitle = document.getElementById(Ids.editTitle).value;
        var newDescription = document.getElementById(Ids.editDescription).value;
        if(newTitle==""){
            alert(Strings.title_empty);
            return;
        }
        
        window.Model.modifyTodo(editIndex, newTitle,newDescription);
        closeEditModal();
        populateTodoList();
    }


    window.Controller = Controller;
})();

