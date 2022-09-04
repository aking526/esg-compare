export function make2dArray(w: number, h: number, val: string) {
	let arr: string[][] = [];
	for(let i = 0; i < h; i++) {
		arr[i] = [];
		for(let j = 0; j < w; j++) {
			arr[i][j] = val;
		}
	}
	return arr;
}
