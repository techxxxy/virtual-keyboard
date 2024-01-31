
let selectedLiElements;
let textBox;
let capslockOn = false;
let superDelete = true;
let selectedLanguage = 'german'; // orginal is not language, so it will be ignored


document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('keyup', documentKeyPressed);

    textBox = document.getElementById('textBox');
    textBox.addEventListener('input', textBoxInputed);
    textBox.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            if (!event.isComposing) {
                console.log(textBox.value);
                console.log('isComposing:', event.isComposing);
                 checkTextMatch();
            }
        }
    });
    
    selectRandomWord();

    // spacebar & alphanumeric Event listener for li elements 
    selectedLiElements = document.querySelectorAll('li.typing-key'); 
    //console.log("selectedLiElements",selectedLiElements)
    selectedLiElements.forEach(li => {
        li.addEventListener('click', printableClicked);
    });

// Get all elements with class 'typing-key-'
var typingKeys = document.querySelectorAll('li.typing-key');

// Iterate through each element and extract the innerHTML
/* var allInnerHTML = [];
typingKeys.forEach(function(element) {
    allInnerHTML.push(element.innerHTML.trim());
});
 */

// Now 'allInnerHTML' array contains the innerHTML of all <li> elements with class 'typing-key-'

    const backspaceButton = document.getElementById('backspace'); // replace 'backButton' with the actual id of your button
    if (backspaceButton) {
        backspaceButton.addEventListener('click', simulateBackspace);
    }

    const enterButton = document.getElementById('enter'); // replace 'backButton' with the actual id of your button
    if (enterButton) {
        enterButton.addEventListener('click', simulateEnter);
    }

    const capslockButton = document.getElementById('capslock'); // replace 'backButton' with the actual id of your button
    if (capslockButton) {
        capslockButton.addEventListener('click', simulateCapslock);
    }

/*     function setupButtonClickEvent(buttonId, handlerFunction) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', handlerFunction);
        }
    }

    setupButtonClickEvent('backspace', simulateBackspace);
    setupButtonClickEvent('enter', simulateEnter);
    setupButtonClickEvent('capslock', simulateCapslock); */

    // Event listener for radio buttons
    document.querySelectorAll('input[name="keyboardLayout"]').forEach((radio) => {
        radio.addEventListener('change', (event) => {
            //textBox.focus();
            console.log('Radio button changed');
            let selectedLayout = event.target.id;
            console.log('selectedLayout', selectedLayout);

            if (selectedLayout == 'original') {
                changeKeyboardToOriginal(keyboardLayouts[selectedLayout]);
            } else {
                simulateCapslock(selectedLayout); // depending language, capsLock light must be on or off
                if (keyboardLayouts[selectedLayout]) {
                    console.log('keyboardLayouts[selectedLayout]', keyboardLayouts[selectedLayout]);
                    changeKeyboard(keyboardLayouts[selectedLayout]);
                    selectedLanguage = selectedLayout;
                    console.log('selectedLanguage', selectedLanguage);
                } else {
                    //console.log('Layout does not exist:', selectedLayout);
                }
            }
       });
    });
});

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
   
var myarray = [{german: 'a', korean: 'ㅇ'}] 

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
    console.log("textBoxInputed()");
    superDelete = isNotKorean();
    console.log("isNotKorea", isNotKorean(), "superDelete", superDelete );
    updateTextDisplay();
}

function printableClicked(event) {
    const clickedLi = event.target.closest('li'); // "event.target" can be child of li like div or span.
    var index = parseInt(clickedLi.id.match(/\d+/)[0], 10); // to extract only number from id, which is key-13 format
    var inputText = keyboardLayouts[selectedLanguage][index];
    textBox.value += inputText;
    textBox.dispatchEvent(new Event('input')); 

    // if (capslockOn) {
    //     var text = keyboardLayouts.korean[index];
    //     superDelete = false;
    // } else {
    //     var text = keyboardLayouts.german[index]
    //     superDelete = true;
    // }


    // Trigger the input event to update the display

}

function allocateTextInKey(){
}

function documentKeyPressed(event) {
    //console.log(event.keyCode);
}




function updateTextDisplay() {
    textDisplay = document.getElementById('textDisplay');
    if (textDisplay) {
        textDisplay.textContent = Hangul.assemble(textBox.value);
        //console.log('textDisplay.textContent: ', textDisplay.textContent);
    }
}



function simulateBackspace() { // 딸깍+bbb = 딸ㄱ 이어야함. 딹 으로 변함?. 딸ㄱ 으로 변하게 수정필요, 바+화살표+ㄱ=바ㄱ 으로 표시되어야함.
    console.log("simulateBackspace2 starting");
    const textDisplay = document.getElementById('textDisplay');
    var text = textDisplay.textContent;
    console.log("text", text);

    // checking last letter is korean

    console.log("isKorean",isNotKorean());

     if(text.length == 0){ 
        return;
    } else if (!isNotKorean) {
        textBox.value = text.slice(0, -1);
        superDelet = true; 
    }

 
    // var groups = Hangul.d(text, true);
    // var lastGroup = groups[groups.length-1];

    // if (!isKorean || superDelete) {
    //     textDisplay.text = text.slice(0, -1);
    // } else if (lastGroup.length == 1 && lastChar !== 'ㄲ'|| 'ㄸ' || 'ㅃ' || 'ㅆ'|| 'ㅉ') {
    //     var disassembled = Hangul.disassemble(textBox.value);
    //     disassembled = disassembled.slice(0, -1);
    //     textBox.value = Hangul.assemble(disassembled);
    //     superDelete = true;
    // } else {
    //     console.log("Hangul.disassemble(lastLetter)", Hangul.disassemble(lastLetter));
    //     var disassembled = Hangul.disassemble(textBox.value);
    //     disassembled = disassembled.slice(0, -1);
    //     textBox.value = Hangul.assemble(disassembled);
    //     superDelete = false;
    // }






    //else if (lastGroup.length == 1 ){ // 한글이면서 마지막 글자가 1문자만 남았는데 된소리이면 보통소리로 바꿈
    //     var disassembled = Hangul.disassemble(textBox.value);
    //     var lastChar = lastGroup[0];
        
    //     if (lastChar == 'ㄲ'|| 'ㄸ' || 'ㅃ' || 'ㅆ'|| 'ㅉ') {
    //         if (lastChar == 'ㄲ') {
    //             textBox.value = leftLetter + 'ㄱ';
    //             console.log("lastChar", lastChar, "leftLetter", leftLetter, "textBox.value", textBox.value)
    //         } else if (lastChar == 'ㄸ') {
    //             lastChar = 'ㄷ';
    //         } else if (lastChar == 'ㅃ') {
    //             lastChar = 'ㅂ';
    //         } else if (lastChar == 'ㅆ') {
    //             lastChar = 'ㅅ';
    //         } else if (lastChar == 'ㅉ') {
    //             lastChar = 'ㅈ';
    //         }
    //         superDelete = false;
    //     } else {                        //1문자 남았는데 보통소리면 그냥 자름
    //             textBox.value = textBox.value.slice(0, -1);
    //             superDelete = true;
    //     }
    //     textBox.value = Hangul.assemble(disassembled);
    //     superDelete = true;

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
    console.log("backspaceed....")
    textBox.dispatchEvent(new Event('input'));
}

function simulateEnter(){
    checkTextMatch();
}

function simulateCapslock(newLanguage) {
    var newLang = newLanguage;
    var koreanRadio = document.getElementById('korean');
    var germanRadio= document.getElementById('german');
    var koreanShiftedRadio = document.getElementById('koreanShifted');
    var germanShiftedRadio= document.getElementById('germanShifted');

    if(newLang == 'korean') { // from here triggered by radio button
        console.log("koreanRadioTriggered.")
        document.getElementById('capslock-light').style.cssText = 'color:rgb(4, 255, 0); text-shadow: 0 0 1px #000000, 0 0 3px #73ff00;';
        koreanRadio.checked = true;
        capslockOn = true;
    } else if (newLang == 'german') {
        document.getElementById('capslock-light').style.cssText = '';
        germanRadio.checked = true;
        capslockOn = false;
    } else if (newLang == 'germanShifted') {
        germanShifted.checked = true;
        document.getElementById('capslock-light').style.cssText = '';
        capslockOn = false;

    } else if (newLang == 'koreanShifted') {
        document.getElementById('capslock-light').style.cssText = 'color:rgb(4, 255, 0); text-shadow: 0 0 1px #000000, 0 0 3px #73ff00;';
        koreanShiftedRadio.checked = true;
        capslockOn = true;
    } else { // from here tiggered by capsLock
        if (capslockOn) {
            document.getElementById('capslock-light').style.cssText = '';
            koreanRadio.checked = false;
            germanRadio.checked = true;
            capslockOn = false;
    
        } else {
            document.getElementById('capslock-light').style.cssText = 'color:rgb(4, 255, 0); text-shadow: 0 0 1px #000000, 0 0 3px #73ff00;';
            koreanRadio.checked = true;
            germanRadio.checked = false;
            capslockOn = true;
        }
    }
}


console.log('Script loaded successfully end');

function checkTextMatch(){
    const inputText = document.getElementById('textDisplay').textContent;
    var textElement = document.getElementById('target-vocaburary');
    const targetText = textElement.textContent;
 
    if (inputText === targetText) {
        textElement.style.color = 'green';
        textBox.value = '';
        updateTextDisplay();
        // textBox.addEventListener(!textBox.isComposing, function(event) {
        //     // Clear the input field value after the composition has ended
        //     textBox.value = '';
        //   });
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
    console.log ("selectRandomWord,");
    var randomIndex = Math.floor(Math.random() * words.length);
    document.getElementById('target-vocaburary').textContent = words[randomIndex];
}







