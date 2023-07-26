// Logo color - 2563EB
export default function Logo({ width, height }: { width: string, height: string }) {
  return (
    <div className="flex flex-1 justify-center">
      <svg width={width} height={height} viewBox="0 0 562 197" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_27_2)">
          <path d="M86.3017 152.35V18L153.477 85.1751L86.3017 152.35Z" fill="#ffffff" />
          <path d="M71.1751 54.0544V188.405L3.99999 121.23L71.1751 54.0544Z" fill="#ffffff" />
        </g>
        <path d="M200.22 174V53.94H220.2V174H200.22ZM247.66 91.02C250.3 89.7 253.24 88.5 256.48 87.42C259.84 86.22 263.38 85.2 267.1 84.36C270.82 83.52 274.6 82.86 278.44 82.38C282.28 81.9 286 81.66 289.6 81.66C298.12 81.66 305.08 82.86 310.48 85.26C315.88 87.54 319.9 91.14 322.54 96.06C325.18 100.86 326.5 106.92 326.5 114.24V174H307.6V116.76C307.6 114.48 307.3 112.26 306.7 110.1C306.22 107.82 305.2 105.78 303.64 103.98C302.2 102.06 300.04 100.56 297.16 99.48C294.4 98.4 290.74 97.86 286.18 97.86C282.94 97.86 279.58 98.16 276.1 98.76C272.74 99.36 269.56 100.2 266.56 101.28V174H247.66V91.02ZM353.129 174V91.92C354.689 90.96 357.569 89.64 361.769 87.96C365.969 86.28 370.949 84.84 376.709 83.64C382.469 82.32 388.289 81.66 394.169 81.66C397.169 81.66 399.629 81.9 401.549 82.38C403.469 82.86 405.089 83.4 406.409 84V99.12C403.649 98.76 400.769 98.52 397.769 98.4C394.769 98.16 391.769 98.16 388.769 98.4C385.769 98.52 382.829 98.76 379.949 99.12C377.069 99.48 374.429 99.84 372.029 100.2V174H353.129ZM425.563 174V84.18H444.463L444.643 174H425.563ZM425.023 69.24V52.14H445.183V69.24H425.023Z" fill="#ffffff" />
        <defs>
          <filter id="filter0_d_27_2" x="0" y="18" width="157.477" height="178.405" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_27_2" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_27_2" result="shape" />
          </filter>
        </defs>
      </svg>

      {/* <span className="ml-1 text-2xl font-bold text-slate-900 inline-flex items-end">
        Trade
        <span className="text-indigo-600">94</span>
      </span> */}
    </div>
  )
}
