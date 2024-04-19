export default function userhandler(id) {
	if (id && id.length === 24) {
		return true
	} else {
		return false
	}
}
