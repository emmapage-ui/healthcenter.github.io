// Doctor Dashboard JavaScript

// Medical record functions
function openMedicalRecord(patientId) {
    // Simulate fetching patient record
    const patientRecord = {
        id: patientId,
        name: 'James Wilson',
        dob: '1975-03-15',
        gender: 'Male',
        bloodType: 'O+',
        allergies: ['Penicillin', 'Sulfa drugs'],
        conditions: ['Hypertension', 'Type 2 Diabetes'],
        medications: ['Lisinopril 10mg daily', 'Metformin 850mg twice daily'],
        lastVisit: '2023-10-25',
        vitals: {
            bp: '130/85',
            hr: 72,
            temp: 98.6,
            weight: 185,
            height: '5\'10"',
            bmi: 26.5
        },
        notes: [
            { date: '2023-10-25', doctor: 'Dr. Chen', note: 'Patient reports good BP control. Continue current regimen.' },
            { date: '2023-09-20', doctor: 'Dr. Chen', note: 'Increased Metformin to 850mg due to elevated A1C.' }
        ],
        labResults: [
            { date: '2023-10-20', test: 'A1C', result: '6.8%', normal: '<5.7%' },
            { date: '2023-10-20', test: 'Cholesterol', result: '210 mg/dL', normal: '<200 mg/dL' }
        ]
    };
    
    // Display in modal
    displayRecordModal(patientRecord);
}

function displayRecordModal(record) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 800px;">
            <div class="modal-header">
                <h2>Medical Record: ${record.name}</h2>
                <button class="close-modal" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="patient-summary">
                    <h3>Patient Information</h3>
                    <div class="info-grid">
                        <div><strong>ID:</strong> ${record.id}</div>
                        <div><strong>DOB:</strong> ${record.dob}</div>
                        <div><strong>Gender:</strong> ${record.gender}</div>
                        <div><strong>Blood Type:</strong> ${record.bloodType}</div>
                    </div>
                </div>
                
                <div class="section">
                    <h3>Current Conditions</h3>
                    <div class="conditions-list">
                        ${record.conditions.map(condition => `<span class="condition-tag">${condition}</span>`).join('')}
                    </div>
                </div>
                
                <div class="section">
                    <h3>Current Medications</h3>
                    <ul class="medication-list">
                        ${record.medications.map(med => `<li>${med}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="section">
                    <h3>Vital Signs</h3>
                    <div class="vitals-grid">
                        ${Object.entries(record.vitals).map(([key, value]) => `
                            <div class="vital-item">
                                <strong>${key.toUpperCase()}:</strong> ${value}
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="section">
                    <h3>Clinical Notes</h3>
                    <div class="notes-list">
                        ${record.notes.map(note => `
                            <div class="note-item">
                                <div class="note-header">
                                    <strong>${note.date}</strong> - ${note.doctor}
                                </div>
                                <div class="note-content">${note.note}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="modal-footer">
                    <button class="btn btn-outline" onclick="addClinicalNote('${record.id}')">
                        <i class="fas fa-plus"></i> Add Note
                    </button>
                    <button class="btn btn-primary" onclick="exportPatientRecord('${record.id}')">
                        <i class="fas fa-download"></i> Export Record
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Prescription functions
function writePrescription(patientId) {
    // Fetch patient info
    const patient = {
        id: patientId,
        name: 'James Wilson'
    };
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h2>New Prescription</h2>
                <button class="close-modal" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <form id="prescriptionForm">
                    <div class="form-group">
                        <label>Patient</label>
                        <input type="text" class="form-control" value="${patient.name} (${patient.id})" readonly>
                    </div>
                    
                    <div class="form-group">
                        <label>Medication *</label>
                        <select id="medicationSelect" class="form-control" required>
                            <option value="">Select medication</option>
                            <option value="Lisinopril">Lisinopril</option>
                            <option value="Metformin">Metformin</option>
                            <option value="Atorvastatin">Atorvastatin</option>
                            <option value="Amoxicillin">Amoxicillin</option>
                        </select>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Dosage *</label>
                            <input type="text" id="dosage" class="form-control" placeholder="e.g., 10mg" required>
                        </div>
                        <div class="form-group">
                            <label>Frequency *</label>
                            <select id="frequency" class="form-control" required>
                                <option value="">Select frequency</option>
                                <option value="Once daily">Once daily</option>
                                <option value="Twice daily">Twice daily</option>
                                <option value="Three times daily">Three times daily</option>
                                <option value="As needed">As needed</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Instructions</label>
                        <textarea id="instructions" class="form-control" rows="3" placeholder="Take with food. Avoid alcohol..."></textarea>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Duration</label>
                            <input type="text" id="duration" class="form-control" placeholder="e.g., 30 days">
                        </div>
                        <div class="form-group">
                            <label>Refills</label>
                            <select id="refills" class="form-control">
                                <option value="0">No refills</option>
                                <option value="1">1 refill</option>
                                <option value="2">2 refills</option>
                                <option value="3">3 refills</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>DEA Number (for controlled substances)</label>
                        <input type="text" id="deaNumber" class="form-control" placeholder="Enter if required">
                    </div>
                    
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancel</button>
                        <button type="submit" class="btn btn-primary">Send to Pharmacy</button>
                        <button type="button" class="btn btn-secondary" onclick="printPrescription()">
                            <i class="fas fa-print"></i> Print
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handle form submission
    modal.querySelector('#prescriptionForm').addEventListener('submit', function(e) {
        e.preventDefault();
        submitPrescription(patientId, this);
    });
}

function submitPrescription(patientId, form) {
    const prescriptionData = {
        patientId: patientId,
        medication: form.querySelector('#medicationSelect').value,
        dosage: form.querySelector('#dosage').value,
        frequency: form.querySelector('#frequency').value,
        instructions: form.querySelector('#instructions').value,
        duration: form.querySelector('#duration').value,
        refills: form.querySelector('#refills').value,
        deaNumber: form.querySelector('#deaNumber').value,
        prescribedBy: JSON.parse(localStorage.getItem('currentUser')).name,
        date: new Date().toISOString()
    };
    
    // Send to server
    console.log('Submitting prescription:', prescriptionData);
    
    // Close modal
    form.closest('.modal').remove();
    
    alert('Prescription sent to pharmacy successfully!');
}

// Appointment management
function scheduleAppointment(patientId, date, time) {
    const appointment = {
        patientId: patientId,
        date: date,
        time: time,
        doctor: JSON.parse(localStorage.getItem('currentUser')).name,
        type: 'Consultation',
        status: 'scheduled'
    };
    
    // Save appointment
    console.log('Scheduling appointment:', appointment);
    
    // Update UI
    updateScheduleDisplay(appointment);
    
    return appointment;
}

function updateScheduleDisplay(appointment) {
    const scheduleContainer = document.querySelector('.schedule-timeline');
    if (scheduleContainer) {
        const appointmentElement = document.createElement('div');
        appointmentElement.className = 'schedule-item';
        appointmentElement.innerHTML = `
            <div class="schedule-time">${appointment.time}</div>
            <div class="schedule-details">
                <div class="patient-name">${appointment.patientId}</div>
                <div class="appointment-type">${appointment.type}</div>
            </div>
            <div class="schedule-status status-${appointment.status}">
                ${appointment.status}
            </div>
        `;
        scheduleContainer.appendChild(appointmentElement);
    }
}

// Lab test orders
function orderLabTest(patientId, tests) {
    const labOrder = {
        patientId: patientId,
        tests: tests,
        orderedBy: JSON.parse(localStorage.getItem('currentUser')).name,
        date: new Date().toISOString(),
        priority: 'routine' // or 'stat' for urgent
    };
    
    console.log('Ordering lab tests:', labOrder);
    
    // Show confirmation
    alert(`Lab order placed for ${tests.length} test(s). Results will be available in 24-48 hours.`);
    
    return labOrder;
}

// Telemedicine functions
function startTeleconsult(patientId) {
    const consult = {
        patientId: patientId,
        doctor: JSON.parse(localStorage.getItem('currentUser')).name,
        startTime: new Date().toISOString(),
        roomId: `room-${Date.now()}`,
        status: 'active'
    };
    
    // Start video consult
    console.log('Starting teleconsult:', consult);
    
    // In real app, this would open video interface
    window.open(`/teleconsult/${consult.roomId}`, '_blank');
    
    return consult;
}

// Export functions with password protection
function exportPatientRecord(patientId, format = 'pdf') {
    const password = prompt(`Enter password to protect ${format.toUpperCase()} export:`);
    if (!password) return;
    
    if (password.length < 8) {
        alert('Password must be at least 8 characters!');
        return;
    }
    
    // Generate export
    const exportData = {
        patientId: patientId,
        format: format,
        timestamp: new Date().toISOString(),
        passwordProtected: true,
        doctor: JSON.parse(localStorage.getItem('currentUser')).name
    };
    
    console.log('Exporting patient record:', exportData);
    
    // Simulate download
    setTimeout(() => {
        alert(`${format.toUpperCase()} file generated successfully with password protection.`);
    }, 1000);
}

// Jealth AI integration
function analyzeWithJealthAI(patientData) {
    const aiAnalysis = {
        patientId: patientData.id,
        analysisDate: new Date().toISOString(),
        insights: [
            'Patient shows improvement in blood pressure control',
            'Recommend continuing current medication regimen',
            'Schedule follow-up in 3 months',
            'Consider adding lifestyle modification counseling'
        ],
        riskFactors: [
            { factor: 'Hypertension', risk: 'moderate' },
            { factor: 'Diabetes', risk: 'moderate' },
            { factor: 'Age', risk: 'low' }
        ],
        recommendations: [
            'Monitor blood pressure weekly',
            'Check A1C in 3 months',
            'Continue medication adherence'
        ]
    };
    
    // Display AI insights
    displayAIAnalysis(aiAnalysis);
    
    return aiAnalysis;
}

function displayAIAnalysis(analysis) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 700px;">
            <div class="modal-header">
                <h2><i class="fas fa-robot"></i> Jealth AI Analysis</h2>
                <button class="close-modal" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="ai-header">
                    <div class="ai-patient">Patient: ${analysis.patientId}</div>
                    <div class="ai-date">Analysis Date: ${new Date(analysis.analysisDate).toLocaleDateString()}</div>
                </div>
                
                <div class="section">
                    <h3><i class="fas fa-lightbulb"></i> Key Insights</h3>
                    <ul class="ai-insights">
                        ${analysis.insights.map(insight => `<li>${insight}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="section">
                    <h3><i class="fas fa-exclamation-triangle"></i> Risk Assessment</h3>
                    <div class="risk-factors">
                        ${analysis.riskFactors.map(risk => `
                            <div class="risk-factor risk-${risk.risk}">
                                <strong>${risk.factor}</strong>
                                <span class="risk-level">${risk.risk}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="section">
                    <h3><i class="fas fa-clipboard-check"></i> Recommendations</h3>
                    <ul class="recommendations">
                        ${analysis.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-footer">
                    <button class="btn btn-primary" onclick="exportAIAnalysis('${analysis.patientId}')">
                        <i class="fas fa-download"></i> Export Analysis
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Initialize doctor dashboard
function initializeDoctorDashboard() {
    console.log('Doctor dashboard initialized');
    
    // Load doctor's schedule
    loadDoctorSchedule();
    
    // Load patient list
    loadDoctorPatients();
    
    // Set up event listeners
    setupDoctorEventListeners();
    
    // Check for urgent notifications
    checkUrgentNotifications();
}

function loadDoctorSchedule() {
    // Simulate fetching schedule
    const schedule = [
        { time: '9:00 AM', patient: 'James Wilson', type: 'Follow-up', status: 'confirmed' },
        { time: '10:30 AM', patient: 'Maria Garcia', type: 'New Patient', status: 'confirmed' },
        { time: '2:00 PM', patient: 'Robert Smith', type: 'Consultation', status: 'pending' }
    ];
    
    // Update UI
    const container = document.querySelector('.schedule-timeline');
    if (container) {
        container.innerHTML = schedule.map(appt => `
            <div class="schedule-item">
                <div class="schedule-time">${appt.time}</div>
                <div class="schedule-details">
                    <div class="patient-name">${appt.patient}</div>
                    <div class="appointment-type">${appt.type}</div>
                </div>
                <div class="schedule-status status-${appt.status}">
                    ${appt.status}
                </div>
                <button class="btn-icon" onclick="viewAppointment('${appt.patient}')">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        `).join('');
    }
}

function loadDoctorPatients() {
    // Simulate fetching patients
    const patients = [
        { id: 'P00123', name: 'James Wilson', lastVisit: '2023-10-25', condition: 'Hypertension' },
        { id: 'P00124', name: 'Maria Garcia', lastVisit: '2023-10-24', condition: 'Diabetes' },
        { id: 'P00125', name: 'Robert Smith', lastVisit: '2023-10-23', condition: 'Arrhythmia' }
    ];
    
    // Update UI
    const container = document.getElementById('patientList');
    if (container) {
        container.innerHTML = patients.map(patient => `
            <div class="patient-card">
                <div class="patient-info">
                    <h4>${patient.name}</h4>
                    <p>ID: ${patient.id}</p>
                    <p>Last Visit: ${patient.lastVisit}</p>
                    <p>Condition: ${patient.condition}</p>
                </div>
                <div class="patient-actions">
                    <button class="btn btn-outline" onclick="openMedicalRecord('${patient.id}')">
                        <i class="fas fa-file-medical"></i> View Record
                    </button>
                    <button class="btn btn-primary" onclick="writePrescription('${patient.id}')">
                        <i class="fas fa-prescription"></i> Prescribe
                    </button>
                </div>
            </div>
        `).join('');
    }
}

function setupDoctorEventListeners() {
    // Add event listeners for doctor-specific actions
    document.querySelectorAll('.quick-action').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.dataset.action;
            handleQuickAction(action);
        });
    });
}

function handleQuickAction(action) {
    switch(action) {
        case 'prescription':
            writePrescription();
            break;
        case 'lab-order':
            orderLabTest();
            break;
        case 'teleconsult':
            startTeleconsult();
            break;
        case 'medical-note':
            addMedicalNote();
            break;
    }
}

function checkUrgentNotifications() {
    // Check for urgent lab results, messages, etc.
    const urgentItems = [
        { type: 'lab', message: 'Abnormal lab result for patient P00123', priority: 'high' },
        { type: 'message', message: 'Urgent message from nursing staff', priority: 'medium' }
    ];
    
    if (urgentItems.length > 0) {
        showUrgentAlert(urgentItems);
    }
}

function showUrgentAlert(items) {
    const alertContainer = document.createElement('div');
    alertContainer.className = 'urgent-alert';
    alertContainer.innerHTML = `
        <div class="alert-header">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Urgent Notifications (${items.length})</h3>
            <button class="close-alert" onclick="this.closest('.urgent-alert').remove()">&times;</button>
        </div>
        <div class="alert-items">
            ${items.map(item => `
                <div class="alert-item alert-${item.priority}">
                    <i class="fas fa-${item.type === 'lab' ? 'flask' : 'envelope'}"></i>
                    <span>${item.message}</span>
                </div>
            `).join('')}
        </div>
    `;
    
    document.body.appendChild(alertContainer);
}

// Call initialization when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDoctorDashboard);
} else {
    initializeDoctorDashboard();
}