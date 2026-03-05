import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { colors, spacing, borderRadius } from '../theme/colors';
import { mockMovies, mockTVShows } from '../data/mockData';

const { width } = Dimensions.get('window');

const SearchResultCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.resultCard} onPress={onPress}>
    <Image source={{ uri: item.poster }} style={styles.resultImage} />
    <View style={styles.resultInfo}>
      <View style={styles.resultHeader}>
        <Text style={styles.resultTitle} numberOfLines={1}>{item.title}</Text>
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>{item.type === 'movie' ? 'MOVIE' : 'TV'}</Text>
        </View>
      </View>
      <View style={styles.resultMeta}>
        <Text style={styles.resultYear}>{item.year}</Text>
        <Text style={styles.resultDot}>•</Text>
        <Text style={styles.resultGenre}>{item.genres[0]}</Text>
      </View>
      <View style={styles.resultRating}>
        <Ionicons name="star" size={12} color={colors.rating} />
        <Text style={styles.resultRatingText}>{item.imdb.rating}</Text>
        <Text style={styles.resultVotes}>({item.imdb.votes})</Text>
      </View>
      <Text style={styles.resultSynopsis} numberOfLines={2}>{item.synopsis}</Text>
    </View>
  </TouchableOpacity>
);

const GenreChip = ({ genre, onPress, isSelected }) => (
  <TouchableOpacity 
    style={[styles.genreChip, isSelected && styles.genreChipSelected]} 
    onPress={onPress}
  >
    <Text style={[styles.genreChipText, isSelected && styles.genreChipTextSelected]}>
      {genre}
    </Text>
  </TouchableOpacity>
);

export default function SearchScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  const allContent = [...mockMovies, ...mockTVShows];
  
  const genres = ['Action', 'Drama', 'Sci-Fi', 'Crime', 'Thriller', 'Adventure', 'Fantasy'];

  const filteredContent = allContent.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.synopsis.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGenre = !selectedGenre || item.genres.includes(selectedGenre);
    
    const matchesType = activeTab === 'all' || item.type === activeTab;
    
    return matchesSearch && matchesGenre && matchesType;
  });

  const handleItemPress = (item) => {
    navigation.navigate('Detail', { item });
  };

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchHeader}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search movies, TV shows..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Type Tabs */}
      <View style={styles.typeTabs}>
        {[
          { key: 'all', label: 'All' },
          { key: 'movie', label: 'Movies' },
          { key: 'tv', label: 'TV Shows' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.typeTab, activeTab === tab.key && styles.typeTabActive]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={[styles.typeTabText, activeTab === tab.key && styles.typeTabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Genre Chips */}
      {!searchQuery && (
        <View style={styles.genresContainer}>
          <Text style={styles.sectionTitle}>Popular Genres</Text>
          <FlatList
            data={genres}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <GenreChip
                genre={item}
                isSelected={selectedGenre === item}
                onPress={() => setSelectedGenre(selectedGenre === item ? null : item)}
              />
            )}
            contentContainerStyle={styles.genresList}
          />
        </View>
      )}

      {/* Results */}
      <FlatList
        data={filteredContent}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SearchResultCard item={item} onPress={() => handleItemPress(item)} />
        )}
        contentContainerStyle={styles.resultsList}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={64} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>No results found</Text>
            <Text style={styles.emptySubtitle}>Try different keywords or genres</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchHeader: {
    padding: spacing.lg,
    paddingTop: 50,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
  },
  typeTabs: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  typeTab: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface,
  },
  typeTabActive: {
    backgroundColor: colors.accent,
  },
  typeTabText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  typeTabTextActive: {
    color: colors.textInverse,
  },
  genresContainer: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  genresList: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  genreChip: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  genreChipSelected: {
    backgroundColor: colors.accent,
  },
  genreChipText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  genreChipTextSelected: {
    color: colors.textInverse,
  },
  resultsList: {
    padding: spacing.lg,
  },
  resultCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  resultImage: {
    width: 100,
    height: 150,
    resizeMode: 'cover',
  },
  resultInfo: {
    flex: 1,
    padding: spacing.md,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  resultTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: spacing.sm,
  },
  typeBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  typeText: {
    color: colors.textInverse,
    fontSize: 10,
    fontWeight: 'bold',
  },
  resultMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  resultYear: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  resultDot: {
    color: colors.textMuted,
    marginHorizontal: spacing.sm,
  },
  resultGenre: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  resultRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: spacing.xs,
  },
  resultRatingText: {
    color: colors.rating,
    fontSize: 13,
    fontWeight: '600',
  },
  resultVotes: {
    color: colors.textMuted,
    fontSize: 12,
  },
  resultSynopsis: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  emptyState: {
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
