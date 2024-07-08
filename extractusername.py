import jwt
def extract_username_from_jwt(token):
    try:
        decoded = jwt.decode(token, 'your_secret_key', algorithms=["HS256"])
        return decoded.get('username')
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
