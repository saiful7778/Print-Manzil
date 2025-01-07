import { useEffect, useState } from "react";

export default function useFetch<T>(apiUrl: string) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorValue, setErrorValue] = useState<Error | null>(null);
  const [data, setData] = useState<T | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const res = await fetch(apiUrl);

        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        const data = (await res.json()) as T;
        setData(data);
      } catch (err) {
        if (err instanceof Error) {
          setIsError(true);
          setErrorValue(err);
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, [apiUrl]);

  return { isLoading, isError, errorValue, data };
}
