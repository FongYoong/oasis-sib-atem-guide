import { memo } from 'react';
import { VStack } from '@chakra-ui/react';
import AtemChannelControl from './AtemChannelControl';
import AtemBigButton from './AtemBigButton';

export default memo(function AtemChannel({children, ...props}) {
    return (
        <VStack align="center" justify="center" {...props} >
            <AtemChannelControl />
            <AtemBigButton mt="6" >
                {children}
            </AtemBigButton>
        </VStack>
    )
});
