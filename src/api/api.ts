// import * as axios from "axios";
import axios, { AxiosResponse } from "axios";
import { ActualRatesObject, AllRates } from "../redux/exchangeReducer";

const instance = axios.create({
    baseURL: 'https://api.exchangerate.host/latest'
})

export const currencyAPI = {
    
    getArrRates(baseArr: Array<AllRates>, symbols: string) {
        return axios.all(baseArr.map(result => {
            return instance.get<ActualRatesObject>("?base=" + result + "&symbols=" + symbols)
                .then(response => {
                    return response.data
                })
        }))
    },

    convert(base: string, interest: string, value: number) {
        return instance.get<ActualRatesObject>("?base=" + base + "&symbols=" + interest + "&amount=" + value)
            // .then((response: AxiosResponse<any>) => {
            .then((response) => {
                console.log(response.data.date)
                return response.data.rates[interest]
            })
    }
}


























