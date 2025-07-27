const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// This is a security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests from this IP, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// CORS configuration
app.use(cors({
  // origin: process.env.NODE_ENV === 'production' 
  //   ? ['https://ai-code-explainer-pi.vercel.app/'] 
  //   : ['http://localhost:3000', 'http://127.0.0.1:3000'],
  origin: [
  'https://ai-code-explainer-pi.vercel.app',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Import routes
const explainRoute = require('./routes/explain');
const errorHandler = require('./middleware/errorHandler');

// Routes
app.use('/api/explain', explainRoute);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Code Explainer API Server',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      explain: '/api/explain'
    }
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// 404 handler (must be after all routes)
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // console.log(`Health check: http://localhost:${PORT}/api/health`);
  // console.log(`API Base: http://localhost:${PORT}/api`);
  
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log('Unhandled Promise Rejection:', err.message);
  // Close server & exit process
  server.close(() => {
    process.exit(1);
  });
});