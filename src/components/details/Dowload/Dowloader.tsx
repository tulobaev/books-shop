import { FaDownload } from "react-icons/fa";
import scss from "../DetailsPage.module.scss";

export function DownloadButton({
  pdfUrl,
  filename,
}: {
  pdfUrl: string;
  filename: string;
}) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = filename; // браузер попробует использовать это имя
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <button onClick={handleDownload} className={scss.download}>
      <FaDownload /> Жүктөө
    </button>
  );
}

export default DownloadButton;
