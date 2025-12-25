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
  await prisma.lessonProgress.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();
  await prisma.track.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.achievement.deleteMany();

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
    { name: 'Linux', category: 'devops', level: 0, xp: 0 },
    { name: 'Shell Scripting', category: 'devops', level: 0, xp: 0 },
    { name: 'Git', category: 'devops', level: 0, xp: 0 },
    { name: 'Docker', category: 'devops', level: 0, xp: 0 },
    { name: 'Kubernetes', category: 'devops', level: 0, xp: 0 },
    { name: 'CI/CD', category: 'devops', level: 0, xp: 0 },
    { name: 'Terraform', category: 'devops', level: 0, xp: 0 },
    { name: 'Ansible', category: 'devops', level: 0, xp: 0 },
    { name: 'Monitoring', category: 'devops', level: 0, xp: 0 },
    { name: 'Security', category: 'devops', level: 0, xp: 0 },
    { name: 'AWS', category: 'cloud', level: 0, xp: 0 },
    { name: 'GCP', category: 'cloud', level: 0, xp: 0 },
    { name: 'Azure', category: 'cloud', level: 0, xp: 0 },
    { name: 'Python', category: 'mlops', level: 0, xp: 0 },
    { name: 'ML Fundamentals', category: 'mlops', level: 0, xp: 0 },
    { name: 'MLflow', category: 'mlops', level: 0, xp: 0 },
    { name: 'Feature Engineering', category: 'mlops', level: 0, xp: 0 },
    { name: 'Model Serving', category: 'mlops', level: 0, xp: 0 },
    { name: 'ML Monitoring', category: 'mlops', level: 0, xp: 0 },
    { name: 'GitHub Actions', category: 'tools', level: 0, xp: 0 },
    { name: 'GitLab CI', category: 'tools', level: 0, xp: 0 },
    { name: 'Jenkins', category: 'tools', level: 0, xp: 0 },
    { name: 'ArgoCD', category: 'tools', level: 0, xp: 0 },
    { name: 'Prometheus', category: 'tools', level: 0, xp: 0 },
    { name: 'Grafana', category: 'tools', level: 0, xp: 0 },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }
  console.log(`   Created ${skills.length} skills`);

  console.log('\n🏆 Creating achievements...');
  const achievements = [
    { type: 'streak', title: 'First Day', description: 'Complete your first lesson', icon: '🌟' },
    { type: 'streak', title: '7-Day Streak', description: 'Learn for 7 consecutive days', icon: '🔥' },
    { type: 'streak', title: '30-Day Streak', description: 'Learn for 30 consecutive days', icon: '💎' },
    { type: 'streak', title: '100-Day Streak', description: 'Learn for 100 consecutive days', icon: '🏆' },
    { type: 'completion', title: 'Docker Master', description: 'Complete all Docker lessons', icon: '🐳' },
    { type: 'completion', title: 'Kubernetes Captain', description: 'Complete all Kubernetes lessons', icon: '☸️' },
    { type: 'completion', title: 'Terraform Titan', description: 'Complete all Terraform lessons', icon: '🏗️' },
    { type: 'completion', title: 'CI/CD Champion', description: 'Complete all CI/CD lessons', icon: '🚀' },
    { type: 'completion', title: 'Cloud Architect', description: 'Complete all cloud lessons', icon: '☁️' },
    { type: 'completion', title: 'MLOps Engineer', description: 'Complete all MLOps lessons', icon: '🤖' },
    { type: 'milestone', title: 'Phase 1 Complete', description: 'Complete Phase 1: Foundation', icon: '🏗️' },
    { type: 'milestone', title: 'Phase 2 Complete', description: 'Complete Phase 2: Core DevOps', icon: '🔧' },
    { type: 'milestone', title: 'Phase 3 Complete', description: 'Complete Phase 3: Advanced DevOps', icon: '🚀' },
    { type: 'milestone', title: 'Phase 4 Complete', description: 'Complete Phase 4: MLOps Introduction', icon: '🧠' },
    { type: 'milestone', title: 'Phase 5 Complete', description: 'Complete Phase 5: Production MLOps', icon: '🤖' },
    { type: 'milestone', title: 'Phase 6 Complete', description: 'Complete Phase 6: Expert Capstone', icon: '🎓' },
    { type: 'milestone', title: 'DevOps Hero', description: 'Complete the entire curriculum', icon: '🦸' },
    { type: 'milestone', title: 'First 1000 XP', description: 'Earn 1,000 XP', icon: '⭐' },
    { type: 'milestone', title: '5000 XP', description: 'Earn 5,000 XP', icon: '🌟' },
    { type: 'milestone', title: '10000 XP', description: 'Earn 10,000 XP', icon: '💫' },
    { type: 'milestone', title: 'XP Master', description: 'Earn 20,000+ XP', icon: '🏅' },
    { type: 'completion', title: 'First Project', description: 'Complete your first project', icon: '📦' },
    { type: 'completion', title: 'Project Pro', description: 'Complete 5 projects', icon: '🎯' },
    { type: 'completion', title: 'Project Master', description: 'Complete all 12 projects', icon: '👑' },
  ];

  for (const achievement of achievements) {
    await prisma.achievement.create({ 
      data: {
        ...achievement,
        unlockedAt: new Date(0),
      }
    });
  }
  console.log(`   Created ${achievements.length} achievements`);

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
