import { Box, Image, Text, Heading, useColorModeValue, HStack, IconButton } from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { useProductStore } from '../store/product'
import { useToast } from '@chakra-ui/react'


const ProductCard = ({ product }) => {
    const textColor = useColorModeValue("gray.700", "gray.200");
    const bgColor = useColorModeValue("gray.100", "gray.900");
    const toast = useToast()
    const {deleteProduct} = useProductStore()

    const handleDeleteProduct = async(id) => {
        const {success, message} = await deleteProduct(id);
        if(success) {
            toast({
                title: 'Product deleted successfully',
                description: message,
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        }
        else {
            toast({
                title: 'Product deletion failed',
                description: message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }
    return (
        <Box
        w={"full"}
        h={"full"}
        borderRadius={"lg"}
        boxShadow={"md"}
        shadow={"lg"}
        rounded={"lg"}
        overflow={"hidden"}
        bg={bgColor}
        transition={"all 0.3s"}
        _hover={{
            transform: "translateY(-5px)",
            boxShadow: "xl",
        }}
        >
            <Image src={product.image} alt={product.name} w={"full"} h={48} objectFit={"cover"} />
            {/* <Text fontSize={"lg"} fontWeight={"bold"} textAlign={"center"} mt={2}>{product.name}</Text> */}
            {/* <Text fontSize={"md"} textAlign={"center"} mt={2}>{product.price}</Text> */}
            {/* <Text fontSize={"sm"} textAlign={"center"} mt={2}>{product.description}</Text> */}

            <Box p={4}>
                <Heading as={"h3"} size={"md"} fontSize={"lg"} fontWeight={"bold"} textAlign={"center"} mt={2}>
                    {product.name}
                    </Heading>
                <Text fontWeight={"bold"} fontSize={"xl"}  color={textColor} textAlign={"center"} mt={2}>{product.price}</Text>
                <Text fontSize={"sm"} textAlign={"center"} mt={2}>{product.description}</Text>
                
                <HStack
                justifyContent={"space-between"}
                alignItems={"center"}
                mt={2}
                >
                    <IconButton icon={<EditIcon />} colorScheme={"blue"}/>
                    <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme={"red"}/>
                </HStack>
                </Box>
        </Box>
    )
}

export default ProductCard