# DevOps Academy Lab Environments

This directory contains Docker configurations for the lab environments.

## Available Environments

### lab-environment (Base)
Full-featured Ubuntu environment with all DevOps tools:
- Docker CLI
- Kubernetes (kubectl, helm)
- Terraform
- AWS CLI
- Python 3 with ML libraries
- Git, vim, jq, and more

### Building the Image

```bash
cd docker/lab-environment
docker build -t devops-academy/lab:latest .
```

### Running Locally

```bash
# Basic run
docker run -it --rm devops-academy/lab:latest

# With Docker socket (for Docker-in-Docker)
docker run -it --rm -v /var/run/docker.sock:/var/run/docker.sock devops-academy/lab:latest

# With persistent workspace
docker run -it --rm -v $(pwd)/workspace:/home/learner/projects devops-academy/lab:latest
```

## Future Environments

- `kubernetes-lab` - Minikube/kind for K8s practice
- `mlops-lab` - Jupyter + ML tools
- `cloud-lab` - LocalStack for AWS simulation
