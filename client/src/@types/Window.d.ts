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
      page: string,
      xaid: string,
    },
    startTime: number,
    url: string
  }
  dataLayer: {
    push: (...args) => void
  }
}