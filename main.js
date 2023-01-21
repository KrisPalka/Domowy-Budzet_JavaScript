//REVENUE VARIABLES//
const addRevenue = document.getElementById("addRevenue");
const addRevText = document.getElementById("addRevenueText");
const revenueList = document.getElementById("listItemRev");
const addRevNumber = document.getElementById("addRevValue");
const output = document.getElementById("output");
const totalRevenue = document.getElementById("totalRevenue");
const incomeArray = [];
const expenseArray = [3];

//EXPENSES VARIABLES//

//REVENUE SECTION//
addRevenue.addEventListener("submit", (event) => {
  event.preventDefault();
  const revenueText = addRevText.value;
  const revenueElem = document.createElement("li");
  const revenueNumber = addRevNumber.value;
  const createDltBtn = createDeleteBtn(revenueNumber);
  const createEditBtn = createEditButton(revenueElem);

  incomeArray.push(Number(revenueNumber));

  revenueElem.innerHTML = `<span id="revenueText">${revenueText}</span> - <span id="revenueNumber">${revenueNumber}</span> zł`;

  revenueElem.appendChild(createEditBtn);
  revenueElem.appendChild(createDltBtn);
  revenueList.appendChild(revenueElem);
  sumRevenue();
  outputVal();
  toggleModal();
});

function createEditButton(revenueElem) {
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
    editBtn.style.backgroundColor = "lightgrey";

    const saveBtn = document.createElement("button");
    saveBtn.id = "saveButton";
    saveBtn.innerText = "Save";
    saveBtn.classList.add("saveBtn");
    revenueElem.appendChild(saveBtn);
    saveBtn.addEventListener("click", save);

    function save(event) {
      event.preventDefault();
      const revenueLi = revenueElem.querySelector("#revenueNumber").textContent;

      if (revenueLi > 0 || !isNaN(revenueLi)) {
        revenueElem.querySelector("#revenueText").contentEditable = false;
        revenueElem.querySelector("#revenueNumber").contentEditable = false;
        editBtn.style.backgroundColor = "lightblue";
        saveBtn.classList.remove("saveBtn");
        saveBtn.classList.add("deleteBtn");
        editBtn.style.display = "inline-block";

        const liResult = Number(revenueLi) - Number(amountLi);
        incomeArray.push(liResult);
        sumRevenue();
        outputVal();
        toggleModal();
      } else {
        alert("PLEASE ENTER NUMBER");
      }
    }
  }
}

function createDeleteBtn(revenueNumber) {
  const dltBtn = document.createElement("button");
  dltBtn.innerText = "Del";
  dltBtn.classList.add("dltBtn");
  dltBtn.addEventListener("click", deleteParent);
  return dltBtn;

  function deleteParent(event) {
    event.preventDefault();
    revenueList.removeChild(event.target.parentNode);
    incomeArray.push(Number(-revenueNumber));
    sumRevenue();
    outputVal();
    toggleModal();
  }
}
function sumRevenue() {
  const totalRev = incomeArray.reduce((acc, element) => {
    return acc + element;
  });
  totalRevenue.innerText = totalRev;
}

function outputVal() {
  const calcRev = incomeArray.reduce((acc, element) => {
    return acc + element;
  });
  const calcExp = expenseArray.reduce((acc, element) => {
    return acc + element;
  });
  return (output.innerText = calcRev - calcExp);
}

const toggleModal = () => {
  const modal = document.getElementById("modal");
  modal.style.display = "flex";
  const modalText = document.getElementById("modalText");
  if (outputVal() > 0) {
    modalText.innerText = "Możesz jeszcze wydać " + outputVal() + " złotych";
    modal.style.backgroundColor = "lightgreen";
  } else if (outputVal() === 0) {
    modalText.innerText = "Bilans wynosi zero";
    modal.style.backgroundColor = "lightgrey";
  } else {
    modalText.innerText =
      "Bilans jest ujemny. Jesteś na minusie " + outputVal() + " złotych";
    modal.style.backgroundColor = "red";
    document.body.style.backgroundColor = "red";
  }
  setTimeout(() => {
    modal.style.display = "none";
    document.body.style.backgroundColor = "white";
  }, 3000);
};

const reset = document.getElementById("reset");
reset.addEventListener("click", () => {
  document.getElementById("addRevenue").reset();
  output.innerText = "";
  incomeArray.length = 0;
  totalRevenue.innerText = "";
  revenueList.innerHTML = "";
});

//EXPENSES SECTION//
