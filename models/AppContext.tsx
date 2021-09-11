import React, { createContext, useContext, useEffect, useState } from 'react';
import { getInitialState as appGetInitialState } from './state';

type ThenArg<T> = T extends Promise<infer U> ? U : T;

export interface AppContextState {
  initialState: ThenArg<ReturnType<typeof appGetInitialState>>;
  loading: boolean;
  error: Error | undefined;
  setInitialState: React.Dispatch<ThenArg<ReturnType<typeof appGetInitialState>>>;
  refresh: () => void;
}

export const AppContext = createContext<AppContextState>({} as AppContextState);

export const useAppContext = () => {
  return useContext(AppContext);
};

const AppContextProvider: React.FC = (props) => {
  const setInitialState = (value: any) => {
    setState({
      ...state,
      initialState: {
        ...state.initialState,
        ...value,
      },
    });
  };
  const refresh = () => {
    appGetInitialState()
      .then((res) => {
        setState({ ...state, loading: false, error: undefined, initialState: res });
      })
      .catch((res) => {
        setState({ ...state, loading: false, error: res });
      });
  };

  const [state, setState] = useState<AppContextState>({
    initialState: {} as any,
    loading: true,
    error: undefined,
    setInitialState,
    refresh,
  });

  useEffect(() => {
    refresh();
  }, []);

  return (
    <AppContext.Provider
      value={{
        initialState: state.initialState,
        loading: state.loading,
        error: state.error,
        setInitialState,
        refresh,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
export default AppContextProvider;
