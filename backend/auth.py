# Sample Auth0 integration (adjust with your keys and JWKS retrieval)
from fastapi import Request, HTTPException
from jose import jwt
from typing import Optional

AUTH0_DOMAIN = "your-auth0-domain"
API_AUDIENCE = "your-api-audience"
ALGORITHMS = ["RS256"]

def get_token_auth_header(request: Request) -> str:
    auth = request.headers.get("Authorization", None)
    if not auth:
        raise HTTPException(status_code=401, detail="Authorization header expected")
    parts = auth.split()
    if parts[0].lower() != "bearer" or len(parts) != 2:
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    return parts[1]

def verify_jwt(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(
            token,
            "YOUR_PUBLIC_KEY",  # Replace with key retrieval logic
            algorithms=ALGORITHMS,
            audience=API_AUDIENCE,
            issuer=f"https://{AUTH0_DOMAIN}/"
        )
        return payload
    except Exception:
        raise HTTPException(status_code=401, detail="Token is invalid")
