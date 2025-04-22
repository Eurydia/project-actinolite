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
  const { getNodes, getNodesBounds } = useReactFlow();

  const onExport = useCallback(
    async (transformer: typeof toPng) => {
      const imageWidth = 1980;
      const imageHeight = 1080;
      const nodesBounds = getNodesBounds(getNodes());
      const viewport = getViewportForBounds(
        nodesBounds,
        imageWidth,
        imageHeight,
        0.5,
        0.5,
        { x: 20, y: 20 }
      );

      const canvas = document.querySelector(
        ".react-flow__viewport"
      ) as HTMLElement;

      const fontEmbedCSS = await getFontEmbedCSS(
        document.querySelector("body")!
      );
      const now = new Date(Date.now());
      transformer(canvas, {
        fontEmbedCSS,
        backgroundColor: "white",
        width: imageWidth,
        height: imageHeight,
        style: {
          width: `${imageWidth}px`,
          height: `${imageHeight}px`,
          transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
          fontFamily: "monosapce",
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
        .catch(() => toast.error("Export failed"));
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
