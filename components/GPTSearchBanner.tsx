import React from 'react'
import ZomatoImage from '../assets/zomato.svg'
import { useRouter } from 'next/router'
//
const GptSearchBanner = () => {
  const router = useRouter()
  const Chip = (props: { text: string }) => {
    const { text } = props
    return (
      <div
        className='rounded-full p-1 pl-2 pr-2 text-sm flex items-center justify-center ml-2 mt-3 text-white cursor-pointer'
        style={{ backgroundColor: 'rgb(106,142,235)' }}
      >
        {text}
      </div>
    )
  }

  const onSubmit = (e: any) => {
    e.preventDefault()
    router.push(`/gptsearch?q=${searchQuery}`)
  }

  const [searchQuery, setSearchQuery] = React.useState('')

  return (
    <div
      className='w-full p-16 pl-8 md:pl-32 pr-8 md:pr-16'
      style={{
        background:
          'linear-gradient(277.81deg, rgb(110, 176, 255) 0%, rgb(57, 109, 230) 47.18%, rgb(89, 86, 227) 100%)',
      }}
    >
      <div className=' mt-8 md:mt-20 flex flex-col'>
        <h1 className='text-white text-3xl md:text-5xl font-bold'>Inri GPT</h1>
        <div className='text-white text-lg md:text-2xl font-light mt-3 mb-4 lg:mt-6 lg:mb-8'>
          Ask whatever you want to ask
        </div>
      </div>

      <form onSubmit={onSubmit}>
        <label
          id='default-search'
          className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
        >
          Search
        </label>
        <div className='relative'>
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <svg
              className='w-4 h-4 text-gray-500 dark:text-gray-400'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 20 20'
            >
              <path
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
              />
            </svg>
          </div>
          <input
            type='search'
            id='default-search'
            className='font-sm md:font-lg block w-full md:w-1/2 p-2 md:p-4 pl-10 md:pl-8 text-lg text-gray-800 border border-gray-300 rounded-lg bg-gray-50 focus:ring-0'
            placeholder='Search for your queries'
            value={searchQuery}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onSubmit(e)
              }
            }}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          />
        </div>
        <div className='mt-1 md:mt-4  ml-2 md:ml-4 flex flex-row items-center'>
          <img
            src='https://www.zomato.com/trends/static/media/cureved-arrow.757c85f6438809992c111fc9818cc331.svg'
            className='w-4 h-4 md:w-6 md:h-6'
          />
          <div className='ml-3 mt-3 mr-2 text-white font-xs'>Let's try</div>
          <div onClick={() => setSearchQuery('Taxation')}>
            <Chip text={'Invest in India'} />
          </div>
          <div onClick={() => setSearchQuery('Mutual Funds')}>
            <Chip text={'NRI Taxation'} />
          </div>

          <div onClick={() => setSearchQuery('ITR')}>
            <Chip text={'Best Index Funds'} />
          </div>
        </div>
      </form>
    </div>
  )
}

export default GptSearchBanner
