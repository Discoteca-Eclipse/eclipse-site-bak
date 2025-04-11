import './ClubEventCard.scss';
import {getTranslation} from "../../../utils/i18n.ts";
import type {ClubEventToList} from "../../../models";

interface Props {
  item: ClubEventToList;
  lang: string;
}

const ClubEventCard = ({item, lang}: Props) => {
  let formattedDate = getTranslation(lang, 'home.comingSoon');


  if (item && item.id > 0) {
    formattedDate = new Intl.DateTimeFormat(lang, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Madrid',
    }).format(new Date(item.date));
  }

  return (
    <div className="card-container">
      <div className="img-container">
        <img src={item.imageUrl} alt={item.name} className="img-fluid" width="1080" height="1920"/>
      </div>

      <div className="info-container">
        <div className="location">
          <p>{formattedDate}</p>
          <p className="title">{getTranslation(lang, 'title')}</p>
        </div>

        <div className="event">
          {item.id > 0 && <p>{item.name}</p>}
          {item.id > 0 &&
            <p>
              <span>{getTranslation(lang, 'home.info')}</span>
              {item.ticketsUrl && <span>&nbsp;/&nbsp;</span>}
              {item.ticketsUrl &&
                <a href={item.ticketsUrl} target="_blank" rel="noopener" className="buy-tickets">
                  {getTranslation(lang, 'home.buyTickets')}
                </a>
              }
            </p>
          }
        </div>
      </div>
    </div>
  );
};

export default ClubEventCard;
