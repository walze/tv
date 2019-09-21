import React, { useRef, useEffect, useState } from 'react'
import { render } from 'react-dom'

import channels from './channels.txt'

const getChannels = () => fetch(channels)
  .then(t => t.text())
  .then(t => t.split(/\s/))

const parent = document.querySelector('#player')

const play = (source) => {
  parent.innerHTML = ''

  const clap = {
    source,
    height: '100vh',
    width: '100%',
    parent,
    plugins: [LevelSelector, ChromecastPlugin],
    mimeType: 'application/x-mpegURL',
    autoPlay: true,
    playInline: true,
    mediacontrol: { seekbar: '#eee', buttons: '#eee' },
    chromecast: {
      appId: '9DFB77C0',
      contentType: 'video/m3u8',
      media: {
        type: ChromecastPlugin.None,
        title: 'Live',
        subtitle: 'Live'
      }
    }
  }

  const player = new Clappr.Player(clap)
  player.play()
}


const App = () => {
  const [channels, setChannels] = useState([])
  const [currentChannel, setCurrent] = useState(null)

  useEffect(() => {
    getChannels()
      .then(setChannels)

    if (channels[currentChannel])
      play(channels[currentChannel])
  }, [currentChannel])

  return (
    <div>
      <select defaultValue='null' onChange={({ target }) => setCurrent(Number(target.value))}>
        <option disabled value='null'>Choose a Channel</option>

        {channels.map((v, i) => (
          <option key={v} value={i}>Channel {i + 1}</option>
        ))}
      </select>

    </div>
  )
}

render(
  <App />,
  document.querySelector('#root')
)