const elTopList = findElement('#products-top');
const elTopTemplate = findElement('#product-template');

const elLangSelect = findElement('#language-select');

let lang = sessionStorage.getItem('lang');

elLangSelect.value = lang;

if (lang === 'uz') {
	document.title = "Internet do'kon";
} else if (lang === 'en') {
	document.title = 'E-commerce';
} else if (lang === 'ru') {
	document.title = 'Интернет магазин';
}

elLangSelect.addEventListener('change', () => {
	const value = elLangSelect.value;

	sessionStorage.setItem('lang', value);
	lang = value;
	if (lang === 'uz') {
		document.title = "Internet do'kon";
	} else if (lang === 'en') {
		document.title = 'E-commerce';
	} else if (lang === 'ru') {
		document.title = 'Интернет магазин';
	}
});

renderProducts(products, elTopList);

const obj = {
	name: 'john',
	age: 20,
};
const arr = [1, 2, 3, 4, 5, 6];

localStorage.setItem('person', arr);

const person = localStorage.getItem('person');
console.log(person.split(','));
