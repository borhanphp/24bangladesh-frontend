"use client";
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Autoplay } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import { getCategoryNews } from '@/api/news';
import { IMAGE_URL } from '@/api/config';
import FullPageLoader from '@/ChildComponents/FullPageLoader';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const PhotoGallery = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  
  // Fetch images from photo-gallery category
  const {
    data: categoryData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['photo-gallery-category'],
    queryFn: () => getCategoryNews('photo-gallery'),
  });


  // Extract images from category posts
  const galleryImages = React.useMemo(() => {
    if (!categoryData?.posts || !Array.isArray(categoryData.posts)) {
      return [];
    }

    return categoryData?.posts?.map(post => ({
      id: post.id || post._id,
      src: `${IMAGE_URL}/${post?.image}`,
      alt: post.title || 'Gallery Image',
      title: post.title || 'ছবির গ্যালারি',
      link: post.newsSlug ? `/${post.newsSlug}` : '#'
    }));
  }, [categoryData]);

  if (isLoading) {
    return (
      <div className="thumbs-gallery-section my-5">
        <div className="container">
          <div className="section-header text-center mb-4">
            <h2 className="gallery-title">ছবিঘর</h2>
            <div className="title-divider"></div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !galleryImages?.length) {
    return (
      <div className="thumbs-gallery-section my-5">
        <div className="container">
          <div className="section-header text-center mb-4">
            <h2 className="gallery-title">ছবিঘর</h2>
            <div className="title-divider"></div>
          </div>
          <div className="text-center">
            <p className="text-muted">কোন ছবি পাওয়া যায়নি।</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-header text-center mb-4">
              <h2 className="">ছবিঘর</h2>
              <div className="title-divider"></div>
            </div>
            
            <div className="thumbs-gallery-container">
              {/* Main Swiper */}
              <Swiper
                modules={[Navigation, Thumbs, Autoplay]}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                className="main-gallery-swiper"
              >
                {galleryImages.map((image) => (
                  <SwiperSlide key={image.id}>
                    <div className="main-gallery-slide">
                      <a href={image.link} className="gallery-link">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="main-gallery-image"
                          loading="lazy"
                        />
                        <div className="main-gallery-overlay">
                          <div className="main-gallery-content">
                            <h3 className="main-gallery-title">{image.title}</h3>
                            <div className="gallery-read-more">
                              <span>বিস্তারিত পড়ুন →</span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Thumbs Swiper */}
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                watchSlidesProgress={true}
                modules={[Navigation, Thumbs]}
                className="thumbs-gallery-swiper"
                breakpoints={{
                  640: {
                    slidesPerView: 5,
                  },
                  768: {
                    slidesPerView: 6,
                  },
                  1024: {
                    slidesPerView: 7,
                  },
                  1200: {
                    slidesPerView: 8,
                  }
                }}
              >
                {galleryImages.map((image) => (
                  <SwiperSlide key={`thumb-${image.id}`}>
                    <div className="thumb-gallery-slide">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="thumb-gallery-image"
                        loading="lazy"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;
