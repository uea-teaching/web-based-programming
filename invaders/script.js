const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 800
canvas.height = 600
canvas.style.backgroundColor = 'black'

const sprite = new Image()
sprite.src = 'sprites.png'

const KEYS = {}

document.addEventListener('keydown', (event) => {
  KEYS[event.code] = event.type === 'keydown'
})

document.addEventListener('keyup', (event) => {
  KEYS[event.code] = event.type === 'keydown'
})

function collide(a, b) {
  // AABB collision detection
  if (a.x > b.x + b.w) return false
  if (a.x + a.w < b.x) return false
  if (a.y > b.y + b.h) return false
  if (a.y + a.h < b.y) return false
  return true
}

class Invader {
  constructor() {
    this.frame = 0
    this.prevTime = 0
    this.sx = 0
    this.x = 0
    this.y = 0
    this.w = 40
    this.h = 30
    this.dead = false
  }
  draw() {
    if (this.dead) return
    ctx.drawImage(
      sprite,
      this.sx,
      0,
      this.w,
      this.h,
      this.x,
      this.y,
      this.w,
      this.h,
    )
  }
  update(time) {
    this.sx = 41 * this.frame
    if (time - this.prevTime > 500) {
      this.prevTime = time
      this.frame = this.frame === 0 ? 1 : 0
    }
  }
}

class Invaders {
  constructor(rows = 4, cols = 6) {
    this.rows = rows
    this.cols = cols
    this.prevTime = 0
    this.xStep = 60
    this.yStep = 45
    this.shift = 30
    this.x = this.minX = 10
    this.y = this.minY = 10
    this.maxX = canvas.width - 10
    this.maxY = canvas.height - 30
    this.invaders = []
    for (let i = 0; i < rows * cols; i++) {
      this.invaders.push(new Invader())
    }
    this.#position()
  }
  #position() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const invader = this.invaders[i * this.cols + j]
        invader.x = this.x + j * 60
        invader.y = this.y + i * 45
      }
    }
  }
  #extents() {
    let minX = Infinity
    let minY = Infinity
    let maxX = -Infinity
    let maxY = -Infinity
    this.invaders.forEach((invader) => {
      if (invader.dead) return
      if (invader.x < minX) minX = invader.x
      if (invader.y < minY) minY = invader.y
      if (invader.x + invader.w > maxX) maxX = invader.x + invader.w
      if (invader.y + invader.h > maxY) maxY = invader.y + invader.h
    })
    return { minX, minY, maxX, maxY }
  }
  update(time) {
    // update invaders
    this.invaders.forEach((invader) => invader.update(time))
    // move invaders only if enough time has elapsed
    if (time - this.prevTime > 500) {
      this.prevTime = time
    } else return
    // get extents of invaders
    const { minX, minY, maxX, maxY } = this.#extents()
    // stop when at bottom of screen
    if (maxY > this.maxY) return
    // if at right of screen - move down and left
    if (maxX > this.maxX) {
      this.shift = -30
      this.x -= 10
      this.y += 30
    } // if at left of screen - move down and right
    else if (minX < this.minX) {
      this.shift = 30
      this.x += 10
      this.y += 30
    } else {
      this.x += this.shift
    }
    // update the position of the invaders
    this.#position()
  }
  draw() {
    this.invaders.forEach((invader) => invader.draw())
  }
}

class Missile {
  constructor(x) {
    this.x = x
    this.y = 550
    this.w = 4
    this.h = 9
    this.vel = -5
    this.dead = false
  }
  update(time) {
    this.y += this.vel
    if (this.y < 20) return true
    return false
  }
  draw() {
    if (this.dead) return
    ctx.fillStyle = 'red'
    ctx.fillRect(this.x, this.y, this.w, this.h)
  }
}

class Defender {
  constructor() {
    this.x = canvas.width / 2 - 20
    this.y = canvas.height - 40
    this.w = 41
    this.h = 25
    this.prevTime = 0
    this.missiles = []
  }
  #shoot(time) {
    if (time - this.prevTime > 300 && KEYS['Space']) {
      this.prevTime = time
      this.missiles.push(new Missile(this.x + 18))
    }
    this.missiles.forEach((missile) => {
      if (missile.update(time)) {
        this.missiles.splice(this.missiles.indexOf(missile), 1)
      }
    })
  }
  #move() {
    let mx = canvas.width - 45
    if (KEYS['ArrowLeft']) this.x = Math.max(5, this.x - 5)
    if (KEYS['ArrowRight']) this.x = Math.min(mx, this.x + 5)
  }
  update(time) {
    this.#move()
    this.#shoot(time)
  }
  draw() {
    ctx.drawImage(
      sprite,
      2,
      53,
      2 + this.w,
      this.h,
      this.x,
      this.y,
      this.w,
      this.h,
    )
    this.missiles.forEach((missile) => missile.draw())
  }
}

class Game {
  constructor() {
    this.invaders = new Invaders()
    this.defender = new Defender()
    this.over = false
    this.score = 0
  }
  #collide(a, b) {
    if (a.dead || b.dead) return false
    if (collide(a, b)) {
      a.dead = true
      b.dead = true
      this.score += 1
    }
    return true
  }
  #collision() {
    const n = this.invaders.invaders.length
    const k = this.defender.missiles.length
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < k; j++) {
        const invader = this.invaders.invaders[i]
        const missile = this.defender.missiles[j]
        this.#collide(invader, missile)
      }
    }
  }
  update(time) {
    this.invaders.update(time)
    this.defender.update(time)
    this.#collision()
  }
  draw() {
    this.invaders.draw()
    this.defender.draw()
  }
}

game = new Game()

function animate(time) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  game.update(time)
  game.draw()
  requestAnimationFrame(animate)
}

animate()
