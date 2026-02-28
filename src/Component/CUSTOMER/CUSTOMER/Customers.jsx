import { use, useEffect, useState } from 'react'
import './Customers.css'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'


const Customer = () => {
    const navigate = useNavigate();
    const [vip, setVip] = useState([])
    const [pending, setPending] = useState([])
    const [total, setTotal] = useState([])

    useEffect(() => {
        async function getVipData() {
            let response = await fetch('http://localhost:3000/vip', {
                method: "GET"
            })
            let data = await response.json()
            setVip(data)
            console.log(data)
        }
        async function getPendingData() {
            let response = await fetch('http://localhost:3000/pending', {
                method: "GET"
            })
            let data = await response.json()
            setPending(data)
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

        getVipData();
        getPendingData();
        getTotalData();



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

    function movetotal() {
        navigate('/Total')
    }
    function movepending() {
        navigate('/Pending')

    }
    function movevip() {
        navigate('/Vip')

    }

    // async function date(e) {
    //     const date = e.target.value


    //     let response = await fetch('http://localhost:3000/specific', {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(date)

    //     })

    //     let result = await response.json()
    //     console.log(result)
    //     setTotal(result)



    //     let response1 = await fetch('http://localhost:3000/pendingPost', {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(date)
    //     })
    //     let data = await response1.json()
    //     console.log(data)
    //     setPending(data)





    //     let response2 = await fetch('http://localhost:3000/vip', {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(date)
    //     })
    //     let data2 = await response2.json()
    //     setVip(data2)
    //     console.log(data2)

    // }


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
                        <h1>Customers</h1>
                        <div className="profile">
                            <img src="https://i.pravatar.cc/40" alt="admin" className="avatar" />
                            <span>Admin</span>
                        </div>
                    </div>
                    <div className='cardsOfCustomer' >
                        <div className='total' onClick={movetotal} >
                            <h3>Total Customers</h3>
                            <h1>{total.length}</h1>
                        </div>
                        <div className='customersWithPendingPayment' onClick={movepending}>
                            <h3>Pending Payments</h3>
                            <h1>{pending.length}</h1>
                        </div>
                        <div className='vip' onClick={movevip}>
                            <h3>Vip Customers</h3>
                            <h1>{vip.length}</h1>
                        </div>

                    </div>


                </div>
            </div>

        </>
    )
}
export default Customer

