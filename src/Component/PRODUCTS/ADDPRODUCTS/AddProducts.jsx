import { use, useEffect, useState } from 'react'
import './AddProducts.css'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'


const AddProducts = () => {
    const navigate = useNavigate();

    const [formData, setformData] = useState({ name: "", category: "", price: "", isPresent: true, quantity: "" })





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

    async function handleSubmit() {
        try {
            let obj = {
                ...formData,
                price: Number(formData.price),
                quantity: Number(formData.quantity)
            };

            let response = await fetch("http://localhost:3000/addProductsData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            });

            let data1 = await response.json();
            console.log(data1);

            navigate('/Products');

        } catch (error) {
            console.log("Error:", error);
        }
    }


    function handleChange(e) {
        const { name, value } = e.target;
        setformData((prev) => ({
            ...prev,
            [name]: value
        }))

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
                        <h1>Add Products</h1>
                        <div className="profile">
                            <img src="https://i.pravatar.cc/40" alt="admin" className="avatar" />
                            <span>Admin</span>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className='formAdd'>
                        <input
                            required
                            type="text"
                            name="name"
                            placeholder="Product Name"
                            value={formData.name}
                            className='in'
                            onChange={handleChange}
                        />

                        <input
                            required
                            type="text"
                            name="category"
                            placeholder="Category"
                            value={formData.category}
                            className='in'
                            onChange={handleChange}
                        />

                        <input
                            required
                            type="number"
                            className='in'
                            name="price"
                            placeholder="Price"
                            value={formData.price}
                            onChange={handleChange}
                        />

                        <input
                            required

                            type="number"
                            className='in'
                            name="quantity"
                            placeholder="Quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                        />

                        <label>
                            Present:
                            <input
                                className='check'
                                type="checkbox"
                                name="isPresent"
                                checked={formData.isPresent}
                                onChange={handleChange}
                            />
                        </label>

                        <button type="submit" className='bttn'>Add Grocery</button>
                    </form>



                </div>
            </div>

        </>
    )
}
export default AddProducts

