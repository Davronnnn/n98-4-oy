class CustomArray {
	posts = [];

	constructor(posts) {
		this.posts = posts;
	}
	push(element) {
		this.posts.push(element);

		return this.posts.length;
	}

	findIndex(arg) {
		let index = 0;
		this.posts.forEach((element, i) => {
			if (element == arg) {
				index = i;
			}
		});
		return index;
	}
}

const arr = [];

const array = new CustomArray(['asdasd', 'Asdasd', 'Asdasd', 'asd', true, 6]);

console.log(array.push('salom'));
console.log(array.findIndex(6));
console.log(array);
