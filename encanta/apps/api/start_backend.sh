#!/bin/bash

# Start the FastAPI backend
echo "Starting Encanta FastAPI backend..."
echo "Press Ctrl+C to stop the server"
echo ""

# Try different methods to start the server, using port 3004
if [ -f "run.py" ]; then
    echo "Starting using run.py with port 3004..."
    python -c "
import uvicorn
if __name__ == '__main__':
    uvicorn.run('app.main:app', host='0.0.0.0', port=3004, reload=True)
"
elif [ -f "main.py" ]; then
    echo "Starting using main.py with port 3004..."
    python -m uvicorn main:app --host 0.0.0.0 --port 3004 --reload
else
    echo "Starting using app.main:app with port 3004..."
    python -m uvicorn app.main:app --host 0.0.0.0 --port 3004 --reload
fi 