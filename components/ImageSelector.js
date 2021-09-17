import { useState, useRef, useEffect, memo } from 'react';
import { Zoom, Slide } from "react-awesome-reveal";
import { useDisclosure, Box, Flex, Button, IconButton, ButtonGroup, Tabs, TabList, TabPanels, Tab, TabPanel, Icon, Image as ChakraImage,
Modal,
ModalOverlay,
ModalContent,
ModalHeader,
ModalFooter,
ModalBody,
ModalCloseButton
} from '@chakra-ui/react';
import { MotionButton, MotionImage } from './MotionElements';
import { FaRegCheckCircle } from 'react-icons/fa';
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi';

/* function vh(v) {
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (v * h) / 100;
} */

function vw(v) {
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  return (v * w) / 100;
}


export default memo(function ImageSelector({children, buttonClassName, buttonIcon, buttonColor, data, updateCallback}) {
    const modalState = useDisclosure();
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(Object.keys(data)[0]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    // Button Hover
    const hoverImageRef = useRef(null);
    const [hoverShow, setHoverShow] = useState(false);
    const hoverShowRef = useRef(null);
    hoverShowRef.current = hoverShow;
    const [hoverImageURL, setHoverImageURL] = useState(data[Object.keys(data)[0]][0]);

    const changeIndex = (change) => {
        const nextIndex = selectedImageIndex + change;
        if (data[selectedCategory][nextIndex]) {
            setSelectedImageIndex(nextIndex);
        }
        else {
            const nextCategoryIndex = selectedCategoryIndex + change;
            let nextCategory = Object.keys(data)[nextCategoryIndex];
            if (nextCategory) {
                //alert('next category')
                setSelectedCategoryIndex(nextCategoryIndex);
                setSelectedCategory(nextCategory);
            }
            else {
                //alert('overflow category')
                const newIndex = change > 0 ? 0 : (Object.keys(data).length - 1);
                nextCategory = Object.keys(data)[newIndex];
                setSelectedCategoryIndex(newIndex);
                setSelectedCategory(nextCategory);
            }
            setSelectedImageIndex(change > 0 ? 0 : (data[nextCategory].length - 1));
        }
    }

    const updateHoverImagePos = (event) => {
        if (hoverImageRef.current) {
            hoverImageRef.current.style.left = event.clientX - vw(10) + 'px';
            hoverImageRef.current.style.top = event.clientY + vw(2) + 'px';
        }
    };

    useEffect(() => {
        // Button Hover
        document.addEventListener('mousemove', (event) => {
            if (hoverShowRef.current) {
                updateHoverImagePos(event);
            }
        });
        // Restore from localStorage
        const categIndex = localStorage.getItem(children + 'selectedCategoryIndex');
        const categ = localStorage.getItem(children + 'selectedCategory');
        const imgIndex = localStorage.getItem(children + 'selectedImageIndex');

        if (categIndex !== null) {
            setSelectedCategoryIndex(parseInt(categIndex));
        }
        if (categ !== null) {
            setSelectedCategory(categ);
        }
        if (imgIndex !== null) {
            setSelectedImageIndex(parseInt(imgIndex));
        }
        if (categ !== null && imgIndex !== null) {
            setHoverImageURL(data[categ][imgIndex]);
        }
    }, []);

    useEffect(() => {
        updateCallback(hoverImageURL);
    }, [hoverImageURL]);

    useEffect(() => {
        localStorage.setItem(children + 'selectedCategoryIndex', selectedCategoryIndex);
        localStorage.setItem(children + 'selectedCategory', selectedCategory);
        localStorage.setItem(children + 'selectedImageIndex',  selectedImageIndex);
        setHoverImageURL(data[selectedCategory][selectedImageIndex]);
    }, [selectedCategoryIndex, selectedCategory, selectedImageIndex]);


    return (
        <>
        <ChakraImage ref={hoverImageRef}
            w='20vw' position='fixed' pointerEvents='none' zIndex='500' alt='selector-button-hover' src={hoverImageURL}
            opacity={hoverShow? 1 : 0} transition='opacity 0.5s'  border='2px' borderColor='white' boxShadow="0 0px 24px 0 rgba(0, 196, 170, 1)"
        />
        <ButtonGroup isAttached py='2'>
            <Slide direction='left' duration='300'>
                <IconButton aria-label="Minus" variant='outlined' icon={<FiMinusCircle color='white' />}
                    onClick={() => changeIndex(-1)}
                />
            </Slide>
            <MotionButton className={buttonClassName} leftIcon={buttonIcon} colorScheme={buttonColor}
                onMouseEnter={(event) => {
                    updateHoverImagePos(event);
                    setHoverShow(true);
                }}
                onMouseLeave={() => {
                    setHoverShow(false);
                }}
                onClick={modalState.onOpen}
            >
                {children}
            </MotionButton>
            <Slide direction='right' duration='300'>
                <IconButton aria-label="Add" variant='outlined' icon={<FiPlusCircle color='white' />}
                    onClick={() => changeIndex(1)}
                />
            </Slide>
        </ButtonGroup>
        <Modal size='full' isOpen={modalState.isOpen} onClose={modalState.onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{children}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Tabs isLazy defaultIndex={Object.keys(data).indexOf(selectedCategory)}  >
                    <TabList overflowX='auto' overflowY= 'hidden' >
                        {Object.keys(data).map((category) => 
                            <Tab key={category} >{category}</Tab> 
                        )}
                    </TabList>
                    <TabPanels>
                        {Object.keys(data).map((category, categoryIndex) => 
                            <TabPanel key={category} >
                                <Flex wrap='wrap' align='start' justify='start' >
                                    {data[category].map((imageUrl, key) => {
                                        const selected = selectedCategory==category && selectedImageIndex==key;
                                        return (
                                            <Zoom key={key} delay={key * 100} duration='300'>
                                                <Box position='relative' overflow='hidden' >
                                                    <MotionImage
                                                        //fallback={<Loading w="25vw" />}
                                                        fallbackSrc=''
                                                        filter={selected ? 'contrast(50%)' : ''}
                                                        m='4' opacity='0.85' borderColor='#fcbe03' borderRadius='0' border='2px'
                                                        whileHover={{ scale: 1.05, opacity:1, borderRadius:'1em', boxShadow:"10px 10px 0 rgba(115, 255, 224)" } }
                                                        whileTap={{ scale: 0.9 }}
                                                        w="25vw" fit='cover' alt='' src={imageUrl}
                                                        onClick={() => {
                                                            setSelectedCategoryIndex(categoryIndex);
                                                            setSelectedCategory(category);
                                                            setSelectedImageIndex(key);
                                                            modalState.onClose();
                                                        }}
                                                    />
                                                    {selected &&
                                                        <Icon boxSize='5vw' color="white" pointerEvents='none' as={FaRegCheckCircle} position='absolute' top='40%' left='45%' />
                                                    }
                                                </Box>
                                            </Zoom>
                                        );
                                    })}
                                </Flex>
                            </TabPanel>
                        )}
                    </TabPanels>
                </Tabs>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme="purple" mr={3} onClick={modalState.onClose}>
                    Close
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
});