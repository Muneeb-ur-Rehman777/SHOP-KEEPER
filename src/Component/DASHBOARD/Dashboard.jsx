import { use, useEffect, useState } from 'react'
import './Dashboard.css'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { BiPlus } from 'react-icons/bi'
import React from 'react'

const Dashboard = () => {

    const [total, setTotal] = useState([])
    const [products1, setProducts1] = useState([])
    const [sales, setSales] = useState(0)


    useEffect(() => {

        async function getSalesData() {
            let response = await fetch('http://localhost:3000/sales', {
                method: "GET"
            })
            let data = await response.json()
            setSales(data)
            console.log(data)
        }

        async function getProductData() {
            let response = await fetch('http://localhost:3000/productsData', {
                method: "GET"
            })
            let data = await response.json()
            setProducts1(data)
            console.log(data)
        }

        async function getTotalData() {
            let response = await fetch('http://localhost:3000/dash', {
                method: "GET"
            })
            let data = await response.json()
            setTotal(data)
            console.log(data)
        }

        getTotalData();
        getSalesData();
        getProductData();






    }, [])



    const navigate = useNavigate();


    function ADD() {
        navigate("/Add")

    }

    function handleClick(idx) {
        if (idx === 1) {
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



    const [particularData, setParticularData] = useState(null)
    const [openRowId, setOpenRowId] = useState(null);


    async function show(e) {


        let response = await fetch(`http://localhost:3000/getParticularData/${e}`, {
            method: "GET"
        })

        let data = await response.json()
        setParticularData((prev) => (prev != null ? null : data))
        setOpenRowId((prev) => (prev != null ? null : e))
    }


    return (
        <>
            <div className="dashboard">

                <div className="sidebar">
                    <h2 className="logo">🛍 ShopKeeper</h2>
                    <ul className="menu">
                        {["Dashboard", "Customers", "Products", "Orders", "Sales", "Settings"].map((item, idx) => (
                            <li key={idx} className={idx === 0 ? "activeMenu" : "menuItem"} onClick={() => handleClick(idx)} >{item}</li>
                        ))}
                    </ul>
                </div>

                {/* Main Content */}
                <div className="main">
                    {/* Topbar */}
                    <div className="topbar">
                        <h1>Dashboard</h1>
                        <div className="profile">
                            <img src="https://i.pravatar.cc/40" alt="admin" className="avatar" />
                            <span>Admin</span>
                        </div>
                    </div>


                    <div className="cards">
                        <div className='card' key={0}>
                            <h4>Orders</h4>
                            <h2>{total.length}</h2>
                        </div>
                        <div className='card'>
                            <h4>Products</h4>
                            <h2>{products1.length}</h2>
                        </div>
                        <div className='card'>
                            <h4>Sales</h4>
                            <h2>{sales}</h2>
                        </div>
                    </div>

                    {/* Customers Table */}
                    <div className="tableSection">
                        <h3>Customers List</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Bill</th>
                                </tr>
                            </thead>
                            <tbody>
                                {total.map((c) => (
                                    <React.Fragment key={c.id}>
                                        <tr onClick={() => show(c.id)} className='trrr'>
                                            <td>{c.id}</td>
                                            <td>{c.name}</td>
                                            <td>{c.email}</td>
                                            <td>{c.number}</td>
                                            <td>{c.price}</td>
                                        </tr>

                                        {openRowId == c.id && (
                                            <tr className="detail-row">
                                                <td colSpan="5">
                                                    <div className="detail-box">
                                                        <p><strong>Name:</strong> {particularData.name}</p>
                                                        <p><strong>Email:</strong> {particularData.email}</p>
                                                        <p><strong>Number:</strong> {particularData.number}</p>
                                                        <p><strong>Status:</strong> {particularData.status}</p>
                                                        {c.order && (
                                                            <>
                                                                <h4>Orders:</h4>
                                                                {c.order.map((item, index) => (
                                                                    <div key={index}>
                                                                        {item.name} — {item.quantity} × {item.price}
                                                                    </div>
                                                                ))}

                                                                <div style={{ marginTop: "10px", fontWeight: "bold" }}>
                                                                    Total: {c.price}
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}


                            </tbody>
                        </table>
                    </div>
                    <button className='add' onClick={ADD}><BiPlus /></button>
                </div>
            </div>

        </>
    )
}
export default Dashboard

