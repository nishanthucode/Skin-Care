import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ProductCard from '../components/ProductCard/ProductCard';
import { productAPI } from '../utils/api';
import { FiSearch } from 'react-icons/fi';
import image1 from '../assets/product-1.jpeg';
import image2 from '../assets/product-2.jpeg';
import image3 from '../assets/product-3.jpeg';
import image4 from '../assets/product-4.jpeg';
import './Search.css';

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [searchInput, setSearchInput] = useState(query);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sortBy, setSortBy] = useState('relevance');

    useEffect(() => {
        if (query) {
            fetchSearchResults(query);
        }
    }, [query]);

    const fetchSearchResults = async (searchQuery) => {
        try {
            setLoading(true);
            const response = await productAPI.search(searchQuery);
            let productsList = response.data.products || response.data || [];
            setProducts(productsList);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setProducts(getMockSearchResults(searchQuery));
        } finally {
            setLoading(false);
        }
    };

    const getMockSearchResults = (searchQuery) => {
        const allProducts = [
            {
                _id: '1',
                name: 'Aura Face Cream',
                description: 'Face Cream',
                price: 699,
                originalPrice: 799,
                image: image1,
                rating: 4.9,
                reviewCount: 60,
                stock: 50,
                category: 'face-care',
            },
            {
                _id: '2',
                name: 'Aura Goat Milk Soap',
                description: 'Goat Milk Soap',
                price: 249,
                originalPrice: 299,
                image: image2,
                rating: 5.0,
                reviewCount: 45,
                stock: 25,
                category: 'body-care',
            },
            {
                _id: '3',
                name: 'Aura Glow Combo',
                description: 'Glow Combo',
                price: 949,
                originalPrice: 999,
                image: image3,
                rating: 5.0,
                reviewCount: 31,
                stock: 40,
                category: 'face-care',
            },
            {
                _id: '4',
                name: 'Aura Goat Milk Soap(Pack of 2)',
                description: 'Buy 2 Soap',
                price: 499,
                originalPrice: 597,
                image: image4,
                rating: 4.7,
                reviewCount: 45,
                stock: 35,
                category: 'face-care',
            },
        ];

        // Filter products based on search query
        const lowerQuery = searchQuery.toLowerCase();
        return allProducts.filter(
            (product) =>
                product.name.toLowerCase().includes(lowerQuery) ||
                product.description.toLowerCase().includes(lowerQuery) ||
                product.category.toLowerCase().includes(lowerQuery)
        );
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            setSearchParams({ q: searchInput.trim() });
        }
    };

    const sortedProducts = [...products].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'name-asc':
                return a.name.localeCompare(b.name);
            default:
                return 0;
        }
    });

    return (
        <>
            <Helmet>
                <title>{query ? `Search Results for "${query}" | YouthFace` : 'Search Products | YouthFace'}</title>
                <meta
                    name="description"
                    content={`Search results for "${query}". Find the best skincare products at YouthFace. ${products.length} products found.`}
                />
                <meta name="keywords" content={`${query}, skincare, beauty products, YouthFace, search`} />
                <link rel="canonical" href={`https://youthface.com/search?q=${encodeURIComponent(query)}`} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content={`Search: ${query} | YouthFace`} />
                <meta property="og:description" content={`${products.length} products found for "${query}"`} />
                <meta property="og:url" content={`https://youthface.com/search?q=${encodeURIComponent(query)}`} />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`Search: ${query} | YouthFace`} />
                <meta name="twitter:description" content={`${products.length} products found for "${query}"`} />

                {/* Structured Data for Search Results */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'SearchResultsPage',
                        name: `Search Results for ${query}`,
                        url: `https://youthface.com/search?q=${encodeURIComponent(query)}`,
                        mainEntity: {
                            '@type': 'ItemList',
                            numberOfItems: products.length,
                            itemListElement: products.slice(0, 10).map((product, index) => ({
                                '@type': 'ListItem',
                                position: index + 1,
                                item: {
                                    '@type': 'Product',
                                    name: product.name,
                                    description: product.description,
                                    offers: {
                                        '@type': 'Offer',
                                        price: product.price,
                                        priceCurrency: 'INR',
                                        availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
                                    },
                                },
                            })),
                        },
                    })}
                </script>
            </Helmet>

            <div className="search-page">
                {/* Breadcrumb */}
                <div className="breadcrumb">
                    <div className="container">
                        <Link to="/">Home</Link>
                        <span> / </span>
                        <span>Search Results</span>
                    </div>
                </div>

                <div className="container">
                    {/* Search Bar */}
                    <div className="search-header">
                        <form className="search-form-large" onSubmit={handleSearch}>
                            <FiSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search for products..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                autoFocus
                            />
                            <button type="submit">Search</button>
                        </form>

                    </div>

                    {/* Filter and Sort Bar */}

                    {/* Results */}
                    {loading ? (
                        <div className="loading">Searching...</div>
                    ) : products.length > 0 ? (
                        <div className="products-grid">
                            {sortedProducts.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    ) : query ? (
                        <div className="no-results">
                            <h2>No results found for "{query}"</h2>
                            <p>Try searching with different keywords or browse our collections.</p>
                            <Link to="/shop-all" className="btn btn-primary">
                                Browse All Products
                            </Link>
                        </div>
                    ) : (
                        <div className="no-results">
                            <h2>Start searching</h2>
                            <p>Enter a search term to find products.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Search;
