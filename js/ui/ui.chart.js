/*
 * ***************************************************************************************************
 *  캔들차트
 * ***************************************************************************************************
 */

var up_color = "rgb(248,34,143)"; // 상승, 상한
var no_color = "rgb(0,0,0)"; // 보합
var dn_color = "rgb(0,61,167)"; // 하한, 하락

/*
 * 공통 일봉 차트 canvasId : <canvas> Id TDtMktPrc : 시가 TDtHPrc : 고가 TdtLPrc : 저가
 * PDayclsPrc : 전일종가 symbol : 부호
 */
function candleDayChart(canvasId, TDtMktPrc, TDtHPrc, TdtLPrc, PDayclsPrc,
		symbol) {// PDayclsPrc:curPrice, symbol:daebi
	var canvas = document.getElementById(canvasId);
	var idCanvas = "#" + canvasId;

	var open = parseInt(TDtMktPrc.replace(/,/g, ''), 10);
	var high = parseInt(TDtHPrc.replace(/,/g, ''), 10);
	var low = parseInt(TdtLPrc.replace(/,/g, ''), 10);
	var close = parseInt(PDayclsPrc.replace(/,/g, ''), 10);
	var diff = parseInt(getDiff(symbol), 10);

	if (canvas.getContext) {
		var ctx = canvas.getContext("2d");

		var cx = $(idCanvas).width() / 2;
		var cy = $(idCanvas).height() / 2;
		var W = $(idCanvas).width();
		var H = $(idCanvas).height();

		if ((open == 0 && high == 0 && low == 0)
				|| (open == high && high == low && open == close && diff == 0)) { // diff=5로
			// 바꾸기
			ctx.fillStyle = no_color;
			ctx.strokeStyle = no_color;
			ctx.moveTo(0, cy);
			ctx.lineTo(W, cy);
			ctx.stroke();
			return;
		}

		if (open < close) {
			ctx.fillStyle = up_color;
			ctx.strokeStyle = up_color;
		} else if (open > close) {
			ctx.fillStyle = dn_color;
			ctx.strokeStyle = dn_color;
		} else {
			ctx.fillStyle = no_color;
			ctx.strokeStyle = no_color;
		}

		var curMax = 0;
		var curMin = 0;

		curMax = Math.max(open, close);
		curMax = Math.max(curMax, high);
		curMax = Math.max(curMax, low);

		curMin = Math.min(open, close);
		curMin = Math.min(curMin, high);
		curMin = Math.min(curMin, low);

		var curCalcHeight = curMax - curMin;
		var openL = H - ((H) * (open - curMin)) / curCalcHeight;
		var closeL = H - ((H) * (close - curMin)) / curCalcHeight;
		var openL = parseInt(openL, 10);
		var closeL = parseInt(closeL, 10);

		if (open == close) {
			ctx.moveTo(0, openL);
			ctx.lineTo(W, openL);
			ctx.stroke();
		} else {
			if (openL > closeL) {
				ctx.fillRect(0, closeL, W, (openL - closeL));
			} else {
				ctx.fillRect(0, openL, W, (closeL - openL));
			}
		}
		ctx.moveTo(cx, 0);
		ctx.lineTo(cx, H);
		ctx.stroke();
	} else {
		alert(canvas.getContext);
	}
}

/*
 * 캔버스 삭제 canvasId : <canvas> Id
 */
function clearCanvas(canvasId) {
	var canvas = document.getElementById(canvasId);
	if (canvas.getContext) {
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.beginPath();
	}
}

function getDiff(sym) {
	var result = "5";
	if (sym == "+") {
		result = "6";
	} else if (sym == "++") {
		result = "7";
	} else if (sym == "-") {
		result = "4";
	} else if (sym == "--") {
		result = "3";
	}
	return result;
}
