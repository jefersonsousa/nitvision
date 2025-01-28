import RNFetchBlob from 'react-native-fetch-blob';

export function CorW(imagemW) {
  return new Promise((resolve, reject) => {
    RNFetchBlob.fetch('GET', imagemW)
      .then((response) => {
        const base64Data = response.base64();
        const img = new Image();
        img.src = `data:image/jpeg;base64,${base64Data}`;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const context = canvas.getContext('2d');
  
          context.drawImage(img, 0, 0);
          const map = context.getImageData(0, 0, img.width, img.height).data;
  
          const histograma = {};
          let frequenciaCorMaisComum = 0;
          let corMaisComum = null;
  
          const arredonda = (v) => {
            return 5 * (Math.round(v / 5));
          };
  
          const componentToHex = (c) => {
            const hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
          };
  
          const rgbToHex = (r, g, b) => {
            return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
          };
  
          for (let i = 0; i < map.length; i += 4) {
            const r = arredonda(map[i]);
            const g = arredonda(map[i + 1]);
            const b = arredonda(map[i + 2]);
            const hex = rgbToHex(r, g, b);
  
            if (histograma[hex] === undefined) {
              histograma[hex] = 1;
            } else {
              histograma[hex]++;
            }
          }
  
          for (const cor in histograma) {
            if (frequenciaCorMaisComum < histograma[cor]) {
              corMaisComum = cor;
              frequenciaCorMaisComum = histograma[cor];
            }
          }
  
          resolve(corMaisComum);
        };
      })
      .catch((error) => {
        reject('Erro ao carregar a imagem: ' + error);
      });
  });
}
