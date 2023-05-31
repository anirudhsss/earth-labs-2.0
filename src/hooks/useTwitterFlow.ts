import {
  authorizeTwitter,
  getMediaIdUsingMediaUrl,
  getUserTwitterId,
  tweetThePost,
} from "apis/twitter.api";

export interface ITwitterUser {
  id?: string;
  name?: string;
  username?: string;
}

interface IGenerateTweetResponse {
  edit_history_tweet_ids: string[];
  id: string;
  text: string;
}

const useTwitterFlow = () => {
  // Constants
  const BASE_URL = "https://atlasapi-twitter-ms.azure-api.net";

  // Initate the Link for the twitter authO
  const initateTwitterAuth = async (txn?: string): Promise<string> => {
    const response = await authorizeTwitter(BASE_URL);
    if (txn) localStorage.setItem("txn", txn as string);
    const url = await response.text();
    return url;
  };

  const getTwitterUserInfo = async (
    state = "state",
    code: string,
    redirectURI?: string
  ): Promise<ITwitterUser> => {
    const response = await getUserTwitterId(BASE_URL, state, code, redirectURI);
    const result = await response.json();
    const user: ITwitterUser = result.data;
    return user;
  };

  const generateMediaId = async (
    mediaUrl: string,
    twitterUserId: string,
    handle: string
  ): Promise<string> => {
    const response = await getMediaIdUsingMediaUrl(
      BASE_URL,
      mediaUrl,
      twitterUserId,
      handle
    );
    const result = await response.text();
    return result;
  };

  const tweetGlyphImageOnTwitter = async (
    mediaId: string,
    twitterUserId: string,
    content: string
  ): Promise<IGenerateTweetResponse> => {
    const response = await tweetThePost(
      BASE_URL,
      mediaId,
      twitterUserId,
      content
    );
    const tweetResponse = await response.json();
    const result: IGenerateTweetResponse = tweetResponse.data;
    return {
      edit_history_tweet_ids: result.edit_history_tweet_ids,
      id: result.id,
      text: result.text,
    };
  };

  return {
    initateTwitterAuth,
    getTwitterUserInfo,
    generateMediaId,
    tweetGlyphImageOnTwitter,
  };
};

export default useTwitterFlow;
