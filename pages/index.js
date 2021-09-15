import Head from 'next/head';
//import { useRouter } from 'next/router';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Zoom } from "react-awesome-reveal";
import { MotionButton } from '../components/MotionElements';
import { useBreakpointValue, useDisclosure, Image as ChakraImage, HStack, Box, Divider, Heading, Flex, VStack } from "@chakra-ui/react";
import Navbar from '../components/Navbar';
import NavbarSpace from '../components/NavbarSpace';
import AtemMic from '../components/atem/AtemMic';
import AtemChannel from '../components/atem/AtemChannel';
import AtemPiP from '../components/atem/AtemPiP';
import AtemMiniButton from '../components/atem/AtemMiniButton';
import AtemBigButton from '../components/atem/AtemBigButton';
import ImageSelector from '../components/ImageSelector';
import {presenterImages} from '../lib/presenterData';
import {obsImages} from '../lib/obsData';
import { MdNavigateNext } from 'react-icons/md';

export default function Home() {
    //const router = useRouter();
    //const breakpoint = useBreakpointValue({ base: "base", md: "md", lg: "lg" });
    const obsImageRef = useRef(null);
    const presenterImageRef = useRef(null);
    const obsCanvasRef = useRef(null);
    const presenterCanvasRef = useRef(null);
    const [cropped, setCropped] = useState(true);
    const [obsImageURL, setObsImageURL] = useState('images/worship_ori.png');
    const [presenterImageURL, setPresenterImageURL] = useState('images/worship_green.png');

    const displayOBS = (startup=false) => {
      const obsCanvas = obsCanvasRef.current;
      const obsContext = obsCanvas.getContext('2d');
      const obsImageElement = obsImageRef.current;
      // Draw OBS Image
      obsContext.drawImage(obsImageElement, 0, 0, obsCanvas.width, obsCanvas.height);
      const presenterImageElement = presenterImageRef.current;
      if(startup) {
        presenterImageElement.onload = () => {
          displayPresenter();
          presenterImageElement.onload = () => {};
        };
        if (presenterImageElement.complete) {
          displayPresenter();
        }
      }
    };

    const displayPresenter = () => {
      // OBS
      const obsCanvas = obsCanvasRef.current;
      const obsContext = obsCanvas.getContext('2d');
      // Presenter
      const presenterCanvas = presenterCanvasRef.current;
      const presenterContext = presenterCanvas.getContext('2d');
      const presenterImageElement = presenterImageRef.current;
      // Draw presenter image
      presenterContext.drawImage(presenterImageElement, 0, 0, presenterCanvas.width, presenterCanvas.height);

      // Green screen effect
      const obsImage = obsContext.getImageData(0, 0, obsCanvas.width, obsCanvas.height);
      const obsImageData = obsImage.data;
      const presenterImage = presenterContext.getImageData(0, 0, presenterCanvas.width, presenterCanvas.height);
      const presenterImageData = presenterImage.data;
      // Iterate through all pixels
      const tolerance = 160;
      for(let i = 0; i < presenterImageData.length; i += 4) {
        const diff = Math.abs(presenterImageData[i] - presenterImageData[0]) + Math.abs(presenterImageData[i+1] - presenterImageData[1]) + Math.abs(presenterImageData[i+2] - presenterImageData[2]);
        if(diff < tolerance) {
          //presenterImageData[i + 3] = 0;
        }
        else {
          obsImageData[i] =  presenterImageData[i];
          obsImageData[i + 1] =  presenterImageData[i + 1];
          obsImageData[i + 2] =  presenterImageData[i + 2];
          obsImageData[i + 3] =  presenterImageData[i + 3];
        }
      }
      // Set image data
      obsContext.putImageData(obsImage, 0, 0);
      if (!cropped) {
        cropOBS(obsCanvas, obsContext, obsCanvas.width, obsCanvas.height);
      }
    }

    const cropOBS = (obsCanvas, obsContext, width, height) => {
      // Draw cropped version
      obsContext.drawImage(obsCanvas, 0, 0, width, height, width*0.05, height*0.05, width * 0.9, height*0.9);

      // Draw rectangle
      obsContext.beginPath();
      obsContext.lineWidth = (height*0.1).toString();
      obsContext.strokeStyle = "black";
      obsContext.rect(0, 0, width, height);
      obsContext.stroke();
      // Draw vertical left line
      obsContext.beginPath();
      obsContext.lineWidth = (width*0.1).toString();
      obsContext.strokeStyle = "black";
      obsContext.moveTo(0, 0);
      obsContext.lineTo(0, height);
      obsContext.stroke();
      // Draw vertical right line
      obsContext.beginPath();
      obsContext.lineWidth = (width*0.1).toString();
      obsContext.strokeStyle = "black";
      obsContext.moveTo(width, 0);
      obsContext.lineTo(width, height);
      obsContext.stroke();
    }

    useEffect(() => {
      displayOBS();
      displayPresenter();
    }, [cropped, presenterImageURL]);

    useEffect(() => {
      const multiplier = 2.5;
      const width = Math.round(window.screen.width / multiplier);
      const height = Math.round(width * 9 / 16);
      // OBS
      const obsCanvas = obsCanvasRef.current;
      obsCanvas.width = width; // 1280
      obsCanvas.height = height; // 720
      // Presenter
      const presenterCanvas = presenterCanvasRef.current;
      presenterCanvas.width = width; // 1280
      presenterCanvas.height = height; // 720
    }, []);

    return (
        <div>
            <Head>
                <title>Oasis SIB Atem Guide - Home</title>
            </Head>
            <main>
              <Navbar />
              <VStack>
                <NavbarSpace />
                <VStack spacing={4} w="100%" h='100%' align="center" justify="center">

                  <Heading textAlign='center' m={4} color='white' fontSize="4xl" fontWeight="extrabold" >
                    Display
                  </Heading>
                  <MotionButton onClick={() => setCropped(!cropped)} >
                    Transition to {cropped?'uncropped':'cropped'}
                  </MotionButton>
                  <HStack spacing='4' align="center" justify="center" >
                    <Box border='2px' borderColor='white' >
                      <canvas ref={obsCanvasRef} />
                    </Box>
                    <Box border='2px' borderColor='white' >
                      <canvas ref={presenterCanvasRef} />
                    </Box>
                  </HStack>
                  <ImageSelector data={presenterImages}
                    onClick={(category, imageUrl) => {
                      setPresenterImageURL(imageUrl);
                    }}
                  >
                    Slides
                  </ImageSelector>
                  <ChakraImage ref={obsImageRef} onLoad={() => displayOBS(true)} display='none' alt='obs' src={obsImageURL} />
                  <ChakraImage ref={presenterImageRef} display='none' alt='obs' src={presenterImageURL} />







                  <Divider w='95%' borderWidth={2} borderColor='gray.400' />










                  {/* Atem controls */}
                  <Heading textAlign='center' pb="8" color='white' fontSize="4xl" fontWeight="extrabold" >
                    Atem Controls
                  </Heading>
                  <Flex my={20} wrap='wrap' align="end" justify="start"
                    borderRadius='1em'
                    boxShadow='0 10px 4px 5px #666, /*bottom external highlight*/
                                0 -5px 4px 10px #4f4f4f, /*top external shadow*/ 
                                inset 0 -1px 1px rgba(0,0,0,0.5), /*bottom internal shadow*/ 
                                inset 0 1px 1px rgba(255,255,255,0.8)' >
                    <Flex wrap='wrap' align="end" justify="start" >
                      <Zoom triggerOnce >
                        <VStack p={4} >
                          <AtemMic>
                            MIC 1
                          </AtemMic>
                          <AtemChannel pt="4" >
                            1
                          </AtemChannel>
                        </VStack>
                      </Zoom>
                      <Zoom triggerOnce >
                        <VStack p={4} >
                          <AtemMic>
                            MIC 2
                          </AtemMic>
                          <AtemChannel pt="4" >
                            2
                          </AtemChannel>
                        </VStack>
                      </Zoom>
                        <Zoom triggerOnce >
                        <VStack p={4} >
                          <AtemChannel pt="4" >
                            3
                          </AtemChannel>
                        </VStack>
                      </Zoom>
                        <Zoom triggerOnce >
                        <VStack p={4} >
                          <AtemChannel pt="4" >
                            4
                          </AtemChannel>
                        </VStack>
                      </Zoom>
                    </Flex>
                    <Flex wrap='wrap' align="end" justify="start" >
                      <Zoom triggerOnce >
                        <VStack p={4} >
                          <Flex align="center" justify="center" >
                            <AtemPiP />
                            <VStack ml="16" align="center" justify="center" >
                                <AtemMiniButton >
                                    ON
                                </AtemMiniButton>
                                <AtemMiniButton >
                                    OFF
                                </AtemMiniButton>
                                <Heading textAlign='center' px={8} m={4} color='white' fontSize="md" fontWeight="bold" >
                                  KEY
                                </Heading>
                            </VStack>
                          </Flex>
                          <AtemBigButton mt="6" >
                            AUTO
                          </AtemBigButton>
                        </VStack>
                      </Zoom>
                    </Flex>
                  </Flex>

                </VStack>
              </VStack>
            </main>
            <footer>

            </footer>
        </div>
  )
}

/*

                      <Heading textAlign='center' px={8} m={4} color='white' fontSize={breakpoint==='base'?'2xl':'6xl'} fontWeight="extrabold" >
                        Bla bla
                      </Heading>
                      <Divider borderWidth={1} borderColor='gray.50' />
                      <MotionGetAttention attentionType='expand' >
                        <Button mt={4} rightIcon={<MdNavigateNext />} colorScheme={"purple"} >
                          Get Started
                        </Button>
                      </MotionGetAttention>
  */