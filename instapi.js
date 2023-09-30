const  { IgApiClient } = require ('instagram-private-api');
const { sample } = require ('lodash');
const { readFile } = require ('fs');
const { promisify } = require ('util');
const readFileAsync = promisify(readFile);

const ig = new IgApiClient();

let ID = "";
let SIFRE = "";

ig.state.generateDevice(ID);
async function login() 
{
    ig.state.generateDevice(ID);
    await ig.account.login(ID, SIFRE);
}

function FotoPaylas()
{
    (async () => {

        await ig.simulate.preLoginFlow();
        await login();
      
        process.nextTick(async () => await ig.simulate.postLoginFlow());
      
        const path = './bilisim-vadisi.jpeg';
        const { latitude, longitude, searchQuery } = {
          latitude: 0.0,
          longitude: 0.0,
          searchQuery: 'place',
        };
      
      
        const publishResult = await ig.publish.photo({
          file: await readFileAsync(path),
          caption: 'SELAMMUN ALEYKÜM GELİYORUZ'
        });
      
        console.log(publishResult);
      
      })();
}

function VideoPaylas()
{
    (async () => {
        await login();
      
        const videoPath = './file.mp4';
        const coverPath = './filePhoto.jpeg';
      
      
        const publishResult = await ig.publish.video({
          // read the file into a Buffer
          video: await readFileAsync(videoPath),
          coverImage: await readFileAsync(coverPath),
          /*
            this does also support:
            caption (string),  ----+
            usertags,          ----+----> See upload-photo.example.ts
            location,          ----+
           */
        });
      
        console.log(publishResult);
    })();
}
function Downloadvideo()
{
  const http = require('https'); // or 'https' for https:// URLs
  const fs = require('fs');
  
  const file = fs.createWriteStream("file.mp4");
  const request = http.get("https://instagram.fesb10-4.fna.fbcdn.net/v/t50.2886-16/209526777_4390804517605155_6495742237945518978_n.mp4?_nc_ht=instagram.fesb10-4.fna.fbcdn.net&_nc_cat=103&_nc_ohc=zW8tNTtPl4MAX8h8hdj&edm=APU89FABAAAA&ccb=7-4&oe=60DAA149&oh=55dcd81617d817d7b71b45111d027948&_nc_sid=86f79a", function(response) {
    response.pipe(file);

    
    
  });
  const filePhoto = fs.createWriteStream("filePhoto.jpeg");
  const request1 = http.get("https://instagram.fesb10-4.fna.fbcdn.net/v/t51.2885-15/e35/209439351_501010524438547_72482540742942091_n.jpg?tp=1&_nc_ht=instagram.fesb10-4.fna.fbcdn.net&_nc_cat=107&_nc_ohc=_3K9fx-s7bsAX-zUV9V&edm=APU89FABAAAA&ccb=7-4&oh=7ae050d718f5690d400dbcb23c962863&oe=60DA8C52&_nc_sid=86f79a", function(response) {
    response.pipe(filePhoto);


  });

  VideoPaylas()
}

uploadvideo();
