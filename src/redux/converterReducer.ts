import { currencyAPI } from "../api/api";

enum CurrencyConvertTypes {
    CURRENCY_CONVERT = 'C/SRC/REDUX/CONVERT_REDUCER/CURRENCY_CONVERT',
    CURRENCY_CONVERT_STATE = 'C/SRC/REDUX/CONVERT_REDUCER/CURRENCY_CONVERT_STATE'
}

const initialState = {
    base: null as string | null,
    interest: '' as string | null,
    result: 0 as number | null,
    isFetching: false as boolean 
}

export type CurrencyConvertStateType = typeof initialState;

interface CurrencyConvertActionInterface {
    type: CurrencyConvertTypes.CURRENCY_CONVERT,
    base: string,
    interest: string
}

interface CurrencyConvertStateActionInterface {
    type: CurrencyConvertTypes.CURRENCY_CONVERT_STATE,
    result: number
}

export type CurrencyConvertActionsTypeRoot = CurrencyConvertActionInterface | CurrencyConvertStateActionInterface

const converterReducer:(state: CurrencyConvertStateType, action: CurrencyConvertActionsTypeRoot) => CurrencyConvertStateType = (state = initialState, action) => {
    switch (action.type) {
        case CurrencyConvertTypes.CURRENCY_CONVERT: {
            return {
                ...state,
                base: action.base,
                interest: action.interest,
                isFetching: true
            }
        }
        case CurrencyConvertTypes.CURRENCY_CONVERT_STATE: {
            return {
                ...state,
                result: action.result,
                isFetching: false
            }
        }
        default:
            return state;
    }
}

export const getConvertAC = (result:string) => ({ type: CurrencyConvertTypes.CURRENCY_CONVERT, result });
export const getConvertStateAC = (base:string, interest:string) => ({ type: CurrencyConvertTypes.CURRENCY_CONVERT_STATE, base, interest });

export const getConvertTC = (base:string, interest:string, value:any) => {
    return (dispatch:any) => {
        dispatch(getConvertStateAC(base, interest))
        currencyAPI.convert(base, interest, value).then((response:any) => {
            dispatch(getConvertAC(response))
        })
    }
}


export default converterReducer;



