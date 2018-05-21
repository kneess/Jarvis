$(function() {
$("#results").hide();
$(".jarvisnav").hide()

$("#submit-info").on("click", function(event) {
    $("#welcome").hide();
    $(".jarvisnav").show();
        
    event.preventDefault();

    

    let street = $("#street1_id").val().trim();
    let city = $("#city_id").val().trim();
    let state = $("#state_id").val().trim();
    let zip = $("#zip_id").val().trim();
    
    let fullAddress = street + " " + city + " " + state + " " + zip;

    let procedure = $("#select-list").val(); 
    let radius = $("#select-radius").val(); 

    console.log(zip)
    console.log(procedure);
    console.log(radius)
    
    sessionStorage.clear();
    sessionStorage.setItem("fulladdress", fullAddress)
    sessionStorage.setItem("street", street);
    sessionStorage.setItem("city",city);
    sessionStorage.setItem("state",state);
    sessionStorage.setItem("zip",zip);
    sessionStorage.setItem("radius",radius);

    findLocalZips(zip);
    findRadiusZips(zip);
    
    
    });

    function findLocalZips() {

        $.ajaxPrefilter(function(options) {
            if (options.crossDomain && $.support.cors) {
                options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
            }
        });
         
        let ZIPAPIKEY = "6xsv3It4NIGhyQONSzZtJzG35hXBHQg6JJIqO6B7jnv6S8PlAkadIbi6Pg56RUQ2";
        let userZip = sessionStorage.getItem("zip");
        console.log(userZip);
        let queryURL = "https://www.zipcodeapi.com/rest/"+ZIPAPIKEY+"/radius.json/"+userZip+"/20/miles?minimal"
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
          }) 
          .then(function(response) {
          console.log('zippy zips', response);
          let zipArray = response.zip_codes;

          $.ajax("/api", {
            type: "POST",
            data: {"zips":zipArray}
          }).then(function(res) {
            console.log(res);
          })
        });
    }

    function findRadiusZips() {
        $.ajaxPrefilter(function(options) {
            if (options.crossDomain && $.support.cors) {
                options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
            }
        });
      
        let ZIPAPIKEY = "6xsv3It4NIGhyQONSzZtJzG35hXBHQg6JJIqO6B7jnv6S8PlAkadIbi6Pg56RUQ2";
        let userZip = sessionStorage.getItem("zip");
        let userRadius = sessionStorage.getItem("radius");
        console.log(userZip);
        let queryURL = "https://www.zipcodeapi.com/rest/"+ZIPAPIKEY+"/radius.json/"+userZip+"/" + userRadius + "/miles?minimal"
        
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
          }) 
          .then(function(response) {
          console.log(response);
          let radiusZipArray = response.zip_codes;

          $.ajax("/api", {
            type: "POST",
            data: {"zips":radiusZipArray}
          }).then(function(res) {
          
            $("#results").show();
            console.log(res);
            let hospitalAddress = [];
            let hospitalCost = [];

            for (let i = 0; i < 6; i++){
            hospitalCost[i] = parseFloat(res[i].cost);
            hospitalAddress[i] = res[i].address + "+" + res[i].city + "+" + res[i].state + "+" + res[i].zip_code;
            console.log(hospitalAddress[i]);
            getDistance(hospitalAddress[i], i, hospitalCost[i]);
    
            };
            
            let hospitalIds =[];
            for (let i = 0; i <res.length; i++){
               
                $("#results"+i).text(res[i].hospital_name);
                $("#cost"+i).text("Cost of Procedure:  $" + res[i].cost);
                $("#address"+i).text(res[i].address);
                $("#city"+i).text(res[i].city + ", " + res[i].state + " " + res[i].zip_code);
                hospitalIds.push(res[i].id)
                
                console.log("Hospital Name: " + res[i].hospital_name);
                console.log("Hospital Id: " + res[i].id)
            };
            console.log("The total hostpital ids are: " + hospitalIds );
           

          })
        });
    }

    let MQaddress = sessionStorage.getItem("fulladdress");
    console.log(MQaddress);
    function getDistance(hospitalAddress, i, hospitalCost) {
    
        $.ajaxPrefilter(function(options) {
            if (options.crossDomain && $.support.cors) {
                options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
            }
        });
    
        let MQAPIKey = "UVs4ACBHVSdUdsBxF6ZcdIv1OSmOsM61";
        let MQaddress = sessionStorage.getItem("fulladdress");
        console.log(MQaddress);
        let queryURL= "http://www.mapquestapi.com/directions/v2/route?key="+MQAPIKey+"&from="+MQaddress+"&to="+hospitalAddress
    
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
          })
          .then(function(response) {
           let totalDistance =  JSON.stringify(response.route.distance);
           //rounds the distance to the nearest whole number
           let distance = Math.ceil(totalDistance);
           console.log(distance);
           let costToDrive = ((distance * .545) * 2).toFixed(2);
           console.log(costToDrive);
           $("#distance"+i).text("Distance: " + distance + " miles");
           $("#drive_cost"+i).text(" Cost to drive: $" + costToDrive);
           let totalCost = parseFloat(hospitalCost) + parseFloat(costToDrive)
           $("#totalCost"+i).text("Total Cost: $" + totalCost);
           
          });
        }


});

// var radioValsArr = [];
// $('input[name=inlineRadioOptions]:checked').each(function(){
//   radioValsArr.push($(this).val());
// });