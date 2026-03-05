// Rich Mock Data with IMDB Ratings and Reviews

const generateReviews = (count, rating) => {
  const reviewers = [
    'MovieBuff2024', 'CinemaLover', 'FilmCritic_Pro', 'StreamMaster',
    'PopcornKing', 'NightOwl_Watcher', 'BingeWatcher99', 'FilmFanatic',
    'ScreenSavant', 'ReelReview', 'Cinephile_Jane', 'MovieMaven',
    'TheaterGoer', 'FlickFan', 'SilverScreenPro'
  ];
  
  const reviewTexts = [
    'Absolutely incredible! The cinematography was stunning and the performances were top-notch.',
    'One of the best films I\'ve seen this year. Highly recommend!',
    'A masterpiece of storytelling. The director really outdid themselves.',
    'Great entertainment value. Perfect for a movie night.',
    'The plot twists kept me on the edge of my seat. Brilliant!',
    'While the visuals were amazing, the story felt a bit lacking in the second half.',
    'Solid performances all around. The soundtrack was particularly memorable.',
    'A must-watch for fans of the genre. Doesn\'t disappoint!',
    'Exceeded my expectations. The character development was exceptional.',
    'A bit slow in the beginning, but picks up pace and delivers a satisfying conclusion.',
    'The special effects were groundbreaking. A visual feast!',
    'Emotionally powerful and thought-provoking. Will stay with you long after.',
    'Perfect balance of action and drama. The pacing was excellent.',
    'The ensemble cast worked beautifully together. Great chemistry!',
    'A modern classic. This will be remembered for years to come.'
  ];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `review-${i}`,
    author: reviewers[i % reviewers.length],
    avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
    rating: Math.max(1, Math.min(10, rating + (Math.random() * 4 - 2))),
    date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    content: reviewTexts[i % reviewTexts.length],
    helpful: Math.floor(Math.random() * 500),
    verified: Math.random() > 0.3,
  }));
};

export const mockMovies = [
  {
    id: 'movie-1',
    imdbId: 'tt0468569',
    title: 'The Dark Knight',
    originalTitle: 'The Dark Knight',
    tagline: 'Why So Serious?',
    year: 2008,
    runtime: '2h 32m',
    released: 'July 18, 2008',
    rated: 'PG-13',
    
    synopsis: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    plot: 'With the help of allies Lt. Jim Gordon and DA Harvey Dent, Batman has been able to keep a tight lid on crime in Gotham City. But when a vile young criminal calling himself the Joker suddenly throws the town into chaos, the Caped Crusader begins to tread a fine line between heroism and vigilantism.',
    genres: ['Action', 'Crime', 'Drama', 'Thriller'],
    keywords: ['dc comics', 'joker', 'batman', 'organized crime', 'vigilante'],
    
    imdb: {
      rating: 9.0,
      votes: '2.8M',
      metascore: 84,
      popularity: 45,
      awards: 'Won 2 Oscars. 162 wins & 163 nominations total',
      ranked: '#3 on IMDb Top 250',
    },
    
    poster: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500&h=750&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&h=1080&fit=crop',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Dark_Knight_logo.svg/512px-Dark_Knight_logo.svg.png',
    trailer: 'https://www.youtube.com/watch?v=EXeTwQWrcwY',
    
    cast: [
      { id: 'c1', name: 'Christian Bale', character: 'Bruce Wayne / Batman', avatar: 'https://i.pravatar.cc/150?img=11', role: 'actor' },
      { id: 'c2', name: 'Heath Ledger', character: 'Joker', avatar: 'https://i.pravatar.cc/150?img=12', role: 'actor' },
      { id: 'c3', name: 'Aaron Eckhart', character: 'Harvey Dent / Two-Face', avatar: 'https://i.pravatar.cc/150?img=13', role: 'actor' },
      { id: 'c4', name: 'Michael Caine', character: 'Alfred', avatar: 'https://i.pravatar.cc/150?img=14', role: 'actor' },
      { id: 'c5', name: 'Maggie Gyllenhaal', character: 'Rachel Dawes', avatar: 'https://i.pravatar.cc/150?img=15', role: 'actor' },
      { id: 'c6', name: 'Gary Oldman', character: 'Commissioner Gordon', avatar: 'https://i.pravatar.cc/150?img=16', role: 'actor' },
      { id: 'c7', name: 'Christopher Nolan', character: '', avatar: 'https://i.pravatar.cc/150?img=17', role: 'director' },
      { id: 'c8', name: 'Jonathan Nolan', character: '', avatar: 'https://i.pravatar.cc/150?img=18', role: 'writer' },
    ],
    directors: ['Christopher Nolan'],
    writers: ['Jonathan Nolan', 'Christopher Nolan'],
    producers: ['Emma Thomas', 'Charles Roven', 'Christopher Nolan'],
    
    languages: ['English', 'Mandarin'],
    countries: ['USA', 'UK'],
    budget: '$185,000,000',
    boxOffice: '$1,006,234,167',
    production: 'Warner Bros. Pictures, Legendary Entertainment, Syncopy',
    
    reviews: generateReviews(15, 9.0),
    reviewCount: 2847,
    
    streams: [
      { id: 's1', name: '4K HDR', quality: '4K', size: '28.5 GB', type: 'torrent', seeds: 1247, peers: 89, language: 'English', subtitles: ['English', 'Spanish', 'French'] },
      { id: 's2', name: '1080p BluRay', quality: '1080p', size: '12.8 GB', type: 'torrent', seeds: 3421, peers: 156, language: 'English', subtitles: ['English', 'Spanish', 'French', 'German'] },
      { id: 's3', name: '720p BluRay', quality: '720p', size: '4.2 GB', type: 'torrent', seeds: 892, peers: 45, language: 'English', subtitles: ['English'] },
    ],
    
    type: 'movie',
  },
  {
    id: 'movie-2',
    imdbId: 'tt1375666',
    title: 'Inception',
    originalTitle: 'Inception',
    tagline: 'Your mind is the scene of the crime',
    year: 2010,
    runtime: '2h 28m',
    released: 'July 16, 2010',
    rated: 'PG-13',
    
    synopsis: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    plot: 'Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state, when the mind is at its most vulnerable. Cobb\'s rare ability has made him a coveted player in this treacherous new world of corporate espionage, but it has also made him an international fugitive and cost him everything he has ever loved.',
    genres: ['Action', 'Adventure', 'Sci-Fi', 'Thriller'],
    keywords: ['dream', 'subconscious', 'heist', 'thief', 'architecture'],
    
    imdb: {
      rating: 8.8,
      votes: '2.4M',
      metascore: 74,
      popularity: 32,
      awards: 'Won 4 Oscars. 157 wins & 220 nominations total',
      ranked: '#14 on IMDb Top 250',
    },
    
    poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&h=750&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&h=1080&fit=crop',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Inception_logo.svg/512px-Inception_logo.svg.png',
    trailer: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
    
    cast: [
      { id: 'c9', name: 'Leonardo DiCaprio', character: 'Cobb', avatar: 'https://i.pravatar.cc/150?img=19', role: 'actor' },
      { id: 'c10', name: 'Joseph Gordon-Levitt', character: 'Arthur', avatar: 'https://i.pravatar.cc/150?img=20', role: 'actor' },
      { id: 'c11', name: 'Elliot Page', character: 'Ariadne', avatar: 'https://i.pravatar.cc/150?img=21', role: 'actor' },
      { id: 'c12', name: 'Tom Hardy', character: 'Eames', avatar: 'https://i.pravatar.cc/150?img=22', role: 'actor' },
      { id: 'c13', name: 'Ken Watanabe', character: 'Saito', avatar: 'https://i.pravatar.cc/150?img=23', role: 'actor' },
      { id: 'c14', name: 'Christopher Nolan', character: '', avatar: 'https://i.pravatar.cc/150?img=17', role: 'director' },
    ],
    directors: ['Christopher Nolan'],
    writers: ['Christopher Nolan'],
    producers: ['Emma Thomas', 'Christopher Nolan'],
    
    languages: ['English', 'Japanese', 'French'],
    countries: ['USA', 'UK'],
    budget: '$160,000,000',
    boxOffice: '$836,836,967',
    production: 'Warner Bros. Pictures, Legendary Entertainment, Syncopy',
    
    reviews: generateReviews(12, 8.8),
    reviewCount: 2156,
    
    streams: [
      { id: 's4', name: '4K HDR', quality: '4K', size: '26.2 GB', type: 'torrent', seeds: 987, peers: 67, language: 'English', subtitles: ['English', 'Spanish', 'French'] },
      { id: 's5', name: '1080p BluRay', quality: '1080p', size: '11.5 GB', type: 'torrent', seeds: 2156, peers: 123, language: 'English', subtitles: ['English', 'Spanish', 'French', 'German'] },
    ],
    
    type: 'movie',
  },
  {
    id: 'movie-3',
    imdbId: 'tt0816692',
    title: 'Interstellar',
    originalTitle: 'Interstellar',
    tagline: 'Mankind was born on Earth. It was never meant to die here.',
    year: 2014,
    runtime: '2h 49m',
    released: 'November 7, 2014',
    rated: 'PG-13',
    
    synopsis: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    plot: 'Earth\'s future has been riddled by disasters, famines, and droughts. There is only one way to ensure mankind\'s survival: Interstellar travel. A newly discovered wormhole in the far reaches of our solar system allows a team of astronauts to go where no man has gone before, a planet that may have the right environment to sustain human life.',
    genres: ['Adventure', 'Drama', 'Sci-Fi'],
    keywords: ['space', 'wormhole', 'time travel', 'black hole', 'survival'],
    
    imdb: {
      rating: 8.7,
      votes: '2.1M',
      metascore: 74,
      popularity: 28,
      awards: 'Won 1 Oscar. 44 wins & 148 nominations total',
      ranked: '#19 on IMDb Top 250',
    },
    
    poster: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=500&h=750&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&h=1080&fit=crop',
    trailer: 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
    
    cast: [
      { id: 'c15', name: 'Matthew McConaughey', character: 'Cooper', avatar: 'https://i.pravatar.cc/150?img=24', role: 'actor' },
      { id: 'c16', name: 'Anne Hathaway', character: 'Brand', avatar: 'https://i.pravatar.cc/150?img=25', role: 'actor' },
      { id: 'c17', name: 'Jessica Chastain', character: 'Murph', avatar: 'https://i.pravatar.cc/150?img=26', role: 'actor' },
      { id: 'c18', name: 'Michael Caine', character: 'Professor Brand', avatar: 'https://i.pravatar.cc/150?img=14', role: 'actor' },
      { id: 'c19', name: 'Christopher Nolan', character: '', avatar: 'https://i.pravatar.cc/150?img=17', role: 'director' },
    ],
    directors: ['Christopher Nolan'],
    writers: ['Jonathan Nolan', 'Christopher Nolan'],
    producers: ['Emma Thomas', 'Christopher Nolan', 'Lynda Obst'],
    
    languages: ['English'],
    countries: ['USA', 'UK', 'Canada'],
    budget: '$165,000,000',
    boxOffice: '$701,729,206',
    production: 'Paramount Pictures, Warner Bros. Pictures, Legendary Pictures',
    
    reviews: generateReviews(14, 8.7),
    reviewCount: 1987,
    
    streams: [
      { id: 's6', name: '4K HDR', quality: '4K', size: '31.8 GB', type: 'torrent', seeds: 1456, peers: 98, language: 'English', subtitles: ['English', 'Spanish', 'French'] },
      { id: 's7', name: '1080p BluRay', quality: '1080p', size: '14.2 GB', type: 'torrent', seeds: 2890, peers: 167, language: 'English', subtitles: ['English', 'Spanish', 'French', 'German'] },
    ],
    
    type: 'movie',
  },
  {
    id: 'movie-4',
    imdbId: 'tt15398776',
    title: 'Oppenheimer',
    originalTitle: 'Oppenheimer',
    tagline: 'The world forever changes',
    year: 2023,
    runtime: '3h',
    released: 'July 21, 2023',
    rated: 'R',
    
    synopsis: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    plot: 'During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project. Oppenheimer and a team of scientists spend years developing and designing the atomic bomb. Their work comes to fruition on July 16, 1945, as they witness the world\'s first nuclear explosion, forever changing the course of history.',
    genres: ['Biography', 'Drama', 'History'],
    keywords: ['atomic bomb', 'manhattan project', 'physicist', 'world war ii', 'nuclear'],
    
    imdb: {
      rating: 8.4,
      votes: '892K',
      metascore: 88,
      popularity: 15,
      awards: 'Won 7 Oscars. 405 wins & 395 nominations total',
      ranked: '#55 on IMDb Top 250',
    },
    
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&h=750&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&h=1080&fit=crop',
    trailer: 'https://www.youtube.com/watch?v=bB6-eD1LJ9w',
    
    cast: [
      { id: 'c20', name: 'Cillian Murphy', character: 'J. Robert Oppenheimer', avatar: 'https://i.pravatar.cc/150?img=27', role: 'actor' },
      { id: 'c21', name: 'Emily Blunt', character: 'Katherine Oppenheimer', avatar: 'https://i.pravatar.cc/150?img=28', role: 'actor' },
      { id: 'c22', name: 'Matt Damon', character: 'Leslie Groves', avatar: 'https://i.pravatar.cc/150?img=29', role: 'actor' },
      { id: 'c23', name: 'Robert Downey Jr.', character: 'Lewis Strauss', avatar: 'https://i.pravatar.cc/150?img=30', role: 'actor' },
      { id: 'c24', name: 'Christopher Nolan', character: '', avatar: 'https://i.pravatar.cc/150?img=17', role: 'director' },
    ],
    directors: ['Christopher Nolan'],
    writers: ['Christopher Nolan'],
    producers: ['Emma Thomas', 'Charles Roven', 'Christopher Nolan'],
    
    languages: ['English', 'German', 'Italian'],
    countries: ['USA', 'UK'],
    budget: '$100,000,000',
    boxOffice: '$976,200,000',
    production: 'Universal Pictures, Syncopy, Atlas Entertainment',
    
    reviews: generateReviews(18, 8.4),
    reviewCount: 3245,
    
    streams: [
      { id: 's8', name: '4K HDR', quality: '4K', size: '35.2 GB', type: 'torrent', seeds: 2341, peers: 156, language: 'English', subtitles: ['English', 'Spanish', 'French'] },
      { id: 's9', name: '1080p BluRay', quality: '1080p', size: '16.8 GB', type: 'torrent', seeds: 4123, peers: 234, language: 'English', subtitles: ['English', 'Spanish', 'French', 'German'] },
    ],
    
    type: 'movie',
  },
  {
    id: 'movie-5',
    imdbId: 'tt0137523',
    title: 'Fight Club',
    originalTitle: 'Fight Club',
    tagline: 'Mischief. Mayhem. Soap.',
    year: 1999,
    runtime: '2h 19m',
    released: 'October 15, 1999',
    rated: 'R',
    
    synopsis: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.',
    plot: 'A nameless first person narrator attends support groups in attempt to subdue his emotional state and relieve his insomniac state. When he meets Marla, another fake attendee of support groups, his life seems to become a little more bearable. However when he associates himself with Tyler he is dragged into an underground fight club and soap making scheme.',
    genres: ['Drama'],
    keywords: ['fight club', 'split personality', 'anarchy', 'consumerism', 'underground'],
    
    imdb: {
      rating: 8.8,
      votes: '2.3M',
      metascore: 67,
      popularity: 38,
      awards: 'Nominated for 1 Oscar. 12 wins & 38 nominations total',
      ranked: '#12 on IMDb Top 250',
    },
    
    poster: 'https://images.unsplash.com/photo-1594909122849-11daa2a0cf2b?w=500&h=750&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop',
    trailer: 'https://www.youtube.com/watch?v=SUXWAEXZjlg',
    
    cast: [
      { id: 'c25', name: 'Brad Pitt', character: 'Tyler Durden', avatar: 'https://i.pravatar.cc/150?img=31', role: 'actor' },
      { id: 'c26', name: 'Edward Norton', character: 'The Narrator', avatar: 'https://i.pravatar.cc/150?img=32', role: 'actor' },
      { id: 'c27', name: 'Helena Bonham Carter', character: 'Marla Singer', avatar: 'https://i.pravatar.cc/150?img=33', role: 'actor' },
      { id: 'c28', name: 'David Fincher', character: '', avatar: 'https://i.pravatar.cc/150?img=34', role: 'director' },
    ],
    directors: ['David Fincher'],
    writers: ['Chuck Palahniuk', 'Jim Uhls'],
    producers: ['Art Linson', 'Ceán Chaffin', 'Ross Grayson Bell'],
    
    languages: ['English'],
    countries: ['USA', 'Germany'],
    budget: '$63,000,000',
    boxOffice: '$101,209,702',
    production: '20th Century Fox, Regency Enterprises, Linson Films',
    
    reviews: generateReviews(16, 8.8),
    reviewCount: 2456,
    
    streams: [
      { id: 's10', name: '4K HDR', quality: '4K', size: '22.5 GB', type: 'torrent', seeds: 1876, peers: 123, language: 'English', subtitles: ['English', 'Spanish', 'French'] },
      { id: 's11', name: '1080p BluRay', quality: '1080p', size: '10.2 GB', type: 'torrent', seeds: 3456, peers: 198, language: 'English', subtitles: ['English', 'Spanish', 'French', 'German'] },
    ],
    
    type: 'movie',
  },
  {
    id: 'movie-6',
    imdbId: 'tt7286456',
    title: 'Joker',
    originalTitle: 'Joker',
    tagline: 'Put on a happy face',
    year: 2019,
    runtime: '2h 2m',
    released: 'October 4, 2019',
    rated: 'R',
    
    synopsis: 'In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.',
    plot: 'Arthur Fleck works as a clown and is an aspiring stand-up comic. He has mental health issues, part of which involves uncontrollable laughter. Times are tough and, due to his issues and occupation, Arthur has an even worse time than most. Over time these issues bear down on him, shaping his actions, making him ultimately take on the persona he is more known as...Joker.',
    genres: ['Crime', 'Drama', 'Thriller'],
    keywords: ['joker', 'mental illness', 'clown', 'gotham city', 'origin story'],
    
    imdb: {
      rating: 8.4,
      votes: '1.4M',
      metascore: 59,
      popularity: 22,
      awards: 'Won 2 Oscars. 121 wins & 247 nominations total',
      ranked: '#57 on IMDb Top 250',
    },
    
    poster: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=500&h=750&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&h=1080&fit=crop',
    trailer: 'https://www.youtube.com/watch?v=zAGVQLHvwOY',
    
    cast: [
      { id: 'c29', name: 'Joaquin Phoenix', character: 'Arthur Fleck / Joker', avatar: 'https://i.pravatar.cc/150?img=35', role: 'actor' },
      { id: 'c30', name: 'Robert De Niro', character: 'Murray Franklin', avatar: 'https://i.pravatar.cc/150?img=36', role: 'actor' },
      { id: 'c31', name: 'Zazie Beetz', character: 'Sophie Dumond', avatar: 'https://i.pravatar.cc/150?img=37', role: 'actor' },
      { id: 'c32', name: 'Todd Phillips', character: '', avatar: 'https://i.pravatar.cc/150?img=38', role: 'director' },
    ],
    directors: ['Todd Phillips'],
    writers: ['Todd Phillips', 'Scott Silver'],
    producers: ['Bradley Cooper', 'Todd Phillips', 'Emma Tillinger Koskoff'],
    
    languages: ['English'],
    countries: ['USA', 'Canada'],
    budget: '$55,000,000',
    boxOffice: '$1,074,458,282',
    production: 'Warner Bros. Pictures, Village Roadshow Pictures, Bron Creative',
    
    reviews: generateReviews(17, 8.4),
    reviewCount: 2890,
    
    streams: [
      { id: 's12', name: '4K HDR', quality: '4K', size: '24.8 GB', type: 'torrent', seeds: 1567, peers: 98, language: 'English', subtitles: ['English', 'Spanish', 'French'] },
      { id: 's13', name: '1080p BluRay', quality: '1080p', size: '11.5 GB', type: 'torrent', seeds: 2890, peers: 167, language: 'English', subtitles: ['English', 'Spanish', 'French', 'German'] },
    ],
    
    type: 'movie',
  },
];

export const mockTVShows = [
  {
    id: 'tv-1',
    imdbId: 'tt0903747',
    title: 'Breaking Bad',
    originalTitle: 'Breaking Bad',
    tagline: 'Remember my name',
    year: 2008,
    yearEnd: 2013,
    status: 'ended',
    
    synopsis: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family\'s future.',
    plot: 'When chemistry teacher Walter White is diagnosed with Stage III cancer and given only two years to live, he decides he has nothing to lose. He lives with his teenage son, who has cerebral palsy, and his wife, in New Mexico. Determined to ensure that his family will have a secure future, Walt embarks on a career of drugs and crime.',
    genres: ['Crime', 'Drama', 'Thriller'],
    keywords: ['methamphetamine', 'cancer', 'teacher', 'drugs', 'new mexico'],
    
    imdb: {
      rating: 9.5,
      votes: '2.1M',
      metascore: 87,
      popularity: 12,
      awards: 'Won 16 Primetime Emmys. 152 wins & 238 nominations total',
      ranked: '#1 on IMDb Top 250 TV',
    },
    
    poster: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&h=750&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop',
    trailer: 'https://www.youtube.com/watch?v=HhesaQXLuRY',
    
    cast: [
      { id: 'c33', name: 'Bryan Cranston', character: 'Walter White', avatar: 'https://i.pravatar.cc/150?img=39', role: 'actor' },
      { id: 'c34', name: 'Aaron Paul', character: 'Jesse Pinkman', avatar: 'https://i.pravatar.cc/150?img=40', role: 'actor' },
      { id: 'c35', name: 'Anna Gunn', character: 'Skyler White', avatar: 'https://i.pravatar.cc/150?img=41', role: 'actor' },
      { id: 'c36', name: 'Dean Norris', character: 'Hank Schrader', avatar: 'https://i.pravatar.cc/150?img=42', role: 'actor' },
      { id: 'c37', name: 'Vince Gilligan', character: '', avatar: 'https://i.pravatar.cc/150?img=43', role: 'director' },
    ],
    creators: ['Vince Gilligan'],
    
    seasons: [
      {
        id: 's1',
        number: 1,
        title: 'Season 1',
        episodeCount: 7,
        year: 2008,
        synopsis: 'High school chemistry teacher Walter White learns he has terminal lung cancer. Desperate to secure his family\'s financial future, he teams with former student Jesse Pinkman to produce and sell crystal meth.',
        poster: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&h=750&fit=crop',
        episodes: [
          { id: 'e1', number: 1, title: 'Pilot', synopsis: 'Walter White, a high school chemistry teacher, learns he has terminal lung cancer.', runtime: '58m', airDate: '2008-01-20', rating: 9.0, stillImage: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&h=280&fit=crop' },
          { id: 'e2', number: 2, title: 'Cat\'s in the Bag...', synopsis: 'Walt and Jesse attempt to dispose of the bodies.', runtime: '48m', airDate: '2008-01-27', rating: 8.7, stillImage: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&h=280&fit=crop' },
          { id: 'e3', number: 3, title: '...And the Bag\'s in the River', synopsis: 'Walt faces a difficult decision.', runtime: '48m', airDate: '2008-02-10', rating: 8.9, stillImage: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&h=280&fit=crop' },
        ],
      },
      {
        id: 's2',
        number: 2,
        title: 'Season 2',
        episodeCount: 13,
        year: 2009,
        synopsis: 'Walt and Jesse\'s operation expands, drawing attention from dangerous quarters.',
        poster: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&h=750&fit=crop',
        episodes: [
          { id: 'e4', number: 1, title: 'Seven Thirty-Seven', synopsis: 'Walt and Jesse realize how far they\'ve come.', runtime: '47m', airDate: '2009-03-08', rating: 8.8, stillImage: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&h=280&fit=crop' },
          { id: 'e5', number: 2, title: 'Grilled', synopsis: 'Tuco takes Walt and Jesse prisoner.', runtime: '47m', airDate: '2009-03-15', rating: 9.1, stillImage: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&h=280&fit=crop' },
        ],
      },
    ],
    seasonCount: 5,
    episodeCount: 62,
    
    languages: ['English', 'Spanish'],
    countries: ['USA'],
    network: 'AMC',
    
    reviews: generateReviews(20, 9.5),
    reviewCount: 4567,
    
    type: 'tv',
  },
  {
    id: 'tv-2',
    imdbId: 'tt0944947',
    title: 'Game of Thrones',
    originalTitle: 'Game of Thrones',
    tagline: 'Winter is Coming',
    year: 2011,
    yearEnd: 2019,
    status: 'ended',
    
    synopsis: 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.',
    plot: 'In the mythical continent of Westeros, several powerful families fight for control of the Seven Kingdoms. As conflict erupts in the kingdoms of men, an ancient enemy rises once again to threaten them all. Meanwhile, the last heirs of a recently usurped dynasty plot to take back their homeland from across the Narrow Sea.',
    genres: ['Action', 'Adventure', 'Drama', 'Fantasy'],
    keywords: ['dragon', 'throne', 'winter', 'kingdom', 'war'],
    
    imdb: {
      rating: 9.2,
      votes: '2.2M',
      metascore: 86,
      popularity: 8,
      awards: 'Won 59 Primetime Emmys. 397 wins & 655 nominations total',
      ranked: '#7 on IMDb Top 250 TV',
    },
    
    poster: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=500&h=750&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=1920&h=1080&fit=crop',
    trailer: 'https://www.youtube.com/watch?v=bjqEWgDVPe0',
    
    cast: [
      { id: 'c38', name: 'Emilia Clarke', character: 'Daenerys Targaryen', avatar: 'https://i.pravatar.cc/150?img=44', role: 'actor' },
      { id: 'c39', name: 'Peter Dinklage', character: 'Tyrion Lannister', avatar: 'https://i.pravatar.cc/150?img=45', role: 'actor' },
      { id: 'c40', name: 'Kit Harington', character: 'Jon Snow', avatar: 'https://i.pravatar.cc/150?img=46', role: 'actor' },
      { id: 'c41', name: 'Lena Headey', character: 'Cersei Lannister', avatar: 'https://i.pravatar.cc/150?img=47', role: 'actor' },
      { id: 'c42', name: 'David Benioff', character: '', avatar: 'https://i.pravatar.cc/150?img=48', role: 'director' },
      { id: 'c43', name: 'D.B. Weiss', character: '', avatar: 'https://i.pravatar.cc/150?img=49', role: 'director' },
    ],
    creators: ['David Benioff', 'D.B. Weiss'],
    
    seasons: [
      {
        id: 's3',
        number: 1,
        title: 'Season 1',
        episodeCount: 10,
        year: 2011,
        synopsis: 'Trouble is brewing in Westeros.',
        poster: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=500&h=750&fit=crop',
        episodes: [
          { id: 'e6', number: 1, title: 'Winter Is Coming', synopsis: 'Lord Eddard Stark is troubled by reports from a Night\'s Watch deserter.', runtime: '62m', airDate: '2011-04-17', rating: 9.0, stillImage: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=500&h=280&fit=crop' },
          { id: 'e7', number: 2, title: 'The Kingsroad', synopsis: 'The Lannisters plot to ensure Bran\'s silence.', runtime: '56m', airDate: '2011-04-24', rating: 8.7, stillImage: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=500&h=280&fit=crop' },
        ],
      },
    ],
    seasonCount: 8,
    episodeCount: 73,
    
    languages: ['English'],
    countries: ['USA', 'UK'],
    network: 'HBO',
    
    reviews: generateReviews(18, 9.2),
    reviewCount: 5234,
    
    type: 'tv',
  },
  {
    id: 'tv-3',
    imdbId: 'tt4574334',
    title: 'Stranger Things',
    originalTitle: 'Stranger Things',
    tagline: 'The world is turning upside down',
    year: 2016,
    status: 'ongoing',
    
    synopsis: 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.',
    plot: 'In a small town where everyone knows everyone, a peculiar incident starts a chain of events that leads to the disappearance of a child, which begins to tear at the fabric of an otherwise peaceful community. Dark government agencies and seemingly malevolent supernatural forces converge on the town, while a few locals begin to understand that there\'s more going on than meets the eye.',
    genres: ['Drama', 'Fantasy', 'Horror', 'Mystery', 'Sci-Fi', 'Thriller'],
    keywords: ['supernatural', '1980s', 'missing child', 'government conspiracy', 'upside down'],
    
    imdb: {
      rating: 8.7,
      votes: '1.3M',
      metascore: 76,
      popularity: 18,
      awards: 'Won 12 Primetime Emmys. 79 wins & 231 nominations total',
      ranked: '#32 on IMDb Top 250 TV',
    },
    
    poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500&h=750&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&h=1080&fit=crop',
    trailer: 'https://www.youtube.com/watch?v=b9EkMc79ZSU',
    
    cast: [
      { id: 'c44', name: 'Millie Bobby Brown', character: 'Eleven', avatar: 'https://i.pravatar.cc/150?img=50', role: 'actor' },
      { id: 'c45', name: 'Finn Wolfhard', character: 'Mike Wheeler', avatar: 'https://i.pravatar.cc/150?img=51', role: 'actor' },
      { id: 'c46', name: 'Winona Ryder', character: 'Joyce Byers', avatar: 'https://i.pravatar.cc/150?img=52', role: 'actor' },
      { id: 'c47', name: 'David Harbour', character: 'Jim Hopper', avatar: 'https://i.pravatar.cc/150?img=53', role: 'actor' },
      { id: 'c48', name: 'Matt Duffer', character: '', avatar: 'https://i.pravatar.cc/150?img=54', role: 'director' },
      { id: 'c49', name: 'Ross Duffer', character: '', avatar: 'https://i.pravatar.cc/150?img=55', role: 'director' },
    ],
    creators: ['Matt Duffer', 'Ross Duffer'],
    
    seasons: [
      {
        id: 's4',
        number: 1,
        title: 'Season 1',
        episodeCount: 8,
        year: 2016,
        synopsis: 'A love letter to the \'80s classics that captivated a generation.',
        poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500&h=750&fit=crop',
        episodes: [
          { id: 'e8', number: 1, title: 'The Vanishing of Will Byers', synopsis: 'On his way home from a friend\'s house, young Will sees something terrifying.', runtime: '49m', airDate: '2016-07-15', rating: 8.6, stillImage: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500&h=280&fit=crop' },
          { id: 'e9', number: 2, title: 'The Weirdo on Maple Street', synopsis: 'Lucas, Mike and Dustin try to talk to the girl they found in the woods.', runtime: '56m', airDate: '2016-07-15', rating: 8.5, stillImage: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500&h=280&fit=crop' },
        ],
      },
    ],
    seasonCount: 4,
    episodeCount: 34,
    
    languages: ['English'],
    countries: ['USA'],
    network: 'Netflix',
    
    reviews: generateReviews(15, 8.7),
    reviewCount: 3456,
    
    type: 'tv',
  },
];

export const mockIPTVChannels = [
  { id: 'ch1', name: 'HBO', tvgLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/HBO_logo.svg/1200px-HBO_logo.svg.png', group: 'Movies', country: 'US', language: 'English', url: 'http://example.com/hbo' },
  { id: 'ch2', name: 'HBO 2', tvgLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/HBO2_logo.svg/1200px-HBO2_logo.svg.png', group: 'Movies', country: 'US', language: 'English', url: 'http://example.com/hbo2' },
  { id: 'ch3', name: 'Cinemax', tvgLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Cinemax_2016.svg/1200px-Cinemax_2016.svg.png', group: 'Movies', country: 'US', language: 'English', url: 'http://example.com/cinemax' },
  { id: 'ch4', name: 'Showtime', tvgLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Showtime_2018.svg/1200px-Showtime_2018.svg.png', group: 'Movies', country: 'US', language: 'English', url: 'http://example.com/showtime' },
  { id: 'ch5', name: 'Starz', tvgLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Starz_2016.svg/1200px-Starz_2016.svg.png', group: 'Movies', country: 'US', language: 'English', url: 'http://example.com/starz' },
  { id: 'ch6', name: 'ESPN', tvgLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/ESPN_logo.svg/1200px-ESPN_logo.svg.png', group: 'Sports', country: 'US', language: 'English', url: 'http://example.com/espn' },
  { id: 'ch7', name: 'ESPN 2', tvgLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/ESPN2_logo.svg/1200px-ESPN2_logo.svg.png', group: 'Sports', country: 'US', language: 'English', url: 'http://example.com/espn2' },
  { id: 'ch8', name: 'Fox Sports', tvgLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Fox_Sports_logo.svg/1200px-Fox_Sports_logo.svg.png', group: 'Sports', country: 'US', language: 'English', url: 'http://example.com/foxsports' },
  { id: 'ch9', name: 'CNN', tvgLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/CNN.svg/1200px-CNN.svg.png', group: 'News', country: 'US', language: 'English', url: 'http://example.com/cnn' },
  { id: 'ch10', name: 'BBC News', tvgLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/BBC_News_2019.svg/1200px-BBC_News_2019.svg.png', group: 'News', country: 'UK', language: 'English', url: 'http://example.com/bbcnews' },
  { id: 'ch11', name: 'Discovery', tvgLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Discovery_Channel_logo.svg/1200px-Discovery_Channel_logo.svg.png', group: 'Documentary', country: 'US', language: 'English', url: 'http://example.com/discovery' },
  { id: 'ch12', name: 'National Geographic', tvgLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Natgeologo.svg/1200px-Natgeologo.svg.png', group: 'Documentary', country: 'US', language: 'English', url: 'http://example.com/natgeo' },
];

export const mockAddons = [
  { id: 'addon1', name: 'The Movie Database', description: 'Metadata from TMDB - posters, ratings, trailers and more', version: '2.0.0', manifestUrl: 'https://addons.strem.io/tmdb/manifest.json', isInstalled: true, isEnabled: true, types: ['movie', 'series'] },
  { id: 'addon2', name: 'OpenSubtitles', description: 'The largest collection of subtitles for movies and TV shows', version: '1.5.0', manifestUrl: 'https://opensubtitles.strem.io/manifest.json', isInstalled: true, isEnabled: true, types: ['movie', 'series'] },
  { id: 'addon3', name: 'YouTube', description: 'Watch YouTube videos in Stremio', version: '1.3.0', manifestUrl: 'https://youtube.strem.io/manifest.json', isInstalled: false, isEnabled: false, types: ['channel'] },
  { id: 'addon4', name: 'Twitch', description: 'Watch Twitch streams', version: '1.2.0', manifestUrl: 'https://twitch.strem.io/manifest.json', isInstalled: false, isEnabled: false, types: ['tv'] },
  { id: 'addon5', name: 'Torrentio', description: 'Torrent streams from various providers', version: '0.1.0', manifestUrl: 'https://torrentio.strem.fun/manifest.json', isInstalled: true, isEnabled: true, types: ['movie', 'series'] },
];

export const continueWatching = [
  { id: 'cw1', contentId: 'movie-1', title: 'The Dark Knight', poster: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500&h=750&fit=crop', progress: 65, duration: 9120, currentTime: 5928, type: 'movie', lastWatched: '2024-01-15T20:30:00Z' },
  { id: 'cw2', contentId: 'tv-1', title: 'Breaking Bad', poster: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&h=750&fit=crop', progress: 42, duration: 2880, currentTime: 1210, episodeTitle: 'Ozymandias', seasonNumber: 5, episodeNumber: 14, type: 'tv', lastWatched: '2024-01-14T22:15:00Z' },
  { id: 'cw3', contentId: 'tv-2', title: 'Game of Thrones', poster: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=500&h=750&fit=crop', progress: 78, duration: 3600, currentTime: 2808, episodeTitle: 'The Long Night', seasonNumber: 8, episodeNumber: 3, type: 'tv', lastWatched: '2024-01-13T21:00:00Z' },
];

export const watchlist = [
  { id: 'wl1', contentId: 'movie-2', type: 'movie', addedAt: '2024-01-10T10:00:00Z' },
  { id: 'wl2', contentId: 'movie-3', type: 'movie', addedAt: '2024-01-09T15:30:00Z' },
  { id: 'wl3', contentId: 'tv-3', type: 'tv', addedAt: '2024-01-08T20:00:00Z' },
];
