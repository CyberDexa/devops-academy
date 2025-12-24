Enhanced DevOps to MLOps Learning Pathway
Zero to Hero with Real-World Projects
🎯 Course Overview
This comprehensive SaaS learning platform takes you from absolute beginner to production-ready DevOps/MLOps engineer through hands-on projects, real-world scenarios, and portfolio-building exercises perfect for interviews.

Total Learning Path: 150+ hours | 6 Certification Levels | 12+ Portfolio Projects

📚 Learning Pathway Structure
Phase 1: Foundation (Beginner)
Duration: 30-40 hours | Projects: 3 | Certification: DevOps Foundation

Phase 2: Core DevOps (Intermediate)
Duration: 40-50 hours | Projects: 4 | Certification: DevOps Engineer

Phase 3: Advanced DevOps (Advanced)
Duration: 35-45 hours | Projects: 3 | Certification: Senior DevOps Engineer

Phase 4: MLOps Introduction (Intermediate-Advanced)
Duration: 25-35 hours | Projects: 2 | Certification: MLOps Foundation

Phase 5: Production MLOps (Advanced)
Duration: 30-40 hours | Projects: 3 | Certification: MLOps Engineer

Phase 6: Expert Capstone (Expert)
Duration: 20-30 hours | Projects: 2 | Certification: DevOps/MLOps Architect

🚀 PHASE 1: FOUNDATION (BEGINNER)
Module 1: Linux & Shell Mastery
Duration: 8-10 hours

Lesson 1.1: Linux Fundamentals
Theory (1h):
Linux distributions and choosing the right one
File system hierarchy standard (FHS)
Understanding users, groups, and permissions model
Package managers (apt, yum, dnf)
Hands-on Commands (2h):
bash
  # Navigation mastery
  cd, pwd, ls -laht, tree
  
  # File operations
  cp -r, mv, rm -rf, mkdir -p, touch
  ln -s (symlinks), stat, file
  
  # Permission management
  chmod 755, chmod u+x, chown, chgrp
  umask, sudo, su
  
  # Text processing
  cat, less, head -n 20, tail -f
  grep -r "pattern", grep -E (regex)
  sed 's/old/new/g', awk '{print $1}'
  cut, sort, uniq, wc -l
  
  # System info
  uname -a, df -h, du -sh, free -m
  top, htop, ps aux, kill, killall
  uptime, who, w, last
Real-world Scenarios:
Debug disk space issues
Find files consuming most space
Locate and terminate runaway processes
Manage log files with rotation
Quiz: 15 questions (multiple choice, fill-in-commands)
Lesson 1.2: Advanced Shell Scripting
Theory (1h):
Bash vs Zsh vs Shell
Variables, arrays, loops, conditions
Functions and script organization
Exit codes and error handling
Hands-on Practice (3h):
bash
  # Script examples
  - Automated backup script
  - Health check monitoring
  - Batch file processing
  - System resource alerting
  
  # Advanced techniques
  - Parameter expansion
  - Command substitution
  - Here documents
  - Trap signals
  - Parallel execution with &
Mini Project: Build a system health monitoring script
Check CPU, memory, disk
Send alerts via email/Slack webhook
Log to file with rotation
Deliverable: GitHub repo with working script
Lesson 1.3: SSH & Remote Management
Theory (1h):
SSH protocol and security
Key-based authentication
SSH config and multiplexing
Jump hosts and tunneling
Hands-on (2h):
bash
  # SSH operations
  ssh-keygen -t ed25519
  ssh-copy-id user@host
  ssh -i key.pem user@host
  
  # SSH config (~/.ssh/config)
  Host myserver
    HostName 1.2.3.4
    User ubuntu
    IdentityFile ~/.ssh/key.pem
    
  # Tunneling
  ssh -L 8080:localhost:80 user@host  # Local forward
  ssh -R 8080:localhost:80 user@host  # Remote forward
  ssh -D 9090 user@host               # SOCKS proxy
  
  # Advanced
  ssh -J jumphost target              # Jump host
  scp, rsync -avz
  tmux, screen for persistent sessions
Security Best Practices:
Disable password authentication
Use SSH key passphrases
Implement fail2ban
Port knocking techniques
Module 2: Git & Version Control Excellence
Duration: 7-9 hours

Lesson 2.1: Git Fundamentals
Theory (1h):
Version control concepts
Git internals (objects, refs, HEAD)
Local vs remote repositories
Git workflow models
Hands-on (2h):
bash
  # Basic workflow
  git init, git clone
  git add, git commit -m
  git status, git log --oneline --graph
  git diff, git diff --staged
  
  # Branching
  git branch, git checkout -b feature
  git switch, git restore
  git merge, git rebase
  git cherry-pick <commit>
  
  # Remotes
  git remote add origin <url>
  git push -u origin main
  git pull --rebase
  git fetch, git fetch --prune
Lesson 2.2: Advanced Git Workflows
Theory (1h):
GitFlow vs GitHub Flow vs Trunk-based
Semantic versioning
Conventional commits
Code review best practices
Hands-on (3h):
bash
  # Advanced operations
  git rebase -i HEAD~5        # Interactive rebase
  git reflog                  # Recover lost commits
  git bisect                  # Find bug-introducing commit
  git blame                   # Track line changes
  git stash save "WIP"        # Temporary save
  git clean -fd               # Remove untracked
  
  # Collaboration
  git remote -v
  git push --force-with-lease # Safe force push
  git pull --rebase --autostash
  
  # Hooks
  .git/hooks/pre-commit       # Linting
  .git/hooks/pre-push         # Tests
Project Setup:
Create .gitignore patterns
Set up branch protection rules
Configure commit message templates
Implement pre-commit hooks
Lesson 2.3: GitHub/GitLab Collaboration
Theory (1h):
Pull requests vs Merge requests
Code review techniques
Issues and project management
GitHub Actions introduction
Hands-on (2h):
Fork and contribute to open source
Create effective PR descriptions
Use draft PRs for early feedback
Resolve merge conflicts
Squash commits before merging
Mini Project: Contribute to course materials
Fix documentation typo
Add new example
Create PR with proper description
Deliverable: Merged PR screenshot
Module 3: Docker Fundamentals & Best Practices
Duration: 10-12 hours

Lesson 3.1: Docker Basics
Theory (1.5h):
Containers vs VMs
Docker architecture (daemon, client, registry)
Images vs containers
Docker networking basics
Hands-on (2.5h):
bash
  # Container operations
  docker run -d -p 8080:80 --name web nginx
  docker ps, docker ps -a
  docker logs -f web
  docker exec -it web bash
  docker stop, docker start, docker restart
  docker rm, docker rm -f
  
  # Image management
  docker images, docker image ls
  docker pull, docker push
  docker tag myapp:v1 user/myapp:v1
  docker rmi, docker image prune
  docker history nginx
  
  # Networking
  docker network ls
  docker network create mynet
  docker run --network mynet
  docker network inspect mynet
  
  # Volumes
  docker volume create data
  docker run -v data:/data
  docker run -v $(pwd):/app
  docker volume ls, docker volume rm
Lesson 3.2: Dockerfile Mastery
Theory (1h):
Dockerfile instructions
Layer caching strategies
Multi-stage builds
Security best practices
Hands-on (4h):
dockerfile
  # Basic Dockerfile
  FROM node:18-alpine
  WORKDIR /app
  COPY package*.json ./
  RUN npm ci --only=production
  COPY . .
  EXPOSE 3000
  USER node
  CMD ["node", "server.js"]
  
  # Multi-stage build
  FROM golang:1.21 AS builder
  WORKDIR /app
  COPY go.* ./
  RUN go mod download
  COPY . .
  RUN CGO_ENABLED=0 go build -o main
  
  FROM alpine:latest
  RUN apk --no-cache add ca-certificates
  COPY --from=builder /app/main /main
  ENTRYPOINT ["/main"]
  
  # Best practices
  - Use specific versions
  - Order instructions by change frequency
  - Combine RUN commands
  - Use .dockerignore
  - Don't run as root
  - Scan for vulnerabilities
```

- **.dockerignore patterns**:
```
  node_modules
  .git
  .env
  *.md
  .DS_Store
Lesson 3.3: Docker Compose for Multi-Container Apps
Theory (1h):
Compose file structure (v3.8+)
Service dependencies
Environment variables
Networks and volumes
Hands-on (3h):
yaml
  version: '3.8'
  
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
      restart: unless-stopped
      
    postgres:
      image: postgres:15-alpine
      environment:
        - POSTGRES_PASSWORD_FILE=/run/secrets/db_password
      volumes:
        - postgres-data:/var/lib/postgresql/data
      networks:
        - app-network
      healthcheck:
        test: ["CMD-SHELL", "pg_isready -U postgres"]
        interval: 10s
        timeout: 5s
        retries: 5
      secrets:
        - db_password
        
    redis:
      image: redis:7-alpine
      networks:
        - app-network
      command: redis-server --appendonly yes
      volumes:
        - redis-data:/data
        
  networks:
    app-network:
      driver: bridge
      
  volumes:
    postgres-data:
    redis-data:
    
  secrets:
    db_password:
      file: ./secrets/db_password.txt
bash
  # Commands
  docker-compose up -d
  docker-compose ps
  docker-compose logs -f web
  docker-compose exec web sh
  docker-compose down -v
  docker-compose build --no-cache
  docker-compose restart web
Lesson 3.4: Docker Debugging & Troubleshooting
Common Issues (2h):
bash
  # Container won't start
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
  
  # Layer inspection
  dive <image>  # Tool for image analysis
Security Scanning:
bash
  docker scout cves nginx
  trivy image myapp:latest
📦 PROJECT 1: Full-Stack Containerized Application
Duration: 8-10 hours

Objective: Build and containerize a complete web application with database

Tech Stack:

Frontend: React/Vue.js
Backend: Node.js/Python Flask
Database: PostgreSQL
Cache: Redis
Reverse Proxy: Nginx
Requirements:

Create Dockerfiles for each component
Use multi-stage builds
Docker Compose orchestration
Environment-based configuration
Health checks
Volume persistence
Custom network
Security: non-root users, secrets
Deliverables:

GitHub repository with complete code
README with setup instructions
Architecture diagram
Docker images (< 200MB combined)
Working demo video (5 min)
Troubleshooting guide
Interview Ready: Explain architecture, security choices, optimization techniques

Module 4: CI/CD Foundations
Duration: 8-10 hours

Lesson 4.1: CI/CD Concepts & GitHub Actions
Theory (1.5h):
Continuous Integration principles
Continuous Delivery vs Deployment
Pipeline stages (build, test, deploy)
GitHub Actions architecture
Hands-on (3h):
yaml
  # .github/workflows/ci.yml
  name: CI Pipeline
  
  on:
    push:
      branches: [ main, develop ]
    pull_request:
      branches: [ main ]
      
  env:
    REGISTRY: ghcr.io
    IMAGE_NAME: ${{ github.repository }}
    
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
        
        - name: Docker meta
          id: meta
          uses: docker/metadata-action@v5
          with:
            images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
            tags: |
              type=ref,event=branch
              type=semver,pattern={{version}}
              type=sha
              
        - name: Login to registry
          uses: docker/login-action@v3
          with:
            registry: ${{ env.REGISTRY }}
            username: ${{ github.actor }}
            password: ${{ secrets.GITHUB_TOKEN }}
            
        - name: Build and push
          uses: docker/build-push-action@v5
          with:
            context: .
            push: true
            tags: ${{ steps.meta.outputs.tags }}
            cache-from: type=gha
            cache-to: type=gha,mode=max
Lesson 4.2: Advanced Pipeline Patterns
Theory (1h):
Matrix builds
Conditional execution
Secrets management
Artifact caching
Reusable workflows
Hands-on (3h):
yaml
  # Matrix strategy
  strategy:
    matrix:
      os: [ubuntu-latest, macos-latest]
      node: [16, 18, 20]
      
  # Conditional steps
  - name: Deploy to production
    if: github.ref == 'refs/heads/main'
    
  # Reusable workflow
  # .github/workflows/deploy.yml
  on:
    workflow_call:
      inputs:
        environment:
          required: true
          type: string
      secrets:
        deploy_key:
          required: true
Lesson 4.3: GitLab CI/CD
Hands-on (2.5h):
yaml
  # .gitlab-ci.yml
  stages:
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
    coverage: '/Statements\s*:\s*(\d+\.?\d*)%/'
    artifacts:
      reports:
        coverage_report:
          coverage_format: cobertura
          path: coverage/cobertura-coverage.xml
          
  deploy:
    stage: deploy
    image: alpine:latest
    before_script:
      - apk add --no-cache openssh-client
      - eval $(ssh-agent -s)
      - echo "$SSH_PRIVATE_KEY" | ssh-add -
    script:
      - ssh user@server "docker pull $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA"
      - ssh user@server "docker-compose up -d"
    only:
      - main
    when: manual
📦 PROJECT 2: Automated CI/CD Pipeline
Duration: 6-8 hours

Objective: Build production-grade CI/CD pipeline with testing and deployment

Requirements:

Multi-stage pipeline (lint, test, build, deploy)
Matrix testing (multiple versions)
Code quality gates (coverage, linting)
Container image building and scanning
Semantic versioning
Automated deployment to staging
Manual approval for production
Rollback capability
Deliverables:

Working CI/CD configuration files
Test coverage > 80%
Security scanning integrated
Deployment to cloud (AWS/GCP/Azure free tier)
Pipeline documentation
Video demo (5 min)
Module 5: Cloud Fundamentals
Duration: 7-9 hours

Lesson 5.1: AWS Core Services
Theory (2h):
AWS account setup and IAM
VPC, subnets, security groups
EC2, EBS, ELB
S3, CloudFront
RDS vs DynamoDB
Hands-on (3h):
bash
  # AWS CLI
  aws configure
  
  # EC2
  aws ec2 describe-instances
  aws ec2 run-instances --image-id ami-xxx --instance-type t3.micro
  aws ec2 create-security-group
  aws ec2 authorize-security-group-ingress
  
  # S3
  aws s3 mb s3://my-bucket
  aws s3 cp file.txt s3://my-bucket/
  aws s3 sync ./local s3://my-bucket/prefix
  
  # IAM
  aws iam create-user
  aws iam attach-user-policy
  aws iam create-access-key
Lesson 5.2: Cost Optimization & Best Practices
Theory (1h):
Pricing models
Reserved instances vs Spot
Cost allocation tags
AWS Free Tier limits
Hands-on (1.5h):
Set up billing alerts
Create cost budgets
Tag resources properly
Use AWS Cost Explorer
Lesson 5.3: Multi-Cloud Basics (GCP/Azure Overview)
Theory (1.5h):
GCP services mapping
Azure services mapping
Cloud-agnostic architectures
When to use which cloud
📦 PROJECT 3: Cloud-Deployed Web Application
Duration: 8-10 hours

Objective: Deploy production application to AWS with proper architecture

Requirements:

Deploy to AWS (EC2 or ECS)
Use Application Load Balancer
RDS PostgreSQL database
S3 for static assets
CloudFront CDN
Route53 DNS (optional domain)
SSL/TLS certificate
Auto-scaling group
CloudWatch monitoring
Backup strategy
Deliverables:

Architecture diagram (draw.io/Lucidchart)
Infrastructure as Code (CloudFormation/Terraform)
Public URL with working application
Monitoring dashboard
Cost estimate document
Disaster recovery plan
Video walkthrough (10 min)
Interview Ready:

Explain HA/DR strategy
Defend architecture choices
Discuss cost optimization
Security best practices
🔧 PHASE 2: CORE DEVOPS (INTERMEDIATE)
Module 6: Kubernetes Fundamentals
Duration: 12-15 hours

Lesson 6.1: Kubernetes Architecture
Theory (2h):
Control plane components (API server, scheduler, controller)
Worker node components (kubelet, kube-proxy, container runtime)
etcd and cluster state
K8s objects and API resources
Namespaces and resource isolation
Hands-on Setup (2h):
bash
  # Local clusters
  minikube start --driver=docker
  kind create cluster --name dev
  
  # kubectl basics
  kubectl cluster-info
  kubectl get nodes
  kubectl describe node <name>
  kubectl top nodes
  
  # Contexts and namespaces
  kubectl config get-contexts
  kubectl config use-context minikube
  kubectl create namespace dev
  kubectl config set-context --current --namespace=dev
Lesson 6.2: Core Workloads & Resources
Theory (1.5h):
Pods lifecycle
Deployments vs StatefulSets vs DaemonSets
Jobs and CronJobs
Resource requests and limits
Hands-on (4h):
yaml
  # Deployment
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: web-app
    labels:
      app: web
  spec:
    replicas: 3
    selector:
      matchLabels:
        app: web
    template:
      metadata:
        labels:
          app: web
          version: v1
      spec:
        containers:
        - name: app
          image: myapp:v1
          ports:
          - containerPort: 8080
          resources:
            requests:
              memory: "128Mi"
              cpu: "100m"
            limits:
              memory: "256Mi"
              cpu: "200m"
          livenessProbe:
            httpGet:
              path: /health
              port: 8080
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /ready
              port: 8080
            initialDelaySeconds: 5
            periodSeconds: 5
          env:
          - name: DATABASE_URL
            valueFrom:
              secretKeyRef:
                name: db-secret
                key: url
                
  ---
  # Service
  apiVersion: v1
  kind: Service
  metadata:
    name: web-service
  spec:
    selector:
      app: web
    ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
    type: LoadBalancer
    
  ---
  # ConfigMap
  apiVersion: v1
  kind: ConfigMap
  metadata:
    name: app-config
  data:
    APP_ENV: "production"
    LOG_LEVEL: "info"
    config.json: |
      {
        "feature_flags": {
          "new_ui": true
        }
      }
      
  ---
  # Secret
  apiVersion: v1
  kind: Secret
  metadata:
    name: db-secret
  type: Opaque
  stringData:
    url: "postgresql://user:pass@host:5432/db"
    password: "supersecret"
bash
  # Commands
  kubectl apply -f deployment.yaml
  kubectl get deployments
  kubectl get pods -w
  kubectl logs -f <pod-name>
  kubectl exec -it <pod-name> -- /bin/sh
  kubectl port-forward <pod-name> 8080:8080
  kubectl describe pod <pod-name>
  
  # Scaling
  kubectl scale deployment web-app --replicas=5
  kubectl autoscale deployment web-app --min=2 --max=10 --cpu-percent=80
  
  # Updates
  kubectl set image deployment/web-app app=myapp:v2
  kubectl rollout status deployment/web-app
  kubectl rollout history deployment/web-app
  kubectl rollout undo deployment/web-app
  
  # Debugging
  kubectl get events --sort-by='.lastTimestamp'
  kubectl top pods
  kubectl describe node
Lesson 6.3: Networking & Service Discovery
Theory (1.5h):
Service types (ClusterIP, NodePort, LoadBalancer)
DNS and service discovery
Network policies
Ingress concepts
Hands-on (3h):
yaml
  # Ingress
  apiVersion: networking.k8s.io/v1
  kind: Ingress
  metadata:
    name: app-ingress
    annotations:
      nginx.ingress.kubernetes.io/rewrite-target: /
      cert-manager.io/cluster-issuer: "letsencrypt-prod"
  spec:
    ingressClassName: nginx
    tls:
    - hosts:
      - myapp.example.com
      secretName: app-tls
    rules:
    - host: myapp.example.com
      http:
        paths:
        - path: /
          pathType: Prefix
          backend:
            service:
              name: web-service
              port:
                number: 80
                
  ---
  # NetworkPolicy
  apiVersion: networking.k8s.io/v1
  kind: NetworkPolicy
  metadata:
    name: allow-frontend
  spec:
    podSelector:
      matchLabels:
        app: backend
    policyTypes:
    - Ingress
    ingress:
    - from:
      - podSelector:
          matchLabels:
            app: frontend
      ports:
      - protocol: TCP
        port: 8080
Lesson 6.4: Storage & Persistence
Theory (1h):
Volumes types
PersistentVolumes and PersistentVolumeClaims
StorageClasses
StatefulSets for stateful apps
Hands-on (2h):
yaml
  # PersistentVolumeClaim
  apiVersion: v1
  kind: PersistentVolumeClaim
  metadata:
    name: postgres-pvc
  spec:
    accessModes:
    - ReadWriteOnce
    resources:
      requests:
        storage: 10Gi
    storageClassName: standard
    
  ---
  # StatefulSet
  apiVersion: apps/v1
  kind: StatefulSet
  metadata:
    name: postgres
  spec:
    serviceName: postgres
    replicas: 1
    selector:
      matchLabels:
        app: postgres
    template:
      metadata:
        labels:
          app: postgres
      spec:
        containers:
        - name: postgres
          image: postgres:15
          ports:
          - containerPort: 5432
          volumeMounts:
          - name: data
            mountPath: /var/lib/postgresql/data
          env:
          - name: POSTGRES_PASSWORD
            valueFrom:
              secretKeyRef:
                name: postgres-secret
                key: password
    volumeClaimTemplates:
    - metadata:
        name: data
      spec:
        accessModes: [ "ReadWriteOnce" ]
        resources:
          requests:
            storage: 10Gi
Module 7: Infrastructure as Code with Terraform
Duration: 12-15 hours

Lesson 7.1: Terraform Basics
Theory (1.5h):
IaC principles
Terraform workflow (init, plan, apply)
State management
Providers and resources
HCL syntax
Hands-on (3h):
hcl
  # main.tf
  terraform {
    required_version = ">= 1.0"
    required_providers {
      aws = {
        source  = "hashicorp/aws"
        version = "~> 5.0"
      }
    }
    backend "s3" {
      bucket = "my-terraform-state"
      key    = "prod/terraform.tfstate"
      region = "us-east-1"
      encrypt = true
      dynamodb_table = "terraform-locks"
    }
  }
  
  provider "aws" {
    region = var.aws_region
    default_tags {
      tags = {
        Environment = var.environment
        ManagedBy   = "Terraform"
        Project     = "DevOps-Training"
      }
    }
  }
  
  # VPC
  resource "aws_vpc" "main" {
    cidr_block           = var.vpc_cidr
    enable_dns_hostnames = true
    enable_dns_support   = true
    
    tags = {
      Name = "${var.project_name}-vpc"
    }
  }
  
  # Subnets
  resource "aws_subnet" "public" {
    count                   = length(var.availability_zones)
    vpc_id                  = aws_vpc.main.id
    cidr_block              = cidrsubnet(var.vpc_cidr, 8, count.index)
    availability_zone       = var.availability_zones[count.index]
    map_public_ip_on_launch = true
    
    tags = {
      Name = "${var.project_name}-public-${count.index + 1}"
      Type = "public"
    }
  }
  
  # Security Group
  resource "aws_security_group" "web" {
    name        = "${var.project_name}-web-sg"
    description = "Security group for web servers"
    vpc_id      = aws_vpc.main.id
    
    ingress {
      from_port   = 80
      to_port     = 80
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
    
    ingress {
      from_port   = 443
      to_port     = 443
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
    
    egress {
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }
  
  # EC2 Instance
  resource "aws_instance" "web" {
    ami           = data.aws_ami.ubuntu.id
    instance_type = var.instance_type
    subnet_id     = aws_subnet.public[0].id
Continue

10:38
vpc_security_group_ids = [aws_security_group.web.id]

user_data = templatefile("${path.module}/user_data.sh", {
  app_version = var.app_version
})

root_block_device {
  volume_type = "gp3"
  volume_size = 20
  encrypted   = true
}

tags = {
  Name = "${var.project_name}-web"
}
}

Data source
data "aws_ami" "ubuntu" {
most_recent = true
owners      = ["099720109477"] # Canonical

filter {
  name   = "name"
  values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
}
}

```hcl
  # variables.tf
  variable "aws_region" {
    description = "AWS region"
    type        = string
    default     = "us-east-1"
  }
  
  variable "vpc_cidr" {
    description = "VPC CIDR block"
    type        = string
    default     = "10.0.0.0/16"
  }
  
  variable "availability_zones" {
    description = "Availability zones"
    type        = list(string)
    default     = ["us-east-1a", "us-east-1b", "us-east-1c"]
  }
  
  variable "environment" {
    description = "Environment name"
    type        = string
    validation {
      condition     = contains(["dev", "staging", "prod"], var.environment)
      error_message = "Environment must be dev, staging, or prod"
    }
  }
```
```hcl
  # outputs.tf
  output "vpc_id" {
    description = "VPC ID"
    value       = aws_vpc.main.id
  }
  
  output "web_instance_public_ip" {
    description = "Public IP of web instance"
    value       = aws_instance.web.public_ip
  }
```
```bash
  # Commands
  terraform init
  terraform fmt
  terraform validate
  terraform plan -out=tfplan
  terraform apply tfplan
  terraform show
  terraform output
  terraform state list
  terraform state show aws_instance.web
  terraform destroy
```

#### Lesson 7.2: Terraform Modules & Best Practices
- **Theory** (1.5h):
  - Module structure
  - Module versioning
  - Input variables and outputs
  - Module composition
  - Workspaces

- **Hands-on** (4h):
```hcl
  # modules/vpc/main.tf
  resource "aws_vpc" "this" {
    cidr_block = var.cidr_block
    
    enable_dns_hostnames = var.enable_dns_hostnames
    enable_dns_support   = var.enable_dns_support
    
    tags = merge(
      var.tags,
      {
        Name = var.name
      }
    )
  }
  
  resource "aws_subnet" "public" {
    for_each = var.public_subnets
    
    vpc_id            = aws_vpc.this.id
    cidr_block        = each.value.cidr
    availability_zone = each.value.az
    
    map_public_ip_on_launch = true
    
    tags = merge(
      var.tags,
      {
        Name = "${var.name}-public-${each.key}"
        Type = "public"
      }
    )
  }
  
  # modules/vpc/variables.tf
  variable "name" {
    description = "VPC name"
    type        = string
  }
  
  variable "cidr_block" {
    description = "VPC CIDR block"
    type        = string
  }
  
  variable "public_subnets" {
    description = "Map of public subnets"
    type = map(object({
      cidr = string
      az   = string
    }))
  }
  
  # modules/vpc/outputs.tf
  output "vpc_id" {
    value = aws_vpc.this.id
  }
  
  output "public_subnet_ids" {
    value = [for s in aws_subnet.public : s.id]
  }
  
  # Root main.tf using module
  module "vpc" {
    source = "./modules/vpc"
    
    name       = "production-vpc"
    cidr_block = "10.0.0.0/16"
    
    public_subnets = {
      subnet1 = {
        cidr = "10.0.1.0/24"
        az   = "us-east-1a"
      }
      subnet2 = {
        cidr = "10.0.2.0/24"
        az   = "us-east-1b"
      }
    }
    
    tags = local.common_tags
  }
  
  # Using remote module
  module "eks" {
    source  = "terraform-aws-modules/eks/aws"
    version = "~> 19.0"
    
    cluster_name    = "my-cluster"
    cluster_version = "1.27"
    
    vpc_id     = module.vpc.vpc_id
    subnet_ids = module.vpc.public_subnet_ids
  }
```

#### Lesson 7.3: State Management & Collaboration
- **Theory** (1h):
  - Remote state backends
  - State locking
  - Sensitive data in state
  - Team workflows

- **Hands-on** (3h):
```hcl
  # Remote state backend
  terraform {
    backend "s3" {
      bucket         = "my-terraform-state"
      key            = "prod/terraform.tfstate"
      region         = "us-east-1"
      encrypt        = true
      dynamodb_table = "terraform-locks"
      kms_key_id     = "arn:aws:kms:us-east-1:xxx:key/xxx"
    }
  }
  
  # State management commands
  terraform state list
  terraform state show aws_instance.web
  terraform state mv aws_instance.old aws_instance.new
  terraform state rm aws_instance.deprecated
  terraform state pull > backup.tfstate
  
  # Import existing resources
  terraform import aws_instance.web i-1234567890abcdef0
  
  # Workspaces
  terraform workspace list
  terraform workspace new staging
  terraform workspace select prod
```

#### Lesson 7.4: Advanced Terraform Patterns
- **Hands-on** (3h):
```hcl
  # Dynamic blocks
  resource "aws_security_group" "web" {
    name = "web-sg"
    
    dynamic "ingress" {
      for_each = var.ingress_rules
      content {
        from_port   = ingress.value.port
        to_port     = ingress.value.port
        protocol    = "tcp"
        cidr_blocks = ingress.value.cidr_blocks
      }
    }
  }
  
  # Conditional resources
  resource "aws_instance" "optional" {
    count = var.create_instance ? 1 : 0
    # ... configuration
  }
  
  # For expressions
  locals {
    subnet_ids = [for s in aws_subnet.public : s.id]
    
    instance_map = {
      for instance in aws_instance.web :
      instance.id => instance.private_ip
    }
  }
  
  # Provisioners (use sparingly)
  resource "aws_instance" "web" {
    # ... configuration
    
    provisioner "remote-exec" {
      inline = [
        "sudo apt-get update",
        "sudo apt-get install -y nginx"
      ]
      
      connection {
        type        = "ssh"
        user        = "ubuntu"
        private_key = file("~/.ssh/id_rsa")
        host        = self.public_ip
      }
    }
  }
  
  # Null resource for triggers
  resource "null_resource" "cluster_update" {
    triggers = {
      cluster_version = var.cluster_version
    }
    
    provisioner "local-exec" {
      command = "kubectl apply -f manifests/"
    }
  }
```

---

### Module 8: Advanced CI/CD & GitOps
**Duration**: 10-12 hours

#### Lesson 8.1: Advanced Pipeline Patterns
- **Theory** (1.5h):
  - Pipeline as Code
  - Blue-Green deployments
  - Canary releases
  - Feature flags
  - Testing strategies (unit, integration, e2e)

- **Hands-on** (4h):
```yaml
  # Advanced GitHub Actions
  name: Advanced CI/CD
  
  on:
    push:
      branches: [ main ]
      tags: [ 'v*' ]
    pull_request:
  
  env:
    DOCKER_BUILDKIT: 1
    
  jobs:
    # Matrix testing
    test:
      runs-on: ${{ matrix.os }}
      strategy:
        matrix:
          os: [ubuntu-latest, macos-latest]
          node: [16, 18, 20]
        fail-fast: false
        
      steps:
        - uses: actions/checkout@v4
        
        - name: Setup Node
          uses: actions/setup-node@v4
          with:
            node-version: ${{ matrix.node }}
            
        - name: Run tests
          run: |
            npm ci
            npm run test:unit
            npm run test:integration
            
    # Code quality
    quality:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
          with:
            fetch-depth: 0  # Sonar needs full history
            
        - name: SonarCloud Scan
          uses: SonarSource/sonarcloud-github-action@master
          env:
            GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
            SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
            
        - name: SAST Scanning
          uses: returntocorp/semgrep-action@v1
          
    # Security scanning
    security:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        
        - name: Run Trivy vulnerability scanner
          uses: aquasecurity/trivy-action@master
          with:
            scan-type: 'fs'
            scan-ref: '.'
            format: 'sarif'
            output: 'trivy-results.sarif'
            
        - name: Upload to Security tab
          uses: github/codeql-action/upload-sarif@v2
          with:
            sarif_file: 'trivy-results.sarif'
            
    # Build and push
    build:
      needs: [test, quality, security]
      runs-on: ubuntu-latest
      
      steps:
        - uses: actions/checkout@v4
        
        - name: Docker meta
          id: meta
          uses: docker/metadata-action@v5
          with:
            images: |
              ghcr.io/${{ github.repository }}
              docker.io/${{ secrets.DOCKERHUB_USERNAME }}/${{ github.event.repository.name }}
            tags: |
              type=ref,event=branch
              type=semver,pattern={{version}}
              type=semver,pattern={{major}}.{{minor}}
              type=sha,prefix={{branch}}-
              
        - name: Set up QEMU
          uses: docker/setup-qemu-action@v3
          
        - name: Set up Docker Buildx
          uses: docker/setup-buildx-action@v3
          
        - name: Login to GitHub Container Registry
          uses: docker/login-action@v3
          with:
            registry: ghcr.io
            username: ${{ github.actor }}
            password: ${{ secrets.GITHUB_TOKEN }}
            
        - name: Build and push
          uses: docker/build-push-action@v5
          with:
            context: .
            platforms: linux/amd64,linux/arm64
            push: true
            tags: ${{ steps.meta.outputs.tags }}
            labels: ${{ steps.meta.outputs.labels }}
            cache-from: type=gha
            cache-to: type=gha,mode=max
            
    # Deploy to staging
    deploy-staging:
      needs: build
      runs-on: ubuntu-latest
      environment:
        name: staging
        url: https://staging.example.com
        
      steps:
        - name: Deploy to Kubernetes
          uses: azure/k8s-deploy@v4
          with:
            namespace: staging
            manifests: |
              k8s/deployment.yaml
              k8s/service.yaml
            images: |
              ghcr.io/${{ github.repository }}:${{ github.sha }}
              
    # E2E tests on staging
    e2e-tests:
      needs: deploy-staging
      runs-on: ubuntu-latest
      
      steps:
        - uses: actions/checkout@v4
        
        - name: Run Cypress E2E
          uses: cypress-io/github-action@v6
          with:
            config: baseUrl=https://staging.example.com
            
    # Deploy to production (manual approval)
    deploy-production:
      needs: e2e-tests
      runs-on: ubuntu-latest
      if: github.ref == 'refs/heads/main'
      environment:
        name: production
        url: https://example.com
        
      steps:
        - name: Blue-Green Deployment
          run: |
            # Deploy to green environment
            kubectl apply -f k8s/deployment-green.yaml -n production
            
            # Wait for rollout
            kubectl rollout status deployment/app-green -n production
            
            # Run smoke tests
            ./scripts/smoke-tests.sh https://green.internal.example.com
            
            # Switch traffic
            kubectl patch service app -n production -p '{"spec":{"selector":{"version":"green"}}}'
            
            # Keep blue for rollback
            echo "Blue deployment kept for 1 hour rollback window"
```

#### Lesson 8.2: GitOps with ArgoCD
- **Theory** (1.5h):
  - GitOps principles
  - Declarative vs imperative
  - ArgoCD architecture
  - Application sync strategies

- **Hands-on** (4h):
```yaml
  # ArgoCD Application
  apiVersion: argoproj.io/v1alpha1
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
      
      kustomize:
        images:
        - ghcr.io/myorg/myapp:v1.2.3
        
    destination:
      server: https://kubernetes.default.svc
      namespace: production
      
    syncPolicy:
      automated:
        prune: true
        selfHeal: true
        allowEmpty: false
      syncOptions:
      - CreateNamespace=true
      retry:
        limit: 5
        backoff:
          duration: 5s
          factor: 2
          maxDuration: 3m
          
    revisionHistoryLimit: 10
```
```yaml
  # Kustomize structure
  # base/kustomization.yaml
  apiVersion: kustomize.config.k8s.io/v1beta1
  kind: Kustomization
  
  resources:
  - deployment.yaml
  - service.yaml
  - ingress.yaml
  
  commonLabels:
    app: myapp
    
  # overlays/production/kustomization.yaml
  apiVersion: kustomize.config.k8s.io/v1beta1
  kind: Kustomization
  
  bases:
  - ../../base
  
  replicas:
  - name: myapp
    count: 5
    
  images:
  - name: myapp
    newName: ghcr.io/myorg/myapp
    newTag: v1.2.3
    
  patches:
  - path: increase-resources.yaml
```
```bash
  # ArgoCD CLI
  argocd login argocd.example.com
  argocd app create myapp --file application.yaml
  argocd app list
  argocd app get myapp
  argocd app sync myapp
  argocd app history myapp
  argocd app rollback myapp 5
  argocd app diff myapp
```

#### Lesson 8.3: Jenkins Pipelines (Groovy)
- **Hands-on** (3h):
```groovy
  // Jenkinsfile
  pipeline {
      agent any
      
      environment {
          DOCKER_REGISTRY = 'docker.io'
          IMAGE_NAME = "${DOCKER_REGISTRY}/myorg/myapp"
          KUBECONFIG = credentials('kubeconfig')
      }
      
      parameters {
          choice(name: 'ENVIRONMENT', choices: ['dev', 'staging', 'prod'], description: 'Deployment environment')
          booleanParam(name: 'RUN_TESTS', defaultValue: true, description: 'Run tests')
      }
      
      stages {
          stage('Checkout') {
              steps {
                  checkout scm
                  script {
                      env.GIT_COMMIT_SHORT = sh(
                          script: "git rev-parse --short HEAD",
                          returnStdout: true
                      ).trim()
                  }
              }
          }
          
          stage('Test') {
              when {
                  expression { params.RUN_TESTS }
              }
              parallel {
                  stage('Unit Tests') {
                      steps {
                          sh 'npm run test:unit'
                      }
                  }
                  stage('Integration Tests') {
                      steps {
                          sh 'npm run test:integration'
                      }
                  }
                  stage('Lint') {
                      steps {
                          sh 'npm run lint'
                      }
                  }
              }
          }
          
          stage('Build') {
              steps {
                  script {
                      docker.build("${IMAGE_NAME}:${env.GIT_COMMIT_SHORT}")
                  }
              }
          }
          
          stage('Security Scan') {
              steps {
                  sh """
                      trivy image --severity HIGH,CRITICAL \
                        ${IMAGE_NAME}:${env.GIT_COMMIT_SHORT}
                  """
              }
          }
          
          stage('Push') {
              steps {
                  script {
                      docker.withRegistry('https://docker.io', 'dockerhub-credentials') {
                          docker.image("${IMAGE_NAME}:${env.GIT_COMMIT_SHORT}").push()
                          docker.image("${IMAGE_NAME}:${env.GIT_COMMIT_SHORT}").push('latest')
                      }
                  }
              }
          }
          
          stage('Deploy') {
              steps {
                  script {
                      sh """
                          kubectl set image deployment/myapp \
                            myapp=${IMAGE_NAME}:${env.GIT_COMMIT_SHORT} \
                            -n ${params.ENVIRONMENT}
                          kubectl rollout status deployment/myapp -n ${params.ENVIRONMENT}
                      """
                  }
              }
          }
      }
      
      post {
          success {
              slackSend(
                  color: 'good',
                  message: "Deployment to ${params.ENVIRONMENT} succeeded: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
              )
          }
          failure {
              slackSend(
                  color: 'danger',
                  message: "Deployment to ${params.ENVIRONMENT} failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
              )
          }
          always {
              cleanWs()
          }
      }
  }
```

---

### Module 9: Microservices Architecture
**Duration**: 8-10 hours

#### Lesson 9.1: Microservices Patterns
- **Theory** (2h):
  - Monolith vs microservices
  - Service boundaries
  - API Gateway pattern
  - Service mesh
  - Event-driven architecture
  - Saga pattern for distributed transactions

- **Hands-on** (3h):
```yaml
  # API Gateway with Kong
  apiVersion: v1
  kind: Service
  metadata:
    name: kong-proxy
  spec:
    type: LoadBalancer
    ports:
    - name: proxy
      port: 80
      targetPort: 8000
    - name: proxy-ssl
      port: 443
      targetPort: 8443
    selector:
      app: kong
```

#### Lesson 9.2: Service Communication
- **Theory** (1h):
  - REST vs gRPC vs GraphQL
  - Synchronous vs asynchronous
  - Message queues (RabbitMQ, Kafka)
  - Circuit breakers
  - Retries and timeouts

- **Hands-on** (3h):
  - Implement REST API
  - Add gRPC service
  - Set up RabbitMQ
  - Implement circuit breaker pattern
  - Add distributed tracing

#### Lesson 9.3: Resilience Patterns
- **Hands-on** (2h):
  - Circuit breaker implementation
  - Retry with exponential backoff
  - Bulkhead pattern
  - Rate limiting
  - Chaos engineering with Chaos Mesh

### 📦 **PROJECT 4: Microservices E-Commerce Platform**
**Duration**: 15-18 hours

**Objective**: Build production-grade microservices application with full DevOps pipeline

**Services**:
1. User Service (Authentication/Authorization)
2. Product Catalog Service
3. Shopping Cart Service
4. Order Service
5. Payment Service (mock)
6. Notification Service
7. API Gateway

**Tech Stack**:
- Backend: Node.js/Python/Go (your choice)
- Database: PostgreSQL (per service), Redis
- Message Queue: RabbitMQ or Kafka
- API Gateway: Kong or Ambassador
- Service Mesh: Istio or Linkerd (optional)

**Requirements**:
1. Each service in separate repo
2. Dockerized with multi-stage builds
3. Kubernetes deployment with:
   - HPA (Horizontal Pod Autoscaler)
   - Service mesh for traffic management
   - ConfigMaps and Secrets
   - Ingress with SSL
4. GitOps deployment with ArgoCD
5. Full CI/CD pipeline per service
6. Distributed tracing (Jaeger)
7. Centralized logging (ELK/Loki)
8. Monitoring (Prometheus/Grafana)
9. API documentation (Swagger/OpenAPI)
10. Load testing (k6 or Locust)

**Deliverables**:
- GitHub organization with all repos
- Architecture diagram
- API documentation
- Performance test results
- Monitoring dashboards
- Incident response runbook
- Video demo (15 min)
- Cost analysis

**Interview Ready**:
- Explain service boundaries
- Discuss data consistency strategies
- Defend technology choices
- Explain observability strategy
- Discuss scaling approaches

---

### 📦 **PROJECT 5: Infrastructure Automation**
**Duration**: 12-15 hours

**Objective**: Build complete infrastructure using Terraform with CI/CD

**Requirements**:
1. Multi-environment setup (dev, staging, prod)
2. VPC with public/private subnets
3. EKS/GKE/AKS cluster
4. RDS database with read replicas
5. ElastiCache Redis cluster
6. S3/GCS buckets with versioning
7. CloudFront/CDN
8. WAF rules
9. Security groups and NACLs
10. IAM roles and policies
11. Monitoring and alerts
12. Backup strategy

**Infrastructure as Code**:
- Terraform modules for reusability
- Remote state in S3/GCS
- State locking with DynamoDB/GCS
- Terraform Cloud/Enterprise integration
- CI/CD for infrastructure changes
- Automated testing (Terratest)
- Cost estimation (Infracost)

**Deliverables**:
- Complete Terraform codebase
- Module documentation
- State management strategy
- CI/CD pipeline for IaC
- Disaster recovery plan
- Cost optimization report
- Security audit report

---

## 🤖 PHASE 3: ADVANCED DEVOPS

### Module 10: Production Kubernetes
**Duration**: 12-15 hours

#### Lesson 10.1: Cluster Management
- **Theory** (2h):
  - Cluster bootstrapping
  - Control plane HA
  - Node management
  - Cluster upgrades
  - Backup and restore

- **Hands-on** (4h):
```bash
  # EKS cluster with eksctl
  eksctl create cluster \
    --name production \
    --version 1.27 \
    --region us-east-1 \
    --nodegroup-name standard-workers \
    --node-type t3.medium \
    --nodes 3 \
    --nodes-min 2 \
    --nodes-max 5 \
    --managed \
    --enable-ssm
    
  # Cluster autoscaler
  kubectl apply -f cluster-autoscaler.yaml
  
  # Metrics server
  kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
  
  # Cluster backup with Velero
  velero install \
    --provider aws \
    --plugins velero/velero-plugin-for-aws:v1.7.0 \
    --bucket velero-backups \
    --backup-location-config region=us-east-1 \
    --snapshot-location-config region=us-east-1
    
  velero backup create full-backup
  velero restore create --from-backup full-backup
```

#### Lesson 10.2: Advanced Workload Management
- **Theory** (1.5h):
  - Pod disruption budgets
  - Priority classes
  - Resource quotas
  - LimitRanges
  - Pod security policies/standards

- **Hands-on** (4h):
```yaml
  # Pod Disruption Budget
  apiVersion: policy/v1
  kind: PodDisruptionBudget
  metadata:
    name: web-pdb
  spec:
    minAvailable: 2
    selector:
      matchLabels:
        app: web
        
  ---
  # Priority Class
  apiVersion: scheduling.k8s.io/v1
  kind: PriorityClass
  metadata:
    name: high-priority
  value: 1000
  globalDefault: false
  description: "High priority for critical services"
  
  ---
  # Resource Quota
  apiVersion: v1
  kind: ResourceQuota
  metadata:
    name: compute-quota
    namespace: production
  spec:
    hard:
      requests.cpu: "20"
      requests.memory: 40Gi
      limits.cpu: "40"
      limits.memory: 80Gi
      persistentvolumeclaims: "10"
      
  ---
  # Horizontal Pod Autoscaler
  apiVersion: autoscaling/v2
  kind: HorizontalPodAutoscaler
  metadata:
    name: web-hpa
  spec:
    scaleTargetRef:
      apiVersion: apps/v1
      kind: Deployment
      name: web
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
          periodSeconds: 30
        - type: Pods
          value: 2
          periodSeconds: 30
        selectPolicy: Max
        
  ---
  # Vertical Pod Autoscaler
  apiVersion: autoscaling.k8s.io/v1
  kind: VerticalPodAutoscaler
  metadata:
    name: web-vpa
  spec:
    targetRef:
      apiVersion: apps/v1
      kind: Deployment
      name: web
    updatePolicy:
      updateMode: "Auto"
```

#### Lesson 10.3: Service Mesh Deep Dive
- **Theory** (1.5h):
  - Service mesh concepts
  - Istio architecture
  - Traffic management
  - Security (mTLS)
  - Observability features

- **Hands-on** (4h):
```yaml
  # Istio VirtualService
  apiVersion: networking.istio.io/v1beta1
  kind: VirtualService
  metadata:
    name: web-routes
  spec:
    hosts:
    - web.example.com
    gateways:
    - web-gateway
    http:
    - match:
      - headers:
          canary:
            exact: "true"
      route:
      - destination:
          host: web
          subset: v2
        weight: 100
    - route:
      - destination:
          host: web
          subset: v1
        weight: 90
      - destination:
          host: web
          subset: v2
        weight: 10
        
  ---
  # Destination Rule
  apiVersion: networking.istio.io/v1beta1
  kind: DestinationRule
  metadata:
    name: web
  spec:
    host: web
    trafficPolicy:
      loadBalancer:
        simple: LEAST_REQUEST
      connectionPool:
        tcp:
          maxConnections: 100
        http:
          http1MaxPendingRequests: 50
          http2MaxRequests: 100
      outlierDetection:
        consecutiveErrors: 5
        interval: 30s
        baseEjectionTime: 30s
        maxEjectionPercent: 50
    subsets:
    - name: v1
      labels:
        version: v1
    - name: v2
      labels:
        version: v2
        
  ---
  # Gateway
  apiVersion: networking.istio.io/v1beta1
  kind: Gateway
  metadata:
    name: web-gateway
  spec:
    selector:
      istio: ingressgateway
    servers:
    - port:
        number: 443
        name: https
        protocol: HTTPS
      tls:
        mode: SIMPLE
        credentialName: web-tls-secret
      hosts:
      - web.example.com
      
  ---
  # Circuit Breaker
  apiVersion: networking.istio.io/v1beta1
  kind: DestinationRule
  metadata:
    name: api-circuit-breaker
  spec:
    host: api
    trafficPolicy:
      connectionPool:
        tcp:
          maxConnections: 1
        http:
          http1MaxPendingRequests: 1
          maxRequestsPerConnection: 1
      outlierDetection:
        consecutive5xxErrors: 1
        interval: 1s
        baseEjectionTime: 3m
        maxEjectionPercent: 100
```

---

### Module 11: Observability & Monitoring
**Duration**: 12-15 hours

#### Lesson 11.1: Metrics with Prometheus & Grafana
- **Theory** (1.5h):
  - Metrics types (counter, gauge, histogram, summary)
  - PromQL queries
  - Recording rules
  - Alerting rules
  - Federation

- **Hands-on** (4h):
```yaml
  # Prometheus configuration
  apiVersion: v1
  kind: ConfigMap
  metadata:
Continue

10:55
name: prometheus-config
data:
prometheus.yml: |
global:
scrape_interval: 15s
evaluation_interval: 15s
external_labels:
cluster: 'production'

  alerting:
    alertmanagers:
    - static_configs:
      - targets:
        - alertmanager:9093
        
  rule_files:
    - /etc/prometheus/rules/*.yml
    
  scrape_configs:
    - job_name: 'kubernetes-apiservers'
      kubernetes_sd_configs:
      - role: endpoints
      scheme: https
      tls_config:
        ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
      bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
      relabel_configs:
      - source_labels: [__meta_kubernetes_namespace, __meta_kubernetes_service_name, __meta_kubernetes_endpoint_port_name]
        action: keep
        regex: default;kubernetes;https
        
    - job_name: 'kubernetes-nodes'
      kubernetes_sd_configs:
      - role: node
      relabel_configs:
      - action: labelmap
        regex: __meta_kubernetes_node_label_(.+)
        
    - job_name: 'kubernetes-pods'
      kubernetes_sd_configs:
      - role: pod
      relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
        action: replace
        target_label: __metrics_path__
        regex: (.+)
      - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]
        action: replace
        regex: ([^:]+)(?::\d+)?;(\d+)
        replacement: $1:$2
        target_label: __address__
```yaml
  # Alert Rules
  apiVersion: v1
  kind: ConfigMap
  metadata:
    name: prometheus-rules
  data:
    alerts.yml: |
      groups:
      - name: application
        interval: 30s
        rules:
        - alert: HighErrorRate
          expr: |
            rate(http_requests_total{status=~"5.."}[5m]) / 
            rate(http_requests_total[5m]) > 0.05
          for: 5m
          labels:
            severity: critical
          annotations:
            summary: "High error rate detected"
            description: "Error rate is {{ $value | humanizePercentage }}"
            
        - alert: PodCrashLooping
          expr: rate(kube_pod_container_status_restarts_total[15m]) > 0
          for: 5m
          labels:
            severity: warning
          annotations:
            summary: "Pod is crash looping"
            description: "Pod {{ $labels.pod }} is restarting frequently"
            
        - alert: HighMemoryUsage
          expr: |
            container_memory_usage_bytes / 
            container_spec_memory_limit_bytes > 0.9
          for: 10m
          labels:
            severity: warning
          annotations:
            summary: "High memory usage"
            description: "Container {{ $labels.container }} using {{ $value | humanizePercentage }} of memory"
            
        - alert: DiskSpaceRunningOut
          expr: |
            (node_filesystem_avail_bytes / node_filesystem_size_bytes) < 0.1
          for: 10m
          labels:
            severity: warning
          annotations:
            summary: "Disk space running low"
            description: "Only {{ $value | humanizePercentage }} disk space available"
```
```promql
  # Useful PromQL queries
  
  # CPU usage by pod
  sum(rate(container_cpu_usage_seconds_total{pod=~"web-.*"}[5m])) by (pod)
  
  # Memory usage by namespace
  sum(container_memory_usage_bytes{namespace!=""}) by (namespace)
  
  # Request rate
  sum(rate(http_requests_total[5m])) by (handler)
  
  # P95 latency
  histogram_quantile(0.95, 
    sum(rate(http_request_duration_seconds_bucket[5m])) by (le, handler)
  )
  
  # Error rate
  sum(rate(http_requests_total{status=~"5.."}[5m])) / 
  sum(rate(http_requests_total[5m]))
```

#### Lesson 11.2: Logging with ELK/Loki
- **Theory** (1.5h):
  - Structured logging
  - Log aggregation
  - Log levels and filtering
  - Log retention policies

- **Hands-on** (4h):
```yaml
  # Loki configuration
  apiVersion: v1
  kind: ConfigMap
  metadata:
    name: loki-config
  data:
    loki.yaml: |
      auth_enabled: false
      
      server:
        http_listen_port: 3100
        
      ingester:
        lifecycler:
          ring:
            kvstore:
              store: inmemory
            replication_factor: 1
        chunk_idle_period: 5m
        chunk_retain_period: 30s
        
      schema_config:
        configs:
        - from: 2020-05-15
          store: boltdb
          object_store: filesystem
          schema: v11
          index:
            prefix: index_
            period: 168h
            
      storage_config:
        boltdb:
          directory: /tmp/loki/index
        filesystem:
          directory: /tmp/loki/chunks
          
      limits_config:
        enforce_metric_name: false
        reject_old_samples: true
        reject_old_samples_max_age: 168h
        
      chunk_store_config:
        max_look_back_period: 0s
        
      table_manager:
        retention_deletes_enabled: true
        retention_period: 720h
```
```yaml
  # Promtail (log shipper)
  apiVersion: v1
  kind: ConfigMap
  metadata:
    name: promtail-config
  data:
    promtail.yaml: |
      server:
        http_listen_port: 9080
        grpc_listen_port: 0
        
      positions:
        filename: /tmp/positions.yaml
        
      clients:
        - url: http://loki:3100/loki/api/v1/push
        
      scrape_configs:
        - job_name: kubernetes-pods
          kubernetes_sd_configs:
            - role: pod
          relabel_configs:
            - source_labels: [__meta_kubernetes_pod_node_name]
              target_label: __host__
            - action: labelmap
              regex: __meta_kubernetes_pod_label_(.+)
            - action: replace
              source_labels:
                - __meta_kubernetes_namespace
              target_label: namespace
            - action: replace
              source_labels:
                - __meta_kubernetes_pod_name
              target_label: pod
            - action: replace
              source_labels:
                - __meta_kubernetes_container_name
              target_label: container
            - replacement: /var/log/pods/*$1/*.log
              separator: /
              source_labels:
                - __meta_kubernetes_pod_uid
                - __meta_kubernetes_pod_container_name
              target_label: __path__
```
```logql
  # LogQL queries
  
  # Filter by namespace and pod
  {namespace="production", pod=~"web-.*"}
  
  # Filter by log level
  {namespace="production"} |= "level=error"
  
  # Extract JSON fields
  {namespace="production"} | json | status_code >= 500
  
  # Calculate error rate
  sum(rate({namespace="production"} |= "error" [5m])) by (pod)
  
  # Pattern matching
  {namespace="production"} |~ "timeout|connection refused"
```

#### Lesson 11.3: Distributed Tracing with Jaeger
- **Theory** (1h):
  - Tracing concepts (spans, traces)
  - OpenTelemetry
  - Context propagation
  - Sampling strategies

- **Hands-on** (3h):
```javascript
  // Node.js OpenTelemetry instrumentation
  const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
  const { registerInstrumentations } = require('@opentelemetry/instrumentation');
  const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
  const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
  const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');
  const { Resource } = require('@opentelemetry/resources');
  const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
  
  const provider = new NodeTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: 'web-service',
      [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
    }),
  });
  
  const exporter = new JaegerExporter({
    endpoint: 'http://jaeger-collector:14268/api/traces',
  });
  
  provider.addSpanProcessor(new BatchSpanProcessor(exporter));
  provider.register();
  
  registerInstrumentations({
    instrumentations: [
      new HttpInstrumentation(),
      new ExpressInstrumentation(),
    ],
  });
  
  // Custom spans
  const tracer = provider.getTracer('web-service');
  
  app.get('/api/data', async (req, res) => {
    const span = tracer.startSpan('fetch-data');
    
    try {
      span.setAttribute('user.id', req.user.id);
      const data = await fetchData();
      span.setStatus({ code: SpanStatusCode.OK });
      res.json(data);
    } catch (error) {
      span.setStatus({ 
        code: SpanStatusCode.ERROR,
        message: error.message 
      });
      span.recordException(error);
      res.status(500).json({ error: error.message });
    } finally {
      span.end();
    }
  });
```

#### Lesson 11.4: APM & Synthetic Monitoring
- **Hands-on** (2h):
  - Datadog/New Relic integration
  - Custom metrics
  - Uptime monitoring
  - Synthetic transactions
  - SLI/SLO/SLA definitions

---

### Module 12: Security & Compliance
**Duration**: 10-12 hours

#### Lesson 12.1: Container Security
- **Theory** (1.5h):
  - Image scanning
  - Runtime security
  - Admission controllers
  - Security contexts
  - Pod Security Standards

- **Hands-on** (3h):
```yaml
  # Pod Security Standard
  apiVersion: v1
  kind: Namespace
  metadata:
    name: production
    labels:
      pod-security.kubernetes.io/enforce: restricted
      pod-security.kubernetes.io/audit: restricted
      pod-security.kubernetes.io/warn: restricted
      
  ---
  # Secure Pod
  apiVersion: v1
  kind: Pod
  metadata:
    name: secure-pod
  spec:
    securityContext:
      runAsNonRoot: true
      runAsUser: 1000
      fsGroup: 1000
      seccompProfile:
        type: RuntimeDefault
        
    containers:
    - name: app
      image: myapp:v1
      securityContext:
        allowPrivilegeEscalation: false
        readOnlyRootFilesystem: true
        runAsNonRoot: true
        capabilities:
          drop:
          - ALL
          add:
          - NET_BIND_SERVICE
          
      volumeMounts:
      - name: tmp
        mountPath: /tmp
      - name: cache
        mountPath: /app/cache
        
    volumes:
    - name: tmp
      emptyDir: {}
    - name: cache
      emptyDir: {}
```
```yaml
  # OPA Gatekeeper Policy
  apiVersion: templates.gatekeeper.sh/v1
  kind: ConstraintTemplate
  metadata:
    name: k8srequiredlabels
  spec:
    crd:
      spec:
        names:
          kind: K8sRequiredLabels
        validation:
          openAPIV3Schema:
            type: object
            properties:
              labels:
                type: array
                items:
                  type: string
    targets:
      - target: admission.k8s.gatekeeper.sh
        rego: |
          package k8srequiredlabels
          
          violation[{"msg": msg, "details": {"missing_labels": missing}}] {
            provided := {label | input.review.object.metadata.labels[label]}
            required := {label | label := input.parameters.labels[_]}
            missing := required - provided
            count(missing) > 0
            msg := sprintf("Missing required labels: %v", [missing])
          }
```
```bash
  # Security scanning
  trivy image --severity HIGH,CRITICAL myapp:v1
  trivy fs --security-checks vuln,config .
  
  # Runtime security with Falco
  kubectl apply -f falco-daemonset.yaml
  
  # Network policies
  kubectl apply -f network-policies/
```

#### Lesson 12.2: Secrets Management
- **Theory** (1h):
  - Secrets at rest and in transit
  - Vault architecture
  - External secrets operator
  - Sealed Secrets

- **Hands-on** (3h):
```yaml
  # External Secrets Operator
  apiVersion: external-secrets.io/v1beta1
  kind: SecretStore
  metadata:
    name: vault-backend
    namespace: production
  spec:
    provider:
      vault:
        server: "https://vault.example.com"
        path: "secret"
        version: "v2"
        auth:
          kubernetes:
            mountPath: "kubernetes"
            role: "production-role"
            serviceAccountRef:
              name: "external-secrets-sa"
              
  ---
  apiVersion: external-secrets.io/v1beta1
  kind: ExternalSecret
  metadata:
    name: database-credentials
    namespace: production
  spec:
    refreshInterval: 1h
    secretStoreRef:
      name: vault-backend
      kind: SecretStore
    target:
      name: db-secret
      creationPolicy: Owner
    data:
    - secretKey: username
      remoteRef:
        key: database/production
        property: username
    - secretKey: password
      remoteRef:
        key: database/production
        property: password
```
```bash
  # Vault CLI
  vault login
  vault kv put secret/database/production username=admin password=secret
  vault kv get secret/database/production
  vault kv list secret/database
  
  # Sealed Secrets
  kubeseal < secret.yaml > sealed-secret.yaml
  kubectl apply -f sealed-secret.yaml
```

#### Lesson 12.3: Compliance & Auditing
- **Theory** (1.5h):
  - Compliance frameworks (SOC 2, HIPAA, PCI-DSS)
  - Audit logging
  - RBAC best practices
  - Policy as Code

- **Hands-on** (3h):
```yaml
  # RBAC Configuration
  apiVersion: rbac.authorization.k8s.io/v1
  kind: Role
  metadata:
    namespace: production
    name: developer
  rules:
  - apiGroups: ["", "apps", "batch"]
    resources: ["pods", "deployments", "jobs"]
    verbs: ["get", "list", "watch"]
  - apiGroups: [""]
    resources: ["pods/log"]
    verbs: ["get", "list"]
  - apiGroups: [""]
    resources: ["pods/exec"]
    verbs: ["create"]
    
  ---
  apiVersion: rbac.authorization.k8s.io/v1
  kind: RoleBinding
  metadata:
    name: developer-binding
    namespace: production
  subjects:
  - kind: Group
    name: developers
    apiGroup: rbac.authorization.k8s.io
  roleRef:
    kind: Role
    name: developer
    apiGroup: rbac.authorization.k8s.io
    
  ---
  # Audit Policy
  apiVersion: audit.k8s.io/v1
  kind: Policy
  rules:
  - level: RequestResponse
    resources:
    - group: ""
      resources: ["secrets"]
  - level: Metadata
    resources:
    - group: ""
      resources: ["configmaps"]
  - level: Request
    users: ["admin"]
    verbs: ["delete"]
```

---

### 📦 **PROJECT 6: Production-Grade Kubernetes Platform**
**Duration**: 20-25 hours

**Objective**: Build enterprise-ready Kubernetes platform with full observability

**Requirements**:

**Infrastructure**:
1. Multi-AZ EKS/GKE/AKS cluster
2. Node groups with spot instances
3. Cluster autoscaler
4. VPC/network configuration
5. Bastions host for access

**Platform Components**:
1. Ingress controller (Nginx/Traefik)
2. Cert-manager for SSL
3. External DNS
4. Metrics server
5. Cluster autoscaler
6. ArgoCD for GitOps
7. Sealed Secrets
8. OPA Gatekeeper

**Observability Stack**:
1. Prometheus + Grafana
2. Loki for logging
3. Jaeger for tracing
4. Alertmanager
5. Custom dashboards
6. SLO monitoring

**Security**:
1. Pod Security Standards
2. Network policies
3. RBAC configuration
4. Secrets encryption
5. Image scanning
6. Runtime security (Falco)

**Application Deployment**:
1. Sample microservices app
2. GitOps deployment
3. Canary releases
4. Blue-green deployments
5. Auto-scaling (HPA/VPA)

**Deliverables**:
- Complete infrastructure code
- Helm charts for platform components
- Application manifests
- Monitoring dashboards (JSON)
- Runbook for operations
- Disaster recovery procedures
- Load test results
- Security audit report
- Cost breakdown
- Architecture diagrams
- Video walkthrough (20 min)

**Interview Ready**:
- Explain platform architecture
- Discuss HA/DR strategies
- Walk through incident response
- Explain scaling decisions
- Discuss security posture
- Defend technology choices

---

### 📦 **PROJECT 7: End-to-End DevOps Pipeline**
**Duration**: 15-18 hours

**Objective**: Comprehensive DevOps pipeline from code to production

**Application**: Full-stack web application of your choice

**Pipeline Stages**:
1. **Source Control**: Git workflow with branch protection
2. **CI Pipeline**:
   - Linting and code quality (SonarQube)
   - Unit tests with coverage
   - Integration tests
   - SAST (security scanning)
   - Dependency scanning
3. **Build**:
   - Multi-stage Docker builds
   - Image optimization
   - Image scanning (Trivy/Snyk)
   - Push to registry
4. **Deploy to Staging**:
   - Automated deployment
   - Database migrations
   - Smoke tests
5. **Testing**:
   - E2E tests (Cypress/Selenium)
   - Load tests (k6)
   - Security tests (DAST)
6. **Deploy to Production**:
   - Manual approval gate
   - Blue-green deployment
   - Health checks
   - Rollback capability
7. **Post-Deployment**:
   - Monitoring verification
   - Synthetic tests
   - Notifications (Slack/Email)

**Deliverables**:
- Complete CI/CD configuration
- Test automation framework
- Deployment strategies documented
- Rollback procedures
- Pipeline metrics dashboard
- Video demonstration (15 min)

---

## 🧠 PHASE 4: MLOPS INTRODUCTION

### Module 13: Machine Learning Fundamentals
**Duration**: 8-10 hours

#### Lesson 13.1: ML Basics for DevOps Engineers
- **Theory** (3h):
  - ML workflow overview
  - Training vs inference
  - Model types (classification, regression, clustering)
  - Feature engineering basics
  - Model evaluation metrics

- **Hands-on** (3h):
```python
  # Simple ML workflow
  import pandas as pd
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
  joblib.dump(model, 'model.joblib')
```

#### Lesson 13.2: Python for ML Operations
- **Hands-on** (4h):
  - Virtual environments (venv, conda)
  - Jupyter notebooks
  - pandas for data manipulation
  - numpy for numerical operations
  - matplotlib/seaborn for visualization
  - scikit-learn basics

---

### Module 14: MLOps Fundamentals
**Duration**: 10-12 hours

#### Lesson 14.1: ML Lifecycle & MLOps Principles
- **Theory** (2h):
  - ML lifecycle stages
  - MLOps vs DevOps
  - Experiment tracking
  - Model versioning
  - Feature stores
  - Model registry

- **Tools Overview**:
  - MLflow
  - Weights & Biases
  - DVC (Data Version Control)
  - Kubeflow
  - Seldon Core

#### Lesson 14.2: Experiment Tracking with MLflow
- **Theory** (1h):
  - MLflow components (Tracking, Projects, Models, Registry)
  - Experiment organization
  - Metric logging
  - Artifact storage

- **Hands-on** (4h):
```python
  import mlflow
  import mlflow.sklearn
  from sklearn.ensemble import RandomForestClassifier
  from sklearn.metrics import accuracy_score
  
  # Set experiment
  mlflow.set_experiment("classification-experiment")
  
  # Start run
  with mlflow.start_run(run_name="rf-100-trees"):
      # Log parameters
      n_estimators = 100
      max_depth = 10
      mlflow.log_param("n_estimators", n_estimators)
      mlflow.log_param("max_depth", max_depth)
      
      # Train model
      model = RandomForestClassifier(
          n_estimators=n_estimators,
          max_depth=max_depth
      )
      model.fit(X_train, y_train)
      
      # Evaluate
      y_pred = model.predict(X_test)
      accuracy = accuracy_score(y_test, y_pred)
      
      # Log metrics
      mlflow.log_metric("accuracy", accuracy)
      mlflow.log_metric("train_size", len(X_train))
      
      # Log model
      mlflow.sklearn.log_model(model, "model")
      
      # Log artifacts
      mlflow.log_artifact("feature_importance.png")
      
      # Set tags
      mlflow.set_tag("model_type", "random_forest")
      mlflow.set_tag("data_version", "v1.0")
```
```bash
  # MLflow CLI
  mlflow ui --host 0.0.0.0 --port 5000
  mlflow models serve -m models:/my-model/Production -p 8080
  mlflow run . -P alpha=0.5
```

#### Lesson 14.3: Data Versioning with DVC
- **Theory** (1h):
  - Data versioning concepts
  - DVC pipelines
  - Remote storage backends
  - Metrics tracking

- **Hands-on** (3h):
```bash
  # Initialize DVC
  dvc init
  
  # Add data
  dvc add data/train.csv
  git add data/train.csv.dvc .gitignore
  git commit -m "Add training data"
  
  # Configure remote storage
  dvc remote add -d storage s3://my-bucket/dvc-store
  dvc push
  
  # Pull data
  dvc pull
  
  # Create pipeline
  dvc stage add -n preprocess \
    -d data/raw.csv \
    -o data/processed.csv \
    python preprocess.py
    
  dvc stage add -n train \
    -d data/processed.csv \
    -d train.py \
    -o model.pkl \
    -m metrics.json \
    python train.py
    
  dvc stage add -n evaluate \
    -d model.pkl \
    -d test.py \
    -M eval_metrics.json \
    python test.py
    
  # Run pipeline
  dvc repro
  
  # Show metrics
  dvc metrics show
  dvc metrics diff
  
  # Plot metrics
  dvc plots show
```

#### Lesson 14.4: Model Serving Basics
- **Hands-on** (3h):
```python
  # Flask API for model serving
  from flask import Flask, request, jsonify
  import joblib
  import numpy as np
  
  app = Flask(__name__)
  model = joblib.load('model.joblib')
  
  @app.route('/health', methods=['GET'])
  def health():
      return jsonify({'status': 'healthy'}), 200
  
  @app.route('/predict', methods=['POST'])
  def predict():
      data = request.json
      features = np.array(data['features']).reshape(1, -1)
      
      prediction = model.predict(features)
      probability = model.predict_proba(features)
      
      return jsonify({
          'prediction': int(prediction[0]),
          'probability': probability[0].tolist()
      })
  
  if __name__ == '__main__':
      app.run(host='0.0.0.0', port=5000)
```
```dockerfile
  # Dockerfile for model serving
  FROM python:3.9-slim
  
  WORKDIR /app
  
  COPY requirements.txt .
  RUN pip install --no-cache-dir -r requirements.txt
  
  COPY model.joblib .
  COPY app.py .
  
  EXPOSE 5000
  
  CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "4", "app:app"]
```

---

### Module 15: ML Pipelines
**Duration**: 8-10 hours

#### Lesson 15.1: Kubeflow Pipelines
- **Theory** (1.5h):
  - Pipeline components
  - Pipeline orchestration
  - Artifact passing
  - Conditional execution

- **Hands-on** (4h):
```python
  import kfp
  from kfp import dsl
  from kfp.components import create_component_from_func
  
  @create_component_from_func
  def preprocess_data(input_path: str, output_path: str):
      import pandas as pd
      df = pd.read_csv(input_path)
      # Preprocessing logic
      df.to_csv(output_path, index=False)
      
  @create_component_from_func
  def train_model(data_path: str, model_path: str) -> float:
      import pandas as pd
      from sklearn.ensemble import RandomForestClassifier
      import joblib
      
      df = pd.read_csv(data_path)
      X = df.drop('target', axis=1)
      y = df['target']
      
      model = RandomForestClassifier()
      model.fit(X, y)
      
      joblib.dump(model, model_path)
      
      return float(model.score(X, y))
      
  @dsl.pipeline(
      name='ML Training Pipeline',
      description='End-to-end ML pipeline'
  )
  def ml_pipeline(
      input_data: str,
      model_output: str
  ):
      preprocess_task = preprocess_data(
          input_path=input_data,
          output_path='/tmp/processed.csv'
      )
      
      train_task = train_model(
          data_path=preprocess_task.outputs['output_path'],
          model_path=model_output
      )
      
  # Compile and submit
  kfp.compiler.Compiler().compile(ml_pipeline, 'pipeline.yaml')
  client = kfp.Client()
  client.create_run_from_pipeline_func(ml_pipeline, arguments={
      'input_data': 's3://bucket/data.csv',
      'model_output': 's3://bucket/model.pkl'
  })
```

#### Lesson 15.2: Airflow for ML
- **Hands-on** (4h):
```python
  from airflow import DAG
  from airflow.operators.python import PythonOperator
  from airflow.providers.amazon.aws.hooks.s3 import S3Hook
  from datetime import datetime, timedelta
  
  default_args = {
      'owner': 'mlops',
      'depends_on_past': False,
      'start_date': datetime(2024, 1, 1),
      'email_on_failure': True,
      'email_on_retry': False,
      'retries': 2,
      'retry_delay': timedelta(minutes=5),
  }
  
  dag = DAG(
      'ml_training_pipeline',
      default_args=default_args,
      description='ML training pipeline',
      schedule_interval='@daily',
      catchup=False
  )
  
  def extract_data(**context):
      # Extract data from source
      pass
      
  def transform_data(**context):
      # Transform data
      pass
      
  def train_model(**context):
      # Train model
      pass
      
  def evaluate_model(**context):
      # Evaluate model
      pass
      
  def deploy_model(**context):
      # Deploy if metrics meet threshold
      metrics = context['task_instance'].xcom_pull(task_ids='evaluate')
      if metrics['accuracy'] > 0.9:
          # Deploy model
          pass
          
  extract_task = PythonOperator(
      task_id='extract',
      python_callable=extract_data,
      dag=dag
  )
  
  transform_task = PythonOperator(
      task_id='transform',
      python_callable=transform_data,
      dag=dag
  )
  
  train_task = PythonOperator(
      task_id='train',
      python_callable=train_model,
      dag=dag
  )
  
  evaluate_task = PythonOperator(
      task_id='evaluate',
      python_callable=evaluate_model,
      dag=dag
  )
  
  deploy_task = PythonOper
Continue

18:27
continue

18:28
python
  deploy_task = PythonOperator(
      task_id='deploy',
      python_callable=deploy_model,
      dag=dag
  )
  
  # Set dependencies
  extract_task >> transform_task >> train_task >> evaluate_task >> deploy_task
📦 PROJECT 8: MLOps Pipeline - End to End
Duration: 15-18 hours

Objective: Build complete MLOps pipeline from data to deployment

ML Problem: Choose one:

Image Classification (MNIST/CIFAR-10)
Text Classification (Sentiment Analysis)
Time Series Forecasting
Recommendation System
Requirements:

1. Data Pipeline:

Data versioning with DVC
Data validation
Feature engineering
Train/test split
Store in S3/GCS
2. Training Pipeline:

Experiment tracking with MLflow
Hyperparameter tuning
Model versioning
Metrics logging
Artifact storage
3. Model Evaluation:

Automated testing
Model comparison
Performance metrics
Confusion matrices
Feature importance
4. Model Deployment:

Containerized model serving
REST API endpoint
Health checks
Monitoring endpoints
Load balancing
5. CI/CD:

Automated retraining triggers
Model validation tests
A/B testing capability
Canary deployments
Rollback mechanism
6. Monitoring:

Model performance metrics
Prediction latency
Data drift detection
Model drift detection
Alerting
Tech Stack:

Python, scikit-learn/PyTorch/TensorFlow
MLflow or W&B
DVC
Docker
Kubernetes
GitHub Actions/GitLab CI
Prometheus + Grafana
Deliverables:

Complete codebase with documentation
Jupyter notebooks for exploration
MLflow experiment tracking
Model API with Swagger docs
Monitoring dashboards
CI/CD pipeline configuration
Architecture diagram
Model card documentation
Performance benchmarks
Video demo (15 min)
Interview Ready:

Explain ML model choice
Discuss feature engineering
Walk through training pipeline
Explain deployment strategy
Discuss monitoring approach
Explain retraining triggers
🚀 PHASE 5: PRODUCTION MLOPS
Module 16: Advanced Model Serving
Duration: 10-12 hours

Lesson 16.1: Model Serving Platforms
Theory (2h):
Serving architectures
Batch vs real-time inference
Model optimization
Scaling strategies
Hands-on (4h):
yaml
  # Seldon Core Deployment
  apiVersion: machinelearning.seldon.io/v1
  kind: SeldonDeployment
  metadata:
    name: sklearn-model
  spec:
    predictors:
    - name: default
      replicas: 3
      graph:
        name: classifier
        implementation: SKLEARN_SERVER
        modelUri: s3://models/sklearn/v1
        parameters:
        - name: method
          type: STRING
          value: predict_proba
      componentSpecs:
      - spec:
          containers:
          - name: classifier
            resources:
              requests:
                memory: 1Gi
                cpu: "1"
              limits:
                memory: 2Gi
                cpu: "2"
      svcOrchSpec:
        resources:
          requests:
            memory: 100Mi
            cpu: "100m"
python
  # TensorFlow Serving
  # saved_model format
  import tensorflow as tf
  
  # Export model
  export_path = 'models/my_model/1'
  tf.saved_model.save(model, export_path)
  
  # Serve with TF Serving
  # docker run -p 8501:8501 \
  #   --mount type=bind,source=/models,target=/models/my_model \
  #   -e MODEL_NAME=my_model \
  #   tensorflow/serving
  
  # Client request
  import requests
  import json
  
  data = json.dumps({
      "signature_name": "serving_default",
      "instances": [[1.0, 2.0, 5.0]]
  })
  
  response = requests.post(
      'http://localhost:8501/v1/models/my_model:predict',
      data=data
  )
  predictions = response.json()['predictions']
Lesson 16.2: Model Optimization
Theory (1.5h):
Quantization
Pruning
Knowledge distillation
ONNX format
Hands-on (3h):
python
  # TensorFlow Lite conversion
  import tensorflow as tf
  
  # Convert to TFLite
  converter = tf.lite.TFLiteConverter.from_saved_model('saved_model_dir')
  converter.optimizations = [tf.lite.Optimize.DEFAULT]
  converter.target_spec.supported_types = [tf.float16]
  tflite_model = converter.convert()
  
  with open('model.tflite', 'wb') as f:
      f.write(tflite_model)
  
  # ONNX conversion
  import torch
  import torch.onnx
  
  dummy_input = torch.randn(1, 3, 224, 224)
  torch.onnx.export(
      model,
      dummy_input,
      "model.onnx",
      export_params=True,
      opset_version=12,
      do_constant_folding=True,
      input_names=['input'],
      output_names=['output']
  )
  
  # Quantization
  import torch.quantization
  
  model.qconfig = torch.quantization.get_default_qconfig('fbgemm')
  torch.quantization.prepare(model, inplace=True)
  torch.quantization.convert(model, inplace=True)
Lesson 16.3: Batch Inference at Scale
Hands-on (3h):
python
  # Apache Spark for batch inference
  from pyspark.sql import SparkSession
  from pyspark.ml.classification import RandomForestClassificationModel
  
  spark = SparkSession.builder \
      .appName("BatchInference") \
      .getOrCreate()
  
  # Load model
  model = RandomForestClassificationModel.load("s3://models/rf-model")
  
  # Load data
  df = spark.read.parquet("s3://data/input/*.parquet")
  
  # Make predictions
  predictions = model.transform(df)
  
  # Write results
  predictions.write \
      .mode("overwrite") \
      .parquet("s3://data/predictions/")
Module 17: Feature Store & Data Management
Duration: 8-10 hours

Lesson 17.1: Feature Store Concepts
Theory (2h):
Feature store architecture
Online vs offline features
Feature versioning
Feature serving
Hands-on with Feast (4h):
python
  # Feast feature definitions
  from feast import Entity, Feature, FeatureView, FileSource, ValueType
  from feast.types import Float32, Int64
  from datetime import timedelta
  
  # Define entity
  user = Entity(
      name="user_id",
      description="User ID",
      value_type=ValueType.INT64
  )
  
  # Define data source
  user_stats_source = FileSource(
      path="data/user_stats.parquet",
      event_timestamp_column="event_timestamp",
      created_timestamp_column="created_timestamp"
  )
  
  # Define feature view
  user_stats_fv = FeatureView(
      name="user_statistics",
      entities=["user_id"],
      ttl=timedelta(days=7),
      features=[
          Feature(name="total_purchases", dtype=Int64),
          Feature(name="avg_purchase_value", dtype=Float32),
          Feature(name="days_since_last_purchase", dtype=Int64),
      ],
      online=True,
      batch_source=user_stats_source,
      tags={"team": "ml"},
  )
  
  # Apply to feature store
  # feast apply
  
  # Materialize features
  # feast materialize-incremental $(date -u +"%Y-%m-%dT%H:%M:%S")
  
  # Retrieve online features
  from feast import FeatureStore
  
  store = FeatureStore(repo_path=".")
  
  features = store.get_online_features(
      features=[
          "user_statistics:total_purchases",
          "user_statistics:avg_purchase_value",
      ],
      entity_rows=[{"user_id": 1001}, {"user_id": 1002}]
  ).to_dict()
  
  # Historical features for training
  entity_df = pd.DataFrame({
      "user_id": [1001, 1002, 1003],
      "event_timestamp": [
          datetime(2024, 1, 1),
          datetime(2024, 1, 2),
          datetime(2024, 1, 3),
      ]
  })
  
  training_df = store.get_historical_features(
      entity_df=entity_df,
      features=[
          "user_statistics:total_purchases",
          "user_statistics:avg_purchase_value",
      ]
  ).to_df()
Lesson 17.2: Data Quality & Validation
Hands-on (4h):
python
  # Great Expectations
  import great_expectations as ge
  
  # Create expectation suite
  df = ge.read_csv("data.csv")
  
  # Add expectations
  df.expect_column_values_to_not_be_null("user_id")
  df.expect_column_values_to_be_between("age", min_value=0, max_value=120)
  df.expect_column_values_to_be_in_set("country", ["US", "UK", "CA"])
  df.expect_column_mean_to_be_between("purchase_value", min_value=0, max_value=1000)
  
  # Save suite
  df.save_expectation_suite("user_data_suite.json")
  
  # Validate data
  validation_result = df.validate()
  
  # TensorFlow Data Validation
  import tensorflow_data_validation as tfdv
  
  # Generate statistics
  train_stats = tfdv.generate_statistics_from_csv("train.csv")
  
  # Infer schema
  schema = tfdv.infer_schema(train_stats)
  
  # Validate new data
  test_stats = tfdv.generate_statistics_from_csv("test.csv")
  anomalies = tfdv.validate_statistics(test_stats, schema)
  
  # Display anomalies
  tfdv.display_anomalies(anomalies)
  
  # Detect drift
  serving_stats = tfdv.generate_statistics_from_csv("serving.csv")
  drift_anomalies = tfdv.validate_statistics(
      serving_stats, 
      schema,
      previous_statistics=train_stats
  )
Module 18: Model Monitoring & Observability
Duration: 10-12 hours

Lesson 18.1: Model Performance Monitoring
Theory (2h):
Model metrics tracking
Prediction distribution
Performance degradation detection
A/B testing
Hands-on (4h):
python
  # Custom model monitoring with Prometheus
  from prometheus_client import Counter, Histogram, Gauge, start_http_server
  import time
  
  # Define metrics
  prediction_counter = Counter(
      'model_predictions_total',
      'Total predictions made',
      ['model_version', 'prediction_class']
  )
  
  prediction_latency = Histogram(
      'model_prediction_latency_seconds',
      'Prediction latency in seconds',
      ['model_version']
  )
  
  model_accuracy = Gauge(
      'model_accuracy',
      'Current model accuracy',
      ['model_version']
  )
  
  feature_drift = Gauge(
      'feature_drift_score',
      'Feature drift score',
      ['feature_name']
  )
  
  # Instrument prediction function
  def predict_with_monitoring(features, model_version="v1"):
      start_time = time.time()
      
      # Make prediction
      prediction = model.predict(features)
      
      # Record metrics
      latency = time.time() - start_time
      prediction_latency.labels(model_version=model_version).observe(latency)
      prediction_counter.labels(
          model_version=model_version,
          prediction_class=str(prediction[0])
      ).inc()
      
      return prediction
  
  # Start metrics server
  start_http_server(8000)
yaml
  # Prometheus scrape config
  scrape_configs:
    - job_name: 'ml-models'
      static_configs:
        - targets: ['model-service:8000']
      metric_relabel_configs:
        - source_labels: [__name__]
          regex: 'model_.*'
          action: keep
promql
  # Useful queries
  
  # Prediction rate by model version
  rate(model_predictions_total[5m])
  
  # P95 latency
  histogram_quantile(0.95, 
    sum(rate(model_prediction_latency_seconds_bucket[5m])) by (le, model_version)
  )
  
  # Error rate
  sum(rate(model_predictions_total{prediction_class="error"}[5m])) /
  sum(rate(model_predictions_total[5m]))
Lesson 18.2: Data Drift Detection
Theory (1.5h):
Types of drift (concept, data, prediction)
Statistical tests
Drift detection methods
Hands-on (3h):
python
  # Evidently AI for drift detection
  from evidently.dashboard import Dashboard
  from evidently.tabs import DataDriftTab, CatTargetDriftTab
  from evidently.pipeline.column_mapping import ColumnMapping
  
  # Create drift report
  column_mapping = ColumnMapping()
  column_mapping.target = 'target'
  column_mapping.numerical_features = ['feature1', 'feature2']
  column_mapping.categorical_features = ['category']
  
  drift_dashboard = Dashboard(tabs=[DataDriftTab(), CatTargetDriftTab()])
  drift_dashboard.calculate(
      reference_data=train_df,
      current_data=production_df,
      column_mapping=column_mapping
  )
  drift_dashboard.save('drift_report.html')
  
  # Alibi Detect for drift detection
  from alibi_detect.cd import KSDrift
  
  # Initialize drift detector
  cd = KSDrift(
      X_ref,  # Reference data
      p_val=0.05,
      correction='bonferroni'
  )
  
  # Detect drift
  drift_pred = cd.predict(X_new)
  
  if drift_pred['data']['is_drift']:
      print("Drift detected!")
      print(f"Drifted features: {drift_pred['data']['drift_features']}")
Lesson 18.3: Model Explainability
Hands-on (3h):
python
  # SHAP for model interpretation
  import shap
  
  # Initialize explainer
  explainer = shap.TreeExplainer(model)
  
  # Calculate SHAP values
  shap_values = explainer.shap_values(X_test)
  
  # Summary plot
  shap.summary_plot(shap_values, X_test)
  
  # Force plot for single prediction
  shap.force_plot(
      explainer.expected_value,
      shap_values[0],
      X_test.iloc[0]
  )
  
  # LIME for local interpretability
  from lime import lime_tabular
  
  explainer = lime_tabular.LimeTabularExplainer(
      X_train.values,
      feature_names=X_train.columns,
      class_names=['class_0', 'class_1'],
      mode='classification'
  )
  
  # Explain instance
  exp = explainer.explain_instance(
      X_test.iloc[0].values,
      model.predict_proba,
      num_features=10
  )
  exp.show_in_notebook()
Module 19: Advanced ML Infrastructure
Duration: 10-12 hours

Lesson 19.1: GPU Management in Kubernetes
Theory (1.5h):
GPU scheduling
Multi-GPU training
GPU sharing
Cost optimization
Hands-on (4h):
yaml
  # NVIDIA GPU Operator
  kubectl create -f https://raw.githubusercontent.com/NVIDIA/gpu-operator/master/deployments/gpu-operator.yaml
  
  # Pod with GPU
  apiVersion: v1
  kind: Pod
  metadata:
    name: gpu-pod
  spec:
    containers:
    - name: training
      image: nvcr.io/nvidia/pytorch:23.12-py3
      resources:
        limits:
          nvidia.com/gpu: 1
      command: ["python", "train.py"]
      
  ---
  # Multi-GPU training
  apiVersion: kubeflow.org/v1
  kind: PyTorchJob
  metadata:
    name: pytorch-dist-training
  spec:
    pytorchReplicaSpecs:
      Master:
        replicas: 1
        template:
          spec:
            containers:
            - name: pytorch
              image: pytorch/pytorch:latest
              resources:
                limits:
                  nvidia.com/gpu: 1
      Worker:
        replicas: 3
        template:
          spec:
            containers:
            - name: pytorch
              image: pytorch/pytorch:latest
              resources:
                limits:
                  nvidia.com/gpu: 1
Lesson 19.2: Distributed Training
Hands-on (4h):
python
  # PyTorch Distributed Data Parallel
  import torch
  import torch.distributed as dist
  import torch.nn as nn
  import torch.optim as optim
  from torch.nn.parallel import DistributedDataParallel as DDP
  
  def setup(rank, world_size):
      os.environ['MASTER_ADDR'] = 'localhost'
      os.environ['MASTER_PORT'] = '12355'
      dist.init_process_group("nccl", rank=rank, world_size=world_size)
  
  def train(rank, world_size):
      setup(rank, world_size)
      
      # Create model and move to GPU
      model = YourModel().to(rank)
      ddp_model = DDP(model, device_ids=[rank])
      
      # Training loop
      for epoch in range(num_epochs):
          for batch in dataloader:
              optimizer.zero_grad()
              outputs = ddp_model(batch)
              loss = criterion(outputs, labels)
              loss.backward()
              optimizer.step()
      
      cleanup()
  
  def cleanup():
      dist.destroy_process_group()
  
  # Launch training
  if __name__ == "__main__":
      world_size = torch.cuda.device_count()
      torch.multiprocessing.spawn(
          train,
          args=(world_size,),
          nprocs=world_size,
          join=True
      )
python
  # Horovod for distributed training
  import horovod.torch as hvd
  
  # Initialize Horovod
  hvd.init()
  
  # Pin GPU
  torch.cuda.set_device(hvd.local_rank())
  
  # Scale learning rate
  optimizer = optim.SGD(
      model.parameters(),
      lr=0.01 * hvd.size()
  )
  
  # Wrap optimizer
  optimizer = hvd.DistributedOptimizer(optimizer)
  
  # Broadcast parameters
  hvd.broadcast_parameters(model.state_dict(), root_rank=0)
  hvd.broadcast_optimizer_state(optimizer, root_rank=0)
  
  # Training loop
  for epoch in range(num_epochs):
      for batch_idx, (data, target) in enumerate(train_loader):
          optimizer.zero_grad()
          output = model(data)
          loss = F.nll_loss(output, target)
          loss.backward()
          optimizer.step()
          
          if batch_idx % 10 == 0 and hvd.rank() == 0:
              print(f'Epoch: {epoch}, Loss: {loss.item()}')
Lesson 19.3: AutoML & Hyperparameter Tuning
Hands-on (3h):
python
  # Optuna for hyperparameter optimization
  import optuna
  
  def objective(trial):
      # Suggest hyperparameters
      n_estimators = trial.suggest_int('n_estimators', 10, 200)
      max_depth = trial.suggest_int('max_depth', 2, 32)
      learning_rate = trial.suggest_float('learning_rate', 1e-4, 1e-1, log=True)
      
      # Train model
      model = XGBClassifier(
          n_estimators=n_estimators,
          max_depth=max_depth,
          learning_rate=learning_rate
      )
      model.fit(X_train, y_train)
      
      # Evaluate
      score = model.score(X_val, y_val)
      return score
  
  # Optimize
  study = optuna.create_study(direction='maximize')
  study.optimize(objective, n_trials=100)
  
  print(f"Best params: {study.best_params}")
  print(f"Best score: {study.best_value}")
  
  # Ray Tune for distributed tuning
  from ray import tune
  from ray.tune.schedulers import ASHAScheduler
  
  def train_model(config):
      model = RandomForestClassifier(
          n_estimators=config["n_estimators"],
          max_depth=config["max_depth"]
      )
      model.fit(X_train, y_train)
      accuracy = model.score(X_val, y_val)
      tune.report(accuracy=accuracy)
  
  config = {
      "n_estimators": tune.randint(10, 200),
      "max_depth": tune.randint(2, 32)
  }
  
  scheduler = ASHAScheduler(
      metric="accuracy",
      mode="max"
  )
  
  analysis = tune.run(
      train_model,
      config=config,
      num_samples=100,
      scheduler=scheduler
  )
  
  best_config = analysis.best_config
📦 PROJECT 9: Real-Time ML System
Duration: 20-25 hours

Objective: Build production-ready real-time ML inference system

Use Case: Choose one:

Fraud Detection
Real-time Recommendations
Anomaly Detection
Predictive Maintenance
Requirements:

1. Data Pipeline:

Streaming data ingestion (Kafka)
Real-time feature engineering
Feature store integration
Data validation
2. Model Infrastructure:

Multiple model versions
A/B testing framework
Canary deployments
Shadow mode testing
Model warm-up
3. Serving Layer:

High-throughput API (FastAPI)
Load balancing
Auto-scaling (HPA)
Circuit breakers
Rate limiting
Caching layer (Redis)
4. Monitoring:

Prediction latency
Model performance metrics
Data drift detection
Feature distribution tracking
Real-time alerting
5. MLOps Automation:

Automated retraining pipeline
Model validation tests
Gradual rollout
Automated rollback
Tech Stack:

Python, scikit-learn/PyTorch
FastAPI/Flask
Kafka/Kinesis
Redis
Feast (Feature Store)
Seldon Core/KServe
Prometheus + Grafana
Evidently AI
Performance Requirements:

P99 latency < 100ms
Throughput > 1000 req/s
99.9% availability
Zero-downtime deployments
Deliverables:

Complete codebase
Architecture diagram
Load testing results (k6/Locust)
Monitoring dashboards
Incident response runbook
Performance tuning document
Cost analysis
Video demo (20 min)
📦 PROJECT 10: ML Platform on Kubernetes
Duration: 25-30 hours

Objective: Build enterprise ML platform on Kubernetes

Platform Components:

1. ML Workbench:

JupyterHub for data scientists
VS Code server integration
Shared storage (NFS/EFS)
GPU access
2. Experiment Tracking:

MLflow deployment
Model registry
Artifact storage (S3/MinIO)
3. Training Infrastructure:

Kubeflow Pipelines
Distributed training support
GPU scheduling
Spot instance integration
4. Feature Store:

Feast deployment
Online/offline serving
Feature monitoring
5. Model Serving:

Seldon Core/KServe
Multi-model serving
Auto-scaling
Traffic routing (Istio)
6. Monitoring:

Prometheus for metrics
Grafana dashboards
Model performance tracking
Resource utilization
7. Security:

RBAC for ML resources
Secrets management
Network policies
Pod security policies
Requirements:

Multi-tenant architecture
Resource quotas per team
Cost tracking and chargeback
Automated backups
Disaster recovery
CI/CD for platform components
Documentation and tutorials
Deliverables:

Complete infrastructure code
Helm charts for all components
User documentation
Admin runbook
Capacity planning guide
Security audit
Cost optimization report
Architecture diagrams
Video demo (30 min)
🎓 PHASE 6: EXPERT CAPSTONE
Module 20: Cloud-Native Architecture Patterns
Duration: 8-10 hours

Lesson 20.1: Multi-Cloud & Hybrid Cloud
Theory (2h):
Multi-cloud strategies
Cloud-agnostic design
Hybrid cloud patterns
Edge computing
Hands-on (4h):
hcl
  # Multi-cloud Terraform
  # AWS Provider
  provider "aws" {
    region = var.aws_region
  }
  
  # GCP Provider
  provider "google" {
    project = var.gcp_project
    region  = var.gcp_region
  }
  
  # Azure Provider
  provider "azurerm" {
    features {}
  }
  
  # Create resources in multiple clouds
  module "aws_k8s" {
    source = "./modules/aws-eks"
    # ...
  }
  
  module "gcp_k8s" {
    source = "./modules/gcp-gke"
    # ...
  }
Lesson 20.2: Chaos Engineering
Hands-on (4h):
yaml
  # Chaos Mesh experiments
  apiVersion: chaos-mesh.org/v1alpha1
  kind: PodChaos
  metadata:
    name: pod-failure
  spec:
    action: pod-failure
    mode: one
    duration: "30s"
    selector:
      namespaces:
        - production
      labelSelectors:
        app: web
        
  ---
  apiVersion: chaos-mesh.org/v1alpha1
  kind: NetworkChaos
  metadata:
    name: network-delay
  spec:
    action: delay
    mode: all
    selector:
      namespaces:
        - production
    delay:
      latency: "100ms"
      correlation: "25"
      jitter: "10ms"
Module 21: Advanced MLOps Patterns
Duration: 8-10 hours

Lesson 21.1: Federated Learning
Theory (2h):
Federated learning concepts
Privacy-preserving ML
Differential privacy
Lesson 21.2: ML at Edge
Theory (2h):
Edge deployment challenges
Model compression
Offline inference
Lesson 21.3: Continuous Training
Hands-on (4h):
Online learning systems
Incremental training
Active learning
Automated retraining triggers
📦 CAPSTONE PROJECT 11: Multi-Cloud DevOps Platform
Duration: 30-35 hours

Objective: Build enterprise-grade multi-cloud DevOps platform

Requirements:

Multi-cloud Kubernetes (EKS, GKE, AKS)
Service mesh across clouds (Istio)
Multi-cloud CI/CD
Centralized observability
Disaster recovery automation
Cost optimization across clouds
Security and compliance
Infrastructure as Code
GitOps deployment
Self-service portals
Deliverables:

Multi-cloud architecture
Complete IaC codebase
Migration strategy document
DR testing results
Cost comparison analysis
Security assessment
Performance benchmarks
Video presentation (30 min)
📦 CAPSTONE PROJECT 12: Enterprise MLOps Platform
Duration: 35-40 hours

Objective: Build complete enterprise MLOps platform

Platform Features:

Multi-tenant ML workspace
Automated ML pipelines
Feature store
Model registry
A/B testing framework
Real-time and batch inference
Model monitoring and drift detection
Automated retraining
Model governance
Cost tracking per model
Business Requirements:

Support 50+ data scientists
100+ models in production
10M+ predictions/day
99.9% SLA
SOC 2 compliant
Multi-region deployment
Deliverables:

Platform architecture
Complete implementation
User documentation
Admin documentation
Migration guide
Training materials
ROI analysis
Video presentation (40 min)
🎯 Additional Platform Features
Gamification & Progress Tracking
Badges: Complete modules, projects
Leaderboard: Community ranking
Streaks: Daily learning
Certificates: Per phase completion
Interactive Features
Code Playgrounds: In-browser terminals
Live Labs: Sandbox environments
AI Assistant: Context-aware help
Code Reviews: Peer and mentor reviews
Discussion Forums: Per lesson/project
Assessment System
Knowledge Checks: After each lesson
Hands-on Labs: Validated automatically
Project Reviews: Manual + automated
Final Exams: Per phase certification
Mock Interviews: Technical and behavioral
Career Support
Resume Builder: DevOps/MLOps focused
Portfolio Generator: From projects
Interview Prep: Common questions
Job Board: Partner companies
Mentorship: 1-on-1 sessions
📊 Course Metrics Summary
Total Learning Path
Duration: 250-300 hours
Phases: 6
Modules: 21
Projects: 12 (3 beginner, 4 intermediate, 3 advanced, 2 capstone)
**Hands-on
Continue

21:08
Labs**: 100+

Assessments: 50+
Skill Coverage
Linux & Shell: ✓✓✓
Git & Version Control: ✓✓✓
Docker & Containers: ✓✓✓
Kubernetes: ✓✓✓
CI/CD: ✓✓✓
Infrastructure as Code: ✓✓✓
Cloud Platforms: ✓✓✓
Monitoring & Observability: ✓✓✓
Security: ✓✓✓
Python for ML: ✓✓✓
ML Fundamentals: ✓✓
MLOps Tools: ✓✓✓
Model Serving: ✓✓✓
Feature Engineering: ✓✓
Distributed Training: ✓✓
ML Monitoring: ✓✓✓
Career Outcomes
Junior DevOps Engineer: After Phase 2
DevOps Engineer: After Phase 3
Senior DevOps Engineer: After Capstone Project 11
MLOps Engineer: After Phase 5
Senior MLOps/Platform Engineer: After Capstone Project 12