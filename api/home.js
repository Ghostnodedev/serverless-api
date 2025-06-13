'use strict';

// Fetch and transform data from API 1
const api1 = async () => {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/products");
    const apiResponse = await response.json();
    return apiResponse.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      description: item.description,
      category: item.category?.name || item.category,
      image: item.images?.[0] || item.image,
    }));
  } catch (error) {
    console.error("API1 Error:", error.message);
    return []; // Return empty array on failure
  }
};

// Fetch and transform data from API 2
const api2 = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const apiResponse = await response.json();
    return apiResponse.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      description: item.description,
      category: item.category,
      image: item.image,
    }));
  } catch (error) {
    console.error("API2 Error:", error.message);
    return [];
  }
};

// Fetch and transform data from API 3 (DummyJSON)
const api3 = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const apiResponse = await response.json();
    return apiResponse.products.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      description: item.description,
      category: item.category,
      image: item.thumbnail || item.image,
    }));
  } catch (error) {
    console.error("API3 Error:", error.message);
    return [];
  }
};

export default async function handler(req, res) {
  try {
    const results = await Promise.all([api1(), api2(), api3()]);
    const data = results.flat(); 
    console.log("Sample fetched data (first 3 items):", data.slice(0, 3));
    console.log("Total items fetched:", data.length);

    res.status(200).json(data);
  } catch (error) {
    console.error("Handler Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
