import Vue from 'vue';

document.addEventListener("DOMContentLoaded", () => {
  new Vue({
    el: "#app",
    data: {
      exchangeRates: {},
      toCurrencyIndex: '',
      toCurrency: null,
      exchangeAmount: 0,
      result: 0,
      fromCurrency: 'EUR',
      fromCurrencyIndex: ''
    },
    mounted(){
      this.getRates()
    },
    methods: {
      getRates: function (){
        fetch('https://api.exchangeratesapi.io/latest')
        .then(response => response.json())
        .then(data => this.exchangeRates = data.rates)
        .then(()=> this.exchangeRates['EUR'] = 1.0)
      },
      currencySelect: function (){
        this.toCurrency = this.exchangeRates[this.toCurrencyIndex]
      },
      exchangeCurrency: function (){
        const euros = this.exchangeAmount / this.exchangeRates[this.fromCurrencyIndex]
        this.result = euros * this.exchangeRates[this.toCurrencyIndex]
        this.result = Math.round(this.result * 100) / 100
      }
    }
  })
})
