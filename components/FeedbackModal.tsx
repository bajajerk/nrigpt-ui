import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'

import { useSession } from '@supabase/auth-helpers-react'
import { Message } from '../types/message'
import ErrorDisplay from './ErrorDisplay'
import { supabase } from '../utils/supabaseConfig'


export default function
  FeedbackModal({
                  message,
                  closeModal,
                  isOpen,
                }: { message: Message, closeModal: () => void, isOpen: boolean }) {
  const session = useSession()
  const [loading, setLoading] = useState(false)


  const [errorList, setErrorList] = useState<string[]>([])
  const [feedback, setFeedback] = useState<string>('')

  const sendFeedback = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('gpt_feedback')
      .insert([
        {
          question: message.queryString,
          answer: message.answer,
          feedback: feedback,
        }
      ])
    setLoading(false)
    closeModal()
  }
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-30' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel
                  className='w-full max-w-md transform overflow rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-semibold leading-6 text-blue-700 px-2 sm:px-6'
                  >
                    Provide additional feedback
                  </Dialog.Title>

                  <div>
                    <div className='col-span-full'>
                      <div className='py-6 sm:p-6 lg:pb-8 text-gray-700'>
                        <textarea
                          id='about'
                          name='about'
                          rows={3}
                          placeholder={'What was the issue with the response? How could it be improved?'}
                          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6'
                          defaultValue={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                        />
                      </div>
                    </div>


                    <ErrorDisplay errorList={errorList} />
                    <div className='mt-4'>
                      <div className='flex justify-end'>
                        <button type='submit'
                                className='ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-6 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                                disabled={loading || !feedback}
                                onClick={() => sendFeedback()}>
                          {loading ? 'Sending...' : 'Send'}
                        </button>
                        <button type='submit'
                                className='ml-3 inline-flex justify-center rounded-md border border-transparent bg-gray-200 py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
                                onClick={closeModal}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
