import type {EntityToList} from './entity-to-list.model.ts';

export interface ClubEventToList extends EntityToList {
  date: Date;
  ticketsUrl?: string;
}
