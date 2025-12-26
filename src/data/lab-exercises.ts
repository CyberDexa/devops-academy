// Lab Exercises Data
// Structured exercises with validation for each lab environment

export interface LabStep {
  id: string
  title: string
  description: string
  hint?: string
  command?: string // Expected command (for validation)
  commandPattern?: RegExp // Pattern to match (for flexible validation)
  expectedOutput?: string // Substring to check in output
  successMessage: string
}

export interface LabExercise {
  id: string
  labId: string // References the lab environment
  title: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced"
  estimatedTime: string
  xpReward: number
  prerequisites?: string[] // Other exercise IDs that should be completed first
  steps: LabStep[]
  completionMessage: string
}

export const labExercises: LabExercise[] = [
  // ============== LINUX FUNDAMENTALS ==============
  {
    id: "linux-basics-navigation",
    labId: "linux",
    title: "Filesystem Navigation",
    description: "Master the essential commands for navigating the Linux filesystem",
    difficulty: "beginner",
    estimatedTime: "10 min",
    xpReward: 50,
    steps: [
      {
        id: "step-1",
        title: "Check your current location",
        description: "Use the `pwd` command to print your current working directory.",
        command: "pwd",
        successMessage: "Great! You found your current directory.",
      },
      {
        id: "step-2",
        title: "List directory contents",
        description: "Use `ls -la` to list all files including hidden ones with details.",
        commandPattern: /^ls\s+(-la|-al|-l\s+-a|-a\s+-l)/,
        successMessage: "Perfect! You can now see all files with their permissions.",
      },
      {
        id: "step-3",
        title: "Create a practice directory",
        description: "Create a new directory called `practice` using the `mkdir` command.",
        commandPattern: /^mkdir\s+(.*\s+)?practice/,
        successMessage: "Directory created! You're building your workspace.",
      },
      {
        id: "step-4",
        title: "Navigate into the directory",
        description: "Use `cd practice` to change into your new directory.",
        commandPattern: /^cd\s+practice/,
        successMessage: "You've entered the practice directory!",
      },
      {
        id: "step-5",
        title: "Go back to parent",
        description: "Use `cd ..` to go back to the parent directory.",
        command: "cd ..",
        successMessage: "Excellent! You've mastered basic navigation.",
      },
    ],
    completionMessage: "🎉 Congratulations! You've completed the Filesystem Navigation exercise. You now know how to move around the Linux filesystem confidently!",
  },
  {
    id: "linux-file-operations",
    labId: "linux",
    title: "File Operations",
    description: "Learn to create, copy, move, and manage files",
    difficulty: "beginner",
    estimatedTime: "15 min",
    xpReward: 75,
    prerequisites: ["linux-basics-navigation"],
    steps: [
      {
        id: "step-1",
        title: "Create a text file",
        description: "Create a file called `hello.txt` with some content using echo and redirection.",
        commandPattern: /echo\s+.*>\s*hello\.txt/,
        successMessage: "File created with content!",
      },
      {
        id: "step-2",
        title: "View file contents",
        description: "Use `cat` to display the contents of your file.",
        commandPattern: /^cat\s+hello\.txt/,
        successMessage: "You can now read file contents!",
      },
      {
        id: "step-3",
        title: "Copy the file",
        description: "Create a copy of the file using `cp hello.txt hello_backup.txt`.",
        commandPattern: /^cp\s+hello\.txt\s+hello_backup\.txt/,
        successMessage: "Backup created successfully!",
      },
      {
        id: "step-4",
        title: "Rename/Move a file",
        description: "Rename `hello_backup.txt` to `backup.txt` using the `mv` command.",
        commandPattern: /^mv\s+hello_backup\.txt\s+backup\.txt/,
        successMessage: "File renamed!",
      },
      {
        id: "step-5",
        title: "Delete a file",
        description: "Remove the backup file using `rm backup.txt`.",
        commandPattern: /^rm\s+backup\.txt/,
        successMessage: "File removed. Be careful with rm - it's permanent!",
      },
    ],
    completionMessage: "🎉 You've mastered basic file operations! These commands are fundamental to everything you'll do in DevOps.",
  },
  {
    id: "linux-permissions",
    labId: "linux",
    title: "File Permissions",
    description: "Understand and modify Linux file permissions",
    difficulty: "intermediate",
    estimatedTime: "20 min",
    xpReward: 100,
    prerequisites: ["linux-file-operations"],
    steps: [
      {
        id: "step-1",
        title: "Create a script file",
        description: "Create a simple shell script: `echo '#!/bin/bash\\necho Hello' > script.sh`",
        commandPattern: /echo.*>.*script\.sh/,
        successMessage: "Script file created!",
      },
      {
        id: "step-2",
        title: "Check current permissions",
        description: "Use `ls -l script.sh` to see the current permissions.",
        commandPattern: /^ls\s+-l\s+script\.sh/,
        successMessage: "Notice the permission string (e.g., -rw-r--r--)",
      },
      {
        id: "step-3",
        title: "Make the script executable",
        description: "Add execute permission using `chmod +x script.sh`.",
        commandPattern: /^chmod\s+\+x\s+script\.sh/,
        successMessage: "The script is now executable!",
      },
      {
        id: "step-4",
        title: "Verify the change",
        description: "Run `ls -l script.sh` again to see the updated permissions.",
        commandPattern: /^ls\s+-l\s+script\.sh/,
        successMessage: "You should now see 'x' in the permissions!",
      },
      {
        id: "step-5",
        title: "Run your script",
        description: "Execute the script with `./script.sh`.",
        commandPattern: /^\.\/script\.sh/,
        successMessage: "Your script ran! Understanding permissions is key for DevOps.",
      },
    ],
    completionMessage: "🎉 You understand file permissions! This knowledge is crucial for managing servers and deployments securely.",
  },

  // ============== DOCKER LAB ==============
  {
    id: "docker-first-container",
    labId: "docker",
    title: "Your First Container",
    description: "Learn the basics of running Docker containers",
    difficulty: "beginner",
    estimatedTime: "10 min",
    xpReward: 75,
    steps: [
      {
        id: "step-1",
        title: "Check Docker version",
        description: "Verify Docker is installed by checking its version.",
        commandPattern: /^docker\s+(version|--version|-v)/,
        successMessage: "Docker is ready to use!",
      },
      {
        id: "step-2",
        title: "Run hello-world",
        description: "Run the official hello-world container: `docker run hello-world`",
        commandPattern: /^docker\s+run\s+.*hello-world/,
        successMessage: "Congratulations! You've run your first container!",
      },
      {
        id: "step-3",
        title: "List running containers",
        description: "Use `docker ps` to see running containers (there may be none).",
        commandPattern: /^docker\s+ps(\s|$)/,
        successMessage: "This shows actively running containers.",
      },
      {
        id: "step-4",
        title: "List all containers",
        description: "Use `docker ps -a` to see all containers including stopped ones.",
        commandPattern: /^docker\s+ps\s+-a/,
        successMessage: "You can see the hello-world container that just ran!",
      },
    ],
    completionMessage: "🎉 You've run your first container! This is the foundation of modern DevOps.",
  },
  {
    id: "docker-interactive-containers",
    labId: "docker",
    title: "Interactive Containers",
    description: "Run and interact with containers using terminal sessions",
    difficulty: "beginner",
    estimatedTime: "15 min",
    xpReward: 100,
    prerequisites: ["docker-first-container"],
    steps: [
      {
        id: "step-1",
        title: "Run an interactive Ubuntu container",
        description: "Start an Ubuntu container with an interactive shell: `docker run -it ubuntu bash`",
        commandPattern: /^docker\s+run\s+-it\s+ubuntu\s+bash/,
        successMessage: "You're now inside a container!",
        hint: "The -it flags give you an interactive terminal.",
      },
      {
        id: "step-2",
        title: "Explore inside the container",
        description: "Run `cat /etc/os-release` to see you're in Ubuntu.",
        commandPattern: /^cat\s+\/etc\/os-release/,
        successMessage: "This confirms you're inside an Ubuntu container!",
      },
      {
        id: "step-3",
        title: "Exit the container",
        description: "Type `exit` to leave the container.",
        command: "exit",
        successMessage: "You've exited the container. It's now stopped.",
      },
      {
        id: "step-4",
        title: "Run a detached container",
        description: "Run nginx in the background: `docker run -d --name web -p 8080:80 nginx`",
        commandPattern: /^docker\s+run\s+-d.*nginx/,
        successMessage: "Nginx is now running in the background!",
        hint: "The -d flag runs the container in detached mode.",
      },
      {
        id: "step-5",
        title: "Check running containers",
        description: "Verify nginx is running with `docker ps`.",
        commandPattern: /^docker\s+ps(\s|$)/,
        successMessage: "You should see your nginx container running!",
      },
    ],
    completionMessage: "🎉 You can now run interactive and background containers! These skills are essential for development and deployment.",
  },
  {
    id: "docker-build-image",
    labId: "docker",
    title: "Build Your First Image",
    description: "Create a custom Docker image using a Dockerfile",
    difficulty: "intermediate",
    estimatedTime: "20 min",
    xpReward: 150,
    prerequisites: ["docker-interactive-containers"],
    steps: [
      {
        id: "step-1",
        title: "Create a project directory",
        description: "Create and enter a new directory: `mkdir myapp && cd myapp`",
        commandPattern: /mkdir\s+myapp.*&&.*cd\s+myapp/,
        successMessage: "Project directory ready!",
      },
      {
        id: "step-2",
        title: "Create an application file",
        description: "Create a simple Python app: `echo 'print(\"Hello from Docker!\")' > app.py`",
        commandPattern: /echo.*>.*app\.py/,
        successMessage: "Application file created!",
      },
      {
        id: "step-3",
        title: "Create a Dockerfile",
        description: "Create a Dockerfile with: `echo -e 'FROM python:3.9-slim\\nCOPY app.py /app.py\\nCMD [\"python\", \"/app.py\"]' > Dockerfile`",
        commandPattern: /echo.*Dockerfile/i,
        successMessage: "Dockerfile created!",
        hint: "The Dockerfile tells Docker how to build your image.",
      },
      {
        id: "step-4",
        title: "Build the image",
        description: "Build your image: `docker build -t myapp:v1 .`",
        commandPattern: /^docker\s+build\s+-t\s+myapp/,
        successMessage: "Image built successfully!",
      },
      {
        id: "step-5",
        title: "Run your custom image",
        description: "Run a container from your image: `docker run myapp:v1`",
        commandPattern: /^docker\s+run\s+myapp/,
        successMessage: "Your custom container ran!",
      },
    ],
    completionMessage: "🎉 You've built your first Docker image! This is how real applications are containerized.",
  },

  // ============== KUBERNETES LAB ==============
  {
    id: "k8s-cluster-basics",
    labId: "kubernetes",
    title: "Cluster Exploration",
    description: "Learn to navigate and inspect a Kubernetes cluster",
    difficulty: "intermediate",
    estimatedTime: "15 min",
    xpReward: 100,
    steps: [
      {
        id: "step-1",
        title: "Check kubectl version",
        description: "Verify kubectl is configured: `kubectl version --client`",
        commandPattern: /^kubectl\s+version/,
        successMessage: "kubectl is ready!",
      },
      {
        id: "step-2",
        title: "View cluster info",
        description: "Get cluster information: `kubectl cluster-info`",
        commandPattern: /^kubectl\s+cluster-info/,
        successMessage: "You can see the cluster control plane!",
      },
      {
        id: "step-3",
        title: "List namespaces",
        description: "View all namespaces: `kubectl get namespaces`",
        commandPattern: /^kubectl\s+get\s+(namespaces|ns)/,
        successMessage: "Namespaces are logical partitions in a cluster.",
      },
      {
        id: "step-4",
        title: "View nodes",
        description: "See cluster nodes: `kubectl get nodes`",
        commandPattern: /^kubectl\s+get\s+nodes/,
        successMessage: "These are the worker machines in your cluster.",
      },
      {
        id: "step-5",
        title: "Get all resources",
        description: "View resources in default namespace: `kubectl get all`",
        commandPattern: /^kubectl\s+get\s+all/,
        successMessage: "This shows pods, services, deployments, and more!",
      },
    ],
    completionMessage: "🎉 You can now navigate a Kubernetes cluster! Understanding cluster structure is fundamental for orchestration.",
  },
  {
    id: "k8s-deploy-app",
    labId: "kubernetes",
    title: "Deploy Your First App",
    description: "Deploy and expose an application on Kubernetes",
    difficulty: "intermediate",
    estimatedTime: "20 min",
    xpReward: 150,
    prerequisites: ["k8s-cluster-basics"],
    steps: [
      {
        id: "step-1",
        title: "Create a deployment",
        description: "Deploy nginx: `kubectl create deployment nginx --image=nginx`",
        commandPattern: /^kubectl\s+create\s+deployment\s+nginx/,
        successMessage: "Deployment created!",
      },
      {
        id: "step-2",
        title: "Check deployment status",
        description: "View your deployment: `kubectl get deployments`",
        commandPattern: /^kubectl\s+get\s+(deployments|deploy)/,
        successMessage: "You can see your nginx deployment!",
      },
      {
        id: "step-3",
        title: "View the pods",
        description: "See the pods created: `kubectl get pods`",
        commandPattern: /^kubectl\s+get\s+pods/,
        successMessage: "Pods are running instances of your containers.",
      },
      {
        id: "step-4",
        title: "Expose the deployment",
        description: "Create a service: `kubectl expose deployment nginx --port=80 --type=NodePort`",
        commandPattern: /^kubectl\s+expose\s+deployment\s+nginx/,
        successMessage: "Service created! Your app is now accessible.",
      },
      {
        id: "step-5",
        title: "View services",
        description: "Check your service: `kubectl get services`",
        commandPattern: /^kubectl\s+get\s+(services|svc)/,
        successMessage: "You can see the service and its port!",
      },
    ],
    completionMessage: "🎉 You've deployed and exposed an application on Kubernetes! This is the core of container orchestration.",
  },

  // ============== GIT LAB ==============
  {
    id: "git-basics",
    labId: "git",
    title: "Git Fundamentals",
    description: "Master the essential Git commands for version control",
    difficulty: "beginner",
    estimatedTime: "15 min",
    xpReward: 75,
    steps: [
      {
        id: "step-1",
        title: "Check Git version",
        description: "Verify Git is installed: `git --version`",
        commandPattern: /^git\s+(--version|-v|version)/,
        successMessage: "Git is ready!",
      },
      {
        id: "step-2",
        title: "Initialize a repository",
        description: "Create a new repo: `mkdir myrepo && cd myrepo && git init`",
        commandPattern: /git\s+init/,
        successMessage: "Repository initialized!",
      },
      {
        id: "step-3",
        title: "Create a file",
        description: "Create a README: `echo '# My Project' > README.md`",
        commandPattern: /echo.*>.*README\.md/,
        successMessage: "File created!",
      },
      {
        id: "step-4",
        title: "Stage the file",
        description: "Add to staging: `git add README.md`",
        commandPattern: /^git\s+add/,
        successMessage: "File staged for commit!",
      },
      {
        id: "step-5",
        title: "Make your first commit",
        description: "Commit changes: `git commit -m 'Initial commit'`",
        commandPattern: /^git\s+commit/,
        successMessage: "First commit made!",
      },
      {
        id: "step-6",
        title: "View commit history",
        description: "See your commits: `git log --oneline`",
        commandPattern: /^git\s+log/,
        successMessage: "You can see your commit history!",
      },
    ],
    completionMessage: "🎉 You've mastered Git basics! Version control is essential for any DevOps workflow.",
  },
  {
    id: "git-branching",
    labId: "git",
    title: "Branching & Merging",
    description: "Learn to work with branches for parallel development",
    difficulty: "intermediate",
    estimatedTime: "20 min",
    xpReward: 100,
    prerequisites: ["git-basics"],
    steps: [
      {
        id: "step-1",
        title: "View current branch",
        description: "Check your current branch: `git branch`",
        commandPattern: /^git\s+branch(\s|$)/,
        successMessage: "You're on the main/master branch!",
      },
      {
        id: "step-2",
        title: "Create a feature branch",
        description: "Create and switch to a new branch: `git checkout -b feature/login`",
        commandPattern: /^git\s+(checkout\s+-b|switch\s+-c)\s+feature/,
        successMessage: "New branch created!",
      },
      {
        id: "step-3",
        title: "Make changes on the branch",
        description: "Add a new file: `echo 'login code' > login.js && git add . && git commit -m 'Add login'`",
        commandPattern: /git\s+commit/,
        successMessage: "Changes committed on feature branch!",
      },
      {
        id: "step-4",
        title: "Switch back to main",
        description: "Return to main branch: `git checkout main` or `git checkout master`",
        commandPattern: /^git\s+(checkout|switch)\s+(main|master)/,
        successMessage: "Back on main branch!",
      },
      {
        id: "step-5",
        title: "Merge the feature",
        description: "Merge your feature: `git merge feature/login`",
        commandPattern: /^git\s+merge\s+feature/,
        successMessage: "Feature merged into main!",
      },
    ],
    completionMessage: "🎉 You can now work with branches! This enables parallel development and safe experimentation.",
  },

  // ============== TERRAFORM LAB ==============
  {
    id: "terraform-basics",
    labId: "terraform",
    title: "Terraform Fundamentals",
    description: "Learn the basics of Infrastructure as Code with Terraform",
    difficulty: "intermediate",
    estimatedTime: "20 min",
    xpReward: 125,
    steps: [
      {
        id: "step-1",
        title: "Check Terraform version",
        description: "Verify Terraform is installed: `terraform -v`",
        commandPattern: /^terraform\s+(-v|version|--version)/,
        successMessage: "Terraform is ready!",
      },
      {
        id: "step-2",
        title: "Create a project directory",
        description: "Create a new directory: `mkdir tf-demo && cd tf-demo`",
        commandPattern: /mkdir\s+tf-demo/,
        successMessage: "Project directory created!",
      },
      {
        id: "step-3",
        title: "Create a Terraform file",
        description: "Create main.tf with a simple output:\n```\ncat > main.tf << 'EOF'\noutput \"hello\" {\n  value = \"Hello, Terraform!\"\n}\nEOF\n```",
        commandPattern: /main\.tf/,
        successMessage: "Terraform configuration created!",
      },
      {
        id: "step-4",
        title: "Initialize Terraform",
        description: "Initialize the working directory: `terraform init`",
        commandPattern: /^terraform\s+init/,
        successMessage: "Terraform initialized!",
      },
      {
        id: "step-5",
        title: "Validate configuration",
        description: "Check for errors: `terraform validate`",
        commandPattern: /^terraform\s+validate/,
        successMessage: "Configuration is valid!",
      },
      {
        id: "step-6",
        title: "Apply the configuration",
        description: "Apply changes: `terraform apply -auto-approve`",
        commandPattern: /^terraform\s+apply/,
        successMessage: "Configuration applied!",
      },
    ],
    completionMessage: "🎉 You've written your first Terraform configuration! This is how modern infrastructure is provisioned.",
  },

  // ============== DOCKER BASICS ==============
  {
    id: "docker-basics-commands",
    labId: "docker-basics",
    title: "Docker Command Essentials",
    description: "Master the core Docker CLI commands",
    difficulty: "beginner",
    estimatedTime: "10 min",
    xpReward: 50,
    steps: [
      {
        id: "step-1",
        title: "Check Docker version",
        description: "Verify Docker is available with `docker --version`",
        commandPattern: /^docker\s+(--version|-v|version)/,
        successMessage: "Docker CLI is ready!",
      },
      {
        id: "step-2",
        title: "Learn docker help",
        description: "View available commands with `docker --help`",
        commandPattern: /^docker\s+(--help|-h|help)/,
        successMessage: "Now you can explore Docker commands!",
      },
      {
        id: "step-3",
        title: "List images command",
        description: "Learn the command to list images: `docker images --help`",
        commandPattern: /^docker\s+images?\s+--help/,
        successMessage: "You know how to explore image commands!",
      },
      {
        id: "step-4",
        title: "List containers command",
        description: "Learn the command for containers: `docker ps --help`",
        commandPattern: /^docker\s+ps\s+--help/,
        successMessage: "You understand container listing!",
      },
      {
        id: "step-5",
        title: "Docker run syntax",
        description: "Learn run options: `docker run --help | head -30`",
        commandPattern: /^docker\s+run\s+--help/,
        successMessage: "You've seen the docker run options!",
      },
    ],
    completionMessage: "🎉 You've learned the essential Docker CLI commands! These are the building blocks for container management.",
  },
  {
    id: "docker-dockerfile-basics",
    labId: "docker-basics",
    title: "Writing Dockerfiles",
    description: "Learn to write Dockerfiles for containerizing applications",
    difficulty: "beginner",
    estimatedTime: "15 min",
    xpReward: 75,
    prerequisites: ["docker-basics-commands"],
    steps: [
      {
        id: "step-1",
        title: "Create a project directory",
        description: "Create a directory for your Docker project: `mkdir myapp && cd myapp`",
        commandPattern: /mkdir\s+myapp/,
        successMessage: "Project directory created!",
      },
      {
        id: "step-2",
        title: "Create a simple app",
        description: "Create a simple script:\n```\necho '#!/bin/bash\necho \"Hello from Docker!\"' > app.sh && chmod +x app.sh\n```",
        commandPattern: /app\.sh/,
        successMessage: "Application script created!",
      },
      {
        id: "step-3",
        title: "Create a Dockerfile",
        description: "Create a Dockerfile:\n```\ncat > Dockerfile << 'EOF'\nFROM alpine:latest\nCOPY app.sh /app.sh\nCMD [\"/app.sh\"]\nEOF\n```",
        commandPattern: /Dockerfile/,
        successMessage: "Dockerfile created!",
      },
      {
        id: "step-4",
        title: "View the Dockerfile",
        description: "Examine your Dockerfile: `cat Dockerfile`",
        commandPattern: /^cat\s+Dockerfile/,
        successMessage: "You can see the Dockerfile structure!",
      },
      {
        id: "step-5",
        title: "Understand the instructions",
        description: "Each line is an instruction:\n- `FROM` - base image\n- `COPY` - add files\n- `CMD` - default command\n\nRun: `echo 'Dockerfile understood!'`",
        commandPattern: /echo.*Dockerfile/i,
        successMessage: "You understand Dockerfile basics!",
      },
    ],
    completionMessage: "🎉 You've written your first Dockerfile! To actually build and run it, use the External Labs with Play with Docker.",
  },
  {
    id: "docker-image-management",
    labId: "docker-basics",
    title: "Docker Image Concepts",
    description: "Understand Docker images, layers, and registries",
    difficulty: "intermediate",
    estimatedTime: "12 min",
    xpReward: 100,
    prerequisites: ["docker-dockerfile-basics"],
    steps: [
      {
        id: "step-1",
        title: "Image naming convention",
        description: "Images follow: `[registry/]repository[:tag]`\n\nExamples:\n- `nginx:latest`\n- `docker.io/library/nginx:1.25`\n- `gcr.io/myproject/myapp:v1`\n\nRun: `echo 'nginx:1.25-alpine'`",
        commandPattern: /echo.*nginx/,
        successMessage: "You understand image naming!",
      },
      {
        id: "step-2",
        title: "Create a multi-stage Dockerfile",
        description: "Multi-stage builds reduce image size:\n```\ncat > Dockerfile.multi << 'EOF'\n# Build stage\nFROM golang:1.21 AS builder\nWORKDIR /app\nCOPY . .\nRUN go build -o myapp\n\n# Production stage\nFROM alpine:latest\nCOPY --from=builder /app/myapp /myapp\nCMD [\"/myapp\"]\nEOF\n```",
        commandPattern: /Dockerfile\.multi/,
        successMessage: "Multi-stage Dockerfile created!",
      },
      {
        id: "step-3",
        title: "View multi-stage Dockerfile",
        description: "Examine the structure: `cat Dockerfile.multi`",
        commandPattern: /^cat\s+Dockerfile\.multi/,
        successMessage: "You can see the multi-stage structure!",
      },
      {
        id: "step-4",
        title: "Create .dockerignore",
        description: "Exclude files from builds:\n```\ncat > .dockerignore << 'EOF'\nnode_modules\n.git\n*.log\nEOF\n```",
        commandPattern: /\.dockerignore/,
        successMessage: ".dockerignore created!",
      },
    ],
    completionMessage: "🎉 You understand Docker image concepts! Use Play with Docker to build and push real images.",
  },

  // ============== KUBERNETES BASICS ==============
  {
    id: "kubernetes-kubectl-basics",
    labId: "kubernetes-basics",
    title: "kubectl Command Essentials",
    description: "Master the core kubectl CLI commands",
    difficulty: "beginner",
    estimatedTime: "10 min",
    xpReward: 50,
    steps: [
      {
        id: "step-1",
        title: "Check kubectl version",
        description: "Verify kubectl is available: `kubectl version --client`",
        commandPattern: /^kubectl\s+version/,
        successMessage: "kubectl CLI is ready!",
      },
      {
        id: "step-2",
        title: "Explore kubectl help",
        description: "View available commands: `kubectl --help`",
        commandPattern: /^kubectl\s+(--help|-h|help)/,
        successMessage: "Now you can explore kubectl commands!",
      },
      {
        id: "step-3",
        title: "API resources",
        description: "See available resource types: `kubectl api-resources --help`",
        commandPattern: /^kubectl\s+api-resources/,
        successMessage: "You know how to discover Kubernetes resources!",
      },
      {
        id: "step-4",
        title: "Explain a resource",
        description: "Learn about pods: `kubectl explain pod`",
        commandPattern: /^kubectl\s+explain\s+pod/,
        successMessage: "You can explore resource definitions!",
      },
      {
        id: "step-5",
        title: "Get command syntax",
        description: "Learn the get command: `kubectl get --help | head -20`",
        commandPattern: /^kubectl\s+get\s+--help/,
        successMessage: "You understand the get command!",
      },
    ],
    completionMessage: "🎉 You've learned essential kubectl commands! These are your tools for managing Kubernetes.",
  },
  {
    id: "kubernetes-yaml-manifests",
    labId: "kubernetes-basics",
    title: "Writing Kubernetes YAML",
    description: "Learn to write Kubernetes manifest files",
    difficulty: "beginner",
    estimatedTime: "15 min",
    xpReward: 75,
    prerequisites: ["kubernetes-kubectl-basics"],
    steps: [
      {
        id: "step-1",
        title: "Create a manifests directory",
        description: "Organize your manifests: `mkdir -p k8s && cd k8s`",
        commandPattern: /mkdir.*k8s/,
        successMessage: "Manifests directory created!",
      },
      {
        id: "step-2",
        title: "Create a Pod manifest",
        description: "Write a basic pod:\n```\ncat > pod.yaml << 'EOF'\napiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx-pod\n  labels:\n    app: nginx\nspec:\n  containers:\n  - name: nginx\n    image: nginx:1.25\n    ports:\n    - containerPort: 80\nEOF\n```",
        commandPattern: /pod\.yaml/,
        successMessage: "Pod manifest created!",
      },
      {
        id: "step-3",
        title: "View the Pod manifest",
        description: "Examine your manifest: `cat pod.yaml`",
        commandPattern: /^cat\s+pod\.yaml/,
        successMessage: "You can see the Pod structure!",
      },
      {
        id: "step-4",
        title: "Create a Deployment manifest",
        description: "Write a deployment:\n```\ncat > deployment.yaml << 'EOF'\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: nginx-deployment\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: nginx\n  template:\n    metadata:\n      labels:\n        app: nginx\n    spec:\n      containers:\n      - name: nginx\n        image: nginx:1.25\n        ports:\n        - containerPort: 80\nEOF\n```",
        commandPattern: /deployment\.yaml/,
        successMessage: "Deployment manifest created!",
      },
      {
        id: "step-5",
        title: "View the Deployment",
        description: "Examine your deployment: `cat deployment.yaml`",
        commandPattern: /^cat\s+deployment\.yaml/,
        successMessage: "You understand Deployment structure!",
      },
    ],
    completionMessage: "🎉 You've written Kubernetes manifests! Use Killercoda or Play with K8s to apply them to real clusters.",
  },
  {
    id: "kubernetes-service-manifest",
    labId: "kubernetes-basics",
    title: "Kubernetes Services",
    description: "Learn to expose applications with Services",
    difficulty: "intermediate",
    estimatedTime: "12 min",
    xpReward: 100,
    prerequisites: ["kubernetes-yaml-manifests"],
    steps: [
      {
        id: "step-1",
        title: "Understand Service types",
        description: "Service types:\n- `ClusterIP` - internal only\n- `NodePort` - external via node ports\n- `LoadBalancer` - cloud load balancer\n\nRun: `echo 'ClusterIP NodePort LoadBalancer'`",
        commandPattern: /echo.*ClusterIP/,
        successMessage: "You understand Service types!",
      },
      {
        id: "step-2",
        title: "Create a Service manifest",
        description: "Write a ClusterIP service:\n```\ncat > service.yaml << 'EOF'\napiVersion: v1\nkind: Service\nmetadata:\n  name: nginx-service\nspec:\n  type: ClusterIP\n  selector:\n    app: nginx\n  ports:\n  - port: 80\n    targetPort: 80\nEOF\n```",
        commandPattern: /service\.yaml/,
        successMessage: "Service manifest created!",
      },
      {
        id: "step-3",
        title: "View the Service",
        description: "Examine your service: `cat service.yaml`",
        commandPattern: /^cat\s+service\.yaml/,
        successMessage: "You understand Service structure!",
      },
      {
        id: "step-4",
        title: "Create a NodePort Service",
        description: "Create an externally accessible service:\n```\ncat > nodeport.yaml << 'EOF'\napiVersion: v1\nkind: Service\nmetadata:\n  name: nginx-nodeport\nspec:\n  type: NodePort\n  selector:\n    app: nginx\n  ports:\n  - port: 80\n    targetPort: 80\n    nodePort: 30080\nEOF\n```",
        commandPattern: /nodeport\.yaml/,
        successMessage: "NodePort Service created!",
      },
      {
        id: "step-5",
        title: "Validate YAML syntax",
        description: "Check YAML syntax: `cat service.yaml | head -5`",
        commandPattern: /cat\s+service\.yaml/,
        successMessage: "Your manifests are ready!",
      },
    ],
    completionMessage: "🎉 You understand Kubernetes Services! Apply these in Killercoda to see them work with real clusters.",
  },
  {
    id: "kubernetes-configmaps-secrets",
    labId: "kubernetes-basics",
    title: "ConfigMaps and Secrets",
    description: "Manage configuration and sensitive data",
    difficulty: "intermediate",
    estimatedTime: "15 min",
    xpReward: 100,
    prerequisites: ["kubernetes-service-manifest"],
    steps: [
      {
        id: "step-1",
        title: "Create a ConfigMap manifest",
        description: "Store configuration data:\n```\ncat > configmap.yaml << 'EOF'\napiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: app-config\ndata:\n  APP_ENV: production\n  LOG_LEVEL: info\n  MAX_CONNECTIONS: \"100\"\nEOF\n```",
        commandPattern: /configmap\.yaml/,
        successMessage: "ConfigMap manifest created!",
      },
      {
        id: "step-2",
        title: "View ConfigMap",
        description: "Examine the ConfigMap: `cat configmap.yaml`",
        commandPattern: /^cat\s+configmap\.yaml/,
        successMessage: "You understand ConfigMap structure!",
      },
      {
        id: "step-3",
        title: "Create a Secret manifest",
        description: "Create a secret (base64 encoded):\n```\ncat > secret.yaml << 'EOF'\napiVersion: v1\nkind: Secret\nmetadata:\n  name: app-secret\ntype: Opaque\nstringData:\n  DB_PASSWORD: supersecret123\n  API_KEY: myapikey456\nEOF\n```",
        commandPattern: /secret\.yaml/,
        successMessage: "Secret manifest created!",
      },
      {
        id: "step-4",
        title: "View Secret",
        description: "Examine the Secret: `cat secret.yaml`",
        commandPattern: /^cat\s+secret\.yaml/,
        successMessage: "You understand Secret structure!",
      },
      {
        id: "step-5",
        title: "Use in a Pod",
        description: "Create a pod using the config:\n```\ncat > pod-with-config.yaml << 'EOF'\napiVersion: v1\nkind: Pod\nmetadata:\n  name: app-pod\nspec:\n  containers:\n  - name: app\n    image: nginx\n    envFrom:\n    - configMapRef:\n        name: app-config\n    - secretRef:\n        name: app-secret\nEOF\n```",
        commandPattern: /pod-with-config\.yaml/,
        successMessage: "Pod with configuration created!",
      },
    ],
    completionMessage: "🎉 You understand ConfigMaps and Secrets! These are essential for managing application configuration in Kubernetes.",
  },

  // ============== MLOPS LAB ==============
  {
    id: "mlops-basics",
    labId: "mlops",
    title: "MLOps Fundamentals",
    description: "Introduction to machine learning operations concepts",
    difficulty: "advanced",
    estimatedTime: "25 min",
    xpReward: 150,
    steps: [
      {
        id: "step-1",
        title: "Check Python environment",
        description: "Verify Python and pip are available: `python3 --version && pip3 --version`",
        commandPattern: /^python3?\s+--version/,
        successMessage: "Python is ready!",
      },
      {
        id: "step-2",
        title: "Check MLflow installation",
        description: "Verify MLflow: `python3 -c 'import mlflow; print(mlflow.__version__)'`",
        commandPattern: /import\s+mlflow/,
        successMessage: "MLflow is available!",
      },
      {
        id: "step-3",
        title: "Create a training script",
        description: "Create a simple training script:\n```\ncat > train.py << 'EOF'\nimport mlflow\nmlflow.log_metric(\"accuracy\", 0.95)\nprint(\"Training complete!\")\nEOF\n```",
        commandPattern: /train\.py/,
        successMessage: "Training script created!",
      },
      {
        id: "step-4",
        title: "Run the training",
        description: "Execute the script: `python3 train.py`",
        commandPattern: /^python3?\s+train\.py/,
        successMessage: "Training completed with metric logging!",
      },
      {
        id: "step-5",
        title: "Check MLflow artifacts",
        description: "List the mlruns directory: `ls -la mlruns/`",
        commandPattern: /^ls.*mlruns/,
        successMessage: "MLflow tracked your experiment!",
      },
    ],
    completionMessage: "🎉 You've completed your first MLOps exercise! You understand how ML experiments are tracked and managed.",
  },
]

// Helper function to get exercises for a specific lab
export function getExercisesForLab(labId: string): LabExercise[] {
  return labExercises.filter((ex) => ex.labId === labId)
}

// Helper function to get exercise by ID
export function getExerciseById(exerciseId: string): LabExercise | undefined {
  return labExercises.find((ex) => ex.id === exerciseId)
}

// Validate a command against a step
export function validateCommand(
  step: LabStep,
  command: string
): { valid: boolean; message: string } {
  const trimmedCommand = command.trim()

  // Exact match
  if (step.command && trimmedCommand === step.command) {
    return { valid: true, message: step.successMessage }
  }

  // Pattern match
  if (step.commandPattern && step.commandPattern.test(trimmedCommand)) {
    return { valid: true, message: step.successMessage }
  }

  return {
    valid: false,
    message: step.hint || "That's not quite right. Check the expected command format.",
  }
}
