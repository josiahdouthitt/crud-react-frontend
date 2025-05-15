export default function TableList({ handleOpen }) {

    const items = [
        { id: 1, name: "Test Item", date_purchased: "No Date", location: "Not Given", price: 1.00 },
        { id: 2, name: "Test Item2", date_purchased: "No Date", location: "Not Given", price: 4.57},
        { id: 3, name: "Test Item3", date_purchased: "No Date", location: "Not Given", price: 6.56 },
    ]

    return (
        <>
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

                        {items.map((item) => (
                            <tr key={item.id}>
                                <th>{item.id}</th>
                                <td>{item.name}</td>
                                <td>{item.date_purchased}</td>
                                <td>{item.location}</td>
                                <td>{item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD'})}</td>
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