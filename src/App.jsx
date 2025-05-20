
import './App.css'
import { useState } from 'react'
import axios from 'axios'
import NavBar from './components/NavBar'
import TableList from './components/TableList'
import ModalForm from './components/ModalForm'

function App() {

  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');

  const [ searchTerm, setSearchTerm ] = useState('');
  const [ itemData, setItemData ] = useState(null);

  const handleOpen = (mode) => {
    setIsOpen(true);
    setModalMode(mode);
  }

  const handleSubmit = async (newItemData) => {
    if (modalMode === 'add') {
      try {
        const response = await axios.post('http://localhost:3000/api/items', newItemData)
        console.log('Item added:', response.data);
      } catch (err) {
        console.error('Error adding item:', error);
      }
    } else {
      console.log('modal mode Edit');
    }
  }

  return (
    <>
      <NavBar onOpen={()=>handleOpen('add')} onSearch={setSearchTerm} />
      <TableList handleOpen={handleOpen} searchTerm={searchTerm}/>
      <ModalForm isOpen={isOpen} OnSubmit={handleSubmit} onClose={() => setIsOpen(false)}
        mode={modalMode} itemData={itemData}
      />
      
    </>
  )
}

export default App
