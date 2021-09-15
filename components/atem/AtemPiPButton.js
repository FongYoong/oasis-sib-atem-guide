import { memo } from 'react';
import { Box } from '@chakra-ui/react';
import AtemMiniButton from './AtemMiniButton';

export default memo(function AtemPiPButton({left, right, top, bottom, ...props}) {
    return (
        <AtemMiniButton highlightColor='yellow' {...props} >
            <Box m='1' borderRadius='2' position='absolute' w='45%' h='40%' bg='gray.300' left={left} right={right} top={top} bottom={bottom} >
                &nbsp;
            </Box>
        </AtemMiniButton>
    )
});
