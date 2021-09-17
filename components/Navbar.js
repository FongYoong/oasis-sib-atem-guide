import { memo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useBreakpointValue, HStack, IconButton, Flex, Heading,
} from '@chakra-ui/react';
import { MotionButton } from '../components/MotionElements';
import { IoLogoGithub } from 'react-icons/io5';
import { ImBook } from 'react-icons/im';




const Navbar = () => {
    const router = useRouter();
    const breakpoint = useBreakpointValue({ base: "base", md: "base", lg: "lg" });

    const openURLNewTab = useCallback((url) => {
        window.open(url,'_blank').focus();
    }, []);

    return (
        <>
        <Flex zIndex={1000} bg="gray.600" position="fixed" w="100%" align="center" justify="space-between" p={breakpoint==="base"? "0.4em": "1.5em"}>
            <HStack spacing={4}>
                <IconButton icon={<IoLogoGithub size={25} />} onClick={() => openURLNewTab("https://github.com/FongYoong/oasis-sib-atem-guide")}/>
                <Heading color='white' fontSize={["sm", "md", "lg", "2xl"]} onClick={() => router.push('/')} as="button">
                        Oasis SIB Atem Guide
                </Heading>
                <MotionButton ml='2' colorScheme='purple' leftIcon={<ImBook />} onClick={() => openURLNewTab("https://fongyoong.github.io/oasis-sib-media-guide/")} >
                    Docs
                </MotionButton>
            </HStack>
        </Flex>
    </>
    );
};

export default memo(Navbar);