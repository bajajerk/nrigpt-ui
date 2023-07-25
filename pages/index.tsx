import type { NextPage } from 'next'
import GptSearchBanner from '../components/GPTSearchBanner'

const Home: NextPage = () => {

  return (
    <main className="flex min-h-screen bg-white flex-col items-center justify-between">
      <GptSearchBanner/>
    </main>
  )
}

export default Home
