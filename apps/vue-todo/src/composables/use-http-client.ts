export function useHttpClient(baseUrl: string = '') {
  function get(url: string, params: Record<string, any> = {}) {
    return fetch(baseUrl + url + `?${new URLSearchParams(params).toString()}`, {
      method: 'GET',
    }).then((res) => res.json());
  }

  function post(url: string, body: Record<string, any> = {}) {
    return fetch(baseUrl + url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  function patch(url: string, body: Record<string, any> = {}) {
    return fetch(baseUrl + url, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  function del(url: string) {
    return fetch(baseUrl + url, {
      method: 'DELETE',
    });
  }

  return {
    get,
    post,
    patch,
    del,
  };
}
