(function(){
    'use strict'
    var Model = {
        loadData: loadData,
        addData: addData,
        // getNewObject: getNewObject,
        storeTodoArray: storeTodoArray,
        deleteTask: deleteTask,
        getToDoList: getToDoList,
        setStatus: setStatus,
        getTodo: getTodo,
        modifyTodo: modifyTodo,
    };

    var todoArray = [];

    function loadData(){
        if(localStorage.todos){
            todoArray = JSON.parse(localStorage.todos);
            // debugger;
            // populateTodoList();
        }
    }

    function getToDoList(){
        return JSON.parse(JSON.stringify(todoArray));
    }

    function addData(title, description){
        todoArray.push(getNewObject(title,description,false));
        storeTodoArray();
    }

    function getNewObject( title, description,  isDone){
        var todo = {
            Title: title,
            Description: description,
            IsDone: isDone
        }
        return todo;
    }

    function storeTodoArray(){
        todoArray.sort(function(a,b){
            // aTitle = a.Title.toLowerCase();
            // bTitle = b.Title.toLowerCase();
            if(a.Title.toLowerCase()>b.Title.toLowerCase()) return 1;
            else if (a.Title.toLowerCase()<b.Title.toLowerCase()) return -1;
            return 0;
        });
        localStorage.setItem("todos", JSON.stringify(todoArray));
    }

    function deleteTask(index){
        todoArray.splice(index, 1);
        storeTodoArray();
        // populateTodoList();
    }

    function setStatus (index,evnt){
        console.log(evnt.checked);
        todoArray[index].IsDone = evnt.checked;
        storeTodoArray();
        // populateTodoList();
    }

    function getTodo(index){
        var ret = JSON.parse(JSON.stringify(todoArray[index]));
        return ret;
    }

    function modifyTodo(index, title, description){
        todoArray[index].Title = title;
        todoArray[index].Description = description;
    }

    window.Model = Model;
})();