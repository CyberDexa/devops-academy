// Project 6: Production-Grade Kubernetes Platform
// Build an enterprise-ready Kubernetes platform with full observability

import { ProjectGuide } from "../project-guides"

export const project6Guide: ProjectGuide = {
  projectId: "project-6",
  title: "Production-Grade Kubernetes Platform",
  overview: `Build an enterprise-ready Kubernetes platform that serves as the foundation for running 
production workloads. You'll create a multi-AZ cluster on AWS EKS with GitOps, comprehensive observability, 
security hardening, and disaster recovery procedures. This project teaches you how to build and operate 
Kubernetes platforms that real companies use in production.`,
  difficulty: "advanced",
  totalTime: "20-25 hours",
  prerequisites: [
    "Completed Projects 1-4",
    "Strong Kubernetes fundamentals",
    "Terraform/IaC experience",
    "AWS account with appropriate permissions",
    "Understanding of networking and security",
  ],
  techStack: [
    "AWS EKS (or GKE/AKS)",
    "Terraform",
    "ArgoCD (GitOps)",
    "Prometheus + Grafana + Loki",
    "Cert-Manager",
    "External-DNS",
    "Velero (Backup)",
    "Kyverno/OPA (Policy)",
    "Trivy (Security Scanning)",
  ],
  architecture: `
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                      Production Kubernetes Platform Architecture                         │
│                                                                                          │
│   ┌─────────────────────────────────────────────────────────────────────────────────┐   │
│   │                              AWS VPC (Multi-AZ)                                  │   │
│   │                                                                                  │   │
│   │  ┌─────────────────────────────────────────────────────────────────────────┐    │   │
│   │  │                         EKS Control Plane (AWS Managed)                  │    │   │
│   │  └─────────────────────────────────────────────────────────────────────────┘    │   │
│   │                                       │                                          │   │
│   │  ┌────────────────────┬───────────────┼───────────────┬────────────────────┐    │   │
│   │  │     AZ-1           │               │               │     AZ-2           │    │   │
│   │  │  ┌──────────────┐  │  ┌──────────────────────┐     │  ┌──────────────┐  │    │   │
│   │  │  │ Node Group 1 │  │  │ Application Load     │     │  │ Node Group 2 │  │    │   │
│   │  │  │ (Workloads)  │  │  │ Balancer (Ingress)   │     │  │ (Workloads)  │  │    │   │
│   │  │  └──────────────┘  │  └──────────────────────┘     │  └──────────────┘  │    │   │
│   │  │                    │                               │                    │    │   │
│   │  │  ┌──────────────┐  │                               │  ┌──────────────┐  │    │   │
│   │  │  │ Node Group 3 │  │                               │  │ Node Group 4 │  │    │   │
│   │  │  │  (Platform)  │  │                               │  │  (Platform)  │  │    │   │
│   │  │  └──────────────┘  │                               │  └──────────────┘  │    │   │
│   │  └────────────────────┴───────────────────────────────┴────────────────────┘    │   │
│   │                                                                                  │   │
│   │  ┌─────────────────────────────────────────────────────────────────────────┐    │   │
│   │  │                        Platform Components                               │    │   │
│   │  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐        │    │   │
│   │  │  │   ArgoCD    │ │ Prometheus  │ │   Grafana   │ │    Loki     │        │    │   │
│   │  │  │  (GitOps)   │ │  (Metrics)  │ │ (Dashboards)│ │   (Logs)    │        │    │   │
│   │  │  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘        │    │   │
│   │  │                                                                          │    │   │
│   │  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐        │    │   │
│   │  │  │Cert-Manager │ │External-DNS │ │   Velero    │ │  Kyverno    │        │    │   │
│   │  │  │   (TLS)     │ │   (DNS)     │ │  (Backup)   │ │  (Policy)   │        │    │   │
│   │  │  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘        │    │   │
│   │  └─────────────────────────────────────────────────────────────────────────┘    │   │
│   └─────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                          │
│   External Services:  Route 53 (DNS)  │  ACM (Certificates)  │  S3 (Backups)           │
└─────────────────────────────────────────────────────────────────────────────────────────┘
`,
  phases: [
    // ============ PHASE 1: EKS CLUSTER SETUP ============
    {
      id: "phase-1",
      title: "EKS Cluster Infrastructure",
      description: "Create a production-ready EKS cluster using Terraform.",
      estimatedTime: "3 hours",
      tasks: [
        {
          id: "task-1-1",
          title: "Set Up Terraform Structure",
          description: "Create the Terraform project structure for the platform.",
          instructions: [
            "Create project directory structure",
            "Set up Terraform backend configuration",
            "Create variable files for different environments",
            "Initialize Terraform modules",
          ],
          codeSnippets: [
            {
              language: "bash",
              filename: "setup.sh",
              code: `# Create project structure
mkdir -p k8s-platform/{terraform/{modules/{vpc,eks,addons},environments/{dev,staging,prod}},k8s/{base,platform,apps},scripts,docs}

cd k8s-platform

# Create S3 bucket for Terraform state
aws s3 mb s3://your-company-terraform-state-\${AWS_ACCOUNT_ID}

# Create DynamoDB table for state locking
aws dynamodb create-table \\
  --table-name terraform-locks \\
  --attribute-definitions AttributeName=LockID,AttributeType=S \\
  --key-schema AttributeName=LockID,KeyType=HASH \\
  --billing-mode PAY_PER_REQUEST`,
            },
            {
              language: "hcl",
              filename: "terraform/environments/prod/backend.tf",
              code: `terraform {
  backend "s3" {
    bucket         = "your-company-terraform-state"
    key            = "k8s-platform/prod/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}`,
            },
            {
              language: "hcl",
              filename: "terraform/environments/prod/main.tf",
              code: `terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.30"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.24"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.12"
    }
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "k8s-platform"
      Environment = var.environment
      ManagedBy   = "terraform"
      Team        = "platform"
    }
  }
}

# Data source for EKS cluster auth
data "aws_eks_cluster" "cluster" {
  name = module.eks.cluster_name
  depends_on = [module.eks]
}

data "aws_eks_cluster_auth" "cluster" {
  name = module.eks.cluster_name
  depends_on = [module.eks]
}

provider "kubernetes" {
  host                   = data.aws_eks_cluster.cluster.endpoint
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.cluster.certificate_authority[0].data)
  token                  = data.aws_eks_cluster_auth.cluster.token
}

provider "helm" {
  kubernetes {
    host                   = data.aws_eks_cluster.cluster.endpoint
    cluster_ca_certificate = base64decode(data.aws_eks_cluster.cluster.certificate_authority[0].data)
    token                  = data.aws_eks_cluster_auth.cluster.token
  }
}

# VPC Module
module "vpc" {
  source = "../../modules/vpc"

  environment         = var.environment
  vpc_cidr            = var.vpc_cidr
  availability_zones  = var.availability_zones
  cluster_name        = var.cluster_name
}

# EKS Module
module "eks" {
  source = "../../modules/eks"

  environment        = var.environment
  cluster_name       = var.cluster_name
  cluster_version    = var.cluster_version
  vpc_id             = module.vpc.vpc_id
  private_subnet_ids = module.vpc.private_subnet_ids
  
  node_groups = var.node_groups
}

# Platform Addons
module "addons" {
  source = "../../modules/addons"

  cluster_name                = module.eks.cluster_name
  cluster_endpoint            = module.eks.cluster_endpoint
  cluster_certificate         = module.eks.cluster_certificate
  oidc_provider_arn           = module.eks.oidc_provider_arn
  
  enable_argocd               = true
  enable_prometheus           = true
  enable_loki                 = true
  enable_cert_manager         = true
  enable_external_dns         = true
  enable_velero               = true
  enable_kyverno              = true
  
  domain_name                 = var.domain_name
  velero_bucket_name          = var.velero_bucket_name
}`,
            },
          ],
        },
        {
          id: "task-1-2",
          title: "Create VPC Module",
          description: "Build a reusable VPC module for the platform.",
          instructions: [
            "Create VPC with public and private subnets",
            "Configure NAT Gateways for high availability",
            "Add proper tagging for EKS integration",
            "Create VPC Flow Logs for auditing",
          ],
          codeSnippets: [
            {
              language: "hcl",
              filename: "terraform/modules/vpc/main.tf",
              code: `variable "environment" {
  type = string
}

variable "vpc_cidr" {
  type    = string
  default = "10.0.0.0/16"
}

variable "availability_zones" {
  type    = list(string)
  default = ["us-east-1a", "us-east-1b", "us-east-1c"]
}

variable "cluster_name" {
  type = string
}

locals {
  public_subnets  = [for i, az in var.availability_zones : cidrsubnet(var.vpc_cidr, 4, i)]
  private_subnets = [for i, az in var.availability_zones : cidrsubnet(var.vpc_cidr, 4, i + length(var.availability_zones))]
}

# VPC
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "\${var.cluster_name}-vpc"
    "kubernetes.io/cluster/\${var.cluster_name}" = "shared"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  tags   = { Name = "\${var.cluster_name}-igw" }
}

# Public Subnets
resource "aws_subnet" "public" {
  count = length(var.availability_zones)

  vpc_id                  = aws_vpc.main.id
  cidr_block              = local.public_subnets[count.index]
  availability_zone       = var.availability_zones[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name = "\${var.cluster_name}-public-\${count.index + 1}"
    "kubernetes.io/cluster/\${var.cluster_name}" = "shared"
    "kubernetes.io/role/elb" = "1"
  }
}

# Private Subnets
resource "aws_subnet" "private" {
  count = length(var.availability_zones)

  vpc_id            = aws_vpc.main.id
  cidr_block        = local.private_subnets[count.index]
  availability_zone = var.availability_zones[count.index]

  tags = {
    Name = "\${var.cluster_name}-private-\${count.index + 1}"
    "kubernetes.io/cluster/\${var.cluster_name}" = "shared"
    "kubernetes.io/role/internal-elb" = "1"
  }
}

# NAT Gateways (one per AZ for HA)
resource "aws_eip" "nat" {
  count  = length(var.availability_zones)
  domain = "vpc"
  tags   = { Name = "\${var.cluster_name}-nat-eip-\${count.index + 1}" }
}

resource "aws_nat_gateway" "main" {
  count         = length(var.availability_zones)
  allocation_id = aws_eip.nat[count.index].id
  subnet_id     = aws_subnet.public[count.index].id
  tags          = { Name = "\${var.cluster_name}-nat-\${count.index + 1}" }

  depends_on = [aws_internet_gateway.main]
}

# Route Tables
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = { Name = "\${var.cluster_name}-public-rt" }
}

resource "aws_route_table" "private" {
  count  = length(var.availability_zones)
  vpc_id = aws_vpc.main.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.main[count.index].id
  }

  tags = { Name = "\${var.cluster_name}-private-rt-\${count.index + 1}" }
}

# Route Table Associations
resource "aws_route_table_association" "public" {
  count          = length(aws_subnet.public)
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "private" {
  count          = length(aws_subnet.private)
  subnet_id      = aws_subnet.private[count.index].id
  route_table_id = aws_route_table.private[count.index].id
}

# VPC Flow Logs
resource "aws_cloudwatch_log_group" "flow_logs" {
  name              = "/aws/vpc/\${var.cluster_name}-flow-logs"
  retention_in_days = 30
}

resource "aws_iam_role" "flow_logs" {
  name = "\${var.cluster_name}-vpc-flow-logs-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = { Service = "vpc-flow-logs.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy" "flow_logs" {
  name = "flow-logs-policy"
  role = aws_iam_role.flow_logs.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "logs:DescribeLogGroups",
        "logs:DescribeLogStreams"
      ]
      Effect   = "Allow"
      Resource = "*"
    }]
  })
}

resource "aws_flow_log" "main" {
  iam_role_arn    = aws_iam_role.flow_logs.arn
  log_destination = aws_cloudwatch_log_group.flow_logs.arn
  traffic_type    = "ALL"
  vpc_id          = aws_vpc.main.id
}

# Outputs
output "vpc_id" {
  value = aws_vpc.main.id
}

output "public_subnet_ids" {
  value = aws_subnet.public[*].id
}

output "private_subnet_ids" {
  value = aws_subnet.private[*].id
}`,
            },
          ],
        },
        {
          id: "task-1-3",
          title: "Create EKS Module",
          description: "Build the EKS cluster with managed node groups.",
          instructions: [
            "Create EKS cluster with proper IAM roles",
            "Configure managed node groups",
            "Enable OIDC provider for IRSA",
            "Set up cluster add-ons (CoreDNS, kube-proxy, vpc-cni)",
          ],
          codeSnippets: [
            {
              language: "hcl",
              filename: "terraform/modules/eks/main.tf",
              code: `variable "environment" { type = string }
variable "cluster_name" { type = string }
variable "cluster_version" { type = string; default = "1.28" }
variable "vpc_id" { type = string }
variable "private_subnet_ids" { type = list(string) }
variable "node_groups" {
  type = map(object({
    instance_types = list(string)
    capacity_type  = string
    scaling_config = object({
      desired_size = number
      min_size     = number
      max_size     = number
    })
    labels = map(string)
    taints = list(object({
      key    = string
      value  = string
      effect = string
    }))
  }))
}

# EKS Cluster IAM Role
resource "aws_iam_role" "cluster" {
  name = "\${var.cluster_name}-cluster-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = { Service = "eks.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "cluster_policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
  role       = aws_iam_role.cluster.name
}

# EKS Cluster
resource "aws_eks_cluster" "main" {
  name     = var.cluster_name
  version  = var.cluster_version
  role_arn = aws_iam_role.cluster.arn

  vpc_config {
    subnet_ids              = var.private_subnet_ids
    endpoint_private_access = true
    endpoint_public_access  = true
    public_access_cidrs     = ["0.0.0.0/0"]  # Restrict in production
  }

  enabled_cluster_log_types = [
    "api",
    "audit",
    "authenticator",
    "controllerManager",
    "scheduler"
  ]

  depends_on = [aws_iam_role_policy_attachment.cluster_policy]

  tags = {
    Name = var.cluster_name
  }
}

# OIDC Provider for IRSA
data "tls_certificate" "cluster" {
  url = aws_eks_cluster.main.identity[0].oidc[0].issuer
}

resource "aws_iam_openid_connect_provider" "cluster" {
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = [data.tls_certificate.cluster.certificates[0].sha1_fingerprint]
  url             = aws_eks_cluster.main.identity[0].oidc[0].issuer
}

# Node Group IAM Role
resource "aws_iam_role" "node_group" {
  name = "\${var.cluster_name}-node-group-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = { Service = "ec2.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "node_group_policies" {
  for_each = toset([
    "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy",
    "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy",
    "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly",
    "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
  ])

  policy_arn = each.value
  role       = aws_iam_role.node_group.name
}

# Managed Node Groups
resource "aws_eks_node_group" "main" {
  for_each = var.node_groups

  cluster_name    = aws_eks_cluster.main.name
  node_group_name = each.key
  node_role_arn   = aws_iam_role.node_group.arn
  subnet_ids      = var.private_subnet_ids

  instance_types = each.value.instance_types
  capacity_type  = each.value.capacity_type

  scaling_config {
    desired_size = each.value.scaling_config.desired_size
    min_size     = each.value.scaling_config.min_size
    max_size     = each.value.scaling_config.max_size
  }

  labels = each.value.labels

  dynamic "taint" {
    for_each = each.value.taints
    content {
      key    = taint.value.key
      value  = taint.value.value
      effect = taint.value.effect
    }
  }

  update_config {
    max_unavailable_percentage = 25
  }

  depends_on = [aws_iam_role_policy_attachment.node_group_policies]

  tags = {
    Name = "\${var.cluster_name}-\${each.key}"
  }
}

# EKS Add-ons
resource "aws_eks_addon" "coredns" {
  cluster_name      = aws_eks_cluster.main.name
  addon_name        = "coredns"
  resolve_conflicts_on_update = "OVERWRITE"
  depends_on        = [aws_eks_node_group.main]
}

resource "aws_eks_addon" "kube_proxy" {
  cluster_name      = aws_eks_cluster.main.name
  addon_name        = "kube-proxy"
  resolve_conflicts_on_update = "OVERWRITE"
}

resource "aws_eks_addon" "vpc_cni" {
  cluster_name      = aws_eks_cluster.main.name
  addon_name        = "vpc-cni"
  resolve_conflicts_on_update = "OVERWRITE"
}

# Outputs
output "cluster_name" {
  value = aws_eks_cluster.main.name
}

output "cluster_endpoint" {
  value = aws_eks_cluster.main.endpoint
}

output "cluster_certificate" {
  value = aws_eks_cluster.main.certificate_authority[0].data
}

output "oidc_provider_arn" {
  value = aws_iam_openid_connect_provider.cluster.arn
}`,
            },
          ],
        },
      ],
    },

    // ============ PHASE 2: PLATFORM ADDONS ============
    {
      id: "phase-2",
      title: "Platform Add-ons Installation",
      description: "Install essential platform components using Helm.",
      estimatedTime: "3 hours",
      tasks: [
        {
          id: "task-2-1",
          title: "Install AWS Load Balancer Controller",
          description: "Deploy ALB controller for Kubernetes ingress.",
          instructions: [
            "Create IRSA role for the controller",
            "Install using Helm",
            "Verify installation",
          ],
          codeSnippets: [
            {
              language: "hcl",
              filename: "terraform/modules/addons/alb-controller.tf",
              code: `# IAM Role for ALB Controller
module "alb_controller_irsa" {
  source  = "terraform-aws-modules/iam/aws//modules/iam-role-for-service-accounts-eks"
  version = "5.30.0"

  role_name = "\${var.cluster_name}-alb-controller"

  attach_load_balancer_controller_policy = true

  oidc_providers = {
    main = {
      provider_arn               = var.oidc_provider_arn
      namespace_service_accounts = ["kube-system:aws-load-balancer-controller"]
    }
  }
}

# Helm Release
resource "helm_release" "alb_controller" {
  name       = "aws-load-balancer-controller"
  repository = "https://aws.github.io/eks-charts"
  chart      = "aws-load-balancer-controller"
  version    = "1.6.2"
  namespace  = "kube-system"

  set {
    name  = "clusterName"
    value = var.cluster_name
  }

  set {
    name  = "serviceAccount.create"
    value = "true"
  }

  set {
    name  = "serviceAccount.annotations.eks\\.amazonaws\\.com/role-arn"
    value = module.alb_controller_irsa.iam_role_arn
  }

  set {
    name  = "region"
    value = data.aws_region.current.name
  }

  set {
    name  = "vpcId"
    value = var.vpc_id
  }
}`,
            },
          ],
        },
        {
          id: "task-2-2",
          title: "Install Prometheus Stack",
          description: "Deploy comprehensive monitoring with Prometheus and Grafana.",
          instructions: [
            "Install kube-prometheus-stack",
            "Configure persistent storage",
            "Set up alerting rules",
            "Import dashboards",
          ],
          codeSnippets: [
            {
              language: "hcl",
              filename: "terraform/modules/addons/prometheus.tf",
              code: `resource "helm_release" "prometheus" {
  count = var.enable_prometheus ? 1 : 0

  name       = "prometheus"
  repository = "https://prometheus-community.github.io/helm-charts"
  chart      = "kube-prometheus-stack"
  version    = "55.0.0"
  namespace  = "observability"
  create_namespace = true

  values = [<<-YAML
    prometheus:
      prometheusSpec:
        retention: 15d
        retentionSize: 50GB
        resources:
          requests:
            cpu: 500m
            memory: 2Gi
          limits:
            cpu: 2
            memory: 8Gi
        storageSpec:
          volumeClaimTemplate:
            spec:
              storageClassName: gp3
              accessModes: ["ReadWriteOnce"]
              resources:
                requests:
                  storage: 100Gi
        serviceMonitorSelectorNilUsesHelmValues: false
        podMonitorSelectorNilUsesHelmValues: false
        ruleSelectorNilUsesHelmValues: false

    alertmanager:
      alertmanagerSpec:
        storage:
          volumeClaimTemplate:
            spec:
              storageClassName: gp3
              accessModes: ["ReadWriteOnce"]
              resources:
                requests:
                  storage: 10Gi

    grafana:
      adminPassword: "\${var.grafana_admin_password}"
      persistence:
        enabled: true
        storageClassName: gp3
        size: 10Gi
      ingress:
        enabled: true
        ingressClassName: alb
        annotations:
          alb.ingress.kubernetes.io/scheme: internet-facing
          alb.ingress.kubernetes.io/target-type: ip
          alb.ingress.kubernetes.io/certificate-arn: "\${var.acm_certificate_arn}"
          alb.ingress.kubernetes.io/listen-ports: '[{"HTTPS":443}]'
        hosts:
          - grafana.\${var.domain_name}
      dashboardProviders:
        dashboardproviders.yaml:
          apiVersion: 1
          providers:
            - name: 'default'
              folder: ''
              type: file
              disableDeletion: false
              editable: true
              options:
                path: /var/lib/grafana/dashboards/default
      dashboards:
        default:
          kubernetes-cluster:
            gnetId: 7249
            revision: 1
            datasource: Prometheus
          node-exporter:
            gnetId: 1860
            revision: 27
            datasource: Prometheus
  YAML
  ]
}`,
            },
          ],
        },
        {
          id: "task-2-3",
          title: "Install Loki for Log Aggregation",
          description: "Set up centralized logging with Loki and Promtail.",
          instructions: [
            "Install Loki with S3 backend",
            "Deploy Promtail as DaemonSet",
            "Configure Grafana data source",
            "Create log dashboards",
          ],
          codeSnippets: [
            {
              language: "hcl",
              filename: "terraform/modules/addons/loki.tf",
              code: `# S3 Bucket for Loki
resource "aws_s3_bucket" "loki" {
  count  = var.enable_loki ? 1 : 0
  bucket = "\${var.cluster_name}-loki-\${data.aws_caller_identity.current.account_id}"
}

resource "aws_s3_bucket_lifecycle_configuration" "loki" {
  count  = var.enable_loki ? 1 : 0
  bucket = aws_s3_bucket.loki[0].id

  rule {
    id     = "expire-old-logs"
    status = "Enabled"

    expiration {
      days = 30
    }
  }
}

# IRSA for Loki
module "loki_irsa" {
  count   = var.enable_loki ? 1 : 0
  source  = "terraform-aws-modules/iam/aws//modules/iam-role-for-service-accounts-eks"
  version = "5.30.0"

  role_name = "\${var.cluster_name}-loki"

  role_policy_arns = {
    policy = aws_iam_policy.loki[0].arn
  }

  oidc_providers = {
    main = {
      provider_arn               = var.oidc_provider_arn
      namespace_service_accounts = ["observability:loki"]
    }
  }
}

resource "aws_iam_policy" "loki" {
  count = var.enable_loki ? 1 : 0
  name  = "\${var.cluster_name}-loki-s3"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "s3:ListBucket",
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ]
      Resource = [
        aws_s3_bucket.loki[0].arn,
        "\${aws_s3_bucket.loki[0].arn}/*"
      ]
    }]
  })
}

# Helm Release
resource "helm_release" "loki" {
  count = var.enable_loki ? 1 : 0

  name       = "loki"
  repository = "https://grafana.github.io/helm-charts"
  chart      = "loki-stack"
  version    = "2.9.11"
  namespace  = "observability"

  values = [<<-YAML
    loki:
      serviceAccount:
        annotations:
          eks.amazonaws.com/role-arn: \${module.loki_irsa[0].iam_role_arn}
      config:
        schema_config:
          configs:
            - from: 2024-01-01
              store: boltdb-shipper
              object_store: s3
              schema: v12
              index:
                prefix: loki_index_
                period: 24h
        storage_config:
          boltdb_shipper:
            active_index_directory: /data/loki/index
            cache_location: /data/loki/cache
            shared_store: s3
          aws:
            s3: s3://\${aws_s3_bucket.loki[0].bucket}
            region: \${data.aws_region.current.name}
    promtail:
      enabled: true
    grafana:
      enabled: false  # Using existing Grafana
  YAML
  ]
}`,
            },
          ],
        },
        {
          id: "task-2-4",
          title: "Install ArgoCD for GitOps",
          description: "Deploy ArgoCD and configure applications.",
          instructions: [
            "Install ArgoCD with Helm",
            "Configure SSO with OIDC",
            "Create ApplicationSet for environments",
            "Set up repository credentials",
          ],
          codeSnippets: [
            {
              language: "hcl",
              filename: "terraform/modules/addons/argocd.tf",
              code: `resource "helm_release" "argocd" {
  count = var.enable_argocd ? 1 : 0

  name       = "argocd"
  repository = "https://argoproj.github.io/argo-helm"
  chart      = "argo-cd"
  version    = "5.51.4"
  namespace  = "argocd"
  create_namespace = true

  values = [<<-YAML
    global:
      domain: argocd.\${var.domain_name}

    server:
      ingress:
        enabled: true
        ingressClassName: alb
        annotations:
          alb.ingress.kubernetes.io/scheme: internet-facing
          alb.ingress.kubernetes.io/target-type: ip
          alb.ingress.kubernetes.io/certificate-arn: "\${var.acm_certificate_arn}"
          alb.ingress.kubernetes.io/listen-ports: '[{"HTTPS":443}]'
          alb.ingress.kubernetes.io/backend-protocol: HTTPS
        hosts:
          - argocd.\${var.domain_name}
      
      config:
        url: https://argocd.\${var.domain_name}
        application.resourceTrackingMethod: annotation

    configs:
      repositories:
        private-repo:
          url: \${var.git_repo_url}
          sshPrivateKeySecret:
            name: repo-credentials
            key: sshPrivateKey

    applicationSet:
      enabled: true

    notifications:
      enabled: true
  YAML
  ]
}`,
            },
            {
              language: "yaml",
              filename: "k8s/platform/argocd/applicationset.yaml",
              code: `apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: platform-apps
  namespace: argocd
spec:
  generators:
    - git:
        repoURL: https://github.com/your-org/k8s-platform.git
        revision: HEAD
        directories:
          - path: k8s/apps/*
  template:
    metadata:
      name: '{{path.basename}}'
    spec:
      project: default
      source:
        repoURL: https://github.com/your-org/k8s-platform.git
        targetRevision: HEAD
        path: '{{path}}'
      destination:
        server: https://kubernetes.default.svc
        namespace: '{{path.basename}}'
      syncPolicy:
        automated:
          prune: true
          selfHeal: true
        syncOptions:
          - CreateNamespace=true`,
            },
          ],
        },
      ],
    },

    // ============ PHASE 3: SECURITY HARDENING ============
    {
      id: "phase-3",
      title: "Security Hardening",
      description: "Implement security best practices with policies and scanning.",
      estimatedTime: "2.5 hours",
      tasks: [
        {
          id: "task-3-1",
          title: "Install and Configure Kyverno",
          description: "Deploy Kyverno for policy enforcement.",
          instructions: [
            "Install Kyverno with Helm",
            "Create Pod Security policies",
            "Add image verification policies",
            "Configure audit logging",
          ],
          codeSnippets: [
            {
              language: "yaml",
              filename: "k8s/platform/kyverno/policies/require-labels.yaml",
              code: `apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: require-labels
  annotations:
    policies.kyverno.io/title: Require Labels
    policies.kyverno.io/category: Best Practices
    policies.kyverno.io/severity: medium
spec:
  validationFailureAction: Enforce
  background: true
  rules:
    - name: check-for-labels
      match:
        any:
          - resources:
              kinds:
                - Deployment
                - StatefulSet
      validate:
        message: "The labels 'app', 'owner', and 'environment' are required."
        pattern:
          metadata:
            labels:
              app: "?*"
              owner: "?*"
              environment: "?*"`,
            },
            {
              language: "yaml",
              filename: "k8s/platform/kyverno/policies/disallow-privileged.yaml",
              code: `apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: disallow-privileged-containers
  annotations:
    policies.kyverno.io/title: Disallow Privileged Containers
    policies.kyverno.io/category: Pod Security Standards
    policies.kyverno.io/severity: high
spec:
  validationFailureAction: Enforce
  background: true
  rules:
    - name: disallow-privileged
      match:
        any:
          - resources:
              kinds:
                - Pod
      validate:
        message: "Privileged mode is disallowed. Set securityContext.privileged to false."
        pattern:
          spec:
            containers:
              - securityContext:
                  privileged: "false"
    - name: require-run-as-non-root
      match:
        any:
          - resources:
              kinds:
                - Pod
      validate:
        message: "Running as root is not allowed. Set runAsNonRoot to true."
        pattern:
          spec:
            securityContext:
              runAsNonRoot: true
            containers:
              - securityContext:
                  runAsNonRoot: true`,
            },
            {
              language: "yaml",
              filename: "k8s/platform/kyverno/policies/require-resource-limits.yaml",
              code: `apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: require-resource-limits
  annotations:
    policies.kyverno.io/title: Require Resource Limits
    policies.kyverno.io/category: Best Practices
    policies.kyverno.io/severity: medium
spec:
  validationFailureAction: Enforce
  background: true
  rules:
    - name: validate-resources
      match:
        any:
          - resources:
              kinds:
                - Pod
      validate:
        message: "CPU and memory resource limits are required."
        pattern:
          spec:
            containers:
              - resources:
                  limits:
                    memory: "?*"
                    cpu: "?*"
                  requests:
                    memory: "?*"
                    cpu: "?*"`,
            },
          ],
        },
        {
          id: "task-3-2",
          title: "Set Up Network Policies",
          description: "Implement network segmentation with Kubernetes Network Policies.",
          instructions: [
            "Create default deny policies",
            "Allow required traffic between services",
            "Configure egress rules",
            "Test network isolation",
          ],
          codeSnippets: [
            {
              language: "yaml",
              filename: "k8s/platform/network-policies/default-deny.yaml",
              code: `# Default deny all ingress and egress
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
  namespace: ecommerce
spec:
  podSelector: {}
  policyTypes:
    - Ingress
    - Egress
---
# Allow DNS resolution
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-dns
  namespace: ecommerce
spec:
  podSelector: {}
  policyTypes:
    - Egress
  egress:
    - to:
        - namespaceSelector:
            matchLabels:
              kubernetes.io/metadata.name: kube-system
      ports:
        - protocol: UDP
          port: 53
        - protocol: TCP
          port: 53`,
            },
            {
              language: "yaml",
              filename: "k8s/platform/network-policies/allow-ingress.yaml",
              code: `# Allow ingress from ingress controller
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-from-ingress
  namespace: ecommerce
spec:
  podSelector:
    matchLabels:
      expose: "true"
  policyTypes:
    - Ingress
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              kubernetes.io/metadata.name: ingress-nginx
      ports:
        - protocol: TCP
          port: 8080`,
            },
          ],
        },
      ],
    },

    // ============ PHASE 4: BACKUP & DR ============
    {
      id: "phase-4",
      title: "Backup and Disaster Recovery",
      description: "Set up Velero for backup and disaster recovery procedures.",
      estimatedTime: "2 hours",
      tasks: [
        {
          id: "task-4-1",
          title: "Install and Configure Velero",
          description: "Deploy Velero for cluster backup.",
          instructions: [
            "Create S3 bucket for backups",
            "Install Velero with AWS plugin",
            "Create backup schedules",
            "Test backup and restore",
          ],
          codeSnippets: [
            {
              language: "bash",
              filename: "scripts/install-velero.sh",
              code: `# Install Velero CLI
brew install velero

# Create S3 bucket for backups
BUCKET=\${CLUSTER_NAME}-velero-backups
aws s3 mb s3://\$BUCKET --region us-east-1

# Install Velero
velero install \\
  --provider aws \\
  --plugins velero/velero-plugin-for-aws:v1.8.0 \\
  --bucket \$BUCKET \\
  --backup-location-config region=us-east-1 \\
  --snapshot-location-config region=us-east-1 \\
  --use-node-agent \\
  --use-volume-snapshots=true

# Wait for Velero to be ready
kubectl wait --for=condition=ready pod -l component=velero -n velero --timeout=300s`,
            },
            {
              language: "yaml",
              filename: "k8s/platform/velero/backup-schedule.yaml",
              code: `# Daily full backup
apiVersion: velero.io/v1
kind: Schedule
metadata:
  name: daily-full-backup
  namespace: velero
spec:
  schedule: "0 2 * * *"  # 2 AM daily
  template:
    includedNamespaces:
      - ecommerce
      - observability
    excludedResources:
      - events
      - events.events.k8s.io
    storageLocation: default
    volumeSnapshotLocations:
      - default
    ttl: 720h  # 30 days retention
    snapshotVolumes: true
---
# Hourly config backup
apiVersion: velero.io/v1
kind: Schedule
metadata:
  name: hourly-config-backup
  namespace: velero
spec:
  schedule: "0 * * * *"  # Every hour
  template:
    includedNamespaces:
      - ecommerce
    includedResources:
      - configmaps
      - secrets
      - deployments
      - services
      - ingresses
    storageLocation: default
    ttl: 168h  # 7 days retention
    snapshotVolumes: false`,
            },
            {
              language: "bash",
              filename: "scripts/dr-test.sh",
              code: `#!/bin/bash
# Disaster Recovery Test Script

set -e

echo "🔄 Starting DR Test..."

# Create test namespace
kubectl create namespace dr-test

# Deploy test application
kubectl apply -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: dr-test-app
  namespace: dr-test
spec:
  replicas: 2
  selector:
    matchLabels:
      app: dr-test
  template:
    metadata:
      labels:
        app: dr-test
    spec:
      containers:
        - name: nginx
          image: nginx:alpine
          ports:
            - containerPort: 80
EOF

# Wait for deployment
kubectl wait --for=condition=available deployment/dr-test-app -n dr-test --timeout=120s

# Create backup
echo "📦 Creating backup..."
velero backup create dr-test-backup --include-namespaces dr-test --wait

# Delete namespace
echo "🗑️ Deleting namespace..."
kubectl delete namespace dr-test --wait=true

# Restore from backup
echo "♻️ Restoring from backup..."
velero restore create dr-test-restore --from-backup dr-test-backup --wait

# Verify restore
echo "✅ Verifying restore..."
kubectl wait --for=condition=available deployment/dr-test-app -n dr-test --timeout=120s

# Cleanup
kubectl delete namespace dr-test
velero backup delete dr-test-backup --confirm

echo "✅ DR Test Complete!"`,
            },
          ],
        },
      ],
    },

    // ============ PHASE 5: DOCUMENTATION & RUNBOOKS ============
    {
      id: "phase-5",
      title: "Documentation and Runbooks",
      description: "Create operational documentation and incident response runbooks.",
      estimatedTime: "2 hours",
      tasks: [
        {
          id: "task-5-1",
          title: "Create Runbooks",
          description: "Document common operational procedures.",
          instructions: [
            "Create deployment runbook",
            "Document scaling procedures",
            "Write incident response guide",
            "Create disaster recovery playbook",
          ],
          codeSnippets: [
            {
              language: "markdown",
              filename: "docs/runbooks/incident-response.md",
              code: `# Incident Response Runbook

## Severity Levels

| Level | Description | Response Time | Examples |
|-------|-------------|---------------|----------|
| P1 | Critical - Service down | 15 min | Complete outage, data loss |
| P2 | High - Major degradation | 30 min | Partial outage, slow responses |
| P3 | Medium - Minor impact | 2 hours | Single component issues |
| P4 | Low - Minimal impact | 24 hours | Non-critical bugs |

## Initial Response

### 1. Acknowledge and Assess
\`\`\`bash
# Check cluster health
kubectl get nodes
kubectl get pods -A | grep -v Running

# Check recent events
kubectl get events -A --sort-by='.lastTimestamp' | tail -20

# Check metrics
kubectl top nodes
kubectl top pods -A
\`\`\`

### 2. Identify Impact
\`\`\`bash
# Check service endpoints
kubectl get endpoints -n ecommerce

# Check ingress status
kubectl describe ingress -n ecommerce

# Check logs
kubectl logs -l app=<service> -n ecommerce --tail=100
\`\`\`

### 3. Mitigation

#### Rollback Deployment
\`\`\`bash
kubectl rollout undo deployment/<name> -n <namespace>
kubectl rollout status deployment/<name> -n <namespace>
\`\`\`

#### Scale Up
\`\`\`bash
kubectl scale deployment/<name> --replicas=<count> -n <namespace>
\`\`\`

#### Restart Pods
\`\`\`bash
kubectl rollout restart deployment/<name> -n <namespace>
\`\`\`

## Post-Incident

1. Document timeline
2. Identify root cause
3. Create action items
4. Schedule post-mortem
5. Update runbooks if needed`,
            },
          ],
        },
      ],
    },
  ],
  bonusChallenges: [
    "Implement multi-cluster federation with Liqo or Submariner",
    "Add Falco for runtime security monitoring",
    "Set up cost allocation with Kubecost",
    "Implement progressive delivery with Argo Rollouts",
    "Add chaos engineering with Chaos Mesh",
    "Create custom Grafana dashboards for SLOs",
    "Implement GitOps for infrastructure (Crossplane)",
    "Add service mesh with Istio",
  ],
  submissionChecklist: [
    "Complete Terraform code for EKS cluster",
    "Multi-AZ cluster with managed node groups",
    "VPC with proper networking and flow logs",
    "ArgoCD managing all deployments",
    "Prometheus + Grafana with dashboards",
    "Loki for centralized logging",
    "Velero with backup schedules",
    "Kyverno policies enforced",
    "Network policies implemented",
    "SSL/TLS on all ingresses",
    "Runbooks documented",
    "DR test completed and documented",
    "Load test results",
    "Security audit report",
    "Architecture diagram",
    "Video walkthrough (20 min)",
  ],
}
