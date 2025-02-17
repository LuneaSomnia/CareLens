from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import users, assessments, resources, symptom_checker, lifestyle, prevention

app = FastAPI(title="CARELENS - Preventive Care Web App")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(assessments.router, prefix="/api/assessments", tags=["assessments"])
app.include_router(resources.router, prefix="/api/resources", tags=["resources"])
app.include_router(symptom_checker.router, prefix="/api/symptom-checker", tags=["symptom_checker"])
app.include_router(lifestyle.router, prefix="/api/lifestyle", tags=["lifestyle"])
app.include_router(prevention.router, prefix="/api/prevention", tags=["prevention"])

@app.get("/")
async def root():
    return {"message": "Welcome to CARELENS - Preventive Care Web App"}
