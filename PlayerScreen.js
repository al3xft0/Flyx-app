import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';

import { colors, spacing, borderRadius } from '../theme/colors';

const { width, height } = Dimensions.get('window');

export default function PlayerScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { item, stream } = route.params;
  
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [quality, setQuality] = useState(stream?.quality || 'Auto');
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  
  const controlsOpacity = useRef(new Animated.Value(1)).current;
  const hideControlsTimeout = useRef(null);

  useEffect(() => {
    // Lock to landscape
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    
    // Hide status bar
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
      if (isPlaying) {
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

  const seek = async (seconds) => {
    if (videoRef.current) {
      const newPosition = currentTime + seconds;
      await videoRef.current.setPositionAsync(newPosition * 1000);
      showControlsTemporarily();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    showControlsTemporarily();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setCurrentTime(status.positionMillis / 1000);
      setDuration(status.durationMillis / 1000);
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

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
          source={{ uri: stream?.url || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
          style={styles.video}
          resizeMode="contain"
          shouldPlay={isPlaying}
          isLooping={false}
          volume={isMuted ? 0 : volume}
          onPlaybackStatusUpdate={onPlaybackStatusUpdate}
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
              <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
              {item.type === 'tv' && (
                <Text style={styles.subtitle}>S{item.seasonNumber} E{item.episodeNumber}</Text>
              )}
            </View>
            <TouchableOpacity style={styles.castButton}>
              <Ionicons name="cast" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          {/* Center Controls */}
          <View style={styles.centerControls}>
            <TouchableOpacity onPress={() => seek(-10)} style={styles.seekButton}>
              <Ionicons name="play-back" size={32} color={colors.text} />
              <Text style={styles.seekText}>10</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={togglePlay} style={styles.playButton}>
              <Ionicons 
                name={isPlaying ? "pause" : "play"} 
                size={48} 
                color={colors.text} 
              />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => seek(10)} style={styles.seekButton}>
              <Ionicons name="play-forward" size={32} color={colors.text} />
              <Text style={styles.seekText}>10</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Bar */}
          <View style={styles.bottomBar}>
            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
                <View style={[styles.progressThumb, { left: `${progressPercent}%` }]} />
              </View>
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                <Text style={styles.timeText}>{formatTime(duration)}</Text>
              </View>
            </View>

            {/* Control Buttons */}
            <View style={styles.controlButtons}>
              <TouchableOpacity onPress={toggleMute} style={styles.controlButton}>
                <Ionicons 
                  name={isMuted ? "volume-mute" : "volume-high"} 
                  size={24} 
                  color={colors.text} 
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.controlButton}>
                <Ionicons name="text" size={24} color={colors.text} />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.controlButton}
                onPress={() => setShowQualityMenu(!showQualityMenu)}
              >
                <Text style={styles.qualityText}>{quality}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.controlButton}>
                <Ionicons name="settings" size={24} color={colors.text} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.controlButton}>
                <Ionicons name="expand" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      )}

      {/* Quality Menu */}
      {showQualityMenu && (
        <View style={styles.qualityMenu}>
          {['4K', '1080p', '720p', '480p', 'Auto'].map((q) => (
            <TouchableOpacity
              key={q}
              style={[styles.qualityOption, quality === q && styles.qualityOptionActive]}
              onPress={() => {
                setQuality(q);
                setShowQualityMenu(false);
              }}
            >
              <Text style={[styles.qualityOptionText, quality === q && styles.qualityOptionTextActive]}>
                {q}
              </Text>
              {quality === q && <Ionicons name="checkmark" size={18} color={colors.accent} />}
            </TouchableOpacity>
          ))}
        </View>
      )}
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
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 2,
  },
  castButton: {
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
  seekButton: {
    alignItems: 'center',
  },
  seekText: {
    color: colors.text,
    fontSize: 12,
    marginTop: -5,
  },
  bottomBar: {
    padding: spacing.md,
    paddingBottom: spacing.lg,
  },
  progressContainer: {
    marginBottom: spacing.md,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 2,
  },
  progressThumb: {
    position: 'absolute',
    top: -4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.accent,
    marginLeft: -6,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  timeText: {
    color: colors.text,
    fontSize: 12,
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  controlButton: {
    padding: spacing.sm,
  },
  qualityText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  qualityMenu: {
    position: 'absolute',
    right: spacing.lg,
    bottom: 80,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.sm,
    minWidth: 120,
  },
  qualityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.sm,
    borderRadius: borderRadius.md,
  },
  qualityOptionActive: {
    backgroundColor: colors.surfaceHighlight,
  },
  qualityOptionText: {
    color: colors.text,
    fontSize: 14,
  },
  qualityOptionTextActive: {
    color: colors.accent,
    fontWeight: '600',
  },
});
