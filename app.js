// Graph data converted from the original Python NetworkX script
const edgesFirst = [
  ["Hall", "Clinic", 12],
  ["Clinic", "Cafeteria Entrance", 10],
  ["GAD", "Clinic", 14],
  ["GAD", "CBAA Building", 8],
  ["GAD", "CBAA Faculty", 6.6],
  ["CBAA Faculty", "CrCBAA", 6.6],
  ["CrCBAA", "Room 101", 6.6],
  ["Room 101", "Room 102", 6.6],
  ["Room 102", "Room 103", 6.6],
  ["Room 103", "CBAA Student Council", 6.6],
];

const edgesSecond = [
  ["Gate", "Hall", 13],
  ["Hall", "End of Hall", 20],
  ["End of Hall", "Old CAS Path", 8],
  ["End of Hall", "Entrance Lacson Gym", 50],
  ["Old CAS Path", "Start Old CAS Path", 50],
  ["Old CAS Path", "ITSO Entrance", 8],
  ["Old CAS Path", "Psych Lab Entrance", 8],
  ["Old CAS Path", "TSL Entrance", 8],
  ["Old CAS Path", "CCS Faculty Room Entrance", 8],
  ["Old CAS Path", "CFND Room 1 Entrance", 8],
  ["Old CAS Path", "Old CAS Faculty Entrance", 8],
  ["Start Old CAS Path", "End Old CAS Path", 50],
  ["End Old CAS Path", "CSS Hallway Entrance", 2],
  ["CSS Hallway Entrance", "Office of the Dean", 5],
  ["Office of the Dean", "AVR", 5],
  ["AVR", "Bay Breeze", 5],
  ["Bay Breeze", "Room 47", 5],
  ["Room 47", "SCC", 5],
  ["SCC", "CR CS", 5],
  ["CR CS", "End of CSS Hallway", 5],
  ["End of CSS Hallway", "New Room", 3],
  ["New Room", "GSAE Office", 5],
  ["GSAE Office", "CTE Faculty", 5],
  ["CTE Faculty", "Room 5", 5],
  ["Room 5", "CR 1", 4.5],
  ["Room 5", "Room 6", 6],
  ["CR 1", "Room 6", 4],
  ["Room 6", "Room 7", 6],
  ["Room 7", "Room 8", 6],
  ["Room 8", "Siy 1", 4.6],
  ["Siy 2", "CR 2", 4.6],
  ["CR 2", "GSAE Office", 11],
  ["Lacson Gym", "Stage", 40],
  ["Stage", "CR 2", 5],
];

const edges = [...edgesFirst, ...edgesSecond];

// Build adjacency list
const graph = new Map();
for (const [a, b, w] of edges) {
  if (!graph.has(a)) graph.set(a, []);
  if (!graph.has(b)) graph.set(b, []);
  graph.get(a).push({ node: b, weight: w });
  graph.get(b).push({ node: a, weight: w });
}

const locations = Array.from(graph.keys()).sort();

function shortestPath(start, end) {
  const dist = new Map();
  const prev = new Map();
  const visited = new Set();

  for (const node of graph.keys()) dist.set(node, Infinity);
  dist.set(start, 0);

  while (visited.size < graph.size) {
    let u = null;
    let min = Infinity;
    for (const [node, d] of dist.entries()) {
      if (!visited.has(node) && d < min) {
        min = d;
        u = node;
      }
    }
    if (u === null) break;
    if (u === end) break;

    visited.add(u);
    for (const { node: v, weight } of graph.get(u)) {
      const alt = dist.get(u) + weight;
      if (alt < dist.get(v)) {
        dist.set(v, alt);
        prev.set(v, u);
      }
    }
  }

  if (dist.get(end) === Infinity) return { path: null, distance: null };

  const path = [];
  let curr = end;
  while (curr !== undefined) {
    path.unshift(curr);
    curr = prev.get(curr);
  }
  return { path, distance: dist.get(end) };
}

const startSelect = document.getElementById("start");
const endSelect = document.getElementById("end");
const computeBtn = document.getElementById("compute");
const errorBox = document.getElementById("error");
const pathBox = document.getElementById("path");
const distanceBox = document.getElementById("distance");
const landing = document.getElementById("landing");
const getStarted = document.getElementById("get-started");
const appContainer = document.querySelector(".app");
const openInfo = document.getElementById("open-info");
const closeInfo = document.getElementById("close-info");
const infoOverlay = document.getElementById("info-overlay");
const openInfoLanding = document.getElementById("open-info-landing");
const themeToggleLanding = document.getElementById("theme-toggle-landing");
const themeToggleBtn = document.getElementById("theme-toggle-btn");
const exitToLanding = document.getElementById("exit-to-landing");
let mapInstance = null;
let mapBounds = null;
let nodePositions = new Map();
let nodeMarkers = new Map();
let nodeLayer = null;
let startMarker = null;
let endMarker = null;
let pathLine = null;
let selectedStart = null;
let selectedEnd = null;

function populateSelects() {
  const placeholderStart = document.createElement("option");
  placeholderStart.value = "";
  placeholderStart.textContent = "Click map to set start";
  startSelect.appendChild(placeholderStart);

  const placeholderEnd = document.createElement("option");
  placeholderEnd.value = "";
  placeholderEnd.textContent = "Click map to set destination";
  endSelect.appendChild(placeholderEnd);

  const fragStart = document.createDocumentFragment();
  const fragEnd = document.createDocumentFragment();
  for (const loc of locations) {
    const optA = document.createElement("option");
    optA.value = optA.textContent = loc;
    fragStart.appendChild(optA);

    const optB = document.createElement("option");
    optB.value = optB.textContent = loc;
    fragEnd.appendChild(optB);
  }
  startSelect.appendChild(fragStart);
  endSelect.appendChild(fragEnd);
  startSelect.value = "";
  endSelect.value = "";
}

function updateStats() {
  let degreeSum = 0;
  for (const [, neighbors] of graph.entries()) {
    degreeSum += neighbors.length;
  }
  const avgDegree = degreeSum / graph.size;
  const hubNode = document.getElementById("hub-node");
  const avgEl = document.getElementById("avg-degree");
  if (hubNode) hubNode.textContent = "—";
  if (avgEl) avgEl.textContent = avgDegree.toFixed(1);
}

function setNearestLandmark(name) {
  const hubNode = document.getElementById("hub-node");
  if (hubNode) hubNode.textContent = name || "—";
}

function clearResultCard(message = "—") {
  distanceBox.textContent = message;
  pathBox.innerHTML = "";
  setNearestLandmark("—");
  clearPathVisualization();
}

function clearPathVisualization() {
  if (pathLine && mapInstance) {
    mapInstance.removeLayer(pathLine);
    pathLine = null;
  }
}

function updateSelectionMarkers() {
  if (!mapInstance || !nodePositions.size) return;

  if (startMarker) {
    mapInstance.removeLayer(startMarker);
    startMarker = null;
  }
  if (endMarker) {
    mapInstance.removeLayer(endMarker);
    endMarker = null;
  }

  if (selectedStart && nodePositions.has(selectedStart)) {
    startMarker = L.circleMarker(nodePositions.get(selectedStart), {
      radius: 10,
      color: "#2563eb",
      weight: 3,
      fillColor: "#93c5fd",
      fillOpacity: 0.7,
    }).addTo(mapInstance);
  }

  if (selectedEnd && nodePositions.has(selectedEnd)) {
    endMarker = L.circleMarker(nodePositions.get(selectedEnd), {
      radius: 10,
      color: "#f97316",
      weight: 3,
      fillColor: "#fdba74",
      fillOpacity: 0.7,
    }).addTo(mapInstance);
  }
}

function drawPathOnMap(path) {
  clearPathVisualization();
  if (!mapInstance || !nodePositions.size || !path || path.length < 2) return;

  const coords = path
    .map((name) => nodePositions.get(name))
    .filter(Boolean);

  if (coords.length < 2) return;

  pathLine = L.polyline(coords, {
    color: "#10b981",
    weight: 6,
    opacity: 0.85,
    lineJoin: "round",
  }).addTo(mapInstance);

  mapInstance.fitBounds(L.latLngBounds(coords), { padding: [20, 20] });
}

function generateNodePositions(nodes, width, height) {
  const positions = new Map();
  const cols = Math.ceil(Math.sqrt(nodes.length));
  const rows = Math.ceil(nodes.length / cols);
  const padding = 60;
  const cellW = (width - padding * 2) / cols;
  const cellH = (height - padding * 2) / rows;

  nodes.forEach((node, idx) => {
    const col = idx % cols;
    const row = Math.floor(idx / cols);
    const x = padding + col * cellW + cellW / 2;
    const y = padding + row * cellH + cellH / 2;
    positions.set(node, [y, x]);
  });

  return positions;
}

function nearestNode(latlng) {
  let best = null;
  let minDist = Infinity;
  nodePositions.forEach((pos, name) => {
    const dx = pos[1] - latlng.lng;
    const dy = pos[0] - latlng.lat;
    const dist = dx * dx + dy * dy;
    if (dist < minDist) {
      minDist = dist;
      best = name;
    }
  });
  return best;
}

function resetPathAndCards() {
  clearResultCard();
  errorBox.textContent = "";
}

function handleMapPick(name) {
  if (!name) return;
  errorBox.textContent = "";

  if (!selectedStart || (selectedStart && selectedEnd)) {
    selectedStart = name;
    startSelect.value = name;
    selectedEnd = null;
    endSelect.value = "";
  } else if (name !== selectedStart) {
    selectedEnd = name;
    endSelect.value = name;
  } else {
    return;
  }

  clearResultCard();
  updateSelectionMarkers();
}

function setupInteractiveNodes(width, height) {
  nodePositions = generateNodePositions(locations, width, height);
  nodeLayer = L.layerGroup().addTo(mapInstance);
  nodeMarkers = new Map();

  nodePositions.forEach((pos, name) => {
    const marker = L.circleMarker(pos, {
      radius: 6,
      color: "#1f2937",
      weight: 1.5,
      fillColor: "#e5e7eb",
      fillOpacity: 0.9,
    })
      .on("click", (evt) => {
        L.DomEvent.stopPropagation(evt);
        handleMapPick(name);
      })
      .bindTooltip(name, { direction: "top", offset: [0, -4], opacity: 0.9 });

    marker.addTo(nodeLayer);
    nodeMarkers.set(name, marker);
  });

  mapInstance.on("click", (evt) => {
    const snapped = nearestNode(evt.latlng);
    handleMapPick(snapped);
  });

  updateSelectionMarkers();
}

function renderPath(path, distance) {
  pathBox.innerHTML = "";
  if (!path) {
    distanceBox.textContent = "—";
    setNearestLandmark("—");
    clearPathVisualization();
    return;
  }
  distanceBox.textContent = `${distance.toFixed(1)} meters`;
  path.forEach((step, idx) => {
    const chip = document.createElement("div");
    chip.className = "chip";
    chip.textContent = step;
    if (idx === 0 || idx === path.length - 1) chip.classList.add("accent");
    pathBox.appendChild(chip);
    if (idx < path.length - 1) {
      const arrow = document.createElement("span");
      arrow.style.color = "#64748b";
      arrow.textContent = "→";
      pathBox.appendChild(arrow);
    }
  });

  // Nearest landmark: building just before the destination (or the destination itself if single-node)
  const nearest = path.length > 1 ? path[path.length - 2] : path[0];
  setNearestLandmark(nearest);
  drawPathOnMap(path);
}

computeBtn.addEventListener("click", () => {
  selectedStart = startSelect.value || null;
  selectedEnd = endSelect.value || null;
  const start = selectedStart;
  const end = selectedEnd;
  errorBox.textContent = "";

  if (!start || !end) {
    errorBox.textContent = "Click the map to set both start and destination.";
    clearResultCard();
    return;
  }

  if (start === end) {
    errorBox.textContent = "Start and destination must differ.";
    clearResultCard();
    return;
  }

  const { path, distance } = shortestPath(start, end);
  if (!path) {
    errorBox.textContent = "No path found between those points.";
    clearResultCard("No path");
    return;
  }
  renderPath(path, distance);
  updateSelectionMarkers();
});

startSelect.addEventListener("change", () => {
  selectedStart = startSelect.value || null;
  if (selectedStart === selectedEnd) {
    selectedEnd = null;
    endSelect.value = "";
  }
  resetPathAndCards();
  updateSelectionMarkers();
});

endSelect.addEventListener("change", () => {
  selectedEnd = endSelect.value || null;
  if (selectedEnd === selectedStart) {
    selectedEnd = null;
    endSelect.value = "";
  }
  resetPathAndCards();
  updateSelectionMarkers();
});

getStarted.addEventListener("click", () => {
  landing.classList.add("fade-out");
  // Delay app appearance slightly for staggered animation
  setTimeout(() => {
    appContainer.classList.remove("inactive");
  }, 100);
  // Ensure Leaflet map sizes correctly after becoming visible
  if (mapInstance && mapBounds) {
    setTimeout(() => {
      mapInstance.invalidateSize();
      mapInstance.fitBounds(mapBounds);
    }, 500);
  }
});

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("theme-dark");
  } else {
    document.body.classList.remove("theme-dark");
  }
  localStorage.setItem("theme", theme);
  const isDark = theme === "dark";
  if (themeToggleBtn) {
    themeToggleBtn.textContent = isDark ? "🌙" : "🌞";
  }
  if (themeToggleLanding) {
    themeToggleLanding.textContent = isDark ? "🌙" : "🌞";
  }
}

function initTheme() {
  const saved = localStorage.getItem("theme");
  applyTheme(saved === "dark" ? "dark" : "light");
}

function toggleInfo(open) {
  if (open) {
    infoOverlay.classList.remove("hidden");
  } else {
    infoOverlay.classList.add("hidden");
  }
}

if (openInfo) {
  openInfo.addEventListener("click", () => toggleInfo(true));
}
if (openInfoLanding) {
  openInfoLanding.addEventListener("click", () => toggleInfo(true));
}
if (closeInfo) {
  closeInfo.addEventListener("click", () => toggleInfo(false));
}
if (infoOverlay) {
  infoOverlay.addEventListener("click", (e) => {
    if (e.target === infoOverlay) toggleInfo(false);
  });
}
if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.contains("theme-dark");
    applyTheme(isDark ? "light" : "dark");
  });
}
if (themeToggleLanding) {
  themeToggleLanding.addEventListener("click", () => {
    const isDark = document.body.classList.contains("theme-dark");
    applyTheme(isDark ? "light" : "dark");
  });
}
if (exitToLanding) {
  exitToLanding.addEventListener("click", () => {
    appContainer.classList.add("inactive");
    // Delay landing appearance for staggered animation
    setTimeout(() => {
      landing.classList.remove("fade-out");
    }, 100);
    const saved = localStorage.getItem("theme");
    applyTheme(saved === "dark" ? "dark" : "light");
  });
}

function initMap() {
  const mapEl = document.getElementById("map");
  if (!mapEl) return;
  if (!window.L) {
    mapEl.innerHTML = "";
    const msg = document.createElement("div");
    msg.style.padding = "12px";
    msg.style.color = "var(--danger)";
    msg.textContent = "Leaflet failed to load.";
    mapEl.appendChild(msg);
    return;
  }

  // Try to load SVG first, fallback to PNG if it fails
  fetch("sprites/map.svg")
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.text();
    })
    .then((text) => {
      const doc = new DOMParser().parseFromString(text, "image/svg+xml");
      const svg = doc.querySelector("svg");
      if (!svg) throw new Error("SVG root not found");

      const viewBox = (svg.getAttribute("viewBox") || "0 0 1440 810")
        .split(" ")
        .map(Number);
      const widthAttr = parseFloat(svg.getAttribute("width"));
      const heightAttr = parseFloat(svg.getAttribute("height"));
      const width = viewBox[2] || widthAttr || 1440;
      const height = viewBox[3] || heightAttr || 810;

      svg.removeAttribute("width");
      svg.removeAttribute("height");
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");
      svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

      const southWest = [height, 0];
      const northEast = [0, width];
      mapBounds = [southWest, northEast];

      mapInstance = L.map("map", {
        crs: L.CRS.Simple,
        minZoom: 1,
        maxZoom: 8,
        maxBoundsViscosity: 1.0,
      });

      const svgElement = svg.cloneNode(true);
      L.svgOverlay(svgElement, mapBounds).addTo(mapInstance);
      mapInstance.fitBounds(mapBounds);
      mapInstance.setMaxBounds(mapBounds);
      setupInteractiveNodes(width, height);
    })
    .catch((err) => {
      console.error("SVG load failed, trying PNG fallback:", err);
      // Fallback to PNG image
      try {
        const imgWidth = 1440;
        const imgHeight = 810;
        const southWest = [0, 0];
        const northEast = [imgHeight, imgWidth];
        mapBounds = [southWest, northEast];

        mapInstance = L.map("map", {
          crs: L.CRS.Simple,
          minZoom: -1,
          maxZoom: 3,
          maxBoundsViscosity: 1.0,
        });

        L.imageOverlay("sprites/map.png", mapBounds).addTo(mapInstance);
        mapInstance.fitBounds(mapBounds);
        mapInstance.setMaxBounds(mapBounds);
        setupInteractiveNodes(imgWidth, imgHeight);
      } catch (pngErr) {
        console.error("PNG fallback also failed:", pngErr);
        const msg = document.createElement("div");
        msg.style.padding = "12px";
        msg.style.color = "var(--danger)";
        msg.textContent = "Failed to load campus map. Please serve the page through a local web server.";
        mapEl.innerHTML = "";
        mapEl.appendChild(msg);
      }
    });
}

populateSelects();
updateStats();
clearResultCard();
initMap();
initTheme();

// Fun Facts Tab Toggle and Random Facts
const factsToggle = document.getElementById("facts-toggle");
const funFactsTab = document.getElementById("fun-facts-tab");
const shuffleBtn = document.getElementById("shuffle-fact");
const factText = document.getElementById("fact-text");
const factCategory = document.getElementById("fact-category");

const funFacts = [
  { category: "📜 History", text: "LSPU began in 1952 as the Manuel S. Enverga University Foundation." },
  { category: "📜 History", text: "It became Laguna State Polytechnic College (LSPC) in 2001." },
  { category: "📜 History", text: "It earned university status in 2009 and became LSPU." },
  { category: "📜 History", text: "LSPU is named after Laguna, the 'Resort Capital of the Philippines.'" },
  { category: "📜 History", text: "The Los Banos campus serves as a satellite; the main campus is in Santa Cruz." },
  { category: "📜 History", text: "Students often call each other 'Ka-Piyu' (from 'Piyu' meaning chick)." },
  { category: "📜 History", text: "LSPU now spans multiple campuses across Laguna province." },
  { category: "📜 History", text: "It is known for providing affordable, quality education to Lagunenses." },
  { category: "🗺️ Geography", text: "The Los Banos campus sits at the foot of Mount Makiling." },
  { category: "🗺️ Geography", text: "Los Banos means 'The Baths' in Spanish, named for its hot springs." },
  { category: "🗺️ Geography", text: "The town lies about 63 km southeast of Manila." },
  { category: "🗺️ Geography", text: "The campus neighbors research hubs like IRRI and UPLB." },
  { category: "🗺️ Geography", text: "Cool breezes from Mt. Makiling keep the campus milder than Manila." },
  { category: "🗺️ Geography", text: "Los Banos belongs to the CALABARZON region." },
  { category: "🗺️ Geography", text: "The area thrives as a scientific and agricultural community." },
  { category: "🗺️ Geography", text: "Laguna de Bay, the country's largest lake, is close by." },
  { category: "🎉 Campus Life", text: "LSPU offers programs in business, education, engineering, and more." },
  { category: "🎉 Campus Life", text: "The Lacson Gymnasium hosts major sports and campus events." },
  { category: "🎉 Campus Life", text: "Student councils are active across colleges." },
  { category: "🎉 Campus Life", text: "Community engagement and extension programs are a core tradition." },
  { category: "🎉 Campus Life", text: "The campus cafeteria is known for affordable meals." }
];

let currentFactIndex = -1;

function showRandomFact() {
  const factDisplay = document.querySelector(".fact-display");
  
  // Fade out
  if (factDisplay) {
    factDisplay.classList.add("fade-out");
  }
  
  // Wait for fade out, then change content and fade in
  setTimeout(() => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * funFacts.length);
    } while (newIndex === currentFactIndex && funFacts.length > 1);
    
    currentFactIndex = newIndex;
    const fact = funFacts[currentFactIndex];
    
    if (factText && factCategory) {
      factText.textContent = fact.text;
      factCategory.textContent = fact.category;
    }
    
    // Fade back in
    if (factDisplay) {
      factDisplay.classList.remove("fade-out");
    }
  }, 300);
}

if (shuffleBtn) {
  shuffleBtn.addEventListener("click", showRandomFact);
}

// Show initial random fact
showRandomFact();

