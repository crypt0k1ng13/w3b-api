
import './App.css';
import { useState, useEffect } from "react"
import axios from "axios"
function App() {
  const [address, setAddress] = useState('')
  const [data, setData] = useState('')
  const [isLoading, setLoading] = useState(false)
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true)
    setData(null)
    let resopnse = await axios.get(`https://api.w3b.xyz/eth/txns/accounting?address=${address}`)
    setData(resopnse.data.data)
    setLoading(false)
  }
  return (
    <div className='container mt-5'>
      <form onSubmit={submit}>
        <div className="form-group">
          <label for="exampleInputEmail1" className='mb-2 font-weight-bold h3'>Wallet address</label>
          <input class="form-control" type="text" placeholder='Please enter the wallet address' value={address} onChange={(e) => setAddress(e.target.value)} aria-label="Recipient's username" aria-describedby="button-addon2" required />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Submit</button>
      </form>

      {isLoading ? <div class="spinner-border1" role="status">
        <span class="sr-only"></span>
      </div> : null
      }
      {
        data ? <table class="table table-striped">
          <thead>
            <tr>
              <th>BlockHash</th>
              <th>From</th>
              <th>To</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 && data.map((val) => {
              return (
                <tr>
                  <td>{val.blockHash}</td>
                  <td>{val.from}</td>
                  <td>{val.to}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
          : null
      }



    </div >
  )

}

export default App;
