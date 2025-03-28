import './HomeUpcomingEvents.scss';
import ClubEventCard from "../ClubEventCard/ClubEventCard.tsx";
import type {ClubEventToList} from "../../../models";
import {useEffect, useState} from "react";
import {getUpcomingEvents} from "../../../services/club-events.service.ts";
import {getTranslation} from "../../../utils/i18n.ts";

const MAX_EVENTS = 4;

const HomeUpcomingEvents = () => {
  const [clubEvents, setClubEvents] = useState<ClubEventToList[] | null>(null);
  const [clubEventsOriginalLength, setClubEventsOriginalLength] = useState<number>(0);

  const lang = window.location.pathname.split('/')[1] ?? 'en';

  useEffect(() => {
    getUpcomingEvents().then(value => {
      setClubEventsOriginalLength(value.length);
      const toEvaluate = MAX_EVENTS - value.length;
      let id = -1;

      for (let i = 0; i < toEvaluate; i++) {
        value.push({
          id,
          name: getTranslation(lang, 'home.comingSoon'),
          date: new Date(),
          imageUrl: 'https://res.cloudinary.com/dzb2wocuz/image/upload/v1743167783/coming_soon_jnyrzf.jpg',
        })

        id = id - 1;
      }

      setClubEvents(value);
    })
  }, [])

  if (!clubEvents) {
    return null;
  }

  return (
    <section className="upcoming-events-container">
      <h1>{getTranslation(lang, 'home.upcomingEvents')}</h1>

      <div className="cards-container-slim">
        {clubEvents.slice(0, clubEventsOriginalLength).map(event =>
          <ClubEventCard key={event.id} item={event} lang={lang}/>
        )}
      </div>

      <div className="cards-container">
        {clubEvents.map(event =>
          <ClubEventCard key={event.id} item={event} lang={lang}/>
        )}
      </div>
    </section>
  );
};

export default HomeUpcomingEvents;
