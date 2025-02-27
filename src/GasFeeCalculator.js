import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://api.etherscan.io/api";
const API_KEY = "YOUR_ETHERSCAN_API_KEY";

function GasFeeCalculator() {
    const [gasPrice, setGasPrice] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchGasPrice();
    }, []);

    async function fetchGasPrice() {
        setLoading(true);
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
        setLoading(false);
    }

    return (
        <div className="container mx-auto p-5 text-center">
            <h1 className="text-2xl font-bold mb-4">Ethereum Gas Fee Calculator</h1>
            <button 
                onClick={fetchGasPrice} 
                className="bg-blue-500 text-white p-2 rounded mb-4"
                disabled={loading}
            >
                {loading ? "Loading..." : "Refresh Gas Price"}
            </button>
            {gasPrice && (
                <div className="mt-4 border p-4 rounded shadow-lg">
                    <p className="text-lg">Low: {gasPrice.SafeGasPrice} Gwei</p>
                    <p className="text-lg">Average: {gasPrice.ProposeGasPrice} Gwei</p>
                    <p className="text-lg">High: {gasPrice.FastGasPrice} Gwei</p>
                </div>
            )}
        </div>
    );
}

export default GasFeeCalculator;