export default {
  "defaultBuilderData": {
    // "apiEndpoint": "/dune/query/2030664",
    "dataSource": "Dune",
    "queryId": "2030664",
    "title": "Ethereum Beacon Chain Deposits Entity",
    "options": {
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
