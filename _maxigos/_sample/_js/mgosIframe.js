// add this script to the end of a page inserted in an iframe
// to resize iframe height on the fly
(function()
{
	if (window.frameElement)
	{
		// automatically update iframe height
		var magic=function()
		{
			// update iframe height
			window.frameElement.style.height=document.body.scrollHeight+"px";
		}
		// iframe height is updated in 2 cases
		//  when some elements are added to or remove from iframe content
		//  when the size of the iframe changes
		var o=new MutationObserver(magic);
		o.observe(document.body,{attributes:true,childList:true,subtree:true});
		window.addEventListener("resize",magic);
	}
})();
