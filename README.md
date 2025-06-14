# UMN Wordle 🎓

A University of Minnesota-themed Wordle game built with React, TypeScript, and Vite. This game puts a UMN twist on the popular word-guessing game, featuring UMN-related words and a maroon and gold color scheme.

## 🎮 Features

- **UMN-Themed Words**: Guess UMN-related words like building names, landmarks, and campus terms
- **Daily Challenge**: New word every day
- **Statistics Tracking**:
  - Games played and win percentage
  - Current and maximum streaks
  - Guess distribution
  - Persistent stats using local storage
- **Hint System**: Get a hint after 3 attempts
- **Responsive Design**: Play on desktop or mobile
- **Keyboard Support**: Type your guesses or use the on-screen keyboard
- **Beautiful Animations**: Smooth tile flips and color transitions

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/UMNWordle.git
cd UMNWordle
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🛠️ Built With

- [React](https://reactjs.org/) - Frontend framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool and development server
- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS) - Styling

## 🎯 How to Play

1. You have 6 attempts to guess the UMN-related word
2. Each guess must be a valid 6-letter word
3. After each guess:
   - 🟩 Green: Letter is correct and in the right spot
   - 🟨 Yellow: Letter is in the word but in the wrong spot
   - ⬜ Gray: Letter is not in the word
4. Get a hint after 3 attempts
5. Come back daily for a new challenge!

## 📱 Features in Detail

### Game Mechanics
- 6-letter words
- 6 attempts per game
- One word per day
- Keyboard input support
- On-screen keyboard with color feedback

### Statistics
- Total games played
- Win percentage
- Current streak
- Maximum streak
- Guess distribution chart
- Stats persist between sessions

### UI/UX
- Responsive design
- Smooth animations
- Color-coded feedback
- UMN maroon and gold theme
- Accessible keyboard navigation

## 🏗️ Project Structure

```
src/
├── components/         # React components
│   ├── GameBoard.tsx   # Main game board
│   ├── Keyboard.tsx    # On-screen keyboard
│   ├── Stats.tsx       # Statistics modal
│   └── Tile.tsx        # Individual letter tile
├── styles/            # CSS files
├── types/             # TypeScript type definitions
└── App.tsx           # Main application component
```

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Component-based architecture
- Responsive design principles

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the original [Wordle](https://www.nytimes.com/games/wordle/index.html)
- UMN colors and theme
- React and TypeScript communities

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/UMNWordle](https://github.com/yourusername/UMNWordle)
