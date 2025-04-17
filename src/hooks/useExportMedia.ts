import {
  getViewportForBounds,
  useReactFlow,
} from "@xyflow/react";
import {
  getFontEmbedCSS,
  toJpeg,
  toPng,
  toSvg,
} from "html-to-image";
import { useCallback } from "react";
import { toast } from "react-toastify";

export const useExportMedia = () => {
  const { getNodesBounds, getNodes } = useReactFlow();

  const onExport = useCallback(
    async (transformer: typeof toPng) => {
      const nodesBounds = getNodesBounds(getNodes());
      const viewport = getViewportForBounds(
        nodesBounds,
        1600,
        1200,
        1,
        1,
        { x: 20, y: 20 }
      );

      const canvas = document.querySelector(
        ".react-flow__viewport"
      ) as HTMLElement;

      const fontEmbedCSS = await getFontEmbedCSS(canvas);
      const now = new Date(Date.now());
      transformer(canvas, {
        fontEmbedCSS,
        backgroundColor: "white",
        width: 1600,
        height: 1200,
        style: {
          width: "1600px",
          height: "1200px",
          transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
        },
      })
        .then((dataUrl) => {
          const a = document.createElement("a");
          a.setAttribute(
            "download",
            `Export ${now.toUTCString()}`
          );
          a.setAttribute("href", dataUrl);
          a.click();
          toast.success("Image saved!");
        })
        .catch(() => toast.error("Something went wrong"));
    },
    [getNodes, getNodesBounds]
  );

  const exportAsPng = useCallback(
    () => onExport(toPng),
    [onExport]
  );
  const exportAsJepg = useCallback(
    () => onExport(toJpeg),
    [onExport]
  );

  const exportAsSvg = useCallback(
    () => onExport(toSvg),
    [onExport]
  );
  return { exportAsSvg, exportAsJepg, exportAsPng };
};
