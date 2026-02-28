import { use, useState, useEffect } from 'react'
import './Add.css'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

const Add = () => {
    const [products1, setProducts1] = useState([])
    const [count, setCount] = useState(1)
    const navigate = useNavigate();



    useEffect(() => {
        async function getData() {
            let response = await fetch('http://localhost:3000/availableProductsData', {
                method: "GET"
            })
            let data = await response.json()
            setProducts1(data)
            console.log(data)
        }
        getData()
    }, [])




    const [data, setData] = useState({
        name: "",
        email: "",
        number: '',
        date: "",
        order: [],
        price: "",
        status: ""
    })



    async function Added(e) {
        // e.preventDefault();

        let response = await fetch("http://localhost:3000/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        let data1 = await response.json();
        console.log(data1)

        navigate("/")
    }




    function handleChange(e) {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
            id: Date.now(), // unique id
        }));
    }

    // order: [{ quantitty: 3, name: "OIL" }, {}]


    function handleChangeOfProduct(e) {
        console.log("Hello world")
        const { name, value } = e.target
``
        setData((prev) => {
            const f = prev.order.find((item) => { return item.name == value })
            if (f) {
                return {
                    ...prev,
                    [name]:prev.order.map((item) => (item.name == value ? { ...item, quantity: item.quantity + 1 } : item))
                }


            }

            return {
                ...prev,
                order: [...prev.order, { name: value, quantity: 1 }]
            };

        })

    }
    
    return (
        <>
            <div className="addCustomerSection">
                <h3>Add New Customer</h3>
                {/* <div>{data.order.map}</div> */}
                <form onSubmit={Added} className="addCustomerForm">
                    <input type="text" placeholder="Customer Name" name='name' required onChange={handleChange} />
                    <input type="email" placeholder="Email Address" name='email' onChange={handleChange} />
                    <input type="text" placeholder="Phone Number" name='number' required onChange={handleChange} />
                    <input type="date" placeholder="Join Date" name='date' required onChange={handleChange} />
                    <input type='number' placeholder="price" name='price' required onChange={handleChange} />

                    <select name="order" onChange={handleChangeOfProduct} required>
                        {products1.map((item, idx) => (
                            <option key={idx} value={item.name}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                    <div>
                        <div className='radio'>
                            <p className='pOfRadio'>Pay</p>
                            <input type="radio" name='status' value="Paid" required onChange={handleChange} />
                        </div>
                        <div className='radio'>
                            <p className='pOfRadio'>Promise</p>
                            <input type="radio" name='status' value="Pending" required onChange={handleChange} />
                        </div>
                    </div>
                    <button type="submit" className="submitBtn">Add Customer</button>

                </form>
            </div>

        </>
    )
}

export default Add