export interface LabEnvironment {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: 'internal' | 'external';
  // For internal labs (your Render server)
  internalConfig?: {
    defaultDirectory: string;
    tools: string[];
    features: string[];
    instructions: string[];
  };
  // For external labs (free platforms)
  externalConfig?: {
    platform: string;
    url: string;
    instructions: string[];
    features: string[];
  };
}

export const labEnvironments: LabEnvironment[] = [
  // ========== INTERNAL LABS (Your Render Server) ==========
  {
    id: 'linux',
    name: 'Linux Fundamentals',
    description: 'Practice Linux commands, file operations, and shell scripting',
    icon: 'Terminal',
    type: 'internal',
    internalConfig: {
      defaultDirectory: '/home/devops',
      tools: ['bash', 'vim', 'nano', 'git', 'curl', 'wget', 'jq', 'tree', 'htop'],
      features: [
        'Real Linux terminal',
        'Persistent session',
        'File system access',
        'Common CLI tools',
        'Guided exercises'
      ],
      instructions: [
        'Click "Launch Lab" to open the terminal',
        'Follow guided exercises on the left panel',
        'Practice commands like ls, cd, mkdir, cat, grep',
        'Your work is saved during the session'
      ]
    }
  },
  {
    id: 'git',
    name: 'Git & Version Control',
    description: 'Practice Git workflows, branching, and collaboration',
    icon: 'GitBranch',
    type: 'internal',
    internalConfig: {
      defaultDirectory: '/home/devops/projects',
      tools: ['git', 'vim', 'nano', 'diff', 'patch'],
      features: [
        'Full Git installation',
        'Practice branching',
        'Merge conflicts',
        'Real repositories',
        'Guided workflows'
      ],
      instructions: [
        'Click "Launch Lab" to start',
        'Initialize repos with git init',
        'Practice add, commit, branch, merge',
        'Follow exercises for common workflows'
      ]
    }
  },
  {
    id: 'terraform',
    name: 'Terraform & IaC',
    description: 'Practice Infrastructure as Code with Terraform',
    icon: 'Blocks',
    type: 'internal',
    internalConfig: {
      defaultDirectory: '/home/devops/terraform',
      tools: ['terraform', 'vim', 'nano', 'jq', 'curl'],
      features: [
        'Terraform installed',
        'HCL syntax practice',
        'Plan & validate',
        'State management',
        'Module basics'
      ],
      instructions: [
        'Click "Launch Lab" to start',
        'Write .tf files with vim or nano',
        'Run terraform init, plan, validate',
        'Practice with local providers'
      ]
    }
  },
  {
    id: 'scripting',
    name: 'Shell Scripting',
    description: 'Write and debug Bash scripts',
    icon: 'FileCode',
    type: 'internal',
    internalConfig: {
      defaultDirectory: '/home/devops/scripts',
      tools: ['bash', 'shellcheck', 'vim', 'nano', 'awk', 'sed', 'grep'],
      features: [
        'Full Bash shell',
        'Script debugging',
        'Text processing',
        'Automation practice',
        'ShellCheck linting'
      ],
      instructions: [
        'Click "Launch Lab" to start',
        'Create scripts with vim or nano',
        'Make executable with chmod +x',
        'Debug with bash -x script.sh'
      ]
    }
  },
  
  // ========== EXTERNAL LABS (Free Platforms) ==========
  {
    id: 'docker',
    name: 'Docker & Containers',
    description: 'Build and run containers with full Docker daemon access',
    icon: 'Container',
    type: 'external',
    externalConfig: {
      platform: 'Play with Docker',
      url: 'https://labs.play-with-docker.com/',
      instructions: [
        'Click "Start" to get a free 4-hour Docker environment',
        'Click "+ ADD NEW INSTANCE" to create a VM',
        'You get full Docker access with docker build, run, compose',
        'Environment resets after 4 hours (save your work!)'
      ],
      features: [
        '4 hours free session',
        'Full Docker daemon',
        'Docker Compose support',
        'Multiple instances',
        'No signup required'
      ]
    }
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes & Orchestration',
    description: 'Deploy and manage applications on a real Kubernetes cluster',
    icon: 'Network',
    type: 'external',
    externalConfig: {
      platform: 'Play with Kubernetes',
      url: 'https://labs.play-with-k8s.com/',
      instructions: [
        'Login with Docker Hub or GitHub account',
        'Click "+ ADD NEW INSTANCE" to create a node',
        'Run kubeadm init on first node to create cluster',
        'Join additional nodes with the provided token',
        'You have full kubectl access!'
      ],
      features: [
        '4 hours free session',
        'Real Kubernetes cluster',
        'Multiple nodes supported',
        'Full kubectl access',
        'Helm support'
      ]
    }
  },
  {
    id: 'kubernetes-killercoda',
    name: 'Kubernetes Scenarios',
    description: 'Guided Kubernetes tutorials with pre-configured clusters',
    icon: 'GraduationCap',
    type: 'external',
    externalConfig: {
      platform: 'Killercoda',
      url: 'https://killercoda.com/playgrounds/scenario/kubernetes',
      instructions: [
        'Create a free account or continue as guest',
        'Select a scenario or use the playground',
        'Environment comes pre-configured with kubectl',
        'Follow interactive tutorials or practice freely'
      ],
      features: [
        '60 minutes per session',
        'Pre-configured clusters',
        'Guided scenarios',
        'CKA/CKAD practice',
        'Free tier available'
      ]
    }
  },
  {
    id: 'docker-gitpod',
    name: 'Docker (Extended)',
    description: 'Full VS Code environment with Docker for longer sessions',
    icon: 'Code',
    type: 'external',
    externalConfig: {
      platform: 'Gitpod',
      url: 'https://gitpod.io/#https://github.com/docker/getting-started',
      instructions: [
        'Sign in with GitHub, GitLab, or Bitbucket',
        'Workspace opens in VS Code (browser)',
        'Docker is pre-installed and ready',
        '50 hours/month free!'
      ],
      features: [
        '50 hours/month free',
        'Full VS Code IDE',
        'Docker & Docker Compose',
        'Persistent workspaces',
        'GitHub integration'
      ]
    }
  },
  {
    id: 'mlops',
    name: 'MLOps & ML Pipelines',
    description: 'Practice MLOps workflows with Python and ML tools',
    icon: 'Brain',
    type: 'external',
    externalConfig: {
      platform: 'Google Colab',
      url: 'https://colab.research.google.com/',
      instructions: [
        'Sign in with Google account',
        'Create a new notebook',
        'GPU/TPU available for free!',
        'Install MLflow, DVC, etc. with pip'
      ],
      features: [
        'Free GPU/TPU access',
        'Python environment',
        'Pre-installed ML libraries',
        'Google Drive integration',
        'Shareable notebooks'
      ]
    }
  }
];

// Helper to get lab by ID
export function getLabEnvironment(id: string): LabEnvironment | undefined {
  return labEnvironments.find(lab => lab.id === id);
}

// Get internal labs only
export function getInternalLabs(): LabEnvironment[] {
  return labEnvironments.filter(lab => lab.type === 'internal');
}

// Get external labs only
export function getExternalLabs(): LabEnvironment[] {
  return labEnvironments.filter(lab => lab.type === 'external');
}
