import React from 'react'
import { useQuery } from 'react-query'
import CardPokemon from './CardPokemon'
import { Data } from '../interface'
import Button from './Button'

function Pokemons() {
	const [page, setPage] = React.useState(0)
	const { data } = useQuery(['pokemons-data', page], fetchPokemons)

	async function fetchPokemons() {
		const response = await fetch(
			`https://pokeapi.co/api/v2/pokemon?offset=${page}&limit=20`
		)
		const json = await response.json()
		return json as Data
	}

	function nextPage() {
		setPage((currentPage) => currentPage + 20)
	}

	function prevPage() {
		setPage((currentPage) => currentPage - 20)
	}

	return (
		<>
			<header className='flex justify-center mb-10'>
				<img src="/pokemon-logo.png" alt="Pokemon Logo" />
			</header>
			<div className='flex items-center justify-center gap-5 flex-wrap mx-auto max-w-6xl'>
				{data &&
					data.results.map((result, index) => (
						<CardPokemon
							key={index}
							index={index}
							url={result.url}
						/>
					))}
			</div>
			<div className='flex justify-center gap-3 mt-5 mx-auto max-w-5xl'>
				<Button
					text='Prev'
					onClick={prevPage}
					disabled={page === 0}
				/>
				<Button
					text='Next'
					onClick={nextPage}
				/>
			</div>
		</>
	)
}

export default Pokemons
