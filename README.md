# Patient Health Dashboard

![Build and Deploy](https://github.com/tobilola/patient-health-dashboard/actions/workflows/deploy.yml/badge.svg)

A modern, responsive healthcare dashboard built with React, Vite, Tailwind CSS, and Firebase Firestore for tracking health metrics, medications, and lab results. Features automated CI/CD pipeline with testing and deployment.

## CI/CD Pipeline

This project includes a complete CI/CD pipeline using GitHub Actions that:

- Automated Testing - Runs test suite on every push
- Code Quality Checks - ESLint validation for code standards
- Automated Builds - Compiles and verifies production build
- Continuous Deployment - Auto-deploys to Netlify on merge to main
- Build Status Badge - Real-time pipeline status visibility

### Pipeline Workflow

```
Push to GitHub → Install Dependencies → Lint Code → Run Tests → Build Project → Deploy to Production
```

Every code change triggers automated quality checks before deployment, ensuring production stability.

## Features

### Health Tracking
- Weight monitoring with trend visualization
- Blood pressure tracking
- Glucose level tracking
- Interactive charts showing 7-day trends

### Medication Management
- Add, edit, and delete medications
- Track dosage, frequency, and schedule
- Next dose reminders
- Notes for special instructions

### Lab Results Viewer
- Comprehensive lab result tracking
- Automatic status highlighting (normal, high, low)
- Reference range comparison
- Date-sorted results table

### Modern UI/UX
- Fully responsive design (mobile, tablet, desktop)
- Clean Tailwind CSS styling
- Interactive data visualizations with Recharts
- Intuitive navigation

## Tech Stack

| Category | Technology |
|---------|------------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Icons | Lucide React |
| State Management | Context API + Custom Hooks |
| Database | Firebase Firestore |
| Routing | React Router v6 |
| Testing | Vitest + React Testing Library |
| Linting | ESLint |
| CI/CD | GitHub Actions |
| Hosting | Netlify |

## Development

### Prerequisites
- Node.js 16+ and npm
- Firebase account
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/tobilola/patient-health-dashboard.git
cd patient-health-dashboard

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Add your Firebase credentials to .env
# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run tests once
npm run test:watch   # Run tests in watch mode
npm run lint         # Check code quality
```

## Testing

The project includes automated tests covering:
- Component functionality
- Data validation
- User interactions

Run tests with:
```bash
npm run test
```

## CI/CD Pipeline Details

### Automated Checks

Every push triggers:
1. Dependency Installation - Ensures clean environment
2. Linting - ESLint checks code quality
3. Testing - Vitest runs test suite
4. Build Verification - Confirms production build succeeds

### Deployment

On merge to main:
- Automated deployment to Netlify
- Environment variables injected securely
- Build artifacts uploaded

### Secrets Required

Add these to GitHub repository secrets:
- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_STORAGE_BUCKET
- VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_APP_ID
- NETLIFY_AUTH_TOKEN (for auto-deploy)
- NETLIFY_SITE_ID (for auto-deploy)

## Deployment

### Manual Deployment to Netlify

```bash
npm run build
# Drag and drop dist folder to netlify.app/drop
```

### Automated Deployment

Push to main branch triggers automatic deployment via GitHub Actions.

## Firebase Setup

1. Create Firebase project
2. Enable Firestore Database (test mode)
3. Get configuration from Project Settings
4. Add credentials to .env file

## Future Enhancements

- User authentication with Firebase Auth
- Export data as PDF reports
- Appointment scheduling
- Document uploads (prescriptions, reports)
- Medication reminders with notifications
- Dark mode toggle
- Mobile app (React Native)

## License

MIT License

## Author

Tobilola Ogunbowale  
Digital Health Solutions Engineer

- Email: hello@tobiogunbowale.com
- GitHub: [@tobilola](https://github.com/tobilola)
- Portfolio: [tobiogunbowale.com](https://tobiogunbowale.com)

---

Built with React, Vite, Tailwind CSS, Firebase, and GitHub Actions to demonstrate modern web development and DevOps practices in healthcare applications.
