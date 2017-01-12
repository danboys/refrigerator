/**
 * Created by willy on 2016-09-21.
 */
Handlebars.registerHelper('isLt', function(num, max, options) {
    if (num < max) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper('isGt', function(num, max, options) {
    if (num > max) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper('isEq', function(num, max, options) {
    if (num == max) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper('isRange', function(num, start, end, options) {
    if (num >= start && num < end ) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});



Handlebars.registerHelper('isLength', function(array, options) {
    if (array.length > 0) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});


Handlebars.registerHelper('isZero', function(value, options) {
    if (value == 0 ) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});
Handlebars.registerHelper('isOne', function(value, options) {
    if (value == 1 ) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper('isTen', function(value, options) {
    if (value == 10 ) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper('isTenOver', function(array, options) {
	if (array.length > 10 ) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper('checkRoute', function(a, b, options) {
	if (a != b) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});




Handlebars.registerHelper('html', function(code, options) {
    return new Handlebars.SafeString(code);
});





Handlebars.registerHelper('isOwnCompare', function(array, options) {
    var bHas = false;
    array.forEach(function(element){
        //console.log(element);
        if (element.sect =="7"){
            bHas = true;
        }
    });
    if (bHas) {
        return options.fn(this);;
    } else {
        return options.inverse(this);;
    }
});

Handlebars.registerHelper('isActive', function(value, options) {
    if (value == "Y") {
        return "active";
    }
});

Handlebars.registerHelper('isShow', function(value, options) {
    if (value == "Y") {
        return "block";
    }
});



Handlebars.registerHelper('nowDate', function(value, format, options) {
    return moment().format("YYYY-MM-DD");
});







Handlebars.registerHelper('competitionBtn', function(num, options) {
    var sBtn;
    //거래금액 :TA, 거래량:TV, 수익금액:PA, 수익률:PR, 보유금액:HA, 보유수량:HQ
    if (num == 2 || num == 3) {
        sBtn = '<li data-code="TA" class="active">'
            + '<button type="button" class="btn btn_radio " ><span class="sprite sprite_common icon_cash"></span>거래금액</button>'
            + '</li>'
            + '<li data-code="TV">'
            + '<button type="button" class="btn btn_radio"><span class="sprite sprite_common icon_chart"></span>거래량</button>'
            + '</li>';
    } else if (num == 4) {
        sBtn = '<li data-code="PA" class="active">'
            + '<button type="button" class="btn btn_radio " ><span class="sprite sprite_common icon_cash"></span>수익금</button>'
            + '</li>'
            + '<li data-code="PR">'
            + '<button type="button" class="btn btn_radio"><span class="sprite sprite_common icon_chart"></span>수익률</button>'
            + '</li>';
    } else if (num == 5) {
        sBtn = '<li data-code="HA" class="active">'
            + '<button type="button" class="btn btn_radio " ><span class="sprite sprite_common icon_cash"></span>보유금액</button>'
            + '</li>'
            + '<li data-code="HQ">'
            + '<button type="button" class="btn btn_radio"><span class="sprite sprite_common icon_chart"></span>보유수량</button>'
            + '</li>';
    }
    return new Handlebars.SafeString(sBtn);
});





Handlebars.registerHelper('fluctuation', function(num, options) {

	try {
		
		num = String(num);
		num = Number(num.replace(/,/gi, ''));
		
		if (num > 0) {
			return "up";
		} else if (num < 0) {
			return "down";
		} else {
			return "bar";
		}
	} catch (err){
		return "bar";
	}
});
Handlebars.registerHelper('fluctuationIcon', function(rate, options) {
    if (rate > 15) {
        return "up_limit";
    } else if (rate <= 15 && rate > 0) {
        return "up";
    } else if (rate < -15) {
        return "down_limit";
    } else if (rate >= -15 && rate < 0) {
        return "down";
    } else {
        return "bar";
    }
});

Handlebars.registerHelper('daebiColor', function(num, options) {
    daebi = String(num);
    if (daebi  == "++") {
        return "up";
    } else if (daebi  == "+") {
        return "up";
    } else if (daebi  == "--") {
        return "down";
    } else if (daebi  == "-") {
        return "down";
    } else {
        return "bar";
    }
});
Handlebars.registerHelper('daebiIcon', function(daebi, options) {
 
    if (daebi  == "++") {
        return "up_limit";
    } else if (daebi  == "+") {
        return "up";
    } else if (daebi  == "--") {
        return "down_limit";
    } else if (daebi  == "-") {
        return "down";
    } else {
        return "bar";
    }
});



Handlebars.registerHelper('math', function(lvalue, operator, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);
    return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue
    }[operator];
});

Handlebars.registerHelper('changeDate', function(value, operator, options) {
    return value.replace('-', operator).replace('-', operator);
    }
);

Handlebars.registerHelper('dialogBtnText', function (str, options) {
    switch (str) {
        case "확인":
            return "green _dialog_close _dialog_confirm";
            break;
        case "취소":
            return "dark_gray _dialog_close _dialog_cancel";
            break;
        case "비밀번호 재등록":
            return "green";
            break;
        case "다시입력":
            return "dark_gray";
            break;
        case "사용하기":
            return "green";
            break;
        case "투자원정대 안내":
            return "green";
            break;
        case "재시도":
            return "green";
            break;
    }
});



/**
 * 거래 타입
 * 매수:B, 매도:S
 */

// ifTradeType
Handlebars.registerHelper('ifTradeType', function(value, options) {
    //매수:B, 매도:S
    if (value == "B") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});


Handlebars.registerHelper('tradeType', function(value, options) {
    var code = "";
    switch (value){
        //매수:B, 매도:S
        case "B" :
            code = "매수"
            break;
        case "S" :
            code = "매도"
            break;
        case "I" :
            code = "입고"
            break;
        case "O" :
            code = "출고"
            break;
    }
    return code;
});
Handlebars.registerHelper('tradeTypeClass', function(value, options) {
    var code = "";
    switch (value){
        //매수:B, 매도:S
        case "B" :
            code = "buy"
            break;
        case "S" :
            code = "sell"
            break;
        case "I" :
            code = "in"
            break;
        case "O" :
            code = "out"
            break;
    }
    return code;
});



/**
 * 관심업종 검색
 */
Handlebars.registerHelper('statusInterest', function(value, options) {
    var code = "";
    var html = "";
    value.forEach(function (element) {
        code = Handlebars.helpers.statusInterestType(element);
        html = html + '<li><a href="#">' + code + '</a></li>'
    });
    return new Handlebars.SafeString(html);

});




/**
 * 투자성향 검색
 */
Handlebars.registerHelper('getStatusHtml', function(value, type, options) {
    var code = "";
    var html = "";
    // console.log(value);
    value.forEach(function (element) {

        switch (type) {
            case "age" :
                code = Handlebars.helpers.statusAge(element.ageCd);
                break;
            case "gender" :
                code = Handlebars.helpers.statusGender(element.genderCd);
                break;
            case "work" :
                code = Handlebars.helpers.statusWork(element.workCd);
                break;
            case "bloodT" :
                code = Handlebars.helpers.statusBloodT(element.bloodTCd);
                break;
            case "sign" :
                code = Handlebars.helpers.statusSign(element.signCd);
                break;
            case "interBusiness" :
                code = Handlebars.helpers.statusInterestType(element.interBusinessCd);
                break;
            case "invstType" :
                code = Handlebars.helpers.statusInvstType(element.invstTypeCd);
                break;

        }



        html = html + '<li>' + code + '</li>'
    });
    return new Handlebars.SafeString(html);

});




/**
 * 검색결과 리턴 함수
 */

/**
 * 리그 검색
 */

Handlebars.registerHelper('statusLeagueCd', function(value, options) {
    var code = "";
    switch (value){
        //매수:B, 매도:S
        case "1" :
            code = "슈퍼스타"
            break;
        case "2" :
            code = "3000리그"
            break;
        case "3" :
            code = "1000리그"
            break;
        case "4" :
            code = "100리그"
            break;
    }
    return code;
});


/**
 * 성별 검색
 */
Handlebars.registerHelper('statusGender', function(value, options) {
    var code = "";
    switch (value){
        //남성(M), 여성(W)
        case "M" :
            code = "남성"
            break;
        case "W" :
            code = "여성"
            break;
    }
    return code;
});

/**
 * 나이 검색
 */
Handlebars.registerHelper('statusAge', function(value, options) {

    var code = "";
    switch (value){
        //남성(M), 여성(W)
        case "10" :
            code = "10대";
            break;
        case "20" :
            code = "20대";
            break;
        case "30" :
            code = "30대";
            break;
        case "40" :
            code = "40대";
            break;
        case "50" :
            code = "50대";
            break;
        case "60" :
            code = "60대";
            break;
        case "70" :
            code = "70대 이상";
            break;
    }
    return code;
});

/**
 * 혈액형 검색
 */
Handlebars.registerHelper('statusBloodT', function(value, options) {
    var code = "";
    switch (value){
        //남성(M), 여성(W)
        case "A" :
            code = "A형";
            break;
        case "B" :
            code = "B형";
            break;
        case "O" :
            code = "O형";
            break;
        case "AB" :
            code = "AB형";
            break;
    }
    return code;
});




/**
 * 직업 검색
 */

Handlebars.registerHelper('statusWork', function(value, options) {
    var code = "";
    switch (value){
        case "1" :
            code = "학생"
            break;
        case "2" :
            code = "직장인"
            break;
        case "3" :
            code = "주부"
            break;
        case "4" :
            code = "개인사업자"
            break;
        case "5" :
            code = "전업투자자"
            break;
        case "6" :
            code = "기타"
            break;

    }
    return code;

});


/**
 * 별자리 검색
 */
Handlebars.registerHelper('statusSign', function(value, options) {

    var code = "";
    switch (value){
        case "01" :
            code = "염소자리"
            break;
        case "02" :
            code = "물병자리"
            break;
        case "03" :
            code = "물고기자리"
            break;
        case "04" :
            code = "양자리"
            break;
        case "05" :
            code = "황소자리"
            break;
        case "06" :
            code = "쌍둥이자리"
            break;
        case "07" :
            code = "게자리"
            break;
        case "08" :
            code = "사자자리"
            break;
        case "09" :
            code = "처녀자리"
            break;
        case "10" :
            code = "천칭자리"
            break;
        case "11" :
            code = "전갈자리"
            break;
        case "12" :
            code = "사수자리"
            break;

    }
    return code;

});


/**
 * 관심업종 검색
 */
Handlebars.registerHelper('statusInterestType', function(value, options) {
    var code = "";
    switch (value){
        //배당주(01), 가치주(02), 성장주(03), 테마주(04), 기본적분석(05), 기술적분석(06), 대형주(07), 중소형주(08), 장기투자(09), 단기투자(10)
        case "01" :
            code = "에너지"
            break;
        case "02" :
            code = "화학소재"
            break;
        case "03" :
            code = "건축소재"
            break;
        case "04" :
            code = "금속광물"
            break;
        case "05" :
            code = "기타소재"
            break;
        case "06" :
            code = "건설/자재"
            break;
        case "07" :
            code = "전기장비"
            break;
        case "08" :
            code = "복합산업"
            break;
        case "09" :
            code = "기계무역조선"
            break;
        case "10" :
            code = "상업서비스"
            break;
        case "11" :
            code = "운송"
            break;
        case "12" :
            code = "자동차"
            break;
        case "13" :
            code = "소비재/의류"
            break;
        case "14" :
            code = "여행레져"
            break;
        case "15" :
            code = "교육"
            break;
        case "16" :
            code = "미디어"
            break;
        case "17" :
            code = "유통"
            break;
        case "18" :
            code = "음식료/담배"
            break;
        case "19" :
            code = "생활용품"
            break;
        case "20" :
            code = "의료장비"
            break;
        case "21" :
            code = "제약바이오"
            break;
        case "22" :
            code = "은행"
            break;
        case "23" :
            code = "증권"
            break;
        case "24" :
            code = "보험"
            break;
        case "25" :
            code = "부동산"
            break;
        case "26" :
            code = "기타금융"
            break;
        case "27" :
            code = "소프트웨어"
            break;
        case "28" :
            code = "하드웨어"
            break;
        case "29" :
            code = "반도체"
            break;
        case "30" :
            code = "디스플레이"
            break;
        case "31" :
            code = "통신서비스"
            break;
        case "32" :
            code = "유틸리티"
            break;
    }
    return code;

});




/**
 * 투자성향 검색
 */
Handlebars.registerHelper('statusInvstType', function(value, options) {


    var code = "";
    switch (value){
        //배당주(01), 가치주(02), 성장주(03), 테마주(04), 기본적분석(05), 기술적분석(06), 대형주(07), 중소형주(08), 장기투자(09), 단기투자(10)
        case "01" :
            code = "배당주"
            break;
        case "02" :
            code = "가치주"
            break;
        case "03" :
            code = "성장주"
            break;
        case "04" :
            code = "테마주"
            break;
        case "05" :
            code = "기본적분석"
            break;
        case "06" :
            code = "기술적분석"
            break;
        case "07" :
            code = "대형주"
            break;
        case "08" :
            code = "중소형주"
            break;
        case "09" :
            code = "장기투자"
            break;
        case "10" :
            code = "단기투자"
            break;
    }
    return code;

});


/**
 * 검색결과 관심종록 매핑
 */


/**
 * 리그 바인딩
 *
 */
Handlebars.registerHelper('resultSearchSpec', function(value, type, options) {
    var code = "";
    var html = "";
    var sFn = 'Handlebars.helpers.'+type+'(element)';
    console.log(sFn);
    value.forEach(function (element) {
        code = eval(sFn);
        html = html + '<span>' + code + '</span>\n'
    });
    return new Handlebars.SafeString(html);

});

/**
 * 수익률 비교 테이블 th
 */
Handlebars.registerHelper('categoryLabel', function(str) {
    switch (str) {
        case "5":
            return "KOSPI";
            break;
        case "6":
            return "KOSDAQ";
            break;
        case "1":
	        return "슈퍼스타";
            break;
        case "2":
	        return "3000리그";
	        break;
	    case "3":
	        return "1000리그";
	        break;
	    case "4":
	        return "100리그";
            break;
        case "7":
            return "나";
            break;
    }
});

/**
 * +1 증가함수
 */
Handlebars.registerHelper("inc", function(value, options){
    return parseInt(value) + 1;
});

/**
 * +1 증가함수
 */
Handlebars.registerHelper("abs", function(value, options){
	if(value === undefined || value == '')
		return "0";
	var math = String(Math.abs(value.replace(",","")));
	var commaStr = math.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    return commaStr;
});

Handlebars.registerHelper("isBar", function(value, options){
    if (value == 0) {
        return "-";
    } else {
        return Math.abs(value);
    }


});



/**
 * Hot event 5칸 목록 시작
 */
Handlebars.registerHelper("isListStart", function(value, options){
    if (value%5 == 1) {
        return "<tr>";
    } else {
        return "";
    }
});

/**
 * Hot event 5칸 목록 끝 
 */
Handlebars.registerHelper("isListLast", function(value, options){
	if (value%5 == 0) {
        return "</tr>";
    } else {
        return "";
    }
});

/**
 * Hot event 아이콘 모양 return 
 */
Handlebars.registerHelper("prizeIcon", function(value, options){
	if (value == "W") {
		return "sucess";
	} else if(value == "F") {
		return "fail";
	} else if(value == "N") {
		return "none";
	} else if(value == "C") {
		return "complete";
	} else if(value == "Q") {
		return "";
	} else {
		return "";
	}
});
/**
 * 종목 결과 active
 */
Handlebars.registerHelper("winItem", function(value, options){
	if (value == "w" || value == "W") {
		return "active";
	} else {
		return "";
	}
});
/**
 * 선택 값 결과 checked
 */
Handlebars.registerHelper("slctItem", function(value, options){
	if (value == "Y") {
		return 'checked="checked"';
	} else {
		return "";
	}
});

Handlebars.registerHelper("condGugun", function(value, options){
	var gubun = false;
	if(value == 'HA'|| value == 'PA' || value == 'TA'){
		gubun = true;
	}
	return gubun;
});

Handlebars.registerHelper("condNm", function(value, options){
	var condNm = "";
	if(value == 'TA'){
		condNm = "거래금액(천원)";
	}else if(value == 'TV'){
		condNm = "거래량";
	}else if(value == 'PA'){
		condNm = "수익금액(천원)";
	}else if(value == 'PR'){
		condNm = "수익률";
	}else if(value == 'HA'){
		condNm = "보유금액(천원)";
	}else{
		condNm = "보유수량";
	}
	return condNm;
});


Handlebars.registerHelper("competitionValue", function(value, options){
	var condValue;
	if(value.body.cond == 'TA'){
		condValue = value.body.trdAmt.iscdList;
	}else if(value.body.cond == 'TV'){
		condValue = "거래량";
	}else if(value.body.cond == 'PA'){
		condValue = "수익금액(천원)";
	}else if(value.body.cond == 'PR'){
		condValue = "수익률";
	}else if(value.body.cond == 'HA'){
		condValue = "보유금액(천원)";
	}else{
		condValue = "보유수량";
	}
	return condValue;
});

Handlebars.registerHelper("holdIscdGrpNm", function(value, options){
	var holdIscdGrpNm;
	if(value == '1'){
		holdIscdGrpNm = "일반";
	}else if(value == '2'){
		holdIscdGrpNm = "융자";
	}else{
		holdIscdGrpNm = "대주";
	}
	return holdIscdGrpNm;
});

Handlebars.registerHelper("waitYnCheck", function(value, options){
	var check = false;
	if(value == 'Y'){
		check = true;
	}
	return check;
});

Handlebars.registerHelper("myStatusErr", function(value, options){
	var check = false;
	if(value.errYn != 'Y' || value.errCode != '1006' && value.errCode != '1002' && value.errCode != '1007' ){
		check = true;
	}
	return check;
});


/* 수공 내용 */
Handlebars.registerHelper("setWeather", function(value, options){
    return "/images/egovframework/main_new/weather_ico0" + value + ".png";
});

Handlebars.registerHelper("hrefPicture", function(type, index, options){
    var uri = ""

    if (type == "10") {
        uri ='/wstatic/picture/picture01_detail.do?statsSeqno='+index
    } else if (type == "20") {
        uri ='/wstatic/picture/picture02_detail.do?statsSeqno='+index
    } else if (type == "30") {
        uri ='/wstatic/picture/picture03_detail.do?statsSeqno='+index
    } else if (type == "40") {
        uri ='/wstatic/picture/picture04_detail.do?statsSeqno='+index
    } else if (type == "50") {
        uri ='/wstatic/picture/picture05_detail.do?statsSeqno='+index
    } else if (type == "60") {
        uri ='/wstatic/picture/picture06_detail.do?statsSeqno='+index
    } else if (type == "70") {
        uri ='/wstatic/picture/picture07_detail.do?statsSeqno='+index
    }

        return uri;

});


Handlebars.registerHelper("forumType", function(value, options){
        var str = "";
    if ( value == "T") {
        str = "[Thematic Process]";
    } else if (value == "INR"){
        str = "[Regional Process]";
    } else if (value == "S"){
        str = "[Science & Technology Process]";
    } else if (value == "SE"){
        str = "[Side Event]";
    }
    return str;
});

Handlebars.registerHelper("swCommunityUrl", function(value, options){
        var str = "";
    if ( value == "COMTMSTR_00000000001") {
        str = "community01_detail.do";
    } else if (value == "COMTMSTR_00000000002"){
        str = "community02_detail.do";
    } else if (value == "COMTMSTR_00000000003"){
        str = "community03_detail.do";
    } else if (value == "COMTMSTR_00000000004"){
        str = "community04_detail.do";
    }
    return str;
});

Handlebars.registerHelper("o3Info", function(grade, options){
    var reTxt = "";

    if(grade=='1'){
        reTxt = "좋음";
    }else if(grade=='2'){
        reTxt = "보통";
    }else if(grade=='3'){
        reTxt = "나쁨";
    }else if(grade=='4'){
        reTxt = "매우나쁨";
    } else {
        reTxt = grade;
    }
    return reTxt;
});

Handlebars.registerHelper("pm10Color", function(grade, options){
    var classTxt = "";

    if(grade=='1'){
        classTxt = "2";
    }else if(grade=='2'){
        classTxt = "1";
    }else if(grade=='3'){
        classTxt = "3";
    }else if(grade=='4'){
        classTxt = "4";
    } else {
        classTxt = "0";
    }
    return classTxt;
});

Handlebars.registerHelper("o3Color", function(grade, options){
    var classTxt = "";

    if(grade=='1'){
        classTxt = "2";
    }else if(grade=='2'){
        classTxt = "1";
    }else if(grade=='3'){
        classTxt = "3";
    }else if(grade=='4'){
        classTxt = "4";
    } else {
        classTxt = "0";
    }
    return classTxt;
});

Handlebars.registerHelper("droughtColor", function(str, options){
    var classTxt = "";

    if(str =="정상"){
        classTxt ="2";
    }else if(str =="주의"){
        classTxt ="5";
    }else if(str =="심함"){
        classTxt ="3";
    }else if(str =="매우심함"){
        classTxt ="4";
    }
    return classTxt;
});

Handlebars.registerHelper("dataFormat", function(value, format, options){
    return numeral(value).format(format);
});

Handlebars.registerHelper("waterqtyIcon", function(str, options){
    var classTxt = "";

    if(str=='1'){
        classTxt = "1";
    }else if(str=='2'){
        classTxt = "2";
    }else if(str=='3'){
        classTxt = "3";
    }else if(str=='4'){
        classTxt = "4";
    }else if(str=='5'){
        classTxt = "5";
    }else if(str=='6'){
        classTxt = "6";
    }else if(str=='7'){
        classTxt = "7";
    }else {
        classTxt = "1";
    }
    return classTxt;
});




Handlebars.registerHelper("unwrapHtml", function(value, options){
    return value.replace('<p>', "").replace('</p>', "");
});


Handlebars.registerHelper("removehttp", function(value, options){
    var str = value;
    try {
        str = value.replace('http:', "");
    } catch (err){
        console.log(err);
    }

    return str
});

Handlebars.registerHelper("removeHtml", function(value, options){
    value = value.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&nbsp;/g, "");
    value = value.replace(/(<([^>]+)>)/ig, "");
    return value
});

Handlebars.registerHelper("substring", function(value, length, options){
    value = value.substring(length);
    return value
});
Handlebars.registerHelper("tidal", function(value, options){
    var str = "";
    if (value == "미발령") {
        str = "01";
    } else if (value == "관심") {
        str = "02";
    } else if (value == "경계") {
        str = "03";
    } else if (value == "대발생") {
        str = "04";
    }
    return str;
});


Handlebars.registerHelper("pm10Grade", function(str, options){
    var classTxt = "";

    if(str=='1'){
        classTxt = "좋음";
    }else if(str=='2'){
        classTxt = "좋음";
    }else if(str=='3'){
        classTxt = "좋음";
    }else if(str=='4'){
        classTxt = "좋음";
    }else if(str=='5'){
        classTxt = "좋음";
    }else if(str=='6'){
        classTxt = "좋음";
    }else if(str=='7'){
        classTxt = "좋음";
    }
    return classTxt;
});

Handlebars.registerHelper("stageChange", function(str, options){
    var classHtml = "";

    if(str=='01'){
        classHtml = "<span>-</span>";
    }else if(str=='02'){
        classHtml = "<span style='color:#f6c342'>관심</span>";
    }else if(str=='03'){
        classHtml = "<span style='color:#f79232'>경계</span>";
    }else if(str=='04'){
        classHtml = "<span style='color:#d04437'>대발생</span>";
    }
    return classHtml;
});

Handlebars.registerHelper("droughtTxt", function(str, options){
    var result;
    console.log("================================================");
    console.log(str);
    console.log("================================================");
    if(str == null){
        result = "<td> - </td>";
    } else {
        result = '<td class="align_left">' + str + '</td>';
    }
    return new Handlebars.SafeString(result);
});



