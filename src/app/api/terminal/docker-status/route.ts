import { NextResponse } from "next/server"
import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

export async function GET() {
  try {
    // Check if Docker is running
    await execAsync("docker info")
    
    // Get list of containers
    const { stdout: containersJson } = await execAsync(
      "docker ps -a --format '{{json .}}'"
    )
    
    const containers = containersJson
      .trim()
      .split('\n')
      .filter(Boolean)
      .map(line => {
        try {
          return JSON.parse(line)
        } catch {
          return null
        }
      })
      .filter(Boolean)

    return NextResponse.json({
      available: true,
      containers,
    })
  } catch (error) {
    return NextResponse.json({
      available: false,
      error: "Docker is not running or not installed",
    })
  }
}
