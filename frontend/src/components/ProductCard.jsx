import { Box, Image, Text, Heading, useColorModeValue, HStack, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input, ModalFooter, Button } from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { useProductStore } from '../store/product'
import { useToast } from '@chakra-ui/react'
import { useState, useEffect } from 'react' 





const ProductCard = ({ product }) => {
    const textColor = useColorModeValue("gray.700", "gray.200");
    const bgColor = useColorModeValue("gray.200", "gray.900");
    const toast = useToast()
    const {deleteProduct, updateProduct} = useProductStore()
    const [updatedProduct, setUpdatedProduct] = useState(product)
    const [modalOpen, setModalOpen] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    
    // Debug modal state changes (only log when modal actually opens/closes)
    useEffect(() => {
        if (modalOpen) {
            console.log('Modal opened for product:', product.name);
        }
    }, [modalOpen, product.name]);
    
    // Reset the updated product when modal opens
    const handleOpen = () => {
        setUpdatedProduct(product)
        setModalOpen(true)
    }
    
    // Custom close function
    const handleClose = () => {
        setModalOpen(false);
    }

    const handleDeleteProduct = async(id) => {
        const {success, message} = await deleteProduct(id);
        if(success) {
            toast({
                title: 'Product deleted successfully',
                description: message,
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
        }
        else {
            toast({
                title: 'Product deletion failed',
                description: message,
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }
    }


    const handleUpdateProduct = async(id, updatedProduct) => {
        // Prevent double-clicks
        if (isUpdating) {
            console.log('Update already in progress, ignoring click');
            return;
        }
        
        try {
            setIsUpdating(true);
            console.log('Starting update...', { id, updatedProduct });
            
            // Check if anything has actually changed
            const hasChanges = 
                updatedProduct.name !== product.name ||
                updatedProduct.price !== product.price ||
                updatedProduct.description !== product.description ||
                updatedProduct.image !== product.image;
            
            if (!hasChanges) {
                toast({
                    title: 'No changes detected',
                    description: 'Please make some changes before updating',
                    status: 'warning',
                    duration: 2000,
                })
                setIsUpdating(false);
                return; // Don't proceed with update
            }
            
            const result = await updateProduct(id, updatedProduct);
            console.log('Update result:', result);
            
            if(result && result.success) {
                toast({
                    title: 'Product updated successfully',
                    status: 'success',
                    duration: 2000,
                })
                // Force close the modal immediately
                setModalOpen(false);
                
                // Force close with timeout as backup
                setTimeout(() => {
                    setModalOpen(false);
                }, 100);
            }
            else {
                toast({
                    title: 'Product update failed',
                    description: result?.message || 'Unknown error',
                    status: 'error',
                    duration: 2000,
                })
                // Don't close modal on failure so user can try again
            }
        } catch (error) {
            console.error('Update error:', error);
            toast({
                title: 'Product update failed',
                description: 'Network error occurred',
                status: 'error',
                duration: 2000,
            })
        } finally {
            setIsUpdating(false);
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
                    <IconButton icon={<EditIcon />} onClick={handleOpen} colorScheme={"blue"}/>
                    <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme={"red"}/>
                </HStack>
                </Box>
                <Modal
                isOpen={modalOpen}
                onClose={handleClose}
                key={`${product._id}-${modalOpen}`}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Update Product</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Input placeholder="Product Name" name="name" type="text" value={updatedProduct.name} onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })} />
                            <Input placeholder="Price" name="price" type="number" value={updatedProduct.price} onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })} />
                            <Input placeholder="Description" name="description" type="text" value={updatedProduct.description} onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })} />
                            <Input placeholder="Image URL" name="image" type="text" value={updatedProduct.image} onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })} />
                        </ModalBody>
                        <ModalFooter>
                            <Button 
                                colorScheme={"blue"} 
                                onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                                isLoading={isUpdating}
                                loadingText="Updating..."
                                disabled={isUpdating}
                            >
                                Update
                            </Button>
                            <Button colorScheme={"red"} onClick={handleClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
        </Box>
    )
}

export default ProductCard