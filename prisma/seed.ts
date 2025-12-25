import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'path';
import curriculum, { curriculumStats } from '../src/data/curriculum';
import { generateDetailedContent } from '../src/data/lesson-content';

// Prisma 7 requires adapter for SQLite
// Use the same path as .env (project root)
const projectRoot = path.resolve(__dirname, '..');
const dbPath = path.join(projectRoot, 'dev.db');
const adapter = new PrismaBetterSqlite3({ 
  url: `file:${dbPath}`
});
const prisma = new PrismaClient({ adapter });

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function parseDuration(duration: string): number {
  const match = duration.match(/(\d+\.?\d*)/);
  if (match) {
    return Math.round(parseFloat(match[1]) * 60);
  }
  return 60;
}

async function main() {
  console.log('🌱 Seeding DevOps Academy database...\n');
  console.log('📊 Curriculum Stats:');
  console.log(`   - Phases: ${curriculumStats.totalPhases}`);
  console.log(`   - Modules: ${curriculumStats.totalModules}`);
  console.log(`   - Lessons: ${curriculumStats.totalLessons}`);
  console.log(`   - Projects: ${curriculumStats.totalProjects}`);
  console.log(`   - Total Hours: ${curriculumStats.totalHours}`);
  console.log(`   - Total XP: ${curriculumStats.totalXP.toLocaleString()}\n`);

  console.log('🗑️  Clearing existing data...');
  await prisma.userAchievement.deleteMany();
  await prisma.userSkill.deleteMany();
  await prisma.labSession.deleteMany();
  await prisma.labExerciseProgress.deleteMany();
  await prisma.dailyActivity.deleteMany();
  await prisma.lessonProgress.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();
  await prisma.track.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.user.deleteMany();

  console.log('📚 Creating phases and modules...\n');
  
  for (let phaseIndex = 0; phaseIndex < curriculum.length; phaseIndex++) {
    const phase = curriculum[phaseIndex];
    console.log(`${phase.icon} ${phase.title} (${phase.duration})`);
    
    const track = await prisma.track.create({
      data: {
        title: phase.title,
        subtitle: phase.subtitle,
        slug: slugify(phase.title),
        description: phase.description,
        icon: phase.icon,
        color: phase.color,
        level: phase.level,
        duration: phase.duration,
        order: phaseIndex + 1,
      },
    });

    for (let moduleIndex = 0; moduleIndex < phase.modules.length; moduleIndex++) {
      const mod = phase.modules[moduleIndex];
      console.log(`   📦 ${mod.title}`);
      
      const dbModule = await prisma.module.create({
        data: {
          title: mod.title,
          slug: slugify(mod.title),
          description: mod.description,
          duration: mod.duration,
          order: moduleIndex + 1,
          trackId: track.id,
        },
      });

      for (let lessonIndex = 0; lessonIndex < mod.lessons.length; lessonIndex++) {
        const lesson = mod.lessons[lessonIndex];
        const lessonSlug = slugify(lesson.title);
        
        // Generate comprehensive content with detailed explanations
        const content = generateDetailedContent(
          lessonSlug,
          lesson.title,
          lesson.description,
          lesson.objectives || [],
          lesson.codeExamples || []
        );

        await prisma.lesson.create({
          data: {
            title: lesson.title,
            slug: lessonSlug,
            description: lesson.description,
            content: content,
            type: lesson.type === 'hands-on' ? 'lab' : lesson.type,
            difficulty: phase.level,
            estimatedTime: parseDuration(lesson.duration),
            xpReward: lesson.xpReward,
            order: lessonIndex + 1,
            hasTerminal: lesson.hasTerminal || false,
            dockerImage: lesson.hasTerminal ? 'devops-academy-lab:latest' : null,
            codeExamples: lesson.codeExamples ? JSON.stringify(lesson.codeExamples) : null,
            moduleId: dbModule.id,
          },
        });
      }

      if (mod.project) {
        const project = mod.project;

        let projectContent = `# ${project.title}\n\n${project.description}\n\n`;
        projectContent += `**Duration:** ${project.duration}\n\n`;
        projectContent += `**XP Reward:** ${project.xpReward} XP\n\n`;

        const appendTextSection = (heading: string, text?: string) => {
          if (!text) return;
          projectContent += `## ${heading}\n\n${text}\n\n`;
        };

        const appendListSection = (heading: string, items?: string[]) => {
          if (!items || items.length === 0) return;
          projectContent += `## ${heading}\n\n`;
          items.forEach((item) => {
            projectContent += `- ${item}\n`;
          });
          projectContent += '\n';
        };

        appendTextSection('📌 Overview', (project as any).overview);
        appendListSection('✅ Prerequisites', (project as any).prerequisites);
        appendListSection('🧰 Suggested Stack', (project as any).suggestedStack);
        
        if (project.objectives && project.objectives.length > 0) {
          projectContent += '## Requirements\n\n';
          project.objectives.forEach(obj => {
            projectContent += `- ${obj}\n`;
          });
          projectContent += '\n';
        }

        appendListSection('🧭 Milestones', (project as any).milestones);
        appendListSection('✅ Acceptance Criteria', (project as any).acceptanceCriteria);

        const starterCommands = (project as any).starterCommands as string[] | undefined;
        if (starterCommands && starterCommands.length > 0) {
          projectContent += '## 🧪 Starter Commands\n\n```bash\n';
          projectContent += `${starterCommands.join('\n')}\n`;
          projectContent += '```\n\n';
        }

        appendListSection('🧯 Incident Runbooks', (project as any).incidentRunbooks);
        appendListSection('🌟 Stretch Goals', (project as any).stretchGoals);
        
        if (project.deliverables && project.deliverables.length > 0) {
          projectContent += '## Deliverables\n\n';
          project.deliverables.forEach(del => {
            projectContent += `- ${del}\n`;
          });
          projectContent += '\n';
        }

        await prisma.lesson.create({
          data: {
            title: project.title,
            slug: slugify(project.title),
            description: project.description,
            content: projectContent,
            type: 'project',
            difficulty: phase.level,
            estimatedTime: parseDuration(project.duration) * 60,
            xpReward: project.xpReward,
            order: mod.lessons.length + 1,
            hasTerminal: project.hasTerminal || false,
            dockerImage: project.hasTerminal ? 'devops-academy-lab:latest' : null,
            moduleId: dbModule.id,
          },
        });
      }
    }
    console.log('');
  }

  console.log('💪 Creating skills...');
  const skills = [
    { name: 'Linux & CLI', category: 'devops', icon: '🐧', color: 'emerald' },
    { name: 'Shell Scripting', category: 'devops', icon: '📜', color: 'emerald' },
    { name: 'Git & Version Control', category: 'devops', icon: '📚', color: 'orange' },
    { name: 'Docker', category: 'devops', icon: '🐳', color: 'blue' },
    { name: 'Kubernetes', category: 'devops', icon: '☸️', color: 'blue' },
    { name: 'CI/CD', category: 'devops', icon: '🚀', color: 'purple' },
    { name: 'Terraform', category: 'devops', icon: '🏗️', color: 'purple' },
    { name: 'Ansible', category: 'devops', icon: '🔧', color: 'red' },
    { name: 'Monitoring & Observability', category: 'devops', icon: '📊', color: 'yellow' },
    { name: 'Security', category: 'devops', icon: '🔒', color: 'red' },
    { name: 'Cloud (AWS)', category: 'cloud', icon: '☁️', color: 'orange' },
    { name: 'Cloud (GCP)', category: 'cloud', icon: '☁️', color: 'blue' },
    { name: 'Cloud (Azure)', category: 'cloud', icon: '☁️', color: 'cyan' },
    { name: 'Python', category: 'mlops', icon: '🐍', color: 'yellow' },
    { name: 'ML Fundamentals', category: 'mlops', icon: '🧠', color: 'pink' },
    { name: 'MLflow', category: 'mlops', icon: '📈', color: 'blue' },
    { name: 'Feature Engineering', category: 'mlops', icon: '🔬', color: 'purple' },
    { name: 'Model Serving', category: 'mlops', icon: '🤖', color: 'emerald' },
    { name: 'ML Monitoring', category: 'mlops', icon: '👁️', color: 'yellow' },
    { name: 'Infrastructure as Code', category: 'devops', icon: '📝', color: 'purple' },
    { name: 'GitHub Actions', category: 'tools', icon: '⚡', color: 'gray' },
    { name: 'GitLab CI', category: 'tools', icon: '🦊', color: 'orange' },
    { name: 'Jenkins', category: 'tools', icon: '🎩', color: 'red' },
    { name: 'ArgoCD', category: 'tools', icon: '🔄', color: 'orange' },
    { name: 'Prometheus', category: 'tools', icon: '🔥', color: 'orange' },
    { name: 'Grafana', category: 'tools', icon: '📊', color: 'orange' },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }
  console.log(`   Created ${skills.length} skills`);

  console.log('\n🏆 Creating achievements...');
  const achievements = [
    { type: 'streak', title: 'First Day', description: 'Complete your first lesson', icon: '🌟', xpReward: 50, requirement: '{"days":1}' },
    { type: 'streak', title: '3-Day Streak', description: 'Learn for 3 consecutive days', icon: '🔥', xpReward: 100, requirement: '{"days":3}' },
    { type: 'streak', title: '7-Day Streak', description: 'Learn for 7 consecutive days', icon: '🔥', xpReward: 200, requirement: '{"days":7}' },
    { type: 'streak', title: '14-Day Streak', description: 'Learn for 14 consecutive days', icon: '💪', xpReward: 300, requirement: '{"days":14}' },
    { type: 'streak', title: '30-Day Streak', description: 'Learn for 30 consecutive days', icon: '💎', xpReward: 500, requirement: '{"days":30}' },
    { type: 'streak', title: '60-Day Streak', description: 'Learn for 60 consecutive days', icon: '🏆', xpReward: 1000, requirement: '{"days":60}' },
    { type: 'streak', title: '100-Day Streak', description: 'Learn for 100 consecutive days', icon: '👑', xpReward: 2000, requirement: '{"days":100}' },
    { type: 'completion', title: 'Docker Master', description: 'Complete all Docker lessons', icon: '🐳', xpReward: 500, requirement: '{"skill":"Docker"}' },
    { type: 'completion', title: 'Kubernetes Captain', description: 'Complete all Kubernetes lessons', icon: '☸️', xpReward: 500, requirement: '{"skill":"Kubernetes"}' },
    { type: 'completion', title: 'Terraform Titan', description: 'Complete all Terraform lessons', icon: '🏗️', xpReward: 500, requirement: '{"skill":"Terraform"}' },
    { type: 'completion', title: 'CI/CD Champion', description: 'Complete all CI/CD lessons', icon: '🚀', xpReward: 500, requirement: '{"skill":"CI/CD"}' },
    { type: 'completion', title: 'Cloud Architect', description: 'Complete all cloud lessons', icon: '☁️', xpReward: 500, requirement: '{"category":"cloud"}' },
    { type: 'completion', title: 'MLOps Engineer', description: 'Complete all MLOps lessons', icon: '🤖', xpReward: 500, requirement: '{"category":"mlops"}' },
    { type: 'milestone', title: 'Phase 1 Complete', description: 'Complete Phase 1: Foundation', icon: '🏗️', xpReward: 300, requirement: '{"phase":1}' },
    { type: 'milestone', title: 'Phase 2 Complete', description: 'Complete Phase 2: Core DevOps', icon: '🔧', xpReward: 500, requirement: '{"phase":2}' },
    { type: 'milestone', title: 'Phase 3 Complete', description: 'Complete Phase 3: Advanced DevOps', icon: '🚀', xpReward: 700, requirement: '{"phase":3}' },
    { type: 'milestone', title: 'Phase 4 Complete', description: 'Complete Phase 4: MLOps Introduction', icon: '🧠', xpReward: 800, requirement: '{"phase":4}' },
    { type: 'milestone', title: 'Phase 5 Complete', description: 'Complete Phase 5: Production MLOps', icon: '🤖', xpReward: 1000, requirement: '{"phase":5}' },
    { type: 'milestone', title: 'Phase 6 Complete', description: 'Complete Phase 6: Expert Capstone', icon: '🎓', xpReward: 1500, requirement: '{"phase":6}' },
    { type: 'milestone', title: 'DevOps Hero', description: 'Complete the entire curriculum', icon: '🦸', xpReward: 5000, requirement: '{"complete":true}' },
    { type: 'milestone', title: 'First 1000 XP', description: 'Earn 1,000 XP', icon: '⭐', xpReward: 100, requirement: '{"xp":1000}' },
    { type: 'milestone', title: '5000 XP', description: 'Earn 5,000 XP', icon: '🌟', xpReward: 200, requirement: '{"xp":5000}' },
    { type: 'milestone', title: '10000 XP', description: 'Earn 10,000 XP', icon: '💫', xpReward: 500, requirement: '{"xp":10000}' },
    { type: 'milestone', title: 'XP Master', description: 'Earn 20,000+ XP', icon: '🏅', xpReward: 1000, requirement: '{"xp":20000}' },
    { type: 'completion', title: 'First Project', description: 'Complete your first project', icon: '📦', xpReward: 200, requirement: '{"projects":1}' },
    { type: 'completion', title: 'Project Pro', description: 'Complete 5 projects', icon: '🎯', xpReward: 500, requirement: '{"projects":5}' },
    { type: 'completion', title: 'Project Master', description: 'Complete all 12 projects', icon: '👑', xpReward: 2000, requirement: '{"projects":12}' },
    { type: 'milestone', title: 'Level 5', description: 'Reach Level 5', icon: '🎖️', xpReward: 100, requirement: '{"level":5}' },
    { type: 'milestone', title: 'Level 10', description: 'Reach Level 10', icon: '🏅', xpReward: 200, requirement: '{"level":10}' },
    { type: 'milestone', title: 'Level 20', description: 'Reach Level 20', icon: '🥇', xpReward: 500, requirement: '{"level":20}' },
  ];

  for (const achievement of achievements) {
    await prisma.achievement.create({ data: achievement });
  }
  console.log(`   Created ${achievements.length} achievements`);

  console.log('\n👤 Creating default user...');
  const user = await prisma.user.create({
    data: {
      name: 'DevOps Learner',
      email: 'learner@devops.academy',
      totalXp: 0,
      level: 1,
      streak: 0,
      longestStreak: 0,
    }
  });
  console.log(`   Created user: ${user.name} (${user.email})`);

  const trackCount = await prisma.track.count();
  const moduleCount = await prisma.module.count();
  const lessonCount = await prisma.lesson.count();
  
  console.log('\n✅ Seeding complete!\n');
  console.log('📊 Database Summary:');
  console.log(`   - Tracks (Phases): ${trackCount}`);
  console.log(`   - Modules: ${moduleCount}`);
  console.log(`   - Lessons: ${lessonCount}`);
  console.log(`   - Skills: ${skills.length}`);
  console.log(`   - Achievements: ${achievements.length}`);
  console.log('\n🎉 DevOps Academy is ready to go!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
