import AuthenticationController from "../controller/AuthenticationController";
import BaseRoutes from "./BaseRouter";
import { auth } from "../middleware/AuthMiddleware";

class AuthenticationRouter extends BaseRoutes {
    routes(): void {
        this.router.post("/login", AuthenticationController.login);
        this.router.post("/register", AuthenticationController.register);
        this.router.get("/user", auth, AuthenticationController.getCurrentUser);
        this.router.delete("/user", auth, AuthenticationController.delete);
        // this.router.put("/user", auth, AuthenticationController.update);
    }
}

export default new AuthenticationRouter().router;
