$(function() {


$("#submit-info").on("click", function(event) {
        
    event.preventDefault();
    let street = $("#street1_id").val().trim();
    let city = $("#city_id").val().trim();
    let state = $("#state_id").val().trim();
    let zip = $("#zip_id").val().trim();
    
    let fullAddress = street + " " + city + " " + state + " " + zip;

    let procedure = $("#select-list").val(); 
    let radius = $("#select-radius").val(); 

    let passcode =$("#passcode_id").val()//TODO

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
    // postNewClient(street,city,state);
    
    });

    function newclientID(street,city,state){
       let clientIDHelper = 
            street+
            city+
            state+
            (Math.round(Math.random()*255)).toString;
        //Shuffle string
        clientIDHelper
            .split("")
            .sort(function(a, b){return 0.5 - Math.random()})
            .join("");
    }

    // function postNewClient(client_userID,passcode,zipcode){
    //  let newClient = {
    //         client_userID: newclientID(),//GlobalID
    //         passcode: passcode,//TODO add to html
    //         zip_code: zipcode
    //    }

    //     // Send the POST request.
    //   $.ajax("/api/newclient", {
    //     type: "POST",
    //     data: newClient
    //   }).then(
    //     function() {
    //       console.log("created new client in database");
    //       // Reload the page to get the updated list
    //       location.reload();
    //     }
    //   );

    // }

    function findLocalZips() {

        $.ajaxPrefilter(function(options) {
            if (options.crossDomain && $.support.cors) {
                options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
            }
        });
         
        var ZIPAPIKEY = "6xsv3It4NIGhyQONSzZtJzG35hXBHQg6JJIqO6B7jnv6S8PlAkadIbi6Pg56RUQ2";
        var userZip = sessionStorage.getItem("zip");
        console.log(userZip);
        var queryURL = "https://www.zipcodeapi.com/rest/"+ZIPAPIKEY+"/radius.json/"+userZip+"/20/miles?minimal"
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
          }) 
          .then(function(response) {
          console.log('zippy zips', response);
          var zipArray = response.zip_codes;

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
      
        var ZIPAPIKEY = "6xsv3It4NIGhyQONSzZtJzG35hXBHQg6JJIqO6B7jnv6S8PlAkadIbi6Pg56RUQ2";
        var userZip = sessionStorage.getItem("zip");
        var userRadius = sessionStorage.getItem("radius");
        console.log(userZip);
        var queryURL = "https://www.zipcodeapi.com/rest/"+ZIPAPIKEY+"/radius.json/"+userZip+"/" + userRadius + "/miles?minimal"
        // var queryURL = "https://www.zipcodeapi.com/rest/"+ZIPAPIKEY+"/radius.json/"+userZip+"/3000/miles?minimal"
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
          }) 
          .then(function(response) {
          console.log(response);
          var radiusZipArray = response.zip_codes;

          $.ajax("/api", {
            type: "POST",
            data: {"zips":radiusZipArray}
          }).then(function(res) {
            console.log(res);
          })
        });
    }
<<<<<<< HEAD

    var MQaddress = sessionStorage.getItem("fulladdress");
    console.log(MQaddress);
    function getDistance() {
    
        $.ajaxPrefilter(function(options) {
            if (options.crossDomain && $.support.cors) {
                options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
            }
        });
        var hospitalAddressTest = "92+W+Vaughn+Ave+Gilbert+AZ"
    
        var MQAPIKey = "UVs4ACBHVSdUdsBxF6ZcdIv1OSmOsM61";
        var MQaddress = sessionStorage.getItem("fulladdress");
        console.log(MQaddress);
        var queryURL= "http://www.mapquestapi.com/directions/v2/route?key="+MQAPIKey+"&from="+MQaddress+"&to="+hospitalAddressTest
    
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
          })
          .then(function(response) {
           var distance =  JSON.stringify(response.route.distance);
           console.log(distance);
           var costToDrive = (parseInt(distance) * .545) * 2;
           console.log(costToDrive);
           
          });
        }


=======
>>>>>>> ad7abb9c7b9b0d25c4fc672d186f343e6e8cca8b
});
  