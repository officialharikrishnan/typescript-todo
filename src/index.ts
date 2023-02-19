const btn = document.getElementById("btn")!
const input = document.getElementById('inp')! as HTMLInputElement
const form = document.querySelector("form")!
const ul = document.getElementById("todolist")!

interface Todo {
    text: string,
    completed: boolean
}
const newTodo: Todo[] = []
const savedTodo: Todo[] = readTodo()

console.log(savedTodo);
savedTodo.forEach(createList)

function handleSub(e: SubmitEvent) {
    e.preventDefault()

    const todo: Todo = {
        text: input.value,
        completed: false
    }
    newTodo.push(todo)
    createList(todo)
    todoLocalSave()
}
function readTodo(): [] {
    const todo = localStorage.getItem("todo")!
    if (todo === null) return []
    return JSON.parse(todo)
}
function todoLocalSave() {
    localStorage.setItem("todo", JSON.stringify(newTodo))
}
function createList(todo: Todo) {
    const newLi = document.createElement("li")
    const checkbox = document.createElement("input") as HTMLInputElement
    checkbox.type = "checkbox"
    checkbox.checked = todo.completed
    checkbox.addEventListener("change", function () {
        todo.completed = checkbox.checked
        console.log(JSON.stringify(newTodo));
        todoLocalSave()
    })
    newLi.append(todo.text)
    newLi.append(checkbox)
    ul.append(newLi)
    input.value = ""
}
form.addEventListener("submit", handleSub)

