import { useState, useEffect } from 'react'
import { TOOLS, GUIDE_STEPS } from './data'
import './App.css'

const STORAGE_KEY = 'web-audit-system-v2'

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : { clients: [], activeClientId: null }
  } catch {
    return { clients: [], activeClientId: null }
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function createClient(name, domain) {
  return {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    name: name.trim(),
    domain: domain.trim().replace(/^https?:\/\//, '').replace(/\/$/, ''),
    createdAt: new Date().toISOString(),
    checks: {},
    notes: {}
  }
}

export default function App() {
  const [tab, setTab] = useState('web')
  const [view, setView] = useState('checklist') // checklist | guide | tool
  const [selectedToolId, setSelectedToolId] = useState(null)
  const [clients, setClients] = useState([])
  const [activeClientId, setActiveClientId] = useState(null)
  const [newName, setNewName] = useState('')
  const [newDomain, setNewDomain] = useState('')
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const state = loadState()
    setClients(state.clients || [])
    setActiveClientId(state.activeClientId || null)
  }, [])

  useEffect(() => {
    saveState({ clients, activeClientId })
  }, [clients, activeClientId])

  const activeClient = clients.find(c => c.id === activeClientId) || null
  const selectedTool = TOOLS.find(t => t.id === selectedToolId) || null

  function addClient() {
    if (!newName.trim() || !newDomain.trim()) return
    const client = createClient(newName, newDomain)
    setClients(prev => [...prev, client])
    setActiveClientId(client.id)
    setNewName('')
    setNewDomain('')
    setView('checklist')
  }

  function deleteClient(id) {
    if (!confirm('¿Eliminar este cliente y todas sus notas?')) return
    setClients(prev => prev.filter(c => c.id !== id))
    if (activeClientId === id) setActiveClientId(null)
  }

  function toggleCheck(toolId) {
    if (!activeClient) return
    setClients(prev => prev.map(c => {
      if (c.id !== activeClient.id) return c
      return { ...c, checks: { ...c.checks, [toolId]: !c.checks[toolId] } }
    }))
  }

  function updateNote(toolId, value) {
    if (!activeClient) return
    setClients(prev => prev.map(c => {
      if (c.id !== activeClient.id) return c
      return { ...c, notes: { ...c.notes, [toolId]: value } }
    }))
  }

  const doneCount = activeClient ? TOOLS.filter(t => activeClient.checks[t.id]).length : 0
  const progress = activeClient ? Math.round((doneCount / TOOLS.length) * 100) : 0

  function buildPrompt() {
    if (!activeClient) return ''
    let text = `AUDITORÍA WEB COMPLETA\n`
    text += `Cliente: ${activeClient.name}\n`
    text += `Dominio: ${activeClient.domain}\n`
    text += `Fecha: ${new Date().toLocaleDateString('es-AR')}\n\n`
    text += `=== DATOS RECOLECTADOS POR HERRAMIENTA ===\n\n`

    TOOLS.forEach(tool => {
      const done = activeClient.checks[tool.id] ? 'COMPLETADO' : 'PENDIENTE'
      const note = (activeClient.notes[tool.id] || '').trim() || '(sin notas cargadas)'
      text += `----------------------------------------\n`
      text += `HERRAMIENTA: ${tool.name} [${done}]\n`
      text += `Categoría: ${tool.category}\n`
      text += `Notas del auditor:\n${note}\n\n`
    })

    text += `----------------------------------------\n`
    text += `INSTRUCCIÓN PARA LA IA:\n`
    text += `Usá estos datos con el prompt de generación de informe profesional. Generá score, problemas priorizados por impacto de negocio, quick wins y resumen ejecutivo orientado a dueños de empresa en USA.\n`
    return text
  }

  function copyPrompt() {
    navigator.clipboard.writeText(buildPrompt())
    alert('Resumen copiado. Pegalo en la IA junto con el prompt de informe.')
  }

  return (
    <div className="app">
      <header>
        <div>
          <h1>Web <span>Audit</span> System</h1>
          <p className="subtitle">Sistema completo de auditorías web para prospectos USA</p>
        </div>
        <div className="tabs">
          <button className={`tab ${tab === 'web' ? 'active' : ''}`} onClick={() => setTab('web')}>
            Auditorías Web
          </button>
          <button className="tab disabled" disabled>Aplicaciones</button>
          <button className="tab disabled" disabled>Debugging</button>
        </div>
      </header>

      {tab === 'web' && (
        <>
          {/* Clients */}
          <div className="card">
            <h2>Clientes</h2>
            <div className="client-bar">
              <input
                placeholder="Nombre del cliente / empresa"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addClient()}
              />
              <input
                placeholder="dominio.com"
                value={newDomain}
                onChange={e => setNewDomain(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addClient()}
              />
              <button className="btn btn-primary" onClick={addClient}>+ Agregar cliente</button>
            </div>

            {clients.length > 0 && (
              <div className="client-bar" style={{ marginTop: 12 }}>
                <select
                  value={activeClientId || ''}
                  onChange={e => {
                    setActiveClientId(e.target.value || null)
                    setView('checklist')
                    setSelectedToolId(null)
                  }}
                >
                  <option value="">— Seleccionar cliente —</option>
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.name} — {c.domain}</option>
                  ))}
                </select>
                {activeClient && (
                  <button className="btn btn-danger btn-sm" onClick={() => deleteClient(activeClient.id)}>
                    Eliminar
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Navigation between views */}
          <div className="view-nav">
            <button
              className={`view-btn ${view === 'guide' ? 'active' : ''}`}
              onClick={() => { setView('guide'); setSelectedToolId(null) }}
            >
              Guía del proceso
            </button>
            <button
              className={`view-btn ${view === 'checklist' ? 'active' : ''}`}
              onClick={() => { setView('checklist'); setSelectedToolId(null) }}
            >
              Checklist
            </button>
            <button
              className={`view-btn ${view === 'tools' ? 'active' : ''}`}
              onClick={() => { setView('tools'); setSelectedToolId(null) }}
            >
              Herramientas (detalle)
            </button>
          </div>

          {/* GUIDE VIEW */}
          {view === 'guide' && (
            <div className="card">
              <h2>Guía completa del proceso de auditoría</h2>
              <p className="lead">
                Esta es la forma correcta de trabajar. Seguí el orden. No saltees pasos.
                El objetivo es salir con datos claros para generar un informe profesional orientado a negocio.
              </p>

              {GUIDE_STEPS.map((step, i) => (
                <div key={i} className="guide-step">
                  <h3>{step.title}</h3>
                  <ul>
                    {step.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="guide-step" style={{ borderColor: 'var(--primary)' }}>
                <h3>Tiempo estimado</h3>
                <ul>
                  <li>Sitio de 10-15 páginas: <strong>aprox. 1 día de trabajo concentrado</strong></li>
                  <li>Incluye: correr herramientas + anotar + generar resumen para IA</li>
                  <li>El armado del PDF y el mensaje de venta se hace después con IA</li>
                </ul>
              </div>
            </div>
          )}

          {/* CHECKLIST VIEW */}
          {view === 'checklist' && (
            <>
              {!activeClient ? (
                <div className="card empty">
                  <p>Seleccioná o creá un cliente para usar la checklist.</p>
                </div>
              ) : (
                <>
                  <div className="card">
                    <h2>
                      Checklist — {activeClient.name}
                      <span className="domain-tag">{activeClient.domain}</span>
                    </h2>

                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="progress-text">
                      {doneCount} / {TOOLS.length} completadas — {progress}%
                    </div>

                    <div className="tool-list">
                      {TOOLS.map(tool => {
                        const isDone = !!activeClient.checks[tool.id]
                        return (
                          <div key={tool.id} className="tool-row">
                            <div
                              className={`tool-check ${isDone ? 'done' : ''}`}
                              onClick={() => toggleCheck(tool.id)}
                              title="Marcar como completada"
                            />
                            <div className="tool-row-content">
                              <div className="tool-row-top">
                                <strong>{tool.order}. {tool.name}</strong>
                                <span className="tool-badge">{tool.category}</span>
                                {tool.link && (
                                  <a href={tool.link} target="_blank" rel="noopener noreferrer" className="link-btn">
                                    Abrir herramienta ↗
                                  </a>
                                )}
                                <button
                                  className="link-btn"
                                  onClick={() => {
                                    setSelectedToolId(tool.id)
                                    setView('tool')
                                  }}
                                >
                                  Ver guía completa →
                                </button>
                              </div>
                              <textarea
                                placeholder={`Notas de ${tool.name}...`}
                                value={activeClient.notes[tool.id] || ''}
                                onChange={e => updateNote(tool.id, e.target.value)}
                                rows={3}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="generate-box">
                    <h3>Generar resumen para la IA</h3>
                    <p>
                      Cuando hayas completado las herramientas y cargado las notas, generá el resumen.
                      Después lo pegás en Claude / GPT / Gemini junto con el prompt de informe.
                    </p>
                    {showPrompt && <pre className="prompt-preview">{buildPrompt()}</pre>}
                    <div className="btn-row">
                      <button className="btn btn-primary" onClick={() => setShowPrompt(!showPrompt)}>
                        {showPrompt ? 'Ocultar resumen' : 'Ver resumen'}
                      </button>
                      <button className="btn btn-ghost" onClick={copyPrompt}>
                        Copiar resumen
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {/* TOOLS LIST VIEW */}
          {view === 'tools' && (
            <div className="card">
              <h2>Todas las herramientas — detalle</h2>
              <p className="lead">Hacé clic en cualquier herramienta para ver la guía completa: qué hace, cómo se usa, qué anotar y cómo optimizar.</p>
              <div className="tools-grid">
                {TOOLS.map(tool => (
                  <button
                    key={tool.id}
                    className="tool-card"
                    onClick={() => {
                      setSelectedToolId(tool.id)
                      setView('tool')
                    }}
                  >
                    <div className="tool-card-order">{tool.order}</div>
                    <div>
                      <strong>{tool.name}</strong>
                      <div className="tool-card-cat">{tool.category}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SINGLE TOOL DETAIL VIEW */}
          {view === 'tool' && selectedTool && (
            <div className="card tool-detail">
              <button className="back-btn" onClick={() => setView('tools')}>
                ← Volver a herramientas
              </button>

              <div className="tool-detail-header">
                <div>
                  <span className="tool-badge">{selectedTool.category}</span>
                  <h2>{selectedTool.order}. {selectedTool.name}</h2>
                </div>
                {selectedTool.link && (
                  <a
                    href={selectedTool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Abrir {selectedTool.name} ↗
                  </a>
                )}
              </div>

              <section>
                <h3>Qué te da esta herramienta</h3>
                <p className="detail-text">{selectedTool.what}</p>
              </section>

              <section>
                <h3>Cómo se usa (paso a paso)</h3>
                <ol className="detail-list">
                  {selectedTool.howToUse.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </section>

              <section>
                <h3>Qué tenés que anotar</h3>
                <ul className="detail-list">
                  {selectedTool.howToNote.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h3>Cómo se optimiza / qué recomendar</h3>
                <ul className="detail-list">
                  {selectedTool.optimize.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>

              {selectedTool.commonProblems?.length > 0 && (
                <section>
                  <h3>Problemas frecuentes que vas a encontrar</h3>
                  <ul className="detail-list warning-list">
                    {selectedTool.commonProblems.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}

              {activeClient && (
                <section className="notes-section">
                  <h3>Notas para {activeClient.name}</h3>
                  <textarea
                    placeholder="Escribí acá todo lo que encontraste con esta herramienta..."
                    value={activeClient.notes[selectedTool.id] || ''}
                    onChange={e => updateNote(selectedTool.id, e.target.value)}
                    rows={6}
                  />
                  <div style={{ marginTop: 10 }}>
                    <label className="check-label">
                      <input
                        type="checkbox"
                        checked={!!activeClient.checks[selectedTool.id]}
                        onChange={() => toggleCheck(selectedTool.id)}
                      />
                      Marcar esta herramienta como completada
                    </label>
                  </div>
                </section>
              )}
            </div>
          )}
        </>
      )}

      {tab !== 'web' && (
        <div className="coming-soon">
          <h2>Próximamente</h2>
          <p>Esta sección está reservada para la siguiente etapa del sistema.</p>
        </div>
      )}
    </div>
  )
}
