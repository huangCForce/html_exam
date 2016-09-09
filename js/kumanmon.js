function drawKumamon() {
    var ku = document.getElementById("kumamon");
    if (ku.getContext) {
        var ctx = ku.getContext("2d");
        //绘图代码
        paintCircle(ctx, 250, 224, 191, 2, "#fff");
        bearBody(ctx, 128, 241, 245, 40, 334, 140, "#000");
        //左耳朵
        paintCircle(ctx, 138, 120, 28, 2, "#000");
        paintCircle(ctx, 138, 120, 15, 2, "#fff");
        //右耳朵
        paintCircle(ctx, 365, 120, 28, 2, "#000");
        paintCircle(ctx, 365, 120, 15, 2, "#fff");
        //脸
        paintOval(ctx, 250, 210, 140, 118, 2, "#000");
        //眉毛
        bearEyebrow(ctx, 20, 10, 168, 133, 130, 32, "#fff");
        bearEyebrow(ctx, 20, 10, 298, 130, 133, 32, "#fff");
        //左眼
        ctx.moveTo(160, 170);
        paintRotatedOval(ctx, 186, 170, 26, 27, 2, "#fff", 90);
        ctx.moveTo(182, 170);
        paintOval(ctx, 192, 170, 4, 10, 2, "#000");
        //右眼
        ctx.moveTo(273, 170);
        paintRotatedOval(ctx, 300, 170, 26, 27, 2, "#fff", 90);
        ctx.moveTo(308, 170);
        paintOval(ctx, 312, 170, 4, 10, 2, "#000");
        //嘴区域
        ctx.moveTo(186, 243);
        paintOval(ctx, 251, 243, 65, 52, 2, "#fff");
        //嘴
        paintQuadratic(ctx, 240, 196, 253, 110, "#000");
        paintQuadratic(ctx, 290, 196, 253, 110, "#000");
        //鼻子
        ctx.moveTo(228, 217);
        paintOval(ctx, 248, 217, 20, 17, 1, "#000");
        ctx.moveTo(228, 142);
        paintRotatedOval(ctx, 248, 142, 20, 13, 1, "#000", 180);
        //腮红
        ctx.moveTo(99, 227);
        paintCircle(ctx, 133, 227, 34, 2, "rgb(255,0,2)");
        paintCircle(ctx, 366, 227, 34, 2, "rgb(255,0,2)");
        //文字
        ctx.globalCompositeOperation = "source-over";
        paintText(ctx, inTxt, txtColor);
        paintBackground(ctx, v_color);
    }
}

function paintBackground(ctx, sColor) {
    v_color = sColor;
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = sColor;
    ctx.fillRect(0, 0, 500, 500);
}

function paintCircle(ctx, x, y, r, i, sColor) {
    ctx.beginPath();
    ctx.moveTo(x - r, y);
    ctx.arc(x, y, r, 0, i * Math.PI, false);
    ctx.fillStyle = sColor;
    ctx.fill();
}

function paintOval(ctx, x, y, a, b, i, sColor) {
    ctx.save();
    var r = (a > b) ? a : b;
    var ratioX = a / r;
    var ratioY = b / r;
    ctx.scale(ratioX, ratioY);
    ctx.beginPath();
    ctx.arc(x / ratioX, y / ratioY, r, 0, i * Math.PI, false);
    ctx.closePath();
    ctx.restore();
    ctx.fillStyle = sColor;
    ctx.fill();
}

function bearEyebrow(ctx, h1, h2, x0, y0, y1, d, sColor) {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    var x1 = x0 + d;
    var cp1x = x0 + d / 2;
    var cp1y = y0 - h1;
    var cp2y = y0 - h2;
    ctx.quadraticCurveTo(cp1x, cp1y, x1, y1);
    ctx.quadraticCurveTo(cp1x, cp2y, x0, y0);
    ctx.fillStyle = sColor;
    ctx.fill();
}

function paintRotatedOval(ctx, x, y, a, b, i, sColor, ang) {
    ctx.save();
    var r = (a > b) ? a : b;
    var ratioX = a / r;
    var ratioY = b / r;
    ctx.translate(x / ratioX, y / ratioY);
    ctx.rotate(ang * Math.PI / 180);
    ctx.scale(ratioX, ratioY);
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, i * Math.PI, false);
    ctx.closePath();
    ctx.restore();
    ctx.fillStyle = sColor;
    ctx.fill();
}

function paintQuadratic(ctx, cpy, x0, y0, d, sColor) {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    var x1 = x0 + d;
    var cpx = x0 + d / 2;
    ctx.quadraticCurveTo(cpx, cpy, x1, y0);
    ctx.closePath();
    ctx.fillStyle = sColor;
    ctx.fill();
}

function bearBody(ctx, x0, y0, rectW, rectH, trapW, trapH, sColor) {
    var x1 = x0 - (trapW - rectW) / 2;
    var y1 = y0 + rectH + trapH;
    ctx.beginPath();
    ctx.moveTo(x0, y0 + rectH);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x1 + trapW, y1);
    ctx.lineTo(x0 + rectW, y0 + rectH);
    ctx.closePath();
    ctx.fillStyle = sColor;
    ctx.globalCompositeOperation = "source-atop";
    ctx.fill();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x0 + rectW, y0);
    ctx.lineTo(x0 + rectW, y0 + rectH);
    ctx.lineTo(x0, y0 + rectH);
    ctx.lineTo(x0, y0);
    ctx.fill();
}

function paintText(ctx, txt, sColor) {
    inTxt = txt;
    sColor = txtColor;
    ctx.font = "bold 36px Arial";
    ctx.textAlign = "center";
    ctx.textBaseLine = "middle";
    ctx.fillStyle = sColor;
    ctx.fillText(txt, 250, 462);
}

var v_color = "rgb(174,0,0)";
var inTxt = "你挺能装B的呀？！";
var txtColor = "#fff";
window.onload = function() {
    drawKumamon();
}
