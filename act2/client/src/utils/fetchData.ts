interface FetchDataProps<T> {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: T;
}

interface FetchDataFunction {
  <T>(params: FetchDataProps<T>): Promise<T | undefined>;
}

const fetchData: FetchDataFunction = async ({ url, method, data }) => {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

export default fetchData;
