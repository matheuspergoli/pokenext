import React from 'react'
import { Modal } from '@mui/material'
import { DataPokemon, TypePokemon, AbilityPokemon } from '../interface'

const styleModal = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	height: '100vh',
	width: '100vw'
}

function CardPokemon(props: { url: string; index: number }) {
	const [open, setOpen] = React.useState(false)
	const [data, setData] = React.useState<DataPokemon>(null)

	React.useEffect(() => {
		async function fetchPokemon() {
			const response = await fetch(props.url)
			const json = await response.json()
			setData(json)
		}
		fetchPokemon()
	}, [props.url])

	function closeModal() {
		setOpen(false)
	}
	function showModal() {
		setOpen(true)
	}

	return (
		<>
			{data && (
				<section className='flex flex-col items-center justify-center rounded-md w-64 h-80 bg-white'>
					<span className='pl-5 self-start font-bold'>#{data.id}</span>
					<figure
						className='cursor-pointer'
						onClick={showModal}>
						<img
							className='w-40 h-40'
							src={data.sprites.other['official-artwork'].front_default}
							alt={data.name}
						/>
					</figure>
					<h1 className='mb-5'>
						<span className='capitalize text-xl'>{data.name}</span>
					</h1>
					<ul className='flex gap-2'>
						{data.types.map((type: TypePokemon) => (
							<li
								className='capitalize text-center rounded-lg border py-1 px-5 bg-red-600 text-white'
								key={type.slot}>
								{type.type.name}
							</li>
						))}
					</ul>
					<Modal
						sx={styleModal}
						open={open}
						onClose={closeModal}>
						<section className='p-5 outline-none max-w-md w-full'>
							<div className='p-2 rounded-md bg-white'>
								<figure>
									<img
										className='mx-auto w-60'
										src={data.sprites.other['official-artwork'].front_default}
										alt={data.name}
									/>
								</figure>
								<h1 className='text-center mb-5'>
									<span className='capitalize text-2xl'>{data.name}</span>
								</h1>
								<div className='flex items-center justify-center gap-2 mb-5'>
									<p className='font-semibold'>
										Weight: <span className='font-bold'>{data.weight}</span>
									</p>
									<p className='font-semibold'>
										Height: <span className='font-bold'>{data.height}</span>
									</p>
								</div>
								<div className='border-2 rounded-md mb-5 p-2'>
									<p className='font-semibold text-center'>Type</p>
									<ul className='flex items-center justify-center gap-2 flex-wrap'>
										{data.types.map((type: TypePokemon) => (
											<li
												className='capitalize text-center rounded-lg border py-1 px-5 bg-red-600 text-white'
												key={type.slot}>
												{type.type.name}
											</li>
										))}
									</ul>
								</div>
								<div className='border-2 rounded-md p-2'>
									<p className='font-semibold text-center'>Abilities</p>
									<ul className='flex items-center justify-center gap-2 flex-wrap'>
										{data.abilities.map((ability: AbilityPokemon) => (
											<li
												className='capitalize text-center rounded-lg border py-1 px-5 bg-red-600 text-white'
												key={ability.ability.name}>
												{ability.ability.name}
											</li>
										))}
									</ul>
								</div>
							</div>
						</section>
					</Modal>
				</section>
			)}
		</>
	)
}

export default CardPokemon
