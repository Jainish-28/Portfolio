# AI/ML Engineer Portfolio Website

A modern, fully responsive personal portfolio website designed to showcase AI/ML engineering skills, projects, and experience to recruiters and potential employers.

## 🌟 Features

- **Modern Design**: Clean, professional aesthetic with vibrant gradients and smooth animations
- **Dark/Light Mode**: Toggle between themes with persistent preference storage
- **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- **Smooth Animations**: Intersection Observer API for scroll-triggered animations
- **Project Filtering**: Filter projects by category (All, LLM, NLP, ML)
- **Sticky Navigation**: Active section highlighting and smooth scrolling
- **SEO Optimized**: Semantic HTML, meta tags, and proper heading structure
- **Accessible**: ARIA labels and keyboard navigation support
- **Performance**: Lazy loading images and debounced scroll events

## 📁 Project Structure

```
Portfolio/
├── index.html          # Main HTML file
├── styles.css          # All styling and responsive design
├── script.js           # Interactive functionality
├── README.md           # This file
└── images/            # Project and profile images (to be added)
```

## 🚀 Quick Start

1. **Clone or download** this repository
2. **Replace placeholder images** with your actual photos (see Customization section)
3. **Update personal information** in `index.html`
4. **Add your resume PDF** to the project folder
5. **Open `index.html`** in a web browser

No build process or dependencies required - just open and customize!

## 🎨 Customization Guide

### 1. Personal Information

**In `index.html`, update:**

- **Line 9**: Update meta description
- **Line 11**: Update meta author
- **Line 12**: Update page title
- **Line 48**: Your name in the logo
- **Line 71**: Your full name
- **Line 74**: Your title/specialization
- **Line 77-79**: Your tagline/description
- **Line 92-100**: Social media links (GitHub, LinkedIn, Email)

### 2. About Section

**Lines 123-154**: Update the about me content with your own story and highlights

### 3. Skills

**Lines 168-253**: Customize skill categories and tags to match your expertise

### 4. Projects

**Lines 280-470**: Update each project with:
- Project title
- Description
- Problem/Approach/Results
- Tech stack tags
- GitHub and demo links
- Project images

### 5. Experience

**Lines 492-534**: Add your work experience and education details

### 6. Certifications

**Lines 546-577**: Update with your certifications and achievements

### 7. Contact Information

**Lines 607-650**: Update email, LinkedIn, and GitHub links

### 8. Images

Replace these placeholder images in your project folder:

- `profile-placeholder.jpg` - Your professional headshot (500x500px recommended)
- `about-placeholder.jpg` - About section image (600x800px recommended)
- `project-rag.jpg` - RAG project screenshot (800x600px recommended)
- `project-resume.jpg` - Resume parser project screenshot
- `project-fakenews.jpg` - Fake news detection project screenshot
- `project-ticket.jpg` - Ticket classification project screenshot

### 9. Resume Download

**In `script.js` (lines 165-175):**

```javascript
downloadResumeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = 'path/to/your/resume.pdf';  // Update this path
    link.download = 'Your_Name_Resume.pdf';  // Update filename
    link.click();
});
```

### 10. Color Scheme

**In `styles.css`, customize the color variables (lines 7-10):**

```css
:root {
    --primary-hue: 250;      /* Change for different primary color */
    --secondary-hue: 280;    /* Change for different secondary color */
}
```

## 🎯 Sections Overview

1. **Hero Section**: Eye-catching introduction with CTA buttons
2. **About Me**: Professional summary and highlights
3. **Skills**: Categorized technical skills with visual cards
4. **Projects**: Detailed project showcases with filtering
5. **Experience**: Timeline-style work history and education
6. **Certifications**: Achievements and credentials
7. **Contact**: Contact form and social links
8. **Footer**: Copyright and additional links

## 💡 Advanced Customization

### Enable Typing Effect

Uncomment lines 191-195 in `script.js` to enable a typing animation for the hero subtitle.

### Add More Projects

Copy one of the existing project card blocks (lines 280-350 in `index.html`) and update the content.

### Modify Animations

Adjust animation timing in `styles.css`:
- Line 35-37: Transition speeds
- Line 120-128: Floating orb animation
- Line 142-149: Fade in animation

### Contact Form Backend

The contact form currently shows an alert. To connect to a backend:

**In `script.js` (lines 153-163):**

```javascript
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Send to your backend
    const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });
    
    if (response.ok) {
        alert('Message sent successfully!');
        contactForm.reset();
    }
});
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This portfolio template is free to use for personal and commercial projects. Attribution is appreciated but not required.

## 🤝 Support

If you need help customizing this portfolio:

1. Check the inline comments in the code
2. Review this README thoroughly
3. Search for specific CSS/JS tutorials online

## 🎓 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Flexbox, Grid, Custom Properties, Animations
- **JavaScript (ES6)**: Intersection Observer, Local Storage, Event Listeners
- **Google Fonts**: Inter, Space Grotesk
- **Font Awesome**: Icons

## ✨ Tips for Best Results

1. **Use high-quality images** - Professional photos make a huge difference
2. **Keep descriptions concise** - Recruiters scan quickly
3. **Quantify achievements** - Use metrics and numbers in project results
4. **Update regularly** - Keep your portfolio current with latest projects
5. **Test on mobile** - Many recruiters view portfolios on phones
6. **Optimize images** - Compress images for faster loading
7. **Proofread everything** - Typos can hurt your credibility

## 🚀 Deployment

### GitHub Pages (Free)

1. Create a GitHub repository
2. Upload all files
3. Go to Settings → Pages
4. Select main branch as source
5. Your site will be live at `https://yourusername.github.io/repository-name`

### Netlify (Free)

1. Sign up at netlify.com
2. Drag and drop your project folder
3. Your site is live instantly with a custom URL

### Vercel (Free)

1. Sign up at vercel.com
2. Import your GitHub repository
3. Deploy with one click

---

**Built with ❤️ for AI/ML Engineers**

Good luck with your job search! 🎯
