# 🚀 DevOps Academy - Zero to Hero

A comprehensive learning platform for mastering DevOps and MLOps, featuring interactive lessons, hands-on labs with an integrated terminal, progress tracking, and gamification.

![DevOps Academy](https://img.shields.io/badge/DevOps-Academy-emerald)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## ✨ Features

### 📚 Learning Tracks
- **DevOps Fundamentals** - Linux, Git, Docker, CI/CD, Kubernetes, Monitoring
- **Cloud Engineering** - AWS, Terraform, Infrastructure as Code
- **MLOps Engineering** - ML Pipelines, Model Serving, ML Monitoring
- **Site Reliability Engineering** - SLIs/SLOs, Incident Management

### 🖥️ Interactive Terminal
- In-browser terminal powered by xterm.js
- Simulated DevOps environment for practice
- Ready for Docker container integration

### 📊 Progress Tracking
- Daily learning streaks
- XP and level system
- Skill progress visualization
- Achievement badges

### 🎯 Gamification
- Streaks and daily goals
- Achievements and badges
- XP rewards for completing lessons
- Weekly challenges

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: SQLite with Prisma ORM
- **Terminal**: xterm.js with WebSocket support
- **UI Components**: Radix UI, Lucide Icons

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker (optional, for full terminal functionality)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up the database**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

3. **Seed initial data (optional)**
   ```bash
   npx tsx prisma/seed.ts
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
devops-academy/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── page.tsx       # Dashboard
│   │   ├── tracks/        # Learning tracks
│   │   ├── labs/          # Interactive labs
│   │   ├── lesson/        # Lesson viewer
│   │   ├── achievements/  # Achievements page
│   │   ├── progress/      # Progress tracking
│   │   └── settings/      # User settings
│   ├── components/
│   │   ├── ui/            # Reusable UI components
│   │   ├── layout/        # Layout components
│   │   ├── terminal/      # Terminal component
│   │   └── dashboard/     # Dashboard components
│   └── lib/
│       ├── db.ts          # Prisma client
│       └── utils.ts       # Utility functions
└── package.json
```

## 🎓 Curriculum Overview

### DevOps Fundamentals (8-10 weeks)
1. Linux & Command Line (8 lessons)
2. Git & Version Control (6 lessons)
3. Docker & Containers (8 lessons)
4. CI/CD Pipelines (7 lessons)
5. Kubernetes Orchestration (10 lessons)
6. Monitoring & Observability (6 lessons)

### Cloud Engineering (10-12 weeks)
1. Cloud Fundamentals (6 lessons)
2. AWS Core Services (12 lessons)
3. Infrastructure as Code (10 lessons)
4. Cloud Networking (8 lessons)
5. Cloud Security (8 lessons)

### MLOps Engineering (12-14 weeks)
1. ML Engineering Basics (8 lessons)
2. Data & Model Versioning (6 lessons)
3. ML Pipelines (10 lessons)
4. Model Serving & Inference (10 lessons)
5. ML Monitoring (8 lessons)
6. ML Security & Governance (6 lessons)

## 🗺️ Roadmap

- [ ] Full Docker container integration
- [ ] Video lesson support  
- [ ] Quiz and assessment system
- [ ] Certificate generation
- [ ] Content management system

## 📄 License

MIT License

---

Built with ❤️ for DevOps learners | *Happy Learning! 🎉*
