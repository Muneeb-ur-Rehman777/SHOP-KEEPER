import { use, useEffect, useState } from 'react'
import './Orders.css'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'


const Orders = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        async function getData() {
            let response = await fetch('http://localhost:3000/dash', {
                method: "GET"
            })
            let dataa = await response.json()

            setData(dataa.reverse())
            console.log(data)
        }
        getData();

    }, [])

    async function date(e) {
        const selectedDate = e.target.value


        let response = await fetch('http://localhost:3000/specific', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({date:selectedDate})

        })

        let result = await response.json()

        console.log(result)
        setData(result)
    }


    const navigate = useNavigate();
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
                            <li key={idx} className={idx === 3 ? "activeMenu" : "menuItem"} onClick={() => handleClick(idx)}>{item}</li>
                        ))}
                    </ul>
                </div>

                {/* Main Content */}
                <div className="main">
                    {/* Topbar */}
                    <div className="topbar">
                        <input className="searchInput" placeholder="Enter a Date" type='date' onChange={date} />
                        <div className="profile">
                            <img src="https://i.pravatar.cc/40" alt="admin" className="avatar" />
                            <span>Admin</span>
                        </div>
                    </div>
                    <div className="tableSection">
                        <h3>Order List</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Order</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((c) => (
                                    <tr key={c.id} >
                                        <td>{c.id}</td>
                                        <td>{c.name}</td>
                                        <td>{c.order}</td>
                                        <td>{c.date}</td>
                                        <td>{c.status}</td>
                                    </tr>

                                ))}
                            </tbody>
                        </table>
                    </div>


                </div>
            </div>

        </>
    )
}
export default Orders

