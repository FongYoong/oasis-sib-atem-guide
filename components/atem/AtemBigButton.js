import { memo } from 'react';
import { useBreakpointValue } from '@chakra-ui/react';
import { MotionButton } from '../MotionElements';

export default memo(function AtemBigButton({children, highlight, highlightColor='red', ...props}) {
    const breakpoint = useBreakpointValue({ base: "mobile", xs: "mobile", sm: "mobile", md: "mobile", lg: "lg" });
    return (
        <MotionButton w={breakpoint==='mobile'?'20vh':'7em'} h={breakpoint==='mobile'?'11.4vh':'4em'}
            bg={highlight?`${highlightColor}.500`:'gray.300'} color='black' _hover="" fontSize="2xl" fontWeight="extrabold"
            border="2px" borderColor={highlight?`${highlightColor}.500`:"white"} borderRadius='1.2em' boxShadow={highlight?`0px 0px 15px ${highlightColor}`:"0px 0px 10px white"}
            {...props} >
            {children}
        </MotionButton>
    )
});

// w='7em' h='4em'