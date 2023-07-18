import { useModalContext } from "../../context/modal.context"

function Modal({children}) {
  
  const {showModal, toggleModal, modalChild} = useModalContext()
  console.log(modalChild);
  return (
    showModal && <div onClick={(e) => {
      e.target.classList.contains('fixed') &&
      toggleModal(e)
    }} className='fixed bg-white/20 backdrop-blur-sm z-10 inset-0 flex justify-center items-center'>
      {children}{modalChild}
    </div>
  )
}

export default Modal