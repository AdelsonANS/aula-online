import React, { useEffect, useState } from 'react'
import styles from './Login.module.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import api from '../axios/api'
const Login = () => {

    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({});

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

    function handleClose() {
        setOpen(false)
    }
    function handleOpen() {
        setOpen(true)
    }
    const { cep, rua, uf, bairro } = user;

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
            <div className="w-96 h-96 mt-48 bg-slate-700 border border-black text-white">
                <div className='flex flex-col p-10 mt-10'>
                    <label>Email:</label>
                    <input type='email' />
                    <label>Senha:</label>
                    <input type='password' />
                    <button className={styles.btnLogin}>Entrar</button>
                </div>
                <span onClick={handleOpen}><u>Registrar</u></span>
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