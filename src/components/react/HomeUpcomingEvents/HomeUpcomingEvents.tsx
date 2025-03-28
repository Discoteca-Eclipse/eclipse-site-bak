import './HomeUpcomingEvents.scss';
import {useEffect, useState} from "react";
import {getUpcomingEvents} from "../../../services/club-events.service.js";
import {getTranslation} from "../../../utils/i18n.js";
import type {ClubEventToList} from "../../../models";
import ClubEventCard from "../ClubEventCard/ClubEventCard.tsx";

const HomeUpcomingEvents = () => {
  const [clubEvents, setClubEvents] = useState<ClubEventToList[] | null>(null);
  const lang = window.location.pathname.split('/')[1] ?? 'en';

  useEffect(() => {
    getUpcomingEvents().then(value => {
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
        {clubEvents.slice(0, 3).map(event =>
          <ClubEventCard item={event} lang={lang}/>
        )}
      </div>

      <div className="cards-container">
        {clubEvents.map(event =>
          <ClubEventCard item={event} lang={lang}/>
        )}
      </div>
    </section>
  );
};

export default HomeUpcomingEvents;
