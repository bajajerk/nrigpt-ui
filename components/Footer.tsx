import Link from 'next/link';
import s from './Footer.module.css';

import { HeartIcon } from '@heroicons/react/24/solid';

export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="mx-auto max-w-[1920px] px-4 bottom-0 mt-16 inset-x-0">
      {/* <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-zinc-600 py-12 text-white transition-colors duration-150 bg-zinc-900">
        <div className="col-span-1 lg:col-span-2">
          <Link href="/">
            <a className="flex flex-initial items-center font-bold md:mr-24">
              <span className="rounded-full border border-zinc-700 mr-2">
                <Logo />
              </span>
              <span>ACME</span>
            </a>
          </Link>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <ul className="flex flex-initial flex-col md:flex-1">
            <li className="py-3 md:py-0 md:pb-4">
              <Link href="/">
                <a className="text-white hover:text-zinc-200 transition ease-in-out duration-150">
                  Home
                </a>
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link href="/">
                <a className="text-white hover:text-zinc-200 transition ease-in-out duration-150">
                  About
                </a>
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link href="/">
                <a className="text-white hover:text-zinc-200 transition ease-in-out duration-150">
                  Careers
                </a>
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link href="/">
                <a className="text-white hover:text-zinc-200 transition ease-in-out duration-150">
                  Blog
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <ul className="flex flex-initial flex-col md:flex-1">
            <li className="py-3 md:py-0 md:pb-4">
              <p className="text-white font-bold hover:text-zinc-200 transition ease-in-out duration-150">
                LEGAL
              </p>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link href="/">
                <a className="text-white hover:text-zinc-200 transition ease-in-out duration-150">
                  Privacy Policy
                </a>
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link href="/">
                <a className="text-white hover:text-zinc-200 transition ease-in-out duration-150">
                  Terms of Use
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1 lg:col-span-6 flex items-start lg:justify-end text-white">
          <div className="flex space-x-6 items-center h-10">
            <a
              aria-label="Github Repository"
              href="https://github.com/vercel/nextjs-subscription-payments"
            >
              <GitHub />
            </a>
          </div>
        </div>
      </div> */}
      {/* <div className="py-4 flex flex-col md:flex-row justify-between items-center space-y-4 text-gray-800">
        <div>
          <span>&copy; {currentYear} Trade94. All rights reserved.</span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-800">Crafted with</span>
          <HeartIcon className="ml-1 w-6 h-6 text-red-700" />
        </div>
      </div> */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500 sm:text-end">
          <div className="inline-flex flex-col md:flex-row">
            <span className="sm:inline">&copy; {currentYear} Inri.</span>
            <span className="ml-1 sm:inline">All rights reserved.</span>
            <div className="ml-1 sm:inline">
              <span>Crafted with</span>
              <HeartIcon className="inline ml-0.5 -mt-1 w-5 h-5 text-red-700" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
