let selectedLiElements;
let textBox;

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('keyup', documentKeyPressed);

    textBox = document.getElementById('textbox');
    textBox.addEventListener('input', updateTextDisplay);
    textBox.addEventListener('focusout', textBoxFocusedOut);  

    selectedLiElements = document.querySelectorAll('.printable li:not([class])');
    // Event listener for li elements
    selectedLiElements.forEach(li => {
        li.addEventListener('click', printableClicked);
    });
   
    const backButton = document.getElementById('backButton'); // replace 'backButton' with the actual id of your button
    if (backButton) {
        backButton.addEventListener('click', simulateBackspace);
    }

    // Event listener for radio buttons
    document.querySelectorAll('input[name="keyboardLayout"]').forEach((radio) => {
        radio.addEventListener('change', (event) => {
            //textBox.focus();
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

var myarray = [{german: 'a', korean: 'ㅇ'}] 

function changeKeyboard(layout) {
    var index = 0;
    layout.forEach(row => {
        row.split('').forEach(key => {
            selectedLiElements[index].textContent = key;
            index++;
        });
    });
}

function printableClicked(event) {
    const clickedLi = event.target;
    if (!clickedLi.classList.contains('last')) {
        textBox.value += clickedLi.textContent;
        updateTextDisplay();
    }
    //superDelete = false;
}

function textBoxFocusedOut(event){
    superDelete = false;
    //textBox.focus();
}

function documentKeyPressed(event) {
    console.log(event.keyCode);
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

var superDelete = false;
function simulateBackspace() { // 딸깍 ->딹 으로 변함, 딸ㄱ 으로 변하게 수정필요

    var groups = Hangul.d(textBox.value, true);
    var lastGroup = groups[groups.length-1];
    if (superDelete) {
        textBox.value = textBox.value.slice(0, -1);
    }
    else if (lastGroup.length == 1 ){
        var disassembled = Hangul.disassemble(textBox.value);
        var lastChar = disassembled.slice(-1);

        if (lastChar == 'ㄲ') {
            disassembled[disassembled.length-1] = 'ㄱ';
        } else if (lastChar == 'ㄸ') {
            disassembled[disassembled.length-1] = 'ㄷ';
        } else if (lastChar == 'ㅃ') {
            disassembled[disassembled.length-1] = 'ㅂ';
        } else if (lastChar == 'ㅆ') {
            disassembled[disassembled.length-1] = 'ㅅ';
        } else if (lastChar == 'ㅉ') {
            disassembled[disassembled.length-1] = 'ㅈ';
        } else {
            disassembled = disassembled.slice(0, -1);
        }
        textBox.value = Hangul.assemble(disassembled);
        superDelete = true;

    } else { 
        var disassembled = Hangul.disassemble(textBox.value);
        var lastChar = disassembled.slice(-1);   
        console.log("lastChar", lastChar)
        disassembled = disassembled.slice(0, -1);
        textBox.value = Hangul.assemble(disassembled);
    }

/*     function stronger(x){
        if(x == 'ㄱ' || x == 'ㅋ') return 'ㄲ';
        if(x == 'ㄷ' || x == 'ㅌ') return 'ㄸ';
        if(x == 'ㅂ' || x == 'ㅍ') return 'ㅃ';
        if(x == 'ㅅ') return 'ㅆ';
        if(x == 'ㅈ' || x == 'ㅊ') return 'ㅉ';
        return x;
      } */


    // Simulate a backspace action by removing the last character
    console.log(Hangul.d(textBox.value, true)); 
    //textBox.value = textBox.value.slice(0, -1);

    // Trigger the input event to update the display
    textBox.dispatchEvent(new Event('input'));
}

console.log('Script loaded successfully end');

function test(){
    console.log('hello miguel');
}
