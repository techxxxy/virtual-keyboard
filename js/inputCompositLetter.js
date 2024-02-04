
let selectedLiElements;
let textBox;
let capslockOn = false;
let superDelete = true;
let selectedLanguage = 'korean'; // orginal is not language, so it will be ignored
let textDisplay; 
let completedLetters = '';
let composingLetter = '';

document.addEventListener('DOMContentLoaded', function () {
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
    setupButtonClickEvent('shift', shiftClicked);

    selectRandomWord();

});

const keyboardLayouts = {
    germanShifted: [
        '°', '+', '"', '*', 'ç', '%', '&', '/', '(', ')', '=', '?', '`', 
        'Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'ü', '¨', '$',
        'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ö', 'ä',
        '>', 'Y', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '-', ' '],
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
        '<div class="upper-part key-value">&gt;</div> <div class="lower-part key-value">&lt;</div>',
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

/* const phonetic = { // Mapping does not work due to placeholder consonant of korean
    german: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
    korean: ['ㅏ','ㅂ','ㅊ','ㄷ','ㅔ','','ㄱ','ㅎ','ㅣ','','ㅋ','ㄹ','ㅁ','ㄴ','ㅗ','ㅍ','ㅂ','','ㅅ','ㅌ','ㅜ','','','','','']
} */

const words = { 
    german: ['Banana', 'Kanal', 'Kugel', 'man','Nutella'],
    korean: ['바나나', '카날', '쿠겔', '만', '누텔라']
}

const alphabets = { 
    german: ['A', 'B','C', 'D', 'E', 'F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
    korean: ['아', '베', '체', '데', '에', '', '게','하','이','','카','엘','엠','엔','오','페','쿠','','','테','우','','','','입실론']
}

function documentKeyPressed(event) {

    console.log('event.key a A 한글 1 #    :', event.key, 'event.code KeyA Digit6 ShiftLeft     :', event.code);

    var key;
    var index;
    var koreanKey;

    if (event.code == 'Enter') {
        enterClicked();
        return;
    } else if (event.code == 'Backspace') {
        backspaceClicked();
        return;
    } else if (event.code.startsWith('Key')) {
        var a = event.code.substring(3)
        if (a == 'Y') {
            key = 'Z';
        } else if (a == 'Z') {
            key = 'Y';
        } else {
            key = event.code.substring(3);
        };
    } else if (event.code.startsWith('Digit')) {
        key = event.code.substring(5);
    } else if (event.key.length == 1) {
        koreanKey = event.key;
        handleInput(koreanKey);
    } else {
        return;
    };

    if (key) {
        index = keyboardLayouts.germanShifted.indexOf(key);
        if (event.shiftKey) {
            koreanKey = keyboardLayouts.koreanShifted[index];
        } else {
            koreanKey = keyboardLayouts.korean[index];
        };
        handleInput(koreanKey);
    }

};

function keydownedInTextBox(event){
    if (event.key === 'Enter') {
        if (!event.isComposing) {
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

function isNotKorean(text) {
    var textToTest = text;
    var lastLetter = textBox.value.slice(-1);
    if (textToTest == null ) {
        textToTest = lastLetter;
    }
    const koreanCheck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    var isNotKorean = !koreanCheck.test(textToTest);
    return isNotKorean;
}

function printableClicked(event) {
    const clickedLi = event.target.closest('li'); // "event.target" can be child of li like div or span.
    var index = parseInt(clickedLi.id.match(/\d+/)[0], 10); // to extract only number from id, which is key-13 format
    var newChar = keyboardLayouts[selectedLanguage][index];

    handleInput(newChar);
}

function handleInput(newChar) {
    superDelete = isNotKorean(newChar);
    compositKorean(newChar)
    compareAndAddClass();
}

function compositKorean(newChar){
    var newChar = newChar;
 
    if (isNotKorean(newChar) == true) {
        completedLetters = completedLetters + composingLetter + newChar; //ㄱ ㅏ ㄴ ㄴ a -> 간ㄴa
        composingLetter ="";
        updateText();
    } else { // ㄱㅏㅂㅅㅏ -> 갑 & 사 
        composingLetter += newChar;
        var assembled = Hangul.a(composingLetter);
        composingLetter = assembled;

        if (assembled.length == 1) { 
            updateText()
        } else if (assembled.length == 2) { // 값 + ㅏ -> 갑 & 사 
            completedLetters += assembled.slice(0, -1);
            composingLetter = assembled.slice(-1);
            updateText()
        }
    }
  
}

function updateText() {
    textBox.value = completedLetters + composingLetter;
    textDisplay.textContent = completedLetters + composingLetter;
}

function textBoxInputed(event) { // both keyboard and clicking trigers this function
    if (textBox.value > textDisplay.textContent) { // keyboard input
        superDelete = isNotKorean();
    } else {
    }
    completedLetters = textBox.value;
    composingLetter ="";
    textDisplay.textContent = textBox.value;
    compareAndAddClass()

    //    updateTextDisplay();
}

function backspaceClicked() { // 딸깍+bbb = 딸ㄱ 이어야함. 딹 으로 변함?. 딸ㄱ 으로 변하게 수정필요, 바+화살표+ㄱ=바ㄱ 으로 표시되어야함.
    var text = textDisplay.textContent;
    composingLetter = text.slice(-1);
    completedLetters = text.slice(0, -1);
    var newAllLetters = completedLetters + composingLetter;
    var lastLetterGroup = Hangul.disassemble(composingLetter);
    // checking last letter is korean

    var newChar="";
    if(text.length == 0){ // test: "" + backspace
        return;
    } else if (isNotKorean == true || superDelete == true) { // test: "alphanumeric" + backspace
        completedLetters = text.slice(0, -1);
        composingLetter = "";
        textBox.value = completedLetters + composingLetter;
        textDisplay.textContent = completedLetters + composingLetter;
        superDelete = true; 
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
        composingLetter = newChar;
        textBox.value = completedLetters + composingLetter;
        textDisplay.textContent = completedLetters + composingLetter;

        superDelete = true;
     } else if (lastLetterGroup.length == 2 && superDelete == false) { //test: "딸까" + backspace
        composingLetter = Hangul.assemble(lastLetterGroup.slice(0, -1));
        textBox.value = completedLetters + composingLetter ;
        textDisplay.textContent = completedLetters + composingLetter;
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

            composingLetter = Hangul.assemble(lastLetterGroup.slice(0, -1));
            textBox.value = completedLetters + composingLetter;
            textDisplay.textContent = completedLetters + composingLetter;
        }

        lastLetterGroup[2] = newChar;
        composingLetter = Hangul.assemble(lastLetterGroup);
        textBox.value = completedLetters + composingLetter;
        textDisplay.textContent = completedLetters + composingLetter;

     } else if (lastLetterGroup.length == 4 && superDelete == false) { //test: "딸값" + backspace

        composingLetter = Hangul.assemble(lastLetterGroup.slice(0, -1));
        textBox.value = completedLetters + composingLetter;
        textDisplay.textContent = completedLetters + composingLetter;
    }
    compareAndAddClass();
    console.log("backspaceed ending....")

}

function radioButtonChanged(event) { 
    const selectedLayout = event.target.id;

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
            compareAndAddClass();
        }
    }

}

function enterClicked(){
    checkTextMatch();
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
};

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

function shiftClicked(){
    if (selectedLanguage == 'korean') {
        var koreanShiftedRadio = document.getElementById('koreanShifted');
        koreanShiftedRadio.checked = true;
        koreanShiftedRadio.dispatchEvent(new Event('change'));
    } else if (selectedLanguage == 'koreanShifted') {
        var koreanRadio = document.getElementById('korean');
        koreanRadio.checked = true;
        koreanRadio.dispatchEvent(new Event('change'));
    }

    compareAndAddClass();
}

function checkTextMatch(){
    const newChar = textDisplay.textContent;
    var textElement = document.getElementById('target-vocaburary');
    const targetText = textElement.textContent;
    if(targetText) {
        if (newChar === targetText) {
            completedLetters="";
            composingLetter="";
            //textDisplay.textContent = textBox.value;
    
                textElement.classList.add('font-effect-fire-animation');
                textDisplay.classList.add('font-effect-fire-animation');   
    
            setTimeout(function() {
                selectRandomWord();
                textElement.classList.remove('font-effect-fire-animation');
                textDisplay.classList.remove('font-effect-fire-animation');
                //textElement.style.color = 'black';
                textBox.value = '';
                textDisplay.textContent = '';
                //textBox.focus; 
              }, 700);
    
        } else {
             textElement.classList.add('font-effect-neon');
             textDisplay.classList.add('font-effect-neon');
            setTimeout(function() {
                textElement.classList.remove('font-effect-neon');
                textDisplay.classList.remove('font-effect-neon');
              }, 200); 
        }
    } else {
    }
};

function selectRandomWord() {
    var randomIndex = Math.floor(Math.random() * words.german.length);
    var germanWord = words.german[randomIndex]; // words
    var koreanWord = words.korean[randomIndex]; // alphabets

    // var randomIndex = Math.floor(Math.random() * alphabets.german.length);
    // var germanWord = alphabets.german[5]; //randomIndex
    // var koreanWord = alphabets.korean[5];

    var disassembed = Hangul.d(koreanWord);
    var koreanAlphabets = disassembed.join('');
    
    wrapLettersInSpan(koreanAlphabets, "vocaburary-hint");
    //wrapLettersInSpan(koreanWord, "target-vocaburary");
    document.getElementById("target-vocaburary").textContent = koreanWord;
    // Call the function to wrap each letter of the German and Korean vocabularies
    wrapLettersInSpan(germanWord, "german-vocaburary");
    showNextClick(koreanAlphabets, 0); 
};

// Function to wrap each letter of a word in <span> elements
function wrapLettersInSpan(word, containerId) {
    var container = document.getElementById(containerId);

    container.innerHTML = ''; // Clear existing content
    if(word == '') {
    } else {
        // Iterate over each letter of the word
        for (var i = 0; i < word.length; i++) {
            var span = document.createElement("span");
            span.textContent = word[i]; // Set the text content to the letter
            container.appendChild(span);
        }
    }
};

function compareAndAddClass() {
    const target = document.getElementById("target-vocaburary").textContent;
    const diassembledTarget = Hangul.d(target).join('');

    // Variable to track whether a letter was found in koreanShifted group
    var foundInShifted = false;

    // Select the corresponding <span> elements
    var germanSpans = document.getElementById("german-vocaburary").querySelectorAll("span");
    var koreanSpans = document.getElementById("vocaburary-hint").querySelectorAll("span");

    germanSpans.forEach(element => {
        element.classList.remove("font-effect-fire-animation");
    });

    if(koreanSpans) {
        koreanSpans.forEach(element => {
            element.classList.remove("font-effect-fire-animation");
        });
    }

    var koreanInput = Hangul.d(textDisplay.textContent).join('');
    if (diassembledTarget.length == 0) {        // diassembledTarget == null
        showNextClick('', 0);
    } else if (koreanInput.length == 0) { // initial state, before any letter is inputted.
        showNextClick(diassembledTarget, 0);
    }

    // Determine the minimum length of the two vocabularies
    var minLength = Math.min(diassembledTarget.length, koreanInput.length);

    // Iterate through each letter and compare up to the minimum length
    for (var i = 0; i < minLength; i++) {
        if (diassembledTarget[i] === koreanInput[i]) {
            // Add the 'fire' class to the matching letter spans
            if (germanSpans[i]) {
                germanSpans[i].classList.add("font-effect-fire-animation");
            } 
            koreanSpans[i].classList.add("font-effect-fire-animation");
            
            showNextClick(diassembledTarget, i+1)
        } else {
            showNextClick(diassembledTarget, i)
            break;
        }
}
};

function showNextClick(disassembed, index) {
    
    const shiftToggleButton = document.getElementById('shift');
    // Check if there is an li tag with class="clickThisKey"
    var liElement = document.querySelector('li.clickThisKey');
    // If li tag with class="clickThisKey" exists, remove the class
    if (liElement) {
        liElement.classList.remove('clickThisKey');
    } else {
        console.log('There is no li tag with class="clickThisKey"');
    }

    if (disassembed.length == 0 || disassembed.length == index ) { // if there is no matching korean for the german 
        document.getElementById('enter').classList.add('clickThisKey');
    } else { 
        var nextClick = disassembed[index];
        // Check if the letter is found in the koreanShifted group


    if(selectedLanguage == 'korean') {
        if (keyboardLayouts.korean.includes(nextClick)){
            keyIndex = keyboardLayouts.korean.indexOf(nextClick);
            shiftToggleButton.classList.remove("clickThisKey");
        } else {
            shiftToggleButton.classList.add("clickThisKey");
            keyIndex = keyboardLayouts.koreanShifted.indexOf(nextClick);
        }
    } else if(selectedLanguage == 'koreanShifted') {
        if (keyboardLayouts.koreanShifted.includes(nextClick)) {
            keyIndex = keyboardLayouts.koreanShifted.indexOf(nextClick);
            shiftToggleButton.classList.remove("clickThisKey");
        } else {
            shiftToggleButton.classList.add("clickThisKey");
            keyIndex = keyboardLayouts.korean.indexOf(nextClick);
        }
    } else {
        var koreanShiftedRadio = document.getElementById('koreanShifted');
        koreanShiftedRadio.checked = true;
        koreanShiftedRadio.dispatchEvent(new Event('change'));
    }
        // Create the id using the index
        var id = "key-" + keyIndex;
        // Find the <li> element with the id and add the "fire" class
        var liElement = document.getElementById(id);
        if (liElement) {
            liElement.classList.add("clickThisKey");
        }
    }
};
