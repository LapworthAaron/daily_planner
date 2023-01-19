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
        timeSlot.text(moment().hour(i).minute(0).second(0).format("HA"));
    
        //setup agenda blocks
        var agenda = $('<textarea>');
        agenda.css({'border-radius':'0','text-align':'left','padding-top':'10px'});
        agenda.attr('contenteditable','true');
        agenda.appendTo($(row));
        //set agenda colour based on time of day
        if (moment().hour(i).minute(0).second(0).format("HA") ===
            moment().minute(0).second(0).format("HA")) {
                agenda.attr('class', 'present col-9');
        } else if (moment().hour(i).minute(0).second(0) <
                    moment().minute(0).second(0)) {
                        agenda.attr('class', 'past col-9'); 
                } else {
                    agenda.attr('class', 'future col-9'); 
                }

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
//TODO: moment.js stuff
function currentDay() {
    $('#currentDay').text(moment().format("dddd Do MMMM YYYY H"));
}
currentDay();


//function for setting classes of agenda items based on time
//TODO: 
function agendaClick() {
    $('#currentDay').text(moment().format("H"));
}




// $('.time-block').on('click', agendaClick);