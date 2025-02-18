 CARELENS❄️

## Overview

CARELENS is a full-stack preventive care web app that helps users manage their health through personalized profiles, risk assessments, educational resources, symptom checking, lifestyle tracking, wearable integrations, and AI-powered insights. The app features a unique “snowflakes ❄️” theme with a frost-inspired UI including animated snowfall, frosted glass elements, gradient backgrounds, and interactive elements.

## Features

1. **User Profile**  
   - Basic information (name, DOB, gender, contact, address)  
   - Health background (medical history, vaccinations, etc.)  
   - Lifestyle data (diet, exercise, sleep, stress with interactive charts)  
   - Emergency information and privacy settings  

2. **Health Risk Assessment**  
   - Uses profile, lifestyle, and symptom data to provide risk percentages for various conditions  
   - Generates outcome reports with recommendations and alerts  

3. **Educational Resources**  
   - Curated library of articles, videos, and infographics  
   - Personalized resource suggestions and interactive quizzes  

4. **Symptom Checker**  
   - Allows users to input symptoms (with severity/duration)  
   - Uses AI (e.g. OpenAI) to output potential conditions and next steps  

5. **Lifestyle Monitoring/Counseling**  
   - Logging for diet, exercise, sleep, and stress  
   - Provides personalized improvement plans and progress reports  
   - Supports scheduling for counseling sessions

6. **Integration with Wearable Devices (optional)**  
   - Syncs data (steps, heart rate, sleep) from devices like Fitbit, Apple Watch, etc.  
   - Visualizes trends and triggers alerts for abnormal readings

7. **Personalized Prevention Strategies**  
   - Dynamic recommendations (screenings, lifestyle tweaks) based on risk assessments  
   - Reminders and integration with other features

8. **Additional Features**  
   - Community support forums  
   - Healthcare network integration for doctor searches and teleconsultations  
   - Gamified preventive challenges  
   - AI-powered predictive insights

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, Framer Motion, Redux  
- **Backend:** FastAPI, PostgreSQL (SQLAlchemy), Auth0 (for authentication), and additional tools (Plotly, Sentry, etc.)  
- **AI & Retrieval:** OpenAI (ChatGPT) for conversational tasks, Cortex Search/Generation for RAG-based retrieval  
- **Other:** zod for data validation (frontend), AWS Elastic Beanstalk for hosting, and PyCrypto for data encryption.

## Setup Instructions

### Backend
1. Navigate to the `backend/` folder.
2. Create a virtual environment and install dependencies (see `requirements.txt`):
   ```bash
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   
