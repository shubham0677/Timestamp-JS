var moment = require('moment');

module.exports = function(app) {
	app.get('/:query',function(req,resp) {
		var date = req.params.query;
		var unix = null;
		var natural = null;
		
		if(+date >= 0) {
			unix = +date;
			natural = unixToNat(unix);
		} 

		else if(isNaN(+date) && 
				moment(date,"MMMM D, YYYY").isValid()) {
			unix = natToUnix(date);
			natural = unixToNat(unix);		
		}	
		var obj = {"unix" : unix, "natural" : natural};		
		resp.send(JSON.stringify(obj));
	});

	function unixToNat(unix) {
		return moment.unix(unix).format("MMMM D, YYYY");
	}

	function natToUnix(date) {
		return moment(date,"MMMM D, YYYY").format("X");
	}
};