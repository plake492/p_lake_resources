import * as React from 'react'
import Modal from './components/BaseComponents/Modal'
import SvgSymbol from './components/BaseComponents/SvgSymbol'
import { useBemify } from './hooks/useBemify'

function App() {
  const [openModal, setOpenModal] = React.useState(false)
  const [touchOne, setTouchOne] = React.useState(false)
  const [touchTwo, setTouchTwo] = React.useState(false)

  const bem = useBemify('test')

  const style = {
    height: '200px',
    width: '300px',
    margin: '1rem',
    padding: '1rem',
    borderRadius: '8px',
  }

  return (
    <div>
      <button onClick={() => setOpenModal(true)}>Open</button>

      <div
        style={style}
        className={bem('bg', [touchOne, 'active'], [touchTwo, 'cool'])}
      >
        <h2>Testing Bem</h2>
        <h2>
          <button
            style={{ cursor: 'pointer' }}
            onClick={() => setTouchOne((prev) => !prev)}
          >
            Color 1
          </button>
          <button
            style={{ cursor: 'pointer' }}
            onClick={() => setTouchTwo((prev) => !prev)}
          >
            Color 2
          </button>
        </h2>
        <div className={bem('alt-bg', '--modifier')}>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas
            in molestias sequi iste non optio, natus aut nam rem libero
            consequatur accusamus molestiae deleniti perspiciatis quis,
            laboriosam, obcaecati consectetur eius?
          </p>
        </div>
      </div>

      <Modal trigger={openModal} setTrigger={() => setOpenModal(false)}>
        <>
          <SvgSymbol icon="arrow-left" width="40px" height="24px" />
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
