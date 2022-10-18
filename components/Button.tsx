import React from 'react'

interface ButtonProps {
	text: string
	disabled?: boolean
	onClick: () => void
}

function Button(props: ButtonProps) {
	return (
		<button
			className='border py-2 px-10 bg-gray-900 text-white disabled:bg-gray-50 disabled:text-gray-400'
			onClick={props.onClick}
			disabled={props.disabled}>
			{props.text}
		</button>
	)
}

export default Button
