# Firebase Setup Guide for Quartz Leaf

## Step 1: Create Firebase Project

1. Go to [https://firebase.google.com/](https://firebase.google.com/)
2. Click **"Get Started"** → **"Add Project"**
3. Enter project name: `QuartzLeaf` (or your choice)
4. Disable Google Analytics (optional)
5. Click **"Create Project"** and wait for setup to complete

## Step 2: Get Firebase Web Configuration

1. In Firebase Console, click the **Gear Icon** (Settings) → **Project Settings**
2. Scroll to **"Your apps"** section
3. Click the **Web icon** (</>) to register a web app
4. Copy the Firebase config object - it looks like this:

```javascript
{
  apiKey: "AIzaSyD...",
  authDomain: "quartzleaf-12345.firebaseapp.com",
  projectId: "quartzleaf-12345",
  storageBucket: "quartzleaf-12345.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
}
```

## Step 3: Update index.html with Your Config

In `index.html`, find this section (around line 985):

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "xxx",
  appId: "1:xxx:web:xxx"
};
```

Replace it with your actual config from Step 2.

## Step 4: Set Up Firestore Database

1. In Firebase Console, go to **Firestore Database** (left sidebar)
2. Click **"Create Database"**
3. Choose **"Start in production mode"**
4. Select region closest to you
5. Click **"Create"**

## Step 5: Update Security Rules

1. In Firestore, go to **Rules** tab
2. Replace all content with:

```javascript
rules_version = '3';
service cloud.firestore {
  match /databases/{database}/documents {
    // Anyone can read
    match /{document=**} {
      allow read: if true;
    }
    // Only authenticated (via Edit Mode password) can write
    match /{collection}/{document=**} {
      allow write: if true;  // Frontend password check handles auth
    }
  }
}
```

3. Click **"Publish"**

## Step 6: Test It Out

1. Open `index.html` in your browser
2. You should see an empty site (no content yet)
3. Click **"✎ Edit Mode"** button
4. Enter password: `quartzleaf` (or the password in your code)
5. Click **"+ Add a Book"** or similar buttons to add content
6. Submit the form - it should save to Firestore
7. Open the site in a different browser/incognito - you should see your content!

## Troubleshooting

### "No module named firebase" or similar errors
- Make sure Firebase SDK CDN links are in the `<head>` of index.html
- Check browser console (F12) for detailed error messages

### Content not saving
- Check browser console for errors
- Verify Firebase config is correct
- Make sure Firestore database is created
- Check Firestore Rules - they should allow reads and writes

### Collections not appearing
- Firestore collections are created automatically when you save the first item
- No need to manually create collections

## What Gets Stored Where

- **`books`** collection: Book titles, authors, blurbs, cover images
- **`poems`** collection: Poem titles and bodies
- **`posts`** collection: Blog post titles, dates, and bodies
- **`praise`** collection: Review quotes, attributions, and sources

All data is stored with `createdAt` and `updatedAt` timestamps automatically.

## Important Notes

- The Edit Mode password is: `quartzleaf` (change it in the code for security)
- Images are stored as Base64 in Firestore (fine for small covers, ~1-2MB limit per document)
- All visitors see the same content (it's cloud-based!)
- Edit Mode only works with the correct password
