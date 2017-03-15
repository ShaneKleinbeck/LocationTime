var today = '';
var input = '';
var lng = '';
var lat = '';
var coordinates = '';
var timezone = '';
var time = '';
var seconds = '';
var minutes = '';
var hour = '';
var secondsDegree = '';
var minutesDegree = '';
var hoursDegree = '';
var digitalTime = '';
var utc = '';
var today = '';

var secondHand = document.querySelector('.second-hand');
var minuteHand = document.querySelector('.min-hand');
var hourHand = document.querySelector('.hour-hand');

// Set Initial State
var utc = moment.utc();
$('#location-time').html(today);

//  Assign Time
var seconds = utc.format('s');
var minutes = utc.format('m');
var hour = utc.format('h');
var digitalTime = utc.format('hh:mm A');

// Assign Degree
var secondsDegree = ((seconds / 60) * 360) + 90;
var minutesDegree = ((minutes / 60) * 360) + 90;
var hourDegree = ((hour / 12) * 360) + 90;

// Style HTML
secondHand.style.transform = `rotate(${secondsDegree}deg)`;
minuteHand.style.transform = `rotate(${minutesDegree}deg)`;
hourHand.style.transform = `rotate(${hourDegree}deg)`;
$('#location-time').html(digitalTime);

// Allow Input To Be Submitted With Enter Character
$('input').keypress(function(e){
   if (e.keyCode == 13 || e.which == 13){
      getLocation();
   };
});

var getLocation = function(){
   // Retrive User Input
   var input = $('#input').val();

   // Push input through google geocoder and retrieve lat and lng
   $.ajax({
      url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + input + '&key=AIzaSyAb4AI5F1gewlQOeBv4hAhOPG8_m0ZK4Pg',
      data: {format: 'json'},
      // Handle Error
      error: function(data, textStatus, xhr){
         if(data.status != 200){
            $('#location-info').append('<h9 style="font-size: 15px;">Cannot Get Weather -- Please Make Sure Location Is Accurate</h9>');
         }
      },
      dataType: 'json',
      // Handle Success
      success: function(data){
         // Define Location Name
         var locationInfo = data['results'][0]['formatted_address'];

         // Define Lat and Lng
         var lng = data['results'][0]['geometry']['location']['lng'];
         var lat = data['results'][0]['geometry']['location']['lat'];
         var coordinates = lat + ',' + lng;

         // *** Send Coordinates Through Dark Sky API and Retrieve Location Time *** //
         $.ajax({
            url: 'https://api.darksky.net/forecast/379c15beaf1957c0afaca05bd48f9423/' + coordinates,
            data: {format: 'json'},
            // Hnadle Error
            error: function(data, textStatus, xhr){
               console.log('Error With Dark Sky', error);
            },
            dataType: 'jsonp',
            // Handle Success
            success: function(data){
               // Get Time Zone From Dark Sky
               var timezone = data['timezone'];

               // Create Date Using MomentJS
               var time = moment.tz(timezone);
         
               // Assign Time
               var seconds = time.format('s');
               var minutes = time.format('m');
               var hour = time.format('h');
               var digitalTime = time.format('hh:mm A');

               // Assign Degree
               var secondsDegree = ((seconds / 60) * 360) + 90;
               var minutesDegree = ((minutes / 60) * 360) + 90;
               var hourDegree = ((hour / 12) * 360) + 90;

               // Style HTML
               secondHand.style.transform = `rotate(${secondsDegree}deg)`;
               minuteHand.style.transform = `rotate(${minutesDegree}deg)`;
               hourHand.style.transform = `rotate(${hourDegree}deg)`;
               $('#location-main').html(locationInfo);
               $('#location-time').html(digitalTime);
               
               $('#input').val('');
            },
            type: 'GET'
         }); // End Dark Sky API
      },
      type: 'GET'
   }); //End Google Geocode API
}; 

var updateTime = function(){

}

