﻿/*eslint unicode-bom: ["error", "always"]*/
import { jsPDF } from "jspdf"
var callAddFont = function () {
this.addFileToVFS('ARIAL-normal.ttf', font);
this.addFont('ARIAL-normal.ttf', 'ARIAL', 'normal');
};
jsPDF.API.events.push(['addFonts', callAddFont])