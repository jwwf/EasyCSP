$(document).ready(function() {
	if (Modernizr.touch) {
		$('#main_menu li.has_sub a').click(function(e) {
			if ($(this).parent().hasClass('has_sub')) e.preventDefault();
			var is_open = $(this).parent().hasClass('active');
			$('#main_menu li.active').removeClass('active');
			$(this).parent().toggleClass('active', !is_open);
		});
	} else {
		$("#main_menu li.has_sub").mouseover(function() {
			var obj = $(this);
			obj.addClass("active");
		});
		$("#main_menu li.has_sub").mouseout(function() {
			var obj = $(this);
			obj.removeClass('active');
			obj.find('ul').prepareTransition();
		});
		$("#main_menu li.has_sub>a").click(function() {
			return false;
		});
	}
	$('#menu_hide,#menu_show').click(function(e) {
		$('#header').toggleClass('compact');
		$("#message_box").toggle();
		mvcf_update_menu_cookie();
	});
	$('.help').on("click", ".tooltip", function() {
		$('.tooltip.visible').removeClass("visible");
		$(this).find(".tooltip").toggleClass("visible");
	});
	$('.tooltip').on("click", ".close", function() {
		$(this).parent().removeClass("visible");
		return false;
	});
	$('.popup .buttons').on("click", "a", function() {
		if ($('body').has('.shader')) {
			$('.shader').remove();
		}
		$("body").removeAttr("style");
	});
});
if ($('html').is(".ie8")) {
	head.js("selectivizr.js");
}

function mvcf_update_menu_cookie() {
	name = 'mvcf_menu_hide';
	cookie_val = parseInt(mvcf_read_cookie(name));
	mvcf_set_cookie(name, cookie_val + 1, '/', '', '');
};

function mvcf_set_cookie(name, value, path, domain, secure) {
	// Set time to absolute zero.
	exp = new Date();
	base = new Date(0);
	skew = base.getTime();
	if (skew > 0) exp.setTime(exp.getTime() - skew);
	exp.setTime(exp.getTime() + (15 * 24 * 60 * 60 * 1000)); // 15 days
	expires = exp;
	document.cookie = name + "=" + escape(value) + ((expires) ? "; expires=" + expires.toGMTString() : "") + ((path) ? "; path=" + path : "") + ((domain) ?
		"; domain=" + domain : "") + ((secure) ? "; secure" : "");
};

function mvcf_read_cookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return 0;
}

function mvcf_alert(message) {
	$('#app_alert_message').html(message);
	$('#app_alert').show();
};

function getPopup() {
	if ($('body').has('.shader')) {
		popupHeight = $('.shader>.popup').height();
		winHeight = $(window).height();
		if (winHeight > popupHeight) {
			bodyHeight = winHeight + "px";
		} else {
			bodyHeight = popupHeight + 50 + "px";
		}
		$('body').css({
			'overflow': 'hidden',
			'height': bodyHeight
		});
		$('.shader').height(bodyHeight);
	}
}

function PopupRefocus() {
	if ($('body').has('.shader')) {
		popupHeight = $('.shader>.popup').height();
		winHeight = $(document).height();
		if (winHeight > popupHeight) {
			bodyHeight = winHeight + "px";
		} else {
			bodyHeight = popupHeight + 50 + "px";
		}
		//$('body').css({'overflow': 'hidden', 'height': bodyHeight});
		$('.shader').height(bodyHeight);
	}
}

function mvcf_hidePopup() {
	if ($('body').has('.shader')) {
		$('.shader').remove();
		$('body').css({
			'overflow': 'visible',
			'height': '100%'
		});
	}
}

function mvcf_confirm(message, url) {
	$('body').append('<div class="shader"><div id="dialog" class="dialog"><p>' + message +
		'</p><div class="buttons"><input class="blue" type="button" value="Yes" onclick="location.replace(\'' + url +
		'\');"><input class="red" type="button" value="No" onclick="mvcf_hidePopup();"></div></div>');
	getPopup();
	return false;
};

function disabledEventPropagation(event) {
	if (event.stopPropagation) {
		event.stopPropagation();
	} else if (window.event) {
		window.event.cancelBubble = true;
	}
}

function MM_showHideLayers() { //v9.0
	var i, p, v, obj, args = MM_showHideLayers.arguments;
	for (i = 0; i < (args.length - 2); i += 3) with(document) if (getElementById && ((obj = getElementById(args[i])) != null)) {
		v = args[i + 2];
		if (obj.style) {
			obj = obj.style;
			v = (v == 'show') ? 'visible' : (v == 'hide') ? 'hidden' : v;
		}
		obj.visibility = v;
	}
}

function MM_jumpMenu(targ, selObj, restore) { //v3.0
	eval(targ + ".location='" + selObj.options[selObj.selectedIndex].value + "'");
	if (restore) selObj.selectedIndex = 0;
}

function helpwindow(helpcontent) {
	var content = document.getElementById(helpcontent);
	content.style.visibility = (content.style.visibility == "visible") ? "hidden" : "visible";
}