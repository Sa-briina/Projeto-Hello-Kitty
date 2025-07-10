class ParticlesEffect {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId)
    this.ctx = this.canvas.getContext("2d")
    this.particles = []
    this.mouse = { x: 0, y: 0 }
    this.animationId = null

    // Configurações padrão
    this.config = {
      quantity: 80,
      color: "#ffffff",
      size: 0.4,
      ease: 50,
      staticity: 50,
      vx: 0,
      vy: 0,
      ...options,
    }

    this.init()
    this.bindEvents()
    this.animate()
  }

  init() {
    this.resizeCanvas()
    this.createParticles()
  }

  resizeCanvas() {
    const dpr = window.devicePixelRatio || 1
    this.canvas.width = window.innerWidth * dpr
    this.canvas.height = window.innerHeight * dpr
    this.canvas.style.width = window.innerWidth + "px"
    this.canvas.style.height = window.innerHeight + "px"
    this.ctx.scale(dpr, dpr)
  }

  createParticles() {
    this.particles = []
    for (let i = 0; i < this.config.quantity; i++) {
      this.particles.push(this.createParticle())
    }
  }

  createParticle() {
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      translateX: 0,
      translateY: 0,
      size: Math.random() * 2 + this.config.size,
      alpha: 0,
      targetAlpha: Math.random() * 0.4 + 0.6,
      dx: (Math.random() - 0.5) * 0.1,
      dy: (Math.random() - 0.5) * 0.1,
      magnetism: 0.1 + Math.random() * 4,
    }
  }

  hexToRgb(hex) {
    hex = hex.replace("#", "")
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((char) => char + char)
        .join("")
    }
    const hexInt = Number.parseInt(hex, 16)
    const red = (hexInt >> 16) & 255
    const green = (hexInt >> 8) & 255
    const blue = hexInt & 255
    return [red, green, blue]
  }

  remapValue(value, start1, end1, start2, end2) {
    const remapped = ((value - start1) * (end2 - start2)) / (end1 - start1) + start2
    return remapped > 0 ? remapped : 0
  }

  drawParticle(particle) {
    const { x, y, translateX, translateY, size, alpha } = particle
    const rgb = this.hexToRgb(this.config.color)

    this.ctx.save()
    this.ctx.translate(translateX, translateY)
    this.ctx.beginPath()
    this.ctx.arc(x, y, size, 0, 2 * Math.PI)
    this.ctx.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`
    this.ctx.fill()
    this.ctx.restore()
  }

  updateParticle(particle, index) {
    // Calcular distância das bordas
    const edge = [
      particle.x + particle.translateX - particle.size,
      window.innerWidth - particle.x - particle.translateX - particle.size,
      particle.y + particle.translateY - particle.size,
      window.innerHeight - particle.y - particle.translateY - particle.size,
    ]

    const closestEdge = Math.min(...edge)
    const remapClosestEdge = this.remapValue(closestEdge, 0, 20, 0, 1)

    // Atualizar alpha baseado na proximidade das bordas
    if (remapClosestEdge > 1) {
      particle.alpha += 0.02
      if (particle.alpha > particle.targetAlpha) {
        particle.alpha = particle.targetAlpha
      }
    } else {
      particle.alpha = particle.targetAlpha * remapClosestEdge
    }

    // Atualizar posição
    particle.x += particle.dx + this.config.vx
    particle.y += particle.dy + this.config.vy

    // Efeito magnético do mouse
    particle.translateX +=
      (this.mouse.x / (this.config.staticity / particle.magnetism) - particle.translateX) / this.config.ease
    particle.translateY +=
      (this.mouse.y / (this.config.staticity / particle.magnetism) - particle.translateY) / this.config.ease

    // Recriar partícula se sair da tela
    if (
      particle.x < -particle.size ||
      particle.x > window.innerWidth + particle.size ||
      particle.y < -particle.size ||
      particle.y > window.innerHeight + particle.size
    ) {
      this.particles[index] = this.createParticle()
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

    this.particles.forEach((particle, index) => {
      this.updateParticle(particle, index)
      this.drawParticle(particle)
    })

    this.animationId = requestAnimationFrame(() => this.animate())
  }

  bindEvents() {
    // Mouse move
    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX - window.innerWidth / 2
      this.mouse.y = e.clientY - window.innerHeight / 2
    })

    // Resize
    let resizeTimeout
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        this.resizeCanvas()
        this.createParticles()
      }, 200)
    })
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
    window.removeEventListener("mousemove", this.handleMouseMove)
    window.removeEventListener("resize", this.handleResize)
  }
}

// Inicializar as partículas quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
  new ParticlesEffect("particles-canvas", {
    quantity: 80,
    color: "#f0f0f0",
    size: 0.6,
    ease: 50,
    staticity: 50,
  })
})

