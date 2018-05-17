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
    postNewClient(street,city,state);
    
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

    function postNewClient(client_userID,passcode,zipcode){
     let newClient = {
            client_userID: newclientID(),//GlobalID
            passcode: passcode,//TODO add to html
            zip_code: zipcode
       }

        // Send the POST request.
      $.ajax("/api/newclient", {
        type: "POST",
        data: newClient
      }).then(
        function() {
          console.log("created new client in database");
          // Reload the page to get the updated list
          location.reload();
        }
      );

    }

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

            var zipArray = json.stringify(response);
            console.log(zipArray[0]);

            sessionStorage.setItem("localZips", zipArray);
          });
        }