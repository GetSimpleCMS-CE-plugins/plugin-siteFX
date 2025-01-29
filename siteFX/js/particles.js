class QuantumParticleAnimation {
    constructor() {
        this.canvas = document.getElementById('quantumCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.connectionRadius = 150;
        this.particleCount = 150;
        this.particleSpeed = 1;
        this.glowIntensity = 20;
        this.gravityWellActive = false;
        this.timeDilationActive = false;
        this.vortexActive = false;
        this.colorWaveActive = false;
        this.repulsionActive = false;
        this.explosionTime = 0;
        this.pulseWaveActive = false;
        this.tornadoActive = false;
        this.blackHoleActive = false;
        this.trailsActive = false;
        this.pulseTime = 0;
        this.tornadoAngle = 0;
        this.mousePos = { x: 0, y: 0 };
        this.lastTime = performance.now();
        this.fps = 0;
        this.frameCount = 0;
        this.lastFpsUpdate = 0;
        this.colorWaveOffset = 0;
        
        this.colorSchemes = {
            default: () => `hsla(${Math.random() * 360}, 70%, 60%, 0.8)`,
            cosmic: () => `hsla(${Math.random() * 60 + 220}, 80%, 60%, 0.8)`,
            matrix: () => `hsla(120, ${Math.random() * 40 + 60}%, 50%, 0.8)`,
            fireflies: () => `hsla(${Math.random() * 40 + 20}, 100%, 70%, 0.8)`,
            rainbow: () => `hsla(${(Date.now() * 0.1) % 360}, 80%, 60%, 0.8)`
        };
        this.currentColorScheme = 'default';
        
        this.resize();
        this.initParticles();
        this.setupEventListeners();
        this.animate();
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => this.resize());
        this.canvas.addEventListener('mousemove', (e) => {
            this.mousePos.x = e.clientX;
            this.mousePos.y = e.clientY;
        });

        // Control panel listeners
        document.getElementById('particleCount').addEventListener('input', (e) => {
            this.particleCount = parseInt(e.target.value);
            this.initParticles();
        });
        
        document.getElementById('connectionRadius').addEventListener('input', (e) => {
            this.connectionRadius = parseInt(e.target.value);
        });
        
        document.getElementById('particleSpeed').addEventListener('input', (e) => {
            this.particleSpeed = parseFloat(e.target.value);
            this.updateParticleSpeed();
        });
        
        document.getElementById('glowIntensity').addEventListener('input', (e) => {
            this.glowIntensity = parseInt(e.target.value);
        });
    }
    
    updateParticleSpeed() {
        for (let particle of this.particles) {
            const currentSpeed = Math.hypot(particle.dx, particle.dy);
            particle.dx = (particle.dx / currentSpeed) * this.particleSpeed;
            particle.dy = (particle.dy / currentSpeed) * this.particleSpeed;
            particle.originalSpeed = this.particleSpeed;
        }
    }
    
    setPreset(preset) {
        this.currentColorScheme = preset;
        switch(preset) {
            case 'cosmic':
                this.particleSpeed = 0.5;
                this.glowIntensity = 30;
                break;
            case 'matrix':
                this.particleSpeed = 2;
                this.glowIntensity = 15;
                break;
            case 'fireflies':
                this.particleSpeed = 0.8;
                this.glowIntensity = 25;
                break;
            case 'rainbow':
                this.particleSpeed = 1.5;
                this.glowIntensity = 20;
                break;
        }
        this.updateControlsUI();
        this.initParticles();
    }
    
    updateControlsUI() {
        document.getElementById('particleSpeed').value = this.particleSpeed;
        document.getElementById('glowIntensity').value = this.glowIntensity;
        document.getElementById('particleCount').value = this.particleCount;
        document.getElementById('connectionRadius').value = this.connectionRadius;
    }
    
    toggleGravityWell() {
        this.gravityWellActive = !this.gravityWellActive;
    }
    
    toggleTimeDilation() {
        this.timeDilationActive = !this.timeDilationActive;
    }
    
    toggleVortex() {
        this.vortexActive = !this.vortexActive;
    }

    toggleColorWave() {
        this.colorWaveActive = !this.colorWaveActive;
    }

    toggleRepulsion() {
        this.repulsionActive = !this.repulsionActive;
    }

    togglePulseWave() {
        this.pulseWaveActive = !this.pulseWaveActive;
    }

    toggleTornado() {
        this.tornadoActive = !this.tornadoActive;
        this.tornadoAngle = 0;
    }

    toggleBlackHole() {
        this.blackHoleActive = !this.blackHoleActive;
    }

    toggleTrails() {
        this.trailsActive = !this.trailsActive;
        // Reset trail history when toggling off
        if (!this.trailsActive) {
            for (let particle of this.particles) {
                particle.trail = [];
            }
        }
    }

    triggerExplosion() {
        this.explosionTime = performance.now();
        // Give particles random velocities away from center
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        for (let particle of this.particles) {
            const dx = particle.x - centerX;
            const dy = particle.y - centerY;
            const distance = Math.hypot(dx, dy);
            const angle = Math.atan2(dy, dx);
            const speed = Math.random() * 10 + 5;
            particle.dx = Math.cos(angle) * speed;
            particle.dy = Math.sin(angle) * speed;
        }
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }
    
    initParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new QuantumParticle(
                Math.random() * this.width,
                Math.random() * this.height,
                this.colorSchemes[this.currentColorScheme](),
                this.particleSpeed
            ));
        }
    }
    
    drawConnections() {
        this.ctx.beginPath();
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                const distance = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                
                if (distance < this.connectionRadius) {
                    const opacity = 1 - (distance / this.connectionRadius);
                    this.ctx.strokeStyle = `rgba(100, 200, 255, ${opacity * 0.3})`;
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                }
            }
        }
        this.ctx.stroke();
    }
    
    updateFPS() {
        const now = performance.now();
        const delta = now - this.lastTime;
        this.frameCount++;
        
        if (now - this.lastFpsUpdate > 1000) {
            this.fps = Math.round(this.frameCount * 1000 / (now - this.lastFpsUpdate));
            document.getElementById('fpsCounter').textContent = `FPS: ${this.fps}`;
            this.frameCount = 0;
            this.lastFpsUpdate = now;
        }
        
        this.lastTime = now;
        return delta;
    }
    
    animate() {
        const delta = this.updateFPS();
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Background with fade effect for trails
        this.ctx.fillStyle = this.trailsActive ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.2)';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Update effects
        if (this.pulseWaveActive) {
            this.pulseTime += delta * 0.001;
        }
        if (this.tornadoActive) {
            this.tornadoAngle += delta * 0.001;
        }
        
        // Update color wave
        if (this.colorWaveActive) {
            this.colorWaveOffset += delta * 0.001;
        }
        
        // Draw connections
        this.drawConnections();
        
        // Update and draw particles
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        
        for (let particle of this.particles) {
            // Draw trails if active
            if (this.trailsActive) {
                this.ctx.beginPath();
                this.ctx.strokeStyle = particle.color.replace('0.8', '0.2');
                this.ctx.lineWidth = particle.radius * 0.5;
                
                if (!particle.trail) particle.trail = [];
                particle.trail.push({ x: particle.x, y: particle.y });
                if (particle.trail.length > 10) particle.trail.shift();
                
                if (particle.trail.length > 1) {
                    this.ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
                    for (let i = 1; i < particle.trail.length; i++) {
                        this.ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
                    }
                    this.ctx.stroke();
                }
            }

            // Gravity Well
            if (this.gravityWellActive) {
                const dx = this.mousePos.x - particle.x;
                const dy = this.mousePos.y - particle.y;
                const distance = Math.hypot(dx, dy);
                if (distance < 200) {
                    const force = (200 - distance) * 0.0005;
                    particle.dx += dx * force;
                    particle.dy += dy * force;
                }
            }
            
            // Vortex Effect
            if (this.vortexActive) {
                const dx = particle.x - centerX;
                const dy = particle.y - centerY;
                const distance = Math.hypot(dx, dy);
                const angle = Math.atan2(dy, dx);
                const vortexForce = 0.1;
                particle.dx += -Math.sin(angle) * vortexForce;
                particle.dy += Math.cos(angle) * vortexForce;
            }
            
            // Color Wave Effect
            if (this.colorWaveActive) {
                const distance = Math.hypot(particle.x - centerX, particle.y - centerY);
                const hue = (distance * 0.5 + this.colorWaveOffset * 100) % 360;
                particle.color = `hsla(${hue}, 70%, 60%, 0.8)`;
            }
            
            // Repulsion Effect
            if (this.repulsionActive) {
                for (let other of this.particles) {
                    if (other !== particle) {
                        const dx = particle.x - other.x;
                        const dy = particle.y - other.y;
                        const distance = Math.hypot(dx, dy);
                        if (distance < 50) {
                            const force = 0.05 / (distance + 1);
                            particle.dx += dx * force;
                            particle.dy += dy * force;
                        }
                    }
                }
            }
            
            // Pulse Wave Effect
            if (this.pulseWaveActive) {
                const centerX = this.width / 2;
                const centerY = this.height / 2;
                const distance = Math.hypot(particle.x - centerX, particle.y - centerY);
                const wavePhase = (distance * 0.05 - this.pulseTime * 2) % (Math.PI * 2);
                const wavePush = Math.sin(wavePhase) * 0.5;
                const angle = Math.atan2(particle.y - centerY, particle.x - centerX);
                particle.dx += Math.cos(angle) * wavePush;
                particle.dy += Math.sin(angle) * wavePush;
            }

            // Tornado Effect
            if (this.tornadoActive) {
                const centerX = this.width / 2;
                const centerY = this.height / 2;
                const dx = particle.x - centerX;
                const dy = particle.y - centerY;
                const distance = Math.hypot(dx, dy);
                const angle = Math.atan2(dy, dx) + this.tornadoAngle;
                const radius = distance * 0.95;
                const targetX = centerX + Math.cos(angle) * radius;
                const targetY = centerY + Math.sin(angle) * radius;
                particle.dx += (targetX - particle.x) * 0.1;
                particle.dy += (targetY - particle.y) * 0.1;
            }

            // Black Hole Effect
            if (this.blackHoleActive) {
                const centerX = this.width / 2;
                const centerY = this.height / 2;
                const dx = particle.x - centerX;
                const dy = particle.y - centerY;
                const distance = Math.hypot(dx, dy);
                if (distance < 100) {
                    particle.radius *= 0.99; // Shrink particles as they get closer
                    const force = (100 - distance) * 0.002;
                    particle.dx -= dx * force;
                    particle.dy -= dy * force;
                } else {
                    particle.radius = Math.min(particle.radius * 1.01, particle.baseRadius); // Restore size
                }
            }

            // Explosion Effect Decay
            if (this.explosionTime > 0) {
                const timeSinceExplosion = performance.now() - this.explosionTime;
                if (timeSinceExplosion > 2000) {
                    this.explosionTime = 0;
                } else {
                    const decay = 1 - (timeSinceExplosion / 2000);
                    particle.dx *= 0.99;
                    particle.dy *= 0.99;
                    particle.radius = particle.baseRadius * (1 + decay);
                }
            }
            
            // Time Dilation
            if (this.timeDilationActive) {
                const distanceToCenter = Math.hypot(
                    particle.x - centerX,
                    particle.y - centerY
                );
                const timeScale = 1 - (Math.min(distanceToCenter, 300) / 300) * 0.8;
                particle.update(this.width, this.height, delta * timeScale);
            } else {
                particle.update(this.width, this.height, delta);
            }
            
            particle.draw(this.ctx, this.glowIntensity);
        }
        
        requestAnimationFrame(() => this.animate());
    }

    randomize() {
        // Randomize parameters
        this.particleCount = Math.floor(Math.random() * 450) + 50;
        this.connectionRadius = Math.floor(Math.random() * 250) + 50;
        this.particleSpeed = parseFloat((Math.random() * 2.9 + 0.1).toFixed(1));
        this.glowIntensity = Math.floor(Math.random() * 40);

        // Update UI to reflect new values
        this.updateControlsUI();

        // Randomly choose a preset (25% chance)
        if (Math.random() < 0.25) {
            const presets = ['cosmic', 'matrix', 'fireflies', 'rainbow'];
            const randomPreset = presets[Math.floor(Math.random() * presets.length)];
            this.setPreset(randomPreset);
        } else {
            // Random color scheme
            const hue = Math.random() * 360;
            this.currentColorScheme = 'default';
            this.colorSchemes.default = () => `hsla(${hue}, 80%, 60%, 0.8)`;
        }

        // Randomly toggle effects (30% chance each)
        this.gravityWellActive = Math.random() < 0.3;
        this.timeDilationActive = Math.random() < 0.3;
        this.vortexActive = Math.random() < 0.3;
        this.colorWaveActive = Math.random() < 0.3;
        this.repulsionActive = Math.random() < 0.3;
        this.pulseWaveActive = Math.random() < 0.3;
        this.tornadoActive = Math.random() < 0.3;
        this.blackHoleActive = Math.random() < 0.3;
        this.trailsActive = Math.random() < 0.3;

        // Reset particles with new settings
        this.initParticles();
        this.updateParticleSpeed();
    }
}

class QuantumParticle {
    constructor(x, y, color, speed) {
        this.x = x;
        this.y = y;
        this.baseRadius = Math.random() * 3 + 1;
        this.radius = this.baseRadius;
        this.dx = (Math.random() - 0.5) * 2 * speed;
        this.dy = (Math.random() - 0.5) * 2 * speed;
        this.color = color;
        this.originalSpeed = speed;
        this.trail = [];
    }
    
    update(width, height, delta = 16) {
        const normalizedDelta = delta / 16;
        
        this.x += this.dx * normalizedDelta;
        this.y += this.dy * normalizedDelta;
        
        // Bounce off edges
        if (this.x < 0 || this.x > width) {
            this.dx *= -1;
            this.x = Math.max(0, Math.min(width, this.x));
        }
        if (this.y < 0 || this.y > height) {
            this.dy *= -1;
            this.y = Math.max(0, Math.min(height, this.y));
        }
        
        // Normalize speed
        const speed = Math.hypot(this.dx, this.dy);
        if (speed > this.originalSpeed * 2) {
            this.dx = (this.dx / speed) * this.originalSpeed * 2;
            this.dy = (this.dy / speed) * this.originalSpeed * 2;
        }
    }
    
    draw(ctx, glowIntensity) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        
        // Glow effect
        ctx.shadowBlur = glowIntensity;
        ctx.shadowColor = this.color;
        
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Reset shadow
        ctx.shadowBlur = 0;
    }
}

// Initialize the animation when the page loads
window.addEventListener('load', () => {
    window.animation = new QuantumParticleAnimation();
});
