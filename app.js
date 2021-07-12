const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
//const colors = document.querySelectorAll(".jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "black"

//css사이즈와 element사이즈를 같게 설정.
canvas.width=700;
canvas.height=700;

//기본 배경 지정. HTML에만 지정되어있음.
ctx.fillStyle = "white";
ctx.fillRect(0,0,700,700);
//기본색상
ctx.strokeStyle = INITIAL_COLOR; //Paing
ctx.fillStyle = INITIAL_COLOR; //Fill
//기본굵기
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

 function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else{
        ctx.lineTo(x, y);
        //그림 그리기
        ctx.stroke();
    }
 }

function onMouseDown(event){
    painting = true;
}

function onMouseUp(event){
    stopPainting();
}

function handleColorClick(event){
    //console.log(event.target.style.backgroundColor);
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    //console.log(event.target.value);
    const chagedRange = event.target.value;
    ctx.lineWidth = chagedRange;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "Paint";
        
    }
}

function handleCanvasClick(){
    if(filling === true){
        ctx.fillRect(0,0,700,700);
    }
}

function handleCM(event){
    event.preventDefault();
    //console.log(event);
}

function handleSaveClick (){
    const image = canvas.toDataURL("image/png"); // jpeg, png ... 
    const link = document.createElement("a");
    link.href = image   //<a download=''></a>
    link.download = Date.now(); 
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM); //우클릭
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}