import { useEffect, useRef, useState } from "react";

export default function useFetch<T>(apiUrl: string) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorValue, setErrorValue] = useState<Error | null>(null);
  const [data, setData] = useState<T | undefined>(undefined);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    (async () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort(); // Cancel the previous request
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        setIsLoading(true);
        setIsError(false);
        const res = await fetch(apiUrl, { signal: controller.signal });

        if (!res.ok) {
          throw new Error("Something went wrong");
        }

        const result = (await res.json()) as T;
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          if (err.name !== "AbortError") {
            // Ignore abort errors
            setIsError(true);
            setErrorValue(err);
          }
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    })();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [apiUrl]);

  return { isLoading, isError, errorValue, data };
}
