import Image from 'next/image'
import Gptchat from '../components/gptchat'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { SparkIcon } from '../images/SparkIcon'

interface Message {
  queryString: string
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [message, setMessage] = useState('')
  const messageEnd = useRef<HTMLDivElement>(null)

  const router = useRouter()
  const { query } = router

  const queryString = query.q

  useEffect(() => {
    if (queryString && queryString.length > 0) {
      // @ts-ignore
      setMessages([{ queryString: queryString }])
    }
    // @ts-ignore
  }, [queryString])

  //after every 1 second scroll to bottom
  useEffect(() => {
    const interval = setInterval(() => {
      // @ts-ignore
      messageEnd?.current?.scrollIntoView({ behavior: 'smooth' })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden">
        <header className="bg-blue-600">
          <nav
            className="mx-auto flex  items-center justify-between p-6 lg:px-8"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <p className={'text-white pl-2 text-lg font-semibold'}>NRI GPT</p>
            </div>
          </nav>
        </header>
        <div className="flex-1 overflow-scroll">
          <ul role="list" className="divide-y divide-gray-100 flex justify-start flex-col">
            {messages.map((message, i) => (
              <Gptchat key={i} queryString={message.queryString} />
            ))}
          </ul>
          <div className="mt-20" />
          <div ref={messageEnd} />
        </div>
      </div>
      <div className="sticky  bottom-0">
        <div className="border-t-2 z-50 bg-white border-gray-200 px-4 pt-4 mb-2 sm:mb-0 fixed bottom-0 left-0 w-full pb-4">
          <div className="relative flex">
            <span className="absolute inset-y-0 flex items-center">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <SparkIcon id={undefined} color={undefined} />
              </button>
            </span>
            <input
              type="text"
              placeholder="Write your message!"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  setMessages([...messages, { queryString: message }])
                  setMessage('')
                  //make dummy ref scroll into view
                  // @ts-ignore
                  //make list ref scroll into view
                  messageEnd?.current?.scrollIntoView({ behavior: 'smooth' })

                  // @ts-ignore
                }
              }}
              className="w-full focus:outline-none focus:placeholder-white text-gray-600 placeholder-gray-600 pl-12 bg-white rounded-md py-3"
            />
            <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
              {/* Add the send message button and other buttons */}
              <button
                type="button"
                onClick={() => {
                  setMessages([...messages, { queryString: message }])
                  setMessage('')
                  console.log('button')
                }}
                className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
              >
                <span className="font-bold">Send</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6 ml-2 transform rotate-90"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatPage
