
import * as React from 'react';
import Card from '@mui/joy/Card';
import Grid from '@mui/joy/Grid';


const Home = () => {

    return (
        <>
        <div className='w-full h-16 flex justify-center items-center text-center bg-current'>
            <label className='text-black mr-5'>Filtro: </label>
            <input placeholder="Pesquise o video pelo nome" className='w-6/12 border border-black'/>
        </div>
        <div className='m-20'>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                sx={{ flexGrow: 1 }}
            >
                {Array.from(Array(9)).map((_, index) => (
                    <Grid xs={2} sm={4} md={4} key={index}>
                        <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
                        
                        <label className='text-black'>Nome</label>
                            <iframe
                                width="auto"
                                height="auto"
                                src="https://www.youtube.com/embed/e6zCcyWdP6o?si=5RRTerK2tCthQSNy&amp;start=300"
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowfullscreen
                            ></iframe>
                            <label className='text-black'>Comentarios</label>

                        </Card>
                    </Grid>
                ))}
            </Grid>


        </div>
        </>
    )
}

export default Home;

