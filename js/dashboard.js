// ===== DASHBOARD JAVASCRIPT =====

// ===== MOCK DATA =====
const BINS_DATA = [
  { id: 'BIN-001', location: 'Chung cư Vinhomes Central Park', lat: 10.7942, lng: 106.7214, fill: 85, status: 'warning', updated: '2 phút trước' },
  { id: 'BIN-002', location: 'Trường ĐH Bách Khoa', lat: 10.7725, lng: 106.6581, fill: 32, status: 'normal', updated: '5 phút trước' },
  { id: 'BIN-003', location: 'Công viên 23/9', lat: 10.7685, lng: 106.6923, fill: 95, status: 'full', updated: '1 phút trước' },
  { id: 'BIN-004', location: 'AEON Mall Tân Phú', lat: 10.8018, lng: 106.6198, fill: 45, status: 'normal', updated: '8 phút trước' },
  { id: 'BIN-005', location: 'Bệnh viện Chợ Rẫy', lat: 10.7558, lng: 106.6595, fill: 72, status: 'warning', updated: '3 phút trước' },
  { id: 'BIN-006', location: 'Landmark 81 Lobby', lat: 10.7950, lng: 106.7220, fill: 18, status: 'normal', updated: '12 phút trước' },
  { id: 'BIN-007', location: 'Trường THPT Lê Hồng Phong', lat: 10.7794, lng: 106.6944, fill: 91, status: 'full', updated: '1 phút trước' },
  { id: 'BIN-008', location: 'Siêu thị CoopMart Lý Thường Kiệt', lat: 10.7732, lng: 106.6531, fill: 56, status: 'normal', updated: '6 phút trước' },
  { id: 'BIN-009', location: 'Khu dân cư Phú Mỹ Hưng', lat: 10.7295, lng: 106.7184, fill: 67, status: 'warning', updated: '4 phút trước' },
  { id: 'BIN-010', location: 'Trường ĐH RMIT', lat: 10.7291, lng: 106.6958, fill: 28, status: 'normal', updated: '10 phút trước' },
];

const LEADERBOARD_DATA = [
  { name: 'Nguyễn Minh Anh', points: 3240, avatar: '🌟', color: '#f59e0b' },
  { name: 'Trần Văn Bình', points: 2890, avatar: '💪', color: '#3b82f6' },
  { name: 'Lê Thị Hương', points: 2450, avatar: '🌿', color: '#10b981' },
  { name: 'Phạm Đức Huy', points: 2180, avatar: '🔥', color: '#ef4444' },
  { name: 'Võ Ngọc Trâm', points: 1950, avatar: '✨', color: '#8b5cf6' },
];

const ACTIVITIES = [
  { icon: 'fas fa-recycle', type: 'green', text: '<strong>BIN-003</strong> phân loại thành công: Chai nhựa PET', time: '30 giây trước' },
  { icon: 'fas fa-exclamation-triangle', type: 'red', text: '<strong>BIN-003</strong> đã đầy 95% — cần thu gom!', time: '1 phút trước' },
  { icon: 'fas fa-trophy', type: 'orange', text: '<strong>Nguyễn Minh Anh</strong> đạt Level 15!', time: '3 phút trước' },
  { icon: 'fas fa-check-circle', type: 'green', text: '<strong>BIN-006</strong> đã được thu gom xong', time: '8 phút trước' },
  { icon: 'fas fa-brain', type: 'blue', text: 'AI cập nhật model v2.4 — Accuracy: 98.7%', time: '15 phút trước' },
  { icon: 'fas fa-gift', type: 'orange', text: '<strong>Trần Văn Bình</strong> đổi 500 pts → Voucher CoopMart', time: '22 phút trước' },
  { icon: 'fas fa-exclamation-triangle', type: 'red', text: '<strong>BIN-007</strong> đã đầy 91% — cần thu gom!', time: '25 phút trước' },
];

// ===== INITIALIZE MAP =====
function initMap() {
  const map = L.map('map', {
    zoomControl: false,
    attributionControl: false
  }).setView([10.775, 106.695], 12);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19
  }).addTo(map);

  L.control.zoom({ position: 'bottomright' }).addTo(map);

  BINS_DATA.forEach(bin => {
    const colors = { normal: '#10b981', warning: '#f59e0b', full: '#ef4444' };
    const statusLabels = { normal: 'Bình thường', warning: 'Sắp đầy', full: 'Đã đầy' };
    const color = colors[bin.status];

    const icon = L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        width: 28px; height: 28px; border-radius: 50%;
        background: ${color}; border: 3px solid ${color}33;
        display: flex; align-items: center; justify-content: center;
        font-size: 12px; color: #fff; font-weight: 700;
        box-shadow: 0 0 12px ${color}66;
      ">♻</div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

    L.marker([bin.lat, bin.lng], { icon })
      .addTo(map)
      .bindPopup(`
        <div style="font-family: Inter, sans-serif; min-width: 200px;">
          <div style="font-weight: 700; font-size: 14px; margin-bottom: 6px;">${bin.id}</div>
          <div style="font-size: 12px; color: #666; margin-bottom: 8px;">${bin.location}</div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 12px;">Độ đầy: <strong>${bin.fill}%</strong></span>
            <span style="background: ${color}22; color: ${color}; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600;">
              ${statusLabels[bin.status]}
            </span>
          </div>
        </div>
      `);
  });
}

// ===== CLASSIFICATION CHART (Doughnut) =====
function initClassificationChart() {
  const ctx = document.getElementById('classificationChart').getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Nhựa', 'Giấy', 'Kim loại', 'Hữu cơ'],
      datasets: [{
        data: [35, 25, 15, 25],
        backgroundColor: ['#3b82f6', '#f59e0b', '#8b5cf6', '#10b981'],
        borderColor: '#1a2235',
        borderWidth: 3,
        hoverBorderWidth: 0,
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#94a3b8', padding: 16, font: { family: 'Inter', size: 12 }, usePointStyle: true, pointStyleWidth: 10 }
        },
        tooltip: {
          backgroundColor: '#1a2235',
          titleColor: '#f1f5f9',
          bodyColor: '#94a3b8',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          cornerRadius: 8,
          padding: 12,
          callbacks: { label: (ctx) => ` ${ctx.label}: ${ctx.parsed}% (${(ctx.parsed * 24).toFixed(0)} kg)` }
        }
      }
    }
  });
}

// ===== TREND CHART (Line) =====
function initTrendChart() {
  const ctx = document.getElementById('trendChart').getContext('2d');
  const gradient1 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient1.addColorStop(0, 'rgba(16, 185, 129, 0.2)');
  gradient1.addColorStop(1, 'rgba(16, 185, 129, 0)');
  const gradient2 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient2.addColorStop(0, 'rgba(59, 130, 246, 0.15)');
  gradient2.addColorStop(1, 'rgba(59, 130, 246, 0)');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
      datasets: [
        {
          label: 'Rác phân loại đúng (kg)',
          data: [320, 380, 290, 420, 510, 470, 550],
          borderColor: '#10b981', backgroundColor: gradient1,
          borderWidth: 2.5, fill: true, tension: 0.4,
          pointBackgroundColor: '#10b981', pointBorderColor: '#1a2235',
          pointBorderWidth: 2, pointRadius: 4, pointHoverRadius: 7
        },
        {
          label: 'Tổng rác thu gom (kg)',
          data: [380, 430, 350, 480, 570, 530, 610],
          borderColor: '#3b82f6', backgroundColor: gradient2,
          borderWidth: 2.5, fill: true, tension: 0.4,
          pointBackgroundColor: '#3b82f6', pointBorderColor: '#1a2235',
          pointBorderWidth: 2, pointRadius: 4, pointHoverRadius: 7
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          labels: { color: '#94a3b8', font: { family: 'Inter', size: 12 }, usePointStyle: true, pointStyleWidth: 10, padding: 16 }
        },
        tooltip: {
          backgroundColor: '#1a2235', titleColor: '#f1f5f9', bodyColor: '#94a3b8',
          borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1, cornerRadius: 8, padding: 12
        }
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#64748b', font: { size: 12 } } },
        y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#64748b', font: { size: 12 } }, beginAtZero: true }
      }
    }
  });
}

// ===== LEADERBOARD =====
function renderLeaderboard() {
  const container = document.getElementById('leaderboard');
  container.innerHTML = LEADERBOARD_DATA.map((user, i) => {
    const rankClass = i < 3 ? ` leaderboard-rank--${i + 1}` : '';
    const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i + 1);
    return `
      <div class="leaderboard-item">
        <div class="leaderboard-rank${rankClass}">${medal}</div>
        <div class="leaderboard-avatar" style="background: ${user.color}22; color: ${user.color};">${user.avatar}</div>
        <div class="leaderboard-name">${user.name}</div>
        <div class="leaderboard-points">${user.points.toLocaleString()} pts</div>
      </div>
    `;
  }).join('');
}

// ===== BINS TABLE =====
function renderBinsTable() {
  const tbody = document.querySelector('#binsTable tbody');
  tbody.innerHTML = BINS_DATA.map(bin => {
    const statusLabels = { normal: 'Bình thường', warning: 'Sắp đầy', full: 'Đã đầy' };
    const fillClass = bin.fill > 80 ? 'high' : bin.fill > 60 ? 'mid' : 'low';
    return `
      <tr>
        <td style="font-weight: 600; color: var(--accent-cyan);">${bin.id}</td>
        <td>${bin.location}</td>
        <td>
          <div style="display: flex; align-items: center; gap: 10px;">
            <div class="fill-bar"><div class="fill-bar__inner fill-bar__inner--${fillClass}" style="width: ${bin.fill}%;"></div></div>
            <span style="font-weight: 600; font-size: 0.82rem;">${bin.fill}%</span>
          </div>
        </td>
        <td><span class="bin-status bin-status--${bin.status}">${statusLabels[bin.status]}</span></td>
        <td style="color: var(--text-muted); font-size: 0.8rem;">${bin.updated}</td>
      </tr>
    `;
  }).join('');
}

// ===== ACTIVITY FEED =====
function renderActivity() {
  const container = document.getElementById('activityFeed');
  container.innerHTML = ACTIVITIES.map(act => `
    <div class="activity-item">
      <div class="activity-icon activity-icon--${act.type}"><i class="${act.icon}"></i></div>
      <div>
        <div class="activity-text">${act.text}</div>
        <div class="activity-time">${act.time}</div>
      </div>
    </div>
  `).join('');
}

// ===== REFRESH BUTTON =====
document.getElementById('refreshBtn')?.addEventListener('click', function() {
  this.querySelector('i').style.animation = 'spin 0.6s ease';
  setTimeout(() => { this.querySelector('i').style.animation = ''; }, 600);
});

// ===== SIDEBAR NAVIGATION =====
document.querySelectorAll('.sidebar__link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelectorAll('.sidebar__link').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});

// ===== SPIN ANIMATION =====
const style = document.createElement('style');
style.textContent = '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
document.head.appendChild(style);

// ===== INIT ALL =====
document.addEventListener('DOMContentLoaded', () => {
  initMap();
  initClassificationChart();
  initTrendChart();
  renderLeaderboard();
  renderBinsTable();
  renderActivity();
});
