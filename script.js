const localStorageKey = "task-list"

function addItem() {

    const item = document.getElementById("inpItem")
    item.style.border = ''

    if (!item.value) {
        item.style.border = "1px solid red"
        alert("Digite alguma task para adicionar.")

    } else if (validateIfExistsNewTask()) {
        item.style.border = "2px solid red"
        alert("Já existe uma task de memso valor!")

    } else {
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
        values.push({
            name: item.value
        })
        localStorage.setItem(localStorageKey, JSON.stringify(values))
        showValues()
    }
    item.value = ''
}

// Mostrar Itens na lista
function showValues() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let list = document.getElementById("task-list")
    list.innerHTML = ''
    for (let i = 0; i < values.length; i++) {
        list.innerHTML += `<li>${values[i]["name"]} <button id="btn-ok" onclick='removeItem("${values[i]['name']}")'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
        </svg></button></li>`
    }
}

function removeItem(data) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(x => x.name == data)
    values.splice(index, 1)
    localStorage.setItem(localStorageKey, JSON.stringify(values))
    showValues()
}

function validateIfExistsNewTask() {
    const item = document.getElementById("inpItem").value
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let exists = values.find(x => x.name == item)
    return !exists ? false : true
}

showValues()