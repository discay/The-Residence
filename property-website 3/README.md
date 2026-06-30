# Your Property Website - Professional Real Estate Landing Page

A beautiful, modern, fully responsive single-page website for showcasing your property. Built with Tailwind CSS, vanilla JavaScript, and ready for instant free hosting.

## What's Included
- Stunning hero section with strong call-to-actions
- Property overview with key specs
- Detailed amenities grid with icons
- Interactive photo gallery with lightbox modal
- Interactive map (Leaflet.js) - easy to customize location
- Professional inquiry form (Netlify Forms ready)
- WhatsApp & email quick contact
- Mobile-friendly hamburger menu
- SEO optimized meta tags
- Smooth animations and professional polish

## Quick Hosting (Free & Easy - 3 Minutes)

### Recommended: Netlify (Drag & Drop - Best for Beginners)
1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire `property-website` folder (or the `index.html` + other files) onto the drop zone.
3. Your site goes live instantly at a URL like `https://your-site-name.netlify.app`
4. **Forms**: Netlify automatically detects the inquiry form. Go to your site dashboard → Forms to view submissions (free).
5. **Custom Domain** (optional): Site settings → Domain management → Add custom domain (free SSL included).

### Alternative: Vercel
1. Visit [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click "New Project" → Import Git Repository (or use their CLI for drag/folder deploy).
3. Deploy. Also supports forms via serverless functions if you expand later.

### GitHub Pages (Free)
1. Create a new GitHub repo.
2. Upload all files from this folder.
3. Go to repo Settings → Pages → Deploy from `main` branch / root.
4. Your site will be at `https://yourusername.github.io/repo-name`

**Pro Tip**: After deploying, test the form and map. Update the map coordinates (see below).

## How to Customize (Very Easy)

Open `index.html` in any code editor (VS Code is ideal - free).

### 1. Basic Info (Search & Replace)
Replace these placeholders throughout the file:
- `Richmond Hill Residence` → Your property name/title
- `Irvine, California` → Your full location (city, state/country)
- `$1,495,000` → Your price or "Contact for Pricing"
- The description paragraph
- Specs: bedrooms, bathrooms, sqft, year built, etc.

### 2. Images (Hero + Gallery)
- All images currently use high-quality Unsplash photos (free to use).
- **To use your own photos**:
  - Upload photos to your hosting (create an `images/` subfolder) or use a service like Imgur / Cloudinary.
  - Replace the `src="..."` URLs in the HTML with your image paths or URLs.
  - Recommended sizes: Hero ~ 2000px wide, Gallery images ~ 1200px+.

### 3. Amenities
- Edit the grid in the Amenities section.
- Add/remove amenity cards. Each has an icon (Font Awesome) + title + short description.
- Icons available: https://fontawesome.com/icons (use classes like `fa-solid fa-swimmer`)

### 4. Map Location (Important!)
Open `script.js` and find:
```js
const lat = 33.6846;
const lng = -117.8265;
```
Change to your property's exact coordinates.
- How to get coordinates: Go to Google Maps → Right-click your property → "What's here?" → Copy the lat, lng numbers.

### 5. Contact Information
- In `index.html` footer and form:
  - Email address
  - Phone number (for tel: links)
  - WhatsApp number (international format, e.g. 19497957963 for +1 949-795-7963)
- Update the pre-filled WhatsApp message if desired.

### 6. Form Submissions
The form is pre-configured for **Netlify Forms** (easiest).
- When hosted on Netlify, submissions appear automatically in your dashboard.
- You can also connect to email notifications or Zapier.
- To use another service (Formspree, etc.), change the `<form>` attributes.

### 7. SEO & Social Sharing
- Update `<title>` and meta description near the top of `index.html`
- Replace the `og:image` content with a good photo of your property (for nice previews when shared on WhatsApp, LinkedIn, Facebook, etc.)

### 8. Advanced (Optional)
- Add floor plan PDF link
- Embed Matterport / YouTube virtual tour
- Add testimonials section
- Multi-language support
- Booking calendar integration (Calendly embed)

## File Structure
```
property-website/
├── index.html          # Main website (edit this)
├── script.js           # Interactivity (gallery, map, form, mobile menu)
├── style.css           # Additional custom styles (minimal)
├── README.md           # This file - hosting & customization guide
└── images/             # (Optional) Add your own photos here
```

## Need Help Customizing?
Just reply in chat with the details (property name, location, specs, description, your photos/links, contact info, etc.) and I can update the files for you instantly. We can iterate until it's perfect.

## Credits
- Design & code: Built for you with care
- Icons: Font Awesome
- Map: Leaflet.js (open source)
- Placeholder photos: Unsplash (beautiful free real estate photography)

---

**You're ready to go live!** Deploy to Netlify now and share the link with potential buyers or renters. This site is designed to convert visitors into inquiries.

If you want a multi-page version, different color scheme, or additional features (e.g. floor plans, price calculator, availability calendar), just let me know.
