// DevOps to MLOps Zero to Hero Curriculum
// Total Duration: 250-300 hours | 6 Phases | 21 Modules | 12 Projects

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'theory' | 'hands-on' | 'project' | 'quiz';
  description: string;
  overview?: string;
  prerequisites?: string[];
  suggestedStack?: string[];
  objectives?: string[];
  milestones?: string[];
  acceptanceCriteria?: string[];
  starterCommands?: string[];
  incidentRunbooks?: string[];
  stretchGoals?: string[];
  content?: string;
  codeExamples?: { language: string; code: string; title?: string }[];
  commands?: string[];
  deliverables?: string[];
  xpReward: number;
  hasTerminal?: boolean;
}

export interface Module {
  id: string;
  title: string;
  duration: string;
  description: string;
  lessons: Lesson[];
  project?: Lesson;
}

export interface Phase {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  description: string;
  modules: Module[];
  icon: string;
  color: string;
}

export const curriculum: Phase[] = [
  // ============================================================
  // PHASE 1: FOUNDATION (BEGINNER)
  // ============================================================
  {
    id: 'phase-1',
    title: 'Phase 1: Foundation',
    subtitle: 'Building Your DevOps Base',
    duration: '30-40 hours',
    level: 'beginner',
    description: 'Master the fundamental skills every DevOps engineer needs: Linux, Git, Docker, and CI/CD basics.',
    icon: '🏗️',
    color: 'emerald',
    modules: [
      // Module 1: Linux & Shell Mastery
      {
        id: 'module-1',
        title: 'Linux & Shell Mastery',
        duration: '8-10 hours',
        description: 'Master Linux fundamentals, advanced shell scripting, and SSH & remote management.',
        lessons: [
          {
            id: 'lesson-1-1',
            title: 'Linux Fundamentals',
            duration: '3h',
            type: 'hands-on',
            description: 'Learn the file system hierarchy, essential commands, file permissions, and process management.',
            xpReward: 100,
            hasTerminal: true,
            objectives: [
              'Navigate the Linux file system hierarchy',
              'Master essential commands (ls, cd, mkdir, rm, cp, mv)',
              'Understand file permissions and ownership',
              'Manage processes with ps, top, kill'
            ],
            codeExamples: [
              {
                language: 'bash',
                title: 'Essential Navigation Commands',
                code: `# File system navigation
ls -la /var/log
cd /etc && pwd
mkdir -p projects/{frontend,backend}/{src,tests}
find /var -name "*.log" -mtime +7

# File operations
cp -r source/ destination/
mv oldname.txt newname.txt
rm -rf /tmp/test/

# Permissions
chmod 755 script.sh
chown user:group file.txt
chmod +x install.sh`
              },
              {
                language: 'bash',
                title: 'Process Management',
                code: `# Process management
ps aux | grep nginx
top -p $(pgrep nginx)
kill -9 <PID>
nohup ./long-running-script.sh &

# Disk usage
df -h
du -sh /var/log/*

# Package management
apt update && apt upgrade -y
apt install nginx docker.io`
              }
            ]
          },
          {
            id: 'lesson-1-2',
            title: 'Advanced Shell Scripting',
            duration: '4h',
            type: 'hands-on',
            description: 'Write robust Bash scripts with variables, conditionals, loops, functions, and error handling.',
            xpReward: 150,
            hasTerminal: true,
            objectives: [
              'Write Bash scripts with proper structure',
              'Use variables, conditionals, and loops',
              'Create reusable functions',
              'Implement error handling'
            ],
            codeExamples: [
              {
                language: 'bash',
                title: 'Production-Ready Bash Script',
                code: `#!/bin/bash
set -euo pipefail

# Variables
LOG_DIR="/var/log/myapp"
BACKUP_RETENTION=7

# Functions
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

cleanup_old_backups() {
    find /backup -type f -mtime +$BACKUP_RETENTION -delete
    log "Cleaned up backups older than $BACKUP_RETENTION days"
}

# Main logic
main() {
    log "Starting backup process..."
    
    if [[ ! -d "$LOG_DIR" ]]; then
        mkdir -p "$LOG_DIR"
    fi
    
    # Loop through services
    for service in nginx postgres redis; do
        log "Backing up $service..."
        systemctl status "$service" || {
            log "Warning: $service is not running"
            continue
        }
    done
    
    cleanup_old_backups
    log "Backup complete!"
}

main "$@"`
              }
            ]
          },
          {
            id: 'lesson-1-3',
            title: 'SSH & Remote Management',
            duration: '2h',
            type: 'hands-on',
            description: 'Master SSH key generation, secure configuration, tunneling, and remote server management.',
            xpReward: 100,
            hasTerminal: true,
            objectives: [
              'Generate and manage SSH keys',
              'Configure secure SSH connections',
              'Use SSH tunneling and port forwarding',
              'Set up ~/.ssh/config for multiple servers'
            ],
            codeExamples: [
              {
                language: 'bash',
                title: 'SSH Configuration',
                code: `# Generate SSH key (Ed25519 recommended)
ssh-keygen -t ed25519 -C "your@email.com"

# Copy key to remote server
ssh-copy-id user@server

# SSH config file (~/.ssh/config)
# Host production
#   HostName 10.0.1.50
#   User deploy
#   IdentityFile ~/.ssh/prod_key
#   Port 22

# SSH tunneling
ssh -L 8080:localhost:80 user@server
ssh -R 9000:localhost:3000 user@bastion

# Background tunnel
ssh -fN -L 5432:db-server:5432 bastion`
              }
            ]
          }
        ]
      },

      // Module 2: Git & Version Control
      {
        id: 'module-2',
        title: 'Git & Version Control Excellence',
        duration: '6-8 hours',
        description: 'Master Git workflows, branching strategies, and collaborative development practices.',
        lessons: [
          {
            id: 'lesson-2-1',
            title: 'Git Fundamentals & Daily Workflow',
            duration: '3h',
            type: 'hands-on',
            description: 'Master essential Git commands and daily development workflow.',
            xpReward: 100,
            hasTerminal: true,
            objectives: [
              'Configure Git identity and preferences',
              'Understand staging and committing',
              'Work with branches effectively',
              'Sync with remote repositories'
            ],
            codeExamples: [
              {
                language: 'bash',
                title: 'Essential Git Commands',
                code: `# Configuration
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
git config --global core.editor "code --wait"

# Initialize and clone
git init
git clone https://github.com/org/repo.git

# Daily workflow
git status
git add .
git commit -m "feat: add user authentication"
git push origin main

# Branching
git checkout -b feature/new-feature
git merge develop
git branch -d old-branch`
              }
            ]
          },
          {
            id: 'lesson-2-2',
            title: 'Advanced Git & Collaboration',
            duration: '3h',
            type: 'hands-on',
            description: 'Learn advanced Git operations: rebasing, cherry-picking, hooks, and conflict resolution.',
            xpReward: 150,
            hasTerminal: true,
            objectives: [
              'Rebase and interactive rebase',
              'Cherry-pick specific commits',
              'Resolve merge conflicts',
              'Use Git hooks for automation'
            ],
            codeExamples: [
              {
                language: 'bash',
                title: 'Advanced Git Operations',
                code: `# Interactive rebase (clean up history)
git rebase -i HEAD~5

# Cherry-pick a commit
git cherry-pick abc123

# Stashing work
git stash
git stash pop
git stash list

# Undoing changes
git reset --soft HEAD~1
git reset --hard HEAD~1
git revert abc123

# Git hooks (.git/hooks/pre-commit)
#!/bin/bash
npm run lint && npm test`
              }
            ]
          },
          {
            id: 'lesson-2-3',
            title: 'Branching Strategies & Workflows',
            duration: '2h',
            type: 'theory',
            description: 'Learn industry-standard branching strategies: GitFlow, GitHub Flow, and Trunk-Based Development.',
            xpReward: 75,
            hasTerminal: false,
            objectives: [
              'Understand GitFlow workflow',
              'Implement GitHub Flow for CI/CD',
              'Learn Trunk-Based Development',
              'Choose the right strategy for your team'
            ]
          }
        ]
      },

      // Module 3: Docker Fundamentals
      {
        id: 'module-3',
        title: 'Docker Fundamentals',
        duration: '10-12 hours',
        description: 'Master containerization with Docker - from basics to multi-container applications.',
        lessons: [
          {
            id: 'lesson-3-1',
            title: 'Docker Basics',
            duration: '4h',
            type: 'hands-on',
            description: 'Learn containers vs VMs, Docker architecture, images, containers, networking, and volumes.',
            xpReward: 150,
            hasTerminal: true,
            objectives: [
              'Understand containers vs VMs',
              'Manage containers lifecycle',
              'Work with Docker images',
              'Configure networking and volumes'
            ],
            codeExamples: [
              {
                language: 'bash',
                title: 'Docker Container Operations',
                code: `# Container operations
docker run -d -p 8080:80 --name web nginx
docker ps
docker ps -a
docker logs -f web
docker exec -it web bash
docker stop web && docker rm web

# Image management
docker images
docker pull nginx:latest
docker tag myapp:v1 user/myapp:v1
docker push user/myapp:v1
docker rmi nginx:latest
docker image prune`
              },
              {
                language: 'bash',
                title: 'Networking & Volumes',
                code: `# Networking
docker network ls
docker network create mynet
docker run --network mynet nginx
docker network inspect mynet

# Volumes
docker volume create data
docker run -v data:/data nginx
docker run -v $(pwd):/app node
docker volume ls
docker volume rm data`
              }
            ]
          },
          {
            id: 'lesson-3-2',
            title: 'Dockerfile Mastery',
            duration: '5h',
            type: 'hands-on',
            description: 'Write production-ready Dockerfiles with multi-stage builds and security best practices.',
            xpReward: 200,
            hasTerminal: true,
            objectives: [
              'Understand Dockerfile instructions',
              'Implement layer caching strategies',
              'Create multi-stage builds',
              'Apply security best practices'
            ],
            codeExamples: [
              {
                language: 'dockerfile',
                title: 'Production Node.js Dockerfile',
                code: `FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
USER node
CMD ["node", "server.js"]`
              },
              {
                language: 'dockerfile',
                title: 'Multi-Stage Go Build',
                code: `# Build stage
FROM golang:1.21 AS builder
WORKDIR /app
COPY go.* ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o main

# Production stage
FROM alpine:latest
RUN apk --no-cache add ca-certificates
COPY --from=builder /app/main /main
ENTRYPOINT ["/main"]`
              }
            ]
          },
          {
            id: 'lesson-3-3',
            title: 'Docker Compose for Multi-Container Apps',
            duration: '4h',
            type: 'hands-on',
            description: 'Orchestrate multi-container applications with Docker Compose.',
            xpReward: 175,
            hasTerminal: true,
            objectives: [
              'Write docker-compose.yml files',
              'Configure service dependencies',
              'Manage environment variables',
              'Set up networks and volumes'
            ],
            codeExamples: [
              {
                language: 'yaml',
                title: 'Full-Stack Docker Compose',
                code: `version: '3.8'

services:
  web:
    build: 
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=postgres
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - app-network

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_PASSWORD=secret
    volumes:
      - postgres-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis-data:/data
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  postgres-data:
  redis-data:`
              }
            ]
          },
          {
            id: 'lesson-3-4',
            title: 'Docker Debugging & Troubleshooting',
            duration: '2h',
            type: 'hands-on',
            description: 'Debug containers, diagnose network issues, and scan for security vulnerabilities.',
            xpReward: 100,
            hasTerminal: true,
            codeExamples: [
              {
                language: 'bash',
                title: 'Debugging Commands',
                code: `# Container won't start
docker logs <container>
docker inspect <container>
docker events

# Network issues
docker network inspect bridge
docker exec <container> ping <other-container>
docker exec <container> nslookup <service>

# Resource constraints
docker stats
docker update --memory="512m" <container>
docker system df
docker system prune -a

# Security scanning
docker scout cves nginx
trivy image myapp:latest`
              }
            ]
          }
        ],
        project: {
          id: 'project-1',
          title: 'PROJECT 1: Full-Stack Containerized Application',
          duration: '8-10 hours',
          type: 'project',
          description: 'Build and containerize a complete web application with database.',
          xpReward: 500,
          hasTerminal: true,
          objectives: [
            'Create Dockerfiles for each component',
            'Use multi-stage builds',
            'Docker Compose orchestration',
            'Environment-based configuration',
            'Health checks and volume persistence',
            'Security: non-root users, secrets'
          ],
          deliverables: [
            'GitHub repository with complete code',
            'README with setup instructions',
            'Architecture diagram',
            'Docker images (< 200MB combined)',
            'Working demo video (5 min)',
            'Troubleshooting guide'
          ]
        }
      },

      // Module 4: CI/CD Foundations
      {
        id: 'module-4',
        title: 'CI/CD Foundations',
        duration: '8-10 hours',
        description: 'Build automated pipelines with GitHub Actions and GitLab CI.',
        lessons: [
          {
            id: 'lesson-4-1',
            title: 'CI/CD Concepts & GitHub Actions',
            duration: '4.5h',
            type: 'hands-on',
            description: 'Learn CI/CD principles and build your first GitHub Actions pipeline.',
            xpReward: 175,
            hasTerminal: true,
            objectives: [
              'Understand CI/CD principles',
              'Learn pipeline stages (build, test, deploy)',
              'Create GitHub Actions workflows',
              'Build and push Docker images'
            ],
            codeExamples: [
              {
                language: 'yaml',
                title: 'GitHub Actions CI Pipeline',
                code: `name: CI Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: \${{ github.repository }}

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run linting
        run: npm run lint
        
      - name: Run tests
        run: npm test -- --coverage
        
      - name: Upload coverage
        uses: codecov/codecov-action@v3

  build:
    needs: test
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
      
    steps:
      - uses: actions/checkout@v4
      
      - name: Login to registry
        uses: docker/login-action@v3
        with:
          registry: \${{ env.REGISTRY }}
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}
          
      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:latest`
              }
            ]
          },
          {
            id: 'lesson-4-2',
            title: 'Advanced Pipeline Patterns',
            duration: '4h',
            type: 'hands-on',
            description: 'Learn matrix builds, conditional execution, secrets management, and reusable workflows.',
            xpReward: 150,
            hasTerminal: true,
            codeExamples: [
              {
                language: 'yaml',
                title: 'Matrix Strategy & Conditionals',
                code: `# Matrix strategy
strategy:
  matrix:
    os: [ubuntu-latest, macos-latest]
    node: [16, 18, 20]

# Conditional steps
- name: Deploy to production
  if: github.ref == 'refs/heads/main'
  run: ./deploy.sh

# Reusable workflow
on:
  workflow_call:
    inputs:
      environment:
        required: true
        type: string
    secrets:
      deploy_key:
        required: true`
              }
            ]
          },
          {
            id: 'lesson-4-3',
            title: 'GitLab CI/CD',
            duration: '2.5h',
            type: 'hands-on',
            description: 'Build pipelines with GitLab CI using .gitlab-ci.yml.',
            xpReward: 100,
            hasTerminal: true,
            codeExamples: [
              {
                language: 'yaml',
                title: 'GitLab CI Pipeline',
                code: `stages:
  - build
  - test
  - deploy

variables:
  DOCKER_DRIVER: overlay2
  DOCKER_TLS_CERTDIR: "/certs"

before_script:
  - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY

build:
  stage: build
  image: docker:24
  services:
    - docker:24-dind
  script:
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
  only:
    - main
    - develop

test:
  stage: test
  image: node:18
  script:
    - npm ci
    - npm test
  coverage: '/Statements\\s*:\\s*(\\d+\\.?\\d*)%/'

deploy:
  stage: deploy
  image: alpine:latest
  script:
    - ssh user@server "docker pull $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA"
    - ssh user@server "docker-compose up -d"
  only:
    - main
  when: manual`
              }
            ]
          }
        ],
        project: {
          id: 'project-2',
          title: 'PROJECT 2: Automated CI/CD Pipeline',
          duration: '6-8 hours',
          type: 'project',
          description: 'Build a production-grade CI/CD pipeline with testing and deployment.',
          xpReward: 400,
          hasTerminal: true,
          objectives: [
            'Multi-stage pipeline (lint, test, build, deploy)',
            'Matrix testing (multiple versions)',
            'Code quality gates (coverage, linting)',
            'Container image building and scanning',
            'Semantic versioning',
            'Automated deployment to staging',
            'Manual approval for production'
          ],
          deliverables: [
            'Working CI/CD configuration files',
            'Test coverage > 80%',
            'Security scanning integrated',
            'Deployment to cloud (AWS/GCP/Azure free tier)',
            'Pipeline documentation',
            'Video demo (5 min)'
          ]
        }
      },

      // Module 5: Cloud Fundamentals
      {
        id: 'module-5',
        title: 'Cloud Fundamentals',
        duration: '7-9 hours',
        description: 'Master core AWS services and understand multi-cloud basics.',
        lessons: [
          {
            id: 'lesson-5-1',
            title: 'AWS Core Services',
            duration: '5h',
            type: 'hands-on',
            description: 'Learn AWS account setup, IAM, VPC, EC2, S3, and RDS.',
            xpReward: 200,
            hasTerminal: true,
            objectives: [
              'Set up AWS account and IAM',
              'Configure VPC, subnets, security groups',
              'Launch EC2 instances',
              'Work with S3 and CloudFront'
            ],
            codeExamples: [
              {
                language: 'bash',
                title: 'AWS CLI Commands',
                code: `# AWS CLI configuration
aws configure

# EC2
aws ec2 describe-instances
aws ec2 run-instances --image-id ami-xxx --instance-type t3.micro
aws ec2 create-security-group --group-name my-sg
aws ec2 authorize-security-group-ingress --group-id sg-xxx --protocol tcp --port 80 --cidr 0.0.0.0/0

# S3
aws s3 mb s3://my-bucket
aws s3 cp file.txt s3://my-bucket/
aws s3 sync ./local s3://my-bucket/prefix

# IAM
aws iam create-user --user-name deploy
aws iam attach-user-policy --user-name deploy --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess`
              }
            ]
          },
          {
            id: 'lesson-5-2',
            title: 'Cost Optimization & Best Practices',
            duration: '2.5h',
            type: 'theory',
            description: 'Learn pricing models, reserved instances, and cost optimization strategies.',
            xpReward: 75,
            hasTerminal: false,
            objectives: [
              'Understand AWS pricing models',
              'Set up billing alerts',
              'Use Cost Explorer effectively',
              'Optimize resource usage'
            ]
          },
          {
            id: 'lesson-5-3',
            title: 'Multi-Cloud Basics (GCP/Azure Overview)',
            duration: '1.5h',
            type: 'theory',
            description: 'Compare GCP and Azure services with AWS equivalents.',
            xpReward: 50,
            hasTerminal: false,
            objectives: [
              'Map GCP services to AWS',
              'Map Azure services to AWS',
              'Design cloud-agnostic architectures'
            ]
          }
        ],
        project: {
          id: 'project-3',
          title: 'PROJECT 3: Cloud-Deployed Web Application',
          duration: '8-10 hours',
          type: 'project',
          description: 'Deploy a production application to AWS with proper architecture.',
          xpReward: 500,
          hasTerminal: true,
          objectives: [
            'Deploy to AWS (EC2 or ECS)',
            'Application Load Balancer',
            'RDS PostgreSQL database',
            'S3 for static assets',
            'CloudFront CDN',
            'SSL/TLS certificate',
            'Auto-scaling group',
            'CloudWatch monitoring'
          ],
          deliverables: [
            'Architecture diagram (draw.io/Lucidchart)',
            'Infrastructure as Code (CloudFormation/Terraform)',
            'Public URL with working application',
            'Monitoring dashboard',
            'Cost estimate document',
            'Disaster recovery plan',
            'Video walkthrough (10 min)'
          ]
        }
      }
    ]
  },

  // ============================================================
  // PHASE 2: CORE DEVOPS (INTERMEDIATE)
  // ============================================================
  {
    id: 'phase-2',
    title: 'Phase 2: Core DevOps',
    subtitle: 'Container Orchestration & IaC',
    duration: '40-50 hours',
    level: 'intermediate',
    description: 'Master Kubernetes, Terraform, and advanced CI/CD practices for production environments.',
    icon: '🔧',
    color: 'blue',
    modules: [
      // Module 6: Kubernetes Fundamentals
      {
        id: 'module-6',
        title: 'Kubernetes Fundamentals',
        duration: '12-15 hours',
        description: 'Master container orchestration with Kubernetes.',
        lessons: [
          {
            id: 'lesson-6-1',
            title: 'Kubernetes Architecture',
            duration: '4h',
            type: 'hands-on',
            description: 'Understand control plane, worker nodes, and K8s objects.',
            xpReward: 200,
            hasTerminal: true,
            objectives: [
              'Understand control plane components (API Server, etcd, Scheduler, Controller Manager)',
              'Learn worker node architecture (kubelet, kube-proxy, container runtime)',
              'Work with namespaces and contexts for multi-environment management',
              'Master kubectl commands for cluster administration',
              'Deploy local clusters with Minikube and Kind',
              'Understand Kubernetes object model (desired state vs actual state)'
            ],
            codeExamples: [
              {
                language: 'bash',
                title: 'Local Cluster Setup',
                code: `# Install kubectl (macOS)
brew install kubectl

# Minikube setup
brew install minikube
minikube start --driver=docker --cpus=4 --memory=8192
minikube status
minikube dashboard

# Kind (Kubernetes in Docker) - faster, lightweight
brew install kind

# Create multi-node cluster with Kind
cat <<EOF | kind create cluster --config=-
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
- role: worker
- role: worker
EOF

# List clusters
kind get clusters
minikube profile list`
              },
              {
                language: 'bash',
                title: 'Control Plane Exploration',
                code: `# View control plane components
kubectl get pods -n kube-system
kubectl get componentstatuses  # deprecated but useful

# API Server - central management point
kubectl api-resources          # List all API resources
kubectl api-versions           # List API versions
kubectl explain pods           # Get documentation
kubectl explain pods.spec.containers

# etcd - cluster state store (in kube-system)
kubectl get pods -n kube-system -l component=etcd

# Scheduler - assigns pods to nodes
kubectl get pods -n kube-system -l component=kube-scheduler
kubectl get events --field-selector reason=Scheduled

# Controller Manager - runs controllers
kubectl get pods -n kube-system -l component=kube-controller-manager`
              },
              {
                language: 'bash',
                title: 'Worker Node Management',
                code: `# Node operations
kubectl get nodes -o wide
kubectl describe node <node-name>
kubectl top nodes

# Node labels and taints
kubectl label nodes <node> disktype=ssd
kubectl label nodes <node> environment=production
kubectl get nodes --show-labels

# Taint a node (prevent scheduling)
kubectl taint nodes <node> key=value:NoSchedule
kubectl taint nodes <node> key=value:NoExecute
kubectl taint nodes <node> key-   # Remove taint

# Cordon/Drain for maintenance
kubectl cordon <node>             # Mark unschedulable
kubectl drain <node> --ignore-daemonsets --delete-emptydir-data
kubectl uncordon <node>           # Mark schedulable`
              },
              {
                language: 'bash',
                title: 'Contexts and Namespaces',
                code: `# Context management (cluster + user + namespace)
kubectl config get-contexts
kubectl config current-context
kubectl config use-context minikube

# Create and switch namespaces
kubectl create namespace development
kubectl create namespace staging
kubectl create namespace production

# Set default namespace for context
kubectl config set-context --current --namespace=development

# Work across namespaces
kubectl get pods --all-namespaces
kubectl get pods -n kube-system
kubectl get all -A               # All resources, all namespaces

# Delete namespace (WARNING: deletes all resources)
kubectl delete namespace development`
              },
              {
                language: 'bash',
                title: 'Essential kubectl Commands',
                code: `# Get resources with different outputs
kubectl get pods
kubectl get pods -o wide          # More details
kubectl get pods -o yaml          # Full YAML
kubectl get pods -o json          # JSON format
kubectl get pods -o jsonpath='{.items[*].metadata.name}'

# Describe for troubleshooting
kubectl describe pod <pod-name>
kubectl describe deployment <deploy-name>

# Logs
kubectl logs <pod-name>
kubectl logs <pod-name> -c <container>  # Multi-container
kubectl logs -f <pod-name>              # Follow
kubectl logs --previous <pod-name>      # Previous crash
kubectl logs -l app=nginx               # By label

# Execute commands
kubectl exec -it <pod> -- /bin/sh
kubectl exec <pod> -- env
kubectl exec <pod> -c <container> -- cat /etc/hosts

# Port forwarding
kubectl port-forward pod/<pod> 8080:80
kubectl port-forward svc/<service> 8080:80

# Copy files
kubectl cp <pod>:/path/file ./local-file
kubectl cp ./local-file <pod>:/path/file`
              },
              {
                language: 'yaml',
                title: 'Namespace with Resource Quota',
                code: `apiVersion: v1
kind: Namespace
metadata:
  name: development
  labels:
    environment: dev
    team: backend
---
apiVersion: v1
kind: ResourceQuota
metadata:
  name: dev-quota
  namespace: development
spec:
  hard:
    requests.cpu: "4"
    requests.memory: 8Gi
    limits.cpu: "8"
    limits.memory: 16Gi
    pods: "20"
    services: "10"
    persistentvolumeclaims: "5"
---
apiVersion: v1
kind: LimitRange
metadata:
  name: dev-limits
  namespace: development
spec:
  limits:
  - default:
      cpu: "500m"
      memory: "512Mi"
    defaultRequest:
      cpu: "100m"
      memory: "128Mi"
    type: Container`
              }
            ],
            commands: [
              'minikube start --driver=docker',
              'kind create cluster --name dev',
              'kubectl cluster-info',
              'kubectl get nodes -o wide',
              'kubectl get pods -n kube-system',
              'kubectl create namespace development',
              'kubectl config set-context --current --namespace=development'
            ]
          },
          {
            id: 'lesson-6-2',
            title: 'Core Workloads & Resources',
            duration: '5.5h',
            type: 'hands-on',
            description: 'Deploy applications with Pods, Deployments, Services, ConfigMaps, and Secrets.',
            xpReward: 250,
            hasTerminal: true,
            objectives: [
              'Understand Pod lifecycle and multi-container patterns',
              'Create and manage Deployments with rolling updates',
              'Configure ReplicaSets and DaemonSets for different workloads',
              'Implement liveness, readiness, and startup probes',
              'Manage configuration with ConfigMaps and Secrets',
              'Scale applications manually and with HPA',
              'Use Jobs and CronJobs for batch workloads'
            ],
            codeExamples: [
              {
                language: 'yaml',
                title: 'Pod with Multiple Containers (Sidecar Pattern)',
                code: `apiVersion: v1
kind: Pod
metadata:
  name: web-with-sidecar
  labels:
    app: web
spec:
  containers:
  # Main application container
  - name: app
    image: nginx:alpine
    ports:
    - containerPort: 80
    volumeMounts:
    - name: shared-logs
      mountPath: /var/log/nginx
    resources:
      requests:
        memory: "64Mi"
        cpu: "50m"
      limits:
        memory: "128Mi"
        cpu: "100m"

  # Sidecar: Log shipper
  - name: log-shipper
    image: busybox
    command: ['sh', '-c', 'tail -F /var/log/nginx/access.log']
    volumeMounts:
    - name: shared-logs
      mountPath: /var/log/nginx
      readOnly: true

  # Init container: Wait for database
  initContainers:
  - name: wait-for-db
    image: busybox
    command: ['sh', '-c', 'until nc -z postgres 5432; do echo waiting for db; sleep 2; done']

  volumes:
  - name: shared-logs
    emptyDir: {}`
              },
              {
                language: 'yaml',
                title: 'Production Deployment with All Features',
                code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-server
  labels:
    app: api
    version: v2.1.0
spec:
  replicas: 3
  revisionHistoryLimit: 5
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1        # Max pods over desired
      maxUnavailable: 0  # Zero downtime
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
        version: v2.1.0
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "8080"
    spec:
      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 100
            podAffinityTerm:
              labelSelector:
                matchLabels:
                  app: api
              topologyKey: kubernetes.io/hostname
      containers:
      - name: api
        image: myapi:v2.1.0
        imagePullPolicy: Always
        ports:
        - name: http
          containerPort: 8080
        - name: metrics
          containerPort: 9090
        env:
        - name: NODE_ENV
          value: "production"
        - name: DB_HOST
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: database_host
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: password
        - name: POD_NAME
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
        resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /healthz
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
          timeoutSeconds: 5
          failureThreshold: 3
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
          successThreshold: 1
        startupProbe:
          httpGet:
            path: /healthz
            port: 8080
          failureThreshold: 30
          periodSeconds: 10
        lifecycle:
          preStop:
            exec:
              command: ["/bin/sh", "-c", "sleep 10"]`
              },
              {
                language: 'yaml',
                title: 'ConfigMap and Secret',
                code: `# ConfigMap for non-sensitive configuration
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  database_host: "postgres.default.svc.cluster.local"
  database_port: "5432"
  log_level: "info"
  feature_flags: |
    {
      "new_checkout": true,
      "beta_features": false
    }
  nginx.conf: |
    server {
      listen 80;
      location / {
        proxy_pass http://localhost:8080;
      }
    }
---
# Secret for sensitive data
apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
type: Opaque
stringData:
  username: admin
  password: supersecret123
  connection_string: "postgresql://admin:supersecret123@postgres:5432/app"
---
# Docker registry credentials
apiVersion: v1
kind: Secret
metadata:
  name: regcred
type: kubernetes.io/dockerconfigjson
data:
  .dockerconfigjson: <base64-encoded-docker-config>`
              },
              {
                language: 'yaml',
                title: 'DaemonSet for Node-Level Services',
                code: `apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: node-exporter
  namespace: monitoring
  labels:
    app: node-exporter
spec:
  selector:
    matchLabels:
      app: node-exporter
  template:
    metadata:
      labels:
        app: node-exporter
    spec:
      hostNetwork: true
      hostPID: true
      containers:
      - name: node-exporter
        image: prom/node-exporter:latest
        ports:
        - containerPort: 9100
          hostPort: 9100
        resources:
          limits:
            memory: 100Mi
            cpu: 100m
        volumeMounts:
        - name: proc
          mountPath: /host/proc
          readOnly: true
        - name: sys
          mountPath: /host/sys
          readOnly: true
      tolerations:
      - effect: NoSchedule
        operator: Exists
      volumes:
      - name: proc
        hostPath:
          path: /proc
      - name: sys
        hostPath:
          path: /sys`
              },
              {
                language: 'yaml',
                title: 'Horizontal Pod Autoscaler',
                code: `apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api-server
  minReplicas: 3
  maxReplicas: 20
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
        value: 10
        periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
      - type: Percent
        value: 100
        periodSeconds: 15
      - type: Pods
        value: 4
        periodSeconds: 15`
              },
              {
                language: 'yaml',
                title: 'Job and CronJob',
                code: `# One-time Job
apiVersion: batch/v1
kind: Job
metadata:
  name: database-migration
spec:
  backoffLimit: 3
  activeDeadlineSeconds: 600
  ttlSecondsAfterFinished: 3600
  template:
    spec:
      restartPolicy: Never
      containers:
      - name: migrate
        image: myapp:latest
        command: ["npm", "run", "migrate"]
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: connection_string
---
# Scheduled CronJob
apiVersion: batch/v1
kind: CronJob
metadata:
  name: backup-job
spec:
  schedule: "0 2 * * *"  # Daily at 2 AM
  concurrencyPolicy: Forbid
  successfulJobsHistoryLimit: 3
  failedJobsHistoryLimit: 1
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: OnFailure
          containers:
          - name: backup
            image: postgres:15
            command:
            - /bin/sh
            - -c
            - pg_dump -h $DB_HOST -U $DB_USER $DB_NAME | gzip > /backup/db-$(date +%Y%m%d).sql.gz
            env:
            - name: DB_HOST
              value: postgres
            - name: PGPASSWORD
              valueFrom:
                secretKeyRef:
                  name: db-credentials
                  key: password
            volumeMounts:
            - name: backup-volume
              mountPath: /backup
          volumes:
          - name: backup-volume
            persistentVolumeClaim:
              claimName: backup-pvc`
              },
              {
                language: 'bash',
                title: 'Deployment Management Commands',
                code: `# Create resources
kubectl apply -f deployment.yaml
kubectl create deployment nginx --image=nginx --replicas=3

# Scale deployments
kubectl scale deployment api-server --replicas=5
kubectl autoscale deployment api-server --min=3 --max=10 --cpu-percent=70

# Rolling updates
kubectl set image deployment/api-server api=myapi:v2.2.0
kubectl rollout status deployment/api-server
kubectl rollout history deployment/api-server
kubectl rollout undo deployment/api-server
kubectl rollout undo deployment/api-server --to-revision=2

# Restart pods (trigger rolling restart)
kubectl rollout restart deployment/api-server

# Pause/Resume rollout
kubectl rollout pause deployment/api-server
kubectl rollout resume deployment/api-server

# ConfigMap/Secret from files
kubectl create configmap app-config --from-file=config.yaml
kubectl create secret generic db-creds --from-literal=password=secret123
kubectl create secret docker-registry regcred --docker-server=<registry> --docker-username=<user> --docker-password=<pass>

# View HPA
kubectl get hpa
kubectl describe hpa api-hpa
kubectl top pods`
              }
            ],
            commands: [
              'kubectl apply -f deployment.yaml',
              'kubectl scale deployment api-server --replicas=5',
              'kubectl set image deployment/api-server api=myapi:v2.0',
              'kubectl rollout status deployment/api-server',
              'kubectl rollout undo deployment/api-server',
              'kubectl create configmap app-config --from-file=config.yaml',
              'kubectl create secret generic db-creds --from-literal=password=secret'
            ]
          },
          {
            id: 'lesson-6-3',
            title: 'Networking & Service Discovery',
            duration: '4.5h',
            type: 'hands-on',
            description: 'Configure Services, Ingress, and Network Policies.',
            xpReward: 200,
            hasTerminal: true,
            objectives: [
              'Understand ClusterIP, NodePort, and LoadBalancer Service types',
              'Configure Ingress controllers with NGINX and Traefik',
              'Implement path-based and host-based routing',
              'Set up TLS termination with cert-manager',
              'Create Network Policies for pod-to-pod security',
              'Understand CoreDNS and service discovery patterns',
              'Debug networking issues with common tools'
            ],
            codeExamples: [
              {
                language: 'yaml',
                title: 'Service Types Explained',
                code: `# ClusterIP (default) - Internal only
apiVersion: v1
kind: Service
metadata:
  name: backend-api
spec:
  type: ClusterIP  # Only accessible within cluster
  selector:
    app: backend
  ports:
  - name: http
    port: 80        # Service port
    targetPort: 8080  # Pod port
  - name: grpc
    port: 9090
    targetPort: 9090
---
# Headless Service (for StatefulSets)
apiVersion: v1
kind: Service
metadata:
  name: postgres-headless
spec:
  type: ClusterIP
  clusterIP: None  # Headless - returns Pod IPs directly
  selector:
    app: postgres
  ports:
  - port: 5432
---
# NodePort - External access via node IP
apiVersion: v1
kind: Service
metadata:
  name: web-nodeport
spec:
  type: NodePort
  selector:
    app: web
  ports:
  - port: 80
    targetPort: 8080
    nodePort: 30080  # 30000-32767 range
---
# LoadBalancer - Cloud provider integration
apiVersion: v1
kind: Service
metadata:
  name: web-lb
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-type: nlb
    service.beta.kubernetes.io/aws-load-balancer-internal: "true"
spec:
  type: LoadBalancer
  selector:
    app: web
  ports:
  - port: 443
    targetPort: 8080
  loadBalancerSourceRanges:
  - 10.0.0.0/8
---
# ExternalName - CNAME to external service
apiVersion: v1
kind: Service
metadata:
  name: external-db
spec:
  type: ExternalName
  externalName: mydb.example.com`
              },
              {
                language: 'bash',
                title: 'Install NGINX Ingress Controller',
                code: `# Install with Helm
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

# Install NGINX Ingress
helm install ingress-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx \
  --create-namespace \
  --set controller.replicaCount=2 \
  --set controller.metrics.enabled=true

# Verify installation
kubectl get pods -n ingress-nginx
kubectl get svc -n ingress-nginx

# For Minikube
minikube addons enable ingress

# For Kind - need extra config
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml`
              },
              {
                language: 'yaml',
                title: 'Ingress with Path and Host Routing',
                code: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: main-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/proxy-body-size: "50m"
    nginx.ingress.kubernetes.io/proxy-read-timeout: "60"
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - api.myapp.com
    - app.myapp.com
    secretName: myapp-tls
  rules:
  # Host-based routing
  - host: api.myapp.com
    http:
      paths:
      - path: /v1
        pathType: Prefix
        backend:
          service:
            name: api-v1
            port:
              number: 80
      - path: /v2
        pathType: Prefix
        backend:
          service:
            name: api-v2
            port:
              number: 80
  - host: app.myapp.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend
            port:
              number: 80
---
# Ingress with path rewriting
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: rewrite-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /$2
spec:
  ingressClassName: nginx
  rules:
  - host: myapp.com
    http:
      paths:
      - path: /api(/|$)(.*)
        pathType: ImplementationSpecific
        backend:
          service:
            name: api-service
            port:
              number: 80`
              },
              {
                language: 'yaml',
                title: 'TLS with cert-manager',
                code: `# Install cert-manager
# kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml

# ClusterIssuer for Let's Encrypt
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: admin@myapp.com
    privateKeySecretRef:
      name: letsencrypt-prod-key
    solvers:
    - http01:
        ingress:
          class: nginx
---
# Certificate request (auto-created by Ingress annotation)
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: myapp-cert
spec:
  secretName: myapp-tls
  issuerRef:
    name: letsencrypt-prod
    kind: ClusterIssuer
  commonName: myapp.com
  dnsNames:
  - myapp.com
  - api.myapp.com
  - www.myapp.com`
              },
              {
                language: 'yaml',
                title: 'Network Policies',
                code: `# Default deny all ingress traffic
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-ingress
  namespace: production
spec:
  podSelector: {}  # Apply to all pods
  policyTypes:
  - Ingress
---
# Allow traffic only from specific pods
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: api-network-policy
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: api
  policyTypes:
  - Ingress
  - Egress
  ingress:
  # Allow from frontend pods
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    ports:
    - protocol: TCP
      port: 8080
  # Allow from ingress controller namespace
  - from:
    - namespaceSelector:
        matchLabels:
          name: ingress-nginx
    ports:
    - protocol: TCP
      port: 8080
  egress:
  # Allow to database
  - to:
    - podSelector:
        matchLabels:
          app: postgres
    ports:
    - protocol: TCP
      port: 5432
  # Allow DNS
  - to:
    - namespaceSelector: {}
      podSelector:
        matchLabels:
          k8s-app: kube-dns
    ports:
    - protocol: UDP
      port: 53
---
# Allow traffic from specific CIDR
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-external
spec:
  podSelector:
    matchLabels:
      app: public-api
  ingress:
  - from:
    - ipBlock:
        cidr: 10.0.0.0/8
        except:
        - 10.0.1.0/24
    ports:
    - protocol: TCP
      port: 443`
              },
              {
                language: 'bash',
                title: 'DNS and Service Discovery',
                code: `# Service DNS format: <service>.<namespace>.svc.cluster.local
# From within a pod:
nslookup backend-api
nslookup backend-api.default.svc.cluster.local
nslookup postgres.database.svc.cluster.local

# Headless service returns pod IPs
nslookup postgres-headless
# Returns: postgres-0.postgres-headless.default.svc.cluster.local

# Debug DNS from a pod
kubectl run debug --image=busybox --rm -it --restart=Never -- nslookup kubernetes
kubectl run debug --image=nicolaka/netshoot --rm -it --restart=Never -- /bin/bash

# Check CoreDNS
kubectl get pods -n kube-system -l k8s-app=kube-dns
kubectl logs -n kube-system -l k8s-app=kube-dns

# View CoreDNS ConfigMap
kubectl get configmap coredns -n kube-system -o yaml`
              },
              {
                language: 'bash',
                title: 'Network Debugging Commands',
                code: `# Debug pod for network testing
kubectl run netshoot --image=nicolaka/netshoot --rm -it --restart=Never -- /bin/bash

# Inside the debug pod:
curl http://backend-api:80/health
ping postgres
nslookup backend-api
traceroute backend-api
netstat -tulpn
ss -tulpn
ip addr
ip route
iptables -L -n

# Test connectivity between pods
kubectl exec -it <pod1> -- curl http://<pod2-ip>:8080

# Check endpoints
kubectl get endpoints
kubectl get endpoints backend-api -o yaml

# View service details
kubectl describe svc backend-api
kubectl get svc -o wide

# Check ingress
kubectl describe ingress main-ingress
kubectl get ingress -o wide

# View network policies
kubectl get networkpolicies
kubectl describe networkpolicy api-network-policy

# Port forward for testing
kubectl port-forward svc/backend-api 8080:80`
              }
            ],
            commands: [
              'kubectl get svc -o wide',
              'kubectl describe svc backend-api',
              'kubectl get endpoints',
              'kubectl get ingress',
              'kubectl describe ingress main-ingress',
              'kubectl get networkpolicies',
              'kubectl port-forward svc/backend-api 8080:80'
            ]
          },
          {
            id: 'lesson-6-4',
            title: 'Storage & Persistence',
            duration: '3h',
            type: 'hands-on',
            description: 'Work with PersistentVolumes, PersistentVolumeClaims, and StatefulSets.',
            xpReward: 150,
            hasTerminal: true,
            objectives: [
              'Understand Kubernetes storage concepts (PV, PVC, StorageClass)',
              'Create and manage PersistentVolumeClaims',
              'Configure StorageClasses for dynamic provisioning',
              'Deploy StatefulSets for stateful applications',
              'Manage database workloads with proper persistence',
              'Use volume snapshots and backup strategies',
              'Handle storage expansion and migration'
            ],
            codeExamples: [
              {
                language: 'yaml',
                title: 'PersistentVolume and PersistentVolumeClaim',
                code: `# Static PersistentVolume (manual provisioning)
apiVersion: v1
kind: PersistentVolume
metadata:
  name: local-pv
  labels:
    type: local
spec:
  storageClassName: manual
  capacity:
    storage: 10Gi
  accessModes:
  - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  hostPath:
    path: /mnt/data
---
# PersistentVolumeClaim
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: app-data-pvc
spec:
  storageClassName: manual
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
  selector:
    matchLabels:
      type: local
---
# Pod using PVC
apiVersion: v1
kind: Pod
metadata:
  name: app-with-storage
spec:
  containers:
  - name: app
    image: nginx
    volumeMounts:
    - name: data
      mountPath: /usr/share/nginx/html
  volumes:
  - name: data
    persistentVolumeClaim:
      claimName: app-data-pvc`
              },
              {
                language: 'yaml',
                title: 'StorageClass for Dynamic Provisioning',
                code: `# AWS EBS StorageClass
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd
  annotations:
    storageclass.kubernetes.io/is-default-class: "true"
provisioner: ebs.csi.aws.com
parameters:
  type: gp3
  iops: "3000"
  throughput: "125"
  encrypted: "true"
reclaimPolicy: Delete
volumeBindingMode: WaitForFirstConsumer
allowVolumeExpansion: true
---
# GCP PD StorageClass
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd-gcp
provisioner: pd.csi.storage.gke.io
parameters:
  type: pd-ssd
  replication-type: regional-pd
volumeBindingMode: WaitForFirstConsumer
allowVolumeExpansion: true
---
# Azure Disk StorageClass
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd-azure
provisioner: disk.csi.azure.com
parameters:
  skuName: Premium_LRS
  cachingMode: ReadOnly
reclaimPolicy: Delete
volumeBindingMode: WaitForFirstConsumer
allowVolumeExpansion: true
---
# PVC using dynamic provisioning
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: database-pvc
spec:
  storageClassName: fast-ssd
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 100Gi`
              },
              {
                language: 'yaml',
                title: 'StatefulSet for Databases',
                code: `apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
spec:
  serviceName: postgres-headless  # Required headless service
  replicas: 3
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      terminationGracePeriodSeconds: 30
      containers:
      - name: postgres
        image: postgres:15-alpine
        ports:
        - containerPort: 5432
          name: postgres
        env:
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: postgres-secret
              key: password
        - name: POSTGRES_DB
          value: appdb
        - name: PGDATA
          value: /var/lib/postgresql/data/pgdata
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        volumeMounts:
        - name: postgres-data
          mountPath: /var/lib/postgresql/data
        livenessProbe:
          exec:
            command: ["pg_isready", "-U", "postgres"]
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          exec:
            command: ["pg_isready", "-U", "postgres"]
          initialDelaySeconds: 5
          periodSeconds: 5
  volumeClaimTemplates:
  - metadata:
      name: postgres-data
    spec:
      accessModes: ["ReadWriteOnce"]
      storageClassName: fast-ssd
      resources:
        requests:
          storage: 50Gi
---
# Headless service for StatefulSet
apiVersion: v1
kind: Service
metadata:
  name: postgres-headless
spec:
  clusterIP: None  # Headless
  selector:
    app: postgres
  ports:
  - port: 5432
    name: postgres
---
# Regular service for client access
apiVersion: v1
kind: Service
metadata:
  name: postgres
spec:
  selector:
    app: postgres
  ports:
  - port: 5432
    targetPort: 5432`
              },
              {
                language: 'yaml',
                title: 'Redis Cluster with StatefulSet',
                code: `apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: redis
spec:
  serviceName: redis-headless
  replicas: 6  # 3 masters + 3 replicas
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      containers:
      - name: redis
        image: redis:7-alpine
        command:
        - redis-server
        args:
        - /conf/redis.conf
        - --cluster-enabled yes
        - --cluster-config-file nodes.conf
        - --appendonly yes
        ports:
        - containerPort: 6379
          name: client
        - containerPort: 16379
          name: gossip
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        volumeMounts:
        - name: redis-data
          mountPath: /data
        - name: redis-config
          mountPath: /conf
        readinessProbe:
          tcpSocket:
            port: 6379
          initialDelaySeconds: 5
          periodSeconds: 5
      volumes:
      - name: redis-config
        configMap:
          name: redis-config
  volumeClaimTemplates:
  - metadata:
      name: redis-data
    spec:
      accessModes: ["ReadWriteOnce"]
      storageClassName: fast-ssd
      resources:
        requests:
          storage: 10Gi
---
apiVersion: v1
kind: Service
metadata:
  name: redis-headless
spec:
  clusterIP: None
  selector:
    app: redis
  ports:
  - port: 6379
    name: client
  - port: 16379
    name: gossip`
              },
              {
                language: 'yaml',
                title: 'Volume Snapshot (CSI)',
                code: `# VolumeSnapshotClass
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshotClass
metadata:
  name: csi-snapclass
driver: ebs.csi.aws.com
deletionPolicy: Delete
---
# Create a snapshot
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshot
metadata:
  name: postgres-snapshot-20231215
spec:
  volumeSnapshotClassName: csi-snapclass
  source:
    persistentVolumeClaimName: postgres-data-postgres-0
---
# Restore from snapshot
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-restored
spec:
  storageClassName: fast-ssd
  dataSource:
    name: postgres-snapshot-20231215
    kind: VolumeSnapshot
    apiGroup: snapshot.storage.k8s.io
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 50Gi`
              },
              {
                language: 'yaml',
                title: 'EmptyDir and Other Volume Types',
                code: `apiVersion: v1
kind: Pod
metadata:
  name: volume-types-demo
spec:
  containers:
  - name: app
    image: nginx
    volumeMounts:
    # Temporary storage (deleted when pod dies)
    - name: cache
      mountPath: /cache
    # Shared memory (tmpfs)
    - name: shm
      mountPath: /dev/shm
    # ConfigMap as files
    - name: config
      mountPath: /etc/app/config
    # Secret as files
    - name: certs
      mountPath: /etc/ssl/certs
      readOnly: true
    # Projected volume (multiple sources)
    - name: projected
      mountPath: /etc/projected

  volumes:
  # EmptyDir - shared temp storage
  - name: cache
    emptyDir:
      sizeLimit: 1Gi

  # EmptyDir with memory backing (fast but uses RAM)
  - name: shm
    emptyDir:
      medium: Memory
      sizeLimit: 256Mi

  # ConfigMap volume
  - name: config
    configMap:
      name: app-config
      items:
      - key: app.conf
        path: application.conf
        mode: 0644

  # Secret volume
  - name: certs
    secret:
      secretName: tls-certs
      defaultMode: 0400

  # Projected volume (combine multiple sources)
  - name: projected
    projected:
      sources:
      - configMap:
          name: app-config
      - secret:
          name: app-secrets
      - downwardAPI:
          items:
          - path: labels
            fieldRef:
              fieldPath: metadata.labels`
              },
              {
                language: 'bash',
                title: 'Storage Management Commands',
                code: `# List storage resources
kubectl get storageclass
kubectl get pv
kubectl get pvc
kubectl get pvc -A

# Describe storage
kubectl describe storageclass fast-ssd
kubectl describe pv <pv-name>
kubectl describe pvc postgres-data-postgres-0

# Check PVC binding
kubectl get pvc -o wide

# Expand PVC (if allowVolumeExpansion: true)
kubectl patch pvc postgres-data-postgres-0 -p '{"spec":{"resources":{"requests":{"storage":"100Gi"}}}}'

# StatefulSet operations
kubectl get statefulset
kubectl describe statefulset postgres
kubectl rollout status statefulset postgres
kubectl scale statefulset postgres --replicas=5

# Delete StatefulSet but keep PVCs
kubectl delete statefulset postgres --cascade=orphan

# Access specific pod in StatefulSet
kubectl exec -it postgres-0 -- psql -U postgres
kubectl exec -it postgres-1 -- psql -U postgres

# Volume snapshots
kubectl get volumesnapshot
kubectl get volumesnapshotcontent
kubectl describe volumesnapshot postgres-snapshot

# Check CSI drivers
kubectl get csidrivers`
              }
            ],
            commands: [
              'kubectl get storageclass',
              'kubectl get pv',
              'kubectl get pvc -A',
              'kubectl describe pvc postgres-data-postgres-0',
              'kubectl get statefulset',
              'kubectl scale statefulset postgres --replicas=5',
              'kubectl exec -it postgres-0 -- psql -U postgres'
            ]
          }
        ]
      },

      // Module 7: Infrastructure as Code with Terraform
      {
        id: 'module-7',
        title: 'Infrastructure as Code with Terraform',
        duration: '12-15 hours',
        description: 'Automate infrastructure provisioning with HashiCorp Terraform.',
        lessons: [
          {
            id: 'lesson-7-1',
            title: 'Terraform Basics',
            duration: '4.5h',
            type: 'hands-on',
            description: 'Learn IaC principles, Terraform workflow, HCL syntax, and state management.',
            xpReward: 200,
            hasTerminal: true,
            objectives: [
              'Understand IaC principles (idempotency, declarative config, desired state)',
              'Install and use Terraform CLI (init, fmt, validate, plan, apply, destroy)',
              'Write Terraform configurations with variables, locals, outputs, and providers',
              'Understand resource lifecycle and dependency graph',
              'Use data sources to reference existing infrastructure',
              'Manage state safely (local vs remote) and avoid drift'
            ],
            codeExamples: [
              {
                language: 'hcl',
                title: 'Terraform AWS VPC',
                code: `terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}

provider "aws" {
  region = var.aws_region
  default_tags {
    tags = {
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}

resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "\${var.project_name}-vpc"
  }
}`
              },
              {
                language: 'hcl',
                title: 'Variables, Locals, and Outputs (Production Pattern)',
                code: `# variables.tf
variable "environment" {
  description = "Environment name (dev/staging/prod)"
  type        = string
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "environment must be one of: dev, staging, prod"
  }
}

variable "project_name" {
  description = "Project identifier"
  type        = string
}

variable "tags" {
  description = "Additional tags"
  type        = map(string)
  default     = {}
}

# locals.tf
locals {
  common_tags = merge(
    {
      Project     = var.project_name
      Environment = var.environment
      ManagedBy   = "Terraform"
    },
    var.tags
  )
}

# outputs.tf
output "vpc_id" {
  value       = aws_vpc.main.id
  description = "VPC id"
}

output "vpc_cidr" {
  value       = aws_vpc.main.cidr_block
  description = "VPC CIDR"
}`
              },
              {
                language: 'hcl',
                title: 'Data Sources and Dependencies',
                code: `# Find an existing AMI
data "aws_ami" "al2023" {
  most_recent = true
  owners      = ["amazon"]
  filter {
    name   = "name"
    values = ["al2023-ami-*-x86_64"]
  }
}

resource "aws_security_group" "web" {
  name        = "\${var.project_name}-\${var.environment}-web"
  description = "Web ingress"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "web" {
  ami                    = data.aws_ami.al2023.id
  instance_type          = "t3.micro"
  vpc_security_group_ids = [aws_security_group.web.id]

  tags = merge(local.common_tags, { Name = "\${var.project_name}-\${var.environment}-web" })
}`
              },
              {
                language: 'bash',
                title: 'Terraform Workflow Commands',
                code: `# Install (macOS)
brew tap hashicorp/tap
brew install hashicorp/tap/terraform

# Initialize providers/backend
terraform init

# Format and validate
terraform fmt -recursive
terraform validate

# Plan and apply
terraform plan -out tfplan
terraform apply tfplan

# Show changes/state
terraform show
terraform state list
terraform state show aws_vpc.main

# Destroy safely
terraform destroy

# Useful debugging
TF_LOG=INFO terraform plan
terraform providers
terraform graph | dot -Tsvg > graph.svg`
              }
            ],
            commands: [
              'terraform init',
              'terraform fmt -recursive',
              'terraform validate',
              'terraform plan -out tfplan',
              'terraform apply tfplan',
              'terraform state list',
              'terraform destroy'
            ]
          },
          {
            id: 'lesson-7-2',
            title: 'Terraform Modules & Best Practices',
            duration: '5.5h',
            type: 'hands-on',
            description: 'Create reusable modules, handle versioning, and implement best practices.',
            xpReward: 250,
            hasTerminal: true,
            objectives: [
              'Design reusable Terraform modules with clear inputs and outputs',
              'Structure repos for maintainability (modules/, envs/, shared/)',
              'Version modules and consume them safely (git tags, registry, semantic versioning)',
              'Apply naming, tagging, and provider configuration standards',
              'Avoid anti-patterns (hardcoded values, implicit dependencies, duplicated code)',
              'Validate and document modules (terraform-docs style, input validation)',
              'Add quality gates (fmt, validate, tflint, tfsec/checkov)'
            ],
            codeExamples: [
              {
                language: 'bash',
                title: 'Recommended Repository Layout',
                code: `# Example structure
.
├── modules/
│   ├── vpc/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── README.md
│   └── ecs-service/
│       ├── main.tf
│       ├── variables.tf
│       └── outputs.tf
├── envs/
│   ├── dev/
│   │   ├── main.tf
│   │   ├── backend.tf
│   │   └── terraform.tfvars
│   └── prod/
│       ├── main.tf
│       ├── backend.tf
│       └── terraform.tfvars
└── shared/
    └── versions.tf`
              },
              {
                language: 'hcl',
                title: 'A Simple Module (modules/vpc)',
                code: `# modules/vpc/variables.tf
variable "name" {
  type        = string
  description = "Base name"
}

variable "cidr" {
  type        = string
  description = "VPC CIDR"
}

variable "tags" {
  type        = map(string)
  default     = {}
  description = "Tags to apply"
}

# modules/vpc/main.tf
resource "aws_vpc" "this" {
  cidr_block           = var.cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = merge(var.tags, { Name = var.name })
}

# modules/vpc/outputs.tf
output "vpc_id" {
  value       = aws_vpc.this.id
  description = "VPC id"
}`
              },
              {
                language: 'hcl',
                title: 'Using Modules with Version Pinning',
                code: `# envs/prod/main.tf
terraform {
  required_version = ">= 1.6"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

module "vpc" {
  # Local module
  source = "../../modules/vpc"
  name   = "myapp-prod"
  cidr   = "10.10.0.0/16"
  tags   = { Environment = "prod", Project = "myapp" }
}

module "vpc_from_git" {
  # Git module (pin to tag/commit for repeatability)
  source = "git::https://github.com/myorg/terraform-modules.git//vpc?ref=v1.2.3"
  name   = "myapp-prod"
  cidr   = "10.20.0.0/16"
  tags   = { Environment = "prod", Project = "myapp" }
}`
              },
              {
                language: 'hcl',
                title: 'Best Practices: versions.tf and provider aliases',
                code: `# shared/versions.tf
terraform {
  required_version = ">= 1.6"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# provider aliases (multi-region)
provider "aws" {
  region = "us-east-1"
}

provider "aws" {
  alias  = "west"
  region = "us-west-2"
}

resource "aws_s3_bucket" "logs" {
  provider = aws.west
  bucket   = "myapp-prod-logs"
}`
              },
              {
                language: 'bash',
                title: 'Quality Gates (CI-friendly)',
                code: `# Format + validate
terraform fmt -check -recursive
terraform validate

# Lint (requires tflint installed)
tflint --init
tflint -f compact

# Security scan (choose one)
tfsec .
checkov -d .

# Generate docs (optional)
# terraform-docs markdown table --output-file README.md --output-mode inject modules/vpc`
              }
            ],
            commands: [
              'terraform fmt -check -recursive',
              'terraform validate',
              'tflint --init',
              'tflint -f compact'
            ]
          },
          {
            id: 'lesson-7-3',
            title: 'State Management & Collaboration',
            duration: '4h',
            type: 'hands-on',
            description: 'Manage remote state, implement locking, and work with teams.',
            xpReward: 175,
            hasTerminal: true,
            objectives: [
              'Understand Terraform state: why it exists and how it maps real infrastructure',
              'Configure remote backends (S3+DynamoDB, Terraform Cloud) and enable locking',
              'Separate environments safely (separate state files, not just workspaces)',
              'Use state commands responsibly (state mv/rm/import) and avoid corruption',
              'Collaborate safely with teams (permissions, CI, reviews, plan-only workflows)',
              'Detect and manage drift (refresh, plan, import)'
            ],
            codeExamples: [
              {
                language: 'hcl',
                title: 'Remote State Backend (S3 + DynamoDB Locking)',
                code: `# backend.tf (per environment)
terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "prod/network/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}`
              },
              {
                language: 'hcl',
                title: 'State Lock Table (Bootstrap Pattern)',
                code: `# You typically apply this ONCE in a bootstrap stack
resource "aws_dynamodb_table" "locks" {
  name         = "terraform-locks"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    ManagedBy = "Terraform"
    Purpose   = "State locking"
  }
}

resource "aws_s3_bucket" "state" {
  bucket = "my-terraform-state"
}

resource "aws_s3_bucket_versioning" "state" {
  bucket = aws_s3_bucket.state.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "state" {
  bucket = aws_s3_bucket.state.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}`
              },
              {
                language: 'hcl',
                title: 'Terraform Cloud Backend (Team Collaboration)',
                code: `terraform {
  cloud {
    organization = "my-org"
    workspaces {
      name = "myapp-prod"
    }
  }
}`
              },
              {
                language: 'bash',
                title: 'State Operations (Use Carefully)',
                code: `# Reconfigure backend (when backend.tf changes)
terraform init -reconfigure

# Inspect state
terraform state list
terraform state show aws_vpc.main

# Import existing infrastructure
terraform import aws_s3_bucket.logs myapp-prod-logs

# Move state address (refactor safely)
terraform state mv aws_instance.web aws_instance.web[0]

# Remove from state WITHOUT deleting cloud resource (rare)
terraform state rm aws_instance.legacy

# Refresh + detect drift
terraform plan -refresh-only

# Force unlock (only when you're sure a lock is stale)
terraform force-unlock <LOCK_ID>`
              },
              {
                language: 'bash',
                title: 'Team Workflow (PR + Plan)',
                code: `# Typical safe workflow
terraform fmt -recursive
terraform validate
terraform plan -out tfplan

# In CI, often do plan-only and attach output to PR
terraform show -no-color tfplan | sed -n '1,200p'

# Apply should happen only after review/approval
terraform apply tfplan`
              }
            ],
            commands: [
              'terraform init -reconfigure',
              'terraform plan -refresh-only',
              'terraform state list',
              'terraform import <addr> <id>',
              'terraform state mv <from> <to>'
            ]
          },
          {
            id: 'lesson-7-4',
            title: 'Advanced Terraform Patterns',
            duration: '3h',
            type: 'hands-on',
            description: 'Use dynamic blocks, conditionals, for expressions, and provisioners.',
            xpReward: 150,
            hasTerminal: true,
            objectives: [
              'Use for_each, count, and for expressions to scale infrastructure safely',
              'Write dynamic blocks for repeated nested configuration',
              'Use locals, maps, merge/lookup/try/can to manage complexity',
              'Apply lifecycle rules (create_before_destroy, prevent_destroy, ignore_changes)',
              'Use preconditions/postconditions and variable validation for safety',
              'Understand provisioners and when to avoid them',
              'Refactor safely with moved blocks and state mv'
            ],
            codeExamples: [
              {
                language: 'hcl',
                title: 'for_each vs count (Best Practice)',
                code: `# Prefer for_each when identity matters (stable keys)
variable "subnets" {
  type = map(object({ cidr = string, az = string }))
}

resource "aws_subnet" "this" {
  for_each          = var.subnets
  vpc_id            = aws_vpc.main.id
  cidr_block        = each.value.cidr
  availability_zone = each.value.az

  tags = {
    Name = "subnet-\${each.key}"
  }
}

# count is okay for simple lists
variable "instance_count" {
  type    = number
  default = 2
}

resource "aws_instance" "worker" {
  count         = var.instance_count
  ami           = data.aws_ami.al2023.id
  instance_type = "t3.micro"

  tags = {
    Name = "worker-\${count.index}"
  }
}`
              },
              {
                language: 'hcl',
                title: 'Dynamic Blocks (Security Group Rules)',
                code: `variable "ingress_rules" {
  type = list(object({ from = number, to = number, cidrs = list(string) }))
}

resource "aws_security_group" "app" {
  name  = "app-sg"
  vpc_id = aws_vpc.main.id

  dynamic "ingress" {
    for_each = var.ingress_rules
    content {
      from_port   = ingress.value.from
      to_port     = ingress.value.to
      protocol    = "tcp"
      cidr_blocks = ingress.value.cidrs
    }
  }
}`
              },
              {
                language: 'hcl',
                title: 'Conditionals + try/can + lookup',
                code: `variable "enable_nat" {
  type    = bool
  default = true
}

variable "config" {
  type = map(any)
  default = {}
}

locals {
  instance_type = lookup(var.config, "instance_type", "t3.micro")
  extra_tags    = try(var.config["tags"], {})
  has_owner     = can(var.config["owner"]) && var.config["owner"] != ""
}

resource "aws_nat_gateway" "this" {
  count = var.enable_nat ? 1 : 0
  allocation_id = aws_eip.nat[0].id
  subnet_id     = aws_subnet.public["a"].id

  tags = merge(local.extra_tags, { Name = "nat" })
}`
              },
              {
                language: 'hcl',
                title: 'Lifecycle Safety Guards',
                code: `resource "aws_s3_bucket" "critical" {
  bucket = "myapp-prod-critical-data"

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_lb" "app" {
  name               = "myapp-alb"
  load_balancer_type = "application"

  lifecycle {
    create_before_destroy = true
    ignore_changes        = [tags]
  }
}`
              },
              {
                language: 'hcl',
                title: 'Preconditions/Postconditions',
                code: `resource "aws_instance" "web" {
  ami           = data.aws_ami.al2023.id
  instance_type = "t3.micro"

  lifecycle {
    precondition {
      condition     = var.environment != "prod" || var.instance_count >= 2
      error_message = "In prod, instance_count must be >= 2 for HA."
    }
  }
}

output "web_public_ips" {
  value = [for i in aws_instance.worker : i.public_ip]
  precondition {
    condition     = length([for ip in [for i in aws_instance.worker : i.public_ip] : ip if ip != null]) > 0
    error_message = "No public IPs available (check subnet routing or public IP settings)."
  }
}`
              },
              {
                language: 'hcl',
                title: 'Refactoring with moved blocks',
                code: `# When you rename a resource address, use moved blocks
moved {
  from = aws_security_group.web
  to   = aws_security_group.app
}`
              },
              {
                language: 'bash',
                title: 'Advanced CLI Commands',
                code: `# Console (evaluate expressions)
terraform console

# Targeted plan/apply (use sparingly)
terraform plan -target=aws_security_group.app

# Replace a resource
terraform apply -replace=aws_instance.worker[0]

# Validate module dependency graph
terraform graph | dot -Tpng > graph.png

# Detect and fix drift
terraform plan -refresh-only

# Debug providers
terraform providers
terraform providers lock -platform=darwin_amd64 -platform=linux_amd64`
              }
            ],
            commands: [
              'terraform console',
              'terraform plan -refresh-only',
              'terraform apply -replace=<addr>',
              'terraform graph | dot -Tpng > graph.png'
            ]
          }
        ]
      },

      // Module 8: Advanced CI/CD & GitOps
      {
        id: 'module-8',
        title: 'Advanced CI/CD & GitOps',
        duration: '10-12 hours',
        description: 'Implement GitOps with ArgoCD and advanced deployment strategies.',
        lessons: [
          {
            id: 'lesson-8-1',
            title: 'Advanced Pipeline Patterns',
            duration: '5.5h',
            type: 'hands-on',
            description: 'Implement Blue-Green, Canary deployments, and feature flags.',
            xpReward: 225,
            hasTerminal: true
          },
          {
            id: 'lesson-8-2',
            title: 'GitOps with ArgoCD',
            duration: '5.5h',
            type: 'hands-on',
            description: 'Implement GitOps principles with ArgoCD for declarative deployments.',
            xpReward: 250,
            hasTerminal: true,
            codeExamples: [
              {
                language: 'yaml',
                title: 'ArgoCD Application',
                code: `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: myapp
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/myorg/myapp
    targetRevision: HEAD
    path: k8s/overlays/production
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
    - CreateNamespace=true`
              }
            ]
          },
          {
            id: 'lesson-8-3',
            title: 'Jenkins Pipelines (Groovy)',
            duration: '3h',
            type: 'hands-on',
            description: 'Build declarative and scripted Jenkins pipelines.',
            xpReward: 125,
            hasTerminal: true
          }
        ]
      },

      // Module 9: Microservices Architecture
      {
        id: 'module-9',
        title: 'Microservices Architecture',
        duration: '8-10 hours',
        description: 'Design and implement microservices with modern patterns.',
        lessons: [
          {
            id: 'lesson-9-1',
            title: 'Microservices Patterns',
            duration: '5h',
            type: 'hands-on',
            description: 'Learn service boundaries, API Gateway, service mesh, and event-driven architecture.',
            xpReward: 200,
            hasTerminal: true,
            objectives: [
              'Define service boundaries using bounded contexts and domain-driven design (DDD) basics',
              'Choose between synchronous (request/response) and asynchronous (event-driven) collaboration',
              'Apply core microservices patterns: API Gateway, Backend-for-Frontend (BFF), and Strangler Fig',
              'Understand service mesh responsibilities (mTLS, traffic policy, retries, observability)',
              'Use event-driven patterns like Outbox to keep data consistent across services',
              'Recognize when a modular monolith is the better starting point'
            ],
            codeExamples: [
              {
                language: 'text',
                title: 'Service Boundaries (Example Bounded Contexts)',
                code: `E-Commerce Example Boundaries

- Identity & Access: users, auth, roles
- Catalog: products, categories, pricing
- Cart: cart items, promotions, totals
- Orders: order lifecycle, fulfillment state
- Payments: payment intents, receipts

Rule of thumb: each service owns its data and exposes capabilities via APIs/events.`
              },
              {
                language: 'yaml',
                title: 'API Gateway (Kubernetes Ingress Example)',
                code: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: api-gateway
spec:
  rules:
  - host: api.local
    http:
      paths:
      - path: /catalog
        pathType: Prefix
        backend:
          service:
            name: catalog-svc
            port:
              number: 80
      - path: /orders
        pathType: Prefix
        backend:
          service:
            name: orders-svc
            port:
              number: 80`
              },
              {
                language: 'text',
                title: 'Event-Driven Collaboration (High-Level Flow)',
                code: `OrderCreated event

1) Orders service persists the order + writes an outbox record (same DB transaction)
2) A publisher reads outbox and publishes OrderCreated
3) Payments service consumes OrderCreated and starts payment workflow
4) Inventory service consumes OrderCreated and reserves stock

Benefit: loose coupling + resilience. Trade-off: eventual consistency.`
              }
            ],
            commands: [
              'kubectl get svc,deploy -A',
              'kubectl get ingress -A',
              'kubectl describe ingress api-gateway',
              'kubectl logs deploy/<service> --tail=200',
              'kubectl top pods -A'
            ]
          },
          {
            id: 'lesson-9-2',
            title: 'Service Communication',
            duration: '4h',
            type: 'hands-on',
            description: 'Implement REST, gRPC, message queues, and circuit breakers.',
            xpReward: 175,
            hasTerminal: true,
            objectives: [
              'Compare REST vs gRPC and decide based on latency, contracts, and client ecosystem',
              'Use asynchronous messaging for decoupling and smoothing traffic spikes',
              'Apply timeouts, retries, and circuit breakers without amplifying failures',
              'Design idempotent handlers to tolerate retries and at-least-once delivery',
              'Understand API versioning strategies and backward compatibility',
              'Instrument requests with correlation IDs for end-to-end tracing'
            ],
            codeExamples: [
              {
                language: 'http',
                title: 'REST Contract (Example)',
                code: `GET /v1/catalog/products/{id}
Accept: application/json

200 OK
{
  "id": "p_123",
  "name": "Keyboard",
  "price": 49.99,
  "currency": "USD"
}`
              },
              {
                language: 'proto',
                title: 'gRPC Contract (Example)',
                code: `syntax = "proto3";

package catalog.v1;

service CatalogService {
  rpc GetProduct(GetProductRequest) returns (GetProductResponse);
}

message GetProductRequest {
  string id = 1;
}

message GetProductResponse {
  string id = 1;
  string name = 2;
  double price = 3;
  string currency = 4;
}`
              },
              {
                language: 'text',
                title: 'Resilient Client Defaults (Conceptual)',
                code: `Client-side rules to prevent cascading failure

- Always set a timeout
- Retry only transient errors (timeouts, 429/503, network)
- Use exponential backoff + jitter
- Cap retries (2-3 attempts)
- Add a circuit breaker for dependencies
- Prefer bulkheads for isolation
- Emit metrics: latency, error rate, saturation`
              }
            ],
            commands: [
              'curl -sS http://localhost:3000/health',
              'curl -sS http://api.local/catalog/products/p_123',
              'kubectl get pods -n default',
              'kubectl logs deploy/<service> -n default --tail=200',
              'kubectl port-forward svc/<service> 8080:80'
            ]
          },
          {
            id: 'lesson-9-3',
            title: 'Resilience Patterns',
            duration: '2h',
            type: 'hands-on',
            description: 'Implement circuit breakers, retries, bulkheads, and chaos engineering.',
            xpReward: 100,
            hasTerminal: true,
            objectives: [
              'Implement resilience patterns: timeout, retry with jitter, circuit breaker, and bulkheads',
              'Separate normal failures from overload failures using backpressure',
              'Define SLOs and error budgets to guide reliability decisions',
              'Design graceful degradation (reduced features instead of total outage)',
              'Run a small chaos experiment with blast radius control',
              'Add runbooks and alerts that reduce mean time to recovery (MTTR)'
            ],
            codeExamples: [
              {
                language: 'text',
                title: 'Retry Policy (Guidance)',
                code: `Recommended retry behavior

- Retry only on transient errors
- Use exponential backoff + jitter
- Cap retries (2-3 attempts)
- Enforce per-try and overall time budgets
- Ensure idempotency (idempotency keys or dedupe store)`
              },
              {
                language: 'text',
                title: 'Bulkhead Pattern (Concept)',
                code: `Bulkhead = isolate resources

Example:
- Separate thread pools/queues per downstream dependency
- Prevent one slow dependency from exhausting all workers

Result:
- Partial degradation instead of full outage`
              },
              {
                language: 'bash',
                title: 'Chaos Drill (Simple Pod Kill)',
                code: `# Pick a non-production namespace for drills
kubectl get pods -n default

# Delete one pod to validate self-heal
kubectl delete pod -n default <pod-name>

# Confirm replacement
kubectl get pods -n default -w`
              }
            ],
            commands: [
              'kubectl get events -n default --sort-by=.metadata.creationTimestamp | tail -50',
              'kubectl describe deploy/<service> -n default',
              'kubectl rollout status deploy/<service> -n default --timeout=120s',
              'kubectl rollout history deploy/<service> -n default',
              'kubectl rollout undo deploy/<service> -n default'
            ]
          }
        ],
        project: {
          id: 'project-4',
          title: 'PROJECT 4: Microservices E-Commerce Platform',
          duration: '15-18 hours',
          type: 'project',
          description: 'Build a production-grade microservices application with full DevOps pipeline.',
          xpReward: 750,
          hasTerminal: true,
          objectives: [
            'User Service (Authentication)',
            'Product Catalog Service',
            'Shopping Cart Service',
            'Order Service',
            'Payment Service (mock)',
            'API Gateway (Kong/Ambassador)',
            'Service Mesh (Istio/Linkerd)',
            'GitOps with ArgoCD',
            'Distributed tracing (Jaeger)',
            'Centralized logging (ELK/Loki)'
          ],
          deliverables: [
            'GitHub organization with all repos',
            'Architecture diagram',
            'API documentation',
            'Performance test results',
            'Monitoring dashboards',
            'Incident response runbook',
            'Video demo (15 min)',
            'Cost analysis'
          ]
        }
      }
    ]
  },

  // ============================================================
  // PHASE 3: ADVANCED DEVOPS
  // ============================================================
  {
    id: 'phase-3',
    title: 'Phase 3: Advanced DevOps',
    subtitle: 'Production-Grade Systems',
    duration: '35-45 hours',
    level: 'advanced',
    description: 'Build and manage production Kubernetes clusters, implement observability, and security.',
    icon: '🚀',
    color: 'purple',
    modules: [
      // Module 10: Production Kubernetes
      {
        id: 'module-10',
        title: 'Production Kubernetes',
        duration: '12-15 hours',
        description: 'Manage enterprise Kubernetes clusters with advanced features.',
        lessons: [
          {
            id: 'lesson-10-1',
            title: 'Cluster Management',
            duration: '6h',
            type: 'hands-on',
            description: 'Bootstrap clusters, manage nodes, handle upgrades, and backups.',
            xpReward: 250,
            hasTerminal: true,
            objectives: [
              'Understand cluster lifecycle responsibilities: bootstrap, scale, upgrade, and decommission',
              'Operate nodes safely: cordon, drain, and uncordon without disrupting SLOs',
              'Plan and execute Kubernetes upgrades (control plane and nodes) with rollback strategy',
              'Implement and validate etcd backup/restore procedures (disaster recovery basics)',
              'Harden access with RBAC and least privilege for cluster operators',
              'Use cluster health signals (events, node conditions, component status) to troubleshoot'
            ],
            codeExamples: [
              {
                language: 'bash',
                title: 'Node Maintenance (Cordon → Drain → Uncordon)',
                code: `# Mark a node unschedulable
kubectl cordon <node-name>

# Evict workloads safely (respecting PDBs where possible)
kubectl drain <node-name> --ignore-daemonsets --delete-emptydir-data --grace-period=60

# Perform maintenance/upgrade... then re-enable scheduling
kubectl uncordon <node-name>`
              },
              {
                language: 'yaml',
                title: 'Cluster Operator RBAC (Example: Read-only)',
                code: `apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: ops-readonly
rules:
- apiGroups: ["*"]
  resources: ["*"]
  verbs: ["get", "list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: ops-readonly-binding
subjects:
- kind: User
  name: ops@example.com
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: ops-readonly
  apiGroup: rbac.authorization.k8s.io`
              },
              {
                language: 'bash',
                title: 'etcd Backup (Conceptual Commands)',
                code: `# NOTE: exact paths/flags depend on your distro (kubeadm, managed K8s, etc.)

# Example: snapshot etcd
ETCDCTL_API=3 etcdctl snapshot save /backup/etcd-snapshot.db \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key

ETCDCTL_API=3 etcdctl snapshot status /backup/etcd-snapshot.db` 
              }
            ],
            commands: [
              'kubectl get nodes -o wide',
              'kubectl describe node <node-name>',
              'kubectl get events -A --sort-by=.metadata.creationTimestamp | tail -50',
              'kubectl top nodes',
              'kubectl cordon <node-name>',
              'kubectl drain <node-name> --ignore-daemonsets --delete-emptydir-data',
              'kubectl uncordon <node-name>'
            ]
          },
          {
            id: 'lesson-10-2',
            title: 'Advanced Workload Management',
            duration: '5.5h',
            type: 'hands-on',
            description: 'Configure PDBs, priority classes, resource quotas, and autoscaling.',
            xpReward: 225,
            hasTerminal: true,
            objectives: [
              'Use PodDisruptionBudgets (PDBs) to control voluntary disruption during upgrades',
              'Apply PriorityClasses to protect critical workloads under resource pressure',
              'Enforce ResourceQuotas and LimitRanges to prevent noisy-neighbor issues',
              'Configure Horizontal Pod Autoscaler (HPA) and understand scaling signals/limits',
              'Use Cluster Autoscaler concepts (node scaling) and scheduling constraints',
              'Design workloads with readiness/liveness probes for safe rollouts'
            ],
            codeExamples: [
              {
                language: 'yaml',
                title: 'PodDisruptionBudget (Min Available)',
                code: `apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: api-pdb
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: api` 
              },
              {
                language: 'yaml',
                title: 'PriorityClass (Protect Critical Services)',
                code: `apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: critical-services
value: 100000
globalDefault: false
description: "Used for critical workloads"` 
              },
              {
                language: 'yaml',
                title: 'HPA (CPU-based Autoscaling)',
                code: `apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 60` 
              }
            ],
            commands: [
              'kubectl get pdb -A',
              'kubectl describe pdb <pdb-name> -n <ns>',
              'kubectl get priorityclass',
              'kubectl get resourcequota -A',
              'kubectl get limitrange -A',
              'kubectl get hpa -A',
              'kubectl describe hpa <hpa-name> -n <ns>'
            ]
          },
          {
            id: 'lesson-10-3',
            title: 'Service Mesh Deep Dive',
            duration: '5.5h',
            type: 'hands-on',
            description: 'Master Istio for traffic management, security, and observability.',
            xpReward: 250,
            hasTerminal: true,
            objectives: [
              'Explain what a service mesh does (mTLS, traffic policy, telemetry) and what it does not do',
              'Install and validate a mesh (Istio) in a cluster safely',
              'Apply traffic management: retries, timeouts, request routing, and progressive delivery basics',
              'Secure service-to-service communication with mTLS and authorization policies',
              'Use mesh telemetry to troubleshoot latency and error spikes',
              'Avoid common mesh pitfalls (overly aggressive retries, global policies, noisy telemetry)'
            ],
            codeExamples: [
              {
                language: 'yaml',
                title: 'DestinationRule (mTLS + Connection Pool)',
                code: `apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: api-dr
spec:
  host: api.default.svc.cluster.local
  trafficPolicy:
    tls:
      mode: ISTIO_MUTUAL
    connectionPool:
      http:
        http1MaxPendingRequests: 100
        maxRequestsPerConnection: 1000` 
              },
              {
                language: 'yaml',
                title: 'VirtualService (Weighted Routing Canary)',
                code: `apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: api-vs
spec:
  hosts:
  - api
  http:
  - route:
    - destination:
        host: api
        subset: stable
      weight: 90
    - destination:
        host: api
        subset: canary
      weight: 10` 
              },
              {
                language: 'yaml',
                title: 'AuthorizationPolicy (Zero Trust Example)',
                code: `apiVersion: security.istio.io/v1
kind: AuthorizationPolicy
metadata:
  name: api-allow-orders
spec:
  selector:
    matchLabels:
      app: api
  action: ALLOW
  rules:
  - from:
    - source:
        principals:
        - cluster.local/ns/default/sa/orders-sa` 
              }
            ],
            commands: [
              'kubectl create namespace istio-system',
              'istioctl install --set profile=demo -y',
              'kubectl label namespace default istio-injection=enabled --overwrite',
              'kubectl get pods -n istio-system',
              'kubectl get virtualservice,destinationrule -A',
              'istioctl proxy-status'
            ]
          }
        ]
      },

      // Module 11: Observability & Monitoring
      {
        id: 'module-11',
        title: 'Observability & Monitoring',
        duration: '12-15 hours',
        description: 'Implement comprehensive observability with metrics, logs, and traces.',
        lessons: [
          {
            id: 'lesson-11-1',
            title: 'Metrics with Prometheus & Grafana',
            duration: '5.5h',
            type: 'hands-on',
            description: 'Configure Prometheus, write PromQL queries, and build Grafana dashboards.',
            xpReward: 250,
            hasTerminal: true,
            objectives: [
              'Explain metrics fundamentals (counters, gauges, histograms) and when to use each',
              'Deploy Prometheus and identify what it is scraping (targets, service discovery)',
              'Write PromQL queries for golden signals: latency, traffic, errors, saturation',
              'Build Grafana dashboards that support incident response (not vanity charts)',
              'Create alert rules with correct thresholds and burn-rate mindset',
              'Avoid common monitoring anti-patterns (alert fatigue, missing context)'
            ],
            codeExamples: [
              {
                language: 'yaml',
                title: 'ServiceMonitor (Prometheus Operator Example)',
                code: `apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: api-servicemonitor
spec:
  selector:
    matchLabels:
      app: api
  endpoints:
  - port: http
    path: /metrics
    interval: 15s` 
              },
              {
                language: 'promql',
                title: 'PromQL: Request Rate + Error Rate',
                code: `# Requests per second (all 2xx/3xx/4xx/5xx)
sum(rate(http_requests_total[5m]))

# Error rate (5xx only)
sum(rate(http_requests_total{status=~"5.."}[5m]))` 
              },
              {
                language: 'promql',
                title: 'PromQL: Latency (p95) From Histogram',
                code: `histogram_quantile(
  0.95,
  sum by (le) (rate(http_request_duration_seconds_bucket[5m]))
)` 
              }
            ],
            commands: [
              'kubectl create namespace monitoring',
              'kubectl get pods -n monitoring',
              'kubectl get svc -n monitoring',
              'kubectl port-forward -n monitoring svc/grafana 3000:80',
              'kubectl port-forward -n monitoring svc/prometheus-k8s 9090:9090',
              'kubectl get servicemonitor -A'
            ]
          },
          {
            id: 'lesson-11-2',
            title: 'Logging with ELK/Loki',
            duration: '5.5h',
            type: 'hands-on',
            description: 'Set up centralized logging with Loki and Promtail.',
            xpReward: 225,
            hasTerminal: true,
            objectives: [
              'Explain structured logging and why “grep-able” logs are not enough in production',
              'Deploy Loki + Promtail (or Fluent Bit) and verify log ingestion end-to-end',
              'Write LogQL queries to debug incidents (filters, parsing, aggregation)',
              'Design log labels safely (avoid high cardinality that breaks cost/perf)',
              'Correlate logs with metrics and traces using correlation IDs',
              'Set retention and access controls to meet operational and compliance needs'
            ],
            codeExamples: [
              {
                language: 'json',
                title: 'Structured Log (Example)',
                code: `{
  "level": "info",
  "service": "orders",
  "message": "Created order",
  "orderId": "o_123",
  "traceId": "4bf92f3577b34da6a3ce929d0e0e4736",
  "spanId": "00f067aa0ba902b7",
  "userId": "u_42"
}`
              },
              {
                language: 'text',
                title: 'LogQL (Common Patterns)',
                code: `{service="orders"} |= "error"

{service="orders"} | json | level="error"

count_over_time({service="orders"} |= "timeout" [5m])` 
              },
              {
                language: 'yaml',
                title: 'Promtail Pipeline (Conceptual)',
                code: `pipeline_stages:
- json:
    expressions:
      level: level
      service: service
      traceId: traceId
- labels:
    service:
    level:` 
              }
            ],
            commands: [
              'kubectl create namespace logging',
              'kubectl get pods -n logging',
              'kubectl get svc -n logging',
              'kubectl logs -n logging deploy/loki --tail=200',
              'kubectl logs -n logging ds/promtail --tail=200',
              'kubectl port-forward -n logging svc/loki 3100:3100'
            ]
          },
          {
            id: 'lesson-11-3',
            title: 'Distributed Tracing with Jaeger',
            duration: '4h',
            type: 'hands-on',
            description: 'Implement OpenTelemetry and Jaeger for request tracing.',
            xpReward: 175,
            hasTerminal: true,
            objectives: [
              'Explain traces, spans, and context propagation (why logs alone are insufficient)',
              'Instrument a service with OpenTelemetry (OTel) and export spans to Jaeger',
              'Trace a request across services and identify the slow hop',
              'Use semantic conventions (service.name, http.method, status) for consistency',
              'Avoid tracing pitfalls (sampling, PII in attributes, noisy spans)',
              'Correlate traces with logs and metrics via trace IDs'
            ],
            codeExamples: [
              {
                language: 'yaml',
                title: 'OpenTelemetry Collector (Minimal Export to Jaeger)',
                code: `receivers:
  otlp:
    protocols:
      grpc:
      http:

exporters:
  jaeger:
    endpoint: jaeger-collector.default.svc.cluster.local:14250
    tls:
      insecure: true

service:
  pipelines:
    traces:
      receivers: [otlp]
      exporters: [jaeger]` 
              },
              {
                language: 'text',
                title: 'Trace Debug Checklist',
                code: `When a request is slow:

1) Find the trace for the request
2) Identify the span with the longest duration
3) Check if it's CPU-bound, IO-bound, or blocked on a dependency
4) Validate retries/timeouts are not amplifying work
5) Correlate with logs (traceId) and metrics (latency/error spikes)` 
              }
            ],
            commands: [
              'kubectl get pods -A | grep -i jaeger',
              'kubectl port-forward svc/jaeger-query 16686:16686',
              'kubectl logs deploy/<service> --tail=200',
              'kubectl describe deploy/<service>'
            ]
          },
          {
            id: 'lesson-11-4',
            title: 'APM & Synthetic Monitoring',
            duration: '2h',
            type: 'hands-on',
            description: 'Set up APM, uptime monitoring, and define SLIs/SLOs.',
            xpReward: 100,
            hasTerminal: true,
            objectives: [
              'Define SLIs and SLOs that reflect user experience (not internal metrics)',
              'Use burn-rate alerting concepts to balance fast detection with low noise',
              'Set up synthetic checks (uptime + basic flows) for early warning',
              'Create incident-ready dashboards (golden signals + top dependencies)',
              'Understand APM trade-offs (sampling, cost, PII) and safe instrumentation',
              'Write a minimal runbook: alert → diagnosis steps → rollback/mitigation'
            ],
            codeExamples: [
              {
                language: 'text',
                title: 'SLI/SLO Example',
                code: `Example SLO for an API:

- SLI: % of requests with HTTP 2xx/3xx within 300ms
- SLO: 99.9% over 30 days
- Error budget: 0.1% of requests can violate the SLO` 
              },
              {
                language: 'bash',
                title: 'Synthetic Check (Simple)',
                code: `# Example uptime/synthetic check
curl -fsS https://api.example.com/health

# Example basic flow check
curl -fsS https://api.example.com/catalog/products/p_123 | head -50` 
              },
              {
                language: 'text',
                title: 'Runbook Skeleton (Minimum)',
                code: `Runbook Template

1) What does the alert mean?
2) What dashboards confirm impact?
3) Common causes and quick checks
4) Mitigation steps (scale, rollback, feature flag)
5) Escalation + comms` 
              }
            ],
            commands: [
              'curl -fsS http://localhost:3000/health',
              'kubectl get pods -A',
              'kubectl top pods -A',
              'kubectl get events -A --sort-by=.metadata.creationTimestamp | tail -50',
              'kubectl rollout status deploy/<service> -n <ns> --timeout=120s'
            ]
          }
        ]
      },

      // Module 12: Security & Compliance
      {
        id: 'module-12',
        title: 'Security & Compliance',
        duration: '10-12 hours',
        description: 'Implement container security, secrets management, and compliance.',
        lessons: [
          {
            id: 'lesson-12-1',
            title: 'Container Security',
            duration: '4.5h',
            type: 'hands-on',
            description: 'Image scanning, runtime security, admission controllers, and Pod Security.',
            xpReward: 200,
            hasTerminal: true,
            objectives: [
              'Understand the container threat model across build, ship, and run stages',
              'Scan images for vulnerabilities and interpret results (severity, fixability, false positives)',
              'Implement least-privilege runtime configuration (runAsNonRoot, readOnlyRootFilesystem, drop caps)',
              'Apply Kubernetes Pod Security Standards (baseline/restricted) and enforce via admission',
              'Add supply-chain controls (SBOMs, signature verification, provenance basics)',
              'Create a simple response workflow for new CVEs (triage → patch → redeploy)'
            ],
            codeExamples: [
              {
                language: 'dockerfile',
                title: 'Hardened Dockerfile Pattern (Non-root + Minimal)',
                code: `# Example pattern (language/runtime varies)
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# Create non-root user
RUN addgroup -S app && adduser -S app -G app
USER app

COPY --from=build /app/dist ./dist
CMD ["node", "dist/server.js"]`
              },
              {
                language: 'yaml',
                title: 'Pod Security Context (Least Privilege)',
                code: `apiVersion: v1
kind: Pod
metadata:
  name: secure-pod
spec:
  securityContext:
    runAsNonRoot: true
    seccompProfile:
      type: RuntimeDefault
  containers:
  - name: app
    image: myorg/app:1.0.0
    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      capabilities:
        drop: ["ALL"]`
              },
              {
                language: 'yaml',
                title: 'Pod Security Admission Labels (Restricted)',
                code: `# Apply on a namespace
kubectl label ns my-namespace \
  pod-security.kubernetes.io/enforce=restricted \
  pod-security.kubernetes.io/audit=restricted \
  pod-security.kubernetes.io/warn=restricted --overwrite`
              }
            ],
            commands: [
              'docker build -t myorg/app:local .',
              'docker scout cves myorg/app:local',
              'trivy image myorg/app:local',
              'kubectl get ns --show-labels',
              'kubectl label ns <ns> pod-security.kubernetes.io/enforce=restricted --overwrite',
              'kubectl describe pod <pod> -n <ns>'
            ]
          },
          {
            id: 'lesson-12-2',
            title: 'Secrets Management',
            duration: '4h',
            type: 'hands-on',
            description: 'Use Vault, External Secrets Operator, and Sealed Secrets.',
            xpReward: 175,
            hasTerminal: true,
            objectives: [
              'Understand secret lifecycle: creation, storage, rotation, and revocation',
              'Differentiate config vs secrets and avoid leaking secrets into logs/images/repos',
              'Use Kubernetes Secrets safely (least exposure, RBAC, avoid env var dumps)',
              'Use Sealed Secrets for GitOps-friendly encrypted secret storage',
              'Use External Secrets Operator for pulling secrets from Vault/Cloud providers',
              'Design rotation workflows without downtime (dual keys, staged rollout)'
            ],
            codeExamples: [
              {
                language: 'yaml',
                title: 'Kubernetes Secret (Opaque) + Mount as File',
                code: `apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
type: Opaque
stringData:
  username: app
  password: super-secret
---
apiVersion: v1
kind: Pod
metadata:
  name: app
spec:
  containers:
  - name: app
    image: myorg/app:1.0.0
    volumeMounts:
    - name: db-creds
      mountPath: /secrets
      readOnly: true
  volumes:
  - name: db-creds
    secret:
      secretName: db-credentials`
              },
              {
                language: 'yaml',
                title: 'SealedSecret (Conceptual Example)',
                code: `apiVersion: bitnami.com/v1alpha1
kind: SealedSecret
metadata:
  name: db-credentials
  namespace: default
spec:
  encryptedData:
    password: AgBf...redacted...
  template:
    type: Opaque`
              },
              {
                language: 'yaml',
                title: 'ExternalSecret (ESO Conceptual Example)',
                code: `apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: db-credentials
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: vault
    kind: ClusterSecretStore
  target:
    name: db-credentials
  data:
  - secretKey: password
    remoteRef:
      key: kv/app/db
      property: password`
              }
            ],
            commands: [
              'kubectl create secret generic db-credentials --from-literal=username=app --from-literal=password=changeme',
              'kubectl get secret db-credentials -o yaml',
              'kubectl auth can-i get secrets -n <ns> --as <user>',
              'kubeseal --format=yaml < secret.yaml > sealedsecret.yaml',
              'kubectl apply -f sealedsecret.yaml'
            ]
          },
          {
            id: 'lesson-12-3',
            title: 'Compliance & Auditing',
            duration: '4.5h',
            type: 'hands-on',
            description: 'Implement RBAC, audit logging, and policy as code.',
            xpReward: 200,
            hasTerminal: true,
            objectives: [
              'Understand the purpose of audit logs: who did what, when, and from where',
              'Implement least-privilege RBAC and validate access with `kubectl auth can-i`',
              'Adopt policy-as-code to prevent insecure workloads from being deployed',
              'Design evidence collection for compliance (retention, immutability, access controls)',
              'Create a minimal incident/audit investigation workflow using logs and events',
              'Document controls (what is enforced, how it is monitored, and how exceptions are handled)'
            ],
            codeExamples: [
              {
                language: 'yaml',
                title: 'RBAC: Namespace Read-Only Role',
                code: `apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: ns-readonly
  namespace: default
rules:
- apiGroups: ["", "apps"]
  resources: ["pods", "services", "deployments"]
  verbs: ["get", "list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: ns-readonly-binding
  namespace: default
subjects:
- kind: User
  name: analyst@example.com
roleRef:
  kind: Role
  name: ns-readonly
  apiGroup: rbac.authorization.k8s.io`
              },
              {
                language: 'yaml',
                title: 'Kubernetes Audit Policy (Conceptual)',
                code: `apiVersion: audit.k8s.io/v1
kind: Policy
rules:
- level: Metadata
  resources:
  - group: ""
    resources: ["secrets"]
- level: RequestResponse
  verbs: ["create", "update", "patch", "delete"]
  resources:
  - group: "apps"
    resources: ["deployments"]`
              },
              {
                language: 'text',
                title: 'Policy-as-Code Checklist (What to Enforce)',
                code: `Examples of enforceable controls:

- Disallow privileged pods
- Require runAsNonRoot + drop capabilities
- Require resource requests/limits
- Restrict allowed registries
- Require image signatures (if available)
- Require approved namespaces and labels` 
              }
            ],
            commands: [
              'kubectl auth can-i create pods -n default --as=analyst@example.com',
              'kubectl get role,rolebinding -n default',
              'kubectl get clusterrole,clusterrolebinding | head -50',
              'kubectl get events -A --sort-by=.metadata.creationTimestamp | tail -50',
              'kubectl describe ns <ns>'
            ]
          }
        ],
        project: {
          id: 'project-6',
          title: 'PROJECT 6: Production-Grade Kubernetes Platform',
          duration: '20-25 hours',
          type: 'project',
          description: 'Build an enterprise-ready Kubernetes platform with full observability.',
          xpReward: 1000,
          hasTerminal: true,
          objectives: [
            'Multi-AZ EKS/GKE/AKS cluster',
            'Ingress controller with SSL',
            'ArgoCD for GitOps',
            'Prometheus + Grafana + Loki stack',
            'Pod Security Standards',
            'Network policies and RBAC',
            'HPA/VPA autoscaling',
            'Disaster recovery procedures'
          ],
          deliverables: [
            'Complete infrastructure code',
            'Helm charts for platform components',
            'Monitoring dashboards (JSON)',
            'Runbook for operations',
            'Disaster recovery procedures',
            'Load test results',
            'Security audit report',
            'Video walkthrough (20 min)'
          ]
        }
      }
    ]
  },

  // ============================================================
  // PHASE 4: MLOPS INTRODUCTION
  // ============================================================
  {
    id: 'phase-4',
    title: 'Phase 4: MLOps Introduction',
    subtitle: 'Machine Learning Operations',
    duration: '25-35 hours',
    level: 'intermediate',
    description: 'Learn ML fundamentals, experiment tracking, data versioning, and model serving.',
    icon: '🧠',
    color: 'yellow',
    modules: [
      // Module 13: Machine Learning Fundamentals
      {
        id: 'module-13',
        title: 'Machine Learning Fundamentals',
        duration: '8-10 hours',
        description: 'Understand ML workflow and Python for ML operations.',
        lessons: [
          {
            id: 'lesson-13-1',
            title: 'ML Basics for DevOps Engineers',
            duration: '6h',
            type: 'hands-on',
            description: 'Learn ML workflow, training vs inference, and model evaluation.',
            xpReward: 250,
            hasTerminal: true,
            objectives: [
              'Explain the ML lifecycle (data → training → evaluation → deployment → monitoring)',
              'Differentiate training-time concerns vs inference-time concerns (latency, throughput, drift)',
              'Define common problem types (classification, regression) and their evaluation metrics',
              'Run a minimal supervised learning workflow end-to-end and persist artifacts',
              'Identify operational risks: data leakage, skew, drift, reproducibility gaps'
            ],
            codeExamples: [
              {
                language: 'python',
                title: 'Simple ML Workflow',
                code: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score
import joblib

# Load data
df = pd.read_csv('data.csv')
X = df.drop('target', axis=1)
y = df['target']

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, y_pred)}")
print(f"Precision: {precision_score(y_test, y_pred)}")
print(f"Recall: {recall_score(y_test, y_pred)}")

# Save model
joblib.dump(model, 'model.joblib')`
              },
              {
                language: 'python',
                title: 'Training vs Inference (API Shape)',
                code: `"""Minimal example showing different concerns in training vs inference."""

import joblib
import numpy as np

def train(X_train, y_train):
    from sklearn.linear_model import LogisticRegression
    model = LogisticRegression(max_iter=200)
    model.fit(X_train, y_train)
    joblib.dump(model, 'model.joblib')
    return model

def predict(features):
    # Inference should be fast, deterministic, and validated.
    model = joblib.load('model.joblib')
    features = np.asarray(features).reshape(1, -1)
    proba = model.predict_proba(features)[0, 1]
    return {"score": float(proba)}

# Example inference payload
print(predict([0.2, 1.1, -0.4, 0.0]))`
              },
              {
                language: 'python',
                title: 'Evaluation: Confusion Matrix and Thresholding',
                code: `import numpy as np
from sklearn.metrics import confusion_matrix, classification_report

# y_true and y_prob would come from your test set
y_true = np.array([1, 0, 1, 0, 1, 0])
y_prob = np.array([0.9, 0.6, 0.7, 0.2, 0.51, 0.1])

threshold = 0.6
y_pred = (y_prob >= threshold).astype(int)

print('threshold:', threshold)
print('confusion_matrix:\n', confusion_matrix(y_true, y_pred))
print(classification_report(y_true, y_pred))`
              }
            ],
            commands: [
              'python3 -m venv .venv && source .venv/bin/activate',
              'python -m pip install -U pip',
              'pip install pandas scikit-learn joblib',
              'python -c "import sklearn; print(sklearn.__version__)"',
              'python train.py',
              'ls -lh model.joblib'
            ]
          },
          {
            id: 'lesson-13-2',
            title: 'Python for ML Operations',
            duration: '4h',
            type: 'hands-on',
            description: 'Master virtual environments, Jupyter, pandas, numpy, and scikit-learn.',
            xpReward: 175,
            hasTerminal: true,
            objectives: [
              'Create reproducible Python environments for ML projects (venv/requirements lock)',
              'Use notebooks responsibly (reproducible runs, parameterization mindset)',
              'Perform basic data inspection and transformations using pandas',
              'Structure ML code into modules and scripts (notebook → package)',
              'Capture and debug common dependency and platform issues'
            ],
            codeExamples: [
              {
                language: 'bash',
                title: 'Reproducible Environment (venv + requirements)',
                code: `python3 -m venv .venv
source .venv/bin/activate
python -m pip install -U pip

pip install pandas numpy scikit-learn joblib jupyter

pip freeze > requirements.txt
python -c "import pandas, numpy, sklearn; print('ok')"`
              },
              {
                language: 'python',
                title: 'Pandas Data Audit (Nulls, Types, Drift Clues)',
                code: `import pandas as pd

df = pd.read_csv('data.csv')

print('shape:', df.shape)
print('\nhead:\n', df.head())
print('\ndtypes:\n', df.dtypes)
print('\nnulls:\n', df.isna().sum().sort_values(ascending=False).head(10))

# Basic distribution sanity checks
numeric_cols = df.select_dtypes(include='number').columns
print('\nsummary:\n', df[numeric_cols].describe().T[['mean','std','min','max']].head())`
              },
              {
                language: 'python',
                title: 'Script-Friendly Notebook Pattern (main guard)',
                code: `def run_training(data_path: str) -> str:
    # Return path to saved artifact for downstream steps.
    import joblib
    import pandas as pd
    from sklearn.model_selection import train_test_split
    from sklearn.linear_model import LogisticRegression

    df = pd.read_csv(data_path)
    X = df.drop('target', axis=1)
    y = df['target']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = LogisticRegression(max_iter=200)
    model.fit(X_train, y_train)

    path = 'model.joblib'
    joblib.dump(model, path)
    return path

if __name__ == '__main__':
    artifact = run_training('data.csv')
    print('saved:', artifact)`
              }
            ],
            commands: [
              'python3 -m venv .venv && source .venv/bin/activate',
              'pip install -U pip',
              'pip install jupyter pandas numpy scikit-learn joblib',
              'jupyter --version',
              'python -c "import pandas as pd; print(pd.__version__)"',
              'pip freeze | head -20'
            ]
          }
        ]
      },

      // Module 14: MLOps Fundamentals
      {
        id: 'module-14',
        title: 'MLOps Fundamentals',
        duration: '10-12 hours',
        description: 'Learn experiment tracking, data versioning, and model serving basics.',
        lessons: [
          {
            id: 'lesson-14-1',
            title: 'ML Lifecycle & MLOps Principles',
            duration: '2h',
            type: 'theory',
            description: 'Understand ML lifecycle stages, MLOps vs DevOps, and key tools.',
            xpReward: 75,
            hasTerminal: false,
            objectives: [
              'Explain end-to-end ML system stages (data, training, evaluation, deployment, monitoring)',
              'Describe how MLOps extends DevOps (data + model + experiment lineage)',
              'Identify core MLOps capabilities: reproducibility, versioning, CI/CD, governance',
              'Map common tools to the lifecycle (MLflow, DVC, registries, serving frameworks)',
              'Recognize failure modes: leakage, skew, drift, brittle environments'
            ],
            codeExamples: [
              {
                language: 'text',
                title: 'Lifecycle Artifacts (What to Version)',
                code: `DATA: raw snapshots, processed datasets, feature definitions
CODE: training code, preprocessing, inference logic
CONFIG: hyperparameters, environment, runtime settings
ARTIFACTS: model binaries, metrics reports, plots
LINEAGE: dataset version -> code version -> model version -> deployment version`
              },
              {
                language: 'text',
                title: 'MLOps Control Plane (Typical Components)',
                code: `Experiment tracking: MLflow (params/metrics/artifacts)
Data versioning: DVC (data snapshots + pipeline)
Model registry: MLflow Registry / cloud registries
Serving: FastAPI/BentoML/KServe
Monitoring: logs, metrics, drift + performance monitoring
Policy/governance: approvals, access control, audit trails`
              }
            ]
          },
          {
            id: 'lesson-14-2',
            title: 'Experiment Tracking with MLflow',
            duration: '5h',
            type: 'hands-on',
            description: 'Log experiments, metrics, artifacts, and register models.',
            xpReward: 225,
            hasTerminal: true,
            objectives: [
              'Run MLflow locally and understand tracking URI concepts',
              'Log parameters, metrics, and artifacts for repeatable experiments',
              'Compare runs and select a candidate model based on metrics',
              'Register a model version and record lineage',
              'Package a model artifact for downstream serving'
            ],
            codeExamples: [
              {
                language: 'python',
                title: 'MLflow: Log Params, Metrics, and Model Artifact',
                code: `import mlflow
import mlflow.sklearn
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

params = {"C": 1.0, "max_iter": 200}

with mlflow.start_run(run_name="logreg-iris"):
    model = LogisticRegression(**params)
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    acc = accuracy_score(y_test, y_pred)

    mlflow.log_params(params)
    mlflow.log_metric("accuracy", acc)
    mlflow.sklearn.log_model(model, artifact_path="model")

    print("accuracy=", acc)`
              },
              {
                language: 'bash',
                title: 'MLflow UI + Local Tracking',
                code: `# Start UI
mlflow ui --host 0.0.0.0 --port 5000

# In another terminal, run your training script
python train.py

# Open http://localhost:5000 to compare runs`
              }
            ],
            commands: [
              'python3 -m venv .venv && source .venv/bin/activate',
              'pip install -U pip',
              'pip install mlflow scikit-learn pandas',
              'mlflow --version',
              'mlflow ui --host 0.0.0.0 --port 5000',
              'python train.py'
            ]
          },
          {
            id: 'lesson-14-3',
            title: 'Data Versioning with DVC',
            duration: '4h',
            type: 'hands-on',
            description: 'Version data, create pipelines, and track metrics.',
            xpReward: 175,
            hasTerminal: true,
            objectives: [
              'Initialize DVC in a repo and understand how it relates to Git',
              'Version datasets as first-class artifacts',
              'Create a simple DVC pipeline (stages + dependencies)',
              'Reproduce pipeline runs deterministically',
              'Track and compare metrics across dataset versions'
            ],
            codeExamples: [
              {
                language: 'bash',
                title: 'DVC: Initialize, Add Data, and Push',
                code: `git init
dvc init

# Add dataset (creates .dvc file, data stays out of git)
dvc add data/raw.csv
git add data/raw.csv.dvc .gitignore
git commit -m "Track raw dataset with DVC"

# Configure a remote (example: local folder)
dvc remote add -d localremote /tmp/dvcstore
dvc push`
              },
              {
                language: 'bash',
                title: 'DVC Pipeline: Stages + Reproducibility',
                code: `# Example stages: prepare -> train -> evaluate
dvc stage add -n prepare -d src/prepare.py -d data/raw.csv -o data/clean.csv python src/prepare.py
dvc stage add -n train -d src/train.py -d data/clean.csv -o models/model.joblib python src/train.py
dvc stage add -n eval -d src/eval.py -d models/model.joblib -o reports/metrics.json python src/eval.py

dvc repro
dvc metrics show
dvc dag`
              }
            ],
            commands: [
              'python3 -m venv .venv && source .venv/bin/activate',
              'pip install -U pip',
              'pip install dvc',
              'dvc --version',
              'dvc init',
              'dvc repro'
            ]
          },
          {
            id: 'lesson-14-4',
            title: 'Model Serving Basics',
            duration: '3h',
            type: 'hands-on',
            description: 'Serve models with Flask/FastAPI and containerize.',
            xpReward: 150,
            hasTerminal: true,
            objectives: [
              'Define an inference API contract (request/response schema)',
              'Load a saved model artifact and serve predictions via HTTP',
              'Add basic validation and health endpoints',
              'Containerize the service for consistent runtime',
              'Smoke test the endpoint locally and via curl'
            ],
            codeExamples: [
              {
                language: 'python',
                title: 'FastAPI Inference Service (joblib model)',
                code: `from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI()
model = joblib.load('model.joblib')

class PredictRequest(BaseModel):
    features: list[float]

@app.get('/health')
def health():
    return {'status': 'ok'}

@app.post('/predict')
def predict(req: PredictRequest):
    x = np.asarray(req.features, dtype=float).reshape(1, -1)
    y = model.predict(x)[0]
    return {'prediction': int(y)}`
              },
              {
                language: 'dockerfile',
                title: 'Containerize the Inference API',
                code: `FROM python:3.11-slim
WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]`
              },
              {
                language: 'bash',
                title: 'Smoke Test the API',
                code: `uvicorn app:app --host 0.0.0.0 --port 8000

curl -s http://localhost:8000/health
curl -s -X POST http://localhost:8000/predict \
  -H 'Content-Type: application/json' \
  -d '{"features": [0.2, 1.1, -0.4, 0.0]}'`
              }
            ],
            commands: [
              'python3 -m venv .venv && source .venv/bin/activate',
              'pip install -U pip',
              'pip install fastapi uvicorn joblib numpy',
              'uvicorn app:app --host 0.0.0.0 --port 8000',
              'curl -s http://localhost:8000/health',
              'docker build -t ml-inference:local .'
            ]
          }
        ]
      },

      // Module 15: ML Pipelines
      {
        id: 'module-15',
        title: 'ML Pipelines',
        duration: '8-10 hours',
        description: 'Build automated ML pipelines with Kubeflow and Airflow.',
        lessons: [
          {
            id: 'lesson-15-1',
            title: 'Kubeflow Pipelines',
            duration: '5.5h',
            type: 'hands-on',
            description: 'Create pipeline components, orchestrate workflows, and pass artifacts.',
            xpReward: 250,
            hasTerminal: true,
            objectives: [
              'Explain what a pipeline is: components, artifacts, parameters, and DAG execution',
              'Build a small pipeline with 2–3 components and pass artifacts between steps',
              'Understand compilation vs execution (pipeline spec, runs, experiments)',
              'Use caching and parameterization to speed iteration safely',
              'Troubleshoot common pipeline issues (image pulls, permissions, artifact paths)'
            ],
            codeExamples: [
              {
                language: 'python',
                title: 'KFP v2: Minimal 2-Step Pipeline (Artifact Passing)',
                code: `from kfp import dsl
from kfp import compiler

@dsl.component
def prepare_data(out_path: dsl.OutputPath(str)):
    # Write a tiny artifact to a file path that downstream steps can read.
    with open(out_path, 'w') as f:
        f.write('cleaned-data-placeholder')

@dsl.component
def train_model(data_path: dsl.InputPath(str), model_path: dsl.OutputPath(str)):
    with open(data_path, 'r') as f:
        _ = f.read()
    # Pretend we trained; write an artifact.
    with open(model_path, 'w') as f:
        f.write('model-artifact-placeholder')

@dsl.pipeline(name='ml-pipeline-minimal')
def pipeline():
    prep = prepare_data()
    train_model(data_path=prep.outputs['out_path'])

compiler.Compiler().compile(pipeline_func=pipeline, package_path='pipeline.yaml')`
              },
              {
                language: 'text',
                title: 'Operational Concepts (How to Think About KFP)',
                code: `Pipelines are Kubernetes workloads.

Common operational failure points:
- Image build/push issues (wrong tag, not pushed)
- Registry auth from cluster
- RBAC permissions for pipeline runner
- Artifact store connectivity (MinIO/S3)
- Resource requests/limits causing OOM/evictions`
              }
            ],
            commands: [
              'python3 -m venv .venv && source .venv/bin/activate',
              'pip install -U pip',
              'pip install kfp',
              'python -c "import kfp; print(kfp.__version__)"',
              'python compile_pipeline.py',
              'ls -lh pipeline.yaml'
            ]
          },
          {
            id: 'lesson-15-2',
            title: 'Airflow for ML',
            duration: '4h',
            type: 'hands-on',
            description: 'Build ML DAGs with Apache Airflow.',
            xpReward: 175,
            hasTerminal: true,
            objectives: [
              'Explain DAG concepts: tasks, dependencies, schedules, retries, and backfills',
              'Build an ML-oriented DAG with separate prepare/train/evaluate tasks',
              'Use XComs or artifact paths safely (avoid large payloads)',
              'Add operational hardening: retries, timeouts, SLAs, idempotency',
              'Know when to use Airflow vs Kubeflow (batch orchestration vs ML-native pipelines)'
            ],
            codeExamples: [
              {
                language: 'python',
                title: 'Airflow DAG: Prepare → Train → Evaluate (TaskFlow API)',
                code: `from datetime import datetime
from airflow.decorators import dag, task

@dag(
    start_date=datetime(2024, 1, 1),
    schedule=None,
    catchup=False,
    tags=['ml'],
)
def ml_dag():
    @task
    def prepare() -> str:
        # Return a small reference (path/id), not a huge dataset.
        return 'data/clean.csv'

    @task
    def train(clean_path: str) -> str:
        # In real life: call a training script/container.
        _ = clean_path
        return 'models/model.joblib'

    @task
    def evaluate(model_path: str) -> dict:
        _ = model_path
        return {"accuracy": 0.9}

    clean = prepare()
    model = train(clean)
    evaluate(model)

ml_dag()`
              },
              {
                language: 'text',
                title: 'Idempotency Rules (So Retries Don’t Corrupt Results)',
                code: `Good ML DAG tasks are idempotent:
- Write outputs to deterministic locations per run
- Avoid appending to shared files without locks
- Use run-specific paths (execution_date/run_id)
- Treat training as pure function of (data version, code version, params)`
              }
            ],
            commands: [
              'python3 -m venv .venv && source .venv/bin/activate',
              'pip install -U pip',
              'pip install apache-airflow',
              'airflow version',
              'airflow db init',
              'airflow standalone'
            ]
          }
        ],
        project: {
          id: 'project-8',
          title: 'PROJECT 8: MLOps Pipeline - End to End',
          duration: '15-18 hours',
          type: 'project',
          description: 'Build a complete MLOps pipeline from data to deployment.',
          xpReward: 750,
          hasTerminal: true,
          objectives: [
            'Data versioning with DVC',
            'Experiment tracking with MLflow',
            'Hyperparameter tuning',
            'Model versioning and registry',
            'Containerized model serving',
            'CI/CD for ML',
            'Model monitoring'
          ],
          deliverables: [
            'Complete codebase with documentation',
            'Jupyter notebooks for exploration',
            'MLflow experiment tracking',
            'Model API with Swagger docs',
            'Monitoring dashboards',
            'CI/CD pipeline configuration',
            'Model card documentation',
            'Video demo (15 min)'
          ]
        }
      }
    ]
  },

  // ============================================================
  // PHASE 5: PRODUCTION MLOPS
  // ============================================================
  {
    id: 'phase-5',
    title: 'Phase 5: Production MLOps',
    subtitle: 'Enterprise ML Systems',
    duration: '30-40 hours',
    level: 'advanced',
    description: 'Build production-ready ML systems with advanced serving, feature stores, and monitoring.',
    icon: '🤖',
    color: 'red',
    modules: [
      // Module 16: Advanced Model Serving
      {
        id: 'module-16',
        title: 'Advanced Model Serving',
        duration: '10-12 hours',
        description: 'Deploy models at scale with Seldon Core, TensorFlow Serving, and optimization.',
        lessons: [
          {
            id: 'lesson-16-1',
            title: 'Model Serving Platforms',
            duration: '6h',
            type: 'hands-on',
            description: 'Deploy with Seldon Core and TensorFlow Serving.',
            xpReward: 275,
            hasTerminal: true,
            objectives: [
              'Compare common serving platforms (Seldon/KServe vs TensorFlow Serving vs custom FastAPI)',
              'Explain the production serving requirements: scaling, canarying, observability, and rollbacks',
              'Deploy a model behind an inference endpoint and validate request/response contracts',
              'Understand how routing and model versioning works (predictors, traffic splits)',
              'Troubleshoot typical serving failures (model load errors, timeouts, serialization mismatches)'
            ],
            codeExamples: [
              {
                language: 'yaml',
                title: 'KServe (Conceptual) InferenceService',
                code: `apiVersion: serving.kserve.io/v1beta1
kind: InferenceService
metadata:
  name: iris-classifier
spec:
  predictor:
    sklearn:
      storageUri: "s3://my-bucket/models/iris/"
      resources:
        requests:
          cpu: "250m"
          memory: "512Mi"`
              },
              {
                language: 'text',
                title: 'Serving Platform Decision Guide',
                code: `Choose a platform when you need:
- standardized deployment primitives (canary, scale-to-zero)
- multi-model management and governance
- consistent observability and security controls

Choose custom serving (FastAPI) when:
- model is simple and latency is predictable
- you need custom preprocessing/postprocessing
- platform adoption is not feasible yet`
              },
              {
                language: 'bash',
                title: 'Smoke Test an Inference Endpoint',
                code: `curl -s http://MODEL_HOST/v1/models/iris:predict \
  -H 'Content-Type: application/json' \
  -d '{"instances": [[5.1,3.5,1.4,0.2]]}'`
              }
            ],
            commands: [
              'kubectl get ns',
              'kubectl get pods -A | head -40',
              'kubectl get crds | grep -E "kserve|seldon|inferenceservice" || true',
              'kubectl describe pod <pod-name>',
              'kubectl logs <pod-name> --tail=200'
            ]
          },
          {
            id: 'lesson-16-2',
            title: 'Model Optimization',
            duration: '4.5h',
            type: 'hands-on',
            description: 'Quantization, pruning, ONNX conversion, and TensorFlow Lite.',
            xpReward: 200,
            hasTerminal: true,
            objectives: [
              'Explain optimization goals: latency, throughput, memory, and cost',
              'Understand trade-offs: accuracy vs performance and calibration needs',
              'Convert a model to an interchange format (ONNX) conceptually',
              'Identify when to use quantization and when it can break accuracy',
              'Measure performance before/after optimization (baseline vs optimized)'
            ],
            codeExamples: [
              {
                language: 'python',
                title: 'Baseline Timing Harness (Before/After)',
                code: `import time
import numpy as np

def benchmark(predict_fn, n=1000):
    x = np.random.rand(1, 4).astype('float32')
    # warmup
    for _ in range(10):
        predict_fn(x)
    t0 = time.time()
    for _ in range(n):
        predict_fn(x)
    dt = time.time() - t0
    return dt / n

# Replace predict_fn with your model inference call
print('avg_seconds=', benchmark(lambda x: x.sum()))`
              },
              {
                language: 'text',
                title: 'Optimization Options (When to Use)',
                code: `Quantization: reduce precision (FP32 -> INT8). Great for CPU/edge.
Pruning: remove weights/neurons. Requires careful retraining.
ONNX: portability across runtimes (onnxruntime).
TFLite: edge/mobile deployment.

Golden rule: always evaluate accuracy + latency together.`
              }
            ],
            commands: [
              'python3 -m venv .venv && source .venv/bin/activate',
              'pip install -U pip',
              'pip install numpy',
              'python benchmark.py'
            ]
          },
          {
            id: 'lesson-16-3',
            title: 'Batch Inference at Scale',
            duration: '3h',
            type: 'hands-on',
            description: 'Use Apache Spark for large-scale batch predictions.',
            xpReward: 150,
            hasTerminal: true,
            objectives: [
              'Distinguish online inference (real-time) vs batch inference (scheduled/offline)',
              'Design a batch inference job with partitioning and idempotent outputs',
              'Understand Spark execution basics (dataframes, partitions, UDF risks)',
              'Handle model distribution to executors and consistent preprocessing',
              'Implement output versioning and rerun/backfill strategies'
            ],
            codeExamples: [
              {
                language: 'python',
                title: 'Spark Batch Prediction (Conceptual)',
                code: `from pyspark.sql import SparkSession
from pyspark.sql.functions import col

spark = SparkSession.builder.appName('batch-inference').getOrCreate()
df = spark.read.parquet('s3://bucket/features/day=2025-01-01/')

# In practice: avoid heavy Python UDFs; prefer vectorized / native transforms.
scored = df.withColumn('score', col('feature1') * 0.1 + col('feature2') * 0.2)

scored.write.mode('overwrite').parquet('s3://bucket/predictions/day=2025-01-01/model=v3/')`
              },
              {
                language: 'text',
                title: 'Batch Inference DoD',
                code: `- Input partitions are clearly defined (by day/hour)
- Outputs are versioned (model=vX)
- Job is idempotent (overwrite per partition)
- Preprocessing is consistent with training
- Backfill strategy is documented`
              }
            ],
            commands: [
              'python3 -m venv .venv && source .venv/bin/activate',
              'pip install -U pip',
              'pip install pyspark',
              'python -c "import pyspark; print(pyspark.__version__)"'
            ]
          }
        ]
      },

      // Module 17: Feature Store & Data Management
      {
        id: 'module-17',
        title: 'Feature Store & Data Management',
        duration: '8-10 hours',
        description: 'Implement feature stores and data validation pipelines.',
        lessons: [
          {
            id: 'lesson-17-1',
            title: 'Feature Store Concepts',
            duration: '6h',
            type: 'hands-on',
            description: 'Build feature stores with Feast for online/offline serving.',
            xpReward: 275,
            hasTerminal: true,
            objectives: [
              'Explain feature store fundamentals: offline store vs online store vs registry',
              'Understand point-in-time correctness and how leakage happens',
              'Define feature views, entities, and feature services (serving sets)',
              'Materialize features for online serving and retrieve for batch/offline training',
              'Design a feature lifecycle: compute, validate, version, serve, deprecate'
            ],
            codeExamples: [
              {
                language: 'text',
                title: 'Feature Store Core Concepts',
                code: `Entity: the join key (e.g., customer_id)
Feature: a value computed from data (e.g., avg_spend_30d)
Feature View: how a feature is produced + its schema + TTL
Registry: metadata (schemas, versions)
Offline Store: historical features for training/analysis
Online Store: low-latency key-value features for serving`
              },
              {
                language: 'python',
                title: 'Feast (Conceptual) Feature Retrieval',
                code: `# NOTE: illustrative example; depends on your Feast project setup.
from datetime import datetime

# Training data retrieval (historical)
entity_rows = [
    {"customer_id": 123, "event_timestamp": datetime(2025, 1, 1)},
    {"customer_id": 456, "event_timestamp": datetime(2025, 1, 1)},
]

feature_refs = [
    "customer_features:avg_spend_30d",
    "customer_features:purchase_count_7d",
]

# store.get_historical_features(entity_df=..., features=...).to_df()
print('Retrieve historical features for training')`
              },
              {
                language: 'text',
                title: 'Point-in-Time Correctness (Why It Exists)',
                code: `If you train on features computed using future data, offline metrics look great
but production fails.

Point-in-time correctness ensures that for each training row, features only use
data available up to the event_timestamp.`
              }
            ],
            commands: [
              'python3 -m venv .venv && source .venv/bin/activate',
              'pip install -U pip',
              'pip install feast',
              'feast version',
              'feast init my_feature_repo',
              'cd my_feature_repo && feast apply'
            ]
          },
          {
            id: 'lesson-17-2',
            title: 'Data Quality & Validation',
            duration: '4h',
            type: 'hands-on',
            description: 'Validate data with Great Expectations and TensorFlow Data Validation.',
            xpReward: 175,
            hasTerminal: true,
            objectives: [
              'Explain why data validation is an ML reliability requirement (not a nice-to-have)',
              'Implement basic data expectations (nulls, ranges, uniqueness, schema)',
              'Detect schema drift and distribution anomalies early',
              'Integrate validation into pipelines as a gate (fail fast)',
              'Design an incident response for data quality regressions'
            ],
            codeExamples: [
              {
                language: 'python',
                title: 'Great Expectations: Minimal Validation (Conceptual)',
                code: `# NOTE: illustrative; GE usage depends on project scaffolding.
import pandas as pd

df = pd.read_csv('data.csv')

# Examples of checks you should implement:
assert df['customer_id'].notna().all()
assert df['age'].between(0, 120).all()
assert df['country'].notna().all()

print('basic checks passed')`
              },
              {
                language: 'text',
                title: 'Validation Gates (What to Block)',
                code: `Block pipeline when:
- required columns missing
- null rate exceeds threshold
- value ranges out of bounds
- categorical values outside allowed set
- row counts drop unexpectedly

Warn (but continue) when:
- small distribution shifts within tolerance
- minor increases in null rate below threshold`
              },
              {
                language: 'text',
                title: 'Data Quality Runbook (Minimum)',
                code: `1) Identify impacted partitions/time window
2) Compare schema + row counts to baseline
3) Validate upstream source changes
4) Pause training/serving pipeline if needed
5) Backfill corrected data and rerun pipeline
6) Document root cause + add new validation` 
              }
            ],
            commands: [
              'python3 -m venv .venv && source .venv/bin/activate',
              'pip install -U pip',
              'pip install pandas great-expectations',
              'python -c "import great_expectations as ge; print(ge.__version__)"',
              'great_expectations --version',
              'python validate.py'
            ]
          }
        ]
      },

      // Module 18: Model Monitoring & Observability
      {
        id: 'module-18',
        title: 'Model Monitoring & Observability',
        duration: '10-12 hours',
        description: 'Monitor model performance, detect drift, and explain predictions.',
        lessons: [
          {
            id: 'lesson-18-1',
            title: 'Model Performance Monitoring',
            duration: '6h',
            type: 'hands-on',
            description: 'Track predictions, latency, and implement A/B testing.',
            xpReward: 275,
            hasTerminal: true,
            objectives: [
              'Define monitoring layers: service SLOs, data quality, model quality, and business KPIs',
              'Instrument inference endpoints with latency/error/throughput metrics',
              'Design delayed-label evaluation and online/offline metric pipelines',
              'Implement safe rollout strategies: shadow, canary, and A/B testing',
              'Write an incident runbook for model regressions'
            ],
            codeExamples: [
              {
                language: 'text',
                title: 'What to Monitor (Minimum Set)',
                code: `SERVICE: P50/P95 latency, error rate, throughput, saturation
DATA: schema validation failures, null rates, range violations, missing keys
MODEL: prediction distribution shifts, confidence, calibration, quality vs labels
BUSINESS: conversion rate, fraud loss, churn, revenue impact

Always include model_version and pipeline_version in logs/metrics.`
              },
              {
                language: 'python',
                title: 'Prometheus-Style Metrics (Conceptual Wrapper)',
                code: `import time

def timed_predict(predict_fn, payload):
    start = time.time()
    try:
        result = predict_fn(payload)
        # metrics: requests_total{status="success"} += 1
        return result
    except Exception:
        # metrics: requests_total{status="error"} += 1
        raise
    finally:
        latency = time.time() - start
        # metrics: request_latency_seconds.observe(latency)
        print('latency_seconds=', latency)`
              },
              {
                language: 'text',
                title: 'A/B Testing Checklist',
                code: `- Define success metric and guardrails (latency/errors)
- Randomize assignment deterministically (user_id hashing)
- Ensure consistent feature computation
- Run long enough for statistical power
- Implement rollback rules and stop conditions`
              }
            ],
            commands: [
              'curl -s http://localhost:8000/health',
              'curl -s -X POST http://localhost:8000/predict -H "Content-Type: application/json" -d "{\"features\":[0.2,1.1,-0.4,0.0]}"',
              'kubectl get pods -A | head -40',
              'kubectl logs <pod-name> --tail=200',
              'kubectl top pods -A | head -40'
            ]
          },
          {
            id: 'lesson-18-2',
            title: 'Data Drift Detection',
            duration: '4.5h',
            type: 'hands-on',
            description: 'Detect drift with Evidently AI and Alibi Detect.',
            xpReward: 200,
            hasTerminal: true,
            objectives: [
              'Define data drift vs concept drift vs label drift and why they matter',
              'Choose drift metrics/tests appropriate to feature types (numeric vs categorical)',
              'Build a baseline dataset and compare current windows against it',
              'Set alert thresholds to balance sensitivity and alert fatigue',
              'Create a response plan: investigate → validate → retrain/rollback'
            ],
            codeExamples: [
              {
                language: 'text',
                title: 'Drift Types (Quick Definitions)',
                code: `Data drift: feature distributions change
Concept drift: relationship between features and labels changes
Label drift: label distribution changes

You can detect drift without labels, but you cannot confirm performance without labels.`
              },
              {
                language: 'python',
                title: 'Window Comparison Skeleton (Baseline vs Current)',
                code: `import pandas as pd

baseline = pd.read_csv('baseline.csv')
current = pd.read_csv('current.csv')

numeric_cols = [c for c in baseline.columns if baseline[c].dtype != 'object']

summary = []
for c in numeric_cols:
    b_mean = baseline[c].mean()
    c_mean = current[c].mean()
    summary.append((c, float(b_mean), float(c_mean), float(c_mean - b_mean)))

summary = sorted(summary, key=lambda x: abs(x[3]), reverse=True)
print('top_mean_shifts:', summary[:10])`
              },
              {
                language: 'text',
                title: 'Drift Alert Playbook (Minimum)',
                code: `1) Confirm data window and partitions
2) Check schema/quality gates first
3) Identify which features drifted most
4) Validate upstream source changes
5) Decide: retrain, rollback, or tolerate
6) Postmortem + new tests/threshold tuning`
              }
            ],
            commands: [
              'python3 -m venv .venv && source .venv/bin/activate',
              'pip install -U pip',
              'pip install pandas numpy',
              'python drift_check.py'
            ]
          },
          {
            id: 'lesson-18-3',
            title: 'Model Explainability',
            duration: '3h',
            type: 'hands-on',
            description: 'Interpret models with SHAP and LIME.',
            xpReward: 150,
            hasTerminal: true,
            objectives: [
              'Explain why explainability matters (debugging, trust, compliance)',
              'Differentiate global vs local explanations',
              'Use feature importance responsibly (and understand pitfalls)',
              'Generate local explanations for individual predictions (conceptually)',
              'Operationalize explanations: logging, audits, and user-facing transparency'
            ],
            codeExamples: [
              {
                language: 'text',
                title: 'Global vs Local Explainability',
                code: `Global: overall feature importance / model behavior
Local: explanation for one prediction (why this user got this score)

Use local explanations for debugging and audits.
Use global explanations for model understanding and drift investigation.`
              },
              {
                language: 'python',
                title: 'Simple Permutation Importance (Framework-Agnostic)',
                code: `import numpy as np
from sklearn.metrics import accuracy_score

def permutation_importance(model, X, y, n_repeats=5):
    baseline = accuracy_score(y, model.predict(X))
    importances = np.zeros(X.shape[1])
    for j in range(X.shape[1]):
        scores = []
        for _ in range(n_repeats):
            X_perm = X.copy()
            np.random.shuffle(X_perm[:, j])
            scores.append(accuracy_score(y, model.predict(X_perm)))
        importances[j] = baseline - float(np.mean(scores))
    return importances

print('Permutation importance gives a rough signal of feature impact.')`
              },
              {
                language: 'text',
                title: 'Explainability DoD',
                code: `- Explanations available for audit/debug
- Feature list and schema documented
- Known limitations documented (correlation, non-causality)
- Sensitive features handled and reviewed
- Explanation outputs are privacy-safe`
              }
            ],
            commands: [
              'python3 -m venv .venv && source .venv/bin/activate',
              'pip install -U pip',
              'pip install numpy scikit-learn',
              'python explainability_demo.py'
            ]
          }
        ]
      },

      // Module 19: Advanced ML Infrastructure
      {
        id: 'module-19',
        title: 'Advanced ML Infrastructure',
        duration: '10-12 hours',
        description: 'Manage GPUs, distributed training, and hyperparameter tuning.',
        lessons: [
          {
            id: 'lesson-19-1',
            title: 'GPU Management in Kubernetes',
            duration: '5.5h',
            type: 'hands-on',
            description: 'Schedule GPUs, multi-GPU training, and cost optimization.',
            xpReward: 250,
            hasTerminal: true,
            objectives: [
              'Understand GPU device plugin basics (NVIDIA device plugin and runtime class)',
              'Request GPU resources correctly (limits/requests) and validate scheduling',
              'Use node labeling/taints to control GPU workload placement',
              'Identify and reduce GPU waste (right-sizing, batching, MIG, and quotas)',
              'Troubleshoot common GPU scheduling/runtime failures'
            ],
            codeExamples: [
              {
                language: 'yaml',
                title: 'GPU Pod Request (Basic)',
                code:
                  'apiVersion: v1\n'
                  + 'kind: Pod\n'
                  + 'metadata:\n'
                  + '  name: gpu-smoke-test\n'
                  + 'spec:\n'
                  + '  restartPolicy: Never\n'
                  + '  containers:\n'
                  + '  - name: cuda\n'
                  + '    image: nvidia/cuda:12.3.2-base-ubuntu22.04\n'
                  + '    command: ["bash","-lc","nvidia-smi && echo OK"]\n'
                  + '    resources:\n'
                  + '      limits:\n'
                  + '        nvidia.com/gpu: 1\n'
              },
              {
                language: 'yaml',
                title: 'GPU Node Selection (Label + Toleration)',
                code:
                  'spec:\n'
                  + '  nodeSelector:\n'
                  + '    accelerator: nvidia\n'
                  + '  tolerations:\n'
                  + '  - key: "gpu"\n'
                  + '    operator: "Equal"\n'
                  + '    value: "true"\n'
                  + '    effect: "NoSchedule"\n'
              },
              {
                language: 'bash',
                title: 'Quick GPU Troubleshooting Checklist',
                code:
                  'kubectl get nodes -o wide\n'
                  + 'kubectl describe node <gpu-node> | sed -n "1,220p"\n'
                  + 'kubectl get pods -A -o wide | grep -i gpu\n'
                  + 'kubectl describe pod gpu-smoke-test\n'
                  + 'kubectl logs gpu-smoke-test\n'
              }
            ],
            commands: [
              'kubectl get nodes',
              'kubectl describe node <gpu-node>',
              'kubectl get pods -A -o wide',
              'kubectl apply -f gpu-smoke-test.yaml',
              'kubectl describe pod gpu-smoke-test',
              'kubectl logs gpu-smoke-test'
            ]
          },
          {
            id: 'lesson-19-2',
            title: 'Distributed Training',
            duration: '4h',
            type: 'hands-on',
            description: 'Use PyTorch DDP and Horovod for distributed training.',
            xpReward: 200,
            hasTerminal: true,
            objectives: [
              'Explain the difference between data parallelism and model parallelism',
              'Run a small PyTorch DDP job locally (single node multi-process)',
              'Understand rendezvous/init methods and common failures (NCCL, networking)',
              'Use distributed training in a cluster-friendly way (config, env, reproducibility)',
              'Decide when distributed training is worth the added complexity'
            ],
            codeExamples: [
              {
                language: 'python',
                title: 'PyTorch DDP Skeleton (Conceptual)',
                code:
                  'import os\n'
                  + 'import torch\n'
                  + 'import torch.distributed as dist\n'
                  + 'from torch.nn.parallel import DistributedDataParallel as DDP\n\n'
                  + 'def main():\n'
                  + '    dist.init_process_group(backend="nccl")\n'
                  + '    local_rank = int(os.environ["LOCAL_RANK"])\n'
                  + '    torch.cuda.set_device(local_rank)\n\n'
                  + '    model = torch.nn.Linear(10, 1).cuda()\n'
                  + '    ddp = DDP(model, device_ids=[local_rank])\n\n'
                  + '    opt = torch.optim.Adam(ddp.parameters(), lr=1e-3)\n'
                  + '    x = torch.randn(128, 10, device="cuda")\n'
                  + '    y = torch.randn(128, 1, device="cuda")\n\n'
                  + '    for _ in range(10):\n'
                  + '        opt.zero_grad()\n'
                  + '        loss = torch.nn.functional.mse_loss(ddp(x), y)\n'
                  + '        loss.backward()\n'
                  + '        opt.step()\n\n'
                  + '    dist.destroy_process_group()\n\n'
                  + 'if __name__ == "__main__":\n'
                  + '    main()\n'
              },
              {
                language: 'bash',
                title: 'Launch DDP Locally',
                code:
                  'python3 -m venv .venv && source .venv/bin/activate\n'
                  + 'pip install -U pip\n'
                  + 'pip install torch\n'
                  + 'torchrun --standalone --nproc_per_node=2 ddp_train.py\n'
              },
              {
                language: 'bash',
                title: 'Common Failure Signals',
                code:
                  'export NCCL_DEBUG=INFO\n'
                  + '# Look for: timeout, connection refused, invalid usage\n'
                  + 'torchrun --standalone --nproc_per_node=2 ddp_train.py\n'
              }
            ],
            commands: [
              'python3 -m venv .venv && source .venv/bin/activate',
              'pip install -U pip',
              'pip install torch',
              'torchrun --standalone --nproc_per_node=2 ddp_train.py'
            ]
          },
          {
            id: 'lesson-19-3',
            title: 'AutoML & Hyperparameter Tuning',
            duration: '3h',
            type: 'hands-on',
            description: 'Optimize with Optuna and Ray Tune.',
            xpReward: 150,
            hasTerminal: true,
            objectives: [
              'Explain the difference between grid search, random search, and Bayesian optimization',
              'Run a small Optuna tuning experiment and track results',
              'Define a safe search space and a reproducible objective function',
              'Use early stopping/pruning to reduce compute cost',
              'Avoid common tuning pitfalls (leakage, overfitting to validation, noisy metrics)'
            ],
            codeExamples: [
              {
                language: 'python',
                title: 'Optuna Objective Skeleton',
                code:
                  'import optuna\n'
                  + 'from sklearn.datasets import load_breast_cancer\n'
                  + 'from sklearn.model_selection import cross_val_score\n'
                  + 'from sklearn.ensemble import RandomForestClassifier\n\n'
                  + 'X, y = load_breast_cancer(return_X_y=True)\n\n'
                  + 'def objective(trial: optuna.Trial) -> float:\n'
                  + '    n_estimators = trial.suggest_int("n_estimators", 50, 400)\n'
                  + '    max_depth = trial.suggest_int("max_depth", 2, 20)\n'
                  + '    clf = RandomForestClassifier(\n'
                  + '        n_estimators=n_estimators,\n'
                  + '        max_depth=max_depth,\n'
                  + '        n_jobs=-1,\n'
                  + '        random_state=42,\n'
                  + '    )\n'
                  + '    return cross_val_score(clf, X, y, cv=3, scoring="roc_auc").mean()\n\n'
                  + 'study = optuna.create_study(direction="maximize")\n'
                  + 'study.optimize(objective, n_trials=30)\n'
                  + 'print("best", study.best_value, study.best_params)\n'
              },
              {
                language: 'bash',
                title: 'Run a Simple Tuning Experiment',
                code:
                  'python3 -m venv .venv && source .venv/bin/activate\n'
                  + 'pip install -U pip\n'
                  + 'pip install optuna scikit-learn\n'
                  + 'python tune_optuna.py\n'
              },
              {
                language: 'text',
                title: 'Tuning Runbook (Checklist)',
                code:
                  '- Define metric + direction (maximize/minimize)\n'
                  + '- Fix dataset splits and seeds\n'
                  + '- Prevent leakage\n'
                  + '- Add pruning/early stopping\n'
                  + '- Track best params + artifacts\n'
                  + '- Validate on a holdout set before shipping\n'
              }
            ],
            commands: [
              'python3 -m venv .venv && source .venv/bin/activate',
              'pip install -U pip',
              'pip install optuna scikit-learn',
              'python tune_optuna.py'
            ]
          }
        ],
        project: {
          id: 'project-9',
          title: 'PROJECT 9: Real-Time ML System',
          duration: '20-25 hours',
          type: 'project',
          description: 'Build a production-ready real-time ML inference system.',
          xpReward: 1000,
          hasTerminal: true,
          objectives: [
            'Streaming data ingestion (Kafka)',
            'Real-time feature engineering',
            'Feature store integration',
            'High-throughput API (FastAPI)',
            'A/B testing framework',
            'Model performance monitoring',
            'Data drift detection',
            'Automated retraining pipeline'
          ],
          deliverables: [
            'Complete codebase',
            'Architecture diagram',
            'Load testing results (P99 < 100ms, 1000+ req/s)',
            'Monitoring dashboards',
            'Incident response runbook',
            'Cost analysis',
            'Video demo (20 min)'
          ]
        }
      }
    ]
  },

  // ============================================================
  // PHASE 6: EXPERT CAPSTONE
  // ============================================================
  {
    id: 'phase-6',
    title: 'Phase 6: Expert Capstone',
    subtitle: 'Enterprise Architecture',
    duration: '20-30 hours',
    level: 'expert',
    description: 'Master cloud-native architecture, chaos engineering, and build enterprise platforms.',
    icon: '🎓',
    color: 'pink',
    modules: [
      // Module 20: Cloud-Native Architecture Patterns
      {
        id: 'module-20',
        title: 'Cloud-Native Architecture Patterns',
        duration: '8-10 hours',
        description: 'Design multi-cloud systems and implement chaos engineering.',
        lessons: [
          {
            id: 'lesson-20-1',
            title: 'Multi-Cloud & Hybrid Cloud',
            duration: '6h',
            type: 'hands-on',
            description: 'Design cloud-agnostic architectures and manage multi-cloud deployments.',
            xpReward: 275,
            hasTerminal: true,
            objectives: [
              'Explain common multi-cloud drivers (resiliency, compliance, vendor risk) and their costs',
              'Design a portable deployment model (IaC + Kubernetes + GitOps) across clouds',
              'Identify what must remain cloud-specific (identity, networking, managed services)',
              'Plan disaster recovery across regions/clouds with clear RTO/RPO targets',
              'Define an operating model (observability, security, and cost controls)'
            ],
            codeExamples: [
              {
                language: 'text',
                title: 'Architecture Checklist (Multi-Cloud)',
                code:
                  '- Identity: SSO, workload identity, least privilege\n'
                  + '- Networking: ingress/egress, DNS, private connectivity\n'
                  + '- Platform: Kubernetes baseline, service mesh (optional), GitOps\n'
                  + '- Data: replication strategy, consistency needs, DR plan\n'
                  + '- Observability: logs/metrics/traces standardization\n'
                  + '- Security: policy-as-code, secrets, vulnerability management\n'
                  + '- Cost: tagging, budgets, rightsizing, showback/chargeback\n'
              },
              {
                language: 'bash',
                title: 'Portable Kubernetes Baseline Checks',
                code:
                  'kubectl cluster-info\n'
                  + 'kubectl get nodes -o wide\n'
                  + 'kubectl get ns\n'
                  + 'kubectl get pods -A\n'
              },
              {
                language: 'yaml',
                title: 'Minimal App Manifest (Portable)',
                code:
                  'apiVersion: apps/v1\n'
                  + 'kind: Deployment\n'
                  + 'metadata:\n'
                  + '  name: hello\n'
                  + 'spec:\n'
                  + '  replicas: 2\n'
                  + '  selector:\n'
                  + '    matchLabels: { app: hello }\n'
                  + '  template:\n'
                  + '    metadata:\n'
                  + '      labels: { app: hello }\n'
                  + '    spec:\n'
                  + '      containers:\n'
                  + '      - name: hello\n'
                  + '        image: nginx:stable\n'
                  + '        ports: [{ containerPort: 80 }]\n'
              }
            ],
            commands: [
              'kubectl cluster-info',
              'kubectl get nodes -o wide',
              'kubectl get pods -A',
              'kubectl apply -f hello-deploy.yaml',
              'kubectl rollout status deploy/hello',
              'kubectl get svc,ingress -A'
            ]
          },
          {
            id: 'lesson-20-2',
            title: 'Chaos Engineering',
            duration: '4h',
            type: 'hands-on',
            description: 'Test system resilience with Chaos Mesh experiments.',
            xpReward: 200,
            hasTerminal: true,
            objectives: [
              'Explain the goal of chaos engineering (confidence through controlled experiments)',
              'Define hypotheses and steady-state metrics (SLOs) before injecting failure',
              'Run a safe experiment in Kubernetes (pod kill, network delay, CPU stress)',
              'Establish safety controls (blast radius, timeouts, rollbacks, approvals)',
              'Turn findings into concrete engineering work (runbooks, alerts, hardening)'
            ],
            codeExamples: [
              {
                language: 'text',
                title: 'Experiment Template (Hypothesis-Driven)',
                code:
                  'Steady state:\n'
                  + '- P95 latency < X ms\n'
                  + '- Error rate < Y%\n'
                  + '- Throughput >= Z req/s\n\n'
                  + 'Hypothesis:\n'
                  + '- If one pod is killed, traffic shifts and SLO holds\n\n'
                  + 'Blast radius + stop conditions:\n'
                  + '- Only namespace: <ns>\n'
                  + '- Abort if error rate > Y% for 2 minutes\n'
              },
              {
                language: 'yaml',
                title: 'Chaos Mesh Pod Kill (Example)',
                code:
                  'apiVersion: chaos-mesh.org/v1alpha1\n'
                  + 'kind: PodChaos\n'
                  + 'metadata:\n'
                  + '  name: kill-hello\n'
                  + '  namespace: default\n'
                  + 'spec:\n'
                  + '  action: pod-kill\n'
                  + '  mode: one\n'
                  + '  selector:\n'
                  + '    labelSelectors:\n'
                  + '      app: hello\n'
                  + '  duration: "60s"\n'
              },
              {
                language: 'bash',
                title: 'Observe During Experiment',
                code:
                  'kubectl get pods -l app=hello -w\n'
                  + 'kubectl describe pod <pod>\n'
                  + 'kubectl get events --sort-by=.metadata.creationTimestamp | tail -50\n'
              }
            ],
            commands: [
              'kubectl get crds | grep -i chaos',
              'kubectl get pods -A | grep -i chaos',
              'kubectl apply -f kill-hello.yaml',
              'kubectl get podchaos -A',
              'kubectl describe podchaos kill-hello',
              'kubectl delete -f kill-hello.yaml'
            ]
          }
        ]
      },

      // Module 21: Advanced MLOps Patterns
      {
        id: 'module-21',
        title: 'Advanced MLOps Patterns',
        duration: '8-10 hours',
        description: 'Explore federated learning, edge ML, and continuous training.',
        lessons: [
          {
            id: 'lesson-21-1',
            title: 'Federated Learning',
            duration: '2h',
            type: 'theory',
            description: 'Understand federated learning and privacy-preserving ML.',
            xpReward: 100,
            hasTerminal: false,
            objectives: [
              'Explain what federated learning is and when it is a good fit',
              'Describe the federated learning lifecycle (clients, rounds, aggregation)',
              'Understand privacy techniques (secure aggregation, differential privacy) at a high level',
              'Identify operational challenges (heterogeneous devices, unreliable clients, non-IID data)',
              'Define governance and threat model considerations'
            ],
            codeExamples: [
              {
                language: 'text',
                title: 'Federated Learning Mental Model',
                code:
                  '1) Server selects clients\n'
                  + '2) Clients train locally on private data\n'
                  + '3) Clients send updates (not raw data)\n'
                  + '4) Server aggregates updates (e.g., FedAvg)\n'
                  + '5) Repeat rounds until convergence\n'
              },
              {
                language: 'text',
                title: 'Operational Checklist',
                code:
                  '- Client selection strategy\n'
                  + '- Update size/bandwidth budgets\n'
                  + '- Robust aggregation (outliers/poisoning)\n'
                  + '- Privacy controls (DP / secure aggregation)\n'
                  + '- Model/version rollout and rollback\n'
              }
            ]
          },
          {
            id: 'lesson-21-2',
            title: 'ML at Edge',
            duration: '2h',
            type: 'theory',
            description: 'Deploy models to edge devices with model compression.',
            xpReward: 100,
            hasTerminal: false,
            objectives: [
              'Explain why edge ML exists (latency, privacy, bandwidth, offline operation)',
              'Describe common compression techniques (quantization, pruning, distillation)',
              'Understand edge constraints (CPU, memory, thermal, power, intermittent network)',
              'Design deployment and update strategies (canary, staged rollout, rollback)',
              'Define telemetry for edge models (performance, drift proxies, failures)'
            ],
            codeExamples: [
              {
                language: 'text',
                title: 'Edge ML Constraints and Trade-offs',
                code:
                  '- Latency: local inference is fast\n'
                  + '- Privacy: data stays on device\n'
                  + '- Reliability: works offline\n'
                  + '- Trade-off: limited compute + harder observability\n'
              },
              {
                language: 'text',
                title: 'Deployment Strategy (Staged)',
                code:
                  '1) Build and sign model artifact\n'
                  + '2) Roll out to internal devices\n'
                  + '3) Canary to small user cohort\n'
                  + '4) Monitor crash rate + latency + KPI proxy\n'
                  + '5) Expand or rollback\n'
              }
            ]
          },
          {
            id: 'lesson-21-3',
            title: 'Continuous Training',
            duration: '4h',
            type: 'hands-on',
            description: 'Implement online learning, incremental training, and automated retraining.',
            xpReward: 200,
            hasTerminal: true,
            objectives: [
              'Distinguish online learning vs periodic retraining vs incremental training',
              'Define triggers for retraining (drift, performance drop, schedule, data volume)',
              'Build a safe retraining workflow with evaluation gates and approvals',
              'Implement versioning for data, features, and model artifacts',
              'Operate retraining with rollouts, monitoring, and rollback'
            ],
            codeExamples: [
              {
                language: 'text',
                title: 'Retraining Trigger Decision Tree',
                code:
                  'IF data drift high AND KPI guardrails degrading -> retrain candidate\n'
                  + 'IF new labeled data available on schedule -> retrain candidate\n'
                  + 'IF model performance stable -> do nothing\n'
                  + 'Always: evaluate + canary + rollback plan\n'
              },
              {
                language: 'python',
                title: 'Simple Incremental Training Loop (Conceptual)',
                code:
                  '"""Conceptual example: update model with new batches."""\n'
                  + 'from sklearn.linear_model import SGDClassifier\n'
                  + 'import numpy as np\n\n'
                  + 'model = SGDClassifier(loss="log_loss", random_state=42)\n'
                  + 'classes = np.array([0, 1])\n\n'
                  + 'for X_batch, y_batch in stream_batches():\n'
                  + '    model.partial_fit(X_batch, y_batch, classes=classes)\n'
              },
              {
                language: 'bash',
                title: 'Operational Run (Example Commands)',
                code:
                  'python3 -m venv .venv && source .venv/bin/activate\n'
                  + 'pip install -U pip\n'
                  + 'pip install scikit-learn numpy\n'
                  + 'python retrain.py --input data/new_labels.csv --out models/model.pkl\n'
              }
            ],
            commands: [
              'python3 -m venv .venv && source .venv/bin/activate',
              'pip install -U pip',
              'pip install scikit-learn numpy',
              'python retrain.py --help'
            ]
          }
        ],
        project: {
          id: 'project-11',
          title: 'CAPSTONE: Multi-Cloud DevOps Platform',
          duration: '30-35 hours',
          type: 'project',
          description: 'Build an enterprise-grade multi-cloud DevOps platform.',
          xpReward: 1500,
          hasTerminal: true,
          overview:
            'You will design and implement a multi-cloud platform that standardizes how teams provision infrastructure, deploy services, observe systems, and recover from incidents.\n\n'
            + 'The capstone emphasizes real-world constraints: secure identity, repeatable environments, measurable SLOs, and tested disaster recovery across regions and/or clouds.',
          prerequisites: [
            'Comfort with Kubernetes fundamentals (workloads, services, ingress)',
            'Basic Terraform/IaC experience (state, modules, variables)',
            'CI/CD and GitOps concepts (pipelines, promotion, rollback)',
            'Monitoring basics (metrics, logs, tracing, alerting)'
          ],
          suggestedStack: [
            'Kubernetes: EKS + GKE (or EKS + AKS) with a common baseline',
            'IaC: Terraform (with remote state) + reusable modules',
            'GitOps: Argo CD (or Flux) for environment promotion',
            'Observability: Prometheus + Grafana (and optional Loki/Tempo)',
            'Service Mesh (optional): Istio for traffic shaping and policy',
            'Security: policy-as-code + secrets manager integration'
          ],
          objectives: [
            'Multi-cloud Kubernetes (EKS, GKE, AKS)',
            'Service mesh across clouds (Istio)',
            'Multi-cloud CI/CD',
            'Centralized observability',
            'Disaster recovery automation',
            'Cost optimization across clouds',
            'Security and compliance',
            'GitOps deployment',
            'Self-service portals'
          ],
          milestones: [
            'Milestone 1: Platform bootstrap — repo structure, Terraform state, and cluster baseline in Cloud A',
            'Milestone 2: Second cloud — replicate baseline in Cloud B with minimal drift',
            'Milestone 3: GitOps — Argo CD manages app environments with promotion + rollback',
            'Milestone 4: Observability — unified dashboards and alert routing across clouds',
            'Milestone 5: DR — automated failover/failback runbook and a tested DR exercise',
            'Milestone 6: Cost + security — budgets/tags, least privilege, policy checks in CI'
          ],
          acceptanceCriteria: [
            'A new service can be deployed to both clouds from Git via GitOps with a defined promotion flow',
            'SLO dashboards exist (latency, error rate, saturation) with actionable alerts',
            'A DR exercise is executed and documented with measured RTO/RPO outcomes',
            'Terraform code is modular and reproducible (fresh install works from scratch)',
            'Runbooks exist for the top 3 incident types (deploy rollback, cluster issue, dependency failure)'
          ],
          starterCommands: [
            '# Repository and environment',
            'git status',
            'terraform -version',
            'kubectl version --client',
            '',
            '# IaC workflow (example)',
            'terraform init',
            'terraform fmt -check',
            'terraform validate',
            'terraform plan',
            '',
            '# Kubernetes sanity',
            'kubectl get nodes -o wide',
            'kubectl get pods -A',
            '',
            '# GitOps (example)',
            'kubectl get ns | grep -i argocd'
          ],
          incidentRunbooks: [
            'Rollback a bad deployment (GitOps revert + health verification)',
            'Investigate elevated error rate (dashboards → logs → traces → rollback)',
            'Cluster degradation (node pressure, CNI issues, DNS, control-plane symptoms)'
          ],
          stretchGoals: [
            'Add policy-as-code admission controls (e.g., OPA Gatekeeper/Kyverno)',
            'Implement progressive delivery (canary) with automated analysis',
            'Add a self-service template for onboarding a new service',
            'Cross-cloud service mesh for traffic shifting and failover (advanced)'
          ],
          deliverables: [
            'Multi-cloud architecture',
            'Complete IaC codebase',
            'Migration strategy document',
            'DR testing results',
            'Cost comparison analysis',
            'Security assessment',
            'Performance benchmarks',
            'Video presentation (30 min)'
          ]
        }
      }
    ]
  }
];

// Calculate total stats
export const curriculumStats = {
  totalPhases: curriculum.length,
  totalModules: curriculum.reduce((acc, phase) => acc + phase.modules.length, 0),
  totalLessons: curriculum.reduce((acc, phase) => 
    acc + phase.modules.reduce((acc2, mod) => acc2 + mod.lessons.length, 0), 0
  ),
  totalProjects: curriculum.reduce((acc, phase) => 
    acc + phase.modules.filter(m => m.project).length, 0
  ),
  totalHours: '250-300',
  totalXP: curriculum.reduce((acc, phase) => 
    acc + phase.modules.reduce((acc2, mod) => 
      acc2 + mod.lessons.reduce((acc3, lesson) => acc3 + lesson.xpReward, 0) + 
      (mod.project?.xpReward || 0), 0
    ), 0
  )
};

export default curriculum;
