function checkAuth(page) {

    let isRegistered = localStorage.getItem("studentEmail");
    let isLoggedIn = localStorage.getItem("loggedIn");

    // INDEX PAGE (HOME)
    if (page === "index") {
        if (!isRegistered) {
            window.location.href = "register.html";
        } 
        else if (!isLoggedIn) {
            window.location.href = "register.html";
        }
    }

    // LOGIN PAGE
    if (page === "login") {
        if (!isRegistered) {
            window.location.href = "register.html";
        }
        else if (isLoggedIn) {
            window.location.href = "index.html";
        }
    }

    // REGISTER PAGE → always allow
    if (page === "register") {
        return;
    }
}
function registerStudent(e){
    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    localStorage.setItem("studentName", name);
    localStorage.setItem("studentEmail", email);
    localStorage.setItem("studentPassword", password);

    alert("Account Created");

    // go to login after register
    window.location.href = "login.html";
}
function loginStudent(e){
    e.preventDefault();

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let savedEmail = localStorage.getItem("studentEmail");
    let savedPassword = localStorage.getItem("studentPassword");

    if(email === savedEmail && password === savedPassword){
        localStorage.setItem("loggedIn","true");

        alert("Login Successful");
        window.location.href = "index.html";
    } else {
        alert("Invalid details");
    }
}
function logout(){
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}



// ---------------- COURSES DATA ----------------
function showCurriculum(batchNumber) {

    let data = {
        1: [
            {
                course: "Web Development",
                day: "Monday",
                time: "06:00 PM - 08:00 PM",
                teams: "https://teams.microsoft.com/l/meetup-join/abc123",
                Trainer:"Jyothi",
            }
        ],
        2:[
            {
                course: "Data Science",
                day: "Wednesday",
                time: "60:00 PM - 08:00 PM",
                teams: "https://teams.microsoft.com/l/meetup-join/def456",
                Trainer:"Nandini",
            }
        ],

        3: [
            {
                course: "Web Development",
                day: "Tuesday",
                time: "06:00 PM - 8:00 PM",
                teams: "https://teams.microsoft.com/l/meetup-join/ghi789",
                Trainer:"Sravani",
            }
        ],
        4: [
            {
                course: "Web Development",
                day: "Thursday",
                time: "06:00 PM - 8:00 PM",
                teams: "https://teams.microsoft.com/l/meetup-join/ghi789",
                Trainer:"Sreeja",
            }
        ],
    5: [
            {
                course: "Web Development",
                day: "Friday",
                time: "06:00 PM - 8:00 PM",
                teams: "https://teams.microsoft.com/l/meetup-join/ghi789",
                Trainer:"Devika",
            }
        ],
    };

    let batch = data[batchNumber];

    let html = `
    <h1>Batch ${batchNumber} Curriculum</h1>

    <table class="curriculum-table">
        <tr>
            <th>Course</th>
            <th>Day</th>
            <th>Time</th>
            <th>Live Session</th>
            <th>Recording</th>
            <th>Notes</th>
            <th>Trainer</th>
        </tr>
    `;

    batch.forEach((item, index) => {

        let recKey = item.course + "_recording";
        let notesKey = item.course + "_notes";

        let recording = localStorage.getItem(recKey);
        let notes = localStorage.getItem(notesKey);

        html += `
        <tr>
            <td>${item.course}</td>
            <td>${item.day}</td>
            <td>${item.time}</td>

            <td>
                <a href="${item.teams}" target="_blank">Join Teams</a>
            </td>

            <td>
                ${recording 
                    ? `<a href="${recording}" target="_blank">Watch</a>` 
                    : `<input type="file" onchange="uploadRecording('${recKey}', this)">`
                }
            </td>

            <td>
                ${notes 
                    ? `<a href="${notes}" target="_blank">Download</a>` 
                    : `<input type="file" onchange="uploadNotes('${notesKey}', this)">`
                }
            </td>
            <td>${item.Trainer}</td>
        </tr>
        `;
    });

    html += `</table>`;

    document.getElementById("courseArea").innerHTML = html;
}
// Upload Recording
function uploadRecording(key, input) {
    let file = input.files[0];
    if (!file) return;

    let url = URL.createObjectURL(file);
    localStorage.setItem(key, url);

    alert("Recording uploaded successfully");
    location.reload(); // refresh UI
}

// Upload Notes
function uploadNotes(key, input) {
    let file = input.files[0];
    if (!file) return;

    let url = URL.createObjectURL(file);
    localStorage.setItem(key, url);

    alert("Notes uploaded successfully");
    location.reload();
}
// FORGOT PASSWORD
function sendResetLink(e){
    e.preventDefault();

    let email = document.getElementById("forgotEmail").value;
    let savedEmail = localStorage.getItem("studentEmail");

    if(email === savedEmail){

        // store reset permission
        localStorage.setItem("resetAllowed", "true");

        alert("Redirecting to reset page");

        window.location.href = "reset.html";
    } else {
        alert("Email not found");
    }
}

// RESET PASSWORD
function resetPassword(e){
    e.preventDefault();

    let allowed = localStorage.getItem("resetAllowed");

    if(!allowed){
        alert("Unauthorized access");
        window.location.href = "login.html";
        return;
    }

    let newPass = document.getElementById("newPassword").value;

    localStorage.setItem("studentPassword", newPass);

    // remove access
    localStorage.removeItem("resetAllowed");

    alert("Password updated");

    window.location.href = "login.html";
}
// ---------------- AUTO LOAD COURSES ----------------
if(document.getElementById("courseArea")){
showAll()
}
// ---------------- VIDEO + PROGRESS ----------------

