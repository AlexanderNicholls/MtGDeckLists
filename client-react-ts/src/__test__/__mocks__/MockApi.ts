const Logs = {
  CallHistory: {} as { [key: string]: {}[] },
  LogCall: (url: string, params: string[]) => {
    Logs.CallHistory[url] ??= [];
    Logs.CallHistory[url].push({
      uri: url,
      params: params,
    });
  },
};

const URIs = {
  BaseUrl: "http://localhost:5000/api",
  get GetByCardName() {
    return `${this.BaseUrl}/GetCards`;
  },
};

export { Logs, URIs };
