import { useEffect, useState } from "react"

export default function ModalForm({ isOpen, onClose, mode, OnSubmit, itemData }) {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const itemData = { name, date, location, price }
            await OnSubmit(itemData);
            onClose();
        } catch (err) {
            console.error("Error adding item", err);
        }
    }

    useEffect(() => {
        console.log(itemData)
        if (mode === 'edit' && itemData) {
            setName(itemData.name);
            setDate(itemData.date);
            setLocation(itemData.location);
            setPrice(itemData.price);
        } else {

            setName('');
            setDate('');
            setLocation('');
            setPrice('');
        }
    }, [mode, itemData]);

    return (
        <>
            <dialog id="my_modal_3" className="modal" open={isOpen}>
                <div className="modal-box">
                    <h2 className="font-bold text-lg py-4">{mode === 'edit' ? 'Edit Item' : 'Add Item'}</h2>
                    <form method="dialog" onSubmit={handleSubmit}>
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>

                        <label className="input input-boardered my-4 flex items-center gap-2">
                            Name:
                            <input type="text" value={name} className="grow" onChange={(e) => setName(e.target.value)} />
                        </label>
                        <label className="input input-boardered my-4 flex items-center gap-2">
                            Date:
                            <input type="date" value={date} className="grow" onChange={(e) => setDate(e.target.value)} />
                        </label>
                        <label className="input input-boardered my-4 flex items-center gap-2">
                            Location:
                            <input type="text" value={location} className="grow" onChange={(e) => setLocation(e.target.value)} />
                        </label>
                        <label className="input input-boardered my-4 flex items-center gap-2">
                            Price:
                            <input type="number" value={price} step=".01" className="grow" onChange={(e) => setPrice(e.target.value)} />
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