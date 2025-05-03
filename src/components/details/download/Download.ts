export const handleDownload = async (
  id: string,
  bookName: string,
  setIsDownloading: (value: boolean) => void
) => {
  try {
    setIsDownloading(true);
    const downloadUrl = `http://80.242.57.16:8080/books/${id}/download/`;
    const response = await fetch(downloadUrl);
    if (!response.ok) throw new Error("Download failed");

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", bookName.replace(/\s+/g, "_") + ".pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    alert("Файлды жүктөө мүмкүн эмес. Кийинчерээк аракет кылыңыз.");
    console.error("Download error:", error);
  } finally {
    setIsDownloading(false);
  }
};
