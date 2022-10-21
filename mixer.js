var upload_prefix = null

function play(prefix) {
    let src = $('#' + prefix + '_list :selected').val()
    let player = $('#' + prefix + '_player')[0]
    if (src != '') {
        player.src = src
        player.play()
    } else {
        player.pause()
    }
}

function setVolume(prefix, volume) {
    let player = $('#' + prefix + '_player')[0]

    player.volume = volume / 100.0
}

function mix() {
    let vol = parseInt($('#balance').val())
    
    setVolume('ambience', 100-vol)
    setVolume('tone', vol)
}

function showTrack(prefix, tag, title, selected=false) {
    let target = $('#' + prefix + '_list')[0]

    var item = new Option()
    item.value = tag
    item.innerHTML = title
    if (selected) {
        item.setAttribute('selected', 'selected')
    }
    target.appendChild(item)
}

function add(prefix) {
    let source = $('#upload')[0]
    upload_prefix = prefix
    source.click()
}

function startUpload() {   
    let source = $('#upload')
    
    // iterate all selected files
    $.each(source[0].files, function(index, obj) {
        let url = (window.URL || window.webkitURL).createObjectURL(obj)
        
        showTrack(upload_prefix, url, obj.name)
    })
    
    upload_prefix = null
    source.val("")
}

function clearAll(prefix) {
    let q = 'Really clear all ' + prefix + 's?'
    
    if (confirm(q)) {
        let target = $('#' + prefix + '_list')
        target.empty()
        showTrack(prefix, '', '---', true)
        
        play(prefix)
    }
}
