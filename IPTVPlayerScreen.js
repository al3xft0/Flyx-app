import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  StatusBar,
  FlatList,
} from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';

import { colors, spacing, borderRadius } from '../theme/colors';
import { mockIPTVChannels } from '../data/mockData';

const { width, height } = Dimensions.get('window');

const ChannelListItem = ({ channel, isActive, onPress }) => (
  <TouchableOpacity 
    style={[styles.channelItem, isActive && styles.channelItemActive]} 
    onPress={onPress}
  >
    <View style={styles.channelLogoSmall}>
      {channel.tvgLogo ? (
        <Animated.Image 
          source={{ uri: channel.tvgLogo }} 
          style={styles.channelLogoImage}
          resizeMode="contain"
        />
      ) : (
        <Ionicons name="tv" size={24} color={colors.textMuted} />
      )}
    </View>
    <View style={styles.channelInfo}>
      <Text style={[styles.channelName, isActive && styles.channelNameActive]} numberOfLines={1}>
        {channel.name}
      </Text>
      <Text style={styles.channelGroup}>{channel.group}</Text>
    </View>
    {isActive && (
      <View style={styles.playingIndicator}>
        <View style={styles.playingDot} />
        <Text style={styles.playingText}>LIVE</Text>
      </View>
    )}
  </TouchableOpacity>
);

export default function IPTVPlayerScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { channel: initialChannel } = route.params;
  
  const videoRef = useRef(null);
  const [currentChannel, setCurrentChannel] = useState(initialChannel);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [showChannelList, setShowChannelList] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  
  const controlsOpacity = useRef(new Animated.Value(1)).current;
  const hideControlsTimeout = useRef(null);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    StatusBar.setHidden(true);
    
    return () => {
      ScreenOrientation.unlockAsync();
      StatusBar.setHidden(false);
    };
  }, []);

  const showControlsTemporarily = () => {
    setShowControls(true);
    Animated.timing(controlsOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }

    hideControlsTimeout.current = setTimeout(() => {
      if (isPlaying && !showChannelList) {
        Animated.timing(controlsOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => setShowControls(false));
      }
    }, 3000);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    showControlsTemporarily();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    showControlsTemporarily();
  };

  const changeChannel = (channel) => {
    setCurrentChannel(channel);
    setShowChannelList(false);
    showControlsTemporarily();
  };

  const goToPreviousChannel = () => {
    const currentIndex = mockIPTVChannels.findIndex(c => c.id === currentChannel.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : mockIPTVChannels.length - 1;
    changeChannel(mockIPTVChannels[prevIndex]);
  };

  const goToNextChannel = () => {
    const currentIndex = mockIPTVChannels.findIndex(c => c.id === currentChannel.id);
    const nextIndex = currentIndex < mockIPTVChannels.length - 1 ? currentIndex + 1 : 0;
    changeChannel(mockIPTVChannels[nextIndex]);
  };

  return (
    <View style={styles.container}>
      {/* Video Player */}
      <TouchableOpacity 
        activeOpacity={1}
        style={styles.videoContainer}
        onPress={showControlsTemporarily}
      >
        <Video
          ref={videoRef}
          source={{ uri: currentChannel.url || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
          style={styles.video}
          resizeMode="contain"
          shouldPlay={isPlaying}
          isLooping={true}
          volume={isMuted ? 0 : volume}
        />
      </TouchableOpacity>

      {/* Controls Overlay */}
      {showControls && (
        <Animated.View style={[styles.controlsOverlay, { opacity: controlsOpacity }]}>
          {/* Top Bar */}
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <View style={styles.liveBadge}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>LIVE</Text>
              </View>
              <Text style={styles.title} numberOfLines={1}>{currentChannel.name}</Text>
              <Text style={styles.subtitle}>{currentChannel.group}</Text>
            </View>
            <TouchableOpacity 
              style={styles.channelListButton}
              onPress={() => {
                setShowChannelList(!showChannelList);
                showControlsTemporarily();
              }}
            >
              <Ionicons name="list" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          {/* Center Controls */}
          <View style={styles.centerControls}>
            <TouchableOpacity onPress={goToPreviousChannel} style={styles.channelNavButton}>
              <Ionicons name="chevron-back" size={32} color={colors.text} />
              <Text style={styles.channelNavText}>Prev</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={togglePlay} style={styles.playButton}>
              <Ionicons 
                name={isPlaying ? "pause" : "play"} 
                size={48} 
                color={colors.text} 
              />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={goToNextChannel} style={styles.channelNavButton}>
              <Ionicons name="chevron-forward" size={32} color={colors.text} />
              <Text style={styles.channelNavText}>Next</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Bar */}
          <View style={styles.bottomBar}>
            <View style={styles.controlButtons}>
              <TouchableOpacity onPress={toggleMute} style={styles.controlButton}>
                <Ionicons 
                  name={isMuted ? "volume-mute" : "volume-high"} 
                  size={24} 
                  color={colors.text} 
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.controlButton}>
                <Ionicons name="heart-outline" size={24} color={colors.text} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.controlButton}>
                <Ionicons name="information-circle-outline" size={24} color={colors.text} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.controlButton}>
                <Ionicons name="expand" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      )}

      {/* Channel List Sidebar */}
      {showChannelList && (
        <View style={styles.channelListOverlay}>
          <TouchableOpacity 
            style={styles.channelListBackdrop}
            onPress={() => setShowChannelList(false)}
          />
          <View style={styles.channelList}>
            <View style={styles.channelListHeader}>
              <Text style={styles.channelListTitle}>Channels</Text>
              <TouchableOpacity onPress={() => setShowChannelList(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={mockIPTVChannels}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ChannelListItem
                  channel={item}
                  isActive={item.id === currentChannel.id}
                  onPress={() => changeChannel(item)}
                />
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      )}

      {/* Channel Number Overlay */}
      <View style={styles.channelNumberOverlay}>
        <Text style={styles.channelNumber}>
          {mockIPTVChannels.findIndex(c => c.id === currentChannel.id) + 1}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: height,
    height: width,
  },
  controlsOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    paddingTop: spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.error,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.xs,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.text,
    marginRight: 4,
  },
  liveText: {
    color: colors.text,
    fontSize: 10,
    fontWeight: 'bold',
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 2,
  },
  channelListButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xl,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  channelNavButton: {
    alignItems: 'center',
    padding: spacing.md,
  },
  channelNavText: {
    color: colors.text,
    fontSize: 12,
    marginTop: spacing.xs,
  },
  bottomBar: {
    padding: spacing.md,
    paddingBottom: spacing.lg,
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  controlButton: {
    padding: spacing.sm,
  },
  channelListOverlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
  },
  channelListBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  channelList: {
    width: 280,
    backgroundColor: colors.surface,
    paddingTop: spacing.lg,
  },
  channelListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  channelListTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  channelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  channelItemActive: {
    backgroundColor: colors.primaryDark,
  },
  channelLogoSmall: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceHighlight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  channelLogoImage: {
    width: 32,
    height: 32,
  },
  channelInfo: {
    flex: 1,
  },
  channelName: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '500',
  },
  channelNameActive: {
    color: colors.accent,
  },
  channelGroup: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  playingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  playingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
  },
  playingText: {
    color: colors.accent,
    fontSize: 10,
    fontWeight: 'bold',
  },
  channelNumberOverlay: {
    position: 'absolute',
    top: 100,
    right: spacing.lg,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  channelNumber: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
});
