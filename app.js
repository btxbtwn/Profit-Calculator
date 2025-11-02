// Platform data with default values
let platforms = [
  {
    name: 'Etsy',
    feePct: 0.095,
    promoPct: 0.00,
    flatFee: 0.45,
    sellerPaysShip: true,
    rounding: '.99'
  },
  {
    name: 'eBay',
    feePct: 0.136,
    promoPct: 0.12,
    flatFee: 0.30,
    sellerPaysShip: true,
    rounding: '.99'
  },
  {
    name: 'Depop',
    feePct: 0.033,
    promoPct: 0.08,
    flatFee: 0.45,
    sellerPaysShip: false,
    rounding: 'whole'
  },
  {
    name: 'Poshmark',
    feePct: 0.20,
    promoPct: 0.00,
    flatFee: 2.95,
    sellerPaysShip: false,
    rounding: 'whole'
  },
  {
    name: 'Mercari',
    feePct: 0.10,
    promoPct: 0.00,
    flatFee: 0.00,
    sellerPaysShip: false,
    rounding: 'whole'
  }
];

// State management
let state = {
  cogs: 1.25,
  material: 0.95,
  shipping: 6.00,
  avgComps: null,
  targetProfit: 5.00,
  markup: 50,
  theme: 'dark',
  roundTwice: true
};

// Initialize the app
function init() {
  // Set initial theme - start with dark as default
  setTheme(state.theme);
  
  // Setup event listeners
  setupEventListeners();
  
  // Render tables
  renderFees();
  compute();
}

// Theme management
function setTheme(theme) {
  state.theme = theme;
  document.body.setAttribute('data-theme', theme);
  const icon = document.getElementById('themeIcon');
  const label = document.getElementById('themeLabel');
  
  if (theme === 'light') {
    icon.textContent = '☀️';
    label.textContent = 'Light';
  } else {
    icon.textContent = '🌙';
    label.textContent = 'Dark';
  }
}

function toggleTheme() {
  const newTheme = state.theme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

// Setup all event listeners
function setupEventListeners() {
  // Input parameters - debounced
  let debounceTimer;
  const debounceCompute = () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(compute, 150);
  };

  document.getElementById('cogs').addEventListener('input', (e) => {
    state.cogs = parseFloat(e.target.value) || 0;
    debounceCompute();
  });
  
  document.getElementById('material').addEventListener('input', (e) => {
    state.material = parseFloat(e.target.value) || 0;
    debounceCompute();
  });
  
  document.getElementById('ship').addEventListener('input', (e) => {
    state.shipping = parseFloat(e.target.value) || 0;
    debounceCompute();
  });
  
  document.getElementById('avgComps').addEventListener('input', (e) => {
    const avgCompsValue = parseFloat(e.target.value);
    const targetInput = document.getElementById('target');
    
    if (avgCompsValue && avgCompsValue > 0) {
      state.avgComps = avgCompsValue;
      state.targetProfit = avgCompsValue - state.cogs - state.material - state.shipping;
      targetInput.value = state.targetProfit.toFixed(2);
      targetInput.disabled = true;
    } else {
      state.avgComps = null;
      targetInput.disabled = false;
    }
    debounceCompute();
  });
  
  document.getElementById('target').addEventListener('input', (e) => {
    state.targetProfit = parseFloat(e.target.value) || 0;
    debounceCompute();
  });
  
  document.getElementById('markup').addEventListener('input', (e) => {
    state.markup = parseFloat(e.target.value) || 0;
    debounceCompute();
  });
  
  // Theme toggle
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
}

// Rounding functions
const fmt = (n, whole = false) => whole ? (Math.round(n)).toFixed(0) : n.toFixed(2);
const ceilDot99 = (x) => Math.max(0.99, Math.ceil(x) - 0.01);
const ceilWhole = (x) => Math.ceil(x);
const money = (n) => '$' + Number(n).toFixed(2);

function getRoundingFor(platformName) {
  const def = platforms.find(p => p.name === platformName)?.rounding || 'whole';
  return def === '.99' ? ceilDot99 : ceilWhole;
}

// Required price calculation
function requiredPriceGeneric(costBaseNoFee, feePct, promoPct, flatFee) {
  const rate = feePct + promoPct;
  const denom = 1 - rate;
  return (costBaseNoFee + flatFee) / Math.max(1e-9, denom);
}

function requiredPricePosh(costBaseNoFee, roundingFn) {
  // Case A: under $15 (flat $2.95 only)
  const rawA = costBaseNoFee + 2.95;
  const rA = roundingFn(rawA);
  const validA = rA < 15;

  // Case B: $15+ (20% only)
  const rawB = costBaseNoFee / (1 - 0.20);
  const rB = roundingFn(rawB);
  const validB = rB >= 15;

  if (validA && validB) {
    return Math.min(rA, rB);
  } else if (validA) {
    return rA;
  } else if (validB) {
    return rB;
  } else {
    return 15;
  }
}

function feesAtList(platform, listPrice) {
  if (platform.name === 'Poshmark') {
    if (listPrice < 15) return 2.95;
    return listPrice * 0.20;
  }
  return listPrice * (platform.feePct + platform.promoPct) + platform.flatFee;
}

// Main computation function
function compute() {
  const tbody = document.querySelector('#results tbody');
  tbody.classList.add('updating');

  setTimeout(() => {
    tbody.innerHTML = '';

    platforms.forEach((p, index) => {
      const roundingFn = getRoundingFor(p.name);
      const costBaseNoFee = state.targetProfit + state.cogs + state.material + (p.sellerPaysShip ? state.shipping : 0);

      let requiredRaw, requiredRounded;
      if (p.name === 'Poshmark') {
        requiredRounded = requiredPricePosh(costBaseNoFee, roundingFn);
        requiredRaw = requiredRounded;
      } else {
        requiredRaw = requiredPriceGeneric(costBaseNoFee, p.feePct, p.promoPct, p.flatFee);
        requiredRounded = roundingFn(requiredRaw);
      }

      const listRaw = state.roundTwice ? (requiredRounded * (1 + state.markup / 100)) : (requiredRaw * (1 + state.markup / 100));
      const listRounded = roundingFn(listRaw);

      const feeAtList = feesAtList(p, listRounded);
      const shipCostAtList = p.sellerPaysShip ? state.shipping : 0;
      const netAtList = listRounded - feeAtList - shipCostAtList - state.cogs - state.material;

      const tr = document.createElement('tr');
      tr.style.animationDelay = `${index * 0.05}s`;
      tr.innerHTML = `
        <td><span class="platform-name">${p.name}</span></td>
        <td class="mono">${money(requiredRounded)}</td>
        <td class="mono">${money(listRounded)}</td>
        <td class="mono">${money(feeAtList)}</td>
        <td class="mono ${netAtList >= state.targetProfit ? 'ok' : 'warn'}">${money(netAtList)}</td>
        <td class="muted small">${(p.sellerPaysShip ? 'Seller pays ship' : 'Buyer pays ship')} • ${p.rounding === '.99' ? '.99' : 'Whole'}</td>
      `;
      tbody.appendChild(tr);
    });

    tbody.classList.remove('updating');
  }, 100);
}

// Render editable fee table
function renderFees() {
  const feeBody = document.getElementById('feeRows');
  feeBody.innerHTML = '';
  
  platforms.forEach((p, index) => {
    const tr = document.createElement('tr');
    tr.style.animationDelay = `${index * 0.05}s`;
    
    tr.innerHTML = `
      <td><span class="platform-name">${p.name}</span></td>
      <td>
        <div class="cell-with-arrows">
          <span class="cell-value" contenteditable="true" data-platform="${index}" data-field="feePct">${(p.feePct * 100).toFixed(1)}</span>
          <div class="arrow-buttons">
            <button class="arrow-btn" data-platform="${index}" data-field="feePct" data-direction="up">▲</button>
            <button class="arrow-btn" data-platform="${index}" data-field="feePct" data-direction="down">▼</button>
          </div>
        </div>
      </td>
      <td>
        <div class="cell-with-arrows">
          <span class="cell-value" contenteditable="true" data-platform="${index}" data-field="promoPct">${(p.promoPct * 100).toFixed(1)}</span>
          <div class="arrow-buttons">
            <button class="arrow-btn" data-platform="${index}" data-field="promoPct" data-direction="up">▲</button>
            <button class="arrow-btn" data-platform="${index}" data-field="promoPct" data-direction="down">▼</button>
          </div>
        </div>
      </td>
      <td>
        <div class="cell-with-arrows">
          <span class="cell-value" contenteditable="true" data-platform="${index}" data-field="flatFee">${p.flatFee.toFixed(2)}</span>
          <div class="arrow-buttons">
            <button class="arrow-btn" data-platform="${index}" data-field="flatFee" data-direction="up">▲</button>
            <button class="arrow-btn" data-platform="${index}" data-field="flatFee" data-direction="down">▼</button>
          </div>
        </div>
      </td>
      <td>
        <select class="fee-select" data-platform="${index}" data-field="sellerPaysShip">
          <option value="yes" ${p.sellerPaysShip ? 'selected' : ''}>Yes</option>
          <option value="no" ${!p.sellerPaysShip ? 'selected' : ''}>No</option>
        </select>
      </td>
      <td>
        <select class="fee-select" data-platform="${index}" data-field="rounding">
          <option value=".99" ${p.rounding === '.99' ? 'selected' : ''}>.99</option>
          <option value="whole" ${p.rounding === 'whole' ? 'selected' : ''}>Whole</option>
        </select>
      </td>
    `;
    
    feeBody.appendChild(tr);
  });
  
  attachEditListeners();
}

// Attach listeners to editable cells, arrow buttons, and dropdowns
function attachEditListeners() {
  // Editable cell values
  document.querySelectorAll('.cell-value').forEach(cell => {
    cell.addEventListener('blur', handleCellEdit);
    cell.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        cell.blur();
      }
    });
  });
  
  // Arrow buttons
  document.querySelectorAll('.arrow-btn').forEach(btn => {
    btn.addEventListener('click', handleArrowClick);
  });
  
  // Dropdown selects
  document.querySelectorAll('.fee-select').forEach(select => {
    select.addEventListener('change', handleSelectChange);
  });
}

// Handle cell edit
function handleCellEdit(e) {
  const cell = e.target;
  const platformIdx = parseInt(cell.dataset.platform);
  const field = cell.dataset.field;
  const value = cell.textContent.trim();
  
  const platform = platforms[platformIdx];
  
  try {
    if (field === 'feePct' || field === 'promoPct') {
      const numVal = parseFloat(value);
      if (isNaN(numVal) || numVal < 0 || numVal > 100) throw new Error('Invalid percentage');
      platform[field] = numVal / 100;
      cell.textContent = numVal.toFixed(1);
    } else if (field === 'flatFee') {
      const numVal = parseFloat(value);
      if (isNaN(numVal) || numVal < 0) throw new Error('Invalid fee');
      platform[field] = numVal;
      cell.textContent = numVal.toFixed(2);
    }
    compute();
  } catch (err) {
    renderFees();
  }
}

// Handle arrow button clicks
function handleArrowClick(e) {
  e.preventDefault();
  const btn = e.currentTarget;
  const platformIdx = parseInt(btn.dataset.platform);
  const field = btn.dataset.field;
  const direction = btn.dataset.direction;
  
  const platform = platforms[platformIdx];
  
  if (field === 'feePct' || field === 'promoPct') {
    const increment = 0.005;
    const currentVal = platform[field];
    let newVal = direction === 'up' ? currentVal + increment : currentVal - increment;
    newVal = Math.max(0, Math.min(1, newVal));
    platform[field] = newVal;
  } else if (field === 'flatFee') {
    const increment = 0.05;
    const currentVal = platform[field];
    let newVal = direction === 'up' ? currentVal + increment : currentVal - increment;
    newVal = Math.max(0, newVal);
    platform[field] = newVal;
  }
  
  renderFees();
  compute();
}

// Handle dropdown changes
function handleSelectChange(e) {
  const select = e.target;
  const platformIdx = parseInt(select.dataset.platform);
  const field = select.dataset.field;
  const value = select.value;
  
  const platform = platforms[platformIdx];
  
  if (field === 'sellerPaysShip') {
    platform[field] = value === 'yes';
  } else if (field === 'rounding') {
    platform[field] = value;
  }
  
  compute();
}

// Initialize on load
init();