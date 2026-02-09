// Admin Dashboard Modules JavaScript

// ========== USER MANAGEMENT ==========
function initializeUserManagement() {
    console.log('User Management module initialized');
    
    // Load user data
    loadUsers();
    
    // Setup user management event listeners
    setupUserManagementEvents();
}

function loadUsers() {
    // Sample user data
    const users = [
        {
            id: 'USR001',
            firstName: 'Michael',
            lastName: 'Chen',
            email: 'mchen@emmahealth.center',
            role: 'doctor',
            department: 'Cardiology',
            status: 'active',
            lastLogin: '2023-11-15 09:42',
            avatar: 'MC'
        },
        {
            id: 'USR002',
            firstName: 'Patricia',
            lastName: 'Brown',
            email: 'pbrown@emmahealth.center',
            role: 'nurse',
            department: 'Emergency',
            status: 'active',
            lastLogin: '2023-11-15 08:15',
            avatar: 'PB'
        },
        {
            id: 'USR003',
            firstName: 'David',
            lastName: 'Wilson',
            email: 'dwilson@emmahealth.center',
            role: 'pharmacist',
            department: 'Pharmacy',
            status: 'active',
            lastLogin: '2023-11-14 14:30',
            avatar: 'DW'
        },
        {
            id: 'USR004',
            firstName: 'Sarah',
            lastName: 'Johnson',
            email: 'sjohnson@emmahealth.center',
            role: 'doctor',
            department: 'Pediatrics',
            status: 'active',
            lastLogin: '2023-11-14 11:22',
            avatar: 'SJ'
        },
        {
            id: 'USR005',
            firstName: 'Robert',
            lastName: 'Williams',
            email: 'rwilliams@emmahealth.center',
            role: 'doctor',
            department: 'Neurology',
            status: 'inactive',
            lastLogin: '2023-10-28 16:45',
            avatar: 'RW'
        },
        {
            id: 'USR006',
            firstName: 'Jennifer',
            lastName: 'Lee',
            email: 'jlee@emmahealth.center',
            role: 'doctor',
            department: 'Orthopedics',
            status: 'active',
            lastLogin: '2023-11-15 10:18',
            avatar: 'JL'
        },
        {
            id: 'USR007',
            firstName: 'Thomas',
            lastName: 'Anderson',
            email: 'tanderson@patient.com',
            role: 'patient',
            department: '',
            status: 'active',
            lastLogin: '2023-11-14 19:22',
            avatar: 'TA'
        },
        {
            id: 'USR008',
            firstName: 'Emily',
            lastName: 'Wilson',
            email: 'ewilson@emmahealth.center',
            role: 'nurse',
            department: 'Pediatrics',
            status: 'pending',
            lastLogin: 'Never',
            avatar: 'EW'
        }
    ];
    
    const tableBody = document.getElementById('usersTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = users.map(user => `
        <tr data-user-id="${user.id}">
            <td><input type="checkbox" class="user-checkbox" value="${user.id}"></td>
            <td>${user.id}</td>
            <td>
                <div class="user-cell">
                    <div class="user-avatar-sm">${user.avatar}</div>
                    <div>${user.firstName} ${user.lastName}</div>
                </div>
            </td>
            <td><span class="role-badge role-${user.role}">${user.role}</span></td>
            <td>${user.department || '-'}</td>
            <td>${user.email}</td>
            <td><span class="status-badge status-${user.status}">${user.status}</span></td>
            <td>${user.lastLogin}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon" onclick="editUser('${user.id}')" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon" onclick="resetUserPassword('${user.id}')" title="Reset Password">
                        <i class="fas fa-key"></i>
                    </button>
               // Add to your existing navigation handling
document.querySelectorAll('.sidebar-menu a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        
        // Hide all sections
        document.querySelectorAll('.dashboard-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Update URL
        window.location.hash = targetId;
        
        // Initialize specific sections
        if (targetId === 'securitySettings' || targetId === 'systemMonitor') {
            initializeSecurityMonitor();
        }
    });
}); 