import { XCircleIcon } from '@heroicons/react/24/outline'

export default function ErrorDisplay({ errorList }: { errorList: string[] }) {
  return (
    <>
      {
        errorList.length > 0 &&
        <div className="rounded-md bg-red-50 p-4 m-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{errorList.length} error(s)</h3>
              <div className="mt-2 text-sm text-red-700">
                <ul role="list" className="list-disc space-y-1 pl-5">
                  {
                    errorList.map((item, idx) =>
                      <li key={idx}>{item}</li>
                    )
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}
