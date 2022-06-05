exports.isFileValid = (file) => {
  const type = file.originalFilename.split('.').pop();
  const validTypes = ['jpg', 'jpeg', 'png', 'gif'];
  if (validTypes.indexOf(type) === -1) {
    return false;
  }
  return true;
};