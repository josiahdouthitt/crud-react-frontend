export default function NavBar( {onOpen} ) {
    return (
    <>
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">Grocer Tracker</a>
            </div>
            <div className="navbar-center">
                <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
            </div>
            <div className="navbar-end">
                <a className="btn btn-primary" onClick={onOpen}>Add New Item</a>
            </div>
        </div>
    </>
    )

}