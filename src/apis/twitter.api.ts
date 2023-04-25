export const authorizeTwitter = (baseUrl: string): Promise<Response> => {
  return fetch(`${baseUrl}/oAuthAtlas/AtlasAuthorizeURLDev`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};

export const getUserTwitterId = (
  baseUrl: string,
  state = "state",
  code: string
): Promise<Response> => {
  return fetch(
    `${baseUrl}/oAuthAtlas/AtlasLoginCallback?state=${state}&code=${code}`
  );
};

export const getMediaIdUsingMediaUrl = (
  baseUrl: string,
  mediaUrl: string,
  twitterId: number,
  handle: string
): Promise<Response> => {
  return fetch(
    `${baseUrl}/oAuthAtlas/AtlasTwitterMediaUpload?mediaURL=${mediaUrl}&TwitterId=${twitterId}&Handle=${handle}`
  );
};

export const tweetThePost = (
  baseUrl: string,
  mediaId: number,
  twitterUserId: number
): Promise<Response> => {
  return fetch(
    `${baseUrl}/oAuthAtlas/AtlasGenerateTweet?TwitterId=${twitterUserId}&mediaId=${mediaId}`
  );
};
