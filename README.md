# Patient Health Dashboard

A modern, responsive healthcare dashboard built with React, Vite, Tailwind CSS, and Firebase Firestore for tracking health metrics, medications, and lab results.

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
| Hosting | Vercel / Netlify |

## Project Structure

```
src/
├── components/
│   ├── cards/              # Reusable card components
│   │   ├── MetricCard.jsx
│   │   └── MedicationCard.jsx
│   ├── charts/             # Chart components
│   │   └── LineChartBasic.jsx
│   └── forms/              # Form components
│       └── AddMedicationForm.jsx
├── context/
│   └── HealthDataContext.jsx   # Global state management
├── pages/
│   ├── Dashboard.jsx       # Main dashboard with metrics
│   ├── Medications.jsx     # Medication management
│   ├── Labs.jsx           # Lab results viewer
│   └── Settings.jsx       # Application settings
├── services/
│   └── firebase.js        # Firebase configuration
├── App.jsx                # Main app component with routing
└── main.jsx              # Application entry point
```

## Installation & Setup

### Prerequisites
- Node.js 16+ and npm
- Firebase account (free tier works)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/tobilola/patient-health-dashboard.git
cd patient-health-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Setup

#### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Name it (e.g., "patient-health-dashboard")
4. Disable Google Analytics (optional)
5. Click "Create project"

#### Enable Firestore
1. In Firebase Console, click "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a region
5. Click "Enable"

#### Get Firebase Config
1. In Firebase Console, click the gear icon → "Project settings"
2. Scroll to "Your apps" section
3. Click the web icon (</>) to add a web app
4. Register your app (name it anything)
5. Copy the `firebaseConfig` object

### 4. Configure Environment Variables

Create a `.env` file in the project root:

```bash
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Replace the values with your Firebase config from step 3.

### 5. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your dashboard!

## Usage

### Adding Health Metrics
1. Go to Dashboard
2. Click "Add Metric"
3. Select type (Weight, Blood Pressure, or Glucose)
4. Enter value and date
5. Click "Add Metric"

### Managing Medications
1. Go to Medications page
2. Click "Add Medication"
3. Fill in medication details
4. Click "Add Medication"

### Tracking Lab Results
1. Go to Lab Results page
2. Click "Add Lab Result"
3. Enter test details, value, and reference range
4. Select status (normal, high, low)
5. Click "Add Lab Result"

## Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Or use the Vercel Dashboard:
1. Import your GitHub repository
2. Add environment variables from `.env`
3. Click "Deploy"

### Deploy to Netlify

1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables
5. Deploy

## Firebase Security Rules

Update your Firestore rules for production:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2026, 3, 1);
      // Add authentication rules here when you add auth
    }
  }
}
```

## Future Enhancements

- User authentication with Firebase Auth
- Export data as PDF reports
- Appointment scheduling
- Document uploads (prescriptions, reports)
- Medication reminders with notifications
- Dark mode toggle
- Data analytics and insights
- Mobile app (React Native)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT License

## Author

**Tobilola Ogunbowale**
- Email: hello@tobiogunbowale.com
- GitHub: [@tobilola](https://github.com/tobilola)
- Portfolio: [tobiogunbowale.com](https://tobiogunbowale.com)

## Acknowledgments

Built with React, Vite, Tailwind CSS, Firebase, and Recharts to demonstrate modern web development practices and healthcare application design.
