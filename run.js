const rp = require("request-promise");
const fs = require('fs').promises;
const lastvideo = 10002;

async function download() {
  let url = 'https://elrellano.com/_ficheros/';
  let next = true;
  let i = lastvideo;
  let downloads = [];
  while (next) {
    if (i > 0) {
      let initDate = new Date();
      let filename = `items_${i}_mp4.mp4`;
      let promise = rp({
        url: url.concat(filename), method: 'GET',
        encoding: null,
        headers: { 'Content-type': 'video/mp4' }
      }).then((data) => fs.writeFile(`/home/williams/videos/rellano/${filename}`, data, () => console.log(error)))
        .catch((err) => Promise.resolve({ error: filename }));
      downloads.push(promise);
    } else {
      next = !next;
    }
    i--;
  }
  Promise.all(downloads);
}
download();
