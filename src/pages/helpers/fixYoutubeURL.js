const fixYoutubeURL = (url) => {
  const indexOfEqual = url.indexOf('=');
  const youtubeCode = url.slice(indexOfEqual + 1);
  return `https://www.youtube.com/embed/${youtubeCode}`;
};

export default fixYoutubeURL;
