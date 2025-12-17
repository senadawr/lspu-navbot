// Graph data converted from the Python campus graph
const edges = [
  // Entrances and Halls
  ["Library", "Gate 1", 535],
  ["Library", "Gate 2", 535],
  ["Library", "Hall", 500],
  ["Gate 1", "Hall", 10],
  ["Gate 1", "Guard House", 12],
  ["Gate 1", "BAO Pathway", 40],
  ["Gate 2", "Hall", 36],
  ["Hall", "End of Hall", 20],
  ["Hall", "CBAA Path", 6],
  ["Hall", "GAD", 8],
  ["Gate 1", "Main Road", 7],

  //Main Road
  ["Main Road", "CCJE Entrance", 350],
  ["Main Road", "Library", 600],

  //CCJE building
  ["CCJE Entrance", "CCJE Corridor 1", 5],
  ["CCJE Corridor 1", "CCJE CR", 5],
  ["CCJE Corridor 1", "CCJE Room 3", 5],
  ["CCJE Corridor 1", "CCJE Room 2", 5],
  ["CCJE Corridor 1", "CCJE Pathway", 5],
  ["CCJE Pathway", "CCJE Open Room 2", 5],
  ["CCJE Pathway", "CCJE Open Room 1", 5],
  ["CCJE Pathway", "CCJE Corridor 2", 5],
  ["CCJE Corridor 2", "CCJE Room 1", 5],
  ["CCJE Corridor 2", "CCJE Faculty Room", 5],
  ["CCJE Faculty Room", "CCJE Stock Room", 5],

  // Path B
  ["End of Hall", "Alumni", 61],
  ["End of Hall", "Waiting Shed", 12],
  ["End of Hall", "Lacson Gym Entrance", 50],
  ["End of Hall", "New CAS Hallway", 67],
  ["Alumni", "Computer Shop", 8],
  ["Computer Shop", "CCS Waiting Shed", 6],
  ["CCS Waiting Shed", "Lacson Gym Entrance", 5],
  ["CCS Waiting Shed", "Old CAS Path", 24],
  ["Lacson Gym Entrance", "Stage", 40],
  ["Stage", "CTE CR 2", 5],
  ["CTE CR 2", "CTE New Room", 3],
  ["CTE New Room", "CTE Hallway 1", 5],
  ["CTE Hallway 1", "GSAE Office", 5],
  ["GSAE Office", "CTE Faculty Room", 10],
  ["CTE Faculty Room", "CTE Stairs", 3],
  ["CTE Stairs", "Reading Center X-Class", 3],
  ["Reading Center X-Class", "CTE Dean's Office", 10],
  ["CTE Dean's Office", "CTE Stairs", 3],
  ["CTE Stairs", "CTE Hallway 1", 3],
  ["CTE Hallway 1", "CTE Hallway 2", 5],
  ["CTE Hallway 2", "CTE Room 5", 5],
  ["CTE Room 5", "CTE CR", 3],
  ["CTE CR", "CTE Hallway 2", 10],
  ["CTE Hallway 2", "CTE Room 6", 5],
  ["CTE Room 6", "CTE Room 7", 5],
  ["CTE Room 7", "CTE Room 8", 5],
  ["CTE Hallway 2", "SIY Corridor", 13],

  //SIY Corridor Connections
  ["SIY Corridor", "SIY Room 2", 5],
  ["SIY Corridor", "SIY Room 1", 5],
  ["SIY Corridor", "SIY CR", 5],
  ["SIY Corridor", "SHS Hallway", 24],

  //SHS 
  ["SHS Hallway", "SHS Waiting Area", 15],
  ["SHS Waiting Area", "CCS Hallway", 16],

  
  // Path D - Old CAS / CCS
  ["Old CAS Path", "Old CAS Path", 50],
  ["Old CAS Path", "ITSO Entrance", 8],
  ["Old CAS Path", "Psych Lab Entrance", 8],
  ["Old CAS Path", "TSL Entrance", 8],
  ["Old CAS Path", "CCS Faculty Room Entrance", 8],
  ["Old CAS Path", "Old CAS Faculty", 8],
  ["Old CAS Path", "Old CAS Stairs 1", 8],
  ["Old CAS Stairs 1", "Old CAS 2F Hallway", 5],
  ["Old CAS 2F Hallway", "IP TBM/ATBI", 5],
  ["Old CAS 2F Hallway", "Old CAS Physics Lab", 5],
  ["Old CAS 2F Hallway", "Old CAS Stairs 2", 5],
  ["Old CAS 2F Hallway", "Old CAS Chemistry Lab", 5],
  ["Old CAS 2F Hallway", "Old CAS Biology Lab", 5],
  ["Old CAS 2F Hallway", "Old CAS Room 42", 5],
  ["Old CAS 2F Hallway", "Old CAS ICTS Office", 5],
  ["Old CAS Path", "Old CAS Faculty", 8],
  ["Old CAS Path", "CCS Hallway", 2],
  ["CCS Hallway", "CCS Stairs 1", 2],
  ["CCS Hallway", "CCS Dean Office", 5],
  ["CCS Hallway", "CCS AVR", 5],
  ["CCS Hallway", "Bay Breeze", 5],
  ["CCS Hallway", "CCS Room 47", 5],
  ["CCS Hallway", "SCC CCS Room 48", 5],
  ["CCS Hallway", "CR CCS", 5],
  ["CCS Hallway", "CCS Stairs 2", 5],
  ["CCS Hallway", "CTE New Room", 3],
  ["CCS Hallway", "New CAS Hallway", 12],

  //CCS HALLWAY TO CCS 2F
  ["CCS Stairs 1", "CCS 2F Hallway", 5],
  ["CCS 2F Hallway", "CCS LAB 1", 5],
  ["CCS 2F Hallway", "CCS LAB 2", 5],
  ["CCS 2F Hallway", "CCS LAB 3", 5],
  ["CCS 2F Hallway", "CCS LAB 4", 5],
  ["CCS 2F Hallway", "CCS Stairs 2", 5],
  ["CCS 2F Stairs 2", "CCS Hallway", 5],


  // Path E - New CAS
  ["New CAS Hallway", "New CAS Faculty", 5],
  ["New CAS Faculty", "New CAS Dean's Office", 5],
  ["New CAS Dean's Office", "New CAS Room 1", 5],
  ["New CAS Room 1", "New CAS Room 2", 5],
  ["New CAS Room 2", "New CAS Room 3", 5],
  ["New CAS Room 3", "New CAS Room 4", 5],
  ["New CAS Room 4", "New CAS Room 5", 20],
  ["New CAS Room 5", "New CAS Room 6", 5],
  ["New CAS Room 6", "New CAS Room 7", 5],
  ["New CAS Room 7", "New CAS Room 8", 5],
  ["New CAS Room 8", "New CAS Room 9", 5],
  ["New CAS Room 9", "New CAS Room 10", 5],
  ["End of Hall", "CBAA Hallway", 5],

  // Path F - CBAA
  ["CBAA Hallway", "CBAA CR 1", 6.6],
  ["CBAA CR 1", "GAD", 8],
  ["GAD", "CBAA Faculty", 6.6],
  ["CBAA Faculty", "CBAA CR 2", 6.6],
  ["CBAA Faculty", "CBAA Path", 8],
  ["CBAA CR 2", "CBAA Room 101", 6.6],
  ["CBAA Hallway", "CBAA Stairs", 8],
  ["CBAA Stairs", "CBAA 2F Hallway", 6.6],
  ["CBAA 2F Hallway", "CBAA Room 201", 6.6],
  ["CBAA 2F Hallway", "CBAA Room 202", 6.6],
  ["CBAA 2F Hallway", "CBAA Room 203", 6.6],
  ["CBAA 2F Hallway", "CBAA Room 204", 6.6],
  ["CBAA 2F Hallway", "CBAA Room 205", 6.6],
  ["CBAA 2F Hallway", "CBAA Room 206", 6.6],
  ["CBAA 2F Hallway", "CBAA Stairs", 6.6],
  ["CBAA Stairs", "CBAA Hallway", 8],
  ["CBAA CR 2", "CBAA Path", 8],
  ["CBAA Room 101", "CBAA Room 102", 6.6],
  ["CBAA Room 102", "CBAA Room 103", 6.6],
  ["CBAA Room 103", "CBAA Student Council", 6.6],
  ["CBAA Hallway", "CBAA Path", 8],
  
  // Path G, H - OSAS & University Clinic
  ["CBAA Path", "New OSAS Entrance", 32],
  ["CBAA Path", "University Clinic", 4],
  ["CBAA Path", "Cafeteria Entrance", 4],
  ["CBAA Path", "End of Hall", 8],
  ["University Clinic", "Cafeteria Entrance", 10],
  ["New OSAS Entrance", "OSAS", 16],
  ["New OSAS Entrance", "Office of the President Path", 8],
  ["BAO Pathway", "BAO", 7],
  ["BAO Pathway", "Open Court B", 44],
  ["BAO Pathway", "Meeting Room 2", 26],
  
  // Path I - Office of the President & Guesthouse
  ["Office of the President Path", "Office of the President", 8],
  ["Office of the President Path", "Guesthouse", 26],
  ["Office of the President", "Meeting Room", 8],
  ["Meeting Room", "Office of the President Path", 8],
  ["Guesthouse", "Cafe by the Bay", 10],
  ["Guesthouse", "Open Court A", 20],
  ["Open Court A", "Open Court B", 40],
  ["Open Court A", "CFND Waiting Shed", 18],
  ["Open Court B", "CHMT Room 1", 18],

  //Admin Building
  ["CFND Waiting Shed", "CFND Garage", 12],
  ["CFND Garage", "Admin Building Entrance", 7],
  ["Admin Building Entrance", "Admin Building Hallway 1", 3],
  ["Admin Building Hallway 1", "Admin Building Alumni Office", 3],
  ["Admin Building Hallway 1", "Management Information Planning and Development Office", 3],
  ["Admin Building Hallway 1", "Office of the Auditor", 3],
  ["Admin Building Hallway 1", "Deputy Campus Director Office", 3],
  ["Admin Building Hallway 1", "Records and Management Office", 3],
  ["Records and Management Office", "Office of the Supply and Property Management", 3],
  ["Admin Building Hallway 1", "Admin Building Hallway 2", 3],
  ["Admin Building Hallway 2", "Admin Building Stairs 2", 3],
  ["Admin Building Hallway 1", "Admin Building CR", 3],
  ["Admin Building Hallway 1", "PPSD", 3],
  ["CFND Garage", "Adming Building Outside Stairs", 3],
  ["Admin Building Outside Stairs", "Admin Building 2F Hallway", 3],
  ["Admin Building 2F Hallway", "Registrar's Office", 3],
  
  //CFND Building
  ["Guard House", "CFND Sensory Lab", 16],
  ["Guard House", "CFND Pathway", 10],
  ["CFND Pathway", "NSTP Office", 5],
  ["CFND Pathway", "CFND Empty Room", 5],
  ["CFND Pathway", "CFND Corridor", 5],
  ["CFND Corridor", "CFND Room 1", 5],
  ["CFND Corridor", "CFND Faculty Room", 5],


  // CHMT PATHS
  ["CHMT Room 1", "CHMT Room 2", 5],
  ["CHMT Room 1", "CHMT Dean's Office", 14],
  ["CHMT Room 2", "CHMT Room 3", 5],
  ["CHMT Room 3", "CHMT CR 1", 5],
  ["CHMT CR 1", "CHMT Open Room", 24],
  ["CHMT Dean's Office", "CHMT Faculty", 3],
  ["CHMT Dean's Office", "Open Court B", 2],
  ["CHMT Faculty", "Open Court B", 2],
  ["CHMT Open Room", "CHMT Room 6", 4],
  ["CHMT Open Room", "Joey Lina Stage", 26],
  ["CHMT Room 4", "Joey Lina", 2],
  ["CHMT Room 5", "Joey Lina", 2],
  ["CHMT Room 6", "Joey Lina", 2],
  ["CHMT Room 7", "Joey Lina", 2],
  ["CHMT Room 8", "Joey Lina", 2],
  ["CHMT Room 9", "Joey Lina", 2],
  ["CHMT Room 10", "Joey Lina", 2],
  
  // Joey Lina & COF
  ["CFND Corridor", "Joey Lina Hidden Pathway", 58],
  ["Joey Lina Hidden Pathway", "Joey Lina Gate", 49],
  ["Joey Lina", "Joey Lina Stage", 3],
  ["Joey Lina Stage", "Joey Lina Gate", 7],
  ["Joey Lina Stage", "Female CHMT CR", 4],
  ["Joey Lina Stage", "Male CHMT CR", 4],
  ["Joey Lina Gate", "COF Room 1", 15],
  ["COF Room 1", "COF Room 2", 6.2],
  ["COF Room 2", "COF Room 3", 6.2],
  ["COF Room 3", "COF Room 4", 6.2],
  ["COF Room 4", "COF Room 5", 6.2],
  ["COF Room 5", "COF Room 6", 6.2],
  ["COF Room 6", "COF Room 7", 6.2],
  ["COF Room 6", "COF New Building Pathway", 1],
  ["COF New Building Pathway", "COF New Building Hallway", 10],
  ["COF New Building Hallway", "COF New Building Stairs 1", 10],
  ["COF New Building Stairs 1", "COF New Building 2F Hallway", 10],
  ["COF New Building Hallway", "COF CSLD 101 office of the dean", 10],
  ["COF New Building Hallway", "COF CSLD 102", 10],
  ["COF New Building Hallway", "COF CR 1", 10],
  ["COF New Building Hallway", "COF CSLD 103 Faculty", 10],
  ["COF New Building Hallway", "COF CSLD 104", 10],
  ["COF New Building Hallway", "COF CSLD 105", 10],
  ["COF New Building Hallway", "COF CSLD 106", 10],
  ["COF New Building Hallway", "COF CR 2", 10],
  ["COF New Building Hallway", "COF CSLD 107", 10],
  ["COF New Building Hallway", "COF Student Council Office", 10],
  ["COF New Building Hallway", "COF New Building Stairs 2", 10],
  ["COF New Building Stairs 2", "COF New Building 2F Hallway", 10],
  ["COF New Building 2F Hallway", "COF 2F CR FEMALE", 10],
  ["COF New Building 2F Hallway", "COF CSLD 201", 6.2],
  ["COF CSLD 201", "COF CSLD 202", 6.2],
  ["COF CSLD 202", "COF CSLD 203", 6.2],
  ["COF CSLD 203", "COF CSLD 204", 6.2],
  ["COF CSLD 204", "COF CSLD 205", 6.2],
  ["COF CSLD 205", "COF CSLD 206", 6.2],
  ["COF CSLD 206", "COF CSLD 207", 6.2],
  ["COF CSLD 207", "COF New Building 2F Hallway", 6.2],
  ["COF New Building 2F Hallway", "COF New Building Stairs 1", 10],
  ["COF Room 7", "COF Room 8", 6.2],
  ["COF New Building Pathway", "Old Waiting Area", 5],
  ["COF New Building Stairs", "COF Consultation Room", 4.5],
  ["COF Consultation Room", "CR", 4.5],
  ["CR", "COF Faculty Room", 4.5],
  ["CR", "New Building Room 4", 4.5],
  ["CR", "Fisheries Student Council", 4.5],
  ["COF Faculty Room", "New Building Room 2", 4.5],
  ["New Building Room 2", "New Building Room 3", 4.5],
  ["New Building Room 3", "New Building Room 4", 4.5],
  ["Fisheries Student Council", "COF Reading Room", 4.5],
  ["COF Reading Room", "COF New Building Stairs 2", 4.5],

];

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
const timeBox = document.getElementById("time");
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
const placeJoeyLinaBtn = document.getElementById("place-joey-lina");
const downloadPositionsBtn = document.getElementById("download-positions");
let mapInstance = null;
let mapBounds = null;
let nodePositions = new Map();
let nodeMarkers = new Map();
let nodeLayer = null;
let pathLine = null;
let selectedStart = null;
let selectedEnd = null;
let placementActive = false;
const placementTargetName = "Joey Lina Hidden Pathway";

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
  startSelect.value = "Gate 1";
  endSelect.value = "CBAA Student Council";
}

function updateStats() {
  const hubNode = document.getElementById("hub-node");
  const avgEl = document.getElementById("avg-degree");
  if (hubNode) hubNode.textContent = "—";
  if (avgEl) avgEl.textContent = "—";
}

function setNearestLandmark(name) {
  const hubNode = document.getElementById("hub-node");
  if (hubNode) hubNode.textContent = name || "—";
}

function clearPathOverlay() {
  if (mapInstance && pathLine) {
    mapInstance.removeLayer(pathLine);
    pathLine = null;
  }
}

function renderMarkers() {
  if (!mapInstance) return;
  if (nodeLayer) {
    mapInstance.removeLayer(nodeLayer);
    nodeLayer = null;
  }
  nodeLayer = L.layerGroup().addTo(mapInstance);
  nodeMarkers = new Map();

  nodePositions.forEach((pos, name) => {
    const marker = L.circleMarker(pos, {
      radius: 6,
      color: "#1f2937",
      weight: 1.5,
      fillColor: "#e5e7eb",
      fillOpacity: 0.9,
    }).bindTooltip(name, { direction: "top", offset: [0, -4], opacity: 0.9 });

    marker.addTo(nodeLayer);
    nodeMarkers.set(name, marker);
  });
}

function drawPathOnMap(path) {
  clearPathOverlay();
  if (!mapInstance || !path) return;
  const coords = path.map((name) => nodePositions.get(name)).filter(Boolean);
  if (coords.length < 2) return;
  pathLine = L.polyline(coords, {
    color: "#10b981",
    weight: 6,
    opacity: 0.85,
    lineJoin: "round",
  }).addTo(mapInstance);
  mapInstance.fitBounds(L.latLngBounds(coords), { padding: [20, 20] });
}

function startPlacementMode() {
  if (!mapInstance) return;
  placementActive = true;
  const note = document.querySelector('.map-note');
  if (note) note.textContent = 'Placement active: click on the map to set position for "Joey Lina Hidden Pathway".';
  const onClick = (e) => {
    if (!placementActive) return;
    const { lat, lng } = e.latlng;
    const pos = [lat, lng];
    nodePositions.set(placementTargetName, pos);
    renderMarkers();
    placementActive = false;
    mapInstance.off('click', onClick);
    const noteEl = document.querySelector('.map-note');
    if (noteEl) noteEl.textContent = 'Node placed. You may compute paths or place again.';
  };
  mapInstance.on('click', onClick);
}

function downloadPositions() {
  try {
    const obj = Object.fromEntries(nodePositions);
    const json = JSON.stringify(obj, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'node-positions.json';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  } catch (e) {
    console.warn('Failed to download positions', e);
  }
}

async function positionsFromDisk() {
  try {
    const res = await fetch("node-positions.json", { cache: "no-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    console.warn("Failed to load node positions", e);
    return {};
  }
}

async function hydratePositions() {
  const disk = await positionsFromDisk();
  nodePositions = new Map(Object.entries(disk || {}));
}

function formatMinutes(totalMinutes) {
  if (!Number.isFinite(totalMinutes) || totalMinutes <= 0) return "—";
  if (totalMinutes < 1) return "<1 min";
  const minutes = Math.round(totalMinutes);
  return minutes === 1 ? "1 min" : `${minutes} mins`;
}

function renderPath(path, distance) {
  pathBox.innerHTML = "";
  const avgEl = document.getElementById("avg-degree");
  if (!path) {
    distanceBox.textContent = "No path";
    if (timeBox) timeBox.textContent = "—";
    if (avgEl) avgEl.textContent = "—";
    pathBox.textContent = "";
    setNearestLandmark("—");
    clearPathOverlay();
    return;
  }
  distanceBox.textContent = `${distance.toFixed(1)} meters`;

  // Average walking speed ~1.3 m/s (~4.7 km/h), typical urban PH pace
  const avgMetersPerSecond = 1.3;
  const minutes = distance / avgMetersPerSecond / 60;
  if (timeBox) timeBox.textContent = formatMinutes(minutes);
  if (avgEl) avgEl.textContent = formatMinutes(minutes);

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

// Placement controls removed; positions are static and loaded from node-positions.json

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
    themeToggleBtn.innerHTML = isDark ? '<i data-feather="moon"></i>' : '<i data-feather="sun"></i>';
  }
  if (themeToggleLanding) {
    themeToggleLanding.innerHTML = isDark ? '<i data-feather="moon"></i>' : '<i data-feather="sun"></i>';
  }
  if (window.feather && typeof window.feather.replace === 'function') {
    window.feather.replace();
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

if (placeJoeyLinaBtn) {
  placeJoeyLinaBtn.addEventListener('click', () => {
    startPlacementMode();
  });
}

if (downloadPositionsBtn) {
  downloadPositionsBtn.addEventListener('click', () => {
    downloadPositions();
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

  // Prefer svgOverlay via fetch; fallback to imageOverlay with SVG URL for file:// usage
  const trySvgOverlay = () => {
    return fetch("sprites/map.svg")
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
          minZoom: -0.1,
          maxZoom: 8,
          maxBoundsViscosity: 1.0,
        });

        const svgElement = svg.cloneNode(true);
        L.svgOverlay(svgElement, mapBounds).addTo(mapInstance);
        mapInstance.fitBounds(mapBounds);
        mapInstance.setMaxBounds(mapBounds);
        hydratePositions().then(renderMarkers);
      });
  };

  const fallbackImageOverlaySvg = () => {
    const width = 809.33;
    const height = 1078.67;
    const southWest = [height, 0];
    const northEast = [0, width];
    mapBounds = [southWest, northEast];

    mapInstance = L.map("map", {
      crs: L.CRS.Simple,
      minZoom: -0.1,
      maxZoom: 8,
      maxBoundsViscosity: 1.0,
    });

    // Render the SVG as an image source; works under file://
    L.imageOverlay("sprites/map.svg", mapBounds).addTo(mapInstance);
    mapInstance.fitBounds(mapBounds);
    mapInstance.setMaxBounds(mapBounds);
    hydratePositions().then(renderMarkers);
  };

  trySvgOverlay().catch((err) => {
    console.warn("svgOverlay fetch failed; using imageOverlay with SVG URL", err);
    fallbackImageOverlaySvg();
  });
}

populateSelects();
updateStats();
renderPath(null, null);
initMap();
initTheme();

// Fun Facts Tab Toggle and Random Facts
const factsToggle = document.getElementById("facts-toggle");
const funFactsTab = document.getElementById("fun-facts-tab");
const shuffleBtn = document.getElementById("shuffle-fact");
const factText = document.getElementById("fact-text");
const factCategory = document.getElementById("fact-category");

const funFacts = [
  { category: "History", text: "LSPU began in 1952 as the Manuel S. Enverga University Foundation." },
  { category: "History", text: "It became Laguna State Polytechnic College (LSPC) in 2001." },
  { category: "History", text: "It earned university status in 2009 and became LSPU." },
  { category: "History", text: "LSPU is named after Laguna, the 'Resort Capital of the Philippines.'" },
  { category: "History", text: "The Los Banos campus serves as a satellite; the main campus is in Santa Cruz." },
  { category: "History", text: "Students often call each other 'Ka-Piyu' (from 'Piyu' meaning chick)." },
  { category: "History", text: "LSPU now spans multiple campuses across Laguna province." },
  { category: "History", text: "It is known for providing affordable, quality education to Lagunenses." },
  { category: "Geography", text: "The Los Banos campus sits at the foot of Mount Makiling." },
  { category: "Geography", text: "Los Banos means 'The Baths' in Spanish, named for its hot springs." },
  { category: "Geography", text: "The town lies about 63 km southeast of Manila." },
  { category: "Geography", text: "The campus neighbors research hubs like IRRI and UPLB." },
  { category: "Geography", text: "Cool breezes from Mt. Makiling keep the campus milder than Manila." },
  { category: "Geography", text: "Los Banos belongs to the CALABARZON region." },
  { category: "Geography", text: "The area thrives as a scientific and agricultural community." },
  { category: "Geography", text: "Laguna de Bay, the country's largest lake, is close by." },
  { category: "Campus Life", text: "LSPU offers programs in business, education, engineering, and more." },
  { category: "Campus Life", text: "The Lacson Gymnasium hosts major sports and campus events." },
  { category: "Campus Life", text: "Student councils are active across colleges." },
  { category: "Campus Life", text: "Community engagement and extension programs are a core tradition." },
  { category: "Campus Life", text: "The campus cafeteria is known for affordable meals." }
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
      const categoryIcons = {
        "History": "bookmark",
        "Geography": "map",
        "Campus Life": "smile"
      };
      const iconName = categoryIcons[fact.category] || "bookmark";
      factCategory.innerHTML = `<i data-feather="${iconName}"></i> ${fact.category}`;
      if (window.feather && typeof window.feather.replace === 'function') {
        window.feather.replace();
      }
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

// Mobile facts toggle
const factsMobileBtn = document.getElementById("facts-toggle-mobile");
if (factsMobileBtn && funFactsTab) {
  factsMobileBtn.addEventListener("click", () => {
    const isHidden = funFactsTab.style.display === "none";
    if (isHidden) {
      funFactsTab.style.display = "block";
      factsMobileBtn.classList.add("active");
    } else {
      funFactsTab.style.display = "none";
      factsMobileBtn.classList.remove("active");
    }
  });
  
  // Close facts when clicking outside
  document.addEventListener("click", (e) => {
    const isClickInsideFacts = funFactsTab.contains(e.target);
    const isClickOnBtn = factsMobileBtn.contains(e.target);
    if (!isClickInsideFacts && !isClickOnBtn && funFactsTab.style.display === "block") {
      funFactsTab.style.display = "none";
      factsMobileBtn.classList.remove("active");
    }
  });
}

// Show initial random fact
showRandomFact();

