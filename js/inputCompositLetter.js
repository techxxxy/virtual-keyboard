let selectedLiElements;
let textBox;

document.addEventListener('DOMContentLoaded', function () {
    
    selectedLiElements = document.querySelectorAll('.printable li:not([class])');
    // Event listener for li elements
    selectedLiElements.forEach(li => {
        li.addEventListener('click', updateTextboxText);
    });

    textBox = document.getElementById('textbox');
    textBox.addEventListener('input', updateTextDisplay); 

    console.log('Number of selected li elements(printable keys):', selectedLiElements.length);

    // Event listener for radio buttons
    document.querySelectorAll('input[name="keyboardLayout"]').forEach((radio) => {
        radio.addEventListener('change', (event) => {
            textBox.focus();
            console.log('Radio button changed');
            let selectedLayout = event.target.value;

            if (keyboardLayouts[selectedLayout]) {
                console.log('Layout exists:', selectedLayout);
                changeKeyboard(keyboardLayouts[selectedLayout]);
            } else {
                console.log('Layout does not exist:', selectedLayout);
            }
        });
    });
});

const keyboardLayouts = {
    german: [
        '1234567890\'^',
        'qwertzuiopü¨',
        'asdfghjklöä',
        'yxcvbnm,.-'
    ],
    germanCapslock: [
        '+"*ç%&/()=?`',
        'QWERTZUIOPÜ¨',
        'ASDFGHJKLÖÄ',
        'YXCVBNM;:_'
    ],
    korean: [
        '1234567890-=',
        'ㅂㅈㄷㄱㅅㅛㅕㅑㅐㅔ[]',
        'ㅁㄴㅇㄹㅎㅗㅓㅏㅣ;\'',
        'ㅋㅌㅊㅍㅠㅜㅡ,./'
    ],
    koreanCapslock: [
        '!@#$%^&*()_+',
        'ㅃㅉㄸㄲㅆㅛㅕㅑㅒㅖ{}',
        'ㅁㄴㅇㄹㅎㅗㅓㅏㅣ:\"',
        'ㅋㅌㅊㅍㅠㅜㅡ<>?'
    ]
};

function changeKeyboard(layout) {
    var index = 0;
    layout.forEach(row => {
        row.split('').forEach(key => {
            selectedLiElements[index].textContent = key;
            index++;
        });
    });
}

function updateTextboxText(event) {
    const clickedLi = event.target;
    if (!clickedLi.classList.contains('last')) {
        textBox.value += clickedLi.textContent;
        updateTextDisplay();
        textBox.focus();
    }
}


function updateTextDisplay() {

    console.log('updateTextDisplay is called');
    // Display text in the "textDisplay" paragraph
    const textDisplayParagraph = document.getElementById('textDisplay');
    if (textDisplayParagraph) {
        textDisplayParagraph.textContent = Hangul.assemble(textBox.value);
        console.log('textDisplayParagraph.textContent: ', textDisplayParagraph.textContent);
    }
}

console.log('Script loaded successfully end');