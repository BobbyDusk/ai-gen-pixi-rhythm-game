// Rhythm Game using Pixi.js
class RhythmGame {
    constructor() {
        this.app = null;
        this.gameStarted = false;
        this.score = 0;
        this.combo = 0;
        this.notes = [];
        this.targets = [];
        this.gameSpeed = 2;
        this.bpm = 120;
        this.noteSpawnInterval = 60000 / this.bpm; // Convert BPM to milliseconds
        this.lastNoteTime = 0;
        this.keys = ['KeyA', 'KeyS', 'KeyD', 'KeyF'];
        this.keyColors = [0xff6b6b, 0x4ecdc4, 0x45b7d1, 0xf9ca24];
        this.pressedKeys = new Set();
        
        this.init();
    }
    
    init() {
        // Create PIXI Application
        this.app = new PIXI.Application({
            width: 800,
            height: 600,
            backgroundColor: 0x1a1a2e,
            antialias: true
        });
        
        // Add canvas to the container
        document.getElementById('gameContainer').appendChild(this.app.view);
        
        // Create game containers
        this.gameContainer = new PIXI.Container();
        this.app.stage.addChild(this.gameContainer);
        
        this.setupTargets();
        this.setupControls();
        this.setupGameLoop();
    }
    
    setupTargets() {
        // Create target areas where notes should be hit
        const targetY = this.app.screen.height - 100;
        const spacing = this.app.screen.width / 5;
        
        for (let i = 0; i < 4; i++) {
            const target = new PIXI.Graphics();
            target.beginFill(this.keyColors[i], 0.3);
            target.drawRoundedRect(0, 0, 80, 80, 10);
            target.endFill();
            
            target.beginFill(this.keyColors[i], 0.8);
            target.drawRoundedRect(5, 5, 70, 70, 8);
            target.endFill();
            
            target.x = spacing * (i + 1) - 40;
            target.y = targetY;
            
            // Add key label
            const keyText = new PIXI.Text(['A', 'S', 'D', 'F'][i], {
                fontFamily: 'Arial',
                fontSize: 24,
                fill: 0xffffff,
                fontWeight: 'bold'
            });
            keyText.anchor.set(0.5);
            keyText.x = 40;
            keyText.y = 40;
            target.addChild(keyText);
            
            this.targets.push(target);
            this.gameContainer.addChild(target);
        }
    }
    
    setupControls() {
        // Setup keyboard controls
        document.addEventListener('keydown', (e) => {
            if (!this.gameStarted) return;
            
            const keyIndex = this.keys.indexOf(e.code);
            if (keyIndex !== -1 && !this.pressedKeys.has(e.code)) {
                this.pressedKeys.add(e.code);
                this.handleKeyPress(keyIndex);
            }
        });
        
        document.addEventListener('keyup', (e) => {
            this.pressedKeys.delete(e.code);
        });
        
        // Start button
        document.getElementById('startButton').addEventListener('click', () => {
            this.startGame();
        });
    }
    
    handleKeyPress(keyIndex) {
        // Check if there's a note to hit
        let hitNote = null;
        let bestDistance = Infinity;
        
        for (let note of this.notes) {
            if (note.lane === keyIndex) {
                const distance = Math.abs(note.y - (this.app.screen.height - 100));
                if (distance < 50 && distance < bestDistance) {
                    hitNote = note;
                    bestDistance = distance;
                }
            }
        }
        
        if (hitNote) {
            this.hitNote(hitNote, bestDistance);
        } else {
            // Miss - break combo
            this.combo = 0;
            this.updateUI();
        }
        
        // Visual feedback for key press
        this.animateTarget(keyIndex);
    }
    
    hitNote(note, distance) {
        // Remove note
        this.gameContainer.removeChild(note);
        this.notes = this.notes.filter(n => n !== note);
        
        // Calculate score based on accuracy
        let points = 0;
        let rating = '';
        
        if (distance < 15) {
            points = 100;
            rating = 'PERFECT!';
            this.combo++;
        } else if (distance < 30) {
            points = 80;
            rating = 'GREAT!';
            this.combo++;
        } else if (distance < 50) {
            points = 60;
            rating = 'GOOD';
            this.combo++;
        }
        
        this.score += points + (this.combo * 2);
        this.showRating(rating, note.x, note.y);
        this.updateUI();
    }
    
    showRating(rating, x, y) {
        const ratingText = new PIXI.Text(rating, {
            fontFamily: 'Arial',
            fontSize: 20,
            fill: 0xffffff,
            fontWeight: 'bold'
        });
        ratingText.anchor.set(0.5);
        ratingText.x = x;
        ratingText.y = y;
        
        this.gameContainer.addChild(ratingText);
        
        // Animate rating text
        const tween = {
            y: ratingText.y,
            alpha: 1,
            scale: 1
        };
        
        const animate = () => {
            tween.y -= 2;
            tween.alpha -= 0.02;
            tween.scale += 0.01;
            
            ratingText.y = tween.y;
            ratingText.alpha = tween.alpha;
            ratingText.scale.set(tween.scale);
            
            if (tween.alpha > 0) {
                requestAnimationFrame(animate);
            } else {
                this.gameContainer.removeChild(ratingText);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    animateTarget(keyIndex) {
        const target = this.targets[keyIndex];
        const originalScale = target.scale.x;
        
        target.scale.set(1.2);
        
        const animate = () => {
            target.scale.x = PIXI.utils.lerp(target.scale.x, originalScale, 0.2);
            target.scale.y = PIXI.utils.lerp(target.scale.y, originalScale, 0.2);
            
            if (Math.abs(target.scale.x - originalScale) > 0.01) {
                requestAnimationFrame(animate);
            } else {
                target.scale.set(originalScale);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    spawnNote() {
        const lane = Math.floor(Math.random() * 4);
        const note = new PIXI.Graphics();
        
        // Create note with gradient effect
        note.beginFill(this.keyColors[lane]);
        note.drawRoundedRect(0, 0, 60, 20, 5);
        note.endFill();
        
        // Add glow effect
        note.beginFill(0xffffff, 0.3);
        note.drawRoundedRect(2, 2, 56, 16, 4);
        note.endFill();
        
        note.x = this.targets[lane].x + 10;
        note.y = -20;
        note.lane = lane;
        
        this.notes.push(note);
        this.gameContainer.addChild(note);
    }
    
    updateNotes() {
        for (let i = this.notes.length - 1; i >= 0; i--) {
            const note = this.notes[i];
            note.y += this.gameSpeed;
            
            // Remove notes that have gone off screen
            if (note.y > this.app.screen.height) {
                this.gameContainer.removeChild(note);
                this.notes.splice(i, 1);
                // Miss - break combo
                this.combo = 0;
                this.updateUI();
            }
        }
    }
    
    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('combo').textContent = this.combo;
    }
    
    setupGameLoop() {
        this.app.ticker.add(() => {
            if (!this.gameStarted) return;
            
            this.updateNotes();
            
            // Spawn new notes based on BPM
            const currentTime = Date.now();
            if (currentTime - this.lastNoteTime > this.noteSpawnInterval) {
                this.spawnNote();
                this.lastNoteTime = currentTime;
            }
        });
    }
    
    startGame() {
        this.gameStarted = true;
        this.lastNoteTime = Date.now();
        
        // Hide start button and show instructions
        document.getElementById('startButton').classList.add('hidden');
        document.getElementById('instructions').style.display = 'block';
        
        // Start spawning notes immediately
        this.spawnNote();
        
        // Add some visual effects
        this.addBackgroundEffects();
    }
    
    addBackgroundEffects() {
        // Add animated background particles
        for (let i = 0; i < 20; i++) {
            const particle = new PIXI.Graphics();
            particle.beginFill(0xffffff, 0.1);
            particle.drawCircle(0, 0, Math.random() * 3 + 1);
            particle.endFill();
            
            particle.x = Math.random() * this.app.screen.width;
            particle.y = Math.random() * this.app.screen.height;
            particle.speed = Math.random() * 2 + 0.5;
            
            this.gameContainer.addChild(particle);
            
            // Animate particle
            const animateParticle = () => {
                particle.y += particle.speed;
                particle.alpha = Math.sin(Date.now() * 0.001 + particle.x * 0.01) * 0.5 + 0.5;
                
                if (particle.y > this.app.screen.height) {
                    particle.y = -10;
                    particle.x = Math.random() * this.app.screen.width;
                }
                
                if (this.gameStarted) {
                    requestAnimationFrame(animateParticle);
                }
            };
            
            requestAnimationFrame(animateParticle);
        }
    }
}

// Initialize the game when the page loads
window.addEventListener('load', () => {
    new RhythmGame();
});
