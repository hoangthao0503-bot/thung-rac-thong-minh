// ===== DASHBOARD JAVASCRIPT =====
const WORKER_URL = 'https://my-first-worker.hoangthao0503.workers.dev'; // Thay thế bằng URL thực tế sau khi deploy

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

const MATERIALS_DATA = [
  { name: 'Vỏ ngoài', material: 'Nhựa tái chế HDPE', properties: 'Bền, chống thấm nước, chống ăn mòn', sustainability: 'Sử dụng vật liệu tái chế giúp giảm lượng rác thải nhựa.' },
  { name: 'Khung sườn', material: 'Thép không gỉ (Inox 304)', properties: 'Chắc chắn, chống gỉ sét, chịu lực tốt', sustainability: 'Tuổi thọ cao, giảm nhu cầu thay thế, có thể tái chế.' },
  { name: 'Cảm biến', material: 'Hợp kim và linh kiện điện tử', properties: 'Đo khoảng cách (siêu âm), nhận diện vật thể (hồng ngoại), cảm biến trọng lượng', sustainability: 'Linh kiện có thể tháo rời để tái chế hoặc thay thế khi hỏng.' },
  { name: 'Bảng mạch điều khiển', material: 'PCB (Printed Circuit Board)', properties: 'Điều khiển các module, xử lý dữ liệu cảm biến', sustainability: 'Tuân thủ RoHS, thiết kế module hóa dễ sửa chữa.' },
  { name: 'Hệ thống phân loại', material: 'Nhựa ABS và Động cơ Servo', properties: 'Cơ chế chia ngăn tự động, hoạt động êm ái', sustainability: 'Thiết kế module, dễ dàng bảo trì và thay thế.' },
  { name: 'Pin/Nguồn điện', material: 'Pin Lithium-ion (có thể sạc lại) / Năng lượng mặt trời', properties: 'Cung cấp năng lượng chính, thời gian sử dụng lâu dài', sustainability: 'Sử dụng năng lượng sạch, pin có vòng đời dài và an toàn với môi trường.' },
  { name: 'Module truyền thông', material: 'Linh kiện điện tử (Wi-Fi, LoRaWAN)', properties: 'Gửi dữ liệu lên cloud, nhận lệnh điều khiển', sustainability: 'Tiết kiệm năng lượng, tối ưu hóa truyền tải dữ liệu.' },
];

const TECHNOLOGY_DATA = [
  { category: 'Phần cứng', items: [
    { name: 'Vi điều khiển', tech: 'ESP32 / Arduino', description: 'Bộ não của thùng rác, xử lý dữ liệu cảm biến và điều khiển các cơ cấu.' },
    { name: 'Cảm biến siêu âm', tech: 'HC-SR04', description: 'Đo mức độ đầy của rác trong các ngăn.' },
    { name: 'Cảm biến hồng ngoại', tech: 'IR Sensor', description: 'Nhận diện vật thể khi người dùng đưa rác vào.' },
    { name: 'Cảm biến trọng lượng', tech: 'Load Cell', description: 'Đo trọng lượng rác thải.' },
    { name: 'Module Wi-Fi/LoRaWAN', tech: 'ESP32 tích hợp / Ra-02', description: 'Truyền dữ liệu lên nền tảng IoT Cloud.' },
    { name: 'Động cơ Servo', tech: 'SG90 / MG996R', description: 'Điều khiển cơ chế phân loại rác tự động.' },
    { name: 'Màn hình hiển thị', tech: 'OLED Display', description: 'Hiển thị thông tin trạng thái, điểm thưởng cho người dùng.' },
    { name: 'Camera (tùy chọn)', tech: 'ESP32-CAM', description: 'Phân tích hình ảnh rác thải bằng AI để nhận diện loại rác chính xác hơn.' },
  ]},
  { category: 'Phần mềm & Nền tảng', items: [
    { name: 'Ngôn ngữ lập trình', tech: 'C++ (Arduino IDE) / MicroPython', description: 'Lập trình cho vi điều khiển.' },
    { name: 'Nền tảng IoT Cloud', tech: ' Blynk / ThingSpeak / AWS IoT Core', description: 'Thu thập, lưu trữ và phân tích dữ liệu từ thùng rác.' },
    { name: 'Giao diện Dashboard', tech: 'HTML, CSS, JavaScript (Chart.js, Leaflet.js)', description: 'Giao diện người dùng để quản lý và theo dõi hệ thống.' },
    { name: 'Thuật toán AI', tech: 'TensorFlow Lite / OpenCV (trên Edge device)', description: 'Nhận diện và phân loại rác tự động bằng thị giác máy tính (nếu có camera).' },
    { name: 'API Gateway', tech: 'Cloudflare Workers', description: 'Xử lý các yêu cầu từ thiết bị và gửi dữ liệu đến Dashboard, đảm bảo bảo mật và hiệu suất.' },
  ]},
];

// ===== INITIALIZE MAP =====
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

// ===== MATERIALS & TECHNOLOGY =====
function renderMaterials() {
  const container = document.getElementById('materials-content');
  if (!container) return;
  container.innerHTML = `<div class="info-grid">
    ${MATERIALS_DATA.map((item, index) => `
      <div class="info-item" onclick="showMaterialDetail(${index})">
        <div class="info-item__icon" style="background: var(--accent-orange)15; color: var(--accent-orange);">
          <i class="fas fa-box"></i>
        </div>
        <div class="info-item__content">
          <div class="info-item__title">${item.name}</div>
          <div class="info-item__desc">${item.material}</div>
        </div>
      </div>
    `).join('')}
  </div>`;
}

function renderTechnology() {
  const container = document.getElementById('technology-content');
  if (!container) return;
  
  let html = '';
  TECHNOLOGY_DATA.forEach((cat, catIdx) => {
    html += `
      <div style="margin-bottom: 24px;">
        <h4 style="margin-bottom: 16px; color: var(--text-secondary); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">${cat.category}</h4>
        <div class="info-grid">
          ${cat.items.map((item, itemIdx) => `
            <div class="info-item" onclick="showTechDetail(${catIdx}, ${itemIdx})">
              <div class="info-item__icon" style="background: var(--accent-purple)15; color: var(--accent-purple);">
                <i class="fas fa-microchip"></i>
              </div>
              <div class="info-item__content">
                <div class="info-item__title">${item.name}</div>
                <div class="info-item__desc">${item.tech}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

// ===== DETAIL VIEW (MODAL) =====
function showDetail(title, content, analysis = null) {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  
  let analysisHtml = analysis ? `
    <div style="margin-top: 20px; padding: 15px; background: rgba(16,185,129,0.05); border-radius: var(--radius-md); border: 1px solid rgba(16,185,129,0.15);">
      <h4 style="margin-bottom: 12px; color: var(--accent-green); display: flex; align-items: center; gap: 8px;">
        <i class="fas fa-microscope"></i> Phân tích chi tiết
      </h4>
      <ul style="list-style: none; color: var(--text-secondary); font-size: 0.88rem; padding: 0;">
        ${analysis.map(point => `
          <li style="margin-bottom: 10px; display: flex; align-items: flex-start; gap: 10px;">
            <i class="fas fa-check-circle" style="color: var(--accent-green); margin-top: 3px; font-size: 0.8rem;"></i>
            <span>${point}</span>
          </li>
        `).join('')}
      </ul>
    </div>
  ` : `
    <div style="margin-top: 20px; padding: 15px; background: var(--bg-glass); border-radius: var(--radius-md); border: 1px solid var(--border-glass);">
      <h4 style="margin-bottom: 10px; color: var(--accent-green);">Thông tin chung:</h4>
      <p style="color: var(--text-secondary); font-size: 0.9rem;">Hệ thống đang hoạt động ổn định với hiệu năng tối ưu hóa 25% so với phiên bản cũ.</p>
    </div>
  `;

  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">${title}</h3>
        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
      </div>
      <div class="modal-body">
        <div style="font-size: 1rem; line-height: 1.6; color: var(--text-primary); margin-bottom: 20px;">
          ${content}
        </div>
        ${analysisHtml}
      </div>
      <div class="modal-footer" style="padding: 16px 24px; border-top: 1px solid var(--border-glass); display: flex; justify-content: flex-end;">
        <button class="header__btn" style="width: auto; padding: 0 20px; font-weight: 600; background: var(--accent-green); color: #000;" onclick="this.closest('.modal-overlay').remove()">Đóng</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add('active'), 10);
  modal.onclick = (e) => { if(e.target === modal) modal.remove(); };
}

function showMaterialDetail(index) {
  const item = MATERIALS_DATA[index];
  const analysis = [
    `<strong>Độ bền:</strong> ${item.properties}`,
    `<strong>Tác động môi trường:</strong> ${item.sustainability}`,
    `<strong>Khả năng thay thế:</strong> Dễ dàng bảo trì và thay thế linh kiện định kỳ.`
  ];
  showDetail(item.name, `Sử dụng vật liệu <strong>${item.material}</strong> giúp tăng cường độ bền và tính thẩm mỹ cho hệ thống.`, analysis);
}

function showTechDetail(catIndex, itemIndex) {
  const item = TECHNOLOGY_DATA[catIndex].items[itemIndex];
  const analysis = [
    `<strong>Công nghệ:</strong> ${item.tech}`,
    `<strong>Ưu điểm:</strong> Tốc độ xử lý nhanh, độ trễ thấp và tiết kiệm điện năng.`,
    `<strong>Ứng dụng:</strong> Đóng vai trò quan trọng trong việc ${item.description.toLowerCase()}`
  ];
  showDetail(item.name, item.description, analysis);
}

// ===== REFRESH BUTTON =====
document.getElementById('refreshBtn')?.addEventListener('click', async function() {
  this.querySelector('i').style.animation = 'spin 0.6s ease';
  await fetchBinsFromWorker();
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

// ===== API INTEGRATION =====
async function fetchBinsFromWorker() {
  try {
    const response = await fetch(`${WORKER_URL}/api/stats`);
    if (response.ok) {
      const { bins, alerts } = await response.json();
      
      if (bins && bins.length > 0) {
        BINS_DATA.length = 0;
        BINS_DATA.push(...bins);
        renderBinsTable();
        initMap();
      }
      
      if (alerts) {
        renderAlerts(alerts);
      }
    }
  } catch (err) {
    console.error('Không thể kết nối với Worker:', err);
  }
}

function renderAlerts(alerts) {
  // Cập nhật số lượng cảnh báo trên Badge
  const badges = document.querySelectorAll('.sidebar__link-badge, .header__btn .badge');
  badges.forEach(badge => {
    badge.innerText = alerts.length;
    badge.style.display = alerts.length > 0 ? 'flex' : 'none';
  });

  // Cập nhật Activity Feed bằng dữ liệu cảnh báo
  const container = document.getElementById('activityFeed');
  if (container && alerts.length > 0) {
    container.innerHTML = alerts.map(alert => `
      <div class="activity-item">
        <div class="activity-icon activity-icon--red"><i class="fas fa-exclamation-triangle"></i></div>
        <div>
          <div class="activity-text"><strong>${alert.binId}</strong>: ${alert.message}</div>
          <div class="activity-time">${new Date(alert.time).toLocaleTimeString()}</div>
        </div>
      </div>
    `).join('');
  }
}

function showNotification(message) {
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.innerHTML = `
    <i class="fas fa-bell"></i>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('active'), 10);
  setTimeout(() => {
    toast.classList.remove('active');
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}

async function syncBinsToWorker() {
  try {
    await fetch(`${WORKER_URL}/api/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(BINS_DATA)
    });
  } catch (err) {
    console.error('Lỗi đồng bộ dữ liệu:', err);
  }
}

// Giả lập nhận diện rác và thùng đầy
function simulateWasteEvent() {
  const randomIndex = Math.floor(Math.random() * BINS_DATA.length);
  const bin = BINS_DATA[randomIndex];
  
  if (bin.fill < 100) {
    bin.fill += Math.floor(Math.random() * 15);
    if (bin.fill >= 90) {
      bin.status = 'full';
      showNotification(`CẢNH BÁO: Thùng rác ${bin.id} tại ${bin.location} đã đầy!`);
    } else if (bin.fill > 70) {
      bin.status = 'warning';
    }
    bin.updated = 'Vừa xong';
    
    renderBinsTable();
    syncBinsToWorker(); // Gửi lên Cloudflare
    fetchBinsFromWorker(); // Lấy lại cảnh báo mới
  }
}

// ===== INIT ALL =====
document.addEventListener('DOMContentLoaded', () => {
  fetchBinsFromWorker();
  
  // Chạy giả lập mỗi 30 giây
  setInterval(simulateWasteEvent, 30000);

  initMap();
  initClassificationChart();
  initTrendChart();
  renderLeaderboard();
  renderBinsTable();
  renderActivity();
  renderMaterials();
  renderTechnology();

  const dashboardSections = {
    'overview': ['stats-row', 'grid-2', 'grid-3-1', 'materials-section', 'technology-section'],
    'map': ['map-container'],
    'analytics': ['classificationChart', 'trendChart'],
    'bins': ['binsTable'], // Assuming binsTable is the main element for bins page
    'collection': [], // Placeholder for collection page content
    'rewards': ['leaderboard'], // Assuming leaderboard is part of rewards
    'materials': ['materials-section'],
    'technology': ['technology-section'],
  };

  function showSection(page) {
    // Hide all sections
    document.querySelectorAll('.dashboard > div').forEach(section => {
      if (section.id !== 'map') { // Keep the Leaflet map container itself hidden/shown by Leaflet
        section.style.display = 'none';
      }
    });
    document.getElementById('materials-section').style.display = 'none';
    document.getElementById('technology-section').style.display = 'none';

    // Show relevant sections for the current page
    if (dashboardSections[page]) {
      dashboardSections[page].forEach(sectionId => {
        const sectionElement = document.getElementById(sectionId) || document.querySelector(`.${sectionId}`);
        if (sectionElement) {
          if (sectionId === 'map-container') {
            sectionElement.style.display = ''; // Use default display for grid/flex
            // Invalidate map size if it becomes visible after being hidden
            setTimeout(() => { map.invalidateSize(); }, 100);
          } else if (sectionId === 'stats-row' || sectionId === 'grid-2' || sectionId === 'grid-3-1') {
            sectionElement.style.display = 'grid';
          } else {
            sectionElement.style.display = '';
          }
        }
      });
    }

    // Update header title
    const titleElement = document.querySelector('.header__title');
    if (titleElement) {
      let newTitle = '📊 Dashboard';
      if (page === 'map') newTitle = '🗺️ Bản đồ Thùng rác';
      else if (page === 'analytics') newTitle = '📈 Phân tích Dữ liệu';
      else if (page === 'bins') newTitle = '🗑️ Quản lý Thùng rác';
      else if (page === 'collection') newTitle = '🚚 Lịch trình Thu gom';
      else if (page === 'rewards') newTitle = '🏆 Điểm thưởng & Xếp hạng';
      else if (page === 'materials') newTitle = '📦 Nguyên vật liệu';
      else if (page === 'technology') newTitle = '💡 Công nghệ Kết hợp';
      titleElement.innerHTML = newTitle;
    }
  }

  // Initial load: show overview
  showSection('overview');

  // Sidebar navigation
  document.querySelectorAll('.sidebar__link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelectorAll('.sidebar__link').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      const page = this.getAttribute('data-page');
      if (page) showSection(page);
    });
  });

  // Panel action links
  document.querySelectorAll('.panel__action').forEach(actionLink => {
    actionLink.addEventListener('click', function(e) {
      e.preventDefault();
      const page = this.getAttribute('data-page');
      if (page) {
        // Find and activate the corresponding sidebar link
        document.querySelectorAll('.sidebar__link').forEach(l => l.classList.remove('active'));
        const sidebarLink = document.querySelector(`.sidebar__link[data-page="${page}"]`);
        if (sidebarLink) sidebarLink.classList.add('active');
        showSection(page);
      }
    });
  });

  // Add click to stat-cards for detail view
  document.querySelectorAll('.stat-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const label = card.querySelector('.stat-card__label').innerText;
      const value = card.querySelector('.stat-card__value').innerText;
      showDetail(label, `Dữ liệu hiện tại là ${value}. Biểu đồ xu hướng cho thấy sự tăng trưởng ổn định trong 30 ngày qua.`);
    });
  });
});
