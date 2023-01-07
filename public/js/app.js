"use strict";

let apiUrl = "http://localhost:3030";

function deleteEvent (id) {
  fetch(apiUrl + '/raspored/' + id, {
    method: 'PATCH', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      visible: 0
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      Swal.fire({
        icon: 'success',
        title: 'Your event has been deleted',
        showConfirmButton: false,
        timer: 1500,
        willClose: () => {
          getDataScheduler()
        }
      });
      console.log('Success:', data);
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.responseText
      })
      console.error('Error:', error);
    });
}

function setEvent(title, start, end){
  fetch(apiUrl + '/raspored', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        title: title,
        start: start,
        end: end
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      Swal.fire({
        icon: 'success',
        title: 'Your event has been saved',
        showConfirmButton: false,
        timer: 1500,
        willClose: () => {
          // window.location = window.location.href;
          getDataScheduler()
        }
      });
      console.log('Success:', data);
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.responseText
      })
      console.error('Error:', error);
    });
}

function getDataScheduler(){
  fetch(apiUrl + '/raspored?$limit=20000&$sort[createdAt]=-1&visible=1')
    .then((response) => response.json())
    .then((data) => {
      renderCalendar(data.data)
    });
}

function getLastExpenses(){
  let tableBody = document.getElementsByClassName('tableBody')[0]
  fetch(apiUrl + '/trosak?$limit=10&$sort[createdAt]=-1')
    .then((response) => response.json())
    .then((data) => {
      data.data.forEach(d => {
        let tr = document.createElement('tr')

        let td1 = document.createElement('td')
        td1.innerHTML = new Date(d.createdAt).toLocaleString("sr-RS", { timeZone: 'Europe/Belgrade' });
        let td2 = document.createElement('td')
        td2.classList.add('bold')
        td2.innerHTML = d.iznos;
        let td3 = document.createElement('td')
        td3.innerHTML = d.komentar;

        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)

        tableBody.appendChild(tr)
      })
    });
}

function renderCalendar(dataScheduler){
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

}


window.addEventListener("load", function () {
    let showAmount = document.getElementsByClassName('showAmount')[0]
    let sumaDisplay = document.getElementsByClassName('sumaDisplay')[0]

    showAmount.addEventListener("click", function (e){
      sumaDisplay.classList.toggle("hidden")
    })

   getLastExpenses()
   getDataScheduler()

  $('#timepicker').timepicker();

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(function(reg){
            }).catch(function(err) {
            console.log("Service worker didn't register. This happened: ", err)
        });
    }

});
