// Appointment Booking System JavaScript

// Global variables
let currentStep = 1;
let selectedDate = null;
let selectedTime = null;
let selectedDoctor = null;
let selectedDepartment = null;
let appointmentType = 'consultation';

// Sample data for doctors and schedules
const doctorsData = {
    cardiology: [
        {
            id: 'DOC001',
            name: 'Dr. Michael Olatunji',
            specialty: 'Cardiologist',
            experience: '15+ years',
            rating: 4.8,
            availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
            consultationFee: 150,
            schedule: {
                '2023-11-15': ['09:00', '10:30', '14:00', '15:30'],
                '2023-11-16': ['10:00', '11:30', '16:00'],
                '2023-11-17': ['09:30', '11:00', '14:30'],
                '2023-11-20': ['08:30', '10:00', '13:30', '15:00']
            }
        },
        {
            id: 'DOC002',
            name: 'Dr. Sarah Johnson',
            specialty: 'Cardiologist',
            experience: '12+ years',
            rating: 4.7,
            availableDays: ['Monday', 'Thursday', 'Friday'],
            consultationFee: 140,
            schedule: {
                '2023-11-15': ['11:00', '13:00', '16:30'],
                '2023-11-16': ['09:00', '12:00', '14:00'],
                '2023-11-20': ['10:30', '13:30', '15:30']
            }
        }
    ],
    neurology: [
        {
            id: 'DOC003',
            name: 'Dr. Mrs James Brown',
            specialty: 'Neurologist',
            experience: '18+ years',
            rating: 4.9,
            availableDays: ['Tuesday', 'Wednesday', 'Thursday'],
            consultationFee: 160,
            schedule: {
                '2023-11-15': ['10:00', '13:00', '15:00'],
                '2023-11-16': ['09:30', '11:30', '14:30'],
                '2023-11-17': ['08:00', '12:00', '16:00']
            }
        }
    ],
    pediatrics: [
        {
            id: 'DOC004',
            name: 'Dr. Ayoola Emmanuel',
            specialty: 'Pediatrician',
            experience: '10+ years',
            rating: 4.6,
            availableDays: ['Monday', 'Wednesday', 'Friday'],
            consultationFee: 120,
            schedule: {
                '2023-11-15': ['09:00', '11:00', '14:00', '16:00'],
                '2023-11-16': ['10:00', '12:00', '15:00'],
                '2023-11-17': ['08:30', '13:30', '15:30']
            }
        }
    ],
    orthopedics: [
        {
            id: 'DOC005',
            name: 'Dr. David Wilson',
            specialty: 'Orthopedic Surgeon',
            experience: '14+ years',
            rating: 4.7,
            availableDays: ['Tuesday', 'Thursday', 'Saturday'],
            consultationFee: 180,
            schedule: {
                '2023-11-15': ['09:30', '11:30', '14:30'],
                '2023-11-16': ['10:00', '13:00', '16:00'],
                '2023-11-18': ['09:00', '12:00', '14:00']
            }
        }
    ]
};

// Appointment type pricing
const appointmentPricing = {
    consultation: { base: 100, multiplier: 1.0 },
    followup: { base: 80, multiplier: 0.8 },
    emergency: { base: 200, multiplier: 2.0 },
    checkup: { base: 120, multiplier: 1.2 }
};

// Initialize the appointment system
function initializeAppointmentSystem() {
    console.log('Appointment system initialized');
    
    // Set today as default selected date
    const today = new Date();
    selectedDate = formatDate(today);
    
    // Update UI
    updateAppointmentSummary();
    updateStepIndicator();
}

// Format date to YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Format date for display
function formatDateDisplay(dateStr) {
    const date = new Date(dateStr);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Load doctors based on selected department
function loadDoctors() {
    const departmentSelect = document.getElementById('department');
    const doctorSelect = document.getElementById('doctor');
    const selectedDept = departmentSelect.value;
    
    // Clear existing options
    doctorSelect.innerHTML = '<option value="">Choose Doctor</option>';
    
    if (!selectedDept) {
        document.getElementById('doctorInfo').classList.remove('active');
        return;
    }
    
    selectedDepartment = selectedDept;
    
    // Get doctors for selected department
    const doctors = doctorsData[selectedDept] || [];
    
    // Populate doctor dropdown
    doctors.forEach(doctor => {
        const option = document.createElement('option');
        option.value = doctor.id;
        option.textContent = `${doctor.name} - ${doctor.specialty} ($${doctor.consultationFee})`;
        doctorSelect.appendChild(option);
    });
    
    // Update summary
    updateAppointmentSummary();
}

// Load doctor information when selected
function loadDoctorSchedule() {
    const doctorSelect = document.getElementById('doctor');
    const doctorId = doctorSelect.value;
    
    if (!doctorId) {
        document.getElementById('doctorInfo').classList.remove('active');
        return;
    }
    
    // Find the selected doctor
    const department = selectedDepartment;
    const doctors = doctorsData[department] || [];
    selectedDoctor = doctors.find(doc => doc.id === doctorId);
    
    if (selectedDoctor) {
        displayDoctorInfo(selectedDoctor);
        loadAvailableTimeSlots();
    }
    
    // Update summary
    updateAppointmentSummary();
}

// Display doctor information
function displayDoctorInfo(doctor) {
    const doctorInfo = document.getElementById('doctorInfo');
    
    // Generate initials for avatar
    const names = doctor.name.split(' ');
    const initials = names.map(name => name[0]).join('');
    
    doctorInfo.innerHTML = `
        <div class="doctor-header">
            <div class="doctor-avatar">${initials}</div>
            <div>
                <h4>${doctor.name}</h4>
                <div class="doctor-specialty">${doctor.specialty}</div>
                <div class="doctor-rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                    <span class="rating-value">${doctor.rating}</span>
                    <span>(${doctor.experience} experience)</span>
                </div>
            </div>
        </div>
        <div class="doctor-schedule">
            <h5>Available Days:</h5>
            <div class="schedule-item">
                <span>Days:</span>
                <span>${doctor.availableDays.join(', ')}</span>
            </div>
            <div class="schedule-item">
                <span>Consultation Fee:</span>
                <span>$${doctor.consultationFee}</span>
            </div>
        </div>
    `;
    
    doctorInfo.classList.add('active');
}

// Generate calendar
function generateCalendar(year, month) {
    const calendar = document.getElementById('calendar');
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const today = new Date();
    
    // Clear calendar
    calendar.innerHTML = '';
    
    // Add day headers
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        calendar.appendChild(dayElement);
    });
    
    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-date empty';
        calendar.appendChild(emptyCell);
    }
    
    // Add days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const date = new Date(year, month, day);
        const dateStr = formatDate(date);
        const dateElement = document.createElement('div');
        dateElement.className = 'calendar-date';
        dateElement.textContent = day;
        dateElement.dataset.date = dateStr;
        
        // Check if today
        if (date.toDateString() === today.toDateString()) {
            dateElement.classList.add('today');
        }
        
        // Check if selected
        if (dateStr === selectedDate) {
            dateElement.classList.add('selected');
        }
        
        // Check if weekend
        if (date.getDay() === 0 || date.getDay() === 6) {
            dateElement.classList.add('weekend');
        }
        
        // Check if unavailable (more than 30 days in future or in past)
        const daysDiff = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
        if (daysDiff < 0 || daysDiff > 30) {
            dateElement.classList.add('unavailable');
        } else {
            dateElement.addEventListener('click', () => selectDate(dateStr, dateElement));
        }
        
        calendar.appendChild(dateElement);
    }
}

// Select date
function selectDate(dateStr, element) {
    // Remove selected class from all dates
    document.querySelectorAll('.calendar-date').forEach(date => {
        date.classList.remove('selected');
    });
    
    // Add selected class to clicked date
    element.classList.add('selected');
    selectedDate = dateStr;
    
    // Update date display
    document.getElementById('selectedDateDisplay').textContent = formatDateDisplay(dateStr);
    
    // Load available time slots
    loadAvailableTimeSlots();
    
    // Update summary
    updateAppointmentSummary();
}

// Navigate to previous month
function prevMonth() {
    const currentMonthElement = document.getElementById('currentMonth');
    const [month, year] = currentMonthElement.textContent.split(' ');
    const date = new Date(`${month} 1, ${year}`);
    date.setMonth(date.getMonth() - 1);
    
    // Update display
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    currentMonthElement.textContent = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    
    // Regenerate calendar
    generateCalendar(date.getFullYear(), date.getMonth());
}

// Navigate to next month
function nextMonth() {
    const currentMonthElement = document.getElementById('currentMonth');
    const [month, year] = currentMonthElement.textContent.split(' ');
    const date = new Date(`${month} 1, ${year}`);
    date.setMonth(date.getMonth() + 1);
    
    // Update display
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    currentMonthElement.textContent = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    
    // Regenerate calendar
    generateCalendar(date.getFullYear(), date.getMonth());
}

// Load available time slots
function loadAvailableTimeSlots() {
    if (!selectedDoctor || !selectedDate) {
        document.getElementById('timeslots').innerHTML = 
            '<div class="no-slots">Please select a doctor and date first</div>';
        return;
    }
    
    const timeslotsContainer = document.getElementById('timeslots');
    const doctorSchedule = selectedDoctor.schedule[selectedDate] || [];
    
    if (doctorSchedule.length === 0) {
        timeslotsContainer.innerHTML = 
            '<div class="no-slots">No available slots for this date</div>';
        return;
    }
    
    // Clear existing slots
    timeslotsContainer.innerHTML = '';
    
    // Add time slots
    doctorSchedule.forEach(time => {
        const slotElement = document.createElement('div');
        slotElement.className = 'timeslot';
        if (time === selectedTime) {
            slotElement.classList.add('selected');
        }
        slotElement.textContent = time;
        slotElement.dataset.time = time;
        
        slotElement.addEventListener('click', () => selectTimeSlot(time, slotElement));
        timeslotsContainer.appendChild(slotElement);
    });
    
    // Add emergency slots
    const emergencySlot = document.createElement('div');
    emergencySlot.className = 'timeslot emergency';
    emergencySlot.textContent = 'Emergency Only';
    emergencySlot.dataset.time = 'emergency';
    emergencySlot.addEventListener('click', () => selectTimeSlot('emergency', emergencySlot));
    timeslotsContainer.appendChild(emergencySlot);
}

// Select time slot
function selectTimeSlot(time, element) {
    // Remove selected class from all slots
    document.querySelectorAll('.timeslot').forEach(slot => {
        slot.classList.remove('selected');
    });
    
    // Add selected class to clicked slot
    element.classList.add('selected');
    selectedTime = time;
    
    // Update summary
    updateAppointmentSummary();
}

// Navigation between steps
function nextStep(step) {
    // Validate current step before proceeding
    if (!validateStep(currentStep)) {
        return;
    }
    
    goToStep(step);
}

function prevStep(step) {
    goToStep(step);
}

function goToStep(step) {
    // Hide all steps
    document.querySelectorAll('.step-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all step indicators
    document.querySelectorAll('.step').forEach(stepEl => {
        stepEl.classList.remove('active');
    });
    
    // Add active class to current step
    document.getElementById(`step${step}`).classList.add('active');
    
    // Update step indicator
    for (let i = 1; i <= step; i++) {
        document.querySelector(`.step[data-step="${i}"]`).classList.add('active');
    }
    
    currentStep = step;
    updateStepIndicator();
}

// Update step indicator
function updateStepIndicator() {
    document.querySelectorAll('.step').forEach(stepEl => {
        const stepNum = parseInt(stepEl.dataset.step);
        if (stepNum < currentStep) {
            stepEl.classList.add('completed');
            stepEl.classList.remove('active');
        } else if (stepNum === currentStep) {
            stepEl.classList.add('active');
            stepEl.classList.remove('completed');
        } else {
            stepEl.classList.remove('active', 'completed');
        }
    });
}

// Validate current step
function validateStep(step) {
    switch(step) {
        case 1:
            const department = document.getElementById('department').value;
            const doctor = document.getElementById('doctor').value;
            
            if (!department || !doctor) {
                alert('Please select a department and doctor before proceeding.');
                return false;
            }
            return true;
            
        case 2:
            if (!selectedDate || !selectedTime) {
                alert('Please select a date and time for your appointment.');
                return false;
            }
            return true;
            
        case 3:
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            
            if (!firstName || !lastName || !email || !phone) {
                alert('Please fill in all required patient information.');
                return false;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return false;
            }
            
            return true;
            
        case 4:
            const termsAgreed = document.getElementById('termsAgreement').checked;
            if (!termsAgreed) {
                alert('Please agree to the terms and conditions to book your appointment.');
                return false;
            }
            return true;
            
        default:
            return true;
    }
}

// Update appointment summary
function updateAppointmentSummary() {
    // Get selected values
    const typeElement = document.querySelector('.type-option.active');
    const appointmentTypeText = typeElement ? typeElement.querySelector('span').textContent : 'Consultation';
    
    const departmentSelect = document.getElementById('department');
    const departmentText = departmentSelect.options[departmentSelect.selectedIndex]?.text || 'Not selected';
    
    const doctorSelect = document.getElementById('doctor');
    const doctorText = doctorSelect.options[doctorSelect.selectedIndex]?.text || 'Not selected';
    
    // Update sidebar summary
    document.getElementById('sidebarService').textContent = appointmentTypeText;
    document.getElementById('sidebarDoctor').textContent = doctorText.split(' - ')[0] || 'Not selected';
    
    if (selectedDate && selectedTime) {
        const dateObj = new Date(selectedDate);
        const dateStr = dateObj.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
        document.getElementById('sidebarDateTime').textContent = `${dateStr} at ${selectedTime}`;
    } else {
        document.getElementById('sidebarDateTime').textContent = 'Not selected';
    }
    
    // Calculate estimated cost
    let estimatedCost = 0;
    if (selectedDoctor) {
        const typeKey = typeElement ? typeElement.dataset.type : 'consultation';
        const pricing = appointmentPricing[typeKey] || appointmentPricing.consultation;
        estimatedCost = Math.round(selectedDoctor.consultationFee * pricing.multiplier);
    }
    
    document.getElementById('sidebarCost').textContent = `$${estimatedCost}`;
    
    // Update confirmation summary
    if (currentStep === 4) {
        updateConfirmationSummary();
    }
}

// Update confirmation summary
function updateConfirmationSummary() {
    // Appointment details
    const typeElement = document.querySelector('.type-option.active');
    document.getElementById('summaryType').textContent = typeElement ? typeElement.querySelector('span').textContent : 'Consultation';
    
    const departmentSelect = document.getElementById('department');
    document.getElementById('summaryDepartment').textContent = departmentSelect.options[departmentSelect.selectedIndex]?.text || 'Not selected';
    
    const doctorSelect = document.getElementById('doctor');
    document.getElementById('summaryDoctor').textContent = doctorSelect.options[doctorSelect.selectedIndex]?.text.split(' - ')[0] || 'Not selected';
    
    if (selectedDate && selectedTime) {
        const dateObj = new Date(selectedDate);
        const dateStr = dateObj.toLocaleDateString('en-US', { 
            weekday: 'short',
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
        document.getElementById('summaryDateTime').textContent = `${dateStr} at ${selectedTime}`;
    }
    
    // Patient information
    const firstName = document.getElementById('firstName').value || 'Not provided';
    const lastName = document.getElementById('lastName').value || 'Not provided';
    const email = document.getElementById('email').value || 'Not provided';
    const phone = document.getElementById('phone').value || 'Not provided';
    const symptoms = document.getElementById('symptoms').value || 'Not specified';
    
    document.getElementById('summaryName').textContent = `${firstName} ${lastName}`;
    document.getElementById('summaryContact').textContent = `${email} | ${phone}`;
    document.getElementById('summaryReason').textContent = symptoms;
    
    // Insurance information
    const hasInsurance = document.getElementById('insuranceCheck').checked;
    if (hasInsurance) {
        const provider = document.getElementById('insuranceProvider').value || 'Not specified';
        document.getElementById('summaryInsurance').textContent = provider;
    } else {
        document.getElementById('summaryInsurance').textContent = 'Not provided';
    }
}

// Confirm booking
function confirmBooking() {
    if (!validateStep(4)) {
        return;
    }
    
    // Get all appointment details
    const appointmentDetails = {
        type: document.querySelector('.type-option.active')?.dataset.type || 'consultation',
        department: document.getElementById('department').value,
        doctor: document.getElementById('doctor').value,
        doctorName: document.getElementById('doctor').options[document.getElementById('doctor').selectedIndex]?.text.split(' - ')[0],
        date: selectedDate,
        time: selectedTime,
        patient: {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            dob: document.getElementById('dob').value,
            gender: document.getElementById('gender').value,
            symptoms: document.getElementById('symptoms').value
        },
        insurance: document.getElementById('insuranceCheck').checked ? {
            provider: document.getElementById('insuranceProvider').value,
            policyNumber: document.getElementById('policyNumber').value
        } : null,
        timestamp: new Date().toISOString(),
        appointmentId: `APT-${Date.now()}`
    };
    
    // Save to localStorage (in real app, this would go to server)
    saveAppointment(appointmentDetails);
    
    // Show success modal
    showSuccessModal(appointmentDetails);
}

// Save appointment to localStorage
function saveAppointment(appointment) {
    // Get existing appointments
    let appointments = JSON.parse(localStorage.getItem('emmaHealthAppointments')) || [];
    
    // Add new appointment
    appointments.push(appointment);
    
    // Save back to localStorage
    localStorage.setItem('emmaHealthAppointments', JSON.stringify(appointments));
    
    console.log('Appointment saved:', appointment);
}

// Show success modal
function showSuccessModal(appointment) {
    // Update modal with appointment details
    const dateObj = new Date(appointment.date);
    const dateStr = dateObj.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
    });
    
    const appointmentText = `Your appointment with ${appointment.doctorName} is confirmed for ${dateStr} at ${appointment.time}.`;
    document.getElementById('appointmentDetails').textContent = appointmentText;
    
    // Update ticket details
    document.getElementById('ticketDateTime').textContent = `${dateStr} at ${appointment.time}`;
    document.getElementById('ticketDoctor').textContent = appointment.doctorName;
    
    const departmentSelect = document.getElementById('department');
    document.getElementById('ticketDepartment').textContent = departmentSelect.options[departmentSelect.selectedIndex]?.text || 'Not selected';
    
    // Show modal
    document.getElementById('successModal').classList.add('active');
}

// Initialize calendar with current month
window.onload = function() {
    const today = new Date();
    generateCalendar(today.getFullYear(), today.getMonth());
};

// Auto-populate patient info if logged in
function checkLoggedInUser() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.role === 'patient') {
        // Populate form fields with user data
        document.getElementById('firstName').value = currentUser.firstName || '';
        document.getElementById('lastName').value = currentUser.lastName || '';
        document.getElementById('email').value = currentUser.email || '';
        document.getElementById('phone').value = currentUser.phone || '';
        document.getElementById('dob').value = currentUser.dob || '';
        document.getElementById('gender').value = currentUser.gender || '';
        
        // Update summary
        updateAppointmentSummary();
    }
}

// Check if user is logged in when page loads
document.addEventListener('DOMContentLoaded', checkLoggedInUser);

// Export function for appointment data (for admin/reporting)
function exportAppointmentData(format = 'csv') {
    const appointments = JSON.parse(localStorage.getItem('emmaHealthAppointments')) || [];
    
    if (appointments.length === 0) {
        alert('No appointment data to export.');
        return;
    }
    
    let data;
    switch(format) {
        case 'csv':
            data = convertToCSV(appointments);
            break;
        case 'json':
            data = JSON.stringify(appointments, null, 2);
            break;
        case 'excel':
            // In real app, would use a library like SheetJS
            alert('Excel export would be implemented with a proper library.');
            return;
        default:
            data = JSON.stringify(appointments);
    }
    
    // Create download link
    const blob = new Blob([data], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `appointments-${new Date().toISOString().split('T')[0]}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Convert appointments to CSV
function convertToCSV(appointments) {
    const headers = ['Appointment ID', 'Date', 'Time', 'Doctor', 'Department', 'Patient Name', 'Email', 'Phone', 'Status'];
    const rows = appointments.map(apt => [
        apt.appointmentId,
        apt.date,
        apt.time,
        apt.doctorName,
        apt.department,
        `${apt.patient.firstName} ${apt.patient.lastName}`,
        apt.patient.email,
        apt.patient.phone,
        'Confirmed'
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
}

// Send appointment reminder (simulated)
function sendAppointmentReminder(appointmentId) {
    const appointments = JSON.parse(localStorage.getItem('emmaHealthAppointments')) || [];
    const appointment = appointments.find(apt => apt.appointmentId === appointmentId);
    
    if (!appointment) {
        alert('Appointment not found.');
        return;
    }
    
    // In real app, this would send an email/SMS
    console.log('Sending reminder for appointment:', appointment);
    alert(`Reminder sent to ${appointment.patient.email} and ${appointment.patient.phone}`);
}