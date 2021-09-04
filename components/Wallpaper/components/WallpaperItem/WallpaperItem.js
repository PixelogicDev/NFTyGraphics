import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { AspectRatio, Box, Flex, Spinner, Text } from '@chakra-ui/react';

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

	const renderTrackInfo = () => {
		// Album title & Track name
		const {
			album: { name: albumName },
			name: trackName,
		} = item;

		return (
			<Box
				position="absolute"
				width="100%"
				minH="25%"
				bottom="0"
				zIndex="1"
				backgroundColor="#4C4C4CE6"
			>
				<Flex w="100%" flexDirection="column" p={2}>
					<Text fontSize="18px" color="gray.400">
						{albumName}
					</Text>
					<Text fontSize="26px" color="white" fontWeight="bold">
						{trackName}
					</Text>
				</Flex>
			</Box>
		);
	};

	return (
		<Flex
			position="relative"
			minW="320px"
			minH="320px"
			w="100%"
			h="100%"
			rounded="xl"
			overflow="hidden"
		>
			{renderAlbumImage()}
			{/* {renderTrackInfo()} */}
		</Flex>
	);
};

export default WallpaperItem;
