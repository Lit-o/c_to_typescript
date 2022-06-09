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

interface CurrencyConvertStateActionInterface {
    type: CurrencyConvertTypes.CURRENCY_CONVERT_STATE,
    base: string,
    interest: string
}

interface CurrencyConvertActionInterface {
    type: CurrencyConvertTypes.CURRENCY_CONVERT,
    result: number
}

export type CurrencyConvertActionsTypeRoot = CurrencyConvertActionInterface | CurrencyConvertStateActionInterface

// const exchangeReducer = (state = initialState, action:ExchangeActionsType):ExchangeStateType => {
// const converterReducer:(state:CurrencyConvertStateType, action:CurrencyConvertActionsTypeRoot) => CurrencyConvertStateType = (state = initialState, action) => {

const converterReducer = (state = initialState, action:CurrencyConvertActionsTypeRoot): CurrencyConvertStateType  => {
    switch (action.type) {
        case CurrencyConvertTypes.CURRENCY_CONVERT_STATE: {
            return {
                ...state,
                base: action.base,
                interest: action.interest,
                isFetching: true
            }
        }
        case CurrencyConvertTypes.CURRENCY_CONVERT: {
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

export const getConvertAC = (result:number):CurrencyConvertActionsTypeRoot => ({ type: CurrencyConvertTypes.CURRENCY_CONVERT, result });
export const getConvertStateAC = (base:string, interest:string):CurrencyConvertActionsTypeRoot => ({ type: CurrencyConvertTypes.CURRENCY_CONVERT_STATE, base, interest });

export const getConvertTC = (base:string, interest:string, value:number) => {
    return (dispatch:any) => {
        dispatch(getConvertStateAC(base, interest))
        currencyAPI.convert(base, interest, value).then((response:any) => {
            dispatch(getConvertAC(response))
        })
    }
}


export default converterReducer;



