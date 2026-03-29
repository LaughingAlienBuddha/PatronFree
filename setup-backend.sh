#!/bin/bash
# Setup script for Patronex Backend
# Run this script to quickly set up the backend

set -e

echo "🚀 Patronex Backend Setup Script"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 14+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Navigate to backend directory
cd "$(dirname "$0")/backend" || exit 1

echo "📦 Installing dependencies..."
npm install

echo ""
echo "📝 Creating .env file..."

if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ .env file created. Please edit it with your MongoDB URI:"
    echo "   - For local MongoDB: mongodb://localhost:27017/patronex"
    echo "   - For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/patronex"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "================================"
echo "🎉 Setup Complete!"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Edit .env file with your MongoDB URI"
echo "2. Start the server:"
echo "   npm run dev"
echo ""
echo "3. Test the API:"
echo "   curl http://localhost:5000/api/health"
echo ""
echo "4. Read documentation:"
echo "   - QUICK_START.md - 5 minute setup"
echo "   - backend/README.md - Full API docs"
echo "   - BACKEND_INTEGRATION.md - Frontend integration"
echo ""
