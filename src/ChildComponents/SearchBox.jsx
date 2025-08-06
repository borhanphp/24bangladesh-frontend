"use client";
import { useState, useEffect, useRef } from "react";
import { FaSearch, FaTimes, FaSpinner } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { BASE_URL, IMAGE_URL } from "@/api/config";
import { useNewsStore } from "@/providers/useNewsStore";

function SearchBox({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const searchInputRef = useRef(null);
  const { searchNews, isLoading: newsStoreLoading, totalNewsCount } = useNewsStore();

  // Focus on input when modal opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Handle search
  const handleSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setHasSearched(true);
    const results = searchNews(query);
    setSearchResults(results);
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Handle keyboard shortcuts
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
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
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 search-modal-backdrop"
          style={{ zIndex: 1040 }}
          onClick={onClose}
        />
      )}

      {/* Search Modal */}
      <div
        className={`position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-start pt-5 ${
          isOpen ? "" : "d-none"
        }`}
        style={{ zIndex: 1050 }}
      >
        <div
          className="bg-white rounded shadow-lg search-modal"
          style={{ width: "90%", maxWidth: "600px", maxHeight: "80vh" }}
          onClick={(e) => e.stopPropagation()}
        >
                     {/* Header */}
           <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
             <div>
               <h5 className="mb-0">খবর অনুসন্ধান</h5>
               <small className="text-muted">
                 {totalNewsCount} টি খবর লোড করা হয়েছে
               </small>
             </div>
             <button
               className="btn btn-link text-dark p-0"
               onClick={onClose}
               style={{ fontSize: "1.5rem" }}
             >
               <FaTimes />
             </button>
           </div>

          {/* Search Input */}
          <div className="p-3">
            <div className="position-relative">
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

          {/* Results */}
          <div className="px-3 pb-3" style={{ maxHeight: "60vh", overflowY: "auto" }}>
                         {hasSearched && !newsStoreLoading && searchResults.length === 0 && searchQuery.trim() && (
               <div className="text-center py-4">
                 <p className="text-muted">কোন ফলাফল পাওয়া যায়নি</p>
               </div>
             )}

             {newsStoreLoading && (
               <div className="text-center py-4">
                 <FaSpinner className="text-muted mb-3 search-loading" style={{ fontSize: "3rem" }} />
                 <p className="text-muted">খবর লোড হচ্ছে...</p>
               </div>
             )}

             {!hasSearched && !newsStoreLoading && (
               <div className="text-center py-4">
                 <FaSearch className="text-muted mb-3" style={{ fontSize: "3rem" }} />
                 <p className="text-muted">খবর অনুসন্ধান করতে টাইপ করুন</p>
               </div>
             )}

            {searchResults.map((news, index) => (
              <Link
                key={news._id || index}
                href={`/${news.postId}`}
                className="text-decoration-none text-dark"
                onClick={onClose}
              >
                <div className="d-flex gap-3 p-3 border-bottom search-result-item">
                  {news.image && (
                    <div style={{ width: "80px", height: "60px", flexShrink: 0 }}>
                      <Image
                        src={`${IMAGE_URL}/${news.image}`}
                        alt={news.title}
                        width={80}
                        height={60}
                        className="rounded search-result-image"
                        style={{ objectFit: "cover", width: "100%", height: "100%" }}
                      />
                    </div>
                  )}
                  <div className="flex-grow-1">
                    <h6 className="mb-1 text-dark">{news.title}</h6>
                    <p className="text-muted small mb-1">
                      {truncateText(news.subTitle || news.description)}
                    </p>
                    <small className="text-muted">
                      {formatDate(news.createdAt)}
                    </small>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>


    </>
  );
}

export default SearchBox; 