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
const themeToggleBtn = document.getElementById("theme-toggle-btn");
const exitToLanding = document.getElementById("exit-to-landing");
let mapInstance = null;
let mapBounds = null;

function populateSelects() {
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
  startSelect.value = "Hall";
  endSelect.value = "CBAA Student Council";
}

function updateStats() {
  document.getElementById("node-count").textContent = graph.size;
  document.getElementById("edge-count").textContent = edges.length;

  let maxDegree = -1;
  let hub = "—";
  let degreeSum = 0;
  for (const [node, neighbors] of graph.entries()) {
    degreeSum += neighbors.length;
    if (neighbors.length > maxDegree) {
      maxDegree = neighbors.length;
      hub = node;
    }
  }
  const avgDegree = degreeSum / graph.size;
  document.getElementById("hub-node").textContent = hub;
  document.getElementById("avg-degree").textContent = avgDegree.toFixed(1);
}

function renderPath(path, distance) {
  pathBox.innerHTML = "";
  if (!path) {
    distanceBox.textContent = "No path";
    pathBox.textContent = "";
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
}

computeBtn.addEventListener("click", () => {
  const start = startSelect.value;
  const end = endSelect.value;
  errorBox.textContent = "";

  if (start === end) {
    errorBox.textContent = "Start and destination must differ.";
    renderPath(null, null);
    return;
  }

  const { path, distance } = shortestPath(start, end);
  if (!path) {
    errorBox.textContent = "No path found between those points.";
    renderPath(null, null);
    return;
  }
  renderPath(path, distance);
});

getStarted.addEventListener("click", () => {
  landing.classList.add("fade-out");
  appContainer.classList.remove("inactive");
  // Ensure Leaflet map sizes correctly after becoming visible
  if (mapInstance && mapBounds) {
    setTimeout(() => {
      mapInstance.invalidateSize();
      mapInstance.fitBounds(mapBounds);
    }, 60);
  }
});

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("theme-dark");
  } else {
    document.body.classList.remove("theme-dark");
  }
  localStorage.setItem("theme", theme);
  if (themeToggleBtn) {
    const isDark = theme === "dark";
    themeToggleBtn.textContent = isDark ? "🌙" : "🌞";
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
if (exitToLanding) {
  exitToLanding.addEventListener("click", () => {
    landing.classList.remove("fade-out");
    appContainer.classList.add("inactive");
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
    })
    .catch((err) => {
      const msg = document.createElement("div");
      msg.style.padding = "12px";
      msg.style.color = "var(--danger)";
      msg.textContent = "Failed to load campus map.";
      mapEl.innerHTML = "";
      mapEl.appendChild(msg);
      console.error(err);
    });
}

populateSelects();
updateStats();
renderPath(null, null);
initMap();
initTheme();

