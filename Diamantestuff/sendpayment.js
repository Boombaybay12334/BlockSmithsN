import * as DiamSdk from 'diamnet-sdk';
import fetch from 'node-fetch';



var server = new DiamSdk.Aurora.Server("https://diamtestnet.diamcircle.io");
var sourceKeys = DiamSdk.Keypair.fromSecret(
  "SBCISRCVWBKFY24DUNQYEJCGH6OJOCGA2LZZYPFRGZ72UGJU2ZWNEAKH"
);
var destinationId = "GAZKBMJ5HBKEWS4WGR66MZI22PVAOQB3MHEEGSIHM4LUQVCIJWHPCCQD";
// Transaction will hold a built transaction we can resubmit if the result is unknown.
var transaction;

// First, check to make sure that the destination account exists.
// You could skip this, but if the account does not exist, you will be charged
// the transaction fee when the transaction fails.
server
  .loadAccount(destinationId)
  // If the account is not found, surface a nicer error message for logging.
  .catch(function (error) {
    if (error instanceof DiamSdk.NotFoundError) {
      throw new Error("The destination account does not exist!");
    } else return error;
  })
  // If there was no error, load up-to-date information on your account.
  .then(function () {
    return server.loadAccount(sourceKeys.publicKey());
  })
  .then(function (sourceAccount) {
    // Start building the transaction.
    transaction = new DiamSdk.TransactionBuilder(sourceAccount, {
      fee: DiamSdk.BASE_FEE,
      networkPassphrase: DiamSdk.Networks.TESTNET,
    })
      .addOperation(
        DiamSdk.Operation.payment({
          destination: destinationId,
          // Because Diamante allows transaction in many currencies, you must
          // specify the asset type. The special "native" asset represents Lumens.
          asset: DiamSdk.Asset.native(),
          amount: "10",
        })
      )
      // A memo allows you to add your own metadata to a transaction. It's
      // optional and does not affect how Diamante treats the transaction.
      .addMemo(DiamSdk.Memo.text("Test Transaction"))
      // Wait a maximum of three minutes for the transaction
      .setTimeout(180)
      .build();
    // Sign the transaction to prove you are actually the person sending it.
    transaction.sign(sourceKeys);
    // And finally, send it off to Diamante!
    return server.submitTransaction(transaction);
  })
  .then(function (result) {
    console.log("Success! Results:", result);
  })
  .catch(function (error) {
    console.error("Something went wrong!", error);
    // If the result is unknown (no response body, timeout etc.) we simply resubmit
    // already built transaction:
    // server.submitTransaction(transaction);
  });