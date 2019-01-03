window.addEventListener('load', async () => {
	if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      await ethereum.enable();
      console.log('Connection Established');
    } catch (error) {
      console.log('Connection Not Established');
    }
	} else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
    // Acccounts always exposed
    web3.eth.sendTransaction({/* ... */});
	} else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
	}
});

Vue.filter('cap', (v) => v.toUpperCase() );
Vue.filter('usd', (v) => numeral(v / 1000000).format('$0a') );
Vue.filter('bps', (v) => numeral(v / 1000000).format('0.00%') );
Vue.filter('ymd', (v) => moment(v, 'YYYYMMDD').format('YYYYMMMDD') );

Vue.component('contract', {
  props: ['contract'],
  template: `
    <div class="card">
      <div class="card-header" id="headingOne">
        <div data-toggle="collapse" :data-target="'#contract' + contract.address" :aria-expanded="contract.active ? 'true' : 'false'" aria-controls="collapseOne">
          <h3 class="">{{ contract.active ? 'Active' : 'Archived' }}</h3>
          <small class="text-muted">{{ contract.start }} - {{ contract.end ? contract.end : 'Present' }}</small>
        </div>
      </div>
      <div v-bind:id="'contract' + contract.address" class="collapse" :class="contract.active ? 'show' : ''" aria-labelledby="headingOne" data-parent="#accordionExample">
        <div class="card-body">
          <div class="row">
            <div class="col-4">
              <p><small>
                Executed: {{ contract.executed | ymd | cap}}<br>
                Accounts: {{ contract.accounts.length }}<br>
                <a v-bind:href="contract.pdfLink">Contract PDF</a><br>
                <a v-bind:href="contract.auditLink">Contract Audit</a>
              </small></p>
              <p class="h6">2019</p>
              <div class="btn-group btn-group-sm btn-group-toggle mb-3" data-toggle="buttons">
                <label class="btn btn-outline-dark">
                  <input type="radio" name="options" id="option1" autocomplete="off" checked> Q1
                </label>
                <label class="btn btn-outline-dark">
                  <input type="radio" name="options" id="option2" autocomplete="off" checked> Q2
                </label>
                <label class="btn btn-outline-dark">
                  <input type="radio" name="options" id="option3" autocomplete="off"> Q3
                </label>
                <label class="btn btn-outline-dark">
                  <input type="radio" name="options" id="option4" autocomplete="off"> Q4
                </label>
              </div>
              <p class="h6">2018</p>
              <div class="btn-group btn-group-sm btn-group-toggle mb-3" data-toggle="buttons">
                <label class="btn btn-outline-dark disabled">
                  <input type="radio" name="options" id="option1" autocomplete="off" checked> Q1
                </label>
                <label class="btn btn-outline-dark">
                  <input type="radio" name="options" id="option2" autocomplete="off" checked> Q2
                </label>
                <label class="btn btn-outline-dark">
                  <input type="radio" name="options" id="option3" autocomplete="off"> Q3
                </label>
                <label class="btn btn-outline-dark">
                  <input type="radio" name="options" id="option4" autocomplete="off"> Q4
                </label>
              </div>
            </div>
            <div class="col">
              <h5>Schedule</h5>
              <table class="table table-sm">
                <tr>
                  <th>Range</th>
                  <th>Rate</th>
                </tr>
                <tr id="rate0" v-for="(split, index) in contract.splits">
                  <td>{{ split | usd | cap }} - {{ contract.splits[index +1 ] | usd | cap }}</td>
                  <td>{{ contract.bps[index] | bps }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `});
Vue.component('household-header', {
  props: ['household'],
  template: `
    <div class="row bg-light border-bottom">
      <div class="col">
        <h1>Household Info</h1>
        <dl class="row">
          <dt class="col-sm-2">Household Name</dt>
          <dd class="col-sm-10">{{ household.name }}</small></dd>
          <dt class="col-sm-2">Account Number</dt>
          <dd class="col-sm-10">{{ household.accountNum }}</dd>
          <dt class="col-sm-2">Manager</dt>
          <dd class="col-sm-10">{{ household.manager }}</dd>
        </dl>
      </div>
    </div>
  `})
Vue.component('navigation', {
  props: ['households'],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow sticky-top">
      <a class="navbar-brand mb-0 h1" href="#">Smart Kx</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Support
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">Documentation</a>
              <a class="dropdown-item" href="#">Support Ticket</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Disabled</a>
          </li>
        </ul>
        <div class="dropdown">
          <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Select a Household
          </button>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#" v-for="household in households">{{household.name}}</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">New Household</a>
          </div>
        </div>
      </div>
    </nav>
  `});

var app = new Vue({
  el: '#app',
  data: {
    households: [
      {
        name: 'John Smith Family',
        accountNum: 732612010,
        manager: 'Money Manager Jason',
        contracts: [{
          active: true,
          address: '0xd1Df4eFc6b7d47D00E21566B668a9cbbBf5D26D0',
          executed: '20180118',
          pdfLink: 'https://docusign.com/skx/xyz.pdf',
          auditLink: 'https://etherscan.io/address/0xd1Df4eFc6b7d47D00E21566B668a9cbbBf5D26D0',
          splits: [0,1000000000000,3000000000000,5000000000000],
          bps: [10000, 8000, 6000, 4000],
          start: 20182,
          end: null,
          accounts: ['B IRA', 'S IRA', 'B&S', 'B Taxable', 'S Taxable', 'Kid Account'],
          data: {
            20182: [250000000000, 10000000000, 500000000000, 1500000000000, 150000000000, 325000000000],
            20183: [275000000000, 11500000000, 500000000000, 1600000000000, 165000000000, 335000000000]
          }
        },
        {
          active: false,
          address: '0xd1Df4eFc6b7d47D00E21566B668a9cbbBf5D2XXX',
          executed: '20160527',
          pdfLink: 'https://docusign.com/skx/abc.pdf',
          auditLink: 'https://etherscan.io/address/0xd1Df4eFc6b7d47D00E21566B668a9cbbBf5D2XXX',
          splits: [0,1000000000000,3000000000000,5000000000000],
          bps: [10000, 8000, 6000, 4000],
          start: 20163,
          end: 20181,
          accounts: ['B IRA', 'S IRA', 'B&S', 'B Taxable', 'S Taxable'],
          data: {
            20182: [250000000000, 10000000000, 500000000000, 1500000000000, 150000000000],
            20183: [275000000000, 11500000000, 500000000000, 1600000000000, 165000000000]
          }
        },
        {
          active: false,
          address: '0xd1Df4eFc6b7d47D00E21566B668a9cbbBf5D2YYY',
          executed: '20160527',
          pdfLink: 'https://docusign.com/skx/abc.pdf',
          auditLink: 'https://etherscan.io/address/0xd1Df4eFc6b7d47D00E21566B668a9cbbBf5D2YYY',
          splits: [0,1000000000000,3000000000000,4000000000000],
          bps: [10000, 8000, 6000, 4000],
          start: 20163,
          end: 20181,
          accounts: ['B IRA', 'S IRA', 'B&S', 'B Taxable'],
          data: {
            20182: [250000000000, 10000000000, 500000000000, 1500000000000],
            20183: [275000000000, 11500000000, 500000000000, 1600000000000]
          }
        }]
      },
      {
        name: 'Mary Williams Family',
        contractHash: '0xd1Df4eFc6b7d47D00E21566B668a9cbbBf5D26D0'
      },
      {
        name: 'Greg Andrews Family',
        contractHash: '0xd1Df4eFc6b7d47D00E21566B668a9cbbBf5D26D0'
      }
    ]
  }
});