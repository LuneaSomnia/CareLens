from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import models, schemas
from backend.database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.Assessment)
def create_assessment(assessment: schemas.AssessmentCreate, db: Session = Depends(get_db)):
    new_assessment = models.Assessment(**assessment.dict())
    db.add(new_assessment)
    db.commit()
    db.refresh(new_assessment)
    return new_assessment

@router.get("/user/{user_id}", response_model=list[schemas.Assessment])
def get_assessments_for_user(user_id: int, db: Session = Depends(get_db)):
    assessments = db.query(models.Assessment).filter(models.Assessment.user_id == user_id).all()
    return assessments
