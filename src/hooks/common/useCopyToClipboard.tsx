import { useState } from "react";

const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false);
  const [copiedContent, setCopiedContent] = useState("");

  const copyToClipboard = async (text) => {
    if (!navigator.clipboard) {
      console.error("Clipboard API not available");
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setCopiedContent(text);
      setTimeout(() => {
        setCopied(false);
        setCopiedContent("");
      }, 3000); // Hide after 3 seconds
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return [copied, copiedContent, copyToClipboard];
};

export default useCopyToClipboard;
