import { memo } from 'react';
//import { Flex, Box } from '@chakra-ui/react';
import { MotionButton } from '../MotionElements';

export default memo(function AtemMiniButton({children, highlight, highlightColor='red', ...props}) {
    return (
        <MotionButton bg='gray.700'  my="0.5" mx="2" w='4em'
            color={highlight?`${highlightColor}.500`:'white'} _hover=""
            border="2px" borderColor={highlight?`${highlightColor}.500`:"white"} borderRadius='0.7em' boxShadow={highlight?`0px 0px 15px ${highlightColor}`:"0px 0px 10px white"}
        {...props} >
            {children}
        </MotionButton>
    )
});

// textShadow="0px 0px 3px red"