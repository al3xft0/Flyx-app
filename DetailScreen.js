import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import { colors, gradients, spacing, borderRadius } from '../theme/colors';
import { mockMovies, mockTVShows } from '../data/mockData';

const { width, height } = Dimensions.get('window');

// IMDB Full Info Component
const IMDBFullInfo = ({ imdb, ranked }) => (
  <View style={styles.imdbFullContainer}>
    <View style={styles.imdbHeader}>
      <View style={styles.imdbLogoLarge}>
        <Text style={styles.imdbLogoLargeText}>IMDb</Text>
      </View>
      <View style={styles.imdbMainRating}>
        <Text style={styles.imdbMainRatingValue}>{imdb.rating}</Text>
        <Text style={styles.imdbMainRatingMax}>/10</Text>
      </View>
    </View>
    
    <View style={styles.imdbStats}>
      <View style={styles.imdbStat}>
        <Ionicons name="people" size={16} color={colors.textMuted} />
        <Text style={styles.imdbStatValue}>{imdb.votes}</Text>
        <Text style={styles.imdbStatLabel}>votes</Text>
      </View>
      
      <View style={styles.imdbStatDivider} />
      
      <View style={styles.imdbStat}>
        <Ionicons name="trending-up" size={16} color={colors.textMuted} />
        <Text style={styles.imdbStatValue}>{imdb.metascore}</Text>
        <Text style={styles.imdbStatLabel}>Metascore</Text>
      </View>
      
      <View style={styles.imdbStatDivider} />
      
      <View style={styles.imdbStat}>
        <Ionicons name="flame" size={16} color={colors.textMuted} />
        <Text style={styles.imdbStatValue}>#{imdb.popularity}</Text>
        <Text style={styles.imdbStatLabel}>Popular</Text>
      </View>
    </View>
    
    {ranked && (
      <View style={styles.imdbRanked}>
        <Ionicons name="trophy" size={16} color={colors.rating} />
        <Text style={styles.imdbRankedText}>{ranked}</Text>
      </View>
    )}
    
    {imdb.awards && (
      <View style={styles.imdbAwards}>
        <Ionicons name="ribbon" size={16} color={colors.accent} />
        <Text style={styles.imdbAwardsText}>{imdb.awards}</Text>
      </View>
    )}
  </View>
);

// Cast Member Card
const CastCard = ({ member }) => (
  <View style={styles.castCard}>
    <Image source={{ uri: member.avatar }} style={styles.castAvatar} />
    <Text style={styles.castName} numberOfLines={1}>{member.name}</Text>
    <Text style={styles.castCharacter} numberOfLines={1}>{member.character || member.role}</Text>
  </View>
);

// Review Card Component
const ReviewCard = ({ review }) => (
  <View style={styles.reviewCard}>
    <View style={styles.reviewHeader}>
      <Image source={{ uri: review.avatar }} style={styles.reviewAvatar} />
      <View style={styles.reviewMeta}>
        <View style={styles.reviewAuthorRow}>
          <Text style={styles.reviewAuthor}>{review.author}</Text>
          {review.verified && (
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={14} color={colors.accent} />
            </View>
          )}
        </View>
        <View style={styles.reviewRatingRow}>
          <Ionicons name="star" size={12} color={colors.rating} />
          <Text style={styles.reviewRating}>{review.rating.toFixed(1)}</Text>
          <Text style={styles.reviewDate}>• {new Date(review.date).toLocaleDateString()}</Text>
        </View>
      </View>
    </View>
    <Text style={styles.reviewContent} numberOfLines={4}>{review.content}</Text>
    <View style={styles.reviewFooter}>
      <TouchableOpacity style={styles.helpfulButton}>
        <Ionicons name="thumbs-up-outline" size={14} color={colors.textMuted} />
        <Text style={styles.helpfulText}>Helpful ({review.helpful})</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// Stream Source Card
const StreamCard = ({ stream, onPress }) => (
  <TouchableOpacity style={styles.streamCard} onPress={onPress}>
    <View style={styles.streamHeader}>
      <View style={styles.streamQuality}>
        <Text style={styles.streamQualityText}>{stream.quality}</Text>
      </View>
      <View style={styles.streamType}>
        <Text style={styles.streamTypeText}>{stream.type.toUpperCase()}</Text>
      </View>
    </View>
    
    <Text style={styles.streamName}>{stream.name}</Text>
    
    <View style={styles.streamDetails}>
      <View style={styles.streamDetail}>
        <Ionicons name="disc-outline" size={14} color={colors.textMuted} />
        <Text style={styles.streamDetailText}>{stream.size}</Text>
      </View>
      
      {stream.seeds !== undefined && (
        <View style={styles.streamDetail}>
          <Ionicons name="arrow-up-circle" size={14} color={colors.success} />
          <Text style={[styles.streamDetailText, { color: colors.success }]}>{stream.seeds}</Text>
        </View>
      )}
      
      {stream.peers !== undefined && (
        <View style={styles.streamDetail}>
          <Ionicons name="arrow-down-circle" size={14} color={colors.info} />
          <Text style={[styles.streamDetailText, { color: colors.info }]}>{stream.peers}</Text>
        </View>
      )}
    </View>
    
    <View style={styles.streamLanguages}>
      <Ionicons name="language" size={12} color={colors.textMuted} />
      <Text style={styles.streamLanguageText}>{stream.language}</Text>
      {stream.subtitles.length > 0 && (
        <>
          <Text style={styles.streamLanguageDivider}>•</Text>
          <Ionicons name="text" size={12} color={colors.textMuted} />
          <Text style={styles.streamLanguageText}>{stream.subtitles.length} subs</Text>
        </>
      )}
    </View>
  </TouchableOpacity>
);

// Episode Card (for TV shows)
const EpisodeCard = ({ episode }) => (
  <View style={styles.episodeCard}>
    <Image source={{ uri: episode.stillImage }} style={styles.episodeImage} />
    <View style={styles.episodeOverlay}>
      <View style={styles.episodePlay}>
        <Ionicons name="play" size={20} color={colors.text} />
      </View>
    </View>
    <View style={styles.episodeInfo}>
      <Text style={styles.episodeNumber}>E{episode.number}</Text>
      <Text style={styles.episodeTitle} numberOfLines={1}>{episode.title}</Text>
      <View style={styles.episodeMeta}>
        <Text style={styles.episodeRuntime}>{episode.runtime}</Text>
        <View style={styles.episodeRating}>
          <Ionicons name="star" size={10} color={colors.rating} />
          <Text style={styles.episodeRatingText}>{episode.rating}</Text>
        </View>
      </View>
    </View>
  </View>
);

export default function DetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;
  const [activeTab, setActiveTab] = useState('overview');
  const scrollY = useRef(new Animated.Value(0)).current;
  
  const isMovie = item.type === 'movie';
  
  // Get full data
  const fullData = isMovie 
    ? mockMovies.find(m => m.id === item.id)
    : mockTVShows.find(t => t.id === item.id);
    
  if (!fullData) return null;

  const handlePlay = () => {
    navigation.navigate('Player', { item: fullData });
  };

  const handleStreamPress = (stream) => {
    navigation.navigate('Player', { item: fullData, stream });
  };

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {/* Animated Header */}
      <Animated.View style={[styles.animatedHeader, { opacity: headerOpacity }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{fullData.title}</Text>
        <View style={{ width: 40 }} />
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Backdrop */}
        <View style={styles.backdropContainer}>
          <Image source={{ uri: fullData.backdrop }} style={styles.backdrop} />
          <LinearGradient colors={gradients.overlay} style={styles.backdropGradient} />
          
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="close" size={28} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <View style={styles.posterContainer}>
              <Image source={{ uri: fullData.poster }} style={styles.poster} />
            </View>
            
            <View style={styles.titleInfo}>
              <Text style={styles.title}>{fullData.title}</Text>
              {fullData.originalTitle !== fullData.title && (
                <Text style={styles.originalTitle}>{fullData.originalTitle}</Text>
              )}
              <Text style={styles.tagline}>{fullData.tagline}</Text>
              
              <View style={styles.metaRow}>
                <Text style={styles.metaText}>{fullData.year}</Text>
                <Text style={styles.metaDot}>•</Text>
                <Text style={styles.metaText}>{fullData.runtime}</Text>
                <Text style={styles.metaDot}>•</Text>
                <View style={styles.ratedBadge}>
                  <Text style={styles.ratedText}>{fullData.rated}</Text>
                </View>
              </View>
              
              <View style={styles.genresRow}>
                {fullData.genres.map((genre, i) => (
                  <View key={i} style={styles.genreBadge}>
                    <Text style={styles.genreBadgeText}>{genre}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.playButton} onPress={handlePlay}>
              <Ionicons name="play" size={20} color={colors.textInverse} />
              <Text style={styles.playButtonText}>Watch Now</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryButton}>
              <Ionicons name="add" size={20} color={colors.text} />
              <Text style={styles.secondaryButtonText}>Watchlist</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryButton}>
              <Ionicons name="share-outline" size={20} color={colors.text} />
              <Text style={styles.secondaryButtonText}>Share</Text>
            </TouchableOpacity>
          </View>

          {/* IMDB Section */}
          <IMDBFullInfo imdb={fullData.imdb} ranked={fullData.imdb.ranked} />

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            {['overview', 'streams', 'cast', 'reviews'].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, activeTab === tab && styles.tabActive]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <View style={styles.tabContent}>
              {/* Synopsis */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Synopsis</Text>
                <Text style={styles.synopsis}>{fullData.synopsis}</Text>
              </View>

              {/* Plot */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Plot</Text>
                <Text style={styles.plot}>{fullData.plot}</Text>
              </View>

              {/* Technical Info */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Details</Text>
                <View style={styles.detailsGrid}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Released</Text>
                    <Text style={styles.detailValue}>{fullData.released}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Languages</Text>
                    <Text style={styles.detailValue}>{fullData.languages.join(', ')}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Countries</Text>
                    <Text style={styles.detailValue}>{fullData.countries.join(', ')}</Text>
                  </View>
                  {fullData.budget && (
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Budget</Text>
                      <Text style={styles.detailValue}>{fullData.budget}</Text>
                    </View>
                  )}
                  {fullData.boxOffice && (
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Box Office</Text>
                      <Text style={styles.detailValue}>{fullData.boxOffice}</Text>
                    </View>
                  )}
                  {fullData.production && (
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Production</Text>
                      <Text style={styles.detailValue}>{fullData.production}</Text>
                    </View>
                  )}
                  {!isMovie && fullData.network && (
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Network</Text>
                      <Text style={styles.detailValue}>{fullData.network}</Text>
                    </View>
                  )}
                </View>
              </View>

              {/* Keywords */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Keywords</Text>
                <View style={styles.keywordsRow}>
                  {fullData.keywords.slice(0, 8).map((keyword, i) => (
                    <View key={i} style={styles.keywordBadge}>
                      <Text style={styles.keywordText}>{keyword}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}

          {activeTab === 'streams' && (
            <View style={styles.tabContent}>
              <Text style={styles.sectionTitle}>Available Streams</Text>
              <Text style={styles.streamsSubtitle}>{fullData.streams.length} sources found</Text>
              {fullData.streams.map((stream) => (
                <StreamCard 
                  key={stream.id} 
                  stream={stream} 
                  onPress={() => handleStreamPress(stream)}
                />
              ))}
            </View>
          )}

          {activeTab === 'cast' && (
            <View style={styles.tabContent}>
              <Text style={styles.sectionTitle}>Cast & Crew</Text>
              <FlatList
                data={fullData.cast}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <CastCard member={item} />}
                contentContainerStyle={styles.castList}
              />
              
              {!isMovie && fullData.creators && (
                <View style={styles.creatorsSection}>
                  <Text style={styles.subsectionTitle}>Created By</Text>
                  <View style={styles.creatorsRow}>
                    {fullData.creators.map((creator, i) => (
                      <View key={i} style={styles.creatorBadge}>
                        <Text style={styles.creatorText}>{creator}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
              
              {isMovie && fullData.directors && (
                <View style={styles.creatorsSection}>
                  <Text style={styles.subsectionTitle}>Directed By</Text>
                  <View style={styles.creatorsRow}>
                    {fullData.directors.map((director, i) => (
                      <View key={i} style={styles.creatorBadge}>
                        <Text style={styles.creatorText}>{director}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          )}

          {activeTab === 'reviews' && (
            <View style={styles.tabContent}>
              <View style={styles.reviewsHeader}>
                <Text style={styles.sectionTitle}>User Reviews</Text>
                <Text style={styles.reviewsCount}>{fullData.reviewCount} reviews</Text>
              </View>
              <View style={styles.reviewsRating}>
                <Ionicons name="star" size={24} color={colors.rating} />
                <Text style={styles.reviewsRatingValue}>{fullData.imdb.rating}</Text>
                <Text style={styles.reviewsRatingMax}>/10</Text>
              </View>
              {fullData.reviews.slice(0, 5).map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
              <TouchableOpacity style={styles.viewAllReviews}>
                <Text style={styles.viewAllReviewsText}>View All Reviews</Text>
                <Ionicons name="chevron-forward" size={16} color={colors.accent} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    zIndex: 100,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  backdropContainer: {
    width: width,
    height: height * 0.35,
    position: 'relative',
  },
  backdrop: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backdropGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  
  // Title Section
  titleSection: {
    flexDirection: 'row',
    marginTop: -80,
    marginBottom: spacing.lg,
  },
  posterContainer: {
    width: 120,
    height: 180,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.large,
  },
  poster: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  titleInfo: {
    flex: 1,
    marginLeft: spacing.md,
    paddingTop: 80,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
  originalTitle: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 2,
  },
  tagline: {
    color: colors.textSecondary,
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: spacing.xs,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  metaText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  metaDot: {
    color: colors.textMuted,
    marginHorizontal: spacing.sm,
  },
  ratedBadge: {
    borderWidth: 1,
    borderColor: colors.textMuted,
    borderRadius: borderRadius.sm,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  ratedText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  genresRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
  genreBadge: {
    backgroundColor: colors.surfaceHighlight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  genreBadgeText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  
  // Action Buttons
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  playButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
  },
  playButtonText: {
    color: colors.textInverse,
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceElevated,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.xs,
  },
  secondaryButtonText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  
  // IMDB Section
  imdbFullContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  imdbHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  imdbLogoLarge: {
    backgroundColor: colors.rating,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  imdbLogoLargeText: {
    color: colors.textInverse,
    fontSize: 14,
    fontWeight: 'bold',
  },
  imdbMainRating: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: spacing.md,
  },
  imdbMainRatingValue: {
    color: colors.text,
    fontSize: 32,
    fontWeight: 'bold',
  },
  imdbMainRatingMax: {
    color: colors.textMuted,
    fontSize: 18,
    marginBottom: 4,
  },
  imdbStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  imdbStat: {
    alignItems: 'center',
    gap: 4,
  },
  imdbStatValue: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  imdbStatLabel: {
    color: colors.textMuted,
    fontSize: 12,
  },
  imdbStatDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.border,
  },
  imdbRanked: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
    padding: spacing.sm,
    backgroundColor: colors.surfaceHighlight,
    borderRadius: borderRadius.md,
  },
  imdbRankedText: {
    color: colors.rating,
    fontSize: 14,
    fontWeight: '600',
  },
  imdbAwards: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
    padding: spacing.sm,
    backgroundColor: colors.surfaceHighlight,
    borderRadius: borderRadius.md,
  },
  imdbAwardsText: {
    color: colors.accent,
    fontSize: 13,
  },
  
  // Tabs
  tabsContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  tab: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface,
  },
  tabActive: {
    backgroundColor: colors.accent,
  },
  tabText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: colors.textInverse,
  },
  tabContent: {
    paddingBottom: spacing.xxl,
  },
  
  // Sections
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  synopsis: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
  plot: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  
  // Details Grid
  detailsGrid: {
    gap: spacing.md,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    color: colors.textMuted,
    fontSize: 14,
  },
  detailValue: {
    color: colors.textSecondary,
    fontSize: 14,
    flex: 1,
    textAlign: 'right',
  },
  
  // Keywords
  keywordsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  keywordBadge: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  keywordText: {
    color: colors.textMuted,
    fontSize: 12,
  },
  
  // Streams
  streamsSubtitle: {
    color: colors.textMuted,
    fontSize: 14,
    marginBottom: spacing.md,
  },
  streamCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  streamHeader: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  streamQuality: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  streamQualityText: {
    color: colors.textInverse,
    fontSize: 12,
    fontWeight: 'bold',
  },
  streamType: {
    backgroundColor: colors.surfaceHighlight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  streamTypeText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  streamName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  streamDetails: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  streamDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  streamDetailText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  streamLanguages: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  streamLanguageText: {
    color: colors.textMuted,
    fontSize: 12,
  },
  streamLanguageDivider: {
    color: colors.textMuted,
    marginHorizontal: 2,
  },
  
  // Cast
  castList: {
    paddingVertical: spacing.sm,
  },
  castCard: {
    width: 80,
    marginRight: spacing.md,
    alignItems: 'center',
  },
  castAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: spacing.sm,
  },
  castName: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  castCharacter: {
    color: colors.textMuted,
    fontSize: 11,
    textAlign: 'center',
  },
  creatorsSection: {
    marginTop: spacing.lg,
  },
  subsectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  creatorsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  creatorBadge: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  creatorText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  
  // Reviews
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  reviewsCount: {
    color: colors.textMuted,
    fontSize: 14,
  },
  reviewsRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  reviewsRatingValue: {
    color: colors.text,
    fontSize: 28,
    fontWeight: 'bold',
  },
  reviewsRatingMax: {
    color: colors.textMuted,
    fontSize: 18,
  },
  reviewCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.sm,
  },
  reviewMeta: {
    flex: 1,
  },
  reviewAuthorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reviewAuthor: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  verifiedBadge: {
    marginLeft: 2,
  },
  reviewRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  reviewRating: {
    color: colors.rating,
    fontSize: 13,
    fontWeight: '600',
  },
  reviewDate: {
    color: colors.textMuted,
    fontSize: 12,
  },
  reviewContent: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  reviewFooter: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  helpfulText: {
    color: colors.textMuted,
    fontSize: 12,
  },
  viewAllReviews: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: spacing.md,
  },
  viewAllReviewsText: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '600',
  },
  
  // Episodes (for TV)
  episodeCard: {
    width: 200,
    marginRight: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  episodeImage: {
    width: '100%',
    height: 110,
    resizeMode: 'cover',
  },
  episodeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlayLight,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    height: 110,
  },
  episodePlay: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  episodeInfo: {
    padding: spacing.sm,
  },
  episodeNumber: {
    color: colors.textMuted,
    fontSize: 11,
  },
  episodeTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  episodeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: 4,
  },
  episodeRuntime: {
    color: colors.textMuted,
    fontSize: 11,
  },
  episodeRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  episodeRatingText: {
    color: colors.rating,
    fontSize: 11,
    fontWeight: '600',
  },
});
