/**
https://github.com/cgloeckner/html-audio-mixer

Copyright (c) Christian Glöckner
License: MIT (see LICENSE for details)
*/

var next_id = 0

/// Start playback on given channel
play = (id) => {
    let label = $(`#label${id}`)
    let channel = $(`#channel${id}`)
    let option = $('#tracks :selected')

    if (option.val() != null) {
        label[0].innerHTML = option.text()
        channel[0].src = option.val()
        channel[0].play()
        next_id = (id + 1) % 2
        
    } else {
        label[0].innerHTML = '&lt;PAUSE&gt;'
        channel[0].src = null
        channel[0].pause()
        next_id = id
    }
     
}

/// Stop playback on given channel
stop = (id) => {
    let label = $(`#label${id}`)
    let channel = $(`#channel${id}`)
    
    label[0].innerHTML = '&lt;PAUSE&gt;'
    channel[0].src = null
    
    next_id = id
}

/// Set volume mix for both channels at once
mix = () => {
    let volume = parseInt($('#balance').val())
    let channel0 = $('#channel0')
    let channel1 = $('#channel1')

    channel0[0].volume = (100 - volume) / 100.0
    channel1[0].volume = volume / 100.0
}

/// Browse for files
browse = () => {
    let source = $('#files')
    source[0].click()
}

async function load(file) {
    let base64 = await new Promise((resolve) => {
        let reader = new FileReader()
        reader.onload = (e) => resolve(reader.result)
        reader.readAsDataURL(file)
    })

    return base64
}

/// Upload selected files
upload = () => {
    let source = $('#files')
    let files = source[0].files
    
    $.each(source[0].files, (index, obj) => {
        const reader = new FileReader()
        reader.onload = function() {
            add(this.result, obj.name)
        }
        reader.readAsDataURL(obj)
    })
    
    source.val("")
}

/// Add given track to tracklist
add = (uri, title) => {
    let tracks = $('#tracks')

    // check for duplicate
    let skip = false
    $.each(tracks[0], (index, option) => {
        if (option.innerHTML == title) {
            skip = true
            return
        }
    })
    if (skip) {
        return
    }
    
    // save to browser cache
    // @NOTE: disabled (file size may exceed localStorage)
    //localStorage.setItem(`title:${title}`, uri)

    // add to list
    let item = new Option()
    item.value = uri
    item.innerHTML = title
    tracks[0].appendChild(item)
}
 
/// Remove selected track from tracklist
remove = () => {
    let option = $('#tracks :selected')

    // remove from browser cache
    // @NOTE: disabled
    //let key = `title:${option[0].innerHTML}`
    //localStorage.removeItem(key)

    // remove from list
    option.remove()
}

/// Initialize audio mixer
init = () => {
    let len = localStorage.length
    for (var i = 0; i < len; ++i) {
        let key = localStorage.key(i)
        if (!key.startsWith('title:')) {
            continue
        }

        // parse data
        let title = key.split('title:')[1]
        let uri = localStorage.getItem(key)

        // @NOTE: disabled
        //add(uri, title)
        //console.log(`Loaded ${title}`)
    }
}
