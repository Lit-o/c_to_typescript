import { currencyAPI } from "../api/api";

enum ExchangeTypes {
    ADD_BASE_CURRENCY = 'C/SRC/REDUX/EXCHANGE_REDUCER/ADD_BASE_CURRENCY',
    ADD_ACTUAL_RATES = 'C/SRC/REDUX/EXCHANGE_REDUCER/ADD_ACTUAL_RATES'
}

type AllRates = 'USD' | 'EUR' | 'RUB'

interface ActualRatesObject {
    base: AllRates;
    rates: {[key: string]: number};
    // rates: {[key: AllRates]: number}; 
    // doesn't work
    date?: string;
    motd?: {msg: string, url:string};
    success?: boolean
}

let initialState = {
    baseApp: 'USD' as AllRates,
    interests: ['USD', 'EUR', 'RUB'] as Array<AllRates>,
    actualRates: [] as Array<ActualRatesObject>,
    isFetching: false
}

export type ExchangeStateType = typeof initialState

interface SetBaseActionI {
    type: ExchangeTypes.ADD_BASE_CURRENCY;
    base: AllRates
}
interface GetActualRatesActionI {
    type: ExchangeTypes.ADD_ACTUAL_RATES;
    actualRates: Array<ActualRatesObject>
}

export type ExchangeActionsType = SetBaseActionI | GetActualRatesActionI

const exchangeReducer = (state = initialState, action:ExchangeActionsType):ExchangeStateType => {
    switch (action.type) {
        case ExchangeTypes.ADD_BASE_CURRENCY: {
            return {
                ...state,
                baseApp: action.base,
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

export const setBaseAC = (base:AllRates):SetBaseActionI => ({ type: ExchangeTypes.ADD_BASE_CURRENCY, base });
export const getActualRatesAC = (actualRates: Array<ActualRatesObject>):GetActualRatesActionI => ({ type: ExchangeTypes.ADD_ACTUAL_RATES, actualRates });

export const setActualRatesTC = (interests:AllRates, baseApp:AllRates) => {
    return (dispatch:any) => {
        dispatch(setBaseAC(baseApp))
        currencyAPI.getArrRates(interests, baseApp).then((response:Array<ActualRatesObject>) => {
            dispatch(getActualRatesAC(response))
        })
    }
}

export default exchangeReducer;


// actualRates Object
// base: "USD"
// date: "2022-06-07"
// motd:
// msg: "If you or your company use this project or like what we doing, please consider backing us so we can continue maintaining and evolving this project."
// url: "https://exchangerate.host/#/donate"
// [[Prototype]]: Object
// rates: {RUB: 60.997338}
// success: true


// Вопрос по Ts
// type AllRates = 'USD' | 'EUR' 
// interface actualRatesObject {
//     base: AllRates;
//     rates: {???}
//     ....    
//     //rates содержит объект {} с одним свойством которое придет от сервера. Свойство может быть USD | EUR  со значением number
//     // тот вариант, который я нашел рабочий:
//      rates: {[key: string]: number};
//     //но хотелось, чтобы работало по логике, которая строчкой ниже
//     // rates: {[key: AllRates]: number}; 
//     // a этот вариант не работает
// }

// Как реализовать rates: {[key: AllRates]: number} по-другому?
// Если что Ts предлагает: An index signature parameter type cannot be a literal type or generic type. Consider using a mapped object type instead. 
// Понимаю на что жалуется, но не пойму какое решение он предлагает
