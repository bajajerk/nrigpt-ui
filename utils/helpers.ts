export const getURL = () => {
    const url =
      process?.env?.URL && process.env.URL !== ''
        ? process.env.URL
        : process?.env?.VERCEL_URL && process.env.VERCEL_URL !== ''
          ? process.env.VERCEL_URL
          : 'http://localhost:3000';
    return url.includes('http') ? url : `https://${url}`;
  };
  
  export const getInvestNowURL = () => {
    return 'https://forms.gle/S4UgAeCk976rLsgg8';
  };
  
  export const toDateTime = (secs: number) => {
    var t = new Date('1970-01-01T00:30:00Z'); // Unix epoch start.
    t.setSeconds(secs);
    return t;
  };
  
  export const classNames = (...classes: String[]) => {
    return classes.filter(Boolean).join(' ')
  }