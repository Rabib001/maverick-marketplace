const sdk = require('node-appwrite');

const client = new sdk.Client();

client
    .setEndpoint('http://localhost/v1')
    .setProject('67e4b3a30013f83c7a98')
    .setKey('standard_99b485055b59d0b52f040c27588a4fd7438e8a13e3706bdfbfc00fddd2775f7b5eb9fb4bdb450a6dc3979acce59768e312e7236bd7697e7b163831679dff03a71928f8104404c052ba24573f969cf9d05b4d363fa83269a51076ec6aa8f62ddaf7699cbaac1e5cbea68d3df8641779ce9a321eaea16a2efc31f5a8f2498192c0');

    const databases = new sdk.Databases(client);
    const storage = new sdk.Storage(client);
    
    // Helper function to wait
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    async function setupAppwrite() {
        try {
            console.log('Starting Appwrite setup...');
            
            // Create marketplace database
            console.log('Creating database...');
            const db = await databases.create(
                sdk.ID.unique(),
                'marketplace'
            );
            const databaseId = db.$id;
            console.log(`Database created with ID: ${databaseId}`);
    
            // Create users collection
            console.log('Creating users collection...');
            const usersCollection = await databases.createCollection(
                databaseId,
                'users',
                'users',
                [
                    sdk.Permission.read(sdk.Role.users()),
                    sdk.Permission.create(sdk.Role.users()),
                    sdk.Permission.update(sdk.Role.users())
                ]
            );
            const usersCollectionId = usersCollection.$id;
            console.log(`Users collection created with ID: ${usersCollectionId}`);
    
            // Add attributes to users collection
            console.log('Adding attributes to users collection...');
            
            // Create all attributes in sequence
            const userAttributes = [
                databases.createStringAttribute(databaseId, usersCollectionId, 'userId', 36, true),
                databases.createStringAttribute(databaseId, usersCollectionId, 'displayName', 100, false),
                databases.createStringAttribute(databaseId, usersCollectionId, 'bio', 1000, false),
                databases.createStringAttribute(databaseId, usersCollectionId, 'avatarUrl', 255, false),
                databases.createStringAttribute(databaseId, usersCollectionId, 'contactEmail', 255, false),
                databases.createStringAttribute(databaseId, usersCollectionId, 'phoneNumber', 20, false),
                databases.createDatetimeAttribute(databaseId, usersCollectionId, 'createdAt', true)
            ];
            
            await Promise.all(userAttributes);
            
            // Wait for attributes to be processed
            console.log('Waiting for attributes to be processed...');
            await wait(3000);
            
            console.log('Adding index to users collection...');
            try {
                await databases.createIndex(
                    databaseId,
                    usersCollectionId,
                    'user_index',
                    'key',
                    ['userId']
                );
                console.log('Index created for users collection');
            } catch (error) {
                console.error('Error creating index for users collection:', error.message);
                console.log('Continuing with setup...');
            }
    
            // Create listings collection
            console.log('Creating listings collection...');
            const listingsCollection = await databases.createCollection(
                databaseId,
                'listings',
                'listings',
                [
                    sdk.Permission.read(sdk.Role.any()),
                    sdk.Permission.create(sdk.Role.users()),
                    sdk.Permission.update(sdk.Role.users())
                ]
            );
            const listingsCollectionId = listingsCollection.$id;
            console.log(`Listings collection created with ID: ${listingsCollectionId}`);
    
            // Add attributes to listings collection
            console.log('Adding attributes to listings collection...');
            const listingAttributes = [
                databases.createStringAttribute(databaseId, listingsCollectionId, 'title', 100, true),
                databases.createStringAttribute(databaseId, listingsCollectionId, 'description', 5000, true),
                databases.createFloatAttribute(databaseId, listingsCollectionId, 'price', true, 0),
                databases.createStringAttribute(databaseId, listingsCollectionId, 'category', 50, true),
                databases.createStringAttribute(databaseId, listingsCollectionId, 'condition', 50, false),
                databases.createStringAttribute(databaseId, listingsCollectionId, 'location', 100, false),
                databases.createStringAttribute(databaseId, listingsCollectionId, 'userId', 36, true),
                databases.createDatetimeAttribute(databaseId, listingsCollectionId, 'createdAt', true),
                databases.createDatetimeAttribute(databaseId, listingsCollectionId, 'updatedAt', false),
                // Fix: Make status not required but with default value
                databases.createStringAttribute(databaseId, listingsCollectionId, 'status', 20, false, 'active')
            ];
            
            await Promise.all(listingAttributes);
            
            // Wait for attributes to be processed
            console.log('Waiting for attributes to be processed...');
            await wait(3000);
            
            console.log('Adding indexes to listings collection...');
            try {
                const listingIndexes = [
                    databases.createIndex(
                        databaseId,
                        listingsCollectionId,
                        'user_listings',
                        'key',
                        ['userId']
                    ),
                    databases.createIndex(
                        databaseId,
                        listingsCollectionId,
                        'status_index',
                        'key',
                        ['status']
                    ),
                    databases.createIndex(
                        databaseId,
                        listingsCollectionId,
                        'category_index',
                        'key',
                        ['category']
                    )
                ];
                
                await Promise.all(listingIndexes);
                console.log('Indexes created for listings collection');
            } catch (error) {
                console.error('Error creating indexes for listings collection:', error.message);
                console.log('Continuing with setup...');
            }
    
            // Create images collection
            console.log('Creating images collection...');
            const imagesCollection = await databases.createCollection(
                databaseId,
                'images',
                'images',
                [
                    sdk.Permission.read(sdk.Role.any()),
                    sdk.Permission.create(sdk.Role.users()),
                    sdk.Permission.update(sdk.Role.users())
                ]
            );
            const imagesCollectionId = imagesCollection.$id;
            console.log(`Images collection created with ID: ${imagesCollectionId}`);
    
            // Add attributes to images collection
            console.log('Adding attributes to images collection...');
            const imageAttributes = [
                databases.createStringAttribute(databaseId, imagesCollectionId, 'listingId', 36, true),
                databases.createStringAttribute(databaseId, imagesCollectionId, 'fileId', 36, true),
                databases.createIntegerAttribute(databaseId, imagesCollectionId, 'order', false, 0)
            ];
            
            await Promise.all(imageAttributes);
            
            // Wait for attributes to be processed
            console.log('Waiting for attributes to be processed...');
            await wait(3000);
            
            console.log('Adding index to images collection...');
            try {
                await databases.createIndex(
                    databaseId,
                    imagesCollectionId,
                    'listing_images',
                    'key',
                    ['listingId']
                );
                console.log('Index created for images collection');
            } catch (error) {
                console.error('Error creating index for images collection:', error.message);
                console.log('Continuing with setup...');
            }
    
            // Create storage bucket for images
            console.log('Creating storage bucket for images...');
            try {
                const bucket = await storage.createBucket(
                    'listing-images',
                    'listing-images',
                    [
                        sdk.Permission.read(sdk.Role.any()),
                        sdk.Permission.create(sdk.Role.users()),
                        sdk.Permission.update(sdk.Role.users()),
                        sdk.Permission.delete(sdk.Role.users())
                    ],
                    true
                );
                console.log(`Storage bucket created with ID: ${bucket.$id}`);
            } catch (error) {
                console.error('Error creating storage bucket:', error.message);
                console.log('Continuing with setup...');
            }
            
            console.log('Setup completed successfully!');
            console.log('Database ID:', databaseId);
            console.log('Users Collection ID:', usersCollectionId);
            console.log('Listings Collection ID:', listingsCollectionId);
            console.log('Images Collection ID:', imagesCollectionId);
            console.log('Storage Bucket ID: listing-images');
            
            console.log('\nAdd these constants to your appwrite/config.ts file:');
            console.log(`
    export const DATABASE_ID = '${databaseId}';
    export const USERS_COLLECTION_ID = '${usersCollectionId}';
    export const LISTINGS_COLLECTION_ID = '${listingsCollectionId}';
    export const IMAGES_COLLECTION_ID = '${imagesCollectionId}';
    export const IMAGES_BUCKET_ID = 'listing-images';
            `);
        } catch (error) {
            console.error('Error during setup:', error);
        }
    }
    
    setupAppwrite();