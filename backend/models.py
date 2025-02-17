from sqlalchemy import Column, Integer, String, Date, Text
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    date_of_birth = Column(Date, nullable=False)
    gender = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    phone_number = Column(String, nullable=True)
    address = Column(String, nullable=True)
    # Health background
    medical_history = Column(Text, nullable=True)
    family_medical_history = Column(Text, nullable=True)
    current_medications = Column(Text, nullable=True)
    vaccination_records = Column(Text, nullable=True)
    # Lifestyle
    lifestyle_info = Column(Text, nullable=True)  # Can store as JSON string
    # Emergency Information
    blood_type = Column(String, nullable=True)
    emergency_contacts = Column(Text, nullable=True)  # Store as JSON string
    organ_donor_status = Column(String, nullable=True)
    # Privacy and Security
    data_sharing_preferences = Column(String, nullable=True)
    auth_method = Column(String, nullable=True)  # e.g., password, biometric, MFA

class Assessment(Base):
    __tablename__ = "assessments"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    risk_scores = Column(Text, nullable=True)  # Store JSON string for risk percentages
    recommendations = Column(Text, nullable=True)
    created_at = Column(String, nullable=True)  # Use datetime in production

# Additional models for resources, symptom logs, lifestyle tracking, etc. can be added similarly.
