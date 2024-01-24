let selectedLiElements; // Declare selectedLiElements globally

window.onload = function(){
    selectedLiElements = document.querySelectorAll('.printable li:not([class])');
    console.log('Number of selected li elements(printerble keys):', selectedLiElements.length);
    }

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
}

function changeKeyboard(layout) {
    //const ulList = document.querySelectorAll('.printable li:not([class])');
    var index = 0;
    layout.forEach(row => {
        row.split('').forEach(key => {
            console.log('index of selected lan:', index);
            selectedLiElements[index].textContent = key;
            index++;
        });
        console.log("What ist row: ",row );
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Event listener for radio buttons
    document.querySelectorAll('input[name="keyboardLayout"]').forEach((radio) => {
        radio.addEventListener('change', (event) => {
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

console.log('Script loaded successfully end');
