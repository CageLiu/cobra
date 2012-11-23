var now = new Date();
var curYear = now.getFullYear();
var curMonth = now.getMonth();
var curMonthFirstDate = new Date(curYear, curMonth);
var prevMonth = now.setTime(curMonthFirstDate.getTime() - 1);
//alert(new Date(prevMonth).getMonth());
//
function getMonthDays(year,month){
	//获得上个月的第一天
	var prevMonth = new Date(year, month + 1) - 1;

	return new Date(prevMonth);
}

//alert(getMonthDays(2009,1).getDate());

/*
new $.calendar({
	handler : "search",
	box : document.getElementById("J_layout_body"),
	target : "search",
	time : true
});
*/
