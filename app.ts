#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";


let todoList: string [] = [];
let conditions = true;

console.log(chalk.magenta.bold("\n \t Welcome To Yashna - Todo_List_Application\n"));


let main = async () => {
    while(conditions){
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select An Option You Want To Do:",
                choices: ["Add Task", "Delete Task", "Update Task", "View Todo_List", "Exist"],
            }
        ]);
        if(option.choice === "Add Task"){
            await addTask()
        }
        else if(option.choice === "Delete Task"){
            await deleteTask()
        }
        else if(option.choice === "Update Task"){
            await updateTask()
        }
        else if(option.choice === "View Todo_List"){
            await viewTask()
        }
        else if(option.choice === "Exist"){
            conditions = false;
        }
    }
}

// Function To Add New Task To The List
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: "Enter Your New Task:"
        }
    ]);
    todoList.push(newTask.task);
    console.log(`\n ${newTask.task} task added successfully in Todo_list`);
}

// Function To View All Todo_List Tasks
let viewTask = () => {
    console.log("\n Your Todo_List: \n");
    todoList.forEach((task, index) => {
        console.log(`${index + 1}: ${task}`)
    })
}

// Function To Delete A Task From The List
let deleteTask = async () => {
    await viewTask()
    let taskIndex = await inquirer.prompt([
        {
            name: "index", 
            type: "number",
            message: "Enter The `index no.` Of The Task You Want To Delete:",
        }
    ]);
    let deleteTask = todoList.splice(taskIndex.index - 1, 1);
    console.log(`\n ${deleteTask} This Task Has Been Deleted Successfully From Your Todo_List\n`);
}


// Function To Update A Task
let updateTask = async () => {
    await viewTask()
    let update_task_index = await inquirer.prompt([
        {
            name: "index", 
            type: "number",
            message: "Enter The Index Of The Task You Want To Update:"
        },
        {
            name: "new_task",
            type: "input",
            message: "Now Enter New Task Name:",
        }
    ]);
    todoList[update_task_index.index - 1] = update_task_index.new_task
    console.log(`\n Task At Index no. ${update_task_index.index - 1} Updated Successfully [For Updated List Check Option: "View Todo_List"]`)
}
main();