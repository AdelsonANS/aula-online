import React, { useState } from 'react'
import Grid from '@mui/joy/Grid';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import ReactPlayer from 'react-player';
import Viewer from '../viewer';
import useStore from '../../store/publication';
import styles from './configVideo.module.css';

const ConfigVideo = () => {

    const [open, setOpen] = useState(false);
    const [filter, setFilter] = useState('');
    const publications = useStore(store => store.publication)

    function handleChange({ target }) {
        const { value } = target
        setFilter(value)
    }
    function handleClose() {
        setOpen(false)
    }
    function handleOpen() {
        setOpen(true)
    }


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        bgcolor: '#6ab5ee',
        borderRadius: '8px',
//        background-color: #6ab5ee;

        //border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };
    const list = publications.filter(elem => elem.name.toLowerCase().includes(filter.toLowerCase()))
    return (
        <>
            <div className={styles.page}>


                <div className={styles.filter}>
                    <label className='text-white mr-5'>Filtro: </label>
                    <input
                        placeholder="Pesquise o video pelo nome"
                        className='w-6/12 '
                        value={filter}
                        onChange={handleChange}
                    />
                    <div className='ml-5'>
                        <button className='border border-black rounded-lg' onClick={handleOpen}>
                            <AddIcon color='primary' fontSize='large' />
                        </button>
                    </div>
                </div>
                <div className='flex m-20'>
                    <Grid
                        container
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                        sx={{ flexGrow: 1 }}
                    >
                        {list.map((item, index) => (
                            <Grid xs={2} sm={4} md={4} key={index}>
                                <div className={styles.card}>

                                    <ReactPlayer styles={{ borderRadius: '8px' }} width={'100%'} height={'250px'} url={item.urlVideo} controls />
                                    <label className='text-black'>Nome: {item.name}</label>
                                    <label className='text-black'>Descrição: {item.description}</label>
                                    <label className='text-black'>Publicado: {item.time}</label>
                                </div>
                            </Grid>
                        ))}
                    </Grid>

                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box sx={{ ...style, width: '50%', height: '60%' }}>
                        <span>Adicione o URL de seu Video</span>
                        <Viewer closeModal={handleClose} />
                    </Box>
                </Modal>
            </div>
        </>
    )
}

export default ConfigVideo;

