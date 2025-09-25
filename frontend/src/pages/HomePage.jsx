import { Container, VStack, Text, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product'
import { useEffect } from 'react'
import ProductCard from '../components/ProductCard'



const HomePage = () => {


  const {fetchProducts, products} = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products:", products);

  return (
    (<Container maxW="container.xl" py={22}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          textAlign={"center"}
          bgGradient="linear(to-l,rgb(89, 255, 0), rgb(255, 8, 164))"
          bgClip="text"
          mt={20}
        >

          Current Products
          </Text>

        <SimpleGrid
        columns= {{base: 1, sm: 2, md: 2, lg: 3}}
        spacing={10}
        w={"full"}
        >

        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
        </SimpleGrid>	

{products.length === 0 && (
  <Text
          fontSize={"xl"}
          fontWeight={"bold"}
          textAlign={"center"}
          color={"gray.500"}
          mt={2}

        >
          No products found! 😢 ➡️ {" "}
          <Link to="/create">
            <Text
              as="span"
              display="inline-block"   // <-- vajalik, et transform töötaks
              color="blue.400"
              ml={4}
              transition="all 0.2s ease-in-out"
              _hover={{
                color: "blue.300",
                transform: "scale(1.1)",
              }}
            >
              Create a product 😎
            </Text>
          </Link>
        </Text>
)}
        
      </VStack>
    </Container>)
  )
}

export default HomePage