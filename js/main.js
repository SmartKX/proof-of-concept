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

var address  = '0xc8804a7ed8773a5390ddd00834c3c9ab1a7e67ad';
var abi = [{"constant":true,"inputs":[],"name":"eMap","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"breaks","outputs":[{"name":"","type":"int64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_year","type":"uint16"},{"name":"_quarter","type":"uint8"}],"name":"calculate","outputs":[],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numAccounts","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_year","type":"uint16"},{"name":"_quarter","type":"uint8"},{"name":"_account","type":"uint8"}],"name":"getAccountValue","outputs":[{"name":"","type":"int64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"keyOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getFeeSchedule","outputs":[{"name":"","type":"int64[]"},{"name":"","type":"int64[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_year","type":"uint16"},{"name":"_quarter","type":"uint8"},{"name":"_account","type":"uint8"},{"name":"_value","type":"int64"}],"name":"setAccountValue","outputs":[{"name":"","type":"int64"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"rates","outputs":[{"name":"","type":"int8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"keyManager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_year","type":"uint16"},{"name":"_quarter","type":"uint8"}],"name":"getAccountValues","outputs":[{"name":"","type":"int64[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint16"},{"name":"","type":"uint8"},{"name":"","type":"uint8"}],"name":"accounts","outputs":[{"name":"","type":"int64"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_keyManager","type":"address"},{"name":"_numAccounts","type":"uint8"},{"name":"_eMap","type":"string"},{"name":"_breaks","type":"int64[]"},{"name":"_rates","type":"int8[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"","type":"int256"}],"name":"ReportAum","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"","type":"int64[]"}],"name":"ReportSplits","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"","type":"uint256"}],"name":"ReportFeeTotal","type":"event"}];

let contract = web3.eth.contract(abi);
let skx = contract.at(address);

$('.skx-account-value').each(function(i,o) {
  console.log('i = ' + i);

  skx.getAccountValue(2018,4,i, (e,v) => $(o).val(v))
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

var rates = [
  {lower: 0, upper: 1000000, rate: .01, amount: 0, result: 0},
  {lower: 1000000.01, upper: 3000000, rate: .008, amount: 0, result: 0},
  {lower: 3000000.01, upper: 5000000, rate: .006, amount: 0, result: 0},
  {lower: 5000000.01, upper: Infinity, rate: .004, amount: 0, result: 0}
];


$('#calc').click(maths);

function maths() {
  let total = 0;
  let totalBilled = 0;
  // collect
  $('input[type=text].skx-account-value').val(
    function(a, b) {
      total += parseInt(b);
      console.log(total);
      return b
    }
  );

  console.log('----' + typeof total);

  // gear on
  $('#gear').show();

  // compute
  rates.forEach(function(rate) {
    if (total > rate.lower) {
      console.log(`In range! ${rate.lower} - ${rate.upper}`);
      rate.amount = _.clamp(total, rate.lower, rate.upper);
      rate.result = rate.amount * rate.rate;
    }
  });
  
  totalBilled = rates[0].result + rates[1].result + rates[2].result;

  console.log(`Total - ${total.toLocaleString()}`);
  console.log(`Total Billed ${totalBilled.toLocaleString()}`);

  setTimeout(function() {
    $('#total').text('$' + total.toLocaleString());
    $('#totalBilled').text('$' + totalBilled.toLocaleString());
    $('#rate0 td.amount').text('$' + rates[0].amount.toLocaleString());
    $('#rate0 td.result').text('$' + rates[0].result.toLocaleString());
    $('#rate1 td.amount').text('$' + rates[1].amount.toLocaleString());
    $('#rate1 td.result').text('$' + rates[1].result.toLocaleString());
    $('#rate2 td.amount').text('$' + rates[2].amount.toLocaleString());
    $('#rate2 td.result').text('$' + rates[2].result.toLocaleString());

    total = 0;
    totalBilled = 0;
    $('#gear').hide();
  }, 5000);
}
