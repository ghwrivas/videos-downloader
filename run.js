const axios = require('axios');
const fs = require('fs');

const INIT_PAGE = 4;
const END_PAGE = 10;

const REGEX_VIDEO_URL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*).mp4/g

const URL_PAGES = 'https://elrellano.com/videos/page/';

async function download() {
  for (let i = INIT_PAGE; i<= END_PAGE; i++) {
    const { data } = await axios.get(URL_PAGES.concat(i.toString()));
    const videoUrls = data.match(REGEX_VIDEO_URL);
    if(videoUrls.length) {
      for (let j = 0; j < videoUrls.length; j++) {
        await axios({
          method: 'get',
          url: videoUrls[j],
          responseType: 'stream'
        }).then((response) => {
          console.log(`Downlading ${videoUrls[j]}`)
          response.data.pipe(fs.createWriteStream(`C:\\Users\\wtra\\Videos\\rellano\\page-${i}-video-${j}.mp4`));
        }).catch(error => {
          console.log('Error:', error.message)
        });
      }
    }

  }
}
download();
