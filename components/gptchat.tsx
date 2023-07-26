import { ReactNode, useEffect, useState } from 'react'
import axios from 'axios'
import {useRouter} from "next/router";
import teaserGif from '../images/teaser.gif'
import Image from 'next/image'
import { PageMeta } from '../utils/types'
import  GPTIcon  from '../images/chatgpt-icon.svg';
import  Avatar  from '../images/avatar.png';
import  Inri  from '../images/inri.png';

import { Message } from '../types/message'
import { isBrowser } from 'react-device-detect';

interface Props {
  message: Message;
  messages: Message[]
  setMessages: (messages: Message[]) => void
}
export default function Gptchat({ message, messages: messagesDb, setMessages }: Props) {
  const [aiResponse, setAiResponse] = useState('')
  const [isStreamComplete, setIsStreamComplete] = useState(false)

  const [gptLoading, setGptLoading] = useState(false)

  const router = useRouter();

  useEffect(() => {
    if (message.queryString) {
      fetchDataCallBAck()
      // fetchAIPageReference()
    }
  }, [message.queryString])
  //
  // const fetchAIPageReference = async () => {
  //   setPageReference(null)
  //   const { data } = await axios.post('https://www.goinri.com/api/get-blog-page', {
  //     query: queryString
  //   })
  //   setPageReference(data?.pageLink)
  //   setPageLinks(data?.allPageLinksFound || [])
  // }

  const fetchDataCallBAck = async () => {
    setGptLoading(true)
    setAiResponse('')
    // setPageReference(null)
    const response2 = await fetch('https://staging.goinri.com/api/gpt-search', {
      method: 'POST',
      body: JSON.stringify({ query: message.queryString}),
    })
    if (!response2.ok) {
      throw new Error('SSE request failed')
    }

    const reader = response2?.body?.getReader() || null
    let result = ''
    let done = false

    while (!done && reader){
      const { value, done: readerDone } = await reader.read()
      done = readerDone
      const chunk = new TextDecoder().decode(value)
      result += chunk
      if (result.includes('\n\n')) {
        const messages = result.split('\n')
        // console.log
        let resultString = ''
        for (let i = 0; i < messages.length - 1; i++) {
          try {
            if (messages[i].length > 0) {
              const trimmedMessage = messages[i].replace('data: ', '')
              const data = JSON.parse(trimmedMessage)
              resultString = resultString + data.choices[0].text
              const newMessages = messagesDb.map((_) => {
                if (_.id === message.id) {
                  return {
                    ..._,
                    response: resultString,
                  }
                }
                return _
              })
              setMessages(newMessages)
            }
          } catch (e) {
            setIsStreamComplete(true)
            setGptLoading(false)
            break
          }
          setAiResponse(resultString)
        }
      }
    }
    setGptLoading(false)
  }

  // @ts-ignore
  return (
      <li key={message.queryString} className="relative flex  flex-col ">
        <div className="flex gap-x-4 w-full bg-gray-50 py-4 items-center md:justify-center px-16">
          <Image className="h-12 w-12 flex-none rounded-full bg-gray-50"
                 height={48}
                 width={48}
               src={Avatar}
               alt="" />
          <div className="min-w-0 flex  items-center">
            <p className="text-sm font-semibold leading-6 text-gray-900">
                {message.queryString}
            </p>
          </div>
        </div>

        <div className="flex gap-x-4 pr-6 w-full py-4 items-center md:justify-center px-16">
          {isBrowser &&
            <Image className="h-12 w-12 flex-none rounded-full bg-gray-50"
                 src={Inri}
                   height={48}
                   width={48}
                 // src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                 alt="" />
          }
          <div className="min-w-0 flex  items-center">
            <p className="text-base leading-7 text-gray-600">
              {aiResponse === '' ? 'Thinking...' : aiResponse}
            </p>
          </div>
        </div>


      </li>
  );
}


