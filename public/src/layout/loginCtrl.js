export default function(userService, videoMaskService) {
  const vm = this;
  console.log('this is the login controller')
  vm.saveZipCode = zip => {
    sessionStorage.setItem('zipCode', zip.toString());
  };
  videoMaskService.createVideoMask();

}
