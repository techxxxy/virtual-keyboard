
let selectedLiElements;
let textBox;
let capslockOn = false;
let superDelete = true;
let selectedLanguage = 'german'; // orginal is not language, so it will be ignored
let textDisplay; 

document.addEventListener('DOMContentLoaded', function () {

    selectRandomWord();
    document.addEventListener('keyup', documentKeyPressed);
    textDisplay = document.getElementById('textDisplay')

    textBox = document.getElementById('textBox');
    textBox.addEventListener('input', textBoxInputed);
    textBox.addEventListener('keydown', keydownedInTextBox);

    // spacebar & alphanumeric Event listener for li elements 
    selectedLiElements = document.querySelectorAll('li.typing-key'); 
    selectedLiElements.forEach(li => {
        li.addEventListener('click', printableClicked);
    });
    //Radio Button
    document.querySelectorAll('input[name="keyboardLayout"]').forEach(radio => {
        radio.addEventListener('change', radioButtonChanged);
    });

    setupButtonClickEvent('backspace', backspaceClicked);
    setupButtonClickEvent('enter', enterClicked);
    setupButtonClickEvent('capslock', capslockClicked); 

});

function keydownedInTextBox(event){
        if (event.key === 'Enter') {
            if (!event.isComposing) {
                console.log(textBox.value);
                console.log('isComposing:', event.isComposing);
                 checkTextMatch();
            }
        }
};

function setupButtonClickEvent(buttonId, handlerFunction) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.addEventListener('click', handlerFunction);
    }
}


const keyboardLayouts = {
    germanShifted: [
        '§', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '\'', '^',
        'Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'ü', '¨', '$',
        'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ö', 'ä',
        '<', 'Y', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '-', ' '],
    german: ['§', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '\'', '^',
        'q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'ü', '¨', '$',
        'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä',
        '<', 'y', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '-', ' '],
    koreanShifted: ['±', '!', '@', '#', '$', '%', '^', '&', '*', '*', ')', '_', '+',
        'ㅃ', 'ㅉ', 'ㄸ', 'ㄲ', 'ㅆ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅒ', 'ㅖ', '{', '}', '|',
        'ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ', ':', '"',
        '~', 'ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ', '<', '<', '>', ' '],
    korean: ['§', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
        'ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅐ', 'ㅔ', '[', ']', '\\',
        'ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ', '\;', '\'',
        '₩', 'ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ', ',', '.', '/', ' '],
 original: ['<div class="upper-part key-value">°</div> <div class="lower-part key-value">§ </div>',
        '<div class="upper-part key-value">+         </div> <div class="lower-part key-value">1      </div>',
        '<div class="upper-part key-value">"    </div> <div class="lower-part key-value">2      </div>',
        '<div class="upper-part key-value">*     </div> <div class="lower-part key-value">3      </div>',
        '<div class="upper-part key-value">ç         </div> <div class="lower-part key-value">4      </div>',
        '<div class="upper-part key-value">%  </div> <div class="lower-part key-value">5      </div>',
        '<div class="upper-part key-value">&amp;     </div> <div class="lower-part key-value">6      </div>',
        '<div class="upper-part key-value">/     </div> <div class="lower-part key-value">7      </div>',
        '<div class="upper-part key-value">(    </div> <div class="lower-part key-value">8     </div>',
        '<div class="upper-part key-value">)    </div> <div class="lower-part key-value">9      </div>',
        '<div class="upper-part key-value">=         </div> <div class="lower-part key-value">0       </div>',
        '<div class="upper-part key-value">?   </div> <div class="lower-part key-value">\' </div>',
        '<div class="upper-part key-value">`   </div> <div class="lower-part key-value">^  </div>',
        '<div class="qType"> <div class="ko2 key-value">ㅃ    </div> <div class="de1 key-value">Q       </div> <div class="ko2">ㅂ</div> </div>', 
        '<div class="qType"> <div class="ko2 key-value">ㅉ    </div> <div class="de1 key-value">W       </div> <div class="ko2">ㅈ</div> </div>', 
        '<div class="qType"> <div class="ko2 key-value">ㄸ    </div> <div class="de1 key-value">E       </div> <div class="ko2">ㄷ</div> </div>', 
        '<div class="qType"> <div class="ko2 key-value">ㄲ    </div> <div class="de1 key-value">R       </div> <div class="ko2">ㄱ</div> </div>', 
        '<div class="qType"> <div class="ko2 key-value">ㅆ    </div> <div class="de1 key-value">T       </div> <div class="ko2">ㅅ</div> </div>', 
        '<div class="aType"> <div class="de1 key-value">Z    </div> <div class="ko1 key-value">ㅛ       </div> </div>',
        '<div class="aType"> <div class="de1 key-value">U    </div> <div class="ko1 vowel key-value">ㅕ </div> </div>',
        '<div class="aType"> <div class="de1 key-value">I    </div> <div class="ko1 vowel key-value">ㅑ </div> </div>',
        '<div class="qType"> <div class="ko2 key-value">ㅒ    </div> <div class="de1 key-value">O       </div> <div class="ko2">ㅐ</div> </div>', 
        '<div class="qType"> <div class="ko2 key-value">ㅖ    </div> <div class="de1 key-value">P       </div> <div class="ko2">ㅔ</div> </div>', 
        'é &nbsp;&nbsp; ö',
        '<div class="upper-part key-value">!</div> <div class="lower-part key-value">"</div>',
        '<div class="upper-part key-value">£</div> <div class="lower-part key-value">$</div>',
        '<div class="aType"> <div class="de1 key-value">A</div> <div class="ko1 key-value">ㅁ</div> </div>',
        '<div class="aType"> <div class="de1 key-value">S</div> <div class="ko1 key-value">ㄴ</div> </div>',
        '<div class="aType"> <div class="de1 key-value">D</div> <div class="ko1 key-value">ㅇ</div> </div>',
        '<div class="aType"> <div class="de1 key-value">F</div> <div class="ko1 key-value">ㄹ</div> </div>',
        '<div class="aType"> <div class="de1 key-value">G</div> <div class="ko1 key-value">ㅎ</div> </div>',
        '<div class="aType"> <div class="de1 key-value">H</div> <div class="ko1 key-value">ㅗ</div> </div>',
        '<div class="aType"> <div class="de1 key-value">J</…> <div class="ko1 vowel key-value">ㅓ</div> </div>',
        '<div class="aType"> <div class="de1 key-value">K</…> <div class="ko1 vowel key-value">ㅏ</div> </div>',
        '<div class="aType"> <div class="de1 key-value">L</…> <div class="ko1 vowel key-value">ㅣ</div> </div>',
        '<div class="key-value">é &nbsp;&nbsp; ö</div>',
        '<div class="key-value">à &nbsp;&nbsp; ä</div>',
        '&lt;',
        '<div class="aType"> <div class="de1 key-value">Y</div> <div class="ko1 key-value">ㅋ</div> </div>',
        '<div class="aType"> <div class="de1 key-value">X</div> <div class="ko1 key-value">ㅌ</div> </div>',
        '<div class="aType"> <div class="de1 key-value">C</div> <div class="ko1 key-value">ㅊ</div> </div>',
        '<div class="aType"> <div class="de1 key-value">V</div> <div class="ko1 key-value">ㅍ</div> </div>',
        '<div class="aType"> <div class="de1 key-value">B</div> <div class="ko1 key-value">ㅠ</div> </div>',
        '<div class="aType"> <div class="de1 key-value">N</div> <div class="ko1 key-value">ㅜ</div> </div>',
        '<div class="aType"> <div class="de1 key-value">M</div> <div class="ko1 key-value">ㅡ</div> </div>',
        '<div class="upper-part key-value">;</div> <div class="lower-part key-value">,</div>',
        '<div class="upper-part key-value">:</div> <div class="lower-part key-value">.</div>',
        '<div class="upper-partkey-value">―</div> <div class="lower-part key-value">-</div>',
        '&nbsp']
};

const words = ["스위스", "banana","바나나", "파인애플", "짜파게티", "스파게티", "포도", "우유", "내일", "육계장"];
   
function changeKeyboard(layout) {
    layout.forEach((item, index) => {
        selectedLiElements[index].textContent = item;
        index++;
    });
}

function changeKeyboardToOriginal(layout) {
    layout.forEach((item, index) => {
        selectedLiElements[index].innerHTML = item;
        index++;
    });
}

function isNotKorean() {
    var lastLetter = textBox.value.slice(-1);
    const koreanCheck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    var isNotKorean = !koreanCheck.test(lastLetter);
    return isNotKorean;
}

function textBoxInputed() { // both keyboard and clicking trigers this function

    if (textBox.value > textDisplay.textContent) {
        superDelete = isNotKorean();
        textDisplay.textContent = Hangul.assemble(textBox.value)
        console.log("isNotKorea", isNotKorean(), "superDelete", superDelete );
    } else {
        textDisplay.textContent = textBox.value
        console.log("isNotKorea", isNotKorean(), "superDelete", superDelete );
    }
//    updateTextDisplay();

}

function printableClicked(event) {
    const clickedLi = event.target.closest('li'); // "event.target" can be child of li like div or span.
    var index = parseInt(clickedLi.id.match(/\d+/)[0], 10); // to extract only number from id, which is key-13 format
    var inputText = keyboardLayouts[selectedLanguage][index];
    superDelete = isNotKorean();
    textBox.value += inputText;
    textBox.dispatchEvent(new Event('input')); 
}

function allocateTextInKey(){
}

function documentKeyPressed(event) {
    //console.log(event.keyCode);
}


// function updateTextDisplay() {
//     if (textDisplay) {
//         textDisplay.textContent = textBox.value;
//         //console.log('textDisplay.textContent: ', textDisplay.textContent);
//     }
// }


function backspaceClicked() { // 딸깍+bbb = 딸ㄱ 이어야함. 딹 으로 변함?. 딸ㄱ 으로 변하게 수정필요, 바+화살표+ㄱ=바ㄱ 으로 표시되어야함.
    console.log("backspace starting");
    var displayedText = textDisplay.textContent;

    var lastLetter = displayedText.slice (-1);
    var leftoverLetters = displayedText.slice(0, -1);
    var newAllLetters = leftoverLetters + lastLetter;
    console.log("leftoverLetters", leftoverLetters, "lastLetter", lastLetter, "newAllLetters", newAllLetters);

    var lastLetterGroup = Hangul.disassemble(lastLetter);
    console.log("lastLetterGroup",lastLetterGroup);
    // checking last letter is korean
    console.log("isNotKorean",isNotKorean());

    var newChar="";
    if(displayedText.length == 0){ // test: "" + backspace
        return;
    } else if (isNotKorean == true || superDelete == true) { // test: "alphanumeric" + backspace
        textBox.value = displayedText.slice(0, -1);
        superDelete = true; 
        console.log("text",displayedText);
    } else if (lastLetterGroup.length == 1 && superDelete == false) { // test: "딸ㄲ" + backspace
        if (lastLetterGroup == 'ㄲ') {
            newChar = 'ㄱ';
        } else if (lastLetterGroup == 'ㄸ') {
            newChar = 'ㄷ';
        } else if (lastLetterGroup == 'ㅃ') {
            newChar = 'ㅂ';
        } else if (lastLetterGroup == 'ㅆ') {
            newChar = 'ㅅ';
        } else if (lastLetterGroup == 'ㅉ') {
            newChar = 'ㅈ';
        } else {
        }
        textBox.value = leftoverLetters + newChar;
        superDelete = true;
     } else if (lastLetterGroup.length == 2 && superDelete == false) { //test: "딸까" + backspace
        textBox.value = leftoverLetters + Hangul.assemble(lastLetterGroup.slice(0, -1)) ;
     } else if (lastLetterGroup.length == 3 && superDelete == false) { // test: "딸깎" + backspace
        if (lastLetterGroup[2] == 'ㄲ') {
            newChar = 'ㄱ';
        } else if (lastLetterGroup[2] == 'ㄸ') {
            newChar = 'ㄷ';
        } else if (lastLetterGroup[2] == 'ㅃ') {
            newChar = 'ㅂ';
        } else if (lastLetterGroup[2] == 'ㅆ') {
            newChar = 'ㅅ';
        } else if (lastLetterGroup[2] == 'ㅉ') {
            newChar = 'ㅈ';
        } else {
            textBox.value = leftoverLetters + Hangul.assemble(lastLetterGroup.slice(0, -1));
        }
        lastLetterGroup[2] = newChar;
        textBox.value = leftoverLetters + Hangul.assemble(lastLetterGroup) ;
     } else if (lastLetterGroup.length == 4 && superDelete == false) { //test: "딸값" + backspace
        textBox.value = leftoverLetters + Hangul.assemble(lastLetterGroup.slice(0, -1)) ;
     }

    textBox.dispatchEvent(new Event('input'));
    console.log("backspaceed ending....")

}

function radioButtonChanged(event) { 
    const selectedLayout = event.target.id;
    console.log('selectedLayout', selectedLayout);

    if (selectedLayout === 'original') {
        changeKeyboardToOriginal(keyboardLayouts[selectedLayout]);
    } else {
        selectedLanguage = selectedLayout;
        const layout = keyboardLayouts[selectedLayout];
        changeKeyboard(layout);

        if (selectedLayout === 'german' || selectedLayout === 'germanShifted') {
            toggleTabslock('off');
        } else {
            toggleTabslock('on');
        }
    }

}

function enterClicked(){
    checkTextMatch();
}
function capslockClicked() {
    var originalRadio= document.getElementById('original');
    var germanRadio = document.getElementById('german');
    var germanShiftedRadio = document.getElementById('germanShifted');
    var koreanRadio = document.getElementById('korean');
    var koreanShiftedRadio = document.getElementById('koreanShifted');
    
    if(capslockOn == true) {
        toggleTabslock('off');
        if(selectedLanguage == 'korean') {
            selectedLanguage = 'german';
            if (!originalRadio.checked) {
                germanRadio.checked = true;
                germanRadio.dispatchEvent(new Event('change'));
            }
        } else if (selectedLanguage == 'koreanShifted') {
            selectedLanguage = 'germanShifted';
            if (!originalRadio.checked) {
                germanShiftedRadio.checked = true; 
                germanShiftedRadio.dispatchEvent(new Event('change'));
            }
        }
    } else {
        toggleTabslock('on');
        if (selectedLanguage == 'german') {
            selectedLanguage = 'korean';
            if (!originalRadio.checked) {
                koreanRadio.checked = true;
                koreanRadio.dispatchEvent(new Event('change'));
            }
        } else if (selectedLanguage == 'germanShifted') {
            selectedLanguage = 'koreanShifted';
            if (!originalRadio.checked) {
                koreanShiftedRadio.checked = true;
                koreanShiftedRadio.dispatchEvent(new Event('change'));
            }
        }
     } 
}

function checkTextMatch(){
    const inputText = textDisplay.textContent;
    var textElement = document.getElementById('target-vocaburary');
    const targetText = textElement.textContent;
 
    if (inputText === targetText) {
        textElement.style.color = 'green';
        textBox.value = '';
        textDisplay.textContent = textBox.value;

        setTimeout(function() {
            selectRandomWord();
            textElement.style.color = 'black';
            textBox.focus; 
          }, 500);

    } else {
        textElement.style.color = 'red';
    }
}
function selectRandomWord() {
    //console.log ("selectRandomWord,");
    var randomIndex = Math.floor(Math.random() * words.length);
    document.getElementById('target-vocaburary').textContent = words[randomIndex];
}

function toggleTabslock(on) {
    var onOff = on; 
    var capslock = document.getElementById('capslock-light')
    if (onOff == 'on') {
        capslock.classList.add("capslock-light-on");
        capslockOn = true;
    } else {
        capslock.classList.remove("capslock-light-on");
        capslockOn = false;
    }
}