import { useState, useRef, useEffect } from "react"
import "./App.css"

const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

function App() {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
    }
  }, [query])

  const handleSearch = async () => {
    if (!query.trim() || loading) return
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch(`${API_URL}/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": API_KEY,
        },
        body: JSON.stringify({ query: query.trim() }),
      })

      if (!res.ok) throw new Error(`خطأ في الخادم: ${res.status}`)
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSearch()
    }
  }

  return (
    <div className="app" dir="rtl">
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="brand">
            <span className="beta-tag">Beta</span>
            <span className="brand-name">Islam QA</span>
          </div>
          <a
            href="https://github.com/alikashlan10/Islam-QA-UI"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            <span>GitHub</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            
          </a>
        </div>
      </nav>

      <main className="main">
        <div className="hero">
          <h1 className="hero-title">ابحث في المسائل الفقهية</h1>
          <p className="hero-sub">اطرح سؤالك وسنجلب لك الإجابة من مقاطع العلماء</p>
        </div>

        <div className="search-box">
          <textarea
            ref={textareaRef}
            className="search-input"
            placeholder="اكتب سؤالك هنا... مثال: ما هو حكم الصلاة فالمقابر؟"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <button
            className={`search-btn ${loading ? "loading" : ""}`}
            onClick={handleSearch}
            disabled={loading || !query.trim()}
          >
            {loading ? (
              <span className="spinner" />
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            )}
          </button>
        </div>

        {error && (
          <div className="error-box">
            <span>{error}</span>
          </div>
        )}

        {result && (
          <div className="results">
            <div className="results-layout">
              <div className="answer-col">
                <div className="section-label">الإجابة</div>
                <div className="answer-text">{result.answer}</div>
              </div>

              {result.sources && result.sources.length > 0 && (
                <div className="sources-col">
                  <div className="section-label">المصادر المحتملة</div>
                  <div className="sources-list">
                    {result.sources.map((source, i) => (
                      <a
                        key={i}
                        href={`https://www.youtube.com/watch?v=${source.video_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="source-card"
                      >
                        {source.thumbnail_url && (
                          <img
                            src={source.thumbnail_url}
                            alt={source.title}
                            className="source-thumb"
                          />
                        )}
                        <div className="source-info">
                          <div className="source-title">{source.title}</div>
                          {source.chunk && (
                            <div className="source-chunk">{source.chunk}</div>
                          )}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>هذا المشروع في مرحلته التجريبية — قد تكون الإجابات غير دقيقة، يُرجى التحقق من المصادر</p>
      </footer>
    </div>
  )
}

export default App
