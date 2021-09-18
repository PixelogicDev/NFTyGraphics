import { getSession } from 'next-auth/client';

const SPOTIFY_HOSTNAME = 'https://api.spotify.com/v1';

const handler = async (req, res) => {
  try {
    if (req.method === 'GET') {
      console.log('Spotify API Get Recently Played Data');

      const response = await getRecentlyPlayed(req);

      res.status(200).json({ data: response.items });
    }
  } catch (error) {
    console.warn('Spotify API Error: ', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Actions
const getRecentlyPlayed = async (req) => {
  /**
   * I want to get all the music played in the past 30 days on Spotify and then sort them based on play count (which would be dope to show in UI)
   * Then pick the top 10 to show as wallpaper
   * On hover, play preview of song!
   */

  // Get Access Token
  const session = await getSession({ req });

  if (session) {
    const url = `${SPOTIFY_HOSTNAME}/me/top/tracks?time_range=short_term&limit=20`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    // We have top twenty songs from the past 4 weeks
    const json = await response.json();

    if (json.items) {
      json.items.sort((trackA, trackB) => trackB.popularity - trackA.popularity);
    }

    return json;
  } else {
    console.log('NO SESSION');
    return {};
  }
};

export default handler;
