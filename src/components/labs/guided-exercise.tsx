"use client"

import { useState, useEffect } from "react"
import { 
  CheckCircle2, 
  Circle, 
  ChevronRight, 
  ChevronDown,
  Trophy,
  Lightbulb,
  Play,
  RotateCcw
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  LabExercise, 
  LabStep, 
  getExercisesForLab, 
  validateCommand 
} from "@/data/lab-exercises"
import { cn } from "@/lib/utils"

interface GuidedExerciseProps {
  labId: string
  onCommandValidation?: (stepId: string, command: string) => void
  lastCommand?: string
}

interface ExerciseProgress {
  exerciseId: string
  currentStepIndex: number
  completedSteps: string[]
  completed: boolean
  startedAt: Date
  completedAt?: Date
}

export function GuidedExercise({ 
  labId, 
  onCommandValidation,
  lastCommand 
}: GuidedExerciseProps) {
  const [exercises, setExercises] = useState<LabExercise[]>([])
  const [activeExercise, setActiveExercise] = useState<LabExercise | null>(null)
  const [progress, setProgress] = useState<Map<string, ExerciseProgress>>(new Map())
  const [showHint, setShowHint] = useState(false)
  const [validationMessage, setValidationMessage] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [expandedExercises, setExpandedExercises] = useState<Set<string>>(new Set())

  // Load exercises for this lab
  useEffect(() => {
    const labExercises = getExercisesForLab(labId)
    setExercises(labExercises)
    
    // Load progress from localStorage
    const savedProgress = localStorage.getItem(`lab-progress-${labId}`)
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress)
        const progressMap = new Map<string, ExerciseProgress>()
        for (const [key, value] of Object.entries(parsed)) {
          progressMap.set(key, value as ExerciseProgress)
        }
        setProgress(progressMap)
      } catch (e) {
        console.error('Failed to load progress:', e)
      }
    }
  }, [labId])

  // Validate commands when lastCommand changes
  useEffect(() => {
    if (!lastCommand || !activeExercise) return

    const currentProgress = progress.get(activeExercise.id)
    if (!currentProgress || currentProgress.completed) return

    const currentStep = activeExercise.steps[currentProgress.currentStepIndex]
    if (!currentStep) return

    const result = validateCommand(currentStep, lastCommand)
    
    if (result.valid) {
      // Mark step as complete
      const newCompletedSteps = [...currentProgress.completedSteps, currentStep.id]
      const isExerciseComplete = newCompletedSteps.length === activeExercise.steps.length
      
      const updatedProgress: ExerciseProgress = {
        ...currentProgress,
        completedSteps: newCompletedSteps,
        currentStepIndex: isExerciseComplete 
          ? currentProgress.currentStepIndex 
          : currentProgress.currentStepIndex + 1,
        completed: isExerciseComplete,
        completedAt: isExerciseComplete ? new Date() : undefined
      }
      
      const newProgressMap = new Map(progress)
      newProgressMap.set(activeExercise.id, updatedProgress)
      setProgress(newProgressMap)
      
      // Save to localStorage
      const progressObj: Record<string, ExerciseProgress> = {}
      newProgressMap.forEach((v, k) => { progressObj[k] = v })
      localStorage.setItem(`lab-progress-${labId}`, JSON.stringify(progressObj))
      
      setValidationMessage({ type: 'success', message: result.message })
      setShowHint(false)
      
      if (onCommandValidation) {
        onCommandValidation(currentStep.id, lastCommand)
      }
    } else {
      setValidationMessage({ type: 'error', message: result.message })
    }

    // Clear message after delay
    setTimeout(() => setValidationMessage(null), 4000)
  }, [lastCommand])

  const startExercise = (exercise: LabExercise) => {
    setActiveExercise(exercise)
    setShowHint(false)
    setValidationMessage(null)
    
    // Initialize progress if not exists
    if (!progress.has(exercise.id)) {
      const newProgress: ExerciseProgress = {
        exerciseId: exercise.id,
        currentStepIndex: 0,
        completedSteps: [],
        completed: false,
        startedAt: new Date()
      }
      const newProgressMap = new Map(progress)
      newProgressMap.set(exercise.id, newProgress)
      setProgress(newProgressMap)
      
      // Save to localStorage
      const progressObj: Record<string, ExerciseProgress> = {}
      newProgressMap.forEach((v, k) => { progressObj[k] = v })
      localStorage.setItem(`lab-progress-${labId}`, JSON.stringify(progressObj))
    }
  }

  const resetExercise = (exerciseId: string) => {
    const newProgressMap = new Map(progress)
    newProgressMap.delete(exerciseId)
    setProgress(newProgressMap)
    
    // Save to localStorage
    const progressObj: Record<string, ExerciseProgress> = {}
    newProgressMap.forEach((v, k) => { progressObj[k] = v })
    localStorage.setItem(`lab-progress-${labId}`, JSON.stringify(progressObj))
    
    if (activeExercise?.id === exerciseId) {
      setActiveExercise(null)
    }
  }

  const toggleExpanded = (exerciseId: string) => {
    const newExpanded = new Set(expandedExercises)
    if (newExpanded.has(exerciseId)) {
      newExpanded.delete(exerciseId)
    } else {
      newExpanded.add(exerciseId)
    }
    setExpandedExercises(newExpanded)
  }

  const getCurrentStep = (): LabStep | null => {
    if (!activeExercise) return null
    const currentProgress = progress.get(activeExercise.id)
    if (!currentProgress || currentProgress.completed) return null
    return activeExercise.steps[currentProgress.currentStepIndex] || null
  }

  const getExerciseProgressPercent = (exerciseId: string): number => {
    const exerciseProgress = progress.get(exerciseId)
    const exercise = exercises.find(e => e.id === exerciseId)
    if (!exerciseProgress || !exercise) return 0
    return Math.round((exerciseProgress.completedSteps.length / exercise.steps.length) * 100)
  }

  const totalXpEarned = exercises.reduce((sum, ex) => {
    const prog = progress.get(ex.id)
    return sum + (prog?.completed ? ex.xpReward : 0)
  }, 0)

  const completedCount = exercises.filter(ex => progress.get(ex.id)?.completed).length

  // Render active exercise view
  if (activeExercise) {
    const currentProgress = progress.get(activeExercise.id)
    const currentStep = getCurrentStep()
    const isComplete = currentProgress?.completed

    return (
      <Card className="border-slate-700">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                {isComplete && <Trophy className="h-5 w-5 text-yellow-500" />}
                {activeExercise.title}
              </CardTitle>
              <CardDescription className="text-slate-400 mt-1">
                {activeExercise.description}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => resetExercise(activeExercise.id)}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setActiveExercise(null)}
              >
                Back to list
              </Button>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-slate-400">Progress</span>
              <span className="text-slate-400">
                {currentProgress?.completedSteps.length || 0}/{activeExercise.steps.length} steps
              </span>
            </div>
            <Progress 
              value={getExerciseProgressPercent(activeExercise.id)} 
              className="h-2"
            />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Completion message */}
          {isComplete && (
            <div className="rounded-lg bg-green-500/10 border border-green-500/30 p-4">
              <div className="flex items-center gap-2 text-green-400 font-medium mb-2">
                <Trophy className="h-5 w-5" />
                Exercise Complete!
              </div>
              <p className="text-slate-300 text-sm">{activeExercise.completionMessage}</p>
              <div className="mt-3 flex items-center gap-2">
                <Badge variant="success">+{activeExercise.xpReward} XP</Badge>
              </div>
            </div>
          )}

          {/* Validation message */}
          {validationMessage && (
            <div className={cn(
              "rounded-lg p-3 text-sm",
              validationMessage.type === 'success' 
                ? "bg-green-500/10 border border-green-500/30 text-green-400"
                : "bg-orange-500/10 border border-orange-500/30 text-orange-400"
            )}>
              {validationMessage.message}
            </div>
          )}

          {/* Current step */}
          {currentStep && !isComplete && (
            <div className="rounded-lg bg-cyan-500/10 border border-cyan-500/30 p-4">
              <div className="flex items-center gap-2 text-cyan-400 font-medium mb-2">
                <Play className="h-4 w-4" />
                Step {(currentProgress?.currentStepIndex || 0) + 1}: {currentStep.title}
              </div>
              <p className="text-slate-300 text-sm">{currentStep.description}</p>
              
              {currentStep.hint && (
                <div className="mt-3">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowHint(!showHint)}
                    className="text-slate-400 hover:text-white"
                  >
                    <Lightbulb className="h-4 w-4 mr-1" />
                    {showHint ? 'Hide hint' : 'Show hint'}
                  </Button>
                  {showHint && (
                    <p className="mt-2 text-sm text-yellow-400/80 bg-yellow-500/10 rounded p-2">
                      💡 {currentStep.hint}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step list */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-300">All Steps</div>
            {activeExercise.steps.map((step, index) => {
              const isCompleted = currentProgress?.completedSteps.includes(step.id)
              const isCurrent = index === currentProgress?.currentStepIndex && !isComplete
              
              return (
                <div 
                  key={step.id}
                  className={cn(
                    "flex items-start gap-3 p-2 rounded-lg text-sm",
                    isCurrent && "bg-slate-800",
                    isCompleted && "text-slate-500"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  ) : (
                    <Circle className={cn(
                      "h-4 w-4 mt-0.5 shrink-0",
                      isCurrent ? "text-cyan-400" : "text-slate-600"
                    )} />
                  )}
                  <span className={cn(
                    isCompleted && "line-through",
                    isCurrent && "text-white font-medium"
                  )}>
                    {step.title}
                  </span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Render exercise list
  return (
    <Card className="border-slate-700">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Guided Exercises</CardTitle>
            <CardDescription className="text-slate-400 mt-1">
              Step-by-step challenges with command validation
            </CardDescription>
          </div>
          {totalXpEarned > 0 && (
            <Badge variant="success" className="text-sm">
              {totalXpEarned} XP earned
            </Badge>
          )}
        </div>
        {exercises.length > 0 && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-slate-400">Overall Progress</span>
              <span className="text-slate-400">{completedCount}/{exercises.length} completed</span>
            </div>
            <Progress 
              value={(completedCount / exercises.length) * 100} 
              className="h-2"
            />
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-3">
        {exercises.length === 0 ? (
          <p className="text-slate-500 text-sm">No exercises available for this lab yet.</p>
        ) : (
          exercises.map((exercise) => {
            const exerciseProgress = progress.get(exercise.id)
            const isCompleted = exerciseProgress?.completed
            const isExpanded = expandedExercises.has(exercise.id)
            const progressPercent = getExerciseProgressPercent(exercise.id)
            
            return (
              <div 
                key={exercise.id}
                className={cn(
                  "rounded-lg border transition-all",
                  isCompleted 
                    ? "border-green-500/30 bg-green-500/5" 
                    : "border-slate-700 hover:border-slate-600"
                )}
              >
                <div 
                  className="p-3 cursor-pointer"
                  onClick={() => toggleExpanded(exercise.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : progressPercent > 0 ? (
                        <div className="relative h-5 w-5">
                          <Circle className="h-5 w-5 text-cyan-500" />
                          <span className="absolute inset-0 flex items-center justify-center text-[8px] text-cyan-400 font-bold">
                            {progressPercent}%
                          </span>
                        </div>
                      ) : (
                        <Circle className="h-5 w-5 text-slate-600" />
                      )}
                      <span className={cn(
                        "font-medium",
                        isCompleted ? "text-green-400" : "text-white"
                      )}>
                        {exercise.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={
                          exercise.difficulty === "beginner" ? "success" :
                          exercise.difficulty === "intermediate" ? "warning" : "destructive"
                        }
                        className="text-xs"
                      >
                        {exercise.difficulty}
                      </Badge>
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-slate-400" />
                      )}
                    </div>
                  </div>
                </div>
                
                {isExpanded && (
                  <div className="px-3 pb-3 border-t border-slate-700/50 pt-3">
                    <p className="text-sm text-slate-400 mb-3">{exercise.description}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                      <span>⏱ {exercise.estimatedTime}</span>
                      <span>🎯 {exercise.steps.length} steps</span>
                      <span>⭐ {exercise.xpReward} XP</span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation()
                          startExercise(exercise)
                        }}
                        className="flex-1"
                      >
                        <Play className="h-4 w-4 mr-1" />
                        {exerciseProgress && !isCompleted ? 'Continue' : isCompleted ? 'Review' : 'Start'}
                      </Button>
                      {(exerciseProgress && progressPercent > 0) && (
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            resetExercise(exercise.id)
                          }}
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })
        )}
      </CardContent>
    </Card>
  )
}
