require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { auth } = require('express-oauth2-jwt-bearer');

// Create Express app
const app = express();

// Middleware for nice console logs
app.use(morgan('dev'));
app.use(express.json());

// CORS Configuration
// This allows requests from the specified origin (frontend)
// You can modify this to allow multiple origins by using an array:
// origin: ['http://localhost:3000', 'http://localhost:3001', 'https://your-domain.com']
// Or use a function for more complex logic:
// origin: function(origin, callback) {
//   const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
//   if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//     callback(null, true);
//   } else {
//     callback(new Error('Not allowed by CORS'));
//   }
// }
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: false
}));

// Configure Auth0 JWT validation middleware
const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE || 'https://dev-fwwdto1s75hla2wp.us.auth0.com/api/v2/',
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL || 'https://dev-fwwdto1s75hla2wp.us.auth0.com',
  tokenSigningAlg: 'RS256'
});

// Public route
app.get('/api/public', (req, res) => {
  res.json({
    message: 'This is a public API endpoint that doesn\'t require authentication'
  });
});

// Protected route - requires valid access token
app.get('/api/data', jwtCheck, (req, res) => {
  // The user's Auth0 ID is available in req.auth.payload.sub
  const userId = req.auth.payload.sub;
  
  res.json({
    message: 'This is a protected API endpoint',
    userId: userId,
    userData: {
      items: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
      ],
      timestamp: new Date().toISOString()
    }
  });
});

// Protected route with user-specific data
app.get('/api/user', jwtCheck, (req, res) => {
  const userId = req.auth.payload.sub;
  
  // You would typically query your database for user data here
  // This is just a sample response
  res.json({
    id: userId,
    preferences: {
      theme: 'light',
      notifications: true
    },
    stats: {
      lastLogin: new Date().toISOString(),
      loginCount: 42
    }
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Invalid token or missing authentication' });
  }
  
  res.status(500).json({ message: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
}); 