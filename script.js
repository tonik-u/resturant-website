// Food Menu Data with discount support
let foodItems = [
  { id: 'kacchi', name: 'কাচ্চি বিরিয়ানি', description: 'গরুর মাংস, ঘি ও সুগন্ধি চালে তৈরি চট্টগ্রামের বিখ্যাত কাচ্চি', price: 620, discount: 0, image: 'https://images.unsplash.com/photo-1528715471579-d8c0adc5bfa0?auto=format&fit=crop&w=600&q=80' },
  { id: 'biryani', name: 'চিকেন বিরিয়ানি', description: 'মসলাদার চিকেন ও সুগন্ধি বাসমতী চাল', price: 320, discount: 0, image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=600&q=80' },
  { id: 'gorur_kala', name: 'গরুর কালা ভুনা', description: 'কালো মসলা গরুর মাংস, চট্টগ্রামী স্টাইল', price: 430, discount: 0, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80' },
  { id: 'morog_polao', name: 'মোরগ পোলাও', description: 'চিকেন ও পোলাও একসাথে ফ্যান্সি আইটেম', price: 360, discount: 0, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80' },
  { id: 'shawarma', name: 'শাওয়ার্মা', description: 'র্যাপের মধ্যে মুরগির মাংস ও সস', price: 250, discount: 0, image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'kabab', name: 'তন্দুরি কাবাব', description: 'আগুনে ঝলসানো কাবাব', price: 280, discount: 0, image: 'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?auto=format&fit=crop&w=600&q=80' }
];

const adminEmail = 'admin@bibirbiryani.com';
const adminPassword = 'admin123';

// Employee Data
let employees = [];
let pastEmployees = [];

// Load data from localStorage
function loadEmployeesFromStorage() {
  const saved = localStorage.getItem('bibir_employees');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      employees = parsed.employees || [];
      pastEmployees = parsed.pastEmployees || [];
    } catch(e) {}
  }
}

function saveEmployeesToStorage() {
  localStorage.setItem('bibir_employees', JSON.stringify({ employees: employees, pastEmployees: pastEmployees }));
}

function loadFoodFromStorage() {
  const saved = localStorage.getItem('bibir_food');
  if (saved) {
    try {
      foodItems = JSON.parse(saved);
    } catch(e) {}
  }
}

function saveFoodToStorage() {
  localStorage.setItem('bibir_food', JSON.stringify(foodItems));
}

// App State
let state = {
  loggedIn: false,
  userType: null,
  currentUser: null,
  cartItem: null,
  salesHistory: [],
  salesView: 'today'
};

function loadSalesFromStorage() {
  const saved = localStorage.getItem('bibir_sales');
  if (saved) {
    try {
      state.salesHistory = JSON.parse(saved);
    } catch(e) {}
  }
}

function saveSalesToStorage() {
  localStorage.setItem('bibir_sales', JSON.stringify(state.salesHistory));
}

// DOM Elements
const foodCards = document.getElementById('foodCards');
const loginBtn = document.getElementById('loginBtn');
const loginBtnHero = document.getElementById('loginBtnHero');
const logoutBtnNav = document.getElementById('logoutBtnNav');
const logoutBtn = document.getElementById('logoutBtn');
const placeOrderBtn = document.getElementById('placeOrderBtn');
const scrollMenuBtn = document.getElementById('scrollMenuBtn');
const loginModal = document.getElementById('loginModal');
const orderModal = document.getElementById('orderModal');
const closeLoginModal = document.getElementById('closeLoginModal');
const closeOrderModal = document.getElementById('closeOrderModal');
const userLoginTab = document.getElementById('userLoginTab');
const adminLoginTab = document.getElementById('adminLoginTab');
const signupTab = document.getElementById('signupTab');
const loginFields = document.getElementById('loginFields');
const signupFields = document.getElementById('signupFields');
const adminHint = document.getElementById('adminHint');
const loginSubmitBtn = document.getElementById('loginSubmitBtn');
const signupSubmitBtn = document.getElementById('signupSubmitBtn');
const confirmOrderBtn = document.getElementById('confirmOrderBtn');
const addFoodBtn = document.getElementById('addFoodBtn');
const todaySalesBtn = document.getElementById('todaySalesBtn');
const monthSalesBtn = document.getElementById('monthSalesBtn');
const adminPanel = document.getElementById('adminPanel');
const orderSection = document.getElementById('orderSection');
const foodNameInput = document.getElementById('foodNameInput');
const foodPriceInput = document.getElementById('foodPriceInput');
const foodDiscountInput = document.getElementById('foodDiscountInput');
const foodImageInput = document.getElementById('foodImageInput');
const foodDescInput = document.getElementById('foodDescInput');
const adminFoodList = document.getElementById('adminFoodList');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const signupName = document.getElementById('signupName');
const signupAge = document.getElementById('signupAge');
const signupMobile = document.getElementById('signupMobile');
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword');
const signupConfirm = document.getElementById('signupConfirm');

// Employee form elements
const employeeId = document.getElementById('employeeId');
const empName = document.getElementById('empName');
const empDob = document.getElementById('empDob');
const empPhone = document.getElementById('empPhone');
const empNid = document.getElementById('empNid');
const empAddress = document.getElementById('empAddress');
const empGender = document.getElementById('empGender');
const empReligion = document.getElementById('empReligion');
const empJoinDate = document.getElementById('empJoinDate');
const saveEmployeeBtn = document.getElementById('saveEmployeeBtn');
const resignEmployeeBtn = document.getElementById('resignEmployeeBtn');
const currentEmployeeList = document.getElementById('currentEmployeeList');
const pastEmployeeList = document.getElementById('pastEmployeeList');

// ========== HELPER FUNCTIONS ==========
function calculateWorkDuration(joinDate, resignDate = null) {
  const join = new Date(joinDate);
  const end = resignDate ? new Date(resignDate) : new Date();
  const diffDays = Math.ceil((end - join) / (1000 * 60 * 60 * 24));
  const years = Math.floor(diffDays / 365);
  const months = Math.floor((diffDays % 365) / 30);
  if (years > 0) return `${years} বছর ${months} মাস`;
  if (months > 0) return `${months} মাস`;
  return `${diffDays} দিন`;
}

// ========== RENDER FOOD CARDS ==========
function renderFoodCards() {
  if (!foodCards) return;
  foodCards.innerHTML = '';
  foodItems.forEach(item => {
    const discountedPrice = item.price - (item.price * (item.discount || 0) / 100);
    const card = document.createElement('article');
    card.className = 'food-card';
    card.innerHTML = `
      ${item.discount > 0 ? `<div class="discount-badge" style="position:absolute; top:12px; right:12px; background:#ff5722; color:white; padding:4px 10px; border-radius:20px; font-size:0.75rem;">${item.discount}% ছাড়</div>` : ''}
      <img src="${item.image}" alt="${item.name}" onerror="this.src='https://placehold.co/400x240?text=Food+Image'">
      <div class="food-info">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="price-row">
          <div>
            <span class="price">৳${discountedPrice}</span>
            ${item.discount > 0 ? `<span class="original-price" style="text-decoration:line-through; color:#999; margin-left:8px;">৳${item.price}</span>` : ''}
          </div>
          <button data-id="${item.id}">অর্ডার করুন</button>
        </div>
      </div>
    `;
    foodCards.appendChild(card);
  });
  document.querySelectorAll('.food-card button').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = foodItems.find(f => f.id === btn.dataset.id);
      if (item) placeOrderForItem(item);
    });
  });
}

// ========== RENDER ADMIN FOOD LIST ==========
function renderAdminFoodList() {
  if (!adminFoodList) return;
  adminFoodList.innerHTML = '';
  foodItems.forEach(item => {
    const discountedPrice = item.price - (item.price * (item.discount || 0) / 100);
    const div = document.createElement('div');
    div.className = 'menu-item';
    div.innerHTML = `
      <div style="display:flex; align-items:center; gap:1rem; flex:1;">
        <img src="${item.image}" style="width:50px; height:50px; border-radius:12px; object-fit:cover;">
        <div>
          <strong>${item.name}</strong><br>
          <small>মূল্য: ৳${item.price} | ছাড়: ${item.discount || 0}% | বিক্রয়: ৳${discountedPrice}</small>
          <br><small>${item.description.substring(0, 40)}...</small>
        </div>
      </div>
      <div style="display:flex; gap:0.5rem;">
        <button class="edit-menu-btn" data-id="${item.id}" style="background:#ff9800; color:white; border:none; padding:0.3rem 0.8rem; border-radius:20px; cursor:pointer;">এডিট</button>
        <button class="delete-menu-btn" data-id="${item.id}" style="background:#d32f2f; color:white; border:none; padding:0.3rem 0.8rem; border-radius:20px; cursor:pointer;">মুছুন</button>
      </div>
    `;
    adminFoodList.appendChild(div);
  });
  
  document.querySelectorAll('.delete-menu-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = foodItems.findIndex(f => f.id === btn.dataset.id);
      if (idx !== -1) {
        foodItems.splice(idx, 1);
        saveFoodToStorage();
        renderFoodCards();
        renderAdminFoodList();
        renderSalesReport();
        alert('আইটেমটি মুছে ফেলা হয়েছে');
      }
    });
  });
  
  document.querySelectorAll('.edit-menu-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = foodItems.find(f => f.id === btn.dataset.id);
      if (item) {
        foodNameInput.value = item.name;
        foodPriceInput.value = item.price;
        foodDiscountInput.value = item.discount || 0;
        foodDescInput.value = item.description;
        addFoodBtn.textContent = 'আপডেট করুন';
        addFoodBtn.dataset.editId = item.id;
        const idx = foodItems.findIndex(f => f.id === item.id);
        if (idx !== -1) foodItems.splice(idx, 1);
      }
    });
  });
}

// ========== ADD/UPDATE FOOD ==========
function addUpdateFood() {
  const name = foodNameInput.value.trim();
  const price = parseFloat(foodPriceInput.value);
  const discount = parseFloat(foodDiscountInput.value) || 0;
  const imageFile = foodImageInput.files[0];
  const desc = foodDescInput.value.trim();
  const editId = addFoodBtn.dataset.editId;
  
  if (!name || !price || !desc) {
    alert('নাম, মূল্য এবং বিবরণ দিন');
    return;
  }
  if (discount < 0 || discount > 100) {
    alert('ছাড় 0 থেকে 100 এর মধ্যে হতে হবে');
    return;
  }
  
  let imageUrl = editId ? foodItems.find(f => f.id === editId)?.image : 'https://placehold.co/400x240?text=Food+Image';
  if (imageFile && imageFile.type.startsWith('image/')) {
    imageUrl = URL.createObjectURL(imageFile);
  }
  
  const id = editId || name.toLowerCase().replace(/\s+/g, '_') + '_' + Date.now();
  foodItems.push({ id, name, description: desc, price, discount, image: imageUrl });
  
  saveFoodToStorage();
  renderFoodCards();
  renderAdminFoodList();
  
  foodNameInput.value = '';
  foodPriceInput.value = '';
  foodDiscountInput.value = '0';
  foodImageInput.value = '';
  foodDescInput.value = '';
  addFoodBtn.textContent = 'আইটেম যোগ করুন';
  delete addFoodBtn.dataset.editId;
  
  alert(editId ? 'আইটেম আপডেট করা হয়েছে' : 'নতুন আইটেম যোগ করা হয়েছে');
}

// ========== EMPLOYEE RENDERING ==========
function renderEmployeeLists() {
  if (!currentEmployeeList) return;
  
  currentEmployeeList.innerHTML = '';
  if (employees.length === 0) {
    currentEmployeeList.innerHTML = '<p style="color:#999; text-align:center; padding:1rem;">কোনো বর্তমান কর্মী নেই</p>';
  }
  employees.forEach(emp => {
    const duration = calculateWorkDuration(emp.joinDate);
    currentEmployeeList.innerHTML += `
      <div class="employee-card" style="background:white; padding:1rem; border-radius:16px; margin-bottom:0.8rem; border:1px solid #f0e2d8;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
          <span style="font-weight:bold; font-size:1.1rem; color:#7f0000;">${emp.name}</span>
          <span style="padding:0.2rem 0.6rem; border-radius:20px; font-size:0.7rem; background:#e8f5e9; color:#2e7d32;">বর্তমান</span>
        </div>
        <div style="font-size:0.85rem; color:#5a4a42; display:grid; grid-template-columns:repeat(2,1fr); gap:0.3rem; margin:0.5rem 0;">
          <span>📅 জন্ম: ${emp.dob}</span>
          <span>📱 ${emp.phone}</span>
          <span>🆔 এনআইডি: ${emp.nid}</span>
          <span>📍 ${emp.address}</span>
          <span>⚥ ${emp.gender}</span>
          <span>🕊️ ${emp.religion}</span>
          <span>📅 যোগদান: ${emp.joinDate}</span>
        </div>
        <div style="font-size:0.8rem; color:#2e7d32; margin-top:0.3rem;">⏱️ কর্মকাল: ${duration}</div>
        <div style="display:flex; gap:0.5rem; margin-top:0.5rem;">
          <button class="edit-employee" data-id="${emp.id}" style="background:#ff9800; color:white; border:none; padding:0.3rem 0.8rem; border-radius:20px; cursor:pointer;">এডিট</button>
          <button class="fire-employee" data-id="${emp.id}" style="background:#d32f2f; color:white; border:none; padding:0.3rem 0.8rem; border-radius:20px; cursor:pointer;">অবসর দিন</button>
        </div>
      </div>
    `;
  });
  
  pastEmployeeList.innerHTML = '';
  if (pastEmployees.length === 0) {
    pastEmployeeList.innerHTML = '<p style="color:#999; text-align:center; padding:1rem;">কোনো অবসরপ্রাপ্ত কর্মী নেই</p>';
  }
  pastEmployees.forEach(emp => {
    const duration = calculateWorkDuration(emp.joinDate, emp.resignDate);
    pastEmployeeList.innerHTML += `
      <div class="employee-card" style="background:white; padding:1rem; border-radius:16px; margin-bottom:0.8rem; border:1px solid #f0e2d8;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
          <span style="font-weight:bold; font-size:1.1rem; color:#7f0000;">${emp.name}</span>
          <span style="padding:0.2rem 0.6rem; border-radius:20px; font-size:0.7rem; background:#ffebee; color:#d32f2f;">অবসরপ্রাপ্ত</span>
        </div>
        <div style="font-size:0.85rem; color:#5a4a42; display:grid; grid-template-columns:repeat(2,1fr); gap:0.3rem; margin:0.5rem 0;">
          <span>📅 জন্ম: ${emp.dob}</span>
          <span>📱 ${emp.phone}</span>
          <span>🆔 এনআইডি: ${emp.nid}</span>
          <span>📍 ${emp.address}</span>
          <span>⚥ ${emp.gender}</span>
          <span>🕊️ ${emp.religion}</span>
          <span>📅 যোগদান: ${emp.joinDate}</span>
          <span>📅 অবসর: ${emp.resignDate}</span>
        </div>
        <div style="font-size:0.8rem; color:#2e7d32; margin-top:0.3rem;">⏱️ মোট কর্মকাল: ${duration}</div>
      </div>
    `;
  });
  
  document.querySelectorAll('.edit-employee').forEach(btn => {
    btn.addEventListener('click', () => {
      const emp = employees.find(e => e.id === btn.dataset.id);
      if (emp) {
        employeeId.value = emp.id;
        empName.value = emp.name;
        empDob.value = emp.dob;
        empPhone.value = emp.phone;
        empNid.value = emp.nid;
        empAddress.value = emp.address;
        empGender.value = emp.gender;
        empReligion.value = emp.religion;
        empJoinDate.value = emp.joinDate;
      }
    });
  });
  
  document.querySelectorAll('.fire-employee').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('আপনি কি এই কর্মীকে অবসর দিতে চান?')) {
        const idx = employees.findIndex(e => e.id === btn.dataset.id);
        if (idx !== -1) {
          const emp = employees[idx];
          emp.resignDate = new Date().toISOString().slice(0, 10);
          pastEmployees.push(emp);
          employees.splice(idx, 1);
          saveEmployeesToStorage();
          renderEmployeeLists();
          alert('কর্মীকে অবসর দেওয়া হয়েছে');
        }
      }
    });
  });
}

function saveEmployee() {
  const id = employeeId.value || Date.now().toString();
  const name = empName.value.trim();
  const dob = empDob.value;
  const phone = empPhone.value.trim();
  const nid = empNid.value.trim();
  const address = empAddress.value.trim();
  const gender = empGender.value;
  const religion = empReligion.value;
  const joinDate = empJoinDate.value;
  
  if (!name || !dob || !phone || !nid || !address || !gender || !religion || !joinDate) {
    alert('সব তথ্য পূরণ করুন');
    return;
  }
  if (!/^\d{9}$|^\d{14}$/.test(nid)) {
    alert('এনআইডি নম্বর 9 অথবা 14 ডিজিটের হতে হবে');
    return;
  }
  if (!/^01[0-9]{9}$/.test(phone)) {
    alert('মোবাইল নম্বরটি সঠিক ফরম্যাটে দিন (01XXXXXXXXX)');
    return;
  }
  
  const existingIndex = employees.findIndex(e => e.id === id);
  const empData = { id, name, dob, phone, nid, address, gender, religion, joinDate, status: 'active' };
  
  if (existingIndex !== -1) {
    employees[existingIndex] = { ...employees[existingIndex], ...empData };
    alert('কর্মীর তথ্য আপডেট করা হয়েছে');
  } else {
    employees.push(empData);
    alert('নতুন কর্মী যোগ করা হয়েছে');
  }
  
  saveEmployeesToStorage();
  employeeId.value = '';
  empName.value = '';
  empDob.value = '';
  empPhone.value = '';
  empNid.value = '';
  empAddress.value = '';
  empGender.value = '';
  empReligion.value = '';
  empJoinDate.value = '';
  renderEmployeeLists();
}

function resignEmployee() {
  const id = employeeId.value;
  if (!id) {
    alert('এডিট করে একটি কর্মী সিলেক্ট করুন');
    return;
  }
  if (confirm('আপনি কি এই কর্মীকে অবসর দিতে চান?')) {
    const idx = employees.findIndex(e => e.id === id);
    if (idx !== -1) {
      const emp = employees[idx];
      emp.resignDate = new Date().toISOString().slice(0, 10);
      pastEmployees.push(emp);
      employees.splice(idx, 1);
      saveEmployeesToStorage();
      employeeId.value = '';
      empName.value = '';
      empDob.value = '';
      empPhone.value = '';
      empNid.value = '';
      empAddress.value = '';
      empGender.value = '';
      empReligion.value = '';
      empJoinDate.value = '';
      renderEmployeeLists();
      alert('কর্মীকে অবসর দেওয়া হয়েছে');
    }
  }
}

// ========== ORDER FUNCTIONS ==========
function placeOrderForItem(item) {
  if (!state.loggedIn || state.userType !== 'user') {
    openLoginModal('user');
    return;
  }
  openOrderModal(item);
}

function openOrderModal(item) {
  state.cartItem = item;
  const discountedPrice = item.price - (item.price * (item.discount || 0) / 100);
  document.getElementById('orderSummary').innerHTML = `
    <p><strong>${item.name}</strong></p>
    <p>মূল্য: ৳${discountedPrice} ${item.discount > 0 ? `<span style="text-decoration:line-through;color:#999;">৳${item.price}</span> (-${item.discount}%)` : ''}</p>
    <p>ডেলিভারি এলাকা: কুমিরা, চট্টগ্রাম</p>
  `;
  orderModal.classList.remove('hidden');
}

function confirmOrder() {
  if (!state.cartItem) return;
  const method = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'COD';
  const item = state.cartItem;
  const finalPrice = item.price - (item.price * (item.discount || 0) / 100);
  
  state.salesHistory.push({
    itemId: item.id,
    itemName: item.name,
    date: new Date().toISOString().slice(0, 10),
    price: finalPrice
  });
  saveSalesToStorage();
  
  const methodText = method === 'COD' ? 'ক্যাশ অন ডেলিভারি' : (method === 'bKash' ? 'বিকাশ' : 'রকেট');
  alert(`✅ অর্ডার নিশ্চিত: ${item.name} - ৳${finalPrice} | ${methodText}`);
  orderModal.classList.add('hidden');
  if (state.userType === 'admin') renderSalesReport();
}

// ========== SALES & CHARTS ==========
function getSalesWindow(days) {
  const today = new Date();
  return state.salesHistory.filter(entry => {
    const entryDate = new Date(entry.date + 'T00:00:00');
    const diff = (today - entryDate) / (1000 * 3600 * 24);
    return diff >= 0 && diff < days;
  });
}

function renderSalesReport(view = state.salesView) {
  const todaySales = getSalesWindow(1);
  const monthSales = getSalesWindow(30);
  const todayRevenue = todaySales.reduce((s, e) => s + e.price, 0);
  const monthRevenue = monthSales.reduce((s, e) => s + e.price, 0);
  
  document.getElementById('dailyRevenue').innerHTML = `৳${todayRevenue}<br>আজকের আয়`;
  document.getElementById('monthRevenue').innerHTML = `৳${monthRevenue}<br>৩০ দিনের আয়`;
  document.getElementById('totalOrders').innerHTML = `${state.salesHistory.length}<br>মোট অর্ডার`;
  
  const counts = foodItems.map(item => ({ name: item.name, count: monthSales.filter(e => e.itemId === item.id).length }));
  const topItem = counts.reduce((max, curr) => curr.count > max.count ? curr : max, { count: 0, name: '-' });
  document.getElementById('topFood').innerHTML = `${topItem.name} (${topItem.count})<br>বেস্ট সেলিং`;
  
  state.salesView = view;
  todaySalesBtn.classList.toggle('active', view === 'today');
  monthSalesBtn.classList.toggle('active', view === '30days');
  drawCharts(view);
}

function drawCharts(view) {
  const entries = view === 'today' ? getSalesWindow(1) : getSalesWindow(30);
  const counts = foodItems.map(item => entries.filter(e => e.itemId === item.id).length);
  const maxCount = Math.max(...counts, 1);
  
  const canvas = document.getElementById('salesChart');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const w = canvas.clientWidth, h = 200;
    canvas.width = w; canvas.height = h;
    ctx.clearRect(0, 0, w, h);
    const barWidth = Math.max((w / counts.length) - 12, 25);
    counts.forEach((val, idx) => {
      const barHeight = (val / maxCount) * (h - 40);
      const x = idx * (barWidth + 8) + 8;
      const y = h - barHeight - 10;
      ctx.fillStyle = '#b71c1c';
      ctx.fillRect(x, y, barWidth, barHeight);
      ctx.fillStyle = '#2c2c2c';
      ctx.font = '9px sans-serif';
      ctx.fillText(val, x + barWidth / 3, y - 5);
      ctx.fillText(foodItems[idx].name.substring(0, 6), x + 2, h - 8);
    });
  }
  
  const pieCanvas = document.getElementById('salesPieChart');
  if (pieCanvas) {
    const pCtx = pieCanvas.getContext('2d');
    const pw = pieCanvas.clientWidth, ph = 180;
    pieCanvas.width = pw; pieCanvas.height = ph;
    pCtx.clearRect(0, 0, pw, ph);
    const filtered = counts.map((c, i) => ({ name: foodItems[i].name, count: c })).filter(c => c.count > 0);
    const total = filtered.reduce((s, c) => s + c.count, 1);
    let start = 0;
    const colors = ['#b71c1c', '#e67e22', '#d35400', '#c0392b', '#8e44ad', '#27ae60'];
    filtered.forEach((item, idx) => {
      const angle = (item.count / total) * Math.PI * 2;
      pCtx.fillStyle = colors[idx % colors.length];
      pCtx.beginPath();
      pCtx.moveTo(pw / 2, ph / 2);
      pCtx.arc(pw / 2, ph / 2, Math.min(pw, ph) / 3, start, start + angle);
      pCtx.fill();
      const mid = start + angle / 2;
      const xLbl = pw / 2 + Math.cos(mid) * (Math.min(pw, ph) / 2.2);
      const yLbl = ph / 2 + Math.sin(mid) * (Math.min(pw, ph) / 2.2);
      pCtx.fillStyle = '#000';
      pCtx.font = '9px sans-serif';
      pCtx.fillText(`${item.name}(${item.count})`, xLbl - 13, yLbl);
      start += angle;
    });
  }
}

// ========== AUTHENTICATION ==========
function updateAuthUI() {
  if (state.loggedIn) {
    loginBtn.classList.add('hidden');
    logoutBtnNav.classList.remove('hidden');
    if (state.userType === 'admin') {
      adminPanel.classList.remove('hidden');
      orderSection.classList.add('hidden');
      renderAdminFoodList();
      renderSalesReport();
      renderEmployeeLists();
    } else {
      adminPanel.classList.add('hidden');
      orderSection.classList.remove('hidden');
    }
  } else {
    loginBtn.classList.remove('hidden');
    logoutBtnNav.classList.add('hidden');
    adminPanel.classList.add('hidden');
    orderSection.classList.remove('hidden');
  }
}

function logout() {
  state.loggedIn = false;
  state.userType = null;
  updateAuthUI();
  alert('লগআউট সফল!');
}

function loginUser(type) {
  const email = loginEmail.value.trim();
  const pass = loginPassword.value.trim();
  if (type === 'admin') {
    if (email === adminEmail && pass === adminPassword) {
      state.loggedIn = true;
      state.userType = 'admin';
      loginModal.classList.add('hidden');
      updateAuthUI();
      alert('অ্যাডমিন লগইন সফল');
    } else {
      alert('ভুল অ্যাডমিন ক্রেডেনশিয়াল');
    }
  } else {
    if (email && pass) {
      state.loggedIn = true;
      state.userType = 'user';
      loginModal.classList.add('hidden');
      updateAuthUI();
      alert('স্বাগতম! এখন অর্ডার করতে পারবেন');
    } else {
      alert('ইমেইল ও পাসওয়ার্ড দিন');
    }
  }
}

function registerUser() {
  const name = signupName.value.trim();
  const mobile = signupMobile.value.trim();
  const email = signupEmail.value.trim();
  const pwd = signupPassword.value;
  const confirm = signupConfirm.value;
  if (!name || !mobile || !email || !pwd || pwd !== confirm) {
    alert("সব তথ্য পূরণ করুন ও পাসওয়ার্ড মিলান");
    return;
  }
  if (!email.endsWith('@gmail.com')) {
    alert("শুধুমাত্র Gmail অনুমোদিত");
    return;
  }
  if (!/^01[0-9]{9}$/.test(mobile)) {
    alert("মোবাইল নম্বর সঠিক দিন");
    return;
  }
  state.loggedIn = true;
  state.userType = 'user';
  loginModal.classList.add('hidden');
  updateAuthUI();
  alert(`${name} আপনার রেজিস্ট্রেশন সফল!`);
}

function openLoginModal(type = 'user') {
  loginModal.classList.remove('hidden');
  adminHint.classList.add('hidden');
  if (type === 'admin') {
    adminLoginTab.click();
  } else {
    userLoginTab.click();
  }
}

// ========== EVENT LISTENERS ==========
scrollMenuBtn?.addEventListener('click', () => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' }));
loginBtn?.addEventListener('click', () => openLoginModal('user'));
loginBtnHero?.addEventListener('click', () => openLoginModal('user'));
placeOrderBtn?.addEventListener('click', () => {
  if (!state.loggedIn) openLoginModal('user');
  else alert("মেনু থেকে একটি আইটেম সিলেক্ট করুন");
});
closeLoginModal?.addEventListener('click', () => loginModal.classList.add('hidden'));
closeOrderModal?.addEventListener('click', () => orderModal.classList.add('hidden'));
confirmOrderBtn?.addEventListener('click', confirmOrder);
logoutBtn?.addEventListener('click', logout);
logoutBtnNav?.addEventListener('click', logout);

userLoginTab?.addEventListener('click', () => {
  loginFields.classList.remove('hidden');
  signupFields.classList.add('hidden');
  loginSubmitBtn.classList.remove('hidden');
  signupSubmitBtn.classList.add('hidden');
  adminHint.classList.add('hidden');
});
adminLoginTab?.addEventListener('click', () => {
  loginFields.classList.remove('hidden');
  signupFields.classList.add('hidden');
  loginSubmitBtn.classList.remove('hidden');
  signupSubmitBtn.classList.add('hidden');
  adminHint.classList.remove('hidden');
});
signupTab?.addEventListener('click', () => {
  loginFields.classList.add('hidden');
  signupFields.classList.remove('hidden');
  loginSubmitBtn.classList.add('hidden');
  signupSubmitBtn.classList.remove('hidden');
  adminHint.classList.add('hidden');
});

loginSubmitBtn?.addEventListener('click', (e) => {
  e.preventDefault();
  const isAdmin = adminLoginTab.classList.contains('active');
  loginUser(isAdmin ? 'admin' : 'user');
});
signupSubmitBtn?.addEventListener('click', registerUser);
todaySalesBtn?.addEventListener('click', () => renderSalesReport('today'));
monthSalesBtn?.addEventListener('click', () => renderSalesReport('30days'));
addFoodBtn?.addEventListener('click', addUpdateFood);
saveEmployeeBtn?.addEventListener('click', saveEmployee);
resignEmployeeBtn?.addEventListener('click', resignEmployee);

// Admin Tabs
document.querySelectorAll('.admin-tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.dataset.tab;
    document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.admin-tab-content').forEach(tab => tab.classList.remove('active'));
    document.getElementById(`${tabId}Tab`).classList.add('active');
  });
});

// ========== INITIALIZE ==========
loadFoodFromStorage();
loadEmployeesFromStorage();
loadSalesFromStorage();
renderFoodCards();
updateAuthUI();