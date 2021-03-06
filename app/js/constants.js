import landline from '~/app/images/landline-movie-poster.jpg';
import obviousChild from '~/app/images/obvious-child-movie-poster.jpg';
import theNymphets from '~/app/images/the-nymphets-movie-poster.jpg';

export const thumbnails = {
  landline,
  obviousChild,
  theNymphets,
};

export const scoreSrcs = [
  {
    name: 'obvious-child',
    titles: [
      'Bathtub',
      'Box',
      'ElevenThirty',
      'Greenpoint',
      'Halloween',
      'Opening',
      'Park Bench',
      'Recovery',
    ],
  },
  {
    name: 'landline',
    titles: [
      'Alan Posts Bail',
      'Ali Finds Out',
      'Ali Spies on Alan',
      'All The Shrimp',
      'Cab to Club',
      'Dana and Ali Spy on Alan',
      'Dana Reflects',
      'Post Credit Song',
    ],
  },
  {
    name: 'the-nymphets',
    titles: [
      'Black Balloons',
      'Late Night',
      'Night Variation 1',
      'Night Variation 2',
      'P-cussion',
      'Sitting on a Motorcycle',
    ],
  },
];

export const navItems = [
  'film scores',
  'other music',
  'contact',
  'about',
];

export const defaultAlbumName = 'obvious-child';

export const pathToScores =
  process.env.NODE_ENV === 'production'
    ? '/site_data/scores'
    : '/app/site_data/scores';

export const landlineColor = '#831abe';
export const theNymphetsColor = '#58336e';
export const obviousChildColor = '#f93672';

export const playerButtonSize = 2;
