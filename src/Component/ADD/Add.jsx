import { useState, useEffect } from 'react'
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
        status: "",
    })



    async function Added(e) {
        e.preventDefault();

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

    const [total, setTotal] = useState(0)

    function handleChangeOfProduct(e) {
        console.log("Hello world")
        const { name, value } = e.target
        console.log(data)

        setData((prev) => {
            const f = prev.order.find((item) => { return item.name == value })
            const product = products1.find((item) => (item.name == value))
            if (f) {
                return {
                    ...prev,
                    order: prev.order.map((item) => (item.name == value ? { ...item, quantity: item.quantity + 1, price: (item.quantity + 1) * product.price } : item)),

                }


            }

            return {
                ...prev,
                order: [...prev.order, { name: value, quantity: 1, price: product.price }]
            };

        })

    }
    const total2 = data.order.reduce((sum, item) => sum + item.price, 0);

    async function click() {
        async function getData() {
            let response = await fetch('http://localhost:3000/dash', {
                method: "GET"
            })
            let data = await response.json()
            console.log(data)
        }
        getData()
    }


    return (
        <>
            <div className="addCustomerSection">
                <h3>Add New Customer</h3>
                {/* <h2>{total2}</h2> */}
                <div className='recipt'>
                    <div className='reciptBox'>
                        <div className='ii'>
                            <h2>Name</h2>
                            <h2>Quantity</h2>
                            <h1>Price</h1>
                        </div>


                        {data.order.map((item) => (
                            <div className='ii'>
                                <h2>{item.name}</h2>
                                <h2>{item.quantity}</h2>
                                <h1>{item.price}</h1>
                            </div>
                        ))}
                        <div className='ii'>
                            <h2>Total</h2>
                            <h2>""</h2>
                            <h1>{total2}</h1>
                        </div>


                    </div>
                </div>

                {/* <div>{data.order.map}</div> */}
                <form onSubmit={Added} className="addCustomerForm">
                    <input type="text" placeholder="Customer Name" name='name' required onChange={handleChange} />
                    <input type="email" placeholder="Email Address" name='email' onChange={handleChange} />
                    <input type="text" placeholder="Phone Number" name='number' required onChange={handleChange} />
                    <input type="date" placeholder="Join Date" name='date' required onChange={handleChange} />

                    <select onChange={handleChangeOfProduct} required>
                        <option value="">Select Product</option>

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
            </div >
            <button onClick={click}>Click me!</button>

        </>
    )
}

export default Add