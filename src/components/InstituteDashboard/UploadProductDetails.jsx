import React, { useState } from "react";

const emptyProduct = {
  productName: "",
  brandName: "",
  productSize: "",
  productColors: "",
  productFor: "",
  productImages: [],   // <-- now array of files
  productDescription: "",
};

const UploadProductDetails = () => {
  const [products, setProducts] = useState([{ ...emptyProduct }]);

  // ➕ Add Card
  const handleAddCard = () => {
    if (products.length >= 5) {
      alert("You can add maximum 5 products only");
      return;
    }
    setProducts([...products, { ...emptyProduct }]);
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

  // 💾 Save
  const handleSave = () => {
    console.log("Saved Product Data:", products);
    alert("Products Saved Successfully!");

    // To see what you stored
    products.forEach((p, i) => {
      console.log(`PRODUCT ${i + 1}`, p);
    });
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-xl">

      {/* Header + Add Button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Add Product Details</h1>

        <button
          onClick={handleAddCard}
          className="bg-orange-500 text-white px-4 py-1 rounded-md"
        >
          ➕ Add
        </button>
      </div>

      {/* PRODUCT CARDS */}
      {products.map((product, index) => (
        <div
          key={index}
          className="bg-gray-50 border border-gray-300 p-5 mb-6 rounded-lg"
        >

          {/* REMOVE BUTTON */}
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
              <label className="font-semibold text-sm">
                Product Size’s
              </label>
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
                placeholder="Male, Female, Other"
                className="w-full border-2 border-orange-300 rounded h-9 px-3"
              />
            </div>

            {/* 📁 FILE UPLOAD FIELD */}
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

              {/* Preview Images */}
              {product.productImages?.length > 0 && (
                <div className="flex gap-3 mt-2 flex-wrap">
                  {product.productImages.map((img, i) => (
                    <img
                      key={i}
                      src={URL.createObjectURL(img)}
                      alt="preview"
                      className="w-16 h-16 object-cover rounded border"
                    />
                  ))}
                </div>
              )}
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
      ))}

      {/* SAVE BUTTON */}
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
