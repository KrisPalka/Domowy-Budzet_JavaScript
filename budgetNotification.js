import {outputVal} from "./main.js";

export const toggleModal = () => {
    const modal = document.getElementById("modal");
    modal.style.display = "flex";
    const modalText = document.getElementById("modalText");
    if (outputVal() > 0) {
        modalText.innerText = "YOU CAN SPEND " + outputVal() + " PLN";
        modal.style.backgroundColor = "lightgreen";
    } else if (outputVal() === 0) {
        modalText.innerText = "BALANCE IS 0";
        modal.style.backgroundColor = "lightgrey";
    } else {
        modalText.innerText = "YOUR BALANCE IS NEGATIVE " + outputVal() + " PLN";
        modal.style.backgroundColor = "red";
        document.body.style.backgroundColor = "red";
    }
    setTimeout(() => {
        modal.style.display = "none";
        document.body.style.backgroundColor = "white";
    }, 3000);
};
