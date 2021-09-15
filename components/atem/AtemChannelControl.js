import { memo } from 'react';
import { Flex, VStack } from '@chakra-ui/react';
import AtemMiniButton from './AtemMiniButton';

export default memo(function AtemChannelControl({...props}) {
    return (
        <Flex align="center" justify="center" {...props} >
            <VStack align="center" justify="center" >
                <AtemMiniButton>
                    AFV
                </AtemMiniButton>
                <AtemMiniButton >
                    ON
                </AtemMiniButton>
                <AtemMiniButton >
                    ᐃ
                </AtemMiniButton>
            </VStack>
            <VStack align="center" justify="center" >
                <AtemMiniButton >
                    RESET
                </AtemMiniButton>
                <AtemMiniButton >
                    OFF
                </AtemMiniButton>
                <AtemMiniButton >
                    ᐁ
                </AtemMiniButton>
            </VStack>
        </Flex>
    )
});
