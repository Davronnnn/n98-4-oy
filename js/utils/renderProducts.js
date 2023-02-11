function renderProducts(array, parent) {
	parent.textContent = null;
	array.slice(0, 20).forEach((product) => {
		const newProduct = elTopTemplate.content.cloneNode(true);

		const elTitle = findElement('#title', newProduct);
		const elPrice = findElement('#price', newProduct);
		const elRating = findElement('#rating', newProduct);
		const elImg = findElement('img', newProduct);

		elTitle.textContent = product.name;
		elPrice.textContent = product.price + '$';
		elRating.textContent = '⭐️' + product.rating;
		elImg.src = product.image;

		elTopList.appendChild(newProduct);
	});
}
