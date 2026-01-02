import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const emptyProduct = {
  productName: "",
  brandName: "",
  productSize: "",
  productColors: "",
  productFor: "",
  productImages: [],
  productDescription: "",
};

const UploadProductDetails = () => {
  const [products, setProducts] = useState([{ ...emptyProduct }]);
  const [view, setView] = useState("form");
  const [editIndex, setEditIndex] = useState(null);

  const navigate = useNavigate(); // ✅ ADDED

  // ➕ Add Card
  const handleAddCard = () => {
    if (products.length >= 5) {
      alert("You can add maximum 5 products only");
      return;
    }
    setProducts([...products, { ...emptyProduct }]);
    setEditIndex(null);
  };

  // 🗑 Remove Card
  const handleRemoveCard = (index) => {
    const updated = products.filter((_, i) => i !== index);
    setProducts(updated);
  };

  // ✏️ Handle text inputs
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...products];
    updated[index][name] = value;
    setProducts(updated);
  };

  // 📁 Handle Image Selection
  const handleImageSelect = (index, e) => {
    const files = Array.from(e.target.files);
    const updated = [...products];
    updated[index].productImages = files;
    setProducts(updated);
  };

  // 💾 Save → go to list
  const handleSave = () => {
    alert("Products Saved Successfully!");
    setEditIndex(null);
    setView("list");
  };

  // ✏️ Edit Product
  const handleEdit = (index) => {
    setEditIndex(index);
    setView("form");
  };

  /* ============================= */
  /* 🟠 PRODUCT LIST PAGE */
  /* ============================= */
  if (view === "list") {
    return (
      <div className="p-6 bg-white rounded-xl shadow-xl">

        {/* TOP RIGHT HEADER */}
        <div className="flex justify-end mb-8 gap-3">
          <button
            onClick={() => {
              setView("form");
              setEditIndex(null);
              navigate("/upload-product-details");
            }}
            className="bg-orange-400 text-black px-6 py-2 rounded-lg font-semibold"
          >
            Sell a Product
          </button>

          <div
            onClick={() => setView("list")}
            className="bg-orange-500 p-3 rounded-lg text-white cursor-pointer"
          >
            ☰
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-6">Your Products</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((p, i) => (
            <div
              key={i}
              className="border-2 border-orange-400 rounded-2xl p-4"
            >
              <div className="h-44 bg-gray-100 rounded-xl mb-4 flex items-center justify-center">
                {p.productImages?.[0] ? (
                  <img
                    src={URL.createObjectURL(p.productImages[0])}
                    alt="product"
                    className="h-full w-full object-cover rounded-xl"
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </div>

              <h3 className="font-bold text-lg mb-2 text-orange-600">
                {p.productName || "Product name"}
              </h3>

              <p className="text-xs text-gray-500">Price</p>
              <p className="font-bold text-black text-lg mb-2">₹ 0000</p>

              <button
                onClick={() => handleEdit(i)}
                className="bg-orange-400 px-4 py-1 rounded-md text-sm font-semibold"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ============================= */
  /* 🔵 FORM PAGE */
  /* ============================= */
  return (
    <div className="p-6 bg-white rounded-xl shadow-xl">

      {/* TOP RIGHT HEADER */}
      <div className="flex justify-end mb-6">
        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-3">
            <button
              onClick={() => {
                setView("form");
                setEditIndex(null);
                navigate("/upload-product-details");
              }}
              className="bg-orange-400 text-black px-6 py-2 rounded-lg font-semibold"
            >
              Sell a Product
            </button>

            <div
              onClick={() => setView("list")}
              className="bg-orange-500 p-3 rounded-lg text-white cursor-pointer"
            >
              ☰
            </div>
          </div>

          <button
            onClick={handleAddCard}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold"
          >
            + Add
          </button>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-6">Add Product Details</h1>

      {products.map((product, index) => {
        if (editIndex !== null && editIndex !== index) return null;

        return (
          <div
            key={index}
            className="bg-gray-50 border border-gray-300 p-5 mb-6 rounded-lg"
          >
            {products.length > 1 && (
              <button
                onClick={() => handleRemoveCard(index)}
                className="float-right text-red-600 font-bold"
              >
                ✖ Remove
              </button>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-black">

              <div>
                <label className="font-semibold text-sm">Product Name</label>
                <input
                  name="productName"
                  value={product.productName}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full border-2 border-orange-300 rounded h-9 px-3"
                />
              </div>

              <div>
                <label className="font-semibold text-sm">Brand Name</label>
                <input
                  name="brandName"
                  value={product.brandName}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full border-2 border-orange-300 rounded h-9 px-3"
                />
              </div>

              <div>
                <label className="font-semibold text-sm">Product Size’s</label>
                <input
                  name="productSize"
                  value={product.productSize}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full border-2 border-orange-300 rounded h-9 px-3"
                />
              </div>

              <div>
                <label className="font-semibold text-sm">
                  Product Color Options
                </label>
                <input
                  name="productColors"
                  value={product.productColors}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full border-2 border-orange-300 rounded h-9 px-3"
                />
              </div>

              <div>
                <label className="font-semibold text-sm">Product For</label>
                <input
                  name="productFor"
                  value={product.productFor}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full border-2 border-orange-300 rounded h-9 px-3"
                />
              </div>

              <div>
                <label className="font-semibold text-sm">
                  Upload Images of Product
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageSelect(index, e)}
                  className="w-full border-2 border-orange-300 rounded h-9 px-2"
                />
              </div>

              <div className="lg:col-span-2">
                <label className="font-semibold text-sm">
                  Product Description
                </label>
                <textarea
                  name="productDescription"
                  value={product.productDescription}
                  onChange={(e) => handleChange(index, e)}
                  rows={4}
                  className="w-full border-2 border-orange-300 rounded px-3 py-2"
                />
              </div>

            </div>
          </div>
        );
      })}

      <div className="flex justify-center mt-4">
        <button
          onClick={handleSave}
          className="bg-orange-500 text-white px-12 py-2 rounded-xl font-bold text-lg"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default UploadProductDetails;
