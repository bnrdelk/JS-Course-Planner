const courseDataString = `CENG114;Computer Programming II;1;5;C;D;95;OGR.GOR. YUSUF EVREN AYKAC
CHEM101;GENERAL CHEMISTRY;1;5;C;S;110;DOC.DR. NURAY CELEBI
MATH104;Applied Linear Algebra;1;5;C;D;103;DOC.DR. MUHAMMED ABDULLAH BULBUL
MATH102;CALCULUS II;1;6;C;S;116;DR. OGR. UYESI SELIM BAHADIR
MATH106;PROBABILITY AND STATISTICS;1;6;C;S;79;DR. OGR. UYESI OSMAN SERDAR GEDIK
PHYS102;PHYSICS II;1;6;C;S;113;PROF.DR. ABDULLAH YILDIZ
TDL102;TURK DILI II;1;1;C;S;72;DOC.DR. MUSTAFA ARSLAN
TIT101;TURK INKILAP TARIHI I;1;1;C;S;101;DR. OGR. UYESI TEKIN ONAL
CENG202;Data Structures;2;5;C;D;99;DR. OGR. UYESI SHAFQAT UR REHMAN
CENG204;Computer System Architecture;2;5;C;D;86;DR. OGR. UYESI TAREK NAJJAR
CENG206;Programming Languages;2;5;C;D;135;DR. OGR. UYESI FAHREDDIN SUKRU TORUN
ENGR202;ENGINEERING MATHEMATICS II;2;6;C;S;104;DR. OGR. UYESI SELIM BAHADIR
ENGR254;PRINCIPLES OF BODY MOVEMENT;2;3;E;S;50;DR. OGR. UYESI OZKAN KILIC
CENG302;Formal Languages and Automata Theory;3;5;C;D;86;OGR.GOR. FADI YILMAZ
CENG304;Computer Networks;3;5;C;D;93;DR. OGR. UYESI MUSTAFA YENIAD
CENG306;Software Engineering;3;5;C;D;109;DR. OGR. UYESI FATIH NAR
CENG310;Human Computer Interaction;3;5;E;D;30;DR. OGR. UYESI MUHAMMED ABDULLAH BULBUL
CENG311;WEB TECHNOLOGY APPLICATIONS;3;5;E;D;50;OGR.GOR. FADI YILMAZ
CENG342;Parallel Programming I;3;5;E;D;45;DR. OGR. UYESI FAHREDDIN SUKRU TORUN
CENG404;Special Topics in CENG II;4;5;E;D;25;DR. OGR. UYESI SHAFQAT UR REHMAN
CENG415;Applications of Computer Graphics;4;5;E;D;25;DR. OGR. UYESI MUHAMMED ABDULLAH BULBUL
CENG424;COMPUTER SIMULATION AND MODELLING;4;5;E;D;30;DR. OGR. UYESI TAREK NAJJAR
CENG427;Programming of Mobile Devices;4;5;E;D;33;AR. GOR. DR. IBRAHIM ATLI
CENG428;NEURAL NETWORKS;4;5;E;D;25;DR. OGR. UYESI FATIH NAR
CENG431;INTRODUCTION TO DESING PATTERNS;4;5;E;D;25;OGR.GOR. YUSUF EVREN AYKAC
CENG451;Principles of Cyber Physical Systems;4;5;E;D;25;PROF.DR. REMZI YILDIRIM
CENG462;GAME PROGRAMMING PIPELINE;4;5;E;D;25;OGR.GOR. YUSUF EVREN AYKAC
CENG465;INTERNET OF THINGS AND ITS APPLICATIONS;4;5;E;D;25;PROF.DR. REMZI YILDIRIM
CENG474;COMMUNICATION AND NETWORK SECURITY;4;5;E;D;25;OGR.GOR. FADI YILMAZ`;

const courses = courseDataString.split("\n").map(courseString => {
  const [code, title, grade, credit, type, status, numberOfStudents, instructor] = courseString.split(";");
  return { code, title, grade, credit: parseInt(credit), type, status, numberOfStudents, instructor };
});

const classrooms = `B403;100
C501;60
B503;120
C408;52`.split("\n").map(classroomString => {
  const [name, capacity] = classroomString.split(";");
  return { name, capacity: parseInt(capacity) };
});

const instructorBusy = `OGR.GOR. YUSUF EVREN AYKAC;Monday;Morning
OGR.GOR. YUSUF EVREN AYKAC;Monday;Afternoon
OGR.GOR. YUSUF EVREN AYKAC;Tuesday;Morning
OGR.GOR. YUSUF EVREN AYKAC;Tuesday;Afternoon
DOC.DR. NURAY CELEBI;Monday;Afternoon
DOC.DR. NURAY CELEBI;Monday;Morning
DOC.DR. NURAY CELEBI;Tuesday;Morning
DOC.DR. NURAY CELEBI;Friday;Afternoon
PROF.DR. FATIH DEMIRCI;Monday;Morning
PROF.DR. FATIH DEMIRCI;Monday;Afternoon`
; 

const instructorBusySplit = instructorBusy.split("\n").map(busyString => {
  const [instructor, day, time] = busyString.split(";");
  return { instructor, day, time };
});

const serviceCoursesString = `
CHEM101;Tuesday;Morning
MATH102;Monday;Afternoon
MATH106;Thursday;Afternoon
PHYS102;Friday;Morning
TDL102;Wednesday;Afternoon
TIT101;Wednesday;Morning
ENGR202;Monday;Afternoon
ENGR254;Tuesday;Afternoon`;

const serviceCourses = serviceCoursesString.split("\n").map(serviceCoursesString => {
  const [code, day, time] = serviceCoursesString.split(";");
  return { code, day, time };
});


const myPlanTable = [
  ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  ["Morning", "", "", "", "", ""],
  ["Afternoon", "", "", "", "", ""]
];

const myPlanTableEl = document.getElementById("my-plan-table");
const courseButtonsContainer = document.getElementById("course-buttons");
const scheduleContainer = document.getElementById("schedule");
const backButton = document.getElementById("back-button");
const deleteButton = document.getElementById("delete-button");

// Function to show course code buttons
function showCourseButtons() {
  deleteButton.style.display = "none";
  courseButtonsContainer.style.display = "block";
  scheduleContainer.style.display = "none";
  backButton.style.display = "none";
  submitButton.style.display = "none";
}

let selectedCourseCode;
// Function to show course schedule form
function showCourseScheduleForm(code) {
  const course = courses.find(course => course.code === code);
  const courseTitle = `${course.code} - ${course.title}`;
  const status = course.status;
  let scheduleForm;
  selectedCourseCode = code;

  if(status === "S"){
    const serviceCourse = serviceCourses.find(serviceCourse => serviceCourse.code === code);
    scheduleForm = `
    <h2>${courseTitle}</h2>
    <h3>This is a service course.</h3>
    <h5>You can only choose this service course on ${serviceCourse.day}s in the ${serviceCourse.time}.</h5>
    <h2> </h2>
    <div>
      <label for="${code}-day">Day:</label>
      <select id="selected-day">
        <option value="${serviceCourse.day}">${serviceCourse.day}</option>
      </select>
    </div>
    <div>
      <label for="${code}-time">Time:</label>
      <select id="selected-time">
        <option value="${serviceCourse.time}">${serviceCourse.time}</option>
      </select>
    </div>
    <div>
      <label for="${code}-classroom">Classroom:</label>
      <select id="selected-classroom">
        ${classrooms.map(classroom => `<option value="${classroom.name}">${classroom.name} (${classroom.capacity})</option>`).join("")}
      </select>
    </div>
    `;
  }

else{
   scheduleForm = `
    <h2>${courseTitle}</h2>
    <div>
      <label for="${code}-day">Day:</label>
      <select id="selected-day">
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
      </select>
    </div>
    <div>
      <label for="${code}-time">Time:</label>
      <select id="selected-time">
        <option value="Morning">Morning</option>
        <option value="Afternoon">Afternoon</option>
      </select>
    </div>
    <div>
      <label for="${code}-classroom">Classroom:</label>
      <select id="selected-classroom">
        ${classrooms.map(classroom => `<option value="${classroom.name}">${classroom.name} (${classroom.capacity})</option>`).join("")}
      </select>
    </div>
  `;
}

  for (let i = 1; i < myPlanTable.length; i++) {
    for (let j = 1; j < myPlanTable[0].length; j++) {
    if (new RegExp(selectedCourseCode).test(myPlanTable[i][j])) {
      deleteButton.style.display = "block";
      deleteButton.onclick = () => deleteCourse(course.code);
      break;
    }
    }
  }

  courseButtonsContainer.style.display = "none";
  scheduleContainer.innerHTML = scheduleForm;
  scheduleContainer.style.display = "block";
  backButton.style.display = "block";
  submitButton.style.display = "block";
}

function deleteCourse(courseCode) {
  for (let i = 1; i < myPlanTable.length; i++) {
    for (let j = 1; j < myPlanTable[0].length; j++) {
      if (new RegExp(courseCode).test(myPlanTable[i][j])) {
        myPlanTable[i][j] = "";
        alert(`${courseCode} successfully removed.`);
       renderTable();
        return; // to exit the function after the course is deleted
      }
    }
  }
}

  // Add course code buttons to the page
  courses.forEach(course => {
    const button = document.createElement("button");
    button.classList.add("my-button");
    button.innerText = course.code;
    button.onclick = () => showCourseScheduleForm(course.code);
    courseButtonsContainer.appendChild(button);
  });

// Add event listener to back button
backButton.addEventListener("click", showCourseButtons);
const submitButton = document.getElementById("submit-button");

submitButton.addEventListener("click", () => {
  // clear the table first
  myPlanTableEl.innerHTML = "";
  
  // update the table based on selected day and time
  const selectedDay = document.getElementById("selected-day").value;
  const selectedTime = document.getElementById("selected-time").value;
  const selectedClassroom = document.getElementById("selected-classroom").value;
  const rowIndex = selectedTime === "Morning" ? 1 : 2;
  const columnIndex = myPlanTable[0].indexOf(selectedDay);

  const classroom2 = classrooms.find(classroom => classroom.name === selectedClassroom);
  const selectedClassroomCapacity = classroom2.capacity;
  const selectedCourse = courses.find(course => course.code === selectedCourseCode);
  const selectedInstructor = selectedCourse.instructor;
  const instructorBusyTimes = instructorBusySplit.filter(busy => {
    return busy.instructor === selectedInstructor && busy.day === selectedDay && busy.time === selectedTime;
  });
  
  let courseScheduled = false;
  for (let i = 1; i < myPlanTable.length; i++) {
    for (let j = 1; j < myPlanTable[0].length; j++) {
    if (new RegExp(selectedCourseCode).test(myPlanTable[i][j])) {
      alert("This course is already scheduled. You can select another course now.");
      courseScheduled = true;
      break;
    }
    }
  }

  if (myPlanTable[rowIndex][columnIndex] !== "" && !courseScheduled ) {
    alert(`This time slot is already occupied. Please select another time slot.`);
  } else if (instructorBusyTimes.length > 0 && !courseScheduled && selectedCourse.status!=="S") {
    alert(`The selected instructor is busy at ${selectedTime} on ${selectedDay}. Please select another time slot.`);
  } else if(selectedCourse.numberOfStudents >= selectedClassroomCapacity){
    alert(`There is no space available in ${selectedClassroom} for ${selectedCourse.code}'s students.`);
  }
   else if(!courseScheduled) {
    myPlanTable[rowIndex][columnIndex] = `${selectedCourseCode} (${selectedClassroom})`; 
    deleteButton.style.display = "block";
    deleteButton.onclick = () => deleteCourse(selectedCourseCode);
    selectedCourse.numberOfStudents ++;
  }
    renderTable();
});

function renderTable() {
  myPlanTableEl.innerHTML = "";
  myPlanTable.forEach(rowData => {
    const row = document.createElement("tr");
    rowData.forEach(cellData => {
      const cell = document.createElement("td");
      cell.textContent = cellData;
      row.appendChild(cell);
    });
    myPlanTableEl.appendChild(row);
  });
}

// get references to the buttons and tables
const grade1Button = document.getElementById("grade1");
const grade2Button = document.getElementById("grade2");
const grade3Button = document.getElementById("grade3");
const grade4Button = document.getElementById("grade4");
const myPlanButton = document.getElementById("myPlan");


grade1Button.addEventListener("click", () => {
  const semester1Courses = [
    ["Course Code", "Course Name", "Type", "ECTS", "Prereq*"],
  ["ENG101", "ACADEMIC ENGLISH I", "Must", "4", "-"],
  ["MATH101", "CALCULUS I", "Must", "6", "-"],
  ["CENG113", "COMPUTER PROGRAMMING I", "Must", "5", "-"],
  ["CHEM101", "GENERAL CHEMISTRY", "Must", "5", "-"],
  ["CENG101", "INTRODUCTION TO COMPUTER ENGINEERING", "Must", "2", "-"],
  ["PHYS101", "PHYSICS I", "Must", "4", "-"],
  ["PHYS103", "PHYSICS LABORATORY I", "Must", "2", "-"],
  ["TİT101", "TÜRK İNKILAP TARİHİ I", "Must", "1", "-"],
  ["TDL101", "TÜRK DİLİ I", "Must", "1", "-"]
  ];

  const semester2Courses = [["Course Code", "Course Name", "Type", "ECTS", "Prereq*"],
    ["ENG102", "ACADEMIC ENGLISH II", "Must", "4", "-"],
    ["MATH104", "APPLIED LINEAR ALGEBRA", "Must", "6", "-"],
    ["MATH102", "CALCULUS II", "Must", "6", "MATH 101"],
    ["CENG114", "COMPUTER PROGRAMMING II", "Must", "6", "CENG 113"],
    ["PHYS102", "PHYSICS II", "Must", "4", "-"],
    ["PHYS104", "PHYSICS LABORATORY II", "Must", "2", "-"],
    ["TDL102", "TÜRK DİLİ II", "Must", "1", "-"],
    ["TİT102", "TÜRK İNKILAP TARİHİ I", "Must", "1", "-"]
  ];

 showCirruculum(semester1Courses,semester2Courses);
  });


  grade2Button.addEventListener("click", () => {
    const semester3Courses = [["Course Code", "Course Name", "Type", "ECTS", "Prereq*"],
      ["CENG201", "OBJECT ORIENTED PROGRAMMING", "Must", "6", "CENG 114"],
      ["CENG203", "DIGITAL DESIGN", "Must", "5", "-"],
      ["CENG209", "SYSTEMS PROGRAMMING", "Must", "5", "-"],
      ["ENGR201", "ENGINEERING MATHEMATICS I", "Must", "6", "-"],
      ["ENGR260", "PRINCIPLES OF OCCUPATIONAL HEALTH", "Must", "3", "-"],
      ["MATH207", "PROBABILITY AND STATISTICS", "Must", "5", "-"]
    ];
    const semester4Courses = [["Course Code", "Course Name", "Type", "ECTS", "Prereq*"],
      ["CENG202", "DATA STRUCTURES", "Must", "7", "CENG 114"],
      ["CENG204", "COMPUTER ORGANIZATION", "Must", "7", "CENG 203"],
      ["CENG206", "PROGRAMMING LANGUAGES", "Must", "7", "CENG 113"],
      ["ENGR202", "DISCRETE MATHEMATICS", "Must", "6", "-"],
      ["UEXXX", "UNIVERSITY ELECTIVE", "Elective", "3", "-"]
    ];
   showCirruculum(semester3Courses,semester4Courses);
    });

    

grade3Button.addEventListener("click", () => {
  const semester5Courses = [["Course Code", "Course Name", "Type", "ECTS", "Prereq*"],
    ["CENG300", "INDUSTRIAL PRACTICE I", "Must", "4", "-"],
    ["CENG301", "DATABASE MANAGEMENT SYSTEMS", "Must", "5", "CENG 201"],
    ["CENG303", "DESIGN AND ANALYSIS OF ALGORITHMS", "Must", "6", "CENG 201 and CENG 202"],
    ["CENG305", "OPERATING SYSTEMS", "Must", "5", "CENG 202 and CENG 204"],
    ["CENG307", "SIGNALS AND SYSTEMS", "Must", "5", "MATH 104"],
    ["CENGXXX", "DEPARTMENT ELECTIVE", "Elective", "5", "-"]
    ];

    const semester6Courses = [  ["Course Code", "Course Name", "Type", "ECTS", "Prereq*"],
    ["CENG302", "FORMAL LANGUAGES AND AUTOMATA THEORY", "Must", "6", "ENGR 202"],
    ["CENG304", "COMPUTER NETWORKS", "Must", "6", "-"],
    ["CENG306", "SOFTWARE ENGINEERING", "Must", "6", "CENG 201"],
    ["CENGXXX", "DEPARTMENT ELECTIVE", "Elective", "5", "-"],
    ["ENGRXXX", "FACULTY ELECTIVE", "Elective", "4", "-"],
    ["UEXXX", "UNIVERSITY ELECTIVE", "Elective", "3", "-"]
  ];
  
 showCirruculum(semester5Courses,semester6Courses);
  });



grade4Button.addEventListener("click", () => {
  const semester7Courses = [["Course Code", "Course Name", "Type", "ECTS", "Prereq*"],
  ["CENG400", "INDUSTRIAL PRACTICE II", "Must", "4", "-"],
  ["CENG401", "GRADUATION PROJECT I", "Must", "6", "CENG 201 and CENG 202"],
  ["CENGXXX", "DEPARTMENT ELECTIVE", "Elective", "5", "-"],
  ["CENGXXX", "DEPARTMENT ELECTIVE", "Elective", "5", "-"],
  ["CENGXXX", "DEPARTMENT ELECTIVE", "Elective", "5", "-"],
  ["CENGXXX", "DEPARTMENT ELECTIVE", "Elective", "5", "-"]
];


const semester8Courses = [  ["Course Code", "Course Name", "Type", "ECTS", "Prereq*"],
["CENG402", "GRADUATION PROJECT II", "Must", "6", "CENG 201 and CENG 202"],
["CENGXXX", "DEPARTMENT ELECTIVE", "Elective", "5", "-"],
["CENGXXX", "DEPARTMENT ELECTIVE", "Elective", "5", "-"],
["CENGXXX", "DEPARTMENT ELECTIVE", "Elective", "5", "-"],
["CENGXXX", "DEPARTMENT ELECTIVE", "Elective", "5", "-"],
["ENGRXXX", "FACULTY ELECTIVE", "Elective", "4", "-"]
];

 showCirruculum(semester7Courses,semester8Courses);
  });

const curriculumTableEl = document.getElementById("curriculumTableEl");
function showCirruculum(semester1,semester2) {
  h5.style.display = "none";
  aybulogo.style.display = "none";
  myPlanTableEl.style.display = "none";
  curriculumTableEl.style.display = "block";
  
  // clear the table first
  curriculumTableEl.innerHTML = "";
  
  const tableHeaderRow = document.createElement("tr");
  ["Course Code", "Course Name", "Type", "ECTS", "Prereq*"].forEach(headerText => {
    const headerCell = document.createElement("th");
    headerCell.textContent = headerText;
    tableHeaderRow.appendChild(headerCell);
  });

  const tableBody1 = document.createElement("tbody");
  const semester1TitleRow = document.createElement("tr");
  const semester1TitleCell = document.createElement("td");
  semester1TitleCell.textContent = "I. Semester";
  semester1TitleCell.setAttribute("colspan", "5");
  semester1TitleRow.appendChild(semester1TitleCell);
  tableBody1.appendChild(semester1TitleRow);
  semester1TitleCell.style.textAlign = "center";

  // create the table body
  
  const semester1Courses = semester1;
  semester1Courses.forEach(rowData => {
    const row = document.createElement("tr");
    rowData.forEach(cellData => {
      const cell = document.createElement("td");
      cell.textContent = cellData;
      row.appendChild(cell);
    });
    tableBody1.appendChild(row);
  });
 
  const tableHeaderRow2 = document.createElement("tr");
  ["Course Code", "Course Name", "Type", "ECTS", "Prereq*"].forEach(headerText => {
    const headerCell = document.createElement("th");
    headerCell.textContent = headerText;
    tableHeaderRow2.appendChild(headerCell);
  });
  const tableBody2 = document.createElement("tbody");
  const semester2TitleRow = document.createElement("tr");
  const semester2TitleCell = document.createElement("td");
  semester2TitleCell.textContent = "II. Semester";
  semester2TitleCell.setAttribute("colspan", "5");
  semester2TitleRow.appendChild(semester2TitleCell);
  tableBody2.appendChild(semester2TitleRow);

  semester1TitleCell.style.textAlign = "center";
  
  // create the table body for semester 2

  const semester2Courses = semester2;
  semester2Courses.forEach(rowData => {
    const row = document.createElement("tr");
    rowData.forEach(cellData => {
      const cell = document.createElement("td");
      cell.textContent = cellData;
      row.appendChild(cell);
    });
    tableBody2.appendChild(row);
  });
  curriculumTableEl.appendChild(tableBody1);
curriculumTableEl.appendChild(tableBody2);

}

myPlanButton.addEventListener("click", () => {
  aybulogo.style.display = "none";
  myPlanTableEl.style.display = "block";
  curriculumTableEl.style.display = "none";
  h5.style.display = "none";
  // clear the table first
  myPlanTableEl.innerHTML = "";
  // create the table element and add rows
  myPlanTable.forEach(rowData => {
    const row = document.createElement("tr");
    rowData.forEach(cellData => {
      const cell = document.createElement("td");
      cell.textContent = cellData;
      row.appendChild(cell);
    });
    myPlanTableEl.appendChild(row);
  });
});

const changeStyleBtn = document.getElementById("change-style-btn");
const myStylesheet = document.getElementById("my-stylesheet");
const changeStyleBtn2 = document.getElementById("change-style-btn2");

changeStyleBtn.addEventListener("click", function() {
  myStylesheet.setAttribute("href", "style.css");
});

changeStyleBtn2.addEventListener("click", function() {
  myStylesheet.setAttribute("href", "style2.css");
});