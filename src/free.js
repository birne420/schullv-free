function log(msg) { console.log("[SchulLVFree] " + msg); }

var htmlContainers = new Array();
htmlContainers.push("UnlockContentHintContainer__UnlockHintContainer");
htmlContainers.push("ContentArea__GradientContainer");

log("Addon initialized!");
blockLoop();

function blockLoop() {
	setTimeout(function() {
		if(pageIsStuck()) {
			location.reload();
		}
		if(htmlContainersExists()) {
			emptyHTMLContainers();
		}
		if(!isHeightCorrected()) {
			correctHeight();
		}
		blockLoop();
	}, 500);
}

function pageIsStuck() {
	var h2s = document.getElementsByTagName("h2");
	if(h2s.length >= 1) {
		return true;
	} else {
		return false;
	}
}

function htmlContainersExists() {
	for(var i = 0; i < htmlContainers.length; i++) {
		var htObject = document.querySelectorAll("[class*=" + htmlContainers[i] + "]");
		if(htObject.length != 0) {
			return true;
		}
	}
	return false;
}

function emptyHTMLContainers() {
	for(var i = 0; i < htmlContainers.length; i++) {
		var htObject = document.querySelectorAll("[class*=" + htmlContainers[i] + "]");
		if(htObject.length != 0) {
			htObject[0].innerHTML = "";
			htObject[0].outerHTML = "";
			log("SUCCESS: Blocked " + htmlContainers[i] + "!");
		}
	}
}

function isHeightCorrected() {
	var check = document.getElementById("schullv_free_height_adjust");
	if(check == null) { return false; }
	return true;
}

function correctHeight() {
	var heightCorrectionNode = "HtmlContent__Content";
	var heightCorrection = document.querySelectorAll("[class*=" + heightCorrectionNode + "]");
	if(heightCorrection.length != 0) {
		var heightStyleCorrectionClassName = heightCorrection[0].getAttribute("class").split(" ")[1];
		var manip = document.createElement("style");
		manip.setAttribute("id", "schullv_free_height_adjust");
		manip.innerHTML = "." + heightStyleCorrectionClassName + "{max-height:none;}";
		document.body.appendChild(manip);
		log("SUCCESS: Unlocked content " + heightCorrectionNode + "!");
	}
}