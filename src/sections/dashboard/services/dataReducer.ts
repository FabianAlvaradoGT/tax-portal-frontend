export interface Data {
  uuid: string
  uuid_cliente: string
  rut: string
  razon_social: string
  estado: boolean
  domicilio: string | null
  email: string | null
}

// Definimos la forma de nuestro estado
export interface DataState {
  data: Data[] // Aquí puedes usar el tipo específico de tu data
  loading: boolean
  error: string | null
}

// Definimos la forma de las acciones
// Si deseas más granularidad, podrías usar tipos para los distintos payloads.
export type DataAction =
  | { type: 'FETCH_DATA_START' }
  | { type: 'FETCH_DATA_SUCCESS'; payload: any[] }
  | { type: 'FETCH_DATA_ERROR'; payload: string }

// Estado inicial
export const initialState: DataState = {
  data: [],
  loading: false,
  error: null,
}

// Reducer
export function dataReducer(state: DataState, action: DataAction): DataState {
  switch (action.type) {
    case 'FETCH_DATA_START':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'FETCH_DATA_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case 'FETCH_DATA_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
