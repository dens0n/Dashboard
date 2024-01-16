

    function getNameFromLocalStorage() {
        return localStorage.getItem("userName") || "Dashboard";
    }

    function setNameInLocalStorage(name) {
        localStorage.setItem("userName", name);
    }

    function updateNameOnPage() {
        var editableName = document.getElementById("edit-name");
        editableName.textContent = getNameFromLocalStorage();
    }

    updateNameOnPage();

    document.getElementById("edit-name").addEventListener("input", function() {
        var newName = this.textContent;
        setNameInLocalStorage(newName);
    });

    function getNoteContentFromLocalStorage() {
        return localStorage.getItem("noteContent") || "";
    }

    function setNoteContentInLocalStorage(content) {
        localStorage.setItem("noteContent", content);
    }

    function updateNoteContentOnPage() {
        var noteTextarea = document.getElementById("note-content");
        noteTextarea.value = getNoteContentFromLocalStorage();
    }

    updateNoteContentOnPage();

    document.getElementById("note-content").addEventListener("input", function() {
        var newContent = this.value;
        setNoteContentInLocalStorage(newContent);
    });