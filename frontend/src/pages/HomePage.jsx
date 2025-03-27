import React, { useEffect, useMemo, useState } from "react";
import { Container, Text, VStack, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard.jsx";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  const [isLoading, setIsLoading] = useState(true);
  console.log("Rendering");
  console.log("isLoading? :", isLoading);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        console.log("fetchProducts and try block START");

        await fetchProducts();
        console.log("fetchProducts and try block DONE");
      } catch (error) {
        console.error("Erreur lors du chargement des produits :", error);
      } finally {
        console.log("DEBUT Finally : setIsLoading(false)");

        setIsLoading(false);
        console.log("FIN Finally : setIsLoading(false)");
      }
    };
    loadProducts();
  }, [fetchProducts]);

  const productList = useMemo(() => {
    console.log("Création de la liste des ProductCard");
    console.log(products);
    return products.map((product) => <ProductCard key={product._id} product={product} />);
  }, [products]);

  return (
    <Container maxW="container.xl">
      <VStack spacing={8}>
        <Text fontSize={{ base: "22", sm: "28" }} fontWeight="bold" textTransform="uppercase" textAlign="center" bgGradient="linear(to-r, cyan.400, blue.500)" bgClip="text">
          Current Products
        </Text>
        {isLoading && products.length === 0 ? (
          <Text textAlign="center">Loading</Text>
        ) : products.length === 0 ? (
          <Text fontSize="xl" textAlign="center" fontWeight="bold" color="gray.500">
            No products found 😥
            <Link to={"/create"}>
              <Text as="span" color="blue.500" _hover={{ textDecoration: "underline" }}>
                Create a product
              </Text>
            </Link>
          </Text>
        ) : (
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            spacing={10}
            w={"full"}
          >
            {productList}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
