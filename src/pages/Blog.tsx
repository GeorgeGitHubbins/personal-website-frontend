import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogPosts, BlogPost } from '../data/blogData';
import { calculateReadingTime } from '../utils/readingTime';

const Blog: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  // State for search and filtering in listing view
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copied, setCopied] = useState(false);

  // Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // Handle Share / Copy Link
  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // If a slug is specified, render the single article view
  if (slug) {
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
      return (
        <div className="section blog-not-found">
          <h2>Article Not Found</h2>
          <p>The article you are looking for does not exist or has been moved.</p>
          <Link to="/blog" className="back-blog-btn">
            ← Back to Blog
          </Link>
        </div>
      );
    }

    // Get related posts (up to 2, in the same category or just other posts)
    const relatedPosts = blogPosts
      .filter((p) => p.slug !== post.slug)
      .filter((p) => p.category === post.category || true)
      .slice(0, 2);

    const readingTime = calculateReadingTime(post.contentText);

    return (
      <section className="section blog-detail-section">
        <div className="blog-detail-navigation">
          <Link to="/blog" className="back-blog-btn">
            <span className="arrow">←</span> Back to all articles
          </Link>
        </div>

        <header className="blog-detail-header">
          <div className="blog-detail-meta">
            <span className="blog-category-badge" data-category={post.category}>
              {post.category}
            </span>
            <span className="blog-detail-date">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className="blog-detail-reading-time">
              ⏱️ {readingTime} min read
            </span>
          </div>
          <h1 className="blog-detail-title">{post.title}</h1>
          <p className="blog-detail-excerpt">{post.excerpt}</p>
          <div className="blog-detail-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="blog-tag">
                #{tag}
              </span>
            ))}
          </div>
        </header>

        <div className="blog-detail-content-wrapper">
          {post.content}
        </div>

        {/* Share Panel */}
        <div className="blog-share-panel">
          <h3>Share this article</h3>
          <div className="blog-share-buttons">
            <button 
              onClick={handleCopyLink} 
              className={`share-btn copy-btn ${copied ? 'copied' : ''}`}
              aria-label="Copy link to clipboard"
            >
              {copied ? '✓ Link Copied!' : '🔗 Copy Link'}
            </button>
            <a 
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn linkedin-btn"
              aria-label="Share on LinkedIn"
            >
              💼 LinkedIn
            </a>
            <a 
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn twitter-btn"
              aria-label="Share on X"
            >
              🐦 X / Twitter
            </a>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="blog-related-section">
            <hr className="blog-divider" />
            <h2>Related Articles</h2>
            <div className="blog-related-grid">
              {relatedPosts.map((related) => {
                const rReadingTime = calculateReadingTime(related.contentText);
                return (
                  <div 
                    key={related.slug} 
                    className="blog-related-card"
                    onClick={() => navigate(`/blog/${related.slug}`)}
                  >
                    <span className="blog-category-badge" data-category={related.category}>
                      {related.category}
                    </span>
                    <h3>{related.title}</h3>
                    <div className="blog-card-footer-meta">
                      <span>{new Date(related.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</span>
                      <span>⏱️ {rReadingTime} min</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>
    );
  }

  // --- List View ---
  
  // Categorize blog posts for counts
  const categories = ['All', 'Web Dev', 'AI & Automation', 'Cloud', 'Systems Eng'];
  
  const getCategoryCount = (cat: string) => {
    if (cat === 'All') return blogPosts.length;
    return blogPosts.filter((p) => p.category === cat).length;
  };

  // Filter posts based on search query and category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      post.title.toLowerCase().includes(searchLower) ||
      post.excerpt.toLowerCase().includes(searchLower) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
      post.contentText.toLowerCase().includes(searchLower);
    
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="section blog-section">
      <div className="blog-header-container">
        <h2 className="blog-section-title">Insights & Perspectives</h2>
        <p className="blog-section-subtitle">
          Thoughts and detailed guides on software engineering, serverless architectures, autonomous systems, and modern AI pipelines.
        </p>
      </div>

      {/* Controls: Search & Category Filter */}
      <div className="blog-controls">
        <div className="blog-search-container">
          <input
            type="text"
            className="blog-search-input"
            placeholder="Search articles, tags, or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search articles"
          />
          {searchQuery && (
            <button 
              className="blog-search-clear" 
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <div className="blog-category-tabs" role="tablist" aria-label="Filter blog posts by category">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={selectedCategory === cat}
              className={`blog-category-tab-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat} <span className="cat-count">({getCategoryCount(cat)})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="blog-results-meta">
        {filteredPosts.length === 1 
          ? 'Showing 1 article' 
          : `Showing ${filteredPosts.length} articles`}
      </div>

      {/* Articles Grid */}
      {filteredPosts.length > 0 ? (
        <div className="blog-grid">
          {filteredPosts.map((post) => {
            const readingTime = calculateReadingTime(post.contentText);
            return (
              <article key={post.slug} className="blog-card" onClick={() => navigate(`/blog/${post.slug}`)}>
                <div className="blog-card-header">
                  <span className="blog-category-badge" data-category={post.category}>
                    {post.category}
                  </span>
                  <span className="blog-card-date">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                
                <h3 className="blog-card-title">
                  <Link to={`/blog/${post.slug}`} className="blog-card-link" onClick={(e) => e.stopPropagation()}>
                    {post.title}
                  </Link>
                </h3>
                
                <p className="blog-card-excerpt">{post.excerpt}</p>
                
                <div className="blog-card-tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="blog-card-tag-pill">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="blog-card-footer">
                  <span className="blog-card-reading-time">
                    ⏱️ {readingTime} min read
                  </span>
                  <span className="blog-card-read-more">
                    Read Article <span className="arrow">→</span>
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="blog-no-results">
          <h3>No articles found</h3>
          <p>Try clearing your search query or choosing a different category.</p>
          <button 
            className="blog-reset-btn" 
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};

export default Blog;
