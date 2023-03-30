export const getBsnFromJWT = (): string => {
  const JWT = sessionStorage.getItem('JWT');
  const jwtArray = JWT?.split('.');
  if (jwtArray && jwtArray.length >= 2) {
    const jwtJSON = JSON.parse(decodeURIComponent(escape(window.atob(jwtArray[1]))));
    return jwtJSON.person; // BSN
  }
  return '';
};
