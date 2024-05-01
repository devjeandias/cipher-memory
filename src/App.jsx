import { useEffect, useState } from 'react'
import './App.css'

const notasMusicais = [
  { "acorde": "DÓ", "cifra": "C" },
  { "acorde": "DÓ#", "cifra": "C#" },
  { "acorde": "RÉ", "cifra": "D" },
  { "acorde": "RÉ#", "cifra": "D#" },
  { "acorde": "MI", "cifra": "E" },
  { "acorde": "FÁ", "cifra": "F" },
  { "acorde": "FÁ#", "cifra": "F#" },
  { "acorde": "SOL", "cifra": "G" },
  { "acorde": "SOL#", "cifra": "G#" },
  { "acorde": "LÁ", "cifra": "A" },
  { "acorde": "LÁ#", "cifra": "A#" },
  { "acorde": "SI", "cifra": "B" }
]

function App() {
  const [pontosMaximo, setPontosMaximo] = useState(0);
  const [pontos, setPontos] = useState(0);
  const [currentNota, setCurrentNota] = useState({});
  const [timerAnimate] = useState(2000);
  const BODY = document.querySelector('body')

  function sortNota() {
    const randomIndex = Math.floor(Math.random() * notasMusicais.length);
    setCurrentNota( notasMusicais[randomIndex] )
  }

  function validaNota(e, data) {
    if(currentNota.cifra === data){
      setPontos( pontos + 1 )
      BODY.classList.add('success')
      e.target.classList.add('success')

      setTimeout( () => {
        BODY.classList.remove('success')
        e.target.classList.remove('success')
      }, timerAnimate)
    } else {
      const keySuccess = document.querySelector(`*[data-cifra="${currentNota.cifra}"]`)
      BODY.classList.add('error')
      
      e.target.classList.add('error')
      keySuccess.classList.add('success')

      console.log(keySuccess)
      
      setTimeout( () => {
        BODY.classList.remove('error')
        e.target.classList.remove('error')
        keySuccess.classList.remove('success')
      }, timerAnimate)
    }
  }
  
  function handdlerClick(e, data) {
    validaNota(e, data)
    setPontosMaximo( pontosMaximo + 1  )

    setTimeout( () => {
      sortNota();
    }, timerAnimate)
  }

  useEffect( () => {
    sortNota();
  }, [])

  return (
    <div className='cifraMemory'>
      <span className='cifraMemory-pontos'>{pontosMaximo} / <strong>{pontos}</strong></span>
      <span className='cifraMemory-nota'>{currentNota.cifra}</span>
      
      <div className='cifraMemory-teclado'>
        {
          notasMusicais.map( ( nota, i ) =>
            <button onClick={ (e) => handdlerClick(e, nota.cifra) } key={nota.acorde+i} className='cifraMemory-tecla' data-cifra={nota.cifra}>{ nota.acorde }</button>
          )
        }
      </div>
    </div>
  )
}

export default App