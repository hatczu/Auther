import express, { Application, Request, Response } from 'express';
import cors from 'cors'; // Import the cors middleware
import Database from './config/database';
import AuthenticationRouter from './router/AuthenticationRouter';
import NoteRouter from './router/NoteRouter';

class App {
    public app: Application;

    // init
    constructor() {
        this.app = express();
        this.databaseSync();
        this.plugins();
        this.routes();
    }

    // routes
    protected routes(): void {
        this.app.route("/").get((req: Request, res: Response) => {
            res.send("welcome home");
        });

        this.app.use("/note", NoteRouter);
        this.app.use("/auth", AuthenticationRouter);
    }

    // database sync
    protected databaseSync(): void {
        const db = new Database();
        db.sequelize?.sync();
    }

    // plugin
    protected plugins(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        // Enable CORS for all origins
        this.app.use(cors({
            origin: 'http://localhost:3000',
            credentials: true // if needed
        }));        
    }
}

const port: number = 8000;
const app = new App().app;

app.listen(port, () => {
    console.log("✅ Server started successfully!");
});
