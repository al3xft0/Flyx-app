import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { colors, spacing, borderRadius } from '../theme/colors';
import { mockMovies, mockTVShows, watchlist, continueWatching } from '../data/mockData';

const LibraryItem = ({ item, onPress, showProgress, progress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <View style={styles.itemImageContainer}>
      <Image source={{ uri: item.poster }} style={styles.itemImage} />
      {showProgress && progress && (
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
      )}
      <View style={styles.playOverlay}>
        <Ionicons name="play" size={24} color={colors.text} />
      </View>
    </View>
    <View style={styles.itemInfo}>
      <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
      <View style={styles.itemMeta}>
        <Text style={styles.itemYear}>{item.year}</Text>
        <Text style={styles.itemDot}>•</Text>
        <Ionicons name="star" size={12} color={colors.rating} />
        <Text style={styles.itemRating}>{item.imdb.rating}</Text>
      </View>
      {showProgress && (
        <Text style={styles.progressText}>{Math.round(progress)}% watched</Text>
      )}
    </View>
    <TouchableOpacity style={styles.moreButton}>
      <Ionicons name="ellipsis-vertical" size={20} color={colors.textMuted} />
    </TouchableOpacity>
  </TouchableOpacity>
);

export default function LibraryScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('watchlist');

  // Get full content data for watchlist
  const watchlistData = watchlist.map(wl => {
    const movie = mockMovies.find(m => m.id === wl.contentId);
    const tvShow = mockTVShows.find(t => t.id === wl.contentId);
    return movie || tvShow;
  }).filter(Boolean);

  // Get full content data for continue watching
  const continueData = continueWatching.map(cw => {
    const movie = mockMovies.find(m => m.id === cw.contentId);
    const tvShow = mockTVShows.find(t => t.id === cw.contentId);
    return movie ? { ...movie, progress: cw.progress } : tvShow ? { ...tvShow, progress: cw.progress } : null;
  }).filter(Boolean);

  const handleItemPress = (item) => {
    navigation.navigate('Detail', { item });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Library</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'watchlist' && styles.tabActive]}
          onPress={() => setActiveTab('watchlist')}
        >
          <Ionicons 
            name="bookmark" 
            size={18} 
            color={activeTab === 'watchlist' ? colors.accent : colors.textMuted} 
          />
          <Text style={[styles.tabText, activeTab === 'watchlist' && styles.tabTextActive]}>
            Watchlist
          </Text>
          <View style={styles.tabBadge}>
            <Text style={styles.tabBadgeText}>{watchlistData.length}</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'continue' && styles.tabActive]}
          onPress={() => setActiveTab('continue')}
        >
          <Ionicons 
            name="time" 
            size={18} 
            color={activeTab === 'continue' ? colors.accent : colors.textMuted} 
          />
          <Text style={[styles.tabText, activeTab === 'continue' && styles.tabTextActive]}>
            Continue
          </Text>
          <View style={styles.tabBadge}>
            <Text style={styles.tabBadgeText}>{continueData.length}</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'history' && styles.tabActive]}
          onPress={() => setActiveTab('history')}
        >
          <Ionicons 
            name="checkmark-done" 
            size={18} 
            color={activeTab === 'history' ? colors.accent : colors.textMuted} 
          />
          <Text style={[styles.tabText, activeTab === 'history' && styles.tabTextActive]}>
            History
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === 'watchlist' && (
        <FlatList
          data={watchlistData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <LibraryItem item={item} onPress={() => handleItemPress(item)} />
          )}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="bookmark-outline" size={64} color={colors.textMuted} />
              <Text style={styles.emptyTitle}>Your watchlist is empty</Text>
              <Text style={styles.emptySubtitle}>Save movies and shows to watch later</Text>
            </View>
          }
        />
      )}

      {activeTab === 'continue' && (
        <FlatList
          data={continueData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <LibraryItem 
              item={item} 
              onPress={() => handleItemPress(item)}
              showProgress
              progress={item.progress}
            />
          )}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="play-circle-outline" size={64} color={colors.textMuted} />
              <Text style={styles.emptyTitle}>No recent activity</Text>
              <Text style={styles.emptySubtitle}>Start watching to see content here</Text>
            </View>
          }
        />
      )}

      {activeTab === 'history' && (
        <View style={styles.emptyState}>
          <Ionicons name="time-outline" size={64} color={colors.textMuted} />
          <Text style={styles.emptyTitle}>Watch history</Text>
          <Text style={styles.emptySubtitle}>Your completed watches will appear here</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    paddingTop: 50,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 28,
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    gap: spacing.xs,
  },
  tabActive: {
    backgroundColor: colors.primaryDark,
  },
  tabText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: colors.accent,
  },
  tabBadge: {
    backgroundColor: colors.surfaceHighlight,
    borderRadius: borderRadius.round,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 4,
  },
  tabBadgeText: {
    color: colors.text,
    fontSize: 11,
    fontWeight: 'bold',
  },
  list: {
    padding: spacing.lg,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  itemImageContainer: {
    width: 80,
    height: 120,
    position: 'relative',
  },
  itemImage: {
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
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlayLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
    padding: spacing.md,
  },
  itemTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  itemYear: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  itemDot: {
    color: colors.textMuted,
  },
  itemRating: {
    color: colors.rating,
    fontSize: 13,
    fontWeight: '600',
  },
  progressText: {
    color: colors.accent,
    fontSize: 12,
    marginTop: spacing.xs,
  },
  moreButton: {
    padding: spacing.md,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
    marginTop: spacing.md,
  },
  emptySubtitle: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: spacing.xs,
  },
});
