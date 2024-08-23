
interface RequestInit {
  method?: string;
  headers?: {
    [key: string]: string;
  };
  body?: BodyInit | null;
  mode?: RequestMode;
  credentials?: RequestCredentials;
  cache?: RequestCache;
  redirect?: RequestRedirect;
  referrerPolicy?: ReferrerPolicy;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any,
  ignore?: boolean
}

const HOST = 'http://192.168.1.105:3000';

function objectToQueryString(obj: Record<string, string | number>): string {
  const keyValuePairs: string[] = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (value !== null && value !== undefined) {
        keyValuePairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`);
      }
    }
  }
  return keyValuePairs.join('&');
}

class Request {
  public static request<T>(url: string, configs: RequestInit): Promise<T> {
    if(!configs.headers) configs.headers = {};
    const tempData = {
      ...configs.data,
    };

    const method = configs.method?.toLowerCase();
    if (method === 'get') {
      url += `?${objectToQueryString(tempData)}`;
    } else if (method === 'post') {
      configs.headers['Content-Type'] = 'application/json';
      configs.body = JSON.stringify(tempData);
    }
  
    delete configs.data;
    console.log(HOST + url, ': ', configs);
  
    return fetch(HOST + url, {
      // cache: 'no-cache',
      ...configs,
    }).then(async response => {
      if (!response.ok) {
        const errorData = await response.json();
        console.log('2---data: ', errorData);
        return Promise.reject({
          code: errorData.code,
          message: errorData.message,
          data: null
        });
      }
      const data = await response.json();
      console.log('1---data: ', data);
      return data;
    });
  }

  public static get<T>(url: string, configs?: RequestInit) {
    const requestConfigs: RequestInit = {
      method: 'GET',
      ...configs,
    };
    return Request.request<T>(url, requestConfigs);
  }

  public static post<T>(url: string, configs?: RequestInit) {
    const requestConfigs: RequestInit = {
      method: 'POST',
      ...configs,
    };
    return Request.request<T>(url, requestConfigs);
  }
}


export default Request;
