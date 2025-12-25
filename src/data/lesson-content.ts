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
  'kubernetes-architecture': {
    introduction:
      "Kubernetes can feel confusing at first because it's not just a tool — it's a distributed system with its own control plane, APIs, and reconciliation loops. The goal of this lesson is to make Kubernetes feel predictable: you tell the cluster what you want (desired state), and Kubernetes continuously works to make reality match that desired state.\n\n" +
      "By the end of this lesson you will understand what runs where (control plane vs nodes), how requests flow through the API server, and why Kubernetes is so resilient in production.",

    whyItMatters:
      "**Why Kubernetes Architecture Matters in Real DevOps Work:**\n\n" +
      "1. **Troubleshooting**: When Pods won't schedule or crash, the fix is usually tied to a specific component (scheduler, kubelet, DNS, CNI).\n" +
      "2. **Reliability**: Knowing the control plane helps you design for HA, upgrades, and disaster recovery.\n" +
      "3. **Security**: RBAC, admission, and API access are core to preventing incidents.\n" +
      "4. **Cost & performance**: Understanding the node side (kubelet/runtime) helps tune resources and capacity.\n\n" +
      "Think of Kubernetes like an airport: the **control plane** is air traffic control (decides what should happen), and **nodes** are the runways/gates (where workloads actually run).",

    concepts: [
      {
        title: 'The Desired State Model (Reconciliation)',
        content:
          "Kubernetes is a **reconciliation system**. You declare what you want (e.g., 3 replicas of an API), and controllers continuously compare desired state to actual state. If a Pod dies, Kubernetes creates a new one because the desired state still says \"3 replicas\".\n\n" +
          "This is why Kubernetes is different from running a script once — it is always converging toward your target configuration."
      },
      {
        title: 'Control Plane Components (What They Do)',
        content:
          "The control plane is responsible for cluster decisions and state:\n\n" +
          "- **kube-apiserver**: front door for all requests (kubectl, controllers, operators).\n" +
          "- **etcd**: the database that stores the cluster state (the source of truth).\n" +
          "- **kube-scheduler**: chooses which node a Pod should run on.\n" +
          "- **kube-controller-manager**: runs controllers (Deployment controller, Node controller, etc.).\n\n" +
          "If you're debugging: scheduling problems often point to the scheduler; weird state inconsistencies can involve etcd/API server."
      },
      {
        title: 'Node Components (Where Workloads Run)',
        content:
          "Each node runs the components needed to execute Pods:\n\n" +
          "- **kubelet**: node agent that talks to the API server and ensures containers are running.\n" +
          "- **container runtime**: containerd / CRI-O (actually runs containers).\n" +
          "- **kube-proxy**: implements Service networking (iptables/ipvs rules).\n" +
          "- **CNI plugin**: provides Pod networking (Calico/Cilium/Weave/etc.).\n\n" +
          "When a Pod is \"Running\" but networking fails, the root cause is commonly CNI/kube-proxy/DNS."
      },
      {
        title: 'Kubernetes API Objects (The "Vocabulary")',
        content:
          "Everything in Kubernetes is an API object: **Pods**, **Deployments**, **Services**, **ConfigMaps**, **Secrets**, **Ingress**, etc.\n\n" +
          "Two practical rules:\n" +
          "1) Prefer managing higher-level controllers (Deployments/StatefulSets) instead of raw Pods.\n" +
          "2) Use labels consistently — labels are how Services and controllers select the right Pods."
      }
    ],

    stepByStep: [
      {
        title: 'Practice 1: Create a Local Cluster and Explore the Control Plane',
        content:
          "Run this sequence and narrate what you see:\n\n" +
          "```bash\n" +
          "minikube start --driver=docker\n" +
          "kubectl cluster-info\n" +
          "kubectl get nodes -o wide\n" +
          "kubectl get pods -n kube-system\n" +
          "kubectl get events -A | head -50\n" +
          "```\n\n" +
          "**What to notice:** kube-system contains the system Pods; events show scheduler decisions and failures."
      },
      {
        title: 'Practice 2: Understand Namespaces and Contexts',
        content:
          "Namespaces are safety boundaries and organization. Contexts are how kubectl chooses a cluster/user/namespace.\n\n" +
          "```bash\n" +
          "kubectl create namespace dev\n" +
          "kubectl config set-context --current --namespace=dev\n" +
          "kubectl get pods\n" +
          "kubectl get pods -n kube-system\n" +
          "```\n\n" +
          "If you ever \"lose\" your resources, you're often looking in the wrong namespace."
      },
      {
        title: 'Practice 3: Use kubectl explain (Built-in Docs)',
        content:
          "kubectl can teach you the schema of any object:\n\n" +
          "```bash\n" +
          "kubectl explain deployment\n" +
          "kubectl explain deployment.spec\n" +
          "kubectl explain deployment.spec.template.spec.containers\n" +
          "```"
      }
    ],

    commonMistakes: [
      "Treating Kubernetes like a one-time script (it continuously reconciles)",
      "Editing a live Pod directly instead of the controller (Deployment/StatefulSet)",
      "Forgetting namespaces (resources exist but you're looking elsewhere)",
      "Ignoring events (they often tell you the real failure reason)",
      "Assuming 'Running' means 'healthy' (you need readiness/liveness probes)"
    ],

    bestPractices: [
      "Use Deployments/StatefulSets/DaemonSets — avoid standalone Pods in production",
      "Standardize labels (app, component, environment, version)",
      "Use RBAC least-privilege for cluster access",
      "Always check events and describe output when debugging",
      "Document your cluster add-ons (CNI, Ingress, DNS, storage driver)"
    ],

    realWorldExample:
      "**Scenario: Pods won't schedule**\n\n" +
      "A deployment is stuck in Pending. A fast, architecture-informed checklist:\n\n" +
      "```bash\n" +
      "kubectl get pods\n" +
      "kubectl describe pod <pod>\n" +
      "kubectl get events --sort-by=.metadata.creationTimestamp | tail -50\n" +
      "kubectl get nodes -o wide\n" +
      "kubectl top nodes\n" +
      "```\n\n" +
      "If the scheduler can't find a node, you'll see messages like insufficient CPU/memory, taints, or missing node labels.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. Kubernetes reconciles desired state continuously\n" +
      "2. API server + etcd are the brain and memory of the cluster\n" +
      "3. Scheduler places Pods; controllers keep state converging\n" +
      "4. Nodes run kubelet/runtime and implement networking\n" +
      "5. Events + describe are your primary debugging tools",

    nextSteps:
      "Next, you'll deploy real workloads with Deployments/Services, add probes, and learn scaling and rollout strategies."
  },

  'core-workloads-resources': {
    introduction:
      "In this lesson you'll learn the Kubernetes workload building blocks that power nearly every production platform: Pods, Deployments, ReplicaSets, Jobs, and the configuration primitives ConfigMaps and Secrets.\n\n" +
      "The goal is not just to run a container — it's to run it **reliably**, **repeatably**, and **safely** with health checks, updates, and scaling.",

    whyItMatters:
      "**Why Core Workloads Matter:**\n\n" +
      "- A Deployment gives you safe rollouts and self-healing.\n" +
      "- Probes prevent sending traffic to broken pods.\n" +
      "- ConfigMaps/Secrets decouple configuration from images.\n" +
      "- Jobs/CronJobs cover migrations, batch processing, and scheduled tasks.\n\n" +
      "Mastering these objects is the difference between \"it runs on my laptop\" and \"it survives production.\"",

    concepts: [
      {
        title: 'Pods vs Controllers',
        content:
          "A **Pod** is the smallest scheduling unit (one or more containers that share network + volumes).\n" +
          "A **controller** (Deployment/StatefulSet/DaemonSet) manages Pods for you.\n\n" +
          "In production, you almost always create controllers — not naked Pods."
      },
      {
        title: 'Deployments and Rollouts',
        content:
          "Deployments manage ReplicaSets and provide rolling updates and rollbacks.\n\n" +
          "Important knobs:\n" +
          "- replicas\n" +
          "- rollingUpdate.maxSurge / maxUnavailable\n" +
          "- revisionHistoryLimit\n" +
          "- rollout pause/resume\n\n" +
          "If you can rollback confidently, you can ship faster."
      },
      {
        title: 'Probes (Readiness, Liveness, Startup)',
        content:
          "- **Readiness**: \"Should this pod receive traffic?\"\n" +
          "- **Liveness**: \"Is this pod stuck and needs restart?\"\n" +
          "- **Startup**: \"Allow long startups without killing the pod early.\"\n\n" +
          "Common production pattern: use startupProbe for slow boot, readinessProbe for traffic gating, livenessProbe for deadlocks."
      },
      {
        title: 'ConfigMaps and Secrets',
        content:
          "Use **ConfigMaps** for non-sensitive settings and **Secrets** for passwords/tokens/keys.\n\n" +
          "You can mount them as files or inject as environment variables. Changing a ConfigMap doesn't automatically restart Pods unless you roll them."
      },
      {
        title: 'Jobs and CronJobs',
        content:
          "Jobs are for one-time workloads like database migrations. CronJobs schedule Jobs (backups, reports, cleanups).\n\n" +
          "Key settings:\n" +
          "- backoffLimit\n" +
          "- activeDeadlineSeconds\n" +
          "- concurrencyPolicy\n" +
          "- history limits"
      }
    ],

    stepByStep: [
      {
        title: 'Practice 1: Deploy a Simple App with a Deployment + Service',
        content:
          "Goal: run 3 replicas, expose internally, and verify endpoints.\n\n" +
          "```bash\n" +
          "kubectl create deployment web --image=nginx --replicas=3\n" +
          "kubectl expose deployment web --port=80 --target-port=80\n" +
          "kubectl get deploy,rs,pods,svc -o wide\n" +
          "kubectl port-forward svc/web 8080:80\n" +
          "```\n\n" +
          "Open http://localhost:8080 to confirm it serves traffic."
      },
      {
        title: 'Practice 2: Rolling Update + Rollback',
        content:
          "```bash\n" +
          "kubectl set image deployment/web nginx=nginx:1.27\n" +
          "kubectl rollout status deployment/web\n" +
          "kubectl rollout history deployment/web\n" +
          "kubectl rollout undo deployment/web\n" +
          "```\n\n" +
          "You should be able to rollback within seconds — this is core production muscle memory."
      },
      {
        title: 'Practice 3: Add Configuration via ConfigMap',
        content:
          "```bash\n" +
          "kubectl create configmap app-config --from-literal=LOG_LEVEL=info\n" +
          "kubectl get configmap app-config -o yaml\n" +
          "```\n\n" +
          "Then mount it or inject it in a Deployment spec. Validate it inside the container with `kubectl exec ... -- env`."
      }
    ],

    commonMistakes: [
      "Using livenessProbe to check external dependencies (causes restart storms)",
      "Hardcoding config inside the image instead of ConfigMaps/Secrets",
      "Updating an image without watching rollout status",
      "Forgetting resource requests/limits (scheduler can't place pods or nodes get overcommitted)",
      "Creating Pods directly and losing them on node restart"
    ],

    bestPractices: [
      "Always set resource requests/limits for production workloads",
      "Use readinessProbe to gate traffic, livenessProbe for deadlocks, startupProbe for slow boot",
      "Rollout changes with `kubectl rollout status` open",
      "Prefer immutable image tags (or pin by digest) for reproducibility",
      "Keep config out of images; rotate secrets regularly"
    ],

    realWorldExample:
      "**Scenario: Zero-downtime deploy**\n\n" +
      "A safe deploy recipe:\n" +
      "1) Ensure readinessProbe is correct\n" +
      "2) Set maxUnavailable=0\n" +
      "3) Roll out\n" +
      "4) Monitor errors and rollback if needed\n\n" +
      "This is how teams deploy frequently without fear.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. Controllers manage Pods for reliability\n" +
      "2. Probes prevent broken traffic and restart deadlocks\n" +
      "3. ConfigMaps/Secrets decouple config from builds\n" +
      "4. Rollouts + rollbacks are standard operating procedure\n" +
      "5. Jobs/CronJobs cover batch + scheduled operations",

    nextSteps:
      "Next you'll learn Services, Ingress, DNS, and NetworkPolicies to connect workloads safely across the cluster."
  },

  'networking-service-discovery': {
    introduction:
      "Kubernetes networking is one of the biggest \"aha\" moments for learners: every Pod gets an IP, Services provide stable virtual IPs, and DNS makes service discovery feel natural.\n\n" +
      "In this lesson you'll learn how traffic flows from the outside world to your Pods, how services route requests, and how to lock traffic down with NetworkPolicies.",

    whyItMatters:
      "**Why Networking & Service Discovery Matters:**\n\n" +
      "- Services are the foundation of microservice communication.\n" +
      "- Ingress controls how users reach your apps (routing + TLS).\n" +
      "- NetworkPolicies are your primary tool to reduce blast radius in a breach.\n" +
      "- DNS issues are among the most common cluster outages.\n\n" +
      "If you can debug \"can't connect\" problems quickly, you become invaluable in production.",

    concepts: [
      {
        title: 'Pod-to-Pod Networking and CNI',
        content:
          "Kubernetes relies on a CNI plugin so that Pods can reach each other (usually without NAT) across nodes.\n\n" +
          "If pods cannot communicate, investigate CNI status and node networking first."
      },
      {
        title: 'Services and Endpoints',
        content:
          "A Service selects Pods using labels and provides a stable name/IP. The actual backends are stored as Endpoints/EndpointSlices.\n\n" +
          "If a Service routes to nothing, check:\n" +
          "- selector labels match pods\n" +
          "- pods are Ready\n" +
          "- endpoints exist"
      },
      {
        title: 'Ingress (Routing + TLS)',
        content:
          "Ingress is a set of rules; an Ingress Controller (like NGINX) enforces them.\n\n" +
          "Ingress typically handles:\n" +
          "- host/path routing\n" +
          "- TLS termination\n" +
          "- rewrites/timeouts/body limits"
      },
      {
        title: 'CoreDNS and Service Discovery',
        content:
          "CoreDNS provides DNS records like `service.namespace.svc.cluster.local`.\n\n" +
          "When DNS fails, apps appear " +
          "\"down\" even if pods are healthy. Always verify DNS resolution during incidents."
      },
      {
        title: 'NetworkPolicies (Default Deny)',
        content:
          "Without NetworkPolicies, most clusters allow all pod-to-pod traffic by default.\n\n" +
          "A strong security baseline is **default deny** and then explicitly allow required flows (frontend→api, api→db, DNS)."
      }
    ],

    stepByStep: [
      {
        title: 'Practice 1: Verify Service Discovery via DNS',
        content:
          "Create a Service and resolve it from a debug pod:\n\n" +
          "```bash\n" +
          "kubectl create deployment api --image=nginx --replicas=2\n" +
          "kubectl expose deployment api --port=80\n" +
          "kubectl run dns-test --image=busybox --rm -it --restart=Never -- nslookup api\n" +
          "```\n\n" +
          "If nslookup fails, inspect CoreDNS pods in kube-system."
      },
      {
        title: 'Practice 2: Debug a Service That Has No Endpoints',
        content:
          "Intentionally break labels and see what happens:\n\n" +
          "```bash\n" +
          "kubectl get pods --show-labels\n" +
          "kubectl get endpoints api -o yaml\n" +
          "kubectl describe svc api\n" +
          "```\n\n" +
          "Fix by aligning Service selectors with Pod labels."
      },
      {
        title: 'Practice 3: Apply a Default-Deny NetworkPolicy',
        content:
          "Apply a deny policy and then allow only what you need. Watch traffic break and then recover after allow rules. This teaches real security boundaries."
      }
    ],

    commonMistakes: [
      "Creating an Ingress without installing an Ingress Controller",
      "Service selector labels don't match pod labels (no endpoints)",
      "Assuming DNS is always healthy; not checking CoreDNS",
      "Blocking DNS with NetworkPolicies (apps suddenly can't resolve anything)",
      "Using NodePort/LoadBalancer unnecessarily when ClusterIP + Ingress is enough"
    ],

    bestPractices: [
      "Standardize labels and selectors across teams",
      "Use a dedicated debug image (netshoot) for incident response",
      "Adopt default-deny + allow-lists via NetworkPolicies",
      "Treat Ingress as a controlled gateway (TLS, auth, rate limiting as needed)",
      "Monitor CoreDNS and networking add-ons as first-class components"
    ],

    realWorldExample:
      "**Scenario: 'Service is down' but pods are running**\n\n" +
      "Common causes include: Service has zero endpoints, DNS failures, NetworkPolicy blocks, or Ingress misconfiguration. A fast debug loop is `describe svc`, `get endpoints`, `nslookup`, then `curl` from a netshoot pod.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. CNI provides pod networking\n" +
      "2. Services give stable routing to pods\n" +
      "3. Ingress + controller enables HTTP routing and TLS\n" +
      "4. CoreDNS is critical for service discovery\n" +
      "5. NetworkPolicies reduce blast radius",

    nextSteps:
      "Next you'll learn persistent storage (PV/PVC/StorageClasses) and how to run stateful apps safely."
  },

  'storage-persistence': {
    introduction:
      "Stateless workloads are easy: delete the Pod and nothing important is lost. Stateful workloads (databases, queues, file stores) require persistence and careful identity. Kubernetes supports this via PVs/PVCs/StorageClasses and StatefulSets.\n\n" +
      "This lesson teaches how Kubernetes attaches durable storage to Pods, how dynamic provisioning works, and how to run databases safely.",

    whyItMatters:
      "**Why Storage Matters:**\n\n" +
      "- Production apps depend on data; losing volumes means losing business.\n" +
      "- StatefulSets provide stable identity and ordering.\n" +
      "- StorageClasses let you choose performance/cost profiles (gp3 vs io2, SSD vs HDD).\n" +
      "- Backups and snapshots are essential for recovery.\n\n" +
      "Most outages are survivable — data loss is what becomes catastrophic.",

    concepts: [
      {
        title: 'PV, PVC, and StorageClass',
        content:
          "- **PV**: the actual piece of storage (or abstraction)\n" +
          "- **PVC**: a claim/request for storage by a workload\n" +
          "- **StorageClass**: defines how volumes are provisioned (dynamic provisioning)\n\n" +
          "Workloads should reference PVCs, not PVs. Kubernetes binds the PVC to a suitable PV automatically."
      },
      {
        title: 'Access Modes and Volume Binding',
        content:
          "Access modes (RWO, ROX, RWX) determine how many nodes can mount a volume.\n\n" +
          "`WaitForFirstConsumer` is important in cloud clusters: it provisions volumes in the same zone as the scheduled Pod."
      },
      {
        title: 'StatefulSets (Stable Identity)',
        content:
          "StatefulSets give Pods stable names (postgres-0, postgres-1) and stable volume attachments via volumeClaimTemplates.\n\n" +
          "They are designed for databases and clustered systems where identity matters."
      },
      {
        title: 'Backups and Snapshots',
        content:
          "Snapshots are not a replacement for logical backups. A strong strategy usually includes:\n" +
          "- regular logical backups (pg_dump)\n" +
          "- volume snapshots for fast recovery\n" +
          "- tested restore procedures"
      }
    ],

    stepByStep: [
      {
        title: 'Practice 1: Create a PVC and Mount It into a Pod',
        content:
          "Goal: write a file, delete the Pod, recreate it, and confirm data persists (with proper storage).\n\n" +
          "Start by creating a StorageClass (or use the default), then create a PVC and mount it."
      },
      {
        title: 'Practice 2: Deploy a StatefulSet Database',
        content:
          "Deploy a PostgreSQL StatefulSet with a headless Service. Verify that each replica gets its own PVC and stable network identity."
      },
      {
        title: 'Practice 3: Expand a PVC (If Supported)',
        content:
          "If `allowVolumeExpansion` is enabled on the StorageClass, patch the PVC size and observe the resizing process."
      }
    ],

    commonMistakes: [
      "Assuming emptyDir is persistent (it is deleted with the Pod)",
      "Using the wrong access mode (RWX vs RWO) for the workload",
      "Deleting a PVC without understanding reclaimPolicy",
      "Running databases without backups and restore drills",
      "Not using headless services for StatefulSets (breaks stable DNS)"
    ],

    bestPractices: [
      "Use StatefulSets for identity-dependent apps (DBs, queues)",
      "Choose StorageClasses based on workload needs (latency/IOPS/cost)",
      "Enable encryption and backups for production volumes",
      "Test restores regularly (the only backup that matters is one you can restore)",
      "Keep PVCs and snapshots visible in dashboards and alerts"
    ],

    realWorldExample:
      "**Scenario: Database pod rescheduled to another node**\n\n" +
      "With a proper PVC, the same volume re-attaches when the pod moves (within the same zone constraints). Without it, your data disappears. This is why storage primitives are non-negotiable for production systems.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. PVCs are the contract between apps and storage\n" +
      "2. StorageClasses enable dynamic provisioning\n" +
      "3. StatefulSets provide stable identity + storage\n" +
      "4. Snapshots help recovery; backups + restore drills ensure safety",

    nextSteps:
      "Next you'll apply these foundations to production-grade patterns: operators, observability, and security for stateful workloads."
  },

  'terraform-basics': {
    introduction:
      "Terraform is Infrastructure as Code (IaC): you describe infrastructure using configuration files, and Terraform creates/updates/destroys resources to match that description.\n\n" +
      "This lesson focuses on the mental model: providers, resources, state, and the plan/apply workflow. When you understand these, Terraform becomes predictable instead of scary.",

    whyItMatters:
      "**Why Terraform Matters for DevOps:**\n\n" +
      "1. **Repeatability**: build the same environment (dev/staging/prod) without manual clicks.\n" +
      "2. **Safety**: `terraform plan` shows changes before they happen.\n" +
      "3. **Auditability**: your infrastructure changes live in Git history.\n" +
      "4. **Scale**: manage hundreds of resources reliably.\n" +
      "5. **Multi-cloud**: the same workflow works across AWS/GCP/Azure and SaaS providers.\n\n" +
      "If Kubernetes is how you run apps, Terraform is how you build the world those apps run in.",

    concepts: [
      {
        title: 'Providers, Resources, and Data Sources',
        content:
          "- **Provider**: plugin Terraform uses to talk to an API (AWS, GitHub, Cloudflare).\n" +
          "- **Resource**: something Terraform manages (VPC, subnet, bucket).\n" +
          "- **Data source**: something Terraform reads (existing AMI, existing VPC).\n\n" +
          "Rule of thumb: use resources to create/manage; use data sources to look up existing infrastructure."
      },
      {
        title: 'The Workflow: init → plan → apply',
        content:
          "- `terraform init`: downloads providers and configures backend\n" +
          "- `terraform plan`: calculates what will change (safe preview)\n" +
          "- `terraform apply`: executes the plan\n\n" +
          "In mature teams, **apply is gated** (review + approval) while plan runs automatically in CI."
      },
      {
        title: 'Terraform State (Why It Exists)',
        content:
          "State is how Terraform knows what it created and how real resources map to configuration.\n\n" +
          "Without state, Terraform can't safely compute diffs or update resources. That's why state must be protected, backed up, and usually stored remotely for teams."
      },
      {
        title: 'Variables, Locals, Outputs',
        content:
          "- **Variables** make code reusable across environments\n" +
          "- **Locals** help you avoid repetition and standardize naming/tags\n" +
          "- **Outputs** expose useful values (VPC ID, endpoint URLs)\n\n" +
          "A good Terraform codebase reads like a clear API: inputs in, infrastructure out."
      }
    ],

    stepByStep: [
      {
        title: 'Practice 1: Your First Plan (No Apply Yet)',
        content:
          "Create a small config with one provider and one resource, then run:\n\n" +
          "```bash\n" +
          "terraform init\n" +
          "terraform fmt -recursive\n" +
          "terraform validate\n" +
          "terraform plan\n" +
          "```\n\n" +
          "The win here is understanding what Terraform *intends* to do before it touches anything."
      },
      {
        title: 'Practice 2: Apply, Inspect, Destroy',
        content:
          "Once you are confident in the plan, apply it, then inspect state:\n\n" +
          "```bash\n" +
          "terraform apply\n" +
          "terraform state list\n" +
          "terraform show\n" +
          "terraform destroy\n" +
          "```\n\n" +
          "Destroy is part of the learning loop — it proves your infrastructure is reproducible."
      }
    ],

    commonMistakes: [
      "Skipping `plan` and going straight to `apply`",
      "Storing state locally while collaborating with others",
      "Not pinning provider versions (surprise upgrades)",
      "Hardcoding environment-specific values instead of variables",
      "Treating state as disposable (it is critical system data)"
    ],

    bestPractices: [
      "Always run `fmt` + `validate` before plan/apply",
      "Pin provider versions and Terraform required_version",
      "Use remote state + locking for any team usage",
      "Prefer small modules and clear inputs/outputs",
      "Review plans in PRs before applying"
    ],

    realWorldExample:
      "**Scenario: Safe production change**\n\n" +
      "A typical workflow: developer opens PR → CI runs fmt/validate/plan → reviewers inspect the plan output → after approval, a controlled job runs `terraform apply` using the same plan artifact.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. Providers connect Terraform to APIs\n" +
      "2. Plan/apply is a safe preview + execution workflow\n" +
      "3. State is essential — protect it\n" +
      "4. Variables/locals/outputs make code reusable and clean",

    nextSteps:
      "Next you'll learn modules and best practices so your Terraform stays maintainable as it grows."
  },

  'terraform-modules-best-practices': {
    introduction:
      "Modules are how Terraform scales from " +
      "\"a few resources\" to \"a platform\". A module is a reusable package of Terraform code with inputs and outputs — like a function for infrastructure.\n\n" +
      "In this lesson you'll learn how to design modules that are reusable, versionable, and easy for other engineers to consume.",

    whyItMatters:
      "**Why Modules + Best Practices Matter:**\n\n" +
      "- Avoid duplication (copy/paste drift)\n" +
      "- Enforce standards (tags, naming, logging, encryption)\n" +
      "- Make changes safer (versioned modules)\n" +
      "- Enable teams to move faster with shared building blocks\n\n" +
      "Good modules turn infrastructure into a product.",

    concepts: [
      {
        title: 'Module Interface: Inputs and Outputs',
        content:
          "A module should expose only what consumers need. If a module has 60 variables, it's often a sign the abstraction is unclear.\n\n" +
          "Design guidance:\n" +
          "- inputs: environment, name, tags, sizing\n" +
          "- outputs: resource IDs, endpoints, security group IDs\n" +
          "- internal details stay hidden"
      },
      {
        title: 'Versioning and Reproducibility',
        content:
          "Always pin module versions (git tag or registry version).\n\n" +
          "Unpinned modules are like running production on \"latest\" — eventually it will break when the upstream changes."
      },
      {
        title: 'Folder Structure for Multi-Environment',
        content:
          "A common, maintainable structure is:\n" +
          "- modules/ (reusable building blocks)\n" +
          "- envs/dev, envs/prod (composition of modules)\n\n" +
          "Keep environment-specific values in tfvars, not inside modules."
      },
      {
        title: 'Quality Gates (Lint + Security)',
        content:
          "Terraform should be treated like application code:\n" +
          "- format\n" +
          "- validate\n" +
          "- lint\n" +
          "- security scan\n\n" +
          "This prevents common mistakes (open security groups, unencrypted buckets, etc.)."
      }
    ],

    stepByStep: [
      {
        title: 'Practice 1: Build a Simple VPC Module',
        content:
          "Create modules/vpc with variables.tf, main.tf, outputs.tf.\n\n" +
          "Then consume it from envs/dev and envs/prod using different CIDRs and tags."
      },
      {
        title: 'Practice 2: Pin Module Versions',
        content:
          "If using Git-based modules, pin by tag (`ref=v1.2.3`) or commit SHA.\n\n" +
          "Then update the tag deliberately and inspect the plan diff before applying."
      },
      {
        title: 'Practice 3: Add Input Validation',
        content:
          "Add validation blocks to prevent invalid CIDRs, disallowed environments, or insecure defaults.\n\n" +
          "This is how you embed guardrails into modules so others can’t shoot themselves in the foot."
      }
    ],

    commonMistakes: [
      "Putting environment-specific logic inside modules instead of env composition",
      "Not pinning module versions",
      "Designing mega-modules that do too much",
      "No documentation for inputs/outputs",
      "Skipping lint/security scans"
    ],

    bestPractices: [
      "Keep modules small, focused, and composable",
      "Pin versions for modules and providers",
      "Use standard tags + naming via locals",
      "Add validations and sane defaults",
      "Automate fmt/validate/lint/security in CI"
    ],

    realWorldExample:
      "**Scenario: Shared 'platform' modules**\n\n" +
      "A platform team maintains a module for VPC + logging + encryption defaults. Application teams use it with 5 variables. Security improves while delivery speed increases.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. Modules are reusable infrastructure building blocks\n" +
      "2. Good interfaces are small and well-documented\n" +
      "3. Version pinning is required for reproducibility\n" +
      "4. CI quality gates prevent expensive mistakes",

    nextSteps:
      "Next you'll learn remote state, locking, and team collaboration patterns for Terraform at scale."
  },

  'state-management-collaboration': {
    introduction:
      "Terraform state is the most misunderstood part of Terraform — and the most important for teams. State is what allows Terraform to know what exists, what changed, and what needs to change next.\n\n" +
      "This lesson teaches safe state patterns: remote state, locking, bootstrapping, and how teams avoid stepping on each other.",

    whyItMatters:
      "**Why State Management Matters:**\n\n" +
      "- Prevents two engineers from applying conflicting changes\n" +
      "- Enables collaboration and CI-driven plans\n" +
      "- Protects you from data loss and configuration drift\n\n" +
      "Treat state like production data: back it up, lock it, and control access.",

    concepts: [
      {
        title: 'Remote State + Locking',
        content:
          "Remote state backends (S3, Terraform Cloud) store state centrally. Locking prevents concurrent applies.\n\n" +
          "Without locking, two applies can race and corrupt or overwrite changes."
      },
      {
        title: 'Environment Separation',
        content:
          "The safest pattern is separate state per environment (dev/prod) and often per stack (network/app/data).\n\n" +
          "This reduces blast radius and keeps plans readable."
      },
      {
        title: 'Imports and Refactors',
        content:
          "Import brings existing resources under Terraform control. Refactoring requires moving state addresses safely (state mv or moved blocks).\n\n" +
          "Never delete state entries casually — understand the impact first."
      },
      {
        title: 'Drift Detection',
        content:
          "Drift happens when someone changes resources outside Terraform. Use `plan` and refresh-only plans to detect it.\n\n" +
          "In mature environments, direct console changes are either forbidden or heavily audited."
      }
    ],

    stepByStep: [
      {
        title: 'Practice 1: Configure a Remote Backend',
        content:
          "Set up a backend config and run `terraform init -reconfigure`.\n\n" +
          "Then confirm the state is being written remotely and not locally."
      },
      {
        title: 'Practice 2: Simulate Team Safety (Locking)',
        content:
          "In one terminal start an apply and keep it running. In another, try to apply again. You should see a lock error.\n\n" +
          "This demonstrates why locking exists and prevents destructive races."
      },
      {
        title: 'Practice 3: Import an Existing Resource',
        content:
          "Create or identify an existing resource, add a matching Terraform resource block, then import it.\n\n" +
          "After import, run `plan` to ensure Terraform matches reality."
      }
    ],

    commonMistakes: [
      "Committing state files into Git",
      "Using local state while multiple people apply",
      "Forcing unlock without verifying the lock is truly stale",
      "Mixing dev and prod into one state file",
      "Manual console changes that cause drift"
    ],

    bestPractices: [
      "Use remote state + locking for any shared environment",
      "Use separate state per env/stack for smaller blast radius",
      "Limit apply permissions; prefer plan-only in PRs",
      "Enable versioning/encryption on state storage",
      "Automate drift detection in CI"
    ],

    realWorldExample:
      "**Scenario: Two engineers applied at the same time**\n\n" +
      "Without locking, one apply overwrote part of the other's changes, causing an outage. With proper remote state + locking, the second apply would have been blocked and forced a review of changes first.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. State is critical to Terraform correctness\n" +
      "2. Remote state + locking enables safe collaboration\n" +
      "3. Separate environments and stacks to reduce blast radius\n" +
      "4. Handle imports/refactors carefully",

    nextSteps:
      "Next you'll learn advanced Terraform patterns to reduce repetition and write safer, scalable configurations."
  },

  'advanced-terraform-patterns': {
    introduction:
      "Advanced Terraform is about writing code that stays readable as complexity grows. The core tools are expressions (`for`, `if`), iteration (`for_each`, `count`), dynamic blocks, and safety features like lifecycle rules and preconditions.\n\n" +
      "This lesson will teach you how to model real infrastructure patterns without copy/paste and without creating fragile configurations.",

    whyItMatters:
      "**Why Advanced Patterns Matter:**\n\n" +
      "- Reduce duplicated code (fewer bugs)\n" +
      "- Make refactors safer (stable keys, moved blocks)\n" +
      "- Add guardrails (preconditions, validations)\n" +
      "- Improve rollout safety (lifecycle rules)\n\n" +
      "These are the techniques used in production IaC repos.",

    concepts: [
      {
        title: 'for_each vs count',
        content:
          "Use `for_each` when identity matters (named things like subnets). Use `count` when you truly just need N of something.\n\n" +
          "`for_each` is usually more stable during changes because keys remain consistent even if you add/remove items."
      },
      {
        title: 'Dynamic Blocks',
        content:
          "Dynamic blocks generate repeated nested configuration (like many ingress rules) without copy/paste.\n\n" +
          "They’re powerful but can reduce readability — use them when repetition is significant."
      },
      {
        title: 'Lifecycle and Safety',
        content:
          "Lifecycle rules can prevent outages:\n" +
          "- `create_before_destroy` for replacements\n" +
          "- `prevent_destroy` for critical resources\n" +
          "- `ignore_changes` for fields managed elsewhere\n\n" +
          "Use them intentionally: too much ignore_changes can hide drift."
      },
      {
        title: 'Preconditions and Validations',
        content:
          "Preconditions stop dangerous plans early (e.g., prevent a prod stack from running with 1 instance).\n\n" +
          "They turn tribal knowledge into enforced rules."
      },
      {
        title: 'Refactoring Without Pain',
        content:
          "Use `moved` blocks or `terraform state mv` to rename resources safely.\n\n" +
          "Avoid destroying/recreating resources just because you renamed something."
      }
    ],

    stepByStep: [
      {
        title: 'Practice 1: Replace count with for_each',
        content:
          "Take a resource created with count and convert it to for_each with stable keys. Then run plan and confirm Terraform does not want to recreate everything (or uses moved blocks to map addresses)."
      },
      {
        title: 'Practice 2: Add Preconditions for Production Safety',
        content:
          "Add a precondition that enforces HA in prod. Run plan with invalid values and confirm Terraform fails early with a clear message."
      },
      {
        title: 'Practice 3: Apply lifecycle rules responsibly',
        content:
          "Use prevent_destroy for a critical bucket and see how it blocks accidental deletions. Use create_before_destroy for a resource replacement to minimize downtime."
      }
    ],

    commonMistakes: [
      "Using count for keyed resources (causes address shifting and unexpected replacement)",
      "Overusing dynamic blocks and making configs unreadable",
      "Adding ignore_changes too broadly (hides real drift)",
      "Using provisioners for everything (fragile; prefer cloud-init, user_data, or configuration tools)",
      "Refactoring by delete/recreate instead of moved/state mv"
    ],

    bestPractices: [
      "Prefer for_each for stable resource identity",
      "Keep expressions readable; use locals for complex transformations",
      "Use preconditions/validations for guardrails",
      "Use lifecycle rules for safety — sparingly and intentionally",
      "Refactor with moved blocks to preserve resources"
    ],

    realWorldExample:
      "**Scenario: Refactor a shared module used by 20 repos**\n\n" +
      "A safe refactor plan: release a new module version, add moved blocks for address changes, run plan in each repo, and upgrade gradually. This prevents destructive recreation across environments.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. for_each is usually safer than count\n" +
      "2. Dynamic blocks reduce repetition\n" +
      "3. Lifecycle + preconditions add safety\n" +
      "4. moved blocks enable safe refactors",

    nextSteps:
      "Next, apply these patterns in real stacks and integrate Terraform into CI/CD with plan reviews and controlled applies."
  },
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
      },
      {
        title: 'Step 7: Hands-On Lab — Blue-Green Cutover Drill (Local Cluster)',
        content:
          "This lab makes blue-green *real*. You will deploy two versions side-by-side and switch traffic instantly.\n\n" +
          "**Goal:** practice the cutover + rollback procedure like you would in production.\n\n" +
          "### 7.1 Create a local cluster\n\n" +
          "```bash\n" +
          "# Option A: kind\n" +
          "kind create cluster --name bg-lab\n" +
          "kubectl cluster-info\n" +
          "\n" +
          "# Option B: minikube\n" +
          "# minikube start --driver=docker\n" +
          "```\n\n" +
          "### 7.2 Deploy two versions\n\n" +
          "Use two Deployments with a shared Service selector key (`version=blue|green`). You can use any simple HTTP image (nginx, hashicorp/http-echo, etc.).\n\n" +
          "```bash\n" +
          "kubectl create ns prod\n" +
          "\n" +
          "kubectl -n prod create deploy app-blue --image=nginx:1.27\n" +
          "kubectl -n prod label deploy app-blue app=myapp version=blue\n" +
          "kubectl -n prod expose deploy app-blue --name app --port 80 --target-port 80\n" +
          "kubectl -n prod patch svc app -p '{\"spec\":{\"selector\":{\"app\":\"myapp\",\"version\":\"blue\"}}}'\n" +
          "\n" +
          "kubectl -n prod create deploy app-green --image=nginx:1.25\n" +
          "kubectl -n prod label deploy app-green app=myapp version=green\n" +
          "kubectl -n prod get deploy,svc,pods -o wide\n" +
          "```\n\n" +
          "### 7.3 Verify and cut over\n\n" +
          "```bash\n" +
          "kubectl -n prod port-forward svc/app 8080:80\n" +
          "# In another terminal:\n" +
          "curl -fsS http://localhost:8080 >/dev/null && echo OK\n" +
          "\n" +
          "# Cutover: blue → green\n" +
          "kubectl -n prod patch svc app -p '{\"spec\":{\"selector\":{\"app\":\"myapp\",\"version\":\"green\"}}}'\n" +
          "\n" +
          "# Rollback: green → blue\n" +
          "kubectl -n prod patch svc app -p '{\"spec\":{\"selector\":{\"app\":\"myapp\",\"version\":\"blue\"}}}'\n" +
          "```\n\n" +
          "**What you learned:** the mechanism is simple (selector switch), but the discipline is operational: verify, cut over, watch, rollback if needed." 
      },
      {
        title: 'Step 8: Hands-On Lab — Canary With Gates (Manual, Then Automated)',
        content:
          "Canary is risk reduction through *progressive exposure*. Start manual, then automate gates.\n\n" +
          "### 8.1 Manual canary with two Services\n\n" +
          "In a real setup you would shift traffic at the ingress/load balancer. Locally, you can simulate by having two Services and testing each:\n\n" +
          "```bash\n" +
          "# Stable\n" +
          "kubectl -n prod create deploy app-stable --image=nginx:1.27\n" +
          "kubectl -n prod label deploy app-stable app=myapp track=stable\n" +
          "kubectl -n prod expose deploy app-stable --name app-stable --port 80 --target-port 80\n" +
          "\n" +
          "# Canary\n" +
          "kubectl -n prod create deploy app-canary --image=nginx:1.25\n" +
          "kubectl -n prod label deploy app-canary app=myapp track=canary\n" +
          "kubectl -n prod expose deploy app-canary --name app-canary --port 80 --target-port 80\n" +
          "\n" +
          "kubectl -n prod port-forward svc/app-stable 8081:80\n" +
          "kubectl -n prod port-forward svc/app-canary 8082:80\n" +
          "```\n\n" +
          "Run smoke tests against both, and decide whether to promote (replace stable image) or rollback (delete canary).\n\n" +
          "### 8.2 Gate promotion using measurable signals\n\n" +
          "Define 2-3 signals that must stay healthy:\n" +
          "- error rate\n" +
          "- p95 latency\n" +
          "- saturation (CPU/mem)\n\n" +
          "Automated gates can be implemented with Argo Rollouts/Flagger (metrics provider) or CI jobs that query your observability backend.\n\n" +
          "**Rule:** never do canary without a rollback path and clear thresholds." 
      },
      {
        title: 'Step 9: Definition of Done — Deployment Strategy Checklist',
        content:
          "Use this checklist to ensure your advanced pipeline pattern is production-ready:\n\n" +
          "- [ ] Rollout strategy chosen and documented (rolling/blue-green/canary)\n" +
          "- [ ] Health endpoints exist (`/health`, `/ready`) and probes are configured\n" +
          "- [ ] Smoke test script exists and can run in CI\n" +
          "- [ ] Rollback procedure is documented and tested\n" +
          "- [ ] Deployment is gated (approvals or automated metrics)\n" +
          "- [ ] Observability dashboards/alerts cover errors + latency + saturation\n" +
          "- [ ] Feature flags used for risky changes (deploy != release)\n" +
          "- [ ] Timeouts exist for all waits (rollout, health checks, jobs)\n" +
          "- [ ] Pipeline is cost-aware (caching, selective jobs, reasonable parallelism)\n"
      },
      {
        title: 'Step 10: Lab Deliverables (What to Submit)',
        content:
          "- A repo folder containing:\n" +
          "  - `k8s/` manifests for blue/green (or canary)\n" +
          "  - a pipeline file (GitHub Actions/GitLab CI/Jenkinsfile)\n" +
          "  - `scripts/smoke-test.sh`\n" +
          "- A short README explaining:\n" +
          "  - chosen strategy and why\n" +
          "  - rollback steps\n" +
          "  - what metrics gate promotion\n"
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
  ,

  'gitops-with-argocd': {
    introduction:
      "GitOps is a way of running operations from Git: your desired state lives in version control, and a controller continuously reconciles the real system to match it. With ArgoCD, Kubernetes deployments become predictable, auditable, and reversible — because the source of truth is the repository, not manual cluster changes.\n\n" +
      "This lesson focuses on the operational workflow: how ArgoCD watches a repo, detects drift, syncs changes, and how teams structure repos to support dev/staging/prod safely.",

    whyItMatters:
      "**Why GitOps Matters in Production:**\n\n" +
      "1. **Auditability**: every change is a commit (who/what/why).\n" +
      "2. **Consistency**: clusters converge to the same declared state.\n" +
      "3. **Speed with control**: fast rollouts with approvals and clear promotion.\n" +
      "4. **Self-healing**: drift is detected and corrected automatically (when configured).\n" +
      "5. **Separation of duties**: platform teams define guardrails, app teams ship changes safely.\n\n" +
      "If CI is how you *build* software, GitOps is how you *run* it.",

    concepts: [
      {
        title: 'GitOps Core Principles (Declarative + Reconciled)',
        content:
          "GitOps systems rely on four pillars:\n\n" +
          "- **Declarative**: desired state expressed in YAML/Helm/Kustomize\n" +
          "- **Versioned**: Git history is the audit log\n" +
          "- **Pulled**: the cluster pulls desired state (no direct push access required)\n" +
          "- **Reconciled**: a controller continuously makes reality match desired state\n\n" +
          "This reduces 'configuration drift' — changes made by hand that aren't tracked anywhere."
      },
      {
        title: 'ArgoCD Applications and Sync Policies',
        content:
          "An **Application** tells ArgoCD what to deploy (repo/path/revision) and where (cluster/namespace).\n\n" +
          "Key sync behavior:\n" +
          "- **Manual sync**: safer for early teams; changes require an explicit sync\n" +
          "- **Automated sync**: ArgoCD applies changes automatically\n" +
          "- **Prune**: remove resources deleted from Git\n" +
          "- **Self-heal**: revert out-of-band changes in the cluster\n\n" +
          "A common production posture: automated sync in lower envs, manual or approval-gated sync in production."
      },
      {
        title: 'Repo Structure: Overlays and Promotion',
        content:
          "A practical multi-environment layout:\n\n" +
          "```\n" +
          "repo/\n" +
          "  k8s/\n" +
          "    base/\n" +
          "    overlays/\n" +
          "      dev/\n" +
          "      staging/\n" +
          "      prod/\n" +
          "```\n\n" +
          "Promotion becomes a Git operation: merge PR to promote from staging to prod. Your cluster just reconciles the change."
      },
      {
        title: 'Guardrails with Projects, RBAC, and Policies',
        content:
          "In real teams, you must prevent apps from deploying anywhere or pulling from any repo. Use:\n\n" +
          "- **AppProjects** to restrict source repos and destination namespaces\n" +
          "- **RBAC** to limit who can sync or override\n" +
          "- **Namespace + policy controls** (NetworkPolicy, admission, Pod Security)\n\n" +
          "GitOps is powerful — guardrails keep it safe."
      }
    ],

    stepByStep: [
      {
        title: 'Practice 1: Install ArgoCD and Access the UI',
        content:
          "Install ArgoCD to a local cluster and port-forward the UI:\n\n" +
          "```bash\n" +
          "kubectl create namespace argocd\n" +
          "kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml\n" +
          "kubectl -n argocd get pods\n" +
          "kubectl -n argocd port-forward svc/argocd-server 8080:443\n" +
          "```\n\n" +
          "Goal: confirm ArgoCD is healthy and reachable before adding apps."
      },
      {
        title: 'Practice 2: Create an Application and Sync',
        content:
          "Create an Application that points to your repo and deploys into a namespace:\n\n" +
          "```bash\n" +
          "argocd login localhost:8080 --insecure\n" +
          "argocd app list\n" +
          "argocd app sync <app-name>\n" +
          "argocd app diff <app-name>\n" +
          "```\n\n" +
          "Then validate resources directly in the cluster with `kubectl get all -n <ns>`."
      },
      {
        title: 'Practice 3: Simulate Drift and Observe Self-Heal',
        content:
          "Edit a live resource (out of band) and watch ArgoCD flag drift. Example: scale a deployment manually:\n\n" +
          "```bash\n" +
          "kubectl -n production scale deploy/api --replicas=1\n" +
          "# ArgoCD should show OutOfSync if desired is different\n" +
          "```\n\n" +
          "If self-heal is enabled, ArgoCD will revert the manual change back to Git's desired state."
      }
    ],

    commonMistakes: [
      "Enabling prune/self-heal in production before you understand the impact",
      "Letting ArgoCD deploy cluster-wide resources without Projects/guardrails",
      "Mixing 'app config' and 'platform config' in the same path without ownership",
      "Treating GitOps as a UI tool (the repo should be the source of truth)",
      "Not separating environments (dev/staging/prod) cleanly"
    ],

    bestPractices: [
      "Use overlays per environment and promote via PRs",
      "Adopt AppProjects + RBAC early to prevent accidental blast radius",
      "Prefer small, composable Applications (clear ownership)",
      "Turn on pruning carefully; start in lower envs and document exceptions",
      "Use `argocd app diff` and sync status as part of release verification"
    ],

    realWorldExample:
      "**Scenario: A hotfix must be deployed safely**\n\n" +
      "A team merges a hotfix PR into the production overlay. ArgoCD detects the new commit, shows a clean diff, then syncs (manually approved or automated based on policy). If something breaks, rollback is a Git revert.\n\n" +
      "This workflow is fast *and* auditable: the PR, review, and commit history are the operational record.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. GitOps makes Git the source of truth for cluster state\n" +
      "2. ArgoCD reconciles desired vs actual and exposes drift\n" +
      "3. Sync policies (prune/self-heal) are powerful — enable with intent\n" +
      "4. Repo structure + guardrails determine long-term maintainability",

    nextSteps:
      "Next, combine GitOps with progressive delivery (Argo Rollouts/Flagger) and add policy enforcement so deployments are both fast and safe."
  },

  'github-actions-advanced-features': {
    introduction:
      "Once you can build a basic CI workflow, the next step is making it fast, safe, and maintainable at scale. Advanced GitHub Actions features help you run the right jobs for the right changes, protect production deployments, and standardize workflows across many repositories.\n\n" +
      "This lesson focuses on matrix builds, conditional execution, environments, secrets, and reusable workflows — the tools that turn a one-off pipeline into a reliable platform capability.",

    whyItMatters:
      "**Why Advanced GitHub Actions Features Matter:**\n\n" +
      "1. **Speed**: matrices and caching reduce feedback time\n" +
      "2. **Safety**: protected environments and approvals reduce production risk\n" +
      "3. **Cost**: conditional execution avoids running unnecessary jobs\n" +
      "4. **Consistency**: reusable workflows make standards easy to apply\n" +
      "5. **Security**: better secrets handling prevents credential leaks\n\n" +
      "A mature pipeline is not the one that *runs* — it’s the one that runs quickly, safely, and predictably.",

    concepts: [
      {
        title: 'Matrix Builds (Test Across Variants)',
        content:
          "Matrix builds let you test across operating systems and versions in parallel.\n\n" +
          "Use matrices when you support multiple Node/JDK versions or need OS coverage. Keep matrices small and focused — big matrices can become expensive."
      },
      {
        title: 'Conditionals + Environments (Controlled Deployment)',
        content:
          "Conditionals (`if:`) allow you to deploy only from main, or only on tagged releases.\n\n" +
          "GitHub **environments** provide protection: required reviewers, wait timers, and environment-scoped secrets. This is a clean way to gate production." 
      },
      {
        title: 'Secrets and OIDC (Prefer Short-Lived Credentials)',
        content:
          "Static secrets work, but long-lived cloud keys are risky. Prefer OIDC where possible so your workflow exchanges a short-lived token with the cloud provider.\n\n" +
          "Always apply least privilege: minimal permissions, minimal scope, minimal lifetime."
      },
      {
        title: 'Reusable Workflows + Composite Actions (Standardization)',
        content:
          "Reusable workflows (`workflow_call`) let you centralize common pipelines (build/test/scan) and reuse them across repos.\n\n" +
          "Composite actions package reusable steps (lint, setup, tool install) with consistent inputs/outputs."
      }
    ],

    stepByStep: [
      {
        title: 'Practice 1: Add a Matrix and Cache Dependencies',
        content:
          "Extend your workflow to test multiple Node versions and enable caching. Ensure each matrix job is independent and produces clear logs." 
      },
      {
        title: 'Practice 2: Protect Production with Environments',
        content:
          "Create a `production` environment in GitHub, require approvals, and ensure the deploy job targets that environment so releases are gated." 
      },
      {
        title: 'Practice 3: Create a Reusable Workflow',
        content:
          "Extract your build/test steps into a reusable workflow and call it from another repo or workflow file. The win is consistency and less copy/paste." 
      }
    ],

    commonMistakes: [
      "Building huge matrices that waste CI minutes",
      "Using secrets in logs or passing them via plain environment output",
      "Deploying from feature branches without safeguards",
      "Copy/pasting workflows across repos and drifting over time",
      "Not pinning action versions (surprise changes)"
    ],

    bestPractices: [
      "Pin action versions (tags or SHAs) for stability",
      "Use environments for production gating",
      "Cache dependencies and avoid redundant installs",
      "Use reusable workflows for org-wide standards",
      "Adopt OIDC for cloud auth where available"
    ],

    realWorldExample:
      "**Scenario: Standard CI for 30 repositories**\n\n" +
      "A platform team publishes a reusable workflow (lint/test/build + security scan). Each service repo calls it with a few inputs. Updates happen in one place, and the org gains consistent CI behavior without manual synchronization.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. Matrix builds increase coverage efficiently\n" +
      "2. Environments + approvals protect production\n" +
      "3. Prefer OIDC and least privilege for cloud access\n" +
      "4. Reusable workflows reduce drift and copy/paste",

    nextSteps:
      "Next, connect these patterns to progressive delivery (canary/blue-green) and GitOps so releases are both fast and controlled."
  },

  'jenkins-pipelines-groovy': {
    introduction:
      "Jenkins is one of the most widely used CI/CD tools in the industry, especially in enterprises. Its power comes from pipelines defined as code (Jenkinsfiles) written in Groovy.\n\n" +
      "This lesson teaches you how to write pipelines that are readable, debuggable, and secure — with clean stages, proper credentials handling, and reusable shared libraries.",

    whyItMatters:
      "**Why Jenkins Pipelines Still Matter:**\n\n" +
      "1. **Legacy + enterprise reality**: many organizations still run critical workloads on Jenkins\n" +
      "2. **Flexibility**: scripted pipelines handle complex workflows\n" +
      "3. **Ecosystem**: plugins for SCM, secrets, artifacts, notifications\n" +
      "4. **Control**: self-hosted runners and networking inside private environments\n\n" +
      "If you can read and write Jenkinsfiles confidently, you can contribute immediately in many teams.",

    concepts: [
      {
        title: 'Declarative vs Scripted Pipelines',
        content:
          "- **Declarative** pipelines are opinionated and easier to standardize (stages, post conditions, options).\n" +
          "- **Scripted** pipelines are more flexible but easier to turn into unreadable logic.\n\n" +
          "For most teams: start with declarative and introduce scripted blocks only when necessary."
      },
      {
        title: 'Agents, Stages, and Artifacts',
        content:
          "Pipelines run on **agents** (build nodes). Stages give structure and visibility.\n\n" +
          "Artifacts (build outputs) should be archived or published to a repository (Nexus/Artifactory/S3).\n" +
          "A good pipeline makes it obvious where a failure happened and how to reproduce it locally."
      },
      {
        title: 'Credentials and Secret Hygiene',
        content:
          "Never hardcode secrets in Jenkinsfiles. Use Jenkins Credentials + bindings, and avoid echoing secrets.\n\n" +
          "Secure pattern: inject credentials only for the stage that needs them, and keep logs clean."
      },
      {
        title: 'Shared Libraries (Reusability)',
        content:
          "Shared libraries prevent copy/pasted Jenkinsfiles across repos. They let you define approved steps (build, test, scan, deploy) as reusable functions.\n\n" +
          "This is how mature Jenkins shops scale: centralized pipeline logic with versioning."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Run Jenkins Locally (Persistent) + First Pipeline Job',
        content:
          "Run Jenkins locally using Docker with a persistent volume so your configuration survives restarts:\n\n" +
          "```bash\n" +
          "docker volume create jenkins_home\n" +
          "docker run --name jenkins-lab \\\n" +
          "  -p 8081:8080 -p 50000:50000 \\\n" +
          "  -v jenkins_home:/var/jenkins_home \\\n" +
          "  jenkins/jenkins:lts\n" +
          "\n" +
          "# Get the initial admin password\n" +
          "docker exec -it jenkins-lab cat /var/jenkins_home/secrets/initialAdminPassword\n" +
          "```\n\n" +
          "In the UI (http://localhost:8081):\n\n" +
          "- Install suggested plugins\n" +
          "- Create an admin user\n" +
          "- Create a **Pipeline** job (for a single Jenkinsfile) or **Multibranch Pipeline** (recommended for modern repos)\n\n" +
          "Success criteria:\n\n" +
          "- Jenkins is reachable\n" +
          "- You can create a job and run a build\n" +
          "- You can see stage output in Blue Ocean (optional) or the classic UI"
      },
      {
        title: 'Lab 2: Create a Clean Declarative Jenkinsfile (Fail Fast + Timeouts)',
        content:
          "Add a `Jenkinsfile` to a repo and start with a readable declarative pipeline. The goal is not clever Groovy — it is **predictable execution**:\n\n" +
          "```groovy\n" +
          "pipeline {\n" +
          "  agent any\n" +
          "\n" +
          "  options {\n" +
          "    timestamps()\n" +
          "    disableConcurrentBuilds()\n" +
          "    buildDiscarder(logRotator(numToKeepStr: '20'))\n" +
          "    timeout(time: 20, unit: 'MINUTES')\n" +
          "  }\n" +
          "\n" +
          "  stages {\n" +
          "    stage('Checkout') {\n" +
          "      steps { checkout scm }\n" +
          "    }\n" +
          "\n" +
          "    stage('Build') {\n" +
          "      steps {\n" +
          "        sh 'echo build here'\n" +
          "      }\n" +
          "    }\n" +
          "\n" +
          "    stage('Test') {\n" +
          "      steps {\n" +
          "        sh 'echo test here'\n" +
          "      }\n" +
          "      post {\n" +
          "        always { echo 'Collect test results here' }\n" +
          "      }\n" +
          "    }\n" +
          "  }\n" +
          "\n" +
          "  post {\n" +
          "    success { echo 'Build succeeded' }\n" +
          "    failure { echo 'Build failed' }\n" +
          "    always  { cleanWs() }\n" +
          "  }\n" +
          "}\n" +
          "```\n\n" +
          "Checklist:\n\n" +
          "- Each stage does one job\n" +
          "- The pipeline has a global timeout\n" +
          "- Concurrent builds are disabled unless explicitly required\n" +
          "- Workspace is cleaned in `post { always { ... } }`"
      },
      {
        title: 'Lab 3: Parallelism + Artifacts + Reports (Make Output Useful)',
        content:
          "Add structure so developers can answer: *what failed and where is the evidence?*\n\n" +
          "Try these upgrades:\n\n" +
          "1) Run checks in parallel (lint + unit tests + security scan)\n" +
          "2) Archive build outputs\n" +
          "3) Publish test reports\n\n" +
          "Example pattern:\n\n" +
          "```groovy\n" +
          "stage('Checks') {\n" +
          "  parallel(\n" +
          "    lint: { sh 'echo lint' },\n" +
          "    unit: { sh 'echo unit tests' },\n" +
          "    scan: { sh 'echo scan' }\n" +
          "  )\n" +
          "}\n" +
          "\n" +
          "stage('Package') {\n" +
          "  steps {\n" +
          "    sh 'mkdir -p dist && echo artifact > dist/app.txt'\n" +
          "    archiveArtifacts artifacts: 'dist/**', fingerprint: true\n" +
          "  }\n" +
          "}\n" +
          "```\n\n" +
          "Checklist:\n\n" +
          "- Parallel branches have clear names\n" +
          "- Artifacts are archived (or published to an artifact repo)\n" +
          "- The build page contains enough evidence to debug without re-running"
      },
      {
        title: 'Lab 4: Add Credentials Safely (Registry Login / Cloud Auth)',
        content:
          "Store credentials in Jenkins and bind them in a single stage:\n\n" +
          "```groovy\n" +
          "withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {\n" +
          "  sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'\n" +
          "}\n" +
          "```\n\n" +
          "Hard rules:\n\n" +
          "- No secrets in Git\n" +
          "- No secrets in logs\n" +
          "- Limit credential scope (inject only in the stage that needs it)\n\n" +
          "Verification:\n\n" +
          "- You can rotate the credential in Jenkins without changing the repo\n" +
          "- A failed build does not reveal secrets in the console"
      },
      {
        title: 'Lab 5: Build + Tag + Push a Docker Image (Repeatable Tagging)',
        content:
          "Add a versioning strategy that makes rollbacks easy. A simple pattern is: `git-sha` + `build-number`.\n\n" +
          "Example environment and build steps:\n\n" +
          "```groovy\n" +
          "environment {\n" +
          "  IMAGE = 'your-org/your-app'\n" +
          "  TAG   = \"${env.BUILD_NUMBER}-${env.GIT_COMMIT?.take(7)}\"\n" +
          "}\n" +
          "\n" +
          "stage('Docker Build') {\n" +
          "  steps {\n" +
          "    sh 'docker build -t ' + IMAGE + ':' + TAG + ' .'\n" +
          "  }\n" +
          "}\n" +
          "\n" +
          "stage('Docker Push') {\n" +
          "  steps {\n" +
          "    withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {\n" +
          "      sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'\n" +
          "      sh 'docker push ' + IMAGE + ':' + TAG\n" +
          "    }\n" +
          "  }\n" +
          "}\n" +
          "```\n\n" +
          "Checklist:\n\n" +
          "- Image tags are unique per build\n" +
          "- You can identify the commit from the tag\n" +
          "- Push only happens after tests succeed"
      },
      {
        title: 'Lab 6: Deploy to Kubernetes With a Rollout Gate (Smoke + Rollback)',
        content:
          "This lab simulates a real deploy stage: apply manifests, wait for readiness, run a smoke test, and rollback on failure.\n\n" +
          "Store a kubeconfig as a Jenkins **Secret file** credential (example id: `kubeconfig-lab`) and then use it only for the deploy stage:\n\n" +
          "```groovy\n" +
          "stage('Deploy') {\n" +
          "  steps {\n" +
          "    withCredentials([file(credentialsId: 'kubeconfig-lab', variable: 'KUBECONFIG')]) {\n" +
          "      sh 'kubectl apply -f k8s/'\n" +
          "      sh 'kubectl rollout status deploy/your-app -n default --timeout=120s'\n" +
          "      sh 'kubectl get pods -n default'\n" +
          "    }\n" +
          "  }\n" +
          "}\n" +
          "```\n\n" +
          "Add a smoke test step (for example via `kubectl port-forward` + `curl`) and fail the stage if it returns non-200.\n\n" +
          "Rollback drill:\n\n" +
          "- Intentionally deploy a broken version\n" +
          "- Confirm the gate fails\n" +
          "- Run `kubectl rollout undo` as part of an automated remediation (or a manual approval path)"
      },
      {
        title: 'Lab 7: Shared Library Mini-Lab (Stop Copy/Paste Jenkinsfiles)',
        content:
          "Goal: move common steps into a shared library so multiple repos reuse approved pipeline logic.\n\n" +
          "1) Create a new repo (example): `jenkins-shared-lib`\n" +
          "2) Add a function under `vars/`:\n\n" +
          "```groovy\n" +
          "// vars/dockerBuildPush.groovy\n" +
          "def call(Map cfg = [:]) {\n" +
          "  sh \"docker build -t ${cfg.image}:${cfg.tag} .\"\n" +
          "  sh \"docker push ${cfg.image}:${cfg.tag}\"\n" +
          "}\n" +
          "```\n\n" +
          "3) Configure Jenkins: Manage Jenkins → System → Global Pipeline Libraries\n" +
          "4) Use it from your Jenkinsfile:\n\n" +
          "```groovy\n" +
          "@Library('jenkins-shared-lib') _\n" +
          "\n" +
          "stage('Build + Push') {\n" +
          "  steps {\n" +
          "    dockerBuildPush(image: 'your-org/your-app', tag: env.BUILD_NUMBER)\n" +
          "  }\n" +
          "}\n" +
          "```\n\n" +
          "Checklist:\n\n" +
          "- Library changes are versioned\n" +
          "- Jenkinsfiles become shorter and more readable\n" +
          "- Sensitive logic (auth, deploy rules) can be governed centrally"
      },
      {
        title: 'Lab 8: Definition of Done (Jenkins Pipeline Checklist)',
        content:
          "Use this checklist before calling a Jenkins pipeline production-ready:\n\n" +
          "- Stages are small and named by intent (Checkout/Build/Test/Package/Deploy)\n" +
          "- Global timeouts exist (and stage-level timeouts where needed)\n" +
          "- Concurrency rules are explicit (`disableConcurrentBuilds` or justified concurrency)\n" +
          "- Secrets are never printed; credentials are stage-scoped\n" +
          "- Artifacts and reports are retained (archive + fingerprint, or publish externally)\n" +
          "- Deploy has a gate (`rollout status`, smoke tests, and a rollback plan)\n" +
          "- Logs are readable (timestamps; minimal noise; clear errors)\n" +
          "- Flaky steps are fixed, not retried forever"
      },
      {
        title: 'Lab 9: Deliverables (What to Submit)',
        content:
          "Create a repo (or folder) containing:\n\n" +
          "- `Jenkinsfile` with: options, clean stages, parallel checks, and post actions\n" +
          "- A small `k8s/` folder (even a minimal Deployment + Service)\n" +
          "- A `README.md` that documents:\n" +
          "  - How to run the pipeline\n" +
          "  - What credentials must exist in Jenkins\n" +
          "  - How rollback is performed\n" +
          "- Evidence: console output screenshots or pasted logs showing each stage ran\n\n" +
          "If you build a shared library: include the `vars/` function and show it used by the Jenkinsfile."
      }
    ],

    commonMistakes: [
      "Putting complex logic directly in Jenkinsfiles instead of shared libraries",
      "Leaking secrets via `echo` or verbose command output",
      "Not pinning tool versions (Node/JDK/Maven) leading to flaky builds",
      "Using one giant stage that makes failures hard to localize",
      "Not cleaning workspace or caching dependencies properly"
    ],

    bestPractices: [
      "Keep pipelines small and stage-based; fail fast",
      "Use shared libraries for reuse and governance",
      "Bind credentials only when needed and keep logs clean",
      "Archive artifacts and publish to artifact repositories",
      "Prefer multibranch pipelines with PR checks for modern workflows"
    ],

    realWorldExample:
      "**Scenario: A regulated environment with private networking**\n\n" +
      "A company runs Jenkins inside a restricted network with internal registries and artifact repositories. Pipelines build images, run security scans, publish artifacts, and deploy to Kubernetes — all without exposing infrastructure to public CI providers.\n\n" +
      "Jenkins remains a practical choice when you need full control of build agents, networking, and compliance constraints.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. Jenkinsfiles are pipelines-as-code\n" +
      "2. Declarative pipelines are easiest to standardize\n" +
      "3. Credentials must be handled via bindings, not hardcoded\n" +
      "4. Shared libraries are the key to scaling Jenkins",

    nextSteps:
      "Next, connect Jenkins to GitHub/GitLab webhooks, add build caching, incorporate security scanning, and integrate GitOps for deployment."
  },

  'microservices-patterns': {
    introduction:
      "Microservices are not about splitting code into many repos — they are about creating **clear ownership boundaries** so teams can ship safely and independently.\n\n" +
      "In this lesson you will learn the core architectural patterns behind successful microservices programs: service boundaries, API gateways/BFF, event-driven workflows, and how service mesh fits in (and where it doesn’t).",

    whyItMatters:
      "**Why this matters in real teams:**\n\n" +
      "1. **Independent deployments**: smaller blast radius and faster iteration\n" +
      "2. **Clear ownership**: teams know what they own and how they are measured\n" +
      "3. **Resilience**: failures can be isolated instead of cascading\n" +
      "4. **Scalability**: scale the hot path without scaling everything\n\n" +
      "The trade-off is complexity: networking, observability, and consistency become engineering work. You must earn microservices with good practices.",

    concepts: [
      {
        title: 'Service Boundaries and Data Ownership',
        content:
          "A microservice should own a cohesive business capability and its **data**. Sharing a database across services is the fastest way to re-create a distributed monolith.\n\n" +
          "Good boundaries often come from **bounded contexts** (DDD): each service has its own language, rules, and lifecycle."
      },
      {
        title: 'API Gateway and BFF',
        content:
          "An **API Gateway** is the external entry point that can centralize routing, auth, rate limiting, and request shaping.\n\n" +
          "A **Backend-for-Frontend (BFF)** is a gateway tailored to a single client (web, mobile) to avoid over-fetching and reduce client complexity."
      },
      {
        title: 'Event-Driven Architecture and Eventual Consistency',
        content:
          "Events reduce coupling between services and help smooth traffic spikes. The cost is **eventual consistency**: different services converge to the correct state over time.\n\n" +
          "Patterns like **Outbox** help publish events safely without losing messages when a transaction commits."
      },
      {
        title: 'Service Mesh (What It Solves)',
        content:
          "A service mesh typically provides: mTLS, traffic policy (timeouts/retries), and telemetry (traces/metrics).\n\n" +
          "It does *not* fix poor service boundaries, missing runbooks, or unclear ownership. Treat it as an infrastructure accelerator, not an architecture replacement."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Draw Boundaries (From One Domain to Services)',
        content:
          "Pick a simple domain (e-commerce works well). Write down 5–8 user actions (browse catalog, add to cart, checkout, pay, view orders).\n\n" +
          "Then define:\n\n" +
          "- Candidate services (Catalog, Cart, Orders, Payments)\n" +
          "- Each service’s **owned data**\n" +
          "- Public APIs vs emitted events\n\n" +
          "Checklist:\n\n" +
          "- No service requires direct DB access to another service\n" +
          "- Each service has a clear owner and SLA/SLO expectations\n" +
          "- You can describe how the system behaves when one service is down"
      },
      {
        title: 'Lab 2: Create an API Surface (Gateway → Services)',
        content:
          "Create an API contract for three flows:\n\n" +
          "- `GET /catalog/products/{id}`\n" +
          "- `POST /cart/items`\n" +
          "- `POST /orders`\n\n" +
          "Now decide what is gateway responsibility vs service responsibility:\n\n" +
          "- Auth and rate limits (gateway)\n" +
          "- Validation and business rules (service)\n" +
          "- Aggregation for client convenience (BFF or gateway)\n\n" +
          "If you are using Kubernetes, model it as Ingress routing to different services." 
      },
      {
        title: 'Lab 3: Event-Driven Workflow Sketch (OrderCreated)',
        content:
          "Write down an event flow for checkout:\n\n" +
          "1) Orders emits `OrderCreated`\n" +
          "2) Payments consumes it and emits `PaymentSucceeded` or `PaymentFailed`\n" +
          "3) Inventory consumes it and emits `StockReserved` or `StockRejected`\n\n" +
          "Then define how you handle failures:\n\n" +
          "- Compensation action (undo) vs retry vs manual intervention\n" +
          "- Idempotency rules (duplicate events must not create duplicate charges)"
      },
      {
        title: 'Lab 4: DoD Checklist (Microservices Pattern Readiness)',
        content:
          "Before splitting services, ensure:\n\n" +
          "- Tracing is planned (correlation IDs, trace propagation)\n" +
          "- Centralized logs exist (structured logs + searchable store)\n" +
          "- Runtime config is externalized (env/config maps/secrets)\n" +
          "- Deployment/rollback is automated\n" +
          "- Clear ownership and on-call expectations are defined"
      }
    ],

    commonMistakes: [
      "Splitting into many services before having CI/CD, observability, and ownership",
      "Sharing a database across services (tight coupling through schema)",
      "Building an API gateway that becomes a second monolith",
      "Using synchronous calls everywhere (cascading failures)",
      "Ignoring versioning and backward compatibility"
    ],

    bestPractices: [
      "Start from a modular monolith when speed/clarity matters, then split intentionally",
      "Make service boundaries explicit: owned data, owned APIs, owned events",
      "Prefer async events for cross-domain workflows; use sync calls for queries",
      "Design for failure: timeouts, retries with budgets, circuit breakers",
      "Adopt observability early (logs, metrics, traces)"
    ],

    realWorldExample:
      "**Scenario: Growth-driven refactor**\n\n" +
      "A company starts with a monolith. As teams grow, deployments become risky and slow. They create clear boundaries (Catalog, Orders) and introduce an API gateway to route traffic. They adopt events for the checkout workflow so Payments can fail without taking down Catalog browsing.\n\n" +
      "The success factor isn’t the number of services — it’s the operational maturity around them.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. Microservices are about boundaries and ownership\n" +
      "2. Gateways/BFF shape and protect APIs\n" +
      "3. Events decouple services but introduce eventual consistency\n" +
      "4. Service mesh helps with traffic security/policy — not architecture",

    nextSteps:
      "Next, implement service communication patterns (REST/gRPC/messaging) and add resilience controls (timeouts, retries, circuit breakers) with strong observability."
  },

  'service-communication': {
    introduction:
      "Microservices communicate over the network — which means every call can fail, be slow, or be duplicated. Your job is to make communication **explicit, resilient, and observable**.\n\n" +
      "This lesson focuses on REST vs gRPC, asynchronous messaging, and the practical engineering controls that prevent cascading failures.",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- A single slow dependency can degrade many services\n" +
      "- Retries can turn an incident into an outage if uncontrolled\n" +
      "- Without correlation IDs and tracing, debugging becomes guesswork\n\n" +
      "Good communication design reduces incident frequency and shortens time-to-diagnose.",

    concepts: [
      {
        title: 'REST vs gRPC (Choosing the Right Tool)',
        content:
          "REST is widely compatible and easy to debug; gRPC is efficient and strongly typed.\n\n" +
          "A pragmatic default: REST for public/external APIs, gRPC for internal service-to-service calls where performance and contracts matter."
      },
      {
        title: 'Async Messaging (Queues/Streams)',
        content:
          "Messaging decouples producers and consumers and can absorb spikes. It introduces challenges: ordering, duplicates, and retries.\n\n" +
          "Assume **at-least-once delivery** and build idempotent consumers."
      },
      {
        title: 'Timeouts, Retries, and Budgets',
        content:
          "Always set timeouts. Retries must be limited and use exponential backoff + jitter.\n\n" +
          "Use retry budgets so you don’t overload a dependency during partial failure."
      },
      {
        title: 'Correlation IDs and Trace Propagation',
        content:
          "Every request should carry a correlation ID. Logs and traces should include it, so you can follow a user action across services.\n\n" +
          "Without this, incident response becomes slow and error-prone."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Design Two Contracts (REST + gRPC)',
        content:
          "Pick a single capability (Product lookup) and write:\n\n" +
          "- A REST contract (endpoint + response JSON)\n" +
          "- A gRPC proto (request/response messages)\n\n" +
          "Checklist:\n\n" +
          "- Fields are stable and versioning is considered\n" +
          "- Errors are explicit (what does not-found look like?)\n" +
          "- Latency expectations are stated"
      },
      {
        title: 'Lab 2: Add Safe Defaults (Timeout + Retry Budget)',
        content:
          "Define your client-side rules for calling a dependency:\n\n" +
          "- Timeout per try\n" +
          "- Max retries\n" +
          "- Backoff policy\n" +
          "- Which errors are retryable\n\n" +
          "Now apply a simple rule: if the overall time budget is exceeded, stop retrying and return a controlled error."
      },
      {
        title: 'Lab 3: Idempotency Exercise (Payments/Orders)',
        content:
          "Design an idempotency key strategy for `POST /orders`:\n\n" +
          "- Client sends `Idempotency-Key`\n" +
          "- Server stores the key and response for a limited window\n" +
          "- Duplicate requests return the same result\n\n" +
          "Goal: retries do not create duplicate orders or duplicate charges."
      },
      {
        title: 'Lab 4: Communication DoD Checklist',
        content:
          "Before shipping a new inter-service call:\n\n" +
          "- Timeout exists and is reviewed\n" +
          "- Retries are capped and use jitter\n" +
          "- Circuit breaker policy is defined (or mesh policy is configured)\n" +
          "- Correlation IDs appear in logs\n" +
          "- A dashboard/alert exists for latency and error rate"
      }
    ],

    commonMistakes: [
      "No timeouts (calls hang and exhaust resources)",
      "Unbounded retries (retry storms)",
      "Retrying non-idempotent operations without idempotency keys",
      "Breaking backward compatibility without versioning",
      "Lack of trace/correlation propagation"
    ],

    bestPractices: [
      "Prefer simple, explicit contracts and strong versioning discipline",
      "Treat retries as a tool of last resort (timeouts + circuit breakers first)",
      "Use async messaging for workflows that can be eventually consistent",
      "Make consumers idempotent and observable",
      "Define SLOs per dependency (latency + availability expectations)"
    ],

    realWorldExample:
      "**Scenario: Incident caused by retry storm**\n\n" +
      "A downstream service slows down. Clients have no timeouts and retry aggressively, creating more load and causing a wider outage. The fix is not just more capacity — it’s adding timeouts, capped retries with jitter, and circuit breakers, plus dashboards to detect saturation early.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. Network calls fail: design for it\n" +
      "2. Always use timeouts and bounded retries\n" +
      "3. Idempotency makes retries safe\n" +
      "4. Correlation IDs and tracing are non-negotiable",

    nextSteps:
      "Next, layer in resilience patterns systematically and validate them with failure drills and load testing."
  },

  'resilience-patterns': {
    introduction:
      "Resilience is the difference between a small incident and a multi-hour outage. In microservices, failure is normal — the goal is to **contain it** and keep delivering a degraded (but usable) experience.\n\n" +
      "This lesson teaches the practical patterns and drills that make systems survivable: timeouts, retries with budgets, circuit breakers, bulkheads, and basic chaos experiments.",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- Services depend on services; a single failure can cascade\n" +
      "- Without backpressure, overload becomes self-amplifying\n" +
      "- Without runbooks, mean time to recovery grows dramatically\n\n" +
      "A resilient system fails *predictably* and recovers quickly.",

    concepts: [
      {
        title: 'Timeouts and Time Budgets',
        content:
          "Timeouts are the most important reliability control. Define per-try timeouts and an overall time budget.\n\n" +
          "If the budget is exceeded, fail fast and degrade gracefully."
      },
      {
        title: 'Circuit Breakers and Graceful Degradation',
        content:
          "Circuit breakers stop repeated failures from hammering a dependency. When open, the service should degrade gracefully (fallback response, cached data, or reduced feature set)."
      },
      {
        title: 'Bulkheads and Isolation',
        content:
          "Bulkheads isolate resources so one dependency cannot consume all concurrency. Think separate pools/queues per downstream."
      },
      {
        title: 'Chaos Engineering (Small, Safe, Useful)',
        content:
          "Chaos isn’t random destruction. It’s controlled experiments with clear hypotheses, limited blast radius, and measurable outcomes.\n\n" +
          "Start with simple experiments: kill one pod, add latency, verify alerts and recovery procedures."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Add a “Failure Policy” for One Dependency',
        content:
          "Choose one call (Orders → Payments). Define and document:\n\n" +
          "- Timeout per try\n" +
          "- Max retries and which errors are retryable\n" +
          "- Circuit breaker thresholds\n" +
          "- Fallback behavior when dependency is unavailable\n\n" +
          "Outcome: your team can explain exactly what happens during a dependency outage."
      },
      {
        title: 'Lab 2: Rollout Gate + Rollback Drill',
        content:
          "Run a simple reliability drill in Kubernetes:\n\n" +
          "```bash\n" +
          "kubectl rollout status deploy/<service> -n default --timeout=120s\n" +
          "kubectl get pods -n default\n" +
          "\n" +
          "# simulate an issue by deleting a pod\n" +
          "kubectl delete pod -n default <pod-name>\n" +
          "\n" +
          "# if you deploy a broken change, practice rollback\n" +
          "kubectl rollout undo deploy/<service> -n default\n" +
          "```\n\n" +
          "Checklist:\n\n" +
          "- The service replaces failed pods automatically\n" +
          "- Alerts fire when error rate increases\n" +
          "- Rollback steps are documented and fast"
      },
      {
        title: 'Lab 3: Define an SLO + Error Budget',
        content:
          "Define one SLO (example):\n\n" +
          "- Availability SLO: 99.9% monthly\n" +
          "- Latency SLO: p95 < 300ms\n\n" +
          "Then decide how error budget affects releases:\n\n" +
          "- If burn rate is high: slow down releases and fix reliability\n" +
          "- If burn rate is healthy: ship features normally"
      },
      {
        title: 'Lab 4: Resilience DoD Checklist',
        content:
          "Before production:\n\n" +
          "- Timeouts exist for all outbound calls\n" +
          "- Retries are bounded and safe\n" +
          "- Circuit breaker/fallback behavior is tested\n" +
          "- Bulkheads/isolation exist for critical dependencies\n" +
          "- Runbook exists (alerts, dashboards, rollback steps)\n" +
          "- A small failure drill has been executed"
      }
    ],

    commonMistakes: [
      "Relying on retries instead of fixing timeouts and overload controls",
      "No rollback plan or slow rollback process",
      "No runbooks (on-call improvises during incidents)",
      "Treating chaos as random breakage rather than hypothesis-driven experiments",
      "Ignoring saturation signals (CPU, memory, queue depth)"
    ],

    bestPractices: [
      "Start with timeouts everywhere, then add bounded retries and circuit breakers",
      "Prefer graceful degradation over total failure",
      "Use bulkheads to isolate critical dependencies",
      "Measure reliability with SLOs and error budgets",
      "Practice recovery with small, safe drills"
    ],

    realWorldExample:
      "**Scenario: Dependency outage with controlled degradation**\n\n" +
      "A payment provider becomes unavailable. Orders continues to accept carts but marks them as ‘payment pending’ and notifies users, while background retries continue. The system remains usable, customer impact is limited, and recovery is controlled instead of chaotic.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. Resilience is engineered: timeouts, budgets, breakers, isolation\n" +
      "2. Rollback and runbooks reduce MTTR\n" +
      "3. SLOs guide decisions using error budgets\n" +
      "4. Failure drills validate assumptions",

    nextSteps:
      "Next, apply these patterns in the Module 9 project by designing reliability gates in CI/CD, adding dashboards, and practicing incident response workflows."
  },

  'cluster-management': {
    introduction:
      "Production Kubernetes is less about writing YAML and more about **operating a fleet safely**: node maintenance, upgrades, backups, and recovery.\n\n" +
      "This lesson teaches you how to think like an SRE/Platform Engineer when you run Kubernetes clusters for real workloads.",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- Clusters must be upgraded regularly (security patches, CVEs, feature support)\n" +
      "- Nodes fail; you need safe maintenance patterns\n" +
      "- Backups and restore procedures are the difference between a bad day and a disaster\n\n" +
      "If you can confidently drain nodes, validate health, and rehearse recovery, you can keep systems stable under change.",

    concepts: [
      {
        title: 'Cluster Lifecycle and Change Management',
        content:
          "Treat cluster upgrades like production deployments: plan, stage, validate, and roll back.\n\n" +
          "Always know: *what changed, what is the blast radius, and how do we recover?*"
      },
      {
        title: 'Node Maintenance (Cordon/Drain) and Disruption Controls',
        content:
          "Cordon prevents new scheduling; drain safely evicts workloads. In production, your safety net is correct workload design plus disruption policies (PDBs)."
      },
      {
        title: 'Backups and Disaster Recovery (etcd Basics)',
        content:
          "etcd stores cluster state. The exact backup mechanics depend on distro (kubeadm vs managed K8s), but the discipline is universal: scheduled backups, tested restores, and clear RTO/RPO targets."
      },
      {
        title: 'Operational Observability',
        content:
          "During incident response you need fast answers: node pressure, pod restarts, events, and control-plane symptoms. Build the habit of reading signals before guessing."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Node Maintenance Drill (Safe Drain)',
        content:
          "Pick a node and practice maintenance the production way:\n\n" +
          "```bash\n" +
          "kubectl get nodes -o wide\n" +
          "kubectl cordon <node-name>\n" +
          "kubectl drain <node-name> --ignore-daemonsets --delete-emptydir-data --grace-period=60\n" +
          "kubectl uncordon <node-name>\n" +
          "```\n\n" +
          "Checklist:\n\n" +
          "- No critical service goes hard down during drain\n" +
          "- You can explain which pods did not evict and why (DaemonSets, PDBs)\n" +
          "- You know how to stop/abort safely if disruption becomes risky"
      },
      {
        title: 'Lab 2: Upgrade Planning Checklist',
        content:
          "Before upgrading Kubernetes:\n\n" +
          "- Confirm supported version skew for kubelet/control plane\n" +
          "- Confirm add-on compatibility (CNI, CSI, ingress, metrics server)\n" +
          "- Validate PDBs on critical workloads\n" +
          "- Have a rollback plan (node image rollback, cluster snapshot, restore path)\n" +
          "- Schedule the change window and define success criteria"
      },
      {
        title: 'Lab 3: Backup Verification (Rehearse Restore)',
        content:
          "Backups you haven’t restored are not backups. Define a simple restore drill:\n\n" +
          "- Identify what you back up (etcd snapshot, manifests, secrets strategy)\n" +
          "- Pick a cadence (weekly restore test)\n" +
          "- Record RTO/RPO expectations and results\n\n" +
          "Deliverable: a short runbook describing backup schedule + restore steps + validation checks."
      },
      {
        title: 'Lab 4: Cluster Ops Definition of Done',
        content:
          "A cluster is production-ready when:\n\n" +
          "- You can patch/upgrade safely with minimal downtime\n" +
          "- Node maintenance is routine (cordon/drain)\n" +
          "- Backups are automated and restores are tested\n" +
          "- Access is least-privilege (RBAC)\n" +
          "- Monitoring/alerts cover node and control-plane health"
      }
    ],

    commonMistakes: [
      "Upgrading without validating add-on compatibility (CNI/CSI/Ingress)",
      "Draining nodes without considering PDBs and workload readiness",
      "Having backups but never testing restore",
      "Over-permissive cluster-admin access",
      "Ignoring cluster events and node conditions until there is an outage"
    ],

    bestPractices: [
      "Treat cluster operations as a change-managed process",
      "Make maintenance safe with PDBs, probes, and good rollout strategy",
      "Automate backups and test restores regularly",
      "Use least privilege and audit access",
      "Keep runbooks short, specific, and practiced"
    ],

    realWorldExample:
      "**Scenario: Security patch upgrade**\n\n" +
      "A CVE requires a control-plane upgrade. The team validates CNI and ingress compatibility, drains nodes in waves, monitors error rate and latency, and rolls back one node group when an unexpected incompatibility appears. The incident becomes a controlled change instead of a prolonged outage.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. Cluster ops is change management\n" +
      "2. Node maintenance must be safe and repeatable\n" +
      "3. Backups require tested restores\n" +
      "4. Runbooks and least privilege reduce risk",

    nextSteps:
      "Next, apply advanced workload controls (PDBs, quotas, autoscaling) so routine maintenance and scaling events don’t break services."
  },

  'advanced-workload-management': {
    introduction:
      "In production, the hardest problems aren’t deploying workloads — they’re keeping them stable under disruption, contention, and scale.\n\n" +
      "This lesson focuses on the controls that make clusters predictable: PDBs, priority classes, quotas/limits, probes, and autoscaling.",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- Without disruption controls, upgrades cause downtime\n" +
      "- Without quotas, one team can starve another\n" +
      "- Without autoscaling, you either overpay or fall over during spikes\n\n" +
      "These patterns convert Kubernetes from ‘works in dev’ to ‘stable in production’.",

    concepts: [
      {
        title: 'Disruption Budgets (PDBs)',
        content:
          "PDBs limit voluntary disruption (drains, upgrades). They do not protect against involuntary failures (node crash).\n\n" +
          "Your job is to align PDBs with desired availability and rollout strategy."
      },
      {
        title: 'Priority and Preemption',
        content:
          "PriorityClasses help ensure critical workloads survive when the cluster is under pressure. Use them carefully — they can evict lower-priority pods."
      },
      {
        title: 'Quotas, Limits, and Predictability',
        content:
          "ResourceQuotas and LimitRanges prevent noisy-neighbor incidents and provide predictable scheduling behavior."
      },
      {
        title: 'Autoscaling and Its Failure Modes',
        content:
          "HPA solves replica scaling but can be misled by bad metrics or too-aggressive targets. Always bound scaling (min/max) and observe behavior under load."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Make a Workload “Drain-Safe”',
        content:
          "Pick a Deployment and ensure it can survive node drains:\n\n" +
          "- Add readiness probe (only route traffic when ready)\n" +
          "- Add at least 2 replicas\n" +
          "- Add a PDB with `minAvailable`\n\n" +
          "Then perform a node drain and confirm the service remains available."
      },
      {
        title: 'Lab 2: Add Quotas (Prevent Noisy Neighbor)',
        content:
          "Create a namespace for a ‘team’ and apply ResourceQuota + LimitRange.\n\n" +
          "Checklist:\n\n" +
          "- Pods without requests/limits are rejected (or defaulted)\n" +
          "- The namespace cannot exceed its quota\n" +
          "- You can explain how this protects other tenants"
      },
      {
        title: 'Lab 3: HPA Behavior Under Load (Observe, Don’t Guess)',
        content:
          "Deploy a simple service with HPA enabled, then generate load and watch scaling:\n\n" +
          "- Observe CPU/latency\n" +
          "- Confirm scale-up happens\n" +
          "- Confirm scale-down is not too aggressive\n\n" +
          "Success criteria: scaling improves stability without oscillation."
      },
      {
        title: 'Lab 4: DoD Checklist (Workload Governance)',
        content:
          "Before production:\n\n" +
          "- Requests/limits are set\n" +
          "- Probes are correct\n" +
          "- PDB exists (if service must survive drains)\n" +
          "- HPA bounds are defined\n" +
          "- PriorityClass is applied for truly critical workloads\n" +
          "- Dashboards/alerts exist for saturation and errors"
      }
    ],

    commonMistakes: [
      "Using PDBs that block all disruption (minAvailable too high)",
      "Running critical workloads with one replica",
      "No resource requests/limits (unpredictable scheduling)",
      "Autoscaling without bounds (runaway scale)",
      "Treating HPA as a replacement for performance work"
    ],

    bestPractices: [
      "Use PDBs with realistic availability targets",
      "Set requests/limits to protect node stability",
      "Add probes for safe rollouts and routing",
      "Observe autoscaling behavior and tune targets",
      "Combine governance (quotas/limits) with team ownership"
    ],

    realWorldExample:
      "**Scenario: Upgrade without downtime**\n\n" +
      "A cluster is upgraded node-by-node. Services with 2+ replicas, correct readiness probes, and realistic PDBs stay available. Teams without these controls experience outages during drains. The lesson: operational controls are not optional — they are production requirements.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. PDBs and probes make maintenance safe\n" +
      "2. Quotas and limits keep multi-team clusters stable\n" +
      "3. Autoscaling must be observed and bounded\n" +
      "4. Governance enables safe autonomy",

    nextSteps:
      "Next, adopt a service mesh to standardize mTLS and traffic policy, and to unlock progressive delivery patterns with better visibility."
  },

  'service-mesh-deep-dive': {
    introduction:
      "A service mesh gives you consistent service-to-service security and traffic controls without rewriting every application client.\n\n" +
      "In this lesson you’ll learn Istio fundamentals (sidecars, control plane), apply mTLS and policy, and practice safe traffic routing patterns.",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- mTLS by default removes a huge class of in-cluster security risk\n" +
      "- Traffic policy (timeouts/retries) can be standardized\n" +
      "- Telemetry becomes richer and more consistent\n\n" +
      "Meshes can also be noisy and complex — success comes from minimal, intentional policies.",

    concepts: [
      {
        title: 'Control Plane vs Data Plane',
        content:
          "The data plane (sidecars) intercepts traffic; the control plane configures routing/security policies. Your mental model should be: *policy changes should be safe and reversible*."
      },
      {
        title: 'mTLS and Authorization',
        content:
          "mTLS provides identity for workloads. Authorization policies define who can call whom. This enables a practical zero-trust posture inside the cluster."
      },
      {
        title: 'Traffic Policy and Progressive Delivery',
        content:
          "With VirtualServices and DestinationRules, you can implement canary/blue-green routing.\n\n" +
          "Be careful: retries and timeouts can amplify load if misconfigured."
      },
      {
        title: 'Telemetry (Traces/Metrics/Logs)',
        content:
          "Mesh telemetry helps you see call graphs and latency. Use it to answer: which dependency is slow and where errors originate."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Install Istio and Verify Injection',
        content:
          "Install Istio, enable injection, and verify pods have sidecars:\n\n" +
          "```bash\n" +
          "kubectl create namespace istio-system\n" +
          "istioctl install --set profile=demo -y\n" +
          "kubectl label namespace default istio-injection=enabled --overwrite\n" +
          "kubectl get pods -n istio-system\n" +
          "```\n\n" +
          "Checklist:\n\n" +
          "- New pods in the namespace have 2 containers (app + proxy)\n" +
          "- `istioctl proxy-status` shows healthy proxies"
      },
      {
        title: 'Lab 2: Enforce mTLS + Allow Only One Caller',
        content:
          "Turn on strict mTLS for a namespace/workload, then create an AuthorizationPolicy that allows only a specific service account.\n\n" +
          "Success criteria:\n\n" +
          "- Calls from allowed principal succeed\n" +
          "- Calls from other principals fail with an authorization error"
      },
      {
        title: 'Lab 3: Canary Routing (90/10) + Rollback',
        content:
          "Create stable and canary subsets and route traffic 90/10.\n\n" +
          "Checklist:\n\n" +
          "- You can increase canary weight in steps\n" +
          "- You can rollback by setting weight back to 0\n" +
          "- You observe error rate/latency while shifting traffic"
      },
      {
        title: 'Lab 4: Mesh DoD Checklist',
        content:
          "Before enabling mesh widely:\n\n" +
          "- Start with one namespace and a rollback plan\n" +
          "- Define minimal global defaults (avoid ‘catch-all’ policies)\n" +
          "- Review retries/timeouts to prevent overload amplification\n" +
          "- Ensure telemetry cost is understood\n" +
          "- Document the operational runbook (debugging, upgrades, policy changes)"
      }
    ],

    commonMistakes: [
      "Turning on strict policies cluster-wide without a staged rollout",
      "Configuring aggressive retries that amplify downstream overload",
      "Relying on mesh to fix poor app behavior (no timeouts, poor error handling)",
      "Too much telemetry without retention/cost planning",
      "Not teaching teams how to debug mesh issues"
    ],

    bestPractices: [
      "Roll out mesh incrementally (namespace by namespace)",
      "Use mTLS + authorization as the core value early",
      "Keep traffic policies simple; prefer explicit canary steps",
      "Treat policy changes as production changes (review + rollback)",
      "Make troubleshooting playbooks part of onboarding"
    ],

    realWorldExample:
      "**Scenario: Standardizing security and routing**\n\n" +
      "A platform team enables mTLS and standard timeouts across services, then introduces canary routing for critical APIs. Incidents become easier to triage because telemetry shows which hop is slow. The rollout succeeds because it is staged and reversible, not a single big-bang change.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. Mesh enables consistent security and traffic policy\n" +
      "2. Rollouts must be staged and reversible\n" +
      "3. Misconfigured retries/timeouts can worsen outages\n" +
      "4. Operational runbooks are required",

    nextSteps:
      "Next, build full observability (metrics, logs, traces) and use it to drive SLOs, dashboards, and alerting in the next module."
  },

  'metrics-with-prometheus-grafana': {
    introduction:
      "Metrics answer: **what is happening right now?** They are the fastest signal during incidents and the foundation for SLOs and alerting.\n\n" +
      "In this lesson you’ll deploy Prometheus and Grafana, write PromQL for the golden signals, build dashboards that support incident response, and create alert rules that are actionable.",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- Metrics detect problems earlier than logs\n" +
      "- Dashboards shorten diagnosis time by showing the right context\n" +
      "- Good alerting reduces noise and prevents missed incidents\n\n" +
      "Without metrics, teams guess. With metrics, teams verify.",

    concepts: [
      {
        title: 'Metric Types (Counter/Gauge/Histogram)',
        content:
          "Counters only go up (requests, errors). Gauges go up/down (CPU, queue depth). Histograms capture distributions (latency).\n\n" +
          "Latency should be measured as a distribution (p50/p95/p99), not as a single average."
      },
      {
        title: 'Prometheus Model (Scrape, Targets, Labels)',
        content:
          "Prometheus scrapes metrics endpoints on a schedule. Targets come from service discovery and are organized by labels.\n\n" +
          "Labeling is powerful but dangerous: high-cardinality labels can explode cost and performance."
      },
      {
        title: 'Golden Signals and Incident Dashboards',
        content:
          "Build dashboards around: traffic, errors, latency, saturation.\n\n" +
          "A good incident dashboard shows: current impact, top offenders, and links to logs/traces."
      },
      {
        title: 'Alerting: Actionable and Low Noise',
        content:
          "Alerts should be symptoms users care about (high error rate, SLO burn) and should include clear next steps.\n\n" +
          "Prefer fewer, better alerts over comprehensive noise."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Validate Scrape Targets',
        content:
          "After deploying Prometheus, confirm what it is scraping:\n\n" +
          "- List ServiceMonitors/PodMonitors (if using Prometheus Operator)\n" +
          "- Check Prometheus targets page\n" +
          "- Confirm your app exposes `/metrics`\n\n" +
          "Success criteria: you can point to the exact target and see the metric names appearing."
      },
      {
        title: 'Lab 2: PromQL for Golden Signals',
        content:
          "Write (and save) three queries:\n\n" +
          "- Request rate\n" +
          "- Error rate (5xx)\n" +
          "- Latency p95 (histogram)\n\n" +
          "Checklist:\n\n" +
          "- Queries are scoped with labels (service/namespace)\n" +
          "- You can explain the time window used (e.g., 5m)\n" +
          "- You can tell if the change is real or noise"
      },
      {
        title: 'Lab 3: Build an Incident Dashboard (Minimum)',
        content:
          "Create a dashboard with 6 panels:\n\n" +
          "- Traffic (RPS)\n" +
          "- Errors (5xx rate + %)\n" +
          "- Latency (p50/p95)\n" +
          "- Saturation (CPU/memory)\n" +
          "- Top pods by restarts\n" +
          "- Top endpoints by latency (if metrics available)\n\n" +
          "Deliverable: a screenshot or exported dashboard JSON."
      },
      {
        title: 'Lab 4: DoD Checklist (Metrics)',
        content:
          "Before production:\n\n" +
          "- Metrics endpoints are stable\n" +
          "- Labels avoid high cardinality (no userId, requestId, etc.)\n" +
          "- Dashboards cover golden signals\n" +
          "- Alerts are actionable and tested\n" +
          "- On-call knows where to look first"
      }
    ],

    commonMistakes: [
      "Using averages for latency instead of percentiles",
      "High-cardinality labels that explode storage/cost",
      "Dashboards built for demos rather than incident response",
      "Alerting on everything (noise) instead of user impact",
      "No runbooks linked from alerts"
    ],

    bestPractices: [
      "Use golden signals as the default dashboard structure",
      "Use histograms for latency and alert on burn-rate or error rate",
      "Keep labels stable and low-cardinality",
      "Link dashboards and runbooks directly from alerts",
      "Review alert noise monthly and prune aggressively"
    ],

    realWorldExample:
      "**Scenario: Latency regression**\n\n" +
      "p95 latency spikes after a deploy, while traffic is stable. Metrics show saturation on one node pool and increased queue depth. The team identifies a slow dependency and rolls back quickly. Without metrics, this would look like ‘random slowness’.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. Metrics are the fastest incident signal\n" +
      "2. Golden signals make dashboards usable\n" +
      "3. Labels can make or break observability\n" +
      "4. Alerts must be actionable",

    nextSteps:
      "Next, add centralized logging so you can answer ‘why did it happen?’ and correlate logs with metrics and traces."
  },

  'logging-with-elk-loki': {
    introduction:
      "Logs answer: **why did it happen?** They provide the narrative and context behind metric spikes and failed requests.\n\n" +
      "This lesson focuses on centralized logging with Loki (or ELK), structured logs, safe labeling, and LogQL queries that help you debug incidents quickly.",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- Without central logs, debugging becomes SSH + guesswork\n" +
      "- Distributed systems need correlation IDs to connect events\n" +
      "- Logging costs can explode without discipline\n\n" +
      "The goal is searchable, structured, and secure logging — not ‘log everything’.",

    concepts: [
      {
        title: 'Structured Logging and Correlation',
        content:
          "Use structured logs (JSON) so you can filter and aggregate. Include correlation IDs (traceId/requestId) so logs connect across services."
      },
      {
        title: 'Labels and Cardinality',
        content:
          "In Loki, labels index streams. Too many unique label values (high cardinality) can break performance and cost.\n\n" +
          "Use labels for stable dimensions (service, namespace, level), and keep high-cardinality values inside log content."
      },
      {
        title: 'Retention and Access Controls',
        content:
          "Define retention based on operational needs and compliance. Restrict access to sensitive logs and avoid storing secrets/PII."
      },
      {
        title: 'Debug Workflows',
        content:
          "Start from symptoms (error spike) and narrow down by service, endpoint, traceId, and time window. Save common queries as templates for on-call."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Verify Ingestion End-to-End',
        content:
          "After deploying Loki + Promtail, verify logs are flowing:\n\n" +
          "- Promtail is running on nodes\n" +
          "- Loki is healthy\n" +
          "- Grafana can query Loki datasource\n\n" +
          "Success criteria: you can query logs for a known pod and see recent entries."
      },
      {
        title: 'Lab 2: Convert One Service to Structured Logs',
        content:
          "Pick one service and ensure it emits JSON logs with at least: `level`, `service`, `message`, and `traceId` (if available).\n\n" +
          "Then write two LogQL queries:\n\n" +
          "- Errors over time\n" +
          "- Filter by traceId from a failing request"
      },
      {
        title: 'Lab 3: Build an On-Call Log Dashboard (Minimum)',
        content:
          "Create panels for:\n\n" +
          "- Error logs by service\n" +
          "- Top error messages\n" +
          "- Recent deploy events (if logged)\n\n" +
          "Deliverable: a short list of saved queries and when to use them."
      },
      {
        title: 'Lab 4: DoD Checklist (Logging)',
        content:
          "Before production:\n\n" +
          "- Logs are structured and consistent\n" +
          "- Labels are low-cardinality\n" +
          "- Sensitive data is not logged\n" +
          "- Retention is defined\n" +
          "- A basic log dashboard exists"
      }
    ],

    commonMistakes: [
      "High-cardinality labels (userId, requestId) causing cost/perf issues",
      "Logging secrets or PII",
      "No correlation IDs, making cross-service debugging painful",
      "Too much log volume without retention planning",
      "Treating logs as the only signal (ignoring metrics/traces)"
    ],

    bestPractices: [
      "Use JSON structured logs with consistent fields",
      "Keep labels low-cardinality and stable",
      "Propagate traceId/correlation IDs into logs",
      "Define retention and access control policies",
      "Create a short list of saved queries for on-call"
    ],

    realWorldExample:
      "**Scenario: Intermittent 500s**\n\n" +
      "Metrics show a small error rate spike. Logs filtered by traceId reveal a timeout to a dependency after a deploy. The team confirms the regression and rolls back. Central logs turn a vague symptom into a precise cause.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. Logs explain the ‘why’ behind metrics\n" +
      "2. Structure and correlation make logs usable\n" +
      "3. Cardinality discipline keeps logging sustainable\n" +
      "4. Dashboards and saved queries speed up on-call",

    nextSteps:
      "Next, add distributed tracing to see where time is spent across service boundaries and dependencies."
  },

  'distributed-tracing-with-jaeger': {
    introduction:
      "Traces answer: **where did time go?** In microservices, a user request is a chain of service calls. Tracing reveals the call graph, critical path, and slow hops.\n\n" +
      "This lesson introduces OpenTelemetry (OTel) and Jaeger, and shows how to use traces to troubleshoot latency and reliability issues.",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- Logs are local to one service; traces show the whole request\n" +
      "- Latency issues are often dependency-related\n" +
      "- Traces connect metrics spikes to specific operations\n\n" +
      "With tracing, you stop guessing which service is slow.",

    concepts: [
      {
        title: 'Spans and Context Propagation',
        content:
          "A trace is made of spans. Context propagation carries trace information across services so spans connect correctly."
      },
      {
        title: 'Sampling and Safety',
        content:
          "Sampling controls cost and overhead. Be careful with attributes: avoid putting secrets/PII into traces."
      },
      {
        title: 'Using Traces for Debugging',
        content:
          "Start from a slow request, find the trace, then locate the longest span. Validate retries/timeouts are not amplifying work. Correlate with logs and metrics."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Get End-to-End Traces Working',
        content:
          "Instrument one service with OpenTelemetry and export traces to Jaeger (directly or via an OTel collector).\n\n" +
          "Success criteria: you can load Jaeger UI and see traces for real requests."
      },
      {
        title: 'Lab 2: Trace a Slow Request',
        content:
          "Create an artificial delay in a dependency (or simulate load), then:\n\n" +
          "- Find the trace for a slow request\n" +
          "- Identify the slow hop\n" +
          "- Confirm the service and endpoint involved\n\n" +
          "Deliverable: a screenshot with the highlighted span and your diagnosis."
      },
      {
        title: 'Lab 3: Correlate Logs and Traces',
        content:
          "Take a `traceId` from Jaeger and search for it in logs.\n\n" +
          "Outcome: you can pivot between metrics → trace → logs quickly during incident response."
      },
      {
        title: 'Lab 4: DoD Checklist (Tracing)',
        content:
          "Before production:\n\n" +
          "- Trace context propagates across services\n" +
          "- Sampling is configured and cost is understood\n" +
          "- Sensitive attributes are avoided\n" +
          "- Traces are useful (key spans named and tagged)\n" +
          "- On-call knows how to use tracing for latency issues"
      }
    ],

    commonMistakes: [
      "No context propagation (broken traces)",
      "Storing sensitive data in span attributes",
      "Too much tracing volume without sampling",
      "Unhelpful span names (can’t find the critical path)",
      "Treating tracing as a replacement for metrics/logs (it’s complementary)"
    ],

    bestPractices: [
      "Adopt OpenTelemetry for consistency",
      "Standardize span naming and attributes",
      "Sample thoughtfully; increase sampling during incidents",
      "Correlate traceId in logs",
      "Create a trace-based troubleshooting checklist"
    ],

    realWorldExample:
      "**Scenario: Slow checkout**\n\n" +
      "A checkout endpoint is slow. Tracing shows most time is spent waiting on an inventory call with retries. The team reduces retry aggressiveness and adds caching. Metrics confirm latency improves. Traces made the root cause obvious.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. Traces show the critical path across services\n" +
      "2. OTel standardizes instrumentation\n" +
      "3. Sampling and data safety matter\n" +
      "4. Correlation accelerates debugging",

    nextSteps:
      "Next, define SLIs/SLOs and add synthetic checks so you detect user impact early and alert with low noise."
  },

  'apm-synthetic-monitoring': {
    introduction:
      "Monitoring is not ‘alerts everywhere’. It’s choosing the right signals that reflect user experience and operational risk.\n\n" +
      "This lesson focuses on SLIs/SLOs, burn-rate alerting concepts, and synthetic monitoring that catches issues before users report them.",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- Without SLOs, teams argue about what ‘good’ means\n" +
      "- Without synthetics, you may detect outages late\n" +
      "- Without runbooks, alerts become panic instead of process\n\n" +
      "SLO-driven monitoring makes on-call sustainable.",

    concepts: [
      {
        title: 'SLIs vs SLOs vs Error Budgets',
        content:
          "SLIs are measurements, SLOs are targets, and error budgets quantify how much unreliability you can ‘spend’ while still meeting the SLO."
      },
      {
        title: 'Burn Rate (Why Two Windows Help)',
        content:
          "Burn-rate alerting can detect fast outages (short window) while also catching slow degradation (long window) without excessive noise."
      },
      {
        title: 'Synthetic Monitoring',
        content:
          "Synthetic checks validate availability and critical user flows. Keep them simple and stable, and alert on failures that indicate real user impact."
      },
      {
        title: 'Runbooks and Operational Readiness',
        content:
          "Every critical alert should link to a runbook: what it means, where to look, and how to mitigate."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Define an SLO for One User Journey',
        content:
          "Pick a journey (login, checkout). Define:\n\n" +
          "- SLI (what you measure)\n" +
          "- SLO (the target)\n" +
          "- Error budget (allowed failures)\n\n" +
          "Deliverable: a one-page SLO doc your team would actually use."
      },
      {
        title: 'Lab 2: Build Two Synthetic Checks',
        content:
          "Create two checks:\n\n" +
          "- Uptime `/health`\n" +
          "- A basic flow (e.g., fetch a product)\n\n" +
          "Checklist:\n\n" +
          "- Checks fail only on meaningful issues\n" +
          "- Alert messages include the URL and expected behavior\n" +
          "- You can run the same checks locally for debugging"
      },
      {
        title: 'Lab 3: Create a Minimal Runbook',
        content:
          "Write a runbook for one alert:\n\n" +
          "- What the alert means\n" +
          "- Dashboards to check\n" +
          "- Common causes\n" +
          "- Mitigation steps (rollback, scale, feature flag)\n\n" +
          "Deliverable: a short runbook you can follow under pressure."
      },
      {
        title: 'Lab 4: DoD Checklist (SLO Monitoring)',
        content:
          "Before production:\n\n" +
          "- SLOs are defined for critical journeys\n" +
          "- Alerts are low-noise and tested\n" +
          "- Synthetic checks cover key endpoints\n" +
          "- Runbooks exist for critical alerts\n" +
          "- Ownership and escalation are clear"
      }
    ],

    commonMistakes: [
      "Alerting on internal metrics without user impact",
      "No error budget concept (no trade-off framework)",
      "Too many synthetic checks (noise) instead of a few meaningful ones",
      "No runbooks (alerts create chaos)",
      "SLOs that are unrealistic or not reviewed"
    ],

    bestPractices: [
      "Start with one or two SLOs that reflect user pain",
      "Use burn-rate mindset for alerting (fast + slow detection)",
      "Keep synthetics simple and stable",
      "Attach runbooks and ownership to alerts",
      "Review SLOs and alert noise regularly"
    ],

    realWorldExample:
      "**Scenario: Detecting partial outage early**\n\n" +
      "A deployment introduces a bug that breaks one critical flow while `/health` still returns OK. Synthetic flow checks catch it immediately, and SLO burn alerts fire with actionable context. The team rolls back before a major incident forms.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. SLOs define ‘good’ in measurable terms\n" +
      "2. Synthetics detect user impact early\n" +
      "3. Alerts need runbooks and ownership\n" +
      "4. Fewer, better alerts make on-call sustainable",

    nextSteps:
      "Next, apply these observability practices to security and compliance by ensuring auditability, retention policies, and least-privilege access to telemetry."
  },

  'container-security': {
    introduction:
      "Container security is a **pipeline problem** and a **runtime problem**. You secure what you build (images and dependencies), what you ship (registry and provenance), and what you run (Kubernetes policies and runtime constraints).\n\n" +
      "This lesson gives you hands-on workflows for image scanning, hardened runtime configuration, and admission controls so insecure workloads are blocked before they hit production.",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- Most incidents start with preventable misconfigurations\n" +
      "- CVEs are constant; response must be routine\n" +
      "- A single privileged pod can become a cluster-wide compromise\n\n" +
      "Security is not a one-time checklist — it is an operational capability.",

    concepts: [
      {
        title: 'Threat Model: Build → Ship → Run',
        content:
          "Build: vulnerable dependencies and base images. Ship: registry controls, signatures, and immutability. Run: least privilege, network policy, admission policy, and runtime detection."
      },
      {
        title: 'Vulnerability Scanning (Triage Mindset)',
        content:
          "Not every finding is equally actionable. Triage by: exploitability, exposure, and fix availability.\n\n" +
          "A practical rule: block critical/high vulnerabilities **when a fix exists**, and track the rest with a remediation SLA."
      },
      {
        title: 'Least Privilege Runtime Defaults',
        content:
          "Prefer: runAsNonRoot, read-only filesystem, drop capabilities, disallow privilege escalation, and RuntimeDefault seccomp."
      },
      {
        title: 'Admission Controls (Prevent, Don’t Detect)',
        content:
          "Use Kubernetes Pod Security Admission and/or policy-as-code (OPA Gatekeeper/Kyverno) to block insecure deployments automatically."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Scan an Image and Triage Findings',
        content:
          "Build an image and scan it with one tool (Trivy or Docker Scout).\n\n" +
          "Checklist:\n\n" +
          "- Identify the top 5 findings by severity\n" +
          "- Mark which ones are fixable by base image upgrade\n" +
          "- Decide a policy: block vs warn\n\n" +
          "Deliverable: a short triage note (what you would fix now vs later)."
      },
      {
        title: 'Lab 2: Harden a Pod (SecurityContext)',
        content:
          "Take a workload and apply least-privilege settings:\n\n" +
          "- `runAsNonRoot: true`\n" +
          "- `allowPrivilegeEscalation: false`\n" +
          "- `readOnlyRootFilesystem: true`\n" +
          "- drop all Linux capabilities\n" +
          "- `seccompProfile: RuntimeDefault`\n\n" +
          "Success criteria: the workload still runs, and your settings are enforced in the pod spec."
      },
      {
        title: 'Lab 3: Enforce Pod Security Standards (Restricted)',
        content:
          "Label a namespace to enforce restricted pod security and try deploying an insecure pod.\n\n" +
          "Checklist:\n\n" +
          "- Insecure pod is blocked at admission\n" +
          "- You can read the warning/audit output and explain what to fix\n" +
          "- You can create an exception process (separate namespace with controls)"
      },
      {
        title: 'Lab 4: Container Security DoD',
        content:
          "Before production:\n\n" +
          "- Images are scanned and a policy exists (block/warn + SLA)\n" +
          "- Workloads run as non-root with minimal privileges\n" +
          "- Namespace has Pod Security enforce labels\n" +
          "- CI/CD can rebuild and redeploy quickly when a CVE drops\n" +
          "- A runbook exists for vulnerability response"
      }
    ],

    commonMistakes: [
      "Treating scans as pass/fail without triage and remediation workflow",
      "Running privileged pods because it ‘fixes’ permissions",
      "Using latest tags in production (non-reproducible builds)",
      "No admission enforcement (discovering issues after deployment)",
      "Logging secrets or shipping them inside images"
    ],

    bestPractices: [
      "Pin base images and update them regularly",
      "Run workloads with least privilege by default",
      "Enforce security at admission to prevent drift",
      "Create a CVE response routine (triage → patch → redeploy)",
      "Use SBOM/signing when you can (supply chain maturity)"
    ],

    realWorldExample:
      "**Scenario: New critical CVE**\n\n" +
      "A critical CVE drops for a popular base image. The team’s pipeline automatically scans, rebuilds with a patched base image, and redeploys the workloads. Because admission policies enforce least privilege, the runtime blast radius stays small even if an exploit attempt occurs.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. Secure build + secure runtime both matter\n" +
      "2. Scanning requires triage and a remediation workflow\n" +
      "3. Least privilege prevents cluster-level compromise\n" +
      "4. Admission controls enforce policy continuously",

    nextSteps:
      "Next, secure your secret lifecycle (storage, rotation, and GitOps patterns) so sensitive data stays out of images, logs, and repos."
  },

  'secrets-management': {
    introduction:
      "Secrets management is about controlling **who can access sensitive data**, **when**, and **how you rotate it safely**.\n\n" +
      "In this lesson you’ll practice Kubernetes secret handling, GitOps-friendly approaches (Sealed Secrets), and external secret stores (Vault/cloud) with rotation-ready patterns.",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- Secrets leak easily (logs, env dumps, misconfigured RBAC)\n" +
      "- Rotation is inevitable (incident response, compliance)\n" +
      "- GitOps needs a safe way to manage secrets without plaintext\n\n" +
      "Good secret hygiene reduces breach probability and makes response faster.",

    concepts: [
      {
        title: 'Secret Lifecycle (Create, Store, Rotate, Revoke)',
        content:
          "Treat secrets as time-bound. Design rotation into your system: dual keys, staged rollout, and clean revocation."
      },
      {
        title: 'Mount vs Environment Variables',
        content:
          "Mount secrets as files when possible. Env vars are convenient but leak more easily via process dumps, crash reports, and debug tooling."
      },
      {
        title: 'GitOps Patterns (Sealed Secrets / External Secrets)',
        content:
          "Sealed Secrets let you store encrypted secrets in Git. External Secrets pulls from a dedicated store like Vault.\n\n" +
          "Choose based on organizational maturity and operational requirements."
      },
      {
        title: 'Least Privilege Access (RBAC)',
        content:
          "Secrets should be readable only by workloads and operators that absolutely need them. Validate with `kubectl auth can-i`."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Mount a Secret as a File and Use It Safely',
        content:
          "Create a secret and mount it into a pod as a file.\n\n" +
          "Checklist:\n\n" +
          "- The secret is not printed in logs\n" +
          "- The secret is not baked into the container image\n" +
          "- Only the workload service account can read it"
      },
      {
        title: 'Lab 2: GitOps Secret Workflow (Sealed Secrets)',
        content:
          "Seal a secret and store the SealedSecret in Git.\n\n" +
          "Success criteria:\n\n" +
          "- The repo contains only encrypted data\n" +
          "- Applying the SealedSecret results in a usable Secret\n" +
          "- You understand key rotation implications"
      },
      {
        title: 'Lab 3: Rotation Drill (Dual Key Strategy)',
        content:
          "Design a rotation plan for an API key:\n\n" +
          "- Add new key\n" +
          "- Roll out remember both keys\n" +
          "- Switch traffic to new key\n" +
          "- Revoke old key\n\n" +
          "Deliverable: a written sequence of steps with rollback options."
      },
      {
        title: 'Lab 4: Secrets DoD',
        content:
          "Before production:\n\n" +
          "- Secrets are never in Git plaintext\n" +
          "- RBAC is least privilege for secrets\n" +
          "- Rotation process exists and is rehearsed\n" +
          "- Logs avoid leaking secrets\n" +
          "- Access is auditable"
      }
    ],

    commonMistakes: [
      "Committing secrets to Git (even temporarily)",
      "Over-broad RBAC (many users can read secrets)",
      "Using env vars everywhere without considering leakage",
      "No rotation plan until an incident happens",
      "Storing secrets in container images or CI logs"
    ],

    bestPractices: [
      "Prefer external secret stores for high maturity environments",
      "Mount secrets as files where possible",
      "Validate access with `kubectl auth can-i`",
      "Plan rotation with dual-key staged rollout",
      "Treat secret changes as production changes (review + audit)"
    ],

    realWorldExample:
      "**Scenario: Credential compromise**\n\n" +
      "A credential is suspected to be leaked. Because the team has a rotation drill and uses least-privilege RBAC, they rotate quickly, revoke the old secret, and confirm access logs show no unusual secret reads.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. Secrets have a lifecycle and must be rotated\n" +
      "2. GitOps needs encrypted or external secret patterns\n" +
      "3. RBAC limits blast radius\n" +
      "4. Rotation should be rehearsed, not improvised",

    nextSteps:
      "Next, turn security controls into auditable evidence with RBAC review, audit logs, and policy-as-code enforcement."
  },

  'compliance-auditing': {
    introduction:
      "Compliance is not just paperwork — it is proving that controls exist, are enforced, and are monitored.\n\n" +
      "This lesson focuses on the operational building blocks: least-privilege RBAC, audit logging, and policy-as-code so enforcement is automatic and evidence is easy to produce.",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- Audits require evidence (who changed what and when)\n" +
      "- Over-permissioned access increases breach impact\n" +
      "- Policy-as-code prevents drift and creates consistent enforcement\n\n" +
      "Good compliance engineering makes systems safer and audits less painful.",

    concepts: [
      {
        title: 'Least Privilege RBAC',
        content:
          "RBAC should be role-based and minimal. Use `kubectl auth can-i` as a testing tool: prove permissions rather than assuming them."
      },
      {
        title: 'Audit Logging and Evidence',
        content:
          "Audit logs answer who/what/when/where. The exact setup varies (managed K8s vs self-managed), but the evidence lifecycle is similar: retention, integrity, and restricted access."
      },
      {
        title: 'Policy as Code',
        content:
          "Policy-as-code (OPA Gatekeeper/Kyverno) enforces controls at admission time. This prevents insecure workloads and creates consistent rules that can be reviewed and versioned."
      },
      {
        title: 'Exception Handling',
        content:
          "Every org needs exceptions. The key is process: time-bound approvals, documented risk acceptance, and compensating controls."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: RBAC Review (Prove Access)',
        content:
          "Pick two personas (developer, auditor) and define what they should be able to do.\n\n" +
          "Then verify with `kubectl auth can-i`:\n\n" +
          "- Can developer create deployments?\n" +
          "- Can auditor read secrets? (should usually be NO)\n" +
          "- Can auditor list pods/events? (often YES)\n\n" +
          "Deliverable: a short table of permissions per persona."
      },
      {
        title: 'Lab 2: Policy Enforcement (Block Insecure Pod)',
        content:
          "Choose one control (disallow privileged pods or require runAsNonRoot) and enforce it with admission policy (Pod Security or policy-as-code).\n\n" +
          "Success criteria:\n\n" +
          "- Non-compliant pod is rejected\n" +
          "- The error message tells developers what to fix\n" +
          "- An exception path exists (separate namespace with approvals)"
      },
      {
        title: 'Lab 3: Audit Evidence Checklist',
        content:
          "Define what evidence you would produce for an audit:\n\n" +
          "- RBAC bindings for key roles\n" +
          "- Audit log retention settings\n" +
          "- Policy definitions (versioned in Git)\n" +
          "- Change management (PR approvals + CI results)\n\n" +
          "Deliverable: a short ‘evidence pack’ outline."
      },
      {
        title: 'Lab 4: DoD Checklist (Compliance Readiness)',
        content:
          "Before production compliance review:\n\n" +
          "- RBAC is least privilege and tested\n" +
          "- Policies block known-bad configurations\n" +
          "- Audit logging is enabled/retained\n" +
          "- Access to logs is restricted\n" +
          "- Exception process is documented"
      }
    ],

    commonMistakes: [
      "Using cluster-admin broadly because it is convenient",
      "No evidence retention strategy (logs overwritten too soon)",
      "Policies exist but are not enforced (warn-only forever)",
      "No exception process (shadow IT workarounds)",
      "Conflating compliance with security (they overlap, but are not identical)"
    ],

    bestPractices: [
      "Prove RBAC with tests (`kubectl auth can-i`)",
      "Version policies in Git and enforce by default",
      "Treat audit logs as sensitive data (restricted access + retention)",
      "Document controls and exceptions",
      "Automate evidence collection where possible"
    ],

    realWorldExample:
      "**Scenario: Audit request after an incident**\n\n" +
      "After a suspicious change, the team uses audit logs to identify the actor and the exact resource modifications. RBAC shows least privilege, and policy-as-code proves insecure deployments are blocked by default. Evidence is produced quickly because the controls are operational, not manual.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. Compliance is provable enforcement + evidence\n" +
      "2. RBAC reduces blast radius\n" +
      "3. Policy-as-code prevents drift\n" +
      "4. Exceptions must be controlled",

    nextSteps:
      "Next, apply these security controls to platform delivery by integrating scanning, signing, and policy gates into CI/CD and GitOps workflows."
  },

  'ml-basics-for-devops-engineers': {
    introduction:
      "Machine Learning (ML) feels mysterious until you view it as an engineering system: **data in → model out → predictions served**.\n\n" +
      "As a DevOps/MLOps engineer, your job is not to invent algorithms — it’s to make training and inference **reproducible, observable, safe, and fast to iterate**. This lesson focuses on the lifecycle and the operational mindset.",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- Training jobs are expensive; mistakes waste time and compute\n" +
      "- Inference is a production service with latency/SLA requirements\n" +
      "- Data issues silently destroy model quality\n" +
      "- Reproducibility is the difference between debugging and guessing\n\n" +
      "If you can’t reproduce a model, you can’t reliably deploy or roll it back.",

    concepts: [
      {
        title: 'The ML Lifecycle (Data → Train → Evaluate → Deploy → Monitor)',
        content:
          "Training is only one phase. Production ML requires versioning data/code, tracking experiments, packaging artifacts, and monitoring drift and performance over time."
      },
      {
        title: 'Training vs Inference (Different Systems)',
        content:
          "Training optimizes for throughput and experimentation. Inference optimizes for latency, reliability, and cost.\n\n" +
          "Common failures come from mixing assumptions: e.g., training code in a notebook vs inference code in a service with strict inputs."
      },
      {
        title: 'Evaluation Metrics (Pick the Right One)',
        content:
          "Accuracy is often misleading. Use precision/recall for imbalanced classes, F1 when you need balance, and consider ROC-AUC/PR-AUC for ranking or thresholds.\n\n" +
          "Metrics should reflect business cost of false positives vs false negatives."
      },
      {
        title: 'Data Leakage, Skew, and Drift',
        content:
          "Data leakage: the model accidentally learns future information. Skew: training data differs from serving inputs. Drift: distributions change over time.\n\n" +
          "Operationally, these look like: good offline metrics but poor production outcomes."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Run a Minimal Training + Save Artifact',
        content:
          "Goal: train a small model, evaluate it, and persist an artifact you can deploy.\n\n" +
          "Checklist:\n\n" +
          "- Split train/test deterministically (`random_state`)\n" +
          "- Print at least 2 metrics (e.g., accuracy + recall)\n" +
          "- Save model artifact to a file (e.g., `model.joblib`)\n" +
          "- Record dependencies (requirements)\n\n" +
          "Deliverable: the artifact and a short note describing data, metrics, and parameters."
      },
      {
        title: 'Lab 2: Inference Contract (Validate Inputs)',
        content:
          "Write a tiny `predict()` wrapper that:\n\n" +
          "- Loads the saved model\n" +
          "- Validates feature shape/types\n" +
          "- Returns a stable output schema (e.g., JSON with a score)\n\n" +
          "Success criteria: incorrect inputs fail fast with a clear message."
      },
      {
        title: 'Lab 3: Evaluation Drill (Threshold Choice)',
        content:
          "Pick a threshold (e.g., 0.6) and compute a confusion matrix.\n\n" +
          "Explain: what costs more in your domain — false positives or false negatives?\n\n" +
          "Deliverable: a one-paragraph justification for the chosen threshold."
      },
      {
        title: 'Lab 4: Definition of Done (ML Basics)',
        content:
          "Before you call a model ‘ready for deployment’:\n\n" +
          "- Dataset, code, and parameters are versioned\n" +
          "- Training run is reproducible\n" +
          "- Metrics are appropriate for the problem\n" +
          "- Inference contract is defined and validated\n" +
          "- You can roll forward/back by swapping artifacts"
      }
    ],

    commonMistakes: [
      "Using accuracy as the only metric",
      "Evaluating on data that leaked target information",
      "No fixed random seed (non-reproducible results)",
      "Assuming inference inputs match training features without validation",
      "Saving a model without recording dependencies and preprocessing steps"
    ],

    bestPractices: [
      "Treat training as a pipeline with versioned inputs and outputs",
      "Define an inference contract and validate requests",
      "Choose metrics that map to business cost",
      "Persist artifacts and dependencies for rollback",
      "Plan monitoring early: drift, latency, errors"
    ],

    realWorldExample:
      "**Scenario: Great offline metrics, bad production**\n\n" +
      "A model scores 95% accuracy offline, but conversions drop after deployment. Investigation shows training data contained a feature derived from future events (leakage). With reproducible runs and proper dataset versioning, the team pinpoints the issue and retrains with corrected features.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. ML is a lifecycle, not just training\n" +
      "2. Training and inference optimize for different goals\n" +
      "3. Metrics must match the problem and costs\n" +
      "4. Reproducibility is mandatory for production",

    nextSteps:
      "Next, build the Python operational toolbox (environments, notebooks-to-scripts, and data inspection) so your ML workflows stay repeatable and debuggable."
  },

  'python-for-ml-operations': {
    introduction:
      "MLOps is as much about Python engineering as it is about ML. The fastest way to lose days is environment drift, unpinned dependencies, and notebooks that can’t be reproduced.\n\n" +
      "This lesson gives you a practical toolkit: environments, dependency capture, data inspection with pandas, and turning notebook logic into scripts.",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- ‘It works on my machine’ becomes ‘it worked last week’\n" +
      "- ML code often mixes data processing + modeling + evaluation\n" +
      "- Notebooks hide state; production needs scripts and modules\n\n" +
      "Good Python ops practices make ML pipelines stable and automatable.",

    concepts: [
      {
        title: 'Environment Reproducibility',
        content:
          "Use isolated environments and capture dependencies. For small projects, `venv + requirements.txt` is fine. As maturity grows, add lockfiles and build artifacts (containers)."
      },
      {
        title: 'Notebook Discipline',
        content:
          "Notebooks are great for exploration, but production needs deterministic, parameterized runs.\n\n" +
          "A good pattern: notebook explores → script trains → CI runs the script."
      },
      {
        title: 'Data Inspection as a First-Class Step',
        content:
          "Before modeling, inspect shape, types, nulls, and basic distributions. Many ‘ML problems’ are actually data quality problems."
      },
      {
        title: 'Packaging Your Work (Functions, Modules, Main Guard)',
        content:
          "Write code that can run as a script and be imported as a module. Use `if __name__ == '__main__':` to keep execution explicit."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Create an Environment + Capture Dependencies',
        content:
          "Create a virtual environment, install dependencies, and output a `requirements.txt`.\n\n" +
          "Success criteria:\n\n" +
          "- A new machine can recreate the env from `requirements.txt`\n" +
          "- You can print versions for pandas/numpy/sklearn\n" +
          "- You can explain what goes into the environment vs the code repo"
      },
      {
        title: 'Lab 2: Data Audit Checklist (pandas)',
        content:
          "Given a CSV, answer:\n\n" +
          "- What is the schema (columns + types)?\n" +
          "- Where are missing values?\n" +
          "- Are numeric ranges reasonable?\n" +
          "- Any obvious leakage fields?\n\n" +
          "Deliverable: a short audit summary."
      },
      {
        title: 'Lab 3: Turn Notebook Logic into a Script',
        content:
          "Create `train.py` with a `run_training(data_path)` function and a main guard.\n\n" +
          "Success criteria:\n\n" +
          "- Running `python train.py` produces a saved artifact\n" +
          "- Code can be imported (no side effects on import)\n" +
          "- Inputs are passed as parameters (not hard-coded)"
      },
      {
        title: 'Lab 4: DoD Checklist (Python for MLOps)',
        content:
          "Before you automate the pipeline:\n\n" +
          "- Dependencies are captured and reproducible\n" +
          "- Training can run headlessly (no notebook-only state)\n" +
          "- Data audit is repeatable\n" +
          "- Artifacts are written to known locations\n" +
          "- Logs are readable and useful"
      }
    ],

    commonMistakes: [
      "Installing packages globally (polluting environments)",
      "Not pinning dependencies (silent breaking changes)",
      "Notebook-only training with hidden state",
      "Skipping data inspection and debugging later",
      "Hard-coding file paths and magic constants"
    ],

    bestPractices: [
      "Use isolated environments (venv/conda) per project",
      "Capture dependencies (requirements/lockfile) and versions",
      "Keep training runnable as a script",
      "Audit data before modeling",
      "Write functions for testability and reuse"
    ],

    realWorldExample:
      "**Scenario: Pipeline breaks after a dependency upgrade**\n\n" +
      "A training job starts failing because a library changed defaults in a minor release. With pinned dependencies and a reproducible environment, the team can recreate the previous run, identify the version change, and roll forward safely.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. Reproducible environments prevent wasted debugging\n" +
      "2. Notebooks are for exploration; scripts are for automation\n" +
      "3. Data audits catch issues early\n" +
      "4. Python structure enables reliable pipelines",

    nextSteps:
      "Next, you’ll track experiments, version data, and turn these scripts into repeatable MLOps pipelines with proper lineage and artifacts."
  },

  'ml-lifecycle-mlops-principles': {
    introduction:
      "MLOps exists because ML systems have **more moving parts** than typical software: data changes, models change, and performance degrades even when code stays the same.\n\n" +
      "This lesson ties the ML lifecycle to the operational capabilities you need in real teams: lineage, reproducibility, automation, and governance.",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- Without lineage, you can’t answer ‘what produced this model?’\n" +
      "- Without reproducibility, you can’t debug or roll back\n" +
      "- Without monitoring, performance silently decays\n" +
      "- Without governance, audits and approvals become chaos\n\n" +
      "The goal is consistent, fast iteration without sacrificing reliability.",

    concepts: [
      {
        title: 'Lifecycle as an Engineering System',
        content:
          "Every production model should have: versioned training data, versioned code, tracked experiments, stored artifacts, an inference contract, and monitoring."
      },
      {
        title: 'MLOps vs DevOps (What’s Extra?)',
        content:
          "DevOps versions code and deploys services. MLOps additionally versions data and models, tracks experiments/metrics, and manages drift/performance over time."
      },
      {
        title: 'Core Capabilities (The MLOps Checklist)',
        content:
          "Reproducibility, lineage, automated pipelines, artifact storage, model registry, deployment strategies, monitoring, and access control."
      },
      {
        title: 'Failure Modes (What Breaks in Production)',
        content:
          "Data leakage/skew, dependency drift, silent input schema changes, model drift, and untracked ‘hotfix’ retrains."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Artifact Map for a Model',
        content:
          "Choose a simple model and write down what must be versioned:\n\n" +
          "- Dataset snapshot\n" +
          "- Training code commit\n" +
          "- Hyperparameters\n" +
          "- Metrics report\n" +
          "- Model artifact\n\n" +
          "Deliverable: a one-page ‘lineage sheet’ for the model."
      },
      {
        title: 'Lab 2: Define an Inference Contract',
        content:
          "Define request/response schema for inference:\n\n" +
          "- Feature names/types\n" +
          "- Optional vs required fields\n" +
          "- Output schema and error handling\n\n" +
          "Deliverable: a short JSON schema or OpenAPI snippet."
      },
      {
        title: 'Lab 3: Monitoring Brainstorm (Signals)',
        content:
          "List monitoring signals you need:\n\n" +
          "- Service health (latency, errors)\n" +
          "- Data quality (nulls, ranges)\n" +
          "- Drift (feature distributions)\n" +
          "- Performance (delayed labels, business KPIs)\n\n" +
          "Deliverable: a minimal dashboard plan."
      },
      {
        title: 'Lab 4: DoD Checklist (MLOps Principles)',
        content:
          "Before you operationalize ML:\n\n" +
          "- Lineage is defined (data/code/model)\n" +
          "- Experiments are tracked\n" +
          "- Artifacts are stored and versioned\n" +
          "- Deployment path exists\n" +
          "- Monitoring signals are identified"
      }
    ],

    commonMistakes: [
      "Treating ML as a one-time training job",
      "No clear ownership for data and labels",
      "Shipping models without an inference contract",
      "Retraining without tracking datasets and parameters",
      "No plan for drift and performance decay"
    ],

    bestPractices: [
      "Always capture lineage (data + code + params + artifacts)",
      "Use a model registry and promotion workflow",
      "Automate retraining and evaluation with gates",
      "Monitor both service SLOs and ML signals",
      "Create a repeatable release process for models"
    ],

    realWorldExample:
      "**Scenario: Sudden drop in model quality**\n\n" +
      "A model’s business KPI drops after a data source changes format. Teams with an inference contract and data-quality checks catch the schema change early, and with tracked lineage they can quickly identify the last good model/data snapshot and roll back.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. MLOps adds data + model governance to DevOps\n" +
      "2. Lineage and reproducibility enable safe iteration\n" +
      "3. Monitoring is required because data changes\n" +
      "4. A model needs a release process like software",

    nextSteps:
      "Next, implement experiment tracking with MLflow so every run has parameters, metrics, and artifacts you can compare and promote."
  },

  'experiment-tracking-with-mlflow': {
    introduction:
      "Experiment tracking turns ML from ‘notebook chaos’ into an engineering workflow. MLflow provides a practical baseline: log parameters, metrics, artifacts, and optionally register models for promotion.",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- You can compare runs objectively\n" +
      "- You can reproduce a specific result later\n" +
      "- You can promote models with traceable evidence\n\n" +
      "Without tracking, teams repeat work and can’t debug regressions.",

    concepts: [
      {
        title: 'Runs, Parameters, Metrics, Artifacts',
        content:
          "A run is a single experiment execution. You log parameters (inputs), metrics (outputs), and artifacts (model files, plots, reports)."
      },
      {
        title: 'Tracking Server vs Local Store',
        content:
          "You can start locally, but teams quickly move to a shared tracking server so results are centralized and auditable."
      },
      {
        title: 'Model Registry (Promotion Workflow)',
        content:
          "Register model versions and promote them across stages (e.g., Staging → Production) with approvals and evaluation gates."
      },
      {
        title: 'What to Log (Practical Minimum)',
        content:
          "Always log: dataset version/identifier, code version (commit), key parameters, primary metrics, and the trained artifact."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Start MLflow UI and Run Training',
        content:
          "Start `mlflow ui` and run a training script that logs at least:\n\n" +
          "- 2 parameters\n" +
          "- 1+ metrics\n" +
          "- The model artifact\n\n" +
          "Success criteria: you can see the run in the UI and download the artifact."
      },
      {
        title: 'Lab 2: Compare Two Runs',
        content:
          "Change a parameter (e.g., regularization strength) and run again.\n\n" +
          "Deliverable: a short comparison explaining why you chose the better run."
      },
      {
        title: 'Lab 3: Add Lineage Fields',
        content:
          "Add tags to the run (dataset version, git commit, environment).\n\n" +
          "Success criteria: you can answer ‘what produced this run?’ from the UI alone."
      },
      {
        title: 'Lab 4: DoD Checklist (MLflow)',
        content:
          "Before adopting MLflow in a team:\n\n" +
          "- Standard set of logged fields is agreed\n" +
          "- Runs are comparable (same metrics definitions)\n" +
          "- Artifacts are stored durably\n" +
          "- Registry stages/promotion criteria exist"
      }
    ],

    commonMistakes: [
      "Logging metrics without recording dataset and code version",
      "Changing metric definitions between runs",
      "Tracking locally only (no shared evidence)",
      "No promotion criteria (best run becomes ‘latest run’)",
      "Forgetting to log artifacts (can’t reproduce deployment)"
    ],

    bestPractices: [
      "Define a run template: tags, params, and required metrics",
      "Log dataset identifiers and git commits",
      "Store artifacts in durable storage",
      "Use a registry with staged promotion",
      "Automate evaluation gates in CI"
    ],

    realWorldExample:
      "**Scenario: Regression after retraining**\n\n" +
      "A weekly retrain produces worse outcomes. With MLflow, the team compares runs, sees the dataset version changed, and quickly rolls back to the previous model while investigating the data issue.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. Tracking makes experimentation reproducible\n" +
      "2. Log lineage (data + code + params) with metrics\n" +
      "3. Artifacts enable deployment and rollback\n" +
      "4. Registries create promotion discipline",

    nextSteps:
      "Next, version datasets and build reproducible pipelines with DVC so data changes are controlled and traceable."
  },

  'data-versioning-with-dvc': {
    introduction:
      "DVC brings Git-like workflows to data and ML pipelines. It lets you version large datasets without stuffing them into Git, and it can define reproducible pipelines that you can rerun consistently.",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- Most ML failures are data failures\n" +
      "- Teams need to reproduce a model with the exact dataset snapshot\n" +
      "- Pipelines reduce manual steps and hidden notebook state\n\n" +
      "If you can’t trace data changes, you can’t trust model changes.",

    concepts: [
      {
        title: 'DVC vs Git (Complementary)',
        content:
          "Git versions small text/code. DVC tracks large files by storing pointers in Git and the actual data in a DVC remote (S3/GCS/local)."
      },
      {
        title: 'Data Snapshots and Reproducibility',
        content:
          "A dataset version should be referenceable. DVC enables switching between dataset states via Git commits that contain `.dvc` pointer files."
      },
      {
        title: 'Pipelines (Stages, Dependencies, Outputs)',
        content:
          "DVC stages create a DAG: prepare → train → evaluate. `dvc repro` rebuilds only what changed."
      },
      {
        title: 'Metrics Tracking',
        content:
          "DVC can track metrics files (JSON/YAML) across commits so you can compare results tied to data changes."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Version a Dataset',
        content:
          "Initialize DVC, add a dataset, and configure a DVC remote.\n\n" +
          "Success criteria: data is stored in the DVC remote, and Git contains only the pointer file."
      },
      {
        title: 'Lab 2: Build a 3-Stage Pipeline',
        content:
          "Create stages `prepare`, `train`, and `eval`.\n\n" +
          "Run `dvc repro` and confirm only the necessary stages rerun when you change upstream inputs."
      },
      {
        title: 'Lab 3: Compare Metrics Across Commits',
        content:
          "Record a metrics file (e.g., `reports/metrics.json`) and use DVC metrics comparison to see changes across versions.\n\n" +
          "Deliverable: a brief note explaining why metrics changed (data vs code)."
      },
      {
        title: 'Lab 4: DoD Checklist (DVC)',
        content:
          "Before adopting DVC in a team:\n\n" +
          "- Remote storage is configured and accessible\n" +
          "- Dataset versions are tied to Git commits\n" +
          "- Pipelines are reproducible via `dvc repro`\n" +
          "- Metrics are tracked and comparable"
      }
    ],

    commonMistakes: [
      "Forgetting to push data to the remote",
      "Tracking data without clear dataset naming/versioning",
      "Pipelines that aren’t deterministic (randomness not controlled)",
      "Mixing manual steps and DVC stages",
      "No team conventions for remotes and storage"
    ],

    bestPractices: [
      "Define a dataset versioning convention",
      "Use DVC stages for repeatability",
      "Store metrics in machine-readable files",
      "Control randomness (seeds) for reproducibility",
      "Document how to pull data and reproduce runs"
    ],

    realWorldExample:
      "**Scenario: ‘Same code, different results’**\n\n" +
      "A model behaves differently after retraining. With DVC, the team discovers the dataset snapshot changed because of upstream filtering logic. They revert to the previous dataset version and fix the pipeline stage.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. DVC versions data without bloating Git\n" +
      "2. Pipelines create repeatable workflows\n" +
      "3. Metrics tie results to data versions\n" +
      "4. Reproducibility requires deterministic stages",

    nextSteps:
      "Next, serve a model behind an API and containerize it so you have a consistent runtime for deployment and scaling."
  },

  'model-serving-basics': {
    introduction:
      "Model serving turns a trained artifact into a production service. The core idea is simple: load an artifact, validate inputs, return predictions — but production requires reliability, observability, and repeatable packaging.",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- Inference is a user-facing SLA service\n" +
      "- Input schema drift can break predictions silently\n" +
      "- Packaging determines whether deployments are reproducible\n\n" +
      "Serving is where ML meets production reality.",

    concepts: [
      {
        title: 'Inference Contract (Schema + Validation)',
        content:
          "Define what inputs are accepted and what outputs look like. Validate early to fail fast and prevent garbage-in predictions."
      },
      {
        title: 'Health, Readiness, and Observability',
        content:
          "Expose health endpoints, log requests safely (no secrets/PII), and emit latency/error metrics."
      },
      {
        title: 'Artifact Management',
        content:
          "Serving must load the correct model version. Tie deployments to model artifact versions and include rollback strategy."
      },
      {
        title: 'Containerization for Repeatable Runtime',
        content:
          "Containers reduce environment drift. Build minimal images, pin dependencies, and run as non-root when possible."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Build a Minimal Inference API',
        content:
          "Create a FastAPI service with `/health` and `/predict`.\n\n" +
          "Success criteria: curl works and responses are stable JSON."
      },
      {
        title: 'Lab 2: Add Validation + Failure Modes',
        content:
          "Validate feature vector length and types.\n\n" +
          "Deliverable: demonstrate one bad request that returns a clear error response."
      },
      {
        title: 'Lab 3: Containerize and Run Locally',
        content:
          "Build a Docker image and run it.\n\n" +
          "Success criteria: API works from inside the container and ports are exposed correctly."
      },
      {
        title: 'Lab 4: DoD Checklist (Serving)',
        content:
          "Before production serving:\n\n" +
          "- Inference contract is documented\n" +
          "- Health endpoints exist\n" +
          "- Artifact version is explicit\n" +
          "- Container build is reproducible\n" +
          "- Basic metrics/logging exist"
      }
    ],

    commonMistakes: [
      "Serving without input validation",
      "Loading ‘latest’ model implicitly (no version pinning)",
      "No health checks (hard to operate)",
      "Logging raw payloads with sensitive data",
      "Environment drift (works locally, fails in deploy)"
    ],

    bestPractices: [
      "Define and validate the inference contract",
      "Pin model versions and dependencies",
      "Expose health/readiness endpoints",
      "Instrument latency and error rates",
      "Containerize for consistent runtime"
    ],

    realWorldExample:
      "**Scenario: Model version rollback**\n\n" +
      "A new model version increases error rates due to a preprocessing mismatch. With versioned artifacts and a stable serving container, the team rolls back quickly to the previous artifact and resolves the preprocessing contract mismatch.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. Serving is a production API with SLAs\n" +
      "2. Validation prevents silent failure\n" +
      "3. Versioned artifacts enable rollbacks\n" +
      "4. Containers make runtimes repeatable",

    nextSteps:
      "Next, compose these pieces into automated ML pipelines (e.g., Kubeflow/Airflow) that produce trackable artifacts from versioned data."
  },

  'kubeflow-pipelines': {
    introduction:
      "Kubeflow Pipelines (KFP) is an ML-native workflow engine on Kubernetes. It helps you turn ad-hoc training scripts into **repeatable, parameterized pipelines** with artifact lineage.",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- Pipelines remove manual ‘run step A then B’ workflows\n" +
      "- Artifacts become traceable (which data produced which model?)\n" +
      "- Parameterization enables systematic experimentation\n" +
      "- Kubernetes execution makes scaling and isolation easier\n\n" +
      "If you can compile and run it, you can automate and reproduce it.",

    concepts: [
      {
        title: 'Components, Parameters, and Artifacts',
        content:
          "A pipeline is a DAG of components. Components consume parameters (small config) and artifacts (files/models/reports). Avoid passing large payloads as parameters."
      },
      {
        title: 'Compilation vs Execution',
        content:
          "You typically author a pipeline in Python, compile to a pipeline spec (YAML/JSON), and then run it in a Kubeflow environment."
      },
      {
        title: 'Caching and Reuse',
        content:
          "KFP can reuse cached step outputs when inputs don’t change. This speeds iteration but requires idempotent, deterministic components."
      },
      {
        title: 'Operational Reality: It’s Kubernetes',
        content:
          "Most ‘KFP issues’ are Kubernetes issues: image pull failures, RBAC permissions, resource limits, or artifact store connectivity."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Compile a Minimal Pipeline',
        content:
          "Create a 2–3 step pipeline (prepare → train → evaluate) and compile it to a pipeline YAML.\n\n" +
          "Success criteria:\n\n" +
          "- Pipeline compiles without errors\n" +
          "- You can explain what is a parameter vs artifact\n" +
          "- Outputs are written to artifact paths"
      },
      {
        title: 'Lab 2: Artifact Passing',
        content:
          "Pass a ‘prepared dataset’ artifact (file path) to a ‘train’ component, and produce a model artifact as output.\n\n" +
          "Deliverable: a simple artifact chain that you can point to for lineage."
      },
      {
        title: 'Lab 3: Parameterize a Run',
        content:
          "Add parameters (e.g., learning rate, epochs) and compile again.\n\n" +
          "Explain how you’d run hyperparameter sweeps (even if you don’t implement them yet)."
      },
      {
        title: 'Lab 4: DoD Checklist (KFP)',
        content:
          "Before adopting KFP:\n\n" +
          "- Components are containerized and deterministic\n" +
          "- Artifacts are stored durably\n" +
          "- Resource limits are defined\n" +
          "- Logging and failure handling is clear\n" +
          "- You have a path to promote artifacts to serving"
      }
    ],

    commonMistakes: [
      "Passing large datasets via parameters or logs",
      "Non-deterministic components (random seeds not controlled)",
      "No resource requests/limits (OOM kills)",
      "Assuming images exist in-cluster (not pushed/tagged)",
      "Treating pipeline specs as runtime logs (no artifact store)"
    ],

    bestPractices: [
      "Use artifacts for data/models and parameters for small configs",
      "Make components idempotent and deterministic",
      "Pin container images and dependencies",
      "Define resource requests/limits and timeouts",
      "Design a promotion path from pipeline output → registry → deployment"
    ],

    realWorldExample:
      "**Scenario: Reproducing a production model**\n\n" +
      "An incident requires reproducing the model currently in production. With KFP, you can trace the exact pipeline run, its parameters, and its dataset artifacts, then re-run the pipeline deterministically to verify behavior before applying fixes.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. KFP pipelines make ML workflows repeatable\n" +
      "2. Artifacts provide lineage for models and datasets\n" +
      "3. Caching and parameters speed iteration\n" +
      "4. Most failures are Kubernetes operational issues",

    nextSteps:
      "Next, orchestrate ML workflows with Airflow for scheduling, backfills, and operational reliability patterns commonly used for batch ML."
  },

  'airflow-for-ml': {
    introduction:
      "Apache Airflow is a general-purpose workflow orchestrator. In ML, it’s commonly used for **batch pipelines** (data prep, training, evaluation) and integrating with external systems.",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- Scheduling and backfills are critical for batch ML\n" +
      "- Retries and alerting improve operational reliability\n" +
      "- DAG structure provides visibility and auditing\n\n" +
      "Airflow excels when you need time-based orchestration and integration across systems.",

    concepts: [
      {
        title: 'DAGs, Tasks, and Schedules',
        content:
          "A DAG defines tasks and dependencies. Airflow executes tasks on a schedule or manually. Think in terms of idempotent tasks that can be retried safely."
      },
      {
        title: 'Retries, SLAs, and Backfills',
        content:
          "Airflow provides operational primitives: retries for transient failures, SLAs for alerts, and backfills to re-run historical partitions when logic changes."
      },
      {
        title: 'Artifacts and XComs (Keep It Small)',
        content:
          "Use XComs for small metadata (paths/IDs), not large datasets. Store large artifacts in object storage and pass references."
      },
      {
        title: 'Airflow vs Kubeflow (When to Use Which)',
        content:
          "Airflow: scheduling + integration + batch orchestration. Kubeflow: ML-native artifact lineage and Kubernetes-first execution for ML pipelines. Many teams use both."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Build a 3-Task ML DAG',
        content:
          "Create a DAG with tasks: prepare → train → evaluate.\n\n" +
          "Success criteria: the DAG loads, tasks run in order, and outputs are visible in logs."
      },
      {
        title: 'Lab 2: Make Tasks Idempotent',
        content:
          "Update tasks to write outputs to run-specific paths and avoid non-deterministic behavior.\n\n" +
          "Deliverable: explain why retries will not corrupt results."
      },
      {
        title: 'Lab 3: Add Operational Hardening',
        content:
          "Add: retries, retry delay, timeouts, and basic failure alerting (conceptually if tooling isn’t present).\n\n" +
          "Deliverable: a DAG config snippet showing these settings."
      },
      {
        title: 'Lab 4: DoD Checklist (Airflow ML)',
        content:
          "Before running ML pipelines on a schedule:\n\n" +
          "- Tasks are idempotent\n" +
          "- Artifacts are stored outside Airflow (paths/IDs in XCom)\n" +
          "- Retries/timeouts are configured\n" +
          "- Backfill strategy is documented\n" +
          "- Ownership and alerting are clear"
      }
    ],

    commonMistakes: [
      "Passing large payloads via XCom",
      "Non-idempotent tasks that break on retries",
      "No clear data partitioning/backfill strategy",
      "Hard-coded paths and credentials",
      "Treating Airflow as a compute engine instead of an orchestrator"
    ],

    bestPractices: [
      "Design tasks as pure functions of (data partition, code version, params)",
      "Store artifacts in durable storage and pass references",
      "Use retries/timeouts and clear alerting",
      "Plan for backfills and reprocessing",
      "Separate orchestration from compute (use containers/jobs for heavy work)"
    ],

    realWorldExample:
      "**Scenario: Monthly backfill after a bug fix**\n\n" +
      "A bug in feature generation is fixed. With Airflow, the team triggers a backfill for the impacted partitions, retrains models for that period, and produces updated artifacts without manual reruns.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. Airflow is great for scheduled, batch ML workflows\n" +
      "2. Idempotency is essential for retries and backfills\n" +
      "3. Pass references to artifacts, not big payloads\n" +
      "4. Airflow and Kubeflow can complement each other",

    nextSteps:
      "Next, connect these orchestration patterns into a full end-to-end project pipeline: DVC for data, MLflow for experiments, and a containerized model service for deployment."
  },

  'model-serving-platforms': {
    introduction:
      "Model serving platforms exist to solve the hard parts of production inference: **versioning, routing, scaling, observability, and governance**.\n\n" +
      "This lesson compares platform options (Seldon/KServe/TensorFlow Serving) and gives you a deployment + troubleshooting mindset that maps well to real Kubernetes operations.",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- Inference is a user-facing production service (SLOs apply)\n" +
      "- You need safe rollouts (canary) and fast rollbacks\n" +
      "- A model version must be traceable and auditable\n" +
      "- Pre/post-processing and schema validation prevent silent failures\n\n" +
      "A platform reduces bespoke glue code and standardizes operations.",

    concepts: [
      {
        title: 'Platform vs Custom Serving',
        content:
          "Custom serving (FastAPI) is flexible but you own routing/scale/observability patterns. Platforms add standardized primitives: multi-model support, traffic splitting, autoscaling, and consistent deployment objects."
      },
      {
        title: 'Versioning and Routing',
        content:
          "Serving is about *which* model answers a request. Platforms typically implement explicit model versioning and routing rules so you can canary and A/B test safely."
      },
      {
        title: 'Operational Failure Modes',
        content:
          "Most incidents are operational: model fails to load, dependency mismatch, payload shape mismatch, CPU saturation, cold-start latency, or artifact store access failures."
      },
      {
        title: 'Observability Requirements',
        content:
          "Track latency, error rate, and throughput like any API. Add ML-specific signals where possible: input schema errors, out-of-range features, drift indicators, and model version."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Define an Inference Contract',
        content:
          "Define request/response schema for a prediction endpoint.\n\n" +
          "Checklist:\n\n" +
          "- Required fields and types\n" +
          "- Error responses (400 vs 500)\n" +
          "- Model version included in response or headers\n\n" +
          "Deliverable: a short OpenAPI snippet or JSON schema."
      },
      {
        title: 'Lab 2: Platform Deployment Walkthrough (Conceptual)',
        content:
          "Describe the objects you need to deploy on K8s:\n\n" +
          "- Serving CRD (e.g., InferenceService/SeldonDeployment)\n" +
          "- Artifact location (S3/MinIO/PVC)\n" +
          "- Resource requests/limits\n" +
          "- Autoscaling policy\n\n" +
          "Deliverable: a YAML skeleton with placeholders."
      },
      {
        title: 'Lab 3: Troubleshooting Drill',
        content:
          "Given an endpoint returning 500s:\n\n" +
          "- Check pod status and events\n" +
          "- Inspect logs for model-load errors\n" +
          "- Validate request payload shape\n" +
          "- Confirm artifact store permissions\n\n" +
          "Deliverable: a step-by-step incident checklist."
      },
      {
        title: 'Lab 4: DoD Checklist (Serving Platforms)',
        content:
          "Before production rollout:\n\n" +
          "- Model version is explicit\n" +
          "- Canary/rollback strategy exists\n" +
          "- Health checks + autoscaling are configured\n" +
          "- Latency/error metrics are emitted\n" +
          "- Payload validation prevents silent corruption"
      }
    ],

    commonMistakes: [
      "Deploying ‘latest’ model without version pinning",
      "No payload validation (silent bad predictions)",
      "Ignoring cold-start and autoscaling behavior",
      "No rollback strategy or traffic split controls",
      "Assuming platform eliminates preprocessing/postprocessing needs"
    ],

    bestPractices: [
      "Treat inference as an API product with SLOs",
      "Version artifacts and include model version in telemetry",
      "Use canaries and fast rollback",
      "Instrument latency, errors, and request volume",
      "Standardize contracts to reduce integration bugs"
    ],

    realWorldExample:
      "**Scenario: Canary catches a model regression**\n\n" +
      "A new model version increases error rate due to a serialization mismatch. With traffic splitting, only 5% of requests are impacted, alerts fire quickly, and the team rolls back to the prior version while fixing the artifact packaging.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. Platforms standardize scaling, routing, and governance\n" +
      "2. Versioning + canaries make rollouts safe\n" +
      "3. Most failures are operational and debuggable\n" +
      "4. Observability must include model context",

    nextSteps:
      "Next, optimize models for performance (latency, memory, cost) while preserving acceptable accuracy and stability."
  },

  'model-optimization': {
    introduction:
      "Model optimization is the discipline of making inference cheaper and faster while staying within acceptable quality. This usually means trading precision for performance (quantization), reducing model size (pruning), or improving runtime portability (ONNX/TFLite).",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- Latency and cost determine whether ML is viable at scale\n" +
      "- Optimization can break accuracy if not validated\n" +
      "- Different hardware needs different formats and runtimes\n\n" +
      "Optimization must be measured, not assumed.",

    concepts: [
      {
        title: 'Baseline First (Measure Before You Change)',
        content:
          "Always establish a baseline: P50/P95 latency, throughput, memory, CPU, and accuracy metrics. Optimization without a baseline is guesswork."
      },
      {
        title: 'Quantization Trade-offs',
        content:
          "INT8 quantization can massively speed CPU inference, but it may require calibration and can harm accuracy if the model is sensitive to reduced precision."
      },
      {
        title: 'Portability via ONNX',
        content:
          "ONNX is useful when you want to decouple training framework from serving runtime (e.g., onnxruntime). Validate parity between original and converted outputs."
      },
      {
        title: 'Quality Gates',
        content:
          "Treat optimization like a release: run test suites, compare metrics, and only promote if gates pass (accuracy threshold, latency improvement, no new failure modes)."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Create a Benchmark Harness',
        content:
          "Write a small benchmark that measures average latency and P95.\n\n" +
          "Deliverable: baseline numbers for your model."
      },
      {
        title: 'Lab 2: Define Quality Gates',
        content:
          "Decide acceptable thresholds, e.g.:\n\n" +
          "- Accuracy drop ≤ 0.5%\n" +
          "- P95 latency improves by ≥ 20%\n" +
          "- Memory usage decreases\n\n" +
          "Deliverable: written gates and a simple pass/fail report format."
      },
      {
        title: 'Lab 3: Conversion/Optimization Plan (Conceptual)',
        content:
          "Pick one target: ONNX, quantization, or TFLite. Outline steps and how you would validate parity.\n\n" +
          "Deliverable: a checklist including rollback strategy."
      },
      {
        title: 'Lab 4: DoD Checklist (Optimization)',
        content:
          "Before promoting an optimized model:\n\n" +
          "- Baseline metrics are captured\n" +
          "- Optimized metrics are captured\n" +
          "- Accuracy/quality gates pass\n" +
          "- Runtime compatibility is validated\n" +
          "- Rollback plan is ready"
      }
    ],

    commonMistakes: [
      "Optimizing without a baseline",
      "Only measuring average latency (ignoring tails like P95/P99)",
      "Skipping accuracy regression tests",
      "Assuming conversion formats preserve outputs exactly",
      "Ignoring operational constraints (CPU pinning, batch sizes, cold start)"
    ],

    bestPractices: [
      "Benchmark with realistic payloads and concurrency",
      "Use quality gates for promotion",
      "Track model version and optimization method in metadata",
      "Validate parity before and after conversion",
      "Prefer simple wins first (better batching, better hardware, caching)"
    ],

    realWorldExample:
      "**Scenario: Cost spike from inference traffic**\n\n" +
      "Traffic grows 5× and inference costs spike. The team adds batching and quantization, cutting P95 latency and CPU usage while keeping accuracy within gates. The rollout is canaried and monitored, then promoted.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. Optimization is measured, not assumed\n" +
      "2. Quantization/ONNX/TFLite improve performance with trade-offs\n" +
      "3. Quality gates protect accuracy\n" +
      "4. Rollouts should be staged and monitored",

    nextSteps:
      "Next, run inference at batch scale with partitioned jobs and idempotent outputs so you can backfill predictions reliably."
  },

  'batch-inference-at-scale': {
    introduction:
      "Batch inference runs predictions over large datasets on a schedule (hourly/daily) or as backfills. The engineering challenge is not a single prediction — it’s **partitioning, repeatability, and cost control**.",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- Many real ML systems score offline (recommendations, risk scoring, analytics)\n" +
      "- Backfills are common after bug fixes or new models\n" +
      "- Poor partitioning and non-idempotent writes create data corruption\n\n" +
      "Batch inference is where data engineering and MLOps meet.",

    concepts: [
      {
        title: 'Online vs Batch',
        content:
          "Online focuses on latency per request. Batch focuses on throughput and determinism per partition (day/hour). Both require consistent preprocessing and versioned artifacts."
      },
      {
        title: 'Partitioning and Idempotency',
        content:
          "Write outputs per partition and per model version. Prefer overwrite-per-partition to avoid duplicates when re-running."
      },
      {
        title: 'Distribution of Model and Features',
        content:
          "Executors must use the same model version and preprocessing logic. Treat model artifacts and preprocessing as versioned dependencies."
      },
      {
        title: 'Backfill Strategy',
        content:
          "Backfills should be explicit, trackable, and safe. Define what partitions to recompute, where outputs go, and how you validate results."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Design Partitioned Output Paths',
        content:
          "Define output paths like:\n\n" +
          "- `predictions/day=YYYY-MM-DD/model=vX/`\n\n" +
          "Deliverable: a naming convention you can use consistently."
      },
      {
        title: 'Lab 2: Idempotent Batch Job Checklist',
        content:
          "Write down how your job remains safe under retries:\n\n" +
          "- Overwrite partition outputs\n" +
          "- Avoid append without dedupe\n" +
          "- Use run_id for logs and metadata\n\n" +
          "Deliverable: a checklist for safe reruns."
      },
      {
        title: 'Lab 3: Consistency Check (Preprocessing)',
        content:
          "List the preprocessing steps and how they are versioned.\n\n" +
          "Deliverable: a plan to ensure training/serving parity for batch runs."
      },
      {
        title: 'Lab 4: DoD Checklist (Batch Inference)',
        content:
          "Before production batch inference:\n\n" +
          "- Inputs and outputs are partitioned\n" +
          "- Outputs are versioned by model\n" +
          "- Job is idempotent\n" +
          "- Artifacts are pinned\n" +
          "- Backfill strategy is documented"
      }
    ],

    commonMistakes: [
      "Appending predictions without partitioning (duplicates)",
      "Not versioning outputs by model version",
      "Running backfills manually with no tracking",
      "Preprocessing mismatch between training and batch scoring",
      "No validation checks on output distributions"
    ],

    bestPractices: [
      "Write outputs per partition and overwrite safely",
      "Include model version in output paths",
      "Validate outputs (counts, ranges, distribution checks)",
      "Pin artifacts and preprocessing versions",
      "Automate backfills with clear audit trail"
    ],

    realWorldExample:
      "**Scenario: Historical backfill after feature bug**\n\n" +
      "A feature generation bug is fixed and the last 90 days must be rescored. With partitioned outputs and an idempotent job, the team re-runs those partitions, writes outputs under a new model/version path, validates distributions, then swaps downstream consumers to the corrected dataset.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. Batch inference requires partitioning and idempotency\n" +
      "2. Outputs must be versioned by model\n" +
      "3. Preprocessing parity is critical\n" +
      "4. Backfills must be trackable and safe",

    nextSteps:
      "Next, build a feature store and validation layer so features are consistent for training and serving, and data quality failures are caught early."
  },

  'feature-store-concepts': {
    introduction:
      "Feature stores help teams reuse and serve features consistently across training and inference. They solve a common production problem: **training code and serving code compute features differently**, leading to skew, drift, and incidents.\n\n" +
      "In this lesson you’ll learn the key concepts (entities, feature views, offline/online stores) and how they connect to point-in-time correctness and operational reliability.",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- Feature inconsistency is a top source of production ML failures\n" +
      "- Teams waste time rebuilding the same features in different repos\n" +
      "- Point-in-time correctness prevents leakage\n" +
      "- Online serving needs low-latency, cached features\n\n" +
      "A feature store is a reliability layer as much as it is a productivity tool.",

    concepts: [
      {
        title: 'Offline vs Online Store',
        content:
          "Offline store: historical feature values for training and analysis (batch). Online store: low-latency lookups for production inference. Both should be consistent and versioned."
      },
      {
        title: 'Entities, Feature Views, and Feature Services',
        content:
          "Entity = join key (e.g., customer_id). Feature view = definition + schema + TTL. Feature service = a bundle of features served together (serving set)."
      },
      {
        title: 'Point-in-Time Correctness (Leakage Prevention)',
        content:
          "Training rows should only use information available up to the event timestamp. If features accidentally include future information, offline metrics look great but production fails."
      },
      {
        title: 'Feature Lifecycle',
        content:
          "Features need ownership and lifecycle management: define → validate → version → materialize → monitor → deprecate. Treat feature changes as production changes."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Map Your Feature Landscape',
        content:
          "Pick a simple use case (fraud, churn, recommendations) and list:\n\n" +
          "- Entities\n" +
          "- Candidate features\n" +
          "- Required freshness/latency\n" +
          "- Offline vs online needs\n\n" +
          "Deliverable: a one-page feature map."
      },
      {
        title: 'Lab 2: Define a Feature Contract',
        content:
          "For 2–3 features, define:\n\n" +
          "- Name and schema\n" +
          "- Source tables/streams\n" +
          "- TTL and freshness\n" +
          "- Point-in-time rules\n\n" +
          "Deliverable: a contract that downstream consumers can rely on."
      },
      {
        title: 'Lab 3: Online Serving Readiness Checklist',
        content:
          "Evaluate what’s needed for online features:\n\n" +
          "- Materialization schedule\n" +
          "- Backfill strategy\n" +
          "- Monitoring for freshness and missing keys\n" +
          "- Operational ownership\n\n" +
          "Deliverable: a runbook outline."
      },
      {
        title: 'Lab 4: DoD Checklist (Feature Store)',
        content:
          "Before production adoption:\n\n" +
          "- Feature schemas are versioned\n" +
          "- Point-in-time correctness is enforced\n" +
          "- Online store freshness is monitored\n" +
          "- Backfills are safe and trackable\n" +
          "- Deprecation process exists"
      }
    ],

    commonMistakes: [
      "Treating features as ad-hoc notebook code",
      "No ownership or lifecycle for features",
      "Ignoring point-in-time correctness and leaking future info",
      "Serving features without freshness monitoring",
      "Changing feature definitions without versioning"
    ],

    bestPractices: [
      "Use contracts and versioning for features",
      "Enforce point-in-time correctness",
      "Monitor freshness, missing keys, and schema drift",
      "Use feature services to standardize serving sets",
      "Make backfills and materialization idempotent"
    ],

    realWorldExample:
      "**Scenario: Training/serving skew incident**\n\n" +
      "A model performs well offline but fails in production because the serving system computes `avg_spend_30d` differently. By migrating the feature to a shared feature store definition and serving it consistently online/offline, the team eliminates skew and stabilizes performance.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. Feature stores reduce training/serving skew\n" +
      "2. Point-in-time correctness prevents leakage\n" +
      "3. Online/offline consistency is the main goal\n" +
      "4. Features need ownership and lifecycle",

    nextSteps:
      "Next, implement data validation gates so bad data never reaches feature computation or training without being detected and handled."
  },

  'data-quality-validation': {
    introduction:
      "Data validation is your early warning system. In production ML, data changes constantly: new categories appear, distributions shift, and upstream pipelines break.\n\n" +
      "This lesson focuses on pragmatic validation gates (schema, nulls, ranges, and distribution checks) and how to operationalize them with tools like Great Expectations and TFDV.",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- Bad data causes bad models and bad decisions\n" +
      "- Schema drift breaks pipelines unexpectedly\n" +
      "- Silent shifts degrade quality without obvious errors\n\n" +
      "Validation gates turn unknown failures into known, actionable failures.",

    concepts: [
      {
        title: 'Validation Types (Schema, Quality, Distribution)',
        content:
          "Schema checks ensure required columns and types. Quality checks cover nulls/ranges/uniqueness. Distribution checks catch drift-like changes and unusual spikes."
      },
      {
        title: 'Fail Fast vs Warn (Gating Strategy)',
        content:
          "Not every issue should block the pipeline. Define thresholds for block vs warn so operations stay stable while still catching real issues."
      },
      {
        title: 'Baselines and Expectations',
        content:
          "Expectations should be based on known-good data: schema snapshots, historical distributions, and business rules. Keep them versioned and reviewed like code."
      },
      {
        title: 'Incident Response for Data Quality',
        content:
          "When a gate fails: identify impacted partitions, isolate upstream changes, pause dependent jobs if needed, backfill corrected data, and add a regression test (new expectation)."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Define Critical Expectations',
        content:
          "Pick 5 expectations that would prevent the biggest failures:\n\n" +
          "- Required columns present\n" +
          "- Null rate thresholds\n" +
          "- Value range bounds\n" +
          "- Unique keys\n" +
          "- Allowed categories\n\n" +
          "Deliverable: an expectations list with thresholds."
      },
      {
        title: 'Lab 2: Add a Validation Gate to a Pipeline',
        content:
          "Place validation between ‘data ingestion’ and ‘feature computation’.\n\n" +
          "Success criteria:\n\n" +
          "- Pipeline fails fast on schema break\n" +
          "- Clear error message points to the failing rule\n" +
          "- Outputs are not produced on failure"
      },
      {
        title: 'Lab 3: Distribution Shift Alerting (Conceptual)',
        content:
          "Define 2 distribution alerts (e.g., mean shift > X%, category rate changes).\n\n" +
          "Deliverable: a simple alert spec and who gets paged."
      },
      {
        title: 'Lab 4: DoD Checklist (Validation)',
        content:
          "Before production:\n\n" +
          "- Expectations are versioned and reviewed\n" +
          "- Gating strategy is defined (block vs warn)\n" +
          "- Failures generate actionable logs\n" +
          "- Backfill and incident response are documented\n" +
          "- Drift-like checks exist for key features"
      }
    ],

    commonMistakes: [
      "Only checking schema (ignoring quality/ranges)",
      "Blocking the pipeline for every tiny shift (alert fatigue)",
      "No baseline, so thresholds are arbitrary",
      "Failures don’t have actionable error messages",
      "No backfill or incident process for data regressions"
    ],

    bestPractices: [
      "Start with a small set of high-value expectations",
      "Version expectations and review changes",
      "Use block vs warn thresholds intentionally",
      "Treat validation failures like incidents with clear ownership",
      "Add checks close to sources and before expensive steps"
    ],

    realWorldExample:
      "**Scenario: Upstream schema change**\n\n" +
      "An upstream team renames a column. Without validation, training silently uses a default value and model quality degrades. With schema gates, the pipeline fails immediately, the change is caught within minutes, and a backfill is executed after a fix.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. Validation is essential for ML reliability\n" +
      "2. Combine schema, quality, and distribution checks\n" +
      "3. Use gates (block vs warn) to balance safety and uptime\n" +
      "4. Operationalize failures with an incident process",

    nextSteps:
      "Next, monitor production models and data drift continuously to detect performance decay and trigger safe retraining workflows."
  },

  'model-performance-monitoring': {
    introduction:
      "Production ML requires two kinds of monitoring at the same time: **software reliability** (latency, errors, saturation) and **ML reliability** (data quality, drift, and model quality over time).\n\n" +
      "This lesson shows how to structure monitoring so you can detect issues early, run safe rollouts (canary/A-B), and respond with clear runbooks.",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- A model can ‘work’ (200 OK) while being wrong\n" +
      "- Label feedback is delayed, so you must design for it\n" +
      "- Rollouts need guardrails to avoid mass harm\n" +
      "- Without runbooks, regressions become multi-day outages\n\n" +
      "The goal is to detect regressions quickly and recover safely.",

    concepts: [
      {
        title: 'Four Monitoring Layers',
        content:
          "1) Service SLOs: latency/error/throughput\n2) Data quality: schema/nulls/ranges\n3) Model quality: performance vs labels (delayed)\n4) Business KPIs: impact measures (conversion, loss, churn)."
      },
      {
        title: 'Delayed Labels and Feedback Loops',
        content:
          "Most systems don’t have labels immediately. You typically log predictions with identifiers, then join later when labels arrive to compute real performance metrics."
      },
      {
        title: 'Safe Rollouts (Shadow, Canary, A/B)',
        content:
          "Shadow: run new model without affecting users. Canary: small % of traffic. A/B: controlled experiment with success metrics + guardrails."
      },
      {
        title: 'Runbooks and Ownership',
        content:
          "Monitoring without response is noise. Define owner, severity, stop conditions, and rollback procedures."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Define SLOs and Guardrails',
        content:
          "Write down:\n\n" +
          "- P95 latency target\n" +
          "- Error rate target\n" +
          "- Saturation signal (CPU/memory)\n" +
          "- Business KPI guardrail\n\n" +
          "Deliverable: an SLO + guardrail table."
      },
      {
        title: 'Lab 2: Telemetry Schema for Predictions',
        content:
          "Define the minimum fields to log per request:\n\n" +
          "- request_id / user_id\n" +
          "- model_version\n" +
          "- feature_version\n" +
          "- timestamp\n" +
          "- prediction + confidence\n" +
          "- latency + status\n\n" +
          "Deliverable: a JSON log schema or table schema."
      },
      {
        title: 'Lab 3: Rollout Plan (Canary + Stop Conditions)',
        content:
          "Create a canary plan:\n\n" +
          "- Start at 1–5% traffic\n" +
          "- Compare metrics vs baseline\n" +
          "- Define stop conditions (errors/latency/KPI)\n" +
          "- Define rollback procedure\n\n" +
          "Deliverable: a one-page rollout playbook."
      },
      {
        title: 'Lab 4: DoD Checklist (Performance Monitoring)',
        content:
          "Before production:\n\n" +
          "- SLOs and alerts exist\n" +
          "- Prediction telemetry is logged with versioning\n" +
          "- Label join pipeline is defined\n" +
          "- Canary/A-B strategy exists\n" +
          "- Incident runbook is written"
      }
    ],

    commonMistakes: [
      "Only monitoring latency/errors (ignoring correctness)",
      "No model_version in logs (can’t correlate issues)",
      "A/B tests without guardrails",
      "No join strategy for delayed labels",
      "Alerts without clear on-call ownership"
    ],

    bestPractices: [
      "Monitor service + ML signals together",
      "Log model and feature versions on every request",
      "Use canaries and stop conditions",
      "Design delayed-label evaluation pipelines",
      "Keep runbooks short and executable"
    ],

    realWorldExample:
      "**Scenario: Model rollout breaks conversion**\n\n" +
      "A new model improves offline accuracy but reduces conversion after deployment. A canary detects KPI drop within minutes, rolls back traffic to the old model, and preserves revenue while the team analyzes telemetry and feature differences.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. Monitoring must include correctness signals\n" +
      "2. Delayed labels require explicit pipelines\n" +
      "3. Safe rollouts reduce blast radius\n" +
      "4. Runbooks turn alerts into recovery",

    nextSteps:
      "Next, detect data drift and define thresholds and response workflows so you can decide when to retrain or rollback confidently."
  },

  'data-drift-detection': {
    introduction:
      "Drift detection is a practical way to answer: ‘Are today’s inputs similar to what the model learned from?’\n\n" +
      "You can detect drift without labels by comparing feature distributions over time, then decide whether to retrain, rollback, or adjust thresholds.",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- Drift is common (seasonality, product changes, user behavior)\n" +
      "- Performance can decay silently\n" +
      "- Alerts without response plans create noise\n\n" +
      "Drift detection is useful only when paired with an action plan.",

    concepts: [
      {
        title: 'Data vs Concept vs Label Drift',
        content:
          "Data drift: input distributions change. Concept drift: relationship changes. Label drift: label distribution changes.\n\nData drift can be detected without labels; concept drift typically requires labels or proxy outcomes."
      },
      {
        title: 'Baselines and Windows',
        content:
          "Choose a baseline window (training data or recent ‘healthy’ period) and compare rolling windows (daily/weekly). Consistency here matters more than perfect statistics."
      },
      {
        title: 'Thresholds and Alert Fatigue',
        content:
          "Set thresholds to be actionable. Start conservative, review incidents, and tune. Use severity tiers (warn vs page)."
      },
      {
        title: 'Response Options',
        content:
          "Investigate upstream changes, validate data quality, retrain with new data, adjust thresholds, or rollback to a prior model depending on risk."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Define Drift Baseline and Comparison Window',
        content:
          "Define:\n\n" +
          "- Baseline dataset window (e.g., last 30 days)\n" +
          "- Current window (e.g., last 24h)\n" +
          "- Feature set to monitor\n\n" +
          "Deliverable: a drift monitoring spec."
      },
      {
        title: 'Lab 2: Identify Top Shifting Features',
        content:
          "Compute basic shifts (means, category frequency changes) and list the top 5 shifting features.\n\n" +
          "Deliverable: a short report and a hypothesis about upstream causes."
      },
      {
        title: 'Lab 3: Alert Tiers + Runbook',
        content:
          "Define warn vs page thresholds and write a response runbook.\n\n" +
          "Deliverable: a short incident checklist (investigate → decide → act)."
      },
      {
        title: 'Lab 4: DoD Checklist (Drift Detection)',
        content:
          "Before production:\n\n" +
          "- Baselines/windows are defined\n" +
          "- Drift checks run on schedule\n" +
          "- Alerts map to action tiers\n" +
          "- Runbook exists\n" +
          "- Retrain/rollback path exists"
      }
    ],

    commonMistakes: [
      "No baseline (everything looks like drift)",
      "Alerting on tiny shifts (noise)",
      "No response plan (alerts ignored)",
      "Conflating drift with guaranteed performance loss",
      "Not monitoring key segments (drift in one cohort only)"
    ],

    bestPractices: [
      "Start with a small set of critical features",
      "Use alert tiers and tune thresholds over time",
      "Combine drift with data quality gates",
      "Segment monitoring (by region/product/cohort)",
      "Link drift alerts to retraining/rollback procedures"
    ],

    realWorldExample:
      "**Scenario: Seasonal drift**\n\n" +
      "A holiday season changes user behavior and feature distributions. Drift alerts trigger a retrain using recent data, and the team can compare performance safely via canary rollout while maintaining service SLOs.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. Drift checks compare distributions over time\n" +
      "2. Thresholds must be actionable\n" +
      "3. Drift signals require a response plan\n" +
      "4. Labels are needed to confirm true performance impact",

    nextSteps:
      "Next, use explainability to debug model behavior, support audits, and investigate which features drive predictions and drift changes."
  },

  'model-explainability': {
    introduction:
      "Explainability helps you answer: ‘Why did the model decide this?’ It’s useful for debugging, trust, and in some domains, regulatory requirements.\n\n" +
      "This lesson focuses on practical explainability: global vs local explanations, common pitfalls, and how to operationalize explanations safely.",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- Debugging: identify spurious correlations and leakage\n" +
      "- Trust: stakeholders need understandable behavior\n" +
      "- Compliance: audit decisions and sensitive feature handling\n\n" +
      "Explainability is not causality — but it is extremely useful for operations.",

    concepts: [
      {
        title: 'Global vs Local Explanations',
        content:
          "Global explains overall model behavior (feature importance). Local explains a single prediction (why this sample got this output). Both are useful for different workflows."
      },
      {
        title: 'Pitfalls (Correlation ≠ Causation)',
        content:
          "Most explanation methods describe associations, not causal relationships. Document limitations and avoid over-claiming what an explanation proves."
      },
      {
        title: 'Privacy and Sensitive Features',
        content:
          "Explanations can leak information. Ensure explanations are privacy-safe, and review sensitive features and fairness implications."
      },
      {
        title: 'Operational Integration',
        content:
          "Store explanation outputs or summary stats with prediction logs for audit/debug. Include model version and feature schema version."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Choose an Explainability Use Case',
        content:
          "Pick one: debugging, audit, or customer transparency.\n\n" +
          "Deliverable: define who consumes explanations and what questions they need answered."
      },
      {
        title: 'Lab 2: Define Explanation Outputs',
        content:
          "Define outputs for local explanations:\n\n" +
          "- top features contributing to the prediction\n" +
          "- confidence/score\n" +
          "- model version + feature schema version\n\n" +
          "Deliverable: a JSON schema for explanation output."
      },
      {
        title: 'Lab 3: Governance Checklist',
        content:
          "Answer:\n\n" +
          "- Which features are sensitive?\n" +
          "- Where are explanations stored?\n" +
          "- Who can access them?\n" +
          "- What is retained and for how long?\n\n" +
          "Deliverable: a short governance note."
      },
      {
        title: 'Lab 4: DoD Checklist (Explainability)',
        content:
          "Before production explainability:\n\n" +
          "- Global + local use cases are defined\n" +
          "- Outputs are versioned and privacy-safe\n" +
          "- Sensitive features are reviewed\n" +
          "- Limitations are documented\n" +
          "- Explanations integrate with monitoring/audits"
      }
    ],

    commonMistakes: [
      "Treating explanations as causal proof",
      "Exposing sensitive features in user-facing explanations",
      "No versioning of explanation logic",
      "Generating explanations but not using them operationally",
      "Ignoring fairness and bias implications"
    ],

    bestPractices: [
      "Use explainability for debugging and audits",
      "Be explicit about limitations (correlation-only)",
      "Version and secure explanation outputs",
      "Review sensitive features and fairness impacts",
      "Tie explanations to monitoring and incident workflows"
    ],

    realWorldExample:
      "**Scenario: Audit request for a decision**\n\n" +
      "A regulator requests justification for a high-risk decision. The team can retrieve the prediction record with model version, features used, and a local explanation summary, providing traceable evidence while protecting sensitive data.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. Explainability supports debugging and audits\n" +
      "2. Global and local explanations serve different needs\n" +
      "3. Privacy and governance matter\n" +
      "4. Explanations must be versioned and operationalized",

    nextSteps:
      "Next, extend monitoring to production observability by adding model dashboards, drift alerts, and automated retraining triggers tied to safe rollout workflows."
  },

  'gpu-management-in-kubernetes': {
    introduction:
      "GPUs are expensive, scarce, and easy to waste. In Kubernetes, you need the right plumbing (runtime + device plugin), the right scheduling rules (labels/taints/quotas), and operational playbooks (visibility + debugging) to run GPU workloads reliably.\n\n" +
      "This lesson focuses on practical GPU ops: how to request GPUs correctly, how to validate the node has the right drivers/runtime, and how to reduce cost by improving utilization.",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- GPU nodes can cost 10–100× CPU nodes\n" +
      "- A single mis-scheduled pod can block a whole training queue\n" +
      "- Driver/runtime mismatches create ‘works on my machine’ failures\n" +
      "- Without quotas and placement controls, teams fight for capacity\n\n" +
      "Your goal is predictable GPU scheduling and measurable utilization.",

    concepts: [
      {
        title: 'Key Components (Runtime + Device Plugin)',
        content:
          "K8s schedules GPU resources via vendors (commonly `nvidia.com/gpu`). Nodes expose GPUs through a device plugin, and containers need a compatible runtime/driver stack. If the plugin is missing or drivers are wrong, pods will never start correctly."
      },
      {
        title: 'Placement Controls (Labels, Taints, Node Pools)',
        content:
          "GPU workloads should land only on GPU nodes. Use labels (`accelerator=nvidia`) and taints (`gpu=true:NoSchedule`) so non-GPU workloads don’t take GPU capacity and GPU jobs don’t land on CPU nodes."
      },
      {
        title: 'Right-Sizing and Utilization',
        content:
          "Most waste is not ‘idle node’ waste — it’s ‘underutilized GPU’ waste. Batch inference, pack jobs with proper resource requests, and measure GPU utilization to drive cost down."
      },
      {
        title: 'Troubleshooting Patterns',
        content:
          "Common failures: pending pods (no capacity), image/runtime mismatch (crashloop), permissions, missing drivers, or plugin not advertising resources. Your playbook should start with `kubectl describe` and node resource inspection."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Validate GPU Nodes Advertise Resources',
        content:
          "Check node allocatable resources and confirm GPUs are visible.\n\n" +
          "Deliverable: a screenshot or text capture showing `nvidia.com/gpu` allocatable > 0 on GPU nodes."
      },
      {
        title: 'Lab 2: Run a GPU Smoke Test Pod',
        content:
          "Deploy a simple pod that runs `nvidia-smi`.\n\n" +
          "Deliverable: pod logs showing GPU detected."
      },
      {
        title: 'Lab 3: Enforce Placement Controls',
        content:
          "Add labels/taints and confirm GPU workloads schedule only on GPU nodes.\n\n" +
          "Deliverable: `kubectl get pod -o wide` showing placement on a GPU node."
      },
      {
        title: 'Lab 4: DoD Checklist (GPU Ops)',
        content:
          "Before production GPU workloads:\n\n" +
          "- GPU nodes advertise `nvidia.com/gpu`\n" +
          "- Smoke test passes (`nvidia-smi`)\n" +
          "- Node pools + taints/labels enforce placement\n" +
          "- Quotas/limits prevent noisy neighbors\n" +
          "- Runbook exists for Pending/CrashLoopBackOff"
      }
    ],

    commonMistakes: [
      "Forgetting to request GPUs (pod runs on CPU unexpectedly)",
      "No taints/labels (GPU nodes used for general workloads)",
      "Driver/runtime mismatch causing CUDA failures",
      "Not tracking GPU utilization (no cost feedback loop)",
      "Over-requesting GPUs per job (queue starvation)"
    ],

    bestPractices: [
      "Use node pools and enforce placement controls",
      "Start with a GPU smoke test in every cluster",
      "Measure utilization and iterate on batching/packing",
      "Keep runbooks short and action-oriented",
      "Use quotas and fair scheduling to avoid capacity fights"
    ],

    realWorldExample:
      "**Scenario: Pods stuck Pending**\n\n" +
      "A training job requests 2 GPUs but the cluster’s GPU nodes each have only 1 available due to fragmentation. By right-sizing requests and using a queue policy, the team avoids deadlocks and improves throughput without adding nodes.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. GPU reliability depends on runtime + device plugin\n" +
      "2. Scheduling needs explicit placement controls\n" +
      "3. Utilization is the biggest cost lever\n" +
      "4. Runbooks make GPU issues recoverable",

    nextSteps:
      "Next, learn distributed training patterns so you can scale training beyond a single GPU or a single node while keeping runs reproducible."
  },

  'distributed-training': {
    introduction:
      "Distributed training lets you scale training throughput by splitting work across multiple GPUs and/or machines. The trade-off is operational complexity: networking, synchronization, failure handling, and reproducibility become first-class concerns.\n\n" +
      "This lesson explains the mental model for data-parallel training (DDP-style), what usually breaks in production, and how to design runs that are debuggable.",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- Larger models and datasets require more compute\n" +
      "- Training windows are often bounded (freshness/SLA)\n" +
      "- Distributed failures can waste hours of GPU time\n\n" +
      "If you don’t make runs reproducible and observable, you won’t trust results.",

    concepts: [
      {
        title: 'Data Parallelism vs Model Parallelism',
        content:
          "Data parallelism: replicate model, split batches, aggregate gradients. Model parallelism: split the model across devices. Most production teams start with data parallelism because it’s simpler operationally."
      },
      {
        title: 'Synchronization and Communication',
        content:
          "Gradient all-reduce is the core operation. Bottlenecks are often network bandwidth/latency and poor batch sizing. Debugging requires logs and stable environment configuration."
      },
      {
        title: 'Failure Modes (NCCL, Networking, Timeouts)',
        content:
          "Common issues include rendezvous misconfig, blocked ports, DNS problems, GPU memory OOM, and NCCL timeouts. Treat these as infra incidents with a runbook."
      },
      {
        title: 'Reproducibility and Experiment Hygiene',
        content:
          "Use fixed seeds, versioned datasets, pinned dependencies, and logged configs. Distributed runs amplify noise; you need good metadata to compare runs."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Define a Minimal Distributed Run Contract',
        content:
          "Define what must be logged for every training run:\n\n" +
          "- code version\n"
          + "- dataset/version\n"
          + "- hyperparameters\n"
          + "- world size, node count\n"
          + "- model artifact location\n\n"
          + "Deliverable: a short run contract (one page)."
      },
      {
        title: 'Lab 2: Run Local DDP and Capture Metrics',
        content:
          "Run a small DDP job locally with `torchrun` and record throughput + loss.\n\n" +
          "Deliverable: a log snippet showing rank init and final loss."
      },
      {
        title: 'Lab 3: Write a Failure Runbook',
        content:
          "Write a runbook for:\n\n" +
          "- NCCL timeout\n"
          + "- OOM\n"
          + "- node/pod eviction\n"
          + "- rendezvous failure\n\n"
          + "Deliverable: a checklist of 8–12 steps."
      },
      {
        title: 'Lab 4: DoD Checklist (Distributed Training)',
        content:
          "Before production distributed training:\n\n" +
          "- Run contract is defined\n" +
          "- All configs are logged and versioned\n" +
          "- Health checks and timeouts are configured\n" +
          "- Failure runbook exists\n" +
          "- Artifacts are stored deterministically"
      }
    ],

    commonMistakes: [
      "No reproducibility metadata (can’t compare runs)",
      "Treating NCCL/network issues as ‘model bugs’",
      "Scaling world size without tuning batch size/learning rate",
      "No timeouts/health checks (runs hang forever)",
      "Not storing intermediate checkpoints (wasted compute on failure)"
    ],

    bestPractices: [
      "Start with data parallelism before model parallelism",
      "Make runs reproducible via versioned inputs + configs",
      "Use timeouts and health checks to fail fast",
      "Checkpoint periodically to limit wasted compute",
      "Treat infra failures with runbooks and ownership"
    ],

    realWorldExample:
      "**Scenario: Training job hangs at initialization**\n\n" +
      "A multi-node run hangs because rendezvous ports are blocked by a network policy. With a runbook and `NCCL_DEBUG=INFO`, the team identifies the blocked port and fixes the policy in minutes instead of burning GPU hours.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. Distributed training adds operational complexity\n" +
      "2. Data parallelism is the common starting point\n" +
      "3. Fail fast with timeouts and health checks\n" +
      "4. Reproducibility is non-negotiable",

    nextSteps:
      "Next, automate hyperparameter tuning so you can systematically search for better models while controlling compute cost and avoiding overfitting."
  },

  'automl-hyperparameter-tuning': {
    introduction:
      "Hyperparameter tuning is the practical bridge between ‘a model that works’ and ‘the best model you can deploy safely’. AutoML and tuning frameworks help you explore search spaces efficiently, but they can also waste huge amounts of compute if you don’t set guardrails.\n\n" +
      "This lesson shows how to define a safe objective, structure the search space, use pruning/early stopping, and decide when tuning is finished.",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- Tuning can improve performance more than new architectures\n" +
      "- Compute cost grows quickly with naive searches\n" +
      "- Poor tuning hygiene leads to leakage and false wins\n\n" +
      "Done well, tuning is measurable and repeatable; done poorly, it’s expensive guesswork.",

    concepts: [
      {
        title: 'Search Strategies',
        content:
          "Grid search is simple but inefficient. Random search is a strong baseline. Bayesian optimization and bandit-style methods (with pruning) improve efficiency when trials are expensive."
      },
      {
        title: 'Objective Function Design',
        content:
          "Your objective must be stable and representative. Fix splits, set seeds, avoid leakage, and prefer metrics aligned with production goals (e.g., ROC-AUC, PR-AUC, calibration)."
      },
      {
        title: 'Pruning and Early Stopping',
        content:
          "Pruning cuts off weak trials early to save compute. It’s essential at scale. Without it, tuning cost often becomes unacceptable."
      },
      {
        title: 'Overfitting to Validation',
        content:
          "Repeatedly tuning against the same validation set can overfit. Use nested CV or a final holdout test set. Promote only when holdout results confirm improvement."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Define a Tuning Budget and Guardrails',
        content:
          "Define:\n\n" +
          "- max trials\n" +
          "- max time\n" +
          "- max cost (if applicable)\n" +
          "- minimum improvement threshold\n\n" +
          "Deliverable: a tuning policy (budget + promotion rules)."
      },
      {
        title: 'Lab 2: Implement a Reproducible Objective',
        content:
          "Implement an objective with fixed splits and seeds.\n\n" +
          "Deliverable: an objective function that prints metric + params for each trial."
      },
      {
        title: 'Lab 3: Add Pruning / Early Stopping',
        content:
          "Add pruning and demonstrate that weak trials stop early.\n\n" +
          "Deliverable: logs showing pruned trials."
      },
      {
        title: 'Lab 4: DoD Checklist (Hyperparameter Tuning)',
        content:
          "Before shipping tuned models:\n\n" +
          "- Budget and guardrails are defined\n" +
          "- Objective is reproducible (splits + seeds)\n" +
          "- Pruning/early stopping is enabled\n" +
          "- Final holdout validation exists\n" +
          "- Best params + artifacts are tracked"
      }
    ],

    commonMistakes: [
      "Data leakage in preprocessing/splitting",
      "No holdout set (overfitting to validation)",
      "Search space too wide (wastes compute)",
      "No pruning (cost explodes)",
      "Promoting tiny improvements without statistical confidence"
    ],

    bestPractices: [
      "Start with random search as a baseline",
      "Constrain search spaces based on domain knowledge",
      "Use pruning and strict budgets",
      "Validate final candidates on a holdout set",
      "Track artifacts, configs, and metrics end-to-end"
    ],

    realWorldExample:
      "**Scenario: ‘Best params’ don’t reproduce**\n\n" +
      "A team finds a ‘winner’ but can’t reproduce results because splits and seeds weren’t fixed. After implementing a reproducible objective and a holdout set, they discover the improvement was noise and avoid shipping a regression.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. Tuning needs budgets and guardrails\n" +
      "2. Objectives must be reproducible\n" +
      "3. Pruning saves massive compute\n" +
      "4. Confirm wins on a holdout set",

    nextSteps:
      "Next, use these infrastructure patterns to build an end-to-end real-time ML system with safe rollouts, monitoring, and retraining triggers."
  },

  'multi-cloud-hybrid-cloud': {
    introduction:
      "Multi-cloud and hybrid cloud architecture is less about ‘using every cloud’ and more about **choosing a portable baseline** while acknowledging unavoidable cloud-specific components.\n\n" +
      "In this lesson, you’ll design a pragmatic multi-cloud operating model: portability where it matters, clear ownership, and measurable reliability (RTO/RPO) for disaster recovery.",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- Vendor risk and service outages are real\n" +
      "- Compliance and data residency may require hybrid patterns\n" +
      "- Multi-cloud adds operational overhead (tooling, skills, security)\n" +
      "- DR across regions/clouds requires explicit planning and testing\n\n" +
      "The goal is resilience and portability without turning your platform into a science project.",

    concepts: [
      {
        title: 'Portable Baseline vs Cloud-Specific Features',
        content:
          "Portable: containers, Kubernetes primitives, GitOps workflows, app-level configuration patterns.\n\nCloud-specific: IAM implementations, networking constructs, managed databases, cloud-native load balancers. Good designs isolate cloud-specific concerns behind well-defined interfaces."
      },
      {
        title: 'Identity and Access Across Clouds',
        content:
          "SSO + centralized identity is critical. Prefer short-lived credentials and workload identity patterns. Make authorization consistent with policy-as-code where possible."
      },
      {
        title: 'Networking and Connectivity',
        content:
          "Hybrid connectivity can include VPN, dedicated interconnect, and private DNS strategies. Plan ingress/egress controls and avoid coupling app identity to IP assumptions."
      },
      {
        title: 'Disaster Recovery (RTO/RPO)',
        content:
          "RTO: time to restore service. RPO: acceptable data loss. The best DR plan is explicit, tested regularly, and paired with automation (failover + validation)."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Define RTO/RPO Targets',
        content:
          "Pick a service and define:\n\n" +
          "- RTO target (e.g., 30 minutes)\n" +
          "- RPO target (e.g., 5 minutes)\n" +
          "- Dependencies (DB, cache, queues)\n\n" +
          "Deliverable: an RTO/RPO table plus a dependency list."
      },
      {
        title: 'Lab 2: Draw a Portable Deployment Baseline',
        content:
          "Design a baseline that works in Cloud A and Cloud B:\n\n" +
          "- Kubernetes cluster baseline\n" +
          "- GitOps deployment flow\n" +
          "- Secrets approach\n" +
          "- Observability approach\n\n" +
          "Deliverable: a diagram and a short description of what is portable vs cloud-specific."
      },
      {
        title: 'Lab 3: DR Runbook (Failover + Failback)',
        content:
          "Write a runbook:\n\n" +
          "- Detect incident\n" +
          "- Declare DR event\n" +
          "- Failover steps\n" +
          "- Validate traffic + data\n" +
          "- Failback steps\n\n" +
          "Deliverable: a one-page DR runbook."
      },
      {
        title: 'Lab 4: DoD Checklist (Multi-Cloud/Hybrid)',
        content:
          "Before claiming multi-cloud readiness:\n\n" +
          "- Portable baseline is defined\n" +
          "- Cloud-specific dependencies are documented\n" +
          "- RTO/RPO targets are agreed\n" +
          "- DR runbook exists and is tested\n" +
          "- Centralized observability is in place\n" +
          "- Cost controls (budgets/tags) are enforced"
      }
    ],

    commonMistakes: [
      "‘Multi-cloud’ without a DR test (only a diagram)",
      "Leaning on incompatible managed services across clouds",
      "Duplicating tooling per cloud (no standard baseline)",
      "No centralized identity/authorization model",
      "Underestimating operational cost and on-call complexity"
    ],

    bestPractices: [
      "Standardize a portable platform baseline (K8s + GitOps)",
      "Isolate cloud-specific components behind interfaces",
      "Define and test RTO/RPO regularly",
      "Centralize identity and security policies",
      "Track cost and enforce budgets early"
    ],

    realWorldExample:
      "**Scenario: Regional outage**\n\n" +
      "A primary region experiences a multi-hour outage. Because the team has tested DR automation and has clear RTO/RPO targets, traffic is shifted to a secondary region/cloud within minutes, and post-incident they execute a controlled failback.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. Multi-cloud is an operating model, not a checkbox\n" +
      "2. Portability requires a standard baseline\n" +
      "3. DR success depends on tested RTO/RPO\n" +
      "4. Keep cloud-specific components explicit and isolated",

    nextSteps:
      "Next, validate resilience with chaos engineering experiments so you can build confidence in failover behavior and operational runbooks."
  },

  'chaos-engineering': {
    introduction:
      "Chaos engineering is the discipline of increasing confidence in a system’s behavior by running controlled experiments that inject failures.\n\n" +
      "This lesson focuses on safe, hypothesis-driven chaos in Kubernetes: define steady state, pick a small blast radius, run the experiment, and turn the results into hardening work.",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- Many outages are caused by ‘unknown unknowns’\n" +
      "- DR plans and runbooks are only real after testing\n" +
      "- Controlled experiments reduce surprise and improve recovery\n\n" +
      "Chaos is not random breaking — it’s structured learning with safety controls.",

    concepts: [
      {
        title: 'Steady State and Hypotheses',
        content:
          "You need steady-state metrics (SLOs/KPIs) and a hypothesis (e.g., ‘if one pod dies, error rate stays below X%’). Without that, you’re just generating noise."
      },
      {
        title: 'Blast Radius and Stop Conditions',
        content:
          "Start small: one namespace, one service, one failure type. Define stop conditions (latency/error thresholds) and a rollback plan. Safety-first is mandatory."
      },
      {
        title: 'Experiment Types in Kubernetes',
        content:
          "Common experiments: pod kill, node drain simulation, network delay/loss, CPU/memory stress, and dependency outage simulations. Pick experiments that map to real incident history."
      },
      {
        title: 'From Findings to Engineering Work',
        content:
          "Each experiment should produce action items: improve alerts, fix timeouts/retries, add circuit breakers, update runbooks, or change deployment policies."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Write an Experiment Plan',
        content:
          "Write down:\n\n" +
          "- steady state metrics\n" +
          "- hypothesis\n" +
          "- blast radius\n" +
          "- stop conditions\n" +
          "- rollback\n\n" +
          "Deliverable: a one-page experiment plan."
      },
      {
        title: 'Lab 2: Run a Pod Failure Experiment',
        content:
          "Run a pod-kill experiment against a stateless service and observe behavior.\n\n" +
          "Deliverable: before/after metrics or logs and an outcome statement (pass/fail)."
      },
      {
        title: 'Lab 3: Identify and Fix One Weakness',
        content:
          "Choose one issue uncovered (timeouts, retries, readiness probes, scaling) and propose a fix.\n\n" +
          "Deliverable: a short ticket with acceptance criteria."
      },
      {
        title: 'Lab 4: DoD Checklist (Chaos Engineering)',
        content:
          "Before running chaos regularly:\n\n" +
          "- Steady state and hypotheses exist\n" +
          "- Blast radius is constrained\n" +
          "- Stop conditions are implemented\n" +
          "- Rollback procedure exists\n" +
          "- Results feed back into runbooks and hardening"
      }
    ],

    commonMistakes: [
      "Running experiments without steady state metrics",
      "Too large a blast radius early on",
      "No stop conditions (turning chaos into outages)",
      "Not turning findings into engineering work",
      "Treating chaos as a one-time activity instead of a practice"
    ],

    bestPractices: [
      "Start small and iterate",
      "Use hypotheses and measurable outcomes",
      "Automate rollback and enforce stop conditions",
      "Focus on incident-driven experiments",
      "Capture learnings in runbooks and playbooks"
    ],

    realWorldExample:
      "**Scenario: Latency spike on dependency slowdown**\n\n" +
      "A network-delay experiment reveals that the service lacks timeouts and retries, causing thread exhaustion. Adding timeouts, circuit breakers, and proper readiness probes improves resilience and reduces incident duration.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. Chaos is hypothesis-driven learning\n" +
      "2. Safety controls are mandatory\n" +
      "3. Experiments should map to real risk\n" +
      "4. Findings must turn into hardening work",

    nextSteps:
      "Next, continue to advanced MLOps patterns like federated learning and continuous training to build adaptive systems at enterprise scale."
  },

  'federated-learning': {
    introduction:
      "Federated learning (FL) trains a shared model across many clients (devices/organizations) **without centralizing raw data**. Instead of sending data to a server, clients train locally and send model updates that are aggregated into a global model.\n\n" +
      "This lesson builds an operational understanding of FL: the lifecycle, privacy controls, failure modes, and what makes it hard in production.",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- Privacy and data residency rules can prohibit centralizing data\n" +
      "- Edge/partner data can be valuable but inaccessible\n" +
      "- FL introduces new threats (poisoning, leakage, unreliable clients)\n\n" +
      "FL is a platform problem as much as it is an ML problem.",

    concepts: [
      {
        title: 'Federated Lifecycle (Rounds)',
        content:
          "A server selects clients, clients train locally, then send updates (gradients/weights). The server aggregates (e.g., FedAvg) and repeats. This loop must handle unreliable clients, varying compute, and non-identical data distributions."
      },
      {
        title: 'Privacy Controls (High Level)',
        content:
          "Secure aggregation prevents the server from seeing individual client updates. Differential privacy adds noise to reduce leakage risk. These controls have trade-offs (accuracy, compute, and complexity)."
      },
      {
        title: 'Threat Model and Robustness',
        content:
          "Attack surfaces include poisoning (malicious updates), sybil clients, and inference attacks on updates. Mitigations include robust aggregation, client validation, anomaly detection, and strict governance."
      },
      {
        title: 'Non-IID Data and Evaluation',
        content:
          "Client data is rarely IID. You need evaluation protocols that consider client segments and fairness. Global metrics can hide failures in important cohorts."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Define a Federated Use Case and Constraints',
        content:
          "Pick a use case and write constraints:\n\n" +
          "- Who are the clients (phones, hospitals, stores)?\n" +
          "- What data cannot move?\n" +
          "- What are privacy/compliance requirements?\n\n" +
          "Deliverable: a one-page FL problem statement."
      },
      {
        title: 'Lab 2: Sketch an FL System Architecture',
        content:
          "Draw:\n\n" +
          "- Coordinator/service that selects clients\n" +
          "- Client update pipeline\n" +
          "- Aggregation service\n" +
          "- Model registry + rollout\n\n" +
          "Deliverable: a diagram plus key APIs/events."
      },
      {
        title: 'Lab 3: Threat Model Checklist',
        content:
          "Answer:\n\n" +
          "- Can clients be malicious?\n" +
          "- Can updates leak sensitive info?\n" +
          "- What is the worst-case impact of poisoning?\n" +
          "- What mitigations are required?\n\n" +
          "Deliverable: a short threat model with mitigations."
      },
      {
        title: 'Lab 4: DoD Checklist (Federated Learning)',
        content:
          "Before production FL:\n\n" +
          "- Use case and constraints are documented\n" +
          "- Privacy controls are chosen and reviewed\n" +
          "- Threat model exists\n" +
          "- Client selection + evaluation strategy exists\n" +
          "- Rollout/rollback plan exists"
      }
    ],

    commonMistakes: [
      "Assuming FL automatically guarantees privacy",
      "Ignoring poisoning and sybil risks",
      "Evaluating only global metrics (missing cohort failures)",
      "No governance for client onboarding and access",
      "Underestimating operational complexity (device churn, bandwidth)"
    ],

    bestPractices: [
      "Start with a clear threat model",
      "Use robust evaluation across clients/cohorts",
      "Treat privacy controls as design requirements, not add-ons",
      "Design for unreliable clients and partial participation",
      "Keep rollouts and versioning as strict as centralized ML"
    ],

    realWorldExample:
      "**Scenario: Cross-organization training**\n\n" +
      "Multiple organizations want a shared model but cannot share data. FL allows local training with secure aggregation, while governance defines onboarding, validation, and incident response if anomalous updates are detected.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. FL avoids centralizing raw data\n" +
      "2. Privacy and robustness require explicit controls\n" +
      "3. Non-IID data changes evaluation strategy\n" +
      "4. FL is operationally complex",

    nextSteps:
      "Next, learn edge ML patterns so you can deploy and operate models on constrained devices with safe updates and telemetry."
  },

  'ml-at-edge': {
    introduction:
      "Edge ML runs inference (and sometimes training) on devices like phones, gateways, cameras, vehicles, and IoT nodes. The promise is low latency and privacy; the reality is tight constraints and difficult observability.\n\n" +
      "This lesson covers practical edge operations: model compression, deployment strategy, telemetry, and rollback.",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- Edge reduces latency and bandwidth costs\n" +
      "- Data may be too sensitive to centralize\n" +
      "- Offline operation can be a hard requirement\n\n" +
      "Shipping models to devices turns ML into a distributed systems problem.",

    concepts: [
      {
        title: 'Compression Techniques (Overview)',
        content:
          "Quantization reduces precision (e.g., FP32 → INT8). Pruning removes unnecessary weights. Distillation trains a smaller student model to mimic a larger teacher. These trade accuracy for speed/size."
      },
      {
        title: 'On-Device Constraints',
        content:
          "Constraints include memory, CPU/GPU/NPUs, battery/thermal limits, and intermittent connectivity. A good deployment plan accounts for worst-case device profiles."
      },
      {
        title: 'Deployment and Updates',
        content:
          "Use signed artifacts, staged rollouts, and quick rollback. Treat model updates like app updates: compatibility checks, gradual rollout, and guardrails for crash rate and latency."
      },
      {
        title: 'Telemetry and Privacy',
        content:
          "Collect minimal necessary telemetry (latency, crash rate, model version, summary stats) and avoid leaking sensitive signals. Edge observability should prioritize reliability first."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Define Edge Success Metrics',
        content:
          "Define:\n\n" +
          "- max model size\n" +
          "- max latency\n" +
          "- crash budget\n" +
          "- acceptable accuracy impact\n\n" +
          "Deliverable: an edge SLO table."
      },
      {
        title: 'Lab 2: Design a Staged Rollout and Rollback',
        content:
          "Write a rollout plan with cohorts and rollback triggers.\n\n" +
          "Deliverable: a one-page rollout policy."
      },
      {
        title: 'Lab 3: Define Telemetry Schema',
        content:
          "Define a minimal telemetry schema:\n\n" +
          "- device model/OS\n" +
          "- model_version\n" +
          "- latency bucket\n" +
          "- crash signal\n" +
          "- optional drift proxy summary\n\n" +
          "Deliverable: a JSON schema."
      },
      {
        title: 'Lab 4: DoD Checklist (Edge ML)',
        content:
          "Before shipping edge models:\n\n" +
          "- Size/latency constraints are met\n" +
          "- Artifacts are signed and versioned\n" +
          "- Staged rollout exists\n" +
          "- Rollback triggers are defined\n" +
          "- Telemetry is privacy-reviewed"
      }
    ],

    commonMistakes: [
      "No rollback path for a bad model update",
      "Collecting too much telemetry (privacy risk + bandwidth)",
      "Ignoring device diversity (only testing high-end devices)",
      "Shipping large models without compression",
      "Assuming connectivity is always available"
    ],

    bestPractices: [
      "Use staged rollouts with strict rollback triggers",
      "Test across representative device profiles",
      "Treat model artifacts as supply-chain assets (signing/versioning)",
      "Keep telemetry minimal and privacy-safe",
      "Design for offline and intermittent connectivity"
    ],

    realWorldExample:
      "**Scenario: Model update increases crash rate**\n\n" +
      "A new model uses too much memory on older devices. A staged rollout detects a crash-rate spike in one device cohort and triggers automatic rollback while the team ships a smaller quantized model.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. Edge ML optimizes latency and privacy\n" +
      "2. Constraints and device diversity dominate design\n" +
      "3. Updates require rollout and rollback discipline\n" +
      "4. Observability must be minimal and safe",

    nextSteps:
      "Next, implement continuous training so you can keep models fresh and safe over time with automated evaluation gates and controlled rollouts."
  },

  'continuous-training': {
    introduction:
      "Continuous training keeps models up to date as data and the environment change. Done well, it’s a controlled pipeline with triggers, evaluation gates, approvals, and safe rollouts — not a loop that retrains and deploys blindly.\n\n" +
      "This lesson focuses on operational safety: when to retrain, how to validate, and how to avoid shipping regressions automatically.",

    whyItMatters:
      "**Why this matters:**\n\n" +
      "- Data drift and changing behavior are inevitable\n" +
      "- Manual retraining doesn’t scale\n" +
      "- Automated retraining without gates can cause silent regressions\n\n" +
      "The goal is repeatable improvement with controlled risk.",

    concepts: [
      {
        title: 'Retraining Modes',
        content:
          "Online learning updates continuously; periodic retraining rebuilds on a schedule; incremental training updates using partial fits or warm starts. Choose based on label latency, risk tolerance, and model type."
      },
      {
        title: 'Triggers and Guardrails',
        content:
          "Common triggers: drift thresholds, KPI degradation, new labeled data volume, or schedule. Guardrails include evaluation thresholds, fairness checks, and cost budgets."
      },
      {
        title: 'Evaluation Gates and Promotion',
        content:
          "Treat retraining like CI/CD: build → evaluate → approve → canary → promote. Never skip holdout validation and rollback planning."
      },
      {
        title: 'Versioning and Reproducibility',
        content:
          "Every candidate must be reproducible: dataset version, feature version, code version, hyperparameters, and environment. Without this, you can’t debug regressions."
      }
    ],

    stepByStep: [
      {
        title: 'Lab 1: Define Triggers and Budgets',
        content:
          "Define:\n\n" +
          "- retraining triggers\n" +
          "- max compute/time budget\n" +
          "- min improvement required\n\n" +
          "Deliverable: a retraining policy."
      },
      {
        title: 'Lab 2: Define Evaluation Gates',
        content:
          "Define gates:\n\n" +
          "- accuracy/performance threshold\n" +
          "- calibration (if relevant)\n" +
          "- fairness/segment checks\n" +
          "- latency constraints\n\n" +
          "Deliverable: an evaluation checklist."
      },
      {
        title: 'Lab 3: Rollout Plan for New Models',
        content:
          "Create a canary/A-B plan with stop conditions and rollback steps.\n\n" +
          "Deliverable: a one-page rollout plan."
      },
      {
        title: 'Lab 4: DoD Checklist (Continuous Training)',
        content:
          "Before enabling continuous training:\n\n" +
          "- Triggers and budgets are defined\n" +
          "- Evaluation gates are implemented\n" +
          "- Artifacts are versioned and reproducible\n" +
          "- Canary rollout and rollback exist\n" +
          "- Monitoring covers service + ML signals"
      }
    ],

    commonMistakes: [
      "Auto-deploying retrained models without gates",
      "No reproducibility metadata (can’t debug regressions)",
      "Triggers that fire too often (cost explosion)",
      "Evaluating only global metrics (missing cohort regressions)",
      "No rollback plan (incidents become outages)"
    ],

    bestPractices: [
      "Treat retraining like CI/CD with promotion gates",
      "Version data, features, code, and environment",
      "Use strict budgets and tune triggers over time",
      "Canary and stop conditions for every deployment",
      "Monitor model + business KPIs continuously"
    ],

    realWorldExample:
      "**Scenario: Drift-triggered retrain prevents regression**\n\n" +
      "A drift alert triggers a retrain candidate, but evaluation gates detect a cohort regression and block promotion. The pipeline surfaces the issue early, and the team adjusts feature engineering before safely shipping an improved model.",

    summary:
      "## 📝 Key Takeaways\n\n" +
      "1. Continuous training needs triggers and budgets\n" +
      "2. Promotion gates prevent silent regressions\n" +
      "3. Versioning is required for debugging\n" +
      "4. Safe rollouts close the loop",

    nextSteps:
      "That completes the Phase 6 module set. Next, you can refine capstone project guidance and add end-to-end verification via API routes to ensure lesson rendering matches expectations."
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
