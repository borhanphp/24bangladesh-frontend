"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getNews, getTopNews, getLatestNews, getAllPopularNews } from "@/api/news";

const NewsStoreContext = createContext();

export function NewsStoreProvider({ children }) {
  const [allNews, setAllNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all news data with optimized caching
  const { data: mainNews } = useQuery({
    queryKey: ["news"],
    queryFn: getNews,
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });

  const { data: topNews } = useQuery({
    queryKey: ["top-news"],
    queryFn: getTopNews,
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });

  const { data: latestNews } = useQuery({
    queryKey: ["latest-news"],
    queryFn: () => getLatestNews(50), // Get more latest news
    staleTime: 1000 * 60 * 5, // 5 minutes for latest news
    gcTime: 1000 * 60 * 15, // 15 minutes
  });

  const { data: popularNews } = useQuery({
    queryKey: ["popular-news"],
    queryFn: () => getAllPopularNews(50), // Get more popular news
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 20, // 20 minutes
  });

  // Combine all news data
  useEffect(() => {
    const combinedNews = [];
    
    // Add main news
    if (mainNews?.news && Array.isArray(mainNews.news)) {
      combinedNews.push(...mainNews.news);
    }

    // Add top news
    if (topNews?.news && Array.isArray(topNews.news)) {
      combinedNews.push(...topNews.news);
    }

    // Add latest news
    if (latestNews?.news && Array.isArray(latestNews.news)) {
      combinedNews.push(...latestNews.news);
    }

    // Add popular news
    if (popularNews?.news && Array.isArray(popularNews.news)) {
      combinedNews.push(...popularNews.news);
    }

    // Remove duplicates based on postId
    const uniqueNews = combinedNews.filter((news, index, self) => 
      index === self.findIndex(n => n.postId === news.postId)
    );

    setAllNews(uniqueNews);
    setIsLoading(false);
  }, [mainNews, topNews, latestNews, popularNews]);

  // Search function
  const searchNews = (query) => {
    if (!query || query.trim() === "") {
      return [];
    }

    const searchTerm = query.toLowerCase().trim();
    
    return allNews.filter(news => {
      const title = (news.title || "").toLowerCase();
      const subTitle = (news.subTitle || "").toLowerCase();
      const description = (news.description || "").toLowerCase();
      const content = (news.content || "").toLowerCase();
      
      return (
        title.includes(searchTerm) ||
        subTitle.includes(searchTerm) ||
        description.includes(searchTerm) ||
        content.includes(searchTerm)
      );
    });
  };

  return (
    <NewsStoreContext.Provider value={{ 
      allNews, 
      isLoading, 
      searchNews,
      totalNewsCount: allNews.length 
    }}>
      {children}
    </NewsStoreContext.Provider>
  );
}

export function useNewsStore() {
  const context = useContext(NewsStoreContext);
  if (!context) {
    throw new Error("useNewsStore must be used within a NewsStoreProvider");
  }
  return context;
} 