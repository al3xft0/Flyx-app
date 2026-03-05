import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, spacing, borderRadius } from '../theme/colors';

const SettingItem = ({ icon, title, subtitle, value, onPress, type = 'arrow' }) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <View style={styles.settingIcon}>
      <Ionicons name={icon} size={22} color={colors.accent} />
    </View>
    <View style={styles.settingContent}>
      <Text style={styles.settingTitle}>{title}</Text>
      {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
    </View>
    {type === 'arrow' && (
      <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
    )}
    {type === 'switch' && (
      <Switch
        value={value}
        onValueChange={onPress}
        trackColor={{ false: colors.surfaceHighlight, true: colors.primary }}
        thumbColor={value ? colors.accent : colors.textMuted}
      />
    )}
    {type === 'value' && value && (
      <Text style={styles.settingValue}>{value}</Text>
    )}
  </TouchableOpacity>
);

const SectionHeader = ({ title }) => (
  <Text style={styles.sectionHeader}>{title}</Text>
);

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    autoplay: true,
    subtitles: true,
    notifications: true,
    downloadsOnWifi: true,
    hardwareDecoding: true,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will remove all your watch history, watchlist, and settings. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: () => Alert.alert('Success', 'All data has been cleared')
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>Customize your Flyx experience</Text>
      </View>

      {/* Account Section */}
      <SectionHeader title="ACCOUNT" />
      <View style={styles.section}>
        <SettingItem
          icon="person-circle"
          title="Real-Debrid"
          subtitle="Connect your account"
          onPress={() => {}}
        />
        <SettingItem
          icon="cloud"
          title="Trakt.tv"
          subtitle="Sync watch history"
          onPress={() => {}}
        />
      </View>

      {/* Playback Section */}
      <SectionHeader title="PLAYBACK" />
      <View style={styles.section}>
        <SettingItem
          icon="play-circle"
          title="Autoplay Next Episode"
          type="switch"
          value={settings.autoplay}
          onPress={() => toggleSetting('autoplay')}
        />
        <SettingItem
          icon="text"
          title="Subtitles"
          type="switch"
          value={settings.subtitles}
          onPress={() => toggleSetting('subtitles')}
        />
        <SettingItem
          icon="hardware-chip"
          title="Hardware Decoding"
          type="switch"
          value={settings.hardwareDecoding}
          onPress={() => toggleSetting('hardwareDecoding')}
        />
        <SettingItem
          icon="videocam"
          title="Default Quality"
          value="Auto"
          type="value"
          onPress={() => {}}
        />
        <SettingItem
          icon="language"
          title="Subtitle Language"
          value="English"
          type="value"
          onPress={() => {}}
        />
      </View>

      {/* Downloads Section */}
      <SectionHeader title="DOWNLOADS" />
      <View style={styles.section}>
        <SettingItem
          icon="wifi"
          title="Download on Wi-Fi Only"
          type="switch"
          value={settings.downloadsOnWifi}
          onPress={() => toggleSetting('downloadsOnWifi')}
        />
        <SettingItem
          icon="folder"
          title="Download Location"
          value="Internal"
          type="value"
          onPress={() => {}}
        />
        <SettingItem
          icon="trash-bin"
          title="Clear Downloads"
          subtitle="Free up 2.4 GB"
          onPress={() => {}}
        />
      </View>

      {/* Notifications Section */}
      <SectionHeader title="NOTIFICATIONS" />
      <View style={styles.section}>
        <SettingItem
          icon="notifications"
          title="Push Notifications"
          type="switch"
          value={settings.notifications}
          onPress={() => toggleSetting('notifications')}
        />
        <SettingItem
          icon="film"
          title="New Episodes"
          subtitle="Get notified when new episodes are available"
          onPress={() => {}}
        />
      </View>

      {/* Appearance Section */}
      <SectionHeader title="APPEARANCE" />
      <View style={styles.section}>
        <SettingItem
          icon="moon"
          title="Theme"
          value="Dark Green"
          type="value"
          onPress={() => {}}
        />
        <SettingItem
          icon="grid"
          title="Home Layout"
          value="Standard"
          type="value"
          onPress={() => {}}
        />
      </View>

      {/* Addons Section */}
      <SectionHeader title="ADDONS" />
      <View style={styles.section}>
        <SettingItem
          icon="cube"
          title="Manage Addons"
          subtitle="Install and configure Stremio addons"
          onPress={() => {}}
        />
        <SettingItem
          icon="refresh"
          title="Clear Addon Cache"
          onPress={() => {}}
        />
      </View>

      {/* About Section */}
      <SectionHeader title="ABOUT" />
      <View style={styles.section}>
        <SettingItem
          icon="information-circle"
          title="Version"
          value="1.0.0"
          type="value"
          onPress={() => {}}
        />
        <SettingItem
          icon="document-text"
          title="Terms of Service"
          onPress={() => {}}
        />
        <SettingItem
          icon="shield"
          title="Privacy Policy"
          onPress={() => {}}
        />
      </View>

      {/* Danger Zone */}
      <SectionHeader title="DANGER ZONE" />
      <View style={styles.section}>
        <TouchableOpacity style={styles.dangerItem} onPress={handleClearData}>
          <Ionicons name="warning" size={22} color={colors.error} />
          <Text style={styles.dangerText}>Clear All Data</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Flyx v1.0.0</Text>
        <Text style={styles.footerSubtext}>Built with React Native</Text>
      </View>
    </ScrollView>
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
  headerSubtitle: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: spacing.xs,
  },
  sectionHeader: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  section: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceHighlight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '500',
  },
  settingSubtitle: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 2,
  },
  settingValue: {
    color: colors.textMuted,
    fontSize: 14,
  },
  dangerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.md,
  },
  dangerText: {
    color: colors.error,
    fontSize: 15,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  footerText: {
    color: colors.textMuted,
    fontSize: 14,
  },
  footerSubtext: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: spacing.xs,
  },
});
