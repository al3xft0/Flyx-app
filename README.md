# Flyx 🟢

A modern streaming app for Android and Fire TV with rich metadata, IMDB ratings, and user reviews.

## Features

### 🎬 Rich Media Metadata
- **IMDB Integration**: Full IMDB ratings, vote counts, Metascores, and rankings
- **Detailed Information**: Plot synopsis, taglines, release dates, runtime, ratings
- **Cast & Crew**: Complete cast list with avatars, directors, writers, producers
- **Technical Details**: Budget, box office, production companies, languages, countries
- **Awards**: Oscar wins/nominations and other award information

### 💬 User Reviews & Comments
- **Review System**: User ratings and detailed reviews
- **Verified Badges**: Verified reviewer indicators
- **Helpful Votes**: Community-driven helpfulness ratings
- **Review Stats**: Total review count and average rating display

### 📺 IPTV Support
- **M3U Playlists**: Add and manage M3U playlist URLs
- **Xtreme Codes**: Full Xtreme Codes API support
- **Channel Groups**: Organized by category (Movies, Sports, News, etc.)
- **EPG Support**: Electronic Program Guide integration
- **Channel Navigation**: Easy channel switching with sidebar

### 🔌 Stremio Addons
- **Addon Management**: Install and configure Stremio addons
- **Catalog Selection**: Choose which catalogs to display
- **Custom Addons**: Support for custom manifest URLs

### 🎨 Dark Green Theme
- **Eye-Friendly Design**: Dark green color scheme that's easy on the eyes
- **Soft Corners**: Rounded UI elements throughout
- **Smooth Animations**: Polished transitions and micro-interactions

## Screenshots

### Home Screen
- Featured hero section with backdrop
- Continue watching with progress bars
- Trending movies and TV shows
- IMDB ratings on all cards

### Detail Screen
- Full backdrop with gradient overlay
- Poster with shadow effect
- IMDB badge with rating, votes, Metascore
- Awards and rankings display
- Cast & crew section
- User reviews with ratings
- Available stream sources

### Player
- Full-screen video player
- Custom controls overlay
- Quality selection (4K, 1080p, 720p, 480p, Auto)
- Subtitle support
- Seek controls (±10 seconds)
- Volume and mute controls

### IPTV Player
- Channel list sidebar
- Live indicator
- Previous/Next channel navigation
- Channel number display

## Project Structure

```
flyx-mobile/
├── App.js                    # Main app entry
├── app.json                  # Expo configuration
├── eas.json                  # EAS build configuration
├── package.json              # Dependencies
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js     # Home with featured content
│   │   ├── SearchScreen.js   # Search with filters
│   │   ├── IPTVScreen.js     # IPTV playlist management
│   │   ├── LibraryScreen.js  # Watchlist & continue watching
│   │   ├── SettingsScreen.js # App settings
│   │   ├── DetailScreen.js   # Rich media details with reviews
│   │   ├── PlayerScreen.js   # Video player
│   │   └── IPTVPlayerScreen.js # IPTV player
│   ├── theme/
│   │   ├── colors.js         # Dark green color palette
│   │   └── index.js          # Theme exports
│   ├── data/
│   │   └── mockData.js       # Rich mock data with IMDB info
│   └── types/
│       └── index.ts          # TypeScript type definitions
└── assets/
    ├── icon.png              # App icon
    ├── adaptive-icon.png     # Android adaptive icon
    ├── splash.png            # Splash screen
    └── favicon.png           # Web favicon
```

## Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Expo CLI
- EAS CLI (for building APKs)

### Setup

1. **Install dependencies:**
```bash
cd flyx-mobile
npm install
```

2. **Install Expo CLI and EAS CLI:**
```bash
npm install -g expo-cli eas-cli
```

3. **Login to Expo:**
```bash
expo login
```

## Running the App

### Development Mode
```bash
npm start
# or
expo start
```

### Run on Android Device
```bash
npm run android
```

## Building APKs

### 1. Configure EAS

Make sure you're logged in:
```bash
eas login
```

### 2. Build Android APK

**Standard Android APK:**
```bash
eas build -p android --profile production
```

**Fire TV APK:**
```bash
eas build -p android --profile firetv
```

### 3. Download the APK

After the build completes, you'll receive a download link. You can also download from the EAS dashboard.

### Build Configuration

The `eas.json` file contains build profiles:

```json
{
  "build": {
    "production": {
      "android": {
        "buildType": "apk"
      }
    },
    "firetv": {
      "android": {
        "buildType": "apk",
        "env": {
          "ANDROID_TV": "true"
        }
      }
    }
  }
}
```

## Installing on Devices

### Android Phone/Tablet
1. Enable "Unknown Sources" in Settings > Security
2. Transfer the APK to your device
3. Tap the APK file to install

### Fire TV / Android TV
1. Enable "Apps from Unknown Sources":
   - Settings > My Fire TV > Developer Options > Apps from Unknown Sources
2. Install Downloader app from Amazon App Store
3. Enter the download URL or use USB transfer
4. Install the APK

## Data Structure

### Rich Movie/TV Data
```javascript
{
  id: 'movie-1',
  imdbId: 'tt0468569',
  title: 'The Dark Knight',
  tagline: 'Why So Serious?',
  year: 2008,
  runtime: '2h 32m',
  rated: 'PG-13',
  synopsis: '...',
  plot: '...',
  genres: ['Action', 'Crime', 'Drama'],
  imdb: {
    rating: 9.0,
    votes: '2.8M',
    metascore: 84,
    popularity: 45,
    awards: 'Won 2 Oscars...',
    ranked: '#3 on IMDb Top 250'
  },
  cast: [...],
  reviews: [...],
  streams: [...]
}
```

### Review Structure
```javascript
{
  id: 'review-1',
  author: 'MovieBuff2024',
  avatar: 'https://...',
  rating: 9.5,
  date: '2024-01-15',
  content: 'Amazing movie!',
  helpful: 234,
  verified: true
}
```

## Customization

### Changing Theme Colors
Edit `src/theme/colors.js`:

```javascript
export const colors = {
  background: '#0a120a',    // Main background
  surface: '#141d14',       // Card backgrounds
  primary: '#2d7a2d',       // Primary green
  accent: '#4caf50',        // Accent color
  // ... more colors
};
```

### Adding New Content
Edit `src/data/mockData.js` to add movies, TV shows, or channels.

## Troubleshooting

### Build Issues
1. Clear cache: `expo start -c`
2. Reset node_modules: `rm -rf node_modules && npm install`
3. Update Expo CLI: `npm install -g expo-cli`

### Video Playback Issues
- Check video URL format
- Verify network permissions in app.json
- Test with different video sources

### IPTV Not Working
- Verify M3U URL is accessible
- Check channel URL format
- Ensure proper encoding

## License

MIT License - Feel free to use and modify!

## Credits

Built with:
- React Native
- Expo
- React Navigation
- Expo AV
- Expo Screen Orientation
