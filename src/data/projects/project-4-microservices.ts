// Project 4: Microservices E-Commerce Platform
// Build a production-grade microservices application with full DevOps pipeline

import { ProjectGuide } from "../project-guides"

export const project4Guide: ProjectGuide = {
  projectId: "project-4",
  title: "Microservices E-Commerce Platform",
  overview: `Build a complete microservices-based e-commerce platform with multiple services communicating 
via REST and message queues. You'll implement user authentication, product catalog, shopping cart, 
and order management services, all orchestrated on Kubernetes with GitOps, service mesh, and 
full observability. This project teaches enterprise-level microservices architecture.`,
  difficulty: "advanced",
  totalTime: "15-18 hours",
  prerequisites: [
    "Completed Projects 1-3",
    "Kubernetes fundamentals (pods, services, deployments)",
    "Docker and containerization mastery",
    "Basic understanding of message queues",
    "Familiarity with REST API design",
  ],
  techStack: [
    "Kubernetes (EKS/GKE/Minikube)",
    "Docker",
    "Node.js / Python (microservices)",
    "PostgreSQL & Redis",
    "RabbitMQ / Kafka",
    "Kong / Ambassador (API Gateway)",
    "Istio (Service Mesh)",
    "ArgoCD (GitOps)",
    "Jaeger (Distributed Tracing)",
    "Prometheus & Grafana",
  ],
  architecture: `
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                        Microservices E-Commerce Architecture                        │
│                                                                                      │
│  ┌────────────────────────────────────────────────────────────────────────────────┐ │
│  │                              Kubernetes Cluster                                 │ │
│  │                                                                                 │ │
│  │   ┌─────────────────────────────────────────────────────────────────────────┐  │ │
│  │   │                     Ingress / API Gateway (Kong)                        │  │ │
│  │   └────────────────────────────────┬────────────────────────────────────────┘  │ │
│  │                                    │                                            │ │
│  │   ┌────────────────────────────────┼────────────────────────────────────────┐  │ │
│  │   │                     Service Mesh (Istio)                                │  │ │
│  │   │                                │                                         │  │ │
│  │   │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │  │ │
│  │   │  │  User    │  │ Product  │  │   Cart   │  │  Order   │  │ Payment  │  │  │ │
│  │   │  │ Service  │  │ Service  │  │ Service  │  │ Service  │  │ Service  │  │  │ │
│  │   │  │ (Auth)   │  │ (Catalog)│  │          │  │          │  │  (Mock)  │  │  │ │
│  │   │  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘  │  │ │
│  │   │       │              │              │              │              │       │  │ │
│  │   └───────┼──────────────┼──────────────┼──────────────┼──────────────┼───────┘  │ │
│  │           │              │              │              │              │          │ │
│  │   ┌───────┴──────────────┴──────────────┴──────────────┴──────────────┴───────┐  │ │
│  │   │                        Message Queue (RabbitMQ)                           │  │ │
│  │   └───────────────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                                   │ │
│  │   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                             │ │
│  │   │ PostgreSQL  │  │    Redis    │  │  MongoDB    │                             │ │
│  │   │  (Users,    │  │  (Sessions, │  │  (Products) │                             │ │
│  │   │   Orders)   │  │   Carts)    │  │             │                             │ │
│  │   └─────────────┘  └─────────────┘  └─────────────┘                             │ │
│  │                                                                                   │ │
│  │   ┌─────────────────────────────────────────────────────────────────────────┐   │ │
│  │   │                Observability Stack                                       │   │ │
│  │   │  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐             │   │ │
│  │   │  │Prometheus │  │  Grafana  │  │   Jaeger  │  │   Loki    │             │   │ │
│  │   │  └───────────┘  └───────────┘  └───────────┘  └───────────┘             │   │ │
│  │   └─────────────────────────────────────────────────────────────────────────┘   │ │
│  └─────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                      │
│   ┌────────────────┐                                                                 │
│   │    ArgoCD      │ ◀─── GitOps: Syncs from Git repository                        │
│   │   (GitOps)     │                                                                 │
│   └────────────────┘                                                                 │
└─────────────────────────────────────────────────────────────────────────────────────┘
`,
  phases: [
    // ============ PHASE 1: PROJECT SETUP ============
    {
      id: "phase-1",
      title: "Project Structure & Base Setup",
      description: "Set up the monorepo structure and Kubernetes cluster.",
      estimatedTime: "1.5 hours",
      tasks: [
        {
          id: "task-1-1",
          title: "Create Monorepo Structure",
          description: "Set up the project with a monorepo structure for all microservices.",
          instructions: [
            "Create the main project directory",
            "Set up directories for each microservice",
            "Create shared libraries directory",
            "Initialize Git and create .gitignore",
          ],
          codeSnippets: [
            {
              language: "bash",
              filename: "setup-project.sh",
              code: `#!/bin/bash
# Create project structure
mkdir -p ecommerce-platform/{services,k8s,shared,scripts,docs}

cd ecommerce-platform

# Create service directories
for service in user-service product-service cart-service order-service payment-service; do
  mkdir -p services/\$service/{src,tests,config}
  touch services/\$service/{Dockerfile,package.json,.env.example}
done

# Create k8s directories
mkdir -p k8s/{base,overlays/{dev,staging,prod},argocd}

# Create shared libraries
mkdir -p shared/{utils,proto,types}

# Initialize git
git init

# Create .gitignore
cat > .gitignore << 'EOF'
node_modules/
dist/
.env
*.log
.DS_Store
coverage/
.nyc_output/
*.local
EOF

echo "✅ Project structure created!"
tree -L 3`,
            },
          ],
        },
        {
          id: "task-1-2",
          title: "Set Up Local Kubernetes Cluster",
          description: "Create a local Kubernetes cluster for development.",
          instructions: [
            "Install and start Minikube or Kind",
            "Enable required addons",
            "Verify cluster is running",
            "Set up kubectl context",
          ],
          codeSnippets: [
            {
              language: "bash",
              filename: "setup-k8s.sh",
              code: `# Option 1: Minikube
minikube start --cpus=4 --memory=8192 --driver=docker

# Enable addons
minikube addons enable ingress
minikube addons enable metrics-server
minikube addons enable dashboard

# Option 2: Kind (Kubernetes in Docker)
cat > kind-config.yaml << 'EOF'
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
  - role: control-plane
    kubeadmConfigPatches:
      - |
        kind: InitConfiguration
        nodeRegistration:
          kubeletExtraArgs:
            node-labels: "ingress-ready=true"
    extraPortMappings:
      - containerPort: 80
        hostPort: 80
        protocol: TCP
      - containerPort: 443
        hostPort: 443
        protocol: TCP
  - role: worker
  - role: worker
EOF

kind create cluster --config kind-config.yaml --name ecommerce

# Verify cluster
kubectl cluster-info
kubectl get nodes
kubectl get pods -A`,
            },
          ],
          validation: {
            type: "command",
            command: "kubectl get nodes",
            description: "Should show cluster nodes in Ready state",
          },
        },
        {
          id: "task-1-3",
          title: "Create Namespace Structure",
          description: "Set up Kubernetes namespaces for the platform.",
          instructions: [
            "Create namespaces for services, infrastructure, and observability",
            "Apply resource quotas and limits",
            "Set up network policies",
          ],
          codeSnippets: [
            {
              language: "yaml",
              filename: "k8s/base/namespaces.yaml",
              code: `---
apiVersion: v1
kind: Namespace
metadata:
  name: ecommerce
  labels:
    app.kubernetes.io/part-of: ecommerce-platform
    istio-injection: enabled
---
apiVersion: v1
kind: Namespace
metadata:
  name: ecommerce-infra
  labels:
    app.kubernetes.io/part-of: ecommerce-platform
---
apiVersion: v1
kind: Namespace
metadata:
  name: observability
  labels:
    app.kubernetes.io/part-of: ecommerce-platform
---
apiVersion: v1
kind: Namespace
metadata:
  name: argocd
  labels:
    app.kubernetes.io/part-of: ecommerce-platform`,
            },
            {
              language: "yaml",
              filename: "k8s/base/resource-quota.yaml",
              code: `apiVersion: v1
kind: ResourceQuota
metadata:
  name: ecommerce-quota
  namespace: ecommerce
spec:
  hard:
    requests.cpu: "8"
    requests.memory: 16Gi
    limits.cpu: "16"
    limits.memory: 32Gi
    pods: "50"
    services: "20"
    secrets: "50"
    configmaps: "50"`,
            },
            {
              language: "yaml",
              filename: "k8s/base/limit-range.yaml",
              code: `apiVersion: v1
kind: LimitRange
metadata:
  name: default-limits
  namespace: ecommerce
spec:
  limits:
    - default:
        cpu: 500m
        memory: 512Mi
      defaultRequest:
        cpu: 100m
        memory: 128Mi
      type: Container`,
            },
          ],
          validation: {
            type: "command",
            command: "kubectl apply -f k8s/base/namespaces.yaml && kubectl get ns",
            description: "Namespaces should be created",
          },
        },
      ],
    },

    // ============ PHASE 2: USER SERVICE ============
    {
      id: "phase-2",
      title: "User Service (Authentication)",
      description: "Build the user authentication microservice with JWT.",
      estimatedTime: "2 hours",
      tasks: [
        {
          id: "task-2-1",
          title: "Create User Service Application",
          description: "Build the user authentication service with registration and login.",
          instructions: [
            "Create Express.js application with TypeScript",
            "Implement user registration and login",
            "Add JWT token generation and validation",
            "Create health check endpoints",
          ],
          codeSnippets: [
            {
              language: "json",
              filename: "services/user-service/package.json",
              code: `{
  "name": "user-service",
  "version": "1.0.0",
  "scripts": {
    "build": "tsc",
    "start": "node dist/server.js",
    "dev": "ts-node-dev --respawn src/server.ts",
    "test": "jest",
    "migrate": "prisma migrate deploy",
    "generate": "prisma generate"
  },
  "dependencies": {
    "express": "^4.18.2",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "@prisma/client": "^5.7.0",
    "helmet": "^7.1.0",
    "cors": "^2.8.5",
    "express-validator": "^7.0.1",
    "pino": "^8.16.2",
    "pino-http": "^8.5.1",
    "prom-client": "^15.1.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/bcryptjs": "^2.4.6",
    "@types/jsonwebtoken": "^9.0.5",
    "typescript": "^5.3.2",
    "ts-node-dev": "^2.0.0",
    "prisma": "^5.7.0",
    "jest": "^29.7.0",
    "@types/jest": "^29.5.11"
  }
}`,
            },
            {
              language: "typescript",
              filename: "services/user-service/src/app.ts",
              code: `import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import pinoHttp from 'pino-http';
import { register, collectDefaultMetrics } from 'prom-client';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';

// Collect default metrics
collectDefaultMetrics();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(pinoHttp());

// Health checks
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'healthy', service: 'user-service', timestamp: new Date().toISOString() });
});

app.get('/ready', async (req: Request, res: Response) => {
  try {
    // Check database connection
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    await prisma.$queryRaw\`SELECT 1\`;
    await prisma.$disconnect();
    res.json({ status: 'ready' });
  } catch (error) {
    res.status(503).json({ status: 'not ready', error: 'Database connection failed' });
  }
});

// Prometheus metrics
app.get('/metrics', async (req: Request, res: Response) => {
  res.set('Content-Type', register.contentType);
  res.send(await register.metrics());
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;`,
            },
            {
              language: "typescript",
              filename: "services/user-service/src/routes/auth.ts",
              code: `import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

// Register
router.post('/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }),
    body('name').trim().isLength({ min: 2 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name } = req.body;

    try {
      // Check if user exists
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ error: 'Email already registered' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
        },
      });

      // Generate token
      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });

      res.status(201).json({ user, token });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Registration failed' });
    }
  }
);

// Login
router.post('/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').exists(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });

      res.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token,
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  }
);

// Verify token
router.get('/verify', async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.substring(7);
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, name: true },
    });
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    res.json({ valid: true, user });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;`,
            },
            {
              language: "prisma",
              filename: "services/user-service/prisma/schema.prisma",
              code: `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@index([email])
}

enum Role {
  USER
  ADMIN
}`,
            },
          ],
        },
        {
          id: "task-2-2",
          title: "Create User Service Dockerfile",
          description: "Containerize the user service with multi-stage build.",
          instructions: [
            "Create optimized Dockerfile",
            "Add health check",
            "Build and test locally",
          ],
          codeSnippets: [
            {
              language: "dockerfile",
              filename: "services/user-service/Dockerfile",
              code: `# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

COPY tsconfig.json ./
COPY src ./src

RUN npm run generate
RUN npm run build

# Production stage
FROM node:20-alpine AS production

LABEL org.opencontainers.image.source="https://github.com/your-org/ecommerce-platform"
LABEL org.opencontainers.image.description="User Service for E-Commerce Platform"

RUN addgroup -g 1001 -S nodejs && \\
    adduser -S nodejs -u 1001

WORKDIR /app

COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./
COPY --from=builder --chown=nodejs:nodejs /app/prisma ./prisma

ENV NODE_ENV=production
ENV PORT=3000

USER nodejs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \\
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["node", "dist/server.js"]`,
            },
          ],
        },
        {
          id: "task-2-3",
          title: "Create Kubernetes Manifests for User Service",
          description: "Deploy user service to Kubernetes.",
          instructions: [
            "Create deployment manifest",
            "Create service manifest",
            "Create config and secrets",
            "Add horizontal pod autoscaler",
          ],
          codeSnippets: [
            {
              language: "yaml",
              filename: "k8s/base/user-service/deployment.yaml",
              code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
  namespace: ecommerce
  labels:
    app: user-service
    version: v1
spec:
  replicas: 2
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
        version: v1
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "3000"
        prometheus.io/path: "/metrics"
    spec:
      serviceAccountName: user-service
      containers:
        - name: user-service
          image: user-service:latest
          imagePullPolicy: Always
          ports:
            - containerPort: 3000
              name: http
          env:
            - name: NODE_ENV
              value: production
            - name: PORT
              value: "3000"
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: user-service-secrets
                  key: database-url
            - name: JWT_SECRET
              valueFrom:
                secretKeyRef:
                  name: user-service-secrets
                  key: jwt-secret
          resources:
            requests:
              cpu: 100m
              memory: 128Mi
            limits:
              cpu: 500m
              memory: 512Mi
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 30
            periodSeconds: 10
            timeoutSeconds: 5
            failureThreshold: 3
          readinessProbe:
            httpGet:
              path: /ready
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 5
            timeoutSeconds: 3
            failureThreshold: 3
          securityContext:
            runAsNonRoot: true
            runAsUser: 1001
            readOnlyRootFilesystem: true
            allowPrivilegeEscalation: false
      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
            - weight: 100
              podAffinityTerm:
                labelSelector:
                  matchLabels:
                    app: user-service
                topologyKey: kubernetes.io/hostname`,
            },
            {
              language: "yaml",
              filename: "k8s/base/user-service/service.yaml",
              code: `apiVersion: v1
kind: Service
metadata:
  name: user-service
  namespace: ecommerce
  labels:
    app: user-service
spec:
  type: ClusterIP
  ports:
    - port: 80
      targetPort: 3000
      protocol: TCP
      name: http
  selector:
    app: user-service
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: user-service
  namespace: ecommerce`,
            },
            {
              language: "yaml",
              filename: "k8s/base/user-service/hpa.yaml",
              code: `apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: user-service-hpa
  namespace: ecommerce
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: user-service
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
        - type: Percent
          value: 50
          periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
        - type: Percent
          value: 100
          periodSeconds: 15`,
            },
          ],
        },
      ],
    },

    // ============ PHASE 3: PRODUCT SERVICE ============
    {
      id: "phase-3",
      title: "Product Catalog Service",
      description: "Build the product catalog service with search and filtering.",
      estimatedTime: "2 hours",
      tasks: [
        {
          id: "task-3-1",
          title: "Create Product Service",
          description: "Build a product catalog service with CRUD operations.",
          instructions: [
            "Create product service with Express/FastAPI",
            "Implement product CRUD operations",
            "Add search and filtering",
            "Create category management",
          ],
          codeSnippets: [
            {
              language: "typescript",
              filename: "services/product-service/src/routes/products.ts",
              code: `import { Router, Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// List products with pagination and filtering
router.get('/', async (req: Request, res: Response) => {
  const { page = '1', limit = '20', category, search, minPrice, maxPrice, sort } = req.query;

  const pageNum = parseInt(page as string);
  const limitNum = Math.min(parseInt(limit as string), 100);
  const skip = (pageNum - 1) * limitNum;

  const where: Prisma.ProductWhereInput = {
    isActive: true,
    ...(category && { categoryId: category as string }),
    ...(search && {
      OR: [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
      ],
    }),
    ...(minPrice || maxPrice) && {
      price: {
        ...(minPrice && { gte: parseFloat(minPrice as string) }),
        ...(maxPrice && { lte: parseFloat(maxPrice as string) }),
      },
    },
  };

  const orderBy: Prisma.ProductOrderByWithRelationInput = (() => {
    switch (sort) {
      case 'price_asc': return { price: 'asc' };
      case 'price_desc': return { price: 'desc' };
      case 'name': return { name: 'asc' };
      case 'newest': return { createdAt: 'desc' };
      default: return { createdAt: 'desc' };
    }
  })();

  try {
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: limitNum,
        include: {
          category: {
            select: { id: true, name: true },
          },
        },
      }),
      prisma.product.count({ where }),
    ]);

    res.json({
      products,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Error listing products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get single product
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: {
        category: true,
      },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Create product (admin only)
router.post('/', async (req: Request, res: Response) => {
  const { name, description, price, stock, categoryId, imageUrl } = req.body;

  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        categoryId,
        imageUrl,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Update product
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Update stock (called by order service)
router.patch('/:id/stock', async (req: Request, res: Response) => {
  const { quantity } = req.body;

  try {
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: {
        stock: {
          decrement: quantity,
        },
      },
    });

    if (product.stock < 0) {
      // Rollback
      await prisma.product.update({
        where: { id: req.params.id },
        data: { stock: { increment: quantity } },
      });
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    res.json({ success: true, newStock: product.stock });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update stock' });
  }
});

export default router;`,
            },
          ],
        },
      ],
    },

    // ============ PHASE 4: CART & ORDER SERVICES ============
    {
      id: "phase-4",
      title: "Cart and Order Services",
      description: "Build shopping cart with Redis and order management with event-driven updates.",
      estimatedTime: "2.5 hours",
      tasks: [
        {
          id: "task-4-1",
          title: "Create Cart Service with Redis",
          description: "Build a session-based cart service using Redis.",
          instructions: [
            "Set up Redis client",
            "Implement cart add/update/remove",
            "Calculate cart totals",
            "Handle cart expiration",
          ],
          codeSnippets: [
            {
              language: "typescript",
              filename: "services/cart-service/src/cart.ts",
              code: `import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
const CART_TTL = 60 * 60 * 24 * 7; // 7 days

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface Cart {
  userId: string;
  items: CartItem[];
  updatedAt: string;
}

export class CartService {
  private getCartKey(userId: string): string {
    return \`cart:\${userId}\`;
  }

  async getCart(userId: string): Promise<Cart> {
    const data = await redis.get(this.getCartKey(userId));
    if (!data) {
      return { userId, items: [], updatedAt: new Date().toISOString() };
    }
    return JSON.parse(data);
  }

  async addToCart(userId: string, item: CartItem): Promise<Cart> {
    const cart = await this.getCart(userId);
    
    const existingIndex = cart.items.findIndex(i => i.productId === item.productId);
    if (existingIndex >= 0) {
      cart.items[existingIndex].quantity += item.quantity;
    } else {
      cart.items.push(item);
    }

    cart.updatedAt = new Date().toISOString();
    await redis.setex(this.getCartKey(userId), CART_TTL, JSON.stringify(cart));
    
    return cart;
  }

  async updateQuantity(userId: string, productId: string, quantity: number): Promise<Cart> {
    const cart = await this.getCart(userId);
    
    const itemIndex = cart.items.findIndex(i => i.productId === productId);
    if (itemIndex < 0) {
      throw new Error('Item not in cart');
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    cart.updatedAt = new Date().toISOString();
    await redis.setex(this.getCartKey(userId), CART_TTL, JSON.stringify(cart));
    
    return cart;
  }

  async removeFromCart(userId: string, productId: string): Promise<Cart> {
    return this.updateQuantity(userId, productId, 0);
  }

  async clearCart(userId: string): Promise<void> {
    await redis.del(this.getCartKey(userId));
  }

  getCartTotal(cart: Cart): { subtotal: number; itemCount: number } {
    const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    return { subtotal, itemCount };
  }
}`,
            },
          ],
        },
        {
          id: "task-4-2",
          title: "Create Order Service with Event Publishing",
          description: "Build order management with RabbitMQ event publishing.",
          instructions: [
            "Set up RabbitMQ connection",
            "Create order from cart",
            "Publish order events",
            "Handle order status updates",
          ],
          codeSnippets: [
            {
              language: "typescript",
              filename: "services/order-service/src/order.ts",
              code: `import { PrismaClient, OrderStatus } from '@prisma/client';
import amqp from 'amqplib';

const prisma = new PrismaClient();

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface CreateOrderRequest {
  userId: string;
  items: OrderItem[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

class OrderService {
  private channel: amqp.Channel | null = null;

  async connect() {
    const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    this.channel = await connection.createChannel();
    
    // Declare exchanges and queues
    await this.channel.assertExchange('orders', 'topic', { durable: true });
    await this.channel.assertQueue('order.created', { durable: true });
    await this.channel.assertQueue('order.updated', { durable: true });
    await this.channel.bindQueue('order.created', 'orders', 'order.created');
    await this.channel.bindQueue('order.updated', 'orders', 'order.updated');
  }

  async createOrder(request: CreateOrderRequest): Promise<any> {
    const { userId, items, shippingAddress } = request;
    
    // Calculate total
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Create order in database
    const order = await prisma.order.create({
      data: {
        userId,
        status: OrderStatus.PENDING,
        total,
        shippingAddress: JSON.stringify(shippingAddress),
        items: {
          create: items.map(item => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    // Publish order created event
    await this.publishEvent('order.created', {
      orderId: order.id,
      userId: order.userId,
      total: order.total,
      items: order.items,
      createdAt: order.createdAt,
    });

    return order;
  }

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<any> {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { 
        status,
        ...(status === OrderStatus.SHIPPED && { shippedAt: new Date() }),
        ...(status === OrderStatus.DELIVERED && { deliveredAt: new Date() }),
      },
      include: { items: true },
    });

    await this.publishEvent('order.updated', {
      orderId: order.id,
      userId: order.userId,
      status: order.status,
      updatedAt: new Date().toISOString(),
    });

    return order;
  }

  async getOrder(orderId: string) {
    return prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });
  }

  async getUserOrders(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId },
        include: { items: true },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.order.count({ where: { userId } }),
    ]);

    return { orders, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  private async publishEvent(routingKey: string, data: any) {
    if (!this.channel) {
      console.error('RabbitMQ channel not initialized');
      return;
    }

    this.channel.publish(
      'orders',
      routingKey,
      Buffer.from(JSON.stringify(data)),
      { persistent: true }
    );

    console.log(\`Published event: \${routingKey}\`, data);
  }
}

export const orderService = new OrderService();`,
            },
          ],
        },
      ],
    },

    // ============ PHASE 5: API GATEWAY ============
    {
      id: "phase-5",
      title: "API Gateway with Kong",
      description: "Set up Kong API Gateway for routing and rate limiting.",
      estimatedTime: "1.5 hours",
      tasks: [
        {
          id: "task-5-1",
          title: "Deploy Kong API Gateway",
          description: "Install and configure Kong on Kubernetes.",
          instructions: [
            "Install Kong using Helm",
            "Configure ingress routes",
            "Add rate limiting plugin",
            "Set up authentication",
          ],
          codeSnippets: [
            {
              language: "bash",
              filename: "scripts/install-kong.sh",
              code: `# Add Kong Helm repo
helm repo add kong https://charts.konghq.com
helm repo update

# Install Kong
helm install kong kong/kong \\
  --namespace kong \\
  --create-namespace \\
  --set ingressController.installCRDs=false \\
  --set proxy.type=LoadBalancer \\
  --set admin.enabled=true \\
  --set admin.http.enabled=true

# Wait for Kong to be ready
kubectl wait --for=condition=ready pod -l app.kubernetes.io/name=kong -n kong --timeout=300s

# Verify installation
kubectl get pods -n kong
kubectl get svc -n kong`,
            },
            {
              language: "yaml",
              filename: "k8s/base/kong/ingress.yaml",
              code: `# Kong Ingress for all services
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ecommerce-ingress
  namespace: ecommerce
  annotations:
    konghq.com/strip-path: "true"
    konghq.com/plugins: rate-limiting,cors
spec:
  ingressClassName: kong
  rules:
    - host: api.ecommerce.local
      http:
        paths:
          - path: /users
            pathType: Prefix
            backend:
              service:
                name: user-service
                port:
                  number: 80
          - path: /products
            pathType: Prefix
            backend:
              service:
                name: product-service
                port:
                  number: 80
          - path: /cart
            pathType: Prefix
            backend:
              service:
                name: cart-service
                port:
                  number: 80
          - path: /orders
            pathType: Prefix
            backend:
              service:
                name: order-service
                port:
                  number: 80
---
# Rate limiting plugin
apiVersion: configuration.konghq.com/v1
kind: KongPlugin
metadata:
  name: rate-limiting
  namespace: ecommerce
plugin: rate-limiting
config:
  minute: 100
  policy: local
---
# CORS plugin
apiVersion: configuration.konghq.com/v1
kind: KongPlugin
metadata:
  name: cors
  namespace: ecommerce
plugin: cors
config:
  origins:
    - "*"
  methods:
    - GET
    - POST
    - PUT
    - DELETE
    - OPTIONS
  headers:
    - Authorization
    - Content-Type
  exposed_headers:
    - X-Request-Id
  max_age: 3600`,
            },
          ],
        },
      ],
    },

    // ============ PHASE 6: OBSERVABILITY ============
    {
      id: "phase-6",
      title: "Observability Stack",
      description: "Set up Prometheus, Grafana, and Jaeger for full observability.",
      estimatedTime: "2 hours",
      tasks: [
        {
          id: "task-6-1",
          title: "Install Prometheus & Grafana",
          description: "Deploy the monitoring stack using kube-prometheus-stack.",
          instructions: [
            "Install kube-prometheus-stack with Helm",
            "Configure ServiceMonitors for microservices",
            "Import dashboards",
            "Set up alerting rules",
          ],
          codeSnippets: [
            {
              language: "bash",
              filename: "scripts/install-monitoring.sh",
              code: `# Add Prometheus Helm repo
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# Install kube-prometheus-stack
helm install prometheus prometheus-community/kube-prometheus-stack \\
  --namespace observability \\
  --create-namespace \\
  --set grafana.adminPassword=admin123 \\
  --set prometheus.prometheusSpec.serviceMonitorSelectorNilUsesHelmValues=false

# Wait for pods
kubectl wait --for=condition=ready pod -l app.kubernetes.io/name=grafana -n observability --timeout=300s

# Port forward Grafana (for local access)
kubectl port-forward svc/prometheus-grafana -n observability 3000:80`,
            },
            {
              language: "yaml",
              filename: "k8s/base/observability/servicemonitor.yaml",
              code: `apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: ecommerce-services
  namespace: observability
  labels:
    release: prometheus
spec:
  namespaceSelector:
    matchNames:
      - ecommerce
  selector:
    matchLabels:
      app.kubernetes.io/part-of: ecommerce-platform
  endpoints:
    - port: http
      path: /metrics
      interval: 15s
      scrapeTimeout: 10s`,
            },
          ],
        },
        {
          id: "task-6-2",
          title: "Install Jaeger for Distributed Tracing",
          description: "Set up distributed tracing across microservices.",
          instructions: [
            "Install Jaeger operator",
            "Configure tracing in services",
            "Create trace dashboard",
          ],
          codeSnippets: [
            {
              language: "bash",
              filename: "scripts/install-jaeger.sh",
              code: `# Install Jaeger operator
kubectl create namespace observability 2>/dev/null || true

kubectl apply -f https://github.com/jaegertracing/jaeger-operator/releases/download/v1.51.0/jaeger-operator.yaml -n observability

# Wait for operator
kubectl wait --for=condition=ready pod -l name=jaeger-operator -n observability --timeout=300s

# Create Jaeger instance
cat <<EOF | kubectl apply -f -
apiVersion: jaegertracing.io/v1
kind: Jaeger
metadata:
  name: jaeger
  namespace: observability
spec:
  strategy: production
  storage:
    type: elasticsearch
    elasticsearch:
      nodeCount: 1
      resources:
        requests:
          cpu: 200m
          memory: 1Gi
        limits:
          cpu: 500m
          memory: 2Gi
EOF`,
            },
          ],
        },
      ],
    },

    // ============ PHASE 7: GITOPS WITH ARGOCD ============
    {
      id: "phase-7",
      title: "GitOps with ArgoCD",
      description: "Implement GitOps deployment with ArgoCD.",
      estimatedTime: "1.5 hours",
      tasks: [
        {
          id: "task-7-1",
          title: "Install and Configure ArgoCD",
          description: "Set up ArgoCD for GitOps-based deployments.",
          instructions: [
            "Install ArgoCD",
            "Configure application manifests",
            "Set up sync policies",
            "Enable auto-sync with pruning",
          ],
          codeSnippets: [
            {
              language: "bash",
              filename: "scripts/install-argocd.sh",
              code: `# Install ArgoCD
kubectl create namespace argocd 2>/dev/null || true
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Wait for ArgoCD
kubectl wait --for=condition=ready pod -l app.kubernetes.io/name=argocd-server -n argocd --timeout=300s

# Get admin password
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d

# Port forward
kubectl port-forward svc/argocd-server -n argocd 8080:443

# Install ArgoCD CLI
brew install argocd

# Login
argocd login localhost:8080 --insecure`,
            },
            {
              language: "yaml",
              filename: "k8s/argocd/application.yaml",
              code: `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: ecommerce-platform
  namespace: argocd
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  project: default
  source:
    repoURL: https://github.com/your-org/ecommerce-platform.git
    targetRevision: main
    path: k8s/overlays/prod
  destination:
    server: https://kubernetes.default.svc
    namespace: ecommerce
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
      allowEmpty: false
    syncOptions:
      - CreateNamespace=true
      - PrunePropagationPolicy=foreground
      - PruneLast=true
    retry:
      limit: 5
      backoff:
        duration: 5s
        factor: 2
        maxDuration: 3m`,
            },
            {
              language: "yaml",
              filename: "k8s/argocd/app-of-apps.yaml",
              code: `# App of Apps pattern for managing multiple applications
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: ecommerce-apps
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/your-org/ecommerce-platform.git
    targetRevision: main
    path: k8s/argocd/apps
  destination:
    server: https://kubernetes.default.svc
    namespace: argocd
  syncPolicy:
    automated:
      prune: true
      selfHeal: true`,
            },
          ],
        },
      ],
    },
  ],
  bonusChallenges: [
    "Add Istio service mesh for traffic management",
    "Implement circuit breaker pattern with resilience4j",
    "Add GraphQL federation for unified API",
    "Implement event sourcing with Kafka",
    "Add Elasticsearch for product search",
    "Implement CQRS pattern for read/write separation",
    "Add chaos engineering with Chaos Mesh",
    "Implement blue-green deployments with Argo Rollouts",
  ],
  submissionChecklist: [
    "GitHub organization with all service repositories",
    "All 5 microservices deployed and communicating",
    "API Gateway routing traffic correctly",
    "Message queue handling async events",
    "Prometheus collecting metrics from all services",
    "Grafana dashboards for each service",
    "Jaeger showing distributed traces",
    "ArgoCD managing deployments",
    "Load test results (1000+ req/s)",
    "Architecture diagram",
    "API documentation (OpenAPI/Swagger)",
    "Incident response runbook",
    "Video demo (15 min)",
    "Cost analysis document",
  ],
}
