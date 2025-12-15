import heapq

# Campus graph based on Paths A-L
graph = {
    # Entrances and Halls
    "Library": {"Gate 1": 535, "Gate 2": 535, "Hall": 500},
    "Gate 1": {"Library": 535, "Hall": 10},
    "Gate 2": {"Library": 535, "Hall": 36},
    "Hall": {"Gate 1": 10, "Gate 2": 36, "End of Hall": 20, "CBAA Path": 6, "GAD": 8, "Library": 500},

    # Path B
    "End of Hall": {"Hall": 20, "Alumni": 61, "Lacson Gym Entrance": 50, "New CAS Hallway": 30, "CBAA CR 1": 2},
    "Alumni": {"End of Hall": 61, "Computer Shop": 8, "Registrar Hallway Entrance": 3},
    "Computer Shop": {"Alumni": 8, "Waiting Shed": 6},
    "Waiting Shed": {"Computer Shop": 6, "Lacson Gym Entrance": 5, "CFND Waiting Shed": 18},
    "Lacson Gym Entrance": {"Waiting Shed": 5, "Stage": 40, "End of Hall": 50},
    "Stage": {"Lacson Gym Entrance": 40, "CTE CR 2": 5, "COF Room 1": 20, "Joey Lina Stage": 26},
    "CTE CR 2": {"Stage": 5, "CTE New Room": 3},
    "CTE New Room": {"CTE CR 2": 3, "GSAE Office": 5},
    "GSAE Office": {"CTE New Room": 5},

    # Path D - Old CAS / CCS
    "Old CAS Path Start": {"End Old CAS Path": 50, "ITSO Entrance": 8, "Psych Lab Entrance": 8, "TSL Entrance": 8,
                           "CCS Faculty Room Entrance": 8, "CFND Room 1 Entrance": 8, "Old CAS Faculty": 8},
    "End Old CAS Path": {"Old CAS Path Start": 50, "Old CAS Faculty": 8, "SSC(CCS) Hallway Entrance": 2},
    "Old CAS Faculty": {"End Old CAS Path": 8},
    "ITSO Entrance": {"Old CAS Path Start": 8},
    "Psych Lab Entrance": {"Old CAS Path Start": 8},
    "TSL Entrance": {"Old CAS Path Start": 8},
    "CCS Faculty Room Entrance": {"Old CAS Path Start": 8},
    "CFND Room 1 Entrance": {"Old CAS Path Start": 8},
    "SSC(CCS) Hallway Entrance": {"End Old CAS Path": 2, "CCS Dean Office": 5},
    "CCS Dean Office": {"SSC(CCS) Hallway Entrance": 5, "CCS AVR": 5},
    "CCS AVR": {"CCS Dean Office": 5, "Bay Breeze": 5},
    "Bay Breeze": {"CCS AVR": 5, "CCS Room 47": 5},
    "CCS Room 47": {"Bay Breeze": 5, "SCC CCS Room 48": 5},
    "SCC CCS Room 48": {"CCS Room 47": 5, "CR CCS": 5},
    "CR CCS": {"SCC CCS Room 48": 5, "End of CCS Hallway": 5},
    "End of CCS Hallway": {"CR CCS": 5, "CTE New Room": 3},

    # Path E - New CAS
    "New CAS Hallway": {"End of Hall": 30, "New CAS Faculty": 5},
    "New CAS Faculty": {"New CAS Hallway": 5, "New CAS Dean's Office": 5},
    "New CAS Dean's Office": {"New CAS Faculty": 5, "New CAS Room 1": 5},
    "New CAS Room 1": {"New CAS Dean's Office": 5, "New CAS Room 2": 5},
    "New CAS Room 2": {"New CAS Room 1": 5, "New CAS Room 3": 5},
    "New CAS Room 3": {"New CAS Room 2": 5, "New CAS Room 4": 5},
    "New CAS Room 4": {"New CAS Room 3": 5, "New CAS Room 5": 20},
    "New CAS Room 5": {"New CAS Room 4": 20, "New CAS Room 6": 5},
    "New CAS Room 6": {"New CAS Room 5": 5, "New CAS Room 7": 5},
    "New CAS Room 7": {"New CAS Room 6": 5, "New CAS Room 8": 5},
    "New CAS Room 8": {"New CAS Room 7": 5, "New CAS Room 9": 5},
    "New CAS Room 9": {"New CAS Room 8": 5, "New CAS Room 10": 5},
    "New CAS Room 10": {"New CAS Room 9": 5},

    # Path F - CBAA
    "CBAA CR 1": {"End of Hall": 2, "GAD": 8},
    "GAD": {"CBAA CR 1": 8, "CBAA Faculty": 6.6},
    "CBAA Faculty": {"GAD": 6.6, "CBAA CR 2": 6.6, "CBAA Path": 8},
    "CBAA CR 2": {"CBAA Faculty": 6.6, "Room 101": 6.6, "CBAA Path": 8},
    "Room 101": {"CBAA CR 2": 6.6, "Room 102": 6.6},
    "Room 102": {"Room 101": 6.6, "Room 103": 6.6},
    "Room 103": {"Room 102": 6.6, "CBAA Student Council": 6.6},
    "CBAA Student Council": {"Room 103": 6.6},

    # Path G, H - OSAS & University Clinic
    "CBAA Path": {"Hall": 6, "New OSAS Entrance": 32, "CBAA Faculty": 8, "CBAA CR 2": 8,
                  "University Clinic": 4, "Cafeteria Entrance": 4},
    "University Clinic": {"CBAA Path": 4, "Cafeteria Entrance": 10},
    "Cafeteria Entrance": {"University Clinic": 10, "CBAA Path": 4},
    "New OSAS Entrance": {"CBAA Path": 32, "OSAS": 16, "Office of the President Path": 8},
    "OSAS": {"New OSAS Entrance": 16},

    # Path I - Office of the President & Guesthouse
    "Office of the President Path": {"New OSAS Entrance": 8, "Office of the President": 8, "Guesthouse": 26},
    "Office of the President": {"Office of the President Path": 8, "Meeting Room": 8},
    "Meeting Room": {"Office of the President": 8, "Office of the President Path": 8},
    "Guesthouse": {"Office of the President Path": 26, "Cafe by the Bay": 10, "Open Court A": 20},
    "Cafe by the Bay": {"Guesthouse": 10},
    "Open Court A": {"Guesthouse": 20, "Open Court B": 40, "CFND Waiting Shed": 18},
    "Open Court B": {"Open Court A": 40, "CHMT Room 1": 18},
    "CFND Waiting Shed": {"Open Court A": 18},

    # CHMT PATHS
    "CHMT Room 1": {"Open Court B": 18, "CHMT Room 2": 5, "CHMT Dean's Office": 14},
    "CHMT Room 2": {"CHMT Room 1": 5, "CHMT Room 3": 5},
    "CHMT Room 3": {"CHMT Room 2": 5, "CHMT CR 1": 5},
    "CHMT CR 1": {"CHMT Room 3": 5, "CHMT Open Room": 24},
    "CHMT Dean's Office": {"CHMT Room 1": 14, "CHMT Faculty": 3, "Open Court B": 2},
    "CHMT Faculty": {"CHMT Dean's Office": 3, "Open Court B": 2},
    "CHMT Open Room": {"CHMT CR 1": 24, "CHMT Room 6": 4, "Joey Lina Stage": 26},
    "CHMT Room 4": {"Joey Lina": 2},
    "CHMT Room 5": {"Joey Lina": 2},
    "CHMT Room 6": {"CHMT Open Room": 4, "Joey Lina": 2},
    "CHMT Room 7": {"Joey Lina": 2},
    "CHMT Room 8": {"Joey Lina": 2},
    "CHMT Room 9": {"Joey Lina": 2},
    "CHMT Room 10": {"Joey Lina": 2},

    # Joey Lina & COF
    "Joey Lina": {"Joey Lina Stage": 3},
    "Joey Lina Stage": {"Joey Lina": 3, "Stage": 26, "COF Room 1": 20, "Joey Lina Gate": 7,
                        "Female CHMT CR": 4, "Male CHMT CR": 4},
    "COF Room 1": {"Joey Lina Stage": 20, "COF Room 2": 6.2, "Fishpond 5": 5},
    "COF Room 2": {"COF Room 1": 6.2, "COF Room 3": 6.2},
    "COF Room 3": {"COF Room 2": 6.2, "COF Room 4": 6.2},
    "COF Room 4": {"COF Room 3": 6.2, "COF Room 5": 6.2},
    "COF Room 5": {"COF Room 4": 6.2, "COF Room 6": 6.2},
    "COF Room 6": {"COF Room 5": 6.2, "COF Room 7": 6.2, "COF New Building Pathway": 1},
    "COF Room 7": {"COF Room 6": 6.2, "COF Room 8": 6.2},
    "COF Room 8": {"COF Room 7": 6.2},
    "COF New Building Pathway": {"COF Room 6": 1, "Old Waiting Area": 5, "Fishpond": 15},
    "Old Waiting Area": {"COF New Building Pathway": 5},
    "Fishpond": {"COF New Building Pathway": 15, "COF New Building Stairs": 23},
    "COF New Building Stairs": {"Fishpond": 23, "J Consultation Room": 4.5},
    "J Consultation Room": {"COF New Building Stairs": 4.5, "CR": 4.5},
    "CR": {"J Consultation Room": 4.5, "COF Faculty Room": 4.5, "New Building Room 4": 4.5, "Fisheries Student Council": 4.5},
    "COF Faculty Room": {"CR": 4.5, "New Building Room 2": 4.5},
    "New Building Room 2": {"COF Faculty Room": 4.5, "New Building Room 3": 4.5},
    "New Building Room 3": {"New Building Room 2": 4.5, "New Building Room 4": 4.5},
    "New Building Room 4": {"New Building Room 3": 4.5, "CR": 4.5},
    "Fisheries Student Council": {"CR": 4.5, "Reading Room": 4.5},
    "Reading Room": {"Fisheries Student Council": 4.5, "Stairs": 4.5},
    "Stairs": {"Reading Room": 4.5},
    "Joey Lina Gate": {"Joey Lina Stage": 7}
}

# ================================
# Normalize names
def normalize(name):
    return name.replace(" ", "").lower()

normalized_graph = {normalize(node): {normalize(n): w for n, w in neighbors.items()} for node, neighbors in graph.items()}

# ================================
# Dijkstra Algorithm
def dijkstra(graph, start, end):
    heap = [(0, start)]
    visited = set()
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    previous = {}

    while heap:
        current_dist, current_node = heapq.heappop(heap)
        if current_node in visited:
            continue
        visited.add(current_node)
        if current_node == end:
            break
        for neighbor, weight in graph[current_node].items():
            distance = current_dist + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                previous[neighbor] = current_node
                heapq.heappush(heap, (distance, neighbor))

    path = []
    node = end
    while node in previous:
        path.append(node)
        node = previous[node]
    if path:
        path.append(start)
        path.reverse()
    return path, distances[end] if distances[end] != float('inf') else None

# ================================
# Interactive Loop
current_location = input("Enter starting location: ").strip()
current_location_norm = normalize(current_location)

while True:
    destination = input("Enter destination (or type 'exit' to quit): ").strip()
    if destination.lower() in ["exit", "quit"]:
        print("Exiting campus navigation.")
        break
    destination_norm = normalize(destination)
    if current_location_norm not in normalized_graph or destination_norm not in normalized_graph:
        print("❌ Invalid location. Please enter a valid location.")
        continue
    path, distance = dijkstra(normalized_graph, current_location_norm, destination_norm)
    if not path:
        print("❌ No available path found.")
    else:
        readable_path = []
        for n in path:
            for k in graph:
                if normalize(k) == n:
                    readable_path.append(k)
                    break
        print(f"✅ Path: {' -> '.join(readable_path)}")
        print(f"Distance: {distance} meters")
    current_location_norm = destination_norm