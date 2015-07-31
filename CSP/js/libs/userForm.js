$(function() {

	$("#username").focus();

	$("#cpassword").prop("required",1);
	
	$("#email").prop("required",1);
	$("#firstname").prop("required",1);
	$("#lastname").prop("required",1);

	$("#registersubmit").click(
		function() {

			if (validator.numberOfInvalids() > 0) {
				$("#msgs").append("<p>Please correct the errors indicated in the form below.</p>");
				validator.showErrors();
				err = true;
			}

			var emailAddress = $("#email").val();
			var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			var username = $("#username").val();
			var uPass = $("#upassword").val();
			var cPass = $("#cpassword").val();
			var firstName = $("#firstname").val();
			var lastName = $("#lastname").val();
			var err = false;
			
			var submitType = $("registersubmit").val()

			$("#formErrorSummary").hide();
			$("#msgs").empty();

			if ((submitType == "Register") && (emailAddress.length === 0)) {
				$("#msgs").append("<p>Please enter your email address or user name.</p>");
				err = true;
			}

			if (uPass.length === 0) {
				$("#msgs").append("<p>Please enter your password.</p>");
				$("#upassword").focus();
				err = true;
			}


			if (!emailReg.test($("#email").val())) {
				$("#msgs").append("Invalid address format");
				err = true;
			}

			if (username.length === 0) {
				$("#msgs").append("<p>Please choose a user ID.</p>");
				err = true;
			}

			if (cPass.length === 0) {
				$("#msgs").append("<p>Repeat password can not be blank.</p>");
				err = true;
			}

			if (firstName.length === 0) {
				$("#msgs").append("<p>First name can not be blank.</p>");
				err = true;
			}

			if (lastName.length === 0) {
				$("#msgs").append("<p>Last name can not be blank.</p>");
				err = true;
			}

			// Figure out what route to use. The button legend changes with the form purpose.
			submitButtonLegend = $("#registersubmit").val();
			submitURL = $("#mobile-form").prop("action")
			if (submitButtonLegend == "create") {
				submitURL = submitURL.replace(/create/gi, "update")
			} else {
				submitURL = submitURL.replace(/update/gi, "create")
			}
			
			$("#mobile-form").prop("action", submitURL);
			
			if (err !== true) {
				$("#mobile-form").submit();
			} else {
				$("#msgs").attr("class", "errorSummary");
				$("#msgs").show();
			}
			
			return false;
		}
	);

	$("#email").blur(function() {
		if (!$("#email").val()) {
			$("#email").focus();
			return false;
		}

		// A registered user may enter either a user ID or their email address. If this
		// is a new user's registration, only a valid email address may be used in the
		// emailaddress blank.
		if (!$("#newuser").is(":visible")) {
			return false;
		}

		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		if (!emailReg.test($("#email").val())) {
			$("#msgs").empty();
			$("#msgs").append("Invalid address format");
			$("#msgs").show();
			$("#formErrorSummary").show();
			$("#email").focus();
			return false;
		} else {
			$("#msgs").empty();
			$("#msgs").hide();
			$("#formErrorSummary").hide();
			$("#upassword").prop("disabled", false);
			if (("#newuser").is(":visible")) {
				$("#upassword").prop("disabled", false);
			}
			$("#email").focus();
			return false;
		}
	}); // blur

}); // main function