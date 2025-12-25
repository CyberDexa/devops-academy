// Project 11: Capstone - Multi-Cloud DevOps Platform
// Build a comprehensive multi-cloud platform with full DevOps automation

import { ProjectGuide } from "../project-guides"

export const project11Guide: ProjectGuide = {
  projectId: "project-11",
  title: "Capstone: Multi-Cloud DevOps Platform",
  overview: `Build a production-grade, multi-cloud DevOps platform that demonstrates mastery of all DevOps concepts.
This capstone project involves deploying a microservices application across AWS and GCP, implementing infrastructure
as code, GitOps, comprehensive monitoring, security hardening, disaster recovery, and cost optimization. This is the
culmination of your DevOps journey - a portfolio-ready project showcasing enterprise-level skills.`,
  difficulty: "advanced",
  totalTime: "30-35 hours",
  prerequisites: [
    "Completed all previous projects (1-9)",
    "Strong understanding of Kubernetes",
    "Experience with Terraform and GitOps",
    "Cloud platform knowledge (AWS & GCP)",
    "Advanced networking concepts",
    "Security best practices",
  ],
  techStack: [
    "AWS EKS",
    "GCP GKE",
    "Terraform",
    "ArgoCD",
    "Istio Service Mesh",
    "Prometheus & Grafana",
    "Loki & Tempo",
    "Cert-Manager",
    "External DNS",
    "Velero",
    "Kyverno",
    "Vault",
    "GitHub Actions",
    "Datadog / New Relic",
  ],
  architecture: `
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                          Multi-Cloud DevOps Platform Architecture                                         │
│                                                                                                           │
│  ┌────────────────────────────────────┐         ┌────────────────────────────────────┐                   │
│  │           AWS Region               │         │          GCP Region                │                   │
│  │                                    │         │                                    │                   │
│  │  ┌──────────────────────────────┐  │         │  ┌──────────────────────────────┐  │                   │
│  │  │        EKS Cluster           │  │         │  │        GKE Cluster           │  │                   │
│  │  │  ┌────────────────────────┐  │  │         │  │  ┌────────────────────────┐  │  │                   │
│  │  │  │   Control Plane         │  │  │         │  │  │   Control Plane         │  │  │                   │
│  │  │  │   (Managed)             │  │  │         │  │  │   (Managed)             │  │  │                   │
│  │  │  └────────────────────────┘  │  │         │  │  └────────────────────────┘  │  │                   │
│  │  │                               │  │         │  │                               │  │                   │
│  │  │  ┌─────────────────────────────────────────────────────────────────┐         │  │                   │
│  │  │  │              Istio Service Mesh (Multi-Cluster)                 │         │  │                   │
│  │  │  └─────────────────────────────────────────────────────────────────┘         │  │                   │
│  │  │                               │  │         │  │                               │  │                   │
│  │  │  ┌────────────────────────┐  │  │         │  │  ┌────────────────────────┐  │  │                   │
│  │  │  │   Workload Nodes       │  │  │         │  │  │   Workload Nodes       │  │  │                   │
│  │  │  │  ┌──────────────────┐  │  │  │         │  │  │  ┌──────────────────┐  │  │  │                   │
│  │  │  │  │ Frontend Service │  │  │  │         │  │  │  │ Backend Services │  │  │  │                   │
│  │  │  │  │  - Web UI        │  │  │  │         │  │  │  │  - API Gateway   │  │  │  │                   │
│  │  │  │  │  - CDN           │  │  │  │         │  │  │  │  - Auth Service  │  │  │  │                   │
│  │  │  │  └──────────────────┘  │  │  │         │  │  │  │  - Data Service  │  │  │  │                   │
│  │  │  │  ┌──────────────────┐  │  │  │         │  │  │  └──────────────────┘  │  │  │                   │
│  │  │  │  │ Platform Add-ons │  │  │  │         │  │  │  ┌──────────────────┐  │  │  │                   │
│  │  │  │  │  - ArgoCD        │  │  │  │         │  │  │  │ Platform Add-ons │  │  │  │                   │
│  │  │  │  │  - Prometheus    │  │  │  │         │  │  │  │  - Cert-Manager  │  │  │  │                   │
│  │  │  │  │  - Grafana       │  │  │  │         │  │  │  │  - External DNS  │  │  │  │                   │
│  │  │  │  │  - Vault         │  │  │  │         │  │  │  │  - Velero        │  │  │  │                   │
│  │  │  │  └──────────────────┘  │  │  │         │  │  │  └──────────────────┘  │  │  │                   │
│  │  │  └────────────────────────┘  │  │         │  │  └────────────────────────┘  │  │                   │
│  │  └───────────────────────────────┘  │         │  └───────────────────────────────┘  │                   │
│  │                                    │         │                                    │                   │
│  │  ┌──────────────────────────────┐  │         │  ┌──────────────────────────────┐  │                   │
│  │  │    AWS Services              │  │         │  │    GCP Services              │  │                   │
│  │  │  - RDS (PostgreSQL)          │  │         │  │  - Cloud SQL                 │  │                   │
│  │  │  - ElastiCache (Redis)       │  │         │  │  - Memorystore               │  │                   │
│  │  │  - S3                         │  │         │  │  - Cloud Storage             │  │                   │
│  │  │  - CloudWatch                │  │         │  │  - Cloud Logging             │  │                   │
│  │  │  - Route53                   │  │         │  │  - Cloud DNS                 │  │                   │
│  │  └──────────────────────────────┘  │         │  └──────────────────────────────┘  │                   │
│  └────────────────────────────────────┘         └────────────────────────────────────┘                   │
│                                   │                             │                                         │
│                                   └──────────── VPN ────────────┘                                         │
│                                                                                                           │
│  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐    │
│  │                              Centralized Observability                                           │    │
│  │  ┌───────────────┐    ┌───────────────┐    ┌───────────────┐    ┌───────────────────────┐       │    │
│  │  │  Prometheus   │───▶│   Grafana     │    │  Loki + Tempo │    │  Datadog / New Relic  │       │    │
│  │  │  (Metrics)    │    │ (Dashboards)  │    │(Logs + Traces)│    │  (APM & Monitoring)   │       │    │
│  │  └───────────────┘    └───────────────┘    └───────────────┘    └───────────────────────┘       │    │
│  └──────────────────────────────────────────────────────────────────────────────────────────────────┘    │
│                                                                                                           │
│  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐    │
│  │                              GitOps & CI/CD Pipeline                                              │    │
│  │  ┌──────────┐    ┌──────────┐    ┌──────────────┐    ┌────────────┐    ┌──────────────────┐     │    │
│  │  │  GitHub  │───▶│ GitHub   │───▶│   Docker     │───▶│   ArgoCD   │───▶│  Multi-Cluster   │     │    │
│  │  │  (Code)  │    │ Actions  │    │   Registry   │    │  (GitOps)  │    │   Deployment     │     │    │
│  │  └──────────┘    └──────────┘    └──────────────┘    └────────────┘    └──────────────────┘     │    │
│  └──────────────────────────────────────────────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────┘
`,
  phases: [
    // ============ PHASE 1: INFRASTRUCTURE SETUP ============
    {
      id: "phase-1",
      title: "Multi-Cloud Infrastructure Foundation",
      description: "Set up Kubernetes clusters on AWS EKS and GCP GKE using Terraform.",
      estimatedTime: "6 hours",
      tasks: [
        {
          id: "task-1-1",
          title: "Create Terraform Project Structure",
          description: "Set up Terraform workspace with multi-cloud modules.",
          instructions: [
            "Create Terraform directory structure",
            "Configure remote state in S3 with DynamoDB locking",
            "Set up Terraform modules for AWS and GCP",
            "Configure provider authentication",
          ],
          codeSnippets: [
            {
              language: "hcl",
              filename: "terraform/main.tf",
              code: `terraform {
  required_version = ">= 1.6.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
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
  
  backend "s3" {
    bucket         = "capstone-terraform-state"
    key            = "global/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-state-lock"
    encrypt        = true
  }
}

provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = {
      Project     = "capstone-devops-platform"
      ManagedBy   = "terraform"
      Environment = var.environment
    }
  }
}

provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_region
}

# Data sources for authentication
data "aws_eks_cluster" "cluster" {
  name = module.eks.cluster_name
}

data "aws_eks_cluster_auth" "cluster" {
  name = module.eks.cluster_name
}

data "google_client_config" "default" {}

data "google_container_cluster" "gke" {
  name     = module.gke.cluster_name
  location = var.gcp_region
}`,
            },
            {
              language: "hcl",
              filename: "terraform/variables.tf",
              code: `variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "capstone-devops"
}

# AWS Variables
variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "eks_cluster_version" {
  description = "EKS cluster version"
  type        = string
  default     = "1.28"
}

variable "eks_node_instance_types" {
  description = "Instance types for EKS nodes"
  type        = list(string)
  default     = ["t3.large", "t3.xlarge"]
}

variable "eks_desired_capacity" {
  description = "Desired number of nodes"
  type        = number
  default     = 3
}

variable "eks_min_capacity" {
  description = "Minimum number of nodes"
  type        = number
  default     = 2
}

variable "eks_max_capacity" {
  description = "Maximum number of nodes"
  type        = number
  default     = 10
}

# GCP Variables
variable "gcp_project_id" {
  description = "GCP project ID"
  type        = string
}

variable "gcp_region" {
  description = "GCP region"
  type        = string
  default     = "us-central1"
}

variable "gke_cluster_version" {
  description = "GKE cluster version"
  type        = string
  default     = "1.28"
}

variable "gke_node_machine_type" {
  description = "Machine type for GKE nodes"
  type        = string
  default     = "n1-standard-4"
}

variable "gke_node_count" {
  description = "Number of nodes per zone"
  type        = number
  default     = 1
}

variable "gke_min_node_count" {
  description = "Minimum nodes per zone"
  type        = number
  default     = 1
}

variable "gke_max_node_count" {
  description = "Maximum nodes per zone"
  type        = number
  default     = 5
}

# Networking
variable "vpc_cidr_aws" {
  description = "CIDR block for AWS VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "vpc_cidr_gcp" {
  description = "CIDR block for GCP VPC"
  type        = string
  default     = "10.1.0.0/16"
}`,
            },
          ],
        },
        {
          id: "task-1-2",
          title: "Deploy AWS EKS Cluster",
          description: "Create production-ready EKS cluster with Terraform.",
          instructions: [
            "Create VPC and networking resources",
            "Deploy EKS cluster with managed node groups",
            "Configure cluster autoscaler",
            "Set up IAM roles and policies",
          ],
          codeSnippets: [
            {
              language: "hcl",
              filename: "terraform/modules/aws-eks/main.tf",
              code: `# VPC Module
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "\${var.project_name}-\${var.environment}-vpc"
  cidr = var.vpc_cidr

  azs             = data.aws_availability_zones.available.names
  private_subnets = [for k, v in data.aws_availability_zones.available.names : cidrsubnet(var.vpc_cidr, 4, k)]
  public_subnets  = [for k, v in data.aws_availability_zones.available.names : cidrsubnet(var.vpc_cidr, 8, k + 48)]

  enable_nat_gateway   = true
  single_nat_gateway   = false
  enable_dns_hostnames = true
  enable_dns_support   = true

  public_subnet_tags = {
    "kubernetes.io/role/elb" = "1"
    "kubernetes.io/cluster/\${local.cluster_name}" = "shared"
  }

  private_subnet_tags = {
    "kubernetes.io/role/internal-elb" = "1"
    "kubernetes.io/cluster/\${local.cluster_name}" = "shared"
  }
}

# EKS Cluster
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 19.0"

  cluster_name    = local.cluster_name
  cluster_version = var.cluster_version

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  cluster_endpoint_public_access = true
  cluster_endpoint_private_access = true

  cluster_addons = {
    coredns = {
      most_recent = true
    }
    kube-proxy = {
      most_recent = true
    }
    vpc-cni = {
      most_recent = true
    }
    aws-ebs-csi-driver = {
      most_recent = true
    }
  }

  # Managed Node Groups
  eks_managed_node_groups = {
    general = {
      name = "general-purpose"
      
      instance_types = var.node_instance_types
      capacity_type  = "ON_DEMAND"
      
      min_size     = var.min_capacity
      max_size     = var.max_capacity
      desired_size = var.desired_capacity

      labels = {
        workload = "general"
      }

      tags = {
        Name = "general-purpose-node"
      }
    }

    spot = {
      name = "spot-instances"
      
      instance_types = var.node_instance_types
      capacity_type  = "SPOT"
      
      min_size     = 0
      max_size     = 5
      desired_size = 2

      labels = {
        workload = "spot"
      }

      taints = [{
        key    = "spot"
        value  = "true"
        effect = "NoSchedule"
      }]
    }
  }

  # Cluster security group rules
  cluster_security_group_additional_rules = {
    ingress_nodes_ephemeral_ports_tcp = {
      description                = "Nodes on ephemeral ports"
      protocol                   = "tcp"
      from_port                  = 1025
      to_port                    = 65535
      type                       = "ingress"
      source_node_security_group = true
    }
  }

  # Node security group rules
  node_security_group_additional_rules = {
    ingress_self_all = {
      description = "Node to node all ports/protocols"
      protocol    = "-1"
      from_port   = 0
      to_port     = 0
      type        = "ingress"
      self        = true
    }
  }
}

# IRSA for cluster autoscaler
module "cluster_autoscaler_irsa" {
  source  = "terraform-aws-modules/iam/aws//modules/iam-role-for-service-accounts-eks"
  version = "~> 5.0"

  role_name = "\${local.cluster_name}-cluster-autoscaler"

  attach_cluster_autoscaler_policy = true
  cluster_autoscaler_cluster_names = [module.eks.cluster_name]

  oidc_providers = {
    main = {
      provider_arn               = module.eks.oidc_provider_arn
      namespace_service_accounts = ["kube-system:cluster-autoscaler"]
    }
  }
}

locals {
  cluster_name = "\${var.project_name}-\${var.environment}-eks"
}

data "aws_availability_zones" "available" {
  state = "available"
}`,
            },
          ],
        },
        {
          id: "task-1-3",
          title: "Deploy GCP GKE Cluster",
          description: "Create production-ready GKE cluster with Terraform.",
          instructions: [
            "Create VPC and subnetworks",
            "Deploy GKE cluster with node pools",
            "Configure cluster autoscaling",
            "Set up workload identity",
          ],
          codeSnippets: [
            {
              language: "hcl",
              filename: "terraform/modules/gcp-gke/main.tf",
              code: `# VPC Network
resource "google_compute_network" "vpc" {
  name                    = "\${var.project_name}-\${var.environment}-vpc"
  auto_create_subnetworks = false
  routing_mode           = "REGIONAL"
}

resource "google_compute_subnetwork" "subnet" {
  name          = "\${var.project_name}-\${var.environment}-subnet"
  ip_cidr_range = var.subnet_cidr
  region        = var.region
  network       = google_compute_network.vpc.id

  secondary_ip_range {
    range_name    = "pods"
    ip_cidr_range = "10.1.0.0/16"
  }

  secondary_ip_range {
    range_name    = "services"
    ip_cidr_range = "10.2.0.0/16"
  }

  private_ip_google_access = true
}

# Cloud Router for NAT
resource "google_compute_router" "router" {
  name    = "\${var.project_name}-\${var.environment}-router"
  region  = var.region
  network = google_compute_network.vpc.id
}

resource "google_compute_router_nat" "nat" {
  name   = "\${var.project_name}-\${var.environment}-nat"
  router = google_compute_router.router.name
  region = var.region

  nat_ip_allocate_option             = "AUTO_ONLY"
  source_subnetwork_ip_ranges_to_nat = "ALL_SUBNETWORKS_ALL_IP_RANGES"
}

# GKE Cluster
resource "google_container_cluster" "primary" {
  name     = local.cluster_name
  location = var.region

  remove_default_node_pool = true
  initial_node_count       = 1

  network    = google_compute_network.vpc.name
  subnetwork = google_compute_subnetwork.subnet.name

  release_channel {
    channel = "REGULAR"
  }

  # Workload Identity
  workload_identity_config {
    workload_pool = "\${var.project_id}.svc.id.goog"
  }

  # Network configuration
  ip_allocation_policy {
    cluster_secondary_range_name  = "pods"
    services_secondary_range_name = "services"
  }

  network_policy {
    enabled  = true
    provider = "PROVIDER_UNSPECIFIED"
  }

  # Add-ons
  addons_config {
    http_load_balancing {
      disabled = false
    }
    horizontal_pod_autoscaling {
      disabled = false
    }
    network_policy_config {
      disabled = false
    }
  }

  # Security
  master_auth {
    client_certificate_config {
      issue_client_certificate = false
    }
  }

  master_authorized_networks_config {
    cidr_blocks {
      cidr_block   = "0.0.0.0/0"
      display_name = "All"
    }
  }

  # Maintenance window
  maintenance_policy {
    daily_maintenance_window {
      start_time = "03:00"
    }
  }
}

# Primary Node Pool
resource "google_container_node_pool" "primary_nodes" {
  name       = "primary-pool"
  cluster    = google_container_cluster.primary.name
  location   = var.region
  node_count = var.node_count

  autoscaling {
    min_node_count = var.min_node_count
    max_node_count = var.max_node_count
  }

  management {
    auto_repair  = true
    auto_upgrade = true
  }

  node_config {
    machine_type = var.node_machine_type
    disk_size_gb = 100
    disk_type    = "pd-standard"

    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform"
    ]

    labels = {
      environment = var.environment
      workload    = "general"
    }

    tags = ["gke-node", "\${var.project_name}-\${var.environment}"]

    metadata = {
      disable-legacy-endpoints = "true"
    }

    workload_metadata_config {
      mode = "GKE_METADATA"
    }

    shielded_instance_config {
      enable_secure_boot          = true
      enable_integrity_monitoring = true
    }
  }
}

# Spot Instance Node Pool
resource "google_container_node_pool" "spot_nodes" {
  name     = "spot-pool"
  cluster  = google_container_cluster.primary.name
  location = var.region

  autoscaling {
    min_node_count = 0
    max_node_count = 5
  }

  management {
    auto_repair  = true
    auto_upgrade = true
  }

  node_config {
    machine_type = var.node_machine_type
    spot         = true

    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform"
    ]

    labels = {
      workload = "spot"
    }

    taint {
      key    = "spot"
      value  = "true"
      effect = "NO_SCHEDULE"
    }

    workload_metadata_config {
      mode = "GKE_METADATA"
    }
  }
}

locals {
  cluster_name = "\${var.project_name}-\${var.environment}-gke"
}`,
            },
          ],
        },
        {
          id: "task-1-4",
          title: "Configure Multi-Cluster Connectivity",
          description: "Set up VPN or VPC peering between AWS and GCP.",
          instructions: [
            "Create VPN gateway in AWS",
            "Create VPN gateway in GCP",
            "Establish VPN tunnel",
            "Configure routing between clouds",
          ],
          codeSnippets: [
            {
              language: "hcl",
              filename: "terraform/modules/vpn/main.tf",
              code: `# AWS Customer Gateway
resource "aws_customer_gateway" "gcp" {
  bgp_asn    = 65000
  ip_address = google_compute_address.vpn_gateway.address
  type       = "ipsec.1"

  tags = {
    Name = "gcp-vpn-gateway"
  }
}

# AWS VPN Gateway
resource "aws_vpn_gateway" "main" {
  vpc_id = var.aws_vpc_id

  tags = {
    Name = "aws-vpn-gateway"
  }
}

# AWS VPN Connection
resource "aws_vpn_connection" "gcp" {
  vpn_gateway_id      = aws_vpn_gateway.main.id
  customer_gateway_id = aws_customer_gateway.gcp.id
  type                = "ipsec.1"
  static_routes_only  = true

  tags = {
    Name = "aws-gcp-vpn"
  }
}

# GCP VPN Gateway
resource "google_compute_address" "vpn_gateway" {
  name   = "vpn-gateway-ip"
  region = var.gcp_region
}

resource "google_compute_vpn_gateway" "target_gateway" {
  name    = "vpn-gateway"
  network = var.gcp_vpc_id
  region  = var.gcp_region
}

# GCP VPN Tunnels
resource "google_compute_vpn_tunnel" "tunnel1" {
  name          = "vpn-tunnel-1"
  peer_ip       = aws_vpn_connection.gcp.tunnel1_address
  shared_secret = aws_vpn_connection.gcp.tunnel1_preshared_key

  target_vpn_gateway = google_compute_vpn_gateway.target_gateway.id
  local_traffic_selector = ["0.0.0.0/0"]
  remote_traffic_selector = ["0.0.0.0/0"]

  depends_on = [
    google_compute_forwarding_rule.fr_esp,
    google_compute_forwarding_rule.fr_udp500,
    google_compute_forwarding_rule.fr_udp4500,
  ]
}

# Forwarding rules for VPN
resource "google_compute_forwarding_rule" "fr_esp" {
  name        = "fr-esp"
  region      = var.gcp_region
  ip_protocol = "ESP"
  ip_address  = google_compute_address.vpn_gateway.address
  target      = google_compute_vpn_gateway.target_gateway.id
}

resource "google_compute_forwarding_rule" "fr_udp500" {
  name        = "fr-udp500"
  region      = var.gcp_region
  ip_protocol = "UDP"
  port_range  = "500"
  ip_address  = google_compute_address.vpn_gateway.address
  target      = google_compute_vpn_gateway.target_gateway.id
}

resource "google_compute_forwarding_rule" "fr_udp4500" {
  name        = "fr-udp4500"
  region      = var.gcp_region
  ip_protocol = "UDP"
  port_range  = "4500"
  ip_address  = google_compute_address.vpn_gateway.address
  target      = google_compute_vpn_gateway.target_gateway.id
}

# Routes
resource "google_compute_route" "route_to_aws" {
  name                = "route-to-aws"
  network             = var.gcp_vpc_id
  dest_range          = var.aws_vpc_cidr
  priority            = 1000
  next_hop_vpn_tunnel = google_compute_vpn_tunnel.tunnel1.id
}`,
            },
          ],
        },
      ],
    },

    // ============ PHASE 2: GITOPS & CI/CD ============
    {
      id: "phase-2",
      title: "GitOps with ArgoCD",
      description: "Implement GitOps deployment strategy with ArgoCD across both clusters.",
      estimatedTime: "5 hours",
      tasks: [
        {
          id: "task-2-1",
          title: "Deploy ArgoCD",
          description: "Install and configure ArgoCD for multi-cluster management.",
          instructions: [
            "Deploy ArgoCD on EKS cluster",
            "Configure ArgoCD for high availability",
            "Register GKE cluster with ArgoCD",
            "Set up ArgoCD Image Updater",
          ],
          codeSnippets: [
            {
              language: "yaml",
              filename: "k8s/argocd/install.yaml",
              code: `apiVersion: v1
kind: Namespace
metadata:
  name: argocd

---
# Use ArgoCD HA install
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
  - https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/ha/install.yaml

patches:
  - target:
      kind: Deployment
      name: argocd-server
    patch: |-
      - op: add
        path: /spec/template/spec/containers/0/args/-
        value: --insecure

  - target:
      kind: ConfigMap
      name: argocd-cm
    patch: |-
      - op: add
        path: /data
        value:
          timeout.reconciliation: 180s
          application.instanceLabelKey: argocd.argoproj.io/instance`,
            },
            {
              language: "yaml",
              filename: "argocd/clusters/gke-cluster.yaml",
              code: `apiVersion: v1
kind: Secret
metadata:
  name: gke-cluster
  namespace: argocd
  labels:
    argocd.argoproj.io/secret-type: cluster
type: Opaque
stringData:
  name: gke-production
  server: https://gke-cluster-endpoint
  config: |
    {
      "tlsClientConfig": {
        "insecure": false,
        "caData": "<base64-ca-cert>",
        "certData": "<base64-client-cert>",
        "keyData": "<base64-client-key>"
      }
    }`,
            },
          ],
        },
        {
          id: "task-2-2",
          title: "Create Application Repository Structure",
          description: "Set up GitOps repository with proper structure.",
          instructions: [
            "Create GitOps repository",
            "Organize manifests by environment and cluster",
            "Create ApplicationSets for automation",
            "Set up sync waves for dependencies",
          ],
          codeSnippets: [
            {
              language: "yaml",
              filename: "gitops/apps/platform/argocd-appset.yaml",
              code: `apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: platform-apps
  namespace: argocd
spec:
  generators:
    - matrix:
        generators:
          - git:
              repoURL: https://github.com/yourorg/gitops-repo
              revision: HEAD
              directories:
                - path: apps/platform/*
          - list:
              elements:
                - cluster: eks-production
                  server: https://eks-cluster-endpoint
                - cluster: gke-production
                  server: https://gke-cluster-endpoint

  template:
    metadata:
      name: '{{cluster}}-{{path.basename}}'
      labels:
        cluster: '{{cluster}}'
        app: '{{path.basename}}'
    spec:
      project: platform
      source:
        repoURL: https://github.com/yourorg/gitops-repo
        targetRevision: HEAD
        path: '{{path}}'
      destination:
        server: '{{server}}'
        namespace: '{{path.basename}}'
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
            maxDuration: 3m`,
            },
          ],
        },
        {
          id: "task-2-3",
          title: "Implement CI/CD Pipeline",
          description: "Create comprehensive CI/CD pipeline with GitHub Actions.",
          instructions: [
            "Create build and test workflow",
            "Implement security scanning",
            "Build and push Docker images",
            "Update GitOps manifests automatically",
          ],
          codeSnippets: [
            {
              language: "yaml",
              filename: ".github/workflows/ci-cd.yml",
              code: `name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: \${{ github.repository }}

jobs:
  test:
    name: Test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Run linter
        run: npm run lint

  security:
    name: Security Scan
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4

      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
          format: 'sarif'
          output: 'trivy-results.sarif'

      - name: Upload Trivy results
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: 'trivy-results.sarif'

  build-push:
    name: Build and Push
    runs-on: ubuntu-latest
    needs: [test, security]
    if: github.event_name != 'pull_request'
    permissions:
      contents: read
      packages: write
    outputs:
      image-tag: \${{ steps.meta.outputs.tags }}
      image-digest: \${{ steps.build.outputs.digest }}
    steps:
      - uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to Container Registry
        uses: docker/login-action@v3
        with:
          registry: \${{ env.REGISTRY }}
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=sha,prefix={{branch}}-
            type=semver,pattern={{version}}

      - name: Build and push Docker image
        id: build
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: \${{ steps.meta.outputs.tags }}
          labels: \${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  update-gitops:
    name: Update GitOps
    runs-on: ubuntu-latest
    needs: build-push
    steps:
      - name: Checkout GitOps repo
        uses: actions/checkout@v4
        with:
          repository: yourorg/gitops-repo
          token: \${{ secrets.GITOPS_TOKEN }}

      - name: Update image tag
        run: |
          NEW_TAG="$\${{ needs.build-push.outputs.image-tag }}"
          sed -i "s|image: .*|image: $NEW_TAG|" apps/production/deployment.yaml

      - name: Commit and push
        run: |
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add .
          git commit -m "Update image to \${{ needs.build-push.outputs.image-tag }}"
          git push`,
            },
          ],
        },
      ],
    },

    // ============ PHASE 3: SERVICE MESH & NETWORKING ============
    {
      id: "phase-3",
      title: "Istio Service Mesh",
      description: "Deploy Istio service mesh for traffic management and security.",
      estimatedTime: "5 hours",
      tasks: [
        {
          id: "task-3-1",
          title: "Deploy Istio Multi-Cluster",
          description: "Install Istio with multi-cluster configuration.",
          instructions: [
            "Install Istio on both clusters",
            "Configure multi-cluster mesh",
            "Set up cross-cluster service discovery",
            "Configure mesh networking",
          ],
          codeSnippets: [
            {
              language: "bash",
              filename: "scripts/install-istio.sh",
              code: `#!/bin/bash
# Install Istio on multiple clusters

# Install istioctl
curl -L https://istio.io/downloadIstio | sh -
export PATH=$PWD/istio-*/bin:$PATH

# Configure EKS cluster as primary
kubectl config use-context eks-production

# Install Istio on EKS (primary cluster)
istioctl install --set profile=default \\
  --set values.global.meshID=mesh1 \\
  --set values.global.multiCluster.clusterName=eks-production \\
  --set values.global.network=network1 \\
  -y

# Install east-west gateway for cross-cluster traffic
kubectl apply -f - <<EOF
apiVersion: install.istio.io/v1alpha1
kind: IstioOperator
metadata:
  name: eastwest
  namespace: istio-system
spec:
  profile: empty
  components:
    ingressGateways:
      - name: istio-eastwestgateway
        label:
          istio: eastwestgateway
          app: istio-eastwestgateway
          topology.istio.io/network: network1
        enabled: true
        k8s:
          service:
            type: LoadBalancer
            ports:
              - name: status-port
                port: 15021
                targetPort: 15021
              - name: tls
                port: 15443
                targetPort: 15443
              - name: tls-istiod
                port: 15012
                targetPort: 15012
              - name: tls-webhook
                port: 15017
                targetPort: 15017
EOF

# Configure GKE cluster as remote
kubectl config use-context gke-production

# Install Istio on GKE (remote cluster)
istioctl install --set profile=remote \\
  --set values.global.meshID=mesh1 \\
  --set values.global.multiCluster.clusterName=gke-production \\
  --set values.global.network=network2 \\
  --set values.global.remotePilotAddress=\${EKS_ISTIOD_ADDRESS} \\
  -y

echo "✅ Istio multi-cluster mesh installed!"`,
            },
          ],
        },
      ],
    },

    // ============ REMAINING PHASES ============
    {
      id: "phase-4",
      title: "Observability Stack",
      description: "Deploy comprehensive monitoring, logging, and tracing.",
      estimatedTime: "4 hours",
      tasks: [
        {
          id: "task-4-1",
          title: "Deploy Prometheus & Grafana",
          description: "Set up centralized metrics collection and visualization.",
          instructions: [
            "Deploy Prometheus Operator",
            "Configure ServiceMonitors",
            "Deploy Grafana with dashboards",
            "Set up Alertmanager",
          ],
          codeSnippets: [],
        },
      ],
    },

    {
      id: "phase-5",
      title: "Security & Compliance",
      description: "Implement security policies and compliance controls.",
      estimatedTime: "5 hours",
      tasks: [
        {
          id: "task-5-1",
          title: "Deploy Policy Engine",
          description: "Implement Kyverno for policy enforcement.",
          instructions: [
            "Install Kyverno",
            "Create security policies",
            "Enforce pod security standards",
            "Implement image scanning policies",
          ],
          codeSnippets: [],
        },
      ],
    },

    {
      id: "phase-6",
      title: "Disaster Recovery",
      description: "Implement backup and disaster recovery strategy.",
      estimatedTime: "3 hours",
      tasks: [
        {
          id: "task-6-1",
          title: "Configure Velero Backups",
          description: "Set up automated cluster backups.",
          instructions: [
            "Install Velero on both clusters",
            "Configure backup schedules",
            "Test restore procedures",
            "Document DR runbooks",
          ],
          codeSnippets: [],
        },
      ],
    },

    {
      id: "phase-7",
      title: "Cost Optimization",
      description: "Implement cost monitoring and optimization strategies.",
      estimatedTime: "2 hours",
      tasks: [
        {
          id: "task-7-1",
          title: "Deploy Cost Monitoring",
          description: "Set up Kubecost for cluster cost analysis.",
          instructions: [
            "Install Kubecost",
            "Configure cost allocation",
            "Set up budget alerts",
            "Implement resource quotas",
          ],
          codeSnippets: [],
        },
      ],
    },
  ],
  bonusChallenges: [
    "Implement blue-green deployments across clusters",
    "Add chaos engineering with Chaos Mesh",
    "Implement progressive delivery with Flagger",
    "Add service mesh security with mTLS enforcement",
    "Implement centralized secret management with Vault",
    "Add automated compliance scanning with Falco",
    "Implement GitOps for infrastructure (Crossplane)",
    "Add developer portal with Backstage",
  ],
  submissionChecklist: [
    "EKS cluster running on AWS",
    "GKE cluster running on GCP",
    "Multi-cluster networking (VPN/Peering)",
    "ArgoCD managing both clusters",
    "Istio service mesh deployed",
    "GitOps repository structure",
    "CI/CD pipeline functional",
    "Prometheus & Grafana monitoring",
    "Centralized logging (Loki)",
    "Distributed tracing (Tempo/Jaeger)",
    "Policy enforcement (Kyverno)",
    "Backup & restore (Velero)",
    "Cost monitoring (Kubecost)",
    "Security scanning integrated",
    "Documentation (architecture, runbooks)",
    "Video demo (30-40 min)",
    "Public GitHub repository",
  ],
}
