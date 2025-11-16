import { useState } from 'react'
import './AITools.css'

function AITools() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [toolType, setToolType] = useState('text-generator')

  const handleGenerate = async () => {
    if (!input.trim()) {
      alert('Please enter some text or prompt')
      return
    }

    setIsProcessing(true)
    setOutput('')

    // Simulate AI processing with a delay
    setTimeout(() => {
      let generatedText = ''

      if (toolType === 'text-generator') {
        generatedText = generateText(input)
      } else if (toolType === 'code-assistant') {
        generatedText = generateCode(input)
      } else if (toolType === 'summarizer') {
        generatedText = summarizeText(input)
      } else if (toolType === 'translator') {
        generatedText = translateText(input)
      }

      setOutput(generatedText)
      setIsProcessing(false)
    }, 1500)
  }

  const generateText = (prompt) => {
    const templates = [
      `Based on your prompt "${prompt}", here's a comprehensive response:\n\nThis topic is highly relevant in today's digital landscape. The key aspects include understanding the fundamental principles, implementing best practices, and staying updated with the latest trends.`,
      `Here's an AI-generated response to "${prompt}":\n\nThe subject matter requires careful consideration of multiple factors. Key points include strategic planning, effective implementation, and continuous improvement.`,
      `AI Analysis of "${prompt}":\n\nThis is an important area that combines technical expertise with practical application. The main considerations involve scalability, user experience, and performance optimization.`
    ]
    return templates[Math.floor(Math.random() * templates.length)]
  }

  const generateCode = (prompt) => {
    return `// AI-Generated Code for: "${prompt}"\n\nfunction ${prompt.toLowerCase().replace(/\s+/g, '')}() {\n  // Implementation based on your requirements\n  const result = {\n    status: 'success',\n    data: 'Your requested functionality'\n  }\n  \n  return result\n}\n\n// Usage example:\nconst output = ${prompt.toLowerCase().replace(/\s+/g, '')}()\nconsole.log(output)`
  }

  const summarizeText = (text) => {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
    const summary = sentences.slice(0, Math.ceil(sentences.length / 3))
    return `Summary:\n\n${summary.join('. ')}.\n\n[Original text reduced by approximately ${Math.round((1 - summary.length / sentences.length) * 100)}%]`
  }

  const translateText = (text) => {
    return `Translation (Simulated):\n\n"${text}"\n\n→ Translated to: [Target Language]\n\nNote: This is a demonstration. In a real application, this would use a translation API.`
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output)
      alert('Copied to clipboard!')
    }
  }

  return (
    <div className="page-container">
      <section className="ai-hero">
        <div className="container">
          <h1 className="page-title">AI Tools</h1>
          <p className="page-subtitle">Leverage the power of AI for your projects</p>
        </div>
      </section>

      <section className="ai-tools-section">
        <div className="container">
          <div className="ai-tool-selector">
            <h3>Select AI Tool:</h3>
            <div className="tool-options">
              <button
                className={`tool-option ${toolType === 'text-generator' ? 'active' : ''}`}
                onClick={() => setToolType('text-generator')}
              >
                ✍️ Text Generator
              </button>
              <button
                className={`tool-option ${toolType === 'code-assistant' ? 'active' : ''}`}
                onClick={() => setToolType('code-assistant')}
              >
                💻 Code Assistant
              </button>
              <button
                className={`tool-option ${toolType === 'summarizer' ? 'active' : ''}`}
                onClick={() => setToolType('summarizer')}
              >
                📝 Text Summarizer
              </button>
              <button
                className={`tool-option ${toolType === 'translator' ? 'active' : ''}`}
                onClick={() => setToolType('translator')}
              >
                🌐 Translator
              </button>
            </div>
          </div>

          <div className="ai-tool-container">
            <div className="ai-input-section">
              <div className="input-header">
                <h3>
                  {toolType === 'text-generator' && 'Enter your prompt'}
                  {toolType === 'code-assistant' && 'Describe what code you need'}
                  {toolType === 'summarizer' && 'Enter text to summarize'}
                  {toolType === 'translator' && 'Enter text to translate'}
                </h3>
              </div>
              <textarea
                className="ai-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  toolType === 'text-generator' 
                    ? 'Enter a topic or prompt for AI text generation...'
                    : toolType === 'code-assistant'
                    ? 'Describe the code functionality you need...'
                    : toolType === 'summarizer'
                    ? 'Paste the text you want to summarize...'
                    : 'Enter text to translate...'
                }
                rows="8"
              />
              <div className="ai-actions">
                <button
                  className="btn btn-primary btn-generate"
                  onClick={handleGenerate}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <span className="spinner"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <span>🚀</span>
                      Generate
                    </>
                  )}
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={handleClear}
                  disabled={isProcessing}
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="ai-output-section">
              <div className="output-header">
                <h3>AI Output</h3>
                {output && (
                  <button className="btn-copy" onClick={handleCopy}>
                    📋 Copy
                  </button>
                )}
              </div>
              <div className="ai-output">
                {isProcessing ? (
                  <div className="processing">
                    <div className="processing-animation">
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </div>
                    <p>AI is processing your request...</p>
                  </div>
                ) : output ? (
                  <pre>{output}</pre>
                ) : (
                  <div className="placeholder">
                    <p>Your AI-generated content will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="ai-features">
            <h3>AI Tool Features</h3>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <h4>Fast Processing</h4>
                <p>Get instant results with our optimized AI engine</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🎯</div>
                <h4>Accurate Results</h4>
                <p>High-quality outputs powered by advanced AI models</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🔒</div>
                <h4>Secure & Private</h4>
                <p>Your data is processed securely and never stored</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🔄</div>
                <h4>Multiple Tools</h4>
                <p>Access various AI tools from one platform</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AITools

