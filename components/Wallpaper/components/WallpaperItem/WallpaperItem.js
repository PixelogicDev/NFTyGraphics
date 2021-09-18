import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { AspectRatio, Badge, Box, Flex, Spinner, Text } from '@chakra-ui/react';

const WallpaperItem = ({ item }) => {
  // Render Method
  const renderAlbumImage = () => {
    // Check to see if Item has album
    const { album } = item;

    if (album) {
      const { images } = album;

      if (images) {
        const image = images.find((image) => image.height === 640);

        if (image) {
          return (
            <Image
              src={image.url}
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL={image.url}
              alt={`Album artwork for ${album.name}`}
            />
          );
        }
      }
    }

    // Some fall back image
    return null;
  };

  const renderPopularityBadge = () => (
    <Badge
      color="white"
      bgGradient={`linear(#FCCB90 0%, #D57EEB 75%)`}
      fontSize="sm"
      variant="subtle"
      colorScheme="purple"
      rounded="lg"
      shadow="lg"
    >
      <Text casing="capitalize">🔥 This is a hot track</Text>
    </Badge>
  );

  // raushanraja: I am professional & stream regularly (09.18.21)
  const renderTrackInfo = () => {
    // Album title & Track name
    const { artists, name: trackName } = item;

    // There could be multiple artists for one track
    const mappedArtists = artists.map((artist) => artist.name);

    return (
      <Box position="absolute" width="100%" minH="25%" bottom="0" zIndex="1" backgroundColor="#4C4C4CE6">
        <Flex w="100%" flexDirection="column" p={2}>
          <Text fontSize={['lg', 'xl']} color="gray.400">
            {mappedArtists.join(' | ')}
          </Text>
          <Text fontSize={['xl', '2xl']} color="white" fontWeight="bold">
            {trackName}
          </Text>
        </Flex>
      </Box>
    );
  };

  return (
    <Flex position="relative" minW="320px" minH="320px" w="100%" h="100%" rounded="xl" overflow="hidden">
      {item.popularity >= 55 && (
        <Box zIndex="1" position="absolute" right="0" p={1} px={2}>
          {renderPopularityBadge()}
        </Box>
      )}
      {renderAlbumImage()}
      {renderTrackInfo()}
    </Flex>
  );
};

export default WallpaperItem;
