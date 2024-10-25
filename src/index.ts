import server from './server'

const prot = process.env.PORT || 4000

server.listen(prot, () => {
    console.log(`Servidor ejecutandose por el puerto ${4000}`)
})