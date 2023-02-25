import renderProducts from './utils/renderProducts.js';
import changeLoading from './utils/changeLoading.js';
import findElement from './utils/findElement.js';
import BASE_URL from './utils/api.js';

const elTopList = findElement('#products-top');
const elTopTemplate = findElement('#product-template');

const ulCategories = findElement('#categories');
const loader = findElement('#loader');

const loginBtn = findElement('#login-btn');
const adminLink = findElement('#admin-link');

let token = localStorage.getItem('token');

if (token) {
	loginBtn.textContent = 'Chiqish';
	adminLink.style.display = 'block';
} else {
	adminLink.style.display = 'none';
	loginBtn.textContent = 'Kirish';
}

loginBtn.addEventListener('click', () => {
	let token = localStorage.getItem('token');

	if (token) {
		adminLink.style.display = 'none';
		localStorage.removeItem('token');

		loginBtn.textContent = 'Kirish';
	} else {
		window.location.href = '../pages/login.html';
	}
});

let products = [];
let favoriteProducts = [];
let categories = [];

fetch(BASE_URL + 'categories')
	.then((res) => res.json())
	.then((res) => {
		categories = res;
		renderCategories(categories, ulCategories);
	});

const renderCategories = (array, parent) => {
	const newli = document.createElement('li');
	newli.className = 'list-group-item';

	newli.textContent = 'All';

	parent.appendChild(newli);
	array.forEach((category) => {
		const newli = document.createElement('li');
		newli.className = 'list-group-item';

		newli.textContent = category.name;

		parent.appendChild(newli);
	});
};

ulCategories.addEventListener('click', (evt) => {
	const target = evt.target;

	if (target.className.includes('list-group-item')) {
		const category = target.textContent;

		const result = [];

		if (category.toLowerCase() !== 'all'.toLowerCase()) {
			products.forEach((product) => {
				if (product.category === category) {
					result.push(product);
				}
			});
			renderProducts(result, elTopList, elTopTemplate);
		} else {
			renderProducts(products, elTopList, elTopTemplate);
		}
	}
});

const getData = async () => {
	try {
		changeLoading(true);
		const res = await fetch(BASE_URL + '/products');
		if (res.status === 404) {
			throw new Error('xato ketdi');
		}
		const res2 = await res.json();

		products = res2;

		renderProducts(res2, elTopList, elTopTemplate);
	} catch (x) {
		alert(x);
	} finally {
		changeLoading(false);
	}
};

getData();

elTopList.addEventListener('click', (evt) => {
	const target = evt.target;

	if (target.id.includes('like') || target.id === 'path') {
		const id = Number(target.dataset.id);

		products.forEach((product) => {
			if (+product.id === id) {
				product.isFavorite = !product.isFavorite;

				fetch(BASE_URL + `products/${id}`, {
					method: 'put',
					body: JSON.stringify({
						...product,
						isFavorite: product.isFavorite,
					}),
					headers: {
						Authorization: 'Bearer ' + token,
						'Content-Type': 'application/json',
					},
				})
					.then((res) => res.json())
					.then((res) => {
						console.log(res);
					});
			}
		});

		renderProducts(products, elTopList, elTopTemplate);
	}
});
