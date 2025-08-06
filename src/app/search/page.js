"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { FaSearch, FaTimes, FaSpinner } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IMAGE_URL } from "@/api/config";
import { useNewsStore } from "@/providers/useNewsStore";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const searchInputRef = useRef(null);
  const router = useRouter();
  const { searchNews, isLoading: newsStoreLoading, totalNewsCount } = useNewsStore();

  // Focus on input when page loads
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Handle search
  const handleSearch = useCallback((query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setHasSearched(true);
    const results = searchNews(query);
    setSearchResults(results);
  }, [searchNews]);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, handleSearch]);

  // Handle keyboard shortcuts
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      router.push("/");
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Truncate text
  const truncateText = (text, maxLength = 100) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Search Header */}
      <div className="bg-white shadow-sm border-bottom sticky-top search-header" style={{ zIndex: 1030 }}>
        <div className="container py-3">
          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-outline-secondary"
              onClick={() => router.push("/")}
              style={{ minWidth: "40px" }}
            >
              <FaTimes />
            </button>
            
            <div className="flex-grow-1 position-relative">
              <input
                ref={searchInputRef}
                type="text"
                className="form-control form-control-lg search-input"
                placeholder="খবর অনুসন্ধান করুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {newsStoreLoading && (
                <div className="position-absolute top-50 end-0 translate-middle-y pe-3">
                  <FaSpinner className="text-muted search-loading" />
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-2 d-flex justify-content-between align-items-center">
            <small className="text-muted">
              {totalNewsCount} টি খবর লোড করা হয়েছে
            </small>
            {hasSearched && searchQuery.trim() && (
              <small className="text-muted">
                {searchResults.length} টি ফলাফল পাওয়া গেছে
              </small>
            )}
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="container py-4">
        {newsStoreLoading && (
          <div className="text-center py-5">
            <FaSpinner className="text-muted mb-3 search-loading" style={{ fontSize: "3rem" }} />
            <p className="text-muted">খবর লোড হচ্ছে...</p>
          </div>
        )}

        {!newsStoreLoading && !hasSearched && (
          <div className="text-center py-5">
            <FaSearch className="text-muted mb-3" style={{ fontSize: "3rem" }} />
            <h5 className="text-muted">খবর অনুসন্ধান</h5>
            <p className="text-muted">খবর অনুসন্ধান করতে টাইপ করুন</p>
          </div>
        )}

        {hasSearched && !newsStoreLoading && searchResults.length === 0 && searchQuery.trim() && (
          <div className="text-center py-5">
            <FaSearch className="text-muted mb-3" style={{ fontSize: "3rem" }} />
            <h5 className="text-muted">কোন ফলাফল পাওয়া যায়নি</h5>
            <p className="text-muted">অন্য শব্দ দিয়ে অনুসন্ধান করুন</p>
          </div>
        )}

        {searchResults.length > 0 && (
          <div className="row g-4">
            {searchResults.map((news, index) => (
              <div key={news._id || index} className="col-md-6 col-lg-4">
                <Link
                  href={`/${news.postId}`}
                  className="text-decoration-none text-dark"
                >
                  <div className="card h-100 shadow-sm hover-lift">
                    {news.image && (
                      <div className="position-relative" style={{ height: "200px" }}>
                        <Image
                          src={`${IMAGE_URL}/${news.image}`}
                          alt={news.title}
                          fill
                          className="card-img-top"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    )}
                    <div className="card-body">
                      <h6 className="card-title mb-2">{news.title}</h6>
                      <p className="card-text text-muted small">
                        {truncateText(news.subTitle || news.description, 80)}
                      </p>
                      <small className="text-muted">
                        {formatDate(news.createdAt)}
                      </small>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 