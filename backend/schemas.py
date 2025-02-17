from pydantic import BaseModel
from datetime import date
from typing import Optional

class UserBase(BaseModel):
    full_name: str
    date_of_birth: date
    gender: str
    email: str
    phone_number: Optional[str] = None
    address: Optional[str] = None

class UserHealth(BaseModel):
    medical_history: Optional[str] = None
    family_medical_history: Optional[str] = None
    current_medications: Optional[str] = None
    vaccination_records: Optional[str] = None

class UserLifestyle(BaseModel):
    lifestyle_info: Optional[dict] = None

class UserEmergency(BaseModel):
    blood_type: Optional[str] = None
    emergency_contacts: Optional[dict] = None
    organ_donor_status: Optional[str] = None

class UserSecurity(BaseModel):
    data_sharing_preferences: Optional[str] = None
    auth_method: Optional[str] = None

class UserCreate(UserBase, UserHealth, UserLifestyle, UserEmergency, UserSecurity):
    pass

class User(UserCreate):
    id: int
    class Config:
        orm_mode = True

class AssessmentCreate(BaseModel):
    user_id: int
    risk_scores: dict
    recommendations: str

class Assessment(BaseModel):
    id: int
    user_id: int
    risk_scores: dict
    recommendations: str
    created_at: str
    class Config:
        orm_mode = True
