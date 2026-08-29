import {
  getProducts as getProductsApi,
  createProduct as createProductApi,
  updateProduct as updateProductApi,
  deleteProduct as deleteProductApi,
  getProductById as getProductByIdApi,
} from "../api/productApi";

/* ================= PRODUCTS ================= */

export const fetchProducts = async () => {
  const res = await getProductsApi();
  return res.data;
};

export const addProduct = async (data) => {
  const res = await createProductApi(data);
  return res.data;
};

export const editProduct = async (id, data) => {
  const res = await updateProductApi(id, data);
  return res.data;
};

export const removeProduct = async (id) => {
  const res = await deleteProductApi(id);
  return res.data;
};

/* ================= SINGLE PRODUCT (FOR HISTORY) ================= */

export const fetchProductById = async (id) => {
  const res = await getProductByIdApi(id);
  return res.data;
};
