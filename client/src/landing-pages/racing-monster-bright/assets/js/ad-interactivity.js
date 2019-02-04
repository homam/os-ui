window.addEventListener("load", function(){
	
	document.getElementById("container").classList.remove("preload");
	
	
	setTimeout(function(){
	
		document.getElementById("monster").classList.add("slideInRight");
		
		
		setTimeout(function(){

			document.getElementById("msg").classList.add("fadeIn");
			document.querySelector(".btn").classList.add("pulse");	
		
		}, 500)
	
	}, 1000)



},false);