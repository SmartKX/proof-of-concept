window.addEventListener('load', async () => {
	if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      await ethereum.enable();
      console.log('Connection Established');
    } catch (error) {
      console.log('Connection Not Established');
    }
	}

	else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
    // Acccounts always exposed
    web3.eth.sendTransaction({/* ... */});
	}
	// Non-dapp browsers...
	else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
	}
});

var address  = '0xd1Df4eFc6b7d47D00E21566B668a9cbbBf5D26D0';
var abi = [{"constant":true,"inputs":[],"name":"eMap","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"breaks","outputs":[{"name":"","type":"int64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_year","type":"uint16"},{"name":"_quarter","type":"uint8"}],"name":"calculate","outputs":[],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numAccounts","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_year","type":"uint16"},{"name":"_quarter","type":"uint8"},{"name":"_account","type":"uint8"}],"name":"getAccountValue","outputs":[{"name":"","type":"int64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"keyOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getFeeSchedule","outputs":[{"name":"","type":"int64[]"},{"name":"","type":"int64[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_year","type":"uint16"},{"name":"_quarter","type":"uint8"},{"name":"_account","type":"uint8"},{"name":"_value","type":"int64"}],"name":"setAccountValue","outputs":[{"name":"","type":"int64"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"rates","outputs":[{"name":"","type":"int8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"keyManager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_year","type":"uint16"},{"name":"_quarter","type":"uint8"}],"name":"getAccountValues","outputs":[{"name":"","type":"int64[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint16"},{"name":"","type":"uint8"},{"name":"","type":"uint8"}],"name":"accounts","outputs":[{"name":"","type":"int64"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_keyManager","type":"address"},{"name":"_numAccounts","type":"uint8"},{"name":"_eMap","type":"string"},{"name":"_breaks","type":"int64[]"},{"name":"_rates","type":"int8[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"","type":"int256"}],"name":"ReportAum","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"","type":"int64[]"}],"name":"ReportSplits","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"","type":"uint256"}],"name":"ReportFeeTotal","type":"event"}];

let contract = web3.eth.contract(abi);
let skx = contract.at(address);

let escan = "https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=0xd1Df4eFc6b7d47D00E21566B668a9cbbBf5D26D0&startblock=0&endblock=99999999&sort=asc&apikey=E2Z51ZDBPTNM2XXX4MXZIDUZHVWY5MQVY6";

$('.skx-account-value').each(function(i,o) {
  skx.getAccountValue(2018,1,i, (e,v) => $(o).val(v))
});

var selector = new Vue({
  el: '#selector',
  data: {
    households: [
      {
        name: 'John Smith Family (...010)',
        contractHash: '0xd1Df4eFc6b7d47D00E21566B668a9cbbBf5D26D0'
      },
      {
        name: 'Mary Williams Family (...736)',
        contractHash: '0xd1Df4eFc6b7d47D00E21566B668a9cbbBf5D26D0'
      },
      {
        name: 'Greg Andrews Family (...893)',
        contractHash: '0xd1Df4eFc6b7d47D00E21566B668a9cbbBf5D26D0'
      }      
    ]
  }
});

$().