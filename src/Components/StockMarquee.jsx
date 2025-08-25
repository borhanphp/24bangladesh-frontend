"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const StockMarquee = ({ dataUrl }) => {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(null);

  // Helper to parse raw text to stock objects
  const parseStockData = (rawText) => {
    // Replace non-breaking spaces with regular spaces for consistent splitting
    const normalizedText = rawText.replace(/\u00A0/g, " ");

    // Split lines, trim, and filter out empty lines
    const lines = normalizedText
      .trim()
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const parsedStocks = [];

    for (let i = 0; i < lines.length; i += 2) {
      if (i + 1 >= lines.length) break;

      // First line example: "1JANATAMF 3.30"
      // We want symbol and price
      const firstLineParts = lines[i].split(/\s+/);
      if (firstLineParts.length < 2) continue;

      // Symbol might contain multiple parts, price is last part
      const priceStr = firstLineParts[firstLineParts.length - 1];
      const symbol = firstLineParts
        .slice(0, firstLineParts.length - 1)
        .join(" ");

      const price = parseFloat(priceStr);
      if (isNaN(price)) continue;

      // Second line example: "0.00 0.00%"
      const secondLineParts = lines[i + 1].split(/\s+/);
      if (secondLineParts.length < 2) continue;

      const change = parseFloat(secondLineParts[0]);
      const percentStr = secondLineParts[1].replace("%", "");
      const percentChange = parseFloat(percentStr);

      if (isNaN(change) || isNaN(percentChange)) continue;

      parsedStocks.push({
        symbol,
        price,
        change,
        percentChange,
      });
    }
    return parsedStocks;
  };

  useEffect(() => {
    if (!dataUrl) return;

    let intervalId;

    const fetchStocks = async () => {
      try {
        const response = await axios.get(dataUrl, { responseType: "json" });
        const rawText = response.data.rawText;

        if (!rawText) {
          setError("No stock data found in response");
          return;
        }

        const parsedData = parseStockData(rawText);
        if (parsedData.length === 0) {
          setError("Parsed stock data is empty");
        } else {
          setError(null);
        }

        setStocks(parsedData);
      } catch (err) {
        console.error(err);
      }
    };

    // Initial fetch
    fetchStocks();

    // Set polling interval (e.g., every 15 seconds)
    intervalId = setInterval(fetchStocks, 15000);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, [dataUrl]);

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="stock-marquee-container py-3">
      <div className="stock-marquee-track">
        {stocks.length === 0 ? (
          <span>Loading stock data...</span>
        ) : (
          stocks.map((stock, index) => {
            const isUp = stock.change >= 0;
            return (
              <span
                key={index}
                className={`stock-item ${isUp ? "up" : "down"}`}
                style={{ marginRight: 40 }}
              >
                {stock.symbol}&nbsp;
                {stock.price.toFixed(2)}{" "}
                <span className="arrow">{isUp ? "▲" : "▼"}</span>
                <br />
                <small>
                  {isUp ? "+" : ""}
                  {stock.change.toFixed(2)} &nbsp;
                  {stock.percentChange.toFixed(2)}%
                </small>
              </span>
            );
          })
        )}
      </div>
    </div>
  );
};

export default StockMarquee;
