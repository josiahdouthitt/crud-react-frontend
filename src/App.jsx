
import './App.css'
import NavBar from './components/NavBar'
import TableList from './components/TableList'
import ModalForm from './components/ModalForm'
import { useState } from 'react'

function App() {

  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');

  const handleOpen = (mode) => {
    setIsOpen(true);
    setModalMode(mode);
  }

  const handleSubmit = () => {
    if (modalMode === 'add') {
      console.log('modal mode Add');
    } else {
      console.log('modal mode Edit');
    }
  }

  return (
    <>
      <NavBar onOpen={()=>handleOpen('add')} />
      <TableList handleOpen={handleOpen}/>
      <ModalForm isOpen={isOpen} OnSubmit={handleSubmit} onClose={() => setIsOpen(false)}
        mode={modalMode}
      />
      
    </>
  )
}

export default App
