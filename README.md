# Auth0 Separated Frontend/Backend Demo

This project demonstrates Auth0 authentication with a React frontend and Express backend running on separate domains/ports.

## Auth0 Configuration

1. Create two Auth0 applications:

### Frontend (Single Page Application)
- Set Allowed Callback URLs: `http://localhost:8000/callback`
- Set Allowed Logout URLs: `http://localhost:8000`
- Set Allowed Web Origins: `http://localhost:8000`

### API
- Create a new API with identifier: `https://your-api-identifier`
- Set signing algorithm to RS256

## Environment Variables

### Frontend (.env)
```
REACT_APP_AUTH0_DOMAIN=your-domain.auth0.com
REACT_APP_AUTH0_CLIENT_ID=your-frontend-client-id
REACT_APP_AUTH0_AUDIENCE=https://your-api-identifier
PORT=8000
```

### Backend (.env)
```
AUTH0_AUDIENCE=https://your-api-identifier
AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com
PORT=3000
```

## Running the Applications

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## How It Works

1. React frontend handles authentication with Auth0
2. When a user logs in, they receive ID and access tokens
3. API requests include the access token in Authorization header
4. Backend validates tokens before processing protected requests

## Available API Endpoints

- `GET /api/public` - Public endpoint, no authentication required
- `GET /api/data` - Protected endpoint, requires valid access token
- `GET /api/user` - Protected endpoint that returns user-specific data

## Key Benefits of This Architecture

1. **Clear Separation of Concerns**: Frontend and backend can be deployed and scaled independently
2. **Improved Security**: API validates tokens directly rather than relying on session cookies
3. **Flexibility**: Easy to add more frontend applications or API consumers
4. **Follows Modern Best Practices**: Aligns with OAuth 2.0 and OpenID Connect protocols