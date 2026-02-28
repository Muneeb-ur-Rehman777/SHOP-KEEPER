import { use, useState ,useEffect} from 'react'
import './Add.css'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

const Add = () => {
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


    const [data, setData] = useState({
        name: "",
        email: "",
        number: '',
        date: "",
        order: "",
        price: "",
        status: ""
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


    return (
        <>
            <div className="addCustomerSection">
                <h3>Add New Customer</h3>
                <form onSubmit={Added} className="addCustomerForm">
                    <input type="text" placeholder="Customer Name" name='name' required onChange={handleChange} />
                    <input type="email" placeholder="Email Address" name='email' onChange={handleChange} />
                    <input type="text" placeholder="Phone Number" name='number' required onChange={handleChange} />
                    <input type="date" placeholder="Join Date" name='date' required onChange={handleChange} />
                    <input type='number' placeholder="price" name='price' required onChange={handleChange} />

                    <select name="" id="" className='drop'>
                        {products1.map((item,idx)=>{
                            return(<option name='order' required onChange={handleChange}>{item.name}</option>)
                        })}
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