import React, { useEffect, useState } from 'react'
import styles from './Login.module.css'
import Modal from '@mui/material/Modal';
import api from '../../axios/api'
import _, { isEmpty, isNil } from 'lodash'
import { useNavigate } from 'react-router-dom';
import * as EmailValidator from 'email-validator';
import validarCpf from 'validar-cpf';
const Login = () => {

    const [open, setOpen] = useState(false);
    const [login, setLogin] = useState({ email: null, password: null })
    const [user, setUser] = useState({});

    const [erroCadastro, setErroCadastro] = useState([])

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

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

        if (field === 'email') {
            setLogin(prev => ({ ...prev, [field]: value }))
            setEmailError(validateEmail(value) ? '' : 'E-mail inválido');
        } else if (field === 'password') {
            setLogin(prev => ({ ...prev, [field]: value }))
            setPasswordError(validatePassword(value) ? '' : 'Senha inválida');
        }
    }

    const validateEmail = (email) => {
        // Adicione lógica de validação de e-mail
        // Retorne true se for válido, false se for inválido
    };

    const validatePassword = (password) => {
        // Adicione lógica de validação de senha
        // Retorne true se for válido, false se for inválido
    };
    function verifyLogin() {
        let users = JSON.parse(localStorage.getItem('users'))
        users.filter(item => item.email === login.email && item.password === login.password)
        if (!_.isEmpty(users)) {
            navigate('/configvideo')
        }

    }
    function cadastrarCliente() {
        setErroCadastro([])

        for (const key in user) {
         
            if(key === 'cpf'){
            }
            if (isNil(user[key])) {
                setErroCadastro(prev => [...prev, key + ' vazio'])
            }
        }
        isValid()
        if(isEmpty(erroCadastro)){
            navigate('/configvideo')
        }
    }
    function isValid({email, cpf} = user){

        if(email && !EmailValidator.validate(email)){
            setErroCadastro(prev => [...prev, 'Email não valido'])
        }else if(email && EmailValidator.validate(email)){
            let list = erroCadastro.filter(item=> item !== 'Email não valido')
            setErroCadastro(list)
        }
        if(cpf && !validarCpf(cpf)){
            setErroCadastro(prev => [...prev, 'CPF não valido'])
        }else if(cpf && validarCpf(cpf)){
            let list = erroCadastro.filter(item=> item !== 'CPF não valido')
            setErroCadastro(list)
        }

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
                    <label>Email:</label>
                    <input
                        className='text-black'
                        placeholder='example@gmail.com'
                        value={emailLogin}
                        onChange={e => (onChangeLogin('email'))}
                    />
                    <span className='text-red-500'>{emailError}</span>
                    <label>Senha:</label>
                    <input
                        className='text-black'
                        type='password'
                        value={passwordLogin}
                        onChange={e => (onChangeLogin('password'))}

                    />
                    <span className='text-red-500'>{passwordError}</span>
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