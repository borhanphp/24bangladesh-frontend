"use client";
import { useSearch } from "@/providers/useSearch";
import SearchBox from "./SearchBox";
import KeyboardShortcuts from "./KeyboardShortcuts";

function SearchWrapper() {
  const { isSearchOpen, closeSearch } = useSearch();
  
  return (
    <>
      <KeyboardShortcuts />
      <SearchBox isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
}

export default SearchWrapper; 