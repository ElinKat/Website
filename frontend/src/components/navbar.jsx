import React from 'react'
import { PlusSquareIcon } from '@chakra-ui/icons'
import { Container, Flex, HStack, Text, Button, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { FaMoon } from "react-icons/fa6";
import { GoSun } from "react-icons/go";
import { useColorMode, useColorModeValue } from '@chakra-ui/react'



const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()


  return (
    <Container maxW="100%" px={4} bg={useColorModeValue('gray.200', 'gray.900')}>
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          textTransform="uppercase"
          textAlign="center"
          bgGradient="linear(to-l,rgb(89, 255, 0), rgb(255, 8, 164))"
          bgClip="text"
          fontSize={{ base: "22", sm: "28" }}
          fontWeight="extrabold"
        >
          <Link as={RouterLink} to="/">Product Store</Link>
        </Text>

        <HStack spacing={4} alignItems="center">
          <Button
            as={RouterLink}
            to="/create"
            leftIcon={<PlusSquareIcon fontSize="20px" />}
            colorScheme="blue"
          >
            Add Product
          </Button>
          {/* <Link as={RouterLink} to="/create">Create</Link>
          <Button leftIcon={<PlusSquareIcon fontSize="20px" />}>
            Add Product
          </Button> */}

          <Button onClick={toggleColorMode} leftIcon={colorMode === 'light' ? <FaMoon /> : <GoSun />}>
            {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
          </Button>
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar
