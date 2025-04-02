import 'swiper/scss'
import 'swiper/scss/effect-cards'
import 'swiper/scss/pagination'
import './HomeDjsSwiper.scss'

import {Swiper, SwiperSlide} from 'swiper/react';
import {EffectCards} from 'swiper/modules';
import {useEffect, useState} from "react";
import {getDjs} from "../../../services/djs.service.ts";
import type {EntityToList} from "../../../models";
import {getTranslation} from "../../../utils/i18n.ts";

export const HomeDjsSwiper = () => {
  const [djs, setDjs] = useState<EntityToList[] | null>(null)
  const lang = window.location.pathname.split('/')[1] ?? 'en';

  useEffect(() => {
    getDjs().then(value => setDjs(value))
  }, [])

  if (!djs || djs.length === 0) {
    return null;
  }

  return (
    <section className="djs-swiper-container">
      <h1>{getTranslation(lang, 'home.djs')}</h1>

      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        {djs.map(value =>
          <SwiperSlide key={value.id}>
            <img src={value.imageUrl} alt={value.name}/>
          </SwiperSlide>
        )}
      </Swiper>
    </section>
  );
};
