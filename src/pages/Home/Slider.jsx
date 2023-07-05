import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination, Navigation, Autoplay, A11y } from "swiper/modules";
// Import Swiper styles
import 'swiper/css';
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

const Slider = () => {
    const swiperRef = useRef();
    return (
        <div className="relative">
            <Swiper
                modules={[Pagination, Navigation, Autoplay, A11y]}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: true,
                }}
                grabCursor={true}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
                className="hidden"
            >
                <SwiperSlide>
                    <div className="hero h-[70vh]" style={{ backgroundImage: `url("/banner/banner1.jpg")` }}>
                        <div className="hero-overlay bg-opacity-50"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div>
                                <h1 className="w-8/12 mx-auto mb-5 text-5xl font-bold">Capturing the Extraordinary in the Ordinary</h1>
                                <p className="mb-5">In this style of creative photography, photographers challenge traditional viewpoints and seek out unique angles and perspectives to capture everyday objects or scenes in extraordinary ways. By experimenting with composition, lighting, and perspective, they transform mundane subjects into visually captivating and thought-provoking images.</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="hero h-[70vh]" style={{ backgroundImage: `url("/banner/banner2.jpg")` }}>
                        <div className="hero-overlay bg-opacity-50"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div>
                                <h1 className="w-8/12 mx-auto mb-5 text-5xl font-bold">Evoking Emotion and Storytelling</h1>
                                <p className="mb-5">Conceptual photography goes beyond simply capturing a scene; it aims to convey specific emotions, ideas, or narratives through carefully planned and executed imagery. By using symbolism, metaphor, and visual storytelling techniques, photographers create thought-provoking and visually striking photographs that engage viewers on a deeper level.</p>

                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="hero h-[70vh]" style={{ backgroundImage: `url("/banner/banner3.jpg")` }}>
                        <div className="hero-overlay bg-opacity-50"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div>
                                <h1 className="w-8/12 mx-auto mb-5 text-5xl font-bold">Exploring Digital Manipulation in Photography</h1>
                                <p className="mb-5">Digital manipulation has opened up new possibilities for photographers to push the boundaries of creativity. By blending multiple images, altering colors, textures, or adding surreal elements, photographers can create imaginative and dreamlike compositions that blur the line between reality and fantasy. This form of creative photography embraces the digital medium as a tool for artistic expression and allows for endless experimentation and innovation.</p>

                            </div>
                        </div>
                    </div>
                </SwiperSlide>

            </Swiper>
            <button onClick={() => swiperRef.current?.slidePrev()} className="hidden lg:block mx-10 hover:bg-white btn z-10 btn-ghost absolute text-main  top-[45%] bg-white rounded-full"><HiArrowLeft></HiArrowLeft></button>
            <button onClick={() => swiperRef.current?.slideNext()} className="hidden lg:block mx-10 hover:bg-white btn z-10 btn-ghost absolute text-main  top-[45%] right-0 bg-white rounded-full"><HiArrowRight></HiArrowRight></button>
        </div>
    );
};

export default Slider;