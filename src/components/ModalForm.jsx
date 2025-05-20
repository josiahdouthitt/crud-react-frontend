import { useState } from "react"

export default function ModalForm({ isOpen, onClose, mode, OnSubmit, itemData }) {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const itemData = {name, date, location, price}
        await OnSubmit(itemData);
    } catch (err) {
        console.error("Error adding item", err);
    }
    onClose();
}

    return (
        <>
            <dialog id="my_modal_3" className="modal" open={isOpen}>
                <div className="modal-box">
                    <h2 className="font-bold text-lg py-4">{mode === 'edit' ? 'Edit Item' : 'Add Item'}</h2>
                    <form method="dialog" onSubmit={handleSubmit}>
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>

                        
                        <label className="input input-boardered my-4 flex items-center gap-2">
                            Name:
                            <input type="text" className="grow" onChange={(e) => setName(e.target.value)}/>
                        </label>
                        <label className="input input-boardered my-4 flex items-center gap-2">
                            Date:
                            <input type="date" className="grow" onChange={(e) => setDate(e.target.value)}/>
                        </label>
                        <label className="input input-boardered my-4 flex items-center gap-2">
                            Location:
                            <input type="text" className="grow" onChange={(e) => setLocation(e.target.value)}/>
                        </label>
                        <label className="input input-boardered my-4 flex items-center gap-2">
                            Price:
                            <input type="number" className="grow" onChange={(e) => setPrice(e.target.value)}/>
                        </label>

                        <button className="btn btn-success"> {mode === 'edit' ? 'Save Changes' : 'Save Item'}</button>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={onClose}>close</button>
                </form>
            </dialog>
        </>
    )
}