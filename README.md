# ZANZSTAR TOURS AND TRAVEL - Website

A modern, professional Tours and Travel website for Zanzstar Tours and Travel, based in Zanzibar, Tanzania.

## 📋 Overview

This is a complete, responsive website designed for a luxury tourism company. It features:

- **Modern Design**: Clean, elegant UI with ocean-inspired colors
- **Mobile Responsive**: Fully optimized for all device sizes
- **Fast Loading**: Optimized CSS and vanilla JavaScript
- **SEO Optimized**: Proper meta tags and semantic HTML
- **WhatsApp Integration**: Easy booking via WhatsApp click-to-chat

## 📁 Project Structure

```
zanzstar/  
├── index.html              # Home page
├── tours.html              # All tours listing
├── safari-blue.html        # Safari Blue tour details
├── about.html              # About Us page
├── services.html           # Travel Services page
├── contact.html            # Contact page
├── css/
│   └── style.css           # Main stylesheet
├── js/
│   └── main.js             # JavaScript functionality
├── images/                 # Image assets (add your images here)
│   ├── favicon.png
│   ├── logo.png
│   └── ...
├── videos/                 # Video assets (add your videos here)
│   └── zanzibar-dhow.mp4   # Hero background video
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- A web browser
- A local server (optional, for development)

### Installation

1. **Download/Clone the project**

2. **Add your images**
   - Replace placeholder images with your own
   - Recommended formats: JPEG, PNG, WebP
   - Hero video: MP4 format, compressed for web

3. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server like Live Server (VS Code extension)

### Using Live Server (Recommended)
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 🎨 Customization

### Colors
Edit the CSS variables in `css/style.css`:

```css
:root {
    --primary-color: #1a7a6c;      /* Main green */
    --primary-light: #2aa899;
    --primary-dark: #145f54;
    --accent-gold: #c9a962;         /* Gold accents */
    --secondary-color: #0d4a44;     /* Dark teal */
}
```

### Contact Information
Update the following in all HTML files:
- Phone: `+255 656 443 740`
- WhatsApp links: `https://wa.me/255656443740`
- Email: `info@zanzstartours.com`

### Tour Prices
Update prices in the tour cards within `tours.html` and individual tour pages.

## 📱 Features

### Core Features
- ✅ Responsive navigation with mobile menu
- ✅ Hero section with video background
- ✅ Featured tours with cards
- ✅ Testimonials slider
- ✅ FAQ accordion
- ✅ Contact form (sends to WhatsApp)
- ✅ Google Maps integration
- ✅ WhatsApp floating button
- ✅ Back to top button
- ✅ Smooth scroll animations

### Pages
- **Home**: Hero video, featured tours, why choose us, testimonials, CTA
- **Tours**: Complete listing of all tours by category
- **Safari Blue**: Detailed tour page (template for other tours)
- **About**: Company info, mission, team
- **Services**: Airport transfers, hotel bookings, honeymoon packages
- **Contact**: Contact form, map, quick contact options

## 📧 Contact Form

The contact form sends data to WhatsApp for easy communication:
1. User fills out the form
2. Form validates input
3. Constructs a WhatsApp message
4. Opens WhatsApp with pre-filled message

## 🔧 Adding New Tour Pages

1. Copy `safari-blue.html`
2. Rename to `tour-[name].html`
3. Update:
   - Page title and meta description
   - Hero image/content
   - Tour details
   - Pricing
   - Gallery images

## 🌐 Deployment

### Option 1: Web Hosting
Upload all files to your web hosting via FTP/SFTP.

### Option 2: Netlify (Free)
1. Create account at netlify.com
2. Drag & drop the folder
3. Get instant live URL

### Option 3: GitHub Pages (Free)
1. Create GitHub repository
2. Push code to repository
3. Enable GitHub Pages in settings

## 📝 Adding Hero Video

1. Get a drone video of Zanzibar (dhow sailing)
2. Compress for web (recommended: 1080p, < 10MB)
3. Place in `videos/zanzibar-dhow.mp4`
4. Video sources:
   - Pexels.com (free)
   - Unsplash.com (free)
   - Custom filming

## 🔒 Security Notes

- Form submissions go to WhatsApp (no backend needed)
- No sensitive data stored
- HTTPS recommended for production

## 📞 Support

For questions about this website template:
- WhatsApp: +255 656 443 740
- Email: info@zanzstartours.com

## 📄 License

This website is created for Zanzstar Tours and Travel.
All rights reserved.

---

**Built with ❤️ for Zanzibar Tourism**
