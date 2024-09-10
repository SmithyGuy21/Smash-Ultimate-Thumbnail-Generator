const characters = ["Mario", "Donkey Kong", "Link", "Samus", "Dark Samus", "Yoshi", "Kirby", "Fox", "Pikachu", "Luigi", "Ness", "Captain Falcon", "Jigglypuff", "Peach", "Daisy", "Bowser", "Ice Climbers", "Sheik", "Zelda", "Dr. Mario", "Pichu", "Falco", "Marth", "Lucina", "Young Link", "Ganondorf", "Mewtwo", "Roy", "Chrom", "Mr. Game and Watch", "Meta Knight", "Pit", "Dark Pit", "Zero Suit Samus", "Wario", "Snake", "Ike", "Pokemon Trainer", "Diddy Kong", "Lucas", "Sonic", "King Dedede", "Olimar", "Lucario", "ROB", "Toon Link", "Wolf", "Villager", "Mega Man", "Wii Fit Trainer", "Rosalina and Luma", "Little Mac", "Greninja", "Palutena", "Pac-Man", "Robin", "Shulk", "Bowser Jr.", "Duck Hunt", "Ryu", "Ken", "Cloud", "Corrin", "Bayonetta", "Inkling", "Ridley", "Simon", "Richter", "King K. Rool", "Isabelle", "Incineroar", "Piranha Plant", "Joker", "Hero", "Banjo and Kazooie", "Terry", "Byleth", "Min Min", "Steve", "Sephiroth", "Pyra/Mythra", "Kazuya", "Sora", "Mii Brawler", "Mii Swordfighter", "Mii Gunner"];

// Get DOM elements
const searchInput = document.getElementById('searchInput');
const searchInput2 = document.getElementById('searchInput2');
const dropdown = document.getElementById('dropdown');
const dropdown2 = document.getElementById('dropdown2');
const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const textPlayer1Input = document.getElementById('textPlayer1');
const textPlayer2Input = document.getElementById('textPlayer2');
const tournamentInput = document.getElementById('tournament');
const setTypeInput = document.getElementById('setType');
const downloadButton = document.getElementById('downloadButton');
const capsLockBool = document.getElementById('capsLock');
const backgroundSelect = document.getElementById('background');
const foregroundSelect = document.getElementById('foreground');
const skin1Select = document.getElementById('skin1');
const skin2Select = document.getElementById('skin2');
const uploadBackgroundButton = document.getElementById('uploadBackgroundButton');
const uploadBackgroundInput = document.getElementById('uploadBackgroundInput');
const uploadForegroundButton = document.getElementById('uploadForegroundButton');
const uploadForegroundInput = document.getElementById('uploadForegroundInput');
const errorMessage = document.getElementById('errorMessage');

function drawUI() {
    ctx.drawImage(ui, 0, 0);
    player1Text = textPlayer1Input.value;
    player2Text = textPlayer2Input.value;
    tournamentText = tournamentInput.value;
    setTypeText = setTypeInput.value;
    if (capsLockBool.checked) {
        player1Text = player1Text.toUpperCase();
        player2Text = player2Text.toUpperCase();
        tournamentText = tournamentText.toUpperCase();
        setTypeText = setTypeText.toUpperCase();
    }
    // Change font
    ctx.font = "64px Futura_Condensed_Regular";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(player1Text, canvas.width * 7 / 32, canvas.height*0.1); // Player 1 text on the left
    ctx.fillText(player2Text, (25 * canvas.width) / 32, canvas.height*0.1); // Player 2 text on the right
    ctx.fillText(tournamentText, canvas.width / 2, canvas.height*0.9);
    // Change font 2
    ctx.font = "48px Futura_Condensed_Regular";
    ctx.fillStyle = "grey";
    ctx.fillText(setTypeText, canvas.width / 2, canvas.height*0.975);

}

function redraw() {
    ctx.drawImage(background, 0, 0);
    formattedCharacter = searchInput.value.replace(/\s+/g, '').replace(/\./g, '').replace(/\//g, '').toLowerCase();
    drawUI();
    if ((typeof formattedCharacter) !== "undefined" && formattedCharacter!='') {
        const img = new Image();
        img.src = `Resources/Fighters/${formattedCharacter}/render${skin1Select.value-1}.png`;
        img.onload = function () {
            // Draw the 640-pixel wide portion of the image
            const sourceWidth = 640; // Width of the portion to draw
            const sourceHeight = img.height; // Height of the portion to draw
            ctx.drawImage(img, 0, 0, sourceWidth, sourceHeight, 0, 0, sourceWidth, sourceHeight);
            drawUI();
        }
    }
    formattedCharacter2 = searchInput2.value.replace(/\s+/g, '').replace(/\./g, '').replace(/\//g, '').toLowerCase();
    if ((typeof formattedCharacter2) !== "undefined" && formattedCharacter2 != '') {
        const img2 = new Image();
        img2.src = `Resources/Fighters/${formattedCharacter2}/render${skin2Select.value-1}.png`;
        img2.onload = function () {
            ctx.save();         // Save the current state
            ctx.scale(-1, 1);   // Flip horizontally
            const sourceWidth = 640; // Width of the portion to draw
            const sourceHeight = img2.height; // Height of the portion to draw
            // Draw the 640-pixel wide portion of img2
            ctx.drawImage(img2, 0, 0, sourceWidth, sourceHeight, -canvas.width / 2 - sourceWidth, 0, sourceWidth, sourceHeight);
            ctx.restore();
            drawUI();
        }
    }            
}

function setupDropdownForInput(inputElement, dropdownElement) {
    inputElement.addEventListener('input', () => {
        const query = inputElement.value.toLowerCase();
        const filteredCharacters = characters.filter(character =>
            character.toLowerCase().includes(query)
        );
        populateDropdown(inputElement, dropdownElement, filteredCharacters);
    });

    inputElement.addEventListener('focus', () => {
        inputElement.value = ''; // Clear the input when focused
        const query = inputElement.value.toLowerCase();
        const filteredCharacters = characters.filter(character =>
            character.toLowerCase().includes(query)
        );
        populateDropdown(inputElement, dropdownElement, filteredCharacters);
        dropdownElement.style.display = 'block'; // Show the dropdown when input is focused
    });
}
setupDropdownForInput(searchInput, dropdown);
setupDropdownForInput(searchInput2, dropdown2);


function populateDropdown(inputElement, dropdownElement, filteredCharacters) {
    dropdownElement.innerHTML = ''; // Clear options
    filteredCharacters.forEach(character => {
        const li = document.createElement('li');
        li.textContent = character;
        li.addEventListener('click', () => {
            inputElement.value = character;
            dropdownElement.style.display = 'none'; // Hide dropdown after selection
            redraw();
        });
        dropdownElement.appendChild(li);
    });
    dropdownElement.style.display = filteredCharacters.length > 0 ? 'block' : 'none'; // Show dropdown if there are options
}
// Hide dropdown when clicking outside
document.addEventListener('click', (event) => {
    if (!searchInput.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.style.display = 'none';
    }
    if (!searchInput2.contains(event.target) && !dropdown2.contains(event.target)) {
        dropdown2.style.display = 'none';
    }
});

backgroundSelect.addEventListener('change', (event) => {
    background.src = `Resources/Backgrounds/${backgroundSelect.value}/bg.png`;
    redraw();
});
foregroundSelect.addEventListener('change', (event) => {
    ui.src = `Resources/Backgrounds/${foregroundSelect.value}/fg.png`;
    redraw();
});

// Handle file upload and thumbnail generation
const background = new Image();        
background.src = `Resources/Backgrounds/${backgroundSelect.value}/bg.png`; // Update this path to match your folder structure
const ui = new Image();
ui.src = `Resources/Backgrounds/${backgroundSelect.value}/fg.png`; // Update this path to match your folder structure
background.onload = function() {    // 2 onload functions is easiest. Performence is negligible and not worth waiting for 2 threads to join
    canvas.width = background.width;    // 1280
    canvas.height = background.height;  // 720
    redraw();
};
ui.onload = function() {
    canvas.width = ui.width;    // 1280
    canvas.height = ui.height;  // 720
    redraw();
}

function saveCanvasAsImage() {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png'); // Get data URL of the canvas
    player1Text = textPlayer1Input.value;
    player2Text = textPlayer2Input.value;
    tournamentText = tournamentInput.value;
    setTypeText = setTypeInput.value;
    if (capsLockBool.checked) {
        player1Text = player1Text.toUpperCase();
        player2Text = player2Text.toUpperCase();
        tournamentText = tournamentText.toUpperCase();
        setTypeText = setTypeText.toUpperCase();
    }
    link.download = `[${tournamentText}] ${setTypeText}: ${player1Text} (${searchInput.value}) vs ${player2Text} (${searchInput2.value}).png`; // Set default file name
    link.click(); // Trigger the download
}
downloadButton.addEventListener('click', saveCanvasAsImage);


const textInputsToRedraw = [
    textPlayer1Input,
    textPlayer2Input,
    tournamentInput,
    setTypeInput
];
textInputsToRedraw.forEach(input => {
    input.addEventListener('input', redraw);
});

capsLockBool.addEventListener('change', redraw);
skin1.addEventListener('change', redraw);
skin2.addEventListener('change', redraw);

function bindButtonToInput(button, input) {
    button.addEventListener('click', () => input.click());
}

// Handle image upload for background or foreground
function handleImageUpload(input, imageElement, type) {
    input.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const img = new Image();
            const reader = new FileReader();
            reader.onload = function(e) {
                img.src = e.target.result;
            };
            img.onload = function() {
                // Validate the image size (1280x720)
                if (img.width === 1280 && img.height === 720) {
                    // Load the image into the background or foreground canvas element
                    imageElement.src = img.src;
                    redraw();
                    errorMessage.style.display = 'none'; // Hide any previous error
                } else {
                    // Show an error message if the size is incorrect
                    errorMessage.textContent = `Please upload a ${type} image with dimensions 1280x720.`;
                    errorMessage.style.display = 'block';
                }
            };
            reader.readAsDataURL(file); // Read the file as a data URL for the image
        }
    });
}
// Bind the buttons to the respective file inputs
bindButtonToInput(uploadBackgroundButton, uploadBackgroundInput);
bindButtonToInput(uploadForegroundButton, uploadForegroundInput);
// Handle the image upload when a file is selected
handleImageUpload(uploadBackgroundInput, background, 'background');
handleImageUpload(uploadForegroundInput, ui, 'foreground');
