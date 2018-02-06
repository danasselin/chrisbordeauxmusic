import landline from '~/app/images/Landline-movie-poster.jpg';
import obviousChild from '~/app/images/Obvious-child-movie-poster.jpg';
import lastTemptation from '~/app/images/last-temptation-of-christ-movie-poster.jpg';
import filmScores from './film_scores.json';

const imgs = {
  landline,
  obviousChild,
  lastTemptation,
};

const addImgToFilmScores = scores => (
  scores.map(value => ({ ...value, img: imgs[value.id] }))
);

export const enrichedScores = addImgToFilmScores(filmScores.films);

