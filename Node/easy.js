const fs = require('fs');

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('./easy.txt', "utf8");
        console.log(notesString);
    }
    catch(e) {
        console.log('error');
    }
}

fetchNotes();