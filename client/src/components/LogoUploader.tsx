import { useRef } from "react";

type Props = {
  onLoad: (url: string) => void;
};

export default function LogoUploader({ onLoad }: Props) {
  const fileInput = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onLoad(url);            // välitetään vanhemmalle komponentille
  }

  return (
    <>
      <button
        className="mb-2 rounded bg-indigo-600 px-3 py-2 text-white"
        onClick={() => fileInput.current?.click()}
      >
        Lataa logo
      </button>

      <input
        type="file"
        accept="image/*"
        ref={fileInput}
        onChange={handleChange}
        className="hidden"
      />
    </>
  );
}
