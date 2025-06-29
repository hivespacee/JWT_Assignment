import express from "express";
import apiRoutes from "./routes/apiRoutes.js";

const app = express();
app.use(express.json());

app.use("/", apiRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
