"use client"

import Link from "next/link"
import { Rocket, Clock, Target, Layers, ArrowRight, BookOpen, Award, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { projectGuides, getAllProjectIds } from "@/data/project-guides"

const difficultyColors = {
  beginner: "bg-green-500/10 text-green-400 border-green-500/20",
  intermediate: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  advanced: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  expert: "bg-red-500/10 text-red-400 border-red-500/20",
}

export function ProjectsPage() {
  const projectIds = getAllProjectIds()
  const projects = projectIds.map(id => projectGuides[id]).filter(Boolean)

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <Rocket className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Hands-On Projects</span>
          </div>
          
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            DevOps Projects
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Build real-world DevOps projects from scratch. Each project includes step-by-step guides,
            code snippets, architecture diagrams, and submission checklists.
          </p>

          <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-400" />
              <span>{projects.length} Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>150+ Hours of Content</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-400" />
              <span>Portfolio Ready</span>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const isCapstone = project.projectId === "project-11"
            
            return (
              <Link 
                key={project.projectId} 
                href={`/projects/${project.projectId}`}
                className="group"
              >
                <Card className={`h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 bg-gray-900/50 ${
                  isCapstone 
                    ? 'border-yellow-500/50 bg-gradient-to-br from-yellow-900/10 to-orange-900/10' 
                    : 'border-gray-700 hover:border-blue-500/50'
                }`}>
                  <CardHeader>
                    {isCapstone && (
                      <div className="flex items-center gap-2 mb-3">
                        <Award className="w-5 h-5 text-yellow-400" />
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-none">
                          Capstone Project
                        </Badge>
                      </div>
                    )}
                    
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1">
                        <CardTitle className="text-xl text-gray-100 group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </CardTitle>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={difficultyColors[project.difficulty as keyof typeof difficultyColors]}
                      >
                        {project.difficulty}
                      </Badge>
                    </div>
                    
                    <CardDescription className="text-sm line-clamp-3">
                      {project.overview}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Time & Phases */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{project.totalTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Layers className="w-4 h-4" />
                        <span>{project.phases.length} Phases</span>
                      </div>
                    </div>

                    {/* Tech Stack Preview */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <Badge 
                          key={tech} 
                          variant="secondary" 
                          className="text-xs px-2 py-0.5"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.techStack.length > 4 && (
                        <Badge variant="secondary" className="text-xs px-2 py-0.5">
                          +{project.techStack.length - 4} more
                        </Badge>
                      )}
                    </div>

                    {/* Features */}
                    <div className="pt-3 border-t border-gray-700">
                      <div className="space-y-2 text-xs text-gray-400">
                        {project.phases.length > 0 && (
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>
                              {project.phases.reduce((sum, phase) => sum + phase.tasks.length, 0)} Tasks
                            </span>
                          </div>
                        )}
                        {project.bonusChallenges && project.bonusChallenges.length > 0 && (
                          <div className="flex items-center gap-2">
                            <Zap className="w-3.5 h-3.5" />
                            <span>{project.bonusChallenges.length} Bonus Challenges</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* CTA */}
                    <Button 
                      className="w-full group-hover:bg-blue-600 transition-colors"
                      variant="outline"
                    >
                      Start Project
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-blue-500/20">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold text-gray-100 mb-3">Ready to Build?</h3>
              <p className="text-gray-300 mb-6">
                Each project is designed to be portfolio-ready and demonstrates real-world DevOps skills
                that employers are looking for.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link href={`/projects/${projects[0]?.projectId || 'project-1'}`}>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Start First Project
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/tracks">
                  <Button variant="outline" size="lg">
                    View Learning Tracks
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
