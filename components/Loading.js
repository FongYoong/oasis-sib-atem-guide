import { memo } from 'react';
import { Flex, Spinner } from '@chakra-ui/react';

export default memo(function Loading({...props}) {
    return (
        <Flex p={8} align="center" justify="center" {...props} >
            <Spinner size="lg" />
        </Flex>
    )
});