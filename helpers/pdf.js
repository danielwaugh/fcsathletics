const { PDFDocument, rgb, StandardFonts } = PDFLib;

async function getPdfDocFromByteString(byteString) {
    const existingPdfBytes = Uint8Array.from(atob(base64Pdf), c => c.charCodeAt(0));
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
}

async function fillTextField(pdfDoc, formField, formValue) {
    const form = pdfDoc.getForm();
    const studentNameField = form.getTextField(formField);
    studentNameField.setText(formValue);
}

async function savePdf(pdfDoc) {
    return await pdfDoc.save();
}

async function downloadPdf(pdfDoc, fileName) {
    const pdfBytes = await pdfDoc.save();
    download(pdfBytes, fileName, 'application/pdf');
}