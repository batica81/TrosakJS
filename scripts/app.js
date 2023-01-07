"use strict";

let apiUrl = "index.php";


function setEvent (title, start, end) {
    $.ajax({
        url: apiUrl,
        method: "POST",
        contentType: 'application/x-www-form-urlencoded',
        data: {
            title: title,
            start: start,
            end: end
        },
        success:
            function () {
                Swal.fire({
                    icon: 'success',
                    title: 'Your event has been saved',
                    showConfirmButton: false,
                    timer: 1500,
                    willClose: () => {
                        window.location = window.location.href;
                    }
                });

            },
        error:
            function (e) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: e.responseText
                })
            }
    });
}

function deleteEvent (id) {
    $.ajax({
        url: apiUrl,
        method: "POST",
        contentType: 'application/x-www-form-urlencoded',
        data: {
            id: id,
            delete: "true"
        },
        success:
            function () {
                Swal.fire({
                    icon: 'success',
                    title: 'Your event has been deleted',
                    showConfirmButton: false,
                    timer: 1500,
                    willClose: () => {
                        window.location = window.location.href;
                    }
                });
            },
        error:
            function (e) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: e.responseText
                })
            }
    });
}

window.addEventListener("load", function () {

    let showAmount = document.getElementsByClassName('showAmount')[0]
    let sumaDisplay = document.getElementsByClassName('sumaDisplay')[0]

    showAmount.addEventListener("click", function (e){
        sumaDisplay.classList.toggle("hidden")
    })

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(function(reg){
            }).catch(function(err) {
            console.log("Service worker didn't register. This happened: ", err)
        });
    }

    $('#timepicker').timepicker();

    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        // put your options and callbacks here
        defaultView: 'month',
        firstDay: 1,
        events: dataScheduler,

        eventClick: function(event){
            Swal.fire({
                title: "Delete event: " + event.event._def.title +" ?" ,
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    deleteEvent(event.event._def.publicId);
                }
            })
        }
    });
    calendar.render();

    $('#calendar table').first().addClass('table');

    let clickedDate = "";

    calendar.on('dateClick', function(info) {
        console.log('clicked on ' + info.dateStr);

        clickedDate = info.dateStr;
        $('#myModal').modal('show');
    });

    $('#btnReminder').click(function (e) {
        e.preventDefault();
        setEvent($('#title').val(), clickedDate + ' ' +$('.ui_tpicker_time_input').val() +':00', clickedDate + ' ' +$('.ui_tpicker_time_input').val() +':00');
    });

});
