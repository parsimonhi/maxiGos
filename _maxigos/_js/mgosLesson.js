// maxiGos v8 > mgosLesson.js
if(!mxG.G.prototype.createLesson)
{
mxG.fr("Assistant","Assistant");
// mxG.S section
mxG.S.prototype.makeAssistantGradient=function(a)
{
	let s="";
	s+="<defs>";
	if(a==1)
	{
		s+="<radialGradient id='rgb4i' cx='33%' cy='33%' r='50%'>";
		s+="<stop stop-color='%23999' offset='0'/>";
		s+="<stop stop-color='%23333' offset='0.5'/>";
		s+="<stop stop-color='%23000' offset='1'/>";
		s+="</radialGradient>";
	}
	s+="<radialGradient id='rgw4i' cx='33%' cy='33%' r='100%'>";
	s+="<stop stop-color='%23fff' offset='0'/>";
	s+="<stop stop-color='%23ccc' offset='0.5'/>";
	s+="<stop stop-color='%23333' offset='1'/>";
	s+="</radialGradient>";
	s+="</defs>";
	return s;
}
mxG.S.prototype.makeAssistantOff=function()
{
	// xmlns because it is used as <img> src
	let cw,s=`<svg xmlns='${this.xmlnsUrl}'`
	+` viewBox='0 0 160 112' stroke-linecap='square' role='presentation' aria-hidden='true'>`;
	if(this.p.in3dOn)
	{
		s+=this.makeAssistantGradient(0);
		cw=`fill='url(%23rgw4i)'`;
	}
	else cw=`fill='%23fff' stroke='%23000'`;
	s+=`<ellipse cx='80' cy='71' rx='78' ry='39' ${cw}/>`
	+`<g stroke='%23000' fill='none' stroke-linecap='round' stroke-linejoin='round'>`
	+`<path d='M80 30V22M80 30L70 22M80 30L90 22'/>`
	+`<path d='M20 71H60M140 71H100M60 96H100M30 111H50M130 111H110'/>`
	+`</g>`
	+`</svg>`;
	return s;
}
mxG.S.prototype.makeAssistantOn=function()
{
	// xmlns because it is used as <img> src
	let cb,cw,s=`<svg xmlns='${this.xmlnsUrl}'`
	+` viewBox='0 0 160 112' stroke-linecap='square' role='presentation' aria-hidden='true'>`;
	if(this.p.in3dOn)
	{
		s+=this.makeAssistantGradient(1);
		cb=`fill='url(%23rgb4i)'`;
		cw=`fill='url(%23rgw4i)'`;
	}
	else
	{
		cb=`fill='%23000' stroke='%23000' stroke-width='1'`;
		cw=`fill='%23fff' stroke='%23000' stroke-width='1'`;
	}
	s+=`<g transform='translate(0,10)'>`
	+`<ellipse cx='80' cy='40' rx='78' ry='39' ${cw}/>`
	+`<circle cx='40' cy='40' r='20' ${cw}/>`
	+`<circle cx='120' cy='40' r='20' ${cw}/>`
	+`<circle cx='40' cy='40' r='10' ${cb}/>`
	+`<circle cx='120' cy='40' r='10' ${cb}/>`
	+`</g>`
	+`<g stroke='%23000' fill='none' stroke-linecap='round' stroke-linejoin='round'>`
	+`<path d='M80 9V1M80 9L70 1M80 9L90 1'/>`
	+`<path d='M30 111H50L30 100L50 89M130 111H110L130 100L110 89'/>`
	+`<path d='M 60 70 A 3 1, 180, 0 0, 100 70'/>`
	+`</g>`
	+`</svg>`;
	return s;
}
// mxG.G section
mxG.G.prototype.updateLesson=function()
{
	let a=this.getE("LessonBox"),
		s=this.cN.P.C?this.cN.P.C[0].noT():"",
		cls="mxLessonBox";
	s=s.replace(/\n/g,"<br>");
	a.firstChild.innerHTML=s;
	a.lastChild.src=s?this.assistantOnSrc:this.assistantOffSrc;
	if(this.cN.P.BM)cls+=" mxBM";
	else if(this.cN.P.DO)cls+=" mxDO";
	else if(this.cN.P.IT)cls+=" mxIT";
	else if(this.cN.P.TE)cls+=" mxTE";
	a.className=cls;
}
mxG.G.prototype.toggleBalloon=function()
{
	let a=this.getE("LessonBox");
	if (a.lastChild.src==this.assistantOnSrc)
	{
		a.firstChild.innerHTML="";
		a.lastChild.src=this.assistantOffSrc;
	}
	else
	{
		this.updateLesson();
		if (a.lastChild.src==this.assistantOffSrc)a.lastChild.src=this.assistantOnSrc;
	}
}
mxG.G.prototype.initLesson=function()
{
	let k=this.k;
	this.getE("LessonBox").addEventListener("click",function(ev){mxG.D[k].toggleBalloon();});
}
mxG.G.prototype.createLesson=function()
{
	let d="data:image/svg+xml,";
	this.assistantOnSrc=d+this.scr.makeAssistantOn();
	this.assistantOffSrc=d+this.scr.makeAssistantOff();
	return `<div class="mxLessonBox" id="${this.n}LessonBox"><div></div>`
	+`<img alt="${this.local("Assistant")}" width=160 height=112 src="${this.assistantOffSrc}">`
	+`</div>`;
}
}
