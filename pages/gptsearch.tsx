import Image from 'next/image'
import Gptchat from '../components/gptchat'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { SparkIcon } from '../images/SparkIcon'
import { useChatScroll } from '../hooks/scrollhook'
import { Message } from '../types/message'
import Logo from '../components/logo'
import FeedbackModal from '../components/FeedbackModal'


const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [message, setMessage] = useState('')
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)


  const onClickFeedbackButton = (message: Message) => {
    setSelectedMessage(message)
    setIsFeedbackModalOpen(true)
  }

  const messagesRef = useChatScroll(messages)

  const router = useRouter()
  const { query } = router

  // const dummyRef = useRef(null)
  const listRef = useRef(null)
  const queryString = query.q

  useEffect(() => {
    if (queryString && queryString.length > 0) {
      // @ts-ignore
      setMessages([{ queryString: queryString }])
    }
    // @ts-ignore
    // dummyRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [queryString])

  return (
    <>
      <div className='flex flex-col overflow-hidden'>
        <div>
          <header className='bg-blue-600'>
            <nav
              className='mx-auto flex  items-center justify-between p-2 lg:px-8'
              aria-label='Global'
            >
              <div className='flex lg:flex-1 flex-row justify-between'>
                <a href={'/'}>
                  <p className={'text-white pl-2 text-lg font-semibold'}>NRI GPT</p>
                </a>
              </div>

              <div className='flex flex-row'>
                <div className={'flex text-white text-sm font-light items-center mr-2'}>
                  Brought to you by
                </div>
                <a href={'https://www.goinri.com'} target={'_blank'}>
                  <Logo width={'60'} height={'60'} />
                </a>
              </div>
            </nav>
          </header>
        </div>
        <div className='overflow-scroll' style={{ height: '80vh' }} ref={messagesRef as any}>
          <ul
            ref={listRef}
            role='list'
            className='divide-y divide-gray-100 flex justify-start flex-col'
          >
            {messages.map((message, i) => (
              <Gptchat key={i} message={message} messages={messages} setMessages={setMessages}
                       onClickFeedbackButton={onClickFeedbackButton} />
            ))}
          </ul>
          {/*<div ref={dummyRef} />*/}
        </div>
      </div>
      <div className='sticky  bottom-0'>
        <div
          className='border-t-2 z-50 bg-white border-gray-200 px-4 pt-4 mb-2 sm:mb-0 fixed bottom-0 left-0 w-full pb-4'>
          <div className='relative flex'>
            <span className='absolute inset-y-0 flex items-center'>
              <button
                type='button'
                className='inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none'
              >
                <SparkIcon id={undefined} color={'blue-600'} />
              </button>
            </span>
            <input
              type='text'
              placeholder='Ask your question'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  setMessages([...messages, { queryString: message, answer: '', id: Math.random().toString() }])
                  setMessage('')
                }
              }}
              className='w-full focus:outline-none focus:placeholder-white text-gray-600 placeholder-gray-600 pl-12 bg-white rounded-md py-3'
            />
            <div className='absolute right-0 items-center inset-y-0 hidden sm:flex'>
              {/* Add the send message button and other buttons */}
              <button
                type='button'
                onClick={() => {
                  setMessages([...messages, { queryString: message, answer: '', id: Math.random().toString() }])
                  setMessage('')
                  console.log('button')
                }}
                className='inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none'
              >
                <span className='font-bold'>Send</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  className='h-6 w-6 ml-2 transform rotate-90'
                >
                  <path
                    d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z'></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {selectedMessage &&
        <FeedbackModal message={selectedMessage} closeModal={() => setIsFeedbackModalOpen(false)}
                       isOpen={isFeedbackModalOpen} />
      }
    </>
  )
}

export default ChatPage
