import 'swiper/scss'
import 'swiper/scss/effect-coverflow'
import 'swiper/scss/pagination'
import './HomeDjsSwiper.scss'

import {Swiper, SwiperSlide} from 'swiper/react';
import {EffectCoverflow, Pagination} from 'swiper/modules';
import {useEffect, useState} from "react";
import {getDjs} from "../../../services/djs.service.ts";
import type {EntityToList} from "../../../models";

export const HomeDjsSwiper = () => {
  const [djs, setDjs] = useState<EntityToList[] | null>(null)

  useEffect(() => {
    getDjs().then(value => setDjs(value))
  }, [])

  if (!djs || djs.length === 0) {
    return null;
  }

  return (
    <section className="djs-swiper-container">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        loop={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {djs.map(value =>
          <SwiperSlide>
            <img src={value.imageUrl} alt={value.name}/>
          </SwiperSlide>
        )}
      </Swiper>
    </section>
  );
};
