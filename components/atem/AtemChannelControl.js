import { memo } from 'react';
import { Flex, VStack } from '@chakra-ui/react';
import AtemMiniButton from './AtemMiniButton';

export default memo(function AtemChannelControl({micEnabled, enableCallback, volumeCallback, ...props}) {
    return (
        <Flex align="center" justify="center" {...props} >
            <VStack align="center" justify="center" >
                <AtemMiniButton>
                    AFV
                </AtemMiniButton>
                <AtemMiniButton highlight={micEnabled} onClick={() => enableCallback(true)} >
                    ON
                </AtemMiniButton>
                <AtemMiniButton onClick={() => volumeCallback(5)} >
                    ᐃ
                </AtemMiniButton>
            </VStack>
            <VStack align="center" justify="center" >
                <AtemMiniButton >
                    RESET
                </AtemMiniButton>
                <AtemMiniButton highlight={!micEnabled} onClick={() => enableCallback(false)} >
                    OFF
                </AtemMiniButton>
                <AtemMiniButton onClick={() => volumeCallback(-5)} >
                    ᐁ
                </AtemMiniButton>
            </VStack>
        </Flex>
    )
});
