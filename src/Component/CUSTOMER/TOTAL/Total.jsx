import { use, useEffect, useState } from 'react'
import './Total.css'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'


const Total = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([])

    useEffect(() => {
        async function getData() {
            let response = await fetch('http://localhost:3000/dash', {
                method: "GET"
            })
            let dataa = await response.json()
            setData(dataa)
            console.log(data)
        }
        getData();

    }, [])


    function handleClick(idx) {
        if (idx == 0) {
            navigate("/")
        }
        else if (idx === 1) {
            navigate("/Customer")
        }
        else if (idx === 2) {
            navigate('/Products')
        }
        else if (idx === 3) {
            navigate('/Orders')
        }
        else if (idx === 4) {
            navigate('/Sales')
        }
    }


    return (
        <>
            <div className="dashboard">

                <div className="sidebar">
                    <h2 className="logo">🛍 ShopKeeper</h2>
                    <ul className="menu">
                        {["Dashboard", "Customers", "Products", "Orders", "Sales", "Settings"].map((item, idx) => (
                            <li key={idx} className={idx === 1 ? "activeMenu" : "menuItem"} onClick={() => handleClick(idx)}>{item}</li>
                        ))}
                    </ul>
                </div>

                {/* Main Content */}
                <div className="main">
                    {/* Topbar */}
                    <div className="topbar">
                        <input className="searchInput" placeholder="Search customers..." />
                        <div className="profile">
                            <img src="https://i.pravatar.cc/40" alt="admin" className="avatar" />
                            <span>Admin</span>
                        </div>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Bill</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((c) => (
                                <tr key={c.id}>
                                    <td>{c.id}</td>
                                    <td>{c.name}</td>
                                    <td>{c.email}</td>
                                    <td>{c.price}</td>
                                    <td>{c.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    


                </div>
            </div>

        </>
    )
}
export default Total

