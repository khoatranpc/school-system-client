import Image from "next/image";

export default function MainPage() {
  return (
    <div className="h-full flex justify-center items-center flex-col">
      <Image src={'/banner.jpg'} alt="" width={800} height={500} />
      <h1 className="text-[2.4rem] font-bold">Welcome to <span className="text-[var(--base)]">School system</span></h1>
    </div>
  );
}
