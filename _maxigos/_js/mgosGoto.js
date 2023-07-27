// maxiGos v8 > mgosGoto.js
if(!mxG.G.prototype.createGoto)
{
mxG.fr("Go to ...","Aller à ...");

mxG.G.prototype.doKeyupGotoInput=function()
{
	let k;
	let aN=this.cN;
	let n=parseInt(this.getE("GotoInput").value);
	if(isNaN(n)) n=0;
	k=Math.max(0,this.getAsInTreeNum(aN));
	if(k<n) while(this.kidOnFocus(aN))
	{
		k=Math.max(0,this.getAsInTreeNum(aN));
		if(k>=n) break;
		aN=this.kidOnFocus(aN);
	}
	else if(k>n) while(aN.P&&(aN.P.B||aN.P.W))
	{
		k=Math.max(0,this.getAsInTreeNum(aN));
		if(k<=n) break;
		aN=aN.Dad;
	}
	this.backNode(aN);
	this.updateAll();
};
mxG.G.prototype.doInputGotoBox=function(ev)
{
	if(this.gotoBoxOn)
	{
		let ko,k1=0,aN=this.rN;
		this.inGoto=1;
		ko=ev.target.value;
		aN=this.kidOnFocus(this.rN);
		while(this.kidOnFocus(aN)&&(k1<ko)) {k1++;aN=this.kidOnFocus(aN)};
		this.backNode(aN);
		this.updateAll();
		this.inGoto=0;
	}
};
mxG.G.prototype.addGotoInput=function()
{
	// used by Navigation component
	let k=this.k,
		i=document.createElement("input"),
		e=this.getE("NavigationDiv");
	i.title=this.local("Go to ...");
	i.type="text";
	i.maxLength="3";
	i.id=this.n+"GotoInput";
	i.value=0;
	i.addEventListener("keyup",function(ev){mxG.D[k].doKeyupGotoInput();});
	i.classList.add("mxGotoInput");
	e.appendChild(i);
};
mxG.G.prototype.updateGotoInput=function()
{
	let e=this.getE("GotoInput"),ko,k1=e.value;
	// better to set ko to "" when no number (for instance when numbering doesn't start from 1)
	if(!this.cN.P||!(this.cN.P.B||this.cN.P.W)) ko="";
	else ko=this.getAsInTreeNum(this.cN);
	if(ko!=k1) e.value=ko;
};
mxG.G.prototype.updateGotoBox=function()
{
	let ko=0,kn=0,aN,e;
	aN=this.kidOnFocus(this.rN);
	while(aN=this.kidOnFocus(aN)) {kn++;if(aN==this.cN) ko=kn;}
	if(!kn) kn=1;
	e=this.getE("GotoDiv").querySelector('input');
	e.setAttribute("max",kn);
	e.value=ko;
};
mxG.G.prototype.updateGoto=function()
{
	if(this.gotoInputOn) this.updateGotoInput();
	if(this.gotoBoxOn&&!this.inGoto) this.updateGotoBox();
};
mxG.G.prototype.initGoto=function()
{
	if(this.gotoBoxOn)
	{
		let k=this.k,e=this.getE("GotoDiv").querySelector('input');
		e.addEventListener("input",function(ev){mxG.D[k].doInputGotoBox(ev);});
	}
};
mxG.G.prototype.createGoto=function()
{
	let s="",t=this.local("Go to ...");
	this.gotoBoxOn=this.setA("gotoBoxOn",0,"bool");
	this.gotoInputOn=0; // set in this.initNavigation()
	if(this.gotoBoxOn)
	{
		s+="<div class=\"mxGotoDiv\" id=\""+this.n+"GotoDiv\">";
		s+="<input type=\"range\" step=\"1\" min=\"0\" max=\"1\" title=\""+t+"\">";
		s+="</div>";
	}
	return s;
};
}
