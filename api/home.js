'use strict'

const data = [];

console.log(data);
console.log(data.length)

const api1 = async () => {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/products");
    const apiResponse = await response.json();
    const dta = apiResponse.map((item) => {
      return {
        id: item.id,
        title: item.title,
        price: item.price,
        description: item.description,
        category: item.category?.name || item.category, // API-specific fix
        image: item.images?.[0] || item.image,
      };
    });
    data.push(...dta);
  } catch (error) {
    console.error("API1 Error:", error.message);
  }
};

const api2 = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const apiResponse = await response.json();
    const dta = apiResponse.map((item) => {
      return {
        id: item.id,
        title: item.title,
        price: item.price,
        description: item.description,
        category: item.category,
        image: item.image,
      };
    });
    data.push(...dta);
  } catch (error) {
    console.error("API2 Error:", error.message);
  }
};

const api3 = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const apiResponse = await response.json();
    const dta = apiResponse.map((item) => {
      return {
        id: item.id,
        title: item.title,
        price: item.price,
        description: item.description,
        category: item.category,
        image: item.image,
      };
    });
    data.push(...dta);
  } catch (error) {
    console.error("API3 Error:", error.message);
  }
};

const api4 = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const apiResponse = await response.json();
    const dta = apiResponse.products.map((item) => {
      return {
        id: item.id,
        title: item.title,
        price: item.price,
        description: item.description,
        category: item.category,
        image: item.thumbnail || item.image,
      };
    });
    data.push(...dta);
  } catch (error) {
    console.error("API4 Error:", error.message);
  }
};

export default async function handler(req, res) {
    try {
        await Promise.all([api1(), api2(), api3(), api4()]);
        res.status(200).json(data);
        } catch (error) {
            console.error("Error:", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
}