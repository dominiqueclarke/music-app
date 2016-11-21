export default function(userService, videoMaskService) {
  const vm = this;
  vm.saveZipCode = zip => {
    sessionStorage.setItem('zipCode', zip.toString());
  };
  videoMaskService.createVideoMask();
}
