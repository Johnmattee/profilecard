# Profile Card Component

A fully accessible, responsive profile card built with semantic HTML, CSS, and vanilla JavaScript.

## 🌐 Live Demo

**Live URL**: [Add your deployment URL here]

## ✨ Features

- ✅ Semantic HTML5 with proper accessibility
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Real-time timestamp in milliseconds
- ✅ Keyboard navigation with visible focus states
- ✅ All elements include `data-testid` for automated testing
- ✅ Zero dependencies - pure vanilla JS

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/profile-card.git
cd profile-card

# Open in browser
open index.html

# OR use a local server
python -m http.server 8000
# Visit http://localhost:8000
```

## 📋 Requirements Met

All required elements with correct `data-testid` attributes:

| Element | `data-testid` | Status |
|---------|---------------|--------|
| Profile card | `test-profile-card` | ✅ |
| Name | `test-user-name` | ✅ |
| Bio | `test-user-bio` | ✅ |
| Timestamp | `test-user-time` | ✅ |
| Avatar | `test-user-avatar` | ✅ |
| Social links | `test-user-social-links` | ✅ |
| Hobbies | `test-user-hobbies` | ✅ |
| Dislikes | `test-user-dislikes` | ✅ |

## 🧪 Testing

```javascript
// All elements are accessible via data-testid
const card = document.querySelector('[data-testid="test-profile-card"]');
const name = document.querySelector('[data-testid="test-user-name"]');
const time = document.querySelector('[data-testid="test-user-time"]');
```

## 🚀 Deployment

**Netlify**: Drag and drop `index.html` to [netlify.com/drop](https://app.netlify.com/drop)

**GitHub Pages**: 
1. Push to GitHub
2. Settings → Pages → Deploy from `main` branch

**Vercel**: `npx vercel --prod`

## 📱 Responsive Breakpoints

- **Mobile** (< 768px): Single column, stacked layout
- **Tablet** (≥ 768px): Side-by-side avatar, 2-column sections
- **Desktop** (≥ 1024px): Optimized spacing and typography

## ♿ Accessibility

- Semantic HTML (`<article>`, `<header>`, `<nav>`, `<section>`)
- Keyboard navigation support
- ARIA labels and alt text
- Visible focus indicators
- WCAG 2.1 AA compliant

## 🎨 Customization

Edit content directly in `index.html`:

```html
<!-- Change name -->
<h1 data-testid="test-user-name">Your Name</h1>

<!-- Change avatar -->
<img src="your-image.jpg" alt="Your name" data-testid="test-user-avatar">

<!-- Add social links -->
<a href="https://yoursite.com" data-testid="test-user-social-website">Website</a>
```

## 📄 License

MIT License - feel free to use for any project!

---

**Built with semantic HTML, modern CSS, and vanilla JavaScript**
