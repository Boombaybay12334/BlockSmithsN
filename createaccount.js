import * as DiamSdk from 'diamnet-sdk';
import fetch from 'node-fetch';
import { createCipheriv, createDecipheriv } from 'crypto';

//var DiamSdk = require("diamnet-sdk");

// create a completely new and unique pair of keys
const pair = DiamSdk.Keypair.random();

const sk = pair.secret();
const pk = pair.publicKey();


//this part import username value while flask runs subprocess
const args = process.argv.slice(2); // Get command-line arguments
const value = args[0]; // The first argument



//function to create account
(async function main() {
  try {
    const response = await fetch(
      `https://friendbot.diamcircle.io?addr=${encodeURIComponent(
        pair.publicKey()
      )}`
    );
    const responseJSON = await response.json();
    console.log("SUCCESS! You have a new account :)\n", responseJSON);
  } catch (e) {
    console.error("ERROR!", e);
  }
  // After you've got your test lumens from friendbot, we can also use that account to create a new account on the ledger.
  try {
    const server = new DiamSdk.Aurora.Server(
      "https://diamtestnet.diamcircle.io/"
    );
    var parentAccount = await server.loadAccount(pair.publicKey()); //make sure the parent account exists on ledger
    var childAccount = DiamSdk.Keypair.random(); //generate a random account to create
    //create a transacion object.
    var createAccountTx = new DiamSdk.TransactionBuilder(parentAccount, {
      fee: DiamSdk.BASE_FEE,
      networkPassphrase: DiamSdk.Networks.TESTNET,
    });
    //add the create account operation to the createAccountTx transaction.
    createAccountTx = await createAccountTx
      .addOperation(
        DiamSdk.Operation.createAccount({
          destination: childAccount.publicKey(),
          startingBalance: "5",
        })
      )
      .setTimeout(180)
      .build();
    //sign the transaction with the account that was created from friendbot.
    await createAccountTx.sign(pair);
    //submit the transaction
    let txResponse = await server
      .submitTransaction(createAccountTx)
      // some simple error handling
      .catch(function (error) {
        console.log("there was an error");
        console.log(error.response);
        console.log(error.status);
        console.log(error.extras);
        return error;
      });
    console.log(txResponse);
    console.log("Created the new account", childAccount.publicKey());
  } catch (e) {
    console.error("ERROR!", e);
  }
})();






















//THIS PART SENDS DATA TO DATABASE
import { createClient } from '@supabase/supabase-js';

  // Create Supabase client
const supabase = createClient("https://nznctgekrtxohnvppikt.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56bmN0Z2VrcnR4b2hudnBwaWt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAzNTA4NjYsImV4cCI6MjA0NTkyNjg2Nn0.mHXHnevIyVsH9f2c0f4tVAFiF4Cn-sLr3lhrNnqa1oE");

async function updateRecord(id, newData) {
  const { data, error } = await supabase
      .from('User') // Replace with your table name
      .update(newData) // New data to update
      .eq('Username', id); // Condition to find the record

  if (error) {
      console.error('Error updating record:', error);
      return null;
  }
  return data;
}

// Example usage
const recordId = value; // ID of the record to update
const updatedData = {
  public_key: pk,
  private_key: sk, // Replace with the actual column name and new value
  // Add more fields as needed
};

updateRecord(recordId, updatedData);
