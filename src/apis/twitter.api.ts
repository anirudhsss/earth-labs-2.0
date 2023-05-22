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
  code: string,
  redirectURI?: string
): Promise<Response> => {
  return fetch(
    `${baseUrl}/oAuthAtlas/AtlasLoginCallback?state=${state}&code=${code}&redirectURI=${redirectURI}`
  );
};

export const getMediaIdUsingMediaUrl = (
  baseUrl: string,
  mediaUrl: string,
  twitterId: string,
  handle: string
): Promise<Response> => {
  return fetch(
    `${baseUrl}/oAuthAtlas/AtlasTwitterMediaUpload?mediaURL=${mediaUrl}&TwitterId=${twitterId}&Handle=${handle}`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    }
  );
};

export const tweetThePost = (
  baseUrl: string,
  mediaId: string,
  twitterUserId: string,
  content: string
): Promise<Response> => {
  return fetch(
    `${baseUrl}/oAuthAtlas/AtlasGenerateTweet?TwitterId=${twitterUserId}&mediaId=${mediaId}&content=${content}`
  );
};
