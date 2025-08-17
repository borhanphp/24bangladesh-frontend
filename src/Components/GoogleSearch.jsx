"use client";
import { useEffect, useRef, useState } from "react";

const GoogleSearch = () => {
	const [query, setQuery] = useState("");
	const resultsMountedRef = useRef(false);

	useEffect(() => {
		// Load Google CSE (results-only). We'll render our own input/button to avoid branding.
		const script = document.createElement("script");
		script.src = "https://cse.google.com/cse.js?cx=006cb4e0046a047b4";
		script.async = true;
		document.head.appendChild(script);
		return () => {
			const existingScript = document.querySelector('script[src="https://cse.google.com/cse.js?cx=006cb4e0046a047b4"]');
			if (existingScript) document.head.removeChild(existingScript);
		};
	}, []);

	const executeSearch = (text) => {
		const q = (text || query || "").trim();
		if (!q) return;
		const tryExec = () => {
			if (
				window.google &&
				window.google.search &&
				window.google.search.cse &&
				window.google.search.cse.element
			) {
				const el = window.google.search.cse.element.getElement("siteSearchResults");
				if (el) {
					el.execute(q);
					return true;
				}
			}
			return false;
		};
		if (!tryExec()) {
			const id = setInterval(() => {
				if (tryExec()) clearInterval(id);
			}, 200);
			setTimeout(() => clearInterval(id), 4000);
		}
	};

	return (
		<div className="google-search-container p-0" style={{ margin: 0, paddingTop: 0, paddingBottom: 0 }}>
			<div className="search-box bg-light" style={{ margin: 0, paddingTop: 0, paddingBottom: 0 }}>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						executeSearch();
					}}
					className="d-flex align-items-center gap-2"
				>
					<input
						type="text"
						className="form-control rounded-0"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Search"
						style={{ height: 36 }}
					/>
					<button
						type="submit"
						className="btn rounded-0"
						style={{ backgroundColor: "var(--brand-color)", color: "#fff" }}
					>
						<span className="bi bi-search">খুঁজুন</span>
					</button>
				</form>
			</div>

			{/* Results-only container controlled by Google CSE */}
			<div className="gcse-searchresults-only" data-gname="siteSearchResults"></div>
		</div>
	);
};

export default GoogleSearch; 