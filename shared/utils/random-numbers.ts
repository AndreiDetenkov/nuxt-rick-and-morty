function getRandomInt(min: number, max: number): number {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateRandomNumbers(): number[] {
	const uniqueNumbers = new Set<number>();
	while (uniqueNumbers.size < 10) {
		uniqueNumbers.add(getRandomInt(1, 826));
	}
	return [...uniqueNumbers];
}
