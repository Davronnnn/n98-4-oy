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

const elInput = findElement('#country');

const map = findElement('#map');
elInput.addEventListener('change', () => {
	fetch('https://restcountries.com/v3.1/name/' + elInput.value)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			map.href = data[0].maps.googleMaps;
			console.log(data[0].maps.googleMaps);
		});
});
fetch('https://restcountries.com/v3.1/name/uzbekistan')
	.then((res) => res.json())
	.then((data) => {
		console.log(data);
	});
