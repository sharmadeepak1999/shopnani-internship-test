const express = require("express")
const validator = require("validator")
const request = require("request-promise")

const router = new express.Router()

// Gets product based on search term
const getProducts = async (query, resultCount) => {
	const options = {
		uri: 'https://affiliate-api.flipkart.net/affiliate/1.0/search.json',
		qs: {
			query,
			resultCount
		},
		headers: {
			'Fk-Affiliate-Id': 'yuganshch',
			'Fk-Affiliate-Token': '34adf1305516462d8ce93de45594da81'
		},
		json: true
	}

	// Returns a promise
	return await request(options)
}

router.get("/", async (req, res) => {
	try {
		// Checks for the search query
		if(!req.query.searchTerm) {
			return res.status(200).send({
				error: 'Search query not specified!',
			})
		}

		// Trim and escapes the search term
		const searchTerm = validator.escape(validator.trim(req.query.searchTerm))

		const resultCount = 10

		const products = await getProducts(searchTerm, resultCount)

		res.status(200).send(products)

	} catch(e) {
		return res.status(500).send({
			error: "Something went wrong!"
		})
	}
})

module.exports = router