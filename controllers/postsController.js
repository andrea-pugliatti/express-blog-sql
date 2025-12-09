const postsList = require("../data/posts");
const connection = require("../data/db");

const index = (req, res) => {
	const query = `SELECT * FROM posts`;

	connection.query(query, (err, response) => {
		if (err)
			return res
				.status(500)
				.json({ error: err, message: "Database query failed" });

		res.json(response);
	});
};

const show = (req, res) => {
	const id = Number(req.params.id);
	const query = `SELECT * FROM posts WHERE id = ?`;
	const queryTags = `SELECT * FROM tags JOIN post_tag ON post_tag.tag_id = tags.id WHERE post_tag.post_id = ?`;

	connection.query(query, [id], (err, response) => {
		if (err) return res.status(500).json({ error: err, message: err.message });

		if (response.length === 0)
			return res.status(404).json({ error: 404, message: "Post Not Found" });

		connection.query(queryTags, [id], (errTags, resTags) => {
			if (errTags)
				return res
					.status(500)
					.json({ error: errTags, message: errTags.message });

			res.json({ ...response[0], tags: resTags });
		});

		// res.json(response[0]);
	});
};

const store = (req, res) => {
	const newPost = {
		id: Date.now(),
		...req.body,
	};
	postsList.push(newPost);
	console.log(newPost);
	res.status(201).json(newPost);
};

const update = (req, res) => {
	const updated = req.body;
	const found = postsList.find((post) => post.id === Number(req.params.id));

	if (!found) {
		res.status(404).json({ error: true, message: "Not Found!" });
	}

	found.title = updated.title;
	found.image = updated.image;
	found.content = updated.content;
	found.tags = updated.tags;

	console.log(found);

	res.send(`Modifica interamente post: ${req.params.id}`);
};

const modify = (req, res) => {
	const updated = req.body;
	const found = postsList.find((post) => post.id === Number(req.params.id));

	if (!found) {
		res.status(404).json({ error: true, message: "Not Found!" });
	}

	found.title = updated.title || found.title;
	found.image = updated.image || found.image;
	found.content = updated.content || found.content;
	found.tags = updated.tags || found.tags;

	console.log(found);

	res.send(`Modifica parzialemente post: ${req.params.id}`);
};

const destroy = (req, res) => {
	const id = Number(req.params.id);
	const query = `DELETE FROM posts WHERE id = ?`;

	connection.query(query, [id], (err) => {
		if (err) return res.status(500).json({ error: err, message: err.message });

		res.sendStatus(204);
	});
};

module.exports = { index, show, store, update, modify, destroy };
