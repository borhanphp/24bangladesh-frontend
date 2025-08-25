"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
// components
import SectionOne from "@/Components/HomePage/SectionOne";
import SectionTwo from "@/Components/HomePage/SectionTwo";
import AdsComponents from "@/ChildComponents/AdsComponents";
import FullPageLoader from "@/ChildComponents/FullPageLoader";
// image
import ads from "../../public/image/googleAds.png";
import SectionThree from "@/Components/HomePage/SectionThree";
import SectionSix from "@/Components/HomePage/SectionSix";
import SectionSeven from "@/Components/HomePage/SectionSeven";
import SectionEight from "@/Components/HomePage/SectionEight";
import SectionTen from "@/Components/HomePage/SectionTen";
import SectionThirteen from "@/Components/HomePage/SectionThirteen";
import SectionEleven from "@/Components/HomePage/SectionEleven";
import SectionTwelve from "@/Components/HomePage/SectionTwelve";
import SectionFourteen from "@/Components/HomePage/SectionFourteen";
import SectionFive from "@/Components/HomePage/SectionFive";
import SectionFour from "@/Components/HomePage/SectionFour";
import SectionNine from "@/Components/HomePage/SectionNine";
import GoogleSearch from "@/Components/GoogleSearch";
// StockMarquee
import { BASE_URL } from "@/api/config";

import StockMarquee from "@/Components/StockMarquee";
import PhotoGallery from "@/Components/PhotoGallery";

const stockData = [
  { symbol: "DSEX", price: "6,248.10", change: 1.25 },
  { symbol: "GP", price: "296.50", change: -0.85 },
  { symbol: "BEXIMCO", price: "113.20", change: 0.35 },
  { symbol: "SQURPHARMA", price: "254.00", change: -0.15 },
];

import { getNews, getTopNews } from "@/api/news";
import CommonSection from "@/Components/HomePage/CommonSectionThree";

function HomePage() {
  const [isOnline, setIsOnline] = useState(true);
  const [view, setView] = useState(false);
  // top News
  const {
    data: topNews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["top-news"],
    queryFn: getTopNews,
  });

  // section
  const {
    data,
    isLoading: newsLoading,
    error: newsError,
  } = useQuery({
    queryKey: ["news"],
    queryFn: getNews,
  });

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    setIsOnline(navigator.onLine);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOnline) {
    return (
      <div
        style={{
          backgroundColor: "#ff4d4f",
          color: "white",
          padding: "10px",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        🔌 No Internet Connection
      </div>
    );
  }

  const postedNews =
    Array.isArray(data?.news) && data.news.length > 0 ? data.news : [];

  useEffect(() => {
    if (postedNews.length >= 1) {
      setView(true);
    } else {
      setView(false);
    }
  }, [postedNews, data]);

  // section secment
  const sectionThree = data?.sections?.find(
    (section) => section.idNumber === 2
  );
  const sectionFour = data?.sections?.find((section) => section.idNumber === 3);
  const sectionFive = data?.sections?.find((section) => section.idNumber === 4);
  const sectionSix = data?.sections?.find((section) => section.idNumber === 5);
  const sectionSeven = data?.sections?.find(
    (section) => section.idNumber === 6
  );
  const sectionEight = data?.sections?.find(
    (section) => section.idNumber === 7
  );
  const sectionNine = data?.sections?.find((section) => section.idNumber === 8);
  const sectionTen = data?.sections?.find((section) => section.idNumber === 9);
  const sectionEleven = data?.sections?.find(
    (section) => section.idNumber === 10
  );
  const sectionTwelve = data?.sections?.find(
    (section) => section.idNumber === 11
  );
  const sectionThiteen = data?.sections?.find(
    (section) => section.idNumber === 21
  );
  const sectionFourteen = data?.sections?.find(
    (section) => section.idNumber === 22
  );
  const sectionFifteen = data?.sections?.find(
    (section) => section.idNumber === 25
  );
  const sectionSixteen = data?.sections?.find(
    (section) => section.idNumber === 27
  );

  const opinion = data?.sections?.find((section) => section.idNumber === 1);
  // const feature = data?.sections?.find((section) => section.idNumber === 16);
  // const urbanLife = data?.sections?.find((section) => section.idNumber === 18);
  // const education = data?.sections?.find((section) => section.idNumber === 50);
  // const environment = data?.sections?.find((section) => section.idNumber === 17);
  // const campus = data?.sections?.find((section) => section.idNumber === 19);

  const sectionSeventeen = data?.sections?.find((section) => section.idNumber === 16);
  const sectionEighteen = data?.sections?.find((section) => section.idNumber === 11);
  const sectionNineteen = data?.sections?.find((section) => section.idNumber === 17);
  const sectionTwenty = data?.sections?.find((section) => section.idNumber === 18);
  const sectionTwentyOne = data?.sections?.find((section) => section.idNumber === 13);
  const sectionTwentyTwo = data?.sections?.find((section) => section.idNumber === 12);
  const sectionTwentyThree = data?.sections?.find((section) => section.idNumber === 14);
  const sectionTwentyFour = data?.sections?.find((section) => section.idNumber === 19);
  const sectionTwentyFive = data?.sections?.find((section) => section.idNumber === 15);

  if (isLoading) {
    return <FullPageLoader />;
  }

  console.log('data for category',data)

  return (
    <div>
      <div className="container ">
        {/* ads */}
        {/* <div className=" my-4 vertical-bottom pb-4">
          <AdsComponents
            className="shadow-sm"
            image={ads}
            width="1300"
            height="80"
          />
        </div> */}
        {/* <GoogleSearch /> */}

        {/* section one */}
        {topNews?.leadNews && (
          <SectionOne
            data={{ data: topNews?.leadNews }}
            latestNews={topNews?.latestNews}
          />
        )}
        {/* Google Search */}
        {/* section Two */}
        {/* {topNews?.latestNews && <SectionTwo data={topNews?.latestNews} />} */}
        {/* ads */}
        {/* <div className="my-4 vertical-bottom pb-4">
          <AdsComponents
            className="shadow-sm"
            image={ads}
            width="1300"
            height="80"
          />
        </div> */}
      </div>
      {/* stock */}
      <div className="my-3">
        {/* <StockMarquee stocks={stockData} /> */}
        <StockMarquee dataUrl={`${BASE_URL}/dsc`} />
      </div>






{/* 
section three = national, section nine = health/8 
section four = business, section ten = politics/7
section five = sports, section eleven = exclusive/10
section six = entertainment, section twelve = economics/11
section seven = technology, section thirteen = jobs/12
section eight = lifestyle, section fourteen = lifestyle/13


*/}

      <div className="container ">

        {/* section three - national, section Nine - health */}
        {sectionThree && (
          <SectionThirteen
            data={sectionThree?.news}
            dataTwo={sectionNine?.news}
            title={
              data?.sectionInfo?.find((s) => s.idNumber === "2")?.category
                ?.name || "Unknown Section"
            }
            titleTwo={
              data?.sectionInfo?.find((s) => s.idNumber === "8")?.category
                ?.name || "Unknown Section"
            }
          />
        )}

      {/* politics/education */}
      {sectionThree && (
          <SectionThirteen
            data={sectionThree?.news}
            dataTwo={sectionFifteen?.news}
            title={
              data?.sectionInfo?.find((s) => s.idNumber === "7")?.category
                ?.name || "Unknown Section"
            }
            titleTwo={
              data?.sectionInfo?.find((s) => s.idNumber === "25")?.category
                ?.name || "Unknown Section"
            }
          />
        )}


        {sectionFour && (
          <SectionThirteen
            data={sectionFour?.news}
            dataTwo={sectionFourteen?.news}
            title={
              data?.sectionInfo?.find((s) => s.idNumber === "3")?.category
                ?.name || "Unknown Section"
            }
            titleTwo={
              data?.sectionInfo?.find((s) => s.idNumber === "27")?.category
                ?.name || "Unknown Section"
            }
          />
        )}

      {sectionFive && (
          <SectionThirteen
            data={sectionSix?.news}
            dataTwo={opinion?.news}
            title={
              data?.sectionInfo?.find((s) => s.idNumber === "5")?.category
                ?.name || "Unknown Section"
            }
            titleTwo={
              data?.sectionInfo?.find((s) => s.idNumber === "1")?.category
                ?.name || "Unknown Section"
            }
          />
        )}



        {/* section Twelve - economics */}
        {sectionEleven && (
          <SectionTwelve
            data={sectionEleven?.news}
            dataTwo={sectionThiteen?.news}
            title={
              data?.sectionInfo?.find((s) => s.idNumber === "10")?.category
                ?.name || "Unknown Section"
            }
            titleTwo={
              data?.sectionInfo?.find((s) => s.idNumber === "26")?.category
                ?.name || "Unknown Section"
            }
          />
        )}

        {/* section Nine */}
      {/* video */}
      {topNews && postedNews && <SectionNine />}
        
        {/* section Three */}
        {/* {sectionThree && (
          <SectionThree
            data={sectionThree?.news}
            title={
              data?.sectionInfo?.find((s) => s.idNumber === "2")?.category
                ?.name || "Unknown Section"
            }
          />
        )} */}
        {/* ads */}
        {/* <div className="my-4 vertical-bottom pb-4">
          <AdsComponents
            className="shadow-sm"
            image={ads}
            width="1300"
            height="80"
          />
        </div> */}
        {/* section Four */}
        {/* {sectionFour && <SectionFour />} */}
        {/* section Five */}
        {/* {sectionFour && (
          <SectionFive
            data={sectionFour?.news}
            title={
              data?.sectionInfo?.find((s) => s.idNumber === "3")?.category
                ?.name || "Unknown Section"
            }
          />
        )} */}

        {/* section Six */}
        {sectionFive && (
          <SectionSix
            data={sectionFive?.news}
            title={
              data?.sectionInfo?.find((s) => s.idNumber === "4")?.category
                ?.name || "Unknown Section"
            }
          />
        )}
        {/* ads */}
        {/* <div className="my-4 vertical-bottom pb-4">
          <AdsComponents
            className="shadow-sm"
            image={ads}
            width="1300"
            height="80"
          />
        </div> */}
        {/* section Seven */}
        {/* {sectionSix && (
          <SectionSeven
            data={sectionSix?.news}
            title={
              data?.sectionInfo?.find((s) => s.idNumber === "5")?.category
                ?.name || "Unknown Section"
            }
          />
        )} */}
        {/* ads */}
        {/* <div className="my-4 vertical-bottom pb-4">
          <AdsComponents
            className="shadow-sm"
            image={ads}
            width="1300"
            height="80"
          />
        </div> */}
        {/* section Eight */}
        {sectionSeven && (
          <SectionEight
            data={sectionSeven?.news}
            title={
              data?.sectionInfo?.find((s) => s.idNumber === "6")?.category
                ?.name || "Unknown Section"
            }
          />
        )}
      </div>
      

      <div className="container">
      <div className="row">
      {sectionSeventeen && (
          <CommonSection
            data={sectionSeventeen?.news}
            title={sectionSeventeen?.category?.name || "Unknown Section"}
          />
        )}

        {sectionEighteen && (
          <CommonSection
            data={sectionEighteen?.news}
            title={sectionEighteen?.category?.name || "Unknown Section"}
          />
        )}

        {sectionNineteen && (
          <CommonSection
            data={sectionNineteen?.news}
            title={sectionNineteen?.category?.name || "Unknown Section"}
          />
        )}

        {sectionTwenty && (
          <CommonSection
            data={sectionTwenty?.news}
            title={sectionTwenty?.category?.name || "Unknown Section"}
          />
        )}

        {sectionTwentyOne && (
          <CommonSection
            data={sectionTwentyOne?.news}
            title={sectionTwentyOne?.category?.name || "Unknown Section"}
          />
        )}

        {sectionTwentyTwo && (
          <CommonSection
            data={sectionTwentyTwo?.news}
            title={sectionTwentyTwo?.category?.name || "Unknown Section"}
          />
        )}

        {sectionTwentyThree && (
          <CommonSection
            data={sectionTwentyThree?.news}
            title={sectionTwentyThree?.category?.name || "Unknown Section"}
          />
        )}

        {sectionTwentyFour && (
          <CommonSection
            data={sectionTwentyFour?.news}
            title={sectionTwentyFour?.category?.name || "Unknown Section"}
          />
        )}

        {sectionTwentyFive && (
          <CommonSection
            data={sectionTwentyFive?.news}
            title={sectionTwentyFive?.category?.name || "Unknown Section"}
          />
        )}
  
      </div>

        {/* section Ten - politics*/}
        {/* {sectionEight && (
          <SectionTen
            data={sectionEight?.news}
            dataTwo={sectionNine?.news}
            title={
              data?.sectionInfo?.find((s) => s.idNumber === "7")?.category
                ?.name || "Unknown Section"
            }
            titleTwo={
              data?.sectionInfo?.find((s) => s.idNumber === "8")?.category
                ?.name || "Unknown Section"
            }
          />
        )} */}
        {/* section Eleven - exclusive */}
        {/* {sectionTen && (
          <SectionEleven
            data={sectionTen?.news}
            title={
              data?.sectionInfo?.find((s) => s.idNumber === "9")?.category
                ?.name || "Unknown Section"
            }
          />
        )}
         */}
        {/* section Thirteen - jobs */}
        {/* {sectionThiteen && (
          <SectionThirteen
            data={sectionThiteen?.news}
            dataTwo={sectionFourteen?.news}
            title={
              data?.sectionInfo?.find((s) => s.idNumber === "12")?.category
                ?.name || "Unknown Section"
            }
            titleTwo={
              data?.sectionInfo?.find((s) => s.idNumber === "13")?.category
                ?.name || "Unknown Section"
            }
          />
        )} */}
        {/* section Fourteen - lifestyle */}
        {/* {sectionFifteen && (
          <SectionFourteen
            data={sectionFifteen?.news}
            dataTwo={sectionSixteen?.news}
            title={
              data?.sectionInfo?.find((s) => s.idNumber === "14")?.category
                ?.name || "Unknown Section"
            }
            titleTwo={
              data?.sectionInfo?.find((s) => s.idNumber === "15")?.category
                ?.name || "Unknown Section"
            }
          />
        )} */}
      </div>
      
      {/* Photo Gallery Section */}
      <PhotoGallery />
    </div>
  );
}

export default HomePage;
