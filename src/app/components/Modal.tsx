import { FC, ReactNode } from "react"

interface ModalProps {
  modalOpen: boolean,
  setModalOpen: (modalOpen: boolean) => boolean | void,
  children: ReactNode
}

const Modal: FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
  return (

    <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
      <div className='modal-box relative'>
        <label
          className='btn btn-sm btn-circle absolute right-2 top-2'
          onClick={() => setModalOpen(false)}
        >
          ✕
        </label>
        {children}
      </div>
    </div>
  )
}

export default Modal
