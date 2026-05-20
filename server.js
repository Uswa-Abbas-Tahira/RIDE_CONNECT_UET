// ── UET Ride Connect — Mock API Server ───────────────────────────────────────
// Run with: node server.js
// API runs on: http://localhost:3001

const jsonServer = require('json-server')
const server     = jsonServer.create()
const router     = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const crypto     = require('crypto')

server.use(middlewares)
server.use(jsonServer.bodyParser)

// ── Helper: simple token ──────────────────────────────────────────────────────
function generateToken(userId) {
  return Buffer.from(`${userId}:${Date.now()}:uet-rides`).toString('base64')
}

// ── POST /auth/signup ─────────────────────────────────────────────────────────
server.post('/auth/signup', (req, res) => {
  const { name, studentId, email, password } = req.body
  const db = router.db

  if (!name || !studentId || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' })
  }

  const existing = db.get('users').find({ email }).value()
  if (existing) {
    return res.status(409).json({ error: 'An account with this email already exists.' })
  }

  const id   = Date.now().toString()
  const hash = crypto.createHash('sha256').update(password).digest('hex')
  const user = { id, name, studentId, email, password: hash, createdAt: new Date().toISOString() }

  db.get('users').push(user).write()

  const token = generateToken(id)
  res.status(201).json({
    token,
    user: { id, name, studentId, email, createdAt: user.createdAt }
  })
})

// ── POST /auth/login ──────────────────────────────────────────────────────────
server.post('/auth/login', (req, res) => {
  const { email, password } = req.body
  const db = router.db

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' })
  }

  const hash = crypto.createHash('sha256').update(password).digest('hex')
  const user = db.get('users').find({ email, password: hash }).value()

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password.' })
  }

  const token = generateToken(user.id)
  res.json({
    token,
    user: { id: user.id, name: user.name, studentId: user.studentId, email: user.email, createdAt: user.createdAt }
  })
})

// ── GET /auth/profile ─────────────────────────────────────────────────────────
server.get('/auth/profile', (req, res) => {
  const auth = req.headers.authorization
  if (!auth) return res.status(401).json({ error: 'Unauthorized' })

  const token  = auth.replace('Bearer ', '')
  const userId = Buffer.from(token, 'base64').toString().split(':')[0]
  const db     = router.db
  const user   = db.get('users').find({ id: userId }).value()

  if (!user) return res.status(404).json({ error: 'User not found.' })

  res.json({ id: user.id, name: user.name, studentId: user.studentId, email: user.email, createdAt: user.createdAt })
})

// ── PUT /auth/profile ─────────────────────────────────────────────────────────
server.put('/auth/profile', (req, res) => {
  const auth = req.headers.authorization
  if (!auth) return res.status(401).json({ error: 'Unauthorized' })

  const token  = auth.replace('Bearer ', '')
  const userId = Buffer.from(token, 'base64').toString().split(':')[0]
  const db     = router.db
  const user   = db.get('users').find({ id: userId }).value()

  if (!user) return res.status(404).json({ error: 'User not found.' })

  const { name, studentId } = req.body
  db.get('users').find({ id: userId }).assign({ name, studentId }).write()

  const updated = db.get('users').find({ id: userId }).value()
  res.json({ id: updated.id, name: updated.name, studentId: updated.studentId, email: updated.email })
})

server.use(router)
server.listen(3001, () => {
  console.log('✅ UET Rides API running at http://localhost:3001')
  console.log('   POST /auth/signup')
  console.log('   POST /auth/login')
  console.log('   GET  /auth/profile')
  console.log('   PUT  /auth/profile')
})
