function renderProducts(array, parent, template, isAdmin = false) {
	parent.textContent = null;
	array.forEach((product) => {
		const newProduct = template.content.cloneNode(true);
		const svg = findElement('svg', newProduct);
		const path = findElement('#path', newProduct);
		const elTitle = findElement('#title', newProduct);
		const elPrice = findElement('#price', newProduct);
		const elRating = findElement('#rating', newProduct);
		const elImg = findElement('img', newProduct);

		if (product.isFavorite) {
			path.style.fill = 'red';
		} else {
			path.style.fill = 'none';
		}

		// admin.js

		if (isAdmin) {
			const deleteBtn = findElement('.btn-danger', newProduct);
			deleteBtn.dataset.id = product.id;
		}
		svg.dataset.id = product.id;
		path.dataset.id = product.id;

		elTitle.textContent = product.name;
		elPrice.textContent = product.price + '$';
		elRating.textContent = '⭐️' + product.rating;
		elImg.src = product.image;

		parent.appendChild(newProduct);
	});
}
