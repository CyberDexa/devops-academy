// Project 3: Cloud-Deployed Web Application
// Deploy a production application to AWS with proper architecture

import { ProjectGuide } from "../project-guides"

export const project3Guide: ProjectGuide = {
  projectId: "project-3",
  title: "Cloud-Deployed Web Application",
  overview: `Deploy a production-ready web application to AWS using industry best practices.
You'll create a complete cloud architecture with EC2/ECS, Application Load Balancer, RDS PostgreSQL, 
S3 for static assets, CloudFront CDN, and Auto Scaling. This project teaches you how to architect 
and deploy applications that can handle real-world production traffic.`,
  difficulty: "intermediate",
  totalTime: "8-10 hours",
  prerequisites: [
    "AWS account (free tier eligible)",
    "Completed Projects 1 and 2",
    "Basic understanding of networking (VPC, subnets)",
    "Familiarity with AWS Console and CLI",
    "Docker fundamentals",
  ],
  techStack: [
    "AWS (EC2, ECS, RDS, S3, CloudFront, ALB)",
    "Terraform (Infrastructure as Code)",
    "Docker",
    "PostgreSQL",
    "Nginx",
    "Let's Encrypt (SSL)",
  ],
  architecture: `
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              AWS Cloud Architecture                              │
│                                                                                  │
│   ┌─────────────┐         ┌─────────────────────────────────────────────────┐  │
│   │ CloudFront  │         │                     VPC                          │  │
│   │    (CDN)    │         │  ┌───────────────────────────────────────────┐  │  │
│   └──────┬──────┘         │  │            Public Subnets                  │  │  │
│          │                │  │  ┌─────────────┐    ┌─────────────┐       │  │  │
│          ▼                │  │  │   ALB       │    │   NAT GW    │       │  │  │
│   ┌─────────────┐         │  │  │  (Port 443) │    │             │       │  │  │
│   │     S3      │         │  │  └──────┬──────┘    └──────┬──────┘       │  │  │
│   │   Bucket    │         │  └─────────┼─────────────────┼───────────────┘  │  │
│   │  (Static)   │         │            │                 │                   │  │
│   └─────────────┘         │  ┌─────────┼─────────────────┼───────────────┐  │  │
│                           │  │         ▼    Private Subnets              │  │  │
│   Internet ──────────────▶│  │  ┌─────────────┐    ┌─────────────┐       │  │  │
│                           │  │  │  ECS/EC2    │    │  ECS/EC2    │       │  │  │
│                           │  │  │  (App AZ1)  │    │  (App AZ2)  │       │  │  │
│                           │  │  └──────┬──────┘    └──────┬──────┘       │  │  │
│                           │  │         │                  │              │  │  │
│                           │  │         └────────┬─────────┘              │  │  │
│                           │  │                  ▼                        │  │  │
│                           │  │         ┌─────────────────┐               │  │  │
│                           │  │         │  RDS PostgreSQL │               │  │  │
│                           │  │         │   (Multi-AZ)    │               │  │  │
│                           │  │         └─────────────────┘               │  │  │
│                           │  └───────────────────────────────────────────┘  │  │
│                           └─────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────────┘
`,
  phases: [
    // ============ PHASE 1: AWS SETUP ============
    {
      id: "phase-1",
      title: "AWS Account & CLI Setup",
      description: "Configure AWS credentials and set up the development environment.",
      estimatedTime: "30 minutes",
      tasks: [
        {
          id: "task-1-1",
          title: "Configure AWS CLI",
          description: "Set up AWS CLI with proper credentials and profiles.",
          instructions: [
            "Install AWS CLI v2 if not already installed",
            "Create an IAM user with programmatic access",
            "Configure AWS CLI with credentials",
            "Verify access to AWS services",
          ],
          codeSnippets: [
            {
              language: "bash",
              filename: "aws-setup.sh",
              code: `# Install AWS CLI (macOS)
brew install awscli

# Or download from AWS
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /

# Verify installation
aws --version

# Configure credentials (use your IAM user credentials)
aws configure
# AWS Access Key ID: YOUR_ACCESS_KEY
# AWS Secret Access Key: YOUR_SECRET_KEY
# Default region: us-east-1
# Default output format: json

# Verify access
aws sts get-caller-identity

# List available regions
aws ec2 describe-regions --query "Regions[].RegionName" --output table`,
            },
            {
              language: "bash",
              filename: "Create IAM Policy for Project",
              code: `# Create a policy document
cat > project-policy.json << 'EOF'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:*",
        "ecs:*",
        "ecr:*",
        "rds:*",
        "s3:*",
        "cloudfront:*",
        "elasticloadbalancing:*",
        "autoscaling:*",
        "cloudwatch:*",
        "logs:*",
        "iam:PassRole",
        "iam:GetRole",
        "iam:CreateRole",
        "iam:AttachRolePolicy",
        "iam:CreateInstanceProfile",
        "secretsmanager:*",
        "acm:*"
      ],
      "Resource": "*"
    }
  ]
}
EOF

# This is a broad policy for learning - in production, use least privilege!`,
            },
          ],
          validation: {
            type: "command",
            command: "aws sts get-caller-identity",
            description: "Should return your AWS account and user information",
          },
        },
        {
          id: "task-1-2",
          title: "Install Terraform",
          description: "Set up Terraform for infrastructure as code.",
          instructions: [
            "Install Terraform using package manager",
            "Verify installation",
            "Create project directory structure",
          ],
          codeSnippets: [
            {
              language: "bash",
              code: `# Install Terraform (macOS)
brew tap hashicorp/tap
brew install hashicorp/tap/terraform

# Or install manually
curl -fsSL https://releases.hashicorp.com/terraform/1.6.0/terraform_1.6.0_darwin_amd64.zip -o terraform.zip
unzip terraform.zip
sudo mv terraform /usr/local/bin/

# Verify installation
terraform version

# Create project structure
mkdir -p cloud-deploy-project/{terraform,app,scripts}
cd cloud-deploy-project`,
            },
          ],
          validation: {
            type: "command",
            command: "terraform version",
            description: "Terraform should be installed and accessible",
          },
        },
      ],
    },

    // ============ PHASE 2: NETWORKING (VPC) ============
    {
      id: "phase-2",
      title: "Network Infrastructure",
      description: "Create VPC, subnets, and networking components using Terraform.",
      estimatedTime: "1 hour",
      tasks: [
        {
          id: "task-2-1",
          title: "Create VPC with Terraform",
          description: "Define the network foundation with public and private subnets.",
          instructions: [
            "Create Terraform provider configuration",
            "Define VPC with CIDR block",
            "Create public and private subnets in multiple AZs",
            "Set up Internet Gateway and NAT Gateway",
          ],
          codeSnippets: [
            {
              language: "hcl",
              filename: "terraform/providers.tf",
              code: `terraform {
  required_version = ">= 1.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Optional: Remote backend for state
  # backend "s3" {
  #   bucket = "your-terraform-state-bucket"
  #   key    = "cloud-deploy/terraform.tfstate"
  #   region = "us-east-1"
  # }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "cloud-deploy-project"
      Environment = var.environment
      ManagedBy   = "terraform"
    }
  }
}`,
            },
            {
              language: "hcl",
              filename: "terraform/variables.tf",
              code: `variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "cloud-deploy"
}

variable "vpc_cidr" {
  description = "VPC CIDR block"
  type        = string
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  description = "Availability zones"
  type        = list(string)
  default     = ["us-east-1a", "us-east-1b"]
}

variable "db_username" {
  description = "Database username"
  type        = string
  sensitive   = true
}

variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}`,
            },
            {
              language: "hcl",
              filename: "terraform/vpc.tf",
              code: `# VPC
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "\${var.project_name}-vpc"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "\${var.project_name}-igw"
  }
}

# Public Subnets
resource "aws_subnet" "public" {
  count = length(var.availability_zones)

  vpc_id                  = aws_vpc.main.id
  cidr_block              = cidrsubnet(var.vpc_cidr, 4, count.index)
  availability_zone       = var.availability_zones[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name = "\${var.project_name}-public-\${count.index + 1}"
    Type = "public"
  }
}

# Private Subnets
resource "aws_subnet" "private" {
  count = length(var.availability_zones)

  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet(var.vpc_cidr, 4, count.index + length(var.availability_zones))
  availability_zone = var.availability_zones[count.index]

  tags = {
    Name = "\${var.project_name}-private-\${count.index + 1}"
    Type = "private"
  }
}

# Elastic IP for NAT Gateway
resource "aws_eip" "nat" {
  domain = "vpc"

  tags = {
    Name = "\${var.project_name}-nat-eip"
  }

  depends_on = [aws_internet_gateway.main]
}

# NAT Gateway
resource "aws_nat_gateway" "main" {
  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.public[0].id

  tags = {
    Name = "\${var.project_name}-nat"
  }

  depends_on = [aws_internet_gateway.main]
}

# Public Route Table
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "\${var.project_name}-public-rt"
  }
}

# Private Route Table
resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.main.id
  }

  tags = {
    Name = "\${var.project_name}-private-rt"
  }
}

# Route Table Associations
resource "aws_route_table_association" "public" {
  count = length(aws_subnet.public)

  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "private" {
  count = length(aws_subnet.private)

  subnet_id      = aws_subnet.private[count.index].id
  route_table_id = aws_route_table.private.id
}`,
            },
          ],
          validation: {
            type: "command",
            command: "cd terraform && terraform init && terraform validate",
            description: "Terraform should initialize and validate successfully",
          },
        },
        {
          id: "task-2-2",
          title: "Create Security Groups",
          description: "Define security groups for ALB, application, and database.",
          instructions: [
            "Create ALB security group (allow 80, 443 from internet)",
            "Create application security group (allow traffic from ALB)",
            "Create database security group (allow PostgreSQL from app)",
          ],
          codeSnippets: [
            {
              language: "hcl",
              filename: "terraform/security-groups.tf",
              code: `# ALB Security Group
resource "aws_security_group" "alb" {
  name        = "\${var.project_name}-alb-sg"
  description = "Security group for Application Load Balancer"
  vpc_id      = aws_vpc.main.id

  ingress {
    description = "HTTP from anywhere"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS from anywhere"
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

  tags = {
    Name = "\${var.project_name}-alb-sg"
  }
}

# Application Security Group
resource "aws_security_group" "app" {
  name        = "\${var.project_name}-app-sg"
  description = "Security group for application servers"
  vpc_id      = aws_vpc.main.id

  ingress {
    description     = "HTTP from ALB"
    from_port       = 3000
    to_port         = 3000
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }

  ingress {
    description     = "SSH for debugging (remove in production)"
    from_port       = 22
    to_port         = 22
    protocol        = "tcp"
    cidr_blocks     = ["0.0.0.0/0"]  # Restrict to your IP in production
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "\${var.project_name}-app-sg"
  }
}

# Database Security Group
resource "aws_security_group" "db" {
  name        = "\${var.project_name}-db-sg"
  description = "Security group for RDS database"
  vpc_id      = aws_vpc.main.id

  ingress {
    description     = "PostgreSQL from app servers"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.app.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "\${var.project_name}-db-sg"
  }
}`,
            },
          ],
        },
      ],
    },

    // ============ PHASE 3: DATABASE ============
    {
      id: "phase-3",
      title: "Database Setup (RDS)",
      description: "Create a managed PostgreSQL database with RDS.",
      estimatedTime: "45 minutes",
      tasks: [
        {
          id: "task-3-1",
          title: "Create RDS PostgreSQL Instance",
          description: "Deploy a Multi-AZ PostgreSQL database using RDS.",
          instructions: [
            "Create DB subnet group",
            "Create RDS PostgreSQL instance",
            "Store credentials in Secrets Manager",
            "Output connection details",
          ],
          codeSnippets: [
            {
              language: "hcl",
              filename: "terraform/rds.tf",
              code: `# DB Subnet Group
resource "aws_db_subnet_group" "main" {
  name       = "\${var.project_name}-db-subnet-group"
  subnet_ids = aws_subnet.private[*].id

  tags = {
    Name = "\${var.project_name}-db-subnet-group"
  }
}

# RDS PostgreSQL Instance
resource "aws_db_instance" "main" {
  identifier = "\${var.project_name}-db"

  # Engine
  engine               = "postgres"
  engine_version       = "15.4"
  instance_class       = "db.t3.micro"  # Free tier eligible
  
  # Storage
  allocated_storage     = 20
  max_allocated_storage = 100
  storage_type          = "gp3"
  storage_encrypted     = true

  # Database
  db_name  = "appdb"
  username = var.db_username
  password = var.db_password
  port     = 5432

  # Network
  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.db.id]
  publicly_accessible    = false
  
  # High Availability (disable for free tier)
  multi_az = false  # Set to true for production

  # Backup
  backup_retention_period = 7
  backup_window           = "03:00-04:00"
  maintenance_window      = "Mon:04:00-Mon:05:00"

  # Monitoring
  performance_insights_enabled = false  # Enable in production
  
  # Deletion protection (enable in production)
  deletion_protection = false
  skip_final_snapshot = true

  tags = {
    Name = "\${var.project_name}-db"
  }
}

# Store DB credentials in Secrets Manager
resource "aws_secretsmanager_secret" "db_credentials" {
  name = "\${var.project_name}/db-credentials"
  
  tags = {
    Name = "\${var.project_name}-db-secret"
  }
}

resource "aws_secretsmanager_secret_version" "db_credentials" {
  secret_id = aws_secretsmanager_secret.db_credentials.id
  secret_string = jsonencode({
    username = var.db_username
    password = var.db_password
    host     = aws_db_instance.main.address
    port     = aws_db_instance.main.port
    database = aws_db_instance.main.db_name
  })
}`,
            },
            {
              language: "hcl",
              filename: "terraform/outputs.tf",
              code: `output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}

output "public_subnet_ids" {
  description = "Public subnet IDs"
  value       = aws_subnet.public[*].id
}

output "private_subnet_ids" {
  description = "Private subnet IDs"
  value       = aws_subnet.private[*].id
}

output "db_endpoint" {
  description = "RDS endpoint"
  value       = aws_db_instance.main.address
  sensitive   = true
}

output "db_secret_arn" {
  description = "Database credentials secret ARN"
  value       = aws_secretsmanager_secret.db_credentials.arn
}

output "alb_dns_name" {
  description = "ALB DNS name"
  value       = aws_lb.main.dns_name
}`,
            },
          ],
          hints: [
            "Use db.t3.micro for free tier eligibility",
            "Never commit database passwords to Git",
            "Use terraform.tfvars for sensitive variables (add to .gitignore)",
          ],
        },
      ],
    },

    // ============ PHASE 4: APPLICATION LOAD BALANCER ============
    {
      id: "phase-4",
      title: "Load Balancer & SSL",
      description: "Set up Application Load Balancer with SSL/TLS certificate.",
      estimatedTime: "1 hour",
      tasks: [
        {
          id: "task-4-1",
          title: "Create Application Load Balancer",
          description: "Deploy an ALB with target groups and listeners.",
          instructions: [
            "Create Application Load Balancer",
            "Create target group for the application",
            "Configure HTTP and HTTPS listeners",
            "Request or import SSL certificate",
          ],
          codeSnippets: [
            {
              language: "hcl",
              filename: "terraform/alb.tf",
              code: `# Application Load Balancer
resource "aws_lb" "main" {
  name               = "\${var.project_name}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = aws_subnet.public[*].id

  enable_deletion_protection = false  # Enable in production

  tags = {
    Name = "\${var.project_name}-alb"
  }
}

# Target Group
resource "aws_lb_target_group" "app" {
  name        = "\${var.project_name}-tg"
  port        = 3000
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "ip"  # Use "instance" for EC2

  health_check {
    enabled             = true
    healthy_threshold   = 2
    unhealthy_threshold = 3
    timeout             = 5
    interval            = 30
    path                = "/health"
    port                = "traffic-port"
    protocol            = "HTTP"
    matcher             = "200"
  }

  tags = {
    Name = "\${var.project_name}-tg"
  }
}

# HTTP Listener (redirects to HTTPS)
resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.main.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

# HTTPS Listener
resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.main.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS13-1-2-2021-06"
  certificate_arn   = aws_acm_certificate_validation.main.certificate_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app.arn
  }
}`,
            },
            {
              language: "hcl",
              filename: "terraform/acm.tf",
              code: `# Request SSL Certificate
resource "aws_acm_certificate" "main" {
  domain_name       = var.domain_name
  validation_method = "DNS"

  subject_alternative_names = [
    "www.\${var.domain_name}"
  ]

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "\${var.project_name}-cert"
  }
}

# DNS Validation (if using Route 53)
resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.main.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.main.zone_id
}

resource "aws_acm_certificate_validation" "main" {
  certificate_arn         = aws_acm_certificate.main.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}

# Route 53 Zone (if you have one)
data "aws_route53_zone" "main" {
  name         = var.domain_name
  private_zone = false
}

# A Record for ALB
resource "aws_route53_record" "app" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_lb.main.dns_name
    zone_id                = aws_lb.main.zone_id
    evaluate_target_health = true
  }
}`,
            },
          ],
          hints: [
            "If you don't have a domain, you can use the ALB DNS name directly",
            "ACM certificates are free for AWS resources",
            "DNS validation is easier than email validation",
          ],
        },
      ],
    },

    // ============ PHASE 5: ECS CLUSTER & SERVICE ============
    {
      id: "phase-5",
      title: "Container Deployment (ECS)",
      description: "Deploy the application using ECS Fargate.",
      estimatedTime: "1.5 hours",
      tasks: [
        {
          id: "task-5-1",
          title: "Create ECR Repository",
          description: "Set up Elastic Container Registry for Docker images.",
          instructions: [
            "Create ECR repository",
            "Configure lifecycle policy",
            "Push your application image",
          ],
          codeSnippets: [
            {
              language: "hcl",
              filename: "terraform/ecr.tf",
              code: `# ECR Repository
resource "aws_ecr_repository" "app" {
  name                 = "\${var.project_name}-app"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name = "\${var.project_name}-ecr"
  }
}

# Lifecycle Policy - Keep last 10 images
resource "aws_ecr_lifecycle_policy" "app" {
  repository = aws_ecr_repository.app.name

  policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description  = "Keep last 10 images"
        selection = {
          tagStatus   = "any"
          countType   = "imageCountMoreThan"
          countNumber = 10
        }
        action = {
          type = "expire"
        }
      }
    ]
  })
}

output "ecr_repository_url" {
  description = "ECR repository URL"
  value       = aws_ecr_repository.app.repository_url
}`,
            },
            {
              language: "bash",
              filename: "Push image to ECR",
              code: `# Get ECR login credentials
aws ecr get-login-password --region us-east-1 | \\
  docker login --username AWS --password-stdin YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com

# Build and tag image
docker build -t cloud-deploy-app .
docker tag cloud-deploy-app:latest YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/cloud-deploy-app:latest

# Push to ECR
docker push YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/cloud-deploy-app:latest`,
            },
          ],
        },
        {
          id: "task-5-2",
          title: "Create ECS Cluster and Service",
          description: "Deploy application using ECS Fargate with auto-scaling.",
          instructions: [
            "Create ECS cluster",
            "Define task definition",
            "Create ECS service with Fargate",
            "Configure auto-scaling",
          ],
          codeSnippets: [
            {
              language: "hcl",
              filename: "terraform/ecs.tf",
              code: `# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "\${var.project_name}-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }

  tags = {
    Name = "\${var.project_name}-cluster"
  }
}

# ECS Task Execution Role
resource "aws_iam_role" "ecs_execution" {
  name = "\${var.project_name}-ecs-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_execution" {
  role       = aws_iam_role.ecs_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# Allow access to Secrets Manager
resource "aws_iam_role_policy" "ecs_secrets" {
  name = "\${var.project_name}-ecs-secrets-policy"
  role = aws_iam_role.ecs_execution.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "secretsmanager:GetSecretValue"
        ]
        Resource = [aws_secretsmanager_secret.db_credentials.arn]
      }
    ]
  })
}

# ECS Task Role (for app to access AWS services)
resource "aws_iam_role" "ecs_task" {
  name = "\${var.project_name}-ecs-task-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

# CloudWatch Log Group
resource "aws_cloudwatch_log_group" "app" {
  name              = "/ecs/\${var.project_name}"
  retention_in_days = 30

  tags = {
    Name = "\${var.project_name}-logs"
  }
}

# ECS Task Definition
resource "aws_ecs_task_definition" "app" {
  family                   = "\${var.project_name}-app"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 256
  memory                   = 512
  execution_role_arn       = aws_iam_role.ecs_execution.arn
  task_role_arn            = aws_iam_role.ecs_task.arn

  container_definitions = jsonencode([
    {
      name  = "app"
      image = "\${aws_ecr_repository.app.repository_url}:latest"
      
      portMappings = [
        {
          containerPort = 3000
          hostPort      = 3000
          protocol      = "tcp"
        }
      ]

      environment = [
        {
          name  = "NODE_ENV"
          value = "production"
        },
        {
          name  = "PORT"
          value = "3000"
        }
      ]

      secrets = [
        {
          name      = "DATABASE_URL"
          valueFrom = "\${aws_secretsmanager_secret.db_credentials.arn}:host::"
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.app.name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "app"
        }
      }

      healthCheck = {
        command     = ["CMD-SHELL", "wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1"]
        interval    = 30
        timeout     = 5
        retries     = 3
        startPeriod = 60
      }
    }
  ])

  tags = {
    Name = "\${var.project_name}-task"
  }
}

# ECS Service
resource "aws_ecs_service" "app" {
  name            = "\${var.project_name}-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = 2
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = aws_subnet.private[*].id
    security_groups  = [aws_security_group.app.id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.app.arn
    container_name   = "app"
    container_port   = 3000
  }

  deployment_configuration {
    maximum_percent         = 200
    minimum_healthy_percent = 100
  }

  depends_on = [
    aws_lb_listener.https,
    aws_iam_role_policy_attachment.ecs_execution
  ]

  tags = {
    Name = "\${var.project_name}-service"
  }
}`,
            },
            {
              language: "hcl",
              filename: "terraform/autoscaling.tf",
              code: `# Auto Scaling Target
resource "aws_appautoscaling_target" "ecs" {
  max_capacity       = 10
  min_capacity       = 2
  resource_id        = "service/\${aws_ecs_cluster.main.name}/\${aws_ecs_service.app.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}

# CPU-based scaling
resource "aws_appautoscaling_policy" "cpu" {
  name               = "\${var.project_name}-cpu-scaling"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.ecs.resource_id
  scalable_dimension = aws_appautoscaling_target.ecs.scalable_dimension
  service_namespace  = aws_appautoscaling_target.ecs.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }
    target_value       = 70.0
    scale_in_cooldown  = 300
    scale_out_cooldown = 60
  }
}

# Memory-based scaling
resource "aws_appautoscaling_policy" "memory" {
  name               = "\${var.project_name}-memory-scaling"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.ecs.resource_id
  scalable_dimension = aws_appautoscaling_target.ecs.scalable_dimension
  service_namespace  = aws_appautoscaling_target.ecs.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageMemoryUtilization"
    }
    target_value       = 80.0
    scale_in_cooldown  = 300
    scale_out_cooldown = 60
  }
}`,
            },
          ],
        },
      ],
    },

    // ============ PHASE 6: S3 & CLOUDFRONT ============
    {
      id: "phase-6",
      title: "Static Assets & CDN",
      description: "Set up S3 for static files and CloudFront for content delivery.",
      estimatedTime: "45 minutes",
      tasks: [
        {
          id: "task-6-1",
          title: "Create S3 Bucket and CloudFront",
          description: "Configure S3 for static assets with CloudFront CDN.",
          instructions: [
            "Create S3 bucket for static assets",
            "Configure bucket policy for CloudFront",
            "Create CloudFront distribution",
            "Set up Origin Access Identity",
          ],
          codeSnippets: [
            {
              language: "hcl",
              filename: "terraform/cloudfront.tf",
              code: `# S3 Bucket for Static Assets
resource "aws_s3_bucket" "static" {
  bucket = "\${var.project_name}-static-\${random_id.bucket_suffix.hex}"

  tags = {
    Name = "\${var.project_name}-static"
  }
}

resource "random_id" "bucket_suffix" {
  byte_length = 4
}

# Block public access (CloudFront will access via OAI)
resource "aws_s3_bucket_public_access_block" "static" {
  bucket = aws_s3_bucket.static.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# CloudFront Origin Access Identity
resource "aws_cloudfront_origin_access_identity" "static" {
  comment = "\${var.project_name} static assets OAI"
}

# S3 Bucket Policy for CloudFront
resource "aws_s3_bucket_policy" "static" {
  bucket = aws_s3_bucket.static.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "AllowCloudFrontAccess"
        Effect    = "Allow"
        Principal = {
          AWS = aws_cloudfront_origin_access_identity.static.iam_arn
        }
        Action   = "s3:GetObject"
        Resource = "\${aws_s3_bucket.static.arn}/*"
      }
    ]
  })
}

# CloudFront Distribution
resource "aws_cloudfront_distribution" "main" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  price_class         = "PriceClass_100"  # US, Canada, Europe only
  
  # S3 Origin for static assets
  origin {
    domain_name = aws_s3_bucket.static.bucket_regional_domain_name
    origin_id   = "S3-static"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.static.cloudfront_access_identity_path
    }
  }

  # ALB Origin for API
  origin {
    domain_name = aws_lb.main.dns_name
    origin_id   = "ALB-api"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  # Default behavior - serve from S3
  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-static"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
  }

  # API behavior - forward to ALB
  ordered_cache_behavior {
    path_pattern     = "/api/*"
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "ALB-api"

    forwarded_values {
      query_string = true
      headers      = ["Authorization", "Host", "Origin"]
      cookies {
        forward = "all"
      }
    }

    viewer_protocol_policy = "https-only"
    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
    # Use this for custom domain:
    # acm_certificate_arn      = aws_acm_certificate.main.arn
    # ssl_support_method       = "sni-only"
    # minimum_protocol_version = "TLSv1.2_2021"
  }

  tags = {
    Name = "\${var.project_name}-cdn"
  }
}

output "cloudfront_domain" {
  description = "CloudFront distribution domain"
  value       = aws_cloudfront_distribution.main.domain_name
}

output "s3_bucket_name" {
  description = "S3 bucket name for static assets"
  value       = aws_s3_bucket.static.bucket
}`,
            },
          ],
        },
      ],
    },

    // ============ PHASE 7: MONITORING ============
    {
      id: "phase-7",
      title: "Monitoring & Alerts",
      description: "Set up CloudWatch dashboards and alerts.",
      estimatedTime: "45 minutes",
      tasks: [
        {
          id: "task-7-1",
          title: "Create CloudWatch Dashboard",
          description: "Build a monitoring dashboard for your application.",
          instructions: [
            "Create CloudWatch dashboard",
            "Add key metrics (CPU, memory, request count)",
            "Create alarms for critical thresholds",
            "Set up SNS topic for notifications",
          ],
          codeSnippets: [
            {
              language: "hcl",
              filename: "terraform/monitoring.tf",
              code: `# SNS Topic for Alerts
resource "aws_sns_topic" "alerts" {
  name = "\${var.project_name}-alerts"
}

resource "aws_sns_topic_subscription" "email" {
  topic_arn = aws_sns_topic.alerts.arn
  protocol  = "email"
  endpoint  = var.alert_email
}

# High CPU Alarm
resource "aws_cloudwatch_metric_alarm" "cpu_high" {
  alarm_name          = "\${var.project_name}-cpu-high"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "CPUUtilization"
  namespace           = "AWS/ECS"
  period              = 300
  statistic           = "Average"
  threshold           = 80
  alarm_description   = "CPU utilization is too high"
  alarm_actions       = [aws_sns_topic.alerts.arn]
  ok_actions          = [aws_sns_topic.alerts.arn]

  dimensions = {
    ClusterName = aws_ecs_cluster.main.name
    ServiceName = aws_ecs_service.app.name
  }
}

# High Memory Alarm
resource "aws_cloudwatch_metric_alarm" "memory_high" {
  alarm_name          = "\${var.project_name}-memory-high"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "MemoryUtilization"
  namespace           = "AWS/ECS"
  period              = 300
  statistic           = "Average"
  threshold           = 80
  alarm_description   = "Memory utilization is too high"
  alarm_actions       = [aws_sns_topic.alerts.arn]

  dimensions = {
    ClusterName = aws_ecs_cluster.main.name
    ServiceName = aws_ecs_service.app.name
  }
}

# ALB 5XX Error Alarm
resource "aws_cloudwatch_metric_alarm" "alb_5xx" {
  alarm_name          = "\${var.project_name}-alb-5xx"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "HTTPCode_Target_5XX_Count"
  namespace           = "AWS/ApplicationELB"
  period              = 300
  statistic           = "Sum"
  threshold           = 10
  alarm_description   = "Too many 5XX errors"
  alarm_actions       = [aws_sns_topic.alerts.arn]

  dimensions = {
    LoadBalancer = aws_lb.main.arn_suffix
  }
}

# CloudWatch Dashboard
resource "aws_cloudwatch_dashboard" "main" {
  dashboard_name = "\${var.project_name}-dashboard"

  dashboard_body = jsonencode({
    widgets = [
      {
        type   = "metric"
        x      = 0
        y      = 0
        width  = 12
        height = 6
        properties = {
          title  = "ECS CPU Utilization"
          region = var.aws_region
          metrics = [
            ["AWS/ECS", "CPUUtilization", "ClusterName", aws_ecs_cluster.main.name, "ServiceName", aws_ecs_service.app.name]
          ]
        }
      },
      {
        type   = "metric"
        x      = 12
        y      = 0
        width  = 12
        height = 6
        properties = {
          title  = "ECS Memory Utilization"
          region = var.aws_region
          metrics = [
            ["AWS/ECS", "MemoryUtilization", "ClusterName", aws_ecs_cluster.main.name, "ServiceName", aws_ecs_service.app.name]
          ]
        }
      },
      {
        type   = "metric"
        x      = 0
        y      = 6
        width  = 12
        height = 6
        properties = {
          title  = "ALB Request Count"
          region = var.aws_region
          metrics = [
            ["AWS/ApplicationELB", "RequestCount", "LoadBalancer", aws_lb.main.arn_suffix]
          ]
        }
      },
      {
        type   = "metric"
        x      = 12
        y      = 6
        width  = 12
        height = 6
        properties = {
          title  = "ALB Response Time"
          region = var.aws_region
          metrics = [
            ["AWS/ApplicationELB", "TargetResponseTime", "LoadBalancer", aws_lb.main.arn_suffix]
          ]
        }
      }
    ]
  })
}`,
            },
          ],
        },
      ],
    },
  ],
  bonusChallenges: [
    "Add WAF (Web Application Firewall) to the ALB",
    "Implement blue-green deployments with CodeDeploy",
    "Set up AWS Backup for RDS automated backups",
    "Add Redis ElastiCache for session storage",
    "Implement CI/CD pipeline to deploy on push",
    "Add custom domain with Route 53 and ACM",
    "Set up VPN or bastion host for secure access",
    "Implement centralized logging with CloudWatch Logs Insights",
  ],
  submissionChecklist: [
    "Complete Terraform code that passes terraform validate",
    "VPC with public and private subnets in 2 AZs",
    "RDS PostgreSQL instance in private subnet",
    "ECS Fargate service running the application",
    "Application Load Balancer with HTTPS",
    "Auto-scaling configured for ECS service",
    "S3 bucket for static assets",
    "CloudFront distribution (optional but recommended)",
    "CloudWatch dashboard with key metrics",
    "Alarms configured for critical thresholds",
    "README.md with deployment instructions",
    "Architecture diagram",
    "Cost estimate document",
    "Working public URL",
  ],
}
