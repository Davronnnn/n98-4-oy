const elTopList = findElement('#products-top');
const elTopTemplate = findElement('#product-template');

const loader = findElement('#loader');

let products = [];

const BASE_URL = 'https://fakestoreapi.com';

fetch(BASE_URL + '/products')
	.then((res) => res.json())
	.then((res) => {
		products = res;
		renderProducts(products, elTopList);
		loader.style.cssText = 'display: none';
	})
	.catch((err) => {
		console.error(err);
	});

