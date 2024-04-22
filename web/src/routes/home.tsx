export default function Home() {
  return (
    <div className="py-5 flex flex-auto gap-7">
      <div className="border-black border flex basis-1/3 md:basis-1/4 max-md:hidden ">
        side bar
      </div>
      <div className="border-black border flex-1">Show Posts</div>
    </div>
  );
}
