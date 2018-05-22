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

            $("#results0").text(res[0].hospital_name);
            $("#cost0").text("Cost of Procedure:  $" + res[0].cost);
            $("#address0").text(res[0].address);
            $("#city0").text(res[0].city + ", " + res[0].state + " " + res[0].zip_code);
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
            $(".save-btn").on("click",()=>{
                console.log("The user would like to save their options");
            })
            console.log(res);
            let hospitalAddress = [];
            let hospitalCost = [];

            for (let i = 1; i < 6; i++){
            hospitalCost[i] = parseFloat(res[i].cost);
            hospitalAddress[i] = res[i].address + "+" + res[i].city + "+" + res[i].state + "+" + res[i].zip_code;
            console.log(hospitalAddress[i]);
            getDistance(hospitalAddress[i], i, hospitalCost[i]);
    
            };
            
            let hospitalIds =[];
            for (let i = 1; i <res.length; i++){
               
                $("#results"+i).text(res[i].hospital_name);
                $("#cost"+i).text("Cost of Procedure:  $" + res[i].cost);
                $("#address"+i).text(res[i].address);
                $("#city"+i).text(res[i].city + ", " + res[i].state + " " + res[i].zip_code);
                $("#form-check"+i).append(`  <input class="form-check-input" type="checkbox" name="save_hospital" value="${res[i].id}" id="defaultCheck1 style ="padding=left:5px">
                <label class="form-check-label" for="defaultCheck1">Save</label>`)
                hospitalIds.push(res[i].id)
                

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
