import type { NextPage } from 'next'
import GptSearchBanner from '../components/GPTSearchBanner'
import Footer from '../components/Footer'
import React from 'react'

const Home: NextPage = () => {

  return (
    <main className='flex bg-white flex-col items-center justify-between'>
      <GptSearchBanner />


      <div className={'flex flex-col md:flex-row pt-6'} style={{
        justifyContent: 'space-around',
      }}>

        <div
          className='w-full md:w-1/2  p-6 bg-white border border-gray-200 rounded-lg shadow md:mx-8'>
          <div className={'flex flex-row justify-start items-center'}>
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
            <p className='ml-2  text-lg font-bold tracking-tight text-gray-600 italic'>Why invest in India?</p>
          </div>
          <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
            India's lively economy, young population, thriving tech industry, and growing consumer market make it an
            appealing investment hub. It's projected to grow by 30% by 2025, attracting NRIs due to their familiarity
            with its economy and culture. The government implemented measures to lure foreign investment, offering
            diversification and rewards to NRIs' portfolios.
          </p>

        </div>


        <div
          className='w-full md:w-1/2  p-6 bg-white border border-gray-200 rounded-lg shadow  md:mx-8'>
          <div className={'flex flex-row justify-start items-center'}>
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
            <p className='ml-2  text-lg font-bold tracking-tight text-gray-600 italic'>How to solve taxation?</p>
          </div>
          <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
            Taxation for NRIs investing in India can be complex. To ensure a smooth and hassle-free tax filing
            experience, NRIs should stay informed, seek professional assistance when needed, and proactively plan for
            taxes. Additionally, NRIs should take advantage
            of Double Taxation Avoidance Agreements (DTAA) and Tax Deducted at Source (TDS) to reduce their tax
            liability.
          </p>

        </div>


      </div>

      <Footer />

    </main>
  )
}

export default Home
