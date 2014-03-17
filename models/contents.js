var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Content = new keystone.List('Content', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Content.add({
	title: { type: String, required: true },
	slug: { type: String, index: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true },
	image: { type: Types.CloudinaryImage },
	content: {
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	}
});

Content.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Content.register();
