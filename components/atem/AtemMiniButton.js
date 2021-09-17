import { memo } from 'react';
import { useBreakpointValue } from '@chakra-ui/react';
import { MotionButton } from '../MotionElements';

export default memo(function AtemMiniButton({children, highlight, highlightColor='red', ...props}) {
    const breakpoint = useBreakpointValue({ base: "mobile", xs: "mobile", sm: "mobile", md: "mobile", lg: "lg" });
    return (
        <MotionButton w={breakpoint==='mobile'?'8vh':'4em'} bg='gray.700'  my="0.5" mx="2" 
            color={highlight?`${highlightColor}.500`:'white'} _hover=""
            border="2px" borderColor={highlight?`${highlightColor}.500`:"white"} borderRadius='0.7em' boxShadow={highlight?`0px 0px 15px ${highlightColor}`:"0px 0px 10px white"}
        {...props} >
            {children}
        </MotionButton>
    )
});
// w='4em'
