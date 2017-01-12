$(document).ready(function() {
	$("#searchWord").keypress(function(e) {
	    if (e.keyCode == 13){
	    	$("#pageIndex").val("1");
	    }    
	});
});

function fnSearch(url){
	$("#form1").attr("action", url);
	$("#pageIndex").val("1");
	$("#form1").submit();
}