const list = {
    mon: ["8-10 AM: GEY 202", "10-12 PM: CHM 202"],
    tue: ["8-10 AM: PHY 202", "10-12 PM: MTH 202", "2-4 PM: GPH"],
    wed: ["8-10 AM: GPH 202", "10-12 PM: GEY 222", "2-3 PM: GST 202"],
    thu: ["8-10 AM: GEY 202", "10-12 PM: CHM 212"],
    fri: ["8-10 AM: GPH 202", "10-12 PM: MTH 202"],
};

let activeButton = null; // tracks the currently highlighted button
const lis = document.getElementById('list');

function showLectures(day) {
    lis.innerHTML = "";

    list[day].forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        lis.appendChild(li);
    });
}

// Weekday buttons
const buttons = {
    mon: document.getElementById("monbtn"),
    tue: document.getElementById("tuebtn"),
    wed: document.getElementById("wedbtn"),
    thu: document.getElementById("thubtn"),
    fri: document.getElementById("fribtn"),
};

// Add event listeners to highlight weekday buttons
for (const [day, btn] of Object.entries(buttons)) {
    btn.addEventListener("click", function() {
        // reset previous active button
        if (activeButton) activeButton.style.backgroundColor = "#062B1E";

        showLectures(day);

        // highlight this button
        btn.style.backgroundColor = "#095f41";
        activeButton = btn;
    });
}

// Today button
const todayBtn = document.getElementById("tod");
todayBtn.addEventListener("click", () => {
    const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const todayIndex = new Date().getDay();
    const todayName = dayNames[todayIndex];

    // Reset previously active button
    if (activeButton) activeButton.style.backgroundColor = "#062B1E";

    // Highlight the Today button itself
    todayBtn.style.backgroundColor = "#095f41";
    activeButton = todayBtn;

    // Determine which day to show
    switch(todayName) {
        case "Monday": showLectures("mon"); break;
        case "Tuesday": showLectures("tue"); break;
        case "Wednesday": showLectures("wed"); break;
        case "Thursday": showLectures("thu"); break;
        case "Friday": showLectures("fri"); break;
        default:
            lis.innerHTML = "No lectures today!";
            break;
    }
});
