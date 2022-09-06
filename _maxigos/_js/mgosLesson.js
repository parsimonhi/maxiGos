// maxiGos v7 > mgosLesson.js
if(!mxG.G.prototype.createLesson)
{
mxG.G.prototype.makeAssistantOff=function()
{
	let s="";
	s+='<svg';
	s+=' xmlns="http://www.w3.org/2000/svg"'; // because it is used as <img> src
	s+=' viewBox="0 0 160 112" stroke-linecap="square">';
	s+='<defs>';
	s+='<radialGradient id="rgw4i" cx="33%" cy="33%" r="100%">';
	s+='<stop stop-color="#fff" offset="0"/>';
	s+='<stop stop-color="#ccc" offset="0.5"/>';
	s+='<stop stop-color="#333" offset="1"/>';
	s+='</radialGradient>';
	s+='</defs>';
	s+='<g transform="translate(0,31)">';
	s+='<ellipse cx="80" cy="40" rx="80" ry="40" fill="url(#rgw4i)"/>';
	s+='</g>';
	s+='<g transform="translate(0,21)" stroke="#000" stroke-width="1" stroke-linecap="round">';
	s+='<line x1="80" y1="9" x2="80" y2="1"/>';
	s+='<line x1="80" y1="9" x2="70" y2="1"/>';
	s+='<line x1="80" y1="9" x2="90" y2="1"/>';
	s+='</g>';
	s+='<g transform="translate(0,31)" stroke="#000" stroke-width="1" stroke-linecap="round">';
	s+='<line x1="20" y1="40" x2="60" y2="40"/>';
	s+='<line x1="140" y1="40" x2="100" y2="40"/>';
	s+='<line x1="60" y1="65" x2="100" y2="65"/>';
	s+='</g>';
	s+='<g stroke="#000" stroke-width="1">';
	s+='<line x1="30" y1="111" x2="50" y2="111"/>';
	s+='<line x1="130" y1="111" x2="110" y2="111"/>';
	s+='</g>';
	s+='</svg>';
	return s;
};
mxG.G.prototype.makeAssistantOn=function()
{
	let s="";
	s+='<svg';
	s+=' xmlns="http://www.w3.org/2000/svg"'; // because it is used as <img> src
	s+=' viewBox="0 0 160 112" stroke-linecap="square">';
	s+='<defs>';
	s+='<radialGradient id="rgb4i" cx="33%" cy="33%" r="50%">';
	s+='<stop stop-color="#999" offset="0"/>';
	s+='<stop stop-color="#333" offset="0.5"/>';
	s+='<stop stop-color="#000" offset="1"/>';
	s+='</radialGradient>';
	s+='<radialGradient id="rgw4i" cx="33%" cy="33%" r="100%">';
	s+='<stop stop-color="#fff" offset="0"/>';
	s+='<stop stop-color="#ccc" offset="0.5"/>';
	s+='<stop stop-color="#333" offset="1"/>';
	s+='</radialGradient>';
	s+='</defs>';
	s+='<g transform="translate(0,10)">';
	s+='<ellipse cx="80" cy="40" rx="80" ry="40" fill="url(#rgw4i)"/>';
	s+='<circle cx="40" cy="40" r="20" fill="url(#rgw4i)"/>';
	s+='<circle cx="120" cy="40" r="20" fill="url(#rgw4i)"/>';
	s+='<circle cx="40" cy="40" r="10" fill="url(#rgb4i)"/>';
	s+='<circle cx="120" cy="40" r="10" fill="url(#rgb4i)"/>';
	s+='</g>';
	s+='<g stroke="#000" stroke-width="1" fill="none" stroke-linecap="round">';
	s+='<line x1="80" y1="9" x2="80" y2="1"/>';
	s+='<line x1="80" y1="9" x2="70" y2="1"/>';
	s+='<line x1="80" y1="9" x2="90" y2="1"/>';
	s+='<line x1="30" y1="111" x2="50" y2="111"/>';
	s+='<line x1="50" y1="111" x2="30" y2="100"/>';
	s+='<line x1="30" y1="100" x2="50" y2="89"/>';
	s+='<line x1="130" y1="111" x2="110" y2="111"/>';
	s+='<line x1="110" y1="111" x2="130" y2="100"/>';
	s+='<line x1="130" y1="100" x2="110" y2="89"/>';
	s+='<path d="M 60 70 A 3 1, 180, 0 0, 100 70"/>';
	s+='</g>';
	s+='</svg>';
	return s;
};
mxG.G.prototype.updateLesson=function()
{
	var a=this.getE("LessonDiv"),
		s=this.cN.P.C?this.htmlProtect(this.cN.P.C[0]):"",
		cls="mxLessonDiv";
	s=s.replace(/\n/g,"<br>");
	a.firstChild.innerHTML=s?"<div>"+s+"</div>":"";
	a.lastChild.src=s?this.assistantOnSrc:this.assistantOffSrc;
	if(this.cN.P.BM) cls+=" mxBM";
	else if(this.cN.P.DO) cls+=" mxDO";
	else if(this.cN.P.IT) cls+=" mxIT";
	else if(this.cN.P.TE) cls+=" mxTE";
	a.className=cls;
};
mxG.G.prototype.toggleBalloon=function()
{
	var a=this.getE("LessonDiv");
	if (a.lastChild.src==this.assistantOnSrc)
	{
		a.firstChild.innerHTML="";
		a.lastChild.src=this.assistantOffSrc;
	}
	else
	{
		this.updateLesson();
		// just for fun
		if (a.lastChild.src==this.assistantOffSrc)
			a.lastChild.src=this.assistantOnSrc;
	}
};
mxG.G.prototype.initLesson=function()
{
	var e=this.getE("LessonDiv"),k=this.k;
	e.addEventListener("click",function(ev){
		mxG.D[k].toggleBalloon();},false);
};
mxG.G.prototype.createLesson=function()
{
	var s;
	if(!this.assistantOnSrc)
		this.assistantOnSrc="data:image/svg+xml;base64,"
			+mxG.b64EncodeUnicode(this.makeAssistantOn());
	if(!this.assistantOffSrc)
		this.assistantOffSrc="data:image/svg+xml;base64,"
			+mxG.b64EncodeUnicode(this.makeAssistantOff());
	s="<div class=\"mxLessonDiv\" id=\""+this.n+"LessonDiv\">";
	s+="<div></div>";
	s+="<img width=160 height=112 src=\""+this.assistantOffSrc+"\">";
	s+="</div>";
	return s;
};
}
