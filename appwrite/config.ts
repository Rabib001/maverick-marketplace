import { Client, Account, Databases, Storage } from 'react-native-appwrite';
import { Platform } from 'react-native';

// Create the client with basic configuration
const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID);

// Configure the client based on platform
if (Platform.OS !== 'web') {
  // Set the platform for mobile apps
  client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM);
}

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

// Function to get image URLs that work with both local and tunnel modes
const getImageUrl = (
  bucketId: string,
  fileId: string,
  width: number = 400,
  height: number = 300
): string => {
  const projectId = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;

  if (
    process.env.EXPO_PUBLIC_APPWRITE_TUNNEL_MODE === 'true' &&
    process.env.EXPO_PUBLIC_APPWRITE_PUBLIC_URL
  ) {
    return `${process.env.EXPO_PUBLIC_APPWRITE_PUBLIC_URL}/v1/storage/buckets/${bucketId}/files/${fileId}/preview?width=${width}&height=${height}&project=${projectId}`;
  }

  return storage.getFilePreview(bucketId, fileId, width, height).toString();
};


export const DATABASE_ID = '67fc14630023511bae40';
export const USERS_COLLECTION_ID = 'users';
export const LISTINGS_COLLECTION_ID = 'listings';
export const IMAGES_COLLECTION_ID = 'images';
export const IMAGES_BUCKET_ID = 'listing-images';
export const CHATS_COLLECTION_ID = '67fc151b00269d9b1221';
export const MESSAGES_COLLECTION_ID = '67fc151e003681b8ba54';

export { client, account, databases, storage, getImageUrl };