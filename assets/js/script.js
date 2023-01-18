//setup timeslots
function initTimeslots() {
    var row = $('<div>');
    row.attr('class', 'row');
    row.appendTo($('.container'));
    row.css('text-align: center');
    
    //**this needs to use moment.js set time for timeSlot **/
    for (var i = 9; i < 19; i++) {
        //setup time boxes
        var timeSlot = $('<div>');
        timeSlot.attr('class', 'time-block hour col-1');
        timeSlot.css('border-radius','0');
        timeSlot.appendTo($(row));
        timeSlot.text(i);
    
        //setup agenda blocks
        var agenda = $('<textarea>');
        agenda.attr('class', 'future col-9');
        agenda.css({'border-radius':'0','text-align':'left','padding-top':'10px'});
        agenda.attr('contenteditable','true');
        agenda.appendTo($(row));
        
        //setup buttons with icon
        var button = $('<button>');
        button.attr('class', 'time-block saveBtn col-2');
        button.appendTo($(row));
        button.css('border-radius','0 10px 10px 0');
        var icon = $('<i>');
        icon.attr('class', 'fa fa-trash');
        icon.appendTo($(button));
    }
}

initTimeslots();


//function to display current day
function currentDay() {
    $('#currentDay') = momentjsStuff;
}


//function to pick up on click of agenda items
function agendaClick() {

}

// $('.time-block').on('click', agendaClick);