window.onload = function () {
    let inp_text = document.querySelector("#inp_text")
    let inp_date = document.querySelector("#inp_date")
    let inp_time = document.querySelector("#inp_time")
    let add_btn = document.querySelector("#add_btn")
    let container = document.querySelector(".container")
    let clear_btn = document.querySelector("#clear_btn")
    let arr = []  // מערך הפתקים ליצירה
    let i // index
    let arrAfterJSON  // a temp arr
    let arrString // a temp arr
    let note  // the user note div
    let storageKey = localStorage.key(0)  // לקיחת השם של המערך של הסטוראג בשביל לבדוק אם הוא קיים בתנאי
    let notesCounter // number of notes
    let noteX // delete note
    let noteDeleteID  // the note id for deletion 

    //========================================================
    // current date in the input date section
    let globalDate = new Date()
    let month = globalDate.getMonth() + 1
    let day = globalDate.getDate()
    let year = globalDate.getFullYear()
    if (month < 10 && day > 9) {             // חודש חד ספרה ויום דו ספרה
        inp_date.value = year + "-" + "0" + month + "-" + day
    }
    else if (month > 9 && day > 9) {        // חודש דו ספרה ויום דו ספרה
        inp_date.value = year + "-" + month + "-" + day
    }
    else if (day < 10 && month > 9) {        // יום חד ספרה וחודש דו ספרה
        inp_date.value = year + "-" + month + "-" + "0" + day

    }
    else if (day < 10 && month < 10)   //יום חד ספרה חודש חד ספרה

        inp_date.value = year + "-" + "0" + month + "-" + "0" + day

    //==========================================================




    onStart()  

    function onStart() {  // יצירת הפתקים בפתיחת הדף
        if (storageKey == "notesArr") {           // בודק האם קיים המערך בסטוראג

            notesCounterFunc()
            getFromLocal()
            forLoopCreates()
            returnLocalStorage()

        }

        else if (storageKey != "notesArr") {
            notesCounter = arr.length
        }
    }



    add_btn.addEventListener("click", function (e) {
        e.preventDefault()    // מניעת ריענון העמוד בלחיצת הכפתור

        if (inp_text.value != "" && inp_date.value != "") {

            if (notesCounter >= 1) { deleteHTML() }
            localContent()
            getFromLocal()
            forLoopCreates()
            returnLocalStorage()
            inp_text.value = ""
            inp_time.value = ""
        }
        else {
            alert("hi please fill Text and Date!")
        }
    })

    clear_btn.addEventListener("click", function (e) {
        e.preventDefault()
        inp_text.value = ""
        inp_time.value = ""
        inp_date.value = ""
    })


    function removeNote(e) {
        noteDeleteID = e.target.parentElement.id
        getFromLocal()
        arr.splice(noteDeleteID, 1)  // מחיקת התא הספציפי ממערך
        deleteHTML()        // delete DOM
        forLoopCreates()  // creation again
        returnLocalStorage()   // get back to the local storage

    }



    function notesCounterFunc() {   // מוודא שהאובייקט הבא ייכתב לתא הריק הבא במערך
        arrString = localStorage.getItem("notesArr")
        arr = JSON.parse(arrString)
        notesCounter = arr.length
    }

    function deleteHTML() {
        container.innerHTML = ""

    }


    function localContent() {

        arr[notesCounter] =
        {
            userText: inp_text.value,
            userDate: inp_date.value,
            userHour: inp_time.value,
            notesCounter: notesCounter
        }
        notesCounter++

        // שליחה לתוך הלוקאל סטוראג
        arrAfterJSON = JSON.stringify(arr)
        localStorage.setItem("notesArr", arrAfterJSON)
    }

    function getFromLocal() {
        arrString = localStorage.getItem("notesArr")
        arr = JSON.parse(arrString)
        localStorage.removeItem("notesArr")
        //for loop and creation
    }


    function forLoopCreates() {
        for (i = 0; i < arr.length; i++) {
            createNote()
        }
    }


    function createNote() {

        // varubales to elements
        note = document.createElement(`div`)
        notePic = document.createElement(`IMG`)
        noteMission = document.createElement(`p`)
        noteDate = document.createElement("p")
        noteTime = document.createElement("p")
        noteX = document.createElement("i")

        //img Attributes
        notePic.setAttribute("src", "notebg.png")
        notePic.setAttribute("alt", "picture of the note")
        noteX.setAttribute("alt", "delete icon")



        //Elements classes
        noteDate.className = "noteDate"
        noteMission.className = "missionText"
        note.className = "note"
        note.id = i
        noteTime.className = "noteTime"
        noteX.className = "far fa-trash-alt"    //FontAwesome
        noteX.className += " noteX"  // שרשור הקלאס השני לכפתור פח



        // text inserts                             
        noteMission.textContent = arr[i].userText
        noteDate.textContent = arr[i].userDate
        noteTime.textContent = arr[i].userHour


        //appendchilds
        container.appendChild(note)
        note.appendChild(notePic)
        note.appendChild(noteMission)
        note.appendChild(noteDate)
        note.appendChild(noteTime)
        note.appendChild(noteX)

        noteX.addEventListener("click", removeNote) //listener to the note remover

    }

    function returnLocalStorage() {
        notesCounter = arr.length
        arrString = JSON.stringify(arr)
        localStorage.setItem("notesArr", arrString)

    }


} 