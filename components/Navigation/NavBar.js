import Image from 'next/image';
import { Box, Flex, HStack, Button, useColorModeValue } from '@chakra-ui/react';
import logout from '@/config/logout';
import '@/app/globals.css';

const DashboardLinks = [
  { title: 'Daily', url: '/dashboard/day' },
  { title: 'Employee', url: '/dashboard/people' },
  { title: 'Staff', url: '/dashboard/add-staff' },
];

const ExternalLinks = [
  { title: 'Scheduling', url: '/' },
  { title: 'Login', url: '/login' },
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

function Navigation(props) {
  return <></>;
}

export default function NavBar(props) {
  console.log(Boolean(props.internal));
  console.log(typeof Boolean(props.internal));
  return (
    <>
      {props.internal ? (
        <Box px={4} id="navigation">
          <Flex h={16}>
            <HStack id="navContents" spacing={8} alignItems={'center'}>
              <Image src="/mandilas-logo-coloured.png" width={20} height={20} alt="Picture of the author" />
              <Box> VMS</Box>
              <HStack as={'nav'} spacing={4}>
                {DashboardLinks.map((data) => (
                  <NavLink key={data.url} href={data.url}>
                    {data.title}
                  </NavLink>
                ))}
                <Button onClick={() => logout(props.checker)}>Logout</Button>
              </HStack>
            </HStack>
          </Flex>
        </Box>
      ) : (
        <Box px={4} id="navigation">
          <Flex h={16}>
            <HStack id="navContents" spacing={8} alignItems={'center'}>
              <Image src="/mandilas-logo-coloured.png" width={20} height={20} alt="Picture of the author" />
              <Box> VMS</Box>
              <HStack as={'nav'} spacing={4}>
                {ExternalLinks.map((data) => (
                  <NavLink key={data.url} href={data.url}>
                    {data.title}
                  </NavLink>
                ))}
                <Button onClick={() => logout(props.checker)}>Logout</Button>
              </HStack>
            </HStack>
          </Flex>
        </Box>
      )}
    </>
  );
}
