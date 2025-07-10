# Rhythm Game with Pixi.js

A fun and interactive rhythm game built using Pixi.js! Test your timing and rhythm skills by hitting notes as they fall down the screen.

## Features

- **4-Lane Gameplay**: Notes fall down in 4 different lanes
- **Keyboard Controls**: Use A, S, D, F keys to hit notes
- **Scoring System**: Earn points based on timing accuracy
- **Combo System**: Build combos for bonus points
- **Visual Effects**: Beautiful animations and particle effects
- **Responsive Design**: Modern UI with gradient backgrounds

## How to Play

1. **Start the Game**: Click the "Start Game" button
2. **Hit the Notes**: Press A, S, D, or F when notes reach the target areas at the bottom
3. **Timing is Key**: 
   - **PERFECT**: Hit within 15 pixels of the target
   - **GREAT**: Hit within 30 pixels of the target  
   - **GOOD**: Hit within 50 pixels of the target
4. **Build Combos**: Consecutive hits increase your combo multiplier
5. **Score Points**: Earn points based on accuracy and combo

## Controls

- **A**: Hit notes in the first lane (red)
- **S**: Hit notes in the second lane (teal)
- **D**: Hit notes in the third lane (blue)
- **F**: Hit notes in the fourth lane (yellow)

## Technical Details

- **Framework**: Pixi.js v7.3.2
- **Language**: JavaScript (ES6+)
- **Graphics**: Hardware-accelerated WebGL rendering
- **Audio**: Timing-based gameplay (120 BPM)

## Running the Game

### Option 1: Play Online (GitHub Pages)
The game is hosted on GitHub Pages and can be played directly at:
`https://[your-username].github.io/[repository-name]/`

### Option 2: Local HTTP Server
```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (if you have it installed)
npx http-server

# Using PHP (if you have it installed)
php -S localhost:8000
```

### Option 3: Using npm scripts
```bash
npm run start
```

Then open your browser and go to `http://localhost:8000`

## Hosting on GitHub Pages

This project is configured for automatic deployment to GitHub Pages. Here's how to set it up:

### 1. Create a GitHub Repository
```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Rhythm game with Pixi.js"

# Add remote repository (replace with your GitHub repository URL)
git remote add origin https://github.com/[your-username]/[repository-name].git

# Push to GitHub
git push -u origin main
```

### 2. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. The workflow will automatically deploy your game

### 3. Access Your Game
After the deployment completes, your game will be available at:
`https://[your-username].github.io/[repository-name]/`

### 4. Automatic Updates
Every time you push changes to the main branch, GitHub Actions will automatically:
- Build and deploy the updated game
- Make it available on GitHub Pages
- No manual intervention required!

### GitHub Actions Workflow
The project includes a `.github/workflows/deploy.yml` file that:
- Triggers on pushes to main/master branch
- Uses GitHub's official Pages actions
- Deploys the entire project as a static site
- Handles all the deployment automatically

## Game Features

### Visual Elements
- Animated falling notes with color-coded lanes
- Glowing target areas that respond to key presses
- Particle effects in the background
- Smooth animations and transitions
- Rating text that appears when hitting notes

### Gameplay Mechanics
- **Note Spawning**: Notes spawn at regular intervals based on BPM
- **Hit Detection**: Accurate timing detection with different accuracy levels
- **Combo System**: Consecutive hits build up a combo multiplier
- **Score Calculation**: Points awarded based on accuracy and combo
- **Visual Feedback**: Immediate feedback for hits, misses, and key presses

## Customization

You can easily customize the game by modifying these parameters in `game.js`:

```javascript
// Game speed (how fast notes fall)
this.gameSpeed = 2;

// Beats per minute (affects note spawn rate)
this.bpm = 120;

// Note colors for each lane
this.keyColors = [0xff6b6b, 0x4ecdc4, 0x45b7d1, 0xf9ca24];

// Hit detection tolerance
if (distance < 15) // Perfect hit
if (distance < 30) // Great hit
if (distance < 50) // Good hit
```

## Browser Compatibility

This game works in all modern browsers that support:
- WebGL
- ES6 JavaScript features
- HTML5 Canvas
- Keyboard event handling

## Future Enhancements

Potential improvements that could be added:
- Audio integration with actual music tracks
- Multiple difficulty levels
- Different note types (hold notes, double notes)
- Power-ups and special effects
- Leaderboard system
- Mobile touch controls
- Custom songs/patterns

## License

MIT License - Feel free to use and modify this code for your own projects!
