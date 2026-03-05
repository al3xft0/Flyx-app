import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { colors, gradients, spacing, borderRadius, shadows } from '../theme/colors';
import { mockMovies, mockTVShows, continueWatching } from '../data/mockData';

const { width, height } = Dimensions.get('window');

// IMDB Rating Badge Component
const IMDBBadge = ({ rating, votes }) => (
  <View style={styles.imdbBadge}>
    <View style={styles.imdbLogo}>
      <Text style={styles.imdbLogoText}>IMDb</Text>
    </View>
    <View style={styles.imdbRatingContainer}>
      <Text style={styles.imdbRating}>{rating}</Text>
      <Text style={styles.imdbVotes}>{votes} votes</Text>
    </View>
  </View>
);

// Featured Hero Section
const FeaturedHero = ({ item, onPress }) => {
  if (!item) return null;
  
  return (
    <TouchableOpacity style={styles.heroContainer} onPress={onPress} activeOpacity={0.9}>
      <Image source={{ uri: item.backdrop }} style={styles.heroImage} />
      <LinearGradient
        colors={gradients.overlay}
        style={styles.heroGradient}
      />
      <View style={styles.heroContent}>
        <View style={styles.heroMeta}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.type === 'movie' ? 'MOVIE' : 'TV SERIES'}</Text>
          </View>
          <Text style={styles.heroYear}>{item.year}</Text>
          <Text style={styles.heroDot}>•</Text>
          <Text style={styles.heroRuntime}>{item.runtime}</Text>
          <Text style={styles.heroDot}>•</Text>
          <Text style={styles.heroRated}>{item.rated}</Text>
        </View>
        
        <Text style={styles.heroTitle}>{item.title}</Text>
        <Text style={styles.heroTagline}>{item.tagline}</Text>
        
        <View style={styles.heroGenres}>
          {item.genres.slice(0, 3).map((genre, index) => (
            <View key={index} style={styles.genreTag}>
              <Text style={styles.genreText}>{genre}</Text>
            </View>
          ))}
        </View>
        
        <IMDBBadge rating={item.imdb.rating} votes={item.imdb.votes} />
        
        <View style={styles.heroButtons}>
          <TouchableOpacity style={styles.playButton} onPress={onPress}>
            <Ionicons name="play" size={20} color={colors.textInverse} />
            <Text style={styles.playButtonText}>Watch Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoButton} onPress={onPress}>
            <Ionicons name="information-circle" size={20} color={colors.text} />
            <Text style={styles.infoButtonText}>More Info</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Content Card Component
const ContentCard = ({ item, onPress, showProgress, progress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
    <View style={styles.cardImageContainer}>
      <Image source={{ uri: item.poster }} style={styles.cardImage} />
      {showProgress && progress && (
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
      )}
      <View style={styles.cardOverlay}>
        <View style={styles.playIcon}>
          <Ionicons name="play" size={24} color={colors.text} />
        </View>
      </View>
      <View style={styles.ratingBadge}>
        <Ionicons name="star" size={10} color={colors.rating} />
        <Text style={styles.ratingText}>{item.imdb.rating}</Text>
      </View>
    </View>
    <View style={styles.cardInfo}>
      <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.cardMeta}>{item.year} • {item.genres[0]}</Text>
    </View>
  </TouchableOpacity>
);

// Horizontal List Component
const HorizontalList = ({ title, data, onItemPress, showProgress }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity>
        <Text style={styles.seeAll}>See All</Text>
      </TouchableOpacity>
    </View>
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ContentCard
          item={item}
          onPress={() => onItemPress(item)}
          showProgress={showProgress}
          progress={item.progress}
        />
      )}
      contentContainerStyle={styles.horizontalList}
    />
  </View>
);

export default function HomeScreen() {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const handleItemPress = (item) => {
    navigation.navigate('Detail', { item });
  };

  const featuredMovie = mockMovies[0];

  // Combine continue watching with full content data
  const continueWatchingData = continueWatching.map(cw => {
    const movie = mockMovies.find(m => m.id === cw.contentId);
    const tvShow = mockTVShows.find(t => t.id === cw.contentId);
    const content = movie || tvShow;
    return content ? { ...content, progress: cw.progress } : null;
  }).filter(Boolean);

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <FeaturedHero 
        item={featuredMovie} 
        onPress={() => handleItemPress(featuredMovie)} 
      />
      
      <View style={styles.content}>
        <HorizontalList
          title="Continue Watching"
          data={continueWatchingData}
          onItemPress={handleItemPress}
          showProgress
        />
        
        <HorizontalList
          title="Trending Movies"
          data={mockMovies.slice(0, 6)}
          onItemPress={handleItemPress}
        />
        
        <HorizontalList
          title="Popular TV Shows"
          data={mockTVShows.slice(0, 6)}
          onItemPress={handleItemPress}
        />
        
        <HorizontalList
          title="Top Rated"
          data={[...mockMovies.slice(3), ...mockTVShows.slice(3)]}
          onItemPress={handleItemPress}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // Hero Styles
  heroContainer: {
    width: width,
    height: height * 0.65,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  heroMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    marginRight: spacing.sm,
  },
  badgeText: {
    color: colors.textInverse,
    fontSize: 10,
    fontWeight: 'bold',
  },
  heroYear: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  heroDot: {
    color: colors.textMuted,
    marginHorizontal: spacing.sm,
  },
  heroRuntime: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  heroRated: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  heroTitle: {
    color: colors.text,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  heroTagline: {
    color: colors.textSecondary,
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: spacing.sm,
  },
  heroGenres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
  genreTag: {
    backgroundColor: colors.surfaceHighlight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    marginRight: spacing.sm,
    marginBottom: spacing.xs,
  },
  genreText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  
  // IMDB Badge
  imdbBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    alignSelf: 'flex-start',
    marginBottom: spacing.md,
  },
  imdbLogo: {
    backgroundColor: colors.rating,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    marginRight: spacing.sm,
  },
  imdbLogoText: {
    color: colors.textInverse,
    fontSize: 10,
    fontWeight: 'bold',
  },
  imdbRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imdbRating: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: spacing.sm,
  },
  imdbVotes: {
    color: colors.textMuted,
    fontSize: 12,
  },
  
  // Hero Buttons
  heroButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
  },
  playButtonText: {
    color: colors.textInverse,
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
  },
  infoButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Content Section
  content: {
    paddingTop: spacing.lg,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAll: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '600',
  },
  horizontalList: {
    paddingHorizontal: spacing.lg,
  },
  
  // Card Styles
  card: {
    width: 140,
    marginRight: spacing.md,
  },
  cardImageContainer: {
    width: 140,
    height: 210,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  progressContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: colors.ratingEmpty,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.accent,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlayLight,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
  },
  playIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    gap: 2,
  },
  ratingText: {
    color: colors.text,
    fontSize: 11,
    fontWeight: 'bold',
  },
  cardInfo: {
    marginTop: spacing.sm,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  cardMeta: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
});
