/* eslint-disable prettier/prettier */
import { useState } from 'react';

export const useSafeCode = initialState => {
  const [state, setState] = useState({ ...initialState, error: null });
  const runSafeCode = stateUpdater => {
    if (typeof stateUpdater === 'function') {
      setState(state => {
        try {
          return { error: null, ...stateUpdater(state) };
        } catch (error) {
          return { ...state, error };
        }
      });
    } else {
      setState({ error: null, ...stateUpdater });
    }
  };

  return [state, runSafeCode];
};
