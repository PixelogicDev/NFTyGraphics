import React, { useEffect } from 'react';
import { Box, Flex, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import WallpaperItem from './components/WallpaperItem';
import styles from '../../styles/Wallpaper.module.css';

const Wallpaper = ({ items }) => {
	// UseEffects
	useEffect(() => {
		console.log('WALLPAPER ITEMS: ', items);
	}, [items]);

	return (
		<VStack
			w="100%"
			h="100%"
			flexDir="column"
			backgroundColor="gray.400"
			justifyContent="center"
			overflow=""
		>
			<Text fontSize="xl" color="white" fontWeight="bold" textAlign="center">
				4 Weeks Of Music History
			</Text>
			<Flex
				w="90%"
				h="100%"
				bg="purple.300"
				justifyContent="center"
				alignItems="center"
			>
				<SimpleGrid
					w="100%"
					h="100%"
					minChildWidth="300px"
					spacing="10px"
					p={3}
				>
					{items.map((item) => (
						<Flex
							key={item.id}
							w="100%"
							h="100%"
							justifyContent="center"
							alignItems="center"
							shadow="lg"
							rounded="xl"
						>
							<WallpaperItem item={item} />
						</Flex>
					))}
				</SimpleGrid>
			</Flex>
		</VStack>
	);
};

export default Wallpaper;
