import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "eCommerce API",
      version: "1.0.0",
      description:
        "A RESTful eCommerce API built with Express, TypeScript, and MongoDB",
    },
    servers: [
      {
        url: "https://ecommerce-api-s8fd.onrender.com",
        description: "Production",
      },
      {
        url: "http://localhost:3000",
        description: "Development",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
