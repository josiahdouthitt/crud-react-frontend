import axios from 'axios';
import { useState } from 'react';

export default function TableList({ handleOpen, tableData, setTableData, searchTerm }) {
    const [error, setError] = useState(null);

    const filterData = tableData.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Delete this item?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/api/items/${id}`);
                setTableData((prevData) => prevData.filter(item => item.id !== id));
            } catch (err) {
                setError(err.message);
            }
        }
    }

    return (
        <>
            {error && <div className='alert alert-error'>{error}</div>}

            <div className="overflow-x-auto mt-10">
                <table className="table">
                    <thead className="bg-base-200">
                        <tr>
                            <th>Item name</th>
                            <th>Date of purchase</th>
                            <th>Location</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody className="hover">
                        {filterData.map((item) => (
                            <tr key={item.id}>

                                <td>{item.name}</td>
                                <td>{item.date.slice(0, 10)}</td>
                                <td>{item.location}</td>
                                <td>${item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                                <td>
                                    <button onClick={() => handleOpen('edit', item)} className="btn btn-secondary">Update</button>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(item.id)} className="btn btn-accent">Delete</button>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
        </>
    )
}