//移动端
document.documentElement.style.fontSize = innerWidth / 16 + 'px';
onresize = function() {
    document.documentElement.style.fontSize = innerWidth / 16 + 'px';
};


// var html = document.getElementsByTagName('html')[0];
// var settedFs = settingFs = parseInt(html.style.fontSize);
// var whileCount = 0;
// while(true) {
// 	var realFs = parseInt(window.getComputedStyle(html).fontSize);
// 	var delta = realFs - settedFs;
// 	alert(parseInt(html.style.fontSize))
// 	alert(window.getComputedStyle(html).fontSize)
// 	if (Math.abs(delta) >= 1) //不相等
// 	{
// 		if (delta > 0) settingFs--; else settingFs++;
// 		html.setAttribute('style', 'font-size:'+settingFs + 'px!important');
// 	} else
// 		break;
// 	if (whileCount++ > 100) //之所以弄个100的循环跳出的原因，在于实在无法预判设备是否能计算得到36px，比如设备只能计算35px，37px，这样会死循环只能跳出了
// 		break
// }