var itemCount = 0;
var pTag = document.getElementById("item-left");
updateCount();
//add new todo item
function inputRow(event){
    event.preventDefault();
    let inputValue = document.getElementById("input-task").value;
    let newRow = document.createElement("div");
    newRow.classList.add("items-in-list");
    newRow.innerHTML = `
    <form class="todo-list-items" onsubmit="noReload(event)">
                        <div data-checked="false" onclick="checkCompleted(this)" class="check-btn">
                        <i class="fa-solid fa-check"></i>
                    </div>
                    <input type="text" name="" id="" value="${inputValue}" onchange="this.readOnly='true'" readonly="true" ondblclick="this.readOnly='';">
                    <p class="row-del-btn"><i class="fa-solid fa-xmark" onclick="deleteRow(this)"></i></p>
    </form>`
    let listOfItems = document.getElementById("items-list");
    listOfItems.appendChild(newRow);
    document.getElementById("input-task").value = "";
    itemCount++;
    updateCount();
}

//delete todo item
function deleteRow(icon){
    var row = icon.parentNode.parentNode.parentNode;
    row.remove();
    let checkStatus = row.querySelector("div");
    if (checkStatus.dataset.checked === "false") {
        itemCount--;
        updateCount();
    }
}

function deleteCheckedItems(){
    let itemList = document.getElementById("items-list");
    let items = itemList.getElementsByClassName("items-in-list");
    [...items].forEach((item) => {
        const btn = item.getElementsByClassName("check-btn")[0];
        if(btn.dataset.checked === "true"){
            itemList.removeChild(item);
        }
    });
}

function noReload(event) {
    event.preventDefault();
}

//check for completed todo item
function checkCompleted(btn){
    let icon = btn.querySelector("i");
    let parentForm = btn.parentNode;
    let inputContent = parentForm.querySelector("input");
    var isChecked = btn.dataset.checked === 'true';
    if (isChecked === false) {
        icon.style.display = "block";
        inputContent.style.textDecoration = "line-through";
        inputContent.style.color = "#d9d9d9";
        itemCount--;
        updateCount();
    }
    else{
        icon.style.display = "none";
        inputContent.style.textDecoration = "none";
        inputContent.style.color = "black";
        itemCount++;
        updateCount();
    }
    btn.dataset.checked = String(!isChecked);
}

//display number of items
function updateCount(){
    if(itemCount <= 1){
        pTag.innerHTML = itemCount + " item left";
    }
    else{
        pTag.innerHTML = itemCount + " items left";
    }
}

//select all todo items
function selectAll(){
    let itemList = document.getElementById("items-list").getElementsByClassName("items-in-list");
    let selectAllBtn = document.getElementById("select-all-btn");

    console.log(itemList);
    if(itemCount === 0){
        return [...itemList].forEach((item) => {
            const btn = item.getElementsByClassName("check-btn")[0];
            btn.click();
            selectAllBtn.style.color = "rgb(230, 230, 230)";
        });
    }

    [...itemList].forEach((item) => {
        const btn = item.getElementsByClassName("check-btn")[0];
        if(btn.dataset.checked === "false"){
            btn.click();
            selectAllBtn.style.color = "black";
        }
    });
}


//Filter items by checking status
function displayCompleted(){
    let itemList = document.getElementById("items-list");
    let items = itemList.getElementsByClassName("items-in-list");
    [...items].forEach((item) => {
        const btn = item.getElementsByClassName("check-btn")[0];
        if(btn.dataset.checked === "false"){
            item.style.display = "none";
        }
        else{
            item.style.display = "block";
        }
    });
}

function displayActivate(){
    let itemList = document.getElementById("items-list");
    let items = itemList.getElementsByClassName("items-in-list");
    [...items].forEach((item) => {
        const btn = item.getElementsByClassName("check-btn")[0];
        if(btn.dataset.checked === "true"){
            item.style.display = "none";
        }
        else{
            item.style.display = "block";
        }
    });
}

function displayAll(){
    let itemList = document.getElementById("items-list");
    let items = itemList.getElementsByClassName("items-in-list");
    [...items].forEach((item) => {
        item.style.display = "block";
    });
}