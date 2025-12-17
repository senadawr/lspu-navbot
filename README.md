# LSPU Campus Navigator

A responsive web-based campus navigation system for Laguna State Polytechnic University (LSPU) Los Baños Campus. Plan efficient routes through 180+ locations with real-time pathfinding and estimated arrival times.

## ✨ Features

- **Smart Pathfinding**: Graph-based shortest path algorithm for optimal route planning
- **180+ Locations**: Comprehensive coverage of all campus buildings and rooms
- **Dark Mode**: Seamless light/dark theme toggle with persistent preference
- **Offline Support**: Fully functional offline with vendored Leaflet CSS library
- **Feather Icons**: Consistent, clean icon set throughout the interface
- **Fun Facts**: Educational campus trivia with categorized facts
- **Mobile Responsive**: Optimized for desktop and mobile devices
- **Smooth Transitions**: Beautiful CSS animations for all UI interactions
- **Live ETA Calculation**: Estimated arrival times based on path distances

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server or build tools required

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/navbot.git
cd navbot
```

2. Open in a web browser:
```bash
# Simply open index.html directly in your browser
# Or start a local server (Python 3):
python -m http.server 8000
# Then visit http://localhost:8000
```

3. That's it! The app is ready to use.

## 📱 Usage

### Finding a Route
1. Click **"Get started"** on the landing page
2. Enter your **starting location** in the search field
3. Enter your **destination** location
4. View the optimal path and estimated arrival time
5. Map displays the route visually with colored paths

### Navigation Features
- **Theme Toggle**: Click the sun/moon icon to switch between light and dark modes
- **Info Button**: Access information about the app and campus
- **Fun Facts**: Click the lightbulb icon to explore campus trivia
- **Search**: Type location names (case-insensitive, partial matching supported)
- **Overview**: View all campus locations and their coordinates

## 🏗️ Project Structure

```
navbot/
├── index.html              # Main HTML structure (landing + app sections)
├── style.css               # Styling, theme variables, animations
├── app.js                  # Graph data, pathfinding logic, UI interactions
├── node-positions.json     # Node coordinates and metadata (180+ locations)
├── libs/
│   ├── leaflet.js          # Leaflet map library (CDN reference)
│   ├── leaflet.css         # Leaflet styling (vendored for offline)
│   └── feather-icons.js    # SVG icon library
├── sprites/
│   └── lspu_logo.png       # University logo
└── pythonProject10/        # Legacy Python campus graph generator
```

## 🛠️ Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Mapping**: [Leaflet.js](https://leafletjs.com/) v1.9.4
- **Icons**: [Feather Icons](https://feathericons.com/)
- **Routing**: Custom Dijkstra-like graph traversal algorithm
- **Styling**: CSS custom properties for theming, Flexbox/Grid layouts
- **Data**: Static JSON for node positions and metadata

## 🎨 Theming

The app uses CSS custom properties for easy theme management:

```css
/* Light theme (default) */
--bg-primary: #ffffff
--text-primary: #1a1a1a
--accent: #2563eb

/* Dark theme (body.theme-dark) */
--bg-primary: #1a1a1a
--text-primary: #ffffff
--accent: #3b82f6
```

Theme preference is saved to `localStorage` and persists across sessions.

## 📍 How Pathfinding Works

1. **Graph Construction**: Campus locations are nodes, distances are weighted edges
2. **Shortest Path**: Implements a graph traversal algorithm to find the optimal route
3. **Visualization**: Path is drawn on the map using Leaflet's polyline layer
4. **ETA Calculation**: Distance divided by average walking speed (1.4 m/s)

## 🌐 Offline Support

The app is fully functional offline:
- Leaflet CSS is vendored locally (`libs/leaflet.css`)
- All assets are stored locally
- No external API calls required
- Perfect for campus use without internet connectivity

## 📱 Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Android Chrome)

### Responsive Breakpoints
- **Desktop**: 1000px+ (full layout)
- **Tablet**: 900px - 999px (compact layout)
- **Mobile**: < 900px (stacked, touch-optimized)

## 🎯 Key Features Explained

### Search & Autocomplete
- Searches all 180+ location names
- Partial matching: type "CCJE" to find "CCJE Room 1", etc.
- Case-insensitive matching
- Results displayed as you type

### Map Visualization
- Interactive Leaflet map with campus floor plan background
- Markers for all locations with room numbers
- Color-coded path visualization
- SVG overlay for precise coordinate mapping

### Fun Facts System
- Category-tagged facts (History, Architecture, Events, etc.)
- Smooth fade transitions when toggling display
- Mobile-friendly facts button
- Randomized fact rotation

### Dark Mode
- Smooth 260ms transition between themes
- All UI elements theme-aware
- Icons update automatically
- Persists user preference in localStorage

## ⚙️ Configuration

### Modifying Node Positions
Edit `node-positions.json` to add/remove/move locations:
```json
{
  "Location Name": [x_coordinate, y_coordinate],
  "Another Room": [x, y]
}
```

### Updating Graph Edges
Modify the `edges` array in `app.js` to add/remove pathway connections:
```javascript
const edges = [
  ["Building A", "Building B", 100],  // [from, to, distance_in_meters]
  // ... more edges
];
```

### Adding Fun Facts
Update the `funFacts` object in `app.js`:
```javascript
const funFacts = {
  "category": ["Fact 1", "Fact 2", "Fact 3"],
  // ... more categories
};
```

## 🐛 Troubleshooting

### Map doesn't display
- Ensure `libs/leaflet.js` is loaded
- Check browser console for errors
- Verify `node-positions.json` is valid JSON

### Pathfinding returns no route
- Verify both locations exist in `node-positions.json`
- Check that graph edges connect the locations
- Look for spelling differences in location names

### Icons not showing
- Feather icons load automatically on page load
- If icons appear as `<i>` tags, call `feather.replace()` in console

### Dark mode not persisting
- Check browser's localStorage is enabled
- Verify `theme-dark` class toggle works in DevTools

## 📊 Performance

- **Initial Load**: < 1s
- **Pathfinding**: < 100ms for 180+ nodes
- **Theme Switch**: 260ms smooth transition
- **Map Rendering**: Optimized with Leaflet layer management

## 📝 License

This project is created for Laguna State Polytechnic University. Include appropriate attribution if used elsewhere.

## 👥 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Support

For issues or questions about the LSPU Campus Navigator, please open an issue on GitHub or contact the development team.

## 🙏 Acknowledgments

- LSPU Information Technology Office for campus data
- Leaflet.js community for the mapping library
- Feather Icons for the icon set
- Ka-Piyu LSPU students for feedback and testing

---

**Last Updated**: December 2025  
**Version**: 1.0.0  
**Status**: Production Ready ✅
