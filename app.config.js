import 'dotenv/config';
export default ({ config }) => {
  const isWeb = process.env.WEB === 'true';
  return {
    ...config,
    expo: {
      name: "maverick-marketplace",
      slug: "maverick-marketplace",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/images/icon.png",
      scheme: "myapp",
      userInterfaceStyle: "automatic",
      ios: {
        supportsTablet: true,
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/images/adaptive-icon.png",
          backgroundColor: "#ffffff",
        },
      },
      web: {
        bundler: "metro",
        output: "static",
        favicon: "./assets/images/favicon.png",
      },
      plugins: [
        "expo-router",
        [
          "expo-splash-screen",
          {
            image: "./assets/images/splash-icon.png",
            imageWidth: 200,
            resizeMode: "contain",
            backgroundColor: "#ffffff",
          },
        ],
      ],
      experiments: {
        typedRoutes: true,
      },
      // Explicitly set new architecture to true 
      newArchEnabled: true,
    },
  };
};