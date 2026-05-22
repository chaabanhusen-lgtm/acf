/* ==========================================================================
   AUDITING CENTRAL (PROJECT ANTIGRAVITY) - INTERACTIVE VECTOR NETWORK MAP
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initGlobalNetworkMap();
});

function initGlobalNetworkMap() {
    const container = document.getElementById('global-map-container');
    if (!container) return;

    // Clear container (except telemetry legend overlays)
    const existingSvg = container.querySelector('svg');
    if (existingSvg) existingSvg.remove();

    // Coordinate data for the 6 international hubs
    // Projected on a 1000x500 canvas
    const offices = [
        {
            id: 'london',
            name: 'London HQ',
            x: 485,
            y: 155,
            specialty: 'Forensic Mathematics',
            rating: '99.999%',
            assets: '$4.21 Billion',
            auditors: '142 Lead Analysts',
            timezone: 'UTC +1 (BST)',
            manager: 'Dr. Ronald V. Vance'
        },
        {
            id: 'newyork',
            name: 'New York Hub',
            x: 290,
            y: 185,
            specialty: 'Working Capital Optimization',
            rating: '99.996%',
            assets: '$3.85 Billion',
            auditors: '118 Lead Analysts',
            timezone: 'UTC -4 (EDT)',
            manager: 'Cynthia Vance-Sterling'
        },
        {
            id: 'dubai',
            name: 'Dubai Hub',
            x: 605,
            y: 220,
            specialty: 'Sovereign Fund Audits',
            rating: '99.998%',
            assets: '$2.94 Billion',
            auditors: '95 Lead Analysts',
            timezone: 'UTC +4 (GST)',
            manager: 'Farhan Al-Mutawa'
        },
        {
            id: 'beirut',
            name: 'Beirut Compliance',
            x: 542,
            y: 198,
            specialty: 'ESG Mathematical Compliance',
            rating: '99.995%',
            assets: '$1.15 Billion',
            auditors: '64 Lead Analysts',
            timezone: 'UTC +3 (EEST)',
            manager: 'Dr. Salim Saab'
        },
        {
            id: 'kinshasa',
            name: 'Kinshasa Operations',
            x: 512,
            y: 310,
            specialty: 'Resource Compliance Vectors',
            rating: '99.992%',
            assets: '$850 Million',
            auditors: '42 Lead Analysts',
            timezone: 'UTC +1 (WAT)',
            manager: 'Jean-Luc Kabore'
        },
        {
            id: 'saopaulo',
            name: 'São Paulo Office',
            x: 350,
            y: 360,
            specialty: 'Supply-Chain Audit Calculi',
            rating: '99.994%',
            assets: '$1.42 Billion',
            auditors: '56 Lead Analysts',
            timezone: 'UTC -3 (BRT)',
            manager: 'Elena Rostova, CFA'
        }
    ];

    // Create SVG Element
    const svgNamespace = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNamespace, "svg");
    svg.setAttribute("viewBox", "0 0 1000 500");
    svg.setAttribute("class", "map-svg");
    
    // Add grid lines for "mathematical grid" design
    const gridSpacing = 25;
    for (let i = 0; i < 1000; i += gridSpacing) {
        const line = document.createElementNS(svgNamespace, "line");
        line.setAttribute("x1", i);
        line.setAttribute("y1", 0);
        line.setAttribute("x2", i);
        line.setAttribute("y2", 500);
        line.setAttribute("class", "map-bg-grid");
        svg.appendChild(line);
    }
    for (let j = 0; j < 500; j += gridSpacing) {
        const line = document.createElementNS(svgNamespace, "line");
        line.setAttribute("x1", 0);
        line.setAttribute("y1", j);
        line.setAttribute("x2", 1000);
        line.setAttribute("y2", j);
        line.setAttribute("class", "map-bg-grid");
        svg.appendChild(line);
    }

    // Add connecting network pipeline lines (London HQ connecting to all other branches)
    const hq = offices.find(o => o.id === 'london');
    offices.forEach(office => {
        if (office.id === 'london') return;
        
        // Draw elegant curved bezier line
        const path = document.createElementNS(svgNamespace, "path");
        const dx = office.x - hq.x;
        const dy = office.y - hq.y;
        const cx = hq.x + dx / 2;
        const cy = hq.y + dy / 2 - 40; // curve upwards

        path.setAttribute("d", `M ${hq.x} ${hq.y} Q ${cx} ${cy} ${office.x} ${office.y}`);
        path.setAttribute("fill", "none");
        path.setAttribute("class", "map-connection-line");
        svg.appendChild(path);
    });

    // Create branch card element overlay inside container
    let card = container.querySelector('.branch-card');
    if (!card) {
        card = document.createElement('div');
        card.setAttribute('class', 'branch-card');
        container.appendChild(card);
    }

    // Renders the branch details in the tooltip card
    function showBranchDetails(office) {
        card.innerHTML = `
            <h4>${office.name} <span class="status">Active</span></h4>
            <p class="timezone-local">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline; vertical-align:middle; margin-top:-2px;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                ${office.timezone}
            </p>
            <div class="branch-stat-row">
                <span class="branch-stat-label">Regulatory Compliance:</span>
                <span class="branch-stat-val" style="color: var(--color-accent-gold); font-weight:600;">${office.rating}</span>
            </div>
            <div class="branch-stat-row">
                <span class="branch-stat-label">Assets Analyzed:</span>
                <span class="branch-stat-val">${office.assets}</span>
            </div>
            <div class="branch-stat-row">
                <span class="branch-stat-label">Global Specialty:</span>
                <span class="branch-stat-val" style="font-size:0.8em;">${office.specialty}</span>
            </div>
            <div class="branch-stat-row">
                <span class="branch-stat-label">Managing Director:</span>
                <span class="branch-stat-val">${office.manager}</span>
            </div>
        `;
        card.classList.add('active');
    }

    // Render nodes
    offices.forEach(office => {
        const group = document.createElementNS(svgNamespace, "g");
        group.setAttribute("class", "branch-node");
        group.setAttribute("id", `node-${office.id}`);
        
        // 1. Radar pulse element
        const pulse = document.createElementNS(svgNamespace, "circle");
        pulse.setAttribute("cx", office.x);
        pulse.setAttribute("cy", office.y);
        pulse.setAttribute("r", 15);
        pulse.setAttribute("class", "branch-node-pulse");
        group.appendChild(pulse);

        // 2. Core solid node
        const node = document.createElementNS(svgNamespace, "circle");
        node.setAttribute("cx", office.x);
        node.setAttribute("cy", office.y);
        node.setAttribute("r", 5.5);
        node.setAttribute("class", "branch-node-center");
        group.appendChild(node);

        // 3. Captions for major hubs on load
        const text = document.createElementNS(svgNamespace, "text");
        text.setAttribute("x", office.x + 10);
        text.setAttribute("y", office.y + 4);
        text.setAttribute("fill", "var(--color-text-secondary)");
        text.setAttribute("font-family", "var(--font-mono)");
        text.setAttribute("font-size", "9.5px");
        text.setAttribute("letter-spacing", "0.5px");
        text.textContent = office.name.replace(' Hub', '').replace(' Compliance', '').replace(' Operations', '').replace(' Office', '');
        group.appendChild(text);

        // Interactions
        group.addEventListener('mouseenter', () => {
            showBranchDetails(office);
            
            // Highlight text coordinate
            text.setAttribute("fill", "var(--color-text-primary)");
            text.setAttribute("font-weight", "bold");
        });

        group.addEventListener('mouseleave', () => {
            card.classList.remove('active');
            text.setAttribute("fill", "var(--color-text-secondary)");
            text.removeAttribute("font-weight");
        });

        // Click keeps card open
        group.addEventListener('click', (e) => {
            e.stopPropagation();
            showBranchDetails(office);
        });

        svg.appendChild(group);
    });

    container.appendChild(svg);

    // Initial load displays London HQ by default
    const london = offices.find(o => o.id === 'london');
    showBranchDetails(london);

    // Close card when clicking anywhere else on container
    container.addEventListener('click', () => {
        card.classList.remove('active');
    });
}
