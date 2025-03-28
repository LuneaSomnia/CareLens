# CareLens
Your health,in focus 🔎

CareLens is a personalized web application whose main purpose is to enhance preventive healthcare.

## Features

CareLens provides a comprehensive approach to preventive healthcare:

### 1. Primordial Prevention

- **Wellness Mapping**: Interactive map showing local health resources like parks, gyms, and healthy markets
- **Community Engagement**: Events and activities that promote health in the community
- **Environmental Health**: Information on local environmental factors affecting health

### 2. Primary Prevention

- **Lifestyle Tracking**: Monitor exercise, diet, and other lifestyle factors
- **Screening Reminders**: Age and risk-appropriate health screening suggestions
- **Vaccination Management**: Vaccination records and recommended immunization schedules
- **Health Education**: Personalized resources on disease prevention

### 3. Secondary Prevention

- **Symptom Tracker**: Document and monitor developing symptoms
- **Risk Calculators**: Evidence-based risk assessments for various conditions
- **Screening Management**: Organized tracking of screening test results
- **Early Detection Resources**: Information on recognizing early signs of health issues

### 4. Tertiary Prevention

- **Condition Management**: Tools to monitor chronic conditions
- **Medication Tracking**: Keep track of prescribed medications and schedules
- **Provider Communication**: Share health data with healthcare providers
- **Rehabilitation Resources**: Information on rehabilitation services and recovery

### 5. Quaternary Prevention

- **Medication Review**: Identify potential unnecessary medications and interactions
- **Risk-Benefit Tools**: Compare pros and cons of medical interventions
- **Adverse Event Reporting**: Track negative outcomes from treatments
- **Educational Resources**: Materials on avoiding overtreatment and over-medicalization

## User Profiles

The platform features comprehensive user profiles that include:

- **Basic Information**: Personal and demographic data
- **Health Background**: Medical history, allergies, and family history
- **Lifestyle Data**: Exercise habits, diet, sleep patterns, and more
- **Settings**: Notification preferences and privacy controls

## Technical Features

- **Interactive Maps**: Built with Leaflet.js for location-based health resources
- **Tokenized Input**: Typeahead/autocomplete functionality for user input
- **Data Visualization**: Charts and graphs for health metrics
- **Responsive Design**: Mobile and desktop-friendly interface

## Technology Stack

- **Frontend**: React with TypeScript
- **UI Components**: ShadCN/UI with Tailwind CSS
- **State Management**: React Query
- **Routing**: Wouter
- **Form Handling**: React Hook Form with Zod validation
- **Backend**: Express.js
- **Storage**: In-memory database (can be configured for PostgreSQL)
- **Maps**: Leaflet.js

## Project Structure

```
carelens/
├── client/                 # Frontend code
│   ├── public/             # Static assets
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── hooks/          # Custom React hooks
│       ├── lib/            # Utility functions
│       └── pages/          # Application pages
├── server/                 # Backend code
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API routes
│   └── storage.ts          # Data storage management
├── shared/                 # Shared code between client and server
│   └── schema.ts           # Data schema definitions
└── package.json            # Project dependencies
```
