import { useCallback, useState } from "react";

export const useSessionUpload = () => {
  const [file, setFile] = useState<File | null>(null);

  const onSessionCommit = useCallback(() => {
    if (file === null) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const jsonString = reader.result as string;
      try {
        const sessionData = JSON.parse(jsonString);
      } catch (e) {
        return;
      }
    };
    reader.readAsText(file);
  }, [file]);
};
