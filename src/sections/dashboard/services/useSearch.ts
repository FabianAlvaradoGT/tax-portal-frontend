import axios from 'axios'
import { useEffect, useReducer } from 'react'

import { dataReducer, initialState } from './dataReducer'

import type { DataState, DataAction } from './dataReducer'

type UseFetchDataReturn = {
  state: DataState
  dispatch: React.Dispatch<DataAction>
}

export function useSearch(url: string): UseFetchDataReturn {
  const [state, dispatch] = useReducer(dataReducer, initialState)

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_DATA_START' })

      try {
        const response = await axios.get(url)
        dispatch({ type: 'FETCH_DATA_SUCCESS', payload: response.data })
      } catch (error: any) {
        dispatch({ type: 'FETCH_DATA_ERROR', payload: error.message })
      }
    }

    fetchData()
  }, [url])

  return { state, dispatch }
}
