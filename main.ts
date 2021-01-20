function calc () {
    if (operator == 10) {
        first_num = first_num + current_number
    } else if (operator == 11) {
        first_num = first_num - current_number
    } else if (operator == 12) {
        first_num = first_num * current_number
    } else if (operator == 13) {
        if (current_number != 0) {
            first_num = first_num / current_number
        } else {
            basic.showIcon(IconNames.Heart)
            reset()
            DisplayScreen()
        }
    }
}
function addToCurrentNum () {
    current_number = current_screen + current_number * 10
    current_screen = 0
    music.playTone(294, music.beat(BeatFraction.Sixteenth))
    DisplayScreen()
}
input.onButtonPressed(Button.A, function () {
    if (current_screen == 14) {
        current_screen = 0
    } else {
        current_screen += 1
    }
    DisplayScreen()
})
input.onButtonPressed(Button.B, function () {
    if (current_screen < 10) {
        input_type = 0
    } else if (current_screen < 14) {
        input_type = 1
    } else {
        input_type = 2
    }
    if (state == 0 && input_type == 0) {
        addToCurrentNum()
    } else if (state == 0 && input_type == 1) {
        first_num = current_number
        current_number = 0
        operator = current_screen
        change_state(1)
    } else if (state == 0 && input_type == 2) {
        first_num = current_number
        current_number = 0
        displayAnswer()
    } else if (state == 1 && input_type == 0) {
        addToCurrentNum()
        change_state(2)
    } else if (state == 1 && input_type == 1) {
        operator = current_screen
        change_state(1)
    } else if (state == 1 && input_type == 2) {
        displayAnswer()
    } else if (state == 2 && input_type == 0) {
        addToCurrentNum()
    } else if (state == 2 && input_type == 1) {
        calc()
        operator = current_screen
        change_state(2)
    } else if (state == 2 && input_type == 2) {
        calc()
        displayAnswer()
    } else if (state == 3 && input_type == 0) {
        current_number = current_screen
        change_state(0)
    } else if (state == 3 && input_type == 1) {
        operator = current_screen
        change_state(1)
    } else if (state == 3 && input_type == 2) {
        displayAnswer()
    }
})
function displayAnswer () {
    state = 3
    basic.clearScreen()
    music.playTone(330, music.beat(BeatFraction.Sixteenth))
    basic.showNumber(first_num)
}
function change_state (new_state: number) {
    state = new_state
    current_screen = 0
    music.playTone(262, music.beat(BeatFraction.Sixteenth))
    DisplayScreen()
}
function reset () {
    state = 0
    operator = 0
    current_number = 0
    first_num = 0
}
function DisplayScreen () {
    if (current_screen < 10) {
        basic.showNumber(current_screen)
    } else if (current_screen == 10) {
        basic.showString("+")
    } else if (current_screen == 11) {
        basic.showString("-")
    } else if (current_screen == 12) {
        basic.showString("*")
    } else if (current_screen == 13) {
        basic.showString("/")
    } else if (current_screen == 14) {
        basic.showString("=")
    }
}
let state = 0
let input_type = 0
let current_screen = 0
let current_number = 0
let first_num = 0
let operator = 0
change_state(0)
