#!/bin/bash

# Flyx APK Build Script
# This script builds both Android and Fire TV APKs

echo "🟢 Flyx APK Build Script"
echo "========================"
echo ""

# Check if EAS CLI is installed
if ! command -v eas &> /dev/null; then
    echo "❌ EAS CLI not found. Installing..."
    npm install -g eas-cli
fi

# Check if user is logged in
echo "🔐 Checking Expo login status..."
eas whoami || eas login

echo ""
echo "📦 Select build target:"
echo "1) Android APK (Phone/Tablet)"
echo "2) Fire TV APK"
echo "3) Both"
echo ""
read -p "Enter choice (1-3): " choice

case $choice in
    1)
        echo ""
        echo "🔨 Building Android APK..."
        eas build -p android --profile production
        ;;
    2)
        echo ""
        echo "🔨 Building Fire TV APK..."
        eas build -p android --profile firetv
        ;;
    3)
        echo ""
        echo "🔨 Building Android APK..."
        eas build -p android --profile production
        echo ""
        echo "🔨 Building Fire TV APK..."
        eas build -p android --profile firetv
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "✅ Build initiated!"
echo "📱 You will receive an email when the build is complete."
echo "🔗 You can also check the build status at: https://expo.dev/builds"
