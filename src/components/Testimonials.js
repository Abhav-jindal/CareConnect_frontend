import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

function Testimonials() {
  const testimonials = [
    {
      name: "Dr. Priya Sharma",
      role: "Physician",
      img: "/assets/img/testimonials-1.jpg",
      rating: 5,
      text: "Care Connect has completely streamlined my appointment management and patient communication.",
    },
    {
      name: "Ravi Patel",
      role: "Patient",
      img: "/assets/img/testimonials-2.jpg",
      rating: 5,
      text: "I booked my consultation within minutes and got the best care possible.",
    },
    {
      name: "Dr. Anil Kumar",
      role: "Physician",
      img: "/assets/img/testimonials-3.jpg",
      rating: 4.5,
      text: "The integration with hospital systems is seamless, saving me hours of manual work.",
    },
    {
      name: "Sneha Desai",
      role: "Patient",
      img: "/assets/img/testimonials-4.jpg",
      rating: 5,
      text: "Excellent support and easy booking—highly recommend Care Connect!",
    },
    {
      name: "Dr. Vikram Singh",
      role: "Physician",
      img: "/assets/img/testimonials-5.jpg",
      rating: 5,
      text: "Great platform for managing surgical schedules and patient follow-ups.",
    },
  ];

  return (
    <section id="testimonials" className="testimonials section">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Info Section */}
          <div
            className="col-lg-5 info"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h3>What Our Users Say</h3>
            <p>
              Hear from patients and professionals who trust Care Connect for
              seamless healthcare services.
            </p>
          </div>

          {/* Right Swiper Slider */}
          <div className="col-lg-7" data-aos="fade-up" data-aos-delay="200">
            <Swiper
              loop={true}
              speed={600}
              autoplay={{ delay: 5000 }}
              slidesPerView="auto"
              pagination={{ clickable: true }}
              modules={[Pagination, Autoplay]}
            >
              {testimonials.map((t, index) => (
                <SwiperSlide key={index}>
                  <div className="testimonial-item">
                    <div className="d-flex">
                      <img
                        src={t.img}
                        className="testimonial-img flex-shrink-0"
                        alt={t.name}
                      />
                      <div>
                        <h3>{t.name}</h3>
                        <h4>{t.role}</h4>
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={`bi bi-star${
                                t.rating >= i + 1
                                  ? "-fill"
                                  : t.rating > i
                                  ? "-half"
                                  : ""
                              }`}
                            ></i>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p>
                      <i className="bi bi-quote quote-icon-left"></i>
                      <span>{t.text}</span>
                      <i className="bi bi-quote quote-icon-right"></i>
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
