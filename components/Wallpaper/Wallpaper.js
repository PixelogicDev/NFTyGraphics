import React, { useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Box, Flex, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import WallpaperItem from './components/WallpaperItem';
const VibrantContainer = dynamic(() => import('../VibrantContainer'), { ssr: false });

const Wallpaper = ({ items }) => {
  // Actions
  const getGradientImage = useCallback(() => {
    // Get Image from first item
    const item = items[0];
    const {
      album: { images },
    } = item;

    return images[0].url;
  }, [items]);

  // Render Methods
  const renderItems = useCallback(
    () =>
      items.map((item) => (
        <Flex key={item.id} w="100%" h="100%" justifyContent="center" alignItems="center" shadow="lg" rounded="xl">
          <WallpaperItem item={item} />
        </Flex>
      )),
    [items]
  );

  // UseEffects
  useEffect(() => {
    console.log('WALLPAPER ITEMS: ', items);
  }, [items]);

  return (
    <VStack w="100%" flexDir="column" justifyContent="center">
      {/* <Text fontSize="xl" color="white" fontWeight="bold" textAlign="center">
        4 Weeks Of Music History
      </Text> */}
      {items && items.length !== 0 && (
        <VibrantContainer
          imageUrl={getGradientImage()}
          styles={{
            w: '90%',
            h: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            rounded: 'xl',
          }}
        >
          <SimpleGrid w="100%" h="100%" minChildWidth="300px" spacing="10px" p={3}>
            {renderItems()}
          </SimpleGrid>
        </VibrantContainer>
      )}
    </VStack>
  );
};

export default Wallpaper;
