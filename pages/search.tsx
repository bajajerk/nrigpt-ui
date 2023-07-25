import {useEffect, useState} from "react";
import axios from 'axios'
import {useRouter} from "next/router";
import teaserGif from '../images/teaser.gif'
import Image from 'next/image'

export default function Search() {
  const [aiResponse, setAiResponse] = useState('')
  const [pageReference, setPageReference] = useState('')
  const [pageLinks, setPageLinks] = useState([])
  const [isStreamComplete, setIsStreamComplete] = useState(false)

  const [gptLoading, setGptLoading] = useState(false)

  const router = useRouter();
  const { query } = router;

  const queryString = query.q;

  useEffect(() => {
    if (queryString) {
      fetchDataCallBAck()
      // fetchAIPageReference()
    }
  }, [queryString])

  const fetchAIPageReference = async () => {
    setPageReference(null)
    const { data } = await axios.post('https://www.goinri.com/api/get-blog-page', {
      query: queryString
    })
    setPageReference(data?.pageLink)
    setPageLinks(data?.allPageLinksFound || [])
  }

  const fetchDataCallBAck = async () => {
    setGptLoading(true)
    setAiResponse('')
    setPageReference(null)
    const response2 = await fetch('https://staging.goinri.com/api/gpt-search', {
      method: 'POST',
      body: JSON.stringify({ query: queryString}),
    })
    if (!response2.ok) {
      throw new Error('SSE request failed')
    }

    const reader = response2.body.getReader()
    let result = ''
    let done = false

    while (!done) {
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
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <p className="text-base font-semibold leading-7 text-indigo-600">NRI GPT</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{queryString}</h1>
            <div className="mt-10 grid max-w-xl grid-cols-1 gap-8 text-base leading-7 text-gray-700 lg:max-w-none lg:grid-cols-2">
              <div>
                <p>
                  {aiResponse || 'Loading...'}
                </p>
                {/*<p className="mt-8">*/}
                {/*  Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id blandit molestie auctor*/}
                {/*  fermentum dignissim. Lacus diam tincidunt ac cursus in vel. Mauris varius vulputate et ultrices hac*/}
                {/*  adipiscing egestas.*/}
                {/*</p>*/}
              </div>
              <div>
                <Image src={teaserGif}
                       className="rounded-2xl shadow-lg shadow-blue-300 saturate-100"
                       alt="Inri Teaser"
                       width={800}
                       height={500}
                       >

                </Image>
              </div>
            </div>
            <div className="mt-10 flex">
              <a
                href="@/components/pages/search#"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Read more on NRI Taxation
              </a>
            </div>
          </div>
        </div>
      </div>


      {/*<p> {queryString} </p>*/}
      {/*{aiResponse !== '' && (*/}
      {/*    <div className={'flex flex-row items-start py-8 px-4 '}>*/}
      {/*        <p className="px-2 text-sm text-slate-700 dark:text-slate-400">*/}
      {/*          <span className="break-words text-slate-900 dark:text-white">*/}
      {/*            {aiResponse}*/}
      {/*          </span>*/}
      {/*        </p>*/}
      {/*    </div>*/}
      {/*)}*/}
    </>
  );
}


