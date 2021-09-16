import jsPDF from 'jspdf'
import sertifikat from './sertifikat.jpg'
import gramota from './gramota.jpg'
import './ARIAL-normal.js'

async function check(data: any){
    const url = 'http://localhost:3001/api/check';

    try {
    const response = await fetch(url, {
        method: 'POST', // или 'PUT'
        body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
        headers: {
        'Content-Type': 'application/json'
        }
    });
    const json = await response.json();
    console.log('Успех:', JSON.stringify(json));
    if (response.status === 200) {
        console.log(json); 
        return(json === 'Победитель') ? true : false;
    }
    } catch (e) {
    console.error('Ошибка:', e);
    return false;
    }
    return false;
}

const createPDF = async (name: string, sername: string, school:string) => {
    
    const data = { name: name,
        sername: sername,
        school: school };
    let status = await check(data)
    let img = status ? gramota : sertifikat
    let fileName = status ? 'Грамота' : 'Сертификат' 
    let doc = new jsPDF('p', 'pt');
    doc.setFont("ARIAL", 'normal');
    
    let width = doc.internal.pageSize.getWidth();
    let height = doc.internal.pageSize.getHeight();

    let x = (status ? width/2 + 80: width/2)
    let y = (status ? height/2 - 40: height/2)
    doc.setFontSize(32)

    doc.addImage(img, 'jpg', 0, 0, width, height)
    doc.text(name, x, y - 36, {align: "center"})
    doc.text(sername, x, y, {align: "center"})
    doc.text(school, x, y + 36, {align: "center"})      
    
    doc.save(fileName + '.pdf')
}
export default createPDF