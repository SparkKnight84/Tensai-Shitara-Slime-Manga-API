import { config } from "dotenv";
config();
import routes from "./routes.js";
const PORT = process.env.PORT || 3000;
const LOGGER = true;
import fastify from "fastify";
const app = fastify({
    logger: LOGGER
});
app.get('/api', (req, reply) => {
    reply.send([
        "/api/",
        "/api/chapters",
        "/api/pages/:chapter"
    ]);
});
app.get("/api/chapters", routes.getChapters);
app.get("/api/pages/:chapter", routes.getPages);
app.listen(PORT, (err, address) => {
    if (err) {
        if (LOGGER) {
            app.log.error(err);
        }
        else {
            console.error(err);
        }
        process.exit(1);
    }
    if (LOGGER) {
        app.log.info(`server listening on ${address}`);
    }
    else {
        console.log(`Server listening on ${address}`);
    }
});
