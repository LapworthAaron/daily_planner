//declare object used for localStorage
var agendaArray = 
    {"9AM": "",
    "10AM": "",
    "11AM": "",
    "12AM": "",
    "1PM": "",
    "2PM": "",
    "3PM": "",
    "4PM": "",
    "5PM": ""}

//initialise page with contents
init();
$('.time-block').on('click', saveAgenda);

//setup timeslots
function init() {
    currentDay();

    //create a new div for bootstrap rows
    var row = $('<div>');
    row.attr('class', 'row');
    row.appendTo($('.container'));
    row.css({'margin-bottom': '50px'});
    
    //loop though times and create the timebox div, agenda textarea and save button
    for (var i = 9; i < 18; i++) {
        //setup time boxes and their attributes
        var timeSlot = $('<div>');
        timeSlot.attr({'class': 'time-block hour col-1',
                        'id': 'time_' + i});
        timeSlot.css({'border-radius': '0',
                      'text-align': 'left',
                      'padding': '40px 0 0 5px'});
        timeSlot.appendTo($(row));
        //display i as a time in the timeSlot div i.e 16 -> 4PM 
        timeSlot.text(moment().hour(i).minute(0).second(0).format("hA"));
    
        //setup agenda blocks and their attributes
        var agenda = $('<textarea>');
        agenda.css({'border-radius':'0',
                    'text-align':'left',
                    'padding-top':'10px'});
        agenda.attr({'contenteditable':'true',
                    'id': 'agenda_' + i,
                    'placeholder': 'Add Agenda items here'});
        agenda.appendTo($(row));

        //set agenda colour based on time of day
        var currentTime = moment().minute(0).second(0);
        if (moment().hour(i).minute(0).second(0).format("HA") ===
            currentTime.format("HA")) {
            agenda.attr('class', 'present col-10');
        } else if (moment().hour(i).minute(0).second(0) <
                    currentTime) {
                agenda.attr('class', 'past col-10'); 
            } else {
                agenda.attr('class', 'future col-10'); 
        }

        //get agenda text values from local storage
        getAgendas();

        //setup buttons with icon
        var button = $('<button>');
        button.attr('class', 'time-block saveBtn col-1');
        button.appendTo($(row));
        button.css('border-radius','0 10px 10px 0');
        //add icon of floppy disk in the button
        var icon = $('<i>');
        icon.attr('class', 'fa fa-save');
        icon.appendTo($(button));
    }
    return;
}

//function to display current day
function currentDay() {
    $('#currentDay').text(moment().format("dddd Do MMMM YYYY"));
}

//funtion to get local storage values if they exist
function getAgendas() {
    if (localStorage.getItem("agendaItems")) {
        agendaArray =  JSON.parse(localStorage.getItem("agendaItems"));
        for (var i = 9; i < 18; i++) {
            var timeSlot = $('#time_' + i);
            hourName = moment().hour(i).minute(0).second(0).format("hA");
            timeSlot.next().val(agendaArray[hourName]);
        }
        return;
    } else {
        return;
    }
}

//funtion to add values to local storage
function addAgendas(agendaTime, agendaValue) {
    if (getAgendas() != undefined) {
        agendaArray = getAgendas();
        agendaArray[agendaTime] = agendaValue;
    } else {
        agendaArray[agendaTime] = agendaValue;
    }
    localStorage.setItem("agendaItems", JSON.stringify(agendaArray));
}

//save item to local storage
function saveAgenda(event) {
   //if they click the icon then go to the button parent and use prev to read the time and agenda
    if (event.target.nodeName == 'I') {
        var val = $(event.target).parent().prev().val();
        var time = $(event.target).parent().prev().prev().text();
        addAgendas(time, val);
    } else {
        // if they click the button use prev to read the time and agenda
        var val = $(event.target).prev().val();
        var time = $(event.target).prev().prev().text();
        addAgendas(time, val);
    }
    getAgendas();
}