import axios from "axios";

/**
 * Скачивает PDF-файл с сервера и сохраняет его на диск пользователя.
 * @param url - URL PDF-файла (например, '/books/1/download/')
 * @param filename - Имя файла, под которым сохранить (например, 'book1.pdf')
 */
export async function downloadPDF(url: string, filename: string) {
  try {
    const response = await axios.get(url, {
      responseType: "blob", // получаем файл в виде Blob
    });

    const blob = new Blob([response.data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Ошибка при скачивании PDF:", error);
  }
}
