import './HomeMarquee.scss'
import Marquee from "react-fast-marquee";
import {getTranslation} from "../../../utils/i18n.ts";

const HomeMarquee = () => {
  const lang = window.location.pathname.split('/')[1] ?? 'en';

  return (
    <section className={'marquee-container'}>
      <Marquee speed={250}>
        <div className="marquee-text">
          <h4>{getTranslation(lang, 'home.marquee')}</h4>
        </div>
      </Marquee>
    </section>
  )
}

export default HomeMarquee;
