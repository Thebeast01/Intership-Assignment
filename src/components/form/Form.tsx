import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
interface UserDetail  {
        name : string,
        phone : string,
        email: string,

}
const Form: React.FC = () => {
        const navigate = useNavigate();
        const [name, setName] = useState<string>('');
        const [phone, setPhone] = useState<string>('');
        const [email, setEmail] = useState<string>('');
        const [errorMsg, setErrorMessage] = useState<string>('');

        const handleSubmit = (event:React.FormEvent<HTMLFormElement>) =>{
                event.preventDefault();
                setErrorMessage('');
                if(!name || !phone || !email) {
                        setErrorMessage('Please fill all fields');
                        return;
                }
                const userDetail : UserDetail  = {name, phone, email};
                localStorage.setItem('useDetail', JSON.stringify(userDetail));
                navigate('/second-page');
        }

  return (
    <div style={{
        height: '100vh',
        display: 'flex',

        alignItems : 'center',
        justifyContent:'center',
    }}>
      <form onSubmit={handleSubmit} style={{
              display:'flex',
              flexDirection:'column',
              gap: "2rem",
        }}>
              <h1 style={{color: 'red', fontSize:'1.2rem', textAlign:'center'}}>{errorMsg}</h1>
        <TextField variant='outlined' label='Name' onChange={(e) => setName(e.target.value)} required/>
        <TextField variant='outlined' label='Phone Number' onChange={(e)=> setPhone(e.target.value)} required/>
        <TextField variant='outlined' label='Email' onChange={(e) => setEmail(e.target.value)} />
        <Button variant='contained' type='submit'>Submit</Button>
      </form>
    </div>
  )
}

export default Form
