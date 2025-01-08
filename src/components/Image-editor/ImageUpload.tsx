const ImageUpload: React.FC<{ onUpload: (src: string) => void }> = ({
  onUpload,
}) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => onUpload(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="block w-full file:text-white border border-gray-700 appearance-none file:p-2 file:rounded-md file:border-0 file:bg-gray-700 file:text-sm file:font-medium file:text-foreground p-2 rounded-lg"
      />
    </div>
  );
};

export default ImageUpload;
