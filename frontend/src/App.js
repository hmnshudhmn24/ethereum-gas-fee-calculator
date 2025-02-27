
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://api.etherscan.io/api";
const API_KEY = "YOUR_ETHERSCAN_API_KEY";

function App() {
    const [gasPrice, setGasPrice] = useState(null);

    useEffect(() => {
        fetchGasPrice();
    }, []);

    async function fetchGasPrice() {
        try {
            const response = await axios.get(API_URL, {
                params: {
                    module: "gastracker",
                    action: "gasoracle",
                    apikey: API_KEY
                }
            });
            setGasPrice(response.data.result);
        } catch (error) {
            console.error("Error fetching gas price:", error);
        }
    }

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-2xl font-bold mb-4">Ethereum Gas Fee Calculator</h1>
            <button onClick={fetchGasPrice} className="bg-blue-500 text-white p-2 rounded">
                Refresh Gas Price
            </button>
            {gasPrice && (
                <div className="mt-4">
                    <p>Low: {gasPrice.SafeGasPrice} Gwei</p>
                    <p>Average: {gasPrice.ProposeGasPrice} Gwei</p>
                    <p>High: {gasPrice.FastGasPrice} Gwei</p>
                </div>
            )}
        </div>
    );
}

export default App;
