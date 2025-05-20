import axios from 'axios';
import { useState, useEffect } from 'react';

export default function TableList({ handleOpen , searchTerm}) {
    const [ tableData, setTableData ] = useState([])
    const [ error, setError ] = useState(null);

useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/items')
            setTableData(response.data);
        } catch (err) {
            setError(err.message);
        }
    }

fetchData();

}, []);

const filterData = tableData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
);

    return (
        <>
            {error && <div className='alert alert-error'>{error}</div>}

            <div className="overflow-x-auto mt-10">
                <table className="table">
                    {/* head */}
                    <thead className="bg-base-200">
                        <tr>
                            <th></th>
                            <th>Item name</th>
                            <th>Date of purchase</th>
                            <th>Location</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody className="hover">
                        {/* row 1 */}

                        {filterData.map((item) => (
                            <tr key={item.id}>
                                <th>{item.id}</th>
                                <td>{item.name}</td>
                                <td>{item.date}</td>
                                <td>{item.location}</td>
                                <td>${item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD'})}</td>
                                <td>
                                    <button onClick={() => handleOpen('edit')} className="btn btn-secondary">Update</button>
                                </td>
                                <td>
                                    <button className="btn btn-accent">Delete</button>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
        </>
    )
}