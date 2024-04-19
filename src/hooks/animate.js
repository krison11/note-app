export default function animate(id) {
	const el = document.getElementById(id)

	function grow(width, height, border, margin, scale, delay) {
		el.style.width = width
		el.style.height = height
		el.style.margin = margin
		el.style.border = border
		el.style.transform = scale
		el.style.transition = 'all 0.5s ease'
		el.style.transitionDelay = delay
	}

	function shrink(delay) {
		if (screen.width > 700) {
			el.style.width = '0'
		} else {
			el.style.height = '0'
		}
		el.style.margin = '0'
		el.style.border = '0'
		el.style.transform = 'scale(0)'
		el.style.transition = 'all 0.5s ease'
		el.style.transitionDelay = delay
	}

	function show(transition, delay) {
		if (screen.width > 700) {
			el.style.marginTop = '6rem'
		} else {
			el.style.marginTop = '4.5rem'
		}
		el.style.opacity = '1'
		el.style.transition = transition
		el.style.transitionDelay = delay
	}
	function hide(transition, delay) {
		el.style.opacity = '0'
		el.style.marginTop = '0'
		el.style.transition = transition
		el.style.transitionDelay = delay
	}

	return {
		shrink,
		grow,
		hide,
		show,
	}
}
