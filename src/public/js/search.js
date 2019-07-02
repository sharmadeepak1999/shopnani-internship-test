$(document).ready(() => {

	let isFreshSearch = true

	// Focus the search bar as soon as the page loads
	$(".search-bar").focus()

	// Executes when the search form is submitted.
	$("#search-form").on("submit", (e) => {
		// Prevents the default behaviour of the browser to happen
		e.preventDefault()

		const searchTerm = $(".search-bar").val()

		if(!searchTerm) {
			$(".search-bar").css("border-color", "red")
			return 0
		}

		$(".search-bar").css("border-color", "grey")

		if(isFreshSearch) {
			$("#search-container").animate({ marginTop: "-=140px"}, 800);
			isFreshSearch = !isFreshSearch
			$(".loading").show()
		} else {
			$("#product-container").hide()
			$(".no-result").hide()
			$(".loading").show()
		}

		// Sends an ajax request to fetch product
		const request = $.get("/search", { searchTerm })

		// Executes on successfull request
		request.done(({ products }) => {
			// Checks if there are no result
			if(products.length === 0) {
				$("#product-container").hide()
				$(".loading").hide()
				$(".no-result").show()
				return 0
			}

			$(".loading").hide()

			$("#product-container").html("").show()

			// Appends each product to the product container
			products.forEach((product) => {
				let productCard = `
					<div class="row mt-3 shadow-sm border">
						<div class="col col-3 p-2">
							<div class="container product-image-container p-2">
								<img src=${product.productBaseInfoV1.imageUrls['200x200']} class="product-image">
							</div>
						</div>
						<div class="col col-9 p-3 border-left">
							<h6><div class="product-title">${product.productBaseInfoV1.title}</div></h6>
							<small class="mt-0 text-muted">${product.productBaseInfoV1.productBrand}</small>
							<p class="mt-2"><strong>₹ ${product.productBaseInfoV1.flipkartSpecialPrice.amount}</strong></p>
							<p><strike class="text-muted">₹ ${product.productBaseInfoV1.flipkartSellingPrice.amount}</strike> &nbsp <strong class="text-success">${product.productBaseInfoV1.discountPercentage}% Off</strong></p>
							<p><a href=${product.productBaseInfoV1.productUrl} target="_blank"><button class="btn btn-secondary btn-sm">View Product</button></a></p>
						</div>
					</div>
				`

				$("#product-container").append(productCard)
			})

			// Adds ... at the end of product list
			let productListEnd = `
				<div class="container mt-1">
					<h1 class="text-muted text-center text-lg">...</h1>
				</div>
			`
			$("#product-container").append(productListEnd)
		})

		// Executes if an error occurs
		request.fail((error) => {
			alert('Something went wrong!' + error)
		})
	})
})