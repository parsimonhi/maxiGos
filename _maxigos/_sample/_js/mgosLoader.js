// maxiGos v7 > mgosLoader.js
// special thanks to Lao Lilin, the first to adapt maxiGos code in order to use a loader

// load maxigos several times to display sgf stored in several targets
// a target is a html tag that has a data-maxigos attribute
// the value of the attribute indicates which maxigos configuration and theme to use
// the value is the concatenation of the configuration and the theme, separated by a comma
// the target must also contains a sgf filename or sgf record
// in its content or as value of a data-maxigos-sgf attribute
// default configuration is "Basic", default theme is "Minimalist"
// you can change these values by modifying parameters on the last line of this code
// mgosLoader.js replace each target content found in the page by a sgf viewer
(function(defaultConfig,defaultTheme,scriptType)
{
	// scriptType can be "maker" (php) or "alone" (js)
	// maxigos scripts are js scripts
	// or php scripts which generate js scripts
	// assume maxigos scripts are in theme+"/_"+scriptType+"/" folder
	function loader(f,q)
	{
		var xhr=new XMLHttpRequest();
		xhr.q=q;
		xhr.onreadystatechange=function()
		{
			var s,a,b;
			if ((xhr.readyState==4)&&(xhr.status==200))
			{
				s=xhr.responseText;
				a="mxG.D[mxG.K].start();";
				b="mxG.D[mxG.K].a.t=document.getElementById('"+xhr.q+"');";
				window.eval(s.replace(a,b+a));
			}
		};
		xhr.open("POST",f,true);
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xhr.send();
	}
	var k,km,s,p,q,u,f,t,c,d={},a,b,config,theme,list;
	list=document.querySelectorAll("[data-maxigos]");
	km=list.length;
	d.config=[];
	d.theme=[];
	d.target=[];
	for(k=0;k<km;k++)
	{
		a=list[k].getAttribute("data-maxigos");
		if(a) b=a.split(",");else b=[];
		if(b&&b[0]) config=b[0];else config=defaultConfig;
		d.config[k]=config.trim();
		if(b&&b[1]) theme=b[1];else theme=defaultTheme;
		d.theme[k]=theme.trim();
		if(!list[k].id) list[k].id=Date.now()+""+k;
		d.target[k]=list[k].id;
	}
	d.km=km;
	s=document.getElementsByTagName('script');
	u=new URL(s[s.length-1].src);
	p=u.pathname.split('?')[0]; // remove query if any
	p=p.split("/").slice(0,-1).join("/")+"/"; // remove file name
	p=p.substring(0,p.length-4); // remove "_js/"
	km=d.km;
	for (k=0;k<km;k++)
	{
		t=d.theme[k];
		t=t.charAt(0).toLowerCase()+t.slice(1);
		if(t=="neoClassic") t="neo-classic";
		c=d.config[k].toLowerCase();
		if(scriptType=="alone")
		{
			f=p+t+"/_alone/maxigos-"+t+"-"+c+".js";
		}
		else f=p+t+"/_maker/"+c+".php";
		q=d.target[k];
		loader(f,q);
	}
})("Basic","Minimalist","maker");
