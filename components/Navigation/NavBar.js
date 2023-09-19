import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import logout from '@/config/logout';

const Links = [
  { title: 'Daily Visits', url: '/dashboard/day' },
  { title: 'Employee Visits', url: '/dashboard/people' },
  { title: 'Add Employee', url: '/dashboard/add-staff' },
];

const NavLink = (props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={12}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={props.href}
    >
      {children}
    </Box>
  );
};

export default function NavBar(props) {
  // const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          {/* <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          /> */}
          <HStack spacing={8} alignItems={'center'}>
            <Box>Logo</Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((data) => (
                <NavLink key={data.url} href={data.url}>
                  {data.title}
                </NavLink>
              ))}
              <Button onClick={() => logout(props.checker)}>Logout</Button>
            </HStack>
          </HStack>
        </Flex>

        {/* {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((data) => (
                <NavLink key={data.url} href={data.url}>
                  {data.title}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null} */}
      </Box>
    </>
  );
}
