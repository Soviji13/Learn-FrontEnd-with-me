function addHoverListenerToTask(taskContainer) {
    taskContainer.addEventListener('mouseenter', function() {
        if (taskContainer.previousElementSibling && taskContainer.previousElementSibling.classList.contains('task-container')) 
        {
            taskContainer.previousElementSibling.style.borderBottom = 'none';
        }
        
        taskContainer.style.scale = "1.02";
        taskContainer.style.background = "#eeeeee";
        taskContainer.style.borderRadius = "10px";
        taskContainer.style.borderBottom = 'none';
    });
    taskContainer.addEventListener('mouseleave', function() 
    {
        taskContainer.style.scale = "1";
        taskContainer.style.background = "#ffffff";
        taskContainer.style.borderRadius = "10px 10px 0 0";

        if (taskContainer.previousElementSibling && taskContainer.previousElementSibling.classList.contains('task-container')) {
            taskContainer.previousElementSibling.style.borderBottom = 'solid 2px #9e9e9e74';
        }
        if(taskContainer !== document.getElementById("tasks-container").lastElementChild)
        {
            taskContainer.style.borderBottom = 'solid 2px #9e9e9e74';
        }
    });
}

document.getElementById("tasks-container").querySelectorAll('.task-container').forEach(tc => {
    addHoverListenerToTask(tc);
});




