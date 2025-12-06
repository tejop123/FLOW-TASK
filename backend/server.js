import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import boardRoutes from "./routes/boardRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();

// Configure CORS for both local and Vercel deployment
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // Allow localhost and all Vercel domains
    const allowedOrigins = [
    'http://localhost:3006',
    'http://localhost:3005',
    'http://localhost:5000',
    ];
    
    // Allow all Vercel domains
    if (origin.includes('vercel.app') || origin.includes('localhost')) {
      return callback(null, true);
    }
    
    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // For development, allow all
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' })); // Increase limit for base64 images
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const PORT = process.env.PORT || 5000;
let MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://flowtask:flow@cluster0.nllycgv.mongodb.net/';

// Check if MONGO_URI is loaded
if (!MONGO_URI || MONGO_URI === 'YOUR_MONGO_URI') {
  console.warn('⚠️  MONGO_URI not properly configured. Using default or check .env file');
}

console.log('Connecting to MongoDB...');

// MongoDB connection with improved error handling
let isMongoConnected = false;

const mongoOptions = {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 30000,
  retryWrites: true,
  maxPoolSize: 10,
};

mongoose.connect(MONGO_URI, mongoOptions)
.then(() => {
  console.log("✅ MongoDB Connected Successfully");
  isMongoConnected = true;
})
.catch(err => {
  console.error('❌ MongoDB Connection Error:', err.message);
  console.error('⚠️  Server will run but database operations will fail');
  console.error('💡 To fix:');
  console.error('   1. Go to: https://www.mongodb.com/docs/atlas/security-whitelist/');
  console.error('   2. Add your IP address to the IP whitelist');
  console.error('   3. Or use 0.0.0.0/0 to allow all IPs (development only)');
  console.error('   4. Or switch to local MongoDB');
  isMongoConnected = false;
});

// Handle connection events
mongoose.connection.on('connected', () => {
  isMongoConnected = true;
  console.log('✅ Mongoose connected to MongoDB');
});

mongoose.connection.on('disconnected', () => {
  isMongoConnected = false;
  console.log('❌ Mongoose disconnected from MongoDB');
});

mongoose.connection.on('error', (err) => {
  isMongoConnected = false;
  console.error('❌ MongoDB connection error:', err.message);
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: 'running',
    mongodb: isMongoConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// Basic route
app.get("/", (req, res) => {
  res.send("FlowTask API is running...");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/tasks", taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Local: http://localhost:${PORT}`);
  console.log(`Network: http://0.0.0.0:${PORT}`);
});
