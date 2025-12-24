// DevOps to MLOps Zero to Hero Curriculum
// Total Duration: 250-300 hours | 6 Phases | 21 Modules | 12 Projects

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'theory' | 'hands-on' | 'project' | 'quiz';
  description: string;
  objectives?: string[];
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
            hasTerminal: true
          },
          {
            id: 'lesson-9-2',
            title: 'Service Communication',
            duration: '4h',
            type: 'hands-on',
            description: 'Implement REST, gRPC, message queues, and circuit breakers.',
            xpReward: 175,
            hasTerminal: true
          },
          {
            id: 'lesson-9-3',
            title: 'Resilience Patterns',
            duration: '2h',
            type: 'hands-on',
            description: 'Implement circuit breakers, retries, bulkheads, and chaos engineering.',
            xpReward: 100,
            hasTerminal: true
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
            hasTerminal: true
          },
          {
            id: 'lesson-10-2',
            title: 'Advanced Workload Management',
            duration: '5.5h',
            type: 'hands-on',
            description: 'Configure PDBs, priority classes, resource quotas, and autoscaling.',
            xpReward: 225,
            hasTerminal: true
          },
          {
            id: 'lesson-10-3',
            title: 'Service Mesh Deep Dive',
            duration: '5.5h',
            type: 'hands-on',
            description: 'Master Istio for traffic management, security, and observability.',
            xpReward: 250,
            hasTerminal: true
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
            hasTerminal: true
          },
          {
            id: 'lesson-11-2',
            title: 'Logging with ELK/Loki',
            duration: '5.5h',
            type: 'hands-on',
            description: 'Set up centralized logging with Loki and Promtail.',
            xpReward: 225,
            hasTerminal: true
          },
          {
            id: 'lesson-11-3',
            title: 'Distributed Tracing with Jaeger',
            duration: '4h',
            type: 'hands-on',
            description: 'Implement OpenTelemetry and Jaeger for request tracing.',
            xpReward: 175,
            hasTerminal: true
          },
          {
            id: 'lesson-11-4',
            title: 'APM & Synthetic Monitoring',
            duration: '2h',
            type: 'hands-on',
            description: 'Set up APM, uptime monitoring, and define SLIs/SLOs.',
            xpReward: 100,
            hasTerminal: true
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
            hasTerminal: true
          },
          {
            id: 'lesson-12-2',
            title: 'Secrets Management',
            duration: '4h',
            type: 'hands-on',
            description: 'Use Vault, External Secrets Operator, and Sealed Secrets.',
            xpReward: 175,
            hasTerminal: true
          },
          {
            id: 'lesson-12-3',
            title: 'Compliance & Auditing',
            duration: '4.5h',
            type: 'hands-on',
            description: 'Implement RBAC, audit logging, and policy as code.',
            xpReward: 200,
            hasTerminal: true
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
              }
            ]
          },
          {
            id: 'lesson-13-2',
            title: 'Python for ML Operations',
            duration: '4h',
            type: 'hands-on',
            description: 'Master virtual environments, Jupyter, pandas, numpy, and scikit-learn.',
            xpReward: 175,
            hasTerminal: true
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
            hasTerminal: false
          },
          {
            id: 'lesson-14-2',
            title: 'Experiment Tracking with MLflow',
            duration: '5h',
            type: 'hands-on',
            description: 'Log experiments, metrics, artifacts, and register models.',
            xpReward: 225,
            hasTerminal: true
          },
          {
            id: 'lesson-14-3',
            title: 'Data Versioning with DVC',
            duration: '4h',
            type: 'hands-on',
            description: 'Version data, create pipelines, and track metrics.',
            xpReward: 175,
            hasTerminal: true
          },
          {
            id: 'lesson-14-4',
            title: 'Model Serving Basics',
            duration: '3h',
            type: 'hands-on',
            description: 'Serve models with Flask/FastAPI and containerize.',
            xpReward: 150,
            hasTerminal: true
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
            hasTerminal: true
          },
          {
            id: 'lesson-15-2',
            title: 'Airflow for ML',
            duration: '4h',
            type: 'hands-on',
            description: 'Build ML DAGs with Apache Airflow.',
            xpReward: 175,
            hasTerminal: true
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
            hasTerminal: true
          },
          {
            id: 'lesson-16-2',
            title: 'Model Optimization',
            duration: '4.5h',
            type: 'hands-on',
            description: 'Quantization, pruning, ONNX conversion, and TensorFlow Lite.',
            xpReward: 200,
            hasTerminal: true
          },
          {
            id: 'lesson-16-3',
            title: 'Batch Inference at Scale',
            duration: '3h',
            type: 'hands-on',
            description: 'Use Apache Spark for large-scale batch predictions.',
            xpReward: 150,
            hasTerminal: true
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
            hasTerminal: true
          },
          {
            id: 'lesson-17-2',
            title: 'Data Quality & Validation',
            duration: '4h',
            type: 'hands-on',
            description: 'Validate data with Great Expectations and TensorFlow Data Validation.',
            xpReward: 175,
            hasTerminal: true
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
            hasTerminal: true
          },
          {
            id: 'lesson-18-2',
            title: 'Data Drift Detection',
            duration: '4.5h',
            type: 'hands-on',
            description: 'Detect drift with Evidently AI and Alibi Detect.',
            xpReward: 200,
            hasTerminal: true
          },
          {
            id: 'lesson-18-3',
            title: 'Model Explainability',
            duration: '3h',
            type: 'hands-on',
            description: 'Interpret models with SHAP and LIME.',
            xpReward: 150,
            hasTerminal: true
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
            hasTerminal: true
          },
          {
            id: 'lesson-19-2',
            title: 'Distributed Training',
            duration: '4h',
            type: 'hands-on',
            description: 'Use PyTorch DDP and Horovod for distributed training.',
            xpReward: 200,
            hasTerminal: true
          },
          {
            id: 'lesson-19-3',
            title: 'AutoML & Hyperparameter Tuning',
            duration: '3h',
            type: 'hands-on',
            description: 'Optimize with Optuna and Ray Tune.',
            xpReward: 150,
            hasTerminal: true
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
            hasTerminal: true
          },
          {
            id: 'lesson-20-2',
            title: 'Chaos Engineering',
            duration: '4h',
            type: 'hands-on',
            description: 'Test system resilience with Chaos Mesh experiments.',
            xpReward: 200,
            hasTerminal: true
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
            hasTerminal: false
          },
          {
            id: 'lesson-21-2',
            title: 'ML at Edge',
            duration: '2h',
            type: 'theory',
            description: 'Deploy models to edge devices with model compression.',
            xpReward: 100,
            hasTerminal: false
          },
          {
            id: 'lesson-21-3',
            title: 'Continuous Training',
            duration: '4h',
            type: 'hands-on',
            description: 'Implement online learning, incremental training, and automated retraining.',
            xpReward: 200,
            hasTerminal: true
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
