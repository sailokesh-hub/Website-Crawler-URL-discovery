import React, { useState } from "react";
import axios from "axios";

const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
];

const App = () => {
  const [domains, setDomains] = useState("");
  const [results, setResults] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://website-crawler-url-discovery-1.onrender.com/api/crawler/crawl",
        {
          domains: domains.split("\n"),
        },
        {
          headers: {
            "User-Agent":
              USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)],
          },
        }
      );
      setShowPopup(true);
      setResults(data);
      
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Website Crawler</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={domains}
          onChange={(e) => setDomains(e.target.value)}
          placeholder="Enter domains (one per line)"
        />
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? "Crawling..." : "Crawl"}
        </button>
      </form>
      {showPopup && (
        <div className="popup">
          <h2>Crawling Results</h2>
          <ul>
            {results.map((result) => (
              <li key={result}>{result}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;

