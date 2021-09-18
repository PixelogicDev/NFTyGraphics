import React, { useEffect, useState } from 'react';
import { Box, Flex, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import * as Vibrant from 'node-vibrant';

const VibrantContainer = ({ children, imageUrl, styles }) => {
  // State
  const [gradient, setGradient] = useState({
    start: '#1ED761',
    end: '#96E6A1',
  });

  // UseEffects
  useEffect(() => {
    const getVibrantAsync = async () => {
      if (imageUrl) {
        const pallete = await Vibrant.from(imageUrl).getPalette();
        console.log(pallete);

        if (pallete) {
          setGradient({ start: pallete.DarkVibrant.getHex(), end: pallete.LightVibrant.getHex() });
        }
      }
    };

    getVibrantAsync();
  }, []);

  return (
    <Flex {...styles} bgGradient={`linear(${gradient.start} 0%, ${gradient.end} 75%)`}>
      {children}
    </Flex>
  );
};

export default VibrantContainer;
