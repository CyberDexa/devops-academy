// Detailed lesson content generator
// Provides comprehensive explanations for DevOps concepts

interface ContentSection {
  title: string;
  content: string;
}

interface DetailedContent {
  introduction: string;
  whyItMatters: string;
  concepts: ContentSection[];
  stepByStep: ContentSection[];
  commonMistakes: string[];
  bestPractices: string[];
  realWorldExample: string;
  summary: string;
  nextSteps: string;
}

// Detailed explanations for each lesson - using regular strings with escaped backticks
export const lessonDetails: Record<string, DetailedContent> = {
  'linux-fundamentals': {
    introduction: 
      "Welcome to your first step in the DevOps journey! Linux is the backbone of modern infrastructure - " +
      "over 96% of the world's top 1 million servers run on Linux, and nearly all cloud platforms use it " +
      "as their foundation. Whether you're deploying applications on AWS, managing Kubernetes clusters, " +
      "or building CI/CD pipelines, you'll be working with Linux every single day.\n\n" +
      "This lesson will teach you how to navigate and control a Linux system like a pro. By the end, " +
      "you'll feel confident moving around the file system, managing files, and understanding how " +
      "Linux organizes everything.",

    whyItMatters: 
      "**Why Linux Skills Are Essential for DevOps:**\n\n" +
      "1. **Cloud Infrastructure**: AWS, GCP, and Azure all run Linux under the hood\n" +
      "2. **Containers**: Docker containers are built on Linux (even on Mac/Windows!)\n" +
      "3. **Automation**: Most DevOps tools are designed for Linux environments\n" +
      "4. **Troubleshooting**: When production goes down at 3 AM, you need to SSH in and fix things fast\n" +
      "5. **Cost**: Linux is free and open-source, saving companies millions in licensing fees\n\n" +
      "Think of Linux as the \"language\" that servers speak. Just like learning English opens doors " +
      "to global communication, learning Linux opens doors to managing any server in the world.",

    concepts: [
      {
        title: 'The Linux File System Hierarchy',
        content: 
          "Unlike Windows with its C:, D: drives, Linux organizes everything under a single root directory: /\n\n" +
          "Here's what each important directory contains:\n\n" +
          "```\n" +
          "/                   → The root - everything starts here\n" +
          "├── /home           → User home directories (like C:\\Users in Windows)\n" +
          "├── /etc            → Configuration files (think \"settings\")\n" +
          "├── /var            → Variable data (logs, databases, websites)\n" +
          "├── /tmp            → Temporary files (cleared on reboot)\n" +
          "├── /opt            → Optional/third-party software\n" +
          "├── /usr            → User programs and utilities\n" +
          "└── /root           → Root user's home directory\n" +
          "```\n\n" +
          "**💡 Pro Tip**: When you see a path like `/var/log/nginx/error.log`, read it as:\n" +
          "\"Start at root → go to var folder → go to log folder → go to nginx folder → find error.log\""
      },
      {
        title: 'Understanding File Permissions',
        content: 
          "Every file in Linux has permissions that control who can do what. When you run `ls -la`, " +
          "you'll see something like:\n\n" +
          "```\n" +
          "-rwxr-xr-- 1 john developers 4096 Dec 24 10:00 deploy.sh\n" +
          "```\n\n" +
          "Let's break this down piece by piece:\n\n" +
          "**The Permission String: -rwxr-xr--**\n\n" +
          "| Position | Meaning |\n" +
          "|----------|---------||\n" +
          "| - | File type (- = file, d = directory, l = link) |\n" +
          "| rwx | Owner can Read, Write, eXecute |\n" +
          "| r-x | Group can Read and eXecute (no write) |\n" +
          "| r-- | Others can only Read |\n\n" +
          "**Think of it like a building:**\n" +
          "- **Owner (u)**: The person who created the file - like the building owner\n" +
          "- **Group (g)**: A team who can access it - like employees with keycards\n" +
          "- **Others (o)**: Everyone else - like the general public\n\n" +
          "**Common Permission Numbers:**\n" +
          "- `755` = rwxr-xr-x → Owner can do everything, others can read/execute (good for scripts)\n" +
          "- `644` = rw-r--r-- → Owner can read/write, others can only read (good for config files)\n" +
          "- `700` = rwx------ → Only owner can access (good for private keys)"
      },
      {
        title: 'Essential Navigation Commands',
        content: 
          "Here are the commands you'll use every single day:\n\n" +
          "**Moving Around:**\n\n" +
          "```bash\n" +
          "pwd           # Print Working Directory - \"Where am I?\"\n" +
          "cd /var/log   # Change Directory - go to /var/log\n" +
          "cd ..         # Go up one level (parent directory)\n" +
          "cd ~          # Go to your home directory\n" +
          "cd -          # Go back to previous directory\n" +
          "```\n\n" +
          "**Listing Files:**\n\n" +
          "```bash\n" +
          "ls            # List files in current directory\n" +
          "ls -l         # Long format (permissions, size, date)\n" +
          "ls -la        # Include hidden files (starting with .)\n" +
          "ls -lh        # Human-readable sizes (KB, MB, GB)\n" +
          "ls -lt        # Sort by modification time (newest first)\n" +
          "```\n\n" +
          "**Pro Tip:** Use Tab for autocomplete! Type `cd /va` then press Tab → `cd /var/`"
      },
      {
        title: 'File Operations',
        content: 
          "Create, copy, move, and delete files like a pro:\n\n" +
          "**Creating Files and Directories:**\n\n" +
          "```bash\n" +
          "mkdir logs                    # Create a directory\n" +
          "mkdir -p projects/web/app     # Create nested directories (-p = parents)\n" +
          "touch config.txt              # Create empty file (or update timestamp)\n" +
          "echo \"Hello\" > file.txt       # Create file with content\n" +
          "```\n\n" +
          "**Copying and Moving:**\n\n" +
          "```bash\n" +
          "cp file.txt backup.txt        # Copy a file\n" +
          "cp -r folder/ backup/         # Copy a directory (-r = recursive)\n" +
          "mv old.txt new.txt            # Rename a file\n" +
          "mv file.txt /tmp/             # Move file to another directory\n" +
          "```\n\n" +
          "**Deleting (BE CAREFUL!):**\n\n" +
          "```bash\n" +
          "rm file.txt                   # Delete a file (no confirmation!)\n" +
          "rm -i file.txt                # Delete with confirmation\n" +
          "rm -r folder/                 # Delete directory and contents\n" +
          "rm -rf folder/                # Force delete (DANGEROUS - no confirmation)\n" +
          "```\n\n" +
          "**⚠️ WARNING**: `rm -rf` is the most dangerous command in Linux. There is NO recycle bin. Triple-check before running!"
      }
    ],
    stepByStep: [
      {
        title: 'Practice: Navigate Your First Linux System',
        content: 
          "Try these commands in order:\n\n" +
          "```bash\n" +
          "# 1. Find out where you are\n" +
          "pwd\n\n" +
          "# 2. Go to the system logs\n" +
          "cd /var/log\n" +
          "ls -la\n\n" +
          "# 3. Go back home and create a practice directory\n" +
          "cd ~\n" +
          "mkdir -p practice/linux/day1\n" +
          "cd practice/linux/day1\n\n" +
          "# 4. Create some files\n" +
          "touch notes.txt script.sh data.csv\n" +
          "echo \"Learning Linux is fun!\" > notes.txt\n" +
          "cat notes.txt\n\n" +
          "# 5. Check your work\n" +
          "ls -la\n" +
          "```\n\n" +
          "**Congratulations!** You just performed basic Linux navigation and file operations."
      },
      {
        title: 'Practice: Understanding Permissions',
        content: 
          "Let's practice with permissions:\n\n" +
          "```bash\n" +
          "# 1. Create a script\n" +
          "echo '#!/bin/bash' > hello.sh\n" +
          "echo 'echo \"Hello, DevOps!\"' >> hello.sh\n\n" +
          "# 2. Try to run it (will fail)\n" +
          "./hello.sh   # Permission denied!\n\n" +
          "# 3. Check permissions\n" +
          "ls -l hello.sh   # -rw-r--r-- (no execute)\n\n" +
          "# 4. Add execute permission\n" +
          "chmod +x hello.sh\n\n" +
          "# 5. Check again and run\n" +
          "ls -l hello.sh   # -rwxr-xr-x (now has execute)\n" +
          "./hello.sh   # Hello, DevOps!\n" +
          "```\n\n" +
          "**Key insight:** Scripts need execute (x) permission to run!"
      }
    ],
    commonMistakes: [
      "Using `rm -rf /` or `rm -rf *` without being 100% sure of your location",
      "Forgetting that Linux is case-sensitive (File.txt ≠ file.txt)",
      "Not using quotes around filenames with spaces",
      "Running commands as root when not necessary (security risk)",
      "Not reading error messages - they usually tell you exactly what's wrong"
    ],
    bestPractices: [
      "Always use `pwd` before running dangerous commands like `rm -rf`",
      "Use Tab completion to avoid typos",
      "Create aliases for common long commands",
      "Read man pages: `man ls`, `man chmod`, etc.",
      "Use `ls -la` before deleting to see what you're about to remove",
      "Practice on a VM or container before touching production servers"
    ],
    realWorldExample: 
      "**Scenario: Debugging a Production Issue at 2 AM**\n\n" +
      "Your monitoring alerts you that the web server is returning errors. Here's what you do:\n\n" +
      "```bash\n" +
      "# 1. SSH into the server\n" +
      "ssh admin@web-server-01\n\n" +
      "# 2. Check if the web server is running\n" +
      "systemctl status nginx\n\n" +
      "# 3. Check recent logs\n" +
      "tail -100 /var/log/nginx/error.log\n\n" +
      "# 4. Check disk space (common cause of issues!)\n" +
      "df -h\n\n" +
      "# 5. Check memory\n" +
      "free -h\n" +
      "```\n\n" +
      "This is your daily life in DevOps. Master these commands and you'll solve problems faster than anyone!",

    summary: 
      "## 📝 Key Takeaways\n\n" +
      "1. **Linux organizes everything** under a single root directory (/)\n" +
      "2. **Permissions** control who can read, write, and execute files\n" +
      "3. **Navigation commands**: pwd, cd, ls are your best friends\n" +
      "4. **File operations**: mkdir, touch, cp, mv, rm\n" +
      "5. **Tab completion** saves time and prevents typos\n" +
      "6. **Be careful with rm -rf** - there's no undo!\n" +
      "7. **Practice daily** - these commands become muscle memory",

    nextSteps: 
      "**What's Next?**\n\n" +
      "Now that you can navigate Linux, you're ready for:\n" +
      "- **Shell Scripting**: Automate tasks with bash scripts\n" +
      "- **Package Management**: Install software with apt, yum, or brew\n" +
      "- **Process Management**: Monitor and control running programs\n" +
      "- **Networking**: Configure IPs, check ports, troubleshoot connections"
  },

  'advanced-shell-scripting': {
    introduction: 
      "Now that you know the basics of Linux, it's time to level up with shell scripting!\n\n" +
      "Shell scripting is where Linux transforms from a tool into a superpower. Instead of typing " +
      "the same commands over and over, you write them once in a script and let the computer do the work. " +
      "Every DevOps engineer needs to be proficient in shell scripting - it's the glue that holds automation together.\n\n" +
      "In this lesson, you'll learn to write professional shell scripts that can automate deployments, " +
      "monitor systems, and save you hours of repetitive work.",

    whyItMatters: 
      "**Why Shell Scripting is Essential:**\n\n" +
      "1. **Automation**: Turn 50 manual steps into one command\n" +
      "2. **Consistency**: Scripts do the same thing every time (humans don't)\n" +
      "3. **Documentation**: Your script IS your documentation\n" +
      "4. **Reusability**: Write once, use forever\n" +
      "5. **Foundation for DevOps**: CI/CD pipelines, Ansible, Docker - all use shell scripts\n\n" +
      "**Real-world example:** A deployment that takes 30 minutes manually can be done in 30 seconds " +
      "with a script. Multiply that by deploying 10 times a day, and you've saved hours!",

    concepts: [
      {
        title: 'Script Structure and Best Practices',
        content: 
          "Every good shell script starts with a proper structure:\n\n" +
          "```bash\n" +
          "#!/bin/bash\n" +
          "# ====================================\n" +
          "# Script Name: deploy.sh\n" +
          "# Description: Deploys application to production\n" +
          "# Author: Your Name\n" +
          "# ====================================\n\n" +
          "set -euo pipefail  # Exit on error, undefined vars, pipe failures\n\n" +
          "# Configuration\n" +
          "readonly APP_NAME=\"my-app\"\n" +
          "readonly LOG_FILE=\"/var/log/deploy.log\"\n\n" +
          "# Functions\n" +
          "log() {\n" +
          "    echo \"[$(date +'%Y-%m-%d %H:%M:%S')] $1\"\n" +
          "}\n\n" +
          "# Main script\n" +
          "main() {\n" +
          "    log \"Starting deployment...\"\n" +
          "    # Your code here\n" +
          "    log \"Deployment complete!\"\n" +
          "}\n\n" +
          "# Run main function\n" +
          "main \"$@\"\n" +
          "```\n\n" +
          "**Key elements:**\n" +
          "- **Shebang (#!/bin/bash)**: Tells the system which interpreter to use\n" +
          "- **Header comment**: What the script does and how to use it\n" +
          "- **set -euo pipefail**: Makes script safer by failing fast\n" +
          "- **readonly variables**: Constants that can't be changed\n" +
          "- **Functions**: Reusable blocks of code"
      },
      {
        title: 'Variables: Storing and Using Data',
        content: 
          "Variables let you store information and reuse it throughout your script.\n\n" +
          "**Creating Variables:**\n\n" +
          "```bash\n" +
          "# No spaces around the = sign!\n" +
          "name=\"John\"           # ✅ Correct\n" +
          "name = \"John\"         # ❌ Wrong (spaces cause errors)\n\n" +
          "# Using variables (need the $ sign)\n" +
          "echo \"Hello, $name\"   # Output: Hello, John\n\n" +
          "# Command output as a variable\n" +
          "current_date=$(date +%Y-%m-%d)\n" +
          "echo \"Today is $current_date\"\n" +
          "```\n\n" +
          "**Special Variables:**\n\n" +
          "| Variable | Meaning |\n" +
          "|----------|---------||\n" +
          "| `$0` | Script name |\n" +
          "| `$1, $2...` | Arguments passed |\n" +
          "| `$#` | Number of arguments |\n" +
          "| `$@` | All arguments |\n" +
          "| `$?` | Exit code of last command |"
      },
      {
        title: 'Conditionals: Making Decisions',
        content: 
          "Scripts need to make decisions. \"If this, then do that.\"\n\n" +
          "**Basic If Statement:**\n\n" +
          "```bash\n" +
          "age=25\n\n" +
          "if [[ $age -ge 18 ]]; then\n" +
          "    echo \"You can vote!\"\n" +
          "else\n" +
          "    echo \"Too young to vote\"\n" +
          "fi\n" +
          "```\n\n" +
          "**Important**: The spaces inside [[ ]] are REQUIRED!\n\n" +
          "**File Tests:**\n\n" +
          "```bash\n" +
          "if [[ -f \"config.txt\" ]]; then\n" +
          "    echo \"Config file exists\"\n" +
          "fi\n\n" +
          "if [[ -d \"/var/log\" ]]; then\n" +
          "    echo \"Directory exists\"\n" +
          "fi\n" +
          "```\n\n" +
          "**Common file tests:**\n" +
          "- `-f` file exists and is a regular file\n" +
          "- `-d` directory exists\n" +
          "- `-e` file exists (any type)\n" +
          "- `-r` file is readable\n" +
          "- `-w` file is writable\n" +
          "- `-x` file is executable"
      },
      {
        title: 'Loops: Repeating Actions',
        content: 
          "Loops let you repeat actions without duplicating code.\n\n" +
          "**For Loop - iterate over a list:**\n\n" +
          "```bash\n" +
          "# Loop over a list\n" +
          "for server in web01 web02 web03; do\n" +
          "    echo \"Deploying to $server...\"\n" +
          "done\n\n" +
          "# Loop over files\n" +
          "for file in *.log; do\n" +
          "    echo \"Processing $file\"\n" +
          "    gzip \"$file\"\n" +
          "done\n\n" +
          "# Loop with numbers\n" +
          "for i in {1..5}; do\n" +
          "    echo \"Iteration $i\"\n" +
          "done\n" +
          "```\n\n" +
          "**While Loop - repeat while condition is true:**\n\n" +
          "```bash\n" +
          "count=1\n" +
          "while [[ $count -le 5 ]]; do\n" +
          "    echo \"Count: $count\"\n" +
          "    ((count++))\n" +
          "done\n" +
          "```"
      }
    ],
    stepByStep: [
      {
        title: 'Build a Health Check Script',
        content: 
          "Let's build a practical script that checks if a website is up:\n\n" +
          "```bash\n" +
          "#!/bin/bash\n" +
          "# health-check.sh - Check if a website is responding\n\n" +
          "set -euo pipefail\n\n" +
          "# Check if URL provided\n" +
          "if [[ $# -eq 0 ]]; then\n" +
          "    echo \"Usage: $0 <url>\"\n" +
          "    exit 1\n" +
          "fi\n\n" +
          "url=$1\n" +
          "max_attempts=3\n" +
          "attempt=1\n\n" +
          "while [[ $attempt -le $max_attempts ]]; do\n" +
          "    if curl -sf --max-time 10 \"$url\" > /dev/null; then\n" +
          "        echo \"✅ $url is UP\"\n" +
          "        exit 0\n" +
          "    else\n" +
          "        echo \"⚠️  Attempt $attempt failed\"\n" +
          "        ((attempt++))\n" +
          "        sleep 2\n" +
          "    fi\n" +
          "done\n\n" +
          "echo \"❌ $url is DOWN\"\n" +
          "exit 1\n" +
          "```"
      }
    ],
    commonMistakes: [
      "Forgetting to quote variables: Use \"$var\" not $var",
      "Spaces around = in assignments: var=\"value\" not var = \"value\"",
      "Using [[ ]] without spaces inside",
      "Forgetting 'then' after if condition",
      "Not handling errors (use set -e or check $?)"
    ],
    bestPractices: [
      "Always start with #!/bin/bash and set -euo pipefail",
      "Use functions to organize code",
      "Quote all variables: \"$var\"",
      "Use meaningful variable names",
      "Add comments explaining WHY, not what",
      "Test scripts with bash -n script.sh (syntax check)"
    ],
    realWorldExample: 
      "**Production Deployment Script:**\n\n" +
      "```bash\n" +
      "#!/bin/bash\n" +
      "set -euo pipefail\n\n" +
      "readonly APP_NAME=\"myapp\"\n\n" +
      "log_info()  { echo \"[INFO] $1\"; }\n" +
      "log_error() { echo \"[ERROR] $1\" >&2; }\n\n" +
      "main() {\n" +
      "    local version=$1\n" +
      "    log_info \"Deploying version $version\"\n" +
      "    \n" +
      "    docker pull \"mycompany/$APP_NAME:$version\"\n" +
      "    docker stop \"$APP_NAME\" || true\n" +
      "    docker run -d --name \"$APP_NAME\" \"mycompany/$APP_NAME:$version\"\n" +
      "    \n" +
      "    log_info \"Deployment complete!\"\n" +
      "}\n\n" +
      "main \"$@\"\n" +
      "```",

    summary: 
      "## 📝 Key Takeaways\n\n" +
      "1. **Always use shebang** (#!/bin/bash) and **set -euo pipefail**\n" +
      "2. **Variables** store data, use `$var` to access, always quote them\n" +
      "3. **Conditionals** use `[[ ]]` with spaces\n" +
      "4. **Loops**: for iterates over lists, while repeats until condition fails\n" +
      "5. **Functions** make code reusable\n" +
      "6. **Error handling** is crucial - check exit codes",

    nextSteps: 
      "**What's Next?**\n\n" +
      "You're now dangerous with shell scripts! Next up:\n" +
      "- **AWK and SED**: Advanced text processing\n" +
      "- **Regular Expressions**: Pattern matching\n" +
      "- **Cron Jobs**: Scheduling scripts"
  },

  'docker-basics': {
    introduction: 
      "Welcome to the world of containers! Docker has revolutionized how we build, ship, and run applications. " +
      "Before Docker, deploying software was a nightmare - \"it works on my machine\" was the most frustrating " +
      "phrase in software development. Docker solved this by packaging applications with ALL their dependencies.\n\n" +
      "Think of Docker like shipping containers for software. Just like physical shipping containers can be " +
      "loaded onto any ship, train, or truck, Docker containers can run on any computer that has Docker installed.",

    whyItMatters: 
      "**Why Docker is Essential:**\n\n" +
      "1. **Consistency**: Same container runs identically everywhere\n" +
      "2. **Isolation**: Applications don't interfere with each other\n" +
      "3. **Speed**: Containers start in seconds, not minutes\n" +
      "4. **Efficiency**: Multiple containers share the same OS kernel\n" +
      "5. **DevOps enabler**: Foundation for Kubernetes, CI/CD, microservices\n\n" +
      "**The \"Works on My Machine\" Problem - SOLVED:**\n" +
      "- Developer: \"It works on my Mac\"\n" +
      "- Ops: \"It breaks on Linux servers\"\n" +
      "- Docker: \"It works EVERYWHERE\"",

    concepts: [
      {
        title: 'Containers vs Virtual Machines',
        content: 
          "**Virtual Machines:**\n" +
          "- Each VM has its own full operating system\n" +
          "- Heavy (GBs of disk space)\n" +
          "- Slow to start (minutes)\n\n" +
          "**Containers:**\n" +
          "- Share the host OS kernel\n" +
          "- Lightweight (MBs of disk space)\n" +
          "- Fast to start (seconds)\n\n" +
          "**Bottom line:** Containers are faster, lighter, and more efficient."
      },
      {
        title: 'Docker Core Concepts',
        content: 
          "**Key Terms:**\n\n" +
          "| Term | Meaning | Analogy |\n" +
          "|------|---------|---------||\n" +
          "| **Image** | Blueprint/template | Recipe |\n" +
          "| **Container** | Running instance | Cooked dish |\n" +
          "| **Dockerfile** | Instructions to build image | Recipe card |\n" +
          "| **Registry** | Image storage | Recipe book |\n" +
          "| **Volume** | Persistent storage | Tupperware |\n\n" +
          "**The Docker Workflow:**\n\n" +
          "```\n" +
          "1. Write Dockerfile  →  Instructions\n" +
          "2. docker build      →  Create image\n" +
          "3. docker run        →  Start container\n" +
          "4. docker push       →  Share image\n" +
          "```"
      },
      {
        title: 'Essential Docker Commands',
        content: 
          "**Running Containers:**\n\n" +
          "```bash\n" +
          "# Run a container\n" +
          "docker run nginx\n\n" +
          "# Run in background (-d = detached)\n" +
          "docker run -d nginx\n\n" +
          "# Run with port mapping (-p host:container)\n" +
          "docker run -d -p 8080:80 nginx\n\n" +
          "# Run with a name\n" +
          "docker run -d --name my-web -p 8080:80 nginx\n" +
          "```\n\n" +
          "**Managing Containers:**\n\n" +
          "```bash\n" +
          "docker ps              # List running containers\n" +
          "docker ps -a           # List ALL containers\n" +
          "docker stop my-web     # Stop a container\n" +
          "docker rm my-web       # Remove a container\n" +
          "docker logs my-web     # View container logs\n" +
          "```\n\n" +
          "**Working with Images:**\n\n" +
          "```bash\n" +
          "docker images          # List images\n" +
          "docker pull nginx      # Pull an image\n" +
          "docker build -t my-app:v1 .  # Build from Dockerfile\n" +
          "```\n\n" +
          "**Pro tip:** Always use specific tags (nginx:1.25) not 'latest' in production!"
      }
    ],
    stepByStep: [
      {
        title: 'Run Your First Container',
        content: 
          "Let's run a simple web server:\n\n" +
          "```bash\n" +
          "# Step 1: Pull the nginx image\n" +
          "docker pull nginx\n\n" +
          "# Step 2: Run it with port mapping\n" +
          "docker run -d --name my-nginx -p 8080:80 nginx\n\n" +
          "# Step 3: Verify it's running\n" +
          "docker ps\n\n" +
          "# Step 4: Open in browser\n" +
          "# Go to http://localhost:8080\n\n" +
          "# Step 5: Stop and remove\n" +
          "docker stop my-nginx\n" +
          "docker rm my-nginx\n" +
          "```"
      },
      {
        title: 'Build Your First Docker Image',
        content: 
          "Create a simple Node.js app with Docker:\n\n" +
          "**Step 1: Create app.js**\n\n" +
          "```javascript\n" +
          "const http = require('http');\n\n" +
          "const server = http.createServer((req, res) => {\n" +
          "  res.end('Hello from Docker!\\n');\n" +
          "});\n\n" +
          "server.listen(3000);\n" +
          "```\n\n" +
          "**Step 2: Create Dockerfile**\n\n" +
          "```dockerfile\n" +
          "FROM node:20-alpine\n" +
          "WORKDIR /app\n" +
          "COPY app.js .\n" +
          "EXPOSE 3000\n" +
          "CMD [\"node\", \"app.js\"]\n" +
          "```\n\n" +
          "**Step 3: Build and run**\n\n" +
          "```bash\n" +
          "docker build -t my-node-app .\n" +
          "docker run -d -p 3000:3000 my-node-app\n" +
          "curl http://localhost:3000\n" +
          "```"
      }
    ],
    commonMistakes: [
      "Using 'latest' tag in production (unpredictable)",
      "Running containers as root (security risk)",
      "Not cleaning up unused images/containers",
      "Putting secrets in Dockerfiles",
      "Not using .dockerignore"
    ],
    bestPractices: [
      "Use specific image tags (nginx:1.25, not nginx:latest)",
      "Keep images small (use alpine base images)",
      "Use multi-stage builds for production",
      "Don't run as root inside containers",
      "One process per container"
    ],
    realWorldExample: 
      "**Production Node.js Dockerfile:**\n\n" +
      "```dockerfile\n" +
      "# Build stage\n" +
      "FROM node:20-alpine AS builder\n" +
      "WORKDIR /app\n" +
      "COPY package*.json ./\n" +
      "RUN npm ci --only=production\n" +
      "COPY . .\n" +
      "RUN npm run build\n\n" +
      "# Production stage\n" +
      "FROM node:20-alpine\n" +
      "WORKDIR /app\n" +
      "RUN adduser -S nodejs\n" +
      "COPY --from=builder /app/dist ./dist\n" +
      "COPY --from=builder /app/node_modules ./node_modules\n" +
      "USER nodejs\n" +
      "EXPOSE 3000\n" +
      "CMD [\"node\", \"dist/index.js\"]\n" +
      "```\n\n" +
      "**Why this is good:**\n" +
      "- Multi-stage build (small final image)\n" +
      "- Non-root user (security)\n" +
      "- Only production dependencies",

    summary: 
      "## 📝 Key Takeaways\n\n" +
      "1. **Images** are blueprints, **containers** are running instances\n" +
      "2. **docker run** creates and starts containers\n" +
      "3. **docker build** creates images from Dockerfiles\n" +
      "4. **Port mapping** (-p host:container) exposes services\n" +
      "5. **Use specific tags** in production\n" +
      "6. **Keep images small** with Alpine and multi-stage builds",

    nextSteps: 
      "**What's Next?**\n\n" +
      "Now that you can run containers:\n" +
      "- **Docker Compose**: Multi-container applications\n" +
      "- **Docker Networking**: Container communication\n" +
      "- **Docker Volumes**: Persistent data storage"
  },

  'git-fundamentals-daily-workflow': {
    introduction: 
      "Welcome to Git - the most important tool you'll use every single day as a developer!\n\n" +
      "Git is a version control system, which means it tracks changes to your code over time. " +
      "Think of it as an \"unlimited undo\" button combined with a time machine for your code.\n\n" +
      "Before Git, developers would name files like: \"project_final.zip\", \"project_final_v2.zip\", " +
      "\"project_final_v2_REALLY_FINAL.zip\"... Git solved this chaos.\n\n" +
      "Created by Linus Torvalds (also created Linux!), Git is now used by 90%+ of developers worldwide.",

    whyItMatters: 
      "**Why Git is Essential:**\n\n" +
      "1. **Track every change**: See who changed what, when, and why\n" +
      "2. **Undo mistakes**: Roll back to any previous version instantly\n" +
      "3. **Collaborate**: Multiple people can work on the same code\n" +
      "4. **Experiment safely**: Create branches to try new ideas\n" +
      "5. **Deploy with confidence**: Know exactly what code is in production\n\n" +
      "**Git is NOT optional** - every DevOps job requires Git proficiency.",

    concepts: [
      {
        title: 'How Git Thinks',
        content: 
          "Git tracks your project as a series of **snapshots** (commits).\n\n" +
          "**Key Concepts:**\n\n" +
          "| Term | Meaning |\n" +
          "|------|---------||\n" +
          "| **Repository (Repo)** | Your project folder tracked by Git |\n" +
          "| **Commit** | A snapshot of your code at a point in time |\n" +
          "| **Branch** | A separate line of development |\n" +
          "| **HEAD** | Pointer to your current location |\n" +
          "| **Remote** | A copy of your repo on a server (GitHub) |\n\n" +
          "**The Three Areas:**\n\n" +
          "```\n" +
          "Working Directory  →  Staging Area  →  Repository\n" +
          "   (your files)      (ready to commit) (saved forever)\n" +
          "```"
      },
      {
        title: 'Daily Git Commands',
        content: 
          "**Making Changes:**\n\n" +
          "```bash\n" +
          "# Check status (what's changed?)\n" +
          "git status\n\n" +
          "# See what changed in files\n" +
          "git diff\n\n" +
          "# Stage changes for commit\n" +
          "git add filename.js      # Add specific file\n" +
          "git add .                # Add all changes\n\n" +
          "# Commit changes (save snapshot)\n" +
          "git commit -m \"Add login feature\"\n\n" +
          "# View history\n" +
          "git log --oneline\n" +
          "```\n\n" +
          "**Syncing with Remote:**\n\n" +
          "```bash\n" +
          "git pull     # Download changes from remote\n" +
          "git push     # Upload your changes\n" +
          "```\n\n" +
          "**The Daily Workflow:**\n\n" +
          "```bash\n" +
          "git pull                           # Morning: Get latest code\n" +
          "git add .                          # Stage your changes\n" +
          "git commit -m \"Fix bug in login\"   # Commit\n" +
          "git push                           # End of day: Push changes\n" +
          "```"
      },
      {
        title: 'Branching: Your Safety Net',
        content: 
          "Branches let you work on features without affecting the main code.\n\n" +
          "**Branch Commands:**\n\n" +
          "```bash\n" +
          "# Create a new branch\n" +
          "git branch feature-login\n\n" +
          "# Switch to a branch\n" +
          "git checkout feature-login\n\n" +
          "# Create and switch in one command\n" +
          "git checkout -b feature-login\n\n" +
          "# List all branches\n" +
          "git branch\n" +
          "```\n\n" +
          "**Best Practice Workflow:**\n\n" +
          "```bash\n" +
          "# 1. Create feature branch\n" +
          "git checkout -b feature-login\n\n" +
          "# 2. Make changes and commit\n" +
          "git add .\n" +
          "git commit -m \"Add login form\"\n\n" +
          "# 3. Push branch to remote\n" +
          "git push -u origin feature-login\n\n" +
          "# 4. Create Pull Request on GitHub\n" +
          "# 5. After merge, clean up\n" +
          "git checkout main\n" +
          "git pull\n" +
          "git branch -d feature-login\n" +
          "```"
      },
      {
        title: 'Fixing Mistakes',
        content: 
          "Everyone makes mistakes. Git makes them easy to fix!\n\n" +
          "**Undo Uncommitted Changes:**\n\n" +
          "```bash\n" +
          "# Discard changes in a file\n" +
          "git checkout -- filename.js\n\n" +
          "# Unstage a file (keep changes)\n" +
          "git reset HEAD filename.js\n" +
          "```\n\n" +
          "**Fix Last Commit:**\n\n" +
          "```bash\n" +
          "# Change commit message\n" +
          "git commit --amend -m \"New message\"\n\n" +
          "# Add forgotten file to last commit\n" +
          "git add forgotten-file.js\n" +
          "git commit --amend --no-edit\n" +
          "```\n\n" +
          "**Nuclear Options (use carefully!):**\n\n" +
          "```bash\n" +
          "# Undo last commit, keep changes\n" +
          "git reset --soft HEAD~1\n\n" +
          "# Undo last commit, discard changes\n" +
          "git reset --hard HEAD~1\n" +
          "```"
      }
    ],
    stepByStep: [
      {
        title: 'Your First Git Repository',
        content: 
          "Let's create a project and track it with Git:\n\n" +
          "```bash\n" +
          "# 1. Create project directory\n" +
          "mkdir my-project\n" +
          "cd my-project\n\n" +
          "# 2. Initialize Git\n" +
          "git init\n\n" +
          "# 3. Create a file\n" +
          "echo \"# My Project\" > README.md\n\n" +
          "# 4. Stage the file\n" +
          "git add README.md\n\n" +
          "# 5. Commit\n" +
          "git commit -m \"Initial commit: Add README\"\n\n" +
          "# 6. View history\n" +
          "git log\n" +
          "```"
      }
    ],
    commonMistakes: [
      "Committing directly to main (use branches!)",
      "Vague commit messages like 'fix' or 'update'",
      "Not pulling before pushing (causes conflicts)",
      "Committing passwords or API keys",
      "Giant commits with many unrelated changes"
    ],
    bestPractices: [
      "Write clear commit messages: 'Add user authentication' not 'stuff'",
      "Commit often - small, focused commits are easier to review",
      "Pull before you push to avoid conflicts",
      "Use branches for features, never commit directly to main",
      "Use .gitignore for files that shouldn't be tracked"
    ],
    realWorldExample: 
      "**A Typical Developer's Day:**\n\n" +
      "```bash\n" +
      "# Morning - start fresh\n" +
      "git checkout main\n" +
      "git pull\n\n" +
      "# Start new feature\n" +
      "git checkout -b feature/user-profile\n\n" +
      "# Work on feature\n" +
      "git add .\n" +
      "git commit -m \"Add user profile page\"\n\n" +
      "# Push to GitHub\n" +
      "git push -u origin feature/user-profile\n\n" +
      "# Create Pull Request, get review, merge\n\n" +
      "# Clean up\n" +
      "git checkout main\n" +
      "git pull\n" +
      "git branch -d feature/user-profile\n" +
      "```",

    summary: 
      "## 📝 Key Takeaways\n\n" +
      "1. **Git tracks snapshots** of your code over time\n" +
      "2. **Staging area** is where you prepare commits\n" +
      "3. **Commits are snapshots** with who, when, and WHY\n" +
      "4. **Branches isolate work** so you can experiment safely\n" +
      "5. **Always pull before push** to avoid conflicts\n" +
      "6. **Write good commit messages** - your future self will thank you!",

    nextSteps: 
      "**What's Next?**\n\n" +
      "You've mastered Git basics! Next up:\n" +
      "- **GitHub/GitLab**: Sharing code and collaborating\n" +
      "- **Pull Requests**: Code review workflow\n" +
      "- **Git workflows**: GitFlow, trunk-based development"
  },

  'ssh-remote-management': {
    introduction: 
      "SSH (Secure Shell) is your gateway to the world of remote server management. Every time you " +
      "deploy code to production, access a cloud server, or manage infrastructure, you're likely using SSH. " +
      "It's the secure, encrypted tunnel that lets you control servers from anywhere in the world.\n\n" +
      "In this lesson, you'll learn how SSH works, how to set up passwordless authentication with SSH keys, " +
      "and master the essential commands for remote server administration. By the end, you'll be confidently " +
      "connecting to servers, transferring files, and even setting up secure tunnels like a DevOps pro.",

    whyItMatters: 
      "**Why SSH Skills Are Critical for DevOps:**\n\n" +
      "1. **Server Access**: 99% of Linux servers are managed via SSH - it's the universal remote control\n" +
      "2. **Security**: SSH encrypts all traffic, protecting your credentials and data from eavesdroppers\n" +
      "3. **Automation**: CI/CD pipelines use SSH to deploy code and run commands on remote servers\n" +
      "4. **Git Operations**: When you `git push` to GitHub/GitLab, you're using SSH under the hood\n" +
      "5. **Cloud Management**: AWS, GCP, Azure all require SSH for EC2/VM instance access\n\n" +
      "Think of SSH as your secure badge that grants access to any server. Without it, you'd be locked " +
      "out of the infrastructure you need to manage. A DevOps engineer who can't SSH is like a pilot " +
      "who can't fly - fundamentally unable to do the job.",

    concepts: [
      {
        title: 'How SSH Works - The Security Magic',
        content: 
          "SSH creates a secure, encrypted tunnel between your computer and a remote server. Here's how:\n\n" +
          "```\n" +
          "┌─────────────────┐                    ┌─────────────────┐\n" +
          "│  Your Computer  │◄══════════════════►│  Remote Server  │\n" +
          "│                 │   Encrypted SSH    │                 │\n" +
          "│  ssh client     │      Tunnel        │   sshd daemon   │\n" +
          "└─────────────────┘                    └─────────────────┘\n" +
          "```\n\n" +
          "**The SSH Handshake (Simplified):**\n\n" +
          "1. **Connection Request**: You ask to connect to the server\n" +
          "2. **Server Identity**: Server sends its public key (fingerprint)\n" +
          "3. **Key Exchange**: Both sides agree on encryption keys\n" +
          "4. **Authentication**: You prove who you are (password or SSH key)\n" +
          "5. **Encrypted Channel**: All traffic is now encrypted!\n\n" +
          "Everything you type, every file you transfer, is encrypted. Even if someone intercepts " +
          "your traffic, they see only gibberish."
      },
      {
        title: 'SSH Keys - Your Digital Identity',
        content: 
          "Instead of typing passwords (which can be guessed or stolen), SSH keys use cryptography:\n\n" +
          "```\n" +
          "SSH Key Pair\n" +
          "═══════════════════════════════════════════════════════════\n" +
          "                                                           \n" +
          "  Private Key (id_rsa)          Public Key (id_rsa.pub)   \n" +
          "  ┌─────────────────┐          ┌─────────────────┐       \n" +
          "  │ 🔐 KEEP SECRET  │          │ 🌍 SHARE FREELY │       \n" +
          "  │                 │          │                 │       \n" +
          "  │ Lives on YOUR   │   ───►   │ Lives on EVERY  │       \n" +
          "  │ computer only   │          │ server you access│       \n" +
          "  │                 │          │                 │       \n" +
          "  │ ~/.ssh/id_rsa   │          │ ~/.ssh/id_rsa.pub│       \n" +
          "  └─────────────────┘          └─────────────────┘       \n" +
          "                                                           \n" +
          "═══════════════════════════════════════════════════════════\n" +
          "```\n\n" +
          "**How Key Authentication Works:**\n\n" +
          "1. Your public key is stored on the server (~/.ssh/authorized_keys)\n" +
          "2. When you connect, the server sends a challenge encrypted with your public key\n" +
          "3. Only your private key can decrypt it and respond correctly\n" +
          "4. If the response is correct, you're in! No password needed.\n\n" +
          "**Key Types Explained:**\n\n" +
          "| Type | Command | Security | Speed | Notes |\n" +
          "|------|---------|----------|-------|-------|\n" +
          "| RSA | `-t rsa -b 4096` | Good | Fast | Classic, widely supported |\n" +
          "| Ed25519 | `-t ed25519` | Excellent | Fastest | Modern, recommended |\n" +
          "| ECDSA | `-t ecdsa` | Good | Fast | Alternative to RSA |"
      },
      {
        title: 'The SSH Config File - Your Connection Shortcuts',
        content: 
          "Tired of typing long SSH commands? The SSH config file is your best friend:\n\n" +
          "**Location**: `~/.ssh/config`\n\n" +
          "```bash\n" +
          "# Instead of typing:\n" +
          "ssh -i ~/.ssh/production-key.pem -p 2222 ubuntu@ec2-54-123-45-67.compute-1.amazonaws.com\n\n" +
          "# You can just type:\n" +
          "ssh production\n" +
          "```\n\n" +
          "**Example SSH Config:**\n\n" +
          "```\n" +
          "# ~/.ssh/config\n\n" +
          "# Default settings for all hosts\n" +
          "Host *\n" +
          "    ServerAliveInterval 60\n" +
          "    ServerAliveCountMax 3\n" +
          "    AddKeysToAgent yes\n\n" +
          "# Production server\n" +
          "Host production\n" +
          "    HostName ec2-54-123-45-67.compute-1.amazonaws.com\n" +
          "    User ubuntu\n" +
          "    Port 2222\n" +
          "    IdentityFile ~/.ssh/production-key.pem\n\n" +
          "# Staging server\n" +
          "Host staging\n" +
          "    HostName staging.example.com\n" +
          "    User deploy\n" +
          "    IdentityFile ~/.ssh/deploy-key\n\n" +
          "# Jump host (bastion)\n" +
          "Host internal-db\n" +
          "    HostName 10.0.1.50\n" +
          "    User admin\n" +
          "    ProxyJump bastion\n" +
          "```\n\n" +
          "**Common Config Options:**\n\n" +
          "| Option | Purpose | Example |\n" +
          "|--------|---------|--------|\n" +
          "| HostName | Real server address | `192.168.1.100` |\n" +
          "| User | Login username | `ubuntu` |\n" +
          "| Port | SSH port (default 22) | `2222` |\n" +
          "| IdentityFile | Private key path | `~/.ssh/mykey` |\n" +
          "| ProxyJump | Connect through bastion | `bastion-host` |"
      },
      {
        title: 'SCP and SFTP - File Transfer Over SSH',
        content: 
          "SSH isn't just for remote shells - it's also for secure file transfer:\n\n" +
          "**SCP (Secure Copy) - Quick Transfers:**\n\n" +
          "```bash\n" +
          "# Copy local file to remote server\n" +
          "scp myfile.txt user@server:/home/user/\n\n" +
          "# Copy from remote to local\n" +
          "scp user@server:/var/log/app.log ./local-copy.log\n\n" +
          "# Copy entire directory recursively\n" +
          "scp -r ./my-project user@server:/var/www/\n\n" +
          "# Copy between two remote servers (through your machine)\n" +
          "scp user1@server1:/data/file user2@server2:/backup/\n" +
          "```\n\n" +
          "**SFTP (SSH File Transfer Protocol) - Interactive Transfers:**\n\n" +
          "```bash\n" +
          "$ sftp user@server\n" +
          "sftp> pwd              # Print remote working directory\n" +
          "sftp> lpwd             # Print LOCAL working directory\n" +
          "sftp> ls               # List remote files\n" +
          "sftp> lls              # List LOCAL files\n" +
          "sftp> get file.txt     # Download file\n" +
          "sftp> put local.txt    # Upload file\n" +
          "sftp> mget *.log       # Download multiple files\n" +
          "sftp> mkdir newdir     # Create remote directory\n" +
          "sftp> exit             # Close connection\n" +
          "```\n\n" +
          "**rsync Over SSH - The Smart Choice:**\n\n" +
          "For large or repeated transfers, rsync is more efficient:\n\n" +
          "```bash\n" +
          "# Sync local folder to remote (only transfers changes!)\n" +
          "rsync -avz -e ssh ./local-folder/ user@server:/remote-folder/\n\n" +
          "# Options explained:\n" +
          "# -a = archive mode (preserves permissions, timestamps)\n" +
          "# -v = verbose output\n" +
          "# -z = compress during transfer\n" +
          "# -e ssh = use SSH for the connection\n" +
          "```"
      },
      {
        title: 'SSH Tunneling - The Secret Weapon',
        content: 
          "SSH tunnels let you access services that aren't directly exposed to the internet:\n\n" +
          "**Local Port Forwarding (Access Remote Service Locally):**\n\n" +
          "```\n" +
          "Scenario: Database is only accessible from the server, not the internet\n" +
          "\n" +
          "┌──────────────┐          ┌──────────────┐          ┌──────────────┐\n" +
          "│ Your Laptop  │──SSH────►│   Server     │─────────►│  Database    │\n" +
          "│              │  Tunnel  │              │  Local   │  (port 5432) │\n" +
          "│ localhost:   │◄─────────│              │  Network │              │\n" +
          "│   5432       │          │              │          │              │\n" +
          "└──────────────┘          └──────────────┘          └──────────────┘\n" +
          "```\n\n" +
          "```bash\n" +
          "# Forward local port 5432 to database server's port 5432\n" +
          "ssh -L 5432:database-server:5432 user@bastion\n\n" +
          "# Now connect to localhost:5432 - it reaches the database!\n" +
          "psql -h localhost -p 5432 -U postgres\n" +
          "```\n\n" +
          "**Remote Port Forwarding (Expose Local Service):**\n\n" +
          "```bash\n" +
          "# Make your local app (port 3000) accessible from the server\n" +
          "ssh -R 8080:localhost:3000 user@server\n\n" +
          "# Now server:8080 connects to your local port 3000\n" +
          "```\n\n" +
          "**Dynamic Port Forwarding (SOCKS Proxy):**\n\n" +
          "```bash\n" +
          "# Create a SOCKS proxy on port 1080\n" +
          "ssh -D 1080 user@server\n\n" +
          "# Configure browser to use localhost:1080 as SOCKS proxy\n" +
          "# All traffic now goes through the server\n" +
          "```"
      }
    ],

    stepByStep: [
      {
        title: 'Step 1: Generate Your SSH Key Pair',
        content: 
          "```bash\n" +
          "# Generate a modern Ed25519 key (recommended)\n" +
          "ssh-keygen -t ed25519 -C \"your.email@example.com\"\n\n" +
          "# You'll see:\n" +
          "# Generating public/private ed25519 key pair.\n" +
          "# Enter file in which to save the key (/home/you/.ssh/id_ed25519): [press Enter]\n" +
          "# Enter passphrase (empty for no passphrase): [enter a strong passphrase]\n" +
          "# Enter same passphrase again: [confirm passphrase]\n\n" +
          "# If you need RSA for older systems:\n" +
          "ssh-keygen -t rsa -b 4096 -C \"your.email@example.com\"\n" +
          "```\n\n" +
          "**⚠️ Passphrase Tips:**\n" +
          "- Always use a passphrase for production keys\n" +
          "- Use a password manager to store it\n" +
          "- For automation, you can use ssh-agent to cache the passphrase"
      },
      {
        title: 'Step 2: Copy Your Public Key to the Server',
        content: 
          "```bash\n" +
          "# The easy way (if available)\n" +
          "ssh-copy-id user@server\n\n" +
          "# You'll be prompted for the password ONE LAST TIME\n" +
          "# After this, you'll never need the password again!\n\n" +
          "# Manual way (if ssh-copy-id isn't available):\n" +
          "cat ~/.ssh/id_ed25519.pub | ssh user@server \"mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys\"\n\n" +
          "# Or if you have access to the server already:\n" +
          "# 1. Copy the content of ~/.ssh/id_ed25519.pub\n" +
          "# 2. SSH into the server with password\n" +
          "# 3. Add it to ~/.ssh/authorized_keys\n" +
          "echo 'your-public-key-content-here' >> ~/.ssh/authorized_keys\n" +
          "```"
      },
      {
        title: 'Step 3: Test Your SSH Connection',
        content: 
          "```bash\n" +
          "# Connect using SSH key (no password should be asked)\n" +
          "ssh user@server\n\n" +
          "# Verbose mode for troubleshooting\n" +
          "ssh -v user@server\n\n" +
          "# Super verbose (for deep debugging)\n" +
          "ssh -vvv user@server\n\n" +
          "# Check which key is being used\n" +
          "ssh -v user@server 2>&1 | grep \"Offering\"\n" +
          "# Output: Offering public key: /home/you/.ssh/id_ed25519\n" +
          "```"
      },
      {
        title: 'Step 4: Set Up SSH Agent (Cache Your Passphrase)',
        content: 
          "```bash\n" +
          "# Start SSH agent\n" +
          "eval \"$(ssh-agent -s)\"\n" +
          "# Output: Agent pid 12345\n\n" +
          "# Add your key (you'll enter passphrase once)\n" +
          "ssh-add ~/.ssh/id_ed25519\n" +
          "# Enter passphrase for /home/you/.ssh/id_ed25519: [your passphrase]\n" +
          "# Identity added: /home/you/.ssh/id_ed25519\n\n" +
          "# List loaded keys\n" +
          "ssh-add -l\n\n" +
          "# On macOS, add to Keychain permanently:\n" +
          "ssh-add --apple-use-keychain ~/.ssh/id_ed25519\n\n" +
          "# Add this to ~/.ssh/config to auto-add keys:\n" +
          "# Host *\n" +
          "#     AddKeysToAgent yes\n" +
          "#     UseKeychain yes  # macOS only\n" +
          "```"
      },
      {
        title: 'Step 5: Configure SSH Config for Easy Access',
        content: 
          "```bash\n" +
          "# Create/edit your SSH config\n" +
          "nano ~/.ssh/config\n\n" +
          "# Add your servers:\n" +
          "# ──────────────────────────────────────\n" +
          "Host myserver\n" +
          "    HostName 192.168.1.100\n" +
          "    User admin\n" +
          "    IdentityFile ~/.ssh/id_ed25519\n\n" +
          "Host aws-prod\n" +
          "    HostName ec2-xx-xx-xx-xx.compute.amazonaws.com\n" +
          "    User ubuntu\n" +
          "    IdentityFile ~/.ssh/aws-prod.pem\n" +
          "    Port 22\n" +
          "# ──────────────────────────────────────\n\n" +
          "# Now connect with just:\n" +
          "ssh myserver\n" +
          "ssh aws-prod\n\n" +
          "# Works with scp and rsync too!\n" +
          "scp file.txt myserver:/home/admin/\n" +
          "```"
      },
      {
        title: 'Step 6: Essential Remote Commands',
        content: 
          "```bash\n" +
          "# Run a single command remotely (without interactive shell)\n" +
          "ssh user@server 'ls -la /var/log'\n" +
          "ssh user@server 'df -h && free -m'\n\n" +
          "# Run multiple commands\n" +
          "ssh user@server 'cd /app && git pull && pm2 restart all'\n\n" +
          "# Run a local script on remote server\n" +
          "ssh user@server 'bash -s' < local-script.sh\n\n" +
          "# Check if server is reachable\n" +
          "ssh -o ConnectTimeout=5 user@server 'echo OK' || echo 'Server down!'\n\n" +
          "# Run command as sudo\n" +
          "ssh user@server 'sudo systemctl restart nginx'\n\n" +
          "# Keep session alive\n" +
          "ssh -o ServerAliveInterval=60 user@server\n" +
          "```"
      }
    ],

    commonMistakes: [
      "**Permission errors on SSH files** - SSH is VERY strict about permissions. Private keys must be 600, .ssh folder must be 700. Fix with: `chmod 700 ~/.ssh && chmod 600 ~/.ssh/id_*`",
      "**Copying private key to server** - NEVER do this! Only the public key (.pub) goes on servers. Your private key stays on YOUR machine only.",
      "**Ignoring host key warnings** - The 'Are you sure you want to continue?' message is a security feature. If you see 'WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!' - investigate before continuing!",
      "**Using password authentication in production** - Passwords can be brute-forced. Always disable password auth and use SSH keys only.",
      "**Not using a passphrase on keys** - If someone steals your unprotected private key, they have full access. Always use a passphrase!",
      "**Leaving SSH on port 22** - Bots constantly scan port 22. Change to a non-standard port (like 2222) to reduce noise.",
      "**Not using SSH config** - Typing long SSH commands repeatedly is error-prone and inefficient. Use ~/.ssh/config!"
    ],

    bestPractices: [
      "**Use Ed25519 keys** - They're more secure, faster, and have shorter keys than RSA",
      "**Always use passphrases** on private keys, with ssh-agent to cache them",
      "**Create separate keys** for different purposes (work, personal, CI/CD)",
      "**Disable root login** - Set `PermitRootLogin no` in /etc/ssh/sshd_config",
      "**Disable password authentication** - Set `PasswordAuthentication no` after setting up keys",
      "**Use fail2ban** to automatically block IPs with too many failed attempts",
      "**Keep SSH updated** - Security patches are released regularly",
      "**Use a bastion/jump host** for accessing private network servers",
      "**Rotate keys periodically** - Especially if a team member leaves",
      "**Audit authorized_keys regularly** - Remove old or unknown keys"
    ],

    realWorldExample: 
      "**Scenario: Setting Up a Secure Deployment Pipeline**\n\n" +
      "Your team needs to deploy code to production servers from GitHub Actions:\n\n" +
      "**1. Create a dedicated deploy key:**\n" +
      "```bash\n" +
      "ssh-keygen -t ed25519 -C \"github-actions-deploy\" -f ~/.ssh/deploy_key -N \"\"\n" +
      "```\n\n" +
      "**2. Add public key to production server:**\n" +
      "```bash\n" +
      "# On production server, add to authorized_keys with restrictions:\n" +
      "echo 'command=\"/home/deploy/deploy.sh\",no-port-forwarding,no-X11-forwarding,no-agent-forwarding ssh-ed25519 AAAA... github-actions-deploy' >> ~/.ssh/authorized_keys\n" +
      "```\n\n" +
      "**3. Add private key to GitHub Secrets:**\n" +
      "```yaml\n" +
      "# .github/workflows/deploy.yml\n" +
      "- name: Deploy to production\n" +
      "  uses: appleboy/ssh-action@master\n" +
      "  with:\n" +
      "    host: ${{ secrets.SSH_HOST }}\n" +
      "    username: deploy\n" +
      "    key: ${{ secrets.SSH_PRIVATE_KEY }}\n" +
      "    script: |\n" +
      "      cd /var/www/app\n" +
      "      git pull origin main\n" +
      "      npm install\n" +
      "      pm2 restart all\n" +
      "```\n\n" +
      "**4. Create jump host setup for secure access:**\n" +
      "```\n" +
      "# ~/.ssh/config for team members\n" +
      "Host bastion\n" +
      "    HostName bastion.example.com\n" +
      "    User developer\n" +
      "    IdentityFile ~/.ssh/company_key\n\n" +
      "Host production-*\n" +
      "    ProxyJump bastion\n" +
      "    User deploy\n\n" +
      "Host production-web\n" +
      "    HostName 10.0.1.10\n\n" +
      "Host production-db\n" +
      "    HostName 10.0.1.20\n" +
      "```\n\n" +
      "Now team members can safely access internal servers:\n" +
      "```bash\n" +
      "ssh production-web  # Automatically jumps through bastion\n" +
      "```",

    summary: 
      "## 📝 Key Takeaways\n\n" +
      "1. **SSH = Secure Shell** - encrypted tunnel for remote server access\n" +
      "2. **SSH keys > passwords** - cryptographic proof of identity, can't be brute-forced\n" +
      "3. **Private key stays private** - NEVER share it, NEVER put it on servers\n" +
      "4. **~/.ssh/config is essential** - turns complex commands into simple shortcuts\n" +
      "5. **SCP/SFTP/rsync** - secure file transfer over SSH\n" +
      "6. **SSH tunnels** - access services behind firewalls securely\n" +
      "7. **Always harden SSH** - disable password auth, use fail2ban, change default port",

    nextSteps: 
      "**What's Next?**\n\n" +
      "You've mastered SSH essentials! Build on this foundation:\n" +
      "- **Ansible**: Automate server configuration over SSH\n" +
      "- **Infrastructure as Code**: Use Terraform to provision servers with SSH access\n" +
      "- **CI/CD Deployment**: Set up automated deployments using SSH\n" +
      "- **Bastion Hosts**: Design secure access architecture for cloud environments"
  },

  'advanced-git-collaboration': {
    introduction: 
      "You know the Git basics - commit, push, pull. But real-world development involves teams, " +
      "complex workflows, and inevitably... merge conflicts. This lesson takes you from Git user " +
      "to Git power user, teaching you the collaboration patterns used by professional development teams.\n\n" +
      "Whether you're contributing to open source, working with a team of 5, or coordinating across " +
      "hundreds of developers, these advanced Git skills will make you the person everyone asks for help " +
      "when things go wrong. By the end, you'll handle merge conflicts with confidence, rewrite history " +
      "safely, and understand the workflows that power companies like Google, Netflix, and Facebook.",

    whyItMatters: 
      "**Why Advanced Git Skills Set You Apart:**\n\n" +
      "1. **Team Productivity**: Poor Git practices cause merge hell, lost work, and broken builds\n" +
      "2. **Code Review**: Pull requests are central to modern development - master them\n" +
      "3. **History Matters**: A clean Git history makes debugging and auditing possible\n" +
      "4. **Disaster Recovery**: When someone force-pushes to main, you'll know how to fix it\n" +
      "5. **Open Source**: Contributing to OSS requires understanding forks, rebases, and PR etiquette\n\n" +
      "The difference between a junior and senior developer often shows in how they use Git. " +
      "Juniors fear merge conflicts; seniors resolve them in seconds. Juniors have messy histories; " +
      "seniors tell a clear story with their commits.",

    concepts: [
      {
        title: 'Branching Strategies - Organizing Team Work',
        content: 
          "Different teams use different branching strategies. Here are the main ones:\n\n" +
          "**GitFlow (Traditional, Feature-Heavy):**\n" +
          "```\n" +
          "main ────●────────────────────●──────────► (production releases)\n" +
          "          \\                    /\n" +
          "develop ───●───●───●───●───●───●──────────► (integration branch)\n" +
          "            \\     /     \\ /\n" +
          "feature/a ───●───●       X\n" +
          "                        / \\\n" +
          "feature/b ─────────●───●───●\n" +
          "```\n\n" +
          "- **main**: Production-ready code only\n" +
          "- **develop**: Integration branch for features\n" +
          "- **feature/***: Individual feature work\n" +
          "- **release/***: Preparing releases\n" +
          "- **hotfix/***: Emergency production fixes\n\n" +
          "**Trunk-Based Development (Modern, CI/CD-Friendly):**\n" +
          "```\n" +
          "main ──●──●──●──●──●──●──●──●──●──► (everyone commits here)\n" +
          "        \\   /   \\   /   \\   /\n" +
          "         ●─●     ●─●     ●─●        (short-lived feature branches)\n" +
          "```\n\n" +
          "- Everyone works on **main** (or very short-lived branches)\n" +
          "- Feature flags hide incomplete work\n" +
          "- Continuous integration catches issues fast\n" +
          "- Used by Google, Facebook, Netflix\n\n" +
          "**GitHub Flow (Simple, PR-Based):**\n" +
          "```\n" +
          "main ──────●────────●────────●──────►\n" +
          "            \\      / \\      /\n" +
          "feature ─────●──●──●   ●──●──●\n" +
          "              (PR)      (PR)\n" +
          "```\n\n" +
          "- **main** is always deployable\n" +
          "- Create branch → Make changes → Open PR → Review → Merge\n" +
          "- Simple and effective for most teams"
      },
      {
        title: 'Pull Requests - The Art of Code Review',
        content: 
          "Pull Requests (PRs) or Merge Requests (MRs) are where collaboration happens:\n\n" +
          "**Anatomy of a Great PR:**\n\n" +
          "```markdown\n" +
          "## Title: [JIRA-123] Add user authentication endpoint\n" +
          "\n" +
          "## Description\n" +
          "This PR adds JWT-based authentication to our API.\n" +
          "\n" +
          "### Changes\n" +
          "- Added /api/auth/login endpoint\n" +
          "- Added /api/auth/refresh endpoint  \n" +
          "- Added JWT middleware for protected routes\n" +
          "- Added rate limiting (100 req/min per IP)\n" +
          "\n" +
          "### Testing\n" +
          "- [x] Unit tests for auth service\n" +
          "- [x] Integration tests for endpoints\n" +
          "- [x] Manual testing with Postman\n" +
          "\n" +
          "### Screenshots\n" +
          "[If UI changes, show before/after]\n" +
          "\n" +
          "### Related Issues\n" +
          "Closes #123, Relates to #456\n" +
          "```\n\n" +
          "**PR Best Practices:**\n\n" +
          "| Do ✅ | Don't ❌ |\n" +
          "|-------|----------|\n" +
          "| Small, focused PRs (< 400 lines) | Giant PRs with 50 files |\n" +
          "| Clear description of WHY | Just \"fixed stuff\" |\n" +
          "| Link to issue/ticket | No context |\n" +
          "| Self-review before requesting | Request review immediately |\n" +
          "| Respond to feedback promptly | Let PRs go stale |"
      },
      {
        title: 'Merge vs Rebase - The Great Debate',
        content: 
          "Two ways to integrate changes, each with pros and cons:\n\n" +
          "**Merge (Preserves History):**\n" +
          "```\n" +
          "Before:                After merge:\n" +
          "main:  A─B─C           A─B─C─────M  (merge commit)\n" +
          "         \\                 \\     /\n" +
          "feature:  D─E           D─E────┘\n" +
          "```\n\n" +
          "```bash\n" +
          "git checkout main\n" +
          "git merge feature/my-feature\n" +
          "```\n\n" +
          "✅ Preserves complete history\n" +
          "✅ Non-destructive (safe)\n" +
          "❌ Creates merge commits (cluttered history)\n\n" +
          "**Rebase (Linear History):**\n" +
          "```\n" +
          "Before:                After rebase:\n" +
          "main:  A─B─C           A─B─C─D'─E'  (commits replayed)\n" +
          "         \\\n" +
          "feature:  D─E\n" +
          "```\n\n" +
          "```bash\n" +
          "git checkout feature/my-feature\n" +
          "git rebase main\n" +
          "# Then fast-forward merge\n" +
          "git checkout main\n" +
          "git merge feature/my-feature\n" +
          "```\n\n" +
          "✅ Clean, linear history\n" +
          "✅ Easier to read git log\n" +
          "❌ Rewrites history (never rebase shared branches!)\n\n" +
          "**The Golden Rule:**\n" +
          "```\n" +
          "╔════════════════════════════════════════════════════════╗\n" +
          "║  NEVER rebase commits that have been pushed and       ║\n" +
          "║  shared with others. Only rebase YOUR local commits.  ║\n" +
          "╚════════════════════════════════════════════════════════╝\n" +
          "```"
      },
      {
        title: 'Merge Conflicts - Not As Scary As They Seem',
        content: 
          "Merge conflicts happen when Git can't automatically combine changes:\n\n" +
          "**What a Conflict Looks Like:**\n" +
          "```\n" +
          "<<<<<<< HEAD (your changes)\n" +
          "const API_URL = 'https://api.production.com';\n" +
          "=======\n" +
          "const API_URL = 'https://api.staging.com';\n" +
          ">>>>>>> feature/update-api (their changes)\n" +
          "```\n\n" +
          "**How to Read It:**\n" +
          "- `<<<<<<< HEAD` to `=======`: Your current branch changes\n" +
          "- `=======` to `>>>>>>>`: Incoming branch changes\n" +
          "- You decide what the final code should be\n\n" +
          "**Resolving the Conflict:**\n" +
          "```bash\n" +
          "# 1. Open the file and manually fix it:\n" +
          "const API_URL = process.env.API_URL || 'https://api.production.com';\n" +
          "\n" +
          "# 2. Remove the conflict markers (<<<, ===, >>>)\n" +
          "\n" +
          "# 3. Stage the resolved file\n" +
          "git add config.js\n" +
          "\n" +
          "# 4. Continue the merge/rebase\n" +
          "git commit  # for merge\n" +
          "# or\n" +
          "git rebase --continue  # for rebase\n" +
          "```\n\n" +
          "**Pro Tips for Conflicts:**\n" +
          "- Use `git mergetool` with a visual tool (VS Code, Beyond Compare)\n" +
          "- Keep branches short-lived to minimize conflicts\n" +
          "- Communicate with teammates when touching the same files"
      },
      {
        title: 'Interactive Rebase - Rewriting History',
        content: 
          "Interactive rebase (`git rebase -i`) lets you edit, combine, or reorder commits:\n\n" +
          "```bash\n" +
          "# Rebase the last 4 commits\n" +
          "git rebase -i HEAD~4\n" +
          "```\n\n" +
          "**The Interactive Editor:**\n" +
          "```\n" +
          "pick abc1234 Add user model\n" +
          "pick def5678 Fix typo in user model\n" +
          "pick ghi9012 Add user controller\n" +
          "pick jkl3456 WIP debugging\n" +
          "\n" +
          "# Commands:\n" +
          "# p, pick   = use commit\n" +
          "# r, reword = use commit, but edit message\n" +
          "# e, edit   = use commit, but stop for amending\n" +
          "# s, squash = use commit, meld into previous\n" +
          "# f, fixup  = like squash, but discard message\n" +
          "# d, drop   = remove commit entirely\n" +
          "```\n\n" +
          "**Common Operations:**\n\n" +
          "**Squash messy commits into one:**\n" +
          "```\n" +
          "pick abc1234 Add user model\n" +
          "squash def5678 Fix typo in user model    # Combines with above\n" +
          "pick ghi9012 Add user controller\n" +
          "drop jkl3456 WIP debugging               # Removes this commit\n" +
          "```\n\n" +
          "**Reorder commits:**\n" +
          "```\n" +
          "pick ghi9012 Add user controller         # Moved up\n" +
          "pick abc1234 Add user model              # Moved down\n" +
          "```\n\n" +
          "**Edit a commit message:**\n" +
          "```\n" +
          "reword abc1234 Add user model            # Will prompt for new message\n" +
          "```"
      },
      {
        title: 'Git Stash - Saving Work Temporarily',
        content: 
          "Need to switch branches but have uncommitted work? Stash it!\n\n" +
          "```bash\n" +
          "# Save current changes to stash\n" +
          "git stash\n" +
          "# or with a descriptive message\n" +
          "git stash push -m \"WIP: user authentication\"\n\n" +
          "# List all stashes\n" +
          "git stash list\n" +
          "# stash@{0}: On feature/auth: WIP: user authentication\n" +
          "# stash@{1}: WIP on main: abc1234 Previous work\n\n" +
          "# Apply most recent stash (keeps stash)\n" +
          "git stash apply\n\n" +
          "# Apply and remove from stash\n" +
          "git stash pop\n\n" +
          "# Apply specific stash\n" +
          "git stash apply stash@{1}\n\n" +
          "# See what's in a stash\n" +
          "git stash show -p stash@{0}\n\n" +
          "# Delete a stash\n" +
          "git stash drop stash@{0}\n\n" +
          "# Delete all stashes\n" +
          "git stash clear\n" +
          "```\n\n" +
          "**Stash Including Untracked Files:**\n" +
          "```bash\n" +
          "git stash push -u -m \"Including new files\"\n" +
          "# -u includes untracked files\n" +
          "# -a includes ALL files (even ignored ones)\n" +
          "```"
      },
      {
        title: 'Cherry-Pick - Selective Commit Copying',
        content: 
          "Cherry-pick applies specific commits from one branch to another:\n\n" +
          "```\n" +
          "Scenario: Need commit X from feature branch on main\n" +
          "\n" +
          "main:     A─B─C\n" +
          "                \n" +
          "feature:  A─B─D─E─X─F  (you need X on main)\n" +
          "\n" +
          "After cherry-pick:\n" +
          "main:     A─B─C─X'\n" +
          "```\n\n" +
          "```bash\n" +
          "# Find the commit hash you want\n" +
          "git log feature/branch --oneline\n\n" +
          "# Cherry-pick it to current branch\n" +
          "git cherry-pick abc1234\n\n" +
          "# Cherry-pick multiple commits\n" +
          "git cherry-pick abc1234 def5678\n\n" +
          "# Cherry-pick a range\n" +
          "git cherry-pick abc1234..def5678\n\n" +
          "# Cherry-pick without committing (stage only)\n" +
          "git cherry-pick -n abc1234\n" +
          "```\n\n" +
          "**Use Cases:**\n" +
          "- Hotfix: Apply a bug fix to multiple release branches\n" +
          "- Backport: Bring a feature to an older version\n" +
          "- Rescue: Save specific work from an abandoned branch"
      }
    ],

    stepByStep: [
      {
        title: 'Step 1: Set Up a Clean Workflow',
        content: 
          "```bash\n" +
          "# Configure Git for better collaboration\n" +
          "git config --global pull.rebase true      # Rebase on pull by default\n" +
          "git config --global fetch.prune true      # Auto-remove deleted remote branches\n" +
          "git config --global rerere.enabled true   # Remember conflict resolutions\n\n" +
          "# Set up useful aliases\n" +
          "git config --global alias.co checkout\n" +
          "git config --global alias.br branch\n" +
          "git config --global alias.ci commit\n" +
          "git config --global alias.st status\n" +
          "git config --global alias.lg \"log --oneline --graph --all\"\n" +
          "git config --global alias.last \"log -1 HEAD --stat\"\n" +
          "git config --global alias.unstage \"reset HEAD --\"\n" +
          "```"
      },
      {
        title: 'Step 2: Create a Feature Branch',
        content: 
          "```bash\n" +
          "# Always start from an updated main\n" +
          "git checkout main\n" +
          "git pull origin main\n\n" +
          "# Create and switch to feature branch\n" +
          "git checkout -b feature/user-authentication\n\n" +
          "# Naming conventions:\n" +
          "# feature/   - New features\n" +
          "# bugfix/    - Bug fixes\n" +
          "# hotfix/    - Emergency production fixes\n" +
          "# refactor/  - Code refactoring\n" +
          "# docs/      - Documentation updates\n" +
          "# test/      - Test additions/fixes\n" +
          "```"
      },
      {
        title: 'Step 3: Make Clean, Atomic Commits',
        content: 
          "```bash\n" +
          "# Stage specific changes (not entire files)\n" +
          "git add -p  # Interactive staging\n\n" +
          "# Commit with a good message\n" +
          "git commit -m \"feat(auth): add JWT token generation\n\n" +
          "- Implement JWT signing with RS256\n" +
          "- Add token expiration (1 hour)\n" +
          "- Include refresh token support\n\n" +
          "Closes #123\"\n\n" +
          "# Conventional Commits format:\n" +
          "# type(scope): description\n" +
          "#\n" +
          "# Types: feat, fix, docs, style, refactor, test, chore\n" +
          "# Scope: optional, indicates area of codebase\n" +
          "```"
      },
      {
        title: 'Step 4: Keep Your Branch Updated',
        content: 
          "```bash\n" +
          "# Fetch latest changes\n" +
          "git fetch origin\n\n" +
          "# Option 1: Rebase your branch on top of main (preferred)\n" +
          "git rebase origin/main\n\n" +
          "# If conflicts occur:\n" +
          "# 1. Fix the conflicts in your editor\n" +
          "# 2. Stage the fixed files\n" +
          "git add <fixed-files>\n" +
          "# 3. Continue the rebase\n" +
          "git rebase --continue\n\n" +
          "# Option 2: Merge main into your branch\n" +
          "git merge origin/main\n\n" +
          "# If you mess up a rebase, abort it\n" +
          "git rebase --abort\n" +
          "```"
      },
      {
        title: 'Step 5: Clean Up Before Opening PR',
        content: 
          "```bash\n" +
          "# Squash WIP commits into meaningful ones\n" +
          "git rebase -i origin/main\n\n" +
          "# In the editor:\n" +
          "pick abc1234 feat(auth): add user login\n" +
          "squash def5678 WIP login\n" +
          "squash ghi9012 fix tests\n" +
          "pick jkl3456 feat(auth): add logout endpoint\n\n" +
          "# Verify your changes\n" +
          "git log --oneline origin/main..HEAD\n" +
          "git diff origin/main\n\n" +
          "# Push to remote (first time)\n" +
          "git push -u origin feature/user-authentication\n\n" +
          "# After rebasing, force push (with lease for safety)\n" +
          "git push --force-with-lease\n" +
          "```"
      },
      {
        title: 'Step 6: Handle Code Review Feedback',
        content: 
          "```bash\n" +
          "# Make requested changes\n" +
          "git add .\n" +
          "git commit -m \"fix(auth): address review feedback\n\n" +
          "- Add input validation\n" +
          "- Fix edge case in token refresh\"\n\n" +
          "# Or amend the previous commit if it's a small fix\n" +
          "git add .\n" +
          "git commit --amend --no-edit\n\n" +
          "# Push updates\n" +
          "git push --force-with-lease\n\n" +
          "# If reviewer requested squashing\n" +
          "git rebase -i origin/main\n" +
          "# Squash feedback commits into original commits\n" +
          "git push --force-with-lease\n" +
          "```"
      },
      {
        title: 'Step 7: Merge and Clean Up',
        content: 
          "```bash\n" +
          "# After PR is approved and merged (on GitHub/GitLab)\n" +
          "\n" +
          "# Switch back to main\n" +
          "git checkout main\n\n" +
          "# Pull the merged changes\n" +
          "git pull origin main\n\n" +
          "# Delete your local feature branch\n" +
          "git branch -d feature/user-authentication\n\n" +
          "# Delete remote branch (if not auto-deleted)\n" +
          "git push origin --delete feature/user-authentication\n\n" +
          "# Clean up tracking branches for deleted remotes\n" +
          "git fetch --prune\n\n" +
          "# Verify clean state\n" +
          "git branch -a\n" +
          "```"
      }
    ],

    commonMistakes: [
      "**Committing directly to main** - Always use branches! Protect main with branch protection rules.",
      "**Giant PRs** - PRs with 1000+ lines changed are nearly impossible to review well. Keep them small and focused.",
      "**Force pushing to shared branches** - This rewrites history others depend on. Use `--force-with-lease` and only on YOUR branches.",
      "**Not pulling before starting work** - Always `git pull` before creating a new branch to avoid immediate conflicts.",
      "**Merge conflicts panic** - Conflicts aren't errors! They're Git asking for your decision. Take your time.",
      "**Vague commit messages** - 'fixed stuff' or 'updates' tells you nothing. Write messages your future self will thank you for.",
      "**Not using .gitignore** - Committing node_modules, .env files, or build outputs pollutes the repo and leaks secrets.",
      "**Rebasing public branches** - Never rebase commits that others have pulled. It breaks their history."
    ],

    bestPractices: [
      "**Small, focused PRs** - One feature/fix per PR, ideally under 400 lines",
      "**Descriptive branch names** - `feature/add-user-auth` not `my-branch`",
      "**Conventional commits** - Use prefixes: feat:, fix:, docs:, refactor:, test:",
      "**Review your own PR first** - Catch obvious issues before requesting review",
      "**Respond to feedback gracefully** - Code review is about the code, not you",
      "**Keep main deployable** - Every commit on main should be production-ready",
      "**Use branch protection** - Require reviews, passing tests before merge",
      "**Clean up after yourself** - Delete merged branches promptly",
      "**Communicate about conflicts** - If you'll touch the same files as others, coordinate",
      "**Use git hooks** - Pre-commit hooks for linting, commit-msg hooks for format"
    ],

    realWorldExample: 
      "**Scenario: Contributing to an Open Source Project**\n\n" +
      "You want to add a feature to a popular GitHub project:\n\n" +
      "**1. Fork and Clone:**\n" +
      "```bash\n" +
      "# Fork the repo on GitHub, then clone your fork\n" +
      "git clone https://github.com/YOUR-USERNAME/project.git\n" +
      "cd project\n\n" +
      "# Add the original repo as 'upstream'\n" +
      "git remote add upstream https://github.com/ORIGINAL-OWNER/project.git\n" +
      "```\n\n" +
      "**2. Create Feature Branch:**\n" +
      "```bash\n" +
      "git fetch upstream\n" +
      "git checkout -b feature/add-dark-mode upstream/main\n" +
      "```\n\n" +
      "**3. Make Changes and Commit:**\n" +
      "```bash\n" +
      "# Make your changes...\n" +
      "git add .\n" +
      "git commit -m \"feat(ui): add dark mode toggle\n\n" +
      "- Add ThemeProvider with dark/light modes\n" +
      "- Persist preference in localStorage\n" +
      "- Add keyboard shortcut (Cmd+Shift+D)\n\n" +
      "Closes #456\"\n" +
      "```\n\n" +
      "**4. Keep Up with Upstream:**\n" +
      "```bash\n" +
      "# Before pushing, rebase on latest upstream\n" +
      "git fetch upstream\n" +
      "git rebase upstream/main\n" +
      "# Resolve any conflicts\n" +
      "```\n\n" +
      "**5. Push and Create PR:**\n" +
      "```bash\n" +
      "git push -u origin feature/add-dark-mode\n" +
      "# Go to GitHub and create Pull Request\n" +
      "# Point it to the original repo's main branch\n" +
      "```\n\n" +
      "**6. Address Maintainer Feedback:**\n" +
      "```bash\n" +
      "# Maintainer asks for changes\n" +
      "git add .\n" +
      "git commit -m \"fix(ui): use CSS variables for theme colors\"\n" +
      "git push\n\n" +
      "# If asked to squash commits\n" +
      "git rebase -i upstream/main\n" +
      "git push --force-with-lease\n" +
      "```\n\n" +
      "**7. Celebrate When Merged!** 🎉",

    summary: 
      "## 📝 Key Takeaways\n\n" +
      "1. **Branch strategies** organize team work (GitFlow, trunk-based, GitHub Flow)\n" +
      "2. **Pull Requests** are for code review, discussion, and quality gates\n" +
      "3. **Merge preserves history**, rebase creates linear history - use appropriately\n" +
      "4. **Merge conflicts** are normal - stay calm and resolve systematically\n" +
      "5. **Interactive rebase** cleans up messy commits before sharing\n" +
      "6. **Git stash** saves work temporarily when switching contexts\n" +
      "7. **Cherry-pick** copies specific commits between branches\n" +
      "8. **force-with-lease** is safer than force push",

    nextSteps: 
      "**What's Next?**\n\n" +
      "You're now a Git power user! Take it further:\n" +
      "- **Git Hooks**: Automate linting, testing, and formatting on commit\n" +
      "- **Git Bisect**: Binary search through commits to find bugs\n" +
      "- **Git Worktrees**: Work on multiple branches simultaneously\n" +
      "- **Signed Commits**: Cryptographically verify commit authorship"
  },

  'branching-strategies-workflows': {
    introduction: 
      "How does a team of 5, 50, or 500 developers all work on the same codebase without chaos? " +
      "The answer is branching strategies - systematic approaches to organizing parallel work, " +
      "managing releases, and ensuring code quality. Choosing the right workflow can mean the difference " +
      "between smooth deployments and merge nightmare.\n\n" +
      "In this lesson, you'll master the major branching strategies used by teams worldwide - from " +
      "the structured GitFlow to the fast-moving trunk-based development. You'll learn when to use each, " +
      "how to implement them, and the trade-offs involved. By the end, you'll be able to recommend and " +
      "set up the perfect workflow for any team.",

    whyItMatters: 
      "**Why Branching Strategies Matter:**\n\n" +
      "1. **Team Scalability**: Without a strategy, 10+ developers creates branch chaos\n" +
      "2. **Release Management**: Control what goes into each release version\n" +
      "3. **Code Quality**: Enforce reviews and testing before code reaches production\n" +
      "4. **CI/CD Integration**: Your pipeline behavior depends on your branching model\n" +
      "5. **Rollback Ability**: Quickly revert when something goes wrong\n\n" +
      "The wrong branching strategy can cripple productivity:\n" +
      "- Too complex → Developers spend more time on Git than coding\n" +
      "- Too simple → No quality gates, broken code reaches production\n" +
      "- Mismatched → Strategy doesn't fit your release cadence\n\n" +
      "Understanding branching strategies is what separates DevOps engineers from developers who 'just use Git'.",

    concepts: [
      {
        title: 'GitFlow - The Traditional Heavyweight',
        content: 
          "GitFlow is a structured branching model ideal for scheduled releases:\n\n" +
          "```\n" +
          "                        ┌──────────────────────────────────────────────────────┐\n" +
          "                        │                    GITFLOW                           │\n" +
          "                        └──────────────────────────────────────────────────────┘\n" +
          "\n" +
          "main     ●━━━━━━━━━━━━━━━━━━━━━●━━━━━━━━━━━━━━━━━━●━━━━━━━━━━━━━●━━━━━►\n" +
          "         │                     │                  │             │\n" +
          "         │                     │ (v1.0)           │ (v1.1)      │ (v1.2)\n" +
          "         │                     ▲                  ▲             ▲\n" +
          "         │                     │                  │             │\n" +
          "         ▼                     │                  │             │\n" +
          "develop  ●──●──●──●──●──●──●──●──●──●──●──●──●──●──●──●──●──●──●──●──►\n" +
          "            │     ▲     │        ▲     │     ▲        │     ▲\n" +
          "            │     │     │        │     │     │        │     │\n" +
          "            ▼     │     ▼        │     ▼     │        ▼     │\n" +
          "feature/   ●──●──●     ●──●──●──●     ●──●──●        ●──●──●\n" +
          "             (A)          (B)           (C)            (D)\n" +
          "\n" +
          "release/                       ●──●──●\n" +
          "                               (prep v1.1)\n" +
          "\n" +
          "hotfix/                                              ●──●\n" +
          "                                                    (urgent fix)\n" +
          "```\n\n" +
          "**Branch Types:**\n\n" +
          "| Branch | Purpose | Lives Forever? | Merges To |\n" +
          "|--------|---------|----------------|----------|\n" +
          "| `main` | Production code | ✅ Yes | - |\n" +
          "| `develop` | Integration branch | ✅ Yes | main (via release) |\n" +
          "| `feature/*` | New features | ❌ No | develop |\n" +
          "| `release/*` | Release prep | ❌ No | main + develop |\n" +
          "| `hotfix/*` | Emergency fixes | ❌ No | main + develop |\n\n" +
          "**Best For:**\n" +
          "- Scheduled release cycles (monthly, quarterly)\n" +
          "- Products with multiple versions in production\n" +
          "- Teams that need strict separation between dev and prod"
      },
      {
        title: 'Trunk-Based Development - The Modern Speedster',
        content: 
          "Trunk-based development keeps everyone working on a single branch:\n\n" +
          "```\n" +
          "                    ┌──────────────────────────────────────────────────────┐\n" +
          "                    │            TRUNK-BASED DEVELOPMENT                   │\n" +
          "                    └──────────────────────────────────────────────────────┘\n" +
          "\n" +
          "main/trunk  ●──●──●──●──●──●──●──●──●──●──●──●──●──●──●──●──●──●──●──►\n" +
          "            │  ▲  │  ▲     │  ▲  │  ▲     │  ▲  │  ▲     │  ▲\n" +
          "            │  │  │  │     │  │  │  │     │  │  │  │     │  │\n" +
          "            ▼  │  ▼  │     ▼  │  ▼  │     ▼  │  ▼  │     ▼  │\n" +
          "short-lived ●──●  ●──●     ●──●  ●──●     ●──●  ●──●     ●──●\n" +
          "branches    (<1 day)      (<1 day)       (<1 day)       (<1 day)\n" +
          "\n" +
          "                    ↑                     ↑                     ↑\n" +
          "                 Deploy               Deploy                Deploy\n" +
          "                (continuous)         (continuous)          (continuous)\n" +
          "```\n\n" +
          "**Key Principles:**\n\n" +
          "1. **Everyone commits to trunk** (main) frequently (at least daily)\n" +
          "2. **Branches live < 1-2 days** - merge small, merge often\n" +
          "3. **Feature flags** hide incomplete work in production\n" +
          "4. **Comprehensive testing** catches issues before they merge\n" +
          "5. **Continuous deployment** to production many times per day\n\n" +
          "**Feature Flags Example:**\n" +
          "```javascript\n" +
          "// Code is in production but hidden behind a flag\n" +
          "if (featureFlags.isEnabled('new-checkout-flow')) {\n" +
          "  return <NewCheckoutFlow />;\n" +
          "} else {\n" +
          "  return <OldCheckoutFlow />;\n" +
          "}\n" +
          "```\n\n" +
          "**Best For:**\n" +
          "- Teams with strong CI/CD and automated testing\n" +
          "- Products that deploy continuously (SaaS)\n" +
          "- Companies like Google, Facebook, Netflix"
      },
      {
        title: 'GitHub Flow - The Simple Middle Ground',
        content: 
          "GitHub Flow is a simplified workflow perfect for continuous delivery:\n\n" +
          "```\n" +
          "                    ┌──────────────────────────────────────────────────────┐\n" +
          "                    │                   GITHUB FLOW                        │\n" +
          "                    └──────────────────────────────────────────────────────┘\n" +
          "\n" +
          "main       ●━━━━━━━●━━━━━━━━━━━●━━━━━━━━━━━●━━━━━━━━━━━●━━━━━━━━━━━►\n" +
          "           │       ▲           ▲           ▲           ▲\n" +
          "           │       │           │           │           │\n" +
          "           │       │ (PR+merge)│           │           │\n" +
          "           ▼       │           │           │           │\n" +
          "feature    ●───●───●           │           │           │\n" +
          "                               │           │           │\n" +
          "                               ▼           │           │\n" +
          "another-feature                ●───●───●───●           │\n" +
          "                                                       │\n" +
          "                                                       ▼\n" +
          "bugfix                                                 ●───●\n" +
          "```\n\n" +
          "**The Workflow (6 Steps):**\n\n" +
          "1. **Create branch** from main for your work\n" +
          "2. **Add commits** with your changes\n" +
          "3. **Open Pull Request** to start discussion\n" +
          "4. **Code review** and discussion on the PR\n" +
          "5. **Deploy and test** (to staging or production)\n" +
          "6. **Merge** once approved and tested\n\n" +
          "**Rules:**\n" +
          "- `main` is **always deployable**\n" +
          "- Branch names are descriptive: `add-user-auth`, `fix-login-bug`\n" +
          "- PRs are reviewed before merging\n" +
          "- Deploy immediately after merging\n\n" +
          "**Best For:**\n" +
          "- Small to medium teams\n" +
          "- Web applications with continuous deployment\n" +
          "- Teams that want simplicity without sacrificing quality"
      },
      {
        title: 'GitLab Flow - Environment-Based Workflow',
        content: 
          "GitLab Flow adds environment branches for controlled deployments:\n\n" +
          "```\n" +
          "                    ┌──────────────────────────────────────────────────────┐\n" +
          "                    │                   GITLAB FLOW                        │\n" +
          "                    └──────────────────────────────────────────────────────┘\n" +
          "\n" +
          "                              Upstream (source of truth)\n" +
          "                                        │\n" +
          "                                        ▼\n" +
          "main           ●───●───●───●───●───●───●───●───●───●───●───►\n" +
          "               │       │       │           │       │\n" +
          "               │       │       │           │       │\n" +
          "               ▼       ▼       ▼           ▼       ▼\n" +
          "staging        ●───────●───────●───────────●───────●───────►\n" +
          "               │               │           │\n" +
          "               │               │           │\n" +
          "               ▼               ▼           ▼\n" +
          "production     ●───────────────●───────────●───────────────►\n" +
          "\n" +
          "              (Deploy to staging) (Deploy to production)\n" +
          "```\n\n" +
          "**Environment Branches:**\n" +
          "- `main` → Development complete, ready for staging\n" +
          "- `staging` → Testing in staging environment\n" +
          "- `production` → What's running in production\n\n" +
          "**Merge Direction:**\n" +
          "```\n" +
          "feature → main → staging → production\n" +
          "          (never the other way!)\n" +
          "```\n\n" +
          "**Release Branches (Optional):**\n" +
          "```\n" +
          "main ─────●────────────────●────────────────────►\n" +
          "          │                │\n" +
          "          ▼                ▼\n" +
          "       1.0-stable      2.0-stable\n" +
          "          │                │\n" +
          "          ●──●──●          ●──●\n" +
          "        (hotfixes)      (hotfixes)\n" +
          "```\n\n" +
          "**Best For:**\n" +
          "- Teams needing multiple environments (dev/staging/prod)\n" +
          "- Enterprise with compliance requirements\n" +
          "- Products supporting multiple versions"
      },
      {
        title: 'Release Flow (Microsoft) - Scheduled with Hotfix Support',
        content: 
          "Microsoft's Release Flow is designed for regular release trains:\n\n" +
          "```\n" +
          "                    ┌──────────────────────────────────────────────────────┐\n" +
          "                    │                  RELEASE FLOW                        │\n" +
          "                    └──────────────────────────────────────────────────────┘\n" +
          "\n" +
          "main       ●───●───●───●───●───●───●───●───●───●───●───●───●───►\n" +
          "           │           │           │               │\n" +
          "           │           │           │               │\n" +
          "           ▼           ▼           ▼               ▼\n" +
          "release/   ●           ●───●       ●───●───●       ●\n" +
          "2024.01    │           │   │       │   │   │       │\n" +
          "           │         hotfix│     hotfix│ hotfix    │\n" +
          "           │               │           │           │\n" +
          "           ▼               ▼           ▼           ▼\n" +
          "        Deploy          Deploy     Deploy       Deploy\n" +
          "```\n\n" +
          "**Key Concepts:**\n\n" +
          "1. **Topic branches** for all work (like GitHub Flow)\n" +
          "2. **Release branches** cut from main on schedule\n" +
          "3. **Cherry-pick hotfixes** to release branches\n" +
          "4. **Never merge back** - release branches are frozen\n\n" +
          "**Process:**\n" +
          "```bash\n" +
          "# Regular work on main\n" +
          "git checkout -b feature/new-thing\n" +
          "# ... work, PR, merge to main\n\n" +
          "# At release time (e.g., Sprint end)\n" +
          "git checkout -b release/2024-Q1 main\n" +
          "git push origin release/2024-Q1\n" +
          "\n" +
          "# Hotfix for release\n" +
          "git checkout main\n" +
          "git checkout -b hotfix/critical-bug\n" +
          "# ... fix, PR, merge to main\n" +
          "# Then cherry-pick to release branch\n" +
          "git checkout release/2024-Q1\n" +
          "git cherry-pick <commit-hash>\n" +
          "```\n\n" +
          "**Best For:**\n" +
          "- Sprint-based release schedules\n" +
          "- Products needing release stabilization periods\n" +
          "- Large teams (Azure DevOps uses this)"
      },
      {
        title: 'Comparing Strategies - Decision Framework',
        content: 
          "Choose your strategy based on your context:\n\n" +
          "```\n" +
          "┌─────────────────────────────────────────────────────────────────────┐\n" +
          "│                    STRATEGY COMPARISON                             │\n" +
          "├────────────────┬────────────┬───────────┬──────────┬──────────────┤\n" +
          "│ Factor         │ GitFlow    │ Trunk     │ GitHub   │ GitLab       │\n" +
          "├────────────────┼────────────┼───────────┼──────────┼──────────────┤\n" +
          "│ Complexity     │ High       │ Low       │ Low      │ Medium       │\n" +
          "│ Release Freq   │ Scheduled  │ Continuous│ Continuous│ Both        │\n" +
          "│ Team Size      │ Large      │ Any       │ Small-Med│ Medium-Large │\n" +
          "│ Branch Lifespan│ Long       │ Very Short│ Short    │ Short-Medium │\n" +
          "│ Multi-version  │ ✅ Yes     │ ❌ No     │ ❌ No    │ ✅ Yes       │\n" +
          "│ CI/CD Required │ Helpful    │ Essential │ Important│ Important    │\n" +
          "│ Feature Flags  │ Optional   │ Essential │ Optional │ Optional     │\n" +
          "└────────────────┴────────────┴───────────┴──────────┴──────────────┘\n" +
          "```\n\n" +
          "**Decision Tree:**\n" +
          "```\n" +
          "Do you deploy continuously to production?\n" +
          "├── YES → Do you have excellent test coverage?\n" +
          "│         ├── YES → Trunk-Based Development\n" +
          "│         └── NO  → GitHub Flow\n" +
          "└── NO  → Do you maintain multiple versions?\n" +
          "          ├── YES → GitFlow or GitLab Flow\n" +
          "          └── NO  → GitHub Flow or Release Flow\n" +
          "```\n\n" +
          "**Migration Path:**\n" +
          "Most teams evolve: GitFlow → GitHub Flow → Trunk-Based\n" +
          "as their CI/CD and testing mature."
      }
    ],

    stepByStep: [
      {
        title: 'Step 1: Implement GitHub Flow (Beginner-Friendly)',
        content: 
          "```bash\n" +
          "# Start with a clean main branch\n" +
          "git checkout main\n" +
          "git pull origin main\n\n" +
          "# Create a descriptive feature branch\n" +
          "git checkout -b feature/add-user-profile\n\n" +
          "# Make changes and commit frequently\n" +
          "git add .\n" +
          "git commit -m \"feat(profile): add user profile component\"\n\n" +
          "# Push and open PR\n" +
          "git push -u origin feature/add-user-profile\n" +
          "# Open PR on GitHub/GitLab\n\n" +
          "# After approval, merge via UI (squash merge recommended)\n" +
          "# Delete branch after merge\n" +
          "git checkout main\n" +
          "git pull\n" +
          "git branch -d feature/add-user-profile\n" +
          "```"
      },
      {
        title: 'Step 2: Set Up GitFlow for Scheduled Releases',
        content: 
          "```bash\n" +
          "# Install git-flow extension (optional but helpful)\n" +
          "brew install git-flow  # macOS\n" +
          "apt-get install git-flow  # Ubuntu\n\n" +
          "# Initialize git-flow in your repo\n" +
          "git flow init\n" +
          "# Accept defaults or customize:\n" +
          "# - Production branch: main\n" +
          "# - Development branch: develop\n" +
          "# - Feature prefix: feature/\n" +
          "# - Release prefix: release/\n" +
          "# - Hotfix prefix: hotfix/\n\n" +
          "# Start a feature\n" +
          "git flow feature start user-authentication\n" +
          "# ... work on feature ...\n" +
          "git flow feature finish user-authentication\n" +
          "# Merges to develop, deletes feature branch\n\n" +
          "# Start a release\n" +
          "git flow release start 1.0.0\n" +
          "# ... final testing, version bump ...\n" +
          "git flow release finish 1.0.0\n" +
          "# Merges to main AND develop, creates tag\n\n" +
          "# Emergency hotfix\n" +
          "git flow hotfix start critical-fix\n" +
          "# ... fix the issue ...\n" +
          "git flow hotfix finish critical-fix\n" +
          "# Merges to main AND develop\n" +
          "```"
      },
      {
        title: 'Step 3: Configure Branch Protection Rules',
        content: 
          "**On GitHub:**\n\n" +
          "1. Go to Settings → Branches → Add rule\n" +
          "2. Branch name pattern: `main`\n" +
          "3. Enable:\n" +
          "   - ✅ Require pull request before merging\n" +
          "   - ✅ Require approvals (1-2 reviewers)\n" +
          "   - ✅ Require status checks to pass\n" +
          "   - ✅ Require branches to be up to date\n" +
          "   - ✅ Include administrators\n\n" +
          "**Using GitHub CLI:**\n" +
          "```bash\n" +
          "gh api repos/{owner}/{repo}/branches/main/protection \\\n" +
          "  --method PUT \\\n" +
          "  -f required_status_checks='{\"strict\":true,\"contexts\":[\"ci/tests\"]}' \\\n" +
          "  -f required_pull_request_reviews='{\"required_approving_review_count\":1}'\n" +
          "```\n\n" +
          "**For GitLab:**\n" +
          "Settings → Repository → Protected Branches\n" +
          "- Allowed to merge: Maintainers\n" +
          "- Allowed to push: No one\n" +
          "- Require approval: 1+"
      },
      {
        title: 'Step 4: Implement Trunk-Based Development',
        content: 
          "```bash\n" +
          "# Configure for frequent integration\n" +
          "git config --global pull.rebase true\n\n" +
          "# Work directly on main (for small changes)\n" +
          "git checkout main\n" +
          "git pull --rebase\n" +
          "# ... make small change ...\n" +
          "git commit -m \"fix: correct typo in header\"\n" +
          "git push\n\n" +
          "# Or use very short-lived branches (< 1 day)\n" +
          "git checkout -b small-fix\n" +
          "# ... work for a few hours max ...\n" +
          "git checkout main\n" +
          "git pull --rebase\n" +
          "git merge small-fix\n" +
          "git push\n" +
          "git branch -d small-fix\n\n" +
          "# Feature flags for incomplete work\n" +
          "# In code:\n" +
          "# if (features.isEnabled('new-dashboard')) {\n" +
          "#   renderNewDashboard();\n" +
          "# }\n" +
          "```\n\n" +
          "**Prerequisites for Trunk-Based:**\n" +
          "1. Comprehensive automated tests (80%+ coverage)\n" +
          "2. Fast CI pipeline (< 10 minutes)\n" +
          "3. Feature flag system\n" +
          "4. Team discipline and communication"
      },
      {
        title: 'Step 5: Handle Multi-Environment Deployments',
        content: 
          "```bash\n" +
          "# GitLab Flow with environment branches\n\n" +
          "# 1. Feature work goes to main\n" +
          "git checkout -b feature/new-api main\n" +
          "# ... work ...\n" +
          "git checkout main\n" +
          "git merge feature/new-api\n" +
          "git push\n\n" +
          "# 2. Promote to staging\n" +
          "git checkout staging\n" +
          "git merge main\n" +
          "git push  # Triggers staging deployment\n\n" +
          "# 3. After testing, promote to production\n" +
          "git checkout production\n" +
          "git merge staging\n" +
          "git push  # Triggers production deployment\n\n" +
          "# CI/CD config example (.gitlab-ci.yml)\n" +
          "# deploy-staging:\n" +
          "#   only:\n" +
          "#     - staging\n" +
          "#   script: ./deploy.sh staging\n" +
          "#\n" +
          "# deploy-production:\n" +
          "#   only:\n" +
          "#     - production\n" +
          "#   script: ./deploy.sh production\n" +
          "```"
      }
    ],

    commonMistakes: [
      "**Choosing complexity you don't need** - Start simple (GitHub Flow) and add complexity only when required.",
      "**Long-lived feature branches** - Branches over 1-2 weeks old cause massive merge conflicts. Merge early and often.",
      "**Merging develop/staging back to main** - Flow should be one direction: main → staging → production.",
      "**Skipping code review for hotfixes** - Emergency doesn't mean no review. Have a quick-review process.",
      "**Not protecting main branch** - Without protection, someone WILL accidentally push broken code directly.",
      "**Inconsistent naming** - `feature/thing`, `feat-thing`, `thing-feature` confuses everyone. Pick a convention and enforce it.",
      "**Ignoring the release branch** - GitFlow release branches exist to stabilize. Don't keep adding features to them.",
      "**No automation** - Manual merging and deployment leads to errors. Automate the workflow with CI/CD."
    ],

    bestPractices: [
      "**Document your workflow** - Write it down so everyone follows the same process",
      "**Automate enforcement** - Use branch protection, CI checks, and commit hooks",
      "**Keep branches short-lived** - Merge within days, not weeks",
      "**Use descriptive branch names** - `feature/user-auth-oauth2` not `my-branch`",
      "**Delete merged branches** - Keep the repo clean",
      "**Tag releases** - `v1.0.0`, `v1.0.1` for easy reference and rollback",
      "**Use semantic versioning** - MAJOR.MINOR.PATCH communicates change impact",
      "**Match strategy to release cadence** - Daily deploys ≠ quarterly releases",
      "**Train the team** - Everyone should understand WHY, not just HOW",
      "**Review and iterate** - Revisit your strategy as the team and product evolve"
    ],

    realWorldExample: 
      "**Scenario: Migrating from GitFlow to GitHub Flow**\n\n" +
      "Your team currently uses GitFlow but deploys weekly. The develop branch often " +
      "has untested features, and release branches take days to stabilize. Time to simplify!\n\n" +
      "**1. Prepare the Team:**\n" +
      "- Document the new workflow\n" +
      "- Train everyone on GitHub Flow\n" +
      "- Set up feature flags system\n\n" +
      "**2. Clean Up Current State:**\n" +
      "```bash\n" +
      "# Finish all in-progress features and releases\n" +
      "git flow feature finish <all-features>\n" +
      "git flow release finish <current-release>\n\n" +
      "# Ensure main and develop are synchronized\n" +
      "git checkout main\n" +
      "git merge develop\n" +
      "git push\n" +
      "```\n\n" +
      "**3. Set Up Branch Protection:**\n" +
      "```yaml\n" +
      "# GitHub branch protection for main\n" +
      "- Require PR with 1 approval\n" +
      "- Require CI to pass\n" +
      "- Require branch up-to-date\n" +
      "- Auto-delete branches after merge\n" +
      "```\n\n" +
      "**4. Update CI/CD:**\n" +
      "```yaml\n" +
      "# .github/workflows/ci.yml\n" +
      "on:\n" +
      "  push:\n" +
      "    branches: [main]\n" +
      "  pull_request:\n" +
      "    branches: [main]\n" +
      "\n" +
      "jobs:\n" +
      "  test:\n" +
      "    runs-on: ubuntu-latest\n" +
      "    steps:\n" +
      "      - uses: actions/checkout@v4\n" +
      "      - run: npm test\n" +
      "  \n" +
      "  deploy:\n" +
      "    needs: test\n" +
      "    if: github.ref == 'refs/heads/main'\n" +
      "    runs-on: ubuntu-latest\n" +
      "    steps:\n" +
      "      - run: ./deploy.sh production\n" +
      "```\n\n" +
      "**5. Retire Develop Branch:**\n" +
      "```bash\n" +
      "# Archive develop branch\n" +
      "git checkout develop\n" +
      "git tag archive/develop-final\n" +
      "git push origin archive/develop-final\n" +
      "\n" +
      "# Delete develop\n" +
      "git push origin --delete develop\n" +
      "```\n\n" +
      "**Results:**\n" +
      "- PRs merged directly to main\n" +
      "- Every merge triggers deployment\n" +
      "- No more 'stabilization' period\n" +
      "- Team productivity increased 30%",

    summary: 
      "## 📝 Key Takeaways\n\n" +
      "1. **GitFlow** - Structured, for scheduled releases and multiple versions\n" +
      "2. **Trunk-Based** - Simple, for continuous deployment with feature flags\n" +
      "3. **GitHub Flow** - Balanced, for teams deploying frequently via PRs\n" +
      "4. **GitLab Flow** - Environment-aware, for multi-stage deployments\n" +
      "5. **Start simple** - Begin with GitHub Flow, add complexity only when needed\n" +
      "6. **Protect main** - Always require PRs, reviews, and passing tests\n" +
      "7. **Automate everything** - CI/CD should enforce your workflow\n" +
      "8. **Match your cadence** - Strategy should fit how often you release",

    nextSteps: 
      "**What's Next?**\n\n" +
      "You now understand branching strategies! Continue with:\n" +
      "- **CI/CD Pipelines**: Automate testing and deployment for your workflow\n" +
      "- **Feature Flags**: Safely deploy incomplete features\n" +
      "- **Release Management**: Versioning, changelogs, and release notes\n" +
      "- **Monorepo Strategies**: Branching for large multi-project repositories"
  },

  'dockerfile-mastery': {
    introduction: 
      "A Dockerfile is the blueprint for your container - a set of instructions that tells Docker exactly " +
      "how to build your application's environment. Mastering Dockerfiles means you can package ANY application " +
      "to run consistently on any machine, from your laptop to production servers across the globe.\n\n" +
      "In this lesson, you'll go from basic Dockerfiles to production-grade images. You'll learn optimization " +
      "techniques that shrink images from gigabytes to megabytes, security hardening to protect against attacks, " +
      "and multi-stage builds that separate build-time dependencies from runtime. By the end, you'll write " +
      "Dockerfiles that would impress any DevOps team.",

    whyItMatters: 
      "**Why Dockerfile Skills Are Essential:**\n\n" +
      "1. **Reproducibility**: Same image runs identically everywhere - no more 'works on my machine'\n" +
      "2. **Speed**: Optimized images deploy faster, saving CI/CD minutes and cloud costs\n" +
      "3. **Security**: Properly built images reduce attack surface and vulnerabilities\n" +
      "4. **Size**: Smaller images = faster pulls, less storage, quicker scaling\n" +
      "5. **Maintainability**: Well-structured Dockerfiles are easy to update and debug\n\n" +
      "A poorly written Dockerfile creates:\n" +
      "- 2GB images that take 10 minutes to pull\n" +
      "- Security vulnerabilities from running as root\n" +
      "- Cache invalidation on every build\n" +
      "- Confusion when debugging production issues\n\n" +
      "A well-written Dockerfile creates:\n" +
      "- 50MB images that pull in seconds\n" +
      "- Hardened containers with minimal attack surface\n" +
      "- Blazing fast builds with smart caching\n" +
      "- Clear, maintainable infrastructure as code",

    concepts: [
      {
        title: 'Dockerfile Anatomy - Understanding Every Instruction',
        content: 
          "Every Dockerfile instruction creates a new layer in your image:\n\n" +
          "```dockerfile\n" +
          "# ============================================\n" +
          "# DOCKERFILE ANATOMY\n" +
          "# ============================================\n\n" +
          "# FROM - Base image (ALWAYS first, except ARG)\n" +
          "FROM node:20-alpine\n\n" +
          "# LABEL - Metadata about the image\n" +
          "LABEL maintainer=\"you@example.com\"\n" +
          "LABEL version=\"1.0\"\n" +
          "LABEL description=\"My awesome application\"\n\n" +
          "# ARG - Build-time variables (not available at runtime)\n" +
          "ARG NODE_ENV=production\n" +
          "ARG APP_VERSION=1.0.0\n\n" +
          "# ENV - Runtime environment variables\n" +
          "ENV NODE_ENV=${NODE_ENV}\n" +
          "ENV PORT=3000\n\n" +
          "# WORKDIR - Set working directory (creates if not exists)\n" +
          "WORKDIR /app\n\n" +
          "# COPY - Copy files from host to container\n" +
          "COPY package*.json ./\n\n" +
          "# RUN - Execute commands during build\n" +
          "RUN npm ci --only=production\n\n" +
          "# COPY - Copy rest of application\n" +
          "COPY . .\n\n" +
          "# EXPOSE - Document which ports the app uses\n" +
          "EXPOSE 3000\n\n" +
          "# USER - Switch to non-root user\n" +
          "USER node\n\n" +
          "# HEALTHCHECK - Container health monitoring\n" +
          "HEALTHCHECK --interval=30s --timeout=3s \\\n" +
          "  CMD wget -qO- http://localhost:3000/health || exit 1\n\n" +
          "# CMD - Default command when container starts\n" +
          "CMD [\"node\", \"server.js\"]\n" +
          "```\n\n" +
          "**Instruction Reference:**\n\n" +
          "| Instruction | Purpose | Creates Layer? |\n" +
          "|-------------|---------|---------------|\n" +
          "| FROM | Base image | Yes |\n" +
          "| RUN | Execute commands | Yes |\n" +
          "| COPY | Copy files | Yes |\n" +
          "| ADD | Copy + extract | Yes |\n" +
          "| ENV | Set variables | Yes |\n" +
          "| WORKDIR | Change directory | Yes |\n" +
          "| EXPOSE | Document ports | No (metadata) |\n" +
          "| CMD | Default command | No (metadata) |\n" +
          "| ENTRYPOINT | Fixed command | No (metadata) |"
      },
      {
        title: 'Layer Caching - The Key to Fast Builds',
        content: 
          "Docker caches each layer. If nothing changed, it reuses the cached layer:\n\n" +
          "```\n" +
          "┌─────────────────────────────────────────────────────────┐\n" +
          "│                   LAYER CACHING                        │\n" +
          "└─────────────────────────────────────────────────────────┘\n" +
          "\n" +
          "Build #1 (no cache):          Build #2 (with cache):\n" +
          "─────────────────────         ─────────────────────\n" +
          "FROM node:20-alpine           FROM node:20-alpine\n" +
          "     ↓ (download)                  ↓ (CACHED ✓)\n" +
          "COPY package.json             COPY package.json\n" +
          "     ↓ (copy)                      ↓ (CACHED ✓ - file unchanged)\n" +
          "RUN npm install               RUN npm install\n" +
          "     ↓ (install)                   ↓ (CACHED ✓ - no changes above)\n" +
          "COPY . .                      COPY . .\n" +
          "     ↓ (copy all)                  ↓ (REBUILD - code changed)\n" +
          "CMD [\"node\", \"app.js\"]       CMD [\"node\", \"app.js\"]\n" +
          "\n" +
          "Time: 2 minutes               Time: 5 seconds!\n" +
          "```\n\n" +
          "**Cache Invalidation Rules:**\n" +
          "1. If a layer changes, ALL following layers rebuild\n" +
          "2. COPY/ADD invalidate cache if files changed\n" +
          "3. RUN invalidates if the command text changes\n\n" +
          "**Optimization: Order matters!**\n" +
          "```dockerfile\n" +
          "# ❌ BAD - Code changes invalidate npm install cache\n" +
          "COPY . .\n" +
          "RUN npm install\n\n" +
          "# ✅ GOOD - Package.json rarely changes, npm install stays cached\n" +
          "COPY package*.json ./\n" +
          "RUN npm install\n" +
          "COPY . .\n" +
          "```"
      },
      {
        title: 'Multi-Stage Builds - Smaller, Safer Images',
        content: 
          "Multi-stage builds separate build tools from the final image:\n\n" +
          "```dockerfile\n" +
          "# ============================================\n" +
          "# MULTI-STAGE BUILD\n" +
          "# ============================================\n\n" +
          "# Stage 1: Build\n" +
          "FROM node:20-alpine AS builder\n" +
          "WORKDIR /app\n" +
          "COPY package*.json ./\n" +
          "RUN npm ci\n" +
          "COPY . .\n" +
          "RUN npm run build\n" +
          "# Build tools, node_modules, source = 500MB+\n\n" +
          "# Stage 2: Production\n" +
          "FROM node:20-alpine AS production\n" +
          "WORKDIR /app\n" +
          "COPY --from=builder /app/dist ./dist\n" +
          "COPY --from=builder /app/node_modules ./node_modules\n" +
          "COPY package*.json ./\n" +
          "USER node\n" +
          "CMD [\"node\", \"dist/server.js\"]\n" +
          "# Final image = ~100MB\n" +
          "```\n\n" +
          "**Visual Comparison:**\n" +
          "```\n" +
          "Single-Stage Build:              Multi-Stage Build:\n" +
          "┌─────────────────────┐          ┌─────────────────────┐\n" +
          "│ Base Image (100MB)  │          │ Base Image (100MB)  │\n" +
          "├─────────────────────┤          ├─────────────────────┤\n" +
          "│ Build Tools (200MB) │          │ App Code (5MB)      │\n" +
          "├─────────────────────┤          ├─────────────────────┤\n" +
          "│ Dev Dependencies    │          │ Prod Dependencies   │\n" +
          "│ (300MB)             │          │ (50MB)              │\n" +
          "├─────────────────────┤          └─────────────────────┘\n" +
          "│ Source Code (5MB)   │          Total: ~155MB\n" +
          "├─────────────────────┤\n" +
          "│ Built App (5MB)     │\n" +
          "└─────────────────────┘\n" +
          "Total: ~610MB\n" +
          "```\n\n" +
          "**Advanced: Multiple Targets**\n" +
          "```dockerfile\n" +
          "FROM node:20-alpine AS base\n" +
          "WORKDIR /app\n" +
          "COPY package*.json ./\n\n" +
          "FROM base AS development\n" +
          "RUN npm install\n" +
          "CMD [\"npm\", \"run\", \"dev\"]\n\n" +
          "FROM base AS production\n" +
          "RUN npm ci --only=production\n" +
          "COPY . .\n" +
          "CMD [\"npm\", \"start\"]\n" +
          "```\n" +
          "```bash\n" +
          "docker build --target development -t myapp:dev .\n" +
          "docker build --target production -t myapp:prod .\n" +
          "```"
      },
      {
        title: 'Choosing the Right Base Image',
        content: 
          "Your base image choice dramatically affects size and security:\n\n" +
          "```\n" +
          "┌──────────────────────────────────────────────────────────────────┐\n" +
          "│                    BASE IMAGE COMPARISON                        │\n" +
          "├──────────────────┬─────────┬──────────────┬─────────────────────┤\n" +
          "│ Image            │ Size    │ Packages     │ Best For            │\n" +
          "├──────────────────┼─────────┼──────────────┼─────────────────────┤\n" +
          "│ ubuntu:22.04     │ ~77MB   │ Full apt     │ Development         │\n" +
          "│ debian:bookworm  │ ~116MB  │ Full apt     │ Compatibility       │\n" +
          "│ node:20          │ ~1.1GB  │ Full Debian  │ Development         │\n" +
          "│ node:20-slim     │ ~240MB  │ Minimal apt  │ Production          │\n" +
          "│ node:20-alpine   │ ~140MB  │ Minimal apk  │ Production (small)  │\n" +
          "│ alpine:3.19      │ ~7MB    │ Minimal apk  │ Custom builds       │\n" +
          "│ distroless       │ ~2MB    │ None         │ Security-critical   │\n" +
          "│ scratch          │ ~0MB    │ None         │ Static binaries     │\n" +
          "└──────────────────┴─────────┴──────────────┴─────────────────────┘\n" +
          "```\n\n" +
          "**Alpine Linux:**\n" +
          "```dockerfile\n" +
          "# Alpine uses musl libc instead of glibc\n" +
          "FROM node:20-alpine\n" +
          "# Some npm packages need build tools\n" +
          "RUN apk add --no-cache python3 make g++\n" +
          "```\n\n" +
          "**Distroless (Google's minimal images):**\n" +
          "```dockerfile\n" +
          "FROM node:20 AS builder\n" +
          "WORKDIR /app\n" +
          "COPY . .\n" +
          "RUN npm ci && npm run build\n\n" +
          "FROM gcr.io/distroless/nodejs20-debian12\n" +
          "COPY --from=builder /app/dist /app\n" +
          "CMD [\"/app/server.js\"]\n" +
          "# No shell, no package manager = tiny attack surface\n" +
          "```\n\n" +
          "**Scratch (for Go/Rust static binaries):**\n" +
          "```dockerfile\n" +
          "FROM golang:1.22 AS builder\n" +
          "WORKDIR /app\n" +
          "COPY . .\n" +
          "RUN CGO_ENABLED=0 go build -o main\n\n" +
          "FROM scratch\n" +
          "COPY --from=builder /app/main /main\n" +
          "ENTRYPOINT [\"/main\"]\n" +
          "# Final image: just your binary, < 10MB\n" +
          "```"
      },
      {
        title: 'Security Best Practices',
        content: 
          "Secure Dockerfiles prevent common container attacks:\n\n" +
          "**1. Never Run as Root:**\n" +
          "```dockerfile\n" +
          "# ❌ BAD - Runs as root\n" +
          "FROM node:20-alpine\n" +
          "COPY . .\n" +
          "CMD [\"node\", \"app.js\"]\n\n" +
          "# ✅ GOOD - Runs as non-root user\n" +
          "FROM node:20-alpine\n" +
          "WORKDIR /app\n" +
          "COPY --chown=node:node . .\n" +
          "USER node\n" +
          "CMD [\"node\", \"app.js\"]\n" +
          "```\n\n" +
          "**2. Don't Leak Secrets:**\n" +
          "```dockerfile\n" +
          "# ❌ BAD - Secret baked into image\n" +
          "ENV DATABASE_PASSWORD=supersecret\n\n" +
          "# ❌ BAD - Secret visible in layer history\n" +
          "RUN echo \"password\" > /secret && rm /secret\n\n" +
          "# ✅ GOOD - Use build secrets (Docker 18.09+)\n" +
          "RUN --mount=type=secret,id=npmrc,target=/root/.npmrc \\\n" +
          "    npm ci\n" +
          "```\n" +
          "```bash\n" +
          "docker build --secret id=npmrc,src=.npmrc .\n" +
          "```\n\n" +
          "**3. Pin Versions:**\n" +
          "```dockerfile\n" +
          "# ❌ BAD - Unpredictable builds\n" +
          "FROM node:latest\n" +
          "RUN apt-get install nginx\n\n" +
          "# ✅ GOOD - Reproducible builds\n" +
          "FROM node:20.10.0-alpine3.19\n" +
          "RUN apk add --no-cache nginx=1.24.0-r0\n" +
          "```\n\n" +
          "**4. Use .dockerignore:**\n" +
          "```\n" +
          "# .dockerignore\n" +
          ".git\n" +
          ".env\n" +
          "node_modules\n" +
          "*.log\n" +
          "Dockerfile\n" +
          ".dockerignore\n" +
          "tests/\n" +
          "docs/\n" +
          "*.md\n" +
          "```\n\n" +
          "**5. Scan for Vulnerabilities:**\n" +
          "```bash\n" +
          "# Scan image for known CVEs\n" +
          "docker scout quickview myimage:latest\n" +
          "docker scout cves myimage:latest\n\n" +
          "# Or use Trivy\n" +
          "trivy image myimage:latest\n" +
          "```"
      },
      {
        title: 'ENTRYPOINT vs CMD - Understanding the Difference',
        content: 
          "Both define what runs when a container starts, but they work differently:\n\n" +
          "**CMD - Default command (can be overridden):**\n" +
          "```dockerfile\n" +
          "FROM python:3.12-alpine\n" +
          "CMD [\"python\", \"app.py\"]\n" +
          "```\n" +
          "```bash\n" +
          "docker run myimage              # Runs: python app.py\n" +
          "docker run myimage python -V    # Runs: python -V (overrides CMD)\n" +
          "```\n\n" +
          "**ENTRYPOINT - Fixed command (args appended):**\n" +
          "```dockerfile\n" +
          "FROM python:3.12-alpine\n" +
          "ENTRYPOINT [\"python\"]\n" +
          "```\n" +
          "```bash\n" +
          "docker run myimage app.py       # Runs: python app.py\n" +
          "docker run myimage -V           # Runs: python -V\n" +
          "```\n\n" +
          "**Combining Both (Best Practice):**\n" +
          "```dockerfile\n" +
          "FROM python:3.12-alpine\n" +
          "COPY app.py .\n" +
          "ENTRYPOINT [\"python\"]     # Fixed executable\n" +
          "CMD [\"app.py\"]            # Default file (can be changed)\n" +
          "```\n" +
          "```bash\n" +
          "docker run myimage              # Runs: python app.py\n" +
          "docker run myimage test.py      # Runs: python test.py\n" +
          "```\n\n" +
          "**Shell Form vs Exec Form:**\n" +
          "```dockerfile\n" +
          "# Shell form (runs in shell, allows variables)\n" +
          "CMD echo \"Hello $NAME\"\n" +
          "# Actually runs: /bin/sh -c 'echo \"Hello $NAME\"'\n\n" +
          "# Exec form (no shell, direct exec, preferred)\n" +
          "CMD [\"echo\", \"Hello\", \"$NAME\"]\n" +
          "# Runs directly, $NAME won't expand\n\n" +
          "# Exec form with shell for variable expansion\n" +
          "CMD [\"/bin/sh\", \"-c\", \"echo Hello $NAME\"]\n" +
          "```"
      }
    ],

    stepByStep: [
      {
        title: 'Step 1: Create a Basic Node.js Dockerfile',
        content: 
          "```dockerfile\n" +
          "# Dockerfile\n\n" +
          "# Use official Node.js runtime as base\n" +
          "FROM node:20-alpine\n\n" +
          "# Set working directory\n" +
          "WORKDIR /app\n\n" +
          "# Copy package files first (for caching)\n" +
          "COPY package.json package-lock.json ./\n\n" +
          "# Install dependencies\n" +
          "RUN npm ci --only=production\n\n" +
          "# Copy application code\n" +
          "COPY . .\n\n" +
          "# Document the port\n" +
          "EXPOSE 3000\n\n" +
          "# Start the application\n" +
          "CMD [\"node\", \"server.js\"]\n" +
          "```\n\n" +
          "```bash\n" +
          "# Build the image\n" +
          "docker build -t myapp:v1 .\n\n" +
          "# Run the container\n" +
          "docker run -p 3000:3000 myapp:v1\n" +
          "```"
      },
      {
        title: 'Step 2: Add .dockerignore',
        content: 
          "```bash\n" +
          "# Create .dockerignore in the same directory as Dockerfile\n" +
          "cat > .dockerignore << 'EOF'\n" +
          "# Dependencies\n" +
          "node_modules\n" +
          "npm-debug.log\n\n" +
          "# Git\n" +
          ".git\n" +
          ".gitignore\n\n" +
          "# Docker\n" +
          "Dockerfile*\n" +
          ".dockerignore\n" +
          "docker-compose*.yml\n\n" +
          "# Environment\n" +
          ".env\n" +
          ".env.*\n\n" +
          "# IDE\n" +
          ".vscode\n" +
          ".idea\n\n" +
          "# Testing\n" +
          "coverage/\n" +
          "__tests__/\n" +
          "*.test.js\n\n" +
          "# Documentation\n" +
          "*.md\n" +
          "docs/\n" +
          "EOF\n" +
          "```\n\n" +
          "**Why .dockerignore matters:**\n" +
          "- Faster builds (less to copy)\n" +
          "- Smaller build context\n" +
          "- No secrets leaked into image\n" +
          "- No cache invalidation from irrelevant files"
      },
      {
        title: 'Step 3: Optimize with Multi-Stage Build',
        content: 
          "```dockerfile\n" +
          "# ============================================\n" +
          "# Stage 1: Dependencies\n" +
          "# ============================================\n" +
          "FROM node:20-alpine AS deps\n" +
          "WORKDIR /app\n" +
          "COPY package.json package-lock.json ./\n" +
          "RUN npm ci\n\n" +
          "# ============================================\n" +
          "# Stage 2: Builder\n" +
          "# ============================================\n" +
          "FROM node:20-alpine AS builder\n" +
          "WORKDIR /app\n" +
          "COPY --from=deps /app/node_modules ./node_modules\n" +
          "COPY . .\n" +
          "RUN npm run build\n" +
          "RUN npm prune --production\n\n" +
          "# ============================================\n" +
          "# Stage 3: Production\n" +
          "# ============================================\n" +
          "FROM node:20-alpine AS production\n" +
          "WORKDIR /app\n\n" +
          "# Create non-root user\n" +
          "RUN addgroup -g 1001 -S nodejs && \\\n" +
          "    adduser -S nodejs -u 1001\n\n" +
          "# Copy only production files\n" +
          "COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist\n" +
          "COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules\n" +
          "COPY --from=builder --chown=nodejs:nodejs /app/package.json ./\n\n" +
          "# Switch to non-root user\n" +
          "USER nodejs\n\n" +
          "EXPOSE 3000\n" +
          "ENV NODE_ENV=production\n\n" +
          "CMD [\"node\", \"dist/server.js\"]\n" +
          "```"
      },
      {
        title: 'Step 4: Add Health Checks',
        content: 
          "```dockerfile\n" +
          "FROM node:20-alpine\n" +
          "WORKDIR /app\n\n" +
          "COPY package*.json ./\n" +
          "RUN npm ci --only=production\n" +
          "COPY . .\n\n" +
          "# Add curl for health checks (or use wget on alpine)\n" +
          "RUN apk add --no-cache curl\n\n" +
          "# Health check configuration\n" +
          "HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \\\n" +
          "  CMD curl -f http://localhost:3000/health || exit 1\n\n" +
          "EXPOSE 3000\n" +
          "USER node\n" +
          "CMD [\"node\", \"server.js\"]\n" +
          "```\n\n" +
          "**Health check options:**\n" +
          "- `--interval`: Time between checks (default: 30s)\n" +
          "- `--timeout`: Time to wait for response (default: 30s)\n" +
          "- `--start-period`: Grace period for startup (default: 0s)\n" +
          "- `--retries`: Failures before unhealthy (default: 3)\n\n" +
          "**Check container health:**\n" +
          "```bash\n" +
          "docker ps\n" +
          "# CONTAINER ID  IMAGE    STATUS\n" +
          "# abc123        myapp    Up 5 minutes (healthy)\n" +
          "\n" +
          "docker inspect --format='{{.State.Health.Status}}' <container>\n" +
          "```"
      },
      {
        title: 'Step 5: Use Build Arguments for Flexibility',
        content: 
          "```dockerfile\n" +
          "# Build arguments with defaults\n" +
          "ARG NODE_VERSION=20\n" +
          "ARG ALPINE_VERSION=3.19\n\n" +
          "FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION}\n\n" +
          "# Build-time arguments\n" +
          "ARG BUILD_DATE\n" +
          "ARG GIT_COMMIT\n" +
          "ARG APP_VERSION=0.0.0\n\n" +
          "# Labels for traceability\n" +
          "LABEL org.opencontainers.image.created=\"${BUILD_DATE}\"\n" +
          "LABEL org.opencontainers.image.revision=\"${GIT_COMMIT}\"\n" +
          "LABEL org.opencontainers.image.version=\"${APP_VERSION}\"\n\n" +
          "WORKDIR /app\n" +
          "COPY package*.json ./\n" +
          "RUN npm ci --only=production\n" +
          "COPY . .\n\n" +
          "# Convert ARG to ENV for runtime access\n" +
          "ENV APP_VERSION=${APP_VERSION}\n\n" +
          "CMD [\"node\", \"server.js\"]\n" +
          "```\n\n" +
          "```bash\n" +
          "# Build with arguments\n" +
          "docker build \\\n" +
          "  --build-arg BUILD_DATE=$(date -u +\"%Y-%m-%dT%H:%M:%SZ\") \\\n" +
          "  --build-arg GIT_COMMIT=$(git rev-parse HEAD) \\\n" +
          "  --build-arg APP_VERSION=1.2.3 \\\n" +
          "  -t myapp:1.2.3 .\n\n" +
          "# Check labels\n" +
          "docker inspect myapp:1.2.3 --format='{{json .Config.Labels}}' | jq\n" +
          "```"
      },
      {
        title: 'Step 6: Python Dockerfile Example',
        content: 
          "```dockerfile\n" +
          "# ============================================\n" +
          "# Python Multi-Stage Dockerfile\n" +
          "# ============================================\n\n" +
          "# Stage 1: Builder\n" +
          "FROM python:3.12-slim AS builder\n\n" +
          "# Install build dependencies\n" +
          "RUN apt-get update && apt-get install -y --no-install-recommends \\\n" +
          "    build-essential \\\n" +
          "    && rm -rf /var/lib/apt/lists/*\n\n" +
          "# Create virtual environment\n" +
          "RUN python -m venv /opt/venv\n" +
          "ENV PATH=\"/opt/venv/bin:$PATH\"\n\n" +
          "# Install dependencies\n" +
          "COPY requirements.txt .\n" +
          "RUN pip install --no-cache-dir -r requirements.txt\n\n" +
          "# Stage 2: Production\n" +
          "FROM python:3.12-slim AS production\n\n" +
          "# Copy virtual environment from builder\n" +
          "COPY --from=builder /opt/venv /opt/venv\n" +
          "ENV PATH=\"/opt/venv/bin:$PATH\"\n\n" +
          "# Create non-root user\n" +
          "RUN useradd --create-home appuser\n" +
          "WORKDIR /home/appuser/app\n" +
          "USER appuser\n\n" +
          "# Copy application\n" +
          "COPY --chown=appuser:appuser . .\n\n" +
          "EXPOSE 8000\n\n" +
          "CMD [\"gunicorn\", \"--bind\", \"0.0.0.0:8000\", \"app:app\"]\n" +
          "```"
      }
    ],

    commonMistakes: [
      "**Running as root** - Always use USER to switch to non-root. Root in container = root escape vulnerabilities.",
      "**Using :latest tag** - Builds become non-reproducible. Pin specific versions like node:20.10.0-alpine3.19.",
      "**Copying node_modules** - Always npm install in Docker, never copy node_modules from host (architecture differences).",
      "**One RUN per command** - Each RUN creates a layer. Combine related commands with && to reduce layers.",
      "**Ignoring layer cache** - Copy package.json before npm install. Copy code after. Order matters!",
      "**Secrets in ENV** - Environment variables are visible in image history. Use --mount=type=secret instead.",
      "**Not using .dockerignore** - Copying .git, node_modules, and .env wastes time and leaks secrets.",
      "**Forgetting HEALTHCHECK** - Orchestrators like Kubernetes rely on health checks to manage containers."
    ],

    bestPractices: [
      "**Use multi-stage builds** to separate build-time and runtime dependencies",
      "**Pin base image versions** for reproducible builds",
      "**Order instructions by change frequency** - rarely changing first, frequently changing last",
      "**Combine RUN commands** with && and \\ for fewer layers",
      "**Run as non-root user** for security",
      "**Use COPY instead of ADD** unless you need tar extraction",
      "**Add HEALTHCHECK** for production containers",
      "**Use .dockerignore** to exclude unnecessary files",
      "**Label images** with version, git commit, and build date",
      "**Scan images** for vulnerabilities before deployment"
    ],

    realWorldExample: 
      "**Scenario: Production-Ready Next.js Dockerfile**\n\n" +
      "```dockerfile\n" +
      "# ============================================\n" +
      "# Next.js Production Dockerfile\n" +
      "# ============================================\n\n" +
      "# Stage 1: Dependencies\n" +
      "FROM node:20-alpine AS deps\n" +
      "RUN apk add --no-cache libc6-compat\n" +
      "WORKDIR /app\n" +
      "COPY package.json package-lock.json ./\n" +
      "RUN npm ci\n\n" +
      "# Stage 2: Builder\n" +
      "FROM node:20-alpine AS builder\n" +
      "WORKDIR /app\n" +
      "COPY --from=deps /app/node_modules ./node_modules\n" +
      "COPY . .\n\n" +
      "# Build arguments for environment\n" +
      "ARG NEXT_PUBLIC_API_URL\n" +
      "ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}\n\n" +
      "# Disable telemetry during build\n" +
      "ENV NEXT_TELEMETRY_DISABLED=1\n\n" +
      "RUN npm run build\n\n" +
      "# Stage 3: Production Runner\n" +
      "FROM node:20-alpine AS runner\n" +
      "WORKDIR /app\n\n" +
      "ENV NODE_ENV=production\n" +
      "ENV NEXT_TELEMETRY_DISABLED=1\n\n" +
      "# Create non-root user\n" +
      "RUN addgroup --system --gid 1001 nodejs\n" +
      "RUN adduser --system --uid 1001 nextjs\n\n" +
      "# Copy only necessary files\n" +
      "COPY --from=builder /app/public ./public\n" +
      "COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./\n" +
      "COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static\n\n" +
      "USER nextjs\n\n" +
      "EXPOSE 3000\n" +
      "ENV PORT=3000\n" +
      "ENV HOSTNAME=\"0.0.0.0\"\n\n" +
      "HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\\n" +
      "  CMD wget -qO- http://localhost:3000/api/health || exit 1\n\n" +
      "CMD [\"node\", \"server.js\"]\n" +
      "```\n\n" +
      "**next.config.js for standalone output:**\n" +
      "```javascript\n" +
      "module.exports = {\n" +
      "  output: 'standalone',\n" +
      "}\n" +
      "```\n\n" +
      "**Build and run:**\n" +
      "```bash\n" +
      "# Build with API URL\n" +
      "docker build \\\n" +
      "  --build-arg NEXT_PUBLIC_API_URL=https://api.example.com \\\n" +
      "  -t myapp:latest .\n\n" +
      "# Check image size\n" +
      "docker images myapp:latest\n" +
      "# REPOSITORY  TAG     SIZE\n" +
      "# myapp       latest  ~150MB (vs 1GB+ without optimization)\n\n" +
      "# Run container\n" +
      "docker run -p 3000:3000 myapp:latest\n" +
      "```",

    summary: 
      "## 📝 Key Takeaways\n\n" +
      "1. **Layer order matters** - Put rarely-changing instructions first for cache efficiency\n" +
      "2. **Multi-stage builds** separate build tools from production image (10x smaller)\n" +
      "3. **Never run as root** - Always switch to non-root USER\n" +
      "4. **Pin versions** for reproducible builds\n" +
      "5. **Use .dockerignore** to exclude unnecessary files\n" +
      "6. **COPY before npm install** for dependency caching\n" +
      "7. **HEALTHCHECK** enables orchestrator health monitoring\n" +
      "8. **Scan images** for vulnerabilities before production",

    nextSteps: 
      "**What's Next?**\n\n" +
      "You can now write professional Dockerfiles! Continue with:\n" +
      "- **Docker Compose**: Multi-container applications\n" +
      "- **Docker Networking**: Container communication patterns\n" +
      "- **Image Registries**: Pushing to Docker Hub, ECR, GCR\n" +
      "- **Kubernetes**: Deploying containers at scale"
  },

  'docker-compose-for-multi-container-apps': {
    introduction: 
      "Real applications aren't just one container. They're a web server, a database, a cache, a message " +
      "queue, and more - all working together. Docker Compose lets you define and run multi-container " +
      "applications with a single YAML file. One command and your entire stack spins up.\n\n" +
      "In this lesson, you'll learn to orchestrate complex applications locally. You'll connect containers " +
      "with networks, persist data with volumes, manage secrets, and create development environments that " +
      "mirror production. By the end, you'll be able to spin up full application stacks in seconds.",

    whyItMatters: 
      "**Why Docker Compose Is Essential:**\n\n" +
      "1. **Development Parity**: Run the exact same stack locally as in production\n" +
      "2. **Onboarding Speed**: New developers run `docker compose up` and they're ready\n" +
      "3. **Isolation**: Each project has its own isolated environment\n" +
      "4. **Reproducibility**: Infrastructure defined in code, version controlled\n" +
      "5. **Testing**: Spin up dependencies for integration tests instantly\n\n" +
      "Without Compose, starting a typical app means:\n" +
      "```bash\n" +
      "# Painful manual process\n" +
      "docker run -d --name postgres -e POSTGRES_PASSWORD=... postgres:16\n" +
      "docker run -d --name redis redis:7\n" +
      "docker run -d --name app --link postgres --link redis myapp\n" +
      "# Hope you remembered all the flags correctly...\n" +
      "```\n\n" +
      "With Compose:\n" +
      "```bash\n" +
      "docker compose up -d  # Everything starts, networked, configured\n" +
      "```",

    concepts: [
      {
        title: 'Compose File Structure - The Blueprint',
        content: 
          "A compose.yaml (or docker-compose.yml) defines your entire application stack:\n\n" +
          "```yaml\n" +
          "# compose.yaml\n" +
          "# ============================================\n" +
          "# Top-level elements\n" +
          "# ============================================\n\n" +
          "name: my-application  # Project name (optional)\n\n" +
          "services:             # Container definitions\n" +
          "  web:\n" +
          "    image: nginx\n" +
          "  api:\n" +
          "    build: ./api\n" +
          "  db:\n" +
          "    image: postgres:16\n\n" +
          "networks:             # Custom networks\n" +
          "  frontend:\n" +
          "  backend:\n\n" +
          "volumes:              # Persistent storage\n" +
          "  db-data:\n" +
          "  cache-data:\n\n" +
          "secrets:              # Sensitive data\n" +
          "  db-password:\n" +
          "    file: ./secrets/db-password.txt\n\n" +
          "configs:              # Configuration files\n" +
          "  nginx-config:\n" +
          "    file: ./nginx.conf\n" +
          "```\n\n" +
          "**Visual Structure:**\n" +
          "```\n" +
          "┌─────────────────────────────────────────────────────────┐\n" +
          "│                    compose.yaml                        │\n" +
          "├───────────────┬───────────────┬───────────────────────┤\n" +
          "│   services    │   networks    │       volumes         │\n" +
          "├───────────────┼───────────────┼───────────────────────┤\n" +
          "│ ┌───────────┐ │ ┌───────────┐ │ ┌─────────────────┐   │\n" +
          "│ │    web    │ │ │  frontend │ │ │    db-data      │   │\n" +
          "│ └───────────┘ │ └───────────┘ │ └─────────────────┘   │\n" +
          "│ ┌───────────┐ │ ┌───────────┐ │ ┌─────────────────┐   │\n" +
          "│ │    api    │ │ │  backend  │ │ │   cache-data    │   │\n" +
          "│ └───────────┘ │ └───────────┘ │ └─────────────────┘   │\n" +
          "│ ┌───────────┐ │               │                       │\n" +
          "│ │    db     │ │               │                       │\n" +
          "│ └───────────┘ │               │                       │\n" +
          "└───────────────┴───────────────┴───────────────────────┘\n" +
          "```"
      },
      {
        title: 'Services - Defining Containers',
        content: 
          "Each service becomes a container with its own configuration:\n\n" +
          "```yaml\n" +
          "services:\n" +
          "  # Service using a pre-built image\n" +
          "  database:\n" +
          "    image: postgres:16-alpine\n" +
          "    container_name: my-postgres    # Custom container name\n" +
          "    restart: unless-stopped        # Restart policy\n" +
          "    environment:\n" +
          "      POSTGRES_USER: myapp\n" +
          "      POSTGRES_PASSWORD: secret\n" +
          "      POSTGRES_DB: myapp_db\n" +
          "    volumes:\n" +
          "      - db-data:/var/lib/postgresql/data\n" +
          "    ports:\n" +
          "      - \"5432:5432\"               # host:container\n" +
          "    healthcheck:\n" +
          "      test: [\"CMD-SHELL\", \"pg_isready -U myapp\"]\n" +
          "      interval: 10s\n" +
          "      timeout: 5s\n" +
          "      retries: 5\n\n" +
          "  # Service built from Dockerfile\n" +
          "  api:\n" +
          "    build:\n" +
          "      context: ./backend           # Build context\n" +
          "      dockerfile: Dockerfile       # Dockerfile path\n" +
          "      args:                        # Build arguments\n" +
          "        NODE_ENV: production\n" +
          "    ports:\n" +
          "      - \"3000:3000\"\n" +
          "    environment:\n" +
          "      DATABASE_URL: postgres://myapp:secret@database:5432/myapp_db\n" +
          "    depends_on:\n" +
          "      database:\n" +
          "        condition: service_healthy  # Wait for DB to be ready\n" +
          "    networks:\n" +
          "      - backend\n" +
          "```\n\n" +
          "**Key Service Options:**\n\n" +
          "| Option | Purpose |\n" +
          "|--------|--------|\n" +
          "| `image` | Use existing image |\n" +
          "| `build` | Build from Dockerfile |\n" +
          "| `ports` | Expose ports to host |\n" +
          "| `environment` | Set env variables |\n" +
          "| `volumes` | Mount storage |\n" +
          "| `depends_on` | Start order |\n" +
          "| `networks` | Connect to networks |\n" +
          "| `restart` | Restart policy |\n" +
          "| `healthcheck` | Health monitoring |"
      },
      {
        title: 'Networking - How Containers Communicate',
        content: 
          "Compose creates a default network for all services. Containers use service names as hostnames:\n\n" +
          "```yaml\n" +
          "services:\n" +
          "  api:\n" +
          "    build: ./api\n" +
          "    environment:\n" +
          "      # Use service name 'database', not localhost!\n" +
          "      DATABASE_URL: postgres://user:pass@database:5432/mydb\n" +
          "      REDIS_URL: redis://cache:6379\n" +
          "  \n" +
          "  database:\n" +
          "    image: postgres:16\n" +
          "  \n" +
          "  cache:\n" +
          "    image: redis:7\n" +
          "```\n\n" +
          "**Network Isolation with Multiple Networks:**\n" +
          "```yaml\n" +
          "services:\n" +
          "  # Frontend only talks to API\n" +
          "  frontend:\n" +
          "    build: ./frontend\n" +
          "    networks:\n" +
          "      - frontend-net\n" +
          "    ports:\n" +
          "      - \"80:80\"\n" +
          "  \n" +
          "  # API talks to both frontend and backend\n" +
          "  api:\n" +
          "    build: ./api\n" +
          "    networks:\n" +
          "      - frontend-net\n" +
          "      - backend-net\n" +
          "  \n" +
          "  # Database only accessible from backend network\n" +
          "  database:\n" +
          "    image: postgres:16\n" +
          "    networks:\n" +
          "      - backend-net\n" +
          "    # No ports exposed! Only internal access\n\n" +
          "networks:\n" +
          "  frontend-net:\n" +
          "  backend-net:\n" +
          "```\n\n" +
          "**Visual Network Diagram:**\n" +
          "```\n" +
          "┌─────────────────────────────────────────────────────────┐\n" +
          "│                     frontend-net                       │\n" +
          "│  ┌──────────────┐              ┌──────────────┐        │\n" +
          "│  │   frontend   │◄────────────►│     api      │        │\n" +
          "│  │   (nginx)    │              │   (node.js)  │        │\n" +
          "│  └──────────────┘              └──────────────┘        │\n" +
          "│        ▲                              │                │\n" +
          "└────────│──────────────────────────────│────────────────┘\n" +
          "         │ :80                          │\n" +
          "    [Internet]                          │\n" +
          "                                        │\n" +
          "┌────────────────────────────────────────│────────────────┐\n" +
          "│                     backend-net       │                │\n" +
          "│                              ┌────────▼─────┐          │\n" +
          "│                              │     api      │          │\n" +
          "│                              └──────────────┘          │\n" +
          "│                                     │                  │\n" +
          "│              ┌──────────────────────┴───────┐          │\n" +
          "│              ▼                              ▼          │\n" +
          "│  ┌──────────────┐              ┌──────────────┐        │\n" +
          "│  │   database   │              │    cache     │        │\n" +
          "│  │  (postgres)  │              │   (redis)    │        │\n" +
          "│  └──────────────┘              └──────────────┘        │\n" +
          "│     No external                  No external          │\n" +
          "│     access!                      access!               │\n" +
          "└─────────────────────────────────────────────────────────┘\n" +
          "```"
      },
      {
        title: 'Volumes - Persistent Data Storage',
        content: 
          "Containers are ephemeral. Volumes persist data across restarts:\n\n" +
          "```yaml\n" +
          "services:\n" +
          "  database:\n" +
          "    image: postgres:16\n" +
          "    volumes:\n" +
          "      # Named volume - managed by Docker\n" +
          "      - db-data:/var/lib/postgresql/data\n" +
          "      \n" +
          "      # Bind mount - host directory\n" +
          "      - ./init-scripts:/docker-entrypoint-initdb.d:ro\n" +
          "      \n" +
          "      # Anonymous volume (not recommended for important data)\n" +
          "      - /var/log\n\n" +
          "  app:\n" +
          "    build: .\n" +
          "    volumes:\n" +
          "      # Development: Mount source code for hot reload\n" +
          "      - ./src:/app/src\n" +
          "      \n" +
          "      # Prevent overwriting node_modules from host\n" +
          "      - /app/node_modules\n\n" +
          "volumes:\n" +
          "  db-data:                    # Named volume definition\n" +
          "    driver: local\n" +
          "  \n" +
          "  # External volume (created outside Compose)\n" +
          "  shared-data:\n" +
          "    external: true\n" +
          "```\n\n" +
          "**Volume Types Comparison:**\n" +
          "```\n" +
          "┌─────────────────────────────────────────────────────────────┐\n" +
          "│                    VOLUME TYPES                            │\n" +
          "├───────────────┬──────────────────┬──────────────────────────┤\n" +
          "│ Type          │ Syntax           │ Use Case                 │\n" +
          "├───────────────┼──────────────────┼──────────────────────────┤\n" +
          "│ Named Volume  │ volume:/path     │ Database, persistent     │\n" +
          "│ Bind Mount    │ ./host:/path     │ Development, configs     │\n" +
          "│ Anonymous     │ /path            │ Temporary, caches        │\n" +
          "│ tmpfs         │ type: tmpfs      │ Secrets, temp data       │\n" +
          "└───────────────┴──────────────────┴──────────────────────────┘\n" +
          "```\n\n" +
          "**Volume Commands:**\n" +
          "```bash\n" +
          "# List volumes\n" +
          "docker volume ls\n\n" +
          "# Inspect volume details\n" +
          "docker volume inspect myproject_db-data\n\n" +
          "# Backup a volume\n" +
          "docker run --rm -v myproject_db-data:/data -v $(pwd):/backup \\\n" +
          "  alpine tar czf /backup/db-backup.tar.gz /data\n" +
          "```"
      },
      {
        title: 'Environment Variables and Secrets',
        content: 
          "Multiple ways to pass configuration to containers:\n\n" +
          "**1. Direct in compose.yaml:**\n" +
          "```yaml\n" +
          "services:\n" +
          "  app:\n" +
          "    environment:\n" +
          "      NODE_ENV: production\n" +
          "      API_KEY: abc123  # ❌ Don't commit secrets!\n" +
          "```\n\n" +
          "**2. From .env file (auto-loaded):**\n" +
          "```bash\n" +
          "# .env (in same directory as compose.yaml)\n" +
          "POSTGRES_PASSWORD=supersecret\n" +
          "API_KEY=abc123\n" +
          "```\n" +
          "```yaml\n" +
          "services:\n" +
          "  db:\n" +
          "    environment:\n" +
          "      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}\n" +
          "```\n\n" +
          "**3. From env_file:**\n" +
          "```yaml\n" +
          "services:\n" +
          "  app:\n" +
          "    env_file:\n" +
          "      - .env              # Common variables\n" +
          "      - .env.production   # Environment-specific\n" +
          "```\n\n" +
          "**4. Docker Secrets (more secure):**\n" +
          "```yaml\n" +
          "services:\n" +
          "  app:\n" +
          "    secrets:\n" +
          "      - db_password\n" +
          "    environment:\n" +
          "      DB_PASSWORD_FILE: /run/secrets/db_password\n\n" +
          "secrets:\n" +
          "  db_password:\n" +
          "    file: ./secrets/db_password.txt\n" +
          "```\n\n" +
          "**Security Best Practices:**\n" +
          "```bash\n" +
          "# .gitignore\n" +
          ".env\n" +
          ".env.*\n" +
          "secrets/\n\n" +
          "# Commit a template instead\n" +
          "# .env.example\n" +
          "POSTGRES_PASSWORD=change_me\n" +
          "API_KEY=your_api_key_here\n" +
          "```"
      },
      {
        title: 'depends_on and Service Startup Order',
        content: 
          "Control startup order and wait for dependencies:\n\n" +
          "**Basic depends_on (order only):**\n" +
          "```yaml\n" +
          "services:\n" +
          "  api:\n" +
          "    build: .\n" +
          "    depends_on:\n" +
          "      - database\n" +
          "      - cache\n" +
          "    # Starts AFTER database and cache containers start\n" +
          "    # But doesn't wait for them to be READY!\n" +
          "  \n" +
          "  database:\n" +
          "    image: postgres:16\n" +
          "  \n" +
          "  cache:\n" +
          "    image: redis:7\n" +
          "```\n\n" +
          "**With Health Checks (wait for ready):**\n" +
          "```yaml\n" +
          "services:\n" +
          "  api:\n" +
          "    build: .\n" +
          "    depends_on:\n" +
          "      database:\n" +
          "        condition: service_healthy  # Wait for healthy\n" +
          "      cache:\n" +
          "        condition: service_started  # Just started\n" +
          "  \n" +
          "  database:\n" +
          "    image: postgres:16\n" +
          "    healthcheck:\n" +
          "      test: [\"CMD-SHELL\", \"pg_isready -U postgres\"]\n" +
          "      interval: 5s\n" +
          "      timeout: 5s\n" +
          "      retries: 5\n" +
          "  \n" +
          "  cache:\n" +
          "    image: redis:7\n" +
          "    healthcheck:\n" +
          "      test: [\"CMD\", \"redis-cli\", \"ping\"]\n" +
          "      interval: 5s\n" +
          "      timeout: 3s\n" +
          "      retries: 5\n" +
          "```\n\n" +
          "**Startup Order Visual:**\n" +
          "```\n" +
          "Time ──────────────────────────────────────────────────►\n" +
          "\n" +
          "database  [Starting...][Initializing...][✓ Healthy]\n" +
          "                                               │\n" +
          "cache     [Starting...]      [✓ Healthy]      │\n" +
          "                                    │         │\n" +
          "api                                 │         │\n" +
          "          (waiting)                 │         └──[Starting...][✓ Running]\n" +
          "                                    │\n" +
          "          Wait for cache ───────────┘\n" +
          "          Wait for database ────────────────────┘\n" +
          "```"
      }
    ],

    stepByStep: [
      {
        title: 'Step 1: Create a Basic Full-Stack Compose File',
        content: 
          "```yaml\n" +
          "# compose.yaml\n" +
          "name: fullstack-app\n\n" +
          "services:\n" +
          "  # Frontend (React/Next.js)\n" +
          "  frontend:\n" +
          "    build: ./frontend\n" +
          "    ports:\n" +
          "      - \"3000:3000\"\n" +
          "    environment:\n" +
          "      - NEXT_PUBLIC_API_URL=http://localhost:4000\n" +
          "    depends_on:\n" +
          "      - api\n\n" +
          "  # Backend API (Node.js/Express)\n" +
          "  api:\n" +
          "    build: ./backend\n" +
          "    ports:\n" +
          "      - \"4000:4000\"\n" +
          "    environment:\n" +
          "      - DATABASE_URL=postgres://user:password@db:5432/myapp\n" +
          "      - REDIS_URL=redis://cache:6379\n" +
          "    depends_on:\n" +
          "      db:\n" +
          "        condition: service_healthy\n" +
          "      cache:\n" +
          "        condition: service_healthy\n\n" +
          "  # PostgreSQL Database\n" +
          "  db:\n" +
          "    image: postgres:16-alpine\n" +
          "    environment:\n" +
          "      POSTGRES_USER: user\n" +
          "      POSTGRES_PASSWORD: password\n" +
          "      POSTGRES_DB: myapp\n" +
          "    volumes:\n" +
          "      - postgres-data:/var/lib/postgresql/data\n" +
          "    healthcheck:\n" +
          "      test: [\"CMD-SHELL\", \"pg_isready -U user -d myapp\"]\n" +
          "      interval: 5s\n" +
          "      timeout: 5s\n" +
          "      retries: 5\n\n" +
          "  # Redis Cache\n" +
          "  cache:\n" +
          "    image: redis:7-alpine\n" +
          "    healthcheck:\n" +
          "      test: [\"CMD\", \"redis-cli\", \"ping\"]\n" +
          "      interval: 5s\n" +
          "      timeout: 3s\n" +
          "      retries: 5\n\n" +
          "volumes:\n" +
          "  postgres-data:\n" +
          "```"
      },
      {
        title: 'Step 2: Essential Compose Commands',
        content: 
          "```bash\n" +
          "# Start all services (detached mode)\n" +
          "docker compose up -d\n\n" +
          "# Start and rebuild images\n" +
          "docker compose up -d --build\n\n" +
          "# View running services\n" +
          "docker compose ps\n\n" +
          "# View logs (all services)\n" +
          "docker compose logs\n\n" +
          "# View logs for specific service (follow mode)\n" +
          "docker compose logs -f api\n\n" +
          "# Execute command in running container\n" +
          "docker compose exec api npm run migrate\n" +
          "docker compose exec db psql -U user -d myapp\n\n" +
          "# Stop all services\n" +
          "docker compose stop\n\n" +
          "# Stop and remove containers, networks\n" +
          "docker compose down\n\n" +
          "# Stop and remove everything including volumes (!)\n" +
          "docker compose down -v\n\n" +
          "# Restart specific service\n" +
          "docker compose restart api\n\n" +
          "# Scale a service\n" +
          "docker compose up -d --scale api=3\n\n" +
          "# View resource usage\n" +
          "docker compose stats\n" +
          "```"
      },
      {
        title: 'Step 3: Development vs Production Configurations',
        content: 
          "**Base compose.yaml:**\n" +
          "```yaml\n" +
          "# compose.yaml (shared configuration)\n" +
          "services:\n" +
          "  api:\n" +
          "    build: ./backend\n" +
          "    environment:\n" +
          "      - DATABASE_URL=postgres://user:pass@db:5432/app\n" +
          "  \n" +
          "  db:\n" +
          "    image: postgres:16-alpine\n" +
          "    volumes:\n" +
          "      - postgres-data:/var/lib/postgresql/data\n\n" +
          "volumes:\n" +
          "  postgres-data:\n" +
          "```\n\n" +
          "**compose.override.yaml (development, auto-loaded):**\n" +
          "```yaml\n" +
          "# compose.override.yaml\n" +
          "services:\n" +
          "  api:\n" +
          "    build:\n" +
          "      target: development\n" +
          "    volumes:\n" +
          "      - ./backend/src:/app/src  # Hot reload\n" +
          "    ports:\n" +
          "      - \"4000:4000\"\n" +
          "      - \"9229:9229\"  # Debug port\n" +
          "    environment:\n" +
          "      - NODE_ENV=development\n" +
          "    command: npm run dev\n" +
          "  \n" +
          "  db:\n" +
          "    ports:\n" +
          "      - \"5432:5432\"  # Expose for local tools\n" +
          "```\n\n" +
          "**compose.prod.yaml (production):**\n" +
          "```yaml\n" +
          "# compose.prod.yaml\n" +
          "services:\n" +
          "  api:\n" +
          "    build:\n" +
          "      target: production\n" +
          "    restart: always\n" +
          "    environment:\n" +
          "      - NODE_ENV=production\n" +
          "    deploy:\n" +
          "      replicas: 3\n" +
          "      resources:\n" +
          "        limits:\n" +
          "          cpus: '0.5'\n" +
          "          memory: 512M\n" +
          "  \n" +
          "  db:\n" +
          "    restart: always\n" +
          "    # No port exposed in production!\n" +
          "```\n\n" +
          "**Running Different Environments:**\n" +
          "```bash\n" +
          "# Development (uses compose.yaml + compose.override.yaml)\n" +
          "docker compose up -d\n\n" +
          "# Production (explicit file)\n" +
          "docker compose -f compose.yaml -f compose.prod.yaml up -d\n\n" +
          "# Or use COMPOSE_FILE environment variable\n" +
          "export COMPOSE_FILE=compose.yaml:compose.prod.yaml\n" +
          "docker compose up -d\n" +
          "```"
      },
      {
        title: 'Step 4: Adding Nginx Reverse Proxy',
        content: 
          "```yaml\n" +
          "services:\n" +
          "  nginx:\n" +
          "    image: nginx:alpine\n" +
          "    ports:\n" +
          "      - \"80:80\"\n" +
          "      - \"443:443\"\n" +
          "    volumes:\n" +
          "      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro\n" +
          "      - ./nginx/certs:/etc/nginx/certs:ro\n" +
          "    depends_on:\n" +
          "      - frontend\n" +
          "      - api\n\n" +
          "  frontend:\n" +
          "    build: ./frontend\n" +
          "    # No ports exposed - only through nginx\n\n" +
          "  api:\n" +
          "    build: ./backend\n" +
          "    # No ports exposed - only through nginx\n" +
          "```\n\n" +
          "**nginx.conf:**\n" +
          "```nginx\n" +
          "events { worker_connections 1024; }\n\n" +
          "http {\n" +
          "    upstream frontend {\n" +
          "        server frontend:3000;\n" +
          "    }\n\n" +
          "    upstream api {\n" +
          "        server api:4000;\n" +
          "    }\n\n" +
          "    server {\n" +
          "        listen 80;\n\n" +
          "        location / {\n" +
          "            proxy_pass http://frontend;\n" +
          "            proxy_http_version 1.1;\n" +
          "            proxy_set_header Upgrade $http_upgrade;\n" +
          "            proxy_set_header Connection 'upgrade';\n" +
          "            proxy_set_header Host $host;\n" +
          "        }\n\n" +
          "        location /api {\n" +
          "            proxy_pass http://api;\n" +
          "            proxy_set_header Host $host;\n" +
          "            proxy_set_header X-Real-IP $remote_addr;\n" +
          "        }\n" +
          "    }\n" +
          "}\n" +
          "```"
      },
      {
        title: 'Step 5: Database Initialization and Migrations',
        content: 
          "```yaml\n" +
          "services:\n" +
          "  db:\n" +
          "    image: postgres:16-alpine\n" +
          "    environment:\n" +
          "      POSTGRES_USER: app\n" +
          "      POSTGRES_PASSWORD: secret\n" +
          "      POSTGRES_DB: myapp\n" +
          "    volumes:\n" +
          "      - postgres-data:/var/lib/postgresql/data\n" +
          "      # Initialization scripts run on first start\n" +
          "      - ./database/init:/docker-entrypoint-initdb.d:ro\n\n" +
          "  # One-off migration container\n" +
          "  migrate:\n" +
          "    build: ./backend\n" +
          "    command: npm run db:migrate\n" +
          "    environment:\n" +
          "      - DATABASE_URL=postgres://app:secret@db:5432/myapp\n" +
          "    depends_on:\n" +
          "      db:\n" +
          "        condition: service_healthy\n" +
          "    profiles:\n" +
          "      - tools  # Only runs when profile is specified\n\n" +
          "  # Database seeding\n" +
          "  seed:\n" +
          "    build: ./backend\n" +
          "    command: npm run db:seed\n" +
          "    environment:\n" +
          "      - DATABASE_URL=postgres://app:secret@db:5432/myapp\n" +
          "    depends_on:\n" +
          "      db:\n" +
          "        condition: service_healthy\n" +
          "    profiles:\n" +
          "      - tools\n\n" +
          "volumes:\n" +
          "  postgres-data:\n" +
          "```\n\n" +
          "**Running Migrations:**\n" +
          "```bash\n" +
          "# Start DB and run migrations\n" +
          "docker compose up -d db\n" +
          "docker compose run --rm migrate\n\n" +
          "# Or with profiles\n" +
          "docker compose --profile tools run --rm migrate\n" +
          "docker compose --profile tools run --rm seed\n" +
          "```"
      },
      {
        title: 'Step 6: Monitoring Stack (Prometheus + Grafana)',
        content: 
          "```yaml\n" +
          "services:\n" +
          "  # Your application\n" +
          "  api:\n" +
          "    build: ./backend\n" +
          "    labels:\n" +
          "      - \"prometheus.scrape=true\"\n" +
          "      - \"prometheus.port=4000\"\n\n" +
          "  # Prometheus (metrics collection)\n" +
          "  prometheus:\n" +
          "    image: prom/prometheus:latest\n" +
          "    volumes:\n" +
          "      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml:ro\n" +
          "      - prometheus-data:/prometheus\n" +
          "    ports:\n" +
          "      - \"9090:9090\"\n" +
          "    command:\n" +
          "      - '--config.file=/etc/prometheus/prometheus.yml'\n" +
          "      - '--storage.tsdb.path=/prometheus'\n\n" +
          "  # Grafana (visualization)\n" +
          "  grafana:\n" +
          "    image: grafana/grafana:latest\n" +
          "    volumes:\n" +
          "      - grafana-data:/var/lib/grafana\n" +
          "      - ./monitoring/grafana/dashboards:/etc/grafana/provisioning/dashboards\n" +
          "      - ./monitoring/grafana/datasources:/etc/grafana/provisioning/datasources\n" +
          "    ports:\n" +
          "      - \"3001:3000\"\n" +
          "    environment:\n" +
          "      - GF_SECURITY_ADMIN_PASSWORD=admin\n" +
          "    depends_on:\n" +
          "      - prometheus\n\n" +
          "volumes:\n" +
          "  prometheus-data:\n" +
          "  grafana-data:\n" +
          "```\n\n" +
          "**prometheus.yml:**\n" +
          "```yaml\n" +
          "global:\n" +
          "  scrape_interval: 15s\n\n" +
          "scrape_configs:\n" +
          "  - job_name: 'api'\n" +
          "    static_configs:\n" +
          "      - targets: ['api:4000']\n" +
          "```"
      }
    ],

    commonMistakes: [
      "**Using `links`** - Deprecated! Use networks instead. All services on the same network can communicate by service name.",
      "**Hardcoding passwords in compose.yaml** - Use .env files or secrets. Never commit passwords to git!",
      "**Not using health checks** - `depends_on` without `condition: service_healthy` only waits for container start, not readiness.",
      "**Exposing database ports in production** - Only expose ports that need external access. Containers communicate internally.",
      "**Forgetting `docker compose down -v` deletes volumes** - This destroys all your data! Use `down` without `-v` normally.",
      "**Not using profiles** - Run one-off tasks (migrations, seeding) in separate profiles to avoid running them with `up`.",
      "**Copying node_modules via volumes** - Mount source code but exclude node_modules: `- ./src:/app/src` and `- /app/node_modules`.",
      "**Ignoring resource limits** - In production, always set CPU and memory limits to prevent runaway containers."
    ],

    bestPractices: [
      "**Use compose.override.yaml** for development-specific config (auto-loaded)",
      "**Define health checks** for databases and services that need initialization time",
      "**Use named volumes** for persistent data (not bind mounts in production)",
      "**Keep secrets out of compose files** - use .env files and add to .gitignore",
      "**Use profiles** for tools like migrations and seeding",
      "**Pin image versions** - `postgres:16-alpine` not `postgres:latest`",
      "**Network isolation** - Put databases on backend-only networks",
      "**Use restart policies** - `restart: unless-stopped` for production services",
      "**Set resource limits** - Prevent containers from consuming all host resources",
      "**Version control your compose files** - They are infrastructure as code!"
    ],

    realWorldExample: 
      "**Scenario: Complete Development Environment for a SaaS Application**\n\n" +
      "```yaml\n" +
      "# compose.yaml - Full development stack\n" +
      "name: saas-app\n\n" +
      "services:\n" +
      "  # Next.js Frontend\n" +
      "  web:\n" +
      "    build:\n" +
      "      context: ./apps/web\n" +
      "      target: development\n" +
      "    ports:\n" +
      "      - \"3000:3000\"\n" +
      "    volumes:\n" +
      "      - ./apps/web/src:/app/src\n" +
      "      - ./apps/web/public:/app/public\n" +
      "    environment:\n" +
      "      - NEXT_PUBLIC_API_URL=http://localhost:4000\n" +
      "    depends_on:\n" +
      "      - api\n\n" +
      "  # Node.js API\n" +
      "  api:\n" +
      "    build:\n" +
      "      context: ./apps/api\n" +
      "      target: development\n" +
      "    ports:\n" +
      "      - \"4000:4000\"\n" +
      "    volumes:\n" +
      "      - ./apps/api/src:/app/src\n" +
      "    environment:\n" +
      "      - DATABASE_URL=postgres://dev:dev@db:5432/saas_dev\n" +
      "      - REDIS_URL=redis://redis:6379\n" +
      "      - SMTP_HOST=mailpit\n" +
      "      - SMTP_PORT=1025\n" +
      "    depends_on:\n" +
      "      db:\n" +
      "        condition: service_healthy\n" +
      "      redis:\n" +
      "        condition: service_healthy\n\n" +
      "  # Background Worker\n" +
      "  worker:\n" +
      "    build:\n" +
      "      context: ./apps/api\n" +
      "      target: development\n" +
      "    command: npm run worker\n" +
      "    volumes:\n" +
      "      - ./apps/api/src:/app/src\n" +
      "    environment:\n" +
      "      - DATABASE_URL=postgres://dev:dev@db:5432/saas_dev\n" +
      "      - REDIS_URL=redis://redis:6379\n" +
      "    depends_on:\n" +
      "      - api\n\n" +
      "  # PostgreSQL\n" +
      "  db:\n" +
      "    image: postgres:16-alpine\n" +
      "    environment:\n" +
      "      POSTGRES_USER: dev\n" +
      "      POSTGRES_PASSWORD: dev\n" +
      "      POSTGRES_DB: saas_dev\n" +
      "    volumes:\n" +
      "      - postgres-data:/var/lib/postgresql/data\n" +
      "    ports:\n" +
      "      - \"5432:5432\"\n" +
      "    healthcheck:\n" +
      "      test: [\"CMD-SHELL\", \"pg_isready -U dev -d saas_dev\"]\n" +
      "      interval: 5s\n" +
      "      timeout: 5s\n" +
      "      retries: 5\n\n" +
      "  # Redis\n" +
      "  redis:\n" +
      "    image: redis:7-alpine\n" +
      "    volumes:\n" +
      "      - redis-data:/data\n" +
      "    healthcheck:\n" +
      "      test: [\"CMD\", \"redis-cli\", \"ping\"]\n" +
      "      interval: 5s\n" +
      "      timeout: 3s\n" +
      "      retries: 5\n\n" +
      "  # Local email testing\n" +
      "  mailpit:\n" +
      "    image: axllent/mailpit\n" +
      "    ports:\n" +
      "      - \"8025:8025\"  # Web UI\n" +
      "      - \"1025:1025\"  # SMTP\n\n" +
      "  # MinIO (S3-compatible storage)\n" +
      "  minio:\n" +
      "    image: minio/minio\n" +
      "    ports:\n" +
      "      - \"9000:9000\"\n" +
      "      - \"9001:9001\"\n" +
      "    volumes:\n" +
      "      - minio-data:/data\n" +
      "    environment:\n" +
      "      MINIO_ROOT_USER: minioadmin\n" +
      "      MINIO_ROOT_PASSWORD: minioadmin\n" +
      "    command: server /data --console-address \":9001\"\n\n" +
      "volumes:\n" +
      "  postgres-data:\n" +
      "  redis-data:\n" +
      "  minio-data:\n" +
      "```\n\n" +
      "**Quick Start:**\n" +
      "```bash\n" +
      "# Clone and start\n" +
      "git clone https://github.com/myorg/saas-app.git\n" +
      "cd saas-app\n" +
      "cp .env.example .env\n" +
      "docker compose up -d\n\n" +
      "# Run migrations\n" +
      "docker compose exec api npm run db:migrate\n" +
      "docker compose exec api npm run db:seed\n\n" +
      "# Open the app\n" +
      "open http://localhost:3000\n\n" +
      "# Check emails at\n" +
      "open http://localhost:8025\n" +
      "```",

    summary: 
      "## 📝 Key Takeaways\n\n" +
      "1. **Docker Compose** defines multi-container apps in a single YAML file\n" +
      "2. **Services** are container definitions with image, build, ports, volumes\n" +
      "3. **Networks** let containers communicate by service name\n" +
      "4. **Volumes** persist data across container restarts\n" +
      "5. **depends_on + healthcheck** = proper startup ordering\n" +
      "6. **compose.override.yaml** for development, compose.prod.yaml for production\n" +
      "7. **Profiles** isolate one-off tasks like migrations\n" +
      "8. `docker compose up -d` is all you need to start everything",

    nextSteps: 
      "**What's Next?**\n\n" +
      "You can now orchestrate multi-container applications! Continue with:\n" +
      "- **Docker Networking Deep Dive**: Bridge, overlay, host networks\n" +
      "- **Docker Swarm**: Multi-node container orchestration\n" +
      "- **Kubernetes Basics**: Industry-standard container orchestration\n" +
      "- **CI/CD with Docker**: Build and push images in pipelines"
  },

  'docker-debugging-troubleshooting': {
    introduction: 
      "Something's wrong. The container won't start. The app crashes silently. Logs show nothing useful. " +
      "Sound familiar? Docker debugging is a skill every DevOps engineer needs, and it's often learned " +
      "the hard way—at 3 AM during an outage.\n\n" +
      "In this lesson, you'll learn systematic approaches to diagnose and fix container problems. From " +
      "reading logs effectively to diving into running containers, from inspecting networking issues " +
      "to debugging build failures. By the end, you'll have a mental toolkit for tackling any Docker issue.",

    whyItMatters: 
      "**Why Docker Debugging Skills Are Critical:**\n\n" +
      "1. **Containers fail differently** - No SSH access, ephemeral filesystems, different networking\n" +
      "2. **Faster incident response** - Quickly identify root cause during outages\n" +
      "3. **Better Dockerfiles** - Understanding failures leads to more robust images\n" +
      "4. **Cost savings** - Reduce time debugging = more time building features\n" +
      "5. **Confidence** - Ship containers knowing you can diagnose any issue\n\n" +
      "**Common Debugging Scenarios:**\n" +
      "```\n" +
      "┌─────────────────────────────────────────────────────────────┐\n" +
      "│           WHERE THINGS GO WRONG                            │\n" +
      "├───────────────┬─────────────────────────────────────────────┤\n" +
      "│ Phase         │ Common Issues                              │\n" +
      "├───────────────┼─────────────────────────────────────────────┤\n" +
      "│ Build         │ Missing dependencies, wrong base image     │\n" +
      "│ Start         │ Config errors, missing env vars            │\n" +
      "│ Runtime       │ Crashes, memory leaks, CPU spikes          │\n" +
      "│ Networking    │ Port conflicts, DNS resolution, firewall   │\n" +
      "│ Storage       │ Permission denied, volume not mounted      │\n" +
      "└───────────────┴─────────────────────────────────────────────┘\n" +
      "```",

    concepts: [
      {
        title: 'Container Lifecycle States',
        content: 
          "Understanding container states is the first step in debugging:\n\n" +
          "```bash\n" +
          "# Check container status\n" +
          "docker ps -a\n\n" +
          "# Output shows STATUS column:\n" +
          "CONTAINER ID   IMAGE      STATUS\n" +
          "abc123         myapp      Up 2 hours                    # Running\n" +
          "def456         myapp      Exited (1) 5 minutes ago      # Crashed\n" +
          "ghi789         myapp      Exited (0) 10 minutes ago     # Stopped normally\n" +
          "jkl012         myapp      Created                       # Never started\n" +
          "mno345         myapp      Restarting (1) 5 seconds ago  # Crash loop\n" +
          "```\n\n" +
          "**Exit Codes Tell You What Happened:**\n" +
          "```\n" +
          "┌────────────┬────────────────────────────────────────────────┐\n" +
          "│ Exit Code  │ Meaning                                        │\n" +
          "├────────────┼────────────────────────────────────────────────┤\n" +
          "│ 0          │ Success - container stopped normally           │\n" +
          "│ 1          │ Application error (generic)                    │\n" +
          "│ 126        │ Command cannot execute (permission issue)      │\n" +
          "│ 127        │ Command not found                              │\n" +
          "│ 128+N      │ Fatal signal N (e.g., 137 = SIGKILL = OOM)     │\n" +
          "│ 137        │ SIGKILL - Container killed (often OOM)         │\n" +
          "│ 139        │ SIGSEGV - Segmentation fault                   │\n" +
          "│ 143        │ SIGTERM - Graceful shutdown requested          │\n" +
          "└────────────┴────────────────────────────────────────────────┘\n" +
          "```\n\n" +
          "**Quick Status Check:**\n" +
          "```bash\n" +
          "# Why did it exit?\n" +
          "docker inspect --format='{{.State.ExitCode}}' container_name\n" +
          "docker inspect --format='{{.State.Error}}' container_name\n" +
          "docker inspect --format='{{.State.OOMKilled}}' container_name\n" +
          "```"
      },
      {
        title: 'Reading Logs Effectively',
        content: 
          "Logs are your primary debugging tool. Master them:\n\n" +
          "```bash\n" +
          "# Basic log viewing\n" +
          "docker logs container_name\n\n" +
          "# Follow logs in real-time (like tail -f)\n" +
          "docker logs -f container_name\n\n" +
          "# Show last N lines\n" +
          "docker logs --tail 100 container_name\n\n" +
          "# Show logs since a time\n" +
          "docker logs --since 1h container_name\n" +
          "docker logs --since 2024-01-15T10:00:00 container_name\n\n" +
          "# Show timestamps\n" +
          "docker logs -t container_name\n\n" +
          "# Combine options\n" +
          "docker logs -f --tail 50 -t container_name\n" +
          "```\n\n" +
          "**For Docker Compose:**\n" +
          "```bash\n" +
          "# All services\n" +
          "docker compose logs\n\n" +
          "# Specific service, follow mode\n" +
          "docker compose logs -f api\n\n" +
          "# Multiple services\n" +
          "docker compose logs api database\n" +
          "```\n\n" +
          "**When Logs Don't Help:**\n" +
          "```bash\n" +
          "# App might be logging to a file instead of stdout\n" +
          "docker exec container_name cat /var/log/app.log\n\n" +
          "# Check if logging driver is capturing output\n" +
          "docker inspect --format='{{.HostConfig.LogConfig.Type}}' container_name\n" +
          "```\n\n" +
          "**Pro Tip: Filter logs with grep:**\n" +
          "```bash\n" +
          "docker logs container_name 2>&1 | grep -i error\n" +
          "docker logs container_name 2>&1 | grep -E 'error|warning|fatal'\n" +
          "```"
      },
      {
        title: 'Inspecting Running Containers',
        content: 
          "Get detailed information about any container:\n\n" +
          "```bash\n" +
          "# Full inspection (JSON)\n" +
          "docker inspect container_name\n\n" +
          "# Specific fields using Go templates\n" +
          "docker inspect --format='{{.State.Status}}' container_name\n" +
          "docker inspect --format='{{.NetworkSettings.IPAddress}}' container_name\n" +
          "docker inspect --format='{{.Config.Env}}' container_name\n" +
          "docker inspect --format='{{json .Mounts}}' container_name | jq\n\n" +
          "# See resource usage in real-time\n" +
          "docker stats container_name\n\n" +
          "# See all running processes inside container\n" +
          "docker top container_name\n" +
          "```\n\n" +
          "**Useful Inspect Queries:**\n" +
          "```bash\n" +
          "# Get IP address\n" +
          "docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container\n\n" +
          "# Get mounted volumes\n" +
          "docker inspect -f '{{range .Mounts}}{{.Source}} -> {{.Destination}}{{println}}{{end}}' container\n\n" +
          "# Get environment variables\n" +
          "docker inspect -f '{{range .Config.Env}}{{println .}}{{end}}' container\n\n" +
          "# Get port mappings\n" +
          "docker inspect -f '{{range $p, $conf := .NetworkSettings.Ports}}{{$p}} -> {{(index $conf 0).HostPort}}{{println}}{{end}}' container\n\n" +
          "# Check restart count (crash loops)\n" +
          "docker inspect -f '{{.RestartCount}}' container\n" +
          "```"
      },
      {
        title: 'Getting Inside Containers',
        content: 
          "Sometimes you need to explore from the inside:\n\n" +
          "```bash\n" +
          "# Execute interactive shell\n" +
          "docker exec -it container_name /bin/bash\n" +
          "\n" +
          "# For Alpine-based images (no bash)\n" +
          "docker exec -it container_name /bin/sh\n\n" +
          "# Run as root (if container runs as non-root user)\n" +
          "docker exec -it -u root container_name /bin/bash\n\n" +
          "# Run a specific command\n" +
          "docker exec container_name cat /etc/hosts\n" +
          "docker exec container_name env\n" +
          "docker exec container_name ps aux\n" +
          "```\n\n" +
          "**What To Check Inside:**\n" +
          "```bash\n" +
          "# Check filesystem\n" +
          "ls -la /app\n" +
          "cat /app/config.json\n\n" +
          "# Check processes\n" +
          "ps aux\n" +
          "top\n\n" +
          "# Check network\n" +
          "cat /etc/hosts\n" +
          "cat /etc/resolv.conf\n" +
          "ping other-service\n" +
          "curl http://api:3000/health\n\n" +
          "# Check environment\n" +
          "env | sort\n" +
          "echo $DATABASE_URL\n\n" +
          "# Check disk space\n" +
          "df -h\n\n" +
          "# Check memory\n" +
          "free -m\n" +
          "cat /proc/meminfo\n" +
          "```\n\n" +
          "**For Crashed Containers (can't exec):**\n" +
          "```bash\n" +
          "# Copy files out\n" +
          "docker cp container_name:/var/log/app.log ./app.log\n\n" +
          "# Start with different command to debug\n" +
          "docker run -it --entrypoint /bin/sh myimage:latest\n\n" +
          "# Or override command\n" +
          "docker run -it myimage:latest /bin/sh\n" +
          "```"
      },
      {
        title: 'Debugging Network Issues',
        content: 
          "Network problems are among the most common Docker issues:\n\n" +
          "**Check Network Configuration:**\n" +
          "```bash\n" +
          "# List networks\n" +
          "docker network ls\n\n" +
          "# Inspect network (see connected containers)\n" +
          "docker network inspect bridge\n" +
          "docker network inspect myapp_default\n\n" +
          "# Check container's network settings\n" +
          "docker inspect --format='{{json .NetworkSettings.Networks}}' container | jq\n" +
          "```\n\n" +
          "**Test Connectivity:**\n" +
          "```bash\n" +
          "# From inside container\n" +
          "docker exec -it container_name sh -c 'ping database'\n" +
          "docker exec -it container_name sh -c 'curl http://api:3000/health'\n" +
          "docker exec -it container_name sh -c 'nc -zv database 5432'\n\n" +
          "# DNS resolution\n" +
          "docker exec -it container_name sh -c 'nslookup database'\n" +
          "docker exec -it container_name sh -c 'cat /etc/resolv.conf'\n" +
          "```\n\n" +
          "**Common Network Issues:**\n" +
          "```\n" +
          "┌────────────────────────────────────────────────────────────────────┐\n" +
          "│ Problem                      │ Cause & Solution                   │\n" +
          "├────────────────────────────────────────────────────────────────────┤\n" +
          "│ \"Connection refused\"         │ Service not running or wrong port │\n" +
          "│ \"Name resolution failed\"     │ Wrong network or service name     │\n" +
          "│ \"Network unreachable\"        │ Containers on different networks  │\n" +
          "│ \"Connection timed out\"       │ Firewall or service not listening │\n" +
          "│ \"Port already in use\"        │ Another container using the port  │\n" +
          "└────────────────────────────────────────────────────────────────────┘\n" +
          "```\n\n" +
          "**Port Debugging:**\n" +
          "```bash\n" +
          "# Check what's using a port on host\n" +
          "lsof -i :3000\n" +
          "netstat -tulpn | grep 3000\n\n" +
          "# Check exposed ports\n" +
          "docker port container_name\n\n" +
          "# Test from host\n" +
          "curl localhost:3000/health\n" +
          "```"
      },
      {
        title: 'Debugging Build Failures',
        content: 
          "When `docker build` fails, here's how to diagnose:\n\n" +
          "**Read the Error Carefully:**\n" +
          "```bash\n" +
          "# Build with more output\n" +
          "docker build --progress=plain -t myapp .\n\n" +
          "# Build without cache (fresh build)\n" +
          "docker build --no-cache -t myapp .\n\n" +
          "# Build up to a specific stage\n" +
          "docker build --target builder -t myapp:builder .\n" +
          "```\n\n" +
          "**Debug at Failed Layer:**\n" +
          "```dockerfile\n" +
          "# If this fails:\n" +
          "RUN npm install\n\n" +
          "# Split it up to see what's happening:\n" +
          "RUN npm install 2>&1 | tee /tmp/npm-install.log || (cat /tmp/npm-install.log && exit 1)\n" +
          "```\n\n" +
          "**Interactive Debugging of Build:**\n" +
          "```bash\n" +
          "# Build partway, then explore\n" +
          "# Find the last successful layer\n" +
          "docker build -t myapp . 2>&1 | tee build.log\n\n" +
          "# Look for lines like:\n" +
          "# ---> Running in abc123def456\n" +
          "# ---> 789xyz\n\n" +
          "# Run from that layer\n" +
          "docker run -it 789xyz /bin/sh\n" +
          "# Now you can manually run the failing command\n" +
          "```\n\n" +
          "**Common Build Failures:**\n" +
          "```\n" +
          "┌────────────────────────────────────────────────────────────────────┐\n" +
          "│ Error                        │ Solution                           │\n" +
          "├────────────────────────────────────────────────────────────────────┤\n" +
          "│ \"COPY failed: file not found\"│ Check .dockerignore, context path │\n" +
          "│ \"npm ERR! network\"           │ Check internet, DNS in build      │\n" +
          "│ \"Permission denied\"          │ Wrong USER or file permissions    │\n" +
          "│ \"No space left on device\"    │ docker system prune, clean images │\n" +
          "│ \"exec format error\"          │ Wrong platform (arm64 vs amd64)   │\n" +
          "└────────────────────────────────────────────────────────────────────┘\n" +
          "```"
      },
      {
        title: 'Memory and Resource Issues',
        content: 
          "Containers crashing due to resource limits are common:\n\n" +
          "**Diagnosing OOM (Out of Memory):**\n" +
          "```bash\n" +
          "# Check if OOM killed\n" +
          "docker inspect --format='{{.State.OOMKilled}}' container_name\n\n" +
          "# Check memory usage\n" +
          "docker stats container_name\n\n" +
          "# Check system events\n" +
          "docker events --filter 'event=oom'\n\n" +
          "# Check kernel logs\n" +
          "dmesg | grep -i 'killed process'\n" +
          "```\n\n" +
          "**Memory Limits:**\n" +
          "```bash\n" +
          "# See current limits\n" +
          "docker inspect --format='{{.HostConfig.Memory}}' container_name\n\n" +
          "# Run with memory limit\n" +
          "docker run -m 512m myapp\n\n" +
          "# In docker-compose.yaml\n" +
          "services:\n" +
          "  app:\n" +
          "    deploy:\n" +
          "      resources:\n" +
          "        limits:\n" +
          "          memory: 512M\n" +
          "        reservations:\n" +
          "          memory: 256M\n" +
          "```\n\n" +
          "**Resource Monitoring:**\n" +
          "```bash\n" +
          "# Real-time stats for all containers\n" +
          "docker stats\n\n" +
          "# Format output\n" +
          "docker stats --format \"table {{.Name}}\\t{{.CPUPerc}}\\t{{.MemUsage}}\"\n\n" +
          "# One-shot (don't stream)\n" +
          "docker stats --no-stream\n" +
          "```\n\n" +
          "**Disk Space Issues:**\n" +
          "```bash\n" +
          "# Check Docker disk usage\n" +
          "docker system df\n" +
          "docker system df -v  # Verbose\n\n" +
          "# Clean up\n" +
          "docker system prune        # Remove unused data\n" +
          "docker system prune -a     # Remove all unused images too\n" +
          "docker volume prune        # Remove unused volumes\n" +
          "docker builder prune       # Remove build cache\n" +
          "```"
      },
      {
        title: 'Debugging Startup Issues',
        content: 
          "Container starts but immediately exits? Here's the approach:\n\n" +
          "**Quick Diagnosis:**\n" +
          "```bash\n" +
          "# Check what happened\n" +
          "docker logs container_name\n" +
          "docker inspect --format='{{.State.ExitCode}}' container_name\n" +
          "docker inspect --format='{{.State.Error}}' container_name\n" +
          "```\n\n" +
          "**Override Entrypoint to Debug:**\n" +
          "```bash\n" +
          "# Skip the normal startup, get a shell\n" +
          "docker run -it --entrypoint /bin/sh myimage\n\n" +
          "# Then manually run what should happen:\n" +
          "cat /app/entrypoint.sh  # See what it does\n" +
          "./entrypoint.sh         # Try running it\n" +
          "```\n\n" +
          "**Check Entrypoint and CMD:**\n" +
          "```bash\n" +
          "# What's configured?\n" +
          "docker inspect --format='Entrypoint: {{.Config.Entrypoint}}' myimage\n" +
          "docker inspect --format='Cmd: {{.Config.Cmd}}' myimage\n" +
          "docker inspect --format='WorkingDir: {{.Config.WorkingDir}}' myimage\n" +
          "```\n\n" +
          "**Common Startup Issues:**\n" +
          "```\n" +
          "┌────────────────────────────────────────────────────────────────────┐\n" +
          "│ Symptom                      │ Likely Cause                       │\n" +
          "├────────────────────────────────────────────────────────────────────┤\n" +
          "│ Exits with code 127          │ Command not found                  │\n" +
          "│ Exits with code 126          │ Permission denied on executable    │\n" +
          "│ Exits immediately, no logs   │ Entrypoint script fails silently   │\n" +
          "│ \"standard_init_linux.go\"     │ Wrong file format (Windows CRLF)   │\n" +
          "│ Exits after a few seconds    │ Process not running in foreground  │\n" +
          "└────────────────────────────────────────────────────────────────────┘\n" +
          "```\n\n" +
          "**Keep Container Running for Debug:**\n" +
          "```bash\n" +
          "# Override command to just sleep\n" +
          "docker run -d myimage tail -f /dev/null\n" +
          "\n" +
          "# Then exec in\n" +
          "docker exec -it <container_id> /bin/sh\n" +
          "```"
      }
    ],

    stepByStep: [
      {
        title: 'Step 1: The Debugging Workflow',
        content: 
          "Follow this systematic approach for any Docker issue:\n\n" +
          "```\n" +
          "┌─────────────────────────────────────────────────────────────────┐\n" +
          "│                 DOCKER DEBUGGING FLOWCHART                     │\n" +
          "├─────────────────────────────────────────────────────────────────┤\n" +
          "│                                                                 │\n" +
          "│  1. IDENTIFY THE PROBLEM                                        │\n" +
          "│     └─> docker ps -a (what state is container in?)             │\n" +
          "│                                                                 │\n" +
          "│  2. CHECK LOGS                                                  │\n" +
          "│     └─> docker logs container_name                             │\n" +
          "│                                                                 │\n" +
          "│  3. INSPECT CONTAINER                                           │\n" +
          "│     └─> docker inspect container_name                          │\n" +
          "│                                                                 │\n" +
          "│  4. GET INSIDE (if running)                                     │\n" +
          "│     └─> docker exec -it container_name /bin/sh                 │\n" +
          "│                                                                 │\n" +
          "│  5. CHECK RESOURCES                                             │\n" +
          "│     └─> docker stats                                           │\n" +
          "│                                                                 │\n" +
          "│  6. CHECK NETWORK                                               │\n" +
          "│     └─> docker network inspect                                 │\n" +
          "│                                                                 │\n" +
          "│  7. REPRODUCE IN ISOLATION                                      │\n" +
          "│     └─> docker run -it --entrypoint /bin/sh myimage           │\n" +
          "│                                                                 │\n" +
          "└─────────────────────────────────────────────────────────────────┘\n" +
          "```\n\n" +
          "**Quick Commands Cheat Sheet:**\n" +
          "```bash\n" +
          "# The essential debugging commands\n" +
          "docker ps -a                           # Container status\n" +
          "docker logs -f container              # Stream logs\n" +
          "docker inspect container              # Full details\n" +
          "docker exec -it container /bin/sh     # Get shell\n" +
          "docker stats                          # Resource usage\n" +
          "docker events                         # Real-time events\n" +
          "```"
      },
      {
        title: 'Step 2: Debug a Container That Won\'t Start',
        content: 
          "**Scenario: Container exits immediately**\n\n" +
          "```bash\n" +
          "# Step 1: Check the exit code\n" +
          "$ docker ps -a\n" +
          "CONTAINER ID   IMAGE     STATUS                     \n" +
          "abc123         myapp     Exited (1) 2 seconds ago\n\n" +
          "# Step 2: Check logs\n" +
          "$ docker logs abc123\n" +
          "Error: Cannot find module '/app/server.js'\n\n" +
          "# Aha! The file is missing. Let's verify:\n" +
          "$ docker run --entrypoint /bin/sh myapp -c 'ls -la /app'\n" +
          "total 0\n" +
          "drwxr-xr-x 2 root root 40 Jan 15 10:00 .\n" +
          "\n" +
          "# The /app directory is empty! Check the Dockerfile:\n" +
          "$ cat Dockerfile\n" +
          "FROM node:20\n" +
          "WORKDIR /app\n" +
          "RUN npm install  # Wait, we never COPY the files!\n" +
          "CMD [\"node\", \"server.js\"]\n\n" +
          "# Fix: Add COPY before npm install\n" +
          "FROM node:20\n" +
          "WORKDIR /app\n" +
          "COPY package*.json ./\n" +
          "RUN npm install\n" +
          "COPY . .\n" +
          "CMD [\"node\", \"server.js\"]\n" +
          "```"
      },
      {
        title: 'Step 3: Debug Connection Issues Between Containers',
        content: 
          "**Scenario: App can't connect to database**\n\n" +
          "```bash\n" +
          "# Check if database is running\n" +
          "$ docker compose ps\n" +
          "NAME         STATUS\n" +
          "app          Up 10 seconds\n" +
          "database     Up 30 seconds (healthy)\n\n" +
          "# Check app logs\n" +
          "$ docker compose logs app\n" +
          "Error: connect ECONNREFUSED 127.0.0.1:5432\n\n" +
          "# Problem: App is trying localhost! Should use service name.\n" +
          "# Check the environment variable:\n" +
          "$ docker compose exec app env | grep DATABASE\n" +
          "DATABASE_URL=postgres://user:pass@localhost:5432/mydb\n" +
          "\n" +
          "# Should be 'database' not 'localhost':\n" +
          "# Fix in docker-compose.yaml:\n" +
          "environment:\n" +
          "  DATABASE_URL: postgres://user:pass@database:5432/mydb\n\n" +
          "# Verify connectivity:\n" +
          "$ docker compose exec app sh -c 'nc -zv database 5432'\n" +
          "database (172.18.0.2:5432) open\n\n" +
          "# Test DNS resolution:\n" +
          "$ docker compose exec app sh -c 'nslookup database'\n" +
          "Name:   database\n" +
          "Address: 172.18.0.2\n" +
          "```"
      },
      {
        title: 'Step 4: Debug a Memory Issue',
        content: 
          "**Scenario: Container keeps getting killed**\n\n" +
          "```bash\n" +
          "# Check if OOM killed\n" +
          "$ docker inspect --format='{{.State.OOMKilled}}' myapp\n" +
          "true\n\n" +
          "# Yep! Check the memory limit\n" +
          "$ docker inspect --format='{{.HostConfig.Memory}}' myapp\n" +
          "134217728  # That's 128MB\n\n" +
          "# Monitor memory usage\n" +
          "$ docker stats myapp --no-stream\n" +
          "NAME    MEM USAGE / LIMIT    MEM %\n" +
          "myapp   127.5MiB / 128MiB    99.61%\n\n" +
          "# Container is hitting the limit!\n" +
          "# Option 1: Increase the limit\n" +
          "docker run -m 512m myapp\n\n" +
          "# Option 2: Find what's using memory\n" +
          "$ docker exec -it myapp sh\n" +
          "$ ps aux --sort=-%mem | head\n" +
          "$ cat /proc/meminfo\n\n" +
          "# Option 3: Check for memory leaks in your app\n" +
          "# For Node.js:\n" +
          "$ docker run -e NODE_OPTIONS='--max-old-space-size=256' myapp\n" +
          "```"
      },
      {
        title: 'Step 5: Debug Volume and Permission Issues',
        content: 
          "**Scenario: Permission denied errors**\n\n" +
          "```bash\n" +
          "# Check logs\n" +
          "$ docker logs myapp\n" +
          "Error: EACCES: permission denied, open '/app/data/cache.json'\n\n" +
          "# Check what user the container runs as\n" +
          "$ docker exec myapp whoami\n" +
          "node\n" +
          "$ docker exec myapp id\n" +
          "uid=1000(node) gid=1000(node)\n\n" +
          "# Check the volume ownership\n" +
          "$ docker exec myapp ls -la /app/data\n" +
          "drwxr-xr-x 2 root root 4096 Jan 15 10:00 .\n" +
          "\n" +
          "# Problem: Directory owned by root, app runs as node\n\n" +
          "# Fix Option 1: Change ownership in Dockerfile\n" +
          "RUN mkdir -p /app/data && chown -R node:node /app/data\n\n" +
          "# Fix Option 2: Run container with correct user\n" +
          "docker run -v ./data:/app/data --user $(id -u):$(id -g) myapp\n\n" +
          "# Fix Option 3: Make directory world-writable (less secure)\n" +
          "docker exec -u root myapp chmod 777 /app/data\n\n" +
          "# For bind mounts, ensure host directory has correct permissions\n" +
          "$ ls -la ./data\n" +
          "$ sudo chown -R 1000:1000 ./data\n" +
          "```"
      },
      {
        title: 'Step 6: Debug Build Issues',
        content: 
          "**Scenario: Build fails at npm install**\n\n" +
          "```bash\n" +
          "# Build with full output\n" +
          "$ docker build --progress=plain -t myapp . 2>&1 | tee build.log\n" +
          "\n" +
          "#7 [4/5] RUN npm install\n" +
          "#7 2.345 npm ERR! code ECONNREFUSED\n" +
          "#7 2.345 npm ERR! network request failed\n" +
          "#7 ERROR: process \"/bin/sh -c npm install\" did not complete\n\n" +
          "# Network issue during build. Try:\n\n" +
          "# Check DNS in build\n" +
          "$ docker build --network=host -t myapp .\n\n" +
          "# Or use a different npm registry\n" +
          "RUN npm install --registry https://registry.npmmirror.com\n\n" +
          "# Debug interactively - find last successful layer\n" +
          "$ docker images | head\n" +
          "$ docker run -it <previous_layer_id> /bin/sh\n" +
          "# Now manually run: npm install\n" +
          "# See the actual error\n" +
          "```\n\n" +
          "**Scenario: COPY failed**\n" +
          "```bash\n" +
          "$ docker build -t myapp .\n" +
          "COPY failed: file not found in build context: package.json\n\n" +
          "# Check .dockerignore\n" +
          "$ cat .dockerignore\n" +
          "*              # This ignores everything!\n" +
          "!Dockerfile\n\n" +
          "# Fix .dockerignore:\n" +
          "node_modules\n" +
          ".git\n" +
          "# Don't use * wildcard at start\n" +
          "```"
      },
      {
        title: 'Step 7: Debugging Health Check Failures',
        content: 
          "**Scenario: Container marked unhealthy**\n\n" +
          "```bash\n" +
          "# Check health status\n" +
          "$ docker ps\n" +
          "CONTAINER ID   IMAGE    STATUS\n" +
          "abc123         myapp    Up 2 min (unhealthy)\n\n" +
          "# Get health check details\n" +
          "$ docker inspect --format='{{json .State.Health}}' abc123 | jq\n" +
          "{\n" +
          "  \"Status\": \"unhealthy\",\n" +
          "  \"FailingStreak\": 5,\n" +
          "  \"Log\": [\n" +
          "    {\n" +
          "      \"ExitCode\": 1,\n" +
          "      \"Output\": \"curl: (7) Failed to connect to localhost:3000\"\n" +
          "    }\n" +
          "  ]\n" +
          "}\n\n" +
          "# The health check is failing! Test it manually:\n" +
          "$ docker exec abc123 curl -f http://localhost:3000/health\n" +
          "curl: (7) Failed to connect\n\n" +
          "# Check if the app is listening\n" +
          "$ docker exec abc123 netstat -tlpn\n" +
          "tcp  0  0  127.0.0.1:3000  LISTEN  # Listening on 127.0.0.1 only!\n\n" +
          "# Problem: App only listening on localhost, not 0.0.0.0\n" +
          "# Fix in app: Listen on 0.0.0.0\n" +
          "app.listen(3000, '0.0.0.0')\n\n" +
          "# Or update health check to use correct address\n" +
          "healthcheck:\n" +
          "  test: [\"CMD\", \"curl\", \"-f\", \"http://127.0.0.1:3000/health\"]\n" +
          "```"
      }
    ],

    commonMistakes: [
      "**Only checking `docker logs` once** - Logs grow over time. Use `-f` to follow, `--since` for recent logs.",
      "**Forgetting exit codes** - Exit code 137 means OOM kill, 127 means command not found. They tell you everything!",
      "**Using `localhost` between containers** - Containers have separate network namespaces. Use service names!",
      "**Not using `--no-cache` for build issues** - Cached layers can hide problems. Rebuild fresh when debugging.",
      "**Debugging in production** - Always reproduce locally first. Use `docker exec` carefully in production.",
      "**Ignoring health checks** - They're not just for orchestration; they're debugging tools too!",
      "**Not checking .dockerignore** - If files are missing in container, this is often the culprit.",
      "**Assuming the image is correct** - Use `docker inspect` to verify the actual image configuration."
    ],

    bestPractices: [
      "**Add health checks to every service** - They catch issues early and document expected behavior",
      "**Log to stdout/stderr** - Don't log to files; let Docker capture everything",
      "**Include debugging tools in dev images** - curl, netcat, vim make debugging much easier",
      "**Use multi-stage builds with a debug stage** - Keep prod lean but have a fat debug image ready",
      "**Set up `docker events` monitoring** - See real-time what Docker is doing",
      "**Use labels for metadata** - Add build info, git commit, etc. for traceability",
      "**Keep a debugging cheat sheet** - Common commands you'll use repeatedly",
      "**Practice on non-critical containers** - Build muscle memory before the 3 AM incident"
    ],

    realWorldExample: 
      "**Scenario: Production Incident - API Intermittently Failing**\n\n" +
      "```bash\n" +
      "# 1. Check current state\n" +
      "$ docker compose ps\n" +
      "NAME     STATUS                        \n" +
      "api      Up 2 hours (healthy)          \n" +
      "db       Up 2 hours (healthy)          \n" +
      "redis    Restarting (1) About a minute ago   # 👈 Problem!\n\n" +
      "# 2. Check redis logs\n" +
      "$ docker compose logs --tail 50 redis\n" +
      "# Out of memory\n" +
      "1:M 15 Jan 10:23:45.123 # Can't save: memory full\n" +
      "1:M 15 Jan 10:23:45.124 # Redis is now ready to exit\n\n" +
      "# 3. Check memory stats\n" +
      "$ docker stats --no-stream\n" +
      "NAME    MEM USAGE / LIMIT    \n" +
      "redis   256MiB / 256MiB      # At limit!\n" +
      "api     128MiB / 512MiB\n\n" +
      "# 4. Check if OOM killed\n" +
      "$ docker inspect --format='{{.State.OOMKilled}}' redis\n" +
      "true\n\n" +
      "# 5. Quick fix - increase memory\n" +
      "$ docker compose down redis\n" +
      "$ # Edit docker-compose.yaml\n" +
      "services:\n" +
      "  redis:\n" +
      "    deploy:\n" +
      "      resources:\n" +
      "        limits:\n" +
      "          memory: 512M  # Increased from 256M\n" +
      "$ docker compose up -d redis\n\n" +
      "# 6. Root cause analysis - why did Redis grow?\n" +
      "$ docker exec -it redis redis-cli\n" +
      "127.0.0.1:6379> INFO memory\n" +
      "used_memory_human:245.32M\n" +
      "127.0.0.1:6379> INFO keyspace\n" +
      "db0:keys=1500000  # 1.5 million keys!\n\n" +
      "# 7. Find the problem - keys without TTL\n" +
      "127.0.0.1:6379> DEBUG OBJECT session:*  \n" +
      "# Session keys have no TTL!\n\n" +
      "# 8. Fix in application code\n" +
      "redis.setex('session:user123', 3600, data)  # Add 1 hour TTL\n\n" +
      "# 9. Add monitoring to prevent recurrence\n" +
      "services:\n" +
      "  redis:\n" +
      "    healthcheck:\n" +
      "      test: [\"CMD-SHELL\", \"redis-cli ping && redis-cli info memory | grep used_memory_human\"]\n" +
      "```\n\n" +
      "**Debugging Toolkit Script:**\n" +
      "```bash\n" +
      "#!/bin/bash\n" +
      "# debug-container.sh - Quick debugging overview\n\n" +
      "CONTAINER=$1\n\n" +
      "echo \"=== Container Status ===\"\n" +
      "docker ps -a --filter \"name=$CONTAINER\" --format \"table {{.Status}}\\t{{.Names}}\"\n\n" +
      "echo -e \"\\n=== Exit Code ===\"\n" +
      "docker inspect --format='Exit: {{.State.ExitCode}} OOM: {{.State.OOMKilled}}' $CONTAINER\n\n" +
      "echo -e \"\\n=== Resource Usage ===\"\n" +
      "docker stats --no-stream --format \"CPU: {{.CPUPerc}}  MEM: {{.MemUsage}}\" $CONTAINER\n\n" +
      "echo -e \"\\n=== Recent Logs ===\"\n" +
      "docker logs --tail 20 $CONTAINER\n\n" +
      "echo -e \"\\n=== Network ===\"\n" +
      "docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $CONTAINER\n" +
      "```",

    summary: 
      "## 📝 Key Takeaways\n\n" +
      "1. **Exit codes tell the story** - 137 = OOM, 127 = not found, 126 = permission denied\n" +
      "2. **`docker logs -f`** is your best friend - always start here\n" +
      "3. **`docker exec -it`** gets you inside running containers\n" +
      "4. **`docker inspect`** reveals all configuration details\n" +
      "5. **Override entrypoint** to debug containers that won't start\n" +
      "6. **Use service names** for container-to-container networking\n" +
      "7. **`docker stats`** catches memory and CPU issues\n" +
      "8. **Health checks** are debugging tools, not just orchestration features",

    nextSteps: 
      "**What's Next?**\n\n" +
      "You can now diagnose any Docker issue! Continue with:\n" +
      "- **Docker Logging Drivers**: Centralized logging with ELK, Loki\n" +
      "- **Container Monitoring**: Prometheus, Grafana, cAdvisor\n" +
      "- **Docker Security**: Scanning images, running rootless\n" +
      "- **Kubernetes Debugging**: kubectl logs, describe, exec"
  },

  'ci-cd-concepts-github-actions': {
    introduction: 
      "Imagine pushing code and having it automatically tested, built, and deployed to production—all " +
      "within minutes. No manual steps. No human errors. No \"it works on my machine\" excuses. This " +
      "is CI/CD: Continuous Integration and Continuous Deployment.\n\n" +
      "In this lesson, you'll learn the principles behind CI/CD and master GitHub Actions, one of the " +
      "most popular CI/CD platforms. You'll build real workflows that test, build, and deploy your " +
      "applications automatically. By the end, you'll never manually deploy again.",

    whyItMatters: 
      "**Why CI/CD Is Essential for Modern Development:**\n\n" +
      "1. **Faster feedback** - Know within minutes if your code broke something\n" +
      "2. **Consistent deployments** - Same process every time, no forgotten steps\n" +
      "3. **Reduced risk** - Small, frequent changes are easier to debug than big releases\n" +
      "4. **Developer happiness** - Focus on code, not deployment checklists\n" +
      "5. **Business velocity** - Ship features to customers faster\n\n" +
      "**The Old Way vs The CI/CD Way:**\n" +
      "```\n" +
      "┌────────────────────────────────────────────────────────────────────┐\n" +
      "│                    TRADITIONAL DEPLOYMENT                         │\n" +
      "├────────────────────────────────────────────────────────────────────┤\n" +
      "│  Developer → Git Push → Wait... → QA Tests → Wait... → Ops       │\n" +
      "│  Deploys → Hope Nothing Breaks → 2 weeks later: \"Live!\"          │\n" +
      "└────────────────────────────────────────────────────────────────────┘\n" +
      "\n" +
      "┌────────────────────────────────────────────────────────────────────┐\n" +
      "│                      CI/CD PIPELINE                               │\n" +
      "├────────────────────────────────────────────────────────────────────┤\n" +
      "│  Developer → Git Push → Tests Run → Build → Deploy → 10 minutes  │\n" +
      "│  later: \"Live!\" (with rollback ready if needed)                  │\n" +
      "└────────────────────────────────────────────────────────────────────┘\n" +
      "```",

    concepts: [
      {
        title: 'CI vs CD: Understanding the Difference',
        content: 
          "**Continuous Integration (CI):**\n" +
          "Developers merge code frequently. Every merge triggers automated builds and tests.\n\n" +
          "```\n" +
          "┌─────────────────────────────────────────────────────────────────┐\n" +
          "│                    CONTINUOUS INTEGRATION                      │\n" +
          "├─────────────────────────────────────────────────────────────────┤\n" +
          "│                                                                 │\n" +
          "│   Developer A ──┐                                               │\n" +
          "│                 ├──> Main Branch ──> Build ──> Test ──> ✅/❌   │\n" +
          "│   Developer B ──┘         │                                     │\n" +
          "│                           │                                     │\n" +
          "│                    Merge frequently                             │\n" +
          "│                    (multiple times/day)                         │\n" +
          "│                                                                 │\n" +
          "└─────────────────────────────────────────────────────────────────┘\n" +
          "```\n\n" +
          "**Continuous Delivery (CD):**\n" +
          "Code is always in a deployable state. Deployment to production requires manual approval.\n\n" +
          "**Continuous Deployment (CD):**\n" +
          "Every change that passes tests is automatically deployed to production. No human intervention.\n\n" +
          "```\n" +
          "┌─────────────────────────────────────────────────────────────────┐\n" +
          "│               CI / CD PIPELINE FLOW                            │\n" +
          "├─────────────────────────────────────────────────────────────────┤\n" +
          "│                                                                 │\n" +
          "│  ┌──────┐   ┌──────┐   ┌───────┐   ┌─────────┐   ┌──────────┐  │\n" +
          "│  │ Code │ → │ Test │ → │ Build │ → │ Stage   │ → │Production│  │\n" +
          "│  └──────┘   └──────┘   └───────┘   └─────────┘   └──────────┘  │\n" +
          "│                                                                 │\n" +
          "│  ├──────── CI ────────┤                                        │\n" +
          "│  ├────────────── Continuous Delivery ───────┤ (manual deploy)  │\n" +
          "│  ├────────────── Continuous Deployment ─────────────────────┤  │\n" +
          "│                                              (auto deploy)     │\n" +
          "└─────────────────────────────────────────────────────────────────┘\n" +
          "```"
      },
      {
        title: 'GitHub Actions: Core Concepts',
        content: 
          "GitHub Actions uses YAML files to define automated workflows.\n\n" +
          "**Key Terminology:**\n" +
          "```\n" +
          "┌─────────────────────────────────────────────────────────────────┐\n" +
          "│                  GITHUB ACTIONS HIERARCHY                      │\n" +
          "├─────────────────────────────────────────────────────────────────┤\n" +
          "│                                                                 │\n" +
          "│  Workflow (.github/workflows/ci.yml)                           │\n" +
          "│    │                                                           │\n" +
          "│    ├── Job: build                                              │\n" +
          "│    │     ├── Step 1: Checkout code                             │\n" +
          "│    │     ├── Step 2: Setup Node.js                             │\n" +
          "│    │     └── Step 3: Run npm install                           │\n" +
          "│    │                                                           │\n" +
          "│    ├── Job: test                                               │\n" +
          "│    │     ├── Step 1: Checkout code                             │\n" +
          "│    │     └── Step 2: Run tests                                 │\n" +
          "│    │                                                           │\n" +
          "│    └── Job: deploy                                             │\n" +
          "│          ├── Step 1: Deploy to server                          │\n" +
          "│          └── Step 2: Notify team                               │\n" +
          "│                                                                 │\n" +
          "└─────────────────────────────────────────────────────────────────┘\n" +
          "```\n\n" +
          "| Term | Definition |\n" +
          "|------|------------|\n" +
          "| **Workflow** | Automated process defined in YAML, triggered by events |\n" +
          "| **Event** | What triggers the workflow (push, PR, schedule, etc.) |\n" +
          "| **Job** | A set of steps that run on the same runner |\n" +
          "| **Step** | Individual task (run command or use an action) |\n" +
          "| **Action** | Reusable unit of code (from marketplace or custom) |\n" +
          "| **Runner** | Server that executes jobs (GitHub-hosted or self-hosted) |"
      },
      {
        title: 'Workflow File Anatomy',
        content: 
          "Workflows live in `.github/workflows/` directory:\n\n" +
          "```yaml\n" +
          "# .github/workflows/ci.yml\n" +
          "\n" +
          "# Workflow name (shown in GitHub UI)\n" +
          "name: CI Pipeline\n" +
          "\n" +
          "# Triggers: when does this workflow run?\n" +
          "on:\n" +
          "  push:\n" +
          "    branches: [main, develop]\n" +
          "  pull_request:\n" +
          "    branches: [main]\n" +
          "  workflow_dispatch:  # Manual trigger\n" +
          "\n" +
          "# Environment variables for all jobs\n" +
          "env:\n" +
          "  NODE_VERSION: '20'\n" +
          "\n" +
          "# Jobs run in parallel by default\n" +
          "jobs:\n" +
          "  build:\n" +
          "    # Which OS to run on\n" +
          "    runs-on: ubuntu-latest\n" +
          "    \n" +
          "    # Steps execute sequentially\n" +
          "    steps:\n" +
          "      # Use an action from the marketplace\n" +
          "      - name: Checkout code\n" +
          "        uses: actions/checkout@v4\n" +
          "      \n" +
          "      # Another marketplace action\n" +
          "      - name: Setup Node.js\n" +
          "        uses: actions/setup-node@v4\n" +
          "        with:\n" +
          "          node-version: ${{ env.NODE_VERSION }}\n" +
          "          cache: 'npm'\n" +
          "      \n" +
          "      # Run shell commands\n" +
          "      - name: Install dependencies\n" +
          "        run: npm ci\n" +
          "      \n" +
          "      - name: Run tests\n" +
          "        run: npm test\n" +
          "      \n" +
          "      - name: Build\n" +
          "        run: npm run build\n" +
          "```"
      },
      {
        title: 'Events and Triggers',
        content: 
          "Workflows can be triggered by many events:\n\n" +
          "```yaml\n" +
          "on:\n" +
          "  # Push to specific branches\n" +
          "  push:\n" +
          "    branches:\n" +
          "      - main\n" +
          "      - 'release/**'  # Pattern matching\n" +
          "    paths:\n" +
          "      - 'src/**'       # Only when src files change\n" +
          "      - '!**.md'       # Ignore markdown files\n" +
          "\n" +
          "  # Pull request events\n" +
          "  pull_request:\n" +
          "    types: [opened, synchronize, reopened]\n" +
          "    branches: [main]\n" +
          "\n" +
          "  # Scheduled (cron syntax)\n" +
          "  schedule:\n" +
          "    - cron: '0 0 * * *'  # Every day at midnight UTC\n" +
          "\n" +
          "  # Manual trigger from GitHub UI\n" +
          "  workflow_dispatch:\n" +
          "    inputs:\n" +
          "      environment:\n" +
          "        description: 'Deploy environment'\n" +
          "        required: true\n" +
          "        default: 'staging'\n" +
          "        type: choice\n" +
          "        options:\n" +
          "          - staging\n" +
          "          - production\n" +
          "\n" +
          "  # When another workflow completes\n" +
          "  workflow_run:\n" +
          "    workflows: [Build]\n" +
          "    types: [completed]\n" +
          "\n" +
          "  # When a release is published\n" +
          "  release:\n" +
          "    types: [published]\n" +
          "```\n\n" +
          "**Common Event Patterns:**\n" +
          "| Use Case | Event |\n" +
          "|----------|-------|\n" +
          "| Test on every push | `push` |\n" +
          "| Test PRs before merge | `pull_request` |\n" +
          "| Deploy on merge to main | `push: branches: [main]` |\n" +
          "| Nightly builds | `schedule` |\n" +
          "| Manual deployments | `workflow_dispatch` |\n" +
          "| Deploy releases | `release: types: [published]` |"
      },
      {
        title: 'Jobs and Dependencies',
        content: 
          "Jobs run in parallel by default. Use `needs` to create dependencies:\n\n" +
          "```yaml\n" +
          "jobs:\n" +
          "  # First job - runs immediately\n" +
          "  lint:\n" +
          "    runs-on: ubuntu-latest\n" +
          "    steps:\n" +
          "      - uses: actions/checkout@v4\n" +
          "      - run: npm ci\n" +
          "      - run: npm run lint\n" +
          "\n" +
          "  # Second job - runs in parallel with lint\n" +
          "  test:\n" +
          "    runs-on: ubuntu-latest\n" +
          "    steps:\n" +
          "      - uses: actions/checkout@v4\n" +
          "      - run: npm ci\n" +
          "      - run: npm test\n" +
          "\n" +
          "  # Third job - waits for lint AND test to pass\n" +
          "  build:\n" +
          "    needs: [lint, test]\n" +
          "    runs-on: ubuntu-latest\n" +
          "    steps:\n" +
          "      - uses: actions/checkout@v4\n" +
          "      - run: npm ci\n" +
          "      - run: npm run build\n" +
          "\n" +
          "  # Fourth job - waits for build\n" +
          "  deploy:\n" +
          "    needs: build\n" +
          "    runs-on: ubuntu-latest\n" +
          "    if: github.ref == 'refs/heads/main'  # Only on main\n" +
          "    steps:\n" +
          "      - run: echo 'Deploying...'\n" +
          "```\n\n" +
          "**Job Flow Visualization:**\n" +
          "```\n" +
          "         ┌──────────┐\n" +
          "         │   lint   │──────┐\n" +
          "         └──────────┘      │\n" +
          "                           ├──> ┌──────────┐    ┌──────────┐\n" +
          "                           │    │  build   │───>│  deploy  │\n" +
          "                           ├──> └──────────┘    └──────────┘\n" +
          "         ┌──────────┐      │                          │\n" +
          "         │   test   │──────┘              (only on main branch)\n" +
          "         └──────────┘\n" +
          "         \n" +
          "     [parallel]          [sequential]      [conditional]\n" +
          "```"
      },
      {
        title: 'Secrets and Environment Variables',
        content: 
          "Never hardcode sensitive data. Use GitHub Secrets:\n\n" +
          "**Setting Secrets (in GitHub UI):**\n" +
          "```\n" +
          "Repository → Settings → Secrets and variables → Actions → New secret\n" +
          "```\n\n" +
          "**Using Secrets in Workflows:**\n" +
          "```yaml\n" +
          "jobs:\n" +
          "  deploy:\n" +
          "    runs-on: ubuntu-latest\n" +
          "    \n" +
          "    # Environment-level secrets\n" +
          "    environment: production\n" +
          "    \n" +
          "    steps:\n" +
          "      - name: Deploy to server\n" +
          "        env:\n" +
          "          # Access secrets with ${{ secrets.NAME }}\n" +
          "          SSH_KEY: ${{ secrets.SSH_PRIVATE_KEY }}\n" +
          "          API_TOKEN: ${{ secrets.DEPLOY_TOKEN }}\n" +
          "        run: |\n" +
          "          echo \"$SSH_KEY\" > key.pem\n" +
          "          chmod 600 key.pem\n" +
          "          ssh -i key.pem user@server 'deploy.sh'\n" +
          "\n" +
          "      - name: Deploy to Docker Hub\n" +
          "        uses: docker/login-action@v3\n" +
          "        with:\n" +
          "          username: ${{ secrets.DOCKER_USERNAME }}\n" +
          "          password: ${{ secrets.DOCKER_PASSWORD }}\n" +
          "```\n\n" +
          "**Environment Variables:**\n" +
          "```yaml\n" +
          "# Global env vars\n" +
          "env:\n" +
          "  CI: true\n" +
          "  NODE_ENV: production\n" +
          "\n" +
          "jobs:\n" +
          "  build:\n" +
          "    runs-on: ubuntu-latest\n" +
          "    # Job-level env vars\n" +
          "    env:\n" +
          "      BUILD_DIR: ./dist\n" +
          "    \n" +
          "    steps:\n" +
          "      - name: Build\n" +
          "        # Step-level env vars\n" +
          "        env:\n" +
          "          API_URL: https://api.example.com\n" +
          "        run: npm run build\n" +
          "```\n\n" +
          "**Security Best Practices:**\n" +
          "- Never echo secrets (they're masked but still risky)\n" +
          "- Use environment-level secrets for production\n" +
          "- Rotate secrets regularly\n" +
          "- Use OIDC for cloud providers instead of long-lived tokens"
      },
      {
        title: 'Matrix Builds',
        content: 
          "Test across multiple versions/platforms with matrix strategy:\n\n" +
          "```yaml\n" +
          "jobs:\n" +
          "  test:\n" +
          "    runs-on: ${{ matrix.os }}\n" +
          "    \n" +
          "    strategy:\n" +
          "      # Don't cancel other jobs if one fails\n" +
          "      fail-fast: false\n" +
          "      \n" +
          "      matrix:\n" +
          "        os: [ubuntu-latest, windows-latest, macos-latest]\n" +
          "        node-version: [18, 20, 22]\n" +
          "        # Exclude specific combinations\n" +
          "        exclude:\n" +
          "          - os: windows-latest\n" +
          "            node-version: 18\n" +
          "        # Include additional combinations\n" +
          "        include:\n" +
          "          - os: ubuntu-latest\n" +
          "            node-version: 20\n" +
          "            experimental: true\n" +
          "    \n" +
          "    steps:\n" +
          "      - uses: actions/checkout@v4\n" +
          "      \n" +
          "      - name: Setup Node.js ${{ matrix.node-version }}\n" +
          "        uses: actions/setup-node@v4\n" +
          "        with:\n" +
          "          node-version: ${{ matrix.node-version }}\n" +
          "      \n" +
          "      - run: npm ci\n" +
          "      - run: npm test\n" +
          "```\n\n" +
          "**This Creates 8 Parallel Jobs:**\n" +
          "```\n" +
          "┌─────────────────────────────────────────────────────────────┐\n" +
          "│  ubuntu-latest + Node 18  │  ubuntu-latest + Node 20       │\n" +
          "├─────────────────────────────────────────────────────────────┤\n" +
          "│  ubuntu-latest + Node 22  │  windows-latest + Node 20      │\n" +
          "├─────────────────────────────────────────────────────────────┤\n" +
          "│  windows-latest + Node 22 │  macos-latest + Node 18        │\n" +
          "├─────────────────────────────────────────────────────────────┤\n" +
          "│  macos-latest + Node 20   │  macos-latest + Node 22        │\n" +
          "└─────────────────────────────────────────────────────────────┘\n" +
          "```"
      },
      {
        title: 'Caching and Artifacts',
        content: 
          "Speed up workflows with caching and share data between jobs with artifacts:\n\n" +
          "**Caching Dependencies:**\n" +
          "```yaml\n" +
          "jobs:\n" +
          "  build:\n" +
          "    runs-on: ubuntu-latest\n" +
          "    steps:\n" +
          "      - uses: actions/checkout@v4\n" +
          "      \n" +
          "      # Built-in caching with setup-node\n" +
          "      - uses: actions/setup-node@v4\n" +
          "        with:\n" +
          "          node-version: '20'\n" +
          "          cache: 'npm'  # Automatically caches node_modules\n" +
          "      \n" +
          "      # Or manual caching\n" +
          "      - name: Cache node_modules\n" +
          "        uses: actions/cache@v4\n" +
          "        with:\n" +
          "          path: ~/.npm\n" +
          "          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}\n" +
          "          restore-keys: |\n" +
          "            ${{ runner.os }}-node-\n" +
          "      \n" +
          "      - run: npm ci\n" +
          "```\n\n" +
          "**Uploading Artifacts:**\n" +
          "```yaml\n" +
          "jobs:\n" +
          "  build:\n" +
          "    runs-on: ubuntu-latest\n" +
          "    steps:\n" +
          "      - uses: actions/checkout@v4\n" +
          "      - run: npm ci\n" +
          "      - run: npm run build\n" +
          "      \n" +
          "      # Upload build output\n" +
          "      - name: Upload build artifacts\n" +
          "        uses: actions/upload-artifact@v4\n" +
          "        with:\n" +
          "          name: build-output\n" +
          "          path: dist/\n" +
          "          retention-days: 5\n" +
          "\n" +
          "  deploy:\n" +
          "    needs: build\n" +
          "    runs-on: ubuntu-latest\n" +
          "    steps:\n" +
          "      # Download artifacts from build job\n" +
          "      - name: Download build artifacts\n" +
          "        uses: actions/download-artifact@v4\n" +
          "        with:\n" +
          "          name: build-output\n" +
          "          path: dist/\n" +
          "      \n" +
          "      - run: ls -la dist/\n" +
          "      - run: ./deploy.sh\n" +
          "```"
      }
    ],

    stepByStep: [
      {
        title: 'Step 1: Your First CI Workflow',
        content: 
          "Create a basic CI workflow for a Node.js project:\n\n" +
          "```yaml\n" +
          "# .github/workflows/ci.yml\n" +
          "name: CI\n" +
          "\n" +
          "on:\n" +
          "  push:\n" +
          "    branches: [main]\n" +
          "  pull_request:\n" +
          "    branches: [main]\n" +
          "\n" +
          "jobs:\n" +
          "  test:\n" +
          "    runs-on: ubuntu-latest\n" +
          "    \n" +
          "    steps:\n" +
          "      - name: Checkout code\n" +
          "        uses: actions/checkout@v4\n" +
          "      \n" +
          "      - name: Setup Node.js\n" +
          "        uses: actions/setup-node@v4\n" +
          "        with:\n" +
          "          node-version: '20'\n" +
          "          cache: 'npm'\n" +
          "      \n" +
          "      - name: Install dependencies\n" +
          "        run: npm ci\n" +
          "      \n" +
          "      - name: Run linter\n" +
          "        run: npm run lint\n" +
          "      \n" +
          "      - name: Run tests\n" +
          "        run: npm test\n" +
          "      \n" +
          "      - name: Build\n" +
          "        run: npm run build\n" +
          "```\n\n" +
          "Push this file to `.github/workflows/ci.yml` and GitHub will automatically run it!"
      },
      {
        title: 'Step 2: Add Docker Build and Push',
        content: 
          "Build Docker images and push to a registry:\n\n" +
          "```yaml\n" +
          "# .github/workflows/docker.yml\n" +
          "name: Build and Push Docker Image\n" +
          "\n" +
          "on:\n" +
          "  push:\n" +
          "    branches: [main]\n" +
          "    tags: ['v*']\n" +
          "\n" +
          "env:\n" +
          "  REGISTRY: ghcr.io\n" +
          "  IMAGE_NAME: ${{ github.repository }}\n" +
          "\n" +
          "jobs:\n" +
          "  build-and-push:\n" +
          "    runs-on: ubuntu-latest\n" +
          "    permissions:\n" +
          "      contents: read\n" +
          "      packages: write\n" +
          "    \n" +
          "    steps:\n" +
          "      - name: Checkout\n" +
          "        uses: actions/checkout@v4\n" +
          "      \n" +
          "      - name: Set up Docker Buildx\n" +
          "        uses: docker/setup-buildx-action@v3\n" +
          "      \n" +
          "      - name: Log in to Container Registry\n" +
          "        uses: docker/login-action@v3\n" +
          "        with:\n" +
          "          registry: ${{ env.REGISTRY }}\n" +
          "          username: ${{ github.actor }}\n" +
          "          password: ${{ secrets.GITHUB_TOKEN }}\n" +
          "      \n" +
          "      - name: Extract metadata\n" +
          "        id: meta\n" +
          "        uses: docker/metadata-action@v5\n" +
          "        with:\n" +
          "          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}\n" +
          "          tags: |\n" +
          "            type=sha,prefix=\n" +
          "            type=ref,event=branch\n" +
          "            type=semver,pattern={{version}}\n" +
          "      \n" +
          "      - name: Build and push\n" +
          "        uses: docker/build-push-action@v5\n" +
          "        with:\n" +
          "          context: .\n" +
          "          push: true\n" +
          "          tags: ${{ steps.meta.outputs.tags }}\n" +
          "          labels: ${{ steps.meta.outputs.labels }}\n" +
          "          cache-from: type=gha\n" +
          "          cache-to: type=gha,mode=max\n" +
          "```"
      },
      {
        title: 'Step 3: Deploy to a Server',
        content: 
          "Deploy your application via SSH:\n\n" +
          "```yaml\n" +
          "# .github/workflows/deploy.yml\n" +
          "name: Deploy\n" +
          "\n" +
          "on:\n" +
          "  push:\n" +
          "    branches: [main]\n" +
          "\n" +
          "jobs:\n" +
          "  deploy:\n" +
          "    runs-on: ubuntu-latest\n" +
          "    environment: production  # Requires approval if configured\n" +
          "    \n" +
          "    steps:\n" +
          "      - name: Checkout\n" +
          "        uses: actions/checkout@v4\n" +
          "      \n" +
          "      - name: Setup SSH\n" +
          "        run: |\n" +
          "          mkdir -p ~/.ssh\n" +
          "          echo \"${{ secrets.SSH_PRIVATE_KEY }}\" > ~/.ssh/id_rsa\n" +
          "          chmod 600 ~/.ssh/id_rsa\n" +
          "          ssh-keyscan -H ${{ secrets.SERVER_HOST }} >> ~/.ssh/known_hosts\n" +
          "      \n" +
          "      - name: Deploy to server\n" +
          "        run: |\n" +
          "          ssh ${{ secrets.SERVER_USER }}@${{ secrets.SERVER_HOST }} << 'EOF'\n" +
          "            cd /opt/myapp\n" +
          "            git pull origin main\n" +
          "            docker compose pull\n" +
          "            docker compose up -d\n" +
          "            docker image prune -f\n" +
          "          EOF\n" +
          "      \n" +
          "      - name: Verify deployment\n" +
          "        run: |\n" +
          "          sleep 10\n" +
          "          curl -f https://myapp.com/health || exit 1\n" +
          "      \n" +
          "      - name: Notify on Slack\n" +
          "        if: success()\n" +
          "        uses: slackapi/slack-github-action@v1\n" +
          "        with:\n" +
          "          payload: |\n" +
          "            {\"text\": \"✅ Deployed ${{ github.sha }} to production\"}\n" +
          "        env:\n" +
          "          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}\n" +
          "```"
      },
      {
        title: 'Step 4: Complete CI/CD Pipeline',
        content: 
          "A full pipeline with test, build, and staged deployments:\n\n" +
          "```yaml\n" +
          "# .github/workflows/pipeline.yml\n" +
          "name: CI/CD Pipeline\n" +
          "\n" +
          "on:\n" +
          "  push:\n" +
          "    branches: [main, develop]\n" +
          "  pull_request:\n" +
          "    branches: [main]\n" +
          "\n" +
          "jobs:\n" +
          "  # ============ CI STAGE ============\n" +
          "  lint:\n" +
          "    runs-on: ubuntu-latest\n" +
          "    steps:\n" +
          "      - uses: actions/checkout@v4\n" +
          "      - uses: actions/setup-node@v4\n" +
          "        with: { node-version: '20', cache: 'npm' }\n" +
          "      - run: npm ci\n" +
          "      - run: npm run lint\n" +
          "\n" +
          "  test:\n" +
          "    runs-on: ubuntu-latest\n" +
          "    steps:\n" +
          "      - uses: actions/checkout@v4\n" +
          "      - uses: actions/setup-node@v4\n" +
          "        with: { node-version: '20', cache: 'npm' }\n" +
          "      - run: npm ci\n" +
          "      - run: npm test -- --coverage\n" +
          "      - name: Upload coverage\n" +
          "        uses: codecov/codecov-action@v4\n" +
          "\n" +
          "  build:\n" +
          "    needs: [lint, test]\n" +
          "    runs-on: ubuntu-latest\n" +
          "    steps:\n" +
          "      - uses: actions/checkout@v4\n" +
          "      - uses: actions/setup-node@v4\n" +
          "        with: { node-version: '20', cache: 'npm' }\n" +
          "      - run: npm ci\n" +
          "      - run: npm run build\n" +
          "      - uses: actions/upload-artifact@v4\n" +
          "        with:\n" +
          "          name: build\n" +
          "          path: dist/\n" +
          "\n" +
          "  # ============ CD STAGE ============\n" +
          "  deploy-staging:\n" +
          "    needs: build\n" +
          "    if: github.ref == 'refs/heads/develop'\n" +
          "    runs-on: ubuntu-latest\n" +
          "    environment: staging\n" +
          "    steps:\n" +
          "      - uses: actions/download-artifact@v4\n" +
          "        with: { name: build, path: dist/ }\n" +
          "      - run: echo 'Deploying to staging...'\n" +
          "\n" +
          "  deploy-production:\n" +
          "    needs: build\n" +
          "    if: github.ref == 'refs/heads/main'\n" +
          "    runs-on: ubuntu-latest\n" +
          "    environment: production  # Requires approval\n" +
          "    steps:\n" +
          "      - uses: actions/download-artifact@v4\n" +
          "        with: { name: build, path: dist/ }\n" +
          "      - run: echo 'Deploying to production...'\n" +
          "```"
      },
      {
        title: 'Step 5: Reusable Workflows',
        content: 
          "Create workflows that can be called by other workflows:\n\n" +
          "**Reusable Workflow Definition:**\n" +
          "```yaml\n" +
          "# .github/workflows/reusable-deploy.yml\n" +
          "name: Reusable Deploy\n" +
          "\n" +
          "on:\n" +
          "  workflow_call:\n" +
          "    inputs:\n" +
          "      environment:\n" +
          "        required: true\n" +
          "        type: string\n" +
          "      image-tag:\n" +
          "        required: true\n" +
          "        type: string\n" +
          "    secrets:\n" +
          "      DEPLOY_TOKEN:\n" +
          "        required: true\n" +
          "\n" +
          "jobs:\n" +
          "  deploy:\n" +
          "    runs-on: ubuntu-latest\n" +
          "    environment: ${{ inputs.environment }}\n" +
          "    steps:\n" +
          "      - name: Deploy ${{ inputs.image-tag }} to ${{ inputs.environment }}\n" +
          "        run: |\n" +
          "          echo \"Deploying ${{ inputs.image-tag }}\"\n" +
          "          echo \"to ${{ inputs.environment }}\"\n" +
          "        env:\n" +
          "          TOKEN: ${{ secrets.DEPLOY_TOKEN }}\n" +
          "```\n\n" +
          "**Calling the Reusable Workflow:**\n" +
          "```yaml\n" +
          "# .github/workflows/main.yml\n" +
          "name: Main Pipeline\n" +
          "\n" +
          "on:\n" +
          "  push:\n" +
          "    branches: [main]\n" +
          "\n" +
          "jobs:\n" +
          "  build:\n" +
          "    runs-on: ubuntu-latest\n" +
          "    outputs:\n" +
          "      image-tag: ${{ steps.tag.outputs.tag }}\n" +
          "    steps:\n" +
          "      - id: tag\n" +
          "        run: echo \"tag=sha-${{ github.sha }}\" >> $GITHUB_OUTPUT\n" +
          "\n" +
          "  deploy-staging:\n" +
          "    needs: build\n" +
          "    uses: ./.github/workflows/reusable-deploy.yml\n" +
          "    with:\n" +
          "      environment: staging\n" +
          "      image-tag: ${{ needs.build.outputs.image-tag }}\n" +
          "    secrets:\n" +
          "      DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}\n" +
          "\n" +
          "  deploy-production:\n" +
          "    needs: [build, deploy-staging]\n" +
          "    uses: ./.github/workflows/reusable-deploy.yml\n" +
          "    with:\n" +
          "      environment: production\n" +
          "      image-tag: ${{ needs.build.outputs.image-tag }}\n" +
          "    secrets:\n" +
          "      DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}\n" +
          "```"
      },
      {
        title: 'Step 6: Security Scanning',
        content: 
          "Add security checks to your pipeline:\n\n" +
          "```yaml\n" +
          "# .github/workflows/security.yml\n" +
          "name: Security Scan\n" +
          "\n" +
          "on:\n" +
          "  push:\n" +
          "    branches: [main]\n" +
          "  pull_request:\n" +
          "  schedule:\n" +
          "    - cron: '0 0 * * 1'  # Weekly on Monday\n" +
          "\n" +
          "jobs:\n" +
          "  # Dependency vulnerability scan\n" +
          "  dependency-scan:\n" +
          "    runs-on: ubuntu-latest\n" +
          "    steps:\n" +
          "      - uses: actions/checkout@v4\n" +
          "      - name: Run npm audit\n" +
          "        run: npm audit --audit-level=high\n" +
          "\n" +
          "  # Code security analysis\n" +
          "  codeql:\n" +
          "    runs-on: ubuntu-latest\n" +
          "    permissions:\n" +
          "      security-events: write\n" +
          "    steps:\n" +
          "      - uses: actions/checkout@v4\n" +
          "      - name: Initialize CodeQL\n" +
          "        uses: github/codeql-action/init@v3\n" +
          "        with:\n" +
          "          languages: javascript, typescript\n" +
          "      - name: Perform CodeQL Analysis\n" +
          "        uses: github/codeql-action/analyze@v3\n" +
          "\n" +
          "  # Container image scanning\n" +
          "  container-scan:\n" +
          "    runs-on: ubuntu-latest\n" +
          "    steps:\n" +
          "      - uses: actions/checkout@v4\n" +
          "      - name: Build image\n" +
          "        run: docker build -t myapp:scan .\n" +
          "      - name: Scan image with Trivy\n" +
          "        uses: aquasecurity/trivy-action@master\n" +
          "        with:\n" +
          "          image-ref: 'myapp:scan'\n" +
          "          format: 'sarif'\n" +
          "          output: 'trivy-results.sarif'\n" +
          "      - name: Upload Trivy scan results\n" +
          "        uses: github/codeql-action/upload-sarif@v3\n" +
          "        with:\n" +
          "          sarif_file: 'trivy-results.sarif'\n" +
          "\n" +
          "  # Secret scanning\n" +
          "  secrets-scan:\n" +
          "    runs-on: ubuntu-latest\n" +
          "    steps:\n" +
          "      - uses: actions/checkout@v4\n" +
          "        with:\n" +
          "          fetch-depth: 0  # Full history for secret scan\n" +
          "      - name: Scan for secrets\n" +
          "        uses: trufflesecurity/trufflehog@main\n" +
          "        with:\n" +
          "          path: ./\n" +
          "          extra_args: --only-verified\n" +
          "```"
      }
    ],

    commonMistakes: [
      "**Not using `npm ci` in CI** - `npm install` can produce different results. `npm ci` is deterministic.",
      "**Forgetting to cache** - Every run without cache downloads all dependencies again. Slow and wasteful.",
      "**Exposing secrets in logs** - Never `echo $SECRET`. GitHub masks them, but don't risk it.",
      "**Ignoring exit codes** - Use `set -e` in shell scripts or proper error handling.",
      "**Not testing the workflow locally** - Use `act` (https://github.com/nektos/act) to test workflows locally.",
      "**Overcomplicating early** - Start simple. Add complexity only when needed.",
      "**Not using branch protection** - Require CI to pass before merging PRs.",
      "**Running jobs sequentially when they could be parallel** - Use `needs` only when actually dependent."
    ],

    bestPractices: [
      "**Pin action versions** - Use `@v4` not `@main` to avoid breaking changes",
      "**Use environments** for production deployments with approval gates",
      "**Cache aggressively** - Dependencies, Docker layers, build outputs",
      "**Fail fast** - Put lint/quick tests first to get fast feedback",
      "**Use matrix builds** for testing across versions/platforms",
      "**Keep secrets minimal** - Use OIDC for cloud providers when possible",
      "**Add status badges** to your README for visibility",
      "**Use reusable workflows** to DRY up common patterns",
      "**Monitor workflow costs** - GitHub Actions minutes aren't free forever",
      "**Document your workflows** with comments and good step names"
    ],

    realWorldExample: 
      "**Full Production Pipeline for a Node.js API:**\n\n" +
      "```yaml\n" +
      "# .github/workflows/production.yml\n" +
      "name: Production Pipeline\n" +
      "\n" +
      "on:\n" +
      "  push:\n" +
      "    branches: [main]\n" +
      "  pull_request:\n" +
      "    branches: [main]\n" +
      "\n" +
      "env:\n" +
      "  REGISTRY: ghcr.io\n" +
      "  IMAGE_NAME: ${{ github.repository }}\n" +
      "\n" +
      "jobs:\n" +
      "  # =============================================\n" +
      "  # CI: Test & Build\n" +
      "  # =============================================\n" +
      "  test:\n" +
      "    runs-on: ubuntu-latest\n" +
      "    services:\n" +
      "      postgres:\n" +
      "        image: postgres:16\n" +
      "        env:\n" +
      "          POSTGRES_PASSWORD: test\n" +
      "        options: >-\n" +
      "          --health-cmd pg_isready\n" +
      "          --health-interval 10s\n" +
      "          --health-timeout 5s\n" +
      "          --health-retries 5\n" +
      "        ports:\n" +
      "          - 5432:5432\n" +
      "    steps:\n" +
      "      - uses: actions/checkout@v4\n" +
      "      - uses: actions/setup-node@v4\n" +
      "        with: { node-version: '20', cache: 'npm' }\n" +
      "      - run: npm ci\n" +
      "      - run: npm run lint\n" +
      "      - run: npm test\n" +
      "        env:\n" +
      "          DATABASE_URL: postgres://postgres:test@localhost:5432/test\n" +
      "\n" +
      "  build:\n" +
      "    needs: test\n" +
      "    runs-on: ubuntu-latest\n" +
      "    permissions:\n" +
      "      contents: read\n" +
      "      packages: write\n" +
      "    outputs:\n" +
      "      image-tag: ${{ steps.meta.outputs.tags }}\n" +
      "    steps:\n" +
      "      - uses: actions/checkout@v4\n" +
      "      - uses: docker/setup-buildx-action@v3\n" +
      "      - uses: docker/login-action@v3\n" +
      "        with:\n" +
      "          registry: ${{ env.REGISTRY }}\n" +
      "          username: ${{ github.actor }}\n" +
      "          password: ${{ secrets.GITHUB_TOKEN }}\n" +
      "      - id: meta\n" +
      "        uses: docker/metadata-action@v5\n" +
      "        with:\n" +
      "          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}\n" +
      "      - uses: docker/build-push-action@v5\n" +
      "        with:\n" +
      "          context: .\n" +
      "          push: ${{ github.event_name != 'pull_request' }}\n" +
      "          tags: ${{ steps.meta.outputs.tags }}\n" +
      "          cache-from: type=gha\n" +
      "          cache-to: type=gha,mode=max\n" +
      "\n" +
      "  # =============================================\n" +
      "  # CD: Deploy\n" +
      "  # =============================================\n" +
      "  deploy:\n" +
      "    needs: build\n" +
      "    if: github.ref == 'refs/heads/main'\n" +
      "    runs-on: ubuntu-latest\n" +
      "    environment: production\n" +
      "    concurrency:\n" +
      "      group: deploy-production\n" +
      "      cancel-in-progress: false\n" +
      "    steps:\n" +
      "      - name: Deploy to production\n" +
      "        run: |\n" +
      "          echo \"Deploying ${{ needs.build.outputs.image-tag }}\"\n" +
      "          # kubectl set image deployment/api api=$IMAGE\n" +
      "          # or: ssh server 'docker pull && docker-compose up -d'\n" +
      "      \n" +
      "      - name: Health check\n" +
      "        run: |\n" +
      "          sleep 30\n" +
      "          curl -f https://api.example.com/health\n" +
      "      \n" +
      "      - name: Notify success\n" +
      "        if: success()\n" +
      "        run: echo \"✅ Deployed successfully\"\n" +
      "      \n" +
      "      - name: Notify failure\n" +
      "        if: failure()\n" +
      "        run: echo \"❌ Deployment failed\"\n" +
      "```\n\n" +
      "**Workflow Visualization:**\n" +
      "```\n" +
      "  PR Opened           Push to main\n" +
      "      │                    │\n" +
      "      ▼                    ▼\n" +
      "  ┌──────┐            ┌──────┐\n" +
      "  │ test │            │ test │\n" +
      "  └──────┘            └──────┘\n" +
      "      │                    │\n" +
      "      ▼                    ▼\n" +
      "  ┌───────┐           ┌───────┐\n" +
      "  │ build │           │ build │──────> Push to Registry\n" +
      "  │(no push)          └───────┘\n" +
      "  └───────┘                │\n" +
      "      │                    ▼\n" +
      "      ▼             ┌────────────┐\n" +
      "   PR Check         │  deploy    │──> Production\n" +
      "   Complete         │ (approval) │\n" +
      "                    └────────────┘\n" +
      "```",

    summary: 
      "## 📝 Key Takeaways\n\n" +
      "1. **CI** = Continuous Integration (test every change)\n" +
      "2. **CD** = Continuous Delivery/Deployment (automate releases)\n" +
      "3. **Workflows** live in `.github/workflows/*.yml`\n" +
      "4. **Jobs** run in parallel, use `needs` for dependencies\n" +
      "5. **Actions** are reusable units from the marketplace\n" +
      "6. **Secrets** keep sensitive data safe\n" +
      "7. **Matrix builds** test across multiple versions/platforms\n" +
      "8. **Cache everything** to speed up pipelines",

    nextSteps: 
      "**What's Next?**\n\n" +
      "You can now build automated pipelines! Continue with:\n" +
      "- **GitLab CI/CD**: Alternative platform with built-in registry\n" +
      "- **GitHub Actions Advanced**: Self-hosted runners, composite actions\n" +
      "- **ArgoCD**: GitOps for Kubernetes deployments\n" +
      "- **Infrastructure as Code**: Terraform in CI/CD pipelines"
  },

  'advanced-pipeline-patterns': {
    introduction: 
      "Basic pipelines get the job done. Advanced pipelines do it faster, safer, and smarter. Once " +
      "you've mastered the fundamentals, it's time to learn patterns that handle real-world complexity: " +
      "monorepos with hundreds of services, deployments that can't afford downtime, and pipelines that " +
      "catch problems before they reach production.\n\n" +
      "In this lesson, you'll learn battle-tested patterns used by companies deploying hundreds of times " +
      "per day. From blue-green deployments to canary releases, from dynamic pipelines to self-healing " +
      "infrastructure. By the end, you'll design pipelines that scale with your organization.",

    whyItMatters: 
      "**Why Advanced Patterns Matter:**\n\n" +
      "1. **Zero-downtime deployments** - Users never see an outage\n" +
      "2. **Faster feedback** - Run only what changed, not everything\n" +
      "3. **Risk reduction** - Catch problems in 1% of traffic, not 100%\n" +
      "4. **Cost optimization** - Don't waste CI minutes on unchanged code\n" +
      "5. **Scale** - Handle monorepos with 100+ services efficiently\n\n" +
      "**The Evolution of Pipeline Maturity:**\n" +
      "```\n" +
      "┌─────────────────────────────────────────────────────────────────┐\n" +
      "│                  PIPELINE MATURITY LEVELS                      │\n" +
      "├─────────────────────────────────────────────────────────────────┤\n" +
      "│ Level 1: Manual           \"Works on my machine\"                │\n" +
      "│ Level 2: Basic CI         Auto-test on every push              │\n" +
      "│ Level 3: Full CI/CD       Auto-deploy to production            │\n" +
      "│ Level 4: Advanced         Blue-green, canary, feature flags    │\n" +
      "│ Level 5: Intelligent      Self-healing, ML-powered decisions   │\n" +
      "└─────────────────────────────────────────────────────────────────┘\n" +
      "```",

    concepts: [
      {
        title: 'Deployment Strategies Overview',
        content: 
          "Different strategies for releasing new versions with varying risk levels:\n\n" +
          "```\n" +
          "┌─────────────────────────────────────────────────────────────────┐\n" +
          "│              DEPLOYMENT STRATEGIES COMPARISON                  │\n" +
          "├──────────────┬──────────┬───────────┬────────────┬─────────────┤\n" +
          "│ Strategy     │ Downtime │ Risk      │ Rollback   │ Complexity  │\n" +
          "├──────────────┼──────────┼───────────┼────────────┼─────────────┤\n" +
          "│ Recreate     │ Yes      │ High      │ Slow       │ Simple      │\n" +
          "│ Rolling      │ No       │ Medium    │ Medium     │ Medium      │\n" +
          "│ Blue-Green   │ No       │ Low       │ Instant    │ Medium      │\n" +
          "│ Canary       │ No       │ Very Low  │ Instant    │ High        │\n" +
          "│ A/B Testing  │ No       │ Very Low  │ Instant    │ Very High   │\n" +
          "└──────────────┴──────────┴───────────┴────────────┴─────────────┘\n" +
          "```\n\n" +
          "**Visual Comparison:**\n" +
          "```\n" +
          "RECREATE:      [v1 v1 v1] → [  DOWN  ] → [v2 v2 v2]\n" +
          "\n" +
          "ROLLING:       [v1 v1 v1] → [v2 v1 v1] → [v2 v2 v1] → [v2 v2 v2]\n" +
          "\n" +
          "BLUE-GREEN:    [v1 v1 v1]──────────────────┐\n" +
          "               [v2 v2 v2] (ready, waiting) │\n" +
          "                          ← switch traffic ┘\n" +
          "\n" +
          "CANARY:        [v1 v1 v1 v1 v1] → [v2 v1 v1 v1 v1] → ... → [v2 v2 v2 v2 v2]\n" +
          "                    100%              10%    90%               100%\n" +
          "```"
      },
      {
        title: 'Blue-Green Deployments',
        content: 
          "Run two identical environments, switch traffic instantly:\n\n" +
          "```\n" +
          "┌─────────────────────────────────────────────────────────────────┐\n" +
          "│                    BLUE-GREEN DEPLOYMENT                       │\n" +
          "├─────────────────────────────────────────────────────────────────┤\n" +
          "│                                                                 │\n" +
          "│     ┌─────────────────────────────────────────────────────┐    │\n" +
          "│     │              LOAD BALANCER / ROUTER                 │    │\n" +
          "│     └────────────────────┬────────────────────────────────┘    │\n" +
          "│                          │                                     │\n" +
          "│            ┌─────────────┴─────────────┐                       │\n" +
          "│            │                           │                       │\n" +
          "│            ▼                           ▼                       │\n" +
          "│     ┌─────────────┐             ┌─────────────┐                │\n" +
          "│     │    BLUE     │             │   GREEN     │                │\n" +
          "│     │    (v1)     │ ◄─ LIVE     │    (v2)     │ ◄─ STAGING    │\n" +
          "│     │  [pod][pod] │             │  [pod][pod] │                │\n" +
          "│     └─────────────┘             └─────────────┘                │\n" +
          "│                                                                 │\n" +
          "│   After verification, switch traffic: Blue ↔ Green             │\n" +
          "│                                                                 │\n" +
          "└─────────────────────────────────────────────────────────────────┘\n" +
          "```\n\n" +
          "**GitHub Actions Blue-Green:**\n" +
          "```yaml\n" +
          "deploy:\n" +
          "  runs-on: ubuntu-latest\n" +
          "  steps:\n" +
          "    - name: Determine target environment\n" +
          "      id: env\n" +
          "      run: |\n" +
          "        CURRENT=$(kubectl get svc app -o jsonpath='{.spec.selector.version}')\n" +
          "        if [ \"$CURRENT\" = \"blue\" ]; then\n" +
          "          echo \"target=green\" >> $GITHUB_OUTPUT\n" +
          "        else\n" +
          "          echo \"target=blue\" >> $GITHUB_OUTPUT\n" +
          "        fi\n" +
          "    \n" +
          "    - name: Deploy to ${{ steps.env.outputs.target }}\n" +
          "      run: |\n" +
          "        kubectl set image deployment/app-${{ steps.env.outputs.target }} \\\n" +
          "          app=${{ env.IMAGE }}:${{ github.sha }}\n" +
          "        kubectl rollout status deployment/app-${{ steps.env.outputs.target }}\n" +
          "    \n" +
          "    - name: Run smoke tests\n" +
          "      run: |\n" +
          "        ./test-deployment.sh ${{ steps.env.outputs.target }}\n" +
          "    \n" +
          "    - name: Switch traffic\n" +
          "      run: |\n" +
          "        kubectl patch svc app -p \\\n" +
          "          '{\"spec\":{\"selector\":{\"version\":\"${{ steps.env.outputs.target }}\"}}}'\n" +
          "```"
      },
      {
        title: 'Canary Deployments',
        content: 
          "Gradually roll out to a small percentage, monitor, then expand:\n\n" +
          "```\n" +
          "┌─────────────────────────────────────────────────────────────────┐\n" +
          "│                    CANARY DEPLOYMENT FLOW                      │\n" +
          "├─────────────────────────────────────────────────────────────────┤\n" +
          "│                                                                 │\n" +
          "│  Step 1: Deploy canary (5% traffic)                            │\n" +
          "│  ┌──────────────────────────────────────────────────────────┐  │\n" +
          "│  │ [v1][v1][v1][v1][v1][v1][v1][v1][v1][v2]                  │  │\n" +
          "│  │           95% stable              5% canary              │  │\n" +
          "│  └──────────────────────────────────────────────────────────┘  │\n" +
          "│                          │                                     │\n" +
          "│                    Monitor metrics                             │\n" +
          "│                    (errors, latency)                           │\n" +
          "│                          │                                     │\n" +
          "│  Step 2: If healthy, increase to 25%                           │\n" +
          "│  ┌──────────────────────────────────────────────────────────┐  │\n" +
          "│  │ [v1][v1][v1][v1][v1][v1][v2][v2][v2][v2]                  │  │\n" +
          "│  │        75% stable              25% canary                │  │\n" +
          "│  └──────────────────────────────────────────────────────────┘  │\n" +
          "│                          │                                     │\n" +
          "│  Step 3: Full rollout (100%)                                   │\n" +
          "│  ┌──────────────────────────────────────────────────────────┐  │\n" +
          "│  │ [v2][v2][v2][v2][v2][v2][v2][v2][v2][v2]                  │  │\n" +
          "│  │                  100% new version                        │  │\n" +
          "│  └──────────────────────────────────────────────────────────┘  │\n" +
          "│                                                                 │\n" +
          "└─────────────────────────────────────────────────────────────────┘\n" +
          "```\n\n" +
          "**Automated Canary with Metrics Check:**\n" +
          "```yaml\n" +
          "canary-deploy:\n" +
          "  runs-on: ubuntu-latest\n" +
          "  steps:\n" +
          "    - name: Deploy canary (5%)\n" +
          "      run: |\n" +
          "        kubectl apply -f k8s/canary-5-percent.yaml\n" +
          "    \n" +
          "    - name: Wait and check metrics\n" +
          "      run: |\n" +
          "        sleep 300  # 5 minutes\n" +
          "        ERROR_RATE=$(curl -s $PROMETHEUS_URL/api/v1/query \\\n" +
          "          --data-urlencode 'query=rate(http_errors{version=\"canary\"}[5m])' \\\n" +
          "          | jq '.data.result[0].value[1]')\n" +
          "        \n" +
          "        if (( $(echo \"$ERROR_RATE > 0.01\" | bc -l) )); then\n" +
          "          echo \"Error rate too high: $ERROR_RATE\"\n" +
          "          kubectl rollout undo deployment/app-canary\n" +
          "          exit 1\n" +
          "        fi\n" +
          "    \n" +
          "    - name: Promote to 50%\n" +
          "      run: kubectl apply -f k8s/canary-50-percent.yaml\n" +
          "    \n" +
          "    - name: Full rollout\n" +
          "      if: success()\n" +
          "      run: kubectl apply -f k8s/canary-100-percent.yaml\n" +
          "```"
      },
      {
        title: 'Monorepo Pipeline Patterns',
        content: 
          "Efficiently build only what changed in large repositories:\n\n" +
          "**Affected Detection:**\n" +
          "```yaml\n" +
          "# .github/workflows/monorepo.yml\n" +
          "name: Monorepo CI\n" +
          "\n" +
          "on:\n" +
          "  push:\n" +
          "    branches: [main]\n" +
          "  pull_request:\n" +
          "\n" +
          "jobs:\n" +
          "  detect-changes:\n" +
          "    runs-on: ubuntu-latest\n" +
          "    outputs:\n" +
          "      api: ${{ steps.changes.outputs.api }}\n" +
          "      web: ${{ steps.changes.outputs.web }}\n" +
          "      shared: ${{ steps.changes.outputs.shared }}\n" +
          "    steps:\n" +
          "      - uses: actions/checkout@v4\n" +
          "      - uses: dorny/paths-filter@v3\n" +
          "        id: changes\n" +
          "        with:\n" +
          "          filters: |\n" +
          "            api:\n" +
          "              - 'packages/api/**'\n" +
          "              - 'packages/shared/**'\n" +
          "            web:\n" +
          "              - 'packages/web/**'\n" +
          "              - 'packages/shared/**'\n" +
          "            shared:\n" +
          "              - 'packages/shared/**'\n" +
          "\n" +
          "  build-api:\n" +
          "    needs: detect-changes\n" +
          "    if: needs.detect-changes.outputs.api == 'true'\n" +
          "    runs-on: ubuntu-latest\n" +
          "    steps:\n" +
          "      - uses: actions/checkout@v4\n" +
          "      - run: cd packages/api && npm ci && npm test && npm run build\n" +
          "\n" +
          "  build-web:\n" +
          "    needs: detect-changes\n" +
          "    if: needs.detect-changes.outputs.web == 'true'\n" +
          "    runs-on: ubuntu-latest\n" +
          "    steps:\n" +
          "      - uses: actions/checkout@v4\n" +
          "      - run: cd packages/web && npm ci && npm test && npm run build\n" +
          "```\n\n" +
          "**Monorepo Structure:**\n" +
          "```\n" +
          "monorepo/\n" +
          "├── .github/workflows/\n" +
          "│   ├── api.yml           # Triggered by packages/api/**\n" +
          "│   ├── web.yml           # Triggered by packages/web/**\n" +
          "│   └── shared.yml        # Triggered by packages/shared/**\n" +
          "├── packages/\n" +
          "│   ├── api/\n" +
          "│   ├── web/\n" +
          "│   └── shared/           # Changes here trigger both api and web\n" +
          "└── package.json\n" +
          "```"
      },
      {
        title: 'Dynamic Matrix Generation',
        content: 
          "Generate matrix jobs dynamically based on what needs to run:\n\n" +
          "```yaml\n" +
          "name: Dynamic Pipeline\n" +
          "\n" +
          "on: push\n" +
          "\n" +
          "jobs:\n" +
          "  # First job: Determine what to build\n" +
          "  generate-matrix:\n" +
          "    runs-on: ubuntu-latest\n" +
          "    outputs:\n" +
          "      matrix: ${{ steps.set-matrix.outputs.matrix }}\n" +
          "    steps:\n" +
          "      - uses: actions/checkout@v4\n" +
          "        with:\n" +
          "          fetch-depth: 2\n" +
          "      \n" +
          "      - name: Detect changed services\n" +
          "        id: set-matrix\n" +
          "        run: |\n" +
          "          # Find all changed directories with a Dockerfile\n" +
          "          CHANGED=$(git diff --name-only HEAD~1 | \\\n" +
          "            grep -E '^services/' | \\\n" +
          "            cut -d'/' -f2 | \\\n" +
          "            sort -u)\n" +
          "          \n" +
          "          # Build JSON matrix\n" +
          "          MATRIX=$(echo \"$CHANGED\" | jq -R -s -c '\n" +
          "            split(\"\\n\") | map(select(length > 0)) | \n" +
          "            {service: .}\n" +
          "          ')\n" +
          "          \n" +
          "          echo \"matrix=$MATRIX\" >> $GITHUB_OUTPUT\n" +
          "          echo \"Will build: $CHANGED\"\n" +
          "\n" +
          "  # Second job: Build each changed service\n" +
          "  build:\n" +
          "    needs: generate-matrix\n" +
          "    if: needs.generate-matrix.outputs.matrix != '{\"service\":[]}'\n" +
          "    runs-on: ubuntu-latest\n" +
          "    strategy:\n" +
          "      matrix: ${{ fromJson(needs.generate-matrix.outputs.matrix) }}\n" +
          "    steps:\n" +
          "      - uses: actions/checkout@v4\n" +
          "      \n" +
          "      - name: Build ${{ matrix.service }}\n" +
          "        run: |\n" +
          "          cd services/${{ matrix.service }}\n" +
          "          docker build -t ${{ matrix.service }}:${{ github.sha }} .\n" +
          "```"
      },
      {
        title: 'Pipeline Parallelization',
        content: 
          "Speed up pipelines by running jobs in parallel:\n\n" +
          "```yaml\n" +
          "name: Parallel Pipeline\n" +
          "\n" +
          "on: push\n" +
          "\n" +
          "jobs:\n" +
          "  # These run in parallel (no dependencies)\n" +
          "  lint:\n" +
          "    runs-on: ubuntu-latest\n" +
          "    steps:\n" +
          "      - uses: actions/checkout@v4\n" +
          "      - run: npm ci && npm run lint\n" +
          "\n" +
          "  type-check:\n" +
          "    runs-on: ubuntu-latest\n" +
          "    steps:\n" +
          "      - uses: actions/checkout@v4\n" +
          "      - run: npm ci && npm run type-check\n" +
          "\n" +
          "  unit-tests:\n" +
          "    runs-on: ubuntu-latest\n" +
          "    steps:\n" +
          "      - uses: actions/checkout@v4\n" +
          "      - run: npm ci && npm test -- --shard=1/3\n" +
          "\n" +
          "  unit-tests-2:\n" +
          "    runs-on: ubuntu-latest\n" +
          "    steps:\n" +
          "      - uses: actions/checkout@v4\n" +
          "      - run: npm ci && npm test -- --shard=2/3\n" +
          "\n" +
          "  unit-tests-3:\n" +
          "    runs-on: ubuntu-latest\n" +
          "    steps:\n" +
          "      - uses: actions/checkout@v4\n" +
          "      - run: npm ci && npm test -- --shard=3/3\n" +
          "\n" +
          "  # Wait for all checks to pass\n" +
          "  all-checks:\n" +
          "    needs: [lint, type-check, unit-tests, unit-tests-2, unit-tests-3]\n" +
          "    runs-on: ubuntu-latest\n" +
          "    steps:\n" +
          "      - run: echo \"All checks passed!\"\n" +
          "\n" +
          "  # Only deploy after all checks\n" +
          "  deploy:\n" +
          "    needs: all-checks\n" +
          "    if: github.ref == 'refs/heads/main'\n" +
          "    runs-on: ubuntu-latest\n" +
          "    steps:\n" +
          "      - run: echo \"Deploying...\"\n" +
          "```\n\n" +
          "**Parallel Execution Timeline:**\n" +
          "```\n" +
          "Time ──────────────────────────────────────────────────────────►\n" +
          "\n" +
          "lint        [==========]             (2 min)\n" +
          "type-check  [============]           (2.5 min)\n" +
          "tests-1     [================]       (3 min)\n" +
          "tests-2     [================]       (3 min)\n" +
          "tests-3     [================]       (3 min)\n" +
          "                              │\n" +
          "all-checks                    └─[=]  (10 sec)\n" +
          "deploy                          └─[====] (1 min)\n" +
          "\n" +
          "Total: ~4 min (instead of 13+ min sequential)\n" +
          "```"
      },
      {
        title: 'Feature Flags in Pipelines',
        content: 
          "Deploy code without releasing features:\n\n" +
          "```yaml\n" +
          "# Deploy with feature flags\n" +
          "deploy:\n" +
          "  runs-on: ubuntu-latest\n" +
          "  steps:\n" +
          "    - name: Deploy application\n" +
          "      run: |\n" +
          "        kubectl set image deployment/app app=$IMAGE:${{ github.sha }}\n" +
          "    \n" +
          "    - name: Update feature flags\n" +
          "      run: |\n" +
          "        # Using LaunchDarkly, Unleash, or similar\n" +
          "        curl -X PATCH $LAUNCHDARKLY_API/flags/new-checkout \\\n" +
          "          -H \"Authorization: ${{ secrets.LD_API_KEY }}\" \\\n" +
          "          -d '{\n" +
          "            \"patch\": [{\n" +
          "              \"op\": \"replace\",\n" +
          "              \"path\": \"/environments/production/on\",\n" +
          "              \"value\": false\n" +
          "            }]\n" +
          "          }'\n" +
          "\n" +
          "# Separate workflow to enable features\n" +
          "name: Enable Feature\n" +
          "on:\n" +
          "  workflow_dispatch:\n" +
          "    inputs:\n" +
          "      feature:\n" +
          "        description: 'Feature flag name'\n" +
          "        required: true\n" +
          "      percentage:\n" +
          "        description: 'Rollout percentage'\n" +
          "        default: '10'\n" +
          "\n" +
          "jobs:\n" +
          "  enable-feature:\n" +
          "    runs-on: ubuntu-latest\n" +
          "    steps:\n" +
          "      - name: Enable ${{ inputs.feature }} at ${{ inputs.percentage }}%\n" +
          "        run: |\n" +
          "          curl -X PATCH $LAUNCHDARKLY_API/flags/${{ inputs.feature }} \\\n" +
          "            -H \"Authorization: ${{ secrets.LD_API_KEY }}\" \\\n" +
          "            -d '{\"rolloutPercentage\": ${{ inputs.percentage }}}'\n" +
          "```\n\n" +
          "**Feature Flag Workflow:**\n" +
          "```\n" +
          "┌─────────────────────────────────────────────────────────────────┐\n" +
          "│               DEPLOY vs RELEASE SEPARATION                     │\n" +
          "├─────────────────────────────────────────────────────────────────┤\n" +
          "│                                                                 │\n" +
          "│  Deploy (CI/CD):  Code goes to production                      │\n" +
          "│                   Feature is OFF for users                     │\n" +
          "│                          │                                     │\n" +
          "│                          ▼                                     │\n" +
          "│  Release (Manual): Feature flag ON for 10% → 50% → 100%       │\n" +
          "│                    Roll back = flip flag OFF (instant)         │\n" +
          "│                                                                 │\n" +
          "└─────────────────────────────────────────────────────────────────┘\n" +
          "```"
      },
      {
        title: 'Pipeline Templates and Reusability',
        content: 
          "Create shared workflows for consistency across repositories:\n\n" +
          "**Composite Action (reusable steps):**\n" +
          "```yaml\n" +
          "# .github/actions/node-build/action.yml\n" +
          "name: 'Node.js Build'\n" +
          "description: 'Setup, install, and build Node.js project'\n" +
          "\n" +
          "inputs:\n" +
          "  node-version:\n" +
          "    description: 'Node.js version'\n" +
          "    default: '20'\n" +
          "  working-directory:\n" +
          "    description: 'Directory to run commands in'\n" +
          "    default: '.'\n" +
          "\n" +
          "runs:\n" +
          "  using: 'composite'\n" +
          "  steps:\n" +
          "    - uses: actions/setup-node@v4\n" +
          "      with:\n" +
          "        node-version: ${{ inputs.node-version }}\n" +
          "        cache: 'npm'\n" +
          "        cache-dependency-path: ${{ inputs.working-directory }}/package-lock.json\n" +
          "    \n" +
          "    - name: Install dependencies\n" +
          "      shell: bash\n" +
          "      working-directory: ${{ inputs.working-directory }}\n" +
          "      run: npm ci\n" +
          "    \n" +
          "    - name: Build\n" +
          "      shell: bash\n" +
          "      working-directory: ${{ inputs.working-directory }}\n" +
          "      run: npm run build\n" +
          "```\n\n" +
          "**Using the Composite Action:**\n" +
          "```yaml\n" +
          "jobs:\n" +
          "  build:\n" +
          "    runs-on: ubuntu-latest\n" +
          "    steps:\n" +
          "      - uses: actions/checkout@v4\n" +
          "      - uses: ./.github/actions/node-build\n" +
          "        with:\n" +
          "          node-version: '20'\n" +
          "          working-directory: 'packages/api'\n" +
          "```\n\n" +
          "**Organization-Wide Templates:**\n" +
          "```yaml\n" +
          "# In: org/.github repository\n" +
          "# .github/workflows/reusable-node-ci.yml\n" +
          "name: Reusable Node CI\n" +
          "\n" +
          "on:\n" +
          "  workflow_call:\n" +
          "    inputs:\n" +
          "      node-version:\n" +
          "        type: string\n" +
          "        default: '20'\n" +
          "\n" +
          "jobs:\n" +
          "  ci:\n" +
          "    runs-on: ubuntu-latest\n" +
          "    steps:\n" +
          "      - uses: actions/checkout@v4\n" +
          "      - uses: actions/setup-node@v4\n" +
          "        with:\n" +
          "          node-version: ${{ inputs.node-version }}\n" +
          "      - run: npm ci && npm test && npm run build\n" +
          "```\n\n" +
          "**Calling from any repo in org:**\n" +
          "```yaml\n" +
          "jobs:\n" +
          "  ci:\n" +
          "    uses: myorg/.github/.github/workflows/reusable-node-ci.yml@main\n" +
          "    with:\n" +
          "      node-version: '20'\n" +
          "```"
      }
    ],

    stepByStep: [
      {
        title: 'Step 1: Implement Blue-Green Deployment',
        content: 
          "**Kubernetes Blue-Green Setup:**\n\n" +
          "```yaml\n" +
          "# k8s/blue-deployment.yaml\n" +
          "apiVersion: apps/v1\n" +
          "kind: Deployment\n" +
          "metadata:\n" +
          "  name: app-blue\n" +
          "spec:\n" +
          "  replicas: 3\n" +
          "  selector:\n" +
          "    matchLabels:\n" +
          "      app: myapp\n" +
          "      version: blue\n" +
          "  template:\n" +
          "    metadata:\n" +
          "      labels:\n" +
          "        app: myapp\n" +
          "        version: blue\n" +
          "    spec:\n" +
          "      containers:\n" +
          "        - name: app\n" +
          "          image: myapp:v1\n" +
          "---\n" +
          "# k8s/green-deployment.yaml\n" +
          "apiVersion: apps/v1\n" +
          "kind: Deployment\n" +
          "metadata:\n" +
          "  name: app-green\n" +
          "spec:\n" +
          "  replicas: 3\n" +
          "  selector:\n" +
          "    matchLabels:\n" +
          "      app: myapp\n" +
          "      version: green\n" +
          "  template:\n" +
          "    metadata:\n" +
          "      labels:\n" +
          "        app: myapp\n" +
          "        version: green\n" +
          "    spec:\n" +
          "      containers:\n" +
          "        - name: app\n" +
          "          image: myapp:v2\n" +
          "---\n" +
          "# k8s/service.yaml\n" +
          "apiVersion: v1\n" +
          "kind: Service\n" +
          "metadata:\n" +
          "  name: app\n" +
          "spec:\n" +
          "  selector:\n" +
          "    app: myapp\n" +
          "    version: blue  # Switch to 'green' to change traffic\n" +
          "  ports:\n" +
          "    - port: 80\n" +
          "```"
      },
      {
        title: 'Step 2: Add Automated Rollback',
        content: 
          "**Auto-rollback on Failed Health Checks:**\n\n" +
          "```yaml\n" +
          "name: Deploy with Auto-Rollback\n" +
          "\n" +
          "on:\n" +
          "  push:\n" +
          "    branches: [main]\n" +
          "\n" +
          "jobs:\n" +
          "  deploy:\n" +
          "    runs-on: ubuntu-latest\n" +
          "    steps:\n" +
          "      - uses: actions/checkout@v4\n" +
          "      \n" +
          "      - name: Get current deployment\n" +
          "        id: current\n" +
          "        run: |\n" +
          "          REVISION=$(kubectl rollout history deployment/app -o jsonpath='{.metadata.generation}')\n" +
          "          echo \"revision=$REVISION\" >> $GITHUB_OUTPUT\n" +
          "      \n" +
          "      - name: Deploy new version\n" +
          "        run: |\n" +
          "          kubectl set image deployment/app app=$IMAGE:${{ github.sha }}\n" +
          "          kubectl rollout status deployment/app --timeout=300s\n" +
          "      \n" +
          "      - name: Health check\n" +
          "        id: health\n" +
          "        continue-on-error: true\n" +
          "        run: |\n" +
          "          for i in {1..10}; do\n" +
          "            if curl -sf https://myapp.com/health; then\n" +
          "              echo \"Health check passed\"\n" +
          "              exit 0\n" +
          "            fi\n" +
          "            echo \"Attempt $i failed, retrying...\"\n" +
          "            sleep 10\n" +
          "          done\n" +
          "          echo \"Health check failed after 10 attempts\"\n" +
          "          exit 1\n" +
          "      \n" +
          "      - name: Rollback on failure\n" +
          "        if: steps.health.outcome == 'failure'\n" +
          "        run: |\n" +
          "          echo \"Rolling back to revision ${{ steps.current.outputs.revision }}\"\n" +
          "          kubectl rollout undo deployment/app\n" +
          "          kubectl rollout status deployment/app\n" +
          "          exit 1  # Fail the job to alert\n" +
          "      \n" +
          "      - name: Notify success\n" +
          "        if: success()\n" +
          "        run: echo \"Deployment successful!\"\n" +
          "```"
      },
      {
        title: 'Step 3: Implement Progressive Delivery',
        content: 
          "**Gradual Rollout with Argo Rollouts:**\n\n" +
          "```yaml\n" +
          "# rollout.yaml\n" +
          "apiVersion: argoproj.io/v1alpha1\n" +
          "kind: Rollout\n" +
          "metadata:\n" +
          "  name: app\n" +
          "spec:\n" +
          "  replicas: 10\n" +
          "  selector:\n" +
          "    matchLabels:\n" +
          "      app: myapp\n" +
          "  template:\n" +
          "    metadata:\n" +
          "      labels:\n" +
          "        app: myapp\n" +
          "    spec:\n" +
          "      containers:\n" +
          "        - name: app\n" +
          "          image: myapp:v1\n" +
          "  strategy:\n" +
          "    canary:\n" +
          "      steps:\n" +
          "        - setWeight: 5\n" +
          "        - pause: { duration: 5m }\n" +
          "        - setWeight: 20\n" +
          "        - pause: { duration: 5m }\n" +
          "        - setWeight: 50\n" +
          "        - pause: { duration: 5m }\n" +
          "        - setWeight: 100\n" +
          "      analysis:\n" +
          "        templates:\n" +
          "          - templateName: success-rate\n" +
          "        startingStep: 1\n" +
          "---\n" +
          "apiVersion: argoproj.io/v1alpha1\n" +
          "kind: AnalysisTemplate\n" +
          "metadata:\n" +
          "  name: success-rate\n" +
          "spec:\n" +
          "  metrics:\n" +
          "    - name: success-rate\n" +
          "      interval: 1m\n" +
          "      successCondition: result[0] >= 0.95\n" +
          "      failureLimit: 3\n" +
          "      provider:\n" +
          "        prometheus:\n" +
          "          address: http://prometheus:9090\n" +
          "          query: |\n" +
          "            sum(rate(http_requests_total{status=~\"2..\"}[5m]))\n" +
          "            /\n" +
          "            sum(rate(http_requests_total[5m]))\n" +
          "```"
      },
      {
        title: 'Step 4: Set Up Pipeline Caching Strategies',
        content: 
          "**Multi-level Caching:**\n\n" +
          "```yaml\n" +
          "name: Optimized Build\n" +
          "\n" +
          "on: push\n" +
          "\n" +
          "jobs:\n" +
          "  build:\n" +
          "    runs-on: ubuntu-latest\n" +
          "    steps:\n" +
          "      - uses: actions/checkout@v4\n" +
          "      \n" +
          "      # Level 1: Node modules cache\n" +
          "      - uses: actions/setup-node@v4\n" +
          "        with:\n" +
          "          node-version: '20'\n" +
          "          cache: 'npm'\n" +
          "      \n" +
          "      # Level 2: Build cache (Next.js, Turbo, etc.)\n" +
          "      - name: Cache build output\n" +
          "        uses: actions/cache@v4\n" +
          "        with:\n" +
          "          path: |\n" +
          "            .next/cache\n" +
          "            node_modules/.cache\n" +
          "          key: build-${{ runner.os }}-${{ hashFiles('**/*.ts', '**/*.tsx') }}\n" +
          "          restore-keys: |\n" +
          "            build-${{ runner.os }}-\n" +
          "      \n" +
          "      # Level 3: Docker layer cache\n" +
          "      - name: Set up Docker Buildx\n" +
          "        uses: docker/setup-buildx-action@v3\n" +
          "      \n" +
          "      - name: Build with cache\n" +
          "        uses: docker/build-push-action@v5\n" +
          "        with:\n" +
          "          context: .\n" +
          "          push: false\n" +
          "          cache-from: type=gha\n" +
          "          cache-to: type=gha,mode=max\n" +
          "      \n" +
          "      # Level 4: Test result cache\n" +
          "      - name: Cache test results\n" +
          "        uses: actions/cache@v4\n" +
          "        with:\n" +
          "          path: .test-cache\n" +
          "          key: tests-${{ hashFiles('**/*.test.ts') }}\n" +
          "      \n" +
          "      - run: npm ci\n" +
          "      - run: npm run build\n" +
          "      - run: npm test\n" +
          "```"
      },
      {
        title: 'Step 5: Implement Pipeline Observability',
        content: 
          "**Track Pipeline Performance:**\n\n" +
          "```yaml\n" +
          "name: Observable Pipeline\n" +
          "\n" +
          "on: push\n" +
          "\n" +
          "jobs:\n" +
          "  build:\n" +
          "    runs-on: ubuntu-latest\n" +
          "    steps:\n" +
          "      - uses: actions/checkout@v4\n" +
          "      \n" +
          "      - name: Start timing\n" +
          "        id: timing\n" +
          "        run: echo \"start=$(date +%s)\" >> $GITHUB_OUTPUT\n" +
          "      \n" +
          "      - name: Build\n" +
          "        run: npm ci && npm run build\n" +
          "      \n" +
          "      - name: Record metrics\n" +
          "        if: always()\n" +
          "        run: |\n" +
          "          END=$(date +%s)\n" +
          "          DURATION=$((END - ${{ steps.timing.outputs.start }}))\n" +
          "          \n" +
          "          # Send to monitoring system\n" +
          "          curl -X POST $METRICS_ENDPOINT \\\n" +
          "            -H \"Content-Type: application/json\" \\\n" +
          "            -d '{\n" +
          "              \"metric\": \"pipeline_duration_seconds\",\n" +
          "              \"value\": '$DURATION',\n" +
          "              \"labels\": {\n" +
          "                \"job\": \"build\",\n" +
          "                \"repo\": \"${{ github.repository }}\",\n" +
          "                \"branch\": \"${{ github.ref_name }}\",\n" +
          "                \"status\": \"${{ job.status }}\"\n" +
          "              }\n" +
          "            }'\n" +
          "      \n" +
          "      - name: Upload SARIF for security findings\n" +
          "        if: always()\n" +
          "        uses: github/codeql-action/upload-sarif@v3\n" +
          "        with:\n" +
          "          sarif_file: results.sarif\n" +
          "```\n\n" +
          "**Pipeline Dashboard Query (Prometheus):**\n" +
          "```promql\n" +
          "# Average pipeline duration by job\n" +
          "avg by (job) (pipeline_duration_seconds)\n" +
          "\n" +
          "# Pipeline success rate\n" +
          "sum(pipeline_status{status=\"success\"}) / sum(pipeline_status)\n" +
          "\n" +
          "# 95th percentile build time\n" +
          "histogram_quantile(0.95, pipeline_duration_seconds_bucket)\n" +
          "```"
      },
      {
        title: 'Step 6: Scheduled and Conditional Pipelines',
        content: 
          "**Multiple Pipeline Triggers:**\n\n" +
          "```yaml\n" +
          "name: Comprehensive Pipeline\n" +
          "\n" +
          "on:\n" +
          "  # Standard triggers\n" +
          "  push:\n" +
          "    branches: [main, develop]\n" +
          "  pull_request:\n" +
          "    branches: [main]\n" +
          "  \n" +
          "  # Scheduled runs\n" +
          "  schedule:\n" +
          "    - cron: '0 2 * * *'  # Nightly at 2 AM\n" +
          "  \n" +
          "  # Manual trigger with options\n" +
          "  workflow_dispatch:\n" +
          "    inputs:\n" +
          "      environment:\n" +
          "        type: choice\n" +
          "        options: [staging, production]\n" +
          "      skip_tests:\n" +
          "        type: boolean\n" +
          "        default: false\n" +
          "\n" +
          "jobs:\n" +
          "  # Always run tests (unless skipped manually)\n" +
          "  test:\n" +
          "    if: inputs.skip_tests != true\n" +
          "    runs-on: ubuntu-latest\n" +
          "    steps:\n" +
          "      - uses: actions/checkout@v4\n" +
          "      - run: npm test\n" +
          "\n" +
          "  # Only on scheduled runs: Full security scan\n" +
          "  security-scan:\n" +
          "    if: github.event_name == 'schedule'\n" +
          "    runs-on: ubuntu-latest\n" +
          "    steps:\n" +
          "      - uses: actions/checkout@v4\n" +
          "      - run: npm audit --audit-level=high\n" +
          "      - uses: aquasecurity/trivy-action@master\n" +
          "\n" +
          "  # Only on main branch: Deploy\n" +
          "  deploy:\n" +
          "    needs: test\n" +
          "    if: |\n" +
          "      github.ref == 'refs/heads/main' || \n" +
          "      github.event_name == 'workflow_dispatch'\n" +
          "    runs-on: ubuntu-latest\n" +
          "    environment: ${{ inputs.environment || 'staging' }}\n" +
          "    steps:\n" +
          "      - run: echo \"Deploying to ${{ inputs.environment || 'staging' }}\"\n" +
          "\n" +
          "  # Only on tags: Release\n" +
          "  release:\n" +
          "    if: startsWith(github.ref, 'refs/tags/v')\n" +
          "    runs-on: ubuntu-latest\n" +
          "    steps:\n" +
          "      - uses: actions/checkout@v4\n" +
          "      - run: npm publish\n" +
          "```"
      }
    ],

    commonMistakes: [
      "**Not testing rollback** - Practice rollbacks before you need them in an emergency",
      "**Canary without metrics** - If you can't measure success rate, you can't do canary safely",
      "**Blue-green without database strategy** - Schema changes break blue-green; use expand/contract pattern",
      "**Over-parallelizing** - More parallel jobs = more CI minutes; balance speed with cost",
      "**Ignoring cache invalidation** - Stale caches cause mysterious failures",
      "**Hardcoding percentages** - Make canary percentages configurable, not hardcoded",
      "**No timeout on health checks** - Infinite waits can block pipelines forever",
      "**Skipping staging** - Going straight to production removes your safety net"
    ],

    bestPractices: [
      "**Practice deployments** - Run deployment drills regularly, not just when needed",
      "**Automate rollback decisions** - Set thresholds for error rates that trigger auto-rollback",
      "**Use feature flags** - Separate deployment from release for safer changes",
      "**Monitor everything** - Track pipeline duration, success rate, and deployment frequency",
      "**Document your strategies** - Each service should document its deployment strategy",
      "**Start small with canary** - 1-5% is usually enough to catch major issues",
      "**Have a manual override** - Sometimes humans need to take control",
      "**Test with realistic traffic** - Use traffic mirroring before canary"
    ],

    realWorldExample: 
      "**Enterprise Multi-Stage Pipeline:**\n\n" +
      "```yaml\n" +
      "# .github/workflows/enterprise-pipeline.yml\n" +
      "name: Enterprise Deployment Pipeline\n" +
      "\n" +
      "on:\n" +
      "  push:\n" +
      "    branches: [main]\n" +
      "\n" +
      "env:\n" +
      "  REGISTRY: ghcr.io/${{ github.repository }}\n" +
      "\n" +
      "jobs:\n" +
      "  # ============================================\n" +
      "  # STAGE 1: Build & Test\n" +
      "  # ============================================\n" +
      "  build:\n" +
      "    runs-on: ubuntu-latest\n" +
      "    outputs:\n" +
      "      image: ${{ steps.build.outputs.image }}\n" +
      "    steps:\n" +
      "      - uses: actions/checkout@v4\n" +
      "      - uses: docker/setup-buildx-action@v3\n" +
      "      - uses: docker/login-action@v3\n" +
      "        with:\n" +
      "          registry: ghcr.io\n" +
      "          username: ${{ github.actor }}\n" +
      "          password: ${{ secrets.GITHUB_TOKEN }}\n" +
      "      - id: build\n" +
      "        run: |\n" +
      "          IMAGE=$REGISTRY:${{ github.sha }}\n" +
      "          docker build -t $IMAGE .\n" +
      "          docker push $IMAGE\n" +
      "          echo \"image=$IMAGE\" >> $GITHUB_OUTPUT\n" +
      "\n" +
      "  # ============================================\n" +
      "  # STAGE 2: Deploy to Staging\n" +
      "  # ============================================\n" +
      "  deploy-staging:\n" +
      "    needs: build\n" +
      "    runs-on: ubuntu-latest\n" +
      "    environment: staging\n" +
      "    steps:\n" +
      "      - name: Deploy to staging\n" +
      "        run: |\n" +
      "          kubectl config use-context staging\n" +
      "          kubectl set image deployment/app app=${{ needs.build.outputs.image }}\n" +
      "          kubectl rollout status deployment/app --timeout=5m\n" +
      "      \n" +
      "      - name: Run integration tests\n" +
      "        run: npm run test:integration -- --env=staging\n" +
      "\n" +
      "  # ============================================\n" +
      "  # STAGE 3: Canary to Production (5%)\n" +
      "  # ============================================\n" +
      "  canary:\n" +
      "    needs: [build, deploy-staging]\n" +
      "    runs-on: ubuntu-latest\n" +
      "    environment: production-canary\n" +
      "    steps:\n" +
      "      - name: Deploy canary (5%)\n" +
      "        run: |\n" +
      "          kubectl config use-context production\n" +
      "          kubectl set image deployment/app-canary app=${{ needs.build.outputs.image }}\n" +
      "          kubectl scale deployment/app-canary --replicas=1\n" +
      "      \n" +
      "      - name: Wait and monitor (10 min)\n" +
      "        run: |\n" +
      "          sleep 600\n" +
      "          ERROR_RATE=$(curl -s \"$PROMETHEUS/query?query=rate(errors[5m])\" | jq '.data.result[0].value[1]')\n" +
      "          if (( $(echo \"$ERROR_RATE > 0.01\" | bc -l) )); then\n" +
      "            echo \"::error::Canary error rate too high: $ERROR_RATE\"\n" +
      "            kubectl rollout undo deployment/app-canary\n" +
      "            exit 1\n" +
      "          fi\n" +
      "\n" +
      "  # ============================================\n" +
      "  # STAGE 4: Full Production Rollout\n" +
      "  # ============================================\n" +
      "  production:\n" +
      "    needs: [build, canary]\n" +
      "    runs-on: ubuntu-latest\n" +
      "    environment: production\n" +
      "    concurrency:\n" +
      "      group: production-deploy\n" +
      "      cancel-in-progress: false\n" +
      "    steps:\n" +
      "      - name: Blue-green switch\n" +
      "        run: |\n" +
      "          # Get current live environment\n" +
      "          CURRENT=$(kubectl get svc app -o jsonpath='{.spec.selector.slot}')\n" +
      "          TARGET=$([ \"$CURRENT\" = \"blue\" ] && echo \"green\" || echo \"blue\")\n" +
      "          \n" +
      "          # Deploy to inactive slot\n" +
      "          kubectl set image deployment/app-$TARGET app=${{ needs.build.outputs.image }}\n" +
      "          kubectl rollout status deployment/app-$TARGET --timeout=5m\n" +
      "          \n" +
      "          # Switch traffic\n" +
      "          kubectl patch svc app -p '{\"spec\":{\"selector\":{\"slot\":\"'$TARGET'\"}}}'\n" +
      "          echo \"Switched traffic from $CURRENT to $TARGET\"\n" +
      "      \n" +
      "      - name: Health check\n" +
      "        run: |\n" +
      "          for i in {1..30}; do\n" +
      "            curl -sf https://api.example.com/health && exit 0\n" +
      "            sleep 10\n" +
      "          done\n" +
      "          exit 1\n" +
      "      \n" +
      "      - name: Cleanup canary\n" +
      "        if: success()\n" +
      "        run: kubectl scale deployment/app-canary --replicas=0\n" +
      "```\n\n" +
      "**Pipeline Visualization:**\n" +
      "```\n" +
      "┌─────────────────────────────────────────────────────────────────┐\n" +
      "│                    ENTERPRISE PIPELINE FLOW                    │\n" +
      "├─────────────────────────────────────────────────────────────────┤\n" +
      "│                                                                 │\n" +
      "│  ┌─────────┐                                                   │\n" +
      "│  │  Build  │  Build Docker image, push to registry             │\n" +
      "│  └────┬────┘                                                   │\n" +
      "│       │                                                        │\n" +
      "│       ▼                                                        │\n" +
      "│  ┌─────────────┐                                               │\n" +
      "│  │  Staging    │  Full deployment, integration tests           │\n" +
      "│  └──────┬──────┘                                               │\n" +
      "│         │                                                      │\n" +
      "│         ▼                                                      │\n" +
      "│  ┌─────────────┐                                               │\n" +
      "│  │  Canary 5%  │  10 min monitoring, auto-rollback if errors   │\n" +
      "│  └──────┬──────┘                                               │\n" +
      "│         │ ✓ Metrics OK                                        │\n" +
      "│         ▼                                                      │\n" +
      "│  ┌─────────────┐                                               │\n" +
      "│  │ Production  │  Blue-green switch, instant rollback ready    │\n" +
      "│  │   100%      │  Manual approval required                     │\n" +
      "│  └─────────────┘                                               │\n" +
      "│                                                                 │\n" +
      "│  Total time: ~30 min (mostly monitoring)                       │\n" +
      "│  Rollback time: < 30 seconds                                   │\n" +
      "│                                                                 │\n" +
      "└─────────────────────────────────────────────────────────────────┘\n" +
      "```",

    summary: 
      "## 📝 Key Takeaways\n\n" +
      "1. **Blue-Green** = Two environments, instant traffic switch\n" +
      "2. **Canary** = Gradual rollout with metrics-based promotion\n" +
      "3. **Monorepo patterns** = Only build what changed\n" +
      "4. **Dynamic matrices** = Generate jobs based on changes\n" +
      "5. **Parallelization** = Run independent jobs concurrently\n" +
      "6. **Feature flags** = Separate deploy from release\n" +
      "7. **Auto-rollback** = Fail fast, recover faster\n" +
      "8. **Reusable workflows** = DRY across repositories",

    nextSteps: 
      "**What's Next?**\n\n" +
      "You've mastered advanced pipeline patterns! Continue with:\n" +
      "- **GitOps with ArgoCD**: Declarative deployments from Git\n" +
      "- **Kubernetes Operators**: Automate complex deployments\n" +
      "- **Chaos Engineering**: Test resilience with controlled failures\n" +
      "- **Platform Engineering**: Build internal developer platforms"
  },

  'gitlab-ci-cd': {
    introduction: 
      "GitHub Actions is popular, but GitLab CI/CD is a complete DevOps platform in one place. Unlike " +
      "GitHub's marketplace approach, GitLab includes CI/CD, container registry, security scanning, and " +
      "deployment tools natively. No external services needed.\n\n" +
      "GitLab's pipeline syntax is YAML-based like GitHub Actions, but with powerful features like " +
      "parent-child pipelines, dynamic environments, and deep Kubernetes integration. Companies love " +
      "GitLab for its all-in-one approach: one platform from planning to production.\n\n" +
      "In this lesson, you'll master GitLab CI/CD's unique features and understand when to choose it " +
      "over alternatives. By the end, you'll build production-ready pipelines with GitLab's native tools.",

    whyItMatters: 
      "**Why GitLab CI/CD Matters:**\n\n" +
      "1. **All-in-one platform** - No juggling external services\n" +
      "2. **Built-in registry** - Push Docker images without Docker Hub\n" +
      "3. **Auto DevOps** - Zero-config pipelines for standard apps\n" +
      "4. **Security scanning** - SAST, DAST, dependency scanning included\n" +
      "5. **Self-hosted option** - Full control over your infrastructure\n\n" +
      "**GitLab vs GitHub Actions:**\n" +
      "```\n" +
      "┌─────────────────────────────────────────────────────────────────┐\n" +
      "│              GITLAB CI/CD vs GITHUB ACTIONS                    │\n" +
      "├──────────────────┬───────────────────┬────────────────────────┤\n" +
      "│ Feature          │ GitLab CI/CD      │ GitHub Actions         │\n" +
      "├──────────────────┼───────────────────┼────────────────────────┤\n" +
      "│ Container Reg    │ ✅ Built-in       │ ❌ Separate (GHCR)     │\n" +
      "│ Security Scan    │ ✅ Native         │ ⚠️  3rd party needed   │\n" +
      "│ Kubernetes       │ ✅ Deep integration│ ⚠️  Manual setup      │\n" +
      "│ Self-hosted      │ ✅ Full platform  │ ⚠️  Runners only       │\n" +
      "│ Auto DevOps      │ ✅ Yes            │ ❌ No                  │\n" +
      "│ Marketplace      │ ⚠️  Limited       │ ✅ Huge ecosystem      │\n" +
      "│ Free Tier        │ 400 min/month     │ 2000 min/month         │\n" +
      "└──────────────────┴───────────────────┴────────────────────────┘\n" +
      "```",

    concepts: [
      {
        title: 'GitLab CI/CD Pipeline Structure',
        content: 
          "GitLab uses `.gitlab-ci.yml` in the repository root:\n\n" +
          "**Basic Pipeline Anatomy:**\n" +
          "```yaml\n" +
          "# .gitlab-ci.yml\n" +
          "stages:              # Define execution order\n" +
          "  - build\n" +
          "  - test\n" +
          "  - deploy\n" +
          "\n" +
          "variables:           # Global variables\n" +
          "  DOCKER_DRIVER: overlay2\n" +
          "  IMAGE_TAG: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA\n" +
          "\n" +
          "build-job:          # Job name\n" +
          "  stage: build      # Which stage\n" +
          "  image: node:20    # Docker image to run in\n" +
          "  script:           # Commands to execute\n" +
          "    - npm ci\n" +
          "    - npm run build\n" +
          "  artifacts:        # Files to pass to next stage\n" +
          "    paths:\n" +
          "      - dist/\n" +
          "    expire_in: 1 hour\n" +
          "\n" +
          "test-job:\n" +
          "  stage: test\n" +
          "  image: node:20\n" +
          "  script:\n" +
          "    - npm ci\n" +
          "    - npm test\n" +
          "  coverage: '/Coverage: \\d+\\.\\d+/'\n" +
          "\n" +
          "deploy-job:\n" +
          "  stage: deploy\n" +
          "  script:\n" +
          "    - kubectl apply -f k8s/\n" +
          "  only:             # Only run on main branch\n" +
          "    - main\n" +
          "  environment:      # Create deployment environment\n" +
          "    name: production\n" +
          "    url: https://myapp.com\n" +
          "```\n\n" +
          "**Pipeline Execution Flow:**\n" +
          "```\n" +
          "┌─────────────────────────────────────────────────────────────────┐\n" +
          "│                  GITLAB PIPELINE STAGES                        │\n" +
          "├─────────────────────────────────────────────────────────────────┤\n" +
          "│                                                                 │\n" +
          "│  Stage 1: BUILD                                                │\n" +
          "│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │\n" +
          "│  │  build-job   │  │  lint-job    │  │  compile-job │         │\n" +
          "│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘         │\n" +
          "│         │                 │                 │                  │\n" +
          "│         └─────────────────┴─────────────────┘                  │\n" +
          "│                           │                                    │\n" +
          "│  Stage 2: TEST                                                 │\n" +
          "│  ┌──────────────┐  ┌──────────────┐                            │\n" +
          "│  │  unit-test   │  │ integration  │                            │\n" +
          "│  └──────┬───────┘  └──────┬───────┘                            │\n" +
          "│         └──────────────────┘                                   │\n" +
          "│                   │                                            │\n" +
          "│  Stage 3: DEPLOY                                               │\n" +
          "│         ┌─────────┴─────────┐                                  │\n" +
          "│  ┌──────▼──────┐  ┌─────────▼──────┐                          │\n" +
          "│  │   staging   │  │   production   │                          │\n" +
          "│  └─────────────┘  └────────────────┘                          │\n" +
          "│                                                                 │\n" +
          "└─────────────────────────────────────────────────────────────────┘\n" +
          "```"
      },
      {
        title: 'Built-in Container Registry',
        content: 
          "GitLab includes a Docker registry - no Docker Hub needed:\n\n" +
          "**Push to GitLab Registry:**\n" +
          "```yaml\n" +
          "# .gitlab-ci.yml\n" +
          "variables:\n" +
          "  # These are automatically available\n" +
          "  # $CI_REGISTRY: registry.gitlab.com\n" +
          "  # $CI_REGISTRY_IMAGE: registry.gitlab.com/username/project\n" +
          "  # $CI_REGISTRY_USER: gitlab-ci-token\n" +
          "  # $CI_REGISTRY_PASSWORD: automatically injected\n" +
          "\n" +
          "build-docker:\n" +
          "  stage: build\n" +
          "  image: docker:24\n" +
          "  services:\n" +
          "    - docker:24-dind\n" +
          "  before_script:\n" +
          "    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY\n" +
          "  script:\n" +
          "    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .\n" +
          "    - docker build -t $CI_REGISTRY_IMAGE:latest .\n" +
          "    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA\n" +
          "    - docker push $CI_REGISTRY_IMAGE:latest\n" +
          "\n" +
          "deploy:\n" +
          "  stage: deploy\n" +
          "  script:\n" +
          "    - kubectl set image deployment/app app=$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA\n" +
          "```\n\n" +
          "**Registry Structure:**\n" +
          "```\n" +
          "registry.gitlab.com/\n" +
          "  └── your-username/\n" +
          "      └── your-project/\n" +
          "          ├── app:latest\n" +
          "          ├── app:abc123 (commit SHA)\n" +
          "          ├── app:v1.0.0 (tag)\n" +
          "          └── app:main   (branch)\n" +
          "```\n\n" +
          "**Pull from Registry:**\n" +
          "```bash\n" +
          "# From your local machine\n" +
          "docker login registry.gitlab.com\n" +
          "docker pull registry.gitlab.com/username/project/app:latest\n" +
          "\n" +
          "# In Kubernetes\n" +
          "kubectl create secret docker-registry gitlab-registry \\\n" +
          "  --docker-server=registry.gitlab.com \\\n" +
          "  --docker-username=<username> \\\n" +
          "  --docker-password=<token>\n" +
          "```"
      },
      {
        title: 'GitLab Runners (Self-Hosted)',
        content: 
          "Run pipelines on your own infrastructure:\n\n" +
          "**Install GitLab Runner:**\n" +
          "```bash\n" +
          "# On Ubuntu/Debian\n" +
          "curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh | sudo bash\n" +
          "sudo apt-get install gitlab-runner\n" +
          "\n" +
          "# Register runner with your GitLab instance\n" +
          "sudo gitlab-runner register \\\n" +
          "  --url https://gitlab.com \\\n" +
          "  --registration-token YOUR_TOKEN \\\n" +
          "  --executor docker \\\n" +
          "  --docker-image alpine:latest \\\n" +
          "  --description \"My Docker Runner\" \\\n" +
          "  --tag-list \"docker,linux\"\n" +
          "```\n\n" +
          "**Runner Executors:**\n" +
          "```\n" +
          "┌─────────────────────────────────────────────────────────────────┐\n" +
          "│                    GITLAB RUNNER TYPES                         │\n" +
          "├──────────────┬──────────────────────────────────────────────────┤\n" +
          "│ Executor     │ Use Case                                         │\n" +
          "├──────────────┼──────────────────────────────────────────────────┤\n" +
          "│ docker       │ Most common - isolated, clean environments      │\n" +
          "│ kubernetes   │ Run jobs in Kubernetes pods                      │\n" +
          "│ shell        │ Run directly on host (less isolated)             │\n" +
          "│ ssh          │ Execute on remote machines via SSH               │\n" +
          "│ docker+machine│ Auto-scale Docker runners                       │\n" +
          "└──────────────┴──────────────────────────────────────────────────┘\n" +
          "```\n\n" +
          "**Using Specific Runners:**\n" +
          "```yaml\n" +
          "# .gitlab-ci.yml\n" +
          "build:\n" +
          "  tags:\n" +
          "    - docker      # Only run on runners with 'docker' tag\n" +
          "    - linux\n" +
          "  script:\n" +
          "    - docker build .\n" +
          "\n" +
          "deploy-to-gpu:\n" +
          "  tags:\n" +
          "    - gpu         # Runner with GPU access\n" +
          "    - ml\n" +
          "  script:\n" +
          "    - python train_model.py\n" +
          "```"
      },
      {
        title: 'Advanced Pipeline Features',
        content: 
          "**Parallel Jobs:**\n" +
          "```yaml\n" +
          "test:\n" +
          "  stage: test\n" +
          "  parallel: 5          # Run 5 instances in parallel\n" +
          "  script:\n" +
          "    - npm test -- --shard=$CI_NODE_INDEX/$CI_NODE_TOTAL\n" +
          "```\n\n" +
          "**Rules (Advanced Conditionals):**\n" +
          "```yaml\n" +
          "deploy-production:\n" +
          "  stage: deploy\n" +
          "  script: kubectl apply -f k8s/\n" +
          "  rules:\n" +
          "    - if: '$CI_COMMIT_BRANCH == \"main\"'      # On main branch\n" +
          "      when: manual                            # Require manual trigger\n" +
          "    - if: '$CI_PIPELINE_SOURCE == \"schedule\"'  # On scheduled pipelines\n" +
          "      when: always\n" +
          "    - when: never                             # Otherwise don't run\n" +
          "```\n\n" +
          "**Parent-Child Pipelines:**\n" +
          "```yaml\n" +
          "# Parent pipeline: .gitlab-ci.yml\n" +
          "generate-config:\n" +
          "  stage: setup\n" +
          "  script:\n" +
          "    - python generate_pipeline.py > child-pipeline.yml\n" +
          "  artifacts:\n" +
          "    paths:\n" +
          "      - child-pipeline.yml\n" +
          "\n" +
          "trigger-child:\n" +
          "  stage: build\n" +
          "  trigger:\n" +
          "    include:\n" +
          "      - artifact: child-pipeline.yml\n" +
          "        job: generate-config\n" +
          "    strategy: depend\n" +
          "```\n\n" +
          "**Include External Configs:**\n" +
          "```yaml\n" +
          "include:\n" +
          "  # Include from same repo\n" +
          "  - local: '/templates/.gitlab-ci-template.yml'\n" +
          "  \n" +
          "  # Include from another project\n" +
          "  - project: 'my-group/my-templates'\n" +
          "    file: '/templates/docker-build.yml'\n" +
          "  \n" +
          "  # Include from URL\n" +
          "  - remote: 'https://example.com/ci-template.yml'\n" +
          "  \n" +
          "  # Include GitLab templates\n" +
          "  - template: Security/SAST.gitlab-ci.yml\n" +
          "```"
      },
      {
        title: 'Dynamic Environments',
        content: 
          "Create temporary environments for each branch:\n\n" +
          "```yaml\n" +
          "deploy-review:\n" +
          "  stage: deploy\n" +
          "  script:\n" +
          "    - kubectl apply -f k8s/ --namespace=$CI_COMMIT_REF_SLUG\n" +
          "  environment:\n" +
          "    name: review/$CI_COMMIT_REF_SLUG\n" +
          "    url: https://$CI_COMMIT_REF_SLUG.example.com\n" +
          "    on_stop: stop-review\n" +
          "    auto_stop_in: 1 day\n" +
          "  rules:\n" +
          "    - if: '$CI_COMMIT_BRANCH != \"main\"'\n" +
          "\n" +
          "stop-review:\n" +
          "  stage: deploy\n" +
          "  script:\n" +
          "    - kubectl delete namespace $CI_COMMIT_REF_SLUG\n" +
          "  environment:\n" +
          "    name: review/$CI_COMMIT_REF_SLUG\n" +
          "    action: stop\n" +
          "  rules:\n" +
          "    - if: '$CI_COMMIT_BRANCH != \"main\"'\n" +
          "      when: manual\n" +
          "```\n\n" +
          "**Environment Lifecycle:**\n" +
          "```\n" +
          "┌─────────────────────────────────────────────────────────────────┐\n" +
          "│              DYNAMIC REVIEW ENVIRONMENTS                       │\n" +
          "├─────────────────────────────────────────────────────────────────┤\n" +
          "│                                                                 │\n" +
          "│  1. Create feature branch \"add-login\"                          │\n" +
          "│     └─> Auto-creates: review/add-login environment             │\n" +
          "│         URL: https://add-login.example.com                     │\n" +
          "│                                                                 │\n" +
          "│  2. Push commits → Environment auto-updates                    │\n" +
          "│                                                                 │\n" +
          "│  3. After 1 day → Auto-stops (configurable)                    │\n" +
          "│     OR manually stop via GitLab UI                             │\n" +
          "│                                                                 │\n" +
          "│  4. Merge to main → Environment deleted                        │\n" +
          "│                                                                 │\n" +
          "└─────────────────────────────────────────────────────────────────┘\n" +
          "```"
      },
      {
        title: 'Security Scanning (Built-in)',
        content: 
          "GitLab includes security scanning out of the box:\n\n" +
          "```yaml\n" +
          "# .gitlab-ci.yml\n" +
          "include:\n" +
          "  - template: Security/SAST.gitlab-ci.yml              # Static analysis\n" +
          "  - template: Security/Dependency-Scanning.gitlab-ci.yml  # Check dependencies\n" +
          "  - template: Security/Container-Scanning.gitlab-ci.yml   # Scan Docker images\n" +
          "  - template: Security/Secret-Detection.gitlab-ci.yml     # Find leaked secrets\n" +
          "\n" +
          "# That's it! Security jobs are automatically added\n" +
          "```\n\n" +
          "**Custom Security Job:**\n" +
          "```yaml\n" +
          "dependency_scanning:\n" +
          "  stage: test\n" +
          "  image: registry.gitlab.com/gitlab-org/security-products/dependency-scanning:latest\n" +
          "  script:\n" +
          "    - /analyzer run\n" +
          "  artifacts:\n" +
          "    reports:\n" +
          "      dependency_scanning: gl-dependency-scanning-report.json\n" +
          "  only:\n" +
          "    - branches\n" +
          "```\n\n" +
          "**Security Dashboard:**\n" +
          "```\n" +
          "GitLab Security & Compliance → Security Dashboard\n" +
          "\n" +
          "┌───────────────────────────────────────────────────────────┐\n" +
          "│ Project Vulnerabilities                                   │\n" +
          "├───────────────────────────────────────────────────────────┤\n" +
          "│ 🔴 Critical: 2    ⚠️ High: 5    🟡 Medium: 12   🟢 Low: 8 │\n" +
          "│                                                           │\n" +
          "│ Vulnerability: SQL Injection in login.js                  │\n" +
          "│ Severity: Critical                                        │\n" +
          "│ Status: [ Dismiss ] [ Create Issue ] [ Create MR ]       │\n" +
          "└───────────────────────────────────────────────────────────┘\n" +
          "```"
      },
      {
        title: 'Auto DevOps',
        content: 
          "Zero-configuration CI/CD for standard applications:\n\n" +
          "**Enable Auto DevOps:**\n" +
          "1. Project Settings → CI/CD → Auto DevOps\n" +
          "2. Check \"Default to Auto DevOps pipeline\"\n" +
          "3. Save changes\n\n" +
          "**What Auto DevOps Does:**\n" +
          "```yaml\n" +
          "# GitLab automatically creates this pipeline:\n" +
          "stages:\n" +
          "  - build\n" +
          "  - test\n" +
          "  - deploy\n" +
          "  - performance\n" +
          "  - cleanup\n" +
          "\n" +
          "# Automatically detects:\n" +
          "# - Language (Node.js, Python, Go, etc.)\n" +
          "# - Dockerfile presence\n" +
          "# - Test framework\n" +
          "# - Security scanning needs\n" +
          "# - Kubernetes deployment\n" +
          "```\n\n" +
          "**Auto DevOps Pipeline:**\n" +
          "```\n" +
          "┌─────────────────────────────────────────────────────────────────┐\n" +
          "│                    AUTO DEVOPS FLOW                            │\n" +
          "├─────────────────────────────────────────────────────────────────┤\n" +
          "│                                                                 │\n" +
          "│  BUILD:    Auto-detect → Build Docker image → Push to registry │\n" +
          "│             │                                                   │\n" +
          "│  TEST:     Run unit tests → Code quality → Security scans      │\n" +
          "│             │                                                   │\n" +
          "│  DEPLOY:   Review apps → Staging → Production (manual)         │\n" +
          "│             │                                                   │\n" +
          "│  MONITOR:  Performance testing → DAST scanning                 │\n" +
          "│                                                                 │\n" +
          "└─────────────────────────────────────────────────────────────────┘\n" +
          "```\n\n" +
          "**Customize Auto DevOps:**\n" +
          "```yaml\n" +
          "# .gitlab-ci.yml (optional overrides)\n" +
          "include:\n" +
          "  - template: Auto-DevOps.gitlab-ci.yml\n" +
          "\n" +
          "variables:\n" +
          "  AUTO_DEVOPS_DOMAIN: example.com\n" +
          "  POSTGRES_ENABLED: \"true\"\n" +
          "  STAGING_ENABLED: \"false\"  # Skip staging\n" +
          "```"
      }
    ],

    stepByStep: [
      {
        title: 'Step 1: Create Your First GitLab Pipeline',
        content: 
          "**1. Create `.gitlab-ci.yml` in repository root:**\n\n" +
          "```yaml\n" +
          "# .gitlab-ci.yml\n" +
          "image: node:20\n" +
          "\n" +
          "stages:\n" +
          "  - build\n" +
          "  - test\n" +
          "  - deploy\n" +
          "\n" +
          "cache:\n" +
          "  paths:\n" +
          "    - node_modules/\n" +
          "\n" +
          "install-dependencies:\n" +
          "  stage: build\n" +
          "  script:\n" +
          "    - npm ci\n" +
          "  artifacts:\n" +
          "    paths:\n" +
          "      - node_modules/\n" +
          "    expire_in: 1 hour\n" +
          "\n" +
          "build-app:\n" +
          "  stage: build\n" +
          "  script:\n" +
          "    - npm run build\n" +
          "  artifacts:\n" +
          "    paths:\n" +
          "      - dist/\n" +
          "    expire_in: 1 week\n" +
          "\n" +
          "test-app:\n" +
          "  stage: test\n" +
          "  script:\n" +
          "    - npm test\n" +
          "  coverage: '/Statements\\s*:\\s*(\\d+\\.\\d+)%/'\n" +
          "\n" +
          "deploy-production:\n" +
          "  stage: deploy\n" +
          "  script:\n" +
          "    - echo \"Deploying to production...\"\n" +
          "    - npm run deploy\n" +
          "  only:\n" +
          "    - main\n" +
          "  when: manual\n" +
          "```\n\n" +
          "**2. Commit and push:**\n" +
          "```bash\n" +
          "git add .gitlab-ci.yml\n" +
          "git commit -m \"Add CI/CD pipeline\"\n" +
          "git push\n" +
          "```\n\n" +
          "**3. View pipeline in GitLab:**\n" +
          "- Go to CI/CD → Pipelines\n" +
          "- Click on pipeline to see job details\n" +
          "- Click on job to see logs"
      },
      {
        title: 'Step 2: Build and Push Docker Images',
        content: 
          "**Complete Docker build pipeline:**\n\n" +
          "```yaml\n" +
          "# .gitlab-ci.yml\n" +
          "stages:\n" +
          "  - build\n" +
          "  - test\n" +
          "  - deploy\n" +
          "\n" +
          "variables:\n" +
          "  DOCKER_TLS_CERTDIR: \"/certs\"\n" +
          "  IMAGE_TAG: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA\n" +
          "\n" +
          "build-docker:\n" +
          "  stage: build\n" +
          "  image: docker:24\n" +
          "  services:\n" +
          "    - docker:24-dind\n" +
          "  before_script:\n" +
          "    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY\n" +
          "  script:\n" +
          "    # Build\n" +
          "    - docker build -t $IMAGE_TAG .\n" +
          "    - docker tag $IMAGE_TAG $CI_REGISTRY_IMAGE:latest\n" +
          "    \n" +
          "    # Push\n" +
          "    - docker push $IMAGE_TAG\n" +
          "    - docker push $CI_REGISTRY_IMAGE:latest\n" +
          "    \n" +
          "    # Output for next jobs\n" +
          "    - echo \"IMAGE_TAG=$IMAGE_TAG\" >> build.env\n" +
          "  artifacts:\n" +
          "    reports:\n" +
          "      dotenv: build.env\n" +
          "\n" +
          "test-docker:\n" +
          "  stage: test\n" +
          "  image: $IMAGE_TAG\n" +
          "  script:\n" +
          "    - echo \"Testing image $IMAGE_TAG\"\n" +
          "    - node --version\n" +
          "    - npm test\n" +
          "\n" +
          "deploy-k8s:\n" +
          "  stage: deploy\n" +
          "  image: bitnami/kubectl:latest\n" +
          "  script:\n" +
          "    - kubectl set image deployment/app app=$IMAGE_TAG\n" +
          "    - kubectl rollout status deployment/app\n" +
          "  environment:\n" +
          "    name: production\n" +
          "    url: https://app.example.com\n" +
          "  only:\n" +
          "    - main\n" +
          "```"
      },
      {
        title: 'Step 3: Set Up Self-Hosted Runner',
        content: 
          "**Install and configure a GitLab Runner:**\n\n" +
          "```bash\n" +
          "# 1. Install GitLab Runner\n" +
          "curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh | sudo bash\n" +
          "sudo apt-get install gitlab-runner\n" +
          "\n" +
          "# 2. Get registration token\n" +
          "# Go to: Settings → CI/CD → Runners → Expand\n" +
          "# Copy the registration token\n" +
          "\n" +
          "# 3. Register runner\n" +
          "sudo gitlab-runner register \\\n" +
          "  --non-interactive \\\n" +
          "  --url \"https://gitlab.com/\" \\\n" +
          "  --registration-token \"YOUR_TOKEN\" \\\n" +
          "  --executor \"docker\" \\\n" +
          "  --docker-image \"alpine:latest\" \\\n" +
          "  --description \"docker-runner\" \\\n" +
          "  --tag-list \"docker,linux,self-hosted\" \\\n" +
          "  --run-untagged=\"false\" \\\n" +
          "  --locked=\"false\"\n" +
          "\n" +
          "# 4. Start runner\n" +
          "sudo gitlab-runner start\n" +
          "\n" +
          "# 5. Verify\n" +
          "sudo gitlab-runner list\n" +
          "```\n\n" +
          "**Configure runner limits:**\n" +
          "```toml\n" +
          "# /etc/gitlab-runner/config.toml\n" +
          "concurrent = 10  # Max concurrent jobs\n" +
          "\n" +
          "[[runners]]\n" +
          "  name = \"docker-runner\"\n" +
          "  limit = 5  # Max jobs for this runner\n" +
          "  [runners.docker]\n" +
          "    privileged = true  # For Docker-in-Docker\n" +
          "    volumes = [\"/cache\", \"/var/run/docker.sock:/var/run/docker.sock\"]\n" +
          "```"
      },
      {
        title: 'Step 4: Implement Review Apps',
        content: 
          "**Auto-deploy every branch to its own environment:**\n\n" +
          "```yaml\n" +
          "# .gitlab-ci.yml\n" +
          "stages:\n" +
          "  - build\n" +
          "  - deploy\n" +
          "  - cleanup\n" +
          "\n" +
          "build:\n" +
          "  stage: build\n" +
          "  image: docker:24\n" +
          "  services:\n" +
          "    - docker:24-dind\n" +
          "  script:\n" +
          "    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY\n" +
          "    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_REF_SLUG .\n" +
          "    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_REF_SLUG\n" +
          "\n" +
          "deploy-review:\n" +
          "  stage: deploy\n" +
          "  image: bitnami/kubectl:latest\n" +
          "  script:\n" +
          "    # Create namespace for this branch\n" +
          "    - kubectl create namespace review-$CI_COMMIT_REF_SLUG --dry-run=client -o yaml | kubectl apply -f -\n" +
          "    \n" +
          "    # Deploy app to namespace\n" +
          "    - |\n" +
          "      cat <<EOF | kubectl apply -f -\n" +
          "      apiVersion: apps/v1\n" +
          "      kind: Deployment\n" +
          "      metadata:\n" +
          "        name: app\n" +
          "        namespace: review-$CI_COMMIT_REF_SLUG\n" +
          "      spec:\n" +
          "        replicas: 1\n" +
          "        selector:\n" +
          "          matchLabels:\n" +
          "            app: review\n" +
          "        template:\n" +
          "          metadata:\n" +
          "            labels:\n" +
          "              app: review\n" +
          "          spec:\n" +
          "            containers:\n" +
          "            - name: app\n" +
          "              image: $CI_REGISTRY_IMAGE:$CI_COMMIT_REF_SLUG\n" +
          "              ports:\n" +
          "              - containerPort: 3000\n" +
          "      EOF\n" +
          "    \n" +
          "    - kubectl wait --for=condition=available --timeout=120s deployment/app -n review-$CI_COMMIT_REF_SLUG\n" +
          "  environment:\n" +
          "    name: review/$CI_COMMIT_REF_SLUG\n" +
          "    url: https://$CI_COMMIT_REF_SLUG.review.example.com\n" +
          "    on_stop: stop-review\n" +
          "    auto_stop_in: 3 days\n" +
          "  rules:\n" +
          "    - if: '$CI_COMMIT_BRANCH != $CI_DEFAULT_BRANCH'\n" +
          "\n" +
          "stop-review:\n" +
          "  stage: cleanup\n" +
          "  image: bitnami/kubectl:latest\n" +
          "  script:\n" +
          "    - kubectl delete namespace review-$CI_COMMIT_REF_SLUG --ignore-not-found=true\n" +
          "  environment:\n" +
          "    name: review/$CI_COMMIT_REF_SLUG\n" +
          "    action: stop\n" +
          "  rules:\n" +
          "    - if: '$CI_COMMIT_BRANCH != $CI_DEFAULT_BRANCH'\n" +
          "      when: manual\n" +
          "  allow_failure: true\n" +
          "```"
      },
      {
        title: 'Step 5: Enable Security Scanning',
        content: 
          "**Add comprehensive security checks:**\n\n" +
          "```yaml\n" +
          "# .gitlab-ci.yml\n" +
          "include:\n" +
          "  # Static Application Security Testing\n" +
          "  - template: Security/SAST.gitlab-ci.yml\n" +
          "  \n" +
          "  # Dependency scanning\n" +
          "  - template: Security/Dependency-Scanning.gitlab-ci.yml\n" +
          "  \n" +
          "  # Container scanning\n" +
          "  - template: Security/Container-Scanning.gitlab-ci.yml\n" +
          "  \n" +
          "  # Secret detection\n" +
          "  - template: Security/Secret-Detection.gitlab-ci.yml\n" +
          "  \n" +
          "  # License compliance\n" +
          "  - template: Security/License-Scanning.gitlab-ci.yml\n" +
          "\n" +
          "variables:\n" +
          "  SAST_EXCLUDED_PATHS: \"spec, test, tests, tmp\"\n" +
          "  DS_EXCLUDED_PATHS: \"spec, test, tests, tmp\"\n" +
          "\n" +
          "stages:\n" +
          "  - build\n" +
          "  - test\n" +
          "  - deploy\n" +
          "\n" +
          "# Your regular jobs...\n" +
          "build:\n" +
          "  stage: build\n" +
          "  script:\n" +
          "    - npm ci\n" +
          "    - npm run build\n" +
          "\n" +
          "# Security jobs are automatically added by templates\n" +
          "# They run in parallel with your test jobs\n" +
          "```\n\n" +
          "**View Security Reports:**\n" +
          "1. Go to Security & Compliance → Vulnerability Report\n" +
          "2. See all vulnerabilities across all branches\n" +
          "3. Create issues directly from vulnerabilities\n" +
          "4. Track remediation progress"
      },
      {
        title: 'Step 6: Production Pipeline with Manual Gates',
        content: 
          "**Complete production-ready pipeline:**\n\n" +
          "```yaml\n" +
          "# .gitlab-ci.yml\n" +
          "stages:\n" +
          "  - build\n" +
          "  - test\n" +
          "  - security\n" +
          "  - staging\n" +
          "  - production\n" +
          "\n" +
          "variables:\n" +
          "  IMAGE: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA\n" +
          "\n" +
          "build:\n" +
          "  stage: build\n" +
          "  image: docker:24\n" +
          "  services:\n" +
          "    - docker:24-dind\n" +
          "  script:\n" +
          "    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY\n" +
          "    - docker build -t $IMAGE .\n" +
          "    - docker push $IMAGE\n" +
          "\n" +
          "test:\n" +
          "  stage: test\n" +
          "  image: $IMAGE\n" +
          "  script:\n" +
          "    - npm test\n" +
          "  coverage: '/Statements\\s*:\\s*(\\d+\\.\\d+)%/'\n" +
          "\n" +
          "security-scan:\n" +
          "  stage: security\n" +
          "  image: aquasec/trivy:latest\n" +
          "  script:\n" +
          "    - trivy image --exit-code 1 --severity CRITICAL $IMAGE\n" +
          "  allow_failure: true\n" +
          "\n" +
          "deploy-staging:\n" +
          "  stage: staging\n" +
          "  image: bitnami/kubectl:latest\n" +
          "  script:\n" +
          "    - kubectl set image deployment/app app=$IMAGE -n staging\n" +
          "    - kubectl rollout status deployment/app -n staging --timeout=5m\n" +
          "  environment:\n" +
          "    name: staging\n" +
          "    url: https://staging.example.com\n" +
          "  only:\n" +
          "    - main\n" +
          "\n" +
          "deploy-production:\n" +
          "  stage: production\n" +
          "  image: bitnami/kubectl:latest\n" +
          "  script:\n" +
          "    - kubectl set image deployment/app app=$IMAGE -n production\n" +
          "    - kubectl rollout status deployment/app -n production --timeout=10m\n" +
          "  environment:\n" +
          "    name: production\n" +
          "    url: https://example.com\n" +
          "  when: manual  # Require manual approval\n" +
          "  only:\n" +
          "    - main\n" +
          "```"
      }
    ],

    commonMistakes: [
      "**Not using artifacts** - Each job runs in fresh container; use artifacts to pass files between jobs",
      "**Forgetting `docker:dind` service** - Docker-in-Docker needs the dind service enabled",
      "**Hardcoding credentials** - Use CI/CD variables, not hardcoded values",
      "**No cache configuration** - Repeated `npm install` wastes time; use cache",
      "**Running everything on shared runners** - Self-host for sensitive workloads",
      "**Not setting `expire_in`** - Artifacts fill up storage; set expiration",
      "**Using `only/except` instead of `rules`** - `rules` is more powerful and recommended",
      "**No manual gate for production** - Always require approval for production deployments"
    ],

    bestPractices: [
      "**Use templates** - DRY with `include` and shared templates",
      "**Self-host sensitive runners** - Don't run security-sensitive jobs on shared runners",
      "**Leverage built-in registry** - No need for external Docker Hub",
      "**Enable review apps** - Test every branch in isolation",
      "**Set artifact expiration** - Keep storage costs down",
      "**Use dotenv artifacts** - Pass variables between jobs cleanly",
      "**Tag your runners** - Control which jobs run where",
      "**Monitor pipeline performance** - Track duration and optimize slow jobs"
    ],

    realWorldExample: 
      "**Enterprise Multi-Project Pipeline:**\n\n" +
      "```yaml\n" +
      "# .gitlab-ci.yml for microservices monorepo\n" +
      "stages:\n" +
      "  - detect-changes\n" +
      "  - build\n" +
      "  - test\n" +
      "  - deploy-staging\n" +
      "  - deploy-production\n" +
      "\n" +
      "variables:\n" +
      "  DOCKER_DRIVER: overlay2\n" +
      "  DOCKER_TLS_CERTDIR: \"/certs\"\n" +
      "\n" +
      "# Detect which services changed\n" +
      "detect-changes:\n" +
      "  stage: detect-changes\n" +
      "  script:\n" +
      "    - |\n" +
      "      if git diff --name-only $CI_COMMIT_BEFORE_SHA $CI_COMMIT_SHA | grep -q '^services/api/'; then\n" +
      "        echo \"API_CHANGED=true\" >> build.env\n" +
      "      fi\n" +
      "      if git diff --name-only $CI_COMMIT_BEFORE_SHA $CI_COMMIT_SHA | grep -q '^services/web/'; then\n" +
      "        echo \"WEB_CHANGED=true\" >> build.env\n" +
      "      fi\n" +
      "  artifacts:\n" +
      "    reports:\n" +
      "      dotenv: build.env\n" +
      "\n" +
      "# Build API service (only if changed)\n" +
      "build-api:\n" +
      "  stage: build\n" +
      "  image: docker:24\n" +
      "  services:\n" +
      "    - docker:24-dind\n" +
      "  before_script:\n" +
      "    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY\n" +
      "  script:\n" +
      "    - cd services/api\n" +
      "    - docker build -t $CI_REGISTRY_IMAGE/api:$CI_COMMIT_SHORT_SHA .\n" +
      "    - docker push $CI_REGISTRY_IMAGE/api:$CI_COMMIT_SHORT_SHA\n" +
      "  rules:\n" +
      "    - if: '$API_CHANGED == \"true\"'\n" +
      "\n" +
      "# Build Web service (only if changed)\n" +
      "build-web:\n" +
      "  stage: build\n" +
      "  image: docker:24\n" +
      "  services:\n" +
      "    - docker:24-dind\n" +
      "  before_script:\n" +
      "    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY\n" +
      "  script:\n" +
      "    - cd services/web\n" +
      "    - docker build -t $CI_REGISTRY_IMAGE/web:$CI_COMMIT_SHORT_SHA .\n" +
      "    - docker push $CI_REGISTRY_IMAGE/web:$CI_COMMIT_SHORT_SHA\n" +
      "  rules:\n" +
      "    - if: '$WEB_CHANGED == \"true\"'\n" +
      "\n" +
      "# Test API\n" +
      "test-api:\n" +
      "  stage: test\n" +
      "  image: $CI_REGISTRY_IMAGE/api:$CI_COMMIT_SHORT_SHA\n" +
      "  services:\n" +
      "    - postgres:15\n" +
      "  variables:\n" +
      "    POSTGRES_DB: testdb\n" +
      "    POSTGRES_USER: test\n" +
      "    POSTGRES_PASSWORD: test\n" +
      "    DATABASE_URL: postgres://test:test@postgres:5432/testdb\n" +
      "  script:\n" +
      "    - npm test\n" +
      "  rules:\n" +
      "    - if: '$API_CHANGED == \"true\"'\n" +
      "\n" +
      "# Deploy to staging\n" +
      "deploy-staging:\n" +
      "  stage: deploy-staging\n" +
      "  image: bitnami/kubectl:latest\n" +
      "  script:\n" +
      "    - |\n" +
      "      if [ \"$API_CHANGED\" = \"true\" ]; then\n" +
      "        kubectl set image deployment/api api=$CI_REGISTRY_IMAGE/api:$CI_COMMIT_SHORT_SHA -n staging\n" +
      "        kubectl rollout status deployment/api -n staging --timeout=5m\n" +
      "      fi\n" +
      "      if [ \"$WEB_CHANGED\" = \"true\" ]; then\n" +
      "        kubectl set image deployment/web web=$CI_REGISTRY_IMAGE/web:$CI_COMMIT_SHORT_SHA -n staging\n" +
      "        kubectl rollout status deployment/web -n staging --timeout=5m\n" +
      "      fi\n" +
      "  environment:\n" +
      "    name: staging\n" +
      "    url: https://staging.example.com\n" +
      "  only:\n" +
      "    - main\n" +
      "\n" +
      "# Deploy to production (manual approval required)\n" +
      "deploy-production:\n" +
      "  stage: deploy-production\n" +
      "  image: bitnami/kubectl:latest\n" +
      "  script:\n" +
      "    - |\n" +
      "      if [ \"$API_CHANGED\" = \"true\" ]; then\n" +
      "        kubectl set image deployment/api api=$CI_REGISTRY_IMAGE/api:$CI_COMMIT_SHORT_SHA -n production\n" +
      "        kubectl rollout status deployment/api -n production --timeout=10m\n" +
      "      fi\n" +
      "      if [ \"$WEB_CHANGED\" = \"true\" ]; then\n" +
      "        kubectl set image deployment/web web=$CI_REGISTRY_IMAGE/web:$CI_COMMIT_SHORT_SHA -n production\n" +
      "        kubectl rollout status deployment/web -n production --timeout=10m\n" +
      "      fi\n" +
      "  environment:\n" +
      "    name: production\n" +
      "    url: https://example.com\n" +
      "  when: manual\n" +
      "  only:\n" +
      "    - main\n" +
      "```\n\n" +
      "**Pipeline Visualization:**\n" +
      "```\n" +
      "┌─────────────────────────────────────────────────────────────────┐\n" +
      "│              GITLAB MONOREPO PIPELINE                          │\n" +
      "├─────────────────────────────────────────────────────────────────┤\n" +
      "│                                                                 │\n" +
      "│  detect-changes  →  Analyze git diff                           │\n" +
      "│        │                                                        │\n" +
      "│        ├──────────┬──────────┐                                 │\n" +
      "│        ▼          ▼          ▼                                 │\n" +
      "│   build-api   build-web   (skip unchanged)                     │\n" +
      "│        │          │                                            │\n" +
      "│        ▼          ▼                                            │\n" +
      "│   test-api    test-web                                         │\n" +
      "│        │          │                                            │\n" +
      "│        └──────────┴──────────┐                                 │\n" +
      "│                              ▼                                 │\n" +
      "│                      deploy-staging                            │\n" +
      "│                              │                                 │\n" +
      "│                              ▼                                 │\n" +
      "│                      deploy-production                         │\n" +
      "│                       (manual approval)                        │\n" +
      "│                                                                 │\n" +
      "│  Efficiency: Only builds/deploys changed services              │\n" +
      "│                                                                 │\n" +
      "└─────────────────────────────────────────────────────────────────┘\n" +
      "```",

    summary: 
      "## 📝 Key Takeaways\n\n" +
      "1. **All-in-one platform** = CI/CD + registry + security in one place\n" +
      "2. **Built-in registry** = No external Docker Hub needed\n" +
      "3. **Self-hosted runners** = Full control over infrastructure\n" +
      "4. **Review apps** = Auto-deploy every branch\n" +
      "5. **Security scanning** = Built-in SAST, DAST, dependency checks\n" +
      "6. **Auto DevOps** = Zero-config pipelines\n" +
      "7. **Dynamic environments** = Branch-specific deployments\n" +
      "8. **Parent-child pipelines** = Advanced workflow orchestration",

    nextSteps: 
      "**What's Next?**\n\n" +
      "You've mastered GitLab CI/CD! Continue with:\n" +
      "- **GitLab Kubernetes Integration**: Deep K8s integration features\n" +
      "- **GitLab Security Dashboard**: Advanced vulnerability management\n" +
      "- **GitLab Pages**: Deploy static sites from CI/CD\n" +
      "- **Jenkins**: Compare with traditional CI/CD tool"
  },

  'aws-core-services': {
    introduction: 
      "AWS is the world's largest cloud provider, powering Netflix, Airbnb, and NASA. With 200+ services, " +
      "AWS can feel overwhelming. But every cloud journey starts with the same core services: compute (EC2), " +
      "storage (S3), databases (RDS), and networking (VPC).\n\n" +
      "These foundational services are the building blocks for everything else. Master them, and you can " +
      "run applications that serve millions. Whether you're deploying a simple web app or building a global " +
      "platform, you'll use these services daily.\n\n" +
      "In this lesson, you'll learn the core AWS services that every DevOps engineer must know. By the end, " +
      "you'll deploy a production-ready application on AWS from scratch.",

    whyItMatters: 
      "**Why AWS Core Services Matter:**\n\n" +
      "1. **Industry standard** - 32% market share, most job postings require AWS\n" +
      "2. **Complete ecosystem** - Everything from compute to AI in one place\n" +
      "3. **Global reach** - 31 regions, 99 availability zones worldwide\n" +
      "4. **Enterprise trust** - Used by Fortune 500, governments, startups\n" +
      "5. **Career value** - AWS certifications are highly valued\n\n" +
      "**AWS Market Position (2024):**\n" +
      "```\n" +
      "┌─────────────────────────────────────────────────────────────────┐\n" +
      "│                CLOUD MARKET SHARE (Q4 2024)                    │\n" +
      "├─────────────────────────────────────────────────────────────────┤\n" +
      "│                                                                 │\n" +
      "│  AWS        ████████████████████████████████  32%              │\n" +
      "│  Azure      ███████████████████  23%                           │\n" +
      "│  Google     ██████████  11%                                    │\n" +
      "│  Others     ███████████████████████████████  34%               │\n" +
      "│                                                                 │\n" +
      "└─────────────────────────────────────────────────────────────────┘\n" +
      "```",

    concepts: [
      {
        title: 'EC2 (Elastic Compute Cloud)',
        content: 
          "Virtual servers in the cloud - the foundation of AWS compute:\n\n" +
          "**Instance Types:**\n" +
          "```\n" +
          "┌─────────────────────────────────────────────────────────────────┐\n" +
          "│                    EC2 INSTANCE FAMILIES                       │\n" +
          "├──────────┬──────────────────────────────────────────────────────┤\n" +
          "│ Family   │ Use Case                                             │\n" +
          "├──────────┼──────────────────────────────────────────────────────┤\n" +
          "│ t3/t4g   │ Burstable - Web servers, dev environments (cheap)    │\n" +
          "│ m5/m6i   │ General purpose - Balanced CPU/RAM/Network           │\n" +
          "│ c5/c6i   │ Compute optimized - CPU-intensive workloads          │\n" +
          "│ r5/r6i   │ Memory optimized - Databases, caching                │\n" +
          "│ p3/p4    │ GPU - Machine learning, rendering                    │\n" +
          "│ i3/i4i   │ Storage optimized - NoSQL, data warehouses           │\n" +
          "└──────────┴──────────────────────────────────────────────────────┘\n" +
          "```\n\n" +
          "**Launch an EC2 Instance:**\n" +
          "```bash\n" +
          "# Using AWS CLI\n" +
          "aws ec2 run-instances \\\n" +
          "  --image-id ami-0c55b159cbfafe1f0 \\\n" +
          "  --instance-type t3.micro \\\n" +
          "  --key-name my-keypair \\\n" +
          "  --security-group-ids sg-0123456789abcdef \\\n" +
          "  --subnet-id subnet-0123456789abcdef \\\n" +
          "  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=WebServer}]'\n" +
          "\n" +
          "# Get instance details\n" +
          "aws ec2 describe-instances --instance-ids i-0123456789abcdef\n" +
          "\n" +
          "# Connect via SSH\n" +
          "ssh -i my-keypair.pem ec2-user@<public-ip>\n" +
          "```\n\n" +
          "**User Data (Bootstrap Script):**\n" +
          "```bash\n" +
          "#!/bin/bash\n" +
          "# This runs on first boot\n" +
          "yum update -y\n" +
          "yum install -y docker\n" +
          "systemctl start docker\n" +
          "systemctl enable docker\n" +
          "docker run -d -p 80:80 nginx\n" +
          "```"
      },
      {
        title: 'S3 (Simple Storage Service)',
        content: 
          "Object storage - store and retrieve any amount of data:\n\n" +
          "**S3 Storage Classes:**\n" +
          "```\n" +
          "┌─────────────────────────────────────────────────────────────────┐\n" +
          "│                    S3 STORAGE CLASSES                          │\n" +
          "├──────────────────┬────────────┬───────────────┬────────────────┤\n" +
          "│ Class            │ Cost       │ Availability  │ Use Case       │\n" +
          "├──────────────────┼────────────┼───────────────┼────────────────┤\n" +
          "│ S3 Standard      │ $$$        │ 99.99%        │ Frequent access│\n" +
          "│ S3 Intelligent   │ $$-$       │ 99.9%         │ Auto-optimize  │\n" +
          "│ S3 Infrequent    │ $$         │ 99.9%         │ Backups        │\n" +
          "│ S3 Glacier       │ $          │ 99.9%         │ Archives       │\n" +
          "│ S3 Deep Archive  │ ¢          │ 99.9%         │ Long-term      │\n" +
          "└──────────────────┴────────────┴───────────────┴────────────────┘\n" +
          "```\n\n" +
          "**S3 Operations:**\n" +
          "```bash\n" +
          "# Create bucket\n" +
          "aws s3 mb s3://my-unique-bucket-name\n" +
          "\n" +
          "# Upload file\n" +
          "aws s3 cp myfile.txt s3://my-bucket/\n" +
          "\n" +
          "# Download file\n" +
          "aws s3 cp s3://my-bucket/myfile.txt ./\n" +
          "\n" +
          "# Sync directory\n" +
          "aws s3 sync ./dist s3://my-bucket/public/\n" +
          "\n" +
          "# List objects\n" +
          "aws s3 ls s3://my-bucket/ --recursive\n" +
          "\n" +
          "# Delete object\n" +
          "aws s3 rm s3://my-bucket/myfile.txt\n" +
          "\n" +
          "# Make public (be careful!)\n" +
          "aws s3api put-object-acl --bucket my-bucket --key file.txt --acl public-read\n" +
          "```\n\n" +
          "**S3 Bucket Policy (Static Website):**\n" +
          "```json\n" +
          "{\n" +
          "  \"Version\": \"2012-10-17\",\n" +
          "  \"Statement\": [\n" +
          "    {\n" +
          "      \"Effect\": \"Allow\",\n" +
          "      \"Principal\": \"*\",\n" +
          "      \"Action\": \"s3:GetObject\",\n" +
          "      \"Resource\": \"arn:aws:s3:::my-bucket/*\"\n" +
          "    }\n" +
          "  ]\n" +
          "}\n" +
          "```"
      },
      {
        title: 'VPC (Virtual Private Cloud)',
        content: 
          "Your own isolated network in AWS:\n\n" +
          "**VPC Architecture:**\n" +
          "```\n" +
          "┌─────────────────────────────────────────────────────────────────┐\n" +
          "│                     VPC STRUCTURE                              │\n" +
          "│  Region: us-east-1                                              │\n" +
          "├─────────────────────────────────────────────────────────────────┤\n" +
          "│                                                                 │\n" +
          "│  VPC: 10.0.0.0/16                                               │\n" +
          "│  ┌───────────────────────────────────────────────────────────┐  │\n" +
          "│  │                                                           │  │\n" +
          "│  │  ┌──────────────────┐      ┌──────────────────┐          │  │\n" +
          "│  │  │  Public Subnet   │      │  Public Subnet   │          │  │\n" +
          "│  │  │  10.0.1.0/24     │      │  10.0.2.0/24     │          │  │\n" +
          "│  │  │  AZ: us-east-1a  │      │  AZ: us-east-1b  │          │  │\n" +
          "│  │  │  ┌───────────┐   │      │  ┌───────────┐   │          │  │\n" +
          "│  │  │  │ Web Server│   │      │  │ Web Server│   │          │  │\n" +
          "│  │  │  └───────────┘   │      │  └───────────┘   │          │  │\n" +
          "│  │  └──────────────────┘      └──────────────────┘          │  │\n" +
          "│  │           │                          │                    │  │\n" +
          "│  │  ┌──────────────────┐      ┌──────────────────┐          │  │\n" +
          "│  │  │  Private Subnet  │      │  Private Subnet  │          │  │\n" +
          "│  │  │  10.0.10.0/24    │      │  10.0.20.0/24    │          │  │\n" +
          "│  │  │  ┌───────────┐   │      │  ┌───────────┐   │          │  │\n" +
          "│  │  │  │  Database │   │      │  │  Database │   │          │  │\n" +
          "│  │  │  └───────────┘   │      │  └───────────┘   │          │  │\n" +
          "│  │  └──────────────────┘      └──────────────────┘          │  │\n" +
          "│  │                                                           │  │\n" +
          "│  │  Internet Gateway ← Public subnets                        │  │\n" +
          "│  │  NAT Gateway ← Private subnets (for outbound)             │  │\n" +
          "│  └───────────────────────────────────────────────────────────┘  │\n" +
          "│                                                                 │\n" +
          "└─────────────────────────────────────────────────────────────────┘\n" +
          "```\n\n" +
          "**Create VPC:**\n" +
          "```bash\n" +
          "# Create VPC\n" +
          "VPC_ID=$(aws ec2 create-vpc --cidr-block 10.0.0.0/16 --query 'Vpc.VpcId' --output text)\n" +
          "\n" +
          "# Create public subnet\n" +
          "SUBNET_PUB=$(aws ec2 create-subnet --vpc-id $VPC_ID --cidr-block 10.0.1.0/24 --availability-zone us-east-1a --query 'Subnet.SubnetId' --output text)\n" +
          "\n" +
          "# Create private subnet\n" +
          "SUBNET_PRIV=$(aws ec2 create-subnet --vpc-id $VPC_ID --cidr-block 10.0.10.0/24 --availability-zone us-east-1a --query 'Subnet.SubnetId' --output text)\n" +
          "\n" +
          "# Create internet gateway\n" +
          "IGW=$(aws ec2 create-internet-gateway --query 'InternetGateway.InternetGatewayId' --output text)\n" +
          "aws ec2 attach-internet-gateway --internet-gateway-id $IGW --vpc-id $VPC_ID\n" +
          "\n" +
          "# Create route table for public subnet\n" +
          "RTB=$(aws ec2 create-route-table --vpc-id $VPC_ID --query 'RouteTable.RouteTableId' --output text)\n" +
          "aws ec2 create-route --route-table-id $RTB --destination-cidr-block 0.0.0.0/0 --gateway-id $IGW\n" +
          "aws ec2 associate-route-table --route-table-id $RTB --subnet-id $SUBNET_PUB\n" +
          "```"
      },
      {
        title: 'RDS (Relational Database Service)',
        content: 
          "Managed databases without the operational overhead:\n\n" +
          "**Supported Engines:**\n" +
          "```\n" +
          "┌─────────────────────────────────────────────────────────────────┐\n" +
          "│                    RDS DATABASE ENGINES                        │\n" +
          "├──────────────┬──────────────────────────────────────────────────┤\n" +
          "│ Engine       │ Best For                                         │\n" +
          "├──────────────┼──────────────────────────────────────────────────┤\n" +
          "│ Aurora       │ AWS-optimized, 5x faster than MySQL              │\n" +
          "│ PostgreSQL   │ Advanced features, JSON, geospatial              │\n" +
          "│ MySQL        │ Most common, wide compatibility                  │\n" +
          "│ MariaDB      │ Open-source MySQL fork                           │\n" +
          "│ Oracle       │ Enterprise, legacy applications                  │\n" +
          "│ SQL Server   │ Microsoft ecosystem                              │\n" +
          "└──────────────┴──────────────────────────────────────────────────┘\n" +
          "```\n\n" +
          "**Create RDS Instance:**\n" +
          "```bash\n" +
          "# Create DB instance\n" +
          "aws rds create-db-instance \\\n" +
          "  --db-instance-identifier mydb \\\n" +
          "  --db-instance-class db.t3.micro \\\n" +
          "  --engine postgres \\\n" +
          "  --engine-version 15.3 \\\n" +
          "  --master-username admin \\\n" +
          "  --master-user-password MySecurePass123! \\\n" +
          "  --allocated-storage 20 \\\n" +
          "  --vpc-security-group-ids sg-0123456789 \\\n" +
          "  --db-subnet-group-name mydb-subnet-group \\\n" +
          "  --backup-retention-period 7 \\\n" +
          "  --preferred-backup-window \"03:00-04:00\" \\\n" +
          "  --preferred-maintenance-window \"mon:04:00-mon:05:00\"\n" +
          "\n" +
          "# Get connection endpoint\n" +
          "aws rds describe-db-instances --db-instance-identifier mydb \\\n" +
          "  --query 'DBInstances[0].Endpoint.Address' --output text\n" +
          "```\n\n" +
          "**Connect to RDS:**\n" +
          "```bash\n" +
          "# PostgreSQL\n" +
          "psql -h mydb.abc123.us-east-1.rds.amazonaws.com -U admin -d postgres\n" +
          "\n" +
          "# MySQL\n" +
          "mysql -h mydb.abc123.us-east-1.rds.amazonaws.com -u admin -p\n" +
          "\n" +
          "# Connection string for app\n" +
          "postgresql://admin:password@mydb.abc123.us-east-1.rds.amazonaws.com:5432/myapp\n" +
          "```"
      },
      {
        title: 'IAM (Identity and Access Management)',
        content: 
          "Control who can do what in AWS:\n\n" +
          "**IAM Components:**\n" +
          "```\n" +
          "┌─────────────────────────────────────────────────────────────────┐\n" +
          "│                      IAM HIERARCHY                             │\n" +
          "├─────────────────────────────────────────────────────────────────┤\n" +
          "│                                                                 │\n" +
          "│  ┌──────────────────────────────────────────────────────────┐  │\n" +
          "│  │  IAM USERS                                               │  │\n" +
          "│  │  Individual people: john@company.com                     │  │\n" +
          "│  │  Credentials: Password + Access Key                      │  │\n" +
          "│  └──────────────────────────────────────────────────────────┘  │\n" +
          "│                          │                                     │\n" +
          "│                          ▼                                     │\n" +
          "│  ┌──────────────────────────────────────────────────────────┐  │\n" +
          "│  │  IAM GROUPS                                              │  │\n" +
          "│  │  Collections: Developers, Admins, Operations             │  │\n" +
          "│  │  Attach policies to groups, not individual users         │  │\n" +
          "│  └──────────────────────────────────────────────────────────┘  │\n" +
          "│                          │                                     │\n" +
          "│                          ▼                                     │\n" +
          "│  ┌──────────────────────────────────────────────────────────┐  │\n" +
          "│  │  IAM POLICIES                                            │  │\n" +
          "│  │  JSON documents defining permissions                     │  │\n" +
          "│  │  Example: Allow EC2 read, Deny S3 delete                │  │\n" +
          "│  └──────────────────────────────────────────────────────────┘  │\n" +
          "│                          │                                     │\n" +
          "│                          ▼                                     │\n" +
          "│  ┌──────────────────────────────────────────────────────────┐  │\n" +
          "│  │  IAM ROLES                                               │  │\n" +
          "│  │  For services: EC2, Lambda can assume roles              │  │\n" +
          "│  │  Temporary credentials, no long-term keys                │  │\n" +
          "│  └──────────────────────────────────────────────────────────┘  │\n" +
          "│                                                                 │\n" +
          "└─────────────────────────────────────────────────────────────────┘\n" +
          "```\n\n" +
          "**IAM Policy Example:**\n" +
          "```json\n" +
          "{\n" +
          "  \"Version\": \"2012-10-17\",\n" +
          "  \"Statement\": [\n" +
          "    {\n" +
          "      \"Effect\": \"Allow\",\n" +
          "      \"Action\": [\n" +
          "        \"ec2:Describe*\",\n" +
          "        \"ec2:StartInstances\",\n" +
          "        \"ec2:StopInstances\"\n" +
          "      ],\n" +
          "      \"Resource\": \"*\",\n" +
          "      \"Condition\": {\n" +
          "        \"StringEquals\": {\n" +
          "          \"ec2:ResourceTag/Environment\": \"dev\"\n" +
          "        }\n" +
          "      }\n" +
          "    },\n" +
          "    {\n" +
          "      \"Effect\": \"Allow\",\n" +
          "      \"Action\": \"s3:*\",\n" +
          "      \"Resource\": [\n" +
          "        \"arn:aws:s3:::my-bucket\",\n" +
          "        \"arn:aws:s3:::my-bucket/*\"\n" +
          "      ]\n" +
          "    }\n" +
          "  ]\n" +
          "}\n" +
          "```"
      },
      {
        title: 'Load Balancing & Auto Scaling',
        content: 
          "Distribute traffic and scale automatically:\n\n" +
          "**Application Load Balancer (ALB):**\n" +
          "```\n" +
          "┌─────────────────────────────────────────────────────────────────┐\n" +
          "│                  LOAD BALANCER ARCHITECTURE                    │\n" +
          "├─────────────────────────────────────────────────────────────────┤\n" +
          "│                                                                 │\n" +
          "│  Internet                                                       │\n" +
          "│      │                                                          │\n" +
          "│      ▼                                                          │\n" +
          "│  ┌──────────────────────────────────────────────┐              │\n" +
          "│  │   Application Load Balancer                  │              │\n" +
          "│  │   myapp-lb-123.us-east-1.elb.amazonaws.com   │              │\n" +
          "│  └───────────┬──────────────┬───────────────────┘              │\n" +
          "│              │              │                                   │\n" +
          "│              ▼              ▼                                   │\n" +
          "│    ┌────────────────┐  ┌────────────────┐                      │\n" +
          "│    │  Target Group  │  │  Target Group  │                      │\n" +
          "│    │   /api/*       │  │   /web/*       │                      │\n" +
          "│    └────────┬───────┘  └────────┬───────┘                      │\n" +
          "│             │                   │                              │\n" +
          "│       ┌─────┴─────┐       ┌────┴────┐                          │\n" +
          "│       ▼           ▼       ▼         ▼                          │\n" +
          "│   [API-1]    [API-2]  [WEB-1]   [WEB-2]                        │\n" +
          "│                                                                 │\n" +
          "└─────────────────────────────────────────────────────────────────┘\n" +
          "```\n\n" +
          "**Auto Scaling Group:**\n" +
          "```bash\n" +
          "# Create launch template\n" +
          "aws ec2 create-launch-template \\\n" +
          "  --launch-template-name my-template \\\n" +
          "  --version-description \"v1\" \\\n" +
          "  --launch-template-data file://launch-template.json\n" +
          "\n" +
          "# Create auto scaling group\n" +
          "aws autoscaling create-auto-scaling-group \\\n" +
          "  --auto-scaling-group-name my-asg \\\n" +
          "  --launch-template LaunchTemplateName=my-template \\\n" +
          "  --min-size 2 \\\n" +
          "  --max-size 10 \\\n" +
          "  --desired-capacity 2 \\\n" +
          "  --target-group-arns arn:aws:elasticloadbalancing:... \\\n" +
          "  --vpc-zone-identifier \"subnet-abc,subnet-def\"\n" +
          "\n" +
          "# Create scaling policy (scale up at 70% CPU)\n" +
          "aws autoscaling put-scaling-policy \\\n" +
          "  --auto-scaling-group-name my-asg \\\n" +
          "  --policy-name scale-up \\\n" +
          "  --policy-type TargetTrackingScaling \\\n" +
          "  --target-tracking-configuration file://cpu-tracking.json\n" +
          "```"
      }
    ],

    stepByStep: [
      {
        title: 'Step 1: Set Up AWS CLI',
        content: 
          "**Install AWS CLI:**\n\n" +
          "```bash\n" +
          "# macOS\n" +
          "brew install awscli\n" +
          "\n" +
          "# Linux\n" +
          "curl \"https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip\" -o \"awscliv2.zip\"\n" +
          "unzip awscliv2.zip\n" +
          "sudo ./aws/install\n" +
          "\n" +
          "# Verify installation\n" +
          "aws --version\n" +
          "```\n\n" +
          "**Configure AWS CLI:**\n\n" +
          "```bash\n" +
          "# Get credentials from AWS Console: IAM → Users → Security Credentials\n" +
          "aws configure\n" +
          "# AWS Access Key ID: [your-key]\n" +
          "# AWS Secret Access Key: [your-secret]\n" +
          "# Default region: us-east-1\n" +
          "# Default output format: json\n" +
          "\n" +
          "# Test configuration\n" +
          "aws sts get-caller-identity\n" +
          "```"
      },
      {
        title: 'Step 2: Launch Your First EC2 Instance',
        content: 
          "**Create a key pair:**\n\n" +
          "```bash\n" +
          "# Create key pair\n" +
          "aws ec2 create-key-pair --key-name my-key --query 'KeyMaterial' --output text > my-key.pem\n" +
          "chmod 400 my-key.pem\n" +
          "\n" +
          "# Create security group\n" +
          "SG_ID=$(aws ec2 create-security-group \\\n" +
          "  --group-name web-sg \\\n" +
          "  --description \"Web server security group\" \\\n" +
          "  --query 'GroupId' --output text)\n" +
          "\n" +
          "# Allow SSH and HTTP\n" +
          "aws ec2 authorize-security-group-ingress --group-id $SG_ID --protocol tcp --port 22 --cidr 0.0.0.0/0\n" +
          "aws ec2 authorize-security-group-ingress --group-id $SG_ID --protocol tcp --port 80 --cidr 0.0.0.0/0\n" +
          "\n" +
          "# Launch instance\n" +
          "INSTANCE_ID=$(aws ec2 run-instances \\\n" +
          "  --image-id ami-0c55b159cbfafe1f0 \\\n" +
          "  --instance-type t3.micro \\\n" +
          "  --key-name my-key \\\n" +
          "  --security-group-ids $SG_ID \\\n" +
          "  --user-data file://userdata.sh \\\n" +
          "  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=WebServer}]' \\\n" +
          "  --query 'Instances[0].InstanceId' --output text)\n" +
          "\n" +
          "# Get public IP\n" +
          "aws ec2 describe-instances --instance-ids $INSTANCE_ID \\\n" +
          "  --query 'Reservations[0].Instances[0].PublicIpAddress' --output text\n" +
          "\n" +
          "# Connect\n" +
          "ssh -i my-key.pem ec2-user@<public-ip>\n" +
          "```"
      },
      {
        title: 'Step 3: Create S3 Bucket for Static Website',
        content: 
          "**Host a static website on S3:**\n\n" +
          "```bash\n" +
          "# Create bucket (must be globally unique name)\n" +
          "BUCKET_NAME=\"my-website-$(date +%s)\"\n" +
          "aws s3 mb s3://$BUCKET_NAME\n" +
          "\n" +
          "# Enable static website hosting\n" +
          "aws s3 website s3://$BUCKET_NAME --index-document index.html --error-document error.html\n" +
          "\n" +
          "# Create public access policy\n" +
          "cat > policy.json <<EOF\n" +
          "{\n" +
          "  \"Version\": \"2012-10-17\",\n" +
          "  \"Statement\": [\n" +
          "    {\n" +
          "      \"Effect\": \"Allow\",\n" +
          "      \"Principal\": \"*\",\n" +
          "      \"Action\": \"s3:GetObject\",\n" +
          "      \"Resource\": \"arn:aws:s3:::$BUCKET_NAME/*\"\n" +
          "    }\n" +
          "  ]\n" +
          "}\n" +
          "EOF\n" +
          "\n" +
          "# Disable block public access\n" +
          "aws s3api put-public-access-block --bucket $BUCKET_NAME --public-access-block-configuration BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false\n" +
          "\n" +
          "# Apply policy\n" +
          "aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file://policy.json\n" +
          "\n" +
          "# Upload website files\n" +
          "echo '<h1>Hello from S3!</h1>' > index.html\n" +
          "aws s3 sync . s3://$BUCKET_NAME --exclude \"*\" --include \"*.html\" --include \"*.css\" --include \"*.js\"\n" +
          "\n" +
          "# Get website URL\n" +
          "echo \"http://$BUCKET_NAME.s3-website-us-east-1.amazonaws.com\"\n" +
          "```"
      },
      {
        title: 'Step 4: Set Up RDS Database',
        content: 
          "**Create PostgreSQL database:**\n\n" +
          "```bash\n" +
          "# Create DB subnet group (needs 2+ subnets in different AZs)\n" +
          "aws rds create-db-subnet-group \\\n" +
          "  --db-subnet-group-name mydb-subnet \\\n" +
          "  --db-subnet-group-description \"My DB subnet group\" \\\n" +
          "  --subnet-ids subnet-abc123 subnet-def456\n" +
          "\n" +
          "# Create security group for RDS\n" +
          "DB_SG=$(aws ec2 create-security-group \\\n" +
          "  --group-name db-sg \\\n" +
          "  --description \"Database security group\" \\\n" +
          "  --vpc-id vpc-xyz \\\n" +
          "  --query 'GroupId' --output text)\n" +
          "\n" +
          "# Allow PostgreSQL from web server SG only\n" +
          "aws ec2 authorize-security-group-ingress \\\n" +
          "  --group-id $DB_SG \\\n" +
          "  --protocol tcp \\\n" +
          "  --port 5432 \\\n" +
          "  --source-group $WEB_SG\n" +
          "\n" +
          "# Create RDS instance\n" +
          "aws rds create-db-instance \\\n" +
          "  --db-instance-identifier myapp-db \\\n" +
          "  --db-instance-class db.t3.micro \\\n" +
          "  --engine postgres \\\n" +
          "  --master-username admin \\\n" +
          "  --master-user-password SecurePassword123! \\\n" +
          "  --allocated-storage 20 \\\n" +
          "  --vpc-security-group-ids $DB_SG \\\n" +
          "  --db-subnet-group-name mydb-subnet \\\n" +
          "  --backup-retention-period 7 \\\n" +
          "  --no-publicly-accessible\n" +
          "\n" +
          "# Wait for creation (takes 5-10 minutes)\n" +
          "aws rds wait db-instance-available --db-instance-identifier myapp-db\n" +
          "\n" +
          "# Get endpoint\n" +
          "aws rds describe-db-instances --db-instance-identifier myapp-db \\\n" +
          "  --query 'DBInstances[0].Endpoint.Address' --output text\n" +
          "```"
      },
      {
        title: 'Step 5: Create Load Balancer with Auto Scaling',
        content: 
          "**Set up production-grade infrastructure:**\n\n" +
          "```bash\n" +
          "# Create target group\n" +
          "TG_ARN=$(aws elbv2 create-target-group \\\n" +
          "  --name myapp-tg \\\n" +
          "  --protocol HTTP \\\n" +
          "  --port 80 \\\n" +
          "  --vpc-id vpc-xyz \\\n" +
          "  --health-check-path /health \\\n" +
          "  --query 'TargetGroups[0].TargetGroupArn' --output text)\n" +
          "\n" +
          "# Create application load balancer\n" +
          "LB_ARN=$(aws elbv2 create-load-balancer \\\n" +
          "  --name myapp-lb \\\n" +
          "  --subnets subnet-pub1 subnet-pub2 \\\n" +
          "  --security-groups $LB_SG \\\n" +
          "  --query 'LoadBalancers[0].LoadBalancerArn' --output text)\n" +
          "\n" +
          "# Create listener\n" +
          "aws elbv2 create-listener \\\n" +
          "  --load-balancer-arn $LB_ARN \\\n" +
          "  --protocol HTTP \\\n" +
          "  --port 80 \\\n" +
          "  --default-actions Type=forward,TargetGroupArn=$TG_ARN\n" +
          "\n" +
          "# Create launch template\n" +
          "aws ec2 create-launch-template \\\n" +
          "  --launch-template-name myapp-lt \\\n" +
          "  --launch-template-data '{\n" +
          "    \"ImageId\": \"ami-0c55b159cbfafe1f0\",\n" +
          "    \"InstanceType\": \"t3.micro\",\n" +
          "    \"KeyName\": \"my-key\",\n" +
          "    \"SecurityGroupIds\": [\"'$WEB_SG'\"],\n" +
          "    \"UserData\": \"'$(base64 -w0 userdata.sh)'\"\n" +
          "  }'\n" +
          "\n" +
          "# Create auto scaling group\n" +
          "aws autoscaling create-auto-scaling-group \\\n" +
          "  --auto-scaling-group-name myapp-asg \\\n" +
          "  --launch-template LaunchTemplateName=myapp-lt \\\n" +
          "  --min-size 2 \\\n" +
          "  --max-size 6 \\\n" +
          "  --desired-capacity 2 \\\n" +
          "  --target-group-arns $TG_ARN \\\n" +
          "  --health-check-type ELB \\\n" +
          "  --health-check-grace-period 300 \\\n" +
          "  --vpc-zone-identifier \"subnet-priv1,subnet-priv2\"\n" +
          "\n" +
          "# Add scaling policy\n" +
          "aws autoscaling put-scaling-policy \\\n" +
          "  --auto-scaling-group-name myapp-asg \\\n" +
          "  --policy-name cpu-scaling \\\n" +
          "  --policy-type TargetTrackingScaling \\\n" +
          "  --target-tracking-configuration '{\n" +
          "    \"PredefinedMetricSpecification\": {\n" +
          "      \"PredefinedMetricType\": \"ASGAverageCPUUtilization\"\n" +
          "    },\n" +
          "    \"TargetValue\": 70.0\n" +
          "  }'\n" +
          "```"
      },
      {
        title: 'Step 6: Deploy Complete Application',
        content: 
          "**Full stack deployment script:**\n\n" +
          "```bash\n" +
          "#!/bin/bash\n" +
          "# deploy-app.sh\n" +
          "\n" +
          "set -e\n" +
          "\n" +
          "# Variables\n" +
          "APP_NAME=\"myapp\"\n" +
          "REGION=\"us-east-1\"\n" +
          "VPC_CIDR=\"10.0.0.0/16\"\n" +
          "\n" +
          "echo \"Creating VPC...\"\n" +
          "VPC_ID=$(aws ec2 create-vpc --cidr-block $VPC_CIDR --query 'Vpc.VpcId' --output text)\n" +
          "aws ec2 create-tags --resources $VPC_ID --tags Key=Name,Value=$APP_NAME-vpc\n" +
          "\n" +
          "echo \"Creating subnets...\"\n" +
          "PUB_SUBNET_1=$(aws ec2 create-subnet --vpc-id $VPC_ID --cidr-block 10.0.1.0/24 --availability-zone ${REGION}a --query 'Subnet.SubnetId' --output text)\n" +
          "PUB_SUBNET_2=$(aws ec2 create-subnet --vpc-id $VPC_ID --cidr-block 10.0.2.0/24 --availability-zone ${REGION}b --query 'Subnet.SubnetId' --output text)\n" +
          "PRIV_SUBNET_1=$(aws ec2 create-subnet --vpc-id $VPC_ID --cidr-block 10.0.10.0/24 --availability-zone ${REGION}a --query 'Subnet.SubnetId' --output text)\n" +
          "PRIV_SUBNET_2=$(aws ec2 create-subnet --vpc-id $VPC_ID --cidr-block 10.0.20.0/24 --availability-zone ${REGION}b --query 'Subnet.SubnetId' --output text)\n" +
          "\n" +
          "echo \"Setting up internet gateway...\"\n" +
          "IGW=$(aws ec2 create-internet-gateway --query 'InternetGateway.InternetGatewayId' --output text)\n" +
          "aws ec2 attach-internet-gateway --internet-gateway-id $IGW --vpc-id $VPC_ID\n" +
          "\n" +
          "echo \"Configuring route tables...\"\n" +
          "RTB=$(aws ec2 create-route-table --vpc-id $VPC_ID --query 'RouteTable.RouteTableId' --output text)\n" +
          "aws ec2 create-route --route-table-id $RTB --destination-cidr-block 0.0.0.0/0 --gateway-id $IGW\n" +
          "aws ec2 associate-route-table --route-table-id $RTB --subnet-id $PUB_SUBNET_1\n" +
          "aws ec2 associate-route-table --route-table-id $RTB --subnet-id $PUB_SUBNET_2\n" +
          "\n" +
          "echo \"Creating security groups...\"\n" +
          "LB_SG=$(aws ec2 create-security-group --group-name ${APP_NAME}-lb-sg --description \"LB SG\" --vpc-id $VPC_ID --query 'GroupId' --output text)\n" +
          "aws ec2 authorize-security-group-ingress --group-id $LB_SG --protocol tcp --port 80 --cidr 0.0.0.0/0\n" +
          "\n" +
          "WEB_SG=$(aws ec2 create-security-group --group-name ${APP_NAME}-web-sg --description \"Web SG\" --vpc-id $VPC_ID --query 'GroupId' --output text)\n" +
          "aws ec2 authorize-security-group-ingress --group-id $WEB_SG --protocol tcp --port 80 --source-group $LB_SG\n" +
          "\n" +
          "DB_SG=$(aws ec2 create-security-group --group-name ${APP_NAME}-db-sg --description \"DB SG\" --vpc-id $VPC_ID --query 'GroupId' --output text)\n" +
          "aws ec2 authorize-security-group-ingress --group-id $DB_SG --protocol tcp --port 5432 --source-group $WEB_SG\n" +
          "\n" +
          "echo \"Creating RDS instance...\"\n" +
          "aws rds create-db-subnet-group --db-subnet-group-name ${APP_NAME}-db-subnet --db-subnet-group-description \"DB Subnets\" --subnet-ids $PRIV_SUBNET_1 $PRIV_SUBNET_2\n" +
          "aws rds create-db-instance --db-instance-identifier ${APP_NAME}-db --db-instance-class db.t3.micro --engine postgres --master-username admin --master-user-password SecurePass123! --allocated-storage 20 --vpc-security-group-ids $DB_SG --db-subnet-group-name ${APP_NAME}-db-subnet --no-publicly-accessible\n" +
          "\n" +
          "echo \"Creating load balancer and auto scaling...\"\n" +
          "TG_ARN=$(aws elbv2 create-target-group --name ${APP_NAME}-tg --protocol HTTP --port 80 --vpc-id $VPC_ID --health-check-path /health --query 'TargetGroups[0].TargetGroupArn' --output text)\n" +
          "LB_ARN=$(aws elbv2 create-load-balancer --name ${APP_NAME}-lb --subnets $PUB_SUBNET_1 $PUB_SUBNET_2 --security-groups $LB_SG --query 'LoadBalancers[0].LoadBalancerArn' --output text)\n" +
          "aws elbv2 create-listener --load-balancer-arn $LB_ARN --protocol HTTP --port 80 --default-actions Type=forward,TargetGroupArn=$TG_ARN\n" +
          "\n" +
          "echo \"Deployment complete!\"\n" +
          "aws elbv2 describe-load-balancers --load-balancer-arns $LB_ARN --query 'LoadBalancers[0].DNSName' --output text\n" +
          "```"
      }
    ],

    commonMistakes: [
      "**Leaving resources running** - Always clean up to avoid charges",
      "**Public S3 buckets** - Most buckets should NOT be public",
      "**Hardcoding credentials** - Use IAM roles, never hardcode keys",
      "**Single AZ deployments** - Always use multiple availability zones",
      "**No backup strategy** - Enable RDS automated backups",
      "**Ignoring security groups** - Only allow necessary ports from specific sources",
      "**Using root account** - Create IAM users, lock down root",
      "**No cost monitoring** - Set up billing alerts immediately"
    ],

    bestPractices: [
      "**Use IAM roles** - For EC2, Lambda, etc. instead of access keys",
      "**Multi-AZ everything** - High availability requires multiple zones",
      "**Tag all resources** - Name, Environment, Owner, Cost Center",
      "**Enable CloudTrail** - Audit log of all API calls",
      "**Set up billing alerts** - Know when costs exceed threshold",
      "**Use Parameter Store** - For secrets and configuration",
      "**Follow least privilege** - Grant minimal permissions needed",
      "**Regular backups** - Automate snapshots and test restores"
    ],

    realWorldExample: 
      "**Production-Grade WordPress on AWS:**\n\n" +
      "```bash\n" +
      "# Architecture:\n" +
      "# - Application Load Balancer\n" +
      "# - Auto Scaling Group (2-10 EC2 instances)\n" +
      "# - RDS MySQL (Multi-AZ)\n" +
      "# - ElastiCache Redis (for sessions/cache)\n" +
      "# - EFS (shared WordPress files)\n" +
      "# - CloudFront (CDN) + S3 (static assets)\n" +
      "\n" +
      "# Complete deployment script\n" +
      "# Available at: https://github.com/aws-samples/aws-refarch-wordpress\n" +
      "\n" +
      "# Key components:\n" +
      "- VPC with public/private subnets across 2 AZs\n" +
      "- NAT Gateways for private subnet internet access\n" +
      "- RDS Multi-AZ for automatic failover\n" +
      "- ElastiCache for session storage\n" +
      "- EFS for shared WordPress uploads\n" +
      "- ALB with SSL termination (ACM certificate)\n" +
      "- Auto Scaling based on CPU/network metrics\n" +
      "- CloudWatch monitoring and alarms\n" +
      "- Route 53 for DNS\n" +
      "- CloudFront for global content delivery\n" +
      "```\n\n" +
      "**Cost Estimate (Monthly):**\n" +
      "```\n" +
      "┌─────────────────────────────────────────────────────────────────┐\n" +
      "│           PRODUCTION WORDPRESS AWS COSTS                       │\n" +
      "├──────────────────────┬──────────────────────────────────────────┤\n" +
      "│ Service              │ Monthly Cost (USD)                       │\n" +
      "├──────────────────────┼──────────────────────────────────────────┤\n" +
      "│ EC2 (2x t3.small)    │ ~$30                                     │\n" +
      "│ RDS (db.t3.small)    │ ~$30                                     │\n" +
      "│ ALB                  │ ~$20                                     │\n" +
      "│ EFS                  │ ~$10                                     │\n" +
      "│ ElastiCache          │ ~$15                                     │\n" +
      "│ Data Transfer        │ ~$10                                     │\n" +
      "│ CloudFront           │ ~$5                                      │\n" +
      "├──────────────────────┼──────────────────────────────────────────┤\n" +
      "│ TOTAL                │ ~$120/month                              │\n" +
      "└──────────────────────┴──────────────────────────────────────────┘\n" +
      "\n" +
      "* Can scale down to ~$40/month for small sites\n" +
      "* Can scale up to $500+ for high-traffic sites\n" +
      "```",

    summary: 
      "## 📝 Key Takeaways\n\n" +
      "1. **EC2** = Virtual servers, the compute foundation\n" +
      "2. **S3** = Object storage, virtually unlimited\n" +
      "3. **VPC** = Your own isolated network\n" +
      "4. **RDS** = Managed databases with automatic backups\n" +
      "5. **IAM** = Security through roles and policies\n" +
      "6. **ALB + Auto Scaling** = High availability and elasticity\n" +
      "7. **Multi-AZ** = Always deploy across availability zones\n" +
      "8. **Tagging** = Organize and track costs effectively",

    nextSteps: 
      "**What's Next?**\n\n" +
      "You've mastered AWS core services! Continue with:\n" +
      "- **Cost Optimization**: Reduce AWS bills significantly\n" +
      "- **CloudFormation**: Infrastructure as Code on AWS\n" +
      "- **Lambda & Serverless**: Event-driven computing\n" +
      "- **ECS/EKS**: Container orchestration on AWS"
  },

  'cost-optimization-best-practices': {
    introduction: 
      "AWS bills often shock new users. Companies spend 30-40% more than necessary on cloud, with most " +
      "waste coming from poor planning, not misconfiguration. A 50-person startup might waste $5,000/month " +
      "through unused resources and inefficient scaling.\n\n" +
      "Cost optimization isn't about being cheap—it's about being smart. The same infrastructure that costs " +
      "$10,000/month poorly designed can cost $2,000/month when optimized. Netflix saved $100 million annually " +
      "by optimizing cloud usage. Your job as a DevOps engineer is to deliver value, not just infrastructure.\n\n" +
      "In this lesson, you'll learn proven cost optimization strategies used by companies of all sizes. By the " +
      "end, you'll be able to audit AWS infrastructure and identify tens of thousands in potential savings.",

    whyItMatters: 
      "**Why Cost Optimization Matters:**\n\n" +
      "1. **Direct impact on business** - Every dollar saved is profit\n" +
      "2. **Job security** - Show your value to the company\n" +
      "3. **Sustainable growth** - Enable scaling without breaking budget\n" +
      "4. **Competitive advantage** - Lower costs = better pricing or margins\n" +
      "5. **Environmental** - Less spending = less resource consumption\n\n" +
      "**Cost Breakdown (Typical Company):**\n" +
      "```\n" +
      "┌─────────────────────────────────────────────────────────────────┐\n" +
      "│            WHERE COMPANIES WASTE CLOUD MONEY                   │\n" +
      "├──────────────────────┬─────────────────────────────────────────┤\n" +
      "│ Issue                │ Savings Potential                       │\n" +
      "├──────────────────────┼─────────────────────────────────────────┤\n" +
      "│ Unused resources     │ 20-30% (biggest waste!)                 │\n" +
      "│ Wrong instance size  │ 15-25%                                  │\n" +
      "│ Poor scaling config  │ 10-15%                                  │\n" +
      "│ Expensive regions    │ 10-20%                                  │\n" +
      "│ Expensive storage    │ 5-10%                                   │\n" +
      "│ Data transfer costs  │ 5-15%                                   │\n" +
      "├──────────────────────┼─────────────────────────────────────────┤\n" +
      "│ TOTAL POTENTIAL      │ 30-40% reduction possible               │\n" +
      "└──────────────────────┴─────────────────────────────────────────┘\n" +
      "```",

    concepts: [
      {
        title: 'Reserved Instances & Savings Plans',
        content: 
          "Commit to usage for 30-50% discounts:\n\n" +
          "**Pricing Models:**\n" +
          "```\n" +
          "┌─────────────────────────────────────────────────────────────────┐\n" +
          "│              AWS PRICING MODELS                                │\n" +
          "├──────────────┬──────────┬─────────┬───────────────────────────┤\n" +
          "│ Model        │ Discount │ Commit  │ Best For                  │\n" +
          "├──────────────┼──────────┼─────────┼───────────────────────────┤\n" +
          "│ On-Demand    │ 0%       │ None    │ Unpredictable workloads   │\n" +
          "│ Spot         │ 70-90%   │ Risky   │ Batch jobs, non-critical  │\n" +
          "│ Savings Plan │ 24-31%   │ 1-3 yr  │ Flexible usage           │\n" +
          "│ Reserved     │ 36-63%   │ 1-3 yr  │ Baseline capacity        │\n" +
          "└──────────────┴──────────┴─────────┴───────────────────────────┘\n" +
          "```\n\n" +
          "**Calculate Savings:**\n" +
          "```bash\n" +
          "# Example: t3.medium in us-east-1\n" +
          "On-Demand:           $0.0416/hour = ~$300/month\n" +
          "1-Year Reserved:     $0.0250/hour = ~$180/month (40% savings!)\n" +
          "3-Year Reserved:     $0.0180/hour = ~$130/month (57% savings!)\n" +
          "1-Year Savings Plan: $0.0320/hour = ~$230/month (23% savings)\n" +
          "\n" +
          "# If running 10 instances:\n" +
          "Monthly cost difference: 10 × ($0.0416 - $0.018) × 730 hours\n" +
          "= 10 × $0.0236 × 730 = ~$1,722/month savings!\n" +
          "= ~$20,664/year\n" +
          "```\n\n" +
          "**Purchase Strategy:**\n" +
          "```\n" +
          "1. Analyze last 3 months of usage\n" +
          "2. Identify stable baseline capacity\n" +
          "3. Reserve 80% of baseline\n" +
          "4. Keep 20% On-Demand for spikes\n" +
          "\n" +
          "Example:\n" +
          "- Average EC2 usage: 100 instances\n" +
          "- Peak usage: 150 instances\n" +
          "- Reserve: 80 instances (3-year)\n" +
          "- On-Demand: 70 instances\n" +
          "- Monthly savings: ~$5,000+\n" +
          "```"
      },
      {
        title: 'Rightsizing Instances',
        content: 
          "Use correct instance types and sizes:\n\n" +
          "**Common Oversizing:**\n" +
          "```bash\n" +
          "# Most common mistake: running m5.large when t3.small would work\n" +
          "\n" +
          "m5.large specifications:\n" +
          "- 2 vCPU, 8 GB RAM\n" +
          "- Cost: $0.096/hour ($70/month)\n" +
          "- Actual usage: 5% CPU, 15% memory (WASTED!)\n" +
          "\n" +
          "t3.small specifications:\n" +
          "- 2 vCPU, 2 GB RAM (burstable)\n" +
          "- Cost: $0.023/hour ($16/month)\n" +
          "- Savings: $54/month per instance!\n" +
          "```\n\n" +
          "**Rightsizing Process:**\n" +
          "```\n" +
          "1. Enable CloudWatch detailed monitoring\n" +
          "2. Collect 2 weeks of CPU/Memory/Network data\n" +
          "3. Analyze patterns (peak, average, baseline)\n" +
          "4. Compare against instance specifications\n" +
          "5. Test smaller instance\n" +
          "6. Deploy (can be done without downtime with ALB)\n" +
          "7. Monitor for 1-2 weeks\n" +
          "```\n\n" +
          "**Tools for Analysis:**\n" +
          "```bash\n" +
          "# AWS Compute Optimizer\n" +
          "aws compute-optimizer get-ec2-instance-recommendations \\\n" +
          "  --instance-arns arn:aws:ec2:region:account:instance/i-xxxxx\n" +
          "\n" +
          "# CloudWatch Metrics\n" +
          "aws cloudwatch get-metric-statistics \\\n" +
          "  --namespace AWS/EC2 \\\n" +
          "  --metric-name CPUUtilization \\\n" +
          "  --dimensions Name=InstanceId,Value=i-xxxxx \\\n" +
          "  --start-time 2024-01-01T00:00:00Z \\\n" +
          "  --end-time 2024-01-31T23:59:59Z \\\n" +
          "  --period 3600 \\\n" +
          "  --statistics Average,Maximum,Minimum\n" +
          "```"
      },
      {
        title: 'Eliminating Unused Resources',
        content: 
          "20-30% of cloud spending is for unused resources:\n\n" +
          "**Common Unused Resources:**\n" +
          "```bash\n" +
          "# Unattached EBS volumes\n" +
          "aws ec2 describe-volumes \\\n" +
          "  --filters Name=status,Values=available \\\n" +
          "  --query 'Volumes[*].[VolumeId,Size]' --output table\n" +
          "\n" +
          "# Cost: $0.10 per GB per month\n" +
          "# Example: 100 GB unused = $10/month (doesn't sound like much)\n" +
          "# But if you have 500 GB unused = $50/month = $600/year\n" +
          "\n" +
          "# Unused Elastic IPs\n" +
          "aws ec2 describe-addresses \\\n" +
          "  --query 'Addresses[?AssociationId==null].[PublicIp,AllocationId]' \\\n" +
          "  --output table\n" +
          "\n" +
          "# Cost: $0.005 per hour = $3.60/month per IP\n" +
          "# Common: Teams over-allocate IPs for \"future use\"\n" +
          "\n" +
          "# Unused RDS instances\n" +
          "aws rds describe-db-instances \\\n" +
          "  --query 'DBInstances[*].[DBInstanceIdentifier,DBInstanceClass,Engine]' \\\n" +
          "  --output table\n" +
          "\n" +
          "# Cost: db.t3.small RDS = $30/month minimum\n" +
          "# Multiply by number of dev/test databases\n" +
          "\n" +
          "# Unattached NAT Gateways\n" +
          "aws ec2 describe-nat-gateways \\\n" +
          "  --filter \"Name=state,Values=available\" \\\n" +
          "  --query 'NatGateways[*].[NatGatewayId,State]'\n" +
          "\n" +
          "# Cost: $0.045/hour per NAT = $32/month\n" +
          "# Example: 5 unused NATs = $160/month = $1,920/year\n" +
          "```\n\n" +
          "**Cleanup Automation:**\n" +
          "```python\n" +
          "# cleanup_unused_resources.py\n" +
          "import boto3\n" +
          "from datetime import datetime, timedelta\n" +
          "\n" +
          "ec2 = boto3.client('ec2')\n" +
          "cloudwatch = boto3.client('cloudwatch')\n" +
          "\n" +
          "def find_unused_volumes():\n" +
          "    \"\"\"Find unattached EBS volumes\"\"\"\n" +
          "    response = ec2.describe_volumes(\n" +
          "        Filters=[{'Name': 'status', 'Values': ['available']}]\n" +
          "    )\n" +
          "    \n" +
          "    for volume in response['Volumes']:\n" +
          "        volume_id = volume['VolumeId']\n" +
          "        size = volume['Size']\n" +
          "        created = volume['CreateTime']\n" +
          "        age_days = (datetime.now(created.tzinfo) - created).days\n" +
          "        \n" +
          "        if age_days > 7:  # Older than 1 week\n" +
          "            cost_per_month = size * 0.10\n" +
          "            print(f\"{volume_id}: {size}GB, {age_days} days old, ${cost_per_month:.2f}/month\")\n" +
          "            # ec2.delete_volume(VolumeId=volume_id)  # Uncomment to delete\n" +
          "\n" +
          "def find_unused_ips():\n" +
          "    \"\"\"Find unassociated Elastic IPs\"\"\"\n" +
          "    response = ec2.describe_addresses()\n" +
          "    \n" +
          "    for address in response['Addresses']:\n" +
          "        if 'AssociationId' not in address:\n" +
          "            ip = address['PublicIp']\n" +
          "            alloc_id = address['AllocationId']\n" +
          "            print(f\"{ip} (unused): ~$3.60/month\")\n" +
          "            # ec2.release_address(AllocationId=alloc_id)  # Uncomment to delete\n" +
          "\nif __name__ == '__main__':\n" +
          "    find_unused_volumes()\n" +
          "    find_unused_ips()\n" +
          "```"
      },
      {
        title: 'Auto Scaling Optimization',
        content: 
          "Proper scaling saves 30-40% on compute:\n\n" +
          "**Poor Scaling (Wasteful):**\n" +
          "```\n" +
          "Min: 5 instances (always running, even at 2 AM)\n" +
          "Max: 20 instances\n" +
          "Average usage: 8 instances needed\n" +
          "Cost: 5 instances × $0.0416/hour × 730 hours = $152/month (wasted!)\n" +
          "```\n\n" +
          "**Smart Scaling:**\n" +
          "```\n" +
          "Time-based scaling:\n" +
          "- Business hours (9-17 UTC): Min 5, Max 20\n" +
          "- Evening (17-22 UTC): Min 3, Max 10\n" +
          "- Night (22-9 UTC): Min 1, Max 5\n" +
          "\n" +
          "Metric-based scaling:\n" +
          "- Scale up at 70% CPU\n" +
          "- Scale down at 30% CPU\n" +
          "- Grace period: 5 minutes (avoid flapping)\n" +
          "\n" +
          "Result: More efficient resource usage\n" +
          "```\n\n" +
          "**Implement Time-Based Scaling:**\n" +
          "```bash\n" +
          "# Create scaling schedule\n" +
          "aws autoscaling put-scheduled-action \\\n" +
          "  --auto-scaling-group-name my-asg \\\n" +
          "  --scheduled-action-name scale-up-morning \\\n" +
          "  --recurrence \"0 9 * * MON-FRI\" \\\n" +
          "  --min-size 5 \\\n" +
          "  --max-size 20 \\\n" +
          "  --desired-capacity 8\n" +
          "\n" +
          "aws autoscaling put-scheduled-action \\\n" +
          "  --auto-scaling-group-name my-asg \\\n" +
          "  --scheduled-action-name scale-down-night \\\n" +
          "  --recurrence \"0 22 * * *\" \\\n" +
          "  --min-size 1 \\\n" +
          "  --max-size 5 \\\n" +
          "  --desired-capacity 2\n" +
          "```"
      },
      {
        title: 'Storage Optimization',
        content: 
          "Choose right storage classes for your use case:\n\n" +
          "**S3 Storage Classes Costs:**\n" +
          "```\n" +
          "┌─────────────────────────────────────────────────────────────────┐\n" +
          "│         S3 STORAGE COST PER GB (per month)                     │\n" +
          "├──────────────────────┬──────────┬────────────┬─────────────────┤\n" +
          "│ Class                │ Cost     │ Retrieval  │ Best For        │\n" +
          "├──────────────────────┼──────────┼────────────┼─────────────────┤\n" +
          "│ S3 Standard          │ $0.023   │ Instant    │ Frequent access │\n" +
          "│ S3 Intelligent       │ $0.0125  │ Instant    │ Auto-optimize   │\n" +
          "│ S3 Infrequent (30d)  │ $0.0125  │ Free       │ Backups         │\n" +
          "│ S3 Glacier (90d)     │ $0.004   │ 3-5 min    │ Long-term       │\n" +
          "│ S3 Deep Archive      │ $0.00099 │ 12h        │ Compliance      │\n" +
          "└──────────────────────┴──────────┴────────────┴─────────────────┘\n" +
          "```\n\n" +
          "**Cost Example (1 TB of data):**\n" +
          "```\n" +
          "S3 Standard:    1024 × $0.023 = $23.55/month = $282.60/year\n" +
          "S3 Intelligent: 1024 × $0.0125 = $12.80/month = $153.60/year\n" +
          "S3 Glacier:     1024 × $0.004 = $4.10/month = $49.20/year\n" +
          "\n" +
          "Savings: Use Intelligent-Tiering for 46% reduction!\n" +
          "```\n\n" +
          "**Enable Auto-Tiering:**\n" +
          "```bash\n" +
          "# Automatically moves objects between classes based on access patterns\n" +
          "aws s3api put-bucket-intelligent-tiering-configuration \\\n" +
          "  --bucket my-bucket \\\n" +
          "  --id AutoTierConfig \\\n" +
          "  --intelligent-tiering-configuration '{\n" +
          "    \"Id\": \"AutoTierConfig\",\n" +
          "    \"Filter\": {\"Prefix\": \"\"},\n" +
          "    \"Status\": \"Enabled\",\n" +
          "    \"Tierings\": [\n" +
          "      {\"Days\": 30, \"AccessTier\": \"ARCHIVE_ACCESS\"},\n" +
          "      {\"Days\": 90, \"AccessTier\": \"DEEP_ARCHIVE_ACCESS\"}\n" +
          "    ]\n" +
          "  }'\n" +
          "```\n\n" +
          "**EBS Optimization:**\n" +
          "```bash\n" +
          "# GP2 (general purpose): $0.10/GB/month\n" +
          "# GP3 (newer, same perf): $0.08/GB/month (20% cheaper!)\n" +
          "\n" +
          "# 100 GB volume:\n" +
          "# GP2: $10/month\n" +
          "# GP3: $8/month\n" +
          "# Annual savings: $24\n" +
          "# But scale to 1000 GB: $240/year savings\n" +
          "```"
      }
    ],

    stepByStep: [
      {
        title: 'Step 1: Audit Your Current Spending',
        content: 
          "**Use AWS Cost Explorer:**\n\n" +
          "```bash\n" +
          "# 1. Go to: AWS Console → Cost Management → Cost Explorer\n" +
          "# 2. Filter by date range (last 3 months)\n" +
          "# 3. Group by Service\n" +
          "# 4. Export to CSV\n" +
          "\n" +
          "# Typical breakdown:\n" +
          "- EC2: 35-40%\n" +
          "- Data Transfer: 15-25%\n" +
          "- RDS: 10-15%\n" +
          "- S3: 5-10%\n" +
          "- Other: 5-15%\n" +
          "\n" +
          "# If EC2 is your largest cost, focus there first!\n" +
          "```\n\n" +
          "**Use AWS Trusted Advisor:**\n\n" +
          "```bash\n" +
          "# Automated recommendations (free tier limited):\n" +
          "# - Underutilized EC2 instances\n" +
          "# - Unattached Elastic IP addresses\n" +
          "# - Idle RDS databases\n" +
          "# - Low-utilization EC2 Reserved Instances\n" +
          "\n" +
          "aws support describe-trusted-advisor-checks --query 'checks[*].[id,name]' --output table\n" +
          "```\n\n" +
          "**Create Cost Monitoring Dashboard:**\n\n" +
          "```bash\n" +
          "# Simple CloudWatch dashboard\n" +
          "aws cloudwatch put-metric-alarm \\\n" +
          "  --alarm-name MonthlySpendingAlert \\\n" +
          "  --alarm-description \"Alert when monthly spending exceeds $5000\" \\\n" +
          "  --actions-enabled \\\n" +
          "  --alarm-actions arn:aws:sns:region:account:topic-name\n" +
          "```"
      },
      {
        title: 'Step 2: Purchase Reserved Instances',
        content: 
          "**Analyze Usage Patterns:**\n\n" +
          "```bash\n" +
          "# Get last 30 days of average instance count\n" +
          "aws ec2 describe-instances \\\n" +
          "  --filters \"Name=instance-state-name,Values=running\" \\\n" +
          "  --query 'length(Reservations[*].Instances[*])' \\\n" +
          "  --output text\n" +
          "\n" +
          "# Run this daily for 30 days\n" +
          "# Record results\n" +
          "# Calculate average and baseline\n" +
          "```\n\n" +
          "**Purchase Reserved Instances (AWS Console):**\n\n" +
          "```\n" +
          "1. EC2 → Reserved Instances → Purchase Reserved Instances\n" +
          "2. Choose region\n" +
          "3. Choose instance type (e.g., t3.medium)\n" +
          "4. Choose term (1-year = 36-40%, 3-year = 63%)\n" +
          "5. Choose payment option (all upfront = more discount)\n" +
          "6. Calculate savings\n" +
          "7. Purchase\n" +
          "```\n\n" +
          "**Verify Coverage:**\n\n" +
          "```bash\n" +
          "aws ce get-reservation-coverage \\\n" +
          "  --time-period Start=2024-01-01,End=2024-01-31 \\\n" +
          "  --granularity MONTHLY \\\n" +
          "  --metrics BlendedCost,UsageQuantity\n" +
          "```"
      },
      {
        title: 'Step 3: Rightsize Your Instances',
        content: 
          "**Enable Detailed CloudWatch Monitoring:**\n\n" +
          "```bash\n" +
          "# Enable detailed monitoring (5-minute intervals)\n" +
          "aws ec2 monitor-instances --instance-ids i-0123456789abcdef\n" +
          "\n" +
          "# Cost: $3.50/instance/month\n" +
          "# Worth it if it saves you 1 instance! ✓\n" +
          "```\n\n" +
          "**Collect Metrics:**\n\n" +
          "```bash\n" +
          "# Get CPU utilization for past 2 weeks\n" +
          "aws cloudwatch get-metric-statistics \\\n" +
          "  --namespace AWS/EC2 \\\n" +
          "  --metric-name CPUUtilization \\\n" +
          "  --dimensions Name=InstanceId,Value=i-xyz \\\n" +
          "  --start-time $(date -u -d '14 days ago' +%Y-%m-%dT%H:%M:%S) \\\n" +
          "  --end-time $(date -u +%Y-%m-%dT%H:%M:%S) \\\n" +
          "  --period 86400 \\\n" +
          "  --statistics Average,Maximum,Minimum\n" +
          "\n" +
          "# Analyze results:\n" +
          "# If Average < 20% and Maximum < 50%:\n" +
          "# Can definitely downsize!\n" +
          "```\n\n" +
          "**Use AWS Compute Optimizer:**\n\n" +
          "```bash\n" +
          "# Get recommendations (opt-in required)\n" +
          "aws compute-optimizer get-ec2-instance-recommendations \\\n" +
          "  --query 'instanceRecommendations[*]' \\\n" +
          "  --output table\n" +
          "\n" +
          "# Output includes:\n" +
          "# - Current instance type\n" +
          "# - Recommended instance type\n" +
          "# - Savings estimate\n" +
          "```"
      },
      {
        title: 'Step 4: Clean Up Unused Resources',
        content: 
          "**Automated Cleanup Script:**\n\n" +
          "```python\n" +
          "#!/usr/bin/env python3\n" +
          "# cleanup.py\n" +
          "import boto3\n" +
          "from datetime import datetime, timedelta\n" +
          "\n" +
          "ec2 = boto3.client('ec2')\n" +
          "\n" +
          "def cleanup_unused_volumes():\n" +
          "    print(\"Checking for unused volumes...\")\n" +
          "    response = ec2.describe_volumes(\n" +
          "        Filters=[{'Name': 'status', 'Values': ['available']}]\n" +
          "    )\n" +
          "    \n" +
          "    total_savings = 0\n" +
          "    for volume in response['Volumes']:\n" +
          "        volume_id = volume['VolumeId']\n" +
          "        size = volume['Size']\n" +
          "        monthly_cost = size * 0.10\n" +
          "        \n" +
          "        print(f\"  {volume_id}: {size}GB (${monthly_cost:.2f}/month)\")\n" +
          "        total_savings += monthly_cost\n" +
          "        # ec2.delete_volume(VolumeId=volume_id)\n" +
          "    \n" +
          "    print(f\"  Potential monthly savings: ${total_savings:.2f}\\n\")\n" +
          "\n" +
          "def cleanup_unassociated_ips():\n" +
          "    print(\"Checking for unassociated IPs...\")\n" +
          "    response = ec2.describe_addresses()\n" +
          "    \n" +
          "    total_savings = 0\n" +
          "    for address in response['Addresses']:\n" +
          "        if 'AssociationId' not in address and 'NetworkInterfaceId' not in address:\n" +
          "            ip = address['PublicIp']\n" +
          "            alloc_id = address['AllocationId']\n" +
          "            monthly_cost = 0.005 * 730  # $3.65/month\n" +
          "            \n" +
          "            print(f\"  {ip}: (${monthly_cost:.2f}/month)\")\n" +
          "            total_savings += monthly_cost\n" +
          "            # ec2.release_address(AllocationId=alloc_id)\n" +
          "    \n" +
          "    print(f\"  Potential monthly savings: ${total_savings:.2f}\\n\")\n" +
          "\n" +
          "if __name__ == '__main__':\n" +
          "    cleanup_unused_volumes()\n" +
          "    cleanup_unassociated_ips()\n" +
          "```"
      },
      {
        title: 'Step 5: Implement Cost Tagging',
        content: 
          "**Tag all resources for cost tracking:**\n\n" +
          "```bash\n" +
          "# Essential tags\n" +
          "# - Name: Resource identifier\n" +
          "# - Environment: prod/staging/dev\n" +
          "# - Owner: Team or person responsible\n" +
          "# - CostCenter: For billing/accounting\n" +
          "# - Project: Which project uses this\n" +
          "\n" +
          "# Tag an EC2 instance\n" +
          "aws ec2 create-tags \\\n" +
          "  --resources i-0123456789abcdef \\\n" +
          "  --tags \\\n" +
          "    Key=Name,Value=web-server-1 \\\n" +
          "    Key=Environment,Value=prod \\\n" +
          "    Key=Owner,Value=platform-team \\\n" +
          "    Key=CostCenter,Value=engineering\n" +
          "\n" +
          "# Use in Cost Explorer\n" +
          "# - Group by: Tags (e.g., by Environment)\n" +
          "# - See costs by Environment\n" +
          "# - See which project spends most\n" +
          "# - Hold teams accountable\n" +
          "```\n\n" +
          "**Enable Cost Allocation Tags:**\n\n" +
          "```bash\n" +
          "# AWS Console → Cost Management → Cost Allocation Tags\n" +
          "# Activate tags (takes 24 hours to show in Cost Explorer)\n" +
          "```"
      },
      {
        title: 'Step 6: Set Up Automated Savings',
        content: 
          "**Create a CloudWatch Event to trigger cleanup:**\n\n" +
          "```bash\n" +
          "# Create Lambda function to run cleanup daily\n" +
          "aws lambda create-function \\\n" +
          "  --function-name cleanup-unused-resources \\\n" +
          "  --runtime python3.11 \\\n" +
          "  --handler index.lambda_handler \\\n" +
          "  --role arn:aws:iam::account:role/lambda-role \\\n" +
          "  --zip-file fileb://function.zip\n" +
          "\n" +
          "# Create EventBridge rule (daily at 2 AM UTC)\n" +
          "aws events put-rule \\\n" +
          "  --name cleanup-schedule \\\n" +
          "  --schedule-expression \"cron(0 2 * * ? *)\" \\\n" +
          "  --state ENABLED\n" +
          "\n" +
          "# Trigger Lambda from EventBridge\n" +
          "aws events put-targets \\\n" +
          "  --rule cleanup-schedule \\\n" +
          "  --targets \"Id\"=\"1\",\"Arn\"=\"arn:aws:lambda:...:\",\"RoleArn\"=\"arn:aws:iam::...\"\n" +
          "```\n\n" +
          "**Send Cost Reports Weekly:**\n\n" +
          "```bash\n" +
          "# SNS topic for cost alerts\n" +
          "aws sns create-topic --name cost-alerts\n" +
          "\n" +
          "# Subscribe your team\n" +
          "aws sns subscribe \\\n" +
          "  --topic-arn arn:aws:sns:region:account:cost-alerts \\\n" +
          "  --protocol email \\\n" +
          "  --notification-endpoint team@example.com\n" +
          "```"
      }
    ],

    commonMistakes: [
      "**Ignoring unused resources** - Check weekly for orphaned resources",
      "**Not using Reserved Instances** - Leaves 30-40% savings on the table",
      "**Wrong instance types** - Most common: too much memory, too much CPU",
      "**No scaling policies** - Running peak capacity 24/7",
      "**Expensive regions** - US-East-1 vs Af-South-1 costs differ 5x",
      "**No S3 lifecycle policies** - Old objects sit in S3 Standard forever",
      "**NAT Gateway abuse** - Data transfer costs add up quickly",
      "**Oversized RDS instances** - db.r5.2xlarge when db.t3.small works"
    ],

    bestPractices: [
      "**Reserve baseline capacity** - 80% reserved, 20% on-demand for peaks",
      "**Right-size everything** - Match resources to actual usage",
      "**Monitor and adjust** - Monthly review of spending and trends",
      "**Use reserved instances** - 36-63% savings is substantial",
      "**Enable lifecycle policies** - S3 Glacier for archives",
      "**Tag everything** - Track costs by project, team, or cost center",
      "**Automate cleanup** - Delete unused resources daily",
      "**Negotiate annual** - Get 3-year discounts for committing"
    ],

    realWorldExample: 
      "**Cost Optimization Case Study: Startup Saves $60K/Year**\n\n" +
      "Initial situation:\n" +
      "- 50-person company\n" +
      "- Monthly AWS bill: $8,000\n" +
      "- No cost monitoring\n" +
      "- Lots of dev/test infrastructure left running\n\n" +
      "Audit findings:\n" +
      "```\n" +
      "Issue                        | Cost    | Solution\n" +
      "═════════════════════════════╪═════════╪════════════════════════════\n" +
      "Unused dev RDS databases     | $800    | Delete dev DBs, use AWS RDS Proxy\n" +
      "Oversized instances          | $1,200  | Downsize t3.large → t3.small\n" +
      "Unused Elastic IPs           | $180    | Release 50 unused IPs\n" +
      "No Reserved Instances        | $2,000  | Purchase 1-year RI for baseline\n" +
      "NAT Gateway data transfer    | $600    | Optimize VPC routing\n" +
      "S3 storage optimization      | $400    | Enable Intelligent-Tiering\n" +
      "Unused EBS volumes           | $250    | Delete 5 year-old snapshots\n" +
      "└─────────────────────────────┴─────────┴────────────────────────────\n" +
      "Total monthly savings: $5,400\n" +
      "Annual savings: $60,000 (25% reduction!)\n" +
      "```\n\n" +
      "Implementation timeline:\n" +
      "```\n" +
      "Month 1: Audit + quick wins (unused resources) = $800 saved\n" +
      "Month 2: Purchase RIs + rightsize = $2,000 saved\n" +
      "Month 3: S3 optimization + NAT fixes = $700 saved\n" +
      "Month 4+: Ongoing monitoring = $5,400/month saved\n" +
      "```",

    summary: 
      "## 📝 Key Takeaways\n\n" +
      "1. **Audit first** - Know where your money goes\n" +
      "2. **Reserve capacity** - 36-63% savings for committed usage\n" +
      "3. **Rightsize instances** - 15-25% savings from proper sizing\n" +
      "4. **Delete unused resources** - 20-30% of spending is waste\n" +
      "5. **Use correct storage classes** - 45-60% savings with Intelligent-Tiering\n" +
      "6. **Smart auto-scaling** - Peak capacity only when needed\n" +
      "7. **Tag everything** - Track costs by project/team\n" +
      "8. **Monitor continuously** - Weekly or monthly reviews",

    nextSteps: 
      "**What's Next?**\n\n" +
      "You've mastered cost optimization! Continue with:\n" +
      "- **FinOps**: Financial operations for cloud\n" +
      "- **Multi-Cloud Strategy**: Reduce vendor lock-in\n" +
      "- **Sustainability**: Reduce carbon footprint\n" +
      "- **Chargeback Models**: Allocate costs fairly"
  },

  'multi-cloud-basics-gcp-azure-overview': {
    introduction: 
      "AWS dominates the cloud market with 32% share, but that doesn't mean you should ignore Google Cloud (10%) and Azure (23%). In fact, many companies use multiple clouds strategically.\n\n" +
      "Netflix uses AWS and GCP. Twitter uses multiple clouds. Spotify uses GCP and AWS. Why? Because:\n\n" +
      "1. **Vendor diversity** - Avoid being locked into one vendor\n" +
      "2. **Regional availability** - Some regions only exist on one cloud\n" +
      "3. **Cost arbitrage** - Shop around for better pricing\n" +
      "4. **Specialized services** - GCP excels at BigQuery (data), Azure at enterprise integration\n" +
      "5. **Negotiation power** - Multi-cloud allows you to negotiate better contracts\n\n" +
      "In this lesson, you'll learn the basics of Google Cloud and Azure, understand how they compare to AWS, and know when to use each cloud. By the end, you'll be able to architect multi-cloud solutions and avoid common pitfalls.",

    whyItMatters: 
      "**Why Multi-Cloud Matters:**\n\n" +
      "1. **Reduced risk** - Single cloud failure doesn't mean downtime\n" +
      "2. **Better negotiation** - Multiple clouds = leverage in contracts\n" +
      "3. **Use right tool** - Each cloud excels at different things\n" +
      "4. **Regional coverage** - Deploy where users are\n" +
      "5. **Cost savings** - 15-30% savings by choosing right cloud for workload\n\n" +
      "**Cloud Market Share (2024):**\n" +
      "```\n" +
      "┌────────────────────────────────────────────────────────────────┐\n" +
      "│           CLOUD PROVIDER MARKET SHARE                         │\n" +
      "├──────────────┬──────────┬─────────────────────────────────────┤\n" +
      "│ Provider     │ Share    │ Key Strengths                       │\n" +
      "├──────────────┼──────────┼─────────────────────────────────────┤\n" +
      "│ AWS          │ 32%      │ Broadest services, mature, stable   │\n" +
      "│ Azure        │ 23%      │ Enterprise integration, Microsoft   │\n" +
      "│ GCP          │ 10%      │ Data/AI, BigQuery, Kubernetes       │\n" +
      "│ Others       │ 35%      │ Alibaba, Oracle, IBM, etc          │\n" +
      "└──────────────┴──────────┴─────────────────────────────────────┘\n" +
      "```\n\n" +
      "**When to Use Each Cloud:**\n" +
      "```\n" +
      "┌──────────────────────────────────────────────────────────────────────┐\n" +
      "│               USE CASE MATCHING                                      │\n" +
      "├────────────────────┬─────────────┬─────────────┬────────────────────┤\n" +
      "│ Workload Type      │ AWS         │ Azure       │ GCP                │\n" +
      "├────────────────────┼─────────────┼─────────────┼────────────────────┤\n" +
      "│ Enterprise Apps    │ Good        │ Best ✓      │ Fair               │\n" +
      "│ Data Analytics     │ Good        │ Fair        │ Best ✓ (BigQuery) │\n" +
      "│ Machine Learning   │ Good        │ Fair        │ Best ✓             │\n" +
      "│ Kubernetes         │ Good (EKS)  │ Good (AKS)  │ Best ✓ (GKE)      │\n" +
      "│ General Purpose    │ Best ✓      │ Good        │ Good               │\n" +
      "│ Gaming             │ Best ✓      │ Fair        │ Fair               │\n" +
      "└────────────────────┴─────────────┴─────────────┴────────────────────┘\n" +
      "```"
  ,

    concepts: [
      {
        title: 'Google Cloud Platform (GCP)',
        content: 
          "**GCP Core Services:**\n\n" +
          "GCP is owned by Google and optimized for data, analytics, and AI workloads.\n\n" +
          "**Compute (like EC2 on AWS):**\n" +
          "```\n" +
          "┌────────────────────────────────────────────────────────┐\n" +
          "│            GCP COMPUTE OPTIONS                        │\n" +
          "├──────────────┬──────────┬────────────────────────────┤\n" +
          "│ Service      │ Cost     │ Best For                   │\n" +
          "├──────────────┼──────────┼────────────────────────────┤\n" +
          "│ Compute Eng. │ $0.025/h │ VMs (like EC2)            │\n" +
          "│ App Engine   │ $0.05/h  │ Serverless apps (like Λ)  │\n" +
          "│ GKE          │ Free     │ Kubernetes (you pay nodes) │\n" +
          "│ Cloud Run    │ $0.00002 | Cloud functions           │\n" +
          "└──────────────┴──────────┴────────────────────────────┘\n" +
          "```\n\n" +
          "**Storage (like S3 on AWS):**\n" +
          "```bash\n" +
          "# Cloud Storage = S3 equivalent\n" +
          "# Standard: $0.020/GB (similar to AWS S3)\n" +
          "# Nearline: $0.010/GB (infrequent access)\n" +
          "# Coldline: $0.004/GB\n" +
          "# Archive: $0.0012/GB\n" +
          "\n" +
          "# Create bucket\n" +
          "gsutil mb gs://my-bucket\n" +
          "\n" +
          "# Upload file\n" +
          "gsutil cp file.txt gs://my-bucket/\n" +
          "\n" +
          "# Download\n" +
          "gsutil cp gs://my-bucket/file.txt .\n" +
          "```\n\n" +
          "**Databases:**\n" +
          "```bash\n" +
          "# Cloud SQL = RDS equivalent\n" +
          "# PostgreSQL, MySQL, SQL Server\n" +
          "\n" +
          "# Firestore = NoSQL (like DynamoDB)\n" +
          "# Real-time database for web/mobile\n" +
          "\n" +
          "# BigQuery = Data warehouse\n" +
          "# Google's specialty! SQL queries on massive datasets\n" +
          "# No infrastructure to manage\n" +
          "# Pay per TB scanned ($6.25/TB)\n" +
          "```\n\n" +
          "**Big Data & AI (GCP's Advantage):**\n" +
          "```bash\n" +
          "# BigQuery: Query 1 TB in seconds\n" +
          "# Dataflow: Beam pipeline service\n" +
          "# Vertex AI: Machine learning platform\n" +
          "# Dataproc: Managed Spark/Hadoop\n" +
          "# TensorFlow: Open source ML (Google created it)\n" +
          "```"
      },
      {
        title: 'Microsoft Azure',
        content: 
          "**Azure Core Services:**\n\n" +
          "Azure is Microsoft's cloud, deeply integrated with Windows/Office/SQL Server ecosystem.\n\n" +
          "**Compute (like EC2 on AWS):**\n" +
          "```\n" +
          "┌────────────────────────────────────────────────────────┐\n" +
          "│            AZURE COMPUTE OPTIONS                      │\n" +
          "├──────────────┬──────────┬────────────────────────────┤\n" +
          "│ Service      │ Cost     │ Best For                   │\n" +
          "├──────────────┼──────────┼────────────────────────────┤\n" +
          "│ Virtual Mach | $0.012/h | VMs (like EC2)            │\n" +
          "│ App Service  │ $10-100  | Serverless apps (PaaS)    │\n" +
          "│ AKS          │ Free     │ Kubernetes                │\n" +
          "│ Functions    │ $0.20M   | Functions (like Lambda)   │\n" +
          "└──────────────┴──────────┴────────────────────────────┘\n" +
          "```\n\n" +
          "**Storage (like S3 on AWS):**\n" +
          "```bash\n" +
          "# Blob Storage = S3 equivalent\n" +
          "# Hot tier: $0.0184/GB (frequent access)\n" +
          "# Cool tier: $0.01/GB (infrequent)\n" +
          "# Archive: $0.002/GB\n" +
          "\n" +
          "# Upload using Azure CLI\n" +
          "az storage blob upload \\\n" +
          "  --account-name myaccount \\\n" +
          "  --container-name mycontainer \\\n" +
          "  --name myblob \\\n" +
          "  --file file.txt\n" +
          "```\n\n" +
          "**Databases:**\n" +
          "```bash\n" +
          "# Azure SQL Database = RDS\n" +
          "# Fully managed SQL Server\n" +
          "# Automatic backups, patching\n" +
          "\n" +
          "# Cosmos DB = Multi-model NoSQL\n" +
          "# Like DynamoDB but with more features\n" +
          "# Global distribution built-in\n" +
          "\n" +
          "# Azure Database for PostgreSQL\n" +
          "# Open source option\n" +
          "```\n\n" +
          "**Azure's Strength: Enterprise Integration**\n" +
          "```bash\n" +
          "# Microsoft Office/365/Teams integration\n" +
          "# SQL Server + Windows Server\n" +
          "# Active Directory / Azure AD\n" +
          "# Seamless for enterprises using Microsoft stack\n" +
          "\n" +
          "# Perfect for:\n" +
          "# - Companies standardized on Windows/SQL\n" +
          "# - Enterprise applications\n" +
          "# - Office 365 integration\n" +
          "# - Hybrid cloud (on-prem + cloud)\n" +
          "```"
      },
      {
        title: 'Cloud Comparison: AWS vs GCP vs Azure',
        content: 
          "**Head-to-Head Comparison:**\n\n" +
          "```\n" +
          "┌────────────────┬──────────────┬──────────────┬──────────────┐\n" +
          "│ Feature        │ AWS          │ Azure        │ GCP          │\n" +
          "├────────────────┼──────────────┼──────────────┼──────────────┤\n" +
          "│ Services       │ 200+         │ 200+         │ 150+         │\n" +
          "│ Regions        │ 33           │ 60           │ 40           │\n" +
          "│ VM Cost        │ $0.0416/h    │ $0.012/h     │ $0.025/h     │\n" +
          "│ Learning Curve │ Steeper      │ Moderate     │ Moderate     │\n" +
          "│ Documentation  │ Best ✓       │ Good         │ Good         │\n" +
          "│ Pricing        │ Complex      │ Complex      │ Simple ✓     │\n" +
          "│ Enterprise     │ Good         │ Best ✓       │ Good         │\n" +
          "│ Data/AI        │ Good         │ Good         │ Best ✓       │\n" +
          "│ Support        │ Good         │ Best ✓       │ Good         │\n" +
          "│ Community      │ Largest ✓    │ Medium       │ Growing      │\n" +
          "└────────────────┴──────────────┴──────────────┴──────────────┘\n" +
          "```\n\n" +
          "**Cost Comparison (1 Year):**\n\n" +
          "```bash\n" +
          "# Identical workload: 10 t3.medium instances (AWS pricing)\n" +
          "\n" +
          "AWS (10 × t3.medium reserved 1yr):\n" +
          "  10 × $0.0250/hour × 730 hours = $1,825/month\n" +
          "\n" +
          "Azure (10 × General Purpose reserved 1yr):\n" +
          "  10 × $0.012/hour × 730 hours = $876/month (52% cheaper!)\n" +
          "\n" +
          "GCP (10 × n1-standard-1 committed):\n" +
          "  10 × $0.022/hour × 730 hours = $1,606/month\n" +
          "\n" +
          "Winner for pure compute: Azure (cheapest)\n" +
          "Winner for features: AWS (most mature)\n" +
          "Winner for data: GCP (BigQuery)\n" +
          "```"
      },
      {
        title: 'Multi-Cloud Architecture Patterns',
        content: 
          "**Pattern 1: Multi-Region (Single Cloud)**\n\n" +
          "```\n" +
          "┌─────────────────────────────────────────────────────────┐\n" +
          "│              MULTI-REGION SINGLE CLOUD                 │\n" +
          "│                                                         │\n" +
          "│  User USA          User EU           User APAC          │\n" +
          "│      │                 │                 │              │\n" +
          "│      ├─────────────────┴─────────────────┤              │\n" +
          "│      │                                   │              │\n" +
          "│   us-east-1            eu-west-1      ap-southeast-1   │\n" +
          "│   (App running)        (App running)   (App running)    │\n" +
          "│      │                 │                 │              │\n" +
          "│      └─────────────────┬─────────────────┘              │\n" +
          "│                        │                                │\n" +
          "│              RDS (Global Database)                      │\n" +
          "│              Data replicated across regions             │\n" +
          "│                                                         │\n" +
          "│  Benefits:                                             │\n" +
          "│  ✓ Low latency for users worldwide                     │\n" +
          "│  ✓ High availability (region failure = failover)       │\n" +
          "│  ✓ Disaster recovery built-in                          │\n" +
          "│  ✗ Still vendor lock-in (single cloud)                 │\n" +
          "└─────────────────────────────────────────────────────────┘\n" +
          "```\n\n" +
          "**Pattern 2: Multi-Cloud (Different Clouds)**\n\n" +
          "```\n" +
          "┌──────────────────────────────────────────────────────────┐\n" +
          "│               MULTI-CLOUD PATTERN                        │\n" +
          "│                                                          │\n" +
          "│  AWS (Primary)        │        GCP (Backup/Analytics)    │\n" +
          "│  - Web servers        │        - BigQuery (data)         │\n" +
          "│  - Databases          │        - Machine learning        │\n" +
          "│  - CDN                │        - Batch processing        │\n" +
          "│                       │                                  │\n" +
          "│  Azure (Compute)      │                                  │\n" +
          "│  - Batch jobs         │                                  │\n" +
          "│  - Archival storage   │                                  │\n" +
          "│  - Dev/Test           │                                  │\n" +
          "│                                                          │\n" +
          "│              API Gateway / Load Balancer                │\n" +
          "│              (Routes traffic intelligently)              │\n" +
          "│                                                          │\n" +
          "│  Benefits:                                              │\n" +
          "│  ✓ Use best tool for each job                          │\n" +
          "│  ✓ Vendor independence                                 │\n" +
          "│  ✓ Cost optimization (shop around)                     │\n" +
          "│  ✗ Complexity (multiple consoles, APIs, teams)         │\n" +
          "│  ✗ Data transfer costs (between clouds)                │\n" +
          "└──────────────────────────────────────────────────────────┘\n" +
          "```\n\n" +
          "**Pattern 3: Hybrid Cloud (On-Prem + Cloud)**\n\n" +
          "```\n" +
          "On-Premises Datacenter    │    Cloud Provider(s)\n" +
          "────────────────────────────────────────────────\n" +
          "Database Server           │    \n" +
          "Legacy App (cannot move)  │    ↔ VPN/ExpressRoute ↔ Web App\n" +
          "File Storage              │                        API Server\n" +
          "                          │    Database Replica\n" +
          "\n" +
          "Use case:\n" +
          "- Cannot migrate legacy systems\n" +
          "- Need disaster recovery\n" +
          "- Compliance requires on-prem backup\n" +
          "- Gradual cloud migration\n" +
          "```"
      },
      {
        title: 'Avoiding Multi-Cloud Pitfalls',
        content: 
          "**Pitfall 1: Data Transfer Costs**\n\n" +
          "```bash\n" +
          "# Moving data between clouds = EXPENSIVE\n" +
          "# AWS to GCP egress: $0.02/GB\n" +
          "# GCP to Azure egress: $0.02/GB\n" +
          "\n" +
          "# Example: 1 TB daily data transfer\n" +
          "1000 GB × $0.02 = $20/day = $600/month!\n" +
          "\n" +
          "# Solution: Minimize inter-cloud data movement\n" +
          "# - Process data on source cloud\n" +
          "# - Only move results\n" +
          "# - Use cloud-native connectors when possible\n" +
          "```\n\n" +
          "**Pitfall 2: Skill Gap**\n\n" +
          "```\n" +
          "Problem:\n" +
          "- Your team knows AWS\n" +
          "- Adding GCP/Azure = learning curve\n" +
          "- Mistakes = downtime\n" +
          "- Slow deployment\n" +
          "\n" +
          "Solution:\n" +
          "- Use infrastructure-as-code (Terraform)\n" +
          "- Terraform works on all clouds!\n" +
          "- Abstracts cloud-specific differences\n" +
          "- Team learns Terraform once\n" +
          "```\n\n" +
          "**Pitfall 3: Complexity**\n\n" +
          "```\n" +
          "Problem:\n" +
          "- 3 cloud consoles to manage\n" +
          "- 3 billing statements\n" +
          "- 3 security models\n" +
          "- Debugging across clouds = nightmare\n" +
          "\n" +
          "Solution:\n" +
          "- Use observability platform (DataDog, New Relic)\n" +
          "- Unified dashboard across clouds\n" +
          "- Centralized logging\n" +
          "- Cost visibility tool\n" +
          "```"
      }
    ],

    stepByStep: [
      {
        title: 'Step 1: Understand Your Current Cloud',
        content: 
          "**If on AWS:**\n\n" +
          "```bash\n" +
          "# Audit current AWS usage\n" +
          "aws ec2 describe-instances --query 'Reservations[*].Instances[*].[InstanceType,State.Name]' --output table\n" +
          "\n" +
          "# List databases\n" +
          "aws rds describe-db-instances --query 'DBInstances[*].[DBInstanceIdentifier,DBInstanceClass]' --output table\n" +
          "\n" +
          "# List S3 buckets and sizes\n" +
          "aws s3 ls --summarize --human-readable --recursive\n" +
          "```\n\n" +
          "**If on Azure:**\n\n" +
          "```bash\n" +
          "# Login to Azure\n" +
          "az login\n" +
          "\n" +
          "# List VMs\n" +
          "az vm list --output table\n" +
          "\n" +
          "# List databases\n" +
          "az sql server list --output table\n" +
          "```\n\n" +
          "**Document:**\n" +
          "- Current workloads\n" +
          "- Data volume\n" +
          "- Network requirements\n" +
          "- Compliance requirements"
      },
      {
        title: 'Step 2: Evaluate Multi-Cloud Candidates',
        content: 
          "**Ask These Questions:**\n\n" +
          "1. **What's expensive today?**\n" +
          "   - Compute? (Try Azure, 40% cheaper)\n" +
          "   - Data? (Try GCP BigQuery)\n" +
          "   - Storage? (Try Azure Archive)\n\n" +
          "2. **What's missing?**\n" +
          "   - Analytics? (GCP BigQuery is best)\n" +
          "   - Enterprise integration? (Azure wins)\n" +
          "   - Kubernetes? (All equal, GCP slightly better)\n\n" +
          "3. **Where are users?**\n" +
          "   - Asia? (Multiple clouds have better latency)\n" +
          "   - Europe? (Both AWS and Azure strong)\n\n" +
          "**Comparison Matrix:**\n" +
          "```\n" +
          "┌──────────────┬───────────┬────────────┬───────────┐\n" +
          "│ Criteria     │ AWS Score │ Azure      │ GCP Score │\n" +
          "├──────────────┼───────────┼────────────┼───────────┤\n" +
          "│ Compute Cost │ 7/10      │ 9/10 ✓     │ 8/10      │\n" +
          "│ Analytics    │ 8/10      │ 7/10       │ 10/10 ✓   │\n" +
          "│ Enterprise   │ 8/10      │ 10/10 ✓    │ 7/10      │\n" +
          "│ Regions      │ 9/10      │ 10/10 ✓    │ 8/10      │\n" +
          "│ Kubernetes   │ 8/10      │ 8/10       │ 9/10 ✓    │\n" +
          "│ Support      │ 8/10      │ 9/10 ✓     │ 7/10      │\n" +
          "│ Community    │ 10/10 ✓   │ 7/10       │ 8/10      │\n" +
          "└──────────────┴───────────┴────────────┴───────────┘\n" +
          "```"
      },
      {
        title: 'Step 3: Start with Terraform (Infrastructure as Code)',
        content: 
          "**Why Terraform for Multi-Cloud?**\n\n" +
          "```hcl\n" +
          "# Same Terraform code = works on AWS, Azure, GCP!\n" +
          "# Just change the provider\n" +
          "\n" +
          "# main.tf\n" +
          "terraform {\n" +
          "  required_providers {\n" +
          "    aws = {\n" +
          "      source  = \"hashicorp/aws\"\n" +
          "      version = \"~> 5.0\"\n" +
          "    }\n" +
          "  }\n" +
          "}\n" +
          "\n" +
          "provider \"aws\" {\n" +
          "  region = \"us-east-1\"\n" +
          "}\n" +
          "\n" +
          "# Create EC2 instance\n" +
          "resource \"aws_instance\" \"web\" {\n" +
          "  ami           = \"ami-0c55b159cbfafe1f0\"\n" +
          "  instance_type = \"t3.micro\"\n" +
          "  \n" +
          "  tags = {\n" +
          "    Name = \"web-server\"\n" +
          "  }\n" +
          "}\n" +
          "```\n\n" +
          "**To Deploy on GCP Instead:**\n\n" +
          "```hcl\n" +
          "# Change provider\n" +
          "provider \"google\" {\n" +
          "  project = \"my-project\"\n" +
          "  region  = \"us-central1\"\n" +
          "}\n" +
          "\n" +
          "# Same resource, different cloud!\n" +
          "resource \"google_compute_instance\" \"web\" {\n" +
          "  name         = \"web-server\"\n" +
          "  machine_type = \"n1-standard-1\"\n" +
          "  zone         = \"us-central1-a\"\n" +
          "\n" +
          "  boot_disk {\n" +
          "    initialize_params {\n" +
          "      image = \"debian-cloud/debian-11\"\n" +
          "    }\n" +
          "  }\n" +
          "}\n" +
          "```"
      },
      {
        title: 'Step 4: Implement Multi-Cloud Observability',
        content: 
          "**Unified Monitoring Across Clouds:**\n\n" +
          "```bash\n" +
          "# Option 1: Datadog (popular)\n" +
          "# Integrates with AWS, Azure, GCP\n" +
          "# Single dashboard for all clouds\n" +
          "# Cost: $15/host/month\n" +
          "\n" +
          "# Option 2: New Relic\n" +
          "# Also supports all clouds\n" +
          "# Cost: $100-300/month for small team\n" +
          "\n" +
          "# Option 3: Open source (Prometheus + Grafana)\n" +
          "# Self-hosted\n" +
          "# Cost: Time to set up\n" +
          "```\n\n" +
          "**Set Up Cross-Cloud Monitoring:**\n\n" +
          "```bash\n" +
          "# AWS CloudWatch Agent\n" +
          "# Installs on EC2 instances\n" +
          "# Sends metrics to Datadog\n" +
          "\n" +
          "# Azure Monitor Agent\n" +
          "# Sends to same Datadog workspace\n" +
          "\n" +
          "# GCP Ops Agent\n" +
          "# Also to Datadog\n" +
          "\n" +
          "# Result: Single console showing all clouds\n" +
          "```"
      },
      {
        title: 'Step 5: Plan Data Strategy',
        content: 
          "**Minimize Inter-Cloud Data Movement:**\n\n" +
          "```\n" +
          "Bad Architecture (expensive data transfer):\n" +
          "┌──────────────────────────────────────────────────────┐\n" +
          "│ AWS Instance ──→ Transfer 1TB/day ──→ GCP BigQuery  │\n" +
          "│ Cost: 1000 GB × $0.02 × 30 days = $600/month!       │\n" +
          "└──────────────────────────────────────────────────────┘\n" +
          "\n" +
          "Good Architecture (process on source):\n" +
          "┌──────────────────────────────────────────────────────┐\n" +
          "│ AWS Instance                                         │\n" +
          "│   ├─ Extract interesting data (100 GB/day)          │\n" +
          "│   └─ Transfer only summary ──→ GCP BigQuery         │\n" +
          "│ Cost: 100 GB × $0.02 × 30 days = $60/month!        │\n" +
          "│ Savings: 90%! ✓                                      │\n" +
          "└──────────────────────────────────────────────────────┘\n" +
          "```\n\n" +
          "**Data Strategy:**\n" +
          "1. Keep data on source cloud\n" +
          "2. Process locally (compute is cheaper than transfer)\n" +
          "3. Move results only\n" +
          "4. Consider databases that replicate cheaply"
      }
    ],

    commonMistakes: [
      "**Moving too much data between clouds** - Data transfer is expensive, process locally instead",
      "**Underestimating complexity** - Multi-cloud increases ops burden 3x",
      "**No unified monitoring** - Can't see problems across clouds",
      "**Ignoring vendor differences** - Each cloud is different, plan for it",
      "**Over-committing resources** - Reserved instances on wrong cloud",
      "**No disaster recovery plan** - Multi-cloud should improve DR, not complicate it",
      "**Team not trained** - AWS/Azure/GCP knowledge doesn't transfer perfectly",
      "**Vendor lock-in anyway** - Use services specific to one cloud = lock-in"
    ],

    bestPractices: [
      "**Use Terraform for all IaC** - Works on all clouds, reduces learning curve",
      "**Centralized monitoring** - One dashboard for all clouds (Datadog, New Relic, etc)",
      "**Clear workload placement** - Know why each workload is on each cloud",
      "**Standardize on Kubernetes** - Works on AWS/Azure/GCP, platform independence",
      "**Minimize inter-cloud data flow** - Process data where it lives",
      "**Automated backups** - Every cloud to every other cloud",
      "**Cost allocation tags** - Track spending by project across clouds",
      "**Regular audits** - Review monthly what's running where and why"
    ],

    realWorldExample: 
      "**Case Study: E-commerce Multi-Cloud Setup**\n\n" +
      "Architecture:\n" +
      "```\n" +
      "AWS:\n" +
      "- Primary web servers (ECS)\n" +
      "- Product catalog (RDS)\n" +
      "- CDN (CloudFront)\n" +
      "- Cost: $5,000/month\n" +
      "\n" +
      "GCP:\n" +
      "- Batch analytics (BigQuery)\n" +
      "- ML recommendations (Vertex AI)\n" +
      "- Data warehouse\n" +
      "- Cost: $2,000/month\n" +
      "\n" +
      "Azure:\n" +
      "- Dev/Test environments\n" +
      "- Archive storage\n" +
      "- Backup databases\n" +
      "- Cost: $1,000/month\n" +
      "\n" +
      "Total: $8,000/month\n" +
      "```\n\n" +
      "Benefits:\n" +
      "- 30% cost savings vs single cloud\n" +
      "- Using best-of-breed: AWS for web, GCP for analytics, Azure for enterprise\n" +
      "- Vendor independence: Can negotiate better rates\n" +
      "- Disaster recovery: If AWS fails, can failover to Azure\n" +
      "\n" +
      "Challenges overcome:\n" +
      "- Data transfer: Limited to 10GB daily exports from AWS to GCP (~$6/month)\n" +
      "- Complexity: Used Terraform + Kubernetes to standardize\n" +
      "- Monitoring: Implemented Datadog across all clouds\n" +
      "- Team skills: Kubernetes abstracts cloud differences"
    ,

    summary: 
      "## 📝 Key Takeaways\n\n" +
      "1. **Each cloud excels at different things** - AWS is broadest, GCP best for data, Azure for enterprise\n" +
      "2. **Cost can vary 50%+** - Azure compute is cheaper, GCP has BigQuery, AWS has maturity\n" +
      "3. **Use Terraform for infrastructure** - Makes multi-cloud manageable\n" +
      "4. **Kubernetes abstracts differences** - Deploy on any cloud\n" +
      "5. **Data transfer is expensive** - Process on source cloud, move results only\n" +
      "6. **Start with one cloud, add others strategically** - Don't overwhelm yourself\n" +
      "7. **Unified monitoring is essential** - See everything in one place\n" +
      "8. **Vendor independence reduces risk** - Can negotiate better, avoid lock-in",

    nextSteps: 
      "**What's Next?**\n\n" +
      "You understand multi-cloud basics! Continue with:\n" +
      "- **Kubernetes**: Platform-agnostic container orchestration\n" +
      "- **Terraform**: Infrastructure as Code for all clouds\n" +
      "- **FinOps**: Financial operations across clouds\n" +
      "- **Capstone**: Build a multi-cloud DevOps platform"
  }
};

// Generate comprehensive lesson content
export function generateDetailedContent(
  lessonSlug: string,
  title: string,
  description: string,
  objectives: string[],
  codeExamples: Array<{language: string; code: string; title?: string}>
): string {
  const details = lessonDetails[lessonSlug];
  
  let content = `# ${title}\n\n`;
  
  if (details) {
    // Use detailed content if available
    content += details.introduction + '\n\n';
    
    content += '---\n\n';
    content += '## 📌 Why This Matters\n\n';
    content += details.whyItMatters + '\n\n';
    
    content += '---\n\n';
    content += '## 🎯 Learning Objectives\n\n';
    content += 'By the end of this lesson, you will be able to:\n\n';
    objectives.forEach((obj, i) => {
      content += `${i + 1}. ${obj}\n`;
    });
    content += '\n---\n\n';
    
    content += '## 📚 Core Concepts\n\n';
    details.concepts.forEach(concept => {
      content += `### ${concept.title}\n\n`;
      content += concept.content + '\n\n';
    });
    
    content += '---\n\n';
    content += '## 🛠️ Hands-On Practice\n\n';
    details.stepByStep.forEach(step => {
      content += `### ${step.title}\n\n`;
      content += step.content + '\n\n';
    });
    
    content += '---\n\n';
    content += '## ⚠️ Common Mistakes to Avoid\n\n';
    details.commonMistakes.forEach(mistake => {
      content += `- ${mistake}\n`;
    });
    content += '\n';
    
    content += '---\n\n';
    content += '## ✅ Best Practices\n\n';
    details.bestPractices.forEach(practice => {
      content += `- ${practice}\n`;
    });
    content += '\n';
    
    content += '---\n\n';
    content += '## 🌍 Real-World Application\n\n';
    content += details.realWorldExample + '\n\n';
    
    content += '---\n\n';
    content += details.summary + '\n\n';
    
    content += '---\n\n';
    content += '## ➡️ Next Steps\n\n';
    content += details.nextSteps + '\n';
    
  } else {
    // Fallback for lessons without detailed content
    content += description + '\n\n';
    
    content += '## 🎯 Learning Objectives\n\n';
    objectives.forEach((obj, i) => {
      content += `${i + 1}. ${obj}\n`;
    });
    content += '\n';
    
    if (codeExamples && codeExamples.length > 0) {
      content += '## 💻 Code Examples\n\n';
      codeExamples.forEach(example => {
        if (example.title) {
          content += `### ${example.title}\n\n`;
        }
        content += '```' + example.language + '\n';
        content += example.code + '\n';
        content += '```\n\n';
      });
    }
  }
  
  return content;
}

export default lessonDetails;
