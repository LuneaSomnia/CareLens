from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_resources():
    # In a real app, query your DB or an external API for educational resources.
    return {
        "articles": [
            {"id": 1, "title": "Heart Health Tips", "url": "https://example.com/heart-health"},
            {"id": 2, "title": "Preventing Diabetes", "url": "https://example.com/diabetes-prevention"}
        ],
        "videos": [
            {"id": 1, "title": "Healthy Living", "url": "https://youtube.com/examplevideo"}
        ],
        "infographics": []
    }
  
