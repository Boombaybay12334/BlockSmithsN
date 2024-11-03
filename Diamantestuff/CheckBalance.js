import * as DiamSdk from 'diamnet-sdk';

const server = new DiamSdk.Aurora.Server("https://diamtestnet.diamcircle.io/");
const id = "GBHVIZH5JQL3AVNQLKIBJIKD3KLGEZRHGWCFSM2DT7WE5B52O6VIVYDY"
// the JS SDK uses promises for most actions, such as retrieving an account
const account = await server.loadAccount(id);
console.log("Balances for account: " + id);
account.balances.forEach(function (balance) {
  console.log("Type:", balance.asset_type, ", Balance:", balance.balance);
});