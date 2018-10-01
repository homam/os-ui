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
      rockmanId: string
    },
    startTime: number,
    url: string
  }
}