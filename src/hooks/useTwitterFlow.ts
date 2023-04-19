import {
  authorizeTwitter,
  getMediaIdUsingMediaUrl,
  getUserTwitterId,
  tweetThePost,
} from "apis/twitter.api";

interface ITwitterUser {
  id: string;
  name: string;
  username: string;
}

const useTwitterFlow = () => {
  // Constants
  const BASE_URL = "https://atlas-api-ms.azure-api.net/ato";

  // Initate the Link for the twitter authO
  const initateTwitterAuth = async (): Promise<void> => {
    const response = await authorizeTwitter(BASE_URL);
    const url: string = await response.json();
    window.location.href = url;
  };

  const getTwitterUserInfo = async (
    state = "state",
    code: string
  ): Promise<ITwitterUser> => {
    const response = await getUserTwitterId(BASE_URL, state, code);
    const result = await response.json();
    const user: ITwitterUser = result.data;
    return user;
  };

  const generateMediaId = async (
    mediaUrl: string,
    twitterUserId: number,
    handle: string
  ): Promise<string> => {
    const response = await getMediaIdUsingMediaUrl(
      BASE_URL,
      mediaUrl,
      twitterUserId,
      handle
    );
    const result = await response.json();
    return result.Media_id;
  };

  const tweetGlyphImageOnTwitter = async (
    mediaUrl: number,
    twitterUserId: number
  ): Promise<{ message: string; code: number; result: any }> => {
    const response = await tweetThePost(BASE_URL, mediaUrl, twitterUserId);
    const result = await response.json();
    return {
      result,
      code: 1,
      message: "Successfully Tweeted",
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
