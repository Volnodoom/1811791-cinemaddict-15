import Abstract from '../model/abstract';

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const EmptyStatement = {
  LOADING: 'Loading...',
  ALL_MOVIES: 'There are no movies in our database',
  WHATCHLIST: 'There are no movies to watch now',
  HISTORY: 'There are no watched movies now',
  FAVORITES: 'There are no favorite movies now',
};

const FooterCondition = {
  empty: '0 movies inside',
  upToDate: '130 291 movies inside',
};

const render = (container, child, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
  }
};

const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error ('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export {render, remove, createElement, RenderPosition, EmptyStatement, FooterCondition};
