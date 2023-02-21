const elTopList = findElement('#products-top');
const elTopTemplate = findElement('#product-template');

const loader = findElement('#loader');

let products = [];
let favoriteProducts = [];

function changeLoading(isLoading) {
	if (isLoading) {
		loader.style.display = 'block';
	} else {
		loader.style.display = 'none';
	}
}

const BASE_URL = 'https://63d3e856a93a149755b5c8f1.mockapi.io/';

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

				fetch(
					`https://63d3e856a93a149755b5c8f1.mockapi.io/products/${id}`,
					{
						method: 'put',
						body: JSON.stringify({
							...product,
							isFavorite: product.isFavorite,
						}),
						headers: {
							'Content-Type': 'application/json',
						},
					}
				)
					.then((res) => res.json())
					.then((res) => {
						console.log(res);
					});
			}
		});

		renderProducts(products, elTopList, elTopTemplate);
	}
});
