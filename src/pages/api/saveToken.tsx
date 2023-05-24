import { useSelector } from "react-redux";
import { NextApiHandler } from "next";


// let token = useSelector((state: any) => state.userLogin.token);
const handleSaveToken: NextApiHandler = (req, res) => {
    try {
        const {token} = req.body;
        res.setHeader("Authorization", `Bearer ${token}`);
        res.status(200).json({ message: "Token saved in request headers successfully" });
    } catch (error) {
      console.error("Error saving token in request headers:", error);
      res.status(500).json({ error: "Failed to save token in request headers" });
    }
}

export default handleSaveToken;