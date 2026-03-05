import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { colors, spacing, borderRadius } from '../theme/colors';
import { mockIPTVChannels } from '../data/mockData';

const ChannelCard = ({ channel, onPress }) => (
  <TouchableOpacity style={styles.channelCard} onPress={onPress}>
    <View style={styles.channelLogoContainer}>
      {channel.tvgLogo ? (
        <Image source={{ uri: channel.tvgLogo }} style={styles.channelLogo} />
      ) : (
        <View style={styles.channelLogoPlaceholder}>
          <Ionicons name="tv" size={32} color={colors.textMuted} />
        </View>
      )}
    </View>
    <Text style={styles.channelName} numberOfLines={1}>{channel.name}</Text>
    <Text style={styles.channelGroup}>{channel.group}</Text>
  </TouchableOpacity>
);

const PlaylistCard = ({ playlist, onEdit, onDelete, onToggle }) => (
  <View style={styles.playlistCard}>
    <View style={styles.playlistHeader}>
      <View style={[styles.playlistIcon, playlist.isActive && styles.playlistIconActive]}>
        <Ionicons name="list" size={24} color={playlist.isActive ? colors.accent : colors.textMuted} />
      </View>
      <View style={styles.playlistInfo}>
        <Text style={styles.playlistName}>{playlist.name}</Text>
        <Text style={styles.playlistMeta}>
          {playlist.type.toUpperCase()} • {playlist.channels?.length || 0} channels
        </Text>
      </View>
      <TouchableOpacity onPress={onToggle} style={styles.playlistToggle}>
        <Ionicons 
          name={playlist.isActive ? "radio-button-on" : "radio-button-off"} 
          size={24} 
          color={playlist.isActive ? colors.accent : colors.textMuted} 
        />
      </TouchableOpacity>
    </View>
    <View style={styles.playlistActions}>
      <TouchableOpacity style={styles.playlistAction} onPress={onEdit}>
        <Ionicons name="create-outline" size={18} color={colors.textSecondary} />
        <Text style={styles.playlistActionText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.playlistAction} onPress={onDelete}>
        <Ionicons name="trash-outline" size={18} color={colors.error} />
        <Text style={[styles.playlistActionText, { color: colors.error }]}>Delete</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function IPTVScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('channels');
  const [playlists, setPlaylists] = useState([
    { id: '1', name: 'My M3U Playlist', type: 'm3u', url: 'http://example.com/playlist.m3u', channels: mockIPTVChannels, isActive: true },
    { id: '2', name: 'Xtreme Codes', type: 'xtreme', serverUrl: 'http://example.com:8080', username: 'user', password: 'pass', channels: [], isActive: false },
  ]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newPlaylistType, setNewPlaylistType] = useState('m3u');
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistUrl, setNewPlaylistUrl] = useState('');
  const [newServerUrl, setNewServerUrl] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const allChannels = playlists.flatMap(p => p.channels || []);
  const activeChannels = playlists.filter(p => p.isActive).flatMap(p => p.channels || []);

  const handleChannelPress = (channel) => {
    navigation.navigate('IPTVPlayer', { channel });
  };

  const handleAddPlaylist = () => {
    if (!newPlaylistName) {
      Alert.alert('Error', 'Please enter a playlist name');
      return;
    }

    const newPlaylist = {
      id: Date.now().toString(),
      name: newPlaylistName,
      type: newPlaylistType,
      url: newPlaylistType === 'm3u' ? newPlaylistUrl : undefined,
      serverUrl: newPlaylistType === 'xtreme' ? newServerUrl : undefined,
      username: newPlaylistType === 'xtreme' ? newUsername : undefined,
      password: newPlaylistType === 'xtreme' ? newPassword : undefined,
      channels: [],
      isActive: true,
    };

    setPlaylists([...playlists, newPlaylist]);
    setAddModalVisible(false);
    resetForm();
  };

  const resetForm = () => {
    setNewPlaylistName('');
    setNewPlaylistUrl('');
    setNewServerUrl('');
    setNewUsername('');
    setNewPassword('');
  };

  const handleDeletePlaylist = (id) => {
    Alert.alert(
      'Delete Playlist',
      'Are you sure you want to delete this playlist?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => setPlaylists(playlists.filter(p => p.id !== id))
        },
      ]
    );
  };

  const handleTogglePlaylist = (id) => {
    setPlaylists(playlists.map(p => 
      p.id === id ? { ...p, isActive: !p.isActive } : p
    ));
  };

  // Group channels by category
  const groupedChannels = activeChannels.reduce((acc, channel) => {
    if (!acc[channel.group]) acc[channel.group] = [];
    acc[channel.group].push(channel);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>IPTV</Text>
        <View style={styles.headerStats}>
          <Text style={styles.headerStat}>{playlists.filter(p => p.isActive).length} Active</Text>
          <Text style={styles.headerStatDot}>•</Text>
          <Text style={styles.headerStat}>{activeChannels.length} Channels</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'channels' && styles.tabActive]}
          onPress={() => setActiveTab('channels')}
        >
          <Text style={[styles.tabText, activeTab === 'channels' && styles.tabTextActive]}>Channels</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'playlists' && styles.tabActive]}
          onPress={() => setActiveTab('playlists')}
        >
          <Text style={[styles.tabText, activeTab === 'playlists' && styles.tabTextActive]}>Playlists</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === 'channels' ? (
        <FlatList
          data={Object.entries(groupedChannels)}
          keyExtractor={([group]) => group}
          renderItem={({ item: [group, channels] }) => (
            <View style={styles.groupSection}>
              <Text style={styles.groupTitle}>{group}</Text>
              <FlatList
                data={channels}
                numColumns={3}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <ChannelCard channel={item} onPress={() => handleChannelPress(item)} />
                )}
                scrollEnabled={false}
              />
            </View>
          )}
          contentContainerStyle={styles.channelsList}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="tv-outline" size={64} color={colors.textMuted} />
              <Text style={styles.emptyTitle}>No channels</Text>
              <Text style={styles.emptySubtitle}>Add a playlist to get started</Text>
            </View>
          }
        />
      ) : (
        <FlatList
          data={playlists}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PlaylistCard
              playlist={item}
              onEdit={() => {}}
              onDelete={() => handleDeletePlaylist(item.id)}
              onToggle={() => handleTogglePlaylist(item.id)}
            />
          )}
          contentContainerStyle={styles.playlistsList}
        />
      )}

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => setAddModalVisible(true)}>
        <Ionicons name="add" size={28} color={colors.textInverse} />
      </TouchableOpacity>

      {/* Add Playlist Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addModalVisible}
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Playlist</Text>
              <TouchableOpacity onPress={() => setAddModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalTabs}>
              <TouchableOpacity 
                style={[styles.modalTab, newPlaylistType === 'm3u' && styles.modalTabActive]}
                onPress={() => setNewPlaylistType('m3u')}
              >
                <Text style={[styles.modalTabText, newPlaylistType === 'm3u' && styles.modalTabTextActive]}>M3U URL</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalTab, newPlaylistType === 'xtreme' && styles.modalTabActive]}
                onPress={() => setNewPlaylistType('xtreme')}
              >
                <Text style={[styles.modalTabText, newPlaylistType === 'xtreme' && styles.modalTabTextActive]}>Xtreme Codes</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Playlist Name"
              placeholderTextColor={colors.textMuted}
              value={newPlaylistName}
              onChangeText={setNewPlaylistName}
            />

            {newPlaylistType === 'm3u' ? (
              <TextInput
                style={styles.input}
                placeholder="M3U URL"
                placeholderTextColor={colors.textMuted}
                value={newPlaylistUrl}
                onChangeText={setNewPlaylistUrl}
                autoCapitalize="none"
              />
            ) : (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Server URL (e.g., http://example.com:8080)"
                  placeholderTextColor={colors.textMuted}
                  value={newServerUrl}
                  onChangeText={setNewServerUrl}
                  autoCapitalize="none"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor={colors.textMuted}
                  value={newUsername}
                  onChangeText={setNewUsername}
                  autoCapitalize="none"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor={colors.textMuted}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry
                />
              </>
            )}

            <TouchableOpacity style={styles.addPlaylistButton} onPress={handleAddPlaylist}>
              <Text style={styles.addPlaylistButtonText}>Add Playlist</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  headerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  headerStat: {
    color: colors.textMuted,
    fontSize: 14,
  },
  headerStatDot: {
    color: colors.textMuted,
    marginHorizontal: spacing.sm,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.md,
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
  channelsList: {
    padding: spacing.lg,
  },
  groupSection: {
    marginBottom: spacing.lg,
  },
  groupTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  channelCard: {
    flex: 1,
    alignItems: 'center',
    margin: spacing.xs,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  channelLogoContainer: {
    width: 60,
    height: 60,
    marginBottom: spacing.sm,
  },
  channelLogo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  channelLogoPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.surfaceHighlight,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  channelName: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  channelGroup: {
    color: colors.textMuted,
    fontSize: 10,
    marginTop: 2,
  },
  playlistsList: {
    padding: spacing.lg,
  },
  playlistCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  playlistHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playlistIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceHighlight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playlistIconActive: {
    backgroundColor: colors.primaryDark,
  },
  playlistInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  playlistName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  playlistMeta: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 2,
  },
  playlistToggle: {
    padding: spacing.sm,
  },
  playlistActions: {
    flexDirection: 'row',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  playlistAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginRight: spacing.lg,
  },
  playlistActionText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  addButton: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.xl,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: spacing.lg,
    paddingBottom: 50,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  modalTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalTabs: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  modalTab: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surfaceHighlight,
    alignItems: 'center',
  },
  modalTabActive: {
    backgroundColor: colors.accent,
  },
  modalTabText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  modalTabTextActive: {
    color: colors.textInverse,
  },
  input: {
    backgroundColor: colors.surfaceHighlight,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    color: colors.text,
    fontSize: 14,
    marginBottom: spacing.md,
  },
  addPlaylistButton: {
    backgroundColor: colors.accent,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  addPlaylistButtonText: {
    color: colors.textInverse,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
