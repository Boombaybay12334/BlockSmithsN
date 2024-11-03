import axios from 'axios';
import * as DiamSdk from 'diamnet-sdk';


// Function to fetch transaction history
async function fetchTransactionHistory(accountId) {
    try {
        // Replace with the actual API endpoint for the Diamante blockchain
        const response = await axios.get(`https://diamtestnet.diamcircle.io/GBPGYYY52WVRNSP27CDMH6XRSC566JZQRMLU7JPZL5Y6O4E35WAQS6KB/transactions`);
        // Check if the response is successful
        if (response.status === 200) {
            const transactions = response.data;
            console.log("Transaction History:");
            transactions.forEach(transaction => {
                console.log(`- Transaction ID: ${transaction.id}`);
                console.log(`  Amount: ${transaction.amount}`);
                console.log(`  Date: ${new Date(transaction.created_at).toLocaleString()}`);
                console.log(`  Status: ${transaction.status}`);
                console.log('-------------------------');
            });
        } else {
            console.error("Error fetching transactions:", response.statusText);
        }
    } catch (error) {
        console.error("An error occurred while fetching transaction history:", error);
    }
}

// Example usage
const accountId = 'GBPGYYY52WVRNSP27CDMH6XRSC566JZQRMLU7JPZL5Y6O4E35WAQS6KB'; // Replace with your actual account ID
fetchTransactionHistory(accountId);