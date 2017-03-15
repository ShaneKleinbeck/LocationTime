var input = '';
var lng = '';
var lat = '';
var coordinates = '';
var timeStamp = '';
var time = '';
var seconds = '';
var minutes = '';
var hour = '';
var secondsDegree = '';
var minutesDegree = '';
var hoursDegree = '';

var secondHand = document.querySelector('.second-hand');
var minuteHand = document.querySelector('.min-hand');
var hourHand = document.querySelector('.hour-hand');

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
         // Define Lat and Lng
         var lng = data['results'][0]['geometry']['location']['lng'];
         var lat = data['results'][0]['geometry']['location']['lat'];
         var coordinates = lat + ',' + lng;
         console.log(coordinates);

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
               console.log(data['currently']['time']);
               // Get Time Stamp From Dark Sky
               var timeStamp = data['currently']['time'];

               // Create Date Using MomentJS
               var time = moment.unix(timeStamp);
               console.log(time);
         
               // Assign Time
               var seconds = time.format('s');
               var minutes = time.format('m');
               var hour = time.format('h');

               // Assign Degree
               var secondsDegree = ((seconds / 60) * 360) + 90;
               var minutesDegree = ((minutes / 60) * 360) + 90;
               var hourDegree = ((hour / 12) * 360) + 90;

               // Style HTML
               secondHand.style.transform = `rotate(${secondsDegree}deg)`;
               minuteHand.style.transform = `rotate(${minutesDegree}deg)`;
               hourHand.style.transform = `rotate(${hourDegree}deg)`;
               
               $('#input').val('');
            },
            type: 'GET'
         }); // End Dark Sky API
      },
      type: 'GET'
   }); //End Google Geocode API
}; 
