import * as DiamSdk from 'diamnet-sdk';
import fetch from 'node-fetch';

const server = new DiamSdk.Aurora.Server("https://diamtestnet.diamcircle.io/");
const distributorKeypair = DiamSdk.Keypair.fromSecret("SACERBLCXR3ZEQA2X6GLVRBCU2KYTRAHBD5JSU5AVFADYI4GNOS7RVKK"); // Replace with the distributor's secret key

async function checkAssetBalance() {
  try {
    // Load the distributor account
    const distributorAccount = await server.loadAccount(distributorKeypair.publicKey());

    // Find the balance for the specific asset
    const assetCode = "AstroDollar"; // The asset code you're checking
    const issuerPublicKey = "GDJIUZLXP5A6J4IJLQYOOPAYV5HTFEOEWQQ3GECTRK7GBLRLZ3W3OEDQ"; // Replace with the actual issuer public key
    const asset = new DiamSdk.Asset(assetCode, issuerPublicKey);

    // Check the balances
    const balances = distributorAccount.balances;
    const assetBalance = balances.find(balance => balance.asset_code === assetCode && balance.asset_issuer === issuerPublicKey);

    if (assetBalance) {
      console.log(`Distributor account balance for ${assetCode}: ${assetBalance.balance}`);
    } else {
      console.log(`Distributor account does not hold any ${assetCode} asset.`);
    }
  } catch (error) {
    console.error("Error fetching account balance:", error);
  }
}

// Call the function to check the balance
checkAssetBalance();