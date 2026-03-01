import { use, useEffect, useState } from 'react'
import './Dashboard.css'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { BiPlus } from 'react-icons/bi'

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



    const [particularData, setParticularData] = useState()


    async function show(e) {

        let response = await fetch(`http://localhost:3000/getParticularData/${e}`, {
            method: "GET"
        })

        let data = await response.json()
        setParticularData(data)
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
                                    <th>Order</th>
                                </tr>
                            </thead>
                            <tbody>
                                {total.map((c) => (
                                    <tr value={c.id} onClick={() => show(c.id)} className='trrr'>
                                        <td>{c.id}</td>
                                        <td>{c.name}</td>
                                        <td>{c.email}</td>
                                        <td>{c.number}</td>
                                        {/* <td>{c.order}</td> */}
                                    </tr>  
                                     
                                    
                                  
                                                                                           

                                ))}
                                {particularData && <tr>
                                    <td>{particularData.name}</td>
                                </tr>

                                }


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

