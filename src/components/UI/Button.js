import classes from './Button.module.css'

export default function Button(props) {
	const classDisabled = props.disabled ? 'btn-disabled' : 'btn'

	return (
		<button
			className={classes[classDisabled]}
			style={{ background: props.color, width: props.width }}
			onClick={props.onClick}
			type={props.type}
			disabled={props.disabled}
		>
			{props.children}
		</button>
	)
}
