document.doamin = "water.or.kr";

var apiClient = (function() {
	// var baseUrl = 'http://m.water.or.kr';
	var baseUrl = '';

	_get = function(req, opts) {

		$.extend(req.param, opts.param);

		var url;
		if(opts.dummy){
			url = req.dummy;
		}else{
			url = baseUrl + req.url;
		}
		return $.ajax({
			type : req.type,
			url : url,
			dataType : 'json',
			data : $.param(req.param)
		}).done(function(res) {
			// res.success = true;
			//console.log(res);
			if(opts.callback !== undefined)
				opts.callback(res, true);

		}).fail(function(jqXHR, textStatus ) {
			// jqXHR.success = false;
			// console.log( "Request failed: " + textStatus +"/"+JSON.stringify(jqXHR));

			if(opts.callback !== undefined)
				opts.callback(jqXHR, false);
		}).always(function() {

		});
	};
	/**
	 * ======================================== 메인 ========================================
	 */

	/**
	 * 내 지역 물정보
	 */
	getMyWaterInfo = function(opts){
		var data = {
			url : '',
			dummy: '',
			type: 'GET',
			param: {
			}
		};

		_get(data, opts);
	};
	getMyWaterDAMInfo = function(opts){
		var data = {
			url : '',
			dummy: '',
			type: 'GET',
			param: {
			}
		};
		_get(data, opts);
	};
	getSearchMainWeather = function(opts){
		var data = {
			url : '',
			dummy: '',
			type: 'GET',
			param: {
			}
		};
		_get(data, opts);
	};

	/**
	 * 명소
	 */

	getTourLife = function(opts, x, y){
		var data = {
			url : 'http://m.water.or.kr/life/tour/tour01Json.do?coordx='+ x +'&coordy=' + y,
			dummy: '',
			type: 'GET',
			param: {
			}
		};
		_get(data, opts);
	};
	


	/*** ======================================== 핫 이슈 ========================================
	 */


	/**
	 * 핫 이슈 뉴스
	 */
	getNewsJsonData = function(opts){
		var data = {
			url : 'http://m.water.or.kr/information/socialNews/socialNews01Json.do',
			dummy: '../../js/dummy/news.json',
			type: 'GET',
			param: {
			}

		};

		_get(data, opts);
	};

	/**
	 * 핫 이슈 이슈리포트
	 */
	getReportJsonData = function(opts){
		var data = {
			//url : 'http://m.water.or.kr/information/issuereport/issuereport01Json.do',
			url : 'http://m.water.or.kr/pcUpload/data/main/Report.json',
			dummy: '../../js/dummy/Report.json',
			type: 'GET',
			param: {}
		};
		_get(data, opts);
	};
	/**
	 * 핫 이슈 물기술 동향
	 */
	getArticleJsonData = function(opts){
		var data = {
			//url : 'http://m.water.or.kr/information/techtrends/techtrends01Json.do',
			url : 'http://m.water.or.kr/pcUpload/data/main/Article.json',
			dummy: '../../js/dummy/Article.json',
			type: 'GET',
			param: {}
		};
		_get(data, opts);
	};
	/**
	 * 핫 이슈 그림으로보는 물 통계
	 */
	getEasyStaticJsonData = function(opts){
		var data = {
			url : 'http://m.water.or.kr/wstatic/picture/pictureJson.do',
			dummy: '../../js/dummy/easyStatic.json',
			type: 'GET',
			param: {

			}
		};
		_get(data, opts);
	};




	/**
	 * ======================================== 생활 ========================================
	 */


	/**
	 * 생활 상식
	 */

	getSense = function(opts){
		var data = {
			//url : 'http://m.water.or.kr/life/around/around01Json.do',
			url : 'http://m.water.or.kr/pcUpload/data/main/Sense.json',
			//url : '/upload/data/main/Sense.json',
			dummy: '../../js/dummy/Sense.json',
			type: 'GET',
			param: {

			}
		};
		_get(data, opts);
	};

	/**
	 * 물과 건강
	 */


	getHealth = function(opts){
		var data = {
			//url : 'http://m.water.or.kr/life/around/around02Json.do',
			url : 'http://m.water.or.kr/pcUpload/data/main/Health.json',
			dummy: '',
			type: 'GET',
			param: {

			}
		};
		_get(data, opts);
	};

	/**
	 * 강이야기
	 */

	getRiver = function(opts){
		var data = {
			url : 'http://m.water.or.kr/life/history/history01Json.do',
			dummy: '',
			type: 'GET',
			param: {

			}
		};
		_get(data, opts);
	};

	/**
	 * 여행
	 */

	getTour = function(opts){
		var data = {
			url : 'http://m.water.or.kr/life/tour/tour03Json.do',
			dummy: '',
			type: 'GET',
			param: {

			}
		};
		_get(data, opts);
	};

	/**
	 * 축제행사
	 */

	getFestival = function(opts){
		var data = {
			//url : 'http://m.water.or.kr/life/culture/culture01Json.do',
			url : 'http://m.water.or.kr/pcUpload/data/main/Festival.json',
			dummy: '',
			type: 'GET',
			param: {

			}
		};
		_get(data, opts);
	};

	/**
	 * 워터스포츠
	 */

	getWaterSports = function(opts){
		var data = {
			//url : 'http://m.water.or.kr/life/culture/culture02Json.do',
			url : 'http://m.water.or.kr/pcUpload/data/main/WaterSports.json',
			dummy: '../../js/dummy/WaterSports.json',
			type: 'GET',
			param: {

			}
		};
		_get(data, opts);
	};

	/**
	 * 날씨이야기
	 */

	getWeatherStory = function(opts){
		var data = {
			url : 'http://m.water.or.kr/life/weatherstory/weatherstory01Json.do',
			dummy: '',
			type: 'GET',
			param: {

			}
		};
		_get(data, opts);
	};

	//todo : 데이터 연동 해야함 ( 데이터가 신규 생성되어야하는 자료임 )
	/**
	 * 물과도시
	 */

	getUnderGround = function(opts){
		var data = {
			url : 'http://m.water.or.kr/life/city/cityJson.do',
			dummy: '',
			type: 'GET',
			param: {

			}
		};
		_get(data, opts);
	};



	/**
	 * ======================================== 소통 ========================================
	 */

	/**
	 * 나의 물이야기
	 */

	getMyWaterStory = function(opts){
		var data = {
			url : 'http://m.water.or.kr/life/waterhistory/waterhistory01Json.do',
			dummy: '',
			type: 'GET',
			param: {

			}
		};
		_get(data, opts);
	};

	/**
	 * 갤러리 4종류
	 */

	getGallery01 = function(opts){
		var data = {
			url : 'http://m.water.or.kr/life/gallery/gallery01Json.do',
			//url : 'http://m.water.or.kr/pcUpload/data/main/Gallery01.json',
			dummy: '../../js/dummy/Gallery01.json',
			type: 'GET',
			param: {

			}
		};
		_get(data, opts);
	};
	getGallery02 = function(opts){
		var data = {
			url : 'http://m.water.or.kr/life/gallery/gallery02Json.do',
			//url : 'http://m.water.or.kr/pcUpload/data/main/Gallery02.json',
			dummy: '../../js/dummy/Gallery02.json',
			type: 'GET',
			param: {

			}
		};
		_get(data, opts);
	};
	getGallery03 = function(opts){
		var data = {
			url : 'http://m.water.or.kr/life/gallery/gallery03Json.do',
			//url : 'http://m.water.or.kr/pcUpload/data/main/Gallery03.json',
			dummy: '../../js/dummy/Gallery03.json',
			type: 'GET',
			param: {

			}
		};
		_get(data, opts);
	};
	getGallery04 = function(opts){
		var data = {
			url : 'http://m.water.or.kr/life/gallery/gallery04Json.do',
			//url : 'http://m.water.or.kr/pcUpload/data/main/Gallery04.json',
			dummy: '../../js/dummy/Gallery04.json',
			type: 'GET',
			param: {

			}
		};
		_get(data, opts);
	};

	/**
	 * 행사일정
	 */

	//todo : 서브페이지에 개발되어있는 소스가 있음, 그 내용을 가지고 오도록 해야합니다.
	//todo : 메인의 데이터에는 장소에 대한 데이터가 없음 새로운 데이터가 필요합니다.

	getCalendarJson = function(opts, startDate, endDate){
		var data = {
			url : 'https://m.water.or.kr/information/event/event01Json.do?startDt='+startDate+'&endDt='+endDate,
			dummy: '',
			type: 'GET',
			param: {}
		};
		_get(data, opts);
	};

	/**
	 * 기술 SW 커뮤니티
	 */

	getSwCommunity = function(opts){
		var data = {
			url : 'http://m.water.or.kr/application/community/communityJson.do',
			dummy: '',
			type: 'GET',
			param: {}
		};
		_get(data, opts);
	};

	/**
	 * ======================================== 지식 ========================================
	 */

	/**
	 * 물교육
	 */

	getEducation = function(opts){
		var data = {
			url : 'http://m.water.or.kr/pcUpload/data/main/Education.json',
			dummy: '../../js/dummy/Education.json',
			type: 'GET',
			param: {}
		};
		_get(data, opts);
	};

	/**
	 * 지식 동영상
	 */

	getWAcademy = function(opts){
		var data = {
			url : 'http://m.water.or.kr/knowledge/academy/academy01Json.do',
			dummy: '',
			type: 'GET',
			param: {}
		};
		_get(data, opts);
	};
	
	/**
	 * 물과역사
	 */

	getHistory = function(opts){
		var data = {
			//url : 'http://m.water.or.kr/knowledge/history/history01Json.do',
			url : 'http://m.water.or.kr/pcUpload/data/main/History.json',
			dummy: '../../js/dummy/History.json',
			type: 'GET',
			param: {}
		};
		_get(data, opts);
	};
	
	/**
	 * 학생 발명품
	 */
	getStudent = function(opts){
		var data = {
			url : 'http://m.water.or.kr/knowledge/stuInvention/stuInventionJson.do',
			dummy: '../../js/dummy/student.json',
			type: 'GET',
			param: {}
		};
		_get(data, opts);
	};
	
	/**
	 * 우수기술제품
	 */

	//todo : 랜덤으로 4개 표출해야하는데 링크 내용 확인해야함
	getNewSkill = function(opts){
		var data = {
			url : 'http://m.water.or.kr/upload/data/main/NewSkill.json',
			//url : '	/upload/data/main/NewSkill.json',
			dummy: '',
			type: 'GET',
			param: {}
		};
		_get(data, opts);
	};


	/**
	 * 물백과사전
	 */

	getDictionary = function(opts){
		var data = {
			url : 'http://m.water.or.kr/knowledge/encyclopedia/encyclopedia01Json.do',
			// url : '',
			dummy: '',
			type: 'GET',
			param: {}
		};
		_get(data, opts);
	};

	/**
	 * ======================================== 해외 ========================================
	 */


	getTrend = function(opts){
		var data = {
			url : 'http://m.water.or.kr/overseas/globals/trendJson.do',
			dummy: '../../js/dummy/trend.json',
			type: 'GET',
			param: {}
		};
		_get(data, opts);
	};

	getFlag = function(opts){
		var data = {
			url : 'http://m.water.or.kr/overseas/nation/nationJson.do',
			dummy: '',
			type: 'GET',
			param: {}
		};
		_get(data, opts);
	};


	
	getForum = function(opts){
		var data = {
			url : 'http://m.water.or.kr/overseas/forum/forumJson.do',
			dummy: '../../js/dummy/Forum.json',
			type: 'GET',
			param: {}
		};
		_get(data, opts);
	};


	/**
	 * ======================================== 실시간 정보 (댐/보) ========================================
	 */
	
	/**
	 * 댐/보별자료(수문) : realtime/sub01/sub01/dam/hydr.do 
	 */
	getSub01Hydr = function(opts){
		var data = {
			url : 'http://m.water.or.kr/realtime/sub01/sub01/dam/hydr.do',
			dummy: '',
			type: 'POST',
			param: {urlPath: '/realtime/sub01/sub01/dam/hydr.do'}
		};
		setVisitLog(data);
		_get(data, opts);
	};
	/**
	 * 댐/보별자료(우량수위) : realtime/sub01/sub01/dam/rain.do
	 */
	getSub01Rain = function(opts){
		var data = {
			url : 'http://m.water.or.kr/realtime/sub01/sub01/dam/rain.do',
			dummy: '',
			type: 'GET',
			param: {urlPath: '/realtime/sub01/sub01/dam/rain.do'}
		};
		setVisitLog(data);
		_get(data, opts);
	};
	
	/**
	 * 다목적댐 관리현황 : /realtime/sub01/sub01/vers.do
	 */
	getSub01Vers = function(opts){
		var data = {
			url : 'http://m.water.or.kr/realtime/sub01/sub01/vers.do',
			dummy: '',
			type: 'GET',
			param: {urlPath: '/realtime/sub01/sub01/vers.do'}
		};
		setVisitLog(data);
		_get(data, opts);
	};
	
	/**
	 * 용수댐 관리현황 : /realtime/sub01/sub01/wate.do
	 */
	getSub01Wate = function(opts){
		var data = {
			url : 'http://m.water.or.kr/realtime/sub01/sub01/wate.do',
			dummy: '',
			type: 'GET',
			param: {urlPath: '/realtime/sub01/sub01/wate.do'}
		};
		setVisitLog(data);
		_get(data, opts);
	};
	
	/**
	 * 다기능보 관리현황 : /realtime/sub01/sub01/mult.do
	 */
	getSub01Mult = function(opts){
		var data = {
			url : 'http://m.water.or.kr/realtime/sub01/sub01/mult.do',
			dummy: '',
			type: 'GET',
			param: {urlPath: '/realtime/sub01/sub01/mult.do'}
		};
		setVisitLog(data);
		_get(data, opts);
	};
	
	/**
	 * 시화호 수문자료 : /realtime/sub01/sub01/sihwa.do
	 */
	getSub01Sihwa = function(opts){
		var data = {
			url : 'http://m.water.or.kr/realtime/sub01/sub01/sihwa.do',
			dummy: '',
			type: 'GET',
			param: {urlPath: '/realtime/sub01/sub01/sihwa.do'}
		};
		setVisitLog(data);
		_get(data, opts);
	};
	
	/**
	 * 용수공급전망 댐정보
	 */
	getSub01YongsuSupplyExp = function(opts){
		var data = {
			url : 'http://m.water.or.kr/realtime/sub01/sub01/dam/yongsuSupplyExpJson.do?damcode=1',
			dummy: '',
			type: 'GET',
			param: {urlPath: '/realtime/sub01/sub01/dam/yongsuSupplyExpJson.do?damcode=1'}
		};
		setVisitLog(data);
		_get(data, opts);
	};
	/**
	 * 용수공급전망 : /realtime/sub01/sub01/dam/yongsuSupply.do
	 */
	getSub01YongsuSupply = function(opts){
		var data = {
			url : 'http://m.water.or.kr/realtime/sub01/sub01/dam/yongsuSupply.do',
			dummy: '',
			type: 'GET',
			param: {urlPath: '/realtime/sub01/sub01/dam/yongsuSupply.do'}
		};
		setVisitLog(data);
		_get(data, opts);
	};
	
	/**
	 * 다목적댐 수질정보 : /realtime/sub01/sub02/vers.do
	 */
	getSub02Vers = function(opts){
		var data = {
			url : 'http://m.water.or.kr/realtime/sub01/sub02/vers.do',
			dummy: '',
			type: 'GET',
			param: {urlPath: '/realtime/sub01/sub02/vers.do'}
		};
		setVisitLog(data);
		_get(data, opts);
	};
	
	/**
	 * 다기능보 수질정보 : /realtime/sub01/sub02/mult.do
	 */
	getSub02Mult = function(opts){
		var data = {
			url : 'http://m.water.or.kr/realtime/sub01/sub02/mult.do',
			dummy: '',
			type: 'GET',
			param: {urlPath: '/realtime/sub01/sub02/mult.do'}
		};
		setVisitLog(data);
		_get(data, opts);
	};
	/**
	 * ======================================== 실시간 정보 (상수도) ========================================
	 */
	
	/**
	 * 실시간 수질(시) : /realtime/sub02/rinfo.do
	 */
	getSub02Rinfo = function(opts){
		var data = {
			url : 'http://m.water.or.kr/realtime/sub02/rinfo.do',
			dummy: '',
			type: 'GET',
			param: {urlPath: '/realtime/sub02/rinfo.do'}
		};
		setVisitLog(data);
		_get(data, opts);
	};
	/**
	 *  일일 수질(일) : /realtime/sub02/winfoList.do
	 */
	getSub02WinfoList = function(opts){
		var data = {
			url : 'http://m.water.or.kr/realtime/sub02/winfoList.do',
			dummy: '',
			type: 'GET',
			param: {urlPath: '/realtime/sub02/winfoList.do'}
		};
		setVisitLog(data);
		_get(data, opts);
	};
	/**
	 * 주간 수질(주) : /realtime/sub02/winfoWeekList.do
	 */
	getSub02WinfoWeekList = function(opts){
		var data = {
			url : 'http://m.water.or.kr/realtime/sub02/winfoWeekList.do',
			dummy: '',
			type: 'GET',
			param: {urlPath: '/realtime/sub02/winfoWeekList.do'}
		};
		setVisitLog(data);
		_get(data, opts);
	};
	/**
	 *  월간 수질(월) : /realtime/sub02/winfoMonthList.do
	 */
	getSub02WinfoMonthList = function(opts){
		var data = {
			url : 'http://m.water.or.kr/realtime/sub02/winfoMonthList.do',
			dummy: '',
			type: 'GET',
			param: {urlPath: '/realtime/sub02/winfoMonthList.do'}
		};
		setVisitLog(data);
		_get(data, opts);
	};
	
	/**
	 * ======================================== 실시간 정보 (하수도) ========================================
	 */
	/**
	 * 총괄현황/시설현황 : /realtime/sub03/sewage.do
	 */
	getSub03Sewage = function(opts){
		var data = {
			url : 'http://m.water.or.kr/realtime/sub03/sewage.do',
			dummy: '',
			type: 'GET',
			param: {urlPath: '/realtime/sub03/sewage.do'}
		};
		setVisitLog(data);
		_get(data, opts);
	};

	/**
	 * ======================================== 메인 전국 댐보수문 실시간 현황========================================
	 */
	
	/**
	 * 전국 다목적댐 현황
	 * /main/getRealMulti.do
	 */
	getRealMulti = function(opts){
		var data = {
			url : 'http://m.water.or.kr/main/getRealMulti.do',
			dummy: '',
			type: 'GET',
			param: {}
		};
		_get(data, opts);
	};
	/**
	 * 전국 용수댐 현황
	 * /main/getRealWater.do
	 */
	getRealWater = function(opts){
		var data = {
			url : 'http://m.water.or.kr/main/getRealWater.do',
			dummy: '',
			type: 'GET',
			param: {}
		};
		_get(data, opts);
	};
	/**
	 * 전국 다기능보 수문 현황
	 * /main/getRealBo.do
	 */
	getRealBo = function(opts){
		var data = {
			url : 'http://m.water.or.kr/main/getRealBo.do',
			dummy: '',
			type: 'GET',
			param: {}
		};
		_get(data, opts);
	};
	
	/**
	 * ======================================== 내지역 물정보 팝업 ========================================
	 */
	
	/**
	 * 급수인구와보급률
	 * http://mywater.mooo.com/popup/popupMainWaterLocation01.do?pageGb=E&REGION_CD=1120079000
	 * 
	 * apiClient.getMainWaterLocationE({param:{REGION_CD: '1120079000'}});
	 */
	getMainWaterLocationE = function(opts){
		var data = {
			url : 'http://m.water.or.kr/popup/popupMainWaterLocation01.do?pageGb=E',
			dummy: '',
			type: 'GET',
			param: {}
		};
		_get(data, opts);
	};
	/**
	 * 1인1일 물사용량(가정용)
	 * http://mywater.mooo.com/popup/popupMainWaterLocation01.do?pageGb=B&REGION_CD=1120079000
	 * 
	 * apiClient.getMainWaterLocationB({param:{REGION_CD: '1120079000'}});
	 */
	getMainWaterLocationB = function(opts){
		var data = {
			url : 'http://m.water.or.kr/popup/popupMainWaterLocation01.do?pageGb=B',
			dummy: '',
			type: 'GET',
			param: {}
		};
		_get(data, opts);
	};


	/**
	 * 메인>수재해>일반현황
	 * url
	 * https://m.water.or.kr/disaster/general/generalJson.do
	 * result
	 * list.title 제목
	 * list.cont 내용
	 * list.thum_URL 썸네일 경로
	 * list.detail_URL 상세 url
	 *  더보기 url
	 * https://m.water.or.kr/disaster/general/general01.do
     */
	getMainCommon = function(opts){
		var data = {
			url : 'https://m.water.or.kr/disaster/general/generalJson.do',
			dummy: '',
			type: 'GET',
			param: {}
		};
		_get(data, opts);
	};

	/**
	 *  메인>수재해>가뭄예경보 api
	 *  url
	 *  https://m.water.or.kr/disaster/drought/droughtJson.do
	 *  result
	 *  result.title 제목 (가뭄예경보(12월현황) -> 이 부분에 넣으면 될 것 같음)
	 *  result.doc_NUM 문서번호
	 *  result. organ 발표기관
	 *  result. issue_DT 발표일자
	 *  result.now_TP_MB_FILE_NAME 기상이미지 url
	 *  result.now_TP_A 기상 주의
	 *  result.now_TP_B 기상 심함
	 *  result.now_TP_C 기상 매우심함
	 *  result.now_LFWTR_MB_FILE_NAME 생활이미지 url
	 *  result.now_LFWTR_A 생활 주의
	 *  result.now_LFWTR_B 생활 심함
	 *  result.now_LFWTR_C 생활 매우심함
	 *  result.now_FRMWTR_MB_FILE_NAME 농업이미지 url
	 *  result.now_FRMWTR_A 농업 주의
	 *  result.now_FRMWTR_B 농업 심함
	 *  result.now_FRMWTR_C 농업 매우심함
	 *  result.now_CMNT 농업 코멘트
	 */
	getMainDrought = function(opts){
		var data = {
			url : 'https://m.water.or.kr/disaster/drought/droughtJson.do',
			dummy: '',
			type: 'GET',
			param: {}
		};
		_get(data, opts);
	};


	/**
	 * 홍수 예경보
	 * 10:한강, 20:낙동강, 30:금강, 40:영산&섬진강
	 *
	 * result
	 * list.damnm 관측소명 (주요지점)
	 * list.damcd 관측소코드
	 * list.wl 수위(현재)
	 * list.wrnwl 수위(주의보)
	 * list.almwl 수위(경보)
	 * list.fw 유량
	 * list.kind 예경보현황
	 * list.ancdt 발령일자
     */
	getMainFlood = function(opts, location){
		var data = {
			url : 'http://m.water.or.kr/disaster/flood/flood02Json.do?menu_id='+location,
			dummy: '',
			type: 'GET',
			param: {}
		};
		_get(data, opts);
	};

	/**
	 * 홍수 운영현황
	 *
	 * floodDamList.estcd 시설물코드
	 * floodDamList.fwl 현재수위
	 * floodDamList.plfwl 계층홍수위
	 * floodDamList.odflwl 상시만수위
	 */
	getMainFloodSM = function(opts, index){
		var data = {
			url : 'http://m.water.or.kr/disaster/flood/flood01_0'+index+'_list_json.do',
			dummy: '',
			type: 'GET',
			param: {}
		};
		_get(data, opts);
	};

	/**
	 * 조류현황 API
	 * // H N K Y
	 * result
	 * list.alertObject 대상
	 * list.alertPoint 지점
	 * list.stage 단계
	 * list.alertDate 발령일
	 * list.alertInstitute 기관
	 *
	 */

	getMainTidal = function(opts, location){
		var data = {
			url : 'https://m.water.or.kr/disaster/algaealert/AlgaealertJson.do?pointCode='+location,
			dummy: '',
			type: 'GET',
			param: {}
		};
		_get(data, opts);
	};


	setVisitLog = function(opts){
		var consrc = '';
		var userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.search("android;") > -1) {
            //안드로이드
        	consrc = "app_android";
        } else if (userAgent.search("ios;") > -1) {
            //아이폰
        	consrc = "app_ios";
        } else {
            //모바일인데 브라우져일경우
        	if (userAgent.search("android") > -1)
				consrc = "web_android";
        	else if ((userAgent.search("iphone") > -1) || (userAgent.search("ipod") > -1)
        				|| (userAgent.search("ipad") > -1))
				consrc = "web_ios";
        	else
				consrc = "web_etc";
        }
		var data = {
				url : 'https://m.water.or.kr/cmm/visit.do',
				dummy: '',
				type: 'GET',
				param: {
					urlPath : location.pathname=="/"?"/main":location.pathname,
					consrc: consrc,
					userAgent: userAgent
				}
			};
			_get(data, opts);
	}

	


	return {
		//메인
		getMyWaterInfo : getMyWaterInfo,
		getMyWaterDAMInfo : getMyWaterDAMInfo,
		getSearchMainWeather : getSearchMainWeather,
		getTourLife : getTourLife,
		// 핫이슈
		getNewsJsonData : getNewsJsonData,
		getReportJsonData : getReportJsonData,
		getArticleJsonData : getArticleJsonData,
		getEasyStaticJsonData : getEasyStaticJsonData,
		//생활
		getSense : getSense,
		getHealth : getHealth,
		getRiver : getRiver,
		getTour : getTour,
		getFestival : getFestival,
		getWaterSports : getWaterSports,
		//생활에서 미정
		getWeatherStory : getWeatherStory,
		getUnderGround : getUnderGround,
		//소통
		getMyWaterStory : getMyWaterStory,
		getGallery01 : getGallery01,
		getGallery02 : getGallery02,
		getGallery03 : getGallery03,
		getGallery04 : getGallery04,
		getCalendarJson : getCalendarJson,
		getSwCommunity: getSwCommunity,
		//지식
		getDictionary : getDictionary,
		getEducation : getEducation,
		getWAcademy : getWAcademy,
		getHistory : getHistory,
		getStudent : getStudent,
		getNewSkill : getNewSkill,
		//해외
		getForum : getForum,
		getTrend : getTrend,
		getFlag : getFlag,
		//실시간 정보 (댐/보)
		getSub01Hydr : getSub01Hydr,
		getSub01Rain : getSub01Rain,
		getSub01Vers : getSub01Vers,
		getSub01Wate : getSub01Wate,
		getSub01Mult : getSub01Mult,
		getSub01Sihwa : getSub01Sihwa,
		getSub01YongsuSupply : getSub01YongsuSupply,
		getSub01YongsuSupplyExp : getSub01YongsuSupplyExp,
		getSub02Vers : getSub02Vers,
		getSub02Mult : getSub02Mult,
		//실시간 정보 (상수도)
		getSub02Rinfo : getSub02Rinfo,
		getSub02WinfoList : getSub02WinfoList,
		getSub02WinfoWeekList : getSub02WinfoWeekList,
		getSub02WinfoMonthList : getSub02WinfoMonthList,
		//실시간 정보 (하수도)
		getSub03Sewage : getSub03Sewage,
		//댐보 수량
		getRealMulti : getRealMulti,
		getRealWater : getRealWater,
		getRealBo : getRealBo,
		//나의 수돗물
		getMainWaterLocationE : getMainWaterLocationE,
		getMainWaterLocationB : getMainWaterLocationB,
		//일반현황
		getMainCommon : getMainCommon,
		//홍수
		getMainFlood : getMainFlood,
		//홍수예경보
		getMainFloodSM : getMainFloodSM,
		//조류현황
		getMainTidal : getMainTidal,
		//가뭄현황
		getMainDrought : getMainDrought,
		//방문 로그
		setVisitLog : setVisitLog
	};

})();

