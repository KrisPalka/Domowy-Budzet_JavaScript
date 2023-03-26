import {toggleModal} from "./budgetNotification.js";

const output = document.getElementById("output");
document.getElementById("outputText").innerText = "You can spend ";

//REVENUE VARIABLES//
const addRevenue = document.getElementById("addRevenue");
const addRevText = document.getElementById("addRevenueText");
const revenueList = document.getElementById("listItemRev");
const addRevNumber = document.getElementById("addRevValue");
const totalRevenue = document.getElementById("totalRevenue");
const incomeArray = [0];

//EXPENSES VARIABLES//
const addExpense = document.getElementById("addExpenses");
const addExpText = document.getElementById("addExpenseText");
const expenseList = document.getElementById("listItemExpenses");
const addExpNumber = document.getElementById("addExpenseValue");
const totalExpense = document.getElementById("totalExpenses");
const expenseArray = [0];

//REVENUE INPUT FORM SECTION
addRevenue.addEventListener("submit", (event) => {
    event.preventDefault();
    const revenueText = addRevText.value;
    const revenueElem = document.createElement("li");
    const revenueNumber = addRevNumber.value;
    const createEditBtn = createEditButton(revenueElem);
    const createDltBtn = createDeleteBtn(revenueElem);

    incomeArray.push(Number(revenueNumber)); // - Pushing input value dynamically to array

    revenueElem.innerHTML = `<span id="revenueText">${revenueText}</span> - <span id="revenueNumber">${revenueNumber}</span> zł`;
    revenueElem.appendChild(createDltBtn);
    revenueElem.appendChild(createEditBtn);
    revenueList.appendChild(revenueElem);
    sumRevenue(); // sum of revenue from array
    outputVal(); // result = revenues - expenses
    toggleModal(); // budget status notification
    outputText();
});

//EDIT BUTTON + SAVE FOR REVENUES
function createEditButton(revenueElem, editModule ) {
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("editBtn");
    editBtn.addEventListener("click", edit);
    return editBtn;


    function edit(event) {
        event.preventDefault();
        editBtn.style.display = "none";

        const amountLi = revenueElem.querySelector("#revenueNumber").textContent;
        revenueElem.querySelector("#revenueText").contentEditable = true;
        revenueElem.querySelector("#revenueNumber").contentEditable = true;

        const saveBtn = document.createElement("button");
        saveBtn.id = "saveButton";
        saveBtn.innerText = "Save";
        saveBtn.classList.add("saveBtn");
        revenueElem.appendChild(saveBtn);
        saveBtn.addEventListener("click", save);

        function save(event) {
            event.preventDefault();
            const revenueLi = revenueElem.querySelector("#revenueNumber").textContent;

            if (revenueLi > 0 && !isNaN(revenueLi)) {
                revenueElem.querySelector("#revenueText").contentEditable = false;
                revenueElem.querySelector("#revenueNumber").contentEditable = false;
                saveBtn.classList.remove("saveBtn");
                saveBtn.classList.add("deleteBtn");
                editBtn.style.display = "inline-block";

                const liResult = Number(revenueLi) - Number(amountLi);
                incomeArray.push(liResult);
                sumRevenue();
                outputVal();
                toggleModal();
                outputText();
            } else {
                alert("PLEASE ENTER NUMBER GREATER THAN 0");
            }
        }
    }
}
//DELETE BUTTON FOR REVENUES
function createDeleteBtn(revenueElem) {
    const dltBtn = document.createElement("button");
    dltBtn.innerText = "Del";
    dltBtn.classList.add("dltBtn");
    dltBtn.addEventListener("click", deleteParent);
    return dltBtn;

    function deleteParent(event) {
        const amountLi = revenueElem.querySelector("#revenueNumber").textContent;
        event.preventDefault();
        revenueList.removeChild(event.target.parentNode);
        incomeArray.push(Number(-amountLi));

        sumRevenue();
        outputVal();
        toggleModal();
        outputText();
    }
}

//REVENUES ARRAY SUM
function sumRevenue() {
    const totalRev = incomeArray.reduce((acc, element) => {
        return acc + element;
    }, 0);
    totalRevenue.textContent = totalRev;
}

//EXPENSES INPUT FORM SECTION//
addExpense.addEventListener("submit", (event) => {
    event.preventDefault();
    const expenseText = addExpText.value;
    const expensesElem = document.createElement("li");
    const expensesNumber = addExpNumber.value;
    const createEditBtnExp = createEditBtn(expensesElem);
    const createDltBtn = createDelBtnExp(expensesElem);

    expenseArray.push(Number(expensesNumber)); // - Pushing Expenses value dynamically to array

    expensesElem.innerHTML = `<span id="expenseText">${expenseText}</span> - <span id="expenseNumber">${expensesNumber}</span> zł`;
    expensesElem.appendChild(createDltBtn);
    expensesElem.appendChild(createEditBtnExp);
    expenseList.appendChild(expensesElem);
    sumExpenses(); // sum of exp. from array
    outputVal(); // result = revenues - expenses
    toggleModal(); // budget status notification
    outputText();
});

//REVENUES ARRAY SUM
function sumExpenses() {
    const totalExp = expenseArray.reduce((acc, element) => {
        return acc + element;
    });
    totalExpense.innerText = totalExp;
}

//EDIT BUTTON + SAVE FOR EXPENSES
function createEditBtn(expensesElem) {
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("editBtn");
    editBtn.addEventListener("click", edit);
    return editBtn;

    function edit(event) {
        event.preventDefault();
        editBtn.style.display = "none";
        const amountLiExp = expensesElem.querySelector("#expenseNumber").textContent;
        expensesElem.querySelector("#expenseText").contentEditable = true;
        expensesElem.querySelector("#expenseNumber").contentEditable = true;

        const saveBtn = document.createElement("button");
        saveBtn.id = "saveButton";
        saveBtn.innerText = "Save";
        saveBtn.classList.add("saveBtn");
        expensesElem.appendChild(saveBtn);
        saveBtn.addEventListener("click", save);

        function save(event) {
            event.preventDefault();
            const expenseLi = expensesElem.querySelector("#expenseNumber").textContent;

            if (expenseLi > 0 && !isNaN(expenseLi)) {
                expensesElem.querySelector("#expenseText").contentEditable = false;
                expensesElem.querySelector("#expenseNumber").contentEditable = false;
                saveBtn.classList.remove("saveBtn");
                saveBtn.classList.add("deleteBtn");
                editBtn.style.display = "inline-block";

                const liResult = Number(expenseLi) - Number(amountLiExp);
                expenseArray.push(liResult);
                sumExpenses();
                outputVal();
                toggleModal();
                outputText();
            } else {
                alert("PLEASE ENTER NUMBER GREATER THAN 0");
            }
        }
    }
}

//DELETE BUTTON FOR EXPENSES
function createDelBtnExp(expensesElem) {
    const dltBtn = document.createElement("button");
    dltBtn.innerText = "Del";
    dltBtn.classList.add("dltBtn");
    dltBtn.addEventListener("click", deleteParent);
    return dltBtn;

    function deleteParent(event) {
        event.preventDefault();
        const expenseLi = expensesElem.querySelector("#expenseNumber").textContent;
        expenseList.removeChild(event.target.parentNode);
        expenseArray.push(Number(-expenseLi));
        sumExpenses();
        outputVal();
        toggleModal();
        outputText();
    }
}

//TOTAL OUTPUT RESULT
export function outputVal() {
    const calcRev = incomeArray.reduce((acc, element) => {
        return acc + element;
    });
    const calcExp = expenseArray.reduce((acc, element) => {
        return acc + element;
    });
    return (output.innerText = calcRev - calcExp);
}

//RESET BUTTON MODULE
const reset = document.getElementById("reset");
reset.addEventListener("click", () => {
    document.getElementById("addRevenue").reset();
    document.getElementById("addExpenses").reset();
    document.getElementById("outputText").innerText = "You can spend ";
    output.innerText = 0;
    incomeArray.length = 0;
    expenseArray.length = 0;
    totalRevenue.innerText = 0;
    totalExpense.innerText = 0;
    revenueList.innerText = "";
    expenseList.innerText = "";
    document.location.reload();
});

//Output Text
function outputText() {
    const outputText = document.getElementById("outputText");
    if (outputVal() > 0) {
        outputText.innerText = "You can spend: ";
    } else if (outputVal() === 0) {
        outputText.innerText = "BALANCE IS ";
    } else {
        outputText.innerText = "YOUR BALANCE IS NEGATIVE ";
    }
}
