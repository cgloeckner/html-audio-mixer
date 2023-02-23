/**
https://github.com/cgloeckner/html-audio-mixer

Copyright (c) Christian Glöckner
License: MIT (see LICENSE for details)
*/

var next_id = 0

function onBrowse() {
    $('#files').click()
}

function onUpload() {
    let source = $('#files')
    let files = source[0].files
    
    $.each(source[0].files, (index, obj) => {
        var id = next_id++
        onAdd(id)
        
        const reader = new FileReader()
        reader.onload = function() {
            $(`#label${id}`)[0].innerHTML = obj.name
            var channel = $(`#channel${id}`)[0]
            channel.src = this.result
            channel.volume = 0
        }
        reader.readAsDataURL(obj)
    })
    
    source.val("")
}

function onAdd(id) {
    let mixer = $('#mixer')
    let div = document.createElement('div')
    div.id = `strip${id}`
    div.classList = ['strip']
    if (id % 2 == 0) {
        div.classList.add('dark')
    } else {
        div.classList.add('light')
    }
    mixer.append(div)
    div = mixer[0].lastChild

    let remove_btn = document.createElement('input')
    remove_btn.type = 'button'
    remove_btn.value = 'X'
    div.append(remove_btn)
    remove_btn = $(div.lastChild)

    let label_div = document.createElement('div')
    label_div.id = `label${id}`
    label_div.classList = ['label']
    div.append(label_div)

    let fader = document.createElement('input')
    fader.id = `fader${id}`
    fader.type = 'range'
    fader.min = 0
    fader.max = 100
    fader.step = 1
    fader.value = 0
    div.append(fader)
    fader = $(div.lastChild)

    let player = new Audio()
    player.id = `channel${id}`
    player.loop = true
    player.volume = 0
    div.append(player)
    player = div.lastChild

    let volume_div = document.createElement('div')
    volume_div.classList = ['percent']
    volume_div.id = `volume${id}`
    volume_div.innerHTML = '0%'
    div.append(volume_div)
    
    remove_btn.on('click', () => { onRemove(id) })
    fader.on('input', () => { onMix(id) })
}

function onRemove(id) {
    $(`#strip${id}`).remove()
}

function onMix(id) {
    let volume = $(`#fader${id}`)[0].value
    console.log(volume)
    $(`#volume${id}`)[0].innerHTML = `${volume}%`
    
    let channel = $(`#channel${id}`)[0]
    if (channel.volume == 0) {
        channel.play()
    }
    channel.volume = volume / 100.0
    if (volume == 0) {
        channel.pause()
        channel.currentTime = 0
    }
}
