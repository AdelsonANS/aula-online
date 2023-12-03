import React, { useEffect, useState } from 'react'
import styles from './Login.module.css'
import Modal from '@mui/material/Modal';
import api from '../../axios/api'
import _, { isEmpty, isNil } from 'lodash'
import { useNavigate } from 'react-router-dom';
import * as EmailValidator from 'email-validator';
import { cpf as validarCpf } from 'cpf-cnpj-validator';
const Login = () => {

    const [open, setOpen] = useState(false);
    const [login, setLogin] = useState({ email: null, password: null })
    const [user, setUser] = useState({});

    const [erroLogin, setErroLogin] = useState('')
    const [erroCadastro, setErroCadastro] = useState([])


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
        if (localStorage.getItem('users') === null) {
            localStorage.setItem('users', JSON.stringify([{ email: 'a@hotmail.com', senha: 123, type: 'admin' }]));
          }

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
    function onChangeLogin({target} , field) {
        const {value} = target;
        if (field === 'email') {
            setLogin(prev => ({ ...prev, [field]: value }))
        } else if (field === 'password') {
            setLogin(prev => ({ ...prev, [field]: value }))
        }
    }

    function verifyLogin() {
        setErroLogin(prev => []);
        let users = JSON.parse(localStorage.getItem('users'));

       let newFilter =  users.filter(item => item.email === login.email && Number(item.senha) === Number(login.password))
        
       if (!_.isEmpty(newFilter)) {
            let type = newFilter[0];
            let account = type.type === 'client' ? 'client' : 'admin';
            localStorage.setItem('Logged', JSON.stringify(account))
            navigate('/configvideo');
        } else {
            setErroLogin(['DADOS INCORRETOS']);
        }

    }
    function cadastrarCliente() {
        setErroCadastro(prev => [])

        for (const key in user) {
 
            if (isNil(user[key])) {
                setErroCadastro(prev => [...prev, key + ' vazio'])
            } else if (key === 'cpf' && !validarCpf.isValid(user[key])) {
                setErroCadastro(prev => [...prev, 'CPF Invalido'])
            } else if (key === 'email' && !EmailValidator.validate(user[key])) {
                setErroCadastro(prev => [...prev, 'Email Invalido'])
            }
        }

        setErroCadastro(erroAtualizado => {

            if (isEmpty(erroAtualizado)) {
                const { email, senha } = user

                let users = JSON.parse(localStorage.getItem('users'))
                users.push({ email, senha, type: 'client' })
                localStorage.setItem('users', JSON.stringify(users))
                localStorage.setItem('Logged', JSON.stringify('client'))
                navigate('/configvideo');
            }
            return erroAtualizado;
        });
    }

    function handleClose() {
        setOpen(false)
        setErroCadastro([])
    }
    function handleOpen() {
        setOpen(true)
    }
    const { name, email, cpf, telefone, senha, cep, rua, uf, bairro } = user;
    const { email: emailLogin, password: passwordLogin } = login;

    return (
        <div className={styles.page}>
            <div className={styles.boxLogin}>
                <div className='flex flex-col p-10 mt-10'>
                    {!_.isNil(erroLogin) && (
                        <span className='text-red-600'>{erroLogin}</span>
                    )}
                    <label>Email:</label>
                    <input
                        className='text-black'
                        placeholder='example@gmail.com'
                        value={emailLogin}
                        onChange={e => (onChangeLogin(e, 'email'))}
                    />

                    <label>Senha:</label>
                    <input
                        className='text-black'
                        type='password'
                        value={passwordLogin}
                        onChange={e => (onChangeLogin(e, 'password'))}

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
                <div className='w-full h-full flex items-center justify-center'>
                    <div className='bg-white rounded p-8 max-w-md w-full'>
                        <h1 className='text-2xl font-bold mb-6'>CADASTRAR</h1>
                        {!isEmpty(erroCadastro) && (

                            <span className='text-red-600'>Erro {erroCadastro.map(item => {

                                return `${item} `

                            })};</span>

                        )}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-600'>Nome:</label>
                                <input
                                    className='form-input mt-1 p-2 w-full border rounded-md'
                                    onChange={event => onHandleChange(event, 'name')}
                                    value={name}
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-600'>Cpf:</label>
                                <input
                                    placeholder='99999999999'
                                    className='form-input mt-1 p-2 w-full border rounded-md'
                                    onChange={event => onHandleChange(event, 'cpf')}
                                    value={cpf}
                                />
                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-600'>Email:</label>
                                <input
                                    placeholder='example@mail.com'
                                    className='form-input mt-1 p-2 w-full border rounded-md'
                                    onChange={event => onHandleChange(event, 'email')}
                                    value={email}
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-600'>Telefone:</label>
                                <input
                                    placeholder='99999-9999'
                                    className='form-input mt-1 p-2 w-full border rounded-md'
                                    onChange={event => onHandleChange(event, 'telefone')}
                                    value={telefone}
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-600'>Senha:</label>
                                <input
                                    type='password'
                                    className='form-input mt-1 p-2 w-full border rounded-md'
                                    onChange={event => onHandleChange(event, 'senha')}
                                    value={senha}
                                />
                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-600'>Cep:</label>
                                <input
                                    className='form-input mt-1 p-2 w-full border rounded-md'
                                    placeholder='99999-999'
                                    onChange={event => onHandleChange(event, 'cep')}
                                    value={cep}
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-600'>Bairro:</label>
                                <input
                                    className='form-input mt-1 p-2 w-full border rounded-md'
                                    value={bairro}
                                    onChange={event => onHandleChange(event, 'bairro')}

                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>

                            <div>
                                <label className='block text-sm font-medium text-gray-600'>UF:</label>
                                <input
                                    className='form-input mt-1 p-2 w-full border rounded-md'
                                    value={uf}
                                    onChange={event => onHandleChange(event, 'uf')}

                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-600'>Rua:</label>
                                <input
                                    className='form-input mt-1 p-2 w-full border rounded-md'
                                    value={rua}
                                    onChange={event => onHandleChange(event, 'rua')}

                                />
                            </div>


                        </div>

                        <div className='flex justify-end items-end'>
                            <button className='bg-yellow-500 text-white px-4 py-2 rounded' onClick={cadastrarCliente}>CADASTRAR</button>
                        </div>
                    </div>
                </div>
            </Modal>


        </div>
    )
}

export default Login;