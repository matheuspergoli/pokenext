import Head from 'next/head'
import Pokemons from '../components/Pokemons'

function Home() {
	return (
		<>
			<Head>
				<title>Pokénext</title>
			</Head>
			<main className='p-5 bg-blue-500'>
				<Pokemons />
			</main>
		</>
	)
}

export default Home
