import { memo } from 'react';
//import { Flex, Box } from '@chakra-ui/react';
import { MotionButton } from '../MotionElements';

export default memo(function AtemBigButton({children, highlight, highlightColor='red', ...props}) {
    return (
        <MotionButton w='7em' h='4em' bg={highlight?`${highlightColor}.500`:'gray.300'} color='black' _hover="" fontSize="2xl" fontWeight="extrabold"
            border="2px" borderColor={highlight?`${highlightColor}.500`:"white"} borderRadius='1.2em' boxShadow={highlight?`0px 0px 15px ${highlightColor}`:"0px 0px 10px white"}
            {...props} >
            {children}
        </MotionButton>
    )
});

// textShadow="0px 0px 3px red"