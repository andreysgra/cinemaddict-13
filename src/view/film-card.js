import AbstractView from './abstract';
import {Utils, FormatTime} from '../utils';

const addActiveControlClass = (isActive) => {
  return isActive ? `film-card__controls-item--active` : ``;
};

const createFilmCardTemplate = (film) => {
  const {
    filmInfo: {
      title,
      totalRating,
      release: {date},
      runtime,
      genres,
      poster,
      description
    },
    userInfo: {
      isWatchlist,
      isWatched,
      isFavorite
    },
    comments
  } = film;

  const year = FormatTime.fullYear(date);
  const duration = FormatTime.duration(runtime);
  const genre = genres[0];
  const filmDescription = Utils.getShortDescription(description);
  const commentsCount = comments.length;
  const isWatchlistActive = addActiveControlClass(isWatchlist);
  const isWatchedActive = addActiveControlClass(isWatched);
  const isFavoriteActive = addActiveControlClass(isFavorite);

  return `
    <article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${filmDescription}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWatchlistActive}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatchedActive}" type="button">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavoriteActive}" type="button">Mark as favorite</button>
      </div>
    </article>
  `;
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._currentItem = null;

    this._clickHandler = this._clickHandler.bind(this);
  }

  _clickHandler(film) {
    this._handler.click(film);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setElementsClickHandler(handler) {
    this._handler.click = handler;

    this.getElement()
      .addEventListener(`click`, (evt) => {
        this._currentItem = evt.target;

        if (this._currentItem.className !== `film-card__poster`
          && this._currentItem.className !== `film-card__title`
          && this._currentItem.className !== `film-card__comments`) {
          return;
        }

        this._clickHandler(this._film);
      });
  }
}
