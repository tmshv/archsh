/**
 * f([x, y, z, ...], [m, n, k, ...]) -> [[x, m], [y, n], [z, k], ...]
 * @param list1
 * @param list2
 */
export function zip(list1, list2) {
	const [small, other] = list1.length <= list2.length
		? [list1, list2]
		: [list2, list1]
	return small.map((s, i) => [s, other[i]])
}

export function arraysIsEqual(list1, list2){
	if (list1.length !== list2.length) return false

	const booleans = zip(list1, list2)
		.map((a, b) => a === b)
	return all(booleans)
}

export function all(list){
	return list
		.map(Boolean)
		.reduce((acc, i) => acc && i, true)
}

export function any(list){
	return list
		.map(Boolean)
		.reduce((acc, i) => acc || i, false)
}

export function exist(value){
	return all([
		value !== null,
		value !== undefined,
	])
}

export function pass(fn) {
	return data => {
		fn()
		return data
	}
}

export function pack(name) {
	//return value => {[name]: value}

	return value => {
		const o = {}
		o[name] = value
		return o
	}
}
