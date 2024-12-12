import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsFeed = () => {
    const [news, setNews] = useState([]); // Store news articles
    const [loading, setLoading] = useState(false); // Track loading state
    const [error, setError] = useState(null); // Error state
    const [query, setQuery] = useState(''); // Query for search input
    const [submittedQuery, setSubmittedQuery] = useState('General'); // Store the query after submission

    // Categories list
    const categories = [
        { value: '', label: 'Select' },
        { value: 'business', label: 'Business' },
        { value: 'science', label: 'Science' },
        { value: 'health', label: 'Health' },
        { value: 'sports', label: 'Sports' },
        { value: 'entertainment', label: 'Entertainment' },
        { value: 'technology', label: 'Technology' },
    ];

    // Function to fetch news articles based on the submitted query
    useEffect(() => {
        if (!submittedQuery) return; // Don't fetch if no query is submitted

        const fetchNews = async () => {
            setLoading(true); // Set loading state to true before fetching
            try {
                // Fetch news from the API
                const response = await axios.get('https://newsapi.org/v2/everything', {
                    params: {
                        q: submittedQuery, // Fetch news based on the submitted query (search term)
                        from: '2024-11-20',
                        sortBy: 'publishedAt',
                        language: 'en',
                        apiKey: 'c8e53db823ac49bbbcdd6c4a2e4bd5d9', // News API key
                    },
                });

                // Filter out articles with 'removed' in the title
                const filteredNews = response.data.articles.filter(
                    (item) => !item.title.toLowerCase().includes('removed')
                );

                setNews(filteredNews); // Set the fetched news
                setLoading(false); // Set loading to false after data is fetched
            } catch (err) {
                setError('Failed to load news'); // Set error state if fetch fails
                setLoading(false);
            }
        };

        fetchNews(); // Call the fetch function
    }, [submittedQuery]); // Run the effect only when the query is submitted

    // Handle search input change
    const handleSearchChange = (e) => {
        setQuery(e.target.value); // Update query as the user types
    };

    // Handle category change
    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setQuery(selectedCategory);
        setSubmittedQuery(selectedCategory); // Set the selected category in the search box
    };

    // Handle search form submit (trigger news fetch with new query)
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSubmittedQuery(query); // Set the query to the submitted value
    };

    if (loading) return <p>Loading...</p>; // Show loading while fetching

    if (error) return <p>{error}</p>; // Show error message if there's an issue

    return (
        <div style={styles.newsFeed}>
            <div style={styles.searchContainer}>
                <form onSubmit={handleSearchSubmit} style={styles.searchForm}>
                    <input
                        type="text"
                        placeholder="Search news..."
                        value={query}
                        onChange={handleSearchChange}
                        style={styles.searchInput}
                    />
                    <button type="submit" style={styles.searchButton}>Search</button>
                </form>
            </div>

            <div style={styles.categoryContainer}>
                <label htmlFor="category-select" style={styles.categoryLabel}>Category:</label>
                <select
                    id="category-select"
                    value={query} // Bind the selected category to the input field
                    onChange={handleCategoryChange} // Update input field with the selected category
                    style={styles.categorySelect}
                >
                    {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                            {cat.label}
                        </option>
                    ))}
                </select>
            </div>

            <h2>News Feed</h2>
            <div style={styles.newsCards}>
                {news.map((item, index) => (
                    <div key={index} style={styles.newsCard}>
                        {item.urlToImage && (
                            <img
                                src={item.urlToImage}
                                alt={item.title}
                                style={styles.newsImage}
                            />
                        )}
                        <div style={styles.newsContent}>
                            <h3 style={styles.newsTitle}>{item.title}</h3>
                            <p style={styles.newsDescription}>{item.description}</p>
                            <p style={styles.newsDate}>
                                <strong>Published at:</strong> {new Date(item.publishedAt).toLocaleString()}
                            </p>
                            <p style={styles.newsAuthor}>
                                <strong>Author:</strong> {item.author || 'N/A'}
                            </p>
                            <a href={item.url} target="_blank" rel="noopener noreferrer" style={styles.newsLink}>
                                Read more
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            {loading && <p>Loading more...</p>} {/* Show loading indicator when fetching more */}
        </div>
    );
};

// Internal CSS styles
const styles = {
    newsFeed: {
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        backgroundColor: '#f5f5f5',
    },
    searchContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
        gap: '10px',
    },
    searchForm: {
        display: 'flex',
        alignItems: 'center',
        width: '50%',
        backgroundColor: '#fff',
        borderRadius: '25px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        padding: '10px',
    },
    searchInput: {
        width: '80%',
        padding: '10px',
        border: 'none',
        borderRadius: '20px',
        fontSize: '16px',
        outline: 'none',
        boxSizing: 'border-box',
    },
    searchButton: {
        padding: '10px 15px',
        backgroundColor: '#4caf50',
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        fontSize: '16px',
        marginLeft: '10px',
    },
    categoryContainer: {
        justifyContent: 'center',
        display: 'flex',
        marginBottom: '20px',
    },
    categoryLabel: {
        fontSize: '16px',
        marginRight: '10px',
    },
    categorySelect: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        backgroundColor: 'white',
        cursor: 'pointer',
    },
    newsCards: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px',
    },
    newsCard: {
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        transition: 'transform 0.3s ease',
    },
    newsImage: {
        width: '100%',
        height: '180px',
        objectFit: 'cover',
    },
    newsContent: {
        padding: '15px',
    },
    newsTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '10px',
    },
    newsDescription: {
        fontSize: '14px',
        color: '#555',
        marginBottom: '10px',
    },
    newsDate: {
        fontSize: '12px',
        color: '#777',
    },
    newsAuthor: {
        fontSize: '12px',
        color: '#777',
    },
    newsLink: {
        fontSize: '14px',
        color: '#4caf50',
        textDecoration: 'none',
        fontWeight: 'bold',
    }
};

export default NewsFeed;
