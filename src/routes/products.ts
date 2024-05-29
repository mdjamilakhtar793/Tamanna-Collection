import express from "express";
import {
  deleteProduct,
  getAdminProducts,
  getAllCategories,
  getAllProducts,
  getSingleProduct,
  getlatestProducts,
  newProducts,
  updateProduct,
} from "../controllers/products.js";
import { singleUpload } from "../middlewares/multer.js";
import { adminOnly } from "../middlewares/auth.js";
const app = express();

app.post("/new", adminOnly, singleUpload, newProducts);
app.get("/latest", getlatestProducts);
app.get("/categories", getAllCategories);
app.get("/all", getAllProducts);
app.get("/admin-products", adminOnly, getAdminProducts);

app
  .route("/:id")
  .get(getSingleProduct)
  .put(adminOnly, singleUpload, updateProduct)
  .delete(adminOnly, deleteProduct);

export default app;
