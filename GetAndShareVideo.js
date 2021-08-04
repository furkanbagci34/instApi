const Instagram = require('instagram-web-api')
const  { IgApiClient } = require ('instagram-private-api');
const { sample } = require ('lodash');
const { readFile } = require ('fs');
const { promisify } = require ('util');
const readFileAsync = promisify(readFile);
const http = require('https');
const fs = require('fs');

const ig = new IgApiClient();
const { username, password } = process.env

var ImageURL = {};
var VideoURL = {};
var PostID = {};

var Account = {};
Account.Username = "kisahikayetv"
Account.Password = "5795612f"

var Caption = "DAHA FAZLA VIDEO İÇİN @kisahikayetv TAKİP EDİN...\n@kisahikayetv\n@kisahikayetv\n@kisahikayetv\n\n\n #komikvideolar #çghb #güldürgüldür #güldürgüldürshow #çghb2 #skeç #mizah #vine #vineturkiye"

var Location = 
{
  name: 'Istanbul, Turkey',
  external_id: 106012156106461,
  external_id_source: 'facebook_places',
  lat: 41.007932,
  lng: 28.978144,
  address: '',
  minimum_age: 0
}

const client = new Instagram({ username, password })

LoginAndStart()

function LoginAndStart()
{
  console.log(1)
  ;(async () => {
    await client.login({ username: Account.Username, password: Account.Password })       

    OtoVideoShare()
    // setInterval(OtoShare, 3600000);
    // setInterval(OtoFollow,7200000)
    // setInterval(unFollowAllList,14900000)
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
async function OtoVideoShare()
{
  console.log("share 1")
  const Video1 = await client.getPhotosByUsername({ username: 'random.trk', first: '1', after: ''  })

  if(Video1.user.edge_owner_to_timeline_media.edges[0].node.__typename == 'GraphVideo' )
  {
    if(Video1.user.edge_owner_to_timeline_media.edges[0].node.id != PostID.Vid1)
    {  
      PostID.Vid1 = Video1.user.edge_owner_to_timeline_media.edges[0].node.id
      ImageURL.Img1 = Video1.user.edge_owner_to_timeline_media.edges[0].node.thumbnail_src
      VideoURL.Vid1 = Video1.user.edge_owner_to_timeline_media.edges[0].node.video_url

      await DownloadVideo(ImageURL.Img1,VideoURL.Vid1)
      setTimeout(OtoVideoShare2,600000)
    }
    else
    {
      setTimeout(OtoVideoShare2,600000)
    }
  }
  else
  {
    setTimeout(OtoVideoShare2,600000)
  }
}

async function OtoVideoShare2()
{
  console.log("share 2")
  const Video2 = await client.getPhotosByUsername({ username: 'derdi.mizah', first: '1', after: ''  })

  if(Video2.user.edge_owner_to_timeline_media.edges[0].node.__typename == 'GraphVideo' )
  {
    if(Video2.user.edge_owner_to_timeline_media.edges[0].node.id != PostID.Vid2)
    {  
      PostID.Vid2 = Video2.user.edge_owner_to_timeline_media.edges[0].node.id
      ImageURL.Img2 = Video2.user.edge_owner_to_timeline_media.edges[0].node.thumbnail_src
      VideoURL.Vid2 = Video2.user.edge_owner_to_timeline_media.edges[0].node.video_url

      await DownloadVideo(ImageURL.Img2,VideoURL.Vid2)
      setTimeout(OtoVideoShare3,600000)
    }
    else
    {
      setTimeout(OtoVideoShare3,600000)
    }
  }
  else
  {
    setTimeout(OtoVideoShare3,600000)
  }
}

async function OtoVideoShare3()
{
  console.log("share 3")
  const Video3 = await client.getPhotosByUsername({ username: 'saykovaynn', first: '1', after: ''  })

  if(Video3.user.edge_owner_to_timeline_media.edges[0].node.__typename == 'GraphVideo' )
  {
    if(Video3.user.edge_owner_to_timeline_media.edges[0].node.id != PostID.Vid3)
    {  
      PostID.Vid3 = Video3.user.edge_owner_to_timeline_media.edges[0].node.id
      ImageURL.Img3 = Video3.user.edge_owner_to_timeline_media.edges[0].node.thumbnail_src
      VideoURL.Vid3 = Video3.user.edge_owner_to_timeline_media.edges[0].node.video_url

      await DownloadVideo(ImageURL.Img3,VideoURL.Vid3)
      setTimeout(OtoVideoShare,600000)
    }
    else
    {
      setTimeout(OtoVideoShare,600000)
    }
  }
  else
  {
    setTimeout(OtoVideoShare,600000)
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
async function DownloadVideo(pImageURL, pVideoURL)
{
  const fileVideo = fs.createWriteStream("fileVideo.mp4");
  const filePhoto = fs.createWriteStream("filePhoto.jpeg");

  const request = http.get(pVideoURL, function(response) 
  {
    response.pipe(fileVideo);
  });
  const request1 = http.get(pImageURL, function(response) 
  {
    response.pipe(filePhoto);
  });
  await VideoPaylas('fileVideo.mp4','filePhoto.jpeg')
}

async function login() 
{
  ig.state.generateDevice(Account.Username);
  await ig.account.login(Account.Username, Account.Password);
  console.log("giriş yapıldı.")
}

function VideoPaylas(pVideoPath,pPhotoPath)
{
    (async () => {

      await login()
      ig.state.generateDevice(Account.Username);

      const videoPath = './' + pVideoPath;
      const coverPath = './' + pPhotoPath;     
    
      const publishResult = await ig.publish.video
      ({
        video: await readFileAsync(videoPath),
        coverImage: await readFileAsync(coverPath),
        caption : Caption,
        location : Location
      });
    
      console.log("paylasim yapildi");
    })();
}
