import { PlusIcon } from "@heroicons/react/24/outline";

export default function MyPosts() {
  return (
    <div className="flex flex-col gap-2">
      <div className="">
        <div className="px-4 h-10 w-fit border rounded-full text-white hover:bg-indigo-300 bg-indigo-600 flex items-center justify-center cursor-pointer">
          <PlusIcon className="block h-6 w-6 mr-2" aria-hidden="true" />
          New Post
        </div>
      </div>
      <div className="border border-1">Content</div>
    </div>
  );
}
