import { use, useEffect, useState } from 'react'
import './Products.css'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { BiPlus } from 'react-icons/bi'


const Products = () => {
    const [products1, setProducts1] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            let response = await fetch('http://localhost:3000/productsData', {
                method: "GET"
            })
            let data = await response.json()
            setProducts1(data)
            console.log(data)
        }
        getData()
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

    function ADD(){
        navigate('/AddProducts')

    }


    return (
        <>
            <div className="dashboard">

                <div className="sidebar">
                    <h2 className="logo">🛍 ShopKeeper</h2>
                    <ul className="menu">
                        {["Dashboard", "Customers", "Products", "Orders", "Sales", "Settings"].map((item, idx) => (
                            <li key={idx} className={idx === 2 ? "activeMenu" : "menuItem"} onClick={() => handleClick(idx)}>{item}</li>
                        ))}
                    </ul>
                </div>

                {/* Main Content */}
                <div className="main">
                    {/* Topbar */}
                    <div className="topbar">
                        <h1>Products</h1>
                        <div className="profile">
                            <img src="https://i.pravatar.cc/40" alt="admin" className="avatar" />
                            <span>Admin</span>
                        </div>
                    </div>
                    <div className='productCards'>
                        {products1.map((item, index) => {
                        return (
                            <div className="product-card" key={index}>
                                <h2 className="product-name">{item.name}</h2>

                                <p className="product-price">Rs. {item.price}</p>

                                <span className={`status ${item.isPresent ? "in-stock" : "out-of-stock"}`}>
                                    {item.isPresent ? "In Stock" : "Out Of Stock"}
                                </span>
                            </div>
                        );
                    })}
                    </div>
                    <button className='add' onClick={ADD}><BiPlus /></button>


                </div>
            </div>

        </>
    )
}
export default Products

