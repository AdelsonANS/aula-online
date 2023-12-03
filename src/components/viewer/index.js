
import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import useStore from '../../store/publication'
import _ from 'lodash'
import styles from './index.module.css'
const Viewer = (props) => {

    const [publication, setPublication] = useState({})

    useEffect(() => {
        setPublication({
            name:null,
            description: null,
            urlVideo: null,
            time: null
        })
    },[])

    const fileInputRef = useRef(null);
    const addPublication = useStore((state) => state.addPublication)

    const handleInputChange = (event) => {

        setPublication(prev => ({...prev, urlVideo: event.target.value }))
    };

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const videoURL = URL.createObjectURL(file);
            setPublication(prev => ({...prev, urlVideo: videoURL}));
        }
    };
    function handleChange({target}, field){
        const {value} = target;

        if(field === 'name'){
            setPublication(prev => ({...prev, name: value }))

        }else if(field === 'description'){
            setPublication(prev => ({...prev, description: value }))
        }

    }
    function handleAddPublication(){

        if(!_.isNil(publication.name)&& !_.isNil(publication.description)&& !_.isNil(publication.urlVideo)){
            const formatoHora = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
            let time = new Date().toLocaleTimeString('pt-BR', formatoHora)

            setPublication(prev => ({...prev, time}))
            setTimeout(addPublication(publication), 2000)
            props.closeModal();
        }
    }
    const handleBrowseClick = () => {
        fileInputRef.current.click();
    };
    const {name, description, urlVideo} = publication;
    return (
        <div className='w-full'>
        <input
            className='w-full sm:w-8/12 p-1 mb-1'
            type="text"
            placeholder="Insira o URL do vídeo local"
            value={urlVideo}
            onChange={handleInputChange}
        />
        <input
            type="file"
            accept="video/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileInputChange}
        />
        <button className='w-full h-full sm:w-4/12 md:w-2/12 ml-0 sm:ml-2 rounded-lg p-1 bg-slate-500 text-white border border-black' onClick={handleBrowseClick}>
            Procurar
        </button>

        <div className='flex flex-col'>
            <span>Nome:</span>
            <input
                className='w-full sm:w-4/12'
                value={name}
                onChange={e => handleChange(e, 'name')}
            />
            <span>Descrição:</span>
            <input
                className='w-full mb-3'
                value={description}
                onChange={e => handleChange(e, 'description')}
            />
        </div>
        <div className={styles.boxVideo}>
            {_.isEmpty(urlVideo) ? (
                <div>
                    <span>Sem vídeo</span>
                </div>
            ) : (
                <ReactPlayer width={'100%'} height={'60%'} url={urlVideo} controls />
            )}
            <button onClick={handleAddPublication} className='w-full md:w-2/12 mt-2 md:mt-0 rounded-lg p-1 text-white bg-slate-400 border border-black'>
                Adicionar Vídeo
            </button>
        </div>
    </div>
    )


}


export default Viewer;