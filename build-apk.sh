#!/bin/bash
# Flyx APK Builder
# Run this from inside the flyx-mobile folder

set -e
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}🟢 Flyx APK Builder${NC}"
echo "====================="

# 1. Install EAS CLI if not present
if ! command -v eas &> /dev/null; then
  echo -e "${YELLOW}Installing EAS CLI...${NC}"
  npm install -g eas-cli
fi

# 2. Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
npm install

# 3. Login to Expo
echo -e "${YELLOW}Log in to Expo (or press Enter if already logged in)${NC}"
eas whoami 2>/dev/null || eas login

# 4. Link project to Expo (creates a real projectId)
echo -e "${YELLOW}Linking to Expo project...${NC}"
eas init --id $(eas project:create --name flyx --non-interactive 2>/dev/null | grep -oP '(?<=id: ).*' || echo "")

# 5. Build
echo ""
echo "Which APK would you like to build?"
echo "  1) Standard Android APK (phones & tablets)"
echo "  2) Fire TV APK"
echo "  3) Both"
read -p "Choice [1-3]: " choice

case $choice in
  1)
    echo -e "${GREEN}Building Android APK...${NC}"
    eas build -p android --profile production --non-interactive
    ;;
  2)
    echo -e "${GREEN}Building Fire TV APK...${NC}"
    eas build -p android --profile firetv --non-interactive
    ;;
  3)
    echo -e "${GREEN}Building Android APK...${NC}"
    eas build -p android --profile production --non-interactive
    echo -e "${GREEN}Building Fire TV APK...${NC}"
    eas build -p android --profile firetv --non-interactive
    ;;
esac

echo ""
echo -e "${GREEN}✅ Build submitted!${NC}"
echo "📧 You'll get an email when it's done (usually 5-15 min)"
echo "🔗 Track progress: https://expo.dev/builds"
