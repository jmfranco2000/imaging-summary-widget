async function loadJson(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to load JSON: ${path}`);
  }

  return response.json();
}

function renderSnapshotItems(items) {
  const container = document.getElementById('snapshot-list');
  if (!container) return;

  container.innerHTML = items.map(item => `
    <div class="snapshot-item">
      <div class="snapshot-left">
        <div class="snapshot-title-row">
          <span class="domain-pill ${item.domain}">${item.domainLabel}</span>
          <span class="snapshot-title">${item.title}</span>
        </div>
        <div class="snapshot-detail">${item.detail}</div>
      </div>
      <span class="event-status ${item.statusClass}">${item.status}</span>
    </div>
  `).join('');
}

function renderComparisonItems(items) {
  const container = document.getElementById('comparison-grid');
  if (!container) return;

  container.innerHTML = items.map(item => `
    <div class="comparison-row">
      <div class="comparison-label">${item.label}</div>
      <div class="comparison-values">
        <div class="comparison-value">${item.previous}</div>
        <div class="comparison-arrow">→</div>
        <div class="comparison-value current ${item.currentClass}">${item.current}</div>
      </div>
    </div>
  `).join('');
}

function applyOverviewMeta(data) {
  const badge = document.getElementById('stratum-badge');
  const snapshotTitle = document.getElementById('snapshot-title');
  const snapshotSubtitle = document.getElementById('snapshot-subtitle');
  const changesTitle = document.getElementById('changes-title');
  const footerNote = document.getElementById('footer-note');

  if (badge && typeof data.badgeCount !== 'undefined') {
    badge.textContent = String(data.badgeCount);
  }

  if (snapshotTitle) snapshotTitle.textContent = data.snapshotTitle || '';
  if (snapshotSubtitle) snapshotSubtitle.textContent = data.snapshotSubtitle || '';
  if (changesTitle) changesTitle.textContent = data.changesTitle || '';
  if (footerNote) footerNote.textContent = data.footerNote || '';
}

function attachActionEvents(container) {
  const actionButtons = container.querySelectorAll('[data-modal]');
  actionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const raw = button.getAttribute('data-modal');
      if (!raw) return;

      try {
        const modalData = JSON.parse(raw);
        openDetailModal(modalData);
      } catch (error) {
        console.error('Invalid modal payload', error);
      }
    });
  });
}

function renderSignalCards(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = items.map(item => `
    <div class="signal-card">
      <div class="signal-card-top">
        <div class="signal-study">
          <span class="domain-pill ${item.domain}">${item.domainLabel}</span>
          <span class="signal-name">${item.name}</span>
        </div>
        <span class="event-status ${item.statusClass}">${item.status}</span>
      </div>

      <div class="signal-badges">
        ${(item.badges || []).map(badge => `
          <span class="signal-badge ${badge.className}">${badge.label}</span>
        `).join('')}
      </div>

      <div class="signal-meta">${item.meta || ''}</div>

      <div class="signal-actions">
        ${(item.actions || []).map(action => `
          <button
            class="link-btn ${action.variant === 'secondary' ? 'secondary' : ''}"
            type="button"
            data-modal='${JSON.stringify(action.modal).replace(/'/g, "&apos;")}'>
            ${action.label}
          </button>
        `).join('')}
      </div>
    </div>
  `).join('');

  attachActionEvents(container);
}

function applySignalMeta(config, titleId, countId) {
  const title = document.getElementById(titleId);
  const count = document.getElementById(countId);

  if (title) title.textContent = config.title || '';
  if (count) count.textContent = config.countLabel || '';
}

async function loadStratumOverview() {
  const data = await loadJson('data/json/stratum-overview.json');
  applyOverviewMeta(data);
  renderSnapshotItems(data.snapshotItems || []);
  renderComparisonItems(data.comparisonItems || []);
}

async function loadStratumImaging() {
  const data = await loadJson('data/json/stratum-imaging.json');
  applySignalMeta(data, 'imaging-column-title', 'imaging-column-count');
  renderSignalCards('imaging-signal-list', data.items || []);
}

async function loadStratumLaboratory() {
  const data = await loadJson('data/json/stratum-laboratory.json');
  applySignalMeta(data, 'lab-column-title', 'lab-column-count');
  renderSignalCards('lab-signal-list', data.items || []);
}