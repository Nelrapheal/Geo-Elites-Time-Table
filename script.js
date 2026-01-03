// Schedule data with detailed course information
const schedule = {
    mon: [
        { time: "8:00 AM – 10:00 AM", code: "GEY 205", name: "Invertebrate Paleontology" },
        { time: "11:00 AM – 12:00 PM", code: "GEY 203", name: "Introduction To Petrology" },
        { time: "1:00 PM – 3:00 PM", code: "GPH 211", name: "Geophysics" }
    ],
    tue: [
        { time: "8:00 AM – 10:00 AM", code: "GEY 210", name: "Introduction to Structural Geology And Geological Map Interpretation" },
        { time: "10:00 AM – 12:00 PM", code: "GPH 201", name: "Geophysics" },
        { time: "4:00 PM – 6:00 PM", code: "GEY 209", name: "Introduction to Surveying" }
    ],
    wed: [
        { time: "9:00 AM – 10:00 AM", code: "GEY 210", name: "Introduction to Structural Geology And Geological Map Interpretation" },
        { time: "3:00 PM – 5:00 PM", code: "GEY 212", name: "Cartography" }
    ],
    thu: [
        { time: "1:00 PM – 3:00 PM", code: "GEY 207", name: "Principle of Stratigraphy" },
        { time: "1:00 PM – 2:00 PM", code: "CHM 212", name: "Basic Physical Chemistry" }
    ],
    fri: [
        { time: "8:00 AM – 10:00 AM", code: "GEY 211", name: "Geology" },
        { time: "10:00 AM – 12:00 PM", code: "CHM 210", name: "Physical Chemistry" },
        { time: "12:00 PM – 1:00 PM", code: "GEY 203", name: "Introduction To Petrology" }
    ]
};

// Get all DOM elements
const lis = document.getElementById("lis");
const classCard = document.getElementById("classCard");
const bookIcon = document.getElementById("bookIcon");
const statusBadge = document.getElementById("statusBadge");
const statusText = document.getElementById("statusText");
const countdown = document.getElementById("countdown");
const countdownTime = document.getElementById("countdownTime");
const countdownLabel = document.getElementById("countdownLabel");
const courseCode = document.getElementById("courseCode");
const courseTitle = document.getElementById("courseTitle");
const classTime = document.getElementById("classTime");

// Setup day names
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const todayIndex = new Date().getDay();
const todayName = dayNames[todayIndex];

// Display current day name
document.getElementById("day-name").innerText = todayName;

// Display current date
const today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const month = monthNames[today.getMonth()];
const year = today.getFullYear();
document.getElementById("dmy").innerText = `${month} ${day}, ${year}`;

// Update current time display
function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    minutes = minutes.toString().padStart(2, "0");
    document.getElementById("time").innerText = `${hours}:${minutes} ${period}`;
}

updateTime();
setInterval(updateTime, 1000);

// Convert time string (e.g., "8:00 AM") to Date object
function parseTime(timeStr) {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    if (period === 'PM' && hours !== 12) {
        hours += 12;
    }
    if (period === 'AM' && hours === 12) {
        hours = 0;
    }
    
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
}

// Find current or next class
function getCurrentClass(daySchedule) {
    if (!daySchedule) return null;
    
    const now = new Date();
    
    // Check for ongoing class
    for (let classInfo of daySchedule) {
        const [startStr, endStr] = classInfo.time.split(' – ');
        const startTime = parseTime(startStr);
        const endTime = parseTime(endStr);
        
        if (now >= startTime && now < endTime) {
            return { 
                ...classInfo, 
                endTime: endTime, 
                status: 'ongoing' 
            };
        }
    }
    
    // Check for upcoming class
    for (let classInfo of daySchedule) {
        const [startStr] = classInfo.time.split(' – ');
        const startTime = parseTime(startStr);
        
        if (now < startTime) {
            return { 
                ...classInfo, 
                startTime: startTime, 
                status: 'upcoming' 
            };
        }
    }
    
    return null;
}

// Update countdown timer
function updateCountdown(targetTime) {
    const now = new Date();
    const diff = targetTime - now;
    
    if (diff <= 0) {
        checkAndUpdateClassStatus();
        return;
    }
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
        countdownTime.textContent = `${hours}h ${minutes}m`;
    } else {
        countdownTime.textContent = `${minutes}m`;
    }
}

// Global interval variable
let countdownInterval = null;

// Update the class card display
function updateClassCard(currentClass) {
    // Clear any existing countdown interval
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
    
    if (!currentClass) {
        // No class state - white card
        classCard.classList.remove('has-class');
        bookIcon.style.display = 'block';
        statusBadge.style.display = 'none';
        countdown.style.display = 'none';
        courseCode.textContent = 'Weekend Vibes';
        courseTitle.textContent = 'No class schedule today';
        classTime.textContent = 'Enjoy your break';
        return;
    }
    
    // Has class - green gradient card
    classCard.classList.add('has-class');
    bookIcon.style.display = 'none';
    statusBadge.style.display = 'inline-flex';
    courseCode.textContent = currentClass.code;
    courseTitle.textContent = currentClass.name;
    classTime.textContent = currentClass.time;
    countdown.style.display = 'block';
    
    if (currentClass.status === 'ongoing') {
        statusText.textContent = 'CLASS ONGOING';
        countdownLabel.textContent = 'remaining';
        updateCountdown(currentClass.endTime);
        countdownInterval = setInterval(() => updateCountdown(currentClass.endTime), 1000);
    } else {
        statusText.textContent = 'UPCOMING';
        countdownLabel.textContent = 'until start';
        updateCountdown(currentClass.startTime);
        countdownInterval = setInterval(() => updateCountdown(currentClass.startTime), 1000);
    }
}

// Display schedule in timeline
function showLectures(daySchedule) {
    lis.innerHTML = "";
    
    if (!daySchedule || daySchedule.length === 0) {
        lis.classList.add('empty-state');
        lis.textContent = "Nothing on the timeline for today";
        return;
    }
    
    lis.classList.remove('empty-state');
    daySchedule.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${item.code}</strong> - ${item.name}<br><small>${item.time}</small>`;
        lis.appendChild(li);
    });
}

// Main function to check and update class status
function checkAndUpdateClassStatus() {
    const dayKey = todayName.substring(0, 3).toLowerCase();
    const todaySchedule = schedule[dayKey];
    
    if (todaySchedule) {
        const currentClass = getCurrentClass(todaySchedule);
        updateClassCard(currentClass);
        showLectures(todaySchedule);
    } else {
        updateClassCard(null);
        showLectures([]);
    }
}

// Initial check
checkAndUpdateClassStatus();

// Check every minute for status changes
setInterval(checkAndUpdateClassStatus, 60000);

// Bottom navigation active state
const todayBtn = document.getElementById("todayBtn");
const weekBtn = document.getElementById("weekBtn");

function setActive(active, inactive) {
    active.classList.add("active");
    inactive.classList.remove("active");
}

todayBtn.addEventListener("click", () => setActive(todayBtn, weekBtn));
weekBtn.addEventListener("click", () => setActive(weekBtn, todayBtn));