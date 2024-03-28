import React, { Component } from 'react';
import CryptoItem from '../CryptoItem';
import './index.css'

class CryptoPrices extends Component {
    state = {
        cryptoData: [],
        chartName: '',
        disclaimer: ''
    }

    componentDidMount() {
        this.getCrypto()
    }

    getCrypto = async () => {
        const api = 'https://api.coindesk.com/v1/bpi/currentprice.json'
        const options = {
            method: 'GET'
        }
        const response = await fetch(api, options)
        if (response.ok) {
            const data = await response.json()
            const usd = {
                code: data.bpi.USD.code,
                symbol: data.bpi.USD.symbol,
                rate: data.bpi.USD.rate,
                description: data.bpi.USD.description,
                rateFloat: data.bpi.USD.rate_float
            }
            const gbp = {
                code: data.bpi.GBP.code,
                symbol: data.bpi.GBP.symbol,
                rate: data.bpi.GBP.rate,
                description: data.bpi.GBP.description,
                rateFloat: data.bpi.GBP.rate_float
            }
            const eur = {
                code: data.bpi.EUR.code,
                symbol: data.bpi.EUR.symbol,
                rate: data.bpi.EUR.rate,
                description: data.bpi.EUR.description,
                rateFloat: data.bpi.EUR.rate_float
            }
            const disclaimer = data.disclaimer;
            const chartName = data.chartName;
            const filteredData = [
                usd,
                gbp,
                eur,
            ]
            console.log(filteredData)
            this.setState({ cryptoData: filteredData, disclaimer, chartName })
        }
        else {
            console.log('Error occured while fetching crypto data')
        }
    }

    render() {
        const { cryptoData, chartName, disclaimer } = this.state
        return (
            <div className='cryptoContainer'>
                <h1>{chartName}</h1>
                <div className='container'>
                    {cryptoData.map((item) => (
                        <CryptoItem details={item} key={item.code} />
                    ))}
                </div>
                <p>* {disclaimer}</p>
            </div>
        );
    }
};

export default CryptoPrices;