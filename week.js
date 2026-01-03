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

// Setup day and date display
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const todayIndex = new Date().getDay();
const todayName = dayNames[todayIndex];

document.getElementById("day-name").innerText = todayName;

const today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const month = monthNames[today.getMonth()];
const year = today.getFullYear();
document.getElementById("dmy").innerText = `${month} ${day}, ${year}`;

// Function to create class item HTML
function createClassItem(classData) {
    const [startTime, endTime] = classData.time.split(' – ');
    
    return `
        <div class="class-item">
            <div class="class-info">
                <div class="class-code">${classData.code}</div>
                <div class="class-name">${classData.name}</div>
            </div>
            <div class="class-time-badge">
                <div class="time-start">${startTime}</div>
                <div class="time-end">to ${endTime}</div>
            </div>
        </div>
    `;
}

// Function to populate day schedule
function populateDaySchedule(dayKey, containerId) {
    const container = document.getElementById(containerId);
    const daySchedule = schedule[dayKey];
    
    if (!daySchedule || daySchedule.length === 0) {
        container.innerHTML = '<div class="no-classes">No classes scheduled</div>';
        return;
    }
    
    container.innerHTML = daySchedule.map(classData => createClassItem(classData)).join('');
}

// Populate all days
populateDaySchedule('mon', 'monday-classes');
populateDaySchedule('tue', 'tuesday-classes');
populateDaySchedule('wed', 'wednesday-classes');
populateDaySchedule('thu', 'thursday-classes');
populateDaySchedule('fri', 'friday-classes');

// Bottom navigation active state
const todayBtn = document.getElementById("todayBtn");
const weekBtn = document.getElementById("weekBtn");

function setActive(active, inactive) {
    active.classList.add("active");
    inactive.classList.remove("active");
}

todayBtn.addEventListener("click", () => setActive(todayBtn, weekBtn));
weekBtn.addEventListener("click", () => setActive(weekBtn, todayBtn));