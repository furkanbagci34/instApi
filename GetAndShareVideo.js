const Instagram = require('instagram-web-api')
const  { IgApiClient } = require ('instagram-private-api');
const { sample } = require ('lodash');
const { readFile } = require ('fs');
const { promisify } = require ('util');
const readFileAsync = promisify(readFile);

const ig = new IgApiClient();
const { username, password } = process.env
let resim1
let resim2
let resim3
let resim4
let resim5
let resim6
let video1
let video2
let video3
let videocaption1
let videocaption2
let videocaption3
let repositoryId1
let repositoryId2
let repositoryId3

const client = new Instagram({ username, password })

LoginAndStart()

function LoginAndStart()
{
  console.log(1)
  ;(async () => {
    await client.login({ username: 'trivela.sport', password: 'elitebook11' })       

    setInterval(OtoShare, 3600000);
    setInterval(OtoFollow,7200000)
    setInterval(unFollowAllList,14900000)
    // setInterval(LogoutAndLogin,72000000)
    //deleteAll()
  })()
}
function OtoShare()
{
  console.log(2)
    ;(async () => {
      const Post1 = await client.getPhotosByUsername({ username: 'sporx', first: '1', after: ''  })
      const Post2 = await client.getPhotosByUsername({ username: 'sporotag', first: '1', after: ''  })
      const Post3 = await client.getPhotosByUsername({ username: 'trtspor', first: '1', after: ''  })
      if(Post1.user.edge_owner_to_timeline_media.edges[0].node.__typename == 'GraphImage' || Post1.user.edge_owner_to_timeline_media.edges[0].node.__typename == 'GraphSidecar')
      {
        if(Post1.user.edge_owner_to_timeline_media.edges[0].node.id != resim1)
        {
         resim1 = Post1.user.edge_owner_to_timeline_media.edges[0].node.id
         const photo = Post1.user.edge_owner_to_timeline_media.edges[0].node.display_url
         await client.uploadPhoto({ photo, caption: Post1.user.edge_owner_to_timeline_media.edges[0].node.edge_media_to_caption.edges[0].node.text , post: 'feed' })
         console.log(1)
        }
      }
      if(Post2.user.edge_owner_to_timeline_media.edges[0].node.__typename == 'GraphImage' || Post2.user.edge_owner_to_timeline_media.edges[0].node.__typename == 'GraphSidecar')
      {
        if(Post2.user.edge_owner_to_timeline_media.edges[0].node.id != resim2)
        {
           resim2 = Post2.user.edge_owner_to_timeline_media.edges[0].node.id
           const photo = Post2.user.edge_owner_to_timeline_media.edges[0].node.display_url
           await client.uploadPhoto({ photo,caption: Post2.user.edge_owner_to_timeline_media.edges[0].node.edge_media_to_caption.edges[0].node.text , post: 'feed' })
        }
      }
      if(Post3.user.edge_owner_to_timeline_media.edges[0].node.__typename == 'GraphImage' || Post3.user.edge_owner_to_timeline_media.edges[0].node.__typename == 'GraphSidecar')
      {
        if(Post3.user.edge_owner_to_timeline_media.edges[0].node.id != resim3)
        {
           resim3 = Post3.user.edge_owner_to_timeline_media.edges[0].node.id
           const photo = Post3.user.edge_owner_to_timeline_media.edges[0].node.display_url
           await client.uploadPhoto({ photo, caption:  Post3.user.edge_owner_to_timeline_media.edges[0].node.edge_media_to_caption.edges[0].node.text , post: 'feed' })
        }
      }
      OtoVideoShare1()
  
    
    })()
}
async function OtoVideoShare1()
{
  const Post4 = await client.getPhotosByUsername({ username: 'freshhfootball', first: '1', after: ''  })

  if(Post4.user.edge_owner_to_timeline_media.edges[0].node.__typename == 'GraphVideo' )
    {
      if(Post4.user.edge_owner_to_timeline_media.edges[0].node.id != repositoryId1)
      {  
        repositoryId1 = Post4.user.edge_owner_to_timeline_media.edges[0].node.id
        resim4 = Post4.user.edge_owner_to_timeline_media.edges[0].node.thumbnail_src
        video1 = Post4.user.edge_owner_to_timeline_media.edges[0].node.video_url
        console.log(resim4)
        videocaption1 = Post4.user.edge_owner_to_timeline_media.edges[0].node.edge_media_to_caption.edges[0].node.text
        Downloadvideo1()
      }
    }
}
async function OtoVideoShare2()
{
  const Post5 = await client.getPhotosByUsername({ username: 'footballpassage7', first: '1', after: ''  })

  if(Post5.user.edge_owner_to_timeline_media.edges[0].node.__typename == 'GraphVideo' )
     {
       if(Post5.user.edge_owner_to_timeline_media.edges[0].node.id != repositoryId2)
       {
        repositoryId2 = Post5.user.edge_owner_to_timeline_media.edges[0].node.id
        resim5 = Post5.user.edge_owner_to_timeline_media.edges[0].node.thumbnail_src
        video2 = Post5.user.edge_owner_to_timeline_media.edges[0].node.video_url
        videocaption2 = 'FOLLOW @trivela.sport                  #football #skill #goal'

        Downloadvideo2()
       }
     }
}
async function OtoVideoShare3()
{
  const Post6 = await client.getPhotosByUsername({ username: 'ahmedfazehd', first: '1', after: ''  })

   if(Post6.user.edge_owner_to_timeline_media.edges[0].node.__typename == 'GraphVideo' )
     {
       if(Post6.user.edge_owner_to_timeline_media.edges[0].node.id != repositoryId3)
       {
        repositoryId3 = Post6.user.edge_owner_to_timeline_media.edges[0].node.id
        resim6 = Post6.user.edge_owner_to_timeline_media.edges[0].node.thumbnail_src
        video3 = Post6.user.edge_owner_to_timeline_media.edges[0].node.video_url
        videocaption3 = 'FOLLOW @trivela.sport                  #football #skill #goal'
        Downloadvideo3()
       }
     }
}
  function OtoFollow(){
    ;(async () => {
         
       const Post1 = await client.getPhotosByUsername({ username: 'trtspor', first: '1', after: ''  })
       const likes = await client.getMediaLikes({ shortcode: Post1.user.edge_owner_to_timeline_media.edges[0].node.shortcode, first: '15', after: '' })
       likes.edges.forEach(async followItems =>
        {
          await client.follow({ userId: followItems.node.id })
        })
    })()
  } 
  function unFollowAllList()
  {
    ;(async () => {
      
    const follows = await client.getFollowings({ userId: '43948640389',first: '49' })
  
  
    follows.data.forEach(async followItems =>
      {
        await client.unfollow({ userId: followItems.id })
  
      })
    })()
  } 
  // function LogoutAndLogin()
  // {
  //   ;(async () => {

  //     await client.logout()

  //     setTimeout(LoginAndStart, 70000);
  //   })()
  // } 
  // async function deleteAll()
  // {
  //   const Post1 = await client.getPhotosByUsername({ username: 'kisahikayetv', first: '49', after: ''  })
  //   console.log(Post1.user.edge_owner_to_timeline_media.edges)

  //    Post1.user.edge_owner_to_timeline_media.edges.forEach(async followItems =>
  //      {
  //        await client.deleteMedia({ mediaId: followItems.node.id })
  //        console.log(1)
  //      })
  // }
async function Downloadvideo1()
{
  const http = require('https'); // or 'https' for https:// URLs
  const fs = require('fs');
  console.log(video1)
  
  const file = fs.createWriteStream("file1.mp4");
  const request = http.get(video1, function(response) {
    response.pipe(file);

    
    
  });
  const filePhoto = fs.createWriteStream("filePhoto1.jpeg");
  const request1 = http.get(resim4, function(response) {
    response.pipe(filePhoto);


  });

   await VideoPaylas('file1.mp4','filePhoto1.jpeg',videocaption2)
   setTimeout(OtoVideoShare2,60000)
 }
function Downloadvideo2()
{
  const http = require('https'); // or 'https' for https:// URLs
  const fs = require('fs');
  
  const file = fs.createWriteStream("file2.mp4");
  const request = http.get(video2, function(response) {
    response.pipe(file);

    
    
  });
  const filePhoto = fs.createWriteStream("filePhoto2.jpeg");
  const request1 = http.get(resim5, function(response) {
    response.pipe(filePhoto);


  });
  VideoPaylas('file2.mp4','filePhoto2.jpeg',videocaption2)
  setTimeout(OtoVideoShare3,60000)
}
function Downloadvideo3()
{
  const http = require('https'); // or 'https' for https:// URLs
  const fs = require('fs');
  
  const file = fs.createWriteStream("file3.mp4");
  const request = http.get(video3, function(response) {
    response.pipe(file);

    
    
  });
  const filePhoto = fs.createWriteStream("filePhoto3.jpeg");
  const request1 = http.get(resim6, function(response) {
    response.pipe(filePhoto);


  });

  VideoPaylas('file3.mp4','filePhoto3.jpeg',videocaption3)
}
let ID = "trivela.sport";
let SIFRE = "elitebook11";

ig.state.generateDevice(ID);
async function login() 
{
    ig.state.generateDevice(ID);
    await ig.account.login(ID, SIFRE);
}
function VideoPaylas(videolink,fotolink,videocaption)
{
    (async () => {
        await login();
      
        const videoPath = './' + videolink;
        const coverPath = './' + fotolink;
      
      
        const publishResult = await ig.publish.video({
          // read the file into a Buffer
          video: await readFileAsync(videoPath),
          coverImage: await readFileAsync(coverPath),
          caption : "Güncel İçerikler için Takip Edin.. FOLLOW @trivela.sport         \n         #football #skill #goal"
          /*
            this does also support:
            caption (string),  ----+
            usertags,          ----+----> See upload-photo.example.ts
            location,          ----+
           */
        });
      
        console.log("paylasim yapildi");
    })();
}



  
//setTimeout(LoginAndStart, 3000);
