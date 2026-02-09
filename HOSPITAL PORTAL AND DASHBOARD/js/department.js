// Department Data
const departments = {
    cardiology: {
        name: "Cardiology Department",
        icon: "fas fa-heartbeat",
        description: "Our Cardiology Department specializes in the diagnosis and treatment of heart diseases. We offer comprehensive cardiovascular care including preventive cardiology, interventional procedures, cardiac surgery, and rehabilitation.",
        headDoctor: {
            name: "Dr. Michael Chen",
            qualification: "MD, FACC, FSCAI",
            experience: "15+ years in interventional cardiology",
            email: "mchen@emmahealth.center",
            phone: "Ext. 201"
        },
        address: "Adelabu Junction, Along Ajar Express Road, Ikeja, Lagos State",
        services: [
            "Echocardiography",
            "Cardiac Catheterization",
            "Angioplasty & Stenting",
            "Pacemaker Implantation",
            "Cardiac Rehabilitation",
            "Preventive Cardiology"
        ],
        staff: [
            { name: "Dr. Michael Chen", role: "Head of Department", specialty: "Interventional Cardiology" },
            { name: "Dr. Sarah Johnson", role: "Senior Cardiologist", specialty: "Electrophysiology" },
            { name: "Dr. Robert Kim", role: "Cardiologist", specialty: "Heart Failure" },
            { name: "Nurse Patricia Brown", role: "Cardiac Nurse", specialty: "Post-op Care" },
            { name: "Dr. James Wilson", role: "Cardiac Surgeon", specialty: "Bypass Surgery" },
            { name: "Dr. Lisa Wang", role: "Pediatric Cardiologist", specialty: "Congenital Heart" }
        ],
        facilities: [
            "State-of-the-art Cath Lab",
            "24/7 Cardiac Monitoring",
            "Non-invasive Testing Suite",
            "Cardiac Rehabilitation Center"
        ]
    },
    
    neurology: {
        name: "Neurology Department",
        icon: "fas fa-brain",
        description: "The Neurology Department provides advanced care for disorders of the brain, spinal cord, and nervous system. Our team of specialists uses cutting-edge technology for accurate diagnosis and treatment.",
        headDoctor: {
            name: "Dr. Robert Williams",
            qualification: "MD, FAAN",
            experience: "12+ years in neurology",
            email: "rwilliams@emmahealth.center",
            phone: "Ext. 203"
        },
        address: "Level 4, North Wing, Emma-Health Center, 123 Medical Plaza, Springfield Ibadan Oyo State",
        services: [
            "EEG & EMG Studies",
            "Stroke Management",
            "Epilepsy Treatment",
            "Movement Disorder Clinic",
            "Neuro-imaging",
            "Cognitive Rehabilitation"
        ],
        staff: [
            { name: "Dr. Robert Williams", role: "Head of Department", specialty: "Stroke Neurology" },
            { name: "Dr. Amanda Chen", role: "Neurologist", specialty: "Epilepsy" },
            { name: "Dr. David Park", role: "Neurologist", specialty: "Movement Disorders" },
            { name: "Nurse Sarah Miller", role: "Neuro Nurse", specialty: "Stroke Unit" },
            { name: "Dr. Thomas Reed", role: "Neurosurgeon", specialty: "Brain Surgery" }
        ],
        facilities: [
            "Advanced Neuro-imaging Center",
            "Epilepsy Monitoring Unit",
            "Stroke Care Unit",
            "Neurological Rehabilitation"
        ]
    },
    
    pediatrics: {
        name: "Pediatrics Department",
        icon: "fas fa-baby",
        description: "Our Pediatrics Department provides comprehensive healthcare for infants, children, and adolescents. We focus on preventive care, early intervention, and family-centered treatment approaches.",
        headDoctor: {
            name: "Dr. Jennifer Lee",
            qualification: "MD, FAAP",
            experience: "10+ years in pediatrics",
            email: "jlee@emmahealth.center",
            phone: "Ext. 205"
        },
        address: "Level 1, Children's Wing, Emma-Health Center, 123 Medical Plaza, Springfield Abuja",
        services: [
            "Well-child Checkups",
            "Vaccinations",
            "Developmental Assessments",
            "Pediatric Emergency Care",
            "Adolescent Medicine",
            "Child Psychology" 
        ],
        staff: [
            { name: "Dr. Jennifer Lee", role: "Head of Department", specialty: "General Pediatrics" },
            { name: "Dr. Maria Garcia", role: "Pediatrician", specialty: "Neonatology" },
            { name: "Dr. Brian Thompson", role: "Pediatric Cardiologist", specialty: "Congenital Heart" },
            { name: "Nurse Emily Wilson", role: "Pediatric Nurse", specialty: "NICU" },
            { name: "Dr. Susan Brown", role: "Child Psychologist", specialty: "Developmental Disorders" }
        ],
        facilities: [
            "Child-friendly Examination Rooms",
            "Pediatric Emergency Department",
            "Neonatal Intensive Care Unit",
            "Play Therapy Room"
        ]
    },
    
    emergency: {
        name: "Emergency Department",
        icon: "fas fa-ambulance",
        description: "The Emergency Department operates 24/7 providing immediate care for critical and life-threatening conditions. Our trauma center is equipped to handle all types of medical emergencies.",
        headDoctor: {
            name: "Dr. Richard Davis",
            qualification: "MD, FACEP",
            experience: "18+ years in emergency medicine",
            email: "rdavis@emmahealth.center",
            phone: "Ext. 911"
        },
        address: "Ground Floor, East Wing (Emergency Entrance), Emma-Health Center, 123 Medical Plaza, Springfield",
        services: [
            "Trauma Care",
            "Cardiac Emergencies",
            "Stroke Management",
            "Pediatric Emergencies",
            "Toxicology",
            "Emergency Surgery"
        ],
        staff: [
            { name: "Dr. Richard Davis", role: "Head of Emergency", specialty: "Trauma Medicine" },
            { name: "Dr. Karen White", role: "Emergency Physician", specialty: "Pediatric Emergency" },
            { name: "Dr. Mark Taylor", role: "Emergency Physician", specialty: "Cardiac Emergencies" },
            { name: "Nurse Patricia Brown", role: "Charge Nurse", specialty: "Trauma Triage" },
            { name: "Dr. Lisa Chen", role: "Emergency Surgeon", specialty: "Acute Care Surgery" }
        ],
        facilities: [
            "Level 1 Trauma Center",
            "Helipad Access",
            "Rapid Diagnostic Lab",
            "Emergency Operating Rooms"
        ]
    },
    
    pharmacy: {
        name: "Pharmacy Department",
        icon: "fas fa-pills",
        description: "Our Pharmacy Department provides comprehensive medication management services including prescription dispensing, medication therapy management, and patient counseling.",
        headDoctor: {
            name: "Dr. David Wilson",
            qualification: "PharmD, BCPS",
            experience: "8+ years in hospital pharmacy",
            email: "dwilson@emmahealth.center",
            phone: "Ext. 210"
        },
        address: "Ground Floor, Main Building, Emma-Health Center, 123 Medical Plaza, Springfield",
        services: [
            "Prescription Dispensing",
            "Medication Therapy Management",
            "IV Compounding",
            "Oncology Pharmacy",
            "Patient Counseling",
            "Drug Information"
        ],
        staff: [
            { name: "Dr. David Wilson", role: "Chief Pharmacist", specialty: "Clinical Pharmacy" },
            { name: "Sarah Johnson", role: "Staff Pharmacist", specialty: "Oncology" },
            { name: "Michael Brown", role: "Staff Pharmacist", specialty: "IV Compounding" },
            { name: "Lisa Chen", role: "Pharmacy Technician", specialty: "Inventory Management" },
            { name: "Robert Davis", role: "Clinical Pharmacist", specialty: "Infectious Diseases" }
        ],
        facilities: [
            "Automated Dispensing System",
            "Clean Room for IV Compounding",
            "Temperature-controlled Storage",
            "Patient Counseling Area"
        ]
    },
    
    radiology: {
        name: "Radiology Department",
        icon: "fas fa-x-ray",
        description: "The Radiology Department offers advanced diagnostic imaging services using state-of-the-art technology. Our team provides accurate and timely interpretations to support clinical decision-making.",
        headDoctor: {
            name: "Dr. Susan Miller",
            qualification: "MD, FRCR",
            experience: "14+ years in diagnostic radiology",
            email: "smiller@emmahealth.center",
            phone: "Ext. 215"
        },
        address: "Level 2, Diagnostic Wing, Emma-Health Center, 123 Medical Plaza, Springfield",
        services: [
            "MRI Scanning",
            "CT Scanning",
            "X-ray Imaging",
            "Ultrasound",
            "Mammography",
            "Interventional Radiology"
        ],
        staff: [
            { name: "Dr. Susan Miller", role: "Head of Radiology", specialty: "Neuroradiology" },
            { name: "Dr. James Wilson", role: "Radiologist", specialty: "Body Imaging" },
            { name: "Dr. Amanda Chen", role: "Radiologist", specialty: "Breast Imaging" },
            { name: "John Davis", role: "Radiology Technician", specialty: "MRI" },
            { name: "Sarah Brown", role: "Radiology Technician", specialty: "CT" }
        ],
        facilities: [
            "3T MRI Scanner",
            "256-slice CT Scanner",
            "Digital Mammography Suite",
            "Ultrasound Imaging Rooms"
        ]
    }
};

// Open Department Modal
function openDepartmentModal(deptId) {
    const dept = departments[deptId];
    const modal = document.getElementById('departmentModal');
    const title = document.getElementById('deptModalTitle');
    const body = document.getElementById('deptModalBody');
    
    title.textContent = dept.name;
    
    body.innerHTML = `
        <div class="dept-header">
            <div class="dept-header-icon">
                <i class="${dept.icon}"></i>
            </div>
            <div class="dept-info">
                <h2>${dept.name}</h2>
                <p class="dept-description">${dept.description}</p>
            </div>
        </div>
        
        <div class="dept-details-grid">
            <div class="dept-detail-card">
                <h4><i class="fas fa-user-md"></i> Head of Department</h4>
                <div class="head-doctor-info">
                    <h5>${dept.headDoctor.name}</h5>
                    <p><strong>Qualification:</strong> ${dept.headDoctor.qualification}</p>
                    <p><strong>Experience:</strong> ${dept.headDoctor.experience}</p>
                    <p><strong>Contact:</strong> ${dept.headDoctor.email} | ${dept.headDoctor.phone}</p>
                </div>
            </div>
            
            <div class="dept-detail-card">
                <h4><i class="fas fa-map-marker-alt"></i> Department Location</h4>
                <p>${dept.address}</p>
                <button class="btn btn-outline" style="margin-top: 10px;">
                    <i class="fas fa-directions"></i> Get Directions
                </button>
            </div>
        </div>
        
        <div class="dept-detail-card">
            <h4><i class="fas fa-stethoscope"></i> Services Offered</h4>
            <div class="services-list">
                ${dept.services.map(service => `
                    <span class="service-tag">${service}</span>
                `).join('')}
            </div>
        </div>
        
        <div class="dept-detail-card">
            <h4><i class="fas fa-users"></i> Department Staff</h4>
            <ul class="dept-staff-list">
                ${dept.staff.map(member => `
                    <li>
                        <div>
                            <strong>${member.name}</strong>
                            <div class="staff-role">${member.role}</div>
                        </div>
                        <span>${member.specialty}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
        
        <div class="dept-detail-card">
            <h4><i class="fas fa-clinic-medical"></i> Facilities & Equipment</h4>
            <div class="facilities-list">
                ${dept.facilities.map(facility => `
                    <div class="facility-item">
                        <i class="fas fa-check-circle" style="color: var(--secondary);"></i>
                        <span>${facility}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="dept-address">
            <h4><i class="fas fa-bullhorn"></i> Message from Head of Department</h4>
            <p>"Welcome to the ${dept.name.split(' ')[0]} Department. Our team is committed to providing the highest quality care using the latest medical advancements. We believe in a patient-centered approach and work collaboratively to ensure the best outcomes for our patients."</p>
            <p><strong>- ${dept.headDoctor.name}</strong></p>
        </div>
        
        <style>
            .services-list {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                margin-top: 15px;
            }
            
            .service-tag {
                background-color: rgba(26, 115, 232, 0.1);
                color: var(--primary);
                padding: 5px 15px;
                border-radius: 20px;
                font-size: 14px;
            }
            
            .facility-item {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 10px;
                padding: 8px 0;
                border-bottom: 1px solid var(--light-gray);
            }
            
            .head-doctor-info h5 {
                margin-bottom: 10px;
                color: var(--primary);
            }
            
            .head-doctor-info p {
                margin-bottom: 5px;
                color: var(--gray);
            }
        </style>
    `;
    
    modal.classList.add('active');
}

// Close Modal
function closeDepartmentModal() {
    document.getElementById('departmentModal').classList.remove('active');
}

// Initialize Department Modal
document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.getElementById('closeDeptModal');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeDepartmentModal);
    }
    
    const modal = document.getElementById('departmentModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeDepartmentModal();
            }
        });
    }
    
    // Add CSS for services list
    const style = document.createElement('style');
    style.textContent = `
        .services-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 15px;
        }
        
        .service-tag {
            background-color: rgba(26, 115, 232, 0.1);
            color: var(--primary);
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 14px;
        }
        
        .facility-item {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
            padding: 8px 0;
            border-bottom: 1px solid var(--light-gray);
        }
    `;
    document.head.appendChild(style);
});