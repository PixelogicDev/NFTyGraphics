import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Box, Button, Flex, VStack, Spinner, Text } from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/client';
import Wallpaper from '../components/Wallpaper';

const Home = () => {
	// Hooks
	const [session, loading] = useSession();

	// State
	const [topTracks, setTopTracks] = useState([]);

	// Actions
	const getRecentlyPlayed = async () => {
		// Create API that calls Spotify Auth
		// TODO: DO PROPER API ROUTING
		const protocol = window.location.protocol;
		const hostname = window.location.hostname;
		const port = window.location.port;

		const response = await fetch(
			`${protocol}//${hostname}:${port}/api/spotify`
		);

		const jsonResponse = await response.json();
		console.log(jsonResponse);
		if (response.status === 200 && jsonResponse.data) {
			console.log('We have the data!');
			setTopTracks(jsonResponse.data);
		}

		if (response.status === 500) {
			console.log('ERROR: ', jsonResponse.error);
		}
	};

	const spotifyAuthAction = async () => {
		try {
			await signIn('spotify');
		} catch (error) {
			console.warn('spotifyAuthError: ', error.message);
		}
	};

	// Render Methods
	const renderIsAuthed = () => (
		<Flex
			w="100%"
			h="100%"
			flexDir="column"
			justifyContent="center"
			alignItems="center"
		>
			<VStack w="100%" h="100%" spacing={2}>
				<Wallpaper items={topTracks} />
			</VStack>
			{/* <VStack w="100%" h="100%" spacing={2}>
				<VStack w="100%" h="100%" spacing="2">
					<Wallpaper items={topTracks} />
					<Button onClick={() => getRecentlyPlayed()}>GET THE DATA 👀</Button>
				</VStack>
				<Button onClick={() => signOut()}>Buh Bye 👋</Button>
			</VStack> */}
		</Flex>
	);

	const renderLoading = () => (
		<Flex w="100%" h="100%" justifyContent="center" alignItems="center">
			<Spinner color="white" />
			{/* cyntronicaltwitch: Line 69 */}
		</Flex>
	);

	const renderNeedsAuth = () => (
		<Flex
			flexDir="column"
			w="100%"
			h="100%"
			justifyContent="center"
			alignItems="center"
		>
			<Text fontSize="xl">Oh No! Needs Auth!</Text>
			<Button onClick={spotifyAuthAction}>🤘Get Started With Spotify</Button>
		</Flex>
	);

	return (
		<VStack w="100%" h="100%" bg="green.300" overflow="scroll">
			<Text textAlign="center" fontSize="3xl" fontWeight="bold">
				Welcome to NFTyGraphics
			</Text>
			{loading && renderLoading()}
			{!loading && !session && renderNeedsAuth()}
			{!loading && session && renderIsAuthed()}
		</VStack>
	);
};

export default Home;
