const  { IgApiClient } = require ('instagram-private-api');
const { sample } = require ('lodash');
const { readFile } = require ('fs');
const { promisify } = require ('util');
const readFileAsync = promisify(readFile);

const ig = new IgApiClient();

let ID = "canlimaclinkleri3";
let SIFRE = "12FURkan98";

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
      
        const videoPath = './gizleme.mp4';
        const coverPath = './bilisim-vadisi.jpeg';
      
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

VideoPaylas();