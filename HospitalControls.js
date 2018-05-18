 //   router.post("/api/:location/", function(req, res) {
  //     // console.log(req.params.location)
  // console.log("you hit the router")
  //     console.log(req.body);
  //     var zipCodes = req.body.location.zip_codes
  //     var bigHospitalArray = [];
  //     // concat() 
  //     for(var i=0; i< bigHospitalArray.length;i++){
  //       findHospitalInZip();
  //       bigHospitalArray.split(",").sort();
  //       // chooseHospital(bigHospitalArray.split(",").sort());
  //       // chooseHospital(bigHospitalArray.sort();
  //       var bestHospitals = chooseHospital(bigHospitalArray.sort(function(a, b) {
  //         return a - b;
  //       })); 
  //     };
  //     res.json(bestHospitals);

  //   });

  //   function findHospitalInZip(){
  //     for(var i=0; i < zipCodes.length; i++){

  //       db.hospital.findAll({
  //         where: {
  //           surgery: "knee joint",
  //           zip_code: zipCodes[i],
  //           }, order: [['cost', "ASC"]]
  //       }).then(function(dbHospital) {
  //         // bigHospitalArray.push(chooseHospital(dbHospital).join(",")); 
  //         bigHospitalArray.concat(chooseHospital(dbHospital));      
  //       });
  //     }
  //     return bigHospitalArray;
  //   }

  //   function chooseHospital(dbHospital){
  //     console.log("dpHospital" + dbHospital);
  //     console.log("You hit the router again");
  //     var topFive = [];
  //     var l = 5;
  //     if (dbHospital < 5) {
  //         l = dbHospital.length
  //     }
  //     for (i=0; i < l; i++) {
  //       topFive.push(dbHospital[i]);
  //     }
  //     // res.json(topFive); 
  //     return topFive;
      
  //   };