import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [domains, setDomains] = useState('');
    const [results, setResults] = useState(null);

    const USER_AGENTS = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('https://website-crawler-url-discovery-1.onrender.com/api/crawler/crawl', {
                domains: domains.split('\n'),
            },{
                headers: {
                    'User-Agent': USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)],
                },
            });
            setResults(data);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    return (
        <div className="app">
            <nav className="navbar">
                <h1>Website Crawler</h1>
            </nav>
            <div className="container">
                <h2 className="main-heading">E-commerce URL Crawler</h2>
                <form onSubmit={handleSubmit} className="form">
                    <textarea
                        placeholder="Enter domains (one per line)"
                        value={domains}
                        onChange={(e) => setDomains(e.target.value)}
                        rows="10"
                        className="textarea"
                    />
                    <button type="submit" className="submit-button">Crawl</button>
                </form>

                {results && (
                    <div className="results">
                        <h2>Results</h2>
                        {Object.entries(results).map(([domain, urls]) => (
                            <div key={domain} className="domain-section">
                                <h3 className="domain-title">{domain}</h3>
                                <table className="url-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>URL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {urls.map((url, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <a href={url} target="__blank" className="url-link">{url}</a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
