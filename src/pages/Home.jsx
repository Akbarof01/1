import { useEffect, useState } from "react"


function Home() {
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API}/api/products/private/all`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${'token'}`,
            }
        })

            .then(res => res.json())
            .then(data => {
                setProducts(data);
            })
            .catch(err => {
                console.log(err);
            })



    }, [])
    return (
        <div>Home</div>
    )
}

export default Home