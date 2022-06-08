import { currencyAPI } from "../api/api";

enum ExchangeTypes {
    ADD_BASE_CURRENCY = 'C/SRC/REDUX/EXCHANGE_REDUCER/ADD_BASE_CURRENCY',
    ADD_ACTUAL_RATES = 'C/SRC/REDUX/EXCHANGE_REDUCER/ADD_ACTUAL_RATES'
}

type AllRates = 'USD' | 'EUR' | 'RUB'

let initialState = {
    baseApp: 'USD' as AllRates,
    interests: ['USD', 'EUR', 'RUB'] as Array<AllRates>,
    actualRates: [] as Array<Object>,
    isFetching: false
}

// actualRates Object
// base: "USD"
// date: "2022-06-07"
// motd:
// msg: "If you or your company use this project or like what we doing, please consider backing us so we can continue maintaining and evolving this project."
// url: "https://exchangerate.host/#/donate"
// [[Prototype]]: Object
// rates: {RUB: 60.997338}
// success: true

const exchangeReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case ExchangeTypes.ADD_BASE_CURRENCY: {
            return {
                ...state,
                baseApp: action.base
            }
        }
        case ExchangeTypes.ADD_ACTUAL_RATES: {
            return {
                ...state,
                actualRates: [...action.actualRates]
            }
        }
        default:
            return state;
    }
}

interface SetBaseActionI {
    type: ExchangeTypes.ADD_BASE_CURRENCY;
    base: AllRates
}

export const setBaseAC = (base:AllRates):SetBaseActionI => ({ type: ExchangeTypes.ADD_BASE_CURRENCY, base });
export const getActualRatesAC = (actualRates: any) => ({ type: ExchangeTypes.ADD_ACTUAL_RATES, actualRates });


export const setActualRatesTC = (interests:any, baseApp:AllRates) => {
    return (dispatch:any) => {
        dispatch(setBaseAC(baseApp))
        currencyAPI.getArrRates(interests, baseApp).then((response:any) => {
            dispatch(getActualRatesAC(response))
        })
    }
}


export default exchangeReducer;


