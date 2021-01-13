export async function waitFor(ms: number) {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(true), ms);
	});
}
