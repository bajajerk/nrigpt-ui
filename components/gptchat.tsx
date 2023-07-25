import { ReactNode, useEffect, useState } from 'react'
import axios from 'axios'
import {useRouter} from "next/router";
import teaserGif from '../images/teaser.gif'
import Image from 'next/image'
import { PageMeta } from '../utils/types'

interface Props {
  queryString: string;
}
export default function Gptchat({ queryString }: Props) {
  const [aiResponse, setAiResponse] = useState('')
  const [isStreamComplete, setIsStreamComplete] = useState(false)

  const [gptLoading, setGptLoading] = useState(false)

  const router = useRouter();

  useEffect(() => {
    if (queryString) {
      fetchDataCallBAck()
      // fetchAIPageReference()
    }
  }, [queryString])
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
      body: JSON.stringify({ query: queryString}),
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
    <>
      <p>
        {queryString}
      </p>
      <p>
        {aiResponse}
      </p>
    </>
  );
}


