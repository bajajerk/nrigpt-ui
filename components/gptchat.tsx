import React, { ReactNode, useEffect, useState } from 'react'
import {useRouter} from "next/router";
import Image from 'next/image'
import  Avatar  from '../images/avatar.png';

import { Message } from '../types/message'
import { isBrowser } from 'react-device-detect';
import Mixpanel from 'mixpanel-browser'
import Link from 'next/link';

interface Props {
  message: Message;
  messages: Message[]
  setMessages: (messages: Message[]) => void
}
export default function Gptchat({ message, messages: messagesDb, setMessages }: Props) {
  const [aiResponse, setAiResponse] = useState('')
  const [isStreamComplete, setIsStreamComplete] = useState(false)
  const [pageLinks, setPageLinks] = useState<any[]>([])
  const [pageReference, setPageReference] = useState(null)
  const [gptLoading, setGptLoading] = useState(false)

  const router = useRouter();

  useEffect(() => {
    if (message.queryString) {
      fetchDataCallBAck()
      fetchAIPageReference()
    }
  }, [message.queryString])
  //
  const fetchAIPageReference = async () => {
    const response2 = await fetch('https://staging.goinri.com/api/get-blog-page', {
      method: 'POST',
      body: JSON.stringify({ query: message.queryString}),
    })
    // console.log(response2.json())
    const data = await response2.json();

    setPageReference(data?.pageLink)
    // setPageLinks(data?.allPageLinksFound || [])
    // setPageLinks(data?.allPageLinksFound || [])
  }

  const fetchDataCallBAck = async () => {
    setGptLoading(true)
    setAiResponse('')
    // setPageReference(null)
    const response2 = await fetch('https://staging.goinri.com/api/gpt-search', {
      method: 'POST',
      body: JSON.stringify({ query: message.queryString}),
    })
    Mixpanel.track('gpt_search_api', {
      queryString: message.queryString
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
        <div className="flex gap-x-4 w-full bg-gray-50 py-4 items-center  px-4 md:px-32">
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

        <div className="flex gap-x-4 pr-6 w-full py-4 md:justify-center px-4 md:px-32">
            <img
              src='https://ypejcglyqkzysgycxsug.supabase.co/storage/v1/object/public/website-assets/inri.png'
              className='w-12 h-12'
            />
          <div className={'flex flex-col'}>
          <div className="min-w-0 flex">
            <p className="text-base leading-7 text-gray-600">
              {aiResponse === '' ? 'Thinking...' : aiResponse}
            </p>
          </div>

            {pageReference && !gptLoading &&
              <div className={'mt-6 flex justify-center underline text-blue-600 text-sm font-medium'}>
                <Link  href={`https://goinri.com/${pageReference}`} passHref
                >
                  <a target='_blank'>
                  Read more
                  </a>
                </Link>
              </div>
              // <div className="mt-2 flex">
              //   <a
              //     href={`https://goinri.com/${pageReference}`} target={'_blank'}
              //     className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              //   >
              //     Read more
              //   </a>
              // </div>
            }
          </div>
          </div>



      </li>
  );
}


