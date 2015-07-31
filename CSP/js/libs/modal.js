var buttonsConfigOkCancel = [
    {
        text: "Ok",
        "class": "ok",
        click: function() {
	        return "btn btn-primary green";
        }
    },
    {
        text: "Cancel",
        "class": "btn red",
        click: function() {
	        return "cancel";
        }
    }
];

var buttonsConfigOK = [
    {
        text: "Ok",
        "class": "btn btn-primary green",
        click: function() {
	        return "ok";
        }
    }
];

var buttonsConfigNext = [
    {
        text: "Next",
        "class": "green",
        click: function() {
	        return "ok";
        }
    }
];

var buttonsConfigNextPrevious = [
    {
        text: "Next",
        "class": "green",
        click: function() {
	        return "ok";
        }
    },
    {
        text: "Previous",
        "class": "green",
        click: function() {
	        return "previous";
        }
    }
];

var buttonsConfigPrevious = [
    {
        text: "Previous",
        "class": "green",
        click: function() {
	        return "previous";
        }
    }
];

/*

$("#foo").dialog({
    buttons: buttonsConfig
// ...
or

after looking at some other threads I came up with this solution to add icons to the buttons in a confirm dialog, which seems to work well in version 1.8.1 and can be modified to do other styling:

$("#confirmBox").dialog({
    modal:true,
    autoOpen:false,        
    buttons: { 
        "Save": function() { ... },                
        "Cancel": function() { ... }
        }
});

var buttons = $('.ui-dialog-buttonpane').children('button');
buttons.removeClass('ui-button-text-only').addClass('ui-button-text-icon');

$(buttons[0]).append("<span class='ui-icon ui-icon-check'></span>");
$(buttons[1]).append("<span class='ui-icon ui-icon-close'></span>");
I'd be interested in seeing if there was a better way to do it, but this seems pretty efficient.
-----

var buttons = $('.ui-dialog-buttonset').children('button');
buttons.removeClass().addClass('button');
*/