// Detailed Project Guides for DevOps Academy
// Each project has structured phases, tasks, and validation checkpoints

import { project2Guide } from "./projects/project-2-cicd"
import { project3Guide } from "./projects/project-3-cloud"
import { project4Guide } from "./projects/project-4-microservices"
import { project6Guide } from "./projects/project-6-k8s-platform"
import { project8Guide } from "./projects/project-8-mlops"
import { project9Guide } from "./projects/project-9-realtime-ml"
import { project11Guide } from "./projects/project-11-capstone"

export interface ProjectTask {
  id: string
  title: string
  description: string
  instructions: string[]
  codeSnippets?: { language: string; filename?: string; code: string }[]
  hints?: string[]
  validation?: {
    type: "command" | "file" | "manual"
    command?: string
    expectedOutput?: string
    filePath?: string
    description: string
  }
  resources?: { title: string; url: string }[]
}

export interface ProjectPhase {
  id: string
  title: string
  description: string
  estimatedTime: string
  tasks: ProjectTask[]
}

export interface ProjectGuide {
  projectId: string
  title: string
  overview: string
  difficulty: "beginner" | "intermediate" | "advanced"
  totalTime: string
  prerequisites: string[]
  techStack: string[]
  architecture: string // ASCII diagram or description
  phases: ProjectPhase[]
  bonusChallenges?: string[]
  submissionChecklist: string[]
}

export const projectGuides: Record<string, ProjectGuide> = {
  "project-1": {
    projectId: "project-1",
    title: "Full-Stack Containerized Application",
    overview: `Build a complete full-stack web application from scratch and containerize it using Docker best practices. 
You'll create a Node.js/Express backend API, a React frontend, and a PostgreSQL database, all orchestrated with Docker Compose. 
This project teaches you real-world containerization skills used in production environments.`,
    difficulty: "intermediate",
    totalTime: "8-10 hours",
    prerequisites: [
      "Linux command line basics",
      "Git version control fundamentals",
      "Basic understanding of Docker concepts",
      "JavaScript/Node.js familiarity (helpful but not required)",
    ],
    techStack: [
      "Docker & Docker Compose",
      "Node.js & Express.js",
      "React (Vite)",
      "PostgreSQL",
      "Nginx (reverse proxy)",
    ],
    architecture: `
┌─────────────────────────────────────────────────────────────────┐
│                        Docker Network                           │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │   Frontend   │    │   Backend    │    │    Database      │  │
│  │   (React)    │───▶│  (Node.js)   │───▶│  (PostgreSQL)    │  │
│  │   Port 3000  │    │   Port 5000  │    │    Port 5432     │  │
│  └──────────────┘    └──────────────┘    └──────────────────┘  │
│         │                                                       │
│         ▼                                                       │
│  ┌──────────────┐                                              │
│  │    Nginx     │ ◀── External traffic (Port 80)               │
│  │   (Proxy)    │                                              │
│  └──────────────┘                                              │
└─────────────────────────────────────────────────────────────────┘
`,
    phases: [
      // ============ PHASE 1: PROJECT SETUP ============
      {
        id: "phase-1",
        title: "Project Setup & Planning",
        description: "Set up your development environment and create the project structure.",
        estimatedTime: "30-45 minutes",
        tasks: [
          {
            id: "task-1-1",
            title: "Create Project Directory Structure",
            description: "Set up the folder structure for your full-stack application.",
            instructions: [
              "Create a new project directory called 'fullstack-docker-app'",
              "Create subdirectories for frontend, backend, and database",
              "Initialize a Git repository",
              "Create a .gitignore file with common exclusions",
            ],
            codeSnippets: [
              {
                language: "bash",
                filename: "Terminal",
                code: `# Create project structure
mkdir -p fullstack-docker-app/{frontend,backend,database,nginx}
cd fullstack-docker-app

# Initialize Git
git init

# Create .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.npm

# Build outputs
dist/
build/

# Environment files
.env
.env.local
.env.*.local

# Docker
*.log

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
EOF

# View structure
tree -L 2 .`,
              },
            ],
            hints: [
              "Use mkdir -p to create nested directories in one command",
              "The tree command shows directory structure visually",
            ],
            validation: {
              type: "command",
              command: "ls -la",
              description: "You should see frontend, backend, database, and nginx directories",
            },
          },
          {
            id: "task-1-2",
            title: "Create README and Documentation",
            description: "Document your project from the start - good DevOps practice!",
            instructions: [
              "Create a comprehensive README.md file",
              "Include project description, architecture, and setup instructions",
              "Add badges for build status (placeholder for now)",
            ],
            codeSnippets: [
              {
                language: "markdown",
                filename: "README.md",
                code: `# Full-Stack Docker Application

![Docker](https://img.shields.io/badge/Docker-Ready-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Overview

A containerized full-stack application featuring:
- **Frontend**: React with Vite
- **Backend**: Node.js with Express
- **Database**: PostgreSQL
- **Proxy**: Nginx reverse proxy

## 📦 Architecture

\`\`\`
┌─────────┐     ┌─────────┐     ┌─────────┐
│ Frontend│────▶│ Backend │────▶│ Database│
│ (React) │     │ (Node)  │     │ (Postgres)
└─────────┘     └─────────┘     └─────────┘
\`\`\`

## 🛠️ Quick Start

\`\`\`bash
# Clone the repository
git clone <your-repo-url>
cd fullstack-docker-app

# Start all services
docker compose up -d

# View logs
docker compose logs -f
\`\`\`

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Environment mode | development |
| DB_HOST | Database host | postgres |
| DB_PORT | Database port | 5432 |

## 🧪 Development

See individual README files in each service directory.

## 📄 License

MIT License
`,
              },
            ],
            validation: {
              type: "file",
              filePath: "README.md",
              description: "README.md should exist with project documentation",
            },
          },
        ],
      },

      // ============ PHASE 2: BACKEND SERVICE ============
      {
        id: "phase-2",
        title: "Build the Backend API",
        description: "Create a Node.js Express API with database connectivity.",
        estimatedTime: "2-3 hours",
        tasks: [
          {
            id: "task-2-1",
            title: "Initialize Node.js Backend",
            description: "Set up the Express.js API with proper project structure.",
            instructions: [
              "Navigate to the backend directory",
              "Initialize a new Node.js project",
              "Install Express and required dependencies",
              "Create the application entry point",
            ],
            codeSnippets: [
              {
                language: "bash",
                filename: "Terminal",
                code: `cd backend

# Initialize Node.js project
npm init -y

# Install dependencies
npm install express cors dotenv pg

# Install dev dependencies
npm install -D nodemon`,
              },
              {
                language: "json",
                filename: "backend/package.json",
                code: `{
  "name": "backend",
  "version": "1.0.0",
  "description": "Express API for fullstack docker app",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "echo \\"No tests yet\\" && exit 0"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "pg": "^8.11.3"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}`,
              },
            ],
            validation: {
              type: "file",
              filePath: "backend/package.json",
              description: "package.json should exist with Express dependencies",
            },
          },
          {
            id: "task-2-2",
            title: "Create Express Application",
            description: "Build the API with routes, middleware, and database connection.",
            instructions: [
              "Create src directory with index.js",
              "Set up Express with middleware",
              "Create health check endpoint",
              "Add CRUD routes for a 'tasks' resource",
            ],
            codeSnippets: [
              {
                language: "javascript",
                filename: "backend/src/index.js",
                code: `const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection pool
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'taskdb',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
});

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(\`\${new Date().toISOString()} - \${req.method} \${req.path}\`);
  next();
});

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ 
      status: 'healthy', 
      database: 'connected',
      timestamp: new Date().toISOString() 
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'unhealthy', 
      database: 'disconnected',
      error: error.message 
    });
  }
});

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM tasks ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Create a task
app.post('/api/tasks', async (req, res) => {
  const { title, description } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  
  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
      [title, description || '']
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Update a task
app.put('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  
  try {
    const result = await pool.query(
      \`UPDATE tasks 
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           completed = COALESCE($3, completed),
           updated_at = NOW()
       WHERE id = $4 
       RETURNING *\`,
      [title, description, completed, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json({ message: 'Task deleted', task: result.rows[0] });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(\`🚀 Backend server running on port \${PORT}\`);
  console.log(\`📊 Health check: http://localhost:\${PORT}/health\`);
});`,
              },
              {
                language: "env",
                filename: "backend/.env.example",
                code: `# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=taskdb
DB_USER=postgres
DB_PASSWORD=postgres

# Server Configuration
PORT=5000
NODE_ENV=development`,
              },
            ],
            hints: [
              "Always use environment variables for configuration",
              "The 0.0.0.0 binding is important for Docker networking",
            ],
            validation: {
              type: "file",
              filePath: "backend/src/index.js",
              description: "Express application with routes should be created",
            },
          },
          {
            id: "task-2-3",
            title: "Create Backend Dockerfile",
            description: "Containerize the backend using multi-stage build for optimization.",
            instructions: [
              "Create a Dockerfile with multi-stage build",
              "Use alpine base image for smaller size",
              "Add a non-root user for security",
              "Configure proper health checks",
            ],
            codeSnippets: [
              {
                language: "dockerfile",
                filename: "backend/Dockerfile",
                code: `# ================================
# Stage 1: Dependencies
# ================================
FROM node:20-alpine AS deps

WORKDIR /app

# Install dependencies only (better caching)
COPY package*.json ./
RUN npm ci --only=production

# ================================
# Stage 2: Production
# ================================
FROM node:20-alpine AS production

# Add labels for better maintainability
LABEL maintainer="DevOps Academy"
LABEL version="1.0"
LABEL description="Backend API for fullstack app"

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \\
    adduser -S nodejs -u 1001

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --chown=nodejs:nodejs . .

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/health || exit 1

# Start the application
CMD ["node", "src/index.js"]`,
              },
              {
                language: "text",
                filename: "backend/.dockerignore",
                code: `# Dependencies
node_modules
npm-debug.log

# Git
.git
.gitignore

# IDE
.vscode
.idea

# Environment
.env
.env.local

# Build files
dist
coverage

# Documentation
README.md
*.md`,
              },
            ],
            hints: [
              "Multi-stage builds reduce final image size significantly",
              ".dockerignore prevents unnecessary files from being copied",
              "Health checks enable Docker to monitor container health",
            ],
            validation: {
              type: "command",
              command: "docker build -t backend:test ./backend",
              description: "Backend Docker image should build successfully",
            },
          },
        ],
      },

      // ============ PHASE 3: DATABASE SETUP ============
      {
        id: "phase-3",
        title: "Set Up PostgreSQL Database",
        description: "Configure PostgreSQL with initialization scripts and data persistence.",
        estimatedTime: "1-1.5 hours",
        tasks: [
          {
            id: "task-3-1",
            title: "Create Database Initialization Script",
            description: "Set up the database schema that will run when the container starts.",
            instructions: [
              "Create an init.sql file with table definitions",
              "Add sample data for testing",
              "Ensure proper data types and constraints",
            ],
            codeSnippets: [
              {
                language: "sql",
                filename: "database/init.sql",
                code: `-- Database initialization script
-- This runs automatically when the container is first created

-- Create the tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT DEFAULT '',
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create an index for faster queries
CREATE INDEX IF NOT EXISTS idx_tasks_completed ON tasks(completed);
CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON tasks(created_at);

-- Insert sample data
INSERT INTO tasks (title, description, completed) VALUES
    ('Learn Docker basics', 'Understand images, containers, and Dockerfiles', true),
    ('Build multi-stage Dockerfile', 'Optimize image size with multi-stage builds', true),
    ('Set up Docker Compose', 'Orchestrate multiple containers', false),
    ('Configure networking', 'Set up container communication', false),
    ('Add health checks', 'Ensure containers are running properly', false),
    ('Implement CI/CD', 'Automate builds and deployments', false);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update timestamp
DROP TRIGGER IF EXISTS update_tasks_updated_at ON tasks;
CREATE TRIGGER update_tasks_updated_at
    BEFORE UPDATE ON tasks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions (for production, be more restrictive)
-- GRANT SELECT, INSERT, UPDATE, DELETE ON tasks TO app_user;

\\echo 'Database initialized successfully!'`,
              },
            ],
            hints: [
              "PostgreSQL runs .sql files in /docker-entrypoint-initdb.d/ on first start",
              "Use SERIAL for auto-incrementing IDs in PostgreSQL",
            ],
            validation: {
              type: "file",
              filePath: "database/init.sql",
              description: "Database initialization script should exist",
            },
          },
          {
            id: "task-3-2",
            title: "Create Database Dockerfile (Optional)",
            description: "Create a custom PostgreSQL image with your initialization scripts.",
            instructions: [
              "Create a Dockerfile that extends the official PostgreSQL image",
              "Copy initialization scripts into the image",
              "Add custom configuration if needed",
            ],
            codeSnippets: [
              {
                language: "dockerfile",
                filename: "database/Dockerfile",
                code: `FROM postgres:15-alpine

LABEL maintainer="DevOps Academy"
LABEL description="PostgreSQL database for fullstack app"

# Copy initialization scripts
COPY init.sql /docker-entrypoint-initdb.d/01-init.sql

# Custom PostgreSQL configuration (optional)
# COPY postgresql.conf /etc/postgresql/postgresql.conf

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \\
  CMD pg_isready -U \${POSTGRES_USER:-postgres} -d \${POSTGRES_DB:-taskdb} || exit 1

# The base image handles EXPOSE 5432 and entrypoint`,
              },
            ],
            validation: {
              type: "command",
              command: "docker build -t database:test ./database",
              description: "Database Docker image should build successfully",
            },
          },
        ],
      },

      // ============ PHASE 4: FRONTEND APPLICATION ============
      {
        id: "phase-4",
        title: "Build the Frontend Application",
        description: "Create a React frontend with Vite and containerize it.",
        estimatedTime: "2-2.5 hours",
        tasks: [
          {
            id: "task-4-1",
            title: "Initialize React Frontend",
            description: "Create a new React application using Vite.",
            instructions: [
              "Navigate to the frontend directory",
              "Create a new Vite React project",
              "Install additional dependencies",
            ],
            codeSnippets: [
              {
                language: "bash",
                filename: "Terminal",
                code: `cd frontend

# Create Vite React app (choose React + JavaScript)
npm create vite@latest . -- --template react

# Install dependencies
npm install

# Install axios for API calls
npm install axios`,
              },
            ],
            validation: {
              type: "file",
              filePath: "frontend/package.json",
              description: "Frontend package.json should exist",
            },
          },
          {
            id: "task-4-2",
            title: "Create Task Manager UI",
            description: "Build the task management interface components.",
            instructions: [
              "Replace App.jsx with task manager component",
              "Add styling with CSS",
              "Implement API integration",
            ],
            codeSnippets: [
              {
                language: "jsx",
                filename: "frontend/src/App.jsx",
                code: `import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState({ title: '', description: '' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const response = await axios.get(\`\${API_URL}/api/tasks\`)
      setTasks(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch tasks. Is the backend running?')
      console.error('Error fetching tasks:', err)
    } finally {
      setLoading(false)
    }
  }

  const addTask = async (e) => {
    e.preventDefault()
    if (!newTask.title.trim()) return

    try {
      const response = await axios.post(\`\${API_URL}/api/tasks\`, newTask)
      setTasks([response.data, ...tasks])
      setNewTask({ title: '', description: '' })
    } catch (err) {
      setError('Failed to add task')
      console.error('Error adding task:', err)
    }
  }

  const toggleTask = async (id, completed) => {
    try {
      const response = await axios.put(\`\${API_URL}/api/tasks/\${id}\`, {
        completed: !completed
      })
      setTasks(tasks.map(t => t.id === id ? response.data : t))
    } catch (err) {
      setError('Failed to update task')
      console.error('Error updating task:', err)
    }
  }

  const deleteTask = async (id) => {
    try {
      await axios.delete(\`\${API_URL}/api/tasks/\${id}\`)
      setTasks(tasks.filter(t => t.id !== id))
    } catch (err) {
      setError('Failed to delete task')
      console.error('Error deleting task:', err)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>📋 Task Manager</h1>
        <p>A containerized full-stack application</p>
      </header>

      <main className="main">
        {error && (
          <div className="error">
            {error}
            <button onClick={() => setError(null)}>×</button>
          </div>
        )}

        <form className="add-task-form" onSubmit={addTask}>
          <input
            type="text"
            placeholder="Task title..."
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description (optional)..."
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <button type="submit">Add Task</button>
        </form>

        <div className="tasks-container">
          {loading ? (
            <div className="loading">Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="empty">No tasks yet. Add one above!</div>
          ) : (
            <ul className="task-list">
              {tasks.map(task => (
                <li key={task.id} className={\`task-item \${task.completed ? 'completed' : ''}\`}>
                  <div className="task-content">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id, task.completed)}
                    />
                    <div className="task-text">
                      <h3>{task.title}</h3>
                      {task.description && <p>{task.description}</p>}
                    </div>
                  </div>
                  <button 
                    className="delete-btn"
                    onClick={() => deleteTask(task.id)}
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="stats">
          <span>Total: {tasks.length}</span>
          <span>Completed: {tasks.filter(t => t.completed).length}</span>
          <span>Pending: {tasks.filter(t => !t.completed).length}</span>
        </div>
      </main>

      <footer className="footer">
        <p>Built with React + Express + PostgreSQL + Docker 🐳</p>
      </footer>
    </div>
  )
}

export default App`,
              },
              {
                language: "css",
                filename: "frontend/src/App.css",
                code: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  min-height: 100vh;
  color: #e8e8e8;
}

.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.header p {
  color: #888;
}

.error {
  background: #ff4757;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.error button {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.add-task-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.add-task-form input {
  flex: 1;
  padding: 1rem;
  border: 2px solid #333;
  border-radius: 8px;
  background: #0f0f23;
  color: white;
  font-size: 1rem;
}

.add-task-form input:focus {
  outline: none;
  border-color: #00d9ff;
}

.add-task-form button {
  padding: 1rem 2rem;
  background: #00d9ff;
  color: #0f0f23;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
}

.add-task-form button:hover {
  transform: scale(1.05);
}

.tasks-container {
  background: #0f0f23;
  border-radius: 12px;
  padding: 1rem;
  min-height: 200px;
}

.loading, .empty {
  text-align: center;
  padding: 3rem;
  color: #666;
}

.task-list {
  list-style: none;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #222;
  transition: background 0.2s;
}

.task-item:hover {
  background: #1a1a2e;
}

.task-item.completed .task-text h3 {
  text-decoration: line-through;
  opacity: 0.5;
}

.task-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.task-content input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.task-text h3 {
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.task-text p {
  font-size: 0.875rem;
  color: #888;
}

.delete-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s;
}

.delete-btn:hover {
  opacity: 1;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1.5rem;
  padding: 1rem;
  background: #0f0f23;
  border-radius: 8px;
}

.stats span {
  color: #888;
}

.footer {
  text-align: center;
  margin-top: 2rem;
  color: #666;
}`,
              },
            ],
            validation: {
              type: "file",
              filePath: "frontend/src/App.jsx",
              description: "React App component should exist",
            },
          },
          {
            id: "task-4-3",
            title: "Create Frontend Dockerfile",
            description: "Build a production-ready frontend container with Nginx.",
            instructions: [
              "Create a multi-stage Dockerfile",
              "Build the React app in the first stage",
              "Serve with Nginx in the production stage",
              "Add custom Nginx configuration",
            ],
            codeSnippets: [
              {
                language: "dockerfile",
                filename: "frontend/Dockerfile",
                code: `# ================================
# Stage 1: Build
# ================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# ================================
# Stage 2: Production
# ================================
FROM nginx:alpine AS production

LABEL maintainer="DevOps Academy"
LABEL description="Frontend React app served by Nginx"

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Add non-root user
RUN chown -R nginx:nginx /usr/share/nginx/html && \\
    chmod -R 755 /usr/share/nginx/html

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]`,
              },
              {
                language: "nginx",
                filename: "frontend/nginx.conf",
                code: `server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    gzip_min_length 1000;

    # Cache static assets
    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA routing - serve index.html for all routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\\n";
        add_header Content-Type text/plain;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}`,
              },
            ],
            validation: {
              type: "command",
              command: "docker build -t frontend:test ./frontend",
              description: "Frontend Docker image should build successfully",
            },
          },
        ],
      },

      // ============ PHASE 5: DOCKER COMPOSE ORCHESTRATION ============
      {
        id: "phase-5",
        title: "Docker Compose Orchestration",
        description: "Bring all services together with Docker Compose.",
        estimatedTime: "1.5-2 hours",
        tasks: [
          {
            id: "task-5-1",
            title: "Create Docker Compose Configuration",
            description: "Define all services, networks, and volumes in docker-compose.yml.",
            instructions: [
              "Create docker-compose.yml in the project root",
              "Define all three services (frontend, backend, database)",
              "Configure networking between services",
              "Set up volume persistence for the database",
              "Add environment variables",
            ],
            codeSnippets: [
              {
                language: "yaml",
                filename: "docker-compose.yml",
                code: `version: '3.8'

services:
  # ================================
  # Frontend Service
  # ================================
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: taskapp-frontend
    ports:
      - "3000:80"
    environment:
      - VITE_API_URL=http://localhost:5000
    depends_on:
      backend:
        condition: service_healthy
    networks:
      - taskapp-network
    restart: unless-stopped

  # ================================
  # Backend Service
  # ================================
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: taskapp-backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - PORT=5000
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_NAME=taskdb
      - DB_USER=postgres
      - DB_PASSWORD=\${DB_PASSWORD:-secretpassword}
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - taskapp-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:5000/health"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 10s

  # ================================
  # Database Service
  # ================================
  postgres:
    build:
      context: ./database
      dockerfile: Dockerfile
    container_name: taskapp-postgres
    environment:
      - POSTGRES_DB=taskdb
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=\${DB_PASSWORD:-secretpassword}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - taskapp-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d taskdb"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 10s

# ================================
# Networks
# ================================
networks:
  taskapp-network:
    driver: bridge
    name: taskapp-network

# ================================
# Volumes
# ================================
volumes:
  postgres_data:
    name: taskapp-postgres-data`,
              },
              {
                language: "yaml",
                filename: "docker-compose.dev.yml",
                code: `# Development overrides
version: '3.8'

services:
  frontend:
    build:
      target: builder  # Use builder stage for dev
    volumes:
      - ./frontend:/app
      - /app/node_modules
    command: npm run dev -- --host 0.0.0.0
    ports:
      - "3000:5173"
    environment:
      - VITE_API_URL=http://localhost:5000

  backend:
    volumes:
      - ./backend:/app
      - /app/node_modules
    command: npm run dev
    environment:
      - NODE_ENV=development

  postgres:
    ports:
      - "5432:5432"  # Expose for local dev tools`,
              },
            ],
            hints: [
              "Use depends_on with condition for startup order",
              "Health checks ensure services are ready before dependents start",
              "Volumes persist data across container restarts",
            ],
            validation: {
              type: "command",
              command: "docker compose config",
              description: "Docker Compose configuration should be valid",
            },
          },
          {
            id: "task-5-2",
            title: "Create Environment Configuration",
            description: "Set up environment files for different deployment scenarios.",
            instructions: [
              "Create .env file with default values",
              "Create .env.example for documentation",
              "Add environment-specific configurations",
            ],
            codeSnippets: [
              {
                language: "env",
                filename: ".env.example",
                code: `# Database Configuration
DB_PASSWORD=your_secure_password_here

# Application Settings
NODE_ENV=production

# Optional: Override ports
# FRONTEND_PORT=3000
# BACKEND_PORT=5000
# DB_PORT=5432`,
              },
              {
                language: "env",
                filename: ".env",
                code: `# Development defaults (DO NOT commit real passwords!)
DB_PASSWORD=devpassword123
NODE_ENV=development`,
              },
            ],
            validation: {
              type: "file",
              filePath: ".env.example",
              description: "Environment example file should exist",
            },
          },
          {
            id: "task-5-3",
            title: "Test the Complete Stack",
            description: "Build and run all services together.",
            instructions: [
              "Build all Docker images",
              "Start the complete stack",
              "Verify all services are running",
              "Test the application functionality",
            ],
            codeSnippets: [
              {
                language: "bash",
                filename: "Terminal",
                code: `# Build all images
docker compose build

# Start all services
docker compose up -d

# Check service status
docker compose ps

# View logs
docker compose logs -f

# Test health endpoints
curl http://localhost:5000/health
curl http://localhost:3000/health

# Check database connection
docker compose exec postgres psql -U postgres -d taskdb -c "SELECT * FROM tasks;"

# Stop all services
docker compose down

# Stop and remove volumes (clean slate)
docker compose down -v`,
              },
            ],
            validation: {
              type: "command",
              command: "docker compose ps",
              description: "All services should be running",
            },
          },
        ],
      },

      // ============ PHASE 6: SECURITY & OPTIMIZATION ============
      {
        id: "phase-6",
        title: "Security & Optimization",
        description: "Implement security best practices and optimize your images.",
        estimatedTime: "1-1.5 hours",
        tasks: [
          {
            id: "task-6-1",
            title: "Security Scan with Trivy",
            description: "Scan your Docker images for vulnerabilities.",
            instructions: [
              "Install Trivy (or use Docker version)",
              "Scan each image for vulnerabilities",
              "Review and address critical issues",
            ],
            codeSnippets: [
              {
                language: "bash",
                filename: "Terminal",
                code: `# Scan images with Trivy
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \\
  aquasec/trivy image taskapp-frontend:latest

docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \\
  aquasec/trivy image taskapp-backend:latest

# Or if Trivy is installed locally
trivy image taskapp-frontend:latest --severity HIGH,CRITICAL
trivy image taskapp-backend:latest --severity HIGH,CRITICAL`,
              },
            ],
            validation: {
              type: "manual",
              description: "Run security scans and review any findings",
            },
          },
          {
            id: "task-6-2",
            title: "Optimize Image Sizes",
            description: "Check and optimize your Docker image sizes.",
            instructions: [
              "Check current image sizes",
              "Use docker history to analyze layers",
              "Implement additional optimizations if needed",
            ],
            codeSnippets: [
              {
                language: "bash",
                filename: "Terminal",
                code: `# Check image sizes
docker images | grep taskapp

# Analyze image layers
docker history taskapp-backend:latest
docker history taskapp-frontend:latest

# Use dive for detailed analysis (optional)
docker run --rm -it \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  wagoodman/dive taskapp-backend:latest

# Target: Combined images < 200MB
# Backend: ~100MB (Node Alpine)
# Frontend: ~25MB (Nginx Alpine)
# Database: ~75MB (Postgres Alpine)`,
              },
            ],
            validation: {
              type: "command",
              command: "docker images | grep taskapp",
              description: "Check that combined image size is under 200MB",
            },
          },
        ],
      },
    ],
    bonusChallenges: [
      "Add Redis for session caching",
      "Implement a reverse proxy with Nginx in front of all services",
      "Add Prometheus metrics to the backend",
      "Create a GitHub Actions workflow to build and push images",
      "Deploy to a cloud provider (AWS ECS, Google Cloud Run, or Azure Container Apps)",
      "Add SSL/TLS with Let's Encrypt using Traefik",
    ],
    submissionChecklist: [
      "GitHub repository with complete source code",
      "README.md with clear setup instructions",
      "Architecture diagram (can be ASCII art in README)",
      "All Docker images build successfully",
      "Docker Compose starts all services without errors",
      "Health checks pass for all services",
      "Application is functional (can create/read/update/delete tasks)",
      "Images are optimized (< 200MB combined)",
      "Security scan completed with no critical vulnerabilities",
      "Demo video (optional but recommended)",
    ],
  },
  
  // Import additional project guides
  "project-2": project2Guide,
  "project-3": project3Guide,
  "project-4": project4Guide,
  "project-6": project6Guide,
  "project-8": project8Guide,
  "project-9": project9Guide,
  "project-11": project11Guide,
}

// Helper function to get a project guide
export function getProjectGuide(projectId: string): ProjectGuide | undefined {
  return projectGuides[projectId]
}

// Get all project IDs
export function getAllProjectIds(): string[] {
  return Object.keys(projectGuides)
}
