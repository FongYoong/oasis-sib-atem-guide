import { memo } from 'react';
import { Flex, VStack, Heading } from '@chakra-ui/react';
import AtemMiniButton from './AtemMiniButton';

export default memo(function AtemMic({children, ...props}) {
    return (
        <VStack align="center" justify="center" >
            <Flex align="center" justify="center" {...props} >
                <VStack align="center" justify="center" >
                    <AtemMiniButton >
                        ON
                    </AtemMiniButton>
                    <AtemMiniButton >
                        ᐃ
                    </AtemMiniButton>
                </VStack>
                <VStack align="center" justify="center" >
                    <AtemMiniButton >
                        OFF
                    </AtemMiniButton>
                    <AtemMiniButton >
                        ᐁ
                    </AtemMiniButton>
                </VStack>
            </Flex>
            <Heading textAlign='center' px={8} m={4} color='white' fontSize="md" fontWeight="bold" >
                {children}
            </Heading>
        </VStack>
    )
});
