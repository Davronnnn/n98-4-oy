const elInput = findElement('#country');
const template = findElement('#country-template');
const elCards = findElement('.row');
const error = findElement('.error-message');
let countries = [];

const renderCountry = (array, parent = elCards) => {
	parent.textContent = null;
	const fragment = document.createDocumentFragment();

	const sortedArray = array.sort((a, b) => {
		if (a.name.official < b.name.official) {
			return -1;
		}
		if (a.name.official > b.name.official) {
			return 1;
		}
	});

	sortedArray.forEach((country) => {
		const newCard = template.content.cloneNode(true);
		const img = findElement('img', newCard);
		const title = findElement('.title', newCard);
		const population = findElement('.population', newCard);

		title.textContent = country.name.official;
		img.src = country.flags.png;
		population.textContent =
			country.population > 1000000
				? Math.round(country.population / 1000000) + ' mln'
				: country.population + ' kishi';

		fragment.appendChild(newCard);
	});

	elCards.appendChild(fragment);
};

elInput.addEventListener('change', () => {
	// loader.style.display = "block"
	fetch(`https://restcountries.com/v3.1/name/${elInput.value}`)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);

			if (data.message) {
				throw new Error(data.message);
			}
			renderCountry(data);

			error.textContent = '';
			// loader.style.display = "none"
		})
		.catch((err) => {
			console.log(err);
			error.textContent = 'Bunday mamlakat mavjud emas';
			// loader.style.display = "none"
		})
		.finally(() => {
			// loader.style.display = "none"
		});
});

fetch('https://restcountries.com/v3.1/all')
	.then((res) => res.json())
	.then((data) => {
		countries = data;
		renderCountry(countries);
		// loader.style.display = "none"
	});
