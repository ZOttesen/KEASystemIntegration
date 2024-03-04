import Fastify from 'fastify'

const fastify = Fastify({
    logger: true
})
fastify.get('/date', async function handler (req, res){
    res.send({ date: Date.now() });
})

try {
    await fastify.listen({ port: 8080 })
} catch (err) {
    fastify.log.error(err)
    process.exit(1)
}