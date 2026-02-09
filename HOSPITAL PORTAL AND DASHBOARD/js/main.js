// Main JavaScript File for Emma-Health Center

// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const contactForm = document.getElementById('contactForm');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadFacilities();
    loadStaff();
    loadTestimonials();
    setupEventListeners();
});

// Initialize Application
function initializeApp() {
    // Set current year in footer
    document.querySelector('.copyright p').innerHTML = `&copy; ${new Date().getFullYear()} Emma-Health Center. All rights reserved. | HIPAA Compliant | Protected by Advanced Security Protocols`;
    
    // Initialize mobile menu
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-links') && !e.target.closest('.mobile-menu-btn')) {
            navLinks.classList.remove('active');
        }
    });
    
    // Initialize smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or if it's a department modal link
            if (href === '#' || href.includes('javascript')) return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Close mobile menu if open
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Set active nav link based on scroll position
    window.addEventListener('scroll', setActiveNavLink);
}

// Set active navigation link based on scroll position
function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Setup Event Listeners
function setupEventListeners() {
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // In a real application, you would send this to a server
            console.log('Contact form submitted:', data);
            
            // Show success message
            alert('Thank you for your message. We will get back to you soon!');
            
            // Reset form
            this.reset();
        });
    }
    
    // Learn More button
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Department modal
    const deptModal = document.getElementById('departmentModal');
    const closeDeptModal = document.getElementById('closeDeptModal');
    
    if (deptModal && closeDeptModal) {
        closeDeptModal.addEventListener('click', () => {
            deptModal.classList.remove('active');
        });
        
        deptModal.addEventListener('click', (e) => {
            if (e.target === deptModal) {
                deptModal.classList.remove('active');
            }
        });
    }
}

// Load Facilities Data
function loadFacilities() {
    const facilitiesContainer = document.querySelector('.facilities-container');
    if (!facilitiesContainer) return;
    
    const facilities = [
        {
            id: 1,
            name: "Emergency Department",
            description: "24/7 emergency care with advanced trauma center and rapid response teams.",
            icon: "fas fa-procedures",
            image: "https://images.unsplash.com/photo-1586773860418-dc22f8b874bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        {
            id: 2,
            name: "Diagnostic Imaging",
            description: "Advanced MRI, CT scan, X-ray, and ultrasound facilities for accurate diagnosis.",
            icon: "fas fa-microscope",
            image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        {
            id: 3,
            name: "Cardiology Unit",
            description: "Comprehensive cardiac care with cutting-edge intervention facilities.",
            icon: "fas fa-heartbeat",
            image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        {
            id: 4,
            name: "Maternity & Pediatrics",
            description: "Family-centered care for mothers and children with modern birthing suites.",
            icon: "fas fa-baby",
            image: "https://images.unsplash.com/photo-1512675828443-4f454c42253c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        }
    ];
    
    facilitiesContainer.innerHTML = facilities.map(facility => `
        <div class="facility-card">
            <div class="facility-img">
                <img src="${facility.image}" alt="${facility.name}" loading="lazy">
            </div>
            <div class="facility-content">
                <h3>${facility.name}</h3>
                <p>${facility.description}</p>
                <div style="margin-top: 15px; display: flex; align-items: center; gap: 10px;">
                    <i class="${facility.icon}" style="color: var(--primary);"></i>
                    <span style="color: var(--gray); font-size: 14px;">State-of-the-art facility</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Load Staff Data
function loadStaff() {
    const staffContainer = document.querySelector('.staff-container');
    if (!staffContainer) return;
    
    const staff = [
        {
            id: 1,
            name: "Dr. Michael Chen",
            role: "Cardiologist",
            specialty: "Interventional Cardiology",
            experience: "15+ years",
            image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        {
            id: 2,
            name: "Dr. Sarah Johnson",
            role: "Pediatrician",
            specialty: "Child Development",
            experience: "12+ years",
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        {
            id: 3,
            name: "Nurse Patricia Brown",
            role: "Head Nurse",
            specialty: "Patient Care",
            experience: "20+ years",
            image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1167&q=80"
        },
        {
            id: 4,
            name: "Dr. Robert Williams",
            role: "Neurologist",
            specialty: "Neurological Disorders",
            experience: "18+ years",
            image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        }
    ];
    
    staffContainer.innerHTML = staff.map(member => `
        <div class="staff-card">
            <div class="staff-img">
                <img src="${member.image}" alt="${member.name}" loading="lazy">
            </div>
            <div class="staff-info">
                <h3>${member.name}</h3>
                <div class="role">${member.role}</div>
                <p>Specialty: ${member.specialty}</p>
                <p style="color: var(--gray); font-size: 14px; margin-top: 10px;">
                    <i class="fas fa-briefcase"></i> ${member.experience} experience
                </p>
            </div>
        </div>
    `).join('');
}

// Load Testimonials
function loadTestimonials() {
    const testimonialsContainer = document.querySelector('.testimonials-container');
    if (!testimonialsContainer) return;
    
    const testimonials = [
        {
            id: 1,
            content: "The care I received at Emma-Health Center was exceptional. The staff was attentive, and the doctors took time to explain everything. The Jealth AI system helped identify my condition quickly, leading to effective treatment.",
            author: "James Wilson",
            role: "Cardiac patient",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        {
            id: 2,
            content: "From registration to discharge, my experience was seamless. The integration of technology with compassionate care is impressive. The patient portal made it easy to access my records and communicate with my doctor.",
            author: "Maria Garcia",
            role: "Maternity patient",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
        },
        {
            id: 3,
            content: "The Cardiology Department saved my life. Dr. Chen's expertise and the advanced facilities made all the difference. I'm grateful for the excellent care and follow-up support.",
            author: "Robert Smith",
            role: "Heart surgery patient",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
        }
    ];
    
    testimonialsContainer.innerHTML = testimonials.map(testimonial => `
        <div class="testimonial">
            <div class="testimonial-content">
                "${testimonial.content}"
            </div>
            <div class="testimonial-author">
                <div class="author-img">
                    <img src="${testimonial.image}" alt="${testimonial.author}" loading="lazy">
                </div>
                <div class="author-info">
                    <h4>${testimonial.author}</h4>
                    <p>${testimonial.role}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// Show Notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Add styles if not already added
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: var(--radius);
                box-shadow: var(--shadow);
                z-index: 3000;
                max-width: 350px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 15px;
                animation: slideIn 0.3s ease;
            }
            
            .notification-success {
                background-color: #d4edda;
                color: #155724;
                border-left: 4px solid var(--secondary);
            }
            
            .notification-error {
                background-color: #f8d7da;
                color: #721c24;
                border-left: 4px solid var(--danger);
            }
            
            .notification-info {
                background-color: #d1ecf1;
                color: #0c5460;
                border-left: 4px solid var(--primary);
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 20px;
                cursor: pointer;
                color: inherit;
                line-height: 1;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Export Report Function
function exportReport(format, data, filename) {
    // In a real application, this would generate and download the file
    // For demo purposes, we'll show a notification
    
    let message = '';
    switch(format) {
        case 'pdf':
            message = 'PDF report generated successfully. In a real system, the file would download with password protection.';
            break;
        case 'word':
            message = 'Word document generated successfully. File is password protected for security.';
            break;
        case 'excel':
            message = 'Excel spreadsheet exported successfully. Contains password protection for sensitive data.';
            break;
        default:
            message = 'Report exported successfully.';
    }
    
    showNotification(message, 'success');
    
    // Simulate file download (in real app, this would be actual file generation)
    console.log(`Exporting ${format} report:`, {
        filename: filename || `report-${new Date().toISOString().split('T')[0]}.${format}`,
        data: data,
        timestamp: new Date().toISOString(),
        security: '256-bit AES encryption with password protection'
    });
}

// Password Protected Export
function exportWithPassword(format, data, filename) {
    // Show password modal
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Password Protected Export</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <p>This report contains sensitive information. Please enter a password to protect the exported file.</p>
                
                <div class="form-group">
                    <label for="exportPassword">Password</label>
                    <input type="password" id="exportPassword" class="form-control" placeholder="Enter password" required>
                </div>
                
                <div class="form-group">
                    <label for="confirmExportPassword">Confirm Password</label>
                    <input type="password" id="confirmExportPassword" class="form-control" placeholder="Confirm password" required>
                </div>
                
                <div class="form-group">
                    <button class="btn btn-primary" id="confirmExportBtn" style="width: 100%;">
                        <i class="fas fa-file-export"></i> Generate Protected File
                    </button>
                </div>
                
                <div class="security-badge" style="justify-content: center; margin-top: 15px;">
                    <i class="fas fa-lock"></i>
                    <span>256-bit AES Encryption</span>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    modal.querySelector('#confirmExportBtn').addEventListener('click', () => {
        const password = modal.querySelector('#exportPassword').value;
        const confirmPassword = modal.querySelector('#confirmExportPassword').value;
        
        if (!password || !confirmPassword) {
            showNotification('Please enter and confirm password', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            showNotification('Passwords do not match', 'error');
            return;
        }
        
        if (password.length < 8) {
            showNotification('Password must be at least 8 characters', 'error');
            return;
        }
        
        // Close modal
        modal.remove();
        
        // Export with password
        exportReport(format, data, filename);
        
        // Show success message with security details
        showNotification(`File exported with password protection. Password: ${'*'.repeat(password.length)}`, 'success');
    });
}
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