// Admin Dashboard JavaScript

// Export with password protection
function exportWithPassword(format, data, filename) {
    const password = prompt(`Enter password to protect ${format.toUpperCase()} file:`);
    if (!password) return;
    
    const confirmPassword = prompt('Confirm password:');
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    if (password.length < 8) {
        alert('Password must be at least 8 characters!');
        return;
    }
    
    // Simulate export
    console.log(`Exporting ${format} with password protection:`, {
        filename: filename || `admin-report-${new Date().toISOString().split('T')[0]}.${format}`,
        data: data,
        timestamp: new Date().toISOString(),
        security: {
            encryption: '256-bit AES',
            passwordProtected: true,
            passwordHash: '********' // In real app, this would be hashed
        }
    });
    
    alert(`${format.toUpperCase()} file generated successfully with password protection.`);
}

// System backup function
function performSystemBackup() {
    if (confirm('This will create a complete system backup. Continue?')) {
        const backupTypes = [
            { type: 'database', size: '2.4 GB', status: 'queued' },
            { type: 'files', size: '1.8 GB', status: 'queued' },
            { type: 'logs', size: '450 MB', status: 'queued' }
        ];
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            document.getElementById('backupProgress').style.width = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
                alert('System backup completed successfully!');
            }
        }, 500);
    }
}

// User management functions
function suspendUser(userId) {
    if (confirm(`Suspend user ${userId}? They will lose access to the system.`)) {
        // API call to suspend user
        console.log(`Suspending user: ${userId}`);
        alert(`User ${userId} suspended successfully.`);
        location.reload();
    }
}

function resetUserPassword(userId) {
    const newPassword = prompt(`Enter new password for user ${userId}:`);
    if (newPassword && newPassword.length >= 8) {
        // API call to reset password
        console.log(`Resetting password for user: ${userId}`);
        alert(`Password reset for user ${userId}. New password: ${newPassword}`);
    } else {
        alert('Password must be at least 8 characters!');
    }
}

// Financial report generation
function generateFinancialReport(period) {
    const reportTypes = {
        'daily': { range: 'Today', data: 'Daily transactions' },
        'weekly': { range: 'This week', data: 'Weekly summary' },
        'monthly': { range: 'This month', data: 'Monthly financials' },
        'quarterly': { range: 'This quarter', data: 'Quarterly report' },
        'yearly': { range: 'This year', data: 'Annual report' }
    };
    
    const report = reportTypes[period];
    if (!report) return;
    
    // Generate report data
    const reportData = {
        period: report.range,
        generated: new Date().toISOString(),
        departments: [
            { name: 'Cardiology', revenue: 85400, expenses: 62100, profit: 23300 },
            { name: 'Neurology', revenue: 67200, expenses: 51800, profit: 15400 },
            { name: 'Pediatrics', revenue: 58900, expenses: 49200, profit: 9700 },
            { name: 'Emergency', revenue: 72500, expenses: 68900, profit: 3600 },
            { name: 'Pharmacy', revenue: 42300, expenses: 28500, profit: 13800 }
        ],
        total: {
            revenue: 326300,
            expenses: 260500,
            profit: 65800
        }
    };
    
    // Export with password
    exportWithPassword('pdf', reportData, `financial-report-${period}-${new Date().toISOString().split('T')[0]}`);
}

// Audit log functions
function viewAuditLogs(date) {
    const logs = [
        { timestamp: '2023-10-28 10:30:22', user: 'admin', action: 'Logged in', ip: '192.168.1.100' },
        { timestamp: '2023-10-28 10:15:18', user: 'dr.chen', action: 'Viewed patient record', ip: '192.168.1.105' },
        { timestamp: '2023-10-28 09:45:33', user: 'nurse.brown', action: 'Updated vital signs', ip: '192.168.1.110' },
        { timestamp: '2023-10-28 09:30:12', user: 'pharmacy', action: 'Dispensed medication', ip: '192.168.1.115' },
        { timestamp: '2023-10-28 08:15:45', user: 'system', action: 'Automatic backup', ip: '127.0.0.1' }
    ];
    
    // Display logs in modal or table
    console.log('Audit logs:', logs);
    alert(`Showing ${logs.length} audit log entries for ${date || 'today'}`);
}

// System monitoring
function monitorSystemHealth() {
    const healthMetrics = {
        cpu: Math.random() * 100,
        memory: Math.random() * 100,
        disk: Math.random() * 100,
        network: Math.random() * 100,
        database: Math.random() * 100
    };
    
    // Update UI with metrics
    Object.keys(healthMetrics).forEach(metric => {
        const element = document.getElementById(`${metric}Usage`);
        if (element) {
            element.style.width = `${healthMetrics[metric]}%`;
            element.textContent = `${Math.round(healthMetrics[metric])}%`;
            
            // Color coding
            if (healthMetrics[metric] > 80) {
                element.style.backgroundColor = 'var(--danger)';
            } else if (healthMetrics[metric] > 60) {
                element.style.backgroundColor = 'var(--accent)';
            } else {
                element.style.backgroundColor = 'var(--secondary)';
            }
        }
    });
    
    return healthMetrics;
}

// Batch operations
function batchUserOperation(operation, userIds) {
    if (!userIds || userIds.length === 0) {
        alert('No users selected!');
        return;
    }
    
    if (confirm(`${operation} ${userIds.length} user(s)?`)) {
        // Perform batch operation
        console.log(`Performing ${operation} on users:`, userIds);
        
        // Show progress
        let progress = 0;
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.innerHTML = `<div class="progress-fill" style="width: ${progress}%"></div>`;
        
        const interval = setInterval(() => {
            progress += 10;
            progressBar.querySelector('.progress-fill').style.width = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
                alert(`Successfully ${operation} ${userIds.length} user(s).`);
            }
        }, 200);
    }
}

// Data export utilities
function exportDataAs(format, data, options = {}) {
    const defaultOptions = {
        passwordProtected: true,
        includeMetadata: true,
        compression: true,
        encryption: 'aes-256'
    };
    
    const mergedOptions = { ...defaultOptions, ...options };
    
    // Generate export
    const exportJob = {
        id: `export-${Date.now()}`,
        format: format,
        data: data,
        options: mergedOptions,
        timestamp: new Date().toISOString(),
        status: 'processing'
    };
    
    console.log('Export job:', exportJob);
    
    // Simulate processing
    setTimeout(() => {
        exportJob.status = 'completed';
        exportJob.downloadUrl = `https://emmahealth.center/exports/${exportJob.id}.${format}`;
        
        // Trigger download
        if (mergedOptions.passwordProtected) {
            const password = prompt(`Enter password to download ${format.toUpperCase()} file:`);
            if (password) {
                alert(`Downloading ${format.toUpperCase()} file... Password: ${password}`);
                // In real app, would trigger actual download
            }
        } else {
            alert(`Downloading ${format.toUpperCase()} file...`);
        }
    }, 1500);
    
    return exportJob;
}

// System maintenance functions
function scheduleMaintenance(startTime, duration, description) {
    const maintenance = {
        startTime: startTime,
        duration: duration,
        description: description,
        scheduledBy: JSON.parse(localStorage.getItem('currentUser')).name,
        status: 'scheduled'
    };
    
    // Save to server
    console.log('Scheduled maintenance:', maintenance);
    
    // Notify users
    const notification = {
        type: 'maintenance',
        message: `System maintenance scheduled for ${startTime} for ${duration}`,
        priority: 'high'
    };
    
    alert(`Maintenance scheduled successfully! Users will be notified.`);
    return maintenance;
}

// Security functions
function updateSecurityPolicy(policy) {
    const securityPolicies = {
        passwordExpiry: policy.passwordExpiry || 90,
        twoFactor: policy.twoFactor || false,
        sessionTimeout: policy.sessionTimeout || 30,
        ipRestriction: policy.ipRestriction || false,
        auditLogging: policy.auditLogging || true
    };
    
    // Save to server
    console.log('Updating security policy:', securityPolicies);
    
    alert('Security policy updated successfully!');
    return securityPolicies;
}

// Initialize admin dashboard
function initializeAdminDashboard() {
    console.log('Admin dashboard initialized');
    
    // Start system monitoring
    setInterval(monitorSystemHealth, 5000);
    
    // Load initial data
    loadDashboardData();
    
    // Set up event listeners
    setupAdminEventListeners();
}

function loadDashboardData() {
    // Load dashboard statistics
    fetchDashboardStats();
    loadRecentActivities();
    loadSystemAlerts();
}

function fetchDashboardStats() {
    // Simulate API call
    const stats = {
        totalUsers: 2610,
        activeSessions: 148,
        todayAppointments: 85,
        pendingPrescriptions: 23,
        systemHealth: 98.5
    };
    
    // Update UI
    Object.keys(stats).forEach(stat => {
        const element = document.getElementById(stat);
        if (element) {
            element.textContent = stats[stat];
        }
    });
}

function setupAdminEventListeners() {
    // Add event listeners for admin-specific actions
    document.querySelectorAll('.export-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const format = this.dataset.format;
            const reportType = this.dataset.report;
            generateReport(reportType, format);
        });
    });
    
    // User management actions
    document.querySelectorAll('.user-action').forEach(action => {
        action.addEventListener('click', function() {
            const userId = this.dataset.userId;
            const actionType = this.dataset.action;
            
            switch(actionType) {
                case 'suspend':
                    suspendUser(userId);
                    break;
                case 'reset-password':
                    resetUserPassword(userId);
                    break;
                case 'view-logs':
                    viewUserLogs(userId);
                    break;
            }
        });
    });
}

// Call initialization when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAdminDashboard);
} else {
    initializeAdminDashboard();
}
// ===== Security & System Monitor JavaScript =====

// Chart.js instances
let responseTimeChart = null;
let errorRateChart = null;

// System Monitor Data
let monitorData = {
    cpu: { current: 65, processes: 142, loadAvg: '1.2, 1.0, 0.8' },
    memory: { used: 8.2, total: 16, free: 7.8 },
    disk: { used: 245, total: 500, available: 255 },
    network: { speed: 125, incoming: 1245, outgoing: 845 },
    users: { active: 42, sessions: 68 },
    database: { queries: 1240 }
};

// Security Scan Data
let securityScanData = {
    passed: 8,
    warnings: 2,
    failed: 1,
    total: 11,
    lastScan: '2024-01-15 14:30:00'
};

// System Alerts
let systemAlerts = [
    { id: 1, level: 'warning', title: 'High Memory Usage', message: 'Memory usage above 80% threshold', time: '10 minutes ago' },
    { id: 2, level: 'info', title: 'Backup Completed', message: 'Nightly backup completed successfully', time: '2 hours ago' },
    { id: 3, level: 'critical', title: 'Security Alert', message: 'Multiple failed login attempts detected', time: '5 hours ago' },
    { id: 4, level: 'warning', title: 'Disk Space Low', message: 'Storage usage at 85%', time: '1 day ago' }
];

// System Logs
let systemLogs = [
    { id: 1, timestamp: '14:30:22', level: 'info', message: 'User login successful: admin@emmahealth.center' },
    { id: 2, timestamp: '14:25:10', level: 'warning', message: 'API request rate limit exceeded for IP: 192.168.1.100' },
    { id: 3, timestamp: '14:20:05', level: 'error', message: 'Database connection timeout - retrying...' },
    { id: 4, timestamp: '14:15:33', level: 'info', message: 'System backup initiated' },
    { id: 5, timestamp: '14:10:18', level: 'critical', message: 'Security scan detected vulnerability in user authentication' },
    { id: 6, timestamp: '14:05:42', level: 'info', message: 'New user registered: Dr. John Smith' },
    { id: 7, timestamp: '14:00:15', level: 'warning', message: 'CPU usage spike detected - 85% for 5 minutes' },
    { id: 8, timestamp: '13:55:30', level: 'info', message: 'Email notifications sent to 15 patients' }
];

// Initialize Security and System Monitor
document.addEventListener('DOMContentLoaded', function() {
    // Initialize when security or monitor sections are active
    if (window.location.hash === '#securitySettings' || window.location.hash === '#systemMonitor') {
        initializeSecurityMonitor();
    }
    
    // Listen for hash changes
    window.addEventListener('hashchange', function() {
        if (window.location.hash === '#securitySettings' || window.location.hash === '#systemMonitor') {
            initializeSecurityMonitor();
        }
    });
});

function initializeSecurityMonitor() {
    if (window.location.hash === '#securitySettings') {
        initializeSecuritySection();
    } else if (window.location.hash === '#systemMonitor') {
        initializeSystemMonitor();
    }
}

// ===== Security Section Functions =====
function initializeSecuritySection() {
    // Load security scan results
    updateSecurityScanResults();
    
    // Set up event listeners
    setupSecurityEventListeners();
    
    // Load API keys
    loadApiKeys();
}

function updateSecurityScanResults() {
    document.getElementById('passedChecks').textContent = securityScanData.passed;
    document.getElementById('warningChecks').textContent = securityScanData.warnings;
    document.getElementById('failedChecks').textContent = securityScanData.failed;
    document.getElementById('totalChecks').textContent = securityScanData.total;
}

function runSecurityScan() {
    showLoading('Running security scan...');
    
    // Simulate API call
    setTimeout(() => {
        // Update scan data with new results
        securityScanData = {
            passed: 9,
            warnings: 1,
            failed: 0,
            total: 10,
            lastScan: new Date().toLocaleString()
        };
        
        updateSecurityScanResults();
        
        // Update security checks UI
        updateSecurityChecks();
        
        showNotification('Security scan completed successfully!', 'success');
        hideLoading();
    }, 2000);
}

function updateSecurityChecks() {
    // Update check statuses based on scan results
    const checks = document.querySelectorAll('.security-check');
    checks.forEach((check, index) => {
        const status = check.querySelector('.check-status');
        if (index === 0) {
            status.textContent = 'Passed';
            status.className = 'check-status passed';
        } else if (index === 1) {
            status.textContent = 'Passed';
            status.className = 'check-status passed';
        } else if (index === 2) {
            status.textContent = 'Passed';
            status.className = 'check-status passed';
        }
    });
}

function saveSecuritySettings() {
    const require2FA = document.getElementById('require2FA').checked;
    const passwordExpiry = document.getElementById('passwordExpiry').checked;
    const sessionTimeout = document.getElementById('sessionTimeout').checked;
    const maxLoginAttempts = document.getElementById('maxLoginAttempts').value;
    
    // Simulate saving settings
    showLoading('Saving security settings...');
    
    setTimeout(() => {
        // In real implementation, send to server
        console.log('Security settings saved:', {
            require2FA,
            passwordExpiry,
            sessionTimeout,
            maxLoginAttempts
        });
        
        showNotification('Security settings saved successfully!', 'success');
        hideLoading();
    }, 1500);
}

function loadApiKeys() {
    // In real implementation, load from API
    console.log('Loading API keys...');
}

function generateNewApiKey() {
    const name = prompt('Enter a name for this API key:');
    if (!name) return;
    
    showLoading('Generating new API key...');
    
    setTimeout(() => {
        // Generate mock API key
        const apiKey = 'sk_live_' + Math.random().toString(36).substring(2, 15) + 
                      Math.random().toString(36).substring(2, 15);
        
        // Add to UI
        const apiKeysContainer = document.querySelector('.api-keys');
        const newKeyHTML = `
            <div class="api-key-item">
                <div class="api-key-header">
                    <div class="api-key-name">${name}</div>
                    <span class="api-key-status active">Active</span>
                </div>
                <div class="api-key-value">${apiKey}</div>
                <div class="api-key-actions">
                    <button class="btn btn-sm btn-outline" onclick="regenerateApiKey(this)">Regenerate</button>
                    <button class="btn btn-sm btn-outline" onclick="toggleApiKey(this)">Disable</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteApiKey(this)">Delete</button>
                </div>
            </div>
        `;
        
        apiKeysContainer.insertAdjacentHTML('afterbegin', newKeyHTML);
        
        showNotification('New API key generated! Make sure to copy it now.', 'success');
        hideLoading();
    }, 1000);
}

function regenerateApiKey(button) {
    if (!confirm('Are you sure you want to regenerate this API key? The old key will be invalidated immediately.')) {
        return;
    }
    
    const keyItem = button.closest('.api-key-item');
    const keyValue = keyItem.querySelector('.api-key-value');
    
    // Generate new key
    const newKey = 'sk_live_' + Math.random().toString(36).substring(2, 15) + 
                  Math.random().toString(36).substring(2, 15);
    
    keyValue.textContent = newKey;
    showNotification('API key regenerated successfully!', 'success');
}

function toggleApiKey(button) {
    const keyItem = button.closest('.api-key-item');
    const statusBadge = keyItem.querySelector('.api-key-status');
    
    if (statusBadge.classList.contains('active')) {
        statusBadge.textContent = 'Inactive';
        statusBadge.className = 'api-key-status inactive';
        button.textContent = 'Enable';
        showNotification('API key disabled', 'warning');
    } else {
        statusBadge.textContent = 'Active';
        statusBadge.className = 'api-key-status active';
        button.textContent = 'Disable';
        showNotification('API key enabled', 'success');
    }
}

function deleteApiKey(button) {
    if (!confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
        return;
    }
    
    const keyItem = button.closest('.api-key-item');
    keyItem.style.opacity = '0.5';
    
    setTimeout(() => {
        keyItem.remove();
        showNotification('API key deleted successfully', 'success');
    }, 500);
}

function setupSecurityEventListeners() {
    // Permission checkboxes
    document.querySelectorAll('.permission-item input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const role = this.closest('.role-item').querySelector('.role-name').textContent;
            const permission = this.nextElementSibling.textContent;
            console.log(`Permission ${this.checked ? 'granted' : 'revoked'}: ${permission} for ${role}`);
        });
    });
}

// ===== System Monitor Functions =====
function initializeSystemMonitor() {
    // Load initial data
    updateMonitorData();
    updateSystemAlerts();
    updateSystemLogs();
    
    // Initialize charts
    initializeCharts();
    
    // Set up auto-refresh
    startAutoRefresh();
    
    // Set up event listeners
    setupMonitorEventListeners();
}

function updateMonitorData() {
    // Update quick stats
    document.getElementById('activeUsers').textContent = monitorData.users.active;
    document.getElementById('activeSessions').textContent = monitorData.users.sessions;
    document.getElementById('dbQueries').textContent = monitorData.database.queries.toLocaleString();
    document.getElementById('serverLoad').textContent = `${monitorData.cpu.current}%`;
    
    // Update CPU
    const cpuPercent = monitorData.cpu.current;
    document.getElementById('cpuPercent').textContent = `${cpuPercent}%`;
    document.getElementById('cpuBar').style.width = `${cpuPercent}%`;
    document.getElementById('cpuProcesses').textContent = monitorData.cpu.processes;
    document.getElementById('cpuLoadAvg').textContent = monitorData.cpu.loadAvg;
    
    // Update Memory
    const ramPercent = Math.round((monitorData.memory.used / monitorData.memory.total) * 100);
    document.getElementById('ramPercent').textContent = `${ramPercent}%`;
    document.getElementById('ramBar').style.width = `${ramPercent}%`;
    document.getElementById('ramTotal').textContent = `${monitorData.memory.total} GB`;
    document.getElementById('ramUsed').textContent = `${monitorData.memory.used} GB`;
    document.getElementById('ramFree').textContent = `${monitorData.memory.free} GB`;
    
    // Update Disk
    const diskPercent = Math.round((monitorData.disk.used / monitorData.disk.total) * 100);
    document.getElementById('diskPercent').textContent = `${diskPercent}%`;
    document.getElementById('diskBar').style.width = `${diskPercent}%`;
    document.getElementById('diskTotal').textContent = `${monitorData.disk.total} GB`;
    document.getElementById('diskUsed').textContent = `${monitorData.disk.used} GB`;
    document.getElementById('diskAvailable').textContent = `${monitorData.disk.available} GB`;
    
    // Update Network
    document.getElementById('networkSpeed').textContent = `${monitorData.network.speed} Mbps`;
    document.getElementById('networkBar').style.width = `${Math.min(monitorData.network.speed / 2, 100)}%`;
    document.getElementById('networkIn').textContent = `${monitorData.network.incoming} MB`;
    document.getElementById('networkOut').textContent = `${monitorData.network.outgoing} MB`;
}

function updateSystemAlerts() {
    const alertsContainer = document.getElementById('systemAlerts');
    alertsContainer.innerHTML = '';
    
    systemAlerts.forEach(alert => {
        const alertHTML = `
            <div class="alert-item ${alert.level}">
                <div class="alert-header">
                    <div class="alert-title">${alert.title}</div>
                    <div class="alert-time">${alert.time}</div>
                </div>
                <div class="alert-message">${alert.message}</div>
                <div class="alert-actions">
                    <button class="btn btn-sm btn-outline" onclick="acknowledgeAlert(${alert.id})">Acknowledge</button>
                    <button class="btn btn-sm btn-outline" onclick="viewAlertDetails(${alert.id})">Details</button>
                </div>
            </div>
        `;
        alertsContainer.innerHTML += alertHTML;
    });
}

function updateSystemLogs() {
    const logsContainer = document.getElementById('systemLogs');
    logsContainer.innerHTML = '';
    
    systemLogs.forEach(log => {
        const logHTML = `
            <div class="log-entry" data-level="${log.level}">
                <span class="log-timestamp">${log.timestamp}</span>
                <span class="log-level-badge ${log.level}">${log.level.toUpperCase()}</span>
                <span class="log-message">${log.message}</span>
            </div>
        `;
        logsContainer.innerHTML += logHTML;
    });
    
    // Scroll to bottom
    logsContainer.scrollTop = logsContainer.scrollHeight;
}

function initializeCharts() {
    // Response Time Chart
    const responseCtx = document.getElementById('responseTimeChart').getContext('2d');
    responseTimeChart = new Chart(responseCtx, {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
            datasets: [{
                label: 'Response Time (ms)',
                data: [120, 110, 95, 105, 130, 115, 100],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    title: {
                        display: true,
                        text: 'Milliseconds'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            }
        }
    });
    
    // Error Rate Chart
    const errorCtx = document.getElementById('errorRateChart').getContext('2d');
    errorRateChart = new Chart(errorCtx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Errors',
                data: [12, 8, 15, 6, 10, 4, 7],
                backgroundColor: [
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(241, 196, 15, 0.7)',
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(241, 196, 15, 0.7)'
                ],
                borderColor: [
                    '#e74c3c',
                    '#f1c40f',
                    '#e74c3c',
                    '#2ecc71',
                    '#e74c3c',
                    '#2ecc71',
                    '#f1c40f'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    title: {
                        display: true,
                        text: 'Number of Errors'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            }
        }
    });
}

function refreshMonitorData() {
    showLoading('Refreshing monitor data...');
    
    // Simulate data update
    setTimeout(() => {
        // Update data with slight variations
        monitorData.cpu.current = Math.max(20, Math.min(90, monitorData.cpu.current + (Math.random() * 10 - 5)));
        monitorData.cpu.processes = Math.max(100, Math.min(200, monitorData.cpu.processes + Math.floor(Math.random() * 20 - 10)));
        
        monitorData.memory.used = Math.max(7, Math.min(12, monitorData.memory.used + (Math.random() * 0.5 - 0.25)));
        monitorData.memory.free = monitorData.memory.total - monitorData.memory.used;
        
        monitorData.network.speed = Math.max(50, Math.min(200, monitorData.network.speed + Math.floor(Math.random() * 30 - 15)));
        monitorData.network.incoming += Math.floor(Math.random() * 50);
        monitorData.network.outgoing += Math.floor(Math.random() * 30);
        
        monitorData.users.active = Math.max(30, Math.min(60, monitorData.users.active + Math.floor(Math.random() * 10 - 5)));
        monitorData.users.sessions = Math.max(50, Math.min(80, monitorData.users.sessions + Math.floor(Math.random() * 15 - 7)));
        
        monitorData.database.queries = Math.max(1000, Math.min(1500, monitorData.database.queries + Math.floor(Math.random() * 200 - 100)));
        
        // Update UI
        updateMonitorData();
        
        // Add a random log entry
        addRandomLogEntry();
        
        // Occasionally add an alert
        if (Math.random() > 0.7) {
            addRandomAlert();
        }
        
        hideLoading();
        showNotification('Monitor data refreshed', 'success');
    }, 1000);
}

function addRandomLogEntry() {
    const levels = ['info', 'warning', 'error', 'critical'];
    const messages = [
        'User session expired',
        'Database query optimized',
        'Cache cleared successfully',
        'New device connected',
        'System resources reallocated',
        'Security check completed',
        'Backup verification successful'
    ];
    
    const newLog = {
        id: systemLogs.length + 1,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'}),
        level: levels[Math.floor(Math.random() * levels.length)],
        message: messages[Math.floor(Math.random() * messages.length)]
    };
    
    systemLogs.push(newLog);
    
    // Keep only last 20 logs
    if (systemLogs.length > 20) {
        systemLogs.shift();
    }
    
    updateSystemLogs();
}

function addRandomAlert() {
    const alerts = [
        { level: 'warning', title: 'Performance Warning', message: 'System response time above threshold' },
        { level: 'info', title: 'Maintenance Notice', message: 'Scheduled maintenance in 2 hours' },
        { level: 'critical', title: 'Security Breach Attempt', message: 'Unauthorized access attempt blocked' }
    ];
    
    const alert = alerts[Math.floor(Math.random() * alerts.length)];
    alert.id = systemAlerts.length + 1;
    alert.time = 'Just now';
    
    systemAlerts.unshift(alert);
    
    // Keep only last 5 alerts
    if (systemAlerts.length > 5) {
        systemAlerts.pop();
    }
    
    updateSystemAlerts();
    
    // Show notification
    showNotification(`New system alert: ${alert.title}`, alert.level === 'critical' ? 'error' : 'warning');
}

function acknowledgeAlert(alertId) {
    systemAlerts = systemAlerts.filter(alert => alert.id !== alertId);
    updateSystemAlerts();
    showNotification('Alert acknowledged', 'success');
}

function viewAlertDetails(alertId) {
    const alert = systemAlerts.find(a => a.id === alertId);
    if (alert) {
        alert(`
            Alert Details:
            
            Title: ${alert.title}
            Level: ${alert.level.toUpperCase()}
            Message: ${alert.message}
            Time: ${alert.time}
            
            Please review and take appropriate action.
        `);
    }
}

function clearLogs() {
    if (confirm('Are you sure you want to clear all system logs?')) {
        systemLogs = [];
        updateSystemLogs();
        showNotification('System logs cleared', 'success');
    }
}

function exportMonitorData() {
    showLoading('Exporting monitor data...');
    
    // Simulate export
    setTimeout(() => {
        const data = {
            timestamp: new Date().toISOString(),
            monitorData,
            systemAlerts,
            securityScanData
        };
        
        // Create downloadable file
        const dataStr = JSON.stringify(data, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `system-monitor-export-${new Date().toISOString().slice(0,10)}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        hideLoading();
        showNotification('Monitor data exported successfully', 'success');
    }, 1500);
}

function startAutoRefresh() {
    // Auto-refresh every 30 seconds
    setInterval(() => {
        if (window.location.hash === '#systemMonitor') {
            refreshMonitorData();
        }
    }, 30000);
}

function setupMonitorEventListeners() {
    // Log level filter
    document.querySelectorAll('.log-level').forEach(level => {
        level.addEventListener('click', function() {
            // Update active state
            document.querySelectorAll('.log-level').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Filter logs
            const level = this.dataset.level;
            filterLogs(level);
        });
    });
    
    // Log text filter
    const logFilter = document.getElementById('logFilter');
    if (logFilter) {
        logFilter.addEventListener('input', function() {
            filterLogsByText(this.value);
        });
    }
    
    // Log level dropdown filter
    const logLevelFilter = document.getElementById('logLevelFilter');
    if (logLevelFilter) {
        logLevelFilter.addEventListener('change', function() {
            filterLogs(this.value);
        });
    }
}

function filterLogs(level) {
    const logs = document.querySelectorAll('.log-entry');
    
    logs.forEach(log => {
        if (level === 'all' || log.dataset.level === level) {
            log.style.display = 'block';
        } else {
            log.style.display = 'none';
        }
    });
}

function filterLogsByText(text) {
    const logs = document.querySelectorAll('.log-entry');
    const searchText = text.toLowerCase();
    
    logs.forEach(log => {
        const logText = log.textContent.toLowerCase();
        if (logText.includes(searchText)) {
            log.style.display = 'block';
        } else {
            log.style.display = 'none';
        }
    });
}

// ===== Utility Functions =====
function showLoading(message = 'Loading...') {
    // Create or show loading overlay
    let loadingOverlay = document.getElementById('loadingOverlay');
    if (!loadingOverlay) {
        loadingOverlay = document.createElement('div');
        loadingOverlay.id = 'loadingOverlay';
        loadingOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            color: white;
            font-size: 18px;
        `;
        document.body.appendChild(loadingOverlay);
    }
    
    loadingOverlay.innerHTML = `
        <div style="text-align: center;">
            <div class="spinner" style="
                border: 4px solid #f3f3f3;
                border-top: 4px solid #3498db;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                animation: spin 1s linear infinite;
                margin: 0 auto 15px;
            "></div>
            <div>${message}</div>
        </div>
    `;
    
    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    loadingOverlay.style.display = 'flex';
}

function hideLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : type === 'warning' ? '#f39c12' : '#3498db'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Make functions globally available
window.runSecurityScan = runSecurityScan;
window.saveSecuritySettings = saveSecuritySettings;
window.generateNewApiKey = generateNewApiKey;
window.regenerateApiKey = regenerateApiKey;
window.toggleApiKey = toggleApiKey;
window.deleteApiKey = deleteApiKey;
window.refreshMonitorData = refreshMonitorData;
window.exportMonitorData = exportMonitorData;
window.clearLogs = clearLogs;
window.acknowledgeAlert = acknowledgeAlert;
window.viewAlertDetails = viewAlertDetails;
// ===== Department Management JavaScript =====

// Sample department data
let departments = [
    { id: 1, code: 'CARD', name: 'Cardiology', head: 'Dr. Sarah Johnson', staff: 45, beds: 60, status: 'active', email: 'cardiology@emmahealth.center', phone: '(555) 123-4567', location: 'Main Building, Floor 2', lastUpdated: '2024-01-15' },
    { id: 2, code: 'RAD', name: 'Radiology', head: 'Dr. Michael Chen', staff: 32, beds: 0, status: 'active', email: 'radiology@emmahealth.center', phone: '(555) 123-4568', location: 'West Wing, Floor 1', lastUpdated: '2024-01-14' },
    { id: 3, code: 'PED', name: 'Pediatrics', head: 'Dr. Emily Wilson', staff: 38, beds: 45, status: 'active', email: 'pediatrics@emmahealth.center', phone: '(555) 123-4569', location: 'East Wing, Floor 3', lastUpdated: '2024-01-13' },
    { id: 4, code: 'ORTH', name: 'Orthopedics', head: 'Dr. Robert Brown', staff: 28, beds: 40, status: 'active', email: 'orthopedics@emmahealth.center', phone: '(555) 123-4570', location: 'Main Building, Floor 1', lastUpdated: '2024-01-12' },
    { id: 5, code: 'EMER', name: 'Emergency', head: 'Dr. Lisa Martinez', staff: 65, beds: 120, status: 'active', email: 'emergency@emmahealth.center', phone: '(555) 123-4571', location: 'Emergency Building', lastUpdated: '2024-01-11' },
    { id: 6, code: 'SURG', name: 'Surgery', head: 'Dr. James Wilson', staff: 39, beds: 80, status: 'active', email: 'surgery@emmahealth.center', phone: '(555) 123-4572', location: 'Surgical Tower, Floor 2', lastUpdated: '2024-01-10' }
];

// Sample expiring departments
let expiringDepartments = [
    { id: 7, name: 'Oncology Wing', expiryDate: '2024-02-15', reason: 'Lease expiration' },
    { id: 8, name: 'Research Lab', expiryDate: '2024-03-01', reason: 'Equipment lease' },
    { id: 9, name: 'Physical Therapy', expiryDate: '2024-02-28', reason: 'Contract renewal' }
];

// Initialize Department Management
function initializeDepartmentManagement() {
    loadDepartments();
    loadExpiringDepartments();
    populateDoctorsDropdown();
    setupDepartmentEventListeners();
}

function loadDepartments() {
    const tbody = document.getElementById('departmentsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    departments.forEach(dept => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><span class="dept-code">${dept.code}</span></td>
            <td>
                <strong>${dept.name}</strong>
                <div class="text-muted small">${dept.location}</div>
            </td>
            <td>${dept.head}</td>
            <td>${dept.staff}</td>
            <td><span class="dept-status ${dept.status}">${dept.status}</span></td>
            <td>${dept.lastUpdated}</td>
            <td>
                <button class="btn-icon" onclick="editDepartment(${dept.id})" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon" onclick="viewDepartment(${dept.id})" title="View">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-icon btn-danger" onclick="deleteDepartment(${dept.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Update stats
    updateDepartmentStats();
}

function loadExpiringDepartments() {
    const container = document.getElementById('expiringDepts');
    if (!container) return;
    
    container.innerHTML = '';
    
    expiringDepartments.forEach(dept => {
        const item = document.createElement('div');
        item.className = 'expiring-item';
        item.innerHTML = `
            <div class="expiring-info">
                <h6>${dept.name}</h6>
                <div class="expiring-reason">${dept.reason}</div>
            </div>
            <div class="expiring-details">
                <div class="expiring-date">Expires: ${dept.expiryDate}</div>
                <div class="expiring-actions">
                    <button class="btn btn-sm btn-outline" onclick="renewDepartment(${dept.id})">Renew</button>
                    <button class="btn btn-sm btn-outline" onclick="extendDepartment(${dept.id})">Extend</button>
                </div>
            </div>
        `;
        container.appendChild(item);
    });
}

function updateDepartmentStats() {
    const totalDepts = document.getElementById('totalDepartments');
    const totalStaff = document.getElementById('deptStaff');
    const totalBeds = document.getElementById('deptBeds');
    
    if (totalDepts) totalDepts.textContent = departments.length;
    
    if (totalStaff) {
        const staffCount = departments.reduce((sum, dept) => sum + dept.staff, 0);
        totalStaff.textContent = staffCount;
    }
    
    if (totalBeds) {
        const bedCount = departments.reduce((sum, dept) => sum + dept.beds, 0);
        totalBeds.textContent = bedCount;
    }
}

function populateDoctorsDropdown() {
    const dropdown = document.getElementById('deptHead');
    if (!dropdown) return;
    
    // Sample doctors - in real app, fetch from API
    const doctors = [
        'Dr. Sarah Johnson',
        'Dr. Michael Chen',
        'Dr. Emily Wilson',
        'Dr. Robert Brown',
        'Dr. Lisa Martinez',
        'Dr. James Wilson',
        'Dr. Amanda Garcia',
        'Dr. David Lee'
    ];
    
    doctors.forEach(doctor => {
        const option = document.createElement('option');
        option.value = doctor;
        option.textContent = doctor;
        dropdown.appendChild(option);
    });
}

function setupDepartmentEventListeners() {
    // Department form submission
    const deptForm = document.getElementById('addDepartmentForm');
    if (deptForm) {
        deptForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addNewDepartment();
        });
    }
    
    // Tab switching for backup frequency
    const backupFrequency = document.getElementById('backupFrequency');
    if (backupFrequency) {
        backupFrequency.addEventListener('change', function() {
            const customGroup = document.getElementById('customFrequencyGroup');
            if (this.value === 'custom') {
                customGroup.style.display = 'block';
            } else {
                customGroup.style.display = 'none';
            }
        });
    }
    
    // Encryption checkbox
    const encryptCheckbox = document.getElementById('encryptBackup');
    if (encryptCheckbox) {
        encryptCheckbox.addEventListener('change', function() {
            const passwordGroup = document.getElementById('encryptionPasswordGroup');
            passwordGroup.style.display = this.checked ? 'block' : 'none';
        });
    }
    
    // Restore type radio buttons
    document.querySelectorAll('input[name="restoreType"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const partialOptions = document.getElementById('partialRestoreOptions');
            partialOptions.style.display = this.value === 'partial' ? 'block' : 'none';
        });
    });
    
    // Backup settings form
    const backupForm = document.getElementById('backupSettingsForm');
    if (backupForm) {
        backupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveBackupSettings();
        });
    }
}

// Department Functions
function addNewDepartment() {
    const name = document.getElementById('deptName').value;
    const code = document.getElementById('deptCode').value;
    const head = document.getElementById('deptHead').value;
    const email = document.getElementById('deptEmail').value;
    const phone = document.getElementById('deptPhone').value;
    const location = document.getElementById('deptLocation').value;
    const status = document.getElementById('deptStatus').value;
    const description = document.getElementById('deptDescription').value;
    
    // Validate
    if (!name || !code) {
        showNotification('Please fill in required fields', 'error');
        return;
    }
    
    // Create new department
    const newDept = {
        id: departments.length + 1,
        code: code.toUpperCase(),
        name,
        head,
        staff: 0, // New department starts with 0 staff
        beds: 0,  // New department starts with 0 beds
        status,
        email,
        phone,
        location,
        description,
        lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    departments.push(newDept);
    loadDepartments();
    
    // Reset form
    resetDepartmentForm();
    
    showNotification(`Department "${name}" added successfully!`, 'success');
}

function resetDepartmentForm() {
    document.getElementById('addDepartmentForm').reset();
    document.getElementById('encryptionPasswordGroup').style.display = 'none';
    document.getElementById('customFrequencyGroup').style.display = 'none';
}

function editDepartment(id) {
    const dept = departments.find(d => d.id === id);
    if (!dept) return;
    
    // Populate form with department data
    document.getElementById('deptName').value = dept.name;
    document.getElementById('deptCode').value = dept.code;
    document.getElementById('deptHead').value = dept.head;
    document.getElementById('deptEmail').value = dept.email;
    document.getElementById('deptPhone').value = dept.phone;
    document.getElementById('deptLocation').value = dept.location;
    document.getElementById('deptStatus').value = dept.status;
    document.getElementById('deptDescription').value = dept.description || '';
    
    showNotification(`Editing department: ${dept.name}`, 'info');
}

function viewDepartment(id) {
    const dept = departments.find(d => d.id === id);
    if (!dept) return;
    
    // Create modal for viewing department details
    const modalHTML = `
        <div class="dept-modal active" id="viewDeptModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${dept.name} (${dept.code})</h3>
                    <button class="modal-close" onclick="closeModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="department-details">
                        <div class="detail-row">
                            <span class="detail-label">Department Head:</span>
                            <span class="detail-value">${dept.head}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Contact Email:</span>
                            <span class="detail-value">${dept.email}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Contact Phone:</span>
                            <span class="detail-value">${dept.phone}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Location:</span>
                            <span class="detail-value">${dept.location}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Status:</span>
                            <span class="dept-status ${dept.status}">${dept.status}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Staff Count:</span>
                            <span class="detail-value">${dept.staff} employees</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Available Beds:</span>
                            <span class="detail-value">${dept.beds} beds</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Last Updated:</span>
                            <span class="detail-value">${dept.lastUpdated}</span>
                        </div>
                        ${dept.description ? `
                        <div class="detail-row">
                            <span class="detail-label">Description:</span>
                            <div class="detail-value">${dept.description}</div>
                        </div>` : ''}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline" onclick="closeModal()">Close</button>
                    <button class="btn btn-primary" onclick="editDepartment(${dept.id}); closeModal();">Edit Department</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.querySelector('.dept-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

function deleteDepartment(id) {
    if (!confirm('Are you sure you want to delete this department? This action cannot be undone.')) {
        return;
    }
    
    const deptIndex = departments.findIndex(d => d.id === id);
    if (deptIndex !== -1) {
        const deptName = departments[deptIndex].name;
        departments.splice(deptIndex, 1);
        loadDepartments();
        showNotification(`Department "${deptName}" deleted successfully`, 'success');
    }
}

function renewDepartment(id) {
    const dept = expiringDepartments.find(d => d.id === id);
    if (!dept) return;
    
    if (confirm(`Renew contract for ${dept.name}?`)) {
        // In real app, call API to renew
        showNotification(`Contract renewal initiated for ${dept.name}`, 'info');
        
        // Remove from expiring list
        expiringDepartments = expiringDepartments.filter(d => d.id !== id);
        loadExpiringDepartments();
    }
}

function extendDepartment(id) {
    const dept = expiringDepartments.find(d => d.id === id);
    if (!dept) return;
    
    const newDate = prompt('Enter new expiry date (YYYY-MM-DD):', dept.expiryDate);
    if (newDate) {
        dept.expiryDate = newDate;
        loadExpiringDepartments();
        showNotification(`Expiry date extended for ${dept.name}`, 'success');
    }
}

function exportDepartmentReport() {
    showLoading('Generating department report...');
    
    setTimeout(() => {
        // Create CSV data
        const headers = ['Code', 'Name', 'Head', 'Staff', 'Beds', 'Status', 'Location', 'Email', 'Phone'];
        const csvData = [
            headers.join(','),
            ...departments.map(dept => [
                dept.code,
                `"${dept.name}"`,
                `"${dept.head}"`,
                dept.staff,
                dept.beds,
                dept.status,
                `"${dept.location}"`,
                dept.email,
                dept.phone
            ].join(','))
        ].join('\n');
        
        // Create download link
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `department-report-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        hideLoading();
        showNotification('Department report exported successfully', 'success');
    }, 1500);
}

function printDepartmentReport() {
    // Create printable content
    const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Department Report - Emma-Health Center</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h1 { color: #2c3e50; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
                .header { text-align: center; margin-bottom: 30px; }
                .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #666; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Emma-Health Center</h1>
                <h2>Department Report</h2>
                <p>Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Department Name</th>
                        <th>Department Head</th>
                        <th>Staff</th>
                        <th>Beds</th>
                        <th>Status</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    ${departments.map(dept => `
                        <tr>
                            <td>${dept.code}</td>
                            <td>${dept.name}</td>
                            <td>${dept.head}</td>
                            <td>${dept.staff}</td>
                            <td>${dept.beds}</td>
                            <td>${dept.status}</td>
                            <td>${dept.location}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            
            <div class="footer">
                <p>Total Departments: ${departments.length} | Total Staff: ${departments.reduce((sum, d) => sum + d.staff, 0)}</p>
                <p>Confidential - Internal Use Only</p>
            </div>
        </body>
        </html>
    `;
    
    // Open print window
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 500);
}

function checkExpiringDepartments() {
    showLoading('Checking for expiring departments...');
    
    setTimeout(() => {
        if (expiringDepartments.length === 0) {
            showNotification('No departments are expiring soon', 'success');
        } else {
            showNotification(`Found ${expiringDepartments.length} departments expiring soon`, 'warning');
            // Scroll to expiring section
            document.getElementById('expiringDepts').scrollIntoView({ behavior: 'smooth' });
        }
        hideLoading();
    }, 1000);
}

function viewAllDepartments() {
    // Create modal with all departments in grid view
    const modalHTML = `
        <div class="dept-modal active" id="allDeptsModal">
            <div class="modal-content" style="max-width: 1000px;">
                <div class="modal-header">
                    <h3>All Departments (${departments.length})</h3>
                    <button class="modal-close" onclick="closeModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="department-grid">
                        ${departments.map(dept => `
                            <div class="department-card">
                                <div class="dept-card-header">
                                    <h4 class="dept-card-title">${dept.name}</h4>
                                    <span class="dept-card-code">${dept.code}</span>
                                </div>
                                <div class="dept-card-info">
                                    <div class="dept-info-row">
                                        <span class="dept-info-label">Head:</span>
                                        <span class="dept-info-value">${dept.head}</span>
                                    </div>
                                    <div class="dept-info-row">
                                        <span class="dept-info-label">Location:</span>
                                        <span class="dept-info-value">${dept.location}</span>
                                    </div>
                                    <div class="dept-info-row">
                                        <span class="dept-info-label">Staff:</span>
                                        <span class="dept-info-value">${dept.staff}</span>
                                    </div>
                                    <div class="dept-info-row">
                                        <span class="dept-info-label">Beds:</span>
                                        <span class="dept-info-value">${dept.beds}</span>
                                    </div>
                                    <div class="dept-info-row">
                                        <span class="dept-info-label">Status:</span>
                                        <span class="dept-info-value dept-status ${dept.status}">${dept.status}</span>
                                    </div>
                                </div>
                                <div class="dept-card-actions">
                                    <button class="btn btn-sm btn-outline" onclick="viewDepartment(${dept.id}); closeModal();">View</button>
                                    <button class="btn btn-sm btn-primary" onclick="editDepartment(${dept.id}); closeModal();">Edit</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline" onclick="closeModal()">Close</button>
                    <button class="btn btn-primary" onclick="exportDepartmentReport(); closeModal();">Export Report</button>
                </div>
            </div>
        </div>
    `;
    
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);
    document.body.style.overflow = 'hidden';
}

// ===== Backup & Restore JavaScript =====

// Sample backup data
let backups = [
    { id: 1, date: '2024-01-15 02:00', type: 'Full', size: '1.2 GB', status: 'completed', encrypted: false },
    { id: 2, date: '2024-01-14 02:00', type: 'Incremental', size: '450 MB', status: 'completed', encrypted: true },
    { id: 3, date: '2024-01-13 02:00', type: 'Full', size: '1.3 GB', status: 'completed', encrypted: false },
    { id: 4, date: '2024-01-12 02:00', type: 'Incremental', size: '380 MB', status: 'completed', encrypted: false },
    { id: 5, date: '2024-01-11 02:00', type: 'Full', size: '1.1 GB', status: 'failed', encrypted: false }
];

let backupSchedules = [
    { id: 1, name: 'Daily Backup', frequency: 'daily', time: '02:00', nextRun: 'Tomorrow, 02:00', enabled: true },
    { id: 2, name: 'Weekly Full Backup', frequency: 'weekly', time: '02:00', nextRun: 'Sunday, 02:00', enabled: true },
    { id: 3, name: 'Monthly Archive', frequency: 'monthly', time: '03:00', nextRun: 'Feb 1, 03:00', enabled: false }
];

// Initialize Backup System
function initializeBackupSystem() {
    loadBackups();
    loadBackupSchedules();
    populateBackupDropdown();
    updateBackupStats();
}

function loadBackups() {
    const tbody = document.getElementById('backupTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    backups.forEach(backup => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="backup-checkbox" value="${backup.id}"></td>
            <td>${backup.date}</td>
            <td>${backup.type}</td>
            <td>${backup.size}</td>
            <td><span class="backup-status ${backup.status}">${backup.status}</span></td>
            <td>
                <button class="btn-icon" onclick="viewBackupDetails(${backup.id})" title="View Details">
                    <i class="fas fa-info-circle"></i>
                </button>
                ${backup.status === 'completed' ? `
                <button class="btn-icon" onclick="downloadBackup(${backup.id})" title="Download">
                    <i class="fas fa-download"></i>
                </button>
                ` : ''}
                <button class="btn-icon btn-danger" onclick="deleteBackup(${backup.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function loadBackupSchedules() {
    const container = document.getElementById('scheduleList');
    if (!container) return;
    
    container.innerHTML = '';
    
    backupSchedules.forEach(schedule => {
        const item = document.createElement('div');
        item.className = 'schedule-item';
        item.innerHTML = `
            <div class="schedule-header">
                <div class="schedule-name">${schedule.name}</div>
                <div class="schedule-next">Next: ${schedule.nextRun}</div>
            </div>
            <div class="schedule-details">
                <div class="schedule-detail">
                    <div class="schedule-detail-label">Frequency</div>
                    <div class="schedule-detail-value">${schedule.frequency}</div>
                </div>
                <div class="schedule-detail">
                    <div class="schedule-detail-label">Time</div>
                    <div class="schedule-detail-value">${schedule.time}</div>
                </div>
                <div class="schedule-detail">
                    <div class="schedule-detail-label">Status</div>
                    <div class="schedule-detail-value">
                        <span class="badge ${schedule.enabled ? 'badge-success' : 'badge-secondary'}">
                            ${schedule.enabled ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                </div>
            </div>
            <div class="schedule-actions">
                <button class="btn btn-sm ${schedule.enabled ? 'btn-warning' : 'btn-success'}" 
                        onclick="toggleSchedule(${schedule.id})">
                    <i class="fas fa-power-off"></i> ${schedule.enabled ? 'Disable' : 'Enable'}
                </button>
                <button class="btn btn-sm btn-outline" onclick="editSchedule(${schedule.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-sm btn-outline" onclick="runScheduleNow(${schedule.id})">
                    <i class="fas fa-play"></i> Run Now
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteSchedule(${schedule.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        container.appendChild(item);
    });
}

function populateBackupDropdown() {
    const dropdown = document.getElementById('backupSelect');
    if (!dropdown) return;
    
    dropdown.innerHTML = '<option value="">Choose backup to restore...</option>';
    
    backups.filter(b => b.status === 'completed').forEach(backup => {
        const option = document.createElement('option');
        option.value = backup.id;
        option.textContent = `${backup.date} - ${backup.type} (${backup.size})`;
        dropdown.appendChild(option);
    });
}

function updateBackupStats() {
    const totalBackups = document.getElementById('totalBackups');
    const backupSize = document.getElementById('backupSize');
    const lastBackup = document.getElementById('lastBackup');
    
    if (totalBackups) totalBackups.textContent = backups.length;
    
    if (backupSize) {
        // Calculate total size
        const totalSize = backups.reduce((sum, backup) => {
            const size = parseFloat(backup.size);
            const unit = backup.size.split(' ')[1];
            if (unit === 'GB') return sum + size * 1000;
            return sum + size;
        }, 0);
        
        backupSize.textContent = totalSize >= 1000 ? 
            `${(totalSize / 1000).toFixed(1)} GB` : 
            `${totalSize.toFixed(0)} MB`;
    }
    
    if (lastBackup) {
        const latest = backups[0];
        lastBackup.textContent = latest ? latest.date : 'Never';
    }
}

// Backup Functions
function saveBackupSettings() {
    const frequency = document.getElementById('backupFrequency').value;
    const customFrequency = document.getElementById('customFrequency').value;
    const time = document.getElementById('backupTime').value;
    const retention = document.getElementById('retentionPeriod').value;
    const compress = document.getElementById('compressBackup').checked;
    const encrypt = document.getElementById('encryptBackup').checked;
    const password = document.getElementById('encryptionPassword').value;
    const storageLocation = document.querySelector('input[name="storageLocation"]:checked').value;
    const includeDatabase = document.getElementById('includeDatabase').checked;
    const includeFiles = document.getElementById('includeFiles').checked;
    const includeLogs = document.getElementById('includeLogs').checked;
    const includeConfig = document.getElementById('includeConfig').checked;
    
    // Validate encryption password
    if (encrypt && !password) {
        showNotification('Please enter encryption password', 'error');
        return;
    }
    
    // Save settings (in real app, send to server)
    const settings = {
        frequency: frequency === 'custom' ? customFrequency : frequency,
        time,
        retention,
        compress,
        encrypt,
        password: encrypt ? password : null,
        storageLocation,
        includes: {
            database: includeDatabase,
            files: includeFiles,
            logs: includeLogs,
            config: includeConfig
        }
    };
    
    console.log('Backup settings saved:', settings);
    showNotification('Backup settings saved successfully!', 'success');
}

function createBackupNow() {
    if (!confirm('Create a backup now? This may take several minutes depending on data size.')) {
        return;
    }
    
    // Show progress
    const progressHTML = `
        <div class="backup-progress">
            <div class="progress-header">
                <div class="progress-title">Creating Backup...</div>
                <div class="progress-percentage">0%</div>
            </div>
            <div class="progress-bar-container">
                <div class="progress-bar" id="backupProgressBar"></div>
            </div>
            <div class="progress-info">
                <span class="progress-stage">Initializing...</span>
                <span class="progress-time">Estimated: 2 minutes</span>
            </div>
        </div>
    `;
    
    const backupSection = document.querySelector('.backup-list');
    if (backupSection) {
        backupSection.insertAdjacentHTML('beforebegin', progressHTML);
    }
    
    // Simulate backup process
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        const progressBar = document.getElementById('backupProgressBar');
        const percentage = document.querySelector('.progress-percentage');
        const stage = document.querySelector('.progress-stage');
        
        if (progressBar) progressBar.style.width = `${progress}%`;
        if (percentage) percentage.textContent = `${progress}%`;
        
        // Update stage
        if (progress <= 30) {
            if (stage) stage.textContent = 'Backing up database...';
        } else if (progress <= 60) {
            if (stage) stage.textContent = 'Backing up files...';
        } else if (progress <= 90) {
            if (stage) stage.textContent = 'Compressing backup...';
        } else {
            if (stage) stage.textContent = 'Finalizing...';
        }
        
        // Complete
        if (progress >= 100) {
            clearInterval(interval);
            
            // Add new backup
            const newBackup = {
                id: backups.length + 1,
                date: new Date().toLocaleString(),
                type: 'Manual',
                size: '1.4 GB',
                status: 'completed',
                encrypted: document.getElementById('encryptBackup').checked
            };
            
            backups.unshift(newBackup);
            loadBackups();
            populateBackupDropdown();
            updateBackupStats();
            
            // Remove progress bar
            const progressBarElement = document.querySelector('.backup-progress');
            if (progressBarElement) {
                setTimeout(() => {
                    progressBarElement.remove();
                }, 1000);
            }
            
            showNotification('Backup created successfully!', 'success');
        }
    }, 500);
}

function scheduleBackup() {
    const frequency = document.getElementById('backupFrequency').value;
    const time = document.getElementById('backupTime').value;
    const name = prompt('Enter a name for this backup schedule:', `${frequency.charAt(0).toUpperCase() + frequency.slice(1)} Backup`);
    
    if (!name) return;
    
    // Calculate next run
    const now = new Date();
    let nextRun = new Date();
    nextRun.setHours(time.split(':')[0], time.split(':')[1], 0, 0);
    
    if (nextRun <= now) {
        nextRun.setDate(nextRun.getDate() + (frequency === 'daily' ? 1 : frequency === 'weekly' ? 7 : 30));
    }
    
    const schedule = {
        id: backupSchedules.length + 1,
        name,
        frequency,
        time,
        nextRun: nextRun.toLocaleDateString() + ', ' + time,
        enabled: true
    };
    
    backupSchedules.push(schedule);
    loadBackupSchedules();
    
    showNotification(`Backup schedule "${name}" created successfully!`, 'success');
}

function testRestore() {
    const selectedBackup = document.getElementById('backupSelect').value;
    
    if (!selectedBackup) {
        showNotification('Please select a backup to test', 'error');
        return;
    }
    
    if (!confirm('Test restore on a temporary database? This will not affect live data.')) {
        return;
    }
    
    showLoading('Testing restore process...');
    
    setTimeout(() => {
        // Simulate test restore
        const validationResult = document.createElement('div');
        validationResult.className = 'validation-result success';
        validationResult.innerHTML = `
            <strong>✓ Test Restore Successful</strong>
            <p>Backup integrity verified. All files and database tables restored successfully in test environment.</p>
            <p><strong>Duration:</strong> 45 seconds</p>
            <p><strong>Data Verified:</strong> 100%</p>
        `;
        
        // Add to page
        const restoreForm = document.querySelector('.restore-form');
        if (restoreForm) {
            restoreForm.appendChild(validationResult);
            setTimeout(() => {
                validationResult.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
        
        hideLoading();
        showNotification('Test restore completed successfully!', 'success');
    }, 3000);
}

function initiateRestore() {
    const selectedBackup = document.getElementById('backupSelect').value;
    const restoreType = document.querySelector('input[name="restoreType"]:checked').value;
    const password = document.getElementById('restorePassword').value;
    
    if (!selectedBackup) {
        showNotification('Please select a backup to restore', 'error');
        return;
    }
    
    // Check if backup is encrypted
    const backup = backups.find(b => b.id == selectedBackup);
    if (backup.encrypted && !password) {
        showNotification('This backup is encrypted. Please enter the restore password.', 'error');
        document.getElementById('restorePasswordGroup').style.display = 'block';
        return;
    }
    
    if (!confirm('WARNING: This will overwrite ALL current data. Are you absolutely sure you want to proceed?')) {
        return;
    }
    
    // Double confirmation for production
    if (!confirm('FINAL WARNING: This action cannot be undone. Type "RESTORE" to confirm.')) {
        return;
    }
    
    const confirmation = prompt('Type "RESTORE" to confirm system restoration:');
    if (confirmation !== 'RESTORE') {
        showNotification('Restore cancelled', 'warning');
        return;
    }
    
    showLoading('Initiating system restore...');
    
    // Simulate restore process
    setTimeout(() => {
        showNotification('System restore initiated. The system will restart in 60 seconds.', 'warning');
        
        // Countdown timer
        let seconds = 60;
        const countdown = setInterval(() => {
            showLoading(`System will restart in ${seconds} seconds...`);
            seconds--;
            
            if (seconds < 0) {
                clearInterval(countdown);
                hideLoading();
                showNotification('Restore complete! System restarting...', 'success');
                
                // In real app, redirect to maintenance page
                setTimeout(() => {
                    window.location.href = 'maintenance.html';
                }, 2000);
            }
        }, 1000);
    }, 2000);
}

function viewBackupHistory() {
    // Create modal with detailed backup history
    const modalHTML = `
        <div class="dept-modal active" id="backupHistoryModal">
            <div class="modal-content" style="max-width: 1000px;">
                <div class="modal-header">
                    <h3>Backup History</h3>
                    <button class="modal-close" onclick="closeModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="table-responsive">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Date & Time</th>
                                    <th>Type</th>
                                    <th>Size</th>
                                    <th>Status</th>
                                    <th>Encrypted</th>
                                    <th>Duration</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${backups.map(backup => `
                                    <tr>
                                        <td>${backup.date}</td>
                                        <td>${backup.type}</td>
                                        <td>${backup.size}</td>
                                        <td><span class="backup-status ${backup.status}">${backup.status}</span></td>
                                        <td>${backup.encrypted ? '✓ Yes' : 'No'}</td>
                                        <td>${backup.duration || '--'}</td>
                                        <td>
                                            <button class="btn btn-sm btn-outline" onclick="viewBackupDetails(${backup.id})">
                                                <i class="fas fa-info-circle"></i> Details
                                            </button>
                                            ${backup.status === 'completed' ? `
                                            <button class="btn btn-sm btn-outline" onclick="downloadBackup(${backup.id})">
                                                <i class="fas fa-download"></i> Download
                                            </button>
                                            ` : ''}
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="backup-summary mt-4">
                        <h5>Summary</h5>
                        <div class="summary-stats">
                            <div class="stat">
                                <div class="stat-value">${backups.length}</div>
                                <div class="stat-label">Total Backups</div>
                            </div>
                            <div class="stat">
                                <div class="stat-value">${backups.filter(b => b.status === 'completed').length}</div>
                                <div class="stat-label">Successful</div>
                            </div>
                            <div class="stat">
                                <div class="stat-value">${backups.filter(b => b.status === 'failed').length}</div>
                                <div class="stat-label">Failed</div>
                            </div>
                            <div class="stat">
                                <div class="stat-value">${backups.filter(b => b.encrypted).length}</div>
                                <div class="stat-label">Encrypted</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline" onclick="closeModal()">Close</button>
                    <button class="btn btn-primary" onclick="exportBackupHistory()">
                        <i class="fas fa-download"></i> Export History
                    </button>
                </div>
            </div>
        </div>
    `;
    
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);
    document.body.style.overflow = 'hidden';
}

function viewBackupDetails(id) {
    const backup = backups.find(b => b.id === id);
    if (!backup) return;
    
    alert(`
        Backup Details:
        
        Date & Time: ${backup.date}
        Type: ${backup.type}
        Size: ${backup.size}
        Status: ${backup.status}
        Encrypted: ${backup.encrypted ? 'Yes' : 'No'}
        Location: /backups/${id}.tar.gz
        Created By: System Administrator
        Checksum: ${backup.checksum || 'N/A'}
        
        ${backup.status === 'failed' ? 'Error: Disk space insufficient' : 'Backup verified and ready for restore.'}
    `);
}

function downloadBackup(id) {
    showLoading('Preparing backup for download...');
    
    setTimeout(() => {
        // Simulate download
        const backup = backups.find(b => b.id === id);
        if (backup) {
            showNotification(`Downloading ${backup.type} backup (${backup.size})...`, 'info');
            
            // In real app, trigger actual download
            const link = document.createElement('a');
            link.href = '#';
            link.download = `backup-${backup.date.replace(/[:\s]/g, '-')}.tar.gz`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        
        hideLoading();
    }, 2000);
}

function deleteBackup(id) {
    if (!confirm('Delete this backup? This action cannot be undone.')) {
        return;
    }
    
    const index = backups.findIndex(b => b.id === id);
    if (index !== -1) {
        backups.splice(index, 1);
        loadBackups();
        populateBackupDropdown();
        updateBackupStats();
        showNotification('Backup deleted successfully', 'success');
    }
}

function cleanupOldBackups() {
    const retention = document.getElementById('retentionPeriod').value;
    
    if (retention === 'forever') {
        showNotification('Retention is set to "forever". No backups will be deleted.', 'info');
        return;
    }
    
    if (confirm(`Delete backups older than ${retention} days?`)) {
        showLoading('Cleaning up old backups...');
        
        setTimeout(() => {
            // Simulate cleanup
            const deletedCount = Math.floor(Math.random() * 3) + 1;
            showNotification(`Cleaned up ${deletedCount} old backup(s)`, 'success');
            hideLoading();
        }, 1500);
    }
}

function toggleSchedule(id) {
    const schedule = backupSchedules.find(s => s.id === id);
    if (schedule) {
        schedule.enabled = !schedule.enabled;
        loadBackupSchedules();
        showNotification(`Schedule ${schedule.enabled ? 'enabled' : 'disabled'}`, 'success');
    }
}

function editSchedule(id) {
    const schedule = backupSchedules.find(s => s.id === id);
    if (!schedule) return;
    
    const newName = prompt('Edit schedule name:', schedule.name);
    if (newName) {
        schedule.name = newName;
        loadBackupSchedules();
        showNotification('Schedule updated', 'success');
    }
}

function runScheduleNow(id) {
    const schedule = backupSchedules.find(s => s.id === id);
    if (!schedule) return;
    
    if (confirm(`Run "${schedule.name}" now?`)) {
        createBackupNow();
    }
}

function deleteSchedule(id) {
    if (!confirm('Delete this backup schedule?')) {
        return;
    }
    
    const index = backupSchedules.findIndex(s => s.id === id);
    if (index !== -1) {
        backupSchedules.splice(index, 1);
        loadBackupSchedules();
        showNotification('Schedule deleted', 'success');
    }
}

function validateBackup() {
    const selectedBackup = document.getElementById('backupSelect').value;
    
    if (!selectedBackup) {
        showNotification('Please select a backup to validate', 'error');
        return;
    }
    
    showLoading('Validating backup integrity...');
    
    setTimeout(() => {
        const backup = backups.find(b => b.id == selectedBackup);
        const validationResult = document.createElement('div');
        
        if (backup.status === 'completed') {
            validationResult.className = 'validation-result success';
            validationResult.innerHTML = `
                <strong>✓ Backup Validation Passed</strong>
                <p>All files are intact and the backup is ready for restore.</p>
                <p><strong>Checksum:</strong> Verified</p>
                <p><strong>Size:</strong> ${backup.size} (matches original)</p>
                <p><strong>Created:</strong> ${backup.date}</p>
            `;
        } else {
            validationResult.className = 'validation-result error';
            validationResult.innerHTML = `
                <strong>✗ Backup Validation Failed</strong>
                <p>This backup is corrupted or incomplete.</p>
                <p><strong>Error:</strong> File integrity check failed</p>
                <p><strong>Recommendation:</strong> Delete this backup and create a new one</p>
            `;
        }
        
        // Add to page
        const restoreForm = document.querySelector('.restore-form');
        if (restoreForm) {
            const existingValidation = restoreForm.querySelector('.validation-result');
            if (existingValidation) {
                existingValidation.remove();
            }
            restoreForm.appendChild(validationResult);
            setTimeout(() => {
                validationResult.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
        
        hideLoading();
        showNotification('Backup validation complete', backup.status === 'completed' ? 'success' : 'error');
    }, 2000);
}

function exportBackupHistory() {
    // Create CSV data
    const headers = ['Date', 'Type', 'Size', 'Status', 'Encrypted', 'Duration'];
    const csvData = [
        headers.join(','),
        ...backups.map(backup => [
            `"${backup.date}"`,
            backup.type,
            backup.size,
            backup.status,
            backup.encrypted ? 'Yes' : 'No',
            backup.duration || 'N/A'
        ].join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup-history-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('Backup history exported successfully', 'success');
}

// Initialize when tab is clicked
document.addEventListener('DOMContentLoaded', function() {
    // Add tab buttons to the tab header (if not already present)
    const tabHeader = document.querySelector('.tab-header');
    if (tabHeader && !document.querySelector('[data-tab="departments"]')) {
        tabHeader.innerHTML += `
            <button class="tab-btn" data-tab="departments">Departments</button>
            <button class="tab-btn" data-tab="backup">Backup & Restore</button>
        `;
    }
    
    // Tab switching logic
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Update active tab button
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Show selected tab content
            const targetTab = document.getElementById(tabId + 'Tab');
            if (targetTab) {
                targetTab.classList.add('active');
                
                // Initialize specific tab
                if (tabId === 'departments') {
                    initializeDepartmentManagement();
                } else if (tabId === 'backup') {
                    initializeBackupSystem();
                }
            }
        });
    });
});

// Make functions globally available
window.exportDepartmentReport = exportDepartmentReport;
window.printDepartmentReport = printDepartmentReport;
window.checkExpiringDepartments = checkExpiringDepartments;
window.viewAllDepartments = viewAllDepartments;
window.createBackupNow = createBackupNow;
window.scheduleBackup = scheduleBackup;
window.testRestore = testRestore;
window.initiateRestore = initiateRestore;
window.validateBackup = validateBackup;
window.resetDepartmentForm = resetDepartmentForm;