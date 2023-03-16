import * as React from 'react'
import Modal from '../BaseComponents/Modal'
import SvgSymbol from '../BaseComponents/SvgSymbol'
import { useBemify } from '../../hooks/useBemify'

export default function Test(): JSX.Element {
  const [openModal, setOpenModal] = React.useState(false)
  const [touchOne, setTouchOne] = React.useState(false)
  const [touchTwo, setTouchTwo] = React.useState(false)

  const bem = useBemify('test')

  return (
    <div className="bg-grey-50 h-min-vh-100">
      <div className="container">
        <button onClick={() => setOpenModal(true)}>Open</button>

        <div
          className={bem(
            '',
            [touchOne, 'bg-red'],
            [touchTwo, 'bg-blue-50'],
            'p-xxl border-rounded'
          )}
        >
          <h2>Testing Bem</h2>
          <h2>
            <button
              className={bem('button', [touchOne, 'active'])}
              style={{ cursor: 'pointer' }}
              onClick={() => setTouchOne((prev) => !prev)}
            >
              Color 1
            </button>
            <button
              className={bem('button', [touchTwo, 'active'])}
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
    </div>
  )
}
