
var Speaker = require('../models/speaker');

module.exports = function(app){
	app.get("/", function(request, response) {
		response.redirect("index.html");
	});

	app.get("/wdcnz/speakers", function(request, response) {
		Speaker.all(function(errs, docs) {
			response.send(docs)
		});		
	});

	app.get("/wdcnz/speakers/count", function(request, response) {
		response.send(Speaker.count());		
	});
	
	app.param("id", function(request, response, next, id) {
		Speaker.get(id, function(err, speaker) {
			if (err) return next(err);
	      	if (!speaker) return next(new Error('Failed to load speaker ' + id));
      
			request.speaker = speaker;
			next();
	    });
	});
	
	app.get('/wdcnz/speakers/:id', function(request, response){
		response.send(request.speaker);
  	});

	app.post('/wdcnz/speakers/', function(request, response){
		var data = request.body;
		var	speaker = new Speaker(data.name, data.title, data.synopsis);
	
		speaker.validate(function(err) {
			if(err && err.length > 0) {
				return response.send({
					success: false,
					errors: err
				});
			}
			
			speaker.save(function(err) {
				response.send({ 
					success: true,
					msg: "Successfully saved " + data.name + "'s talk"
				});
			});
		});
	});
};