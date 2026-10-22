# Responsive Student Portfolio & Academic Management Website

A responsive, multi-page web platform designed to showcase academic achievements, display technical projects, and manage daily academic tasks.

---

## Project Features

- **Homepage:** Student profile photo, personal introduction, bio, and welcome section.
- **About Me:** Educational background, career aspirations, technical skills, and hobbies.
- **Projects Showcase:** Interactive gallery featuring sample technical projects with descriptions, screenshots, and live/repository links.
- **Academic Planner:** Interactive task management system allowing users to add, complete, and delete academic tasks dynamically.
- **Contact Page:** Functional contact form featuring client-side JavaScript validation (checking for empty fields, valid email format, and numeric phone numbers).

---

## 🛠️ Technologies Used

- **HTML5:** Semantic layout structure (forms, tables, multimedia, lists, images).
- **CSS3:** Custom responsive layout using Flexbox/Grid, mobile-first design principles, media queries, and smooth transitions.
- **JavaScript (ES6+):** DOM manipulation, event handling, dynamic task list rendering, and client-side form validation.

---

## File Structure

```text
student-portfolio/
│
├── index.html              # Homepage
├── about.html              # About Me page
├── projects.html           # Projects Showcase page
├── planner.html            # Academic Planner page
├── contact.html            # Contact Form page
│
├── css/
│   ├── styles.css          # Global layout & responsive styles
│   └── components.css      # Component-specific styles (navigation, forms, planner cards)
│
├── js/
│   ├── app.js              # Global state, DOM cache, and tab routing
│   ├── planner.js          # Academic task management logic (Add, Toggle, Delete)
│   └── validation.js       # Contact form validation logic
│
└── assets/
    ├── images/             # Profile photos and project screenshots
    └── media/              # Multimedia content
