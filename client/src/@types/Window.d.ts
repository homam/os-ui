interface Navigator {
  connection: any;
  userLanguage: any;
  browserLanguage: any;
  systemLanguage: any;
  oscpu: any;
}

interface Window {
  openDatabase: any;
  pac_analytics?: {
    visitor: {
      country: string,
      rockmanId: string,
      impressionNumber: number,
      page: string,
      xaid: string,
      offer: number
    },
    startTime: number,
    url: string,
    queryString: (key: string) => string
  }
  dataLayer: {
    push: (...args) => void
  }
}