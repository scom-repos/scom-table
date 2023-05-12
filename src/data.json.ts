export default {
  "defaultBuilderData": {
    "apiEndpoint": "https://api.dune.com/api/v1/query/2030664/results?api_key=GZ0R7Jim7TWLY7umXitxtiswiaD4eM7j",
    "options": {
      "title": "Ethereum Beacon Chain Deposits Entity",
      "columns": [
        {
          "name": "ranking",
          "title": "Rnk"
        },
        {
          "name": "entity",
          "title": "Pool name"
        },
        {
          "name": "eth_deposited",
          "type": "progressbar",
          "title": "ETH deposited",
          "numberFormat": "0,000."
        },
        {
          "name": "validators",
          "title": "Validators",
          "numberFormat": "0,000"
        },
        {
          "name": "marketshare",
          "title": "Share",
          "numberFormat": "0,000.00%"
        }
      ]
    }
  }
}
