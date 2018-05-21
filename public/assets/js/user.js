exports.user = function(req, res) {
    if(req.user) {
        $(function(req.user.id) {
		$(".submit-hospital").on("click", function(event) {//TODO Need button added for user to click in html to trigger a save on all the items checked
		  var id = req.user.id;
		  var savedHospitals =[];
		  $("input[name=saved-hospitals]:checked").each(function(){
			savedHospitals.push($(this).val());//TODO Need to add the data-id to the hospital checkboxes
			});
	  
		  var newSavedHospitals = {
			savedHospitals: savedHospitals
		  };
	  
		  // Send the PUT request.//put requires that I send and object
		  $.ajax("/api/" + id, {
			type: "PUT",
			data: savedHospitals
		  }).then(
			function() {
			  console.log("The list of hospitals IDs saved are", savedHospitals);
			  // Reload the page to get the updated list
			  location.reload();
			}
		  );
		});
    } else {
		alert("Sorry you are not signed in");
		res.render('signin');
    }

};//Need to write the Sequelize statement to query the users table for the user id.

var exports = module.exports = {}
