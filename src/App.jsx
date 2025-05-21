
import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import NavBar from './components/NavBar'
import TableList from './components/TableList'
import ModalForm from './components/ModalForm'

function App() {

  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');

  const [searchTerm, setSearchTerm] = useState('');
  const [itemData, setItemData] = useState(null);
  const [tableData, setTableData] = useState([])


  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/items')
      setTableData(response.data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = (mode, item) => {
    setItemData(item);
    setIsOpen(true);
    setModalMode(mode);
  }

  const handleSubmit = async (newItemData) => {
    if (modalMode === 'add') {
      try {
        const response = await axios.post('http://localhost:3000/api/items', newItemData)
        console.log('Item added:', response.data);
        setTableData((prevData) => [...prevData, response.data]);
      } catch (err) {
        console.error('Error adding item:', error);
      }
    } else {
      try {
        const response = await axios.put(`http://localhost:3000/api/items/${itemData.id}`, newItemData)
        console.log('Item updated:', response.data);
        setTableData((prevData) =>
          prevData.map((item) => (item.id === itemData.id ? response.data : item))
        );
      } catch (err) {
        console.error('Error updating item:', error);
      }
    }
  }

  return (
    <>
      <NavBar onOpen={() => handleOpen('add')} onSearch={setSearchTerm} />
      <TableList setTableData={setTableData} tableData={tableData}
        handleOpen={handleOpen} searchTerm={searchTerm} />
      <ModalForm isOpen={isOpen} OnSubmit={handleSubmit} onClose={() => setIsOpen(false)}
        mode={modalMode} itemData={itemData}
      />

    </>
  )
}

export default App
