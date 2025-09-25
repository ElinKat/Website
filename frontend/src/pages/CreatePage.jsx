import React from 'react'
import { Container, useColorModeValue, VStack, Heading, Box, Input, Button } from '@chakra-ui/react'
import { useState } from 'react';
import { useProductStore } from '../store/product'
import { useToast } from '@chakra-ui/react'


const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        description: '',
        image: '',
    });

    const toast = useToast()

    const handleCreateProduct = async() => {
        const {success, message} = await createProduct(newProduct)
        if(success) {
            toast({
                title: 'Product created successfully',
                description: message,
                status: 'success',
                isClosable: true,
            })
        }
        else {
            toast({
                title: 'Product creation failed',
                description: message,
                status: 'error',
                isClosable: true,
            })
        }
        setNewProduct({
            name: '',
            price: '',
            description: '',
            image: '',
        })
    };

    const {createProduct} = useProductStore()


  return (
    <Container maxW="100%" px={4}>
        <VStack spacing={8}>
            <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8} mt={20}>Create New Product</Heading>
            <Box w={"full"} maxW={"md"} mx={"auto"} bg={useColorModeValue('gray.200', 'gray.900')} p={6} borderRadius={"lg"} boxShadow={"md"}>
                <VStack spacing={4}>
                    <Input placeholder="Product Name" name="name" type="text" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
                    <Input placeholder="Price" name="price" type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
                    <Input placeholder="Description" name="description" type="text" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
                    <Input placeholder="Image URL" name="image" type="text" value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} />
                    <Button colorScheme={"blue"} onClick={handleCreateProduct}>Create</Button>

                </VStack>	
            </Box>
        </VStack>
    </Container>
  )
}

export default CreatePage