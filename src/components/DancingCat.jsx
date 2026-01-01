import { useState, useEffect } from 'react'
import catImage from '../assets/images/cat.svg'

function DancingCat() {
  const [isAnimating, setIsAnimating] = useState(true)
  const [speed, setSpeed] = useState('normal') // slow, normal, fast, veryFast

  const speedOptions = [
    { value: 'slow', label: '느리게', key: '1' },
    { value: 'normal', label: '보통', key: '2' },
    { value: 'fast', label: '빠르게', key: '3' },
    { value: 'veryFast', label: '아주 빠르게', key: '4' }
  ]

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating)
  }

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed)
  }

  // 키보드 단축키 처리
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Space bar로 시작/정지
      if (event.code === 'Space') {
        event.preventDefault()
        setIsAnimating(prev => !prev)
      }

      // 숫자 키 1, 2, 3, 4로 속도 변경
      switch(event.key) {
        case '1':
          setSpeed('slow')
          break
        case '2':
          setSpeed('normal')
          break
        case '3':
          setSpeed('fast')
          break
        case '4':
          setSpeed('veryFast')
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  return (
    <div className="dancing-cat-container">
      <div className={`cat-wrapper ${isAnimating ? 'dancing' : ''} speed-${speed}`}>
        <img src={catImage} alt="Dancing Cat" className="cat-image" />
      </div>

      <div className="controls">
        <button className="control-button main-button" onClick={toggleAnimation}>
          {isAnimating ? '⏸ Stop Dancing' : '▶ Start Dancing'}
          <span className="shortcut-hint">Space</span>
        </button>

        <div className="speed-controls">
          <p className="speed-label">속도 조절:</p>
          <div className="speed-buttons">
            {speedOptions.map((option) => (
              <button
                key={option.value}
                className={`speed-button ${speed === option.value ? 'active' : ''}`}
                onClick={() => handleSpeedChange(option.value)}
              >
                {option.label}
                <span className="shortcut-hint">{option.key}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="keyboard-guide">
        <p>⌨️ 키보드 단축키: Space (시작/정지) | 1-4 (속도 조절)</p>
      </div>
    </div>
  )
}

export default DancingCat
