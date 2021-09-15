import { memo, useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useColorMode, useColorModeValue, useBreakpointValue, Avatar, AvatarBadge, HStack, Button, IconButton, Flex, Heading,
AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay,
Menu, MenuButton, MenuList, MenuItem, MenuGroup, MenuDivider,
} from '@chakra-ui/react';
import { motion } from "framer-motion";
import { MotionButton } from "./MotionElements";
import { BsSun, BsMoon } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { IoLogoGithub } from 'react-icons/io5';
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlineUser } from 'react-icons/ai';
 
const Navbar = () => {
    const router = useRouter();
    const breakpoint = useBreakpointValue({ base: "base", md: "base", lg: "lg" });

    return (
        <>
        <Flex zIndex={1000} bg="gray.700" position="fixed" w="100%" align="center" justify="space-between" p={breakpoint==="base"? "0.4em": "1.5em"}>
            <HStack spacing={4}>
                <IconButton icon={<IoLogoGithub size={25} />} onClick={() => router.push('https://github.com/FongYoong/data-logger-nextjs')}/>
                <Heading color='white' fontSize={["sm", "md", "lg", "2xl"]} onClick={() => router.push('/')} as="button">
                        Atem Guide
                </Heading>
            </HStack>
        </Flex>
    </>
    );
};

export default memo(Navbar);