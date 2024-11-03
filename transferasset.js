import * as DiamSdk from 'diamnet-sdk';
const server = new DiamSdk.Aurora.Server("https://diamtestnet.diamcircle.io/");

// Replace with the actual keys
const distributorKeypair = DiamSdk.Keypair.fromSecret("SDL3DOR5R33F36LXY6E2RCJSX7R7N5KG53ZUF7WJ7U7T4IQZQV3STHSV");
const newReceivingKeypair = DiamSdk.Keypair.fromSecret("SACERBLCXR3ZEQA2X6GLVRBCU2KYTRAHBD5JSU5AVFADYI4GNOS7RVKK");
const issuerPublicKey = "GBAGASHOEU3RUGV4YUTS5FEQTYUU4EXIQQ2GG3UONA2YYWCGE2UKYTFJ"; // Replace with the actual issuer public key

// Reference the existing asset
const astroDollar = new DiamSdk.Asset("AstroDollar", distributorKeypair.publicKey());
async function sendAsset() {
  try {
    // Step 1: Check if the distributor account holds the asset
    const distributorAccount = await server.loadAccount(distributorKeypair.publicKey());
    const assetExists = distributorAccount.balances.some(balance => 
      balance.asset_code === "AstroDollar" && balance.asset_issuer === issuerPublicKey
    );

    if (!assetExists) {
      console.log("Distributor account does not hold the asset!");
      return;
    }

    // Step 2: Establish Trustline for the new receiving account
    const newReceivingAccount = await server.loadAccount(newReceivingKeypair.publicKey());

    const trustlineTransaction = new DiamSdk.TransactionBuilder(newReceivingAccount, {
      fee: DiamSdk.BASE_FEE,
      networkPassphrase: DiamSdk.Networks.TESTNET,
    })
      .addOperation(
        DiamSdk.Operation.changeTrust({
          asset: astroDollar, // Reference the existing asset
          limit: "1000", // Optional limit for the trustline
        })
      )
      .setTimeout(100)
      .build();

    trustlineTransaction.sign(newReceivingKeypair);
    await server.submitTransaction(trustlineTransaction);
    console.log("Trustline established.");

    // Step 3: Send the asset from the distributor to the new receiving account
    const paymentTransaction = new DiamSdk.TransactionBuilder(distributorAccount, {
      fee: DiamSdk.BASE_FEE,
      networkPassphrase: DiamSdk.Networks.TESTNET,
    })
      .addOperation(
        DiamSdk.Operation.payment({
          destination: newReceivingKeypair.publicKey(),
          asset: astroDollar, // Reference the existing asset
          amount: '100', // Amount to send
        })
      )
      .setTimeout(100)
      .build();

    paymentTransaction.sign(distributorKeypair);
    await server.submitTransaction(paymentTransaction);
    console.log("Asset sent successfully.");
  } catch (error) {
    console.error("Error during asset transfer:", error);
  }
}

// Call the function to send the asset
sendAsset();