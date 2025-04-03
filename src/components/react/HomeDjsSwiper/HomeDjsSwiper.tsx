import 'swiper/scss'
import 'swiper/scss/effect-cube'
import 'swiper/scss/pagination'
import './HomeDjsSwiper.scss'

import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, EffectCube, Pagination} from 'swiper/modules';
import {useEffect, useState} from "react";
import {getDjs} from "../../../services/djs.service.ts";
import type {EntityToList} from "../../../models";
import {getTranslation} from "../../../utils/i18n.ts";

const HomeDjsSwiper = () => {
  const [djs, setDjs] = useState<EntityToList[] | null>(null)
  const lang = window.location.pathname.split('/')[1] ?? 'en';

  useEffect(() => {
    getDjs().then(value => setDjs(value))
  }, [])

  if (!djs || djs.length === 0) {
    return null;
  }

  return (
    <>
      <h1>{getTranslation(lang, 'home.djs')}</h1>
      <div className="logo-container">
        <img className="eclipse-logo"
             src="https://res.cloudinary.com/dzb2wocuz/image/upload/v1743631774/ECLIPSE_LOGO-BLANCO-HORIZONTAL-SIN-TEXTO_lcaesp.svg"
             alt="Eclipse logo"/>
      </div>

      <Swiper
        effect={'cube'}
        grabCursor={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        autoplay={{delay: 2000}}
        pagination={true}
        modules={[EffectCube, Pagination, Autoplay]}
        className="mySwiper"
      >
        {djs.map(value =>
          <SwiperSlide key={value.id}>
            <img src={value.imageUrl} alt={value.name}/>
            <h4 className="dj-name">{value.name}</h4>
          </SwiperSlide>
        )}
      </Swiper>
    </>
  );
};

export default HomeDjsSwiper;
