const keyBoard = [...document.querySelectorAll(".keyBoard")];
const input = document.querySelector(".container input");
const greenLightStyle = "box-shadow:#00ff05 0px 0px 7px 2px, #00ff05 0px 0px 10px 3px;background-color:#00ff05";
const CapsLockFier = document.querySelector(".span");
let isCapsed = true
CapsLockFier.style = isCapsed ? greenLightStyle : "";
const chars = [
    "home",
    "escape",
    "insert",
    "delete",
    "end",
    "enter",
    "arrowright",
    "arrowdown",
    "arrowup",
    "arrowleft",
    "tab",
    "space",
    "alt"
]
input.addEventListener("keydown", (e) => {
    if (e.code.trim().toLowerCase() != "backspace") {
        e.preventDefault()
    }
})
document.body.addEventListener("keydown", (e) => {

    isCapsed = e.getModifierState && e.getModifierState('CapsLock');
    CapsLockFier.style = isCapsed ? greenLightStyle : "";
    keyBoard.map((el) => {
        if (!chars.includes(e.key.trim().toLowerCase()) && !chars.includes(e.code.trim().toLowerCase()) && !/F[0-9]+$/.test(e.key.trim())) {
            if (e.code === "Backspace" && el.textContent === "Backspace") {
                el.style.transform = "scale(.8)";
                return
            } if (e.key.toLowerCase() === el.textContent.toLowerCase() && !e.code.includes("Shift")) {
                el.style.transform = "scale(.8)";
                input.value += el.textContent
            } if (e.code.includes("Shift") && el.textContent.trim() === "Shift") {
                let x = keyBoard.filter((el) => el.textContent == "Shift")
                e.code.trim() === "ShiftLeft" ? x[0].style.transform = "scale(.8)" : x[1].style.transform = "scale(.8)"
            }
            if (e.code.includes("Alt") && el.textContent.trim() === "Alt") {
                let x = keyBoard.filter((el) => el.textContent == "Alt")
                e.code.trim() === "AltLeft" ? x[0].style.transform = "scale(.8)" : x[1].style.transform = "scale(.8)"
            }
        } else {
            e.preventDefault();
            if (e.code.trim() === "Space" && el.textContent === "Space") {
                el.style.transform = "scale(.8)";
                input.value += " "
            }

            if (e.key.toLowerCase() === el.textContent.toLowerCase() && e.key !== "Shift" && e.key !== "Alt") {
                el.style.transform = "scale(.8)";
            }
            if (e.code.includes("Alt") && el.textContent.trim() === "Alt") {
                let x = keyBoard.filter((el) => el.textContent == "Alt")
                e.code.trim() === "AltLeft" ? x[0].style.transform = "scale(.8)" : x[1].style.transform = "scale(.8)"
            }
        }
    })
})

document.body.addEventListener("keyup", (e) => {
    e.preventDefault()
    keyBoard.map((el) => {
        if (e.code === "ShiftLeft") {
            keyBoard.find((e) => e.textContent === "Shift").style.transform = "";
            return
        }
        if (e.code === "ShiftRight" && el.textContent === "Shift") {
            keyBoard.reverse().find((e) => e.textContent === "Shift").style.transform = "";
            keyBoard.reverse();
            return
        }
        if (e.keyCode === 255 && el.textContent === "Fn")
            el.style.transform = "";
        if (el.textContent.toLowerCase() === e.key.toLowerCase() || el.textContent.trim().toLowerCase() == e.code.toLowerCase()) {
            el.style.transform = "";
        }
    })
})

keyBoard.map((el) => {
    el.onclick = () => {
        CapsLockFier.style = isCapsed ? greenLightStyle : "";
        if (el.textContent.length < 2) {
            input.value += el.textContent.toLowerCase();
        }
        if (el.textContent.trim().toLowerCase() === "backspace") {
            let replacedTxt = input.value.split("")
            replacedTxt.pop()
            input.value = replacedTxt.join("")
        } if (el.textContent.includes("Space")) {
            input.value += " "
        } if (el.textContent.includes("CapsLock")) {
            isCapsed = !isCapsed;
            CapsLockFier.style = isCapsed ? greenLightStyle : "";
        }
    }
})