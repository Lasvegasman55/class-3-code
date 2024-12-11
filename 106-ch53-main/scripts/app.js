function saveTask() {
    // Get values from form inputs
    const title = $("#txtTitle").val();
    const descript = $("#txtDescription").val();
    const color = $("#selColor").val();
    const date = $("#selDate").val();
    const status = $("#selStatus").val();
    const budget = $("#numBudget").val();
    console.log(title, descript, color, date, status, budget);

    // Build an object
    let taskToSave = new Task(title, descript, color, date, status, budget);
    console.log(taskToSave);

    // Save to server
    $.ajax({
        type: "POST",
        url: "https://fsdiapi.azurewebsites.net/api/tasks",
        data: JSON.stringify(taskToSave),
        contentType: "application/json",
        success: function(response) {
            console.log(response);
            displayTask(taskToSave);
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function displayTask(task) {
    console.log(task);
    let syntax = `
        <div class="task">
            <h5>${task.title}</h5>
            <p>${task.description}</p>
            <div><label>${task.status}</label></div>
            <div>
                <label>${task.date}</label>
                <label>${task.budget}</label>
            </div>
        </div>`;
    
    $(".list").append(syntax);
}

function testRequest() {
    $.ajax({
        type: "GET",
        url: "http://fsdiapi.azurewebsites.net", 
        success: function(response) {
            console.log(response);
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function loadTask() {
    $.ajax({
        type: "GET",
        url: "https://fsdiapi.azurewebsites.net/api/tasks",
        success: function(response) {
            console.log(response);
            let data = JSON.parse(response);
            for (let i = 0; i < data.length; i++) {
                let task = data[i];
                if (task.name === "Adrian53") {
                    displayTask(task);
                }
            }
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function init() {
    console.log("task manager");
    // Load data
    loadTask();
    // Hook the events
    $("#btnSave").click(saveTask);
}

window.onload = init;