const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");

//css사이즈와 element사이즈를 같게 설정.
canvas.width=700;
canvas.height=700;

//기본색상
ctx.strokeStyle = "black";
//기본굵기
ctx.lineWidth = 2.5;

let painting = false;

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

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    
}