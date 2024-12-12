import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewsFeed.css';

const NewsFeed2 = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                // Fetch news directly from the News API
                const response = await axios.get('https://newsapi.org/v2/top-headlines', {
                    params: {
                        country: 'us',
                        apiKey: 'c8e53db823ac49bbbcdd6c4a2e4bd5d9', // API key for News API
                    },
                });


                // Filter out articles with 'removed' in the title
                const filteredNews = response.data.articles.filter(
                    (item) => !item.title.toLowerCase().includes('removed')
                );

                setNews(filteredNews); // Update state with filtered news
                setLoading(false);
            } catch (err) {
                setError('Failed to load news');
                setLoading(false);
            }
        };

        fetchNews();
    }, []); // No dependency on token, since we're directly fetching from the external API

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="news-feed">
            <h2>News Feed</h2>
            <div className="news-cards">
                {news.map((item, index) => (
                    <div key={index} className="news-card">
                        {item.urlToImage && (
                            <img
                                src={item.urlToImage}
                                alt={item.title}
                                className="news-image"
                            />
                        )}
                        <div className="news-content">
                            <h3 className="news-title">{item.title}</h3>
                            <p className="news-description">{item.description}</p>
                            <p className="news-date">
                                <strong>Published at:</strong> {new Date(item.publishedAt).toLocaleString()}
                            </p>
                            <p className="news-author">
                                <strong>Author:</strong> {item.author || 'N/A'}
                            </p>
                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="news-link">
                                Read more
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsFeed2;
