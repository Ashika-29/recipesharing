import { useState, useEffect } from "react"
import { Timer, Play, Pause, RotateCcw } from 'lucide-react'
import "../../styles/timer.css"
import "../../styles/button.css"

export default function CookingTimer({ cookingTime }) {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(cookingTime * 60) // Convert to seconds
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    let interval = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1
          setProgress((newTime / (cookingTime * 60)) * 100)
          return newTime
        })
      }, 1000)
    } else if (isActive && timeLeft === 0) {
      setIsActive(false)
      alert("Your cooking timer has finished!")
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft, cookingTime])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTimeLeft(cookingTime * 60)
    setProgress(100)
  }

  return (
    <div className="timer-card">
      <div className="timer-header">
        <Timer className="h-4 w-4" />
        <span className="timer-title">Cooking Timer</span>
      </div>

      <div className="timer-display">{formatTime(timeLeft)}</div>

      <div className="timer-progress">
        <div className="timer-progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="timer-actions">
        <button className="btn btn-outline btn-sm" onClick={toggleTimer}>
          {isActive ? (
            <>
              <Pause className="h-3 w-3 mr-1" /> Pause
            </>
          ) : (
            <>
              <Play className="h-3 w-3 mr-1" /> Start
            </>
          )}
        </button>

        <button className="btn btn-outline btn-sm" onClick={resetTimer}>
          <RotateCcw className="h-3 w-3 mr-1" /> Reset
        </button>
      </div>
    </div>
  )
}