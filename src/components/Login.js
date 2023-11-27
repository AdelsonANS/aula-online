import React, { useEffect, useState } from 'react'
import styles from './Login.module.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import api from '../axios/api'
import _ from 'lodash'
import { useNavigate } from 'react-router-dom';
const Login = () => {

    const [open, setOpen] = useState(false);
    const [login, setLogin] = useState({ email: null, password: null })
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        setUser({
            name: null,
            email: null,
            cpf: null,
            telefone: null,
            senha: null,
            cep: null,
            uf: null,
            bairro: null,
            rua: null
        })
        const a = { email: 'a@hotmail', senha: 123, type: 'admin' }
        localStorage.setItem('users', JSON.stringify([a]))
    }, [])

    async function onHandleChange({ target }, field) {

        const { value } = target

        if (field === 'cep' && value.length === 8) {
            const { data } = await api(value)
            const { logradouro, uf, bairro } = data;
            setUser(prevUser => ({ ...prevUser, uf, bairro, rua: logradouro }))
        }
        setUser(prevUser => ({ ...prevUser, [field]: value }))
    }
    function onChangeLogin({ target }, field) {
        const value = target;
        setLogin(prev => ({ ...prev, [field]: value }))
    }
    function verifyLogin() {
        let users = JSON.parse(localStorage.getItem('users'))
        users.filter(item=> item.email === login.email && item.password === login.password)
        if(!_.isEmpty(users)){
            navigate('/configvideo')
        }
    }

    function handleClose() {
        setOpen(false)
    }
    function handleOpen() {
        setOpen(true)
    }
    const { cep, rua, uf, bairro } = user;
    const { email: emailLogin, password: passwordLogin } = login;
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        bgcolor: '#999999',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };
    return (
        <div className='flex justify-center items-center'>
            <div className="w-96 h-96 mt-48 bg-slate-700 border border-black text-white rounded-lg">
                <div className='flex flex-col p-10 mt-10'>
                    <label>Email:</label>
                    <input
                        className='text-black'
                        type='email'
                        value={emailLogin}
                        onChange={e => (onChangeLogin('email'))}
                    />
                    <label>Senha:</label>
                    <input
                        className='text-black'
                        type='password'
                        value={passwordLogin}
                        onChange={e => (onChangeLogin('password'))}

                    />
                    <button className={styles.btnLogin} onClick={verifyLogin}>Entrar</button>
                    <span className='text-center mt-5' onClick={handleOpen}><u>Registrar</u></span>
                </div>

            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: '50%', height: '45%' }}>
                    <div className='text-center text-lg'>
                        <h1>CADASTRAR</h1>

                    </div>
                    <div className='flex w-full'>
                        <div className='w-8/12 flex flex-col'>
                            <label>Nome:</label>
                            <input />
                        </div>
                        <div className='w-4/12 ml-3 flex flex-col'>
                            <label>Cpf:</label>
                            <input />
                        </div>
                    </div>

                    <div className='flex w-full'>
                        <div className='w-4/12 flex flex-col'>
                            <label>Email:</label>
                            <input />
                        </div>
                        <div className='w-4/12 ml-3 flex flex-col'>
                            <label>Telefone:</label>
                            <input />
                        </div>

                        <div className='w-4/12 ml-3 flex flex-col'>
                            <label>Senha:</label>
                            <input />
                        </div>
                    </div>

                    <div className='flex w-full'>
                        <div className='w-2/12 flex flex-col'>
                            <label>Cep:</label>
                            <input
                                onChange={event => onHandleChange(event, 'cep')}
                                value={cep}
                            />
                        </div>
                        <div className='w-1/12 ml-3 flex flex-col'>
                            <label>UF:</label>
                            <input
                                value={uf}
                            />
                        </div>

                        <div className='w-2/12 ml-3 flex flex-col'>
                            <label>Bairro:</label>
                            <input
                                value={bairro}
                            />
                        </div>

                        <div className='w-7/12 ml-3 flex flex-col'>
                            <label>Rua:</label>
                            <input
                                value={rua}
                            />
                        </div>
                    </div>

                    <div className='flex h-1/2 justify-end items-end'>
                        <button onClick={handleClose}>CADASTRAR</button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default Login;