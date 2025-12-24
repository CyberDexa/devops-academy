# DevOps Academy Lab Environment
# This Dockerfile creates an environment for hands-on DevOps practice

FROM ubuntu:22.04

LABEL maintainer="DevOps Academy"
LABEL description="Interactive lab environment for DevOps learning"

# Avoid prompts from apt
ENV DEBIAN_FRONTEND=noninteractive

# Set locale
ENV LANG=en_US.UTF-8
ENV LANGUAGE=en_US:en
ENV LC_ALL=en_US.UTF-8

# Install essential packages
RUN apt-get update && apt-get install -y \
    # Basic utilities
    curl \
    wget \
    git \
    vim \
    nano \
    htop \
    tree \
    jq \
    unzip \
    zip \
    ca-certificates \
    gnupg \
    lsb-release \
    locales \
    sudo \
    # Networking tools
    net-tools \
    iputils-ping \
    dnsutils \
    telnet \
    netcat \
    # Development tools
    build-essential \
    python3 \
    python3-pip \
    nodejs \
    npm \
    # Shell
    zsh \
    && rm -rf /var/lib/apt/lists/*

# Generate locale
RUN locale-gen en_US.UTF-8

# Install Docker CLI (for Docker-in-Docker scenarios)
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list \
    && apt-get update \
    && apt-get install -y docker-ce-cli docker-compose-plugin \
    && rm -rf /var/lib/apt/lists/*

# Install kubectl
RUN curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" \
    && chmod +x kubectl \
    && mv kubectl /usr/local/bin/

# Install Helm
RUN curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Install Terraform
RUN wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg \
    && echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" > /etc/apt/sources.list.d/hashicorp.list \
    && apt-get update \
    && apt-get install -y terraform \
    && rm -rf /var/lib/apt/lists/*

# Install AWS CLI v2
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
    && unzip awscliv2.zip \
    && ./aws/install \
    && rm -rf aws awscliv2.zip

# Install Python packages for MLOps
RUN pip3 install --no-cache-dir \
    mlflow \
    dvc \
    pandas \
    numpy \
    scikit-learn \
    jupyter

# Create learner user
RUN useradd -m -s /bin/bash learner \
    && echo "learner:learner" | chpasswd \
    && adduser learner sudo \
    && echo "learner ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Create project directory
RUN mkdir -p /home/learner/projects && chown -R learner:learner /home/learner

# Switch to learner user
USER learner
WORKDIR /home/learner

# Install Oh My Zsh for better shell experience
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended

# Create welcome message
RUN echo '#!/bin/bash\n\
echo "╔══════════════════════════════════════════════════════════════╗"\n\
echo "║  🚀 DevOps Academy - Interactive Lab Environment             ║"\n\
echo "║                                                              ║"\n\
echo "║  Available Tools:                                            ║"\n\
echo "║  • Docker, Docker Compose                                    ║"\n\
echo "║  • Kubernetes (kubectl, helm)                                ║"\n\
echo "║  • Terraform                                                 ║"\n\
echo "║  • AWS CLI                                                   ║"\n\
echo "║  • Python 3, pip, MLflow, DVC                                ║"\n\
echo "║  • Git, vim, nano, jq                                        ║"\n\
echo "╚══════════════════════════════════════════════════════════════╝"\n\
echo ""\n\
echo "Type '\''help'\'' or '\''tools'\'' for more information."\n\
echo ""' > /home/learner/.welcome.sh && chmod +x /home/learner/.welcome.sh

# Add welcome to bashrc
RUN echo '\n# DevOps Academy Welcome\nsource ~/.welcome.sh' >> /home/learner/.bashrc

# Create tools helper script
RUN echo '#!/bin/bash\n\
echo "Installed DevOps Tools:"\n\
echo "========================"\n\
echo ""\n\
echo "Docker:     $(docker --version 2>/dev/null || echo "Not connected")"\n\
echo "kubectl:    $(kubectl version --client --short 2>/dev/null || echo "Available")"\n\
echo "Helm:       $(helm version --short 2>/dev/null)"\n\
echo "Terraform:  $(terraform --version | head -1)"\n\
echo "AWS CLI:    $(aws --version)"\n\
echo "Python:     $(python3 --version)"\n\
echo "Git:        $(git --version)"\n\
echo ""' > /home/learner/bin/tools && chmod +x /home/learner/bin/tools

ENV PATH="/home/learner/bin:${PATH}"

# Default command
CMD ["/bin/bash"]
