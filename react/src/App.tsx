import * as React from 'react'
import { useState } from 'react'
import Modal from './components/BaseComponents/Modal'
import SvgSymbol from './components/BaseComponents/SvgSymbol'

function App() {
  const [openModal, setOpenModal] = useState(false)
  return (
    <div>
      <button onClick={() => setOpenModal(true)}>Open</button>
      <Modal trigger={openModal} setTrigger={() => setOpenModal(false)}>
        <>
          <SvgSymbol icon="arrow-right" width="40px" height="24px" />

          <h1>Hello there</h1>
          <h1>Hello there</h1>
          <h1>Hello there</h1>
          <h1>Hello there</h1>
        </>
      </Modal>
    </div>
  )
}
export default App
