import { addNewPlayer, deletePlayer, findPlayerbyId, getPlayers, updatePlayer } from "../controllers/playerController";
import { loginRequired, loginUser, registerUser } from "../controllers/userController";

const routes = (app) => {
    app.route("/test")
        .get((req, res)=>{
            res.send("Hello from route");
        })

    app.route("/players")
        .post(loginRequired ,addNewPlayer)

        .get(loginRequired, getPlayers)
    
    app.route("/player/:playerId")
        .get(loginRequired, findPlayerbyId)

        .put(loginRequired, updatePlayer)

        .delete(loginRequired, deletePlayer)
    
    app.route("/auth/register")
        .post(registerUser)

    app.route("/login")
        .post(loginUser)
}

export default routes;