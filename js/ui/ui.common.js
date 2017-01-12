var ui = ui || {};
ui.page = ui.page || {};
ui.page.common = function () {
    this.init();
};
var interva;
ui.page.common.prototype = {
    htSize: jindo.$Document().clientSize(),
    nDelay: jindo.m.getDeviceInfo().android ? 100 : 0,
    oReveal: null,
    bDummy: true,
    nCurrentPannel: 0,
    elCurrentPannel: $('#pannel0'),

    init: function () {
        console.log('■ import Global');
        this._assignElements();
        this._attachEventHandlers();
        this._setJindoReveal();
        this.showTopBtn();
        this.setGnbPannel();
        this.setSubGnb();
        this._ready();
        try{
        	apiClient.setVisitLog({});
        } catch(err){
        	
        }
    },
    _assignElements: function () {
        this.welDoc = $(document.body);
        this.welWin = $(window);
    },
    _attachEventHandlers: function () {
        this.welDoc.on('click', 'a[href="#"]', $.proxy(this._onClickEventPrevent, this));
        this.welDoc.on('click', '._revealToggle', $.proxy(this._toggleReveal, this));

        this.welDoc.on('click', '._main_tabs li', $.proxy(this._onClickMainTabs, this));
        this.welDoc.on('click', '._sub_tabs li', $.proxy(this._onClickSubTabs, this));
        this.welDoc.on('click', '.tap_water li', $.proxy(this._onClickMainTabWater, this));
        this.welDoc.on('click', '._tabs li', $.proxy(this._onClickTabs, this));
        this.welDoc.on('click', '._btn_back', $.proxy(this._onClickBack, this));
        this.welDoc.on('click', '.gnb_srch', $.proxy(this._onClickGnbSearch, this));
        this.welDoc.on('click', '._btn_total_search', $.proxy(this._onClickTotalSearch, this));

        this.welDoc.on('click', '._btn_safety', $.proxy(this._onClickMoveSafety, this));
        this.welDoc.on('click', '.btn_close._revealToggle', $.proxy(this._onClickRevealToggle, this));
        this.welDoc.on('click', '._btn_new_skill li', $.proxy(this._onClickPopNewSkill, this));
        this.welDoc.on('click', '._btn_newskill_more', $.proxy(this._onClickMoreNewSkill, this));
        this.welDoc.on('click', '._btn_weather_info', $.proxy(this._onClickPopWeatherInfo, this));


        // 댐팝업 더보기 & 패널이동
        this.welDoc.on('click', '._btn_dam_more', $.proxy(this._onClickPopDamMore, this));


        //실시간
        //탭누를때
        this.welDoc.on('click', '.section_container .real_time_search .tap li', $.proxy(this._onClickRealtimeTab, this));
        this.welDoc.on('click', '.wrap_popup .real_time_search .tap li', $.proxy(this._onClickRealtimeTabPop, this));

        //셀렉트 변경할때
        this.welDoc.on('change', '.section_container ._btn_realtime_dam_type', $.proxy(this._onChangeRealtimeDamType, this));
        this.welDoc.on('change', '.wrap_popup ._btn_realtime_dam_type', $.proxy(this._onChangeRealtimeDamTypePopup, this));

        //정보 버튼
        this.welDoc.on('click', '.btn_question', $.proxy(this._onClickBtnQuestion, this));
        this.welDoc.on('click', '.info', $.proxy(this._onClickInfo, this));


        //셀렉트 2종 지역 변경
        this.welDoc.on('change', '.section_container ._select_main', $.proxy(this._onChangeRealtimeSelectMain, this));
        this.welDoc.on('change', '.wrap_popup ._select_main', $.proxy(this._onChangeRealtimeSelectMainPopup, this));


        //검색버튼 누를때
        this.welDoc.on('click', '.section_container ._btn_realtime_search', $.proxy(this._onClickRealtimeSearch, this));
        this.welDoc.on('click', '.wrap_popup ._btn_realtime_search', $.proxy(this._onClickRealtimeSearchPopup, this));


        //쿠키
        this.welDoc.on('click', '._btn_move_sub', $.proxy(this._onClickSetCookie, this));

        //팝업
        this.welDoc.on('click', '._openPopup', $.proxy(this.getPopupAttr, this));
        this.welDoc.on('click', '._openDialog', $.proxy(this.onClickDialogDownload, this));
        this.welDoc.on('click', '#popup .ui-btn', $.proxy(this.closePopup, this));
        //gnb 드롭 메뉴
        this.welDoc.on('click', '.drop_gnb_btn', $.proxy(this.setGnbMenu, this));

        //gnb 설정 메뉴
        this.welDoc.on('click', '._btn_setting', $.proxy(this.setGnbSetting, this));
        this.welDoc.on('click', '._btn_sort', $.proxy(this.setGnbSort, this));
        this.welDoc.on('click', '.btn_setting_close', $.proxy(this.setGnbSettingHide, this));
        this.welDoc.on('click', '._gnb_setting .setting_menu li', $.proxy(this.setGnbSettingtab, this));

        //체크박스 클릭시
        this.welDoc.on('click', '.setting_checkbox_wrap li input', $.proxy(this._onChangeSettingMenu, this));
        //순서 드레그 변경시
        this.welDoc.on('sortupdate', "#sortable", $.proxy(this._onSortCallback, this));

        //저장버튼 클릭시
        this.welDoc.on('click', '._btn_save', $.proxy(this._onClickSave, this));


        // 메인 내지역 설정 로딩아이콘
        this.welDoc.on('click', '.btn_search_location', $.proxy(this.activeLocationLoading, this));


        this.welDoc.on('click', '._popup_close', $.proxy(this.onClickHidePopup, this));
        this.welDoc.on('click', '._btn_change_location', $.proxy(this.onClickChangeLocation, this));
        this.welDoc.on('click', '._btn_popup_tidal', $.proxy(this.onClickTidal, this));
        this.welDoc.on('click', '._btn_popup_drounght', $.proxy(this.onClickDrought, this));
        this.welDoc.on('click', '._btn_popup_cctv', $.proxy(this.onClickCCTV, this));
        this.welDoc.on('click', '._popup_cctv_close', $.proxy(this.onClickCCTVClose, this));
        this.welDoc.on('click', '._btn_water_info', $.proxy(this.onClickWaterInfo, this));
        this.welDoc.on('click', '._btn_realtime', $.proxy(this._onClickMoveReal, this));
        this.welDoc.on('click', '.reveal_drop_menu li .menu', $.proxy(this._onClickRevealDropTab, this));

        // 홍수
        //셀렉트 2종 지역 변경
        this.welDoc.on('change', '#selectFloodSm', $.proxy(this.setFloodSm, this));
        this.welDoc.on('change', '#selectFlood', $.proxy(this.setFlood, this));
        this.welDoc.on('change', '#selectTidal', $.proxy(this._onSetTidal, this));





        this.welDoc.on('click', '.table_tidal .btn_map', $.proxy(this._onClickTidal, this));


    },
    /**
     * reveal 메뉴
     * @param event
     * @private
     */
    _toggleReveal: function (event) {
        console.log('%c Alert : 왼쪽 사이드 메뉴 설정 완료', "color: #00f;");
        if (this.oReveal != null) {
            this.oReveal.toggle();
        }
    },
    _setJindoReveal: function () {
        console.log('%c Alert : 왼쪽 사이드 메뉴 설정 완료', "color: #f00;");

        if (!$('.rs-body').length) {
            return false;
        }

        var self = this;
        jindo.$Element(jindo.$$.getSingle(".rs-contents")).height(self.htSize.height);
        setTimeout(function () {

            self.oReveal = new jindo.m.SlideReveal({
                "sClassPrefix": "rs-",
                "nDuration": 500,
                "nMargin": 0,
                "sDirection": "right"
            })
                .attach({
                    "beforeShow": function () {
                        $('.rs-nav ._revealToggle').show();
                        jindo.$Element(jindo.$$.getSingle(".rs-nav")).show();
                    },
                    "show": function () {


                    },
                    "beforeHide": function () {
                        $('.rs-nav ._revealToggle').css('display', 'none');
                        //$('.nav-mask').remove();
                        $('.drop_gnb_btn').removeClass('active');
                        $('.drop_dim').hide();
                    },
                    "hide": function (oCustomEvent) {
                        $('.rs-contents').css({
                            height: 'auto'
                        });

                    },
                    "rotate": function () {
                    }
                });

            if ($('#mflick').length > 0) {
                self.oMainSlideflicking = new jindo.m.SlideFlicking('mflick', {
                    bUseCircular: true,  //순환여부
                    bUseDiagonalTouch: false,
                    nTotalContents: 8,
                    nDuration: 500
                }).attach({
                    'beforeFlicking': function (oCustomEvt) {
                        /* 현재 화면에 콘텐츠가 바뀔 경우 발생 */
                        var elGnbActive = $('._main_tabs li.active');
                        console.log(oCustomEvt);
                        if (oCustomEvt.bNext) {

                            if (elGnbActive.next().length > 0) {
                                elGnbActive.removeClass('active').next().addClass('active');
                            } else {
                                elGnbActive.removeClass('active');
                                $('._main_tabs li').first().addClass('active');
                            }
                        } else {
                            if (elGnbActive.prev().length > 0) {
                                elGnbActive.removeClass('active').prev().addClass('active');
                            } else {
                                elGnbActive.removeClass('active');
                                $('._main_tabs li').last().addClass('active');
                            }
                        }
                        self.setHeight(true);
                    },
                    'flicking': function (oCustomEvt) {
                        var flick = this;
                        var elGnbActive = $('._main_tabs li.active');
                        var elPannel = $(oCommon.oMainSlideflicking.getElement()._element.children);
                        if (oCustomEvt.bCorrupt) {

                        } else {
                            //플리킹 효과를 통해 현재 화면을 움직였을 경우
                            if (oCustomEvt.bNext) {
                                var nNextIndex;
                                //현재패널 업데이트
                                self.setGnb(elPannel.attr('id').substr(6, 1));
                                console.log(elPannel.attr('id').substr(6, 1));
                                self.setGnb(elPannel.attr('id').substr(6, 1));

                                //다음패널 업데이트
                                if (elGnbActive.next().length > 0) {
                                    nNextIndex = elGnbActive.next().data('index');
                                } else {
                                    nNextIndex = $('._main_tabs li').first().data('index');
                                }
                                //왼쪽으로 움직였을 경우 오른쪽 panel만 업데이트
                                self.setBlankPannel(nNextIndex, oCommon.oMainSlideflicking.getNextElement()._element, function () {
                                    self.setPannel(nNextIndex, "#pannel" + nNextIndex);
                                });
                            } else {
                                var nPrevIndex;

                                //현재패널 업데이트

                                self.setGnb(elPannel.attr('id').substr(6, 1));
                                console.log(elPannel.attr('id').substr(6, 1));
                                self.setGnb(elPannel.attr('id').substr(6, 1));


                                //다음패널 업데이트
                                if (elGnbActive.prev().length > 0) {
                                    nPrevIndex = elGnbActive.prev().data('index');
                                } else {
                                    nPrevIndex = $('._main_tabs li').last().data('index');
                                }
                                //왼쪽으로 움직였을 경우 오른쪽 panel만 업데이트
                                self.setBlankPannel(nPrevIndex, oCommon.oMainSlideflicking.getPrevElement()._element, function () {
                                    self.setPannel(nPrevIndex, "#pannel" + nPrevIndex);
                                });


                            }
                        }


                    }
                });
                self.setCookiePage();
            }
        }, this.nDelay);

    },
    _onClickEventPrevent: function (event) {
        event.preventDefault();
    },
    _onClickBack: function (event) {
        window.history.back();
    },
    _onClickGnbSearch: function (event) {
        $('.section_total_search').toggleClass("show")
    },
    _onClickTotalSearch: function (event) {
        var sInput = $('#totalsearch').val();
        window.location.href = "https://m.water.or.kr/totalsearch/result.do?searchText=" + sInput;
    },


    _onClickSubTabs: function (event) {
        var target = $(event.currentTarget);
        var nIdx = target.index();
        target.addClass('on').siblings().removeClass('on');
    },
    _onClickMainTabWater: function (event) {
        var target = $(event.currentTarget);
        var nIdx = target.index() + 1;

        var nTop = $('#tab0' + nIdx).offset().top;

        $(window).scrollTop(nTop);
    },


    _onClickTabs: function (event) {
        console.log('_tabs')
        var target = $(event.currentTarget);
        var nIdx = target.index();
        target.addClass('active').siblings().removeClass('active');
        target.parents('._tabs').siblings('.area_box').hide().eq(nIdx).show();

    },
    _onClickRevealDropTab: function (event) {
        var target = $(event.currentTarget);
        target.toggleClass('close');
        target.next().toggleClass('hidden')
    },
    _onClickRevealToggle: function (event) {
        $('.nav-mask').remove();
    },
    _onClickMoveReal: function (event) {
        var target = $(event.currentTarget);
        var oData = {};
        var sTmpl = "../../js/hbs/popup_dam.hbs";
        var sContainer = "body";
        var date = moment().format('YYYY-MM-DD H시');

        oData.date = date;
        apiClient.getRealMulti({
            dummy: false,
            callback: function (data, bSuccess) {
                oData.multi = data;
                apiClient.getRealWater({
                    dummy: false,
                    callback: function (data, bSuccess) {
                        oData.water = data;
                        apiClient.getRealBo({
                            dummy: false,
                            callback: function (data, bSuccess) {
                                oData.bo = data
                                console.log(oData);
                                ui.tmpl.setTmpl({
                                    tmpl: sTmpl,
                                    container: sContainer,
                                    data: oData,
                                    type: 'append',
                                    empty: false,
                                    callback: function () {
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });

    },
    _onClickMoveSafety: function (event) {
        this.oMainSlideflicking.moveTo(5)
    },
    _onClickPopNewSkill: function (event) {
        var target = $(event.currentTarget);
        var oData = {};
        oData.sLink = target.data('link');
        oData.sTitle = target.find('.list_title').text();
        console.log(oData);
        var sTmpl = "../../js/hbs/popup_new_skill.hbs";
        var sContainer = "body";
        ui.tmpl.setTmpl({
            tmpl: sTmpl,
            container: sContainer,
            data: oData,
            type: 'append',
            empty: false,
            callback: function () {
            }
        });


    },
    _onClickMoreNewSkill: function (event) {
        var target = $(event.currentTarget);
        $('.newSkill li:hidden').eq(0).show();
        $('.newSkill li:hidden').eq(0).show();
        this.setHeight(false);
    },

    _onClickPopWeatherInfo: function (event) {
        var target = $(event.currentTarget);
        var oData = {};
        console.log(oData);
        var sTmpl = "../../js/hbs/popup_weather_info.hbs";
        var sContainer = "body";

        apiClient.getWeatherStory({
            dummy: false,
            callback: function (data, bSuccess) {
                oData.weatherStory = data;

                console.log(oData);
                ui.tmpl.setTmpl({
                    tmpl: sTmpl,
                    container: sContainer,
                    data: oData,
                    type: 'append',
                    empty: false,
                    callback: function () {
                        $(document.body).css({"overflow": "hidden"});
                    }
                });
            }
        });


    },


    /**
     * 실시간
     */

    _onClickRealtimeTab: function (event) {
        var target = $(event.currentTarget);
        var nIdx = target.index() + 1;
        var sContainer = "#tab_pannel";
        var sTmpl = "../../js/hbs/realtime/realTimeTab" + nIdx + ".hbs";
        var self = this;

        target.addClass('active').siblings().removeClass('active');

        ui.tmpl.setTmpl({
            tmpl: sTmpl,
            container: sContainer,
            data: {},
            type: 'append',
            empty: true,
            callback: function () {
                ui.tmpl.setTmpl({
                    tmpl: "../../js/hbs/realtime/searchForm" + nIdx + "1.hbs",
                    container: "#pannel_realtime",
                    data: {},
                    type: 'append',
                    empty: true,
                    callback: function () {
                        //로드 후 클래스 처리
                        $(sContainer).addClass('loaded');

                        var startDatepicker = $(".section_container #datepicker_1").datepicker({dateFormat: 'yy-mm-dd'});
                        var endDatepicker = $(".section_container #datepicker_2").datepicker({dateFormat: 'yy-mm-dd'});
                        if(nIdx == 2){
                            startDatepicker.datepicker('setDate', moment().day(-10).format('YYYY-MM-DD'));
                        } else if(nIdx == 3){
                            startDatepicker.datepicker('setDate', moment().day(-10).format('YYYY-MM-DD'));
                        } else  if(nIdx == 4){
                            startDatepicker.datepicker('setDate', moment().month(-3).format('YYYY-MM-DD'));
                        } else {
                            startDatepicker.datepicker('setDate', new Date());
                        }

                        	
                        endDatepicker.datepicker('setDate', new Date());
                    }
                });
            }
        });
    },
    _onClickRealtimeTabPop: function (event) {
        var target = $(event.currentTarget);
        var nIdx = target.index() + 1;
        var sTmpl = "../../js/hbs/realtime/popup_realTimeTab" + nIdx + ".hbs";
        var sContainer = "#tab_pannel_pop";
        var self = this;


        $('#pannel_realtime_pop_result').empty();

        target.addClass('active').siblings().removeClass('active');

        ui.tmpl.setTmpl({
            tmpl: sTmpl,
            container: sContainer,
            data: {},
            type: 'append',
            empty: true,
            callback: function () {
                ui.tmpl.setTmpl({
                    tmpl: "../../js/hbs/realtime/searchForm" + nIdx + "1.hbs",
                    container: "#pannel_realtime_pop",
                    data: {},
                    type: 'append',
                    empty: true,
                    callback: function () {
                        self.setHeight();
                        //로드 후 클래스 처리
                        $(sContainer).addClass('loaded');

                        var startDatepicker = $(".wrap_popup #datepicker_1").datepicker({dateFormat: 'yy-mm-dd'});
                        var endDatepicker = $(".wrap_popup #datepicker_2").datepicker({dateFormat: 'yy-mm-dd'});
                        if(nIdx == 2){
                            startDatepicker.datepicker('setDate', moment().day(-10).format('YYYY-MM-DD'));
                        } else if(nIdx == 3){
                            startDatepicker.datepicker('setDate', moment().day(-10).format('YYYY-MM-DD'));
                        } else  if(nIdx == 4){
                            startDatepicker.datepicker('setDate', moment().month(-3).format('YYYY-MM-DD'));
                        } else {
                            startDatepicker.datepicker('setDate', new Date());
                        }
                        endDatepicker.datepicker('setDate', new Date());
                    }
                });
            }
        });
    },


    _onClickRealtimeSearch: function (event) {
        var damType = $('._btn_realtime_dam_type').find(':checked').val();
        $(document.body).css({"overflow": "hidden"});

        apiClient.getSub01YongsuSupplyExp({
            dummy: false,
            callback: function (data) {
                var t = {};
                $.each(data, function (k, v) {
                    t[k.trim()] = v;
                });
                console.log(t);
                var sTmpl = "../../js/hbs/realtime/popup_realtime.hbs";
                var sContainer = "body";
                var oData = {
                    list: t
                };

                ui.tmpl.setTmpl({
                    tmpl: sTmpl,
                    container: sContainer,
                    data: oData,
                    type: 'append',
                    empty: false,
                    callback: function () {

                        var nIdx = $('.section_container .real_time_search .tap li.active').index() + 1;
                        ui.tmpl.setTmpl({
                            tmpl: "../../js/hbs/realtime/popup_realTimeTab" + nIdx + ".hbs",
                            container: "#tab_pannel_pop",
                            data: {},
                            type: 'append',
                            empty: false,
                            callback: function () {
                                
                                //tab설정
                                $('.wrap_popup  .real_time_search .tap li').eq(nIdx - 1).addClass('active').siblings().removeClass('active');
                                
                                //datepicker 설정
                                var sDate1 = $('#pannel_realtime .datepicker').eq(0).val();
                                var sDate2 = $('#pannel_realtime .datepicker').eq(1).val();


                                $("#pannel_realtime_pop").empty().html($('#pannel_realtime').html());

                                $('#pannel_realtime select').each(function (index) {
                                    $("#pannel_realtime_pop select").eq(index).val($(this).val());
                                })


                                $("#pannel_realtime_pop #datepicker_1").attr('id', "datepicker_1_pop");
                                $("#pannel_realtime_pop #datepicker_2").attr('id', "datepicker_2_pop");

                                //초기화
                                $("#pannel_realtime_pop .datepicker").removeClass('hasDatepicker');
                                $('.wrap_popup ._btn_realtime_dam_type').val($('.select_area ._btn_realtime_dam_type').val());

                                var startDatepicker = $("#pannel_realtime_pop .datepicker").eq(0).datepicker({dateFormat: 'yy-mm-dd'});
                                var endDatepicker = $("#pannel_realtime_pop .datepicker").eq(1).datepicker({dateFormat: 'yy-mm-dd'});
                                startDatepicker.datepicker('setDate', sDate1);
                                endDatepicker.datepicker('setDate', sDate2);
                                getSearchData();

                            }
                        });

                        if (damType == "Sub01YongsuSupply") {
                            $('.mapForm').show();
                        }


                    }
                });
            }
        });


    },
    _onClickRealtimeSearchPopup: function (event) {
        //alert('검색 데이터 꼽기');
        getSearchData();
    },


    _onChangeRealtimeDamType: function (event) {
        var target = $(event.currentTarget);
        var nIdx = target.find(":checked").index() + 1;
        var pIdx = $('.real_time_search .tap li.active').index() + 1;

        var sContainer = "#pannel_realtime";
        var sTmpl = "../../js/hbs/realtime/searchForm" + pIdx + nIdx + ".hbs";
        var self = this;
        var oData = {};

        //label text 바꾸기
        target.parent('.select_area').prev('.select_label').find('span').text(target.find(":checked").text());

        //info 나타내기
        target.siblings('.infomation').hide();
        target.siblings('.info' + nIdx).css({"display": "inline-block"});

        if (pIdx == 1 && nIdx == 7) {
            $('.mapForm').show();
        } else {
            $('.mapForm').hide();
        }

        console.log(sTmpl)

        ui.tmpl.setTmpl({
            tmpl: sTmpl,
            container: sContainer,
            data: oData,
            type: 'append',
            empty: true,
            callback: function () {
                var startDatepicker = $(".section_container #datepicker_1").datepicker({dateFormat: 'yy-mm-dd'});
                var endDatepicker = $(".section_container #datepicker_2").datepicker({dateFormat: 'yy-mm-dd'});
                if(nIdx == 2){
                    startDatepicker.datepicker('setDate', moment().day(-10).format('YYYY-MM-DD'));
                } else if(nIdx == 3){
                    startDatepicker.datepicker('setDate', moment().day(-10).format('YYYY-MM-DD'));
                } else  if(nIdx == 4){
                    startDatepicker.datepicker('setDate', moment().month(-3).format('YYYY-MM-DD'));
                } else {
                    startDatepicker.datepicker('setDate', new Date());
                }
                endDatepicker.datepicker('setDate', new Date());

            }
        });

    },
    _onChangeRealtimeDamTypePopup: function (event) {
        var target = $(event.currentTarget);
        var nIdx = target.find(":checked").index() + 1;
        var pIdx = $('.wrap_popup .real_time_search .tap li.active').index() + 1;
        var sContainer = "#pannel_realtime_pop";
        var sTmpl = "../../js/hbs/realtime/searchForm" + pIdx + nIdx + ".hbs";
        var self = this;
        var oData = {};

        //label text 바꾸기
        target.parent('.select_area').prev('.select_label').find('span').text(target.find(":checked").text());

        //info 나타내기
        target.siblings('.infomation').hide();
        target.siblings('.info' + nIdx).css({"display": "inline-block"});

        if (pIdx == 1 && nIdx == 7) {
            $('.mapForm').show();
        } else {
            $('.mapForm').hide();
        }
        ui.tmpl.setTmpl({
            tmpl: sTmpl,
            container: sContainer,
            data: oData,
            type: 'append',
            empty: true,
            callback: function () {
                self.setHeight();

                $(".wrap_popup #datepicker_1").attr('id', 'datepicker_1_pop');
                $(".wrap_popup #datepicker_2").attr('id', 'datepicker_2_pop');

                var startDatepicker = $(".wrap_popup #datepicker_1_pop").datepicker({dateFormat: 'yy-mm-dd'});
                var endDatepicker = $(".wrap_popup #datepicker_2_pop").datepicker({dateFormat: 'yy-mm-dd'});
                if(nIdx == 2){
                    startDatepicker.datepicker('setDate', moment().day(-10).format('YYYY-MM-DD'));
                } else if(nIdx == 3){
                    startDatepicker.datepicker('setDate', moment().day(-10).format('YYYY-MM-DD'));
                } else  if(nIdx == 4){
                    startDatepicker.datepicker('setDate', moment().month(-3).format('YYYY-MM-DD'));
                } else {
                    startDatepicker.datepicker('setDate', new Date());
                }
                endDatepicker.datepicker('setDate', new Date());

            }
        });
    },

    _onChangeRealtimeSelectMain: function (event) {
        var target = $(event.currentTarget);
        var nIdx = target.find(":checked").index();
        target.siblings('._select_sub').hide().eq(nIdx).show();
    },
    _onChangeRealtimeSelectMainPopup: function (event) {
        var target = $(event.currentTarget);
        var nIdx = target.find(":checked").index();
        target.siblings('._select_sub').hide().eq(nIdx).show();
    },

    _onClickBtnQuestion: function (event) {
        var target = $(event.currentTarget);
        if (target.hasClass('active')) {
            target.removeClass('active');
            target.next('.info').hide();
        } else {
            target.addClass('active');
            target.next('.info').show();
        }

    },
    _onClickInfo: function (event) {
        var target = $(event.currentTarget);
        target.hide();
        target.prev('.btn_question').removeClass('active');

    },

    /**
     * 팝업시리즈
     * @param event
     */
    onClickHidePopup: function (event) {
        var target = $(event.currentTarget);
        target.parents('.dim_block').remove();
        $(document.body).css({"overflow": "visible"});
    },
    onClickChangeLocation: function (event) {
        $(document.body).css({"overflow": "hidden"});
        var sTmpl = "../../js/hbs/popup_change_location.hbs";
        var sContainer = "body";
        var oData = {};
        ui.tmpl.setTmpl({
            tmpl: sTmpl,
            container: sContainer,
            data: oData,
            type: 'append',
            empty: false,
            callback: function () {

            }
        });
    },
    onClickTidal: function (event) {
        $(document.body).css({"overflow": "hidden"});
        var sTmpl = "../../js/hbs/popup_tidal.hbs";
        var sContainer = "body";
        var oData = myWater.myInfo;
        ui.tmpl.setTmpl({
            tmpl: sTmpl,
            container: sContainer,
            data: oData,
            type: 'append',
            empty: false,
            callback: function (oData) {

                $.ajax({
                    //실서버
                    url: "https://m.water.or.kr/disaster/algaealert/AlgaealertMainJson.do?regionCd=" + myWater.myInfo.getJsonData.REGION_CD,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: {},
                    success: function (data) {
                        console.log("onClickTidal");
                        console.log(data);
                        var w = $(window).width();

                        var map = new naver.maps.Map('tidal_img', {
                            // center: new naver.maps.LatLng(37.3595704, 127.105399),
                            center: new naver.maps.LatLng(data.result.coordX, data.result.coordY),
                            zoom: 7,
                            zoomControl: true,
                            size: new naver.maps.Size(w, w),
                            mapTypeControl: false,
                            mapTypeControlOptions: {
                                style: naver.maps.MapTypeControlStyle.DROPDOWN
                            }
                        });

                        var mPoint = new naver.maps.LatLng(data.result.coordX, data.result.coordY);
                        var markerOptions = {
                            position: mPoint
                        };

                        var marker = new naver.maps.Marker(markerOptions);
                        marker.setMap(map); // 추가
                    },
                    error: function (request, status, error) {
                        console.log(error);
                    }
                });


            }
        });
    },
    onClickWaterInfo: function (event) {
        var target = $(event.currentTarget);
        var nIdx = target.parents('li').index() + 1;
        $(document.body).css({"overflow": "hidden"});
        var sTmpl = "../../js/hbs/popup_water_info_0" + nIdx + ".hbs";
        var sContainer = "body";
        var oData = {
            "index": target.parents('li').index(),
            "myWater": myWater.stats
        };


        //보급률 차트
        var suppluRateAll = fn_formatNComma(fn_format01(myWater.myInfo.getJsonData.AVG_SUPPLY_RATE, -1));
        var suppluRateMax = fn_formatNComma(fn_format01(myWater.myInfo.getJsonData.MAX_SUPPLY_RATE, -1));
        var suppluRateOur = fn_formatNComma(fn_format01(myWater.myInfo.getJsonData.SUPPLY_RATE, -1));
        var suppluRateMin = fn_formatNComma(fn_format01(myWater.myInfo.getJsonData.MIN_SUPPLY_RATE, -1));

        var suppluRateAll_p = (suppluRateAll / suppluRateMax) * 100;
        var suppluRateMax_p = (suppluRateMax / suppluRateMax) * 100;
        var suppluRateOur_p = (suppluRateOur / suppluRateMax) * 100;
        var suppluRateMin_p = (suppluRateMin / suppluRateMax) * 100;

        myWater.statsPopup.suppluRateAll_p = suppluRateAll_p;
        myWater.statsPopup.suppluRateMax_p = suppluRateMax_p;
        myWater.statsPopup.suppluRateOur_p = suppluRateOur_p;
        myWater.statsPopup.suppluRateMin_p = suppluRateMin_p;


        //1인1일 물사용량 차트
        var useqtyAll = fn_formatNComma(fn_format01(myWater.myInfo.getJsonData.AVG_LPCD, -1));
        var useqtyMax = fn_formatNComma(fn_format01(myWater.myInfo.getJsonData.MAX_LPCD, -1));
        var useqtyOur = fn_formatNComma(fn_format01(myWater.myInfo.getJsonData.CITY_LPCD, -1));
        var useqtyMin = fn_formatNComma(fn_format01(myWater.myInfo.getJsonData.MIN_LPCD, -1));

        var useqtyAll_p = (useqtyAll / useqtyMax) * 100;
        var useqtyMax_p = (useqtyMax / useqtyMax) * 100;
        var useqtyOur_p = (useqtyOur / useqtyMax) * 100;
        var useqtyMin_p = (useqtyMin / useqtyMax) * 100;


        myWater.statsPopup.useqtyAll_p = useqtyAll_p;
        myWater.statsPopup.useqtyMax_p = useqtyMax_p;
        myWater.statsPopup.useqtyOur_p = useqtyOur_p;
        myWater.statsPopup.useqtyMin_p = useqtyMin_p;

        // 유수율 차트
        var rateAll = fn_formatNComma(fn_format01(myWater.myInfo.getJsonData.AVG_RATE, -1));
        var rateMax = fn_formatNComma(fn_format01(myWater.myInfo.getJsonData.MAX_RATE, -1));
        var rateOur = fn_formatNComma(fn_format01(myWater.myInfo.getJsonData.CITY_RATE, -1));
        var rateMin = fn_formatNComma(fn_format01(myWater.myInfo.getJsonData.MIN_RATE, -1));

        var rateAll_p = (rateAll / rateMax) * 100;
        var rateMax_p = (rateMax / rateMax) * 100;
        var rateOur_p = (rateOur / rateMax) * 100;
        var rateMin_p = (rateMin / rateMax) * 100;

        myWater.statsPopup.rateAll_p = rateAll_p;
        myWater.statsPopup.rateMax_p = rateMax_p;
        myWater.statsPopup.rateOur_p = rateOur_p;
        myWater.statsPopup.rateMin_p = rateMin_p;

        // 수돗물 요금차트
        var waterpriceAll = fn_formatNComma(fn_format01(myWater.myInfo.getJsonData.AVGPRICE, 0));
        var waterpriceMax = fn_formatNComma(fn_format01(myWater.myInfo.getJsonData.MAXPRICE, 0));
        var waterpriceOur = fn_formatNComma(fn_format01(myWater.myInfo.getJsonData.CITYPRICE, 0));
        var waterpriceMin = fn_formatNComma(fn_format01(myWater.myInfo.getJsonData.MINPRICE, 0));

        var waterpriceAll_p = (waterpriceAll / waterpriceMax) * 100;
        var waterpriceMax_p = (waterpriceMax / waterpriceMax) * 100;
        var waterpriceOur_p = (waterpriceOur / waterpriceMax) * 100;
        var waterpriceMin_p = (waterpriceMin / waterpriceMax) * 100;

        myWater.statsPopup.waterpriceAll_p = waterpriceAll_p;
        myWater.statsPopup.waterpriceMax_p = waterpriceMax_p;
        myWater.statsPopup.waterpriceOur_p = waterpriceOur_p;
        myWater.statsPopup.waterpriceMin_p = waterpriceMin_p;


        //현실화율 차트
        var realrateAll = fn_formatNComma(fn_format01(myWater.myInfo.getJsonData.AVG_REALRATE, -1));
        var realrateMax = fn_formatNComma(fn_format01(myWater.myInfo.getJsonData.MAX_REALRATE, -1));
        var realrateOur = fn_formatNComma(fn_format01(myWater.myInfo.getJsonData.REALRATE, -1));
        var realrateMin = fn_formatNComma(fn_format01(myWater.myInfo.getJsonData.MIN_REALRATE, -1));

        var realrateAll_p = (realrateAll / realrateMax) * 100;
        var realrateMax_p = (realrateMax / realrateMax) * 100;
        var realrateOur_p = (realrateOur / realrateMax) * 100;
        var realrateMin_p = (realrateMin / realrateMax) * 100;

        myWater.statsPopup.realrateAll_p = realrateAll_p;
        myWater.statsPopup.realrateMax_p = realrateMax_p;
        myWater.statsPopup.realrateOur_p = realrateOur_p;
        myWater.statsPopup.realrateMin_p = realrateMin_p;

        oData.statsPopup = myWater.statsPopup;

        console.log(oData);
        ui.tmpl.setTmpl({
            tmpl: sTmpl,
            container: sContainer,
            data: oData,
            type: 'append',
            empty: false,
            callback: function () {
                $('.water_info_table2 table').prepend($('th[data-area=3000000000]').parents('tr'))
            }
        });
    },
    onClickDrought: function (event) {

        $(document.body).css({"overflow": "hidden"});
        apiClient.getMainDrought({
            callback: function (data) {
                var oData = {};
                var sTmpl = "../../js/hbs/popup_drought.hbs";
                var sContainer = "body";
                oData = {
                    "drought" : data,
                    "myWater": myWater.stats
                };
                console.log(oData);
                ui.tmpl.setTmpl({
                    tmpl: sTmpl,
                    container: sContainer,
                    data: oData,
                    type: 'append',
                    empty: false,
                    callback: function () {
                    }
                });
            }
        })

    },
    onClickCCTV: function (event) {
        $(document.body).css({"overflow": "hidden"});
        var damcd = $('._btn_popup_cctv').attr('data-damcd');
        var sTmpl = "../../js/hbs/popup_cctv.hbs";
        var sContainer = "body";
        var oData = {};
        ui.tmpl.setTmpl({
            tmpl: sTmpl,
            container: sContainer,
            data: oData,
            type: 'append',
            empty: false,
            callback: function () {
            }
        });
        $.ajax({
    		//실서버
    		url : "/cctvView.do?serverid="+damcd,
    		success : function(getResult) {
    			var connectId= getResult.connectid;
    			if(typeof connectId != 'undefined'){
    				$('._popup_cctv>img').attr('src','');
					$('._popup_cctv>img').attr('src','http://203.237.1.87:9090/stillcapture.cgi&'+connectId+'&START');

					interva = setInterval (function () {
	    	            if( $('._popup_cctv').length > 0 ){
	                        $('._popup_cctv>img').attr('src','http://203.237.1.87:9090/stillcapture.cgi&'+connectId+'&QVGA');
	                        $('._popup_cctv>img').show();
	    	            }
	    	        }, 5000)
    			}else {
    				alert('이 댐은 CCTV 영상이 제공되지 않습니다.');
    				$('._popup_close').click();
    			}
    		},
    		error : function(request,status,error) {
    		}
        });
    },
    onClickCCTVClose: function (event) {
    	clearInterval(interva);
    },
    
    onClickDialogDownload: function (event) {
        var target = $(event.currentTarget);
        var href = target.data("href");
        $(document.body).css({"overflow": "hidden"});
        var sTmpl = "../../js/hbs/dialog_down.hbs";
        var sContainer = "body";
        var oData = {
            "href": href
        };
        ui.tmpl.setTmpl({
            tmpl: sTmpl,
            container: sContainer,
            data: oData,
            type: 'append',
            empty: false,
            callback: function () {
            }
        });
    },


    /**
     * openPopup : 팝업 띄우는 함수
     * @param popupNum : string "팝업클래스명"
     */
    openPopup: function (popupNum) {
        if ($('#six').hasClass('ui-page-active') && $('#six').find('.ui-checkbox-on').length == 0) {
            $('#popup.non_checkbox').addClass('active');
        } else {
            $('#popup.' + popupNum).addClass('active');
        }
    },
    closePopup: function (e) {
        var target = $(e.currentTarget);
        target.parents('#popup').removeClass('active');
        if ($('#six').hasClass('ui-page-active')) {
            this.offCheckBoxAll();
        }
    },
    getPopupAttr: function (e) {
        var target = $(e.currentTarget);
        var popupNum = target.attr('data-role');
        this.openPopup(popupNum);
    },

    /**
     * toast popup
     */
    setToastPopup: function (msg) {
        var tmpl = '<div id="toastPopup" style="bottom: 50px; opacity: 1; ">' + msg + '</div>';
        $('body').append(tmpl);
        $('#toastPopup').fadeIn();
        setTimeout(function () {
            $('#toastPopup').fadeOut().remove();
        }, 2000)
    },

    /**
     * 쿠키 만들기
     * @param event
     * @private
     */
    _onClickSetCookie: function (event) {
        this.setCookie(event);
    },


    /**
     * 메뉴 GNB 설정
     */
    setGnbMenu: function (e) {
        var target = $(e.currentTarget);


        this.setCurrentMenuList($('._main_tabs li'));
        this.setCheckMenuList($('._main_tabs li'));
        this.setSortMenuList($('._main_tabs li'));

        if (target.hasClass('active')) {
            $(document.body).css({"overflow": "visible"});
            target.removeClass('active');
            target.next().hide();
        } else {
            $(document.body).css({"overflow": "hidden"});
            target.addClass('active');
            target.next().show();
        }

    },


    setCurrentMenuList: function (selector) {
        var wel = selector || $('._main_tabs li');
        //메뉴설정
        $('.drop_gnb_container ul').empty()
            .html($('._main_tabs').html());

        if ($('._main_tabs li').length < Object.keys(gnbIdx).length) {
            $('.drop_gnb_container ul').append('<li><a href="#" class="btn_menu_add _btn_setting">추가+</a></li>');
        }
        ;
    },
    setCheckMenuList: function (selector) {
        var wel = selector || $('._main_tabs li');
        // 팝업 설정메뉴
        $('.setting_checkbox_wrap input').prop('checked', false);
        wel.each(function () {
            $('.setting_checkbox_wrap input[data-index=' + $(this).data('index') + ']').prop('checked', true)
                .parents('li').addClass('checked');
            $('.setting_checkbox_wrap').append($('.setting_checkbox_wrap input[data-index=' + $(this).data('index') + ']').parents('li'));
        });
        this.setInputListSorting();
    },

    setSortMenuList: function () {
        // 팝업 순서메뉴(oMenu)
        var wel = $('.setting_checkbox_wrap li.checked')
        oMenu.list = [];
        wel.each(function () {
            var o = {}
            o.index = $(this).data('index');
            o.name = $(this).find('label').text();
            console.log(o)
            oMenu.list.push(o);
        });
        ui.tmpl.setTmpl({
            tmpl: "../../js/hbs/list_setmenu.hbs",
            container: "#sortable",
            data: oMenu,
            type: 'append',
            empty: true,
            callback: function () {
            }
        });
    },

    /**
     * 셋팅 패널에서 활용 여부 변경하기
     */
    setGnbSetting: function (e) {
        var target = $(e.currentTarget);
        var elWrap = $('._gnb_setting');
        elWrap.show();
        elWrap.find('.setting_menu li').last().removeClass('active').prev().addClass('active');
        elWrap.find('#setting_tab01').show();
        elWrap.find('#setting_tab02').hide();

        //드롭메뉴 초기화
        $(document.body).css({"overflow": "visible"});
        $('.drop_gnb_btn').removeClass('active')
        $('.drop_dim').hide();

        var nSize = $('#setting_tab01 .setting_checkbox_wrap li input:checked').size();
        $('#setting_tab01 .contents_title strong').text(nSize + '개');

    },

    /**
     * 셋팅 패널에서 순서 변경하기
     */

    setGnbSort: function (e) {
        var target = $(e.currentTarget);
        var elWrap = $('._gnb_setting');
        elWrap.show();
        elWrap.find('.setting_menu li').first().removeClass('active').next().addClass('active');
        elWrap.find('#setting_tab01').hide();
        elWrap.find('#setting_tab02').show();

        //드롭메뉴 초기화
        $(document.body).css({"overflow": "visible"});
        $('.drop_gnb_btn').removeClass('active')
        $('.drop_dim').hide();
    },
    setGnbSettingHide: function (e) {
        var target = $(e.currentTarget);
        var elWrap = $('._gnb_setting');
        elWrap.hide();
    },


    setGnbSettingtab: function (e) {
        var target = $(e.currentTarget);
        var nIdx = target.index();
        var elWrap = $('._gnb_setting');
        if (nIdx == 0) {
            elWrap.find('.setting_menu li').last().removeClass('active').prev().addClass('active');
            elWrap.find('#setting_tab01').show();
            elWrap.find('#setting_tab02').hide();
            this.getMenuList($('#sortable li'));
            for (var i = 0; i < oMenu.list.length; i++) {
                $('.setting_checkbox_wrap').append($('.setting_checkbox_wrap').find('li[data-index="' + oMenu.list[i].index + '"]'));
                console.log($('.setting_checkbox_wrap').find('li[data-index="' + oMenu.list[i].index + '"]'));
            }
            this.setInputListSorting();

            console.log(oMenu);

            var nSize = $('#setting_tab01 .setting_checkbox_wrap li input:checked').size();
            $('#setting_tab01 .contents_title strong').text(nSize + '개');
        } else {
            elWrap.find('.setting_menu li').first().removeClass('active').next().addClass('active');
            elWrap.find('#setting_tab01').hide();
            elWrap.find('#setting_tab02').show();
            this.setSortMenuList($('.setting_checkbox_wrap li.checked'));
        }
    },

    _onChangeSettingMenu: function (e) {
        var target = $(e.currentTarget);
        console.log(target);
        if (target.is(":checked")) {
            target.parents('li').addClass('checked');
        } else {
            target.parents('li').removeClass('checked');
        }
        $('.contents_title strong').text($('.setting_checkbox_wrap input:checked').length + "개");
    },

    setInputListSorting: function () {
        var wel = $('.setting_checkbox_wrap');
        wel.find('li').each(function () {
            if (!$(this).hasClass('checked')) {
                $('.setting_checkbox_wrap').append($(this));
            }
        })
    },

    _onSortCallback: function (event, ui) {
        console.log(event);
        console.log(ui);
        $('#sortable li').each(function (index) {
            $(this).find('em').text(index + 1);

        })
    },

    _onClickSave: function (event, ui) {
        this.setCookiePannel();

    },

    _onClickMainTabs: function (event) {
        var target = $(event.currentTarget);
        var nIdx = target.data('index');
        target.addClass('active').siblings().removeClass('active');
        this.setAllPannel(nIdx);
        console.log(nIdx + "로 이동");
    },

    /**
     * 댐팝업 이동
     */
    _onClickPopDamMore: function (event) {
        var target = $(event.currentTarget);
        target.parents('.dim_block').remove();
        $(window).scrollTop(0);
        this.setAllPannel(5);

    },


    /**
     * 패널정보 처리
     */

    getMenuList: function (selector) {
        var wel = selector || $('._main_tabs li');
        oMenu.list = [];
        wel.each(function () {
            var o = {}
            o.index = $(this).data('index');
            o.name = $(this).find('a').text();
            console.log(o)
            oMenu.list.push(o);
        })
    },


    getGnbPannel: function () {
        var aList = [];

        if ($('#setting_tab01').is(":visible")) {
            $('.setting_checkbox_wrap li').each(function (index) {
                if ($(this).find('input').is(":checked")) {
                    aList.push($(this).find('input').data('index'));
                }
            });
        } else {
            $('#sortable li').each(function (index) {
                aList.push($(this).data('index'));
            });
        }

        return aList.toString();
    },
    setCookiePannel: function () {
        var oCookie = jindo.$Cookie();
        var sPannel = this.getGnbPannel();
        oCookie.set("MMPannel", sPannel, 3650);
        alert('저장되었습니다.');
        this.setGnbPannel();
        $('._gnb_setting').hide();
    },
    getCookiePannel: function (event) {
        var oCookie = jindo.$Cookie();
        return oCookie.get("MMPannel");
    },

    setGnbPannel: function () {
        try {
            var aList = this.getCookiePannel().split(",");
            console.log(aList);
            $('._main_tabs').empty();
            for (var i = 0; i < aList.length; i++) {

                var sTxt = eval("gnbIdx.menu" + aList[i]);

                $('._main_tabs').append('<li class="menu' + aList[i] + '" data-index="' + aList[i] + '"><a href="#">' + sTxt + '</a></li>')
            }
            $('._main_tabs li').first().addClass('active');

            this.setAllPannel(aList[0]);
        } catch (error) {
            console.log('쿠키가 없습니다.')
        }
    },


    /**
     * 페이지 설정
     */


    setCookie: function (event) {
        var target = $(event.currentTarget);
        var nIdx = Number(target.parents('.flick-ct').find('>div').attr('id').substr(6, 1));
        var oCookie = jindo.$Cookie();
        oCookie.set("MMIDX", nIdx, 1 / 48);
    },
    getCookiePage: function (name) {
        var oCookie = jindo.$Cookie();
        oCookie.get(name);
        return oCookie.get(name);
    },
    setCookiePage: function () {
        var nIdx = this.getCookiePage("MMIDX") || $('._main_tabs li.active').data('index');
        var nNextIdx;
        var nPrevIdx;
        var self = this;
        this.setAllPannel(nIdx);
    },
    setGnb: function (nIdx) {
        if ($('.section_header_gnb').length > 0) {
            //상단 메뉴 위치값 설정
            $('.section_header_gnb li').removeClass('active');
            $('.section_header_gnb').find('.menu' + nIdx).addClass('active');
            var elScroll = $('.scroll_area');
            var nScrollLeft = elScroll.scrollLeft();
            var nPosMenu = $('.scroll_area .active').offset().left;
            elScroll.scrollLeft(nPosMenu);
        }
    },
    setSubGnb: function (nIdx) {
        if ($('.sub_wp').length > 0) {
            //상단 메뉴 위치값 설정
            var elScroll = $('.sub_wp');
            var nScrollLeft = elScroll.scrollLeft();
            var nPosMenu = elScroll.find('.on').offset().left;
            elScroll.scrollLeft(nPosMenu);
        }

    },

    setBlankPannel: function (nIdx, container, callback) {
        var self = this;
        ui.tmpl.setTmpl({
            tmpl: "../../js/hbs/pannel" + nIdx + ".hbs",
            container: container,
            data: {},
            type: 'append',
            empty: true,
            callback: function () {
                callback();
            }
        });

    },
    setAllPannel: function (nIdx) {
        //gnb 셋팅
        var self = this;
        self.setGnb(nIdx);


        var nNextIdx;
        var nPrevIdx;

        var gnbSize = $('._main_tabs li').length - 1;
        var nActiveIdx = $('._main_tabs li.active').index();


        if (nActiveIdx == 0) {
            nNextIdx = $('._main_tabs li.active').next().data('index');
            nPrevIdx = $('._main_tabs li').last().data('index');
        } else if (nActiveIdx == gnbSize) {
            nNextIdx = $('._main_tabs li').eq(0).data('index');
            nPrevIdx = $('._main_tabs li.active').prev().data('index');
        } else {
            nNextIdx = $('._main_tabs li.active').next().data('index');
            nPrevIdx = $('._main_tabs li.active').prev().data('index');
        }
        self.setBlankPannel(nIdx, oCommon.oMainSlideflicking.getElement()._element, function () {
            self.setPannel(nIdx, "#pannel" + nIdx);
        });
        self.setBlankPannel(nNextIdx, oCommon.oMainSlideflicking.getNextElement()._element, function () {
            self.setPannel(nNextIdx, "#pannel" + nNextIdx);
        });
        self.setBlankPannel(nPrevIdx, oCommon.oMainSlideflicking.getPrevElement()._element, function () {
            self.setPannel(nPrevIdx, "#pannel" + nPrevIdx);
        });
    },


    /**
     * setPannel
     * @param nIdx 패널 인덱스정보
     */
    setPannel: function (nIdx, container, callback) {
        var self = this;
        console.log(nIdx + " : setPannel")
        console.log(container + " : setPannel container")
        nIdx = Number(nIdx);
        switch (nIdx) {
            case 0 :
                if (jindo.$Cookie().get("REGIONMAIN") != null) {
                    aLocal = jindo.$Cookie().get("REGIONMAIN").split("|");
                    regionInfo.regn_cd = aLocal[0];
                    regionInfo.regionCd = aLocal[1];
                    regionInfo.addr_cd = aLocal[1];
                };
                get_location(nIdx, container);
                break;
            case 1 :
                self.setPannel1(nIdx, container, callback);
                break;
            case 2 :
                self.setPannel2(nIdx, container, callback);
                break;
            case 3 :
                self.setPannel3(nIdx, container, callback);
                break;
            case 4 :
                self.setPannel4(nIdx, container, callback);
                break;
            case 5 :
                self.setPannel5(nIdx, container, callback);
                break;
            case 6 :
                self.setPannel6(nIdx, container, callback);
                break;
            case 7 :
                self.setPannel7(nIdx, container, callback);
                break;
        }
    },
    /**
     * 높이값 설정
     */
    setHeight: function (goTop) {
        var self = this;
        //스크롤 처리
        if (goTop == true) {
            $(window).scrollTop(0);
        }
        this.setPannelHeight();

        setTimeout(function () {
            self.setPannelHeight();
        }, 1000);

    },
    setPannelHeight: function () {
        var nIdx = $('.scroll_area .active').index();
        var nHeight = $('#pannel' + $('._main_tabs .active').data('index')).height();
        // console.log(nHeight);
        $('#mflick').height(nHeight);
    },

    /**
     * 메인 페이지
     */
    setPannel0: function (nIdx, container, callback) {
        var sTmpl = "../../js/hbs/main.hbs";
        var sContainer = container;
        var oData = {};
        var self = this;

        myWater.myInfo.getJsonData.o3Grade = 1;
        myWater.myInfo.getJsonData.pm10Grade = "2";
        var oMyInfo = myWater.myInfo.getJsonData;
        var oMyInfoDam = myWater.myInfoDam.getJsonData;
        var oMyWeather = myWater.myWeather.getJsonData;
        var oMakeData = myWater.makeData = {};


        /**
         * 지방하천
         */

        try {
            // oMyInfo.WLDAYLIST = "20161029_20161030_20161031";
            // oMyInfo.WLVALUELIST = "1.12_1.25_1.26";
            var wldayList = (oMyInfo.WLDAYLIST).split("_");
            var wlvalueList = (oMyInfo.WLVALUELIST).split("_");

            //인근하천
            var wlday01 = wldayList[0];
            var wlday02 = wldayList[1];
            var wlday03 = wldayList[2];

            oMakeData.wlday01 = wlday01.substring(4, 6) + "/" + wlday01.substring(6, 8);
            oMakeData.wlday02 = wlday02.substring(4, 6) + "/" + wlday02.substring(6, 8);
            oMakeData.wlday03 = wlday03.substring(4, 6) + "/" + wlday03.substring(6, 8);

            oMakeData.wlvalue01 = fn_format00(wlvalueList[0]);
            oMakeData.wlvalue02 = fn_format00(wlvalueList[1]);
            oMakeData.wlvalue03 = fn_format00(wlvalueList[2]);


            var maxValue = oMakeData.wlvalue02;
            if (oMakeData.wlvalue01 > oMakeData.wlvalue02) {
                if (oMakeData.wlvalue01 > oMakeData.wlvalue03) {
                    maxValue = oMakeData.wlvalue01;
                } else {
                    maxValue = oMakeData.wlvalue03;
                }
            } else {
                if (oMakeData.wlvalue02 > oMakeData.wlvalue03) {
                    maxValue = oMakeData.wlvalue02;
                } else {
                    maxValue = oMakeData.wlvalue03;
                }
            }

            oMakeData.wlvalue01_p = ( oMakeData.wlvalue01 / maxValue) * 100;
            oMakeData.wlvalue02_p = ( oMakeData.wlvalue02 / maxValue) * 100;
            oMakeData.wlvalue03_p = ( oMakeData.wlvalue03 / maxValue) * 100;
        } catch (err) {
            console.warn("============================");
            console.warn("나의 하천 데이터 누락");
            console.warn(err);
            console.warn("============================");
        }


        /**
         * 댐 정보
         * @type {string}
         */

        /**
         * 연 누적강수량
         */
        oMyInfoDam.dam_rate_c = (Number(oMyInfoDam.HOURRSQTY) / Number(oMyInfoDam.TLCPQTY)).toFixed(2);
        oMyInfoDam.dam_rate_y = (Number(oMyInfoDam.LASTYEARRSQTY) / Number(oMyInfoDam.TLCPQTY)).toFixed(2);
        oMyInfoDam.dam_rate_e = (Number(oMyInfoDam.FASTYEARRSQTY) / Number(oMyInfoDam.TLCPQTY)).toFixed(2);


        /*데이터 가공*/

        oMakeData.sumRf = oMyInfo.SUMRF / 10;
        oMakeData.rfAvg = oMyInfo.RFAVG;
        oMakeData.srfAvg = oMyInfo.SRFAVG;


        // oMakeData.rfRate = fn_format01((oMakeData.sumRf / oMakeData.rfAvg) * 1000, 0);
        // oMakeData.srRate = fn_format01((oMakeData.sumRf / oMakeData.srfAvg) * 1000, 0);
        oMakeData.rfRate = fn_format01(oMakeData.rfAvg/10, 0);
        oMakeData.srRate = fn_format01(oMakeData.srfAvg/10, 0);

        if (oMakeData.sumRf == '0' && oMakeData.rfAvg == '0') {
            srRate = "100";
        } else if (oMakeData.sumRf > 0 && oMakeData.rfAvg == '0') {
            srRate = "300";
        }


        //$("#damLeft").html("<em>수위 EL "+fn_format01(getHourRwl,-1)+
        // "m</em><span>저수량 "+fn_format01(getHourSsQry,-1)+
        // "백만m<sup>3</sup><br />(저수율 "+getToRate+"%)</span>
        // <p class=\"text\">계획홍수위 EL "+getPlFwl+"m<br />상시만수위 EL "+getOldFlwl+"m<br />저수위 EL "+getRwl+"m</p><p><img src=\"/images/egovframework/main_new/info_dam_graph.gif\" alt=\"\" /></p>");


        // oMyInfoDam.HOURRWL = "182.67";
        // oMyInfoDam.HOURRSQTY = "1870.348";
        // oMyInfoDam.TLCPQTY = "2900";

        oMakeData.getHourRwl = oMyInfoDam.HOURRWL;
        oMakeData.getHourSsQry = oMyInfoDam.HOURRSQTY;
        var tlcpqty = oMyInfoDam.TLCPQTY;
        oMakeData.getToRate = (oMakeData.getHourSsQry / tlcpqty).toFixed(2) * 100;


        //저수율 차트 시작

        //더미
        // oMyInfoDam.HOURRSQTY = "963.2547";
        // oMyInfoDam.LASTYEARRSQTY = "543.847";
        // oMyInfoDam.FASTYEARRSQTY = "868.769";


        var dam_rate_c = oMyInfoDam.HOURRSQTY / oMyInfoDam.TLCPQTY;
        var dam_rate_y = oMyInfoDam.LASTYEARRSQTY / oMyInfoDam.TLCPQTY;
        var dam_rate_e = oMyInfoDam.FASTYEARRSQTY / oMyInfoDam.TLCPQTY;

        oMakeData.dam_rate_cp = dam_rate_c * 100;
        oMakeData.dam_rate_yp = dam_rate_y * 100;
        oMakeData.dam_rate_ep = dam_rate_e * 100;

        //저수율 차트 끝

        //유입량 차트 시작

        // oMyInfoDam.DAYIQTY = "22.491";
        // oMyInfoDam.LASTYEARIQTY = "5.99";
        // oMyInfoDam.FASTYEARIQTY = "17.938";

        var dam_qty_c = oMyInfoDam.DAYIQTY;
        var dam_qty_y = oMyInfoDam.LASTYEARIQTY;
        var dam_qty_e = oMyInfoDam.FASTYEARIQTY;

        oMakeData.dam_qty_cp = (dam_qty_c / 100 ) * 100;
        oMakeData.dam_qty_yp = (dam_qty_y / 100 ) * 100;
        oMakeData.dam_qty_ep = (dam_qty_e / 100 ) * 100;
        //
        if (oMakeData.dam_qty_cp > 100) {
            oMakeData.dam_qty_cp = 100;
        }
        if (oMakeData.dam_qty_yp > 100) {
            oMakeData.dam_qty_yp = 100;
        }
        if (oMakeData.dam_qty_ep > 100) {
            oMakeData.dam_qty_ep = 100;
        }

        // //유입량 차트 끝
        //
        // //방류량 차트 시작

        // oMyInfoDam.DAYTDQTY = "10.679";
        // oMyInfoDam.LASTYEARTDQTY = "40.011";
        // oMyInfoDam.FASTYEARTDQTY = "54.071";

        var dam_tdqty_c = oMyInfoDam.DAYTDQTY;
        var dam_tdqty_y = oMyInfoDam.LASTYEARTDQTY;
        var dam_tdqty_e = oMyInfoDam.FASTYEARTDQTY;
        //
        oMakeData.dam_tdqty_cp = (dam_tdqty_c / 100 ) * 100;
        oMakeData.dam_tdqty_yp = (dam_tdqty_y / 100 ) * 100;
        oMakeData.dam_tdqty_ep = (dam_tdqty_e / 100 ) * 100;
        //
        if (oMakeData.dam_tdqty_cp > 100) {
            oMakeData.dam_tdqty_cp = 100;
        }
        if (oMakeData.dam_tdqty_yp > 100) {
            oMakeData.dam_tdqty_yp = 100;
        }
        if (oMakeData.dam_tdqty_ep > 100) {
            oMakeData.dam_tdqty_ep = 100;
        }
        //

        //방류량 차트 끝

        //온천 효능

        var springType = oMyInfo.UNG_COMPONENT;
        oMakeData.springHo = "";
        if (springType == '황산천') {
            oMakeData.springType = "1";
            oMakeData.springHo = "류마티스,신경통,소화기";
        } else if (springType == '유황천') {
            oMakeData.springType = "2";
            oMakeData.springHo = "피부병,각질,류마티스,부인병";
        } else if (springType == '식염천') {
            oMakeData.springType = "3";
            oMakeData.springHo = "위장병,냉증,신경통,근육통";
        } else if (springType == '단순천') {
            oMakeData.springType = "4";
            oMakeData.springHo = "피로회복,신경통,류마티스";
        } else {
            oMakeData.springType = "5";
            oMakeData.springHo = "혈액순환,고혈압,심장병,신장염";
        }


        //수질

        if (oMyInfo.STSVALUESTATUS == '1') {
            oMakeData.str_valueStatus = "매우좋음(Ia)";
        } else if (oMyInfo.STSVALUESTATUS == '2') {
            oMakeData.str_valueStatus = "좋음(Ib)";
        } else if (oMyInfo.STSVALUESTATUS == '3') {
            oMakeData.str_valueStatus = "약간좋음(Ⅱ)";
        } else if (oMyInfo.STSVALUESTATUS == '4') {
            oMakeData.str_valueStatus = "보통(Ⅲ)";
        } else if (oMyInfo.STSVALUESTATUS == '5') {
            oMakeData.str_valueStatus = "약간나쁨(Ⅳ)";
        } else if (oMyInfo.STSVALUESTATUS == '6') {
            oMakeData.str_valueStatus = "나쁨(Ⅴ)";
        } else if (oMyInfo.STSVALUESTATUS == '7') {
            oMakeData.str_valueStatus = "매우나쁨(ⅤI)";
        }

        //샘터
        var totBac = oMyInfo.UNG_TOTBAC;
        var genBac = oMyInfo.UNG_GENBAC;
        var no3N = oMyInfo.UNG_NO3N;
        var Kmn = oMyInfo.UNG_KMN;

        var genBacRate = (1 * genBac);
        var no3NRate = (1 * no3N);
        var KmnRate = (1 * Kmn);

        if (genBacRate > 0) {
            genBacRate = genBacRate / 100;
            genBacRate = genBacRate * 100;
        }
        if (no3NRate > 0) {
            no3NRate = no3NRate / 10;
            no3NRate = no3NRate * 100;
        }
        if (KmnRate > 0) {
            KmnRate = KmnRate / 10;
            KmnRate = KmnRate * 100;
        }

        if (totBac == "불검출") {
            oMakeData.totbacClass = "type01"
        } else if (totBac == "검출") {
            oMakeData.totbacClass = "type02"
        }


        oMakeData.genBacClass = "";
        if (genBacRate == 0) {
            oMakeData.genBacClass = "per0";
        } else if (genBacRate < 26) {
            oMakeData.genBacClass = "per25";
        } else if (genBacRate < 51) {
            oMakeData.genBacClass = "per50";
        } else if (genBacRate < 76) {
            oMakeData.genBacClass = "per75";
        } else if (genBacRate == 100) {
            oMakeData.genBacClass = "per100";
        } else if (genBacRate > 100) {
            oMakeData.genBacClass = "per100_above";
        }

        oMakeData.no3NClass = "";
        if (no3NRate == 0) {
            oMakeData.no3NClass = "per0";
        } else if (no3NRate < 26) {
            oMakeData.no3NClass = "per25";
        } else if (no3NRate < 51) {
            oMakeData.no3NClass = "per50";
        } else if (no3NRate < 76) {
            oMakeData.no3NClass = "per75";
        } else if (no3NRate == 100) {
            oMakeData.no3NClass = "per100";
        } else if (no3NRate > 100) {
            oMakeData.no3NClass = "per100_above";
        }

        oMakeData.KmnClass = "";
        if (KmnRate == 0) {
            oMakeData.KmnClass = "per2";
        } else if (KmnRate < 26) {
            oMakeData.KmnClass = "per25";
        } else if (KmnRate < 51) {
            oMakeData.KmnClass = "per50";
        } else if (KmnRate < 76) {
            oMakeData.KmnClass = "per75";
        } else if (KmnRate == 100) {
            oMakeData.KmnClass = "per100";
        } else if (KmnRate > 100) {
            oMakeData.KmnClass = "per100_above";
        }


        apiClient.getTourLife({
            dummy: false,
            callback: function (data, bSuccess) {
                myWater.mainTour = data;
                console.warn(myWater);


                ui.tmpl.setTmpl({
                    tmpl: sTmpl,
                    container: sContainer,
                    data: myWater,
                    type: 'append',
                    empty: true,
                    callback: function () {
                        self.setHeight();
                        //로드 후 클래스 처리
                        $(sContainer).addClass('loaded');

                        /**
                         * 네이버 자전거길
                         */

                        $('.dim_loading').remove();
                        $(document.body).css({"overflow": "visible"});
                        var map = new naver.maps.Map('map', {
                            // center: new naver.maps.LatLng(37.3595704, 127.105399),
                            center: new naver.maps.LatLng(oMyInfo.BIKECOORDX, oMyInfo.BIKECOORDY),
                            zoom: 8,
                            zoomControl: true,
                            mapTypeControl: false,
                            mapTypeControlOptions: {
                                style: naver.maps.MapTypeControlStyle.DROPDOWN
                            }
                        });
                        var bicycleLayer = new naver.maps.BicycleLayer();
                        bicycleLayer.setMap(map);
                    }
                });
            }
        }, myWater.myInfo.getJsonData.COORD_X, myWater.myInfo.getJsonData.COORD_Y)


    },
    /**
     * 핫이슈 페이지
     */
    setPannel1: function (nIdx, container, callback) {
        var oData = {};
        var sTmpl = "../../js/hbs/hot_issue.hbs";
        var sContainer = container;
        var self = this;

        apiClient.getNewsJsonData({
            dummy: false,
            callback: function (data, bSuccess) {
                oData.news = data;
                oData.success1 = bSuccess;
                apiClient.getReportJsonData({
                    dummy: false,
                    callback: function (data, bSuccess) {
                        oData.report = data;
                        apiClient.getArticleJsonData({
                            dummy: false,
                            callback: function (data, bSuccess) {
                                oData.article = data;
                                apiClient.getEasyStaticJsonData({
                                    dummy: false,
                                    callback: function (data, bSuccess) {
                                        oData.easyStatic = data;
                                        console.log(oData);


                                        ui.tmpl.setTmpl({
                                            tmpl: sTmpl,
                                            container: sContainer,
                                            data: oData,
                                            type: 'append',
                                            empty: true,
                                            callback: function () {
                                                self.setHeight(true);
                                                //로드 후 클래스 처리
                                                $(sContainer).addClass('loaded');
                                            }
                                        });
                                    }
                                });
                            }
                        });

                    }
                });

            }
        });


    },
    /**
     * 생활 페이지
     */
    setPannel2: function (nIdx, container, callback) {

        var oData = {};
        var sTmpl = "../../js/hbs/life.hbs";
        var sContainer = container;
        var self = this;

        apiClient.getSense({
            dummy: false,
            callback: function (data, bSuccess) {
                oData.sense = data;
                apiClient.getHealth({
                    dummy: false,
                    callback: function (data, bSuccess) {
                        oData.health = data;
                        apiClient.getRiver({
                            dummy: false,
                            callback: function (data, bSuccess) {
                                oData.river = data;
                                apiClient.getTour({
                                    dummy: false,
                                    callback: function (data, bSuccess) {
                                        oData.tour = data;
                                        apiClient.getFestival({
                                            dummy: false,
                                            callback: function (data, bSuccess) {
                                                oData.festival = data;
                                                apiClient.getWaterSports({
                                                    dummy: true,
                                                    callback: function (data, bSuccess) {
                                                        oData.waterSports = data;


                                                        console.log(oData);

                                                        ui.tmpl.setTmpl({
                                                            tmpl: sTmpl,
                                                            container: sContainer,
                                                            data: oData,
                                                            type: 'append',
                                                            empty: true,
                                                            callback: function () {

                                                                self.setHeight();

                                                                //로드 후 클래스 처리
                                                                $(sContainer).addClass('loaded');

                                                                self.setPannel2_weather();
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },

    setPannel2_weather: function () {

        var sTmpl = "../../js/hbs/life_weather_story.hbs";
        var sContainer = "#weather_story";
        var oData = {};
        var self = this;

        apiClient.getWeatherStory({
            dummy: false,
            callback: function (data, bSuccess) {
                oData.weatherStory = data;

                console.log(oData);
                ui.tmpl.setTmpl({
                    tmpl: sTmpl,
                    container: sContainer,
                    data: oData,
                    type: 'append',
                    empty: true,
                    callback: function () {

                        self.setHeight();

                        //로드 후 클래스 처리
                        $(sContainer).addClass('loaded');

                        self.setPannel2_city();
                    }
                });
            }
        });


    },
    setPannel2_city: function () {
        var sTmpl = "../../js/hbs/life_city_story.hbs";
        var sContainer = "#city_story";
        var oData = {};
        var self = this;
        apiClient.getUnderGround({
            dummy: false,
            callback: function (data, bSuccess) {
                oData.cityStory = data;
                console.log(oData);
                ui.tmpl.setTmpl({
                    tmpl: sTmpl,
                    container: sContainer,
                    data: oData,
                    type: 'append',
                    empty: true,
                    callback: function () {
                        self.setHeight();
                        //로드 후 클래스 처리
                        $(sContainer).addClass('loaded');
                    }
                });
            }
        });
    },


    /**
     * 소통 페이지
     */
    setPannel3: function (nIdx, container, callback) {

        var oData = {};
        var sTmpl = "../../js/hbs/communication.hbs";
        var sContainer = container;
        var self = this;

        //나의 물 이야기
        apiClient.getMyWaterStory({
            dummy: false,
            callback: function (data, bSuccess) {
                oData.myWaterStory = data;

                //포토갤러리
                apiClient.getGallery01({
                    dummy: false,
                    callback: function (data, bSuccess) {
                        oData.gallery01 = data;
                        apiClient.getGallery02({
                            dummy: false,
                            callback: function (data, bSuccess) {
                                oData.gallery02 = data;
                                apiClient.getGallery03({
                                    dummy: false,
                                    callback: function (data, bSuccess) {
                                        oData.gallery03 = data;
                                        apiClient.getGallery04({
                                            dummy: false,
                                            callback: function (data, bSuccess) {
                                                oData.gallery04 = data;
                                                //기술 SW 커뮤니티
                                                apiClient.getSwCommunity({
                                                    dummy: false,
                                                    callback: function (data, bSuccess) {
                                                        oData.swCommunity = data;

                                                        console.log(oData)
                                                        ui.tmpl.setTmpl({
                                                            tmpl: sTmpl,
                                                            container: sContainer,
                                                            data: oData,
                                                            type: 'append',
                                                            empty: true,
                                                            callback: function () {
                                                                self.setPannel3_calendar();
                                                                self.setHeight();
                                                            }
                                                        });

                                                    }
                                                });
                                            }
                                        });
                                    }
                                });

                            }
                        });

                    }
                });


            }
        });
    },
    setPannel3_calendar: function () {
        var oData = {};
        var sTmpl = "../../js/hbs/communication_calendar.hbs";
        var sContainer = "#pannel_calender";
        var self = this;
        var date = moment().format('YYYY-MM-DD');
        var startDate = moment().subtract(1, 'years').format('YYYY-MM-DD');
        var endDate = moment().add(1, 'years').format('YYYY-MM-DD');


        //물 행사일정
        apiClient.getCalendarJson({
            dummy: false,
            callback: function (data, bSuccess) {
                oData.calendar = data;

                try {
                    oData.calendar.today = $.grep(oData.calendar.result, function (n) {
                        return n.start <= date && n.end >= date
                    });
                    console.log(data);    
                } catch (e) {
                    oData.calendar.today = $.grep(oData.calendar.getJsonData, function (n) {
                        return n.start <= date && n.end >= date
                    });
                    oData.calendar.result = oData.calendar.getJsonData;
                    console.log("오늘의 데이터 추출 에러");
                }


                ui.tmpl.setTmpl({
                    tmpl: sTmpl,
                    container: sContainer,
                    data: oData,
                    type: 'append',
                    empty: true,
                    callback: function () {
                        $('#calender_c').fullCalendar('destroy');
                        $('#calender_c').fullCalendar({
                            locale: "ko",
                            theme: true,
                            backgroundColor: 'red',
                            header: {
                                left: 'prev',
                                center: 'title',
                                right: 'next',
                            },
                            editable: true,
                            // add event name to title attribute on mouseover
                            eventMouseover: function (event, jsEvent, view) {
                                if (view.name !== 'agendaDay') {
                                    $(jsEvent.target).attr('title', event.title);
                                }
                            },
                            events: data.result,
                            eventLimit: true,
                            eventClick: function (calEvent, jsEvent, view) {
                                var bbsId = "BBSMSTR_000000000021";
                                var nttId = calEvent.id;
                                var sUrl = "//m.water.or.kr/information/event/event01_detail.do?bbsId=BBSMSTR_000000000021&nttId=0&ntt_id=" + nttId + "&std_dt=";
                                window.location.href = sUrl;
                            }
                        });

                        $('.fc-event-container a').addClass('')

                        self.setHeight();
                    }
                });
            }
        }, startDate, endDate);
    },
    /**
     * 지식 페이지
     */
    setPannel4: function (nIdx, container, callback) {

        var sTmpl = "../../js/hbs/knowledge.hbs";
        var sContainer = container;
        var self = this;
        var oData = {};


        //물교육
        apiClient.getEducation({
            dummy: false,
            callback: function (data, bSuccess) {
                oData.education = data;
                // 지식 동영상
                apiClient.getWAcademy({
                    dummy: false,
                    callback: function (data, bSuccess) {
                        oData.wacademy = data;
                        // 물과역사
                        apiClient.getHistory({
                            dummy: false,
                            callback: function (data, bSuccess) {
                                oData.history = data;

                                // 학생 발명품
                                apiClient.getStudent({
                                    dummy: false,
                                    callback: function (data, bSuccess) {
                                        oData.student = data;
                                        // 우수기술제품
                                        apiClient.getNewSkill({
                                            dummy: false,
                                            callback: function (data, bSuccess) {
                                                oData.newskill = data;

                                                console.log(oData);
                                                ui.tmpl.setTmpl({
                                                    tmpl: sTmpl,
                                                    container: sContainer,
                                                    data: oData,
                                                    type: 'append',
                                                    empty: true,
                                                    callback: function () {

                                                        self.setHeight();


                                                        self.setDictionary(nIdx, container);
                                                    }
                                                });

                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });

            }
        });

    },

    setDictionary: function (nIdx, container, callback) {

        var sTmpl = "../../js/hbs/dictionary.hbs";
        var sContainer = $('#dictionary');
        var self = this;
        var oData = {};

        console.log(nIdx)
        console.log(container)

        //물백과사전
        apiClient.getDictionary({
            dummy: false,
            callback: function (data, bSuccess) {
                oData.dictionary = data;

                console.log(oData);
                ui.tmpl.setTmpl({
                    tmpl: sTmpl,
                    container: sContainer,
                    data: oData,
                    type: 'append',
                    empty: false,
                    callback: function () {

                        self.setHeight();

                        //로드 후 클래스 처리
                        $(sContainer).addClass('loaded');
                    }
                });

            }
        });

    },


    /**
     * 수재해 페이지
     */
    setPannel5: function (nIdx, container, callback) {

        // var oDam = {};
        //
        // function get_myInfoDamJson(nIdx, container) {
        //     $.ajax({
        //         //실서버
        //         url : baseUrl + "/main/getMyWaterDAMInfo.do",
        //         contentType : "application/json; charset=utf-8",
        //         dataType : "json",
        //         data:{"regionCd": regionInfo.regionCd},
        //         success : function(getResult) {
        //             oDam.myInfoDam = getResult;
        //         },
        //         error : function(request,status,error) {
        //             oDam.myInfoDam = error;
        //         }
        //     });
        // }


        var sTmpl = "../../js/hbs/safety.hbs";
        var sContainer = container;
        var oData = {};
        var self = this;

        // var location = oDam.myInfoDam.BACODE * 10;
        // var locationIdx = oDam.myInfoDam.BACODE;

        var location = 10;
        var locationIdx = 1;
        apiClient.getMainDrought({
            callback: function (data) {
                oData.drought = data;
            }
        })
        apiClient.getMainCommon({
            callback: function (data) {
                oData.common  = data;
            }
        })
        apiClient.getMainFlood({
            callback: function (d) {
                oData.flood = {};
                oData.flood.list = [];
                var aFlood10 = [
                    "1001690",
                    "1007635",
                    "1018683",
                    "1022680",
                    "1023660",
                    "1101635",
                    "1101670"
                ];
                aFlood10.forEach(function (e, i, a) {
                    var str = e;
                    d.list.forEach(function (element) {
                        if (element.damcd == str) {
                            oData.flood.list.push(element);
                        }
                    });
                });


                apiClient.getMainFloodSM({
                    callback: function (data) {
                        oData.floodSM = {};
                        oData.floodSM.floodDamList = [];
                        var aFloodSM10 = [
                            "1012110",
                            "1003110",
                            "1006110"
                        ];
                        aFloodSM10.forEach(function (e, i, a) {
                            var str = e;
                            data.floodDamList.forEach(function (element) {
                                if (element.estcd == str) {
                                    oData.floodSM.floodDamList.push(element);
                                }
                            });
                        });

                        console.log(oData);
                        ui.tmpl.setTmpl({
                            tmpl: sTmpl,
                            container: sContainer,
                            data: oData,
                            type: 'append',
                            empty: true,
                            callback: function () {

                                //로드 후 클래스 처리
                                $(sContainer).addClass('loaded');

                                ui.tmpl.setTmpl({
                                    tmpl: "../../js/hbs/realtime/realTimeTab1.hbs",
                                    container: "#tab_pannel",
                                    data: {},
                                    type: 'append',
                                    empty: true,
                                    callback: function () {
                                        ui.tmpl.setTmpl({
                                            tmpl: "../../js/hbs/realtime/searchForm11.hbs",
                                            container: "#pannel_realtime",
                                            data: {},
                                            type: 'append',
                                            empty: true,
                                            callback: function () {
                                                //로드 후 클래스 처리
                                                $(sContainer).addClass('loaded');

                                                var startDatepicker = $("#datepicker_1").datepicker({dateFormat: 'yy-mm-dd'});
                                                var endDatepicker = $("#datepicker_2").datepicker({dateFormat: 'yy-mm-dd'});
                                                startDatepicker.datepicker('setDate', new Date());
                                                endDatepicker.datepicker('setDate', new Date());

                                                var imgSrc01 = "";

                                                if (location == 10) {
                                                    imgSrc01 = "//m.water.or.kr/images/egovframework/mkwip/disaster/flood/map_flood_hankang_woonyoung.png";
                                                    $("#location").text("한강수계");
                                                } else if (location == 20) {
                                                    imgSrc01 = "//m.water.or.kr/images/egovframework/mkwip/disaster/flood/map_flood_nakdongkang_wooyong.png";
                                                    $("#location").text("낙동강수계");
                                                } else if (location == 30) {
                                                    imgSrc01 = "//m.water.or.kr/images/egovframework/mkwip/disaster/flood/map_flood_keumkang_woonyoung.png";
                                                    $("#location").text("금강수계");
                                                } else if (location == 40) {
                                                    imgSrc01 = "//m.water.or.kr/images/egovframework/mkwip/disaster/flood/map_flood_new0104_woon1.png";
                                                    $("#location").text("영산강수계");
                                                }

                                                //이미지 교체
                                                $('#pannel5 .system_img').eq(0).find('img')
                                                    .attr('src', imgSrc01);

                                                var imgSrc02 = "";

                                                if (locationIdx == 1) {
                                                    imgSrc02 = "//m.water.or.kr/images/egovframework/mkwip/disaster/flood/map_flood_hankang_yaekyong.png";
                                                    $("#locationIdx").text("한강수계");
                                                } else if (locationIdx == 2) {
                                                    imgSrc02 = "//m.water.or.kr/images/egovframework/mkwip/disaster/flood/map_flood_nakdongkang_yaekyong.png";
                                                    $("#locationIdx").text("낙동강수계");
                                                } else if (locationIdx == 3) {
                                                    imgSrc02 = "//m.water.or.kr/images/egovframework/mkwip/disaster/flood/map_flood_keumkang_yaekyoung.png";
                                                    $("#locationIdx").text("금강수계");
                                                } else if (locationIdx == 4) {
                                                    imgSrc02 = "//m.water.or.kr/images/egovframework/mkwip/disaster/flood/map_flood_youngsankang_yaekyoung.png";
                                                    $("#locationIdx").text("영산강수계");
                                                }

                                                $('#pannel5 .system_img').eq(1).find('img')
                                                    .attr('src', imgSrc02);

                                                self.setTidal();
                                                self.setHeight();

                                            }
                                        });
                                    }
                                });
                            }
                        });

                    }
                }, locationIdx);

            }
        }, location);

    },
    setFloodSm: function (event) {
        var sTmpl = "../../js/hbs/safety_flood_sm.hbs";
        var sContainer = "#tableFloodSm";
        var oData = {};
        var self = this;
        var target = $(event.currentTarget);
        var nIdx = target.find(':checked').index() + 1;
        var locationIdx = nIdx;
        var location = locationIdx * 10;

        var aFloodSM10 = [
            "1012110",
            "1003110",
            "1006110"
        ];
        var aFloodSM20 = [
            "2001110",
            "2002110",
            "2015110",
            "2018110",
            "2021110",
            "2008101",
            "2010101",
            "2004101",
            "2002111",
            "2012101"
        ];
        var aFloodSM30 = [
            "3001110",
            "3008110",
            "3303110",
            "3203110",
        ];
        var aFloodSM40 = [
            "4001110",
            "4007110",
            "4104610",
            "5101110",
        ];
        console.log(locationIdx);

        apiClient.getMainFloodSM({
            callback: function (data) {
                oData.floodSM = {};
                oData.floodSM.floodDamList = [];
                console.log(data);
                eval("aFloodSM" + location).forEach(function (e, i, a) {
                    var str = e;
                    data.floodDamList.forEach(function (element) {
                        if (element.estcd == str) {
                            oData.floodSM.floodDamList.push(element);
                        }
                    });
                });


                // oData.floodSM = data;
                console.log(oData);
                ui.tmpl.setTmpl({
                    tmpl: sTmpl,
                    container: sContainer,
                    data: oData,
                    type: 'append',
                    empty: true,
                    callback: function () {
                        self.setHeight();
                        //로드 후 클래스 처리
                        $(sContainer).addClass('loaded');

                        var imgSrc01 = "";

                        if (location == 10) {
                            imgSrc01 = "//m.water.or.kr/images/egovframework/mkwip/disaster/flood/map_flood_hankang_woonyoung.png";
                            $("#location").text("한강수계");
                        } else if (location == 20) {
                            imgSrc01 = "//m.water.or.kr/images/egovframework/mkwip/disaster/flood/map_flood_nakdongkang_wooyong.png";
                            $("#location").text("낙동강수계");
                        } else if (location == 30) {
                            imgSrc01 = "//m.water.or.kr/images/egovframework/mkwip/disaster/flood/map_flood_keumkang_woonyoung.png";
                            $("#location").text("금강수계");
                        } else if (location == 40) {
                            imgSrc01 = "//m.water.or.kr/images/egovframework/mkwip/disaster/flood/map_flood_new0104_woon1.png";
                            $("#location").text("영산강수계");
                        }

                        //이미지 교체
                        $('#pannel5 .system_img').eq(0).find('img')
                            .attr('src', imgSrc01);

                    }
                });

            }
        }, locationIdx);

    },
    setFlood: function (event) {
        var sTmpl = "../../js/hbs/safety_flood.hbs";
        var sContainer = "#tableFlood";
        var oData = {};
        var self = this;
        var target = $(event.currentTarget);
        var nIdx = target.find(':checked').index() + 1;
        var locationIdx = nIdx;
        var location = locationIdx * 10;

        var aFlood10 = [
            "1001690",
            "1007635",
            "1018683",
            "1022680",
            "1023660",
            "1101635",
            "1101670"
        ];
        var aFlood20 = [
            "2009620",
            "2011650",
            "2012660",
            "2014660",
            "2020615",
            "2022610",
            "2022680",
            "2101675",
            "2101690",
            "2201670"
        ];
        var aFlood30 = [
            "3009670",
            "3009680",
            "3011665",
            "3012620",
            "3012675",
            "3014610",
            "3101625",
            "3101685",
            "3301670",
            "3302630"
        ];
        var aFlood40 = [
            "4005670",
            "4009610",
            "4009630",
            "4009665",
            "5001680",
            "5002690",
            "5003680",
            "5004650",
            "5101670"
        ];


        apiClient.getMainFlood({
            callback: function (d) {


                oData.flood = {};
                oData.flood.list = [];
                eval("aFlood" + location).forEach(function (e, i, a) {
                    var str = e;
                    d.list.forEach(function (element) {
                        if (element.damcd == str) {
                            oData.flood.list.push(element);
                        }
                    });
                });


                // oData.flood = data;
                console.log(oData);
                ui.tmpl.setTmpl({
                    tmpl: sTmpl,
                    container: sContainer,
                    data: oData,
                    type: 'append',
                    empty: true,
                    callback: function () {

                        //로드 후 클래스 처리
                        $(sContainer).addClass('loaded');

                        var imgSrc02 = "";

                        if (locationIdx == 1) {
                            imgSrc02 = "//m.water.or.kr/images/egovframework/mkwip/disaster/flood/map_flood_hankang_yaekyong.png";
                            $("#locationIdx").text("한강수계");
                        } else if (locationIdx == 2) {
                            imgSrc02 = "//m.water.or.kr/images/egovframework/mkwip/disaster/flood/map_flood_nakdongkang_yaekyong.png";
                            $("#locationIdx").text("낙동강수계");
                        } else if (locationIdx == 3) {
                            imgSrc02 = "//m.water.or.kr/images/egovframework/mkwip/disaster/flood/map_flood_keumkang_yaekyoung.png";
                            $("#locationIdx").text("금강수계");
                        } else if (locationIdx == 4) {
                            imgSrc02 = "//m.water.or.kr/images/egovframework/mkwip/disaster/flood/map_flood_youngsankang_yaekyoung.png";
                            $("#locationIdx").text("영산강수계");
                        }

                        $('#pannel5 .system_img').eq(1).find('img')
                            .attr('src', imgSrc02);

                        self.setHeight();

                    }
                });

            }
        }, location);

    },


    setTidal: function () {
        var sTmpl = "../../js/hbs/safety_tidal.hbs";
        var sContainer = "#tidal";
        var oData = {};
        var self = this;
        var location = "H";


        apiClient.getMainTidal({
            callback: function (data) {
                oData.tidal = data;
                console.log(oData);
                ui.tmpl.setTmpl({
                    tmpl: sTmpl,
                    container: sContainer,
                    data: oData,
                    type: 'append',
                    empty: true,
                    callback: function () {
                        var result = oData.tidal.getJsonData[0];
                        tidalData = oData.tidal.getJsonData;
                        console.log(result.coordX + " / " + result.coordY + " / " + result.alertObject + '(' + result.stage + ')' + " / " + result.stageCode);
                        naverMap03(result);
                        self.setHeight();
                    }
                });
            }
        }, location);
    },
    _onSetTidal: function (event) {
        var sTmpl = "../../js/hbs/safety_tidal.hbs";
        var sContainer = "#tidal";
        var oData = {};
        var self = this;
        var location;
        var target = $(event.currentTarget);
        var nIdx = target.find(':checked').index();

        if (nIdx == 0) {
            location = "H";
        } else if (nIdx == 1) {
            location = "N";
        } else if (nIdx == 2) {
            location = "K";
        } else if (nIdx == 3) {
            location = "Y";
        }


        apiClient.getMainTidal({
            callback: function (data) {
                oData.tidal = data;
                console.log(oData);
                ui.tmpl.setTmpl({
                    tmpl: sTmpl,
                    container: sContainer,
                    data: oData,
                    type: 'append',
                    empty: true,
                    callback: function () {
                        var result = oData.tidal.getJsonData[0];
                        tidalData = oData.tidal.getJsonData;
                        console.log(result.coordX + " / " + result.coordY + " / " + result.alertObject + '(' + result.stage + ')' + " / " + result.stageCode);
                        naverMap03(result);
                        self.setHeight();

                    }
                });

            }
        }, location);
    },
    _onClickTidal : function(event){
        var target = $(event.currentTarget);
        var nIdx = target.parents('tr').index();
        console.log("naverMap03(tidalData[" + nIdx + "])");
        naverMap03(tidalData[nIdx]);
    },
    /**
     * 실시간 페이지
     */
    setPannel6: function (nIdx, container, callback) {

        var sTmpl = "../../js/hbs/manage.hbs";
        var sContainer = container;
        var sData = {};
        var self = this;


        apiClient.getForum({
            dummy: false,
            callback: function (data, bSuccess) {
            }
        });


        ui.tmpl.setTmpl({
            tmpl: sTmpl,
            container: sContainer,
            data: sData,
            type: 'append',
            empty: true,
            callback: function () {
                ui.tmpl.setTmpl({
                    tmpl: "../../js/hbs/realtime/realTimeTab1.hbs",
                    container: "#tab_pannel",
                    data: {},
                    type: 'append',
                    empty: true,
                    callback: function () {
                        ui.tmpl.setTmpl({
                            tmpl: "../../js/hbs/realtime/searchForm11.hbs",
                            container: "#pannel_realtime",
                            data: {},
                            type: 'append',
                            empty: true,
                            callback: function () {
                                self.setHeight();
                                //로드 후 클래스 처리
                                $(sContainer).addClass('loaded');

                                var startDatepicker = $("#datepicker_1").datepicker({dateFormat: 'yy-mm-dd'});
                                var endDatepicker = $("#datepicker_2").datepicker({dateFormat: 'yy-mm-dd'});
                                startDatepicker.datepicker('setDate', new Date());
                                endDatepicker.datepicker('setDate', new Date());
                            }
                        });
                    }
                });
            }
        });
    },
    /**
     * 해외 페이지
     */
    setPannel7: function (nIdx, container, callback) {

        var sTmpl = "../../js/hbs/foreign_country.hbs";
        var sContainer = container;
        var oData = {};
        var self = this;

        apiClient.getFlag({
            dummy: false,
            callback: function (data, bSuccess) {
                oData.flag = data;
                apiClient.getForum({
                    dummy: false,
                    callback: function (data, bSuccess) {
                        oData.forum = data;
                        apiClient.getTrend({
                            dummy: false,
                            callback: function (data, bSuccess) {
                                oData.trend = data;

                                console.log(oData);
                                ui.tmpl.setTmpl({
                                    tmpl: sTmpl,
                                    container: sContainer,
                                    data: oData,
                                    type: 'append',
                                    empty: true,
                                    callback: function () {
                                        self.setHeight();
                                        //로드 후 클래스 처리
                                        $(sContainer).addClass('loaded');
                                        setTimeout(function () {
                                            self.setHeight();
                                        }, 2000)
                                    }
                                });

                            }
                        });
                    }
                });
            }
        });

    },
    /**
     * 통계 페이지
     */
    setPannel8: function (nIdx, container, callback) {
        //패널정보 확인
        if (this.nCurrentPannel != 8) {
            //return false;
        }
        var sTmpl = "../../js/hbs/main.hbs";
        var sContainer = container;
        var sData = {};
        var self = this;
        ui.tmpl.setTmpl({
            tmpl: sTmpl,
            container: sContainer,
            data: sData,
            type: 'append',
            empty: true,
            callback: function () {

                self.setHeight();

                //로드 후 클래스 처리
                $(sContainer).addClass('loaded');
            }
        });
    },
    activeLocationLoading: function (e) {
        var target = $(e.currentTarget);
        target.addClass('loading');
        geo_relocation();
        setTimeout(function () {
            target.removeClass('loading');
        }, 1000)

    },
    showTopBtn: function () {
        $(document).scroll(function () {
            var scrTop = $(this).scrollTop();
            var docHeight = $(document).height();
            var winHeight = $(window).height();
            var footerHeight = $('.section_footer').height();
            var hiddenBtnHeight = docHeight - winHeight - footerHeight + 16;
            // console.log(scrTop, hiddenBtnHeight)
            if (scrTop > 150 && scrTop < hiddenBtnHeight) {
                $('.btn_top').css({opacity: 1});
            } else if (scrTop > hiddenBtnHeight) {
                $('.btn_top').css({opacity: 0});
            } else {
                $('.btn_top').css({opacity: 0});
            }
        })
    },
    _ready: function () {
        $("#sortable").sortable();
        $("#sortable").disableSelection();

    }
};
//실시간 관측 첫번째 셀렉트 박스-1
function setRealtimeDamSub1(damType, selNm) {
    $('#realtime_dam_type_sub1').empty();
    $.each(realtimeDamType[damType][selNm], function (k, v) {
        $('#realtime_dam_type_sub1').append('<option>' + k + '</option>');
    });

    var opts = $('#realtime_dam_type_sub1').find(':checked').text();
    setRealtimeDamSub2(damType, selNm, opts);
}
//실시간 관측 첫번째 셀렉트 박스-2
function setRealtimeDamSub2(damType, selNm, opts) {

    $('#realtime_dam_type_sub2').empty();
    $.each(realtimeDamType[damType][selNm][opts], function (k, v) {
        $('#realtime_dam_type_sub2').append('<option value=' + v + '>' + k + '</option>');
    });
}
//실시간 관측 두번째 셀렉트 박스
function setRealtimeDamSub3(damType, opts) {

    $('#realtime_dam_type_sub3').empty();
    $.each(realtimeDamType[damType][opts], function (k, v) {
        $('#realtime_dam_type_sub3').append('<option value=' + v + '>' + k + '</option>');
    });
}

function getSearchData() {
    var val = $('.wrap_popup ._btn_realtime_dam_type').val();
    var text = $('.wrap_popup ._btn_realtime_dam_type option:selected').eq(0).text();
    console.log(val + "/" + text);

    eval('get' + val + '()');
}
function setTableYheight() {
    $('.table_scroll_y .box_label th').eq(0).height($('.table_scroll_y .box_data th').height());
}

//실시간 관측 댐/보 검색
function getSub01Hydr(index) {

//function getHydro(liId) {
    /*if (liId != '' && liId != 'undefined') {
     $('#damcd').val(liId);
     }*/

    var damcd = $('.wrap_popup .realtime_dam_type_sub2:visible').val();
    var sCode = $('.wrap_popup #sCode').val();

    var startDate = $("#pannel_realtime_pop .datepicker").eq(0).val().split("-");
    var endDate = $("#pannel_realtime_pop .datepicker").eq(1).val().split("-");

    // 검색기간 시작 년, 월, 일
    var ssYear = startDate[0];
    var ssMonth = startDate[1];
    var ssDay = startDate[2];

    // 검색기간 종료 년, 월, 일
    var ddlYear = endDate[0];
    var ddlMonth = endDate[1];
    var ddlDay = endDate[2];

    var ssDate = $("#pannel_realtime_pop .datepicker").eq(0).val().replace(/-/gi, "");
    var eDate = $("#pannel_realtime_pop .datepicker").eq(1).val().replace(/-/gi, "");


    var sDateObj = new Date(ssYear, Number(ssMonth) - 1, ssDay);
    var eDateObj = new Date(ddlYear, Number(ddlMonth) - 1, ddlDay);
    var betweenDay = (eDateObj.getTime() - sDateObj.getTime()) / 1000 / 60 / 60 / 24;

    //		다기능보 2012년 8월 27일 이후만 검색 가능
    if (damcd == "1007601" || damcd == "1007602" || damcd == "1007603" || damcd == "2007601" ||
        damcd == "2009601" || damcd == "2009602" || damcd == "2011601" || damcd == "2011602" ||
        damcd == "2014601" || damcd == "2014602" || damcd == "2017601" || damcd == "3010601" ||
        damcd == "3012601" || damcd == "3012602" || damcd == "5004601" || damcd == "5004602") {
        if (20120827 > ssDate || 20120827 > eDate) {
            alert("다기능보는 2012년 8월 27일부터 자료 검색이 가능합니다.");
            return false;
        }
    }

    if (0 > betweenDay) {
        alert("검색기간을 다시 선택해주세요.");
        $('#startDate').focus();
        return false;
    }
    if (sCode == "C") {
        if (betweenDay > 14) {
            alert("10분별 최대검색일은 14일 입니다.");
            return false;
        }
    } else if (sCode == "A") {
        if (betweenDay > 60) {
            alert("시간별 최대검색일은 60일 입니다.");
            return false;
        }
    } else if (sCode == "B") {
        if (betweenDay > 365) {
            alert("일자별 최대검색일은 365일 입니다.");
            return false;
        }
    }

    //s_mid=1323&sCode=A&damcd=1012110&startDate=2016-11-03&endDate=2016-11-03
    var param = {
        s_mid: '1332',
        damcd: damcd,
        sCode: sCode,
        startDate: $("#pannel_realtime_pop .datepicker").eq(0).val(),
        endDate: $("#pannel_realtime_pop .datepicker").eq(1).val(),
        index: index || '1'
    };
    console.log('======= req getSub01Hydr =====');
    console.log(param);
    $('#pannel_realtime_pop_result').empty();
    apiClient.getSub01Hydr({
        dummy: false,
        param: param,
        callback: function (data, bSuccess) {
            //console.log(data.responseText);
            $('#pannel_realtime_pop_result').html(data.responseText);
            setTableYheight();
            //$('#pannel_realtime_pop_paginate').html(data.paginate);
        }
    });

    //document.getElementById("damSpcVO").submit();
}
//댐/보별자료(우량수위)
function getSub01Rain(index) {
    //s_mid=1453&sCode=A&sType=C&damcd=2503220&startDate=2016-11-06&sTime=20
    var param = {
        s_mid: '1453',
        damcd: $('.wrap_popup .Sub01RainDamType:visible').val(),
        sCode: $('.wrap_popup .Sub01RainsCode').val(),
        //sType: $('.wrap_popup .Sub01RainsType').val(),
        sType: 'C',
        startDate: $(".wrap_popup .Sub01RainDatepicker").val(),
        sTime: $(".wrap_popup .Sub01RainDatetime").val(),
        index: index || '1'
    };
    console.log('======= req getSub01Rain =====');
    console.log($.param(param));
    $('#pannel_realtime_pop_result').empty();
    apiClient.getSub01Rain({
        dummy: false,
        param: param,
        callback: function (data, bSuccess) {
            //console.log(data.responseText);
            $('#pannel_realtime_pop_result').html(data.responseText);
            setTableYheight();
            //$('#pannel_realtime_pop_paginate').html(data.paginate);
        }
    });
}
//다목적댐 관리현황
function getSub01Vers(index) {
    //s_mid=1324&startDate=2016-11-06&sTime=07
    var param = {
        s_mid: '1324',
        startDate: $(".wrap_popup .Sub01VersDatepicker").val(),
        sTime: $(".wrap_popup .Sub01VersDatetime").val(),
        index: index || '1'
    };
    console.log('======= req getSub01vers =====');
    console.log($.param(param));
    $('#pannel_realtime_pop_result').empty();
    apiClient.getSub01Vers({
        dummy: false,
        param: param,
        callback: function (data, bSuccess) {
            //console.log(data.responseText);
            $('#pannel_realtime_pop_result').html(data.responseText);
            setTableYheight();
            //$('#pannel_realtime_pop_paginate').html(data.paginate);
        }
    });
}
//용수댐 관리현황
function getSub01Wate(index) {
    //s_mid=1325&startDate=2016-11-06&sTime=07
    var param = {
        s_mid: '1325',
        startDate: $(".wrap_popup .Sub01WateDatepicker").val(),
        sTime: $(".wrap_popup .Sub01WateDatetime").val(),
        index: index || '1'
    };
    console.log('======= req getSub01Wate =====');
    console.log($.param(param));
    $('#pannel_realtime_pop_result').empty();
    apiClient.getSub01Wate({
        dummy: false,
        param: param,
        callback: function (data, bSuccess) {
            //console.log(data.responseText);
            $('#pannel_realtime_pop_result').html(data.responseText);
            setTableYheight();
            //$('#pannel_realtime_pop_paginate').html(data.paginate);
        }
    });
}
//다기능보 관리현황
function getSub01Mult(index) {
    //s_mid=1326&startDate=2016-11-06&sTime=07
    var param = {
        s_mid: '1326',
        startDate: $(".wrap_popup .Sub01MultDatepicker").val(),
        sTime: $(".wrap_popup .Sub01MultDatetime").val(),
        index: index || '1'
    };
    console.log('======= req getSub01Wate =====');
    console.log($.param(param));
    $('#pannel_realtime_pop_result').empty();
    apiClient.getSub01Mult({
        dummy: false,
        param: param,
        callback: function (data, bSuccess) {
            //console.log(data.responseText);
            $('#pannel_realtime_pop_result').html(data.responseText);
            setTableYheight();
            //$('#pannel_realtime_pop_paginate').html(data.paginate);
        }
    });
}
//다기능보 관리현황
function getSub01Sihwa(index) {
    //s_mid=1327&startDate=2016-11-06&endDate=2016-11-06
    var param = {
        s_mid: '1327',
        startDate: $(".wrap_popup .Sub01SihwaDatepicker").eq(0).val(),
        endDate: $(".wrap_popup .Sub01SihwaDatepicker").eq(1).val(),
        index: index || '1'
    };
    console.log('======= req getSub01Sihwa =====');
    console.log($.param(param));
    $('#pannel_realtime_pop_result').empty();
    apiClient.getSub01Sihwa({
        dummy: false,
        param: param,
        callback: function (data, bSuccess) {
            //console.log(data.responseText);
            $('#pannel_realtime_pop_result').html(data.responseText);
            setTableYheight();
            //$('#pannel_realtime_pop_paginate').html(data.paginate);
        }
    });
}
function getSub01YongsuSupplyByName(nm) {
    $(".wrap_popup .Sub01YongsuSupplySelect").val(nm);
    getSub01YongsuSupply('1');
}
//용수공급전망
function getSub01YongsuSupply(index) {
    /**
     * <ul>
     <li><span class="icon_lv02"><a class="" href="/realtime/sub01/sub01/dam/yongsuSupply.do?s_mid=1323&amp;damcode=1012110&amp;seq=1408&amp;p_group_seq=1407&amp;menu_mode=3"><span class="hidden">주의</span>소양강댐</a></span></li>
     <li><span class="icon_lv02"><a class="" href="/realtime/sub01/sub01/dam/yongsuSupply.do?s_mid=1323&amp;damcode=1003110&amp;seq=1408&amp;p_group_seq=1407&amp;menu_mode=3"><span class="hidden">주의</span>충주댐</a></span></li>
     <li><span class="icon_lv02"><a class="" href="/realtime/sub01/sub01/dam/yongsuSupply.do?s_mid=1323&amp;damcode=1006110&amp;seq=1408&amp;p_group_seq=1407&amp;menu_mode=3"><span class="hidden">주의</span>횡성댐</a></span></li>
     <li><span class="icon_lv01"><a class="" href="/realtime/sub01/sub01/dam/yongsuSupply.do?s_mid=1323&amp;damcode=2001110&amp;seq=1408&amp;p_group_seq=1407&amp;menu_mode=3"><span class="hidden">주의</span>안동댐</a></span></li>
     <li><span class="icon_lv01"><a class="" href="/realtime/sub01/sub01/dam/yongsuSupply.do?s_mid=1323&amp;damcode=2002110&amp;seq=1408&amp;p_group_seq=1407&amp;menu_mode=3"><span class="hidden">주의</span>임하댐</a></span></li>
     <li><span class="icon_lv01"><a class="" href="/realtime/sub01/sub01/dam/yongsuSupply.do?s_mid=1323&amp;damcode=2015110&amp;seq=1408&amp;p_group_seq=1407&amp;menu_mode=3"><span class="hidden">정상</span>합천댐</a></span></li>
     <li><span class="icon_lv01"><a class="" href="/realtime/sub01/sub01/dam/yongsuSupply.do?s_mid=1323&amp;damcode=2021110&amp;seq=1408&amp;p_group_seq=1407&amp;menu_mode=3"><span class="hidden">정상</span>밀양댐</a></span></li>
     <li><span class="icon_lv01"><a class="" href="/realtime/sub01/sub01/dam/yongsuSupply.do?s_mid=1323&amp;damcode=2008101&amp;seq=1408&amp;p_group_seq=1407&amp;menu_mode=3"><span class="hidden">정상</span>군위댐</a></span></li>
     <li><span class="icon_lv01"><a class="" href="/realtime/sub01/sub01/dam/yongsuSupply.do?s_mid=1323&amp;damcode=2010101&amp;seq=1408&amp;p_group_seq=1407&amp;menu_mode=3"><span class="hidden">정상</span>김천부항댐</a></span></li>
     <li><span class="icon_lv01"><a class="" href="/realtime/sub01/sub01/dam/yongsuSupply.do?s_mid=1323&amp;damcode=3001110&amp;seq=1408&amp;p_group_seq=1407&amp;menu_mode=3"><span class="hidden">정상</span>용담댐</a></span></li>
     <li><span class="icon_lv01"><a class="" href="/realtime/sub01/sub01/dam/yongsuSupply.do?s_mid=1323&amp;damcode=3008110&amp;seq=1408&amp;p_group_seq=1407&amp;menu_mode=3"><span class="hidden">정상</span>대청댐</a></span></li>
     <li><span class="icon_lv01"><a class="" href="/realtime/sub01/sub01/dam/yongsuSupply.do?s_mid=1323&amp;damcode=4007110&amp;seq=1408&amp;p_group_seq=1407&amp;menu_mode=3"><span class="hidden">정상</span>주암댐</a></span></li>
     <li><span class="icon_lv01"><a class="" href="/realtime/sub01/sub01/dam/yongsuSupply.do?s_mid=1323&amp;damcode=3303110&amp;seq=1408&amp;p_group_seq=1407&amp;menu_mode=3"><span class="hidden">정상</span>부안댐</a></span></li>
     <li><span class="icon_lv03"><a class="" href="/realtime/sub01/sub01/dam/yongsuSupply.do?s_mid=1323&amp;damcode=3203110&amp;seq=1408&amp;p_group_seq=1407&amp;menu_mode=3"><span class="hidden">관심</span>보령댐</a></span></li>
     <li><span class="icon_lv01"><a class="" href="/realtime/sub01/sub01/dam/yongsuSupply.do?s_mid=1323&amp;damcode=5101110&amp;seq=1408&amp;p_group_seq=1407&amp;menu_mode=3"><span class="hidden">정상</span>장흥댐</a></span></li>
     </ul>
     *
     */
    //s_mid=1323&damcode=1012110&seq=1408&p_group_seq=1407&menu_mode=3
    var val = $(".wrap_popup .Sub01YongsuSupplySelect").val();
    var param = {};
    $.each(val.split("&"), function (i, v) {
        param[v.split('=')[0]] = v.split('=')[1];
    });
    console.log('======= req getSub01YongsuSupply =====');
    console.log($.param(param));
    $('#pannel_realtime_pop_result').empty();
    apiClient.getSub01YongsuSupply({
        dummy: false,
        param: param,
        callback: function (data, bSuccess) {
            //console.log(data.responseText);
            $('#pannel_realtime_pop_result').html(data.responseText);
            setTableYheight();
            //$('#pannel_realtime_pop_paginate').html(data.paginate);
        }
    });
}

//다목적댐 수질정보
function getSub02Vers(index) {
    //s_mid=1329&damcd=1012110&typeSel=sujil&wqncd=1012B40&year=2016
    var param = {
        s_mid: '1329',
        damcd: $(".wrap_popup .Sub02VersDamcd").val(),
        typeSel: 'sujil',
        wqncd: $(".wrap_popup .Sub02VersWqncd:visible").val(),
        year: $(".wrap_popup .Sub02VersYear").val(),
        index: index || '1'
    };
    console.log('======= req getSub02Vers =====');
    console.log($.param(param));
    $('#pannel_realtime_pop_result').empty();
    apiClient.getSub02Vers({
        dummy: false,
        param: param,
        callback: function (data, bSuccess) {
            //console.log(data.responseText);
            $('#pannel_realtime_pop_result').html(data.responseText);
            setTableYheight();
            //$('#pannel_realtime_pop_paginate').html(data.paginate);
        }
    });
}

//다기능보 수질정보
function getSub02Mult(index) {
    //s_mid=1330&damcd=2011602&year=2016
    var param = {
        s_mid: '1330',
        damcd: $(".wrap_popup .Sub02MultDamcd").val(),
        year: $(".wrap_popup .Sub02MultYear").val(),
        index: index || '1'
    };
    console.log('======= req getSub02Mult =====');
    console.log($.param(param));
    $('#pannel_realtime_pop_result').empty();
    apiClient.getSub02Mult({
        dummy: false,
        param: param,
        callback: function (data, bSuccess) {
            //console.log(data.responseText);
            $('#pannel_realtime_pop_result').html(data.responseText);
            setTableYheight();
            //$('#pannel_realtime_pop_paginate').html(data.paginate);
        }
    });
}
//실시간 수질(시)
function getSub02Rinfo(waterType) {
    //s_mid=1124&officecode=x001&waterType=A
    //
    var param = {
        s_mid: '1330',
        officecode: $('.wrap_popup .Sub02RinfoOfficecode').val(),
        waterType: $('.wrap_popup .Sub02RinfoWaterType').val()
    };

    console.log('======= req getSub02Rinfo =====');
    console.log($.param(param));
    $('#pannel_realtime_pop_result').empty();
    apiClient.getSub02Rinfo({
        dummy: false,
        param: param,
        callback: function (data, bSuccess) {
            //console.log(data.responseText);
            $('#pannel_realtime_pop_result').html(data.responseText);
            setTableYheight();
            //$('#pannel_realtime_pop_paginate').html(data.paginate);
        }
    });
}
//일일 수질(일)
function getSub02WinfoList(waterType) {
    //s_mid=223&
    //s_area=A001&
    //s_kind=K001&
    //s_jungsu1=387&s_jungsu2=&
    //s_jungsu3=&s_jungsu4=&
    //s_jungsu5=&
    //=2016-10-01&endDate=2016-11-06
    //
    var param = {
        s_mid: '223',
        s_area: $('.wrap_popup .Sub02WinfoListsArea').val(),
        s_kind: $('.wrap_popup .Sub02WinfoListsKind:visible').val(),
        s_jungsu1: $('.wrap_popup .Sub02WinfoListsJungsu1:visible').val(),
        s_jungsu2: $('.wrap_popup .Sub02WinfoListsJungsu2:visible').val(),
        s_jungsu3: $('.wrap_popup .Sub02WinfoListsJungsu3:visible').val(),
        s_jungsu4: $('.wrap_popup .Sub02WinfoListsJungsu4:visible').val(),
        s_jungsu5: $('.wrap_popup .Sub02WinfoListsJungsu5:visible').val(),
        startDate: $('.wrap_popup .Sub02WinfoListDatepicker').eq(0).val(),
        endDate: $('.wrap_popup .Sub02WinfoListDatepicker').eq(1).val()
    };

    console.log('======= req getSub02WinfoList =====');
    console.log($.param(param));
    $('#pannel_realtime_pop_result').empty();
    apiClient.getSub02WinfoList({
        dummy: false,
        param: param,
        callback: function (data, bSuccess) {
            //console.log(data.responseText);
            $('#pannel_realtime_pop_result').html(data.responseText);
            setTableYheight();
            //$('#pannel_realtime_pop_paginate').html(data.paginate);
        }
    });
}

//일일 수질(주)
function getSub02WinfoWeekList(waterType) {
    //s_mid=223&s_area=A001&s_kind=K001&s_jungsu1=387&s_jungsu2=&s_jungsu3=&s_jungsu4=&s_jungsu5=&
    //startYear=2016&startMonth=10&endYear=2016&=11
    var param = {
        s_mid: '223',
        s_area: $('.wrap_popup .Sub02WinfoWeekListsArea').val(),
        s_kind: $('.wrap_popup .Sub02WinfoWeekListsKind:visible').val(),
        s_jungsu1: $('.wrap_popup .Sub02WinfoWeekListsJungsu1:visible').val(),
        s_jungsu2: $('.wrap_popup .Sub02WinfoWeekListsJungsu2:visible').val(),
        s_jungsu3: $('.wrap_popup .Sub02WinfoWeekListsJungsu3:visible').val(),
        s_jungsu4: $('.wrap_popup .Sub02WinfoWeekListsJungsu4:visible').val(),
        s_jungsu5: $('.wrap_popup .Sub02WinfoWeekListsJungsu5:visible').val(),
        startYear: $('.wrap_popup .Sub02WinfoWeekListDatepicker').eq(0).val().split('-')[0],
        startMonth: $('.wrap_popup .Sub02WinfoWeekListDatepicker').eq(0).val().split('-')[1],
        endYear: $('.wrap_popup .Sub02WinfoWeekListDatepicker').eq(1).val().split('-')[0],
        endMonth: $('.wrap_popup .Sub02WinfoWeekListDatepicker').eq(1).val().split('-')[1]
    };

    console.log('======= req getSub02WinfoWeekList =====');
    console.log($.param(param));
    $('#pannel_realtime_pop_result').empty();
    apiClient.getSub02WinfoWeekList({
        dummy: false,
        param: param,
        callback: function (data, bSuccess) {
            //console.log(data.responseText);
            $('#pannel_realtime_pop_result').html(data.responseText);
            setTableYheight();
            //$('#pannel_realtime_pop_paginate').html(data.paginate);
        }
    });
}

//일일 수질(월)
function getSub02WinfoMonthList(waterType) {
    //s_mid=223&s_area=A001&s_kind=K001&s_jungsu1=387&s_jungsu2=&s_jungsu3=&s_jungsu4=&s_jungsu5=&
    //startYear=2016&startMonth=10&endYear=2016&=11
    var param = {
        s_mid: '223',
        s_area: $('.wrap_popup .Sub02WinfoMonthListsArea').val(),
        s_kind: $('.wrap_popup .Sub02WinfoMonthListsKind:visible').val(),
        s_jungsu1: $('.wrap_popup .Sub02WinfoMonthListsJungsu1:visible').val(),
        s_jungsu2: $('.wrap_popup .Sub02WinfoMonthListsJungsu2:visible').val(),
        s_jungsu3: $('.wrap_popup .Sub02WinfoMonthListsJungsu3:visible').val(),
        s_jungsu4: $('.wrap_popup .Sub02WinfoMonthListsJungsu4:visible').val(),
        s_jungsu5: $('.wrap_popup .Sub02WinfoMonthListsJungsu5:visible').val(),
        startYear: $('.wrap_popup .Sub02WinfoMonthListDatepicker').eq(0).val().split('-')[0],
        startMonth: $('.wrap_popup .Sub02WinfoMonthListDatepicker').eq(0).val().split('-')[1],
        endYear: $('.wrap_popup .Sub02WinfoMonthListDatepicker').eq(1).val().split('-')[0],
        endMonth: $('.wrap_popup .Sub02WinfoMonthListDatepicker').eq(1).val().split('-')[1],
        count: Number($('.wrap_popup .Sub02WinfoMonthListDatepicker').eq(1).val().split('-')[1]) - Number($('.wrap_popup .Sub02WinfoMonthListDatepicker').eq(0).val().split('-')[1])
    };

    console.log('======= req getSub02WinfoMonthList =====');
    console.log($.param(param));
    $('#pannel_realtime_pop_result').empty();
    apiClient.getSub02WinfoMonthList({
        dummy: false,
        param: param,
        callback: function (data, bSuccess) {
            //console.log(data.responseText);
            $('#pannel_realtime_pop_result').html(data.responseText);
            setTableYheight();
            //$('#pannel_realtime_pop_paginate').html(data.paginate);
        }
    });
}

//하수도 총괄현황
function getSub03SewageAll(index) {
    //s_mid=1569&sewageCode=A01&selectedSewageCode=A00
    var param = {
        s_mid: '1569',
        sewageCode: 'A00',
        selectedSewageCode: 'A01'
    };

    console.log('======= req getSub03Sewage =====');
    console.log($.param(param));
    $('#pannel_realtime_pop_result').empty();
    apiClient.getSub03Sewage({
        dummy: false,
        param: param,
        callback: function (data, bSuccess) {
            //console.log(data.responseText);
            $('#pannel_realtime_pop_result').html(data.responseText);
            setTableYheight();
            //$('#pannel_realtime_pop_paginate').html(data.paginate);
        }
    });
}

//하수도 시설별현황
function getSub03Sewage(index) {
    //s_mid=1569&sewageCode=A01&selectedSewageCode=A00
    var param = {
        s_mid: '1569',
        sewageCode: $('.wrap_popup .Sub03SewageCode').val(),
        selectedSewageCode: 'A00'
    };
    console.log('======= req getSub03Sewage =====');
    console.log($.param(param));
    $('#pannel_realtime_pop_result').empty();
    apiClient.getSub03Sewage({
        dummy: false,
        param: param,
        callback: function (data, bSuccess) {
            //console.log(data.responseText);
            $('#pannel_realtime_pop_result').html(data.responseText);
            setTableYheight();
            //$('#pannel_realtime_pop_paginate').html(data.paginate);
        }
    });

}

//조류경보 상세보기 지도

function naverMap03(result) {
    var map = new naver.maps.Map('tidal_map', {
        // center: new naver.maps.LatLng(37.3595704, 127.105399),
        center: new naver.maps.LatLng(result.coordX, result.coordY),
        zoom: 5,
        zoomControl: true,
        mapTypeControl: false,
        mapTypeControlOptions: {
            style: naver.maps.MapTypeControlStyle.DROPDOWN
        }
    });
    var mPoint = new naver.maps.LatLng(result.coordX, result.coordY);
    var markerOptions = {
        position: mPoint,
        icon: {
            url: '/images/egovframework/mkwip/map/pin' + result.stageCode + '.png',
            size: new naver.maps.Size(28, 37),
            anchor: new naver.maps.Point(14, 37)
        }
    };

    var marker = new naver.maps.Marker(markerOptions);
    marker.setMap(map); // 추가

    //지도 이벤트 제어
    naver.maps.Event.addListener(marker, 'click', function (e) {
        map.setCenter(mPoint);
        map.setZoom(10);
    });

    var infowindow = new naver.maps.InfoWindow({
        content: "<div class=\"iw_inner\"><div style=\"text-align:center; min-width:80px !important; color: #555; background: #fff; border: solid 1px #333; cursor: pointer; -webkit-border-radius: 5px; outline: 0 none; border-radius: 5px; box-shadow: 2px 2px 1px 1px rgba(0, 0, 0, 0.5) !important; \">" + result.alertObject + "-"+ result.alertPoint + "(" + result.stage + ")" + "</div></div>",
        //content: item.bicycleNm,
        backgroundColor: "none",
        borderWidth: 0,
        anchorSkew: false,
        borderColor: "none"
    });

    naver.maps.Event.addListener(marker, "click", function (e) {
        infowindow.open(map, marker);
    });

    infowindow.open(map, marker);

}