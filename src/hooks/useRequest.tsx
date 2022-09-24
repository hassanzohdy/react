import { getCurrentEndpoint } from "@mongez/http";
import { AxiosResponse } from "axios";
import React from "react";
import useOnce from "./useOnce";

type StateType = {
  value: AxiosResponse<any, any> | null;
  error: null | AxiosResponse<any, any>;
  isLoading: boolean;
};

export default function useRequest(
  promiseFunction: () => Promise<any>,
  endpoint = getCurrentEndpoint()
): any {
  const [state, setState] = React.useState<StateType>({
    value: null,
    error: null,
    isLoading: true,
  });

  useOnce(() => {
    promiseFunction()
      .then((response: AxiosResponse) => {
        setState({
          value: response,
          isLoading: false,
          error: null,
        });
      })
      .catch((response) => {
        if (response.__CANCEL__ === true) return;

        setState({
          value: null,
          isLoading: false,
          error: response,
        });
      });

    const currentRequest = endpoint.getLastRequest();

    return () => currentRequest?.abort && currentRequest.abort();
  });

  return {
    response: state.value,
    error: state.error,
    isLoading: state.isLoading,
  };
}
