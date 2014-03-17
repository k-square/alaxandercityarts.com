var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	console.log(req.params);
	// Init locals
	locals.section = 'content';
	locals.data = [];
	
	var content = keystone.list('Content');
	// Load the posts
	view.on('init', function(next) {
		console.log(keystone.list('Content'));
		
		if(!content){
			res.status(404).render('errors/404', {
	            errorTitle: req.params.slug
	        });

		}else{
			var q = keystone.list('Content').model.find({
					slug: req.params.slug 
				})
				.where('state', 'published');
			
			q.exec(function(err, results) {
				if(results.length)
					locals.content = results[0];
				else{
					throw new Error('No content Found.');
				}
				next(err);
			});
		}
		
		
	});
	if(content)
		view.render('content');
	else
		view.render('errors/404');
}
