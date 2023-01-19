var agendaArray = 
    {"9AM": "",
    "10AM": "",
    "11AM": "",
    "12AM": "",
    "1PM": "",
    "2PM": "",
    "3PM": "",
    "4PM": "",
    "5PM": "",
    "6PM": ""}

init();

//setup timeslots
function init() {
    currentDay();

    var row = $('<div>');
    row.attr('class', 'row');
    row.appendTo($('.container'));
    row.css({'text-align': 'center',
            'margin': '50px'});
    
    //**this needs to use moment.js set time for timeSlot **/
    for (var i = 9; i < 19; i++) {
        //setup time boxes
        var timeSlot = $('<div>');
        timeSlot.attr('class', 'time-block hour col-1');
        timeSlot.attr('id', 'time_' + i);
        timeSlot.css({'border-radius': '0',
                      'text-align': 'left',
                      'padding': '40px 0 0 5px'});
        timeSlot.appendTo($(row));
        timeSlot.text(moment().hour(i).minute(0).second(0).format("hA"));
    
        //setup agenda blocks
        var agenda = $('<textarea>');
        agenda.css({'border-radius':'0','text-align':'left','padding-top':'10px'});
        agenda.attr('contenteditable','true');
        agenda.attr('id', 'agenda_' + i);
        agenda.appendTo($(row));
        //set agenda colour based on time of day
        if (moment().hour(i).minute(0).second(0).format("HA") ===
            moment().minute(0).second(0).format("HA")) {
                agenda.attr('class', 'present col-10');
        } else if (moment().hour(i).minute(0).second(0) <
                    moment().minute(0).second(0)) {
                        agenda.attr('class', 'past col-10'); 
                } else {
                    agenda.attr('class', 'future col-10'); 
                }

        //get values from local storage
        getAgendas();

        //setup buttons with icon
        var button = $('<button>');
        button.attr('class', 'time-block saveBtn col-1');
        button.appendTo($(row));
        button.css('border-radius','0 10px 10px 0');
        var icon = $('<i>');
        icon.attr('class', 'fa fa-save');
        icon.appendTo($(button));
    }
}

//function to display current day
function currentDay() {
    $('#currentDay').text(moment().format("dddd Do MMMM YYYY"));
}

//funtion to get local storage values
function getAgendas() {
    if (localStorage.getItem("agendaItems")) {
        agendaArray =  JSON.parse(localStorage.getItem("agendaItems"));
        for (var i = 9; i < 19; i++) {
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
        // tempAgenda.push({time: value});
        agendaArray[agendaTime] = agendaValue;
    } else {
        // tempAgenda.push({time: value});
        agendaArray[agendaTime] = agendaValue;
    }
    localStorage.setItem("agendaItems", JSON.stringify(agendaArray));
}

//save item
function saveAgenda(event) {
    // $(event.target).siblings('.col-9').empty();
    if (event.target.nodeName == 'I') {
        var val = $(event.target).parent().prev().val();
        var time = $(event.target).parent().prev().prev().text();
        addAgendas(time, val);
    } else {
        var val = $(event.target).prev().val();
        var time = $(event.target).prev().prev().text();
        addAgendas(time, val);
    }
    getAgendas();
}

$('.time-block').on('click', saveAgenda);