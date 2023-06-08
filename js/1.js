var monthDay = [31,0,31,30,31,30,31,31,30,31,30,31];
function whatDay(year,month,day = 1)
{
	var sum = 0;
	sum += (year - 1) * 365 + Math.floor((year - 1)/4) - Math.floor((year - 1)/100) + Math.floor((year - 1)/400) + day;
	for (var i = 0; i < month-1; i++)
	{
		sum += monthDay[i];
	}
	if (month > 2)
	{
		if (isLeap(year))
		{
			sum += 29;
		}
		else
		{
			sum += 28;
		}
	}
	return sum%7;
}

function isLeap(year)
{
	if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function showCld(year,month,firstDay)
{
	var i;
	var tagClass = "";
	var nowDate = new Date();
	var days;
	if (month == 2)
	{
		if(isLeap(year))
		{
			days = 29;
		}
		else
		{
			days = 28;
		}
	}
	else
	{
		days = monthDay[month-1];
	}
	var topdateHtml = year + "年" + month + "月";
	var topDate = document.getElementById('topDate');
	topDate. innerHTML = topdateHtml;
	var tbodyHtml = '<tr>';
	for(i = 0; i <firstDay; i++)
	{
		tbodyHtml += "<td></td>";
	}
	var changLine = firstDay;
	for (i = 1;i <= days; i++)
	{
		if (year == nowDate.getFullYear() && month == nowDate.getMonth() + 1 && i == nowDate.getDate())
		{
			tagClass = "curDate";
		}
		else
		{
			tagClass = "isDate";
		}
		tbodyHtml += "<td class = " + tagClass + ">" + i + "</td>";
		changLine = (changLine + 1) % 7;
		if (changLine == 0 && i != days)
		{
			tbodyHtml += "</tr><tr>";
		}
	}
	if (changLine != 0)
	{
		for(i = changLine; i < 7; i++)
		{
			tbodyHtml += "<td></td>";
		}
	}
	tbodyHtml += "</tr>";
	var tbody = document.getElementById('tbody');
	tbody.innerHTML = tbodyHtml;
}
var curDate = new Date();
var curYear = curDate.getFullYear();
var curMonth = curDate.getMonth() + 1;
showCld(curYear,curMonth,whatDay(curYear,curMonth));

function nextMonth()
{
	var topStr = document.getElementById("topDate").innerHTML;
	var pattern=/\d+/g;
	var listTemp = topStr.match(pattern);
	var year = Number( listTemp[0]);
	var month = Number(listTemp[1]);
	var nextMonth = month + 1;
	if(nextMonth> 12)
	{
		nextMonth = 1;
		year++;
	}
	document.getElementById('topDate').innerHTML = '';
	showCld(year,nextMonth,whatDay(year,nextMonth));
}
	document.getElementById('right').onclick = function()
{
	nextMonth();
}

function preMonth()
{
	var topStr = document.getElementById("topDate").innerHTML;
	var pattern =/\d+/g;
	var listTemp = topStr.match(pattern);
	var year = Number(listTemp[0]);
	var month = Number(listTemp[1]);
	var preMonth = month - 1;
	if (preMonth< 1)
	{
		preMonth = 12;
		year--;
	}
	document.getElementById('topDate').innerHTML = '';
	showCld(year,preMonth,whatDay(year,preMonth));
}
document.getElementById('left').onclick = function()
{
	preMonth();
}
