// Project 2: Automated CI/CD Pipeline
// Build a production-grade CI/CD pipeline with testing, security scanning, and deployment

import { ProjectGuide } from "../project-guides"

export const project2Guide: ProjectGuide = {
  projectId: "project-2",
  title: "Automated CI/CD Pipeline",
  overview: `Build a production-grade CI/CD pipeline that automates the entire software delivery process.
You'll create a multi-stage pipeline using GitHub Actions that includes linting, testing, security scanning, 
building container images, and deploying to multiple environments. This project teaches you real-world 
CI/CD practices used by DevOps teams in production.`,
  difficulty: "intermediate",
  totalTime: "6-8 hours",
  prerequisites: [
    "Basic Git and GitHub knowledge",
    "Understanding of Docker fundamentals",
    "Familiarity with YAML syntax",
    "Completed Project 1 (containerized application)",
  ],
  techStack: [
    "GitHub Actions",
    "Docker & Docker Hub",
    "Node.js (sample application)",
    "ESLint & Prettier",
    "Jest (testing)",
    "Trivy (security scanning)",
    "Semantic Release",
  ],
  architecture: `
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CI/CD Pipeline Flow                                  │
│                                                                              │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐              │
│  │  Commit  │───▶│   Lint   │───▶│   Test   │───▶│  Build   │              │
│  │  Push    │    │  Check   │    │  Suite   │    │  Image   │              │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘              │
│                                                        │                     │
│                                                        ▼                     │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐              │
│  │Production│◀───│  Manual  │◀───│ Staging  │◀───│ Security │              │
│  │  Deploy  │    │ Approval │    │  Deploy  │    │   Scan   │              │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘              │
│                                                                              │
│  Triggers: push to main, pull requests, manual dispatch                     │
└─────────────────────────────────────────────────────────────────────────────┘
`,
  phases: [
    // ============ PHASE 1: PROJECT SETUP ============
    {
      id: "phase-1",
      title: "Project Setup & Sample Application",
      description: "Set up the repository and create a sample Node.js application to deploy.",
      estimatedTime: "45 minutes",
      tasks: [
        {
          id: "task-1-1",
          title: "Create Repository Structure",
          description: "Set up the project repository with proper structure for CI/CD.",
          instructions: [
            "Create a new GitHub repository called 'cicd-pipeline-project'",
            "Clone the repository locally",
            "Create the directory structure for the application and workflows",
            "Initialize npm and create package.json",
          ],
          codeSnippets: [
            {
              language: "bash",
              filename: "setup.sh",
              code: `# Clone your repository
git clone https://github.com/YOUR_USERNAME/cicd-pipeline-project.git
cd cicd-pipeline-project

# Create directory structure
mkdir -p src tests .github/workflows

# Initialize Node.js project
npm init -y

# Install dependencies
npm install express cors helmet
npm install -D jest eslint prettier @types/jest typescript ts-jest
npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin`,
            },
          ],
          validation: {
            type: "command",
            command: "ls -la .github/workflows && cat package.json | head -20",
            description: "Verify directory structure and package.json exist",
          },
        },
        {
          id: "task-1-2",
          title: "Create Sample Express Application",
          description: "Build a simple REST API that we'll use throughout the pipeline.",
          instructions: [
            "Create the main application file with Express",
            "Add health check and API endpoints",
            "Create a separate server entry point",
            "Add TypeScript configuration",
          ],
          codeSnippets: [
            {
              language: "typescript",
              filename: "src/app.ts",
              code: `import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.APP_VERSION || '1.0.0'
  });
});

// API endpoints
app.get('/api/items', (req: Request, res: Response) => {
  res.json([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ]);
});

app.get('/api/items/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id < 1) {
    return res.status(400).json({ error: 'Invalid ID' });
  }
  res.json({ id, name: \`Item \${id}\` });
});

app.post('/api/items', (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  res.status(201).json({ id: Date.now(), name });
});

export default app;`,
            },
            {
              language: "typescript",
              filename: "src/server.ts",
              code: `import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(\`🚀 Server running on port \${PORT}\`);
  console.log(\`📊 Health check: http://localhost:\${PORT}/health\`);
});`,
            },
            {
              language: "json",
              filename: "tsconfig.json",
              code: `{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}`,
            },
          ],
          hints: [
            "Make sure to export the app separately from starting the server for testing",
            "Use environment variables for configuration",
          ],
          validation: {
            type: "command",
            command: "npx tsc --noEmit",
            description: "TypeScript should compile without errors",
          },
        },
        {
          id: "task-1-3",
          title: "Add Unit Tests",
          description: "Create comprehensive unit tests for the API endpoints.",
          instructions: [
            "Install testing dependencies (supertest)",
            "Configure Jest for TypeScript",
            "Write tests for all API endpoints",
            "Ensure test coverage meets requirements",
          ],
          codeSnippets: [
            {
              language: "bash",
              code: `npm install -D supertest @types/supertest`,
            },
            {
              language: "javascript",
              filename: "jest.config.js",
              code: `module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  verbose: true
};`,
            },
            {
              language: "typescript",
              filename: "tests/app.test.ts",
              code: `import request from 'supertest';
import app from '../src/app';

describe('Health Check', () => {
  it('should return healthy status', async () => {
    const response = await request(app).get('/health');
    
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('healthy');
    expect(response.body.timestamp).toBeDefined();
  });
});

describe('GET /api/items', () => {
  it('should return list of items', async () => {
    const response = await request(app).get('/api/items');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe('GET /api/items/:id', () => {
  it('should return a single item', async () => {
    const response = await request(app).get('/api/items/1');
    
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
    expect(response.body.name).toBeDefined();
  });

  it('should return 400 for invalid ID', async () => {
    const response = await request(app).get('/api/items/invalid');
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid ID');
  });
});

describe('POST /api/items', () => {
  it('should create a new item', async () => {
    const response = await request(app)
      .post('/api/items')
      .send({ name: 'New Item' });
    
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('New Item');
    expect(response.body.id).toBeDefined();
  });

  it('should return 400 when name is missing', async () => {
    const response = await request(app)
      .post('/api/items')
      .send({});
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Name is required');
  });
});`,
            },
          ],
          validation: {
            type: "command",
            command: "npm test -- --coverage",
            description: "All tests should pass with >80% coverage",
          },
        },
        {
          id: "task-1-4",
          title: "Configure Linting and Formatting",
          description: "Set up ESLint and Prettier for code quality.",
          instructions: [
            "Create ESLint configuration for TypeScript",
            "Create Prettier configuration",
            "Add npm scripts for linting",
            "Create .editorconfig for consistent formatting",
          ],
          codeSnippets: [
            {
              language: "javascript",
              filename: ".eslintrc.js",
              code: `module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'no-console': ['warn', { allow: ['log', 'error', 'warn'] }],
  },
  ignorePatterns: ['dist/', 'node_modules/', 'coverage/'],
};`,
            },
            {
              language: "json",
              filename: ".prettierrc",
              code: `{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}`,
            },
            {
              language: "json",
              filename: "package.json (scripts section)",
              code: `{
  "scripts": {
    "build": "tsc",
    "start": "node dist/server.js",
    "dev": "ts-node src/server.ts",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint 'src/**/*.ts' 'tests/**/*.ts'",
    "lint:fix": "eslint 'src/**/*.ts' 'tests/**/*.ts' --fix",
    "format": "prettier --write 'src/**/*.ts' 'tests/**/*.ts'",
    "format:check": "prettier --check 'src/**/*.ts' 'tests/**/*.ts'"
  }
}`,
            },
          ],
          validation: {
            type: "command",
            command: "npm run lint && npm run format:check",
            description: "Linting and format check should pass",
          },
        },
      ],
    },

    // ============ PHASE 2: DOCKERFILE & CONTAINER ============
    {
      id: "phase-2",
      title: "Containerization",
      description: "Create an optimized Dockerfile with multi-stage builds.",
      estimatedTime: "30 minutes",
      tasks: [
        {
          id: "task-2-1",
          title: "Create Multi-Stage Dockerfile",
          description: "Build an optimized Docker image using multi-stage builds.",
          instructions: [
            "Create a Dockerfile with build and production stages",
            "Use Alpine-based images for smaller size",
            "Include health check in the container",
            "Create .dockerignore to exclude unnecessary files",
          ],
          codeSnippets: [
            {
              language: "dockerfile",
              filename: "Dockerfile",
              code: `# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev)
RUN npm ci

# Copy source code
COPY tsconfig.json ./
COPY src ./src

# Build TypeScript
RUN npm run build

# Prune dev dependencies
RUN npm prune --production

# Stage 2: Production
FROM node:20-alpine AS production

# Add labels for container metadata
LABEL maintainer="your-email@example.com"
LABEL version="1.0.0"
LABEL description="CI/CD Pipeline Demo API"

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \\
    adduser -S nodejs -u 1001

WORKDIR /app

# Copy built assets from builder
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \\
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Start application
CMD ["node", "dist/server.js"]`,
            },
            {
              language: "text",
              filename: ".dockerignore",
              code: `node_modules
npm-debug.log
dist
coverage
.git
.gitignore
.env*
*.md
.eslintrc.js
.prettierrc
jest.config.js
tsconfig.json
tests
.github
Dockerfile*
docker-compose*`,
            },
          ],
          validation: {
            type: "command",
            command: "docker build -t cicd-demo:test . && docker images cicd-demo:test --format '{{.Size}}'",
            description: "Docker image should build and be under 200MB",
          },
        },
      ],
    },

    // ============ PHASE 3: BASIC CI PIPELINE ============
    {
      id: "phase-3",
      title: "Basic CI Pipeline",
      description: "Create the core GitHub Actions workflow for continuous integration.",
      estimatedTime: "1 hour",
      tasks: [
        {
          id: "task-3-1",
          title: "Create CI Workflow",
          description: "Build the main CI pipeline with lint, test, and build stages.",
          instructions: [
            "Create the GitHub Actions workflow file",
            "Add jobs for linting, testing, and building",
            "Configure caching for faster builds",
            "Add matrix testing for multiple Node versions",
          ],
          codeSnippets: [
            {
              language: "yaml",
              filename: ".github/workflows/ci.yml",
              code: `name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
  workflow_dispatch:

env:
  NODE_VERSION: '20'
  REGISTRY: docker.io
  IMAGE_NAME: \${{ github.repository }}

jobs:
  # ==================== LINT ====================
  lint:
    name: 🔍 Lint Code
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint

      - name: Check formatting
        run: npm run format:check

  # ==================== TEST ====================
  test:
    name: 🧪 Test (Node \${{ matrix.node-version }})
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20, 22]
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js \${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests with coverage
        run: npm run test:coverage

      - name: Upload coverage report
        uses: actions/upload-artifact@v4
        if: matrix.node-version == 20
        with:
          name: coverage-report
          path: coverage/
          retention-days: 7

  # ==================== BUILD ====================
  build:
    name: 🏗️ Build Application
    runs-on: ubuntu-latest
    needs: [lint, test]
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/
          retention-days: 7`,
            },
          ],
          hints: [
            "Use 'needs' to create dependencies between jobs",
            "Cache npm dependencies to speed up builds",
            "Matrix strategy allows testing across multiple versions",
          ],
          validation: {
            type: "file",
            filePath: ".github/workflows/ci.yml",
            description: "CI workflow file should exist",
          },
        },
      ],
    },

    // ============ PHASE 4: DOCKER BUILD & SECURITY ============
    {
      id: "phase-4",
      title: "Container Build & Security Scanning",
      description: "Add Docker image building and security vulnerability scanning.",
      estimatedTime: "1 hour",
      tasks: [
        {
          id: "task-4-1",
          title: "Add Docker Build Job",
          description: "Build and push Docker images to a container registry.",
          instructions: [
            "Add Docker build job to the workflow",
            "Configure Docker Hub authentication",
            "Add image tagging with Git SHA and semantic version",
            "Push images to Docker Hub",
          ],
          codeSnippets: [
            {
              language: "yaml",
              filename: ".github/workflows/ci.yml (add to existing)",
              code: `  # ==================== DOCKER BUILD ====================
  docker-build:
    name: 🐳 Build Docker Image
    runs-on: ubuntu-latest
    needs: [build]
    permissions:
      contents: read
      packages: write
    outputs:
      image-tag: \${{ steps.meta.outputs.tags }}
      image-digest: \${{ steps.build-push.outputs.digest }}
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to Docker Hub
        if: github.event_name != 'pull_request'
        uses: docker/login-action@v3
        with:
          username: \${{ secrets.DOCKERHUB_USERNAME }}
          password: \${{ secrets.DOCKERHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}
          tags: |
            type=sha,prefix=
            type=ref,event=branch
            type=ref,event=pr
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}

      - name: Build and push
        id: build-push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: \${{ github.event_name != 'pull_request' }}
          tags: \${{ steps.meta.outputs.tags }}
          labels: \${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
          platforms: linux/amd64,linux/arm64`,
            },
          ],
          hints: [
            "Create DOCKERHUB_USERNAME and DOCKERHUB_TOKEN secrets in GitHub",
            "Use Docker Buildx for multi-platform builds",
            "GHA cache speeds up subsequent builds significantly",
          ],
        },
        {
          id: "task-4-2",
          title: "Add Security Scanning",
          description: "Integrate Trivy for container vulnerability scanning.",
          instructions: [
            "Add Trivy scanner job to the workflow",
            "Configure vulnerability thresholds",
            "Generate security reports",
            "Fail pipeline on critical vulnerabilities",
          ],
          codeSnippets: [
            {
              language: "yaml",
              filename: ".github/workflows/ci.yml (add to existing)",
              code: `  # ==================== SECURITY SCAN ====================
  security-scan:
    name: 🔒 Security Scan
    runs-on: ubuntu-latest
    needs: [docker-build]
    if: github.event_name != 'pull_request'
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: '\${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:sha-\${{ github.sha }}'
          format: 'sarif'
          output: 'trivy-results.sarif'
          severity: 'CRITICAL,HIGH'
          exit-code: '1'

      - name: Upload Trivy scan results
        uses: github/codeql-action/upload-sarif@v2
        if: always()
        with:
          sarif_file: 'trivy-results.sarif'

      - name: Run Trivy in table format
        uses: aquasecurity/trivy-action@master
        if: always()
        with:
          image-ref: '\${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:sha-\${{ github.sha }}'
          format: 'table'
          severity: 'CRITICAL,HIGH,MEDIUM'

  # ==================== CODE QUALITY ====================
  code-quality:
    name: 📊 Code Quality
    runs-on: ubuntu-latest
    needs: [lint]
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: \${{ secrets.SONAR_TOKEN }}
        continue-on-error: true`,
            },
          ],
          resources: [
            { title: "Trivy Documentation", url: "https://aquasecurity.github.io/trivy/" },
            { title: "GitHub Security Features", url: "https://docs.github.com/en/code-security" },
          ],
        },
      ],
    },

    // ============ PHASE 5: DEPLOYMENT ============
    {
      id: "phase-5",
      title: "Deployment Stages",
      description: "Add staging and production deployment with manual approval.",
      estimatedTime: "1.5 hours",
      tasks: [
        {
          id: "task-5-1",
          title: "Create Deployment Workflow",
          description: "Create a separate workflow for deployments with environments.",
          instructions: [
            "Create a deployment workflow file",
            "Configure staging environment with auto-deploy",
            "Configure production environment with manual approval",
            "Add deployment notifications",
          ],
          codeSnippets: [
            {
              language: "yaml",
              filename: ".github/workflows/deploy.yml",
              code: `name: Deploy

on:
  workflow_run:
    workflows: ["CI Pipeline"]
    types: [completed]
    branches: [main]
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to deploy to'
        required: true
        default: 'staging'
        type: choice
        options:
          - staging
          - production

env:
  REGISTRY: docker.io
  IMAGE_NAME: \${{ github.repository }}

jobs:
  # ==================== DEPLOY TO STAGING ====================
  deploy-staging:
    name: 🚀 Deploy to Staging
    runs-on: ubuntu-latest
    if: \${{ github.event.workflow_run.conclusion == 'success' || github.event_name == 'workflow_dispatch' }}
    environment:
      name: staging
      url: https://staging.your-app.com
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Deploy to Staging
        run: |
          echo "🚀 Deploying to Staging environment..."
          echo "Image: \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:sha-\${{ github.sha }}"
          
          # Example: Deploy to cloud provider
          # aws ecs update-service --cluster staging --service api --force-new-deployment
          # OR
          # kubectl set image deployment/api api=\$IMAGE --namespace=staging
          
          echo "✅ Staging deployment complete!"

      - name: Run smoke tests
        run: |
          echo "🧪 Running smoke tests against staging..."
          # curl -f https://staging.your-app.com/health || exit 1
          echo "✅ Smoke tests passed!"

      - name: Notify Slack
        if: always()
        uses: 8398a7/action-slack@v3
        with:
          status: \${{ job.status }}
          text: 'Staging deployment \${{ job.status }}'
          fields: repo,message,commit,author,action,eventName,ref,workflow
        env:
          SLACK_WEBHOOK_URL: \${{ secrets.SLACK_WEBHOOK }}
        continue-on-error: true

  # ==================== DEPLOY TO PRODUCTION ====================
  deploy-production:
    name: 🌟 Deploy to Production
    runs-on: ubuntu-latest
    needs: [deploy-staging]
    if: \${{ github.ref == 'refs/heads/main' }}
    environment:
      name: production
      url: https://your-app.com
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Deploy to Production
        run: |
          echo "🌟 Deploying to Production environment..."
          echo "Image: \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:sha-\${{ github.sha }}"
          
          # Example: Deploy to cloud provider with canary
          # kubectl set image deployment/api api=\$IMAGE --namespace=production
          
          echo "✅ Production deployment complete!"

      - name: Verify deployment
        run: |
          echo "🔍 Verifying production deployment..."
          # curl -f https://your-app.com/health || exit 1
          echo "✅ Production is healthy!"

      - name: Create GitHub Release
        uses: actions/create-release@v1
        if: success()
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: v\${{ github.run_number }}
          release_name: Release v\${{ github.run_number }}
          body: |
            ## Changes
            - Deployed commit: \${{ github.sha }}
            - Triggered by: \${{ github.actor }}
          draft: false
          prerelease: false
        continue-on-error: true`,
            },
          ],
          hints: [
            "GitHub Environments provide manual approval gates",
            "Configure required reviewers in repository settings",
            "Use environment secrets for deployment credentials",
          ],
        },
        {
          id: "task-5-2",
          title: "Configure GitHub Environments",
          description: "Set up staging and production environments with protection rules.",
          instructions: [
            "Go to your repository Settings > Environments",
            "Create 'staging' environment",
            "Create 'production' environment with protection rules",
            "Add required reviewers for production",
          ],
          codeSnippets: [
            {
              language: "text",
              filename: "Environment Configuration Steps",
              code: `1. Go to: Repository > Settings > Environments

2. Create "staging" environment:
   - Click "New environment"
   - Name: staging
   - No protection rules needed (auto-deploy)

3. Create "production" environment:
   - Click "New environment"
   - Name: production
   - Enable "Required reviewers"
   - Add yourself or team members as reviewers
   - Optional: Enable "Wait timer" (e.g., 5 minutes)
   - Optional: Restrict to specific branches (main only)

4. Add environment secrets:
   - DOCKERHUB_USERNAME
   - DOCKERHUB_TOKEN
   - SLACK_WEBHOOK (optional)
   - Cloud provider credentials`,
            },
          ],
          validation: {
            type: "manual",
            description: "Verify environments are created in GitHub Settings",
          },
        },
      ],
    },

    // ============ PHASE 6: SEMANTIC VERSIONING ============
    {
      id: "phase-6",
      title: "Semantic Versioning & Release",
      description: "Implement automated semantic versioning and changelog generation.",
      estimatedTime: "1 hour",
      tasks: [
        {
          id: "task-6-1",
          title: "Configure Semantic Release",
          description: "Set up automated version bumping and changelog generation.",
          instructions: [
            "Install semantic-release packages",
            "Create release configuration",
            "Add release workflow",
            "Use conventional commits",
          ],
          codeSnippets: [
            {
              language: "bash",
              code: `npm install -D semantic-release @semantic-release/git @semantic-release/changelog`,
            },
            {
              language: "json",
              filename: ".releaserc.json",
              code: `{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/changelog",
      {
        "changelogFile": "CHANGELOG.md"
      }
    ],
    [
      "@semantic-release/npm",
      {
        "npmPublish": false
      }
    ],
    [
      "@semantic-release/git",
      {
        "assets": ["package.json", "CHANGELOG.md"],
        "message": "chore(release): \${nextRelease.version} [skip ci]\\n\\n\${nextRelease.notes}"
      }
    ],
    "@semantic-release/github"
  ]
}`,
            },
            {
              language: "yaml",
              filename: ".github/workflows/release.yml",
              code: `name: Release

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: write
  issues: write
  pull-requests: write

jobs:
  release:
    name: 📦 Semantic Release
    runs-on: ubuntu-latest
    if: "!contains(github.event.head_commit.message, '[skip ci]')"
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          persist-credentials: false

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run semantic-release
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
        run: npx semantic-release`,
            },
            {
              language: "text",
              filename: "Conventional Commit Examples",
              code: `# Commit message format: type(scope): description

# Patch release (1.0.0 -> 1.0.1)
fix(api): handle null response from database
fix: correct typo in error message

# Minor release (1.0.0 -> 1.1.0)
feat(auth): add OAuth2 support
feat: add pagination to items endpoint

# Major release (1.0.0 -> 2.0.0)
feat!: remove deprecated v1 endpoints
BREAKING CHANGE: API now requires authentication

# No release
docs: update README
chore: update dependencies
ci: add caching to workflow
test: add unit tests for user service`,
            },
          ],
          resources: [
            { title: "Semantic Release", url: "https://semantic-release.gitbook.io/" },
            { title: "Conventional Commits", url: "https://www.conventionalcommits.org/" },
          ],
        },
      ],
    },
  ],
  bonusChallenges: [
    "Add end-to-end tests with Playwright or Cypress",
    "Implement blue-green or canary deployments",
    "Add performance testing with k6 or Artillery",
    "Set up GitLab CI/CD as an alternative",
    "Add dependency scanning with Dependabot",
    "Implement feature flags with LaunchDarkly or Unleash",
    "Add infrastructure as code for cloud resources",
    "Set up branch protection rules with status checks",
  ],
  submissionChecklist: [
    "GitHub repository with complete source code",
    "CI workflow runs successfully on push and PR",
    "All tests pass with >80% coverage",
    "ESLint and Prettier checks pass",
    "Docker image builds and is under 200MB",
    "Security scan completes (may have warnings)",
    "Staging deployment job configured",
    "Production deployment with manual approval",
    "Semantic versioning configured",
    "CHANGELOG.md generated",
    "README.md with pipeline documentation",
    "Demo showing successful pipeline run",
  ],
}
