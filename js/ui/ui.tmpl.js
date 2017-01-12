var ui = ui || {};
ui.tmpl = ui.tmpl || {};
ui.tmpl = {

    /*
     * 템플릿 바인딩
     *
     *
     * @method setTmpl
     *
     * @param {String} tmpl - Template
     * @param {String} container - container
     * @param {Object} data - data
     * @param {String} type - 그리는 방식 html, append, prepend
     * @param {Funtuion} callback - 템플릿 다 그려지고 실행될 콜백
     *
     * @return promise
     *
     setTmpl 실행 튜토리얼

     ui.tmpl.setTmpl({
         tmpl: '#템플릿',
         container: '#컨테이너',
         data: {etcData : etcData},
         callback: function(){
            console.log("템플릿 콜백");
         }
     });
     */
    setTmpl: function (options) {
        var opts = {
            tmpl: '',
            container: '',
            data: {},
            type: 'append', // html, append, prepend
            empty: true, // 내용지우기
            callback: function () {
            }
        };
        $.extend(opts, options);

        if (!opts.tmpl || !opts.container) { //둘중 하나라도 없으면 화면 그리지 않음.
            return;
        }

        $.get(opts.tmpl, function(data){
            var source = data;
            var template = Handlebars.compile(source);
            var context = opts.data;
            var html = template(context);

            if(opts.empty) {
                $(opts.container).empty();
            }
            switch (opts.type) {
                case "html":
                    $(opts.container).html(html);
                    console.log("%c[setTmpl] : " + opts.container + " <- " + opts.tmpl , 'background: #222; color: #bada55');
                    break;
                case "append":
                    $(opts.container).append(html);
                    //console.log("%c[setTmpl] : " + opts.container + " <- " + opts.tmpl , 'background: #222; color: #bada55');
                    break;
                case "prepend":
                    $(opts.container).prepend(html);
                    console.log("%c[setTmpl] : " + opts.container + " <- " + opts.tmpl , 'background: #222; color: #bada55');
                    break;
                case "push":
                    opts.container.push(html);
                    break;
                case "return":
                	opts.callback(html);    	
                	return;
            }

            opts.callback(opts.data, html);
        })
    }
};
