"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { IMAGE_URL } from "@/api/config";
import { getArchive, getWebCategories, getLocations } from "@/api/news";

function formatBanglaDateWithAmPm(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const optionsDate = { day: "numeric", month: "long", year: "numeric" };
  const optionsTime = { hour: "numeric", minute: "2-digit", hour12: true };
  const banglaDate = date.toLocaleDateString("bn-BD", optionsDate);
  const timeString = date.toLocaleTimeString("en-US", optionsTime);
  return `${banglaDate}, ${timeString}`;
}

export default function ArchivePage() {
  const [limit, setLimit] = useState(12);

  // local UI state only (placeholders for now)
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [category, setCategory] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");

  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const load = async (reset = false) => {
    setIsLoading(true);
    try {
      const params = {
        page: reset ? 1 : page,
        limit,
        from: fromDate || undefined,
        to: toDate || undefined,
        categorySlug: category || undefined,
        divisionId: division || undefined,
        districtId: district || undefined,
        upazilaId: upazila || undefined,
      };
      const res = await getArchive(params);
      setTotal(res.total || 0);
      if (reset) {
        setItems(res.items || []);
        setPage(1);
      } else {
        setItems((prev) => [...prev, ...(res.items || [])]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useMemo(() => {
    // initial data load
    load(true);
    (async () => {
      try {
        const [catRes, locRes] = await Promise.all([
          getWebCategories(),
          getLocations(),
        ]);
        setCategories(catRes?.categories || []);
        setDivisions(locRes?.division || []);
        setDistricts(locRes?.district || []);
        setUpazilas(locRes?.upazila || []);
      } catch (e) {}
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <h4 className="fw-bold my-2">আর্কাইভ</h4>
      <div className="border mb-3"></div>

      {/* Top filter row */}
      <div className="row gx-2 gy-2 align-items-end mb-2">
        <div className="row col-11">
        <div className="col-12 col-md-4">
        <div className="input-group mb-2">
          <span className="input-group-text">
            <i className="bi bi-calendar2"></i>
          </span>
          <input
            type={fromDate ? "date" : "text"}
            className="form-control"
            value={fromDate}
            onFocus={e => e.target.type = "date"}
            onBlur={e => {
              if (!fromDate) e.target.type = "text";
            }}
            onChange={e => setFromDate(e.target.value)}
            placeholder="তারিখ থেকে"
          />
        </div>
        </div>
        <div className="col-12 col-md-4">
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-calendar2"></i>
          </span>
          <input
            type={fromDate ? "date" : "text"}
            className="form-control"
            onFocus={e => e.target.type = "date"}
            onBlur={e => {
              if (!fromDate) e.target.type = "text";
            }}
            value={toDate} 
            onChange={e => setToDate(e.target.value)}
            placeholder="তারিখ পর্যন্ত"
          />
        </div>
        </div>
        <div className="col-12 col-md-4">
          <select className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">ক্যাটাগরি</option>
            {categories.map(c => (
              <option key={c._id} value={c.categorySlug}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="col-12 col-md-4">
          <select className="form-select" value={division} onChange={e => { setDivision(e.target.value); setDistrict(''); setUpazila(''); }}>
            <option value="">বিভাগ</option>
            {divisions.map(d => (
              <option key={d._id} value={d._id}>{d.bn_name || d.name}</option>
            ))}
          </select>
        </div>
        <div className="col-12 col-md-4">
          <select className="form-select" value={district} onChange={e => { setDistrict(e.target.value); setUpazila(''); }}>
            <option value="">জেলা</option>
            {districts
              .filter(x => !division || String(x.division_id) === String(divisions.find(d => d._id === division)?.id))
              .map(d => (
                <option key={d._id} value={d._id}>{d.bn_name || d.name}</option>
              ))}
          </select>
        </div>
        <div className="col-12 col-md-4">
          <select className="form-select" value={upazila} onChange={e => setUpazila(e.target.value)}>
            <option value="">উপজেলা</option>
            {upazilas
              .filter(x => !district || String(x.district_id) === String(districts.find(d => d._id === district)?.id))
              .map(u => (
                <option key={u._id} value={u._id}>{u.bn_name || u.name}</option>
              ))}
          </select>
        </div>
        </div>
        <div className="col-1 border-start ps-2 ">
        <div className=" gap-2">
          <div className="flex-grow-1">
          <button
            className="btn rounded-0 w-100 mb-1"
            type="button"
            style={{backgroundColor: "#F2F5F7", color: "#124B65"}}
            onClick={() => {}}
          >
            সব খবর
          </button>
          </div>
          <button
            className="btn w-100 align-self-end h-50 mt-auto rounded-0"
            type="button"
            style={{backgroundColor: "#124B65", color: "#fff"}}
            onClick={() => {
              // reset and reload with filters
              setPage(1);
              setItems([]);
              load(true);
            }}
          >
            <FaSearch className="me-1" /> খুঁজুন
          </button>
        </div>
        </div>
        
      </div>

      <div className="border mb-2"></div>
      

      {/* News list three columns, each item row with text left, image right */}
      <div className="row g-3">
        {items.map((n) => (
          <div key={n.postId} className="col-12 col-md-6 col-lg-4">
            <Link href={`/${n.postId}`} className="text-decoration-none text-dark">
              <div className="border rounded-3 p-2 h-100">
                <div className="d-flex gap-2">
                  <div className="flex-grow-1">
                    <h6 className="fw-semibold" style={{lineHeight: 1.4}}>{n.title}</h6>
                    <small className="text-muted">{formatBanglaDateWithAmPm(n?.createdAt)}</small>
                  </div>
                  <div style={{width: 110}} className="flex-shrink-0">
                    <Image
                      src={`${IMAGE_URL}/${n.image || "image/leadnews.jpg"}`}
                      alt={n.title}
                      width={160}
                      height={100}
                      className="img-fluid rounded"
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center my-4">
        <button
          className="btn btn-outline-secondary px-4"
          disabled={isLoading || items.length >= total}
          onClick={async () => {
            const nextPage = page + 1;
            setPage(nextPage);
            await load(false);
          }}
        >
          আরও দেখুন
        </button>
      </div>
    </div>
  );
}


