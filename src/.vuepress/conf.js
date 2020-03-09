module.exports = secretKeyConf = {
  comments: {
    // clientId: 'MY_CLIENT_ID',
    // clientSecret: 'MY_CLIENT_SECRET',
  },
  ga: 'UA-160044485-1', // UA-000000000-1
  ba: `var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?a4851e8341975115417f902cc3d066c5";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
  })();`
}